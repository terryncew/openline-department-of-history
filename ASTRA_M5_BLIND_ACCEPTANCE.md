# ASTRA — OPENLINE DEPARTMENT OF HISTORY M5 BLIND ACCEPTANCE CHALLENGE

**Target Release Candidate**: `OPENLINE_DEPARTMENT_OF_HISTORY_M5_PRIVATE.zip`  
**Prepared By**: Argon (Lead Engineer, M5) for Independent Astra Falsification  
**Date**: November 8, 2026  
**Governing Law**: [OpenLine Agent Operating Law v1.0]([private reference removed for public release]) & [Dogfood 001]([private reference removed for public release])  
**Private Google Drive Folder**: [OpenLine History Lab — Private Development]([private reference removed for public release])

---

## Instructions for Astra (Independent Reviewer)

Do not accept Argon’s `READY FOR INDEPENDENT ASTRA REVIEW` verdict on trust. Independently verify the archive SHA-256, `SHA256SUMS.txt`, the 151-event SQLite authoring ledger (`f978269a4ddd55c03189f313813c7494106ea0175d1c529b98aa6fcd2edf8ca0`), all 42 source card hashes, all 65 automated tests (`50` Node + `15` Python), and real headless Chromium behavior across Phone (`390×844`), Chromebook (`1024×768`), and Desktop (`1280×850`) viewports.

Execute all **Six Blind Acceptance Challenges** below without substituting easier tests.

---

## Challenge 1 — Ordinary-Language Question Routing & Coverage Boundary Honesty (`SUPPORTED` vs. `PARTIALLY_SUPPORTED` vs. `UNSUPPORTED`)

Test `HistoryEvidence.askHistory(questionText, DATA, overrides, integrity)` and the browser `#citizen-question-form` against all five mandatory prompts plus partial-coverage and false-friend keyword traps:

1. **Mandatory Supported Questions**:
   - *"What can history tell us about a prolonged Strait of Hormuz disruption?"*
   - *"What historical arrangements have reduced civilian harm during territorial conflicts?"*
   - *"What happened when governments responded to banking panics?"*
   - **Falsification Criterion**: Each must return `status: "SUPPORTED"`, retrieve the matching verified dossier (`hormuz`, `israel-palestine`, `banking`), explain why the precedent is relevant, recover the 3 comparable historical arguments (`comparableArguments`) and competing scholarly interpretations (`competingInterpretations`), show documented outcomes and failure counterexamples (`whatHappenedAfterward`), state explicit analogy breakdown limits (`differencesThatLimit`), attach 3-axis verified source standings (`sourcesAndStanding`), and disclose `missingCoverage` so the 5 dossiers are never misrepresented as all of history.
2. **Mandatory Boundary-Testing Refusal Questions**:
   - *"Has history proved that one political ideology always succeeds?"* → Must return `status: "UNSUPPORTED"`, `boundaryCode: "UNIVERSAL_IDEOLOGY_OR_DETERMINISM_REFUSED"`, `canEstablishAnswer: false`, `precedents: []`.
   - *"What will happen in 2030?"* → Must return `status: "UNSUPPORTED"`, `boundaryCode: "EXTERNAL_FUTURE_FORECAST_REFUSED"`, `canEstablishAnswer: false`, `precedents: []`.
3. **Partially Supported & Superficial Keyword Trap Attacks**:
   - Ask a question combining a curated inquiry with an uncurated episode/region (e.g., *"How did the 1933 banking panic compare to the 2023 Silicon Valley Bank run and European sovereign debt crises?"* or *"What can Strait of Hormuz history tell us about a Taiwan Strait semiconductor blockade?"*) → Must return `status: "PARTIALLY_SUPPORTED"` with both the verified precedent AND explicit `missingCoverage` entries naming the uncurated gap.
   - Ask a superficial keyword trap (e.g., *"How do I build a campfire on a river bank while fishing?"*) → Must return `status: "UNSUPPORTED"` (`SUPERFICIAL_KEYWORD_RESEMBLANCE_REJECTED`) rather than matching `triangle` ("fire") or `banking` ("bank").

---

## Challenge 2 — Comparable Historical Arguments Audit (Contemporary Expectations vs. Subsequent Events vs. Later Historians)

Inspect all 15 `historicalArguments` records across the 5 dossiers (`3` per dossier) and the `#tabs button[data-tab='arguments']` view:
1. Verify that every argument record explicitly distinguishes:
   - **Column 1 (`contemporaryArgument` & `contemporaryActor`)**: What participants/policymakers argued at the time (with decision window).
   - **Column 2 (`policymakerExpectation`)**: What policymakers expected to happen.
   - **Column 3 (`expectationVerdict` & `subsequentEvidence`)**: Which expectations were supported (`SUPPORTED_WITH_LIMITS`), contradicted (`CONTRADICTED_BY_EVENTS`), or complicated (`MIXED_AND_CONFOUNDED`) by subsequent events (e.g., in `banking-arg-1` and `banking-arg-2`: currency returned to reopened banks after March 13, 1933, yet ~$4 billion remained tied up in ~4,200 unlicensed banks as of April 12, 1933, and statutory FDIC insurance did not take effect until January 1, 1934).
   - **Column 4 (`laterHistoriography` & `differenceThatLimits`)**: How later historians' conclusions diverged from or refined contemporary beliefs (e.g., Silber 2009 on implicit RFC/Fed liquidity guarantees vs. Wigmore 1987 on gold outflows and dollar devaluation expectations), and where the lesson breaks today.
2. Verify that the **Cross-Inquiry Argument Comparator (`#compare-other-case`)** allows side-by-side comparison of argument chains across any two dossiers in the browser.

---

## Challenge 3 — Argument-Level Co-Cited Quotation Smuggling & Provenance Falsification

Attack `HistoryEvidence.validate(data)` by injecting a direct quotation (`>= 12` chars) into `contemporaryArgument`, `subsequentEvidence`, or `laterHistoriography` on a multi-source `historicalArguments` entry that co-cites a primary source alongside an `ABSTRACT_ONLY` or `SYNOPSIS_ONLY` source (`bank-wigmore`, `tri-mcevoy`, `tri-greenwald`, `hormuz-gholz-press-2010`, `ip-shlaim-lustick-reviews`), attributing the quote in prose to the abstract-only author while pointing `verifiedQuote.sourceId` at the primary source:
- **Falsification Criterion**: `HistoryEvidence.validate()` must throw `Co-cited quotation attributed in prose to abstract/synopsis-only source (<sourceId>)`.

---

## Challenge 4 — Argument-Level Single-Source & Simultaneous Multi-Source Consequential Withdrawal

Attack both `HistoryEvidence.evaluateConsequentialCorrection()` and `HistoryEvidence.askHistory()` when one or more sources supporting a `historicalArguments` chain are withdrawn:
1. Withdraw `bank-wigmore` in `banking`: verify `banking-arg-3` transitions to `REOPEN` (`CHANGED_SURVIVING_BASIS`) and narrows cleanly to `bank-act`, `bank-report`, and `bank-silber` in both the workbench and the live `#question-briefing` output.
2. Withdraw **both** `bank-silber` and `bank-wigmore` simultaneously (`['bank-silber', 'bank-wigmore']`): verify `banking-arg-3` does NOT display a single-source fallback string that still cites `bank-silber`, and instead narrows via the composite key `bank-silber+bank-wigmore` strictly to primary records `bank-act` and `bank-report`.
3. Verify the same composite multi-source withdrawal protection on `hormuz-arg-1` (`hormuz-gholz-press-2010+hormuz-talmadge-2008`) and `israel-palestine-arg-1` / `israel-palestine-arg-2` (`ip-carnegie-mediation-2026+ip-shlaim-lustick-reviews`).

---

## Challenge 5 — Honest Comparison Against the Searchable Historical Reference Interface (`PARITY` Audit)

Inspect `dist/conventional_baseline_brief.html` and `evidence/CONVENTIONAL_BASELINE_COMPARISON.json`:
- Verify that the conventional baseline has been upgraded to a **Competent Conventional Searchable Historical Reference Interface** with live client-side search (`#ref-search-input`), dossier filter (`#ref-case-filter`), Section 6B Comparable Historical Arguments tables, and Section 8 Explicit Source-Dependency & Reverse-Impact Matrices.
- Verify that M5 reports `PARITY` wherever appropriate (citation coverage, reading pre-authored comparisons and arguments, exact-keyword filtering, and single-source dependency lookup) and claims improvement only where verified by mechanism (question boundary classification across `SUPPORTED` / `PARTIALLY_SUPPORTED` / `UNSUPPORTED`, active analogy falsification, 3-axis provenance/quote-smuggling guardrails, and combinatorial multi-source withdrawal narrowing).

---

## Challenge 6 — Multi-Viewport Browser Playtest & Simulated First-Time Citizen Walkthrough

Run `python3 scripts/browser_playtest.py` in real headless Chromium across Phone (`390×844`), Chromebook (`1024×768`), and Desktop (`1280×850`):
- Verify `0` horizontal overflows (`scrollWidth <= clientWidth + 2`) across all **6 mandatory/boundary questions** and all **5 cases × 8 tabs (`120` tab combinations)** (`138` total viewport checks).
- Verify `0` console errors and `0` external network requests (`connect-src 'self'`).
- Confirm that the customer-value walkthrough is honestly labeled as `SIMULATED_ACCEPTANCE_EXERCISE_HEADLESS_CHROMIUM_NO_REAL_HUMAN_PARTICIPANT`.
