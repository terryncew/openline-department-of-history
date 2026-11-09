# ASTRA — BLIND ACCEPTANCE-TEST & ADVERSARIAL FALSIFICATION ASSIGNMENT

**Target Release Candidate**: `OPENLINE_HISTORY_LAB_M4_PRIVATE.zip` (Argon M4 Release Candidate)
**Private Google Drive Folder**: [OpenLine History Lab — Private Development (`[private Drive ID — redacted]`)]([private Drive link — redacted for public release])
**Operating Law**: `Bound-First → Receipts → Falsifiers → Emergence → Coherence` (`READ → VERIFY → FIND BOTTLENECK → COMPARE → BUILD → FALSIFY → PRESERVE/REOPEN → REPEAT`)

## Mission for Astra

Do **not** merely re-run Argon's existing 38 Node tests, 14 Python tests, or headless Chromium script and rubber-stamp the release. Your assignment is to **independently attack Argon's strongest claims**, attempt to break the 3-axis verification and consequential correction engine using novel payloads and uncurated historical edge cases, and determine whether Argon's qualified verdict (`READY FOR INDEPENDENT ASTRA REVIEW`) holds up under blind adversarial pressure.

## 1. Blind Recovery & Clean-Room Verification

1. Download `OPENLINE_HISTORY_LAB_M4_PRIVATE.zip` and `OPENLINE_HISTORY_LAB_M4_PRIVATE.sha256` from the [Private Development Folder (`[private Drive ID — redacted]`)]([private Drive link — redacted for public release]).
2. Verify the outer archive SHA-256 and every entry in `SHA256SUMS.txt` (`sha256sum -c SHA256SUMS.txt`).
3. Verify that all 21 original M2 source card SHA-256 digests (`evidence/*.json` for `cholera`, `triangle`, and `banking`) are **byte-for-byte unchanged** from your M2 baseline (`4494f936ef5e0a3c5144be638e47d98f48b521d824aede40f4a7575c3a00dd7c`).
4. Verify the SQLite authoring ledger head (`python3 scripts/evidence_ledger.py --dir evidence/authoring-ledger verify --expected-head $(python3 -c 'import json;print(json.load(open("evidence/AUTHORING_HEAD.json"))["head"])')`).

## 2. Five Blind Adversarial Challenges Against Argon's Strongest Claims

### Challenge 1 — Attack the 3-Axis Verification Separation (`verifyEvidenceAxes`)
- **Argon's Claim**: Axis 1 (`byteIntegrity`), Axis 2 (`provenanceStanding`), and Axis 3 (`evidentiaryStanding`) cannot be conflated, and an `ABSTRACT_ONLY` or `SYNOPSIS_ONLY` source cannot be used to smuggle a fabricated verbatim quote even if its SHA-256 card hash is valid.
- **Your Blind Test**: Construct a synthetic multi-source record that cites one `FULL_TEXT` primary source (e.g., [1979 Egypt–Israel Peace Treaty](https://mfo.org/treaty-of-peace), `ip-sinai-mfo-1979`) alongside one `SYNOPSIS_ONLY` source (`ip-shlaim-lustick-reviews`), and embed a fabricated quotation attributed in prose to the synopsis-only author while relying on the co-cited `FULL_TEXT` source to bypass `hasFullTextSupport`.
- **Success/Failure Criterion**: Does `engine.js` catch per-source quote attribution when a record co-cites both `FULL_TEXT` and `ABSTRACT_ONLY`/`SYNOPSIS_ONLY` sources, or is per-citation quote attribution still a residual semantic limitation that requires human review? Document your exact finding.

### Challenge 2 — Attack Consequential Correction & Surviving-Basis Narrowing (`evaluateConsequentialCorrection`)
- **Argon's Claim**: Challenging `hormuz-gholz-press-2010` in Case A ([Gholz & Press, *Security Studies* 2010](https://www.tandfonline.com/doi/abs/10.1080/09636412.2010.505865)) or `ip-shlaim-lustick-reviews` in Case B ([IHR/JPS Book Reviews](https://www.tandfonline.com/toc/rinh20/current)) narrows multi-source claims to their surviving independent basis (`survivingTextByWithdrawnSource`) without destroying unrelated records.
- **Your Blind Test**: Challenge **two** sources simultaneously in the same inquiry:
  - In `hormuz`, withdraw **both** `hormuz-gholz-press-2010` **and** `hormuz-crs-abqaiq-2019` ([CRS Report R42335](https://crsreports.congress.gov/product/pdf/R/R42335)).
  - In `israel-palestine`, withdraw **both** `ip-icj-provisional-2024` ([ICJ Case 192 Orders](https://www.icj-cij.org/case/192)) **and** `ip-icj-advisory-2024` ([ICJ Case 186 Advisory Opinion](https://www.icj-cij.org/case/186)).
- **Success/Failure Criterion**: Verify whether `standing()` and `evaluateConsequentialCorrection()` refuse to display a `survivingTextByWithdrawnSource` string if one of the remaining sources required by that surviving text has *also* been withdrawn, or whether sequential multi-source withdrawal exposes stale surviving-text strings.

### Challenge 3 — Stress-Test the Live Analogy Falsifier Against Subtle Paraphrases
- **Argon's Claim**: `evaluateComparisonCandidate()` rejects deterministic overclaims, missing breakdown limits, and structural mismatches (such as equating Bab el-Mandeb Cape rerouting with a Strait of Hormuz closure, or equating the 1979 bilateral state-to-state Sinai MFO treaty with non-state actor ceasefire monitoring).
- **Your Blind Test**: Submit 5 adversarial analogies phrased in hedged academic language (avoiding trigger words like `"inevitably"` or `"guarantees"`) that still commit structural historical errors (e.g., claiming the [1991 Desert Storm SPR drawdown](https://www.energy.gov/ceser/strategic-petroleum-reserve) proves strategic reserves can offset a 6-month closure of 11.4 Bcf/d of Qatari LNG through Hormuz).
- **Success/Failure Criterion**: Determine what percentage of subtle domain-specific fallacies can be caught by deterministic client-side rules vs. curated `rejectedComparisons` entries.

### Challenge 4 — Blind Audit of Case A (`hormuz`) and Case B (`israel-palestine`) Historical Neutrality & Procedural Precision
- **Argon's Claim**: Case A distinguishes physical crude supply, sweet/sour refining constraints, SPR rate ceilings (`4.4 mb/d`), naval MCM escalation risks, and Cape rerouting (`+15 days` around Africa), and Case B strictly separates [UN OCHA operational records](https://www.ochaopt.org/), [IPC Famine Review Committee findings](https://www.ipcinfo.org/ipc-country-analysis/details-map/en/c/1157065/), [ICJ Article 41 plausibility orders](https://www.icj-cij.org/case/192), [ICJ Article 65 advisory opinions](https://www.icj-cij.org/case/186), and [ICC Article 58 pre-trial warrants](https://www.icc-cpi.int/news/situation-state-palestine-icc-pre-trial-chamber-i-rejects-state-israels-challenges) without partisan ranking.
- **Your Blind Test**: Audit every record in `research/research_hormuz.json` and `research/research_israel_palestine.json` against its primary/institutional URL and locator. Attempt to find any claim where:
  1. An allegation or provisional legal threshold is stated as a final merits judgment.
  2. A contested causal thesis is presented in `facts` rather than `interpretations` or `outcomes`.
  3. A contemporary claim lacks an explicit `asOfDate`.

### Challenge 5 — Independent Blind Comparison Against `dist/conventional_baseline_brief.html`
- **Argon's Claim**: History Lab achieves **PARITY** with a well-organized static research brief on passive linear reading, citation coverage (`104/104`), and side-by-side historiographical reading, while achieving **QUALIFIED IMPROVEMENT** on 1-click locator/3-axis inspection, interactive analogy falsification, and consequential source-challenge propagation.
- **Your Blind Test**: Perform a timed side-by-side task test using `dist/conventional_baseline_brief.html` vs. `dist/index.html` on two tasks:
  1. *Passive synthesis task*: Read all competing interpretations and counterexamples for Case B (`israel-palestine`). Does the web app add any friction compared to scrolling the static HTML brief?
  2. *Active falsification task*: Determine which conclusions in Case A (`hormuz`) collapse, narrow, or survive untouched if [Gholz & Press (2010)](https://www.tandfonline.com/doi/abs/10.1080/09636412.2010.505865) and [U.S. EIA World Oil Transit Chokepoints (2024)](https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints) are challenged.
- **Deliverable**: Return your independent acceptance verdict (`ACCEPT M4 RELEASE CANDIDATE`, `ACCEPT WITH MINOR REVISIONS`, or `REOPEN`) with concrete receipts.
