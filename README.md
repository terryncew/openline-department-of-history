# OpenLine Department of History — v0.1.0

A free, open-source, offline civic research tool. Ask a contemporary question in plain language and see what documented history says: what people argued, what was tried, what actually happened, where historians later disagreed, and where the comparison to today stops working.

**Status: published 2026-11-09 as a public research preview (v0.1.0). This repo is the M5.1 release candidate plus the Phase 3 product fix (citizen-question routing vocabulary in `engine.js`, rebuilt `dist/index.html`), the Phase 7 falsifier repair (F1, see below), the Phase 7 report-text corrections (§5.3 bank-act hash; `data_sha256` definition), and the Phase 2a publication fixes (public-research-preview and human-study disclosures in the app UI, `private: false`, root `index.html` for GitHub Pages). Verification numbers below are re-run actuals from the final tree, re-verified on the staged public tree — not the engineering report's claims.**

## What an ordinary citizen can actually do with it

- **Ask a contemporary question in your own words.** For example: "What happened when governments responded to banking panics?" or "What can history tell us about a prolonged Strait of Hormuz disruption?" The site routes the question to one of five curated inquiries and answers with evidence, or refuses clearly when the question is outside what it covers.
- **Explore documented precedents.** Five inquiries: the 1854 Broad Street cholera outbreak, the 1911 Triangle Shirtwaist fire, the 1933 U.S. banking crisis, the Strait of Hormuz and maritime energy chokepoints, and Israel-Palestine civilian protection and durable arrangements. 42 sources, 104 records, 15 argument chains.
- **Inspect the evidence.** Every claim links to a source card. The 3-Axis Source Inspector shows what each source is and where it is thin. Five sources are abstract-only or synopsis-only (see LIMITATIONS.md); the site says so rather than pretending to have the full text.
- **See where the analogy stops.** The Compare and Falsify tab tests a plausible-sounding analogy and shows the physical, demographic, or legal difference that breaks it.
- **Watch a correction happen.** Withdraw a source, or run the consequential-correction test, and the site shows which claims were set aside, which narrowed to the sources that remain, and which were untouched.

## What it does not do

It does not predict the future (it refuses "What will happen in 2030?"). It does not settle political disputes. It does not automatically verify that a historical claim is true. Hashes in this package prove the files have not changed since curation; they never prove the history is correct. See LIMITATIONS.md.

## Installation and use

No installation, no account, no network needed. The built site is a static page.

Option A — open the file directly:

1. Unzip the release.
2. Open `index.html` in any modern browser. It works from `file://` with zero external network calls.

Option B — serve it locally:

```bash
python3 -m http.server 8000 --directory dist
# Open http://localhost:8000 in your browser
```

To rebuild the built page from source (optional):

```bash
python3 scripts/build.py
```

Requirements: a modern browser for use; Python 3 (standard library only) for the build and ledger checks; Node.js 18+ only if you want to run the JavaScript tests.

## How to verify

From the repo root:

```bash
# 1. Verify every file in the public tree against the public manifest
#    (SHA256SUMS.txt lists every file except itself)
sha256sum -c SHA256SUMS.txt

# 2. Verify the authoring ledger (151 events; head hash in evidence/AUTHORING_HEAD.json)
python3 scripts/evidence_ledger.py --dir evidence/authoring-ledger verify --expected-head $(python3 -c 'import json;print(json.load(open("evidence/AUTHORING_HEAD.json"))["head"])')

# 3. Run the test suites
node --test tests/*.test.cjs
python3 -m unittest discover -s tests -p "test_*.py" -v
python3 -m unittest discover -s third_party/mandate-ledger -p "test_*.py" -v
```

Re-run actuals on the final tree (2026-11-09, Phase 7): Node 53/53, Python ledger/baseline 12/12, Mandate-Ledger recall 3/3, total 68/68, zero failures. Ledger verify (run on a copy, since the documented verify step mutates the shipped `history.sqlite3` file bytes; content unchanged): 151 events, head `f978269a4ddd55c03189f313813c7494106ea0175d1c529b98aa6fcd2edf8ca0`, hash chain valid. Browser playtest: 138/138 viewport states, 0 overflows, 0 console errors, 0 external network requests — reproduced with Playwright headless Chromium, because the repo's own Selenium playtest script could not run in this VM (no Selenium/ChromeDriver installed). The browser playtest is explicitly labeled a simulated headless-Chromium exercise with no real human participant; the human comprehension test (Phase 5 kit) is still PENDING. The founder authorized publication as a public research preview before that test on 2026-11-09, and the pending status is disclosed in the app itself.

Falsifier finding F1 (Phase 4): two fresh ordinary-worded false analogies had evaded the live Analogy Falsifier. FIXED in Phase 7 by broadening the detector patterns in `engine.js` (deterministic/permanence phrasing, "caused only by" / single-decisive-cause phrasing, "fundamentally safe" fireproof-shell phrasing). Both evaded fallacies are now REJECTED in the engine and in the live UI, the 9/9 falsifier sample still passes, all valid controls still return DEFENSIBLE_WITH_LIMITS, and all suites still pass (see above). No wording-narrowing fallback was needed.

## Finalization record (Phase 7, 2026-11-09)

1. Base tree copied from the Phase 3 product agent's fixed tree; diff vs the RC original verified as exactly `engine.js` + `dist/index.html` before any further change. The shipped `history.sqlite3` bytes are the pristine RC-original bytes (SHA-256 `fb87e229aab88aa03f2c05751450924eed6f4028d481ff4ec03bb1bf778234e3`).
2. F1 falsifier repair applied to `engine.js` and `dist/index.html` rebuilt with the repo's own `scripts/build.py` (`dist/data.json` byte-identical after rebuild; `data_sha256` unchanged).
3. In-tree report corrected: §5.3 bank-act PDF hash now `2be96cc32f9d1317a45b86b643ddf1171c2484b6a60d81165987d0a7ca727b94` (was stale `332ee7fb…`), and a note added defining `SOURCE_MANIFEST.json` `data_sha256` as the SHA-256 of the canonical dataset string without the trailing newline `build.py` appends to `dist/data.json`.
4. Full suites re-run after all edits: Node 53/53, Python 12/12, Mandate-Ledger recall 3/3 (68/68); browser 138/138 reproduced via Playwright; F1 probe (9/9 + 2 evaded + valid controls + guardrails) all PASS.
5. Package manifest recomputed from scratch: `cd tree && find . -type f | sort | xargs sha256sum > ../PACKAGE_TREE_SHA256SUMS.txt` (136 entries), verified with `sha256sum -c`.

Note on manifests: the release candidate's own manifest (135 entries) is superseded by the public manifest `SHA256SUMS.txt` at the repo root, which lists every file in the public tree except itself. The RC manifest fails on the files intentionally changed since the RC (`engine.js`, `dist/index.html`, `M5_FINAL_RECOVERY_AND_QUALIFICATION_REPORT.md`, plus the Phase 2a publication changes); that is expected. The RC manifest itself is preserved in the release history, not in this tree.

## Publication record (Phase 2a, 2026-11-09)

Staged for publication from the final package tree. Changed vs the final tree: `template.html` (both disclosures added to footer and method dialog), `dist/index.html` (rebuilt with `scripts/build.py`; `data_sha256` unchanged), `package.json` (`private: false`), `README.md` (this file, adapted to the repo layout), `SHA256SUMS.txt` (replaced by the public manifest). Added at the repo root: `index.html` (copy of the rebuilt `dist/index.html`, the GitHub Pages entry point), `LIMITATIONS.md`, `RELEASE_NOTES.md`, `LICENSE_REVIEW.md`, `PRODUCT_DESCRIPTION.md`. Nothing removed. The RC manifest (135 entries) is superseded by the public manifest `SHA256SUMS.txt` (140 entries — every file in the public tree except the manifest itself), verified with `sha256sum -c`. The founder authorized publication as a public research preview before the §6 human comprehension test on 2026-11-09; the test remains PENDING and is disclosed in the app.

- **Offline:** the built page makes zero external network requests (Content Security Policy `default-src 'self'`, `connect-src 'self'`). Once downloaded, it works with no connection. The bundled 1933 Emergency Banking Act PDF is included in the package (`dist/originals/bank-act.pdf` and `research/originals/bank-act.pdf`).
- **Keyboard and screen use:** the page uses real buttons and form controls, labelled regions (`aria-label` on the question form and briefing region, `aria-live="polite"` on the briefing), and a skip-style main landmark (`<main id="main" tabindex="-1">`). The automated playtest checked keyboard focus and print CSS.
- **Not yet tested:** no screen-reader testing with a real assistive-technology user has happened, and no real-human usability testing has happened (that is the pending Phase 5 test). Do not claim the site is screen-reader verified. If you use a screen reader and find a barrier, that is a reportable defect, not a user error.
- **Viewports:** the playtest covered phone (390x844), Chromebook (1024x768), and desktop (1280x850). Text is plain HTML; browser zoom and text scaling apply normally.

## License and redistribution

MIT License, copyright (c) 2026 Terrynce White — see `LICENSE` and `LICENSE_REVIEW.md`. The bundled third-party material has its own terms; the review records what is redistributable and the one rights caveat that matters (five copyrighted sources are represented only as abstract/synopsis paraphrases with links, never as redistributed full text).

## Contents

- `index.html` — the built single-file app (same build as `dist/index.html`); open this in a browser.
- `dist/` — the built app and its data (`dist/index.html`, `dist/data.json`), plus the bundled 1933 Emergency Banking Act PDF in `dist/originals/`.
- `app.js`, `engine.js`, `template.html`, `styles.css` — the app source; rebuild with `python3 scripts/build.py`.
- `evidence/`, `research/`, `scripts/`, `tests/`, `third_party/` — evidence cards, research data, build/ledger scripts, test suites, and bundled third-party code.
- `SHA256SUMS.txt` — SHA-256 manifest of the public tree (every file except the manifest itself). Verify with `sha256sum -c SHA256SUMS.txt`.
- `LIMITATIONS.md` — what the package does not cover and what it cannot prove.
- `RELEASE_NOTES.md` — release notes for v0.1.0.
- `PRODUCT_DESCRIPTION.md` — one-page plain-language description.
- `LICENSE_REVIEW.md` — license and redistribution-rights review.
