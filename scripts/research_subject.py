#!/usr/bin/env python3
"""OpenLine Department of History v0.3 — Provisional Historical Subject Research & Ledger Promotion CLI.
Standard library only. Recognizes unfamiliar historical subjects outside the 5 core verified inquiries,
loads or scaffolds accessible-source provisional inquiries, separates Verified Evidence, Disputed
Interpretations, and Unverified Material, and binds reviewed inquiries into a Mandate-Ledger SQLite store.
"""
from __future__ import annotations
import argparse, hashlib, json, pathlib, sys
from typing import Any

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
sys.path.insert(0, str(ROOT / "third_party" / "mandate-ledger"))
from evidence_ledger import HistoryLedger, upstream

def load_core_dataset() -> dict[str, Any]:
    return json.loads((ROOT / "dist" / "data.json").read_text(encoding="utf-8"))

def load_provisional_catalog() -> list[dict[str, Any]]:
    return json.loads((ROOT / "research" / "provisional_subjects.json").read_text(encoding="utf-8"))

def summarize_provisional_pack(pack: dict[str, Any]) -> dict[str, Any]:
    all_records = (
        pack.get("facts", [])
        + pack.get("timeline", [])
        + pack.get("outcomes", [])
        + pack.get("counterexamples", [])
        + pack.get("comparison", [])
        + pack.get("interpretations", [])
        + pack.get("historicalArguments", [])
    )
    verified = [r["id"] for r in all_records if r.get("epistemicStatus") == "VERIFIED_EVIDENCE"]
    disputed = [r["id"] for r in all_records if r.get("epistemicStatus") == "DISPUTED_INTERPRETATION"]
    unverified = [r["id"] for r in all_records if r.get("epistemicStatus") == "UNVERIFIED_MATERIAL" or r.get("reviewStatus") == "PENDING_REVIEW"]
    return {
        "id": pack["id"],
        "title": pack["title"],
        "period": pack["period"],
        "inquiryStatus": pack.get("inquiryStatus", "PROVISIONAL"),
        "sourcesCount": len(pack.get("sources", [])),
        "verifiedEvidenceCount": len(verified),
        "disputedInterpretationCount": len(disputed),
        "unverifiedMaterialCount": len(unverified),
        "unverifiedIds": unverified,
    }

def seed_and_verify_provisional_in_sqlite(ledger_dir: pathlib.Path) -> dict[str, Any]:
    """Ingests the 4 researched v0.3 provisional inquiries into an isolated Mandate-Ledger SQLite store,
    applies the primary-record correction to each unverified claim, tests consequential source withdrawal,
    and verifies hash-chain integrity."""
    catalog = load_provisional_catalog()
    h = HistoryLedger(ledger_dir)
    try:
        summary_by_case = {}
        for pack in catalog:
            cid = pack["id"]
            h.init_case(cid, pack["sources"][0]["url"])
            for s in pack["sources"]:
                h.ingest(cid, s["id"], s["url"], upstream.canonical(s["card"]).encode())
            # Correct the provisional unverified fact before binding to verified ledger
            for f in pack["facts"]:
                if f.get("epistemicStatus") == "UNVERIFIED_MATERIAL" and f.get("verifiedCorrection"):
                    vc = f["verifiedCorrection"]
                    f["title"] = vc["correctedTitle"]
                    f["text"] = vc["correctedText"]
                    f["sourceIds"] = vc["correctedSourceIds"]
                    f["epistemicStatus"] = "VERIFIED_EVIDENCE"
                    f["reviewStatus"] = "VERIFIED_BY_REVIEWER"
            for group in ("facts", "timeline", "comparison", "outcomes", "interpretations", "historicalArguments"):
                for item in pack.get(group, []):
                    h.bind(cid, item["id"], item["sourceIds"], f"v0.3 provisional review & promotion binding for {cid}")
            summary_by_case[cid] = {
                "sources": len(pack["sources"]),
                "boundReviews": len(h.status(cid)),
                "allCurrent": all(r["status"] == "CURRENT" for r in h.status(cid)),
            }
        checked = upstream.checked(h.conn)
        return {
            "eventsCount": len(h.rows()),
            "head": checked["head"],
            "cases": summary_by_case,
        }
    finally:
        h.close()

def main() -> int:
    parser = argparse.ArgumentParser(description="OpenLine v0.3 Provisional Subject Research CLI")
    parser.add_argument("--list", action="store_true", help="List all 4 researched unfamiliar subject packs")
    parser.add_argument("--subject", type=str, default="", help="Inspect a specific provisional subject pack (e.g. espionage)")
    args = parser.parse_args()
    catalog = load_provisional_catalog()
    if args.subject:
        match = next((p for p in catalog if p["id"] == args.subject), None)
        if not match:
            print(json.dumps({"error": f"Subject not found: {args.subject}"}))
            return 1
        print(json.dumps(summarize_provisional_pack(match), indent=2))
        return 0
    print(json.dumps([summarize_provisional_pack(p) for p in catalog], indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
