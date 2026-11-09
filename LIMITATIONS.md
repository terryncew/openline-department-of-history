# Limitations and Uncertainty Disclosures (v0.2)

Read this before relying on anything in this package. These limits are part of the product, not fine print to skip.

## 1. A small, bounded library — not all of history

The package covers **5 inquiries, 44 sources, 105 core records, and 15 comparable argument chains**. That is the whole library. It is a curated set of precedents, not a survey of all human history. Anything outside those five inquiries is outside what the tool can answer, and the tool says so (`SUPPORTED` / `PARTIALLY_SUPPORTED` / `UNSUPPORTED`) rather than guessing or fabricating an analogy.

The five inquiries:
1. 1854 Broad Street cholera outbreak (`cholera`)
2. 1911 Triangle Shirtwaist Factory fire (`triangle`)
3. 1933 U.S. banking crisis (`banking`)
4. Strait of Hormuz and maritime energy chokepoints (`hormuz`)
5. Israel–Palestine civilian protection and durable arrangements (`israel-palestine`)

## 2. Five sources are abstract-only or synopsis-only

Exactly five sources in the 44-source library were not read in full text because full text is behind publisher paywalls or print copyright. They are represented by an official abstract or peer-reviewed published synopsis, paraphrased, with a link and explicit scope constraint — never as full text or verbatim quotes:

- `bank-wigmore` (`ABSTRACT_ONLY`)
- `tri-mcevoy` (`ABSTRACT_ONLY`)
- `tri-greenwald` (`ABSTRACT_ONLY`)
- `hormuz-gholz-press-2010` (`ABSTRACT_ONLY`)
- `ip-shlaim-lustick-reviews` (`SYNOPSIS_ONLY`)

Any claim that rests only on one of these rests on a summary, not on the full work. Both the 3-axis source cards and the v0.2 `Examine the Evidence` mode state this explicitly. The consequential-correction feature exists in part for this reason: challenge a source in `Step 6` or `Examine the Evidence` and see which claims survive without it across `Quick Look`, `Explore`, and `Examine the Evidence`.

## 3. Archival diagrams are source-bound visual reconstructions, not photographs

In `v0.2`, `Step 1 (The Question)` includes 5 interactive SVG archival diagrams (`ARCHIVAL_EXHIBITS` in `engine.js`) with 20 clickable hotspots to make spatial and chronological structures understandable without external network requests. Every exhibit carries an explicit badge (`DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH`) and provenance caption stating which primary sources (`snow1855`, `tri-trial`, `bank-act`, `hormuz-eia-chokepoints`, `ip-armistice-1949`, etc.) establish each hotspot. They must never be cited or mistaken as camera photographs or facsimile scans. The only bundled facsimile original in the offline archive is the public-domain [Emergency Banking Act of March 9, 1933 PDF](https://www.govinfo.gov/content/pkg/STATUTE-48/pdf/STATUTE-48-Pg1.pdf) (`dist/originals/bank-act.pdf`, SHA-256 `2be96cc32f9d1317a45b86b643ddf1171c2484b6a60d81165987d0a7ca727b94`).

## 4. Hashes prove local bytes have not changed — nothing more

SHA-256 checksums on the 44 citation cards, the bundled 1933 Emergency Banking Act PDF, `dist/data.json`, and the 151-event authoring ledger (`evidence/authoring-ledger/history.sqlite3`, SHA-256 `fb87e229aab88aa03f2c05751450924eed6f4028d481ff4ec03bb1bf778234e3`) prove only that local bytes have not been altered since curation (`2026-11-08`). They never certify that a historical claim is objectively true, and they never certify publisher authenticity.

In `v0.2.0`:
- `SOURCE_MANIFEST.json` carries `data_sha256: "933bfa186b928a91bd6ae365c7c1362070cb5e99848ffe185e72310e93826e4a"`, which is the SHA-256 of the canonical dataset JSON string (`{schema, version, curatedOn, cases}`) verified at runtime by `Engine.verifyDataset()` in `engine.js`. The SHA-256 of the `dist/data.json` file on disk (which includes a trailing newline appended by `scripts/build.py`) is `abc519d754a87cd3d6f35074f391400ae6cd849f70304ef02537c5a724d61d9d`. Both hashes changed from `v0.1.0` (`4c21b49e0c46d25ff6898ee044fce6a8e4302fafb4dccb6cd4737aa68d529088` / `84f16aec8a6a120a50c5742da843b5ab2cbbe174c31861c3d3f4d8ab11fd1439`) because the v0.2 dataset gained two sources, one outcome record, and one counterexample (see `RELEASE_NOTES.md`); the authoring ledger is unchanged.

## 5. Court orders are pre-trial thresholds, not findings on the merits

In the Israel–Palestine inquiry (`israel-palestine`):
- The ICJ Orders of 26 Jan, 28 Mar, and 24 May 2024 (`ip-icj-provisional-2024`) are binding incidental Provisional Measures under ICJ Statute Article 41, based on plausibility of rights and imminent risk of irreparable harm. They are not a final judgment on the merits of whether genocide occurred.
- The ICC Pre-Trial Chamber I warrants of 21 Nov 2024 (`ip-icc-warrants-2024`) are pre-trial arrest warrants under Rome Statute Article 58(1)(a), on a threshold of reasonable grounds to believe. They are not a trial conviction beyond reasonable doubt under Article 66.

All three depths in `v0.2` (`Quick Look`, `Explore`, and `Examine the Evidence`) and the plain-language concept cards state this procedural posture explicitly.

## 6. Deterministic keyword/domain question routing — not an open-domain LLM

`Engine.askHistory()` routes ordinary-language citizen questions using deterministic domain token matching, structural sub-facet rules, and fail-closed boundary guardrails (`engine.js`). While `M5.1` and `v0.2` expanded everyday synonyms (covering panics/bank runs, shipping blockades/oil tankers, cholera/water pumps, factory fires/exit doors, ceasefires/civilian protection, and the founding meta-question), unusual phrasings that share zero domain vocabulary with the 5 curated inquiries will return `UNSUPPORTED` rather than guessing. This is an intentional fail-closed design choice: the interface never turns an unsupported question into a confident historical answer.

## 7. Simulated acceptance is not a real human usability study

All browser playtests in `v0.2` (`scripts/browser_playtest.py`, recorded in `evidence/BROWSER_PLAYTEST_RESULTS.json`) were executed in real headless Chromium (`Google Chrome 145.0.7632.6` + `ChromeDriver`) across Phone (`390×844`), Chromebook (`1024×768`), and Desktop (`1280×850` / `1280×900`) viewports and are explicitly labeled `SIMULATED_ACCEPTANCE_EXERCISE_HEADLESS_CHROMIUM_NO_REAL_HUMAN_PARTICIPANT`. Automated browser verification proves layout integrity (`0` horizontal overflows across `273` tested states), keyboard/ARIA semantics, and functional step-through, but it does **not** substitute for testing with real human participants (teenagers, families, and non-specialist adults).

## 8. Verification actuals on the v0.2 tree (2026-11-09)

- **Node test suite (`node --test tests/*.test.cjs`)**: **66/66 PASS** (`59` baseline engine, notebook, 9-vector adversarial, Astra blind, M5.1 held-out, and v0.2 story journey tests + `7` new v0.2 repair tests in `tests/repair_v02.test.cjs`).
- **Python ledger & baseline suite (`python3 -m unittest discover -s tests -p "test_*.py" -v`)**: **13/13 PASS** (`12` baseline tests + `1` new `v0.2` multi-depth and `v0.1.0` comparison test).
- **Upstream Mandate-Ledger recall suite (`python3 -m unittest discover -s third_party/mandate-ledger -p "test_*.py" -v`)**: **3/3 PASS**.
- **Total automated unit/integration tests**: **82/82 PASS, zero failures**.
- **Headless Chromium browser playtest (`python3 scripts/browser_playtest.py`)**: **273/273 viewport-case-depth-step-tab-question states PASS**, `0` horizontal overflows, `0` console errors, `0` external network requests.
- **Independent Playwright re-verification of the repaired tree (2026-11-09)**: **21/21 checks PASS** (desktop 1280×850 and phone 390×844, `0` console errors, `0` page errors), covering every repair in `RELEASE_NOTES.md`.
