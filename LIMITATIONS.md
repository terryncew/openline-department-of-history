# Limitations and Uncertainty Disclosures

Read this before relying on anything in this package. These limits are part of the product, not fine print to skip.

## 1. A small, bounded library — not all of history

The package covers **5 inquiries, 42 sources, 104 records, and 15 argument chains**. That is the whole library. It is a curated set of precedents, not a survey of history. Anything outside those five inquiries is outside what the tool can answer, and the tool says so (SUPPORTED / PARTIALLY_SUPPORTED / UNSUPPORTED) rather than guessing.

The five inquiries: 1854 Broad Street cholera; 1911 Triangle Shirtwaist fire; 1933 U.S. banking crisis; Strait of Hormuz and maritime energy chokepoints; Israel-Palestine civilian protection and durable arrangements.

## 2. Five sources are abstract-only or synopsis-only

Exactly five sources were not read in full. They are represented by an abstract or a published synopsis, paraphrased, with a link — never as full text:

- `bank-wigmore`
- `tri-mcevoy`
- `tri-greenwald`
- `hormuz-gholz-press-2010`
- `ip-shlaim-lustick-reviews`

Any claim that rests only on one of these rests on a summary, not on the full work. The site's source cards say so. The consequential-correction feature exists in part for this reason: withdraw a source and see which claims survive without it.

## 3. Hashes prove the files have not changed — nothing more

SHA-256 checksums on the 42 citation cards, the bundled 1933 Emergency Banking Act PDF, `dist/data.json`, and the 151-event authoring ledger prove only that local bytes have not been altered since curation (2026-11-08). They never certify that a historical claim is true, and they never certify publisher authenticity. The bank-act PDF was fetched by HTTPS GET with standard certificate validation; that is an observed response, not a publisher signature.

Two hash records were corrected during finalization (Phase 7, 2026-11-09) and are no longer open:

- The engineering report (§5.3) previously stated a bank-act PDF hash (`332ee7fb…`) that matched no file in the tree. Corrected in the in-tree report to `2be96cc32f9d1317a45b86b643ddf1171c2484b6a60d81165987d0a7ca727b94`, the hash of both PDF copies, confirmed by two manifests. Report-text discrepancy only; source integrity was never affected.
- `SOURCE_MANIFEST.json` carries a `data_sha256` value (`4c21b49e…`). Its definition is now documented in the in-tree report (§5.3 note) and confirmed by recomputation: it is the SHA-256 of the canonical dataset string (the canonical JSON of `{schema, version, curatedOn, cases}`) without the trailing newline that `scripts/build.py` appends when writing `dist/data.json`. The SHA-256 of the `dist/data.json` file bytes including that newline is `84f16aec…1439`.

## 4. Court orders are pre-trial thresholds, not findings on the merits

In the Israel-Palestine inquiry:

- The ICJ Orders of 26 Jan, 28 Mar, and 24 May 2024 are binding incidental Provisional Measures under Article 41, based on plausibility of rights and imminent risk of irreparable harm. They are not a final judgment on the merits of whether genocide occurred.
- The ICC Pre-Trial Chamber I warrants of 21 Nov 2024 are pre-trial arrest warrants under Rome Statute Article 58(1)(a), on a threshold of reasonable grounds to believe. They are not a trial conviction beyond reasonable doubt under Article 66.

The site presents these with their procedural posture stated. Do not quote them as verdicts.

## 5. What the tool does not do

- **No prediction.** It refuses future-forecast questions ("What will happen in 2030?"). Any answer about the future would be speculation, and the tool says so.
- **No dispute settlement.** It shows competing arguments and where historians disagree. It does not declare a winner in a live political dispute.
- **No automatic verification of historical truth.** No software check in this package can establish that a historical claim is true. What the package verifies is narrower: that the bytes are unchanged, that claims are tied to named sources, that withdrawing a source visibly changes what survives, and that the analogy checks run.
- **No live monitoring.** Source standing is as of curation (2026-11-08). The package does not check whether a source has since been corrected, retracted, or superseded.

## 6. Simulated acceptance is not a real human study

All browser playtests in M4, M4.1, M5, and M5.1 were run in automated headless Chromium and are explicitly labeled `SIMULATED_ACCEPTANCE_EXERCISE_HEADLESS_CHROMIUM_NO_REAL_HUMAN_PARTICIPANT`. Automated checks verify rendering, layout, and interaction flows. They do not show whether a real first-time reader understands the site.

The human comprehension test (15 minutes, 3-5 first-time readers, 4 tasks, per §6 of the engineering report) has **not been run**. The Phase 5 kit is prepared and marked PENDING. That test was originally required before public deployment; on 2026-11-09 the founder authorized publication as a public research preview before the test, with the pending status disclosed in the app itself. Until it runs, any claim that "users understand this" is unproven.

## 7. Test counts are re-run actuals from the final tree

Re-run in Phase 7 (2026-11-09) on the final tree: Node 53/53, Python ledger/baseline 12/12, Mandate-Ledger recall 3/3 — total 68/68, zero failures — and browser playtest 138/138 viewport states with 0 overflows, reproduced with Playwright headless Chromium because the repo's own Selenium script could not run in this VM (no Selenium/ChromeDriver installed). The falsifier finding F1 from Phase 4 (two ordinary-worded false analogies evaded the detectors) was repaired in Phase 7: both are now REJECTED in the engine and the live UI, the 9/9 falsifier sample still passes, and the suites above were re-run after the repair.

## 8. A law establishes authority, not proof of successful implementation

The bundled Emergency Banking Act confirms emergency measures and changes authority for bank conservation and currency issuance. A statute is evidence of what was authorized. It is not, by itself, proof that the measures worked as intended.
