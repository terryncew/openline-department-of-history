# OpenLine Department of History (M5) — Engineering Handoff & Verification Ledger

**Author**: Argon (Lead Engineer, OpenLine Department of History M5)  
**Date**: November 8, 2026  
**Governing Law**: [OpenLine Agent Operating Law v1.0]([private Drive link — redacted for public release]) (`a3ea42f6cde5355acea07fa1f0c947cf4b96b5a4efcb48bd80133bb38afb9c81`) & [Dogfood 001]([private Drive link — redacted for public release]) (`0535e56b63bd114eadf4e7d38208c5661a86702d21caeeba0dee0e62e0e4444f`)  
**Upstream Accepted Baseline**: [OPENLINE_HISTORY_LAB_M4_1_ASTRA_ACCEPTED_PRIVATE.zip]([private Drive link — redacted for public release]) (`3fe975d9c284f15a1c0c44c6ecd6239cf3f130eebb90202eb364d99b85321ecb`) & [ASTRA_M4_INDEPENDENT_ACCEPTANCE_REPORT.md]([private Google Doc link — redacted for public release])  
**Private Google Drive Folder**: [OpenLine History Lab — Private Development]([private Drive link — redacted for public release])  
**Release Candidate Status**: **`READY FOR INDEPENDENT ASTRA REVIEW`** (No public deployment, merge, spend, or external outreach; simulated browser acceptance exercise explicitly disclosed)

## 1. Dogfood 001 Execution Summary (`READ → VERIFY → FIND BOTTLENECK → COMPARE → BUILD → FALSIFY → PRESERVE/REOPEN → REPEAT`)

### Step 1 — `READ` & `VERIFY` (Upstream M4.1 Reproduction)
1. **Archive & Manifest Verification**: Retrieved `OPENLINE_HISTORY_LAB_M4_1_ASTRA_ACCEPTED_PRIVATE.zip` (`[private Drive ID — redacted]`) and `ASTRA_M4_INDEPENDENT_ACCEPTANCE_REPORT.md` (`[private Drive ID — redacted]`) from the private Google Drive folder. Verified exact SHA-256 `3fe975d9c284f15a1c0c44c6ecd6239cf3f130eebb90202eb364d99b85321ecb`, unpacked the archive, verified all `132/132` internal entries in `SHA256SUMS.txt`, verified the 151-event SQLite authoring ledger (`evidence/authoring-ledger/history.sqlite3`, head `f978269a4ddd55c03189f313813c7494106ea0175d1c529b98aa6fcd2edf8ca0`), and executed all 56 M4.1 automated tests (`42/42` Node + `14/14` Python).
2. **Preservation Invariants Confirmed**: All 42 source `card` SHA-256 digests (including the 21 original M2 source cards), all 104 core evidence records, the 151-event SQLite authoring ledger chain, and all 6 Astra M4.1 repairs (`engine.js`, `app.js`, `styles.css`, `scripts/conventional_baseline.py`) remain 100% intact in M5.

### Step 2 — `FIND BOTTLENECK` (Customer-Value Gap in M4.1)
Inspecting M4.1 against the founding M5 product standard—*“A citizen encounters a contemporary problem and asks: ‘What does history say? Has something like this happened before? What were people arguing? What did they try? What actually happened?’”*—identified three concrete bottlenecks:
1. **No Question-First Retrieval (`#unsupported-form` Hardcoded Refusal)**: In M4.1, typing any question into `#unsupported-form` unconditionally returned a static refusal string (`UNSUPPORTED — No curated source set is bound to this new question...`), even when the citizen asked directly about the Strait of Hormuz, territorial conflict ceasefires, or banking panics.
2. **Contemporary Arguments & Policymaker Expectations Were Not Directly Comparable Against Subsequent Events and Later Scholarship**: M4.1 separated `facts`, `timeline`, `comparison`, `outcomes`, and `interpretations` across different tabs, but did not structure **Comparable Historical Arguments** showing side-by-side: (a) what contemporaries argued at the time, (b) what policymakers believed would happen, (c) which expectations were supported or contradicted by subsequent events, and (d) how later historians' conclusions diverged from contemporary beliefs.
3. **No Granular Coverage-Boundary Classification (`SUPPORTED` vs. `PARTIALLY_SUPPORTED` vs. `UNSUPPORTED`)**: M4.1 could not distinguish a supported question from a partially supported question (where the library has verified precedents for part of the inquiry—such as the 1933 U.S. banking panic—but must explicitly disclose missing coverage for uncurated parts—such as 2023 Silicon Valley Bank or European sovereign debt crises), nor did it distinguish out-of-library historical questions from future forecasts (*"What will happen in 2030?"*) or ideological determinism (*"Has history proved that one political ideology always succeeds?"*).

### Step 3 — `BUILD` (What Was Engineered in M5)
1. **Comparable Historical Arguments Dataset (`historicalArguments` & `questionProfile` Across All 5 Inquiries)**:
   - Added `15` structured, source-bound `historicalArguments` records (`3` per dossier across `cholera`, `triangle`, `banking`, `hormuz`, and `israel-palestine`) plus `questionProfile` routing/boundary metadata in `research/research_*.json` without modifying any of the 42 source `card` objects or the 151-event SQLite authoring ledger.
   - Each comparable argument record binds:
     - `topic` & `decisionWindow`
     - `contemporaryActor` & `contemporaryArgument` (what participants argued at the time)
     - `policymakerExpectation` (what policymakers believed would happen)
     - `expectationVerdict` (`SUPPORTED_WITH_LIMITS`, `CONTRADICTED_BY_EVENTS`, or `MIXED_AND_CONFOUNDED`) & `subsequentEvidence` (what actually happened afterward)
     - `laterHistoriography` (what later historians concluded vs. contemporary beliefs)
     - `differenceThatLimits` (where the historical lesson stops being reliable today)
     - `asOfDate: "2026-11-08"`, `sourceIds`, and `survivingTextByWithdrawnSource` (including composite keys for simultaneous multi-source withdrawals).
2. **Deterministic Local-First Question-to-History Engine (`HistoryEvidence.askHistory` in `engine.js`)**:
   - Classifies ordinary-language citizen questions deterministically with zero external API calls, zero accounts, and zero invented citations into:
     - `SUPPORTED` (`VERIFIED_DOSSIER_MATCH`): Retrieves matching precedent dossier(s), explains why each precedent is relevant (`whyRelevant` + `matchReasons`), surfaces the 4-column `comparableArguments`, `competingInterpretations`, `whatHappenedAfterward` (`documentedOutcomes` + `counterexamplesAndFailures`), `differencesThatLimit`, `sourcesAndStanding` (3-axis verified), and `missingCoverage`.
     - `PARTIALLY_SUPPORTED` (`PARTIAL_LIBRARY_COVERAGE_WITH_EXPLICIT_GAPS` or `BROAD_INQUIRY_REQUIRES_DOMAIN_SELECTION`): Retrieves the verified precedent(s) for the supported half of the question AND explicitly lists the uncurated episodes/regions/mechanisms in `missingCoverage`.
     - `UNSUPPORTED` (Fail-Closed Refusal): Refuses future forecasts (`EXTERNAL_FUTURE_FORECAST_REFUSED`, e.g., *"What will happen in 2030?"*), universal ideological determinism (`UNIVERSAL_IDEOLOGY_OR_DETERMINISM_REFUSED`, e.g., *"Has history proved that one political ideology always succeeds?"*), superficial false-friend keyword traps (`SUPERFICIAL_KEYWORD_RESEMBLANCE_REJECTED`, e.g., *"How do I build a campfire on a river bank?"*), unsafe HTML/XSS (`INVALID_OR_UNSAFE_QUERY`), and uncurated historical topics (`OUTSIDE_CURATED_EVIDENCE_LIBRARY`, e.g., *"What caused the fall of the Roman Republic?"*).
3. **Public Question-First Department of History Interface (`template.html`, `app.js`, `styles.css`)**:
   - **Section 01 — Question-to-History Inquiry Console (`#question-console`)**: Features ordinary-language input (`#citizen-question-input`), 6 1-click sample/adversarial question pills, and the live **Question-to-History Evidence Briefing (`#question-briefing`)** with coverage boundary pills, explicit coverage-gap disclosures (`#question-coverage-gaps`), 4-quadrant precedent summaries, and the 4-column **Comparable Historical Arguments Matrix**.
   - **Section 02 & 03 — 8-Tab Dossier Workbench & Cross-Inquiry Argument Comparator**: Adds the **`Arguments & expectations` (`arguments`)** tab alongside `Timeline & record`, `Compare & falsify`, `Outcomes & counterexamples`, `Interpretations`, `Sources (3-Axis)`, `Challenge & correction`, and `Educator`, complete with a live **Cross-Inquiry Argument Comparator (`#compare-other-case`)** so visitors can compare contemporary expectations and outcomes across different historical domains side-by-side.

## 2. Adversarial Question & Falsification Matrix (`FALSIFY`)

| Adversarial / Mandatory Question | Classification & Boundary Code | Matched Dossier(s) | Key Evidence & Boundary Behavior Verified |
| :--- | :--- | :--- | :--- |
| **1. "What can history tell us about a prolonged Strait of Hormuz disruption?"** | `SUPPORTED` (`VERIFIED_DOSSIER_MATCH`) | `hormuz` (10 sources, 3 comparable arguments) | Surfaces ~20.9 mb/d oil & 11.4 Bcf/d LNG flow vs. ~4.7 mb/d pipeline bypass and 0 LNG bypass/reserve; compares 1987–88 Earnest Will convoys, Talmadge (37–112 day MCM+ASCM clearance), Gholz & Press market adaptation, Hamilton oil-shock elasticity, and why Red Sea Cape rerouting (+15 days) and Abqaiq storage drawdowns fail as analogies for a full Hormuz closure. |
| **2. "What historical arrangements have reduced civilian harm during territorial conflicts?"** | `SUPPORTED` (`VERIFIED_DOSSIER_MATCH`) | `israel-palestine` (11 sources, 3 comparable arguments) | Compares 1949 Armistice/UNTSO (broke down), 1979 Egypt–Israel Sinai Peace Treaty & MFO (45+ years via full withdrawal, finalized borders, 4 zones), 1993–95 Oslo I/II (Areas A/B/C interim deferral without settlement freeze or third-party enforcement), 1994 Jordan treaty (32+ years), and the 42-day Jan–Mar 2025 Gaza Phase One pause (3.4x food surge, 30 living hostages & 1,777 detainees released, 602,795 children vaccinated) vs. the 2 March 2025 crossing closure and August 2025 IPC Phase 5 Famine. |
| **3. "What happened when governments responded to banking panics?"** | `SUPPORTED` (`VERIFIED_DOSSIER_MATCH`) | `banking` (7 sources, 3 comparable arguments) | Compares contemporary March 1933 arguments (Proclamation 2039 holiday, March 9 Emergency Banking Act, March 12 Fireside Chat, staggered Class A/B/C reopening) against subsequent events ($1.2B+ currency returned to licensed banks, yet ~$4B remained frozen in ~4,200 unlicensed banks on April 12, 1933, and statutory FDIC insurance did not begin until Jan 1, 1934) and later historians (Silber 2009 de facto liquidity guarantee vs. Wigmore 1987 gold/dollar run). |
| **4. "Has history proved that one political ideology always succeeds?"** | `UNSUPPORTED` (`UNIVERSAL_IDEOLOGY_OR_DETERMINISM_REFUSED`) | `[]` (0 fabricated precedents) | Fails closed; explains that the verified evidence library cannot establish that any single political ideology or policy formula always succeeds and that every dossier documents confounders and failure counterexamples. |
| **5. "What will happen in 2030?"** | `UNSUPPORTED` (`EXTERNAL_FUTURE_FORECAST_REFUSED`) | `[]` (0 fabricated precedents) | Fails closed; explains that historical evidence cannot predict future dates such as 2030 and guides the user to ask structural questions about past interventions and limits. |
| **6. "How did the 1933 banking panic compare to the 2023 Silicon Valley Bank run and European sovereign debt crises?"** | `PARTIALLY_SUPPORTED` (`PARTIAL_LIBRARY_COVERAGE_WITH_EXPLICIT_GAPS`) | `banking` | Retrieves the verified 1933 U.S. Banking Crisis precedent AND explicitly discloses in `missingCoverage` that 2023 SVB is only a comparative prompt and European sovereign-banking crises have no bound sources in the 5-dossier library. |
| **7. "How do I build a campfire on a river bank while fishing?"** | `UNSUPPORTED` (`SUPERFICIAL_KEYWORD_RESEMBLANCE_REJECTED`) | `[]` | Rejects superficial keyword overlap ("fire", "bank") so surface words are never treated as historical relevance or causation. |
| **8. "What caused the fall of the Roman Republic in the first century BCE?"** | `UNSUPPORTED` (`OUTSIDE_CURATED_EVIDENCE_LIBRARY`) | `[]` | Fails closed on uncurated historical periods; lists the exact 5 dossiers in the library without inventing citations. |

## 3. Comparison Against Competent Conventional Searchable Historical Reference Interface (`COMPARE`)

In `scripts/conventional_baseline.py` (`dist/conventional_baseline_brief.html` and `evidence/CONVENTIONAL_BASELINE_COMPARISON.json`), M5 was compared against a **Competent Conventional Searchable Historical Reference Interface** built from the exact same 5 inquiries, 42 sources, 104 core records, and 15 comparable historical arguments, complete with a sticky client-side Search/Case Filter bar, Section 6B Comparable Historical Arguments tables, and Section 8 Explicit Source-Dependency & Reverse-Impact Matrices:

| Criterion | M5 vs. Conventional Searchable Reference Interface Verdict | Where Conventional Interface Achieves `PARITY` | Where M5 Earns a Verifiable Structural Advantage |
| :--- | :--- | :--- | :--- |
| **C1. Claim Traceability & Searchability** | `IMPROVED_ON_VERIFICATION_SEPARATION_PARITY_ON_CITATION_COVERAGE` | `PARITY` on 100% citation coverage (`104/104` core records, `15/15` arguments) and instant substring search over supported keywords. | 1-click 3-axis Source Inspector modal + co-cited quote-attribution guardrails preventing abstract/synopsis sources (`bank-wigmore`, `tri-mcevoy`, `tri-greenwald`, `hormuz-gholz-press-2010`, `ip-shlaim-lustick-reviews`) from being credited with verbatim full-text quotes. |
| **C2. Differences & Rejected Analogies** | `IMPROVED_ON_ACTIVE_ANALOGY_FALSIFICATION_PARITY_ON_STATIC_READING` | `PARITY` for reading pre-authored comparison tables, argument limits, and rejected analogies. | Live interactive Analogy Falsifier (`evaluateComparisonCandidate`) catches deterministic overclaims, missing breakdown limits, and hedged domain fallacies (`5/5` caught). |
| **C3. Comparable Arguments & Competing Explanations** | `PARITY_ON_READING_IMPROVED_ON_INGESTION_GUARDRAILS` | `PARITY` for reading Section 6A competing interpretations and Section 6B Comparable Historical Arguments in a single continuous scroll (`0` tab clicks). | Interactive Cross-Inquiry Argument Comparator (`#compare-other-case`) + build/runtime validator refusing consensus-washing or incomplete argument chains. |
| **C4. Conditional Interventions & Counterexamples** | `IMPROVED_ON_CAUSAL_DISCIPLINE_PARITY_ON_DESCRIPTIVE_TEXT` | `PARITY` on descriptive text of outcomes, confounders, and counterexamples. | Enforces Vector 5/6 causal guardrails and refuses superficial keyword causation or future predictions. |
| **C5. Consequential Correction After Source Challenge** | `PARITY_ON_SINGLE_SOURCE_LOOKUP_IMPROVED_ON_MULTI_SOURCE_COMBINATORIAL_NARROWING` | `PARITY` on single-source blast-radius identification via the Section 8 Source-Dependency Matrix. | Automatic combinatorial multi-source withdrawal intersection across both `104` core records and `15` comparable arguments + live narrowing in the Question-to-History briefing + append-only SQLite/notebook state. |
| **C6. First-Time User Effort & Question Routing** | `PARITY_FOR_LINEAR_READING_IMPROVED_FOR_QUESTION_ROUTING_AND_STRESS_TESTING` | `PARITY` for continuous linear reading and exact-keyword filtering. | Ordinary-language Question-to-History routing that distinguishes `SUPPORTED`, `PARTIALLY_SUPPORTED` (with explicit missing coverage), and `UNSUPPORTED` (explaining why `2030` or ideological determinism cannot be answered by historical records). |

## 4. Automated Test Suite & Real Multi-Viewport Browser Playtest (`PRESERVE`)

* **Automated Test Suite (`65/65 PASS`)**:
  - `node --test tests/*.test.cjs`: **`50/50 PASS`** (12 original M2 tests + 26 Argon M4 tests + 4 Astra M4.1 blind challenge regression tests + 8 new M5 Question-to-History & Comparable Arguments tests).
  - `python3 -m unittest discover -s tests -p "test_*.py" -v`: **`12/12 PASS`** (including `test_m5_comparable_arguments_and_searchable_reference_baseline`).
  - `python3 third_party/mandate-ledger/test_gpt_dependency_recall.py -v`: **`3/3 PASS`**.
* **Real Headless Chromium Playtest (`scripts/browser_playtest.py`, `evidence/BROWSER_PLAYTEST_RESULTS.json`)**:
  - **Explicit Disclosure**: `SIMULATED_ACCEPTANCE_EXERCISE_HEADLESS_CHROMIUM_NO_REAL_HUMAN_PARTICIPANT` (no real human user participated).
  - **Viewports Verified**: Phone (`390×844`), Chromebook (`1024×768`), Desktop (`1280×850`).
  - **Exhaustive Matrix**: Tested all **6 mandatory/boundary questions** × 3 viewports (`18` question renders) and all **5 cases × 8 tabs × 3 viewports (`120` tab combinations)** = **`138/138` viewport states** with **`0` horizontal overflows (`scrollWidth <= clientWidth`)**, **`0` console errors**, and **`0` external network requests**.

## 5. Recovery & Verification Commands

```bash
unzip -q OPENLINE_DEPARTMENT_OF_HISTORY_M5_PRIVATE.zip
cd openline-history-lab
sha256sum -c SHA256SUMS.txt
python3 scripts/evidence_ledger.py --dir evidence/authoring-ledger verify
python3 scripts/build.py
python3 scripts/conventional_baseline.py
node --test tests/*.test.cjs
python3 -m unittest discover -s tests -p "test_*.py" -v
python3 third_party/mandate-ledger/test_gpt_dependency_recall.py -v
python3 scripts/browser_playtest.py
```
