# Release Notes — OpenLine Department of History v0.1.0

## Status: PUBLISHED 2026-11-09 as a public research preview (v0.1.0)

Version 0.1.0, per `package.json` (`openline-history-lab`, MIT, `private: false` for publication). Published 2026-11-09 as a public research preview from the Phase 3 fixed tree plus the Phase 7 F1 falsifier repair, report-text corrections, and the Phase 2a publication fixes (public-research-preview and human-study disclosures in the app UI, `private: false`, root `index.html` for GitHub Pages). Verification numbers below are re-run actuals on the final tree, re-verified on the staged public tree. The human comprehension test (Phase 5 kit) remains PENDING and is disclosed in the app; the founder authorized publication as a public research preview before that test on 2026-11-09.

## What this release is

A free, open-source, offline civic research tool. Ask a contemporary question in plain language; inspect documented historical precedents, competing arguments, source evidence, and the limits of the analogy. Five curated inquiries, 42 sources, 104 records, 15 argument chains.

## What is in it

- Self-contained static site (root `index.html`, the same build as `dist/index.html`; zero external network requests).
- Question-to-History routing for ordinary-language citizen questions, with SUPPORTED / PARTIALLY_SUPPORTED / UNSUPPORTED answers and explicit refusals for forecasts and ideological determinism.
- Comparable Historical Arguments matrix and cross-inquiry argument comparator.
- 3-Axis Source Inspector and live Analogy Falsifier.
- Consequential correction: withdrawing a source visibly quarantines sole-source claims and narrows the rest.
- Hash-chained authoring ledger (151 events) and full test suites (Node + Python).
- Bundled original: the Emergency Banking Act of March 9, 1933 (public domain, govinfo.gov), in `dist/originals/` and `research/originals/`.

## Verification (re-run actuals on the final tree, Phase 7, 2026-11-09)

- Node tests: 53/53 PASS (engine + notebook 12/12; adversarial and cases 41/41, including 3 new M5.1 held-out challenges).
- Python ledger/baseline: 12/12 PASS.
- Mandate-Ledger upstream recall: 3/3 PASS.
- Total: 68/68 PASS, zero failures.
- Browser playtest: 138/138 viewport states, 0 overflows, 0 console errors, 0 external requests — reproduced with Playwright headless Chromium (the repo's Selenium script could not run in this VM: no Selenium/ChromeDriver); explicitly simulated headless Chromium, no real human participant.
- Ledger verify (run on a copy): 151 events, head `f978269a4ddd55c03189f313813c7494106ea0175d1c529b98aa6fcd2edf8ca0`, hash chain valid.
- Manifests: the RC's own manifest (135 entries) is superseded by the public manifest `SHA256SUMS.txt` at the repo root (140 entries — every file in the public tree except the manifest itself), verified: all entries OK. RC zip SHA-256 `2dcc0061386bc07ac9188023eb154f4ed40e005a9af0e6c3f3602625c4677a6c` matched its recorded manifest (Phase 1).

## Known issues carried into this release

1. **Human comprehension test not done.** The §6 protocol (15 minutes, 3-5 first-time readers, 4 tasks) remains PENDING. Kit prepared (Phase 5); no participants recruited. It was originally required before public deployment; on 2026-11-09 the founder authorized publication as a public research preview before the test, with the pending status disclosed in the app.
2. **Report §5.3 bank-act hash — CORRECTED in Phase 7.** The report previously stated `332ee7fb…`; both PDF copies hash to `2be96cc32f9d1317a45b86b643ddf1171c2484b6a60d81165987d0a7ca727b94`, confirmed by two manifests, and the in-tree report now states the correct value.
3. **`SOURCE_MANIFEST.json` `data_sha256` — DEFINED in Phase 7.** Value `4c21b49e…` is the SHA-256 of the canonical dataset string without the trailing newline `build.py` appends to `dist/data.json`; documented in the in-tree report (§5.3 note) and confirmed by recomputation.
4. **Falsifier finding F1 (Phase 4) — FIXED in Phase 7.** Two ordinary-worded false analogies had evaded the phrase-list detectors; the detector patterns in `engine.js` were broadened (deterministic/permanence phrasing, "caused only by" / single-decisive-cause phrasing, "fundamentally safe" fireproof-shell phrasing). Both are now REJECTED in the engine and the live UI; the 9/9 falsifier sample, all valid controls, the guardrails, and all suites were re-run after the repair with no regressions.
5. **Four defects (M5-1 to M5-4) claimed repaired in M5.1** (citizen-question routing, false-analogy evasion, simultaneous source withdrawal, missing standing badges). Repairs independently re-verified live by the product agent (Phase 3) and the claims agent (Phase 4); the routing fix covers the four tested novel phrasings plus close variants, not all ordinary language (see LIMITATIONS.md).
6. **Five abstract-only/synopsis-only sources** (`bank-wigmore`, `tri-mcevoy`, `tri-greenwald`, `hormuz-gholz-press-2010`, `ip-shlaim-lustick-reviews`). See LIMITATIONS.md.

## Upgrade and compatibility

First public release candidate. No prior public version exists, so there is no upgrade path. The built site is static and offline; future releases should keep `dist/index.html` openable from `file://` with no network.
