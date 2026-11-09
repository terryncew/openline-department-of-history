"""Mandate Ledger Official U.S. House Clerk Evidence Loop & Integrity Gate.

Extends Promise Ledger 001 with:
1. Authentic U.S. House Clerk XML roll-call ingestion & byte-level SHA-256 provenance (`source_snapshots`).
2. Independent reconciliation against official HTML summary counts and party breakdowns.
3. Atomic `SAVEPOINT` ingestion (fail-closed on truncated/corrupted XML or mid-import interruption).
4. Versioned source updates & revocations that automatically reopen (`REOPEN`) only dependent reviews.
5. Structural enforcement of the 3 Public-Accountability Integrity Rules on bounded agent proposals.
"""
from __future__ import annotations

import hashlib
import json
import sqlite3
import re
import xml.etree.ElementTree as ET
from urllib.parse import urlparse
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


class IntegrityViolationError(ValueError):
    """Raised when an import or agent proposal violates Mandate Ledger integrity rules."""


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def parse_house_clerk_xml(xml_bytes: bytes) -> dict[str, Any]:
    if not xml_bytes or not xml_bytes.strip():
        raise IntegrityViolationError("EMPTY_SOURCE_BYTES")
    if len(xml_bytes) > 2 * 1024 * 1024:
        raise IntegrityViolationError("SOURCE_EXCEEDS_2MB_LIMIT")
    if re.search(br"<!\s*(?:DOCTYPE|ENTITY)\b", xml_bytes, flags=re.I):
        raise IntegrityViolationError("XML_DTD_OR_ENTITY_FORBIDDEN")
    try:
        root = ET.fromstring(xml_bytes)
    except ET.ParseError as exc:
        raise IntegrityViolationError(f"CORRUPT_OR_TRUNCATED_XML: {exc}") from exc

    if root.tag != "rollcall-vote":
        raise IntegrityViolationError(f"UNEXPECTED_ROOT_TAG: {root.tag}")

    meta = root.find("vote-metadata")
    data = root.find("vote-data")
    if meta is None or data is None:
        raise IntegrityViolationError("INCOMPLETE_ROLLCALL_STRUCTURE")

    def _txt(elem, tag: str) -> str:
        node = elem.find(tag)
        return (node.text or "").strip() if node is not None else ""

    congress = int(_txt(meta, "congress") or 0)
    session = _txt(meta, "session")
    rollcall_num = int(_txt(meta, "rollcall-num") or 0)
    legis_num = _txt(meta, "legis-num")
    vote_question = _txt(meta, "vote-question")
    vote_desc = _txt(meta, "vote-desc")
    vote_result = _txt(meta, "vote-result")
    action_date = _txt(meta, "action-date")
    action_time = _txt(meta, "action-time")

    if not congress or not rollcall_num or not legis_num or not vote_result:
        raise IntegrityViolationError("MISSING_REQUIRED_METADATA_FIELDS")

    totals_node = meta.find("vote-totals")
    if totals_node is None:
        raise IntegrityViolationError("MISSING_VOTE_TOTALS")

    party_totals: dict[str, dict[str, int]] = {}
    for pt in totals_node.findall("totals-by-party"):
        party = _txt(pt, "party")
        party_totals[party] = {
            "yea": int(_txt(pt, "yea-total") or 0),
            "nay": int(_txt(pt, "nay-total") or 0),
            "present": int(_txt(pt, "present-total") or 0),
            "not_voting": int(_txt(pt, "not-voting-total") or 0),
        }

    overall_node = totals_node.find("totals-by-vote")
    if overall_node is None:
        raise IntegrityViolationError("MISSING_TOTALS_BY_VOTE")
    declared_totals = {
        "yea": int(_txt(overall_node, "yea-total") or 0),
        "nay": int(_txt(overall_node, "nay-total") or 0),
        "present": int(_txt(overall_node, "present-total") or 0),
        "not_voting": int(_txt(overall_node, "not-voting-total") or 0),
    }

    votes: list[dict[str, str]] = []
    counted = {"yea": 0, "nay": 0, "present": 0, "not_voting": 0}
    counted_by_party: dict[str, dict[str, int]] = {}
    party_map = {"R": "Republican", "D": "Democratic", "I": "Independent"}

    for rv in data.findall("recorded-vote"):
        leg = rv.find("legislator")
        vote_val = _txt(rv, "vote")
        if leg is None or not vote_val:
            raise IntegrityViolationError("INCOMPLETE_RECORDED_VOTE_ENTRY")
        name_id = (leg.attrib.get("name-id") or "").strip()
        party_code = (leg.attrib.get("party") or "").strip()
        state_code = (leg.attrib.get("state") or "").strip()
        sort_field = (leg.attrib.get("sort-field") or "").strip()
        unaccented = (leg.attrib.get("unaccented-name") or (leg.text or "").strip())
        if not name_id or not party_code or not state_code:
            raise IntegrityViolationError(f"MISSING_LEGISLATOR_ATTRIBUTES: {name_id}")

        norm_vote = (
            "yea" if vote_val in ("Yea", "Aye")
            else "nay" if vote_val in ("Nay", "No")
            else "present" if vote_val == "Present"
            else "not_voting" if vote_val == "Not Voting"
            else None
        )
        if norm_vote is None:
            raise IntegrityViolationError(f"UNKNOWN_VOTE_VALUE: {vote_val}")
        counted[norm_vote] += 1
        full_party = party_map.get(party_code, party_code)
        counted_by_party.setdefault(full_party, {"yea": 0, "nay": 0, "present": 0, "not_voting": 0})
        counted_by_party[full_party][norm_vote] += 1

        votes.append({
            "bioguide_id": name_id,
            "name": unaccented,
            "sort_field": sort_field,
            "party": party_code,
            "state": state_code,
            "vote": vote_val,
            "normalized_vote": norm_vote,
        })

    if counted != declared_totals:
        raise IntegrityViolationError(
            f"INTERNAL_TALLY_MISMATCH: counted={counted} vs declared={declared_totals}"
        )
    # Reject missing party sections and unexpected member party groups. Checking
    # only the provided groups let a stripped <totals-by-party> section pass.
    if not party_totals or party_totals != counted_by_party:
        raise IntegrityViolationError(
            f"PARTY_TOTALS_INCOMPLETE_OR_MISMATCH: declared={party_totals} counted={counted_by_party}"
        )
    if len({v["bioguide_id"] for v in votes}) != len(votes):
        raise IntegrityViolationError("DUPLICATE_LEGISLATOR_ID_IN_ROLLCALL")

    return {
        "record_key": f"house-rollcall-{congress}-{session}-{rollcall_num}",
        "congress": congress,
        "session": session,
        "rollcall_num": rollcall_num,
        "legis_num": legis_num,
        "vote_question": vote_question,
        "vote_desc": vote_desc,
        "vote_result": vote_result,
        "action_date": action_date,
        "action_time": action_time,
        "declared_totals": declared_totals,
        "party_totals": party_totals,
        "recorded_votes": votes,
        "recorded_count": len(votes),
    }


class MandateEvidenceLoop:
    """Durable SQLite evidence ledger with byte-versioned snapshots and automatic review reopening."""

    def __init__(self, db_path: Path | str):
        self.db_path = Path(db_path)
        self.conn = sqlite3.connect(str(self.db_path))
        self.conn.row_factory = sqlite3.Row
        self.conn.execute("PRAGMA foreign_keys = ON")
        self._init_schema()

    def close(self) -> None:
        self.conn.close()

    def _init_schema(self) -> None:
        with self.conn:
            self.conn.executescript(
                """
                CREATE TABLE IF NOT EXISTS source_snapshots (
                    snapshot_id TEXT PRIMARY KEY,
                    record_key TEXT NOT NULL,
                    version_num INTEGER NOT NULL,
                    source_url TEXT NOT NULL,
                    retrieved_at TEXT NOT NULL,
                    byte_length INTEGER NOT NULL,
                    sha256 TEXT NOT NULL,
                    raw_bytes BLOB NOT NULL,
                    parent_snapshot_id TEXT,
                    status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'SUPERSEDED', 'REVOKED')),
                    revocation_reason TEXT,
                    UNIQUE(record_key, version_num)
                );

                CREATE TABLE IF NOT EXISTS rollcall_records (
                    record_key TEXT PRIMARY KEY,
                    active_snapshot_id TEXT NOT NULL REFERENCES source_snapshots(snapshot_id),
                    congress INTEGER NOT NULL,
                    session TEXT NOT NULL,
                    rollcall_num INTEGER NOT NULL,
                    legis_num TEXT NOT NULL,
                    vote_question TEXT NOT NULL,
                    vote_desc TEXT NOT NULL,
                    vote_result TEXT NOT NULL,
                    action_date TEXT NOT NULL,
                    action_time TEXT NOT NULL,
                    yea_total INTEGER NOT NULL,
                    nay_total INTEGER NOT NULL,
                    present_total INTEGER NOT NULL,
                    not_voting_total INTEGER NOT NULL,
                    recorded_count INTEGER NOT NULL,
                    evidence_status TEXT NOT NULL CHECK (evidence_status IN ('VERIFIED', 'REVOKED'))
                );

                CREATE TABLE IF NOT EXISTS member_votes (
                    record_key TEXT NOT NULL REFERENCES rollcall_records(record_key),
                    snapshot_id TEXT NOT NULL REFERENCES source_snapshots(snapshot_id),
                    bioguide_id TEXT NOT NULL,
                    member_name TEXT NOT NULL,
                    party TEXT NOT NULL,
                    state TEXT NOT NULL,
                    vote_cast TEXT NOT NULL,
                    normalized_vote TEXT NOT NULL,
                    epistemic_note TEXT NOT NULL,
                    PRIMARY KEY (record_key, snapshot_id, bioguide_id)
                );

                CREATE TABLE IF NOT EXISTS mandate_reviews (
                    review_id TEXT PRIMARY KEY,
                    promise_id TEXT NOT NULL,
                    record_key TEXT NOT NULL REFERENCES rollcall_records(record_key),
                    bound_snapshot_id TEXT NOT NULL REFERENCES source_snapshots(snapshot_id),
                    bound_sha256 TEXT NOT NULL,
                    bioguide_id TEXT,
                    human_rubric_id TEXT NOT NULL,
                    review_status TEXT NOT NULL CHECK (review_status IN ('CURRENT', 'REOPEN')),
                    reopen_reason TEXT,
                    summary_note TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS agent_research_proposals (
                    proposal_id TEXT PRIMARY KEY,
                    record_key TEXT NOT NULL,
                    snapshot_id TEXT NOT NULL,
                    bioguide_id TEXT NOT NULL,
                    proposal_status TEXT NOT NULL CHECK (proposal_status IN ('PROPOSED_AWAITING_HUMAN_REVIEW', 'REFUSED')),
                    refusal_code TEXT,
                    payload_json TEXT NOT NULL,
                    created_at TEXT NOT NULL
                );
                """
            )

    def ingest_rollcall_xml(
        self,
        xml_bytes: bytes,
        *,
        source_url: str,
        retrieved_at: str | None = None,
        inject_mid_import_failure: bool = False,
    ) -> dict[str, Any]:
        retrieved_at = retrieved_at or datetime.now(timezone.utc).isoformat()
        parsed = parse_house_clerk_xml(xml_bytes)
        # URL pin is a necessary scope check, not proof those bytes came from
        # the official site. The caller must independently authenticate source.
        url = urlparse(source_url)
        path_match = re.fullmatch(r"/evs/(20\d{2})/roll(\d{1,4})\.xml", url.path)
        if (url.scheme != "https" or url.netloc != "clerk.house.gov"
                or url.params or url.query or url.fragment or path_match is None):
            raise IntegrityViolationError("UNTRUSTED_HOUSE_CLERK_SOURCE_URL")
        year = path_match.group(1)
        if (int(path_match.group(2)) != parsed["rollcall_num"]
                or year not in parsed["action_date"]):
            raise IntegrityViolationError("SOURCE_URL_XML_IDENTITY_MISMATCH")
        digest = sha256_bytes(xml_bytes)
        record_key = parsed["record_key"]

        cur = self.conn.cursor()
        cur.execute("SAVEPOINT sp_ingest")
        try:
            existing = cur.execute(
                """
                SELECT s.snapshot_id, s.version_num, s.sha256, s.status
                FROM source_snapshots s
                WHERE s.record_key = ?
                ORDER BY s.version_num DESC
                LIMIT 1
                """,
                (record_key,),
            ).fetchone()

            # A revoked official source cannot silently regain standing merely
            # because a background fetch returned the same (or different) bytes.
            if existing is not None and existing["status"] == "REVOKED":
                raise IntegrityViolationError("REVOKED_SOURCE_REIMPORT_REQUIRES_REVIEW")

            if existing is not None and existing["sha256"] == digest and existing["status"] == "ACTIVE":
                cur.execute("RELEASE SAVEPOINT sp_ingest")
                return {
                    "status": "IDEMPOTENT_NOOP",
                    "record_key": record_key,
                    "snapshot_id": existing["snapshot_id"],
                    "version_num": existing["version_num"],
                    "sha256": digest,
                    "reopened_reviews": [],
                }

            version_num = 1 if existing is None else int(existing["version_num"]) + 1
            parent_snapshot_id = None if existing is None else existing["snapshot_id"]
            snapshot_id = f"{record_key}@v{version_num}:{digest[:12]}"

            if existing is not None and existing["status"] == "ACTIVE":
                cur.execute(
                    "UPDATE source_snapshots SET status = 'SUPERSEDED' WHERE snapshot_id = ?",
                    (existing["snapshot_id"],),
                )

            cur.execute(
                """
                INSERT INTO source_snapshots (
                    snapshot_id, record_key, version_num, source_url, retrieved_at,
                    byte_length, sha256, raw_bytes, parent_snapshot_id, status, revocation_reason
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', NULL)
                """,
                (
                    snapshot_id,
                    record_key,
                    version_num,
                    source_url,
                    retrieved_at,
                    len(xml_bytes),
                    digest,
                    sqlite3.Binary(xml_bytes),
                    parent_snapshot_id,
                ),
            )

            totals = parsed["declared_totals"]
            cur.execute(
                """
                INSERT INTO rollcall_records (
                    record_key, active_snapshot_id, congress, session, rollcall_num,
                    legis_num, vote_question, vote_desc, vote_result, action_date, action_time,
                    yea_total, nay_total, present_total, not_voting_total, recorded_count, evidence_status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'VERIFIED')
                ON CONFLICT(record_key) DO UPDATE SET
                    active_snapshot_id = excluded.active_snapshot_id,
                    legis_num = excluded.legis_num,
                    vote_question = excluded.vote_question,
                    vote_desc = excluded.vote_desc,
                    vote_result = excluded.vote_result,
                    action_date = excluded.action_date,
                    action_time = excluded.action_time,
                    yea_total = excluded.yea_total,
                    nay_total = excluded.nay_total,
                    present_total = excluded.present_total,
                    not_voting_total = excluded.not_voting_total,
                    recorded_count = excluded.recorded_count,
                    evidence_status = 'VERIFIED'
                """,
                (
                    record_key,
                    snapshot_id,
                    parsed["congress"],
                    parsed["session"],
                    parsed["rollcall_num"],
                    parsed["legis_num"],
                    parsed["vote_question"],
                    parsed["vote_desc"],
                    parsed["vote_result"],
                    parsed["action_date"],
                    parsed["action_time"],
                    totals["yea"],
                    totals["nay"],
                    totals["present"],
                    totals["not_voting"],
                    parsed["recorded_count"],
                ),
            )

            for idx, v in enumerate(parsed["recorded_votes"]):
                if inject_mid_import_failure and idx == 100:
                    raise RuntimeError("INJECTED_MID_IMPORT_INTERRUPTION")
                epistemic_note = (
                    "UNINDEXED_ABSENCE_REASON: official roll call records 'Not Voting' only; "
                    "medical, travel, or scheduling cause is not established by this record."
                    if v["normalized_vote"] == "not_voting"
                    else "RECORDED_FLOOR_POSITION: sourced official action; requires explicit human rubric for promise evaluation."
                )
                cur.execute(
                    """
                    INSERT INTO member_votes (
                        record_key, snapshot_id, bioguide_id, member_name,
                        party, state, vote_cast, normalized_vote, epistemic_note
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        record_key,
                        snapshot_id,
                        v["bioguide_id"],
                        v["name"],
                        v["party"],
                        v["state"],
                        v["vote"],
                        v["normalized_vote"],
                        epistemic_note,
                    ),
                )

            reopened: list[str] = []
            if parent_snapshot_id is not None:
                # Scope dependencies explicitly: member-specific reviews depend
                # on that member's vote/identity AND shared bill metadata. A
                # change to the question, bill, result or date affects everyone.
                prior_source = cur.execute(
                    "SELECT raw_bytes FROM source_snapshots WHERE snapshot_id = ?",
                    (parent_snapshot_id,),
                ).fetchone()
                old_parsed = parse_house_clerk_xml(bytes(prior_source["raw_bytes"]))
                shared_fields = ("legis_num", "vote_question", "vote_desc", "vote_result", "action_date", "action_time")
                shared_metadata_changed = any(old_parsed[k] != parsed[k] for k in shared_fields)
                def person_basis(v):
                    return (v["vote"], v["name"], v["party"], v["state"])
                old_positions = {v["bioguide_id"]: person_basis(v) for v in old_parsed["recorded_votes"]}
                new_positions = {v["bioguide_id"]: person_basis(v) for v in parsed["recorded_votes"]}
                changed_bioguides = {
                    bg for bg in set(old_positions) | set(new_positions)
                    if old_positions.get(bg) != new_positions.get(bg)
                }

                dep_reviews = cur.execute(
                    "SELECT review_id, bioguide_id FROM mandate_reviews WHERE record_key = ?",
                    (record_key,),
                ).fetchall()
                for rev in dep_reviews:
                    bg = rev["bioguide_id"]
                    if shared_metadata_changed or bg is None or bg in changed_bioguides:
                        cur.execute(
                            """
                            UPDATE mandate_reviews
                            SET review_status = 'REOPEN', reopen_reason = ?, updated_at = ?
                            WHERE review_id = ?
                            """,
                            (
                                f"SOURCE_DEPENDENCY_CHANGED:{parent_snapshot_id}->{snapshot_id}",
                                retrieved_at,
                                rev["review_id"],
                            ),
                        )
                        reopened.append(rev["review_id"])

            cur.execute("RELEASE SAVEPOINT sp_ingest")
            self.conn.commit()
            return {
                "status": "INGESTED_NEW_VERSION" if version_num > 1 else "INGESTED_GENESIS",
                "record_key": record_key,
                "snapshot_id": snapshot_id,
                "version_num": version_num,
                "sha256": digest,
                "recorded_count": parsed["recorded_count"],
                "reopened_reviews": reopened,
            }
        except Exception:
            cur.execute("ROLLBACK TO SAVEPOINT sp_ingest")
            cur.execute("RELEASE SAVEPOINT sp_ingest")
            raise

    def reconcile_against_official_summary(
        self,
        record_key: str,
        *,
        expected_totals: dict[str, int],
        expected_party_totals: dict[str, dict[str, int]],
        expected_sample_members: dict[str, str],
    ) -> dict[str, Any]:
        rec = self.conn.execute(
            "SELECT * FROM rollcall_records WHERE record_key = ?", (record_key,)
        ).fetchone()
        if rec is None:
            raise KeyError(f"Unknown record_key: {record_key}")
        snap_id = rec["active_snapshot_id"]
        snap = self.conn.execute(
            "SELECT * FROM source_snapshots WHERE snapshot_id = ?", (snap_id,)
        ).fetchone()
        # Do not report reconciliation against a revoked, superseded or
        # tampered snapshot as successful even when the vote arithmetic matches.
        if (rec["evidence_status"] != "VERIFIED" or snap["status"] != "ACTIVE"
                or sha256_bytes(bytes(snap["raw_bytes"])) != snap["sha256"]):
            return {"record_key": record_key, "snapshot_id": snap_id,
                    "sha256": snap["sha256"], "totals_match": False,
                    "all_members_match": False, "reconciled": False,
                    "reason": "EVIDENCE_NOT_IN_STANDING", "member_checks": {}}
        parsed = parse_house_clerk_xml(bytes(snap["raw_bytes"]))

        totals_match = (
            rec["yea_total"] == expected_totals["yea"]
            and rec["nay_total"] == expected_totals["nay"]
            and rec["present_total"] == expected_totals["present"]
            and rec["not_voting_total"] == expected_totals["not_voting"]
            and parsed["party_totals"] == expected_party_totals
        )
        member_checks = {}
        for bg, exp_vote in expected_sample_members.items():
            row = self.conn.execute(
                "SELECT vote_cast FROM member_votes WHERE record_key = ? AND snapshot_id = ? AND bioguide_id = ?",
                (record_key, snap_id, bg),
            ).fetchone()
            actual = row["vote_cast"] if row else None
            member_checks[bg] = {"expected": exp_vote, "actual": actual, "match": actual == exp_vote}

        all_members_match = all(v["match"] for v in member_checks.values())
        # A handful of sample checks do not validate the rows actually served
        # by the database. Compare the entire active snapshot to the parsed
        # source, including identifiers, recorded positions and identity.
        stored_rows = self.conn.execute(
            """SELECT bioguide_id, member_name, party, state, vote_cast, normalized_vote
               FROM member_votes WHERE record_key = ? AND snapshot_id = ?""",
            (record_key, snap_id),
        ).fetchall()
        stored_by_id = {
            v["bioguide_id"]: (v["member_name"], v["party"], v["state"], v["vote_cast"], v["normalized_vote"])
            for v in stored_rows
        }
        original_by_id = {
            v["bioguide_id"]: (v["name"], v["party"], v["state"], v["vote"], v["normalized_vote"])
            for v in parsed["recorded_votes"]
        }
        complete_record_match = (len(stored_rows) == len(parsed["recorded_votes"])
                                 and stored_by_id == original_by_id)
        metadata_match = all(rec[key] == parsed[key] for key in (
            "congress", "session", "rollcall_num", "legis_num", "vote_question",
            "vote_desc", "vote_result", "action_date", "action_time", "recorded_count"))
        return {
            "record_key": record_key,
            "snapshot_id": snap_id,
            "sha256": snap["sha256"],
            "totals_match": totals_match,
            "all_members_match": all_members_match,
            "complete_record_match": complete_record_match,
            "metadata_match": metadata_match,
            "reconciled": bool(totals_match and all_members_match and complete_record_match and metadata_match),
            "member_checks": member_checks,
        }

    def register_review(
        self,
        *,
        review_id: str,
        promise_id: str,
        record_key: str,
        bioguide_id: str | None,
        human_rubric_id: str,
        summary_note: str,
    ) -> dict[str, Any]:
        if not human_rubric_id or not human_rubric_id.strip():
            raise IntegrityViolationError("HUMAN_RUBRIC_REQUIRED_FOR_MANDATE_REVIEW")
        rec = self.conn.execute(
            "SELECT active_snapshot_id, evidence_status FROM rollcall_records WHERE record_key = ?",
            (record_key,),
        ).fetchone()
        if rec is None or rec["evidence_status"] != "VERIFIED":
            raise IntegrityViolationError("CANNOT_BIND_REVIEW_TO_UNVERIFIED_OR_REVOKED_EVIDENCE")
        snap = self.conn.execute(
            "SELECT sha256, status FROM source_snapshots WHERE snapshot_id = ?",
            (rec["active_snapshot_id"],),
        ).fetchone()
        if snap is None or snap["status"] != "ACTIVE":
            raise IntegrityViolationError("REVIEW_SOURCE_NOT_ACTIVE")
        if bioguide_id is not None:
            member = self.conn.execute(
                "SELECT 1 FROM member_votes WHERE record_key = ? AND snapshot_id = ? AND bioguide_id = ?",
                (record_key, rec["active_snapshot_id"], bioguide_id),
            ).fetchone()
            if member is None:
                raise IntegrityViolationError("REVIEW_MEMBER_NOT_IN_OFFICIAL_ROLLCALL")
        now = datetime.now(timezone.utc).isoformat()
        with self.conn:
            self.conn.execute(
                """
                INSERT INTO mandate_reviews (
                    review_id, promise_id, record_key, bound_snapshot_id, bound_sha256,
                    bioguide_id, human_rubric_id, review_status, reopen_reason, summary_note, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, 'CURRENT', NULL, ?, ?)
                """,
                (
                    review_id,
                    promise_id,
                    record_key,
                    rec["active_snapshot_id"],
                    snap["sha256"],
                    bioguide_id,
                    human_rubric_id,
                    summary_note,
                    now,
                ),
            )
        return {"review_id": review_id, "status": "CURRENT", "bound_snapshot_id": rec["active_snapshot_id"]}

    def revoke_evidence(self, record_key: str, *, reason: str) -> dict[str, Any]:
        rec = self.conn.execute(
            "SELECT active_snapshot_id FROM rollcall_records WHERE record_key = ?",
            (record_key,),
        ).fetchone()
        if rec is None:
            raise KeyError(f"Unknown record_key: {record_key}")
        now = datetime.now(timezone.utc).isoformat()
        with self.conn:
            self.conn.execute(
                "UPDATE source_snapshots SET status = 'REVOKED', revocation_reason = ? WHERE snapshot_id = ?",
                (reason, rec["active_snapshot_id"]),
            )
            self.conn.execute(
                "UPDATE rollcall_records SET evidence_status = 'REVOKED' WHERE record_key = ?",
                (record_key,),
            )
            dep = self.conn.execute(
                "SELECT review_id FROM mandate_reviews WHERE record_key = ?",
                (record_key,),
            ).fetchall()
            reopened = [r["review_id"] for r in dep]
            self.conn.execute(
                """
                UPDATE mandate_reviews
                SET review_status = 'REOPEN',
                    reopen_reason = ?,
                    updated_at = ?
                WHERE record_key = ?
                """,
                (f"EVIDENCE_REVOKED:{reason}", now, record_key),
            )
        return {"record_key": record_key, "status": "REVOKED", "reopened_reviews": reopened}

    def submit_agent_research_proposal(self, proposal: dict[str, Any]) -> dict[str, Any]:
        """Validate a bounded agent research proposal against the 3 Public-Accountability Integrity Rules."""
        proposal_id = str(proposal.get("proposal_id") or "")
        record_key = str(proposal.get("record_key") or "")
        bioguide_id = str(proposal.get("bioguide_id") or "")
        if not proposal_id or not record_key or not bioguide_id:
            raise ValueError("proposal_id, record_key, and bioguide_id are required")

        rec = self.conn.execute(
            "SELECT active_snapshot_id, evidence_status FROM rollcall_records WHERE record_key = ?",
            (record_key,),
        ).fetchone()
        if rec is None or rec["evidence_status"] != "VERIFIED":
            raise IntegrityViolationError("PROPOSAL_REFERENCES_UNVERIFIED_RECORD")
        snapshot_id = rec["active_snapshot_id"]

        # Check integrity rules
        refusal_code = None
        claim_text = json.dumps(proposal, sort_keys=True).lower()
        verdict = str(proposal.get("promise_verdict") or proposal.get("verdict") or "PENDING_HUMAN_REVIEW").upper()

        # Rule 1: Missing data != confirmed absence
        if (
            proposal.get("asserts_confirmed_absence") is True
            or "confirmed unauthorized absence" in claim_text
            or "confirmed absence of any" in claim_text
            or "0.00 in pac contributions" in claim_text
        ):
            refusal_code = "RULE_1_VIOLATION_MISSING_DATA_CONFLATED_WITH_CONFIRMED_ABSENCE"

        # Rule 2: Contributions != purchased votes
        elif (
            proposal.get("asserts_contribution_purchased_vote") is True
            or "purchased vote" in claim_text
            or "bought vote" in claim_text
            or "campaign contributions caused vote" in claim_text
        ):
            refusal_code = "RULE_2_VIOLATION_CONTRIBUTION_CONFLATED_WITH_PURCHASED_VOTE"

        # Rule 3: Sourced action != automatic proof promise was fulfilled or broken
        elif (
            verdict in ("FULFILLED", "BROKEN", "KEPT", "VIOLATED")
            or proposal.get("auto_close_review") is True
            or not bool(proposal.get("requires_human_rubric", False))
        ):
            refusal_code = "RULE_3_VIOLATION_SOURCED_ACTION_AUTO_VERDICT_WITHOUT_HUMAN_RUBRIC"

        status = "REFUSED" if refusal_code else "PROPOSED_AWAITING_HUMAN_REVIEW"
        now = datetime.now(timezone.utc).isoformat()
        with self.conn:
            self.conn.execute(
                """
                INSERT INTO agent_research_proposals (
                    proposal_id, record_key, snapshot_id, bioguide_id,
                    proposal_status, refusal_code, payload_json, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    proposal_id,
                    record_key,
                    snapshot_id,
                    bioguide_id,
                    status,
                    refusal_code,
                    json.dumps(proposal, sort_keys=True),
                    now,
                ),
            )
        return {
            "proposal_id": proposal_id,
            "status": status,
            "refusal_code": refusal_code,
            "snapshot_id": snapshot_id,
        }
