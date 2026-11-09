# License and Redistribution-Rights Review

Prepared 2026-11-09 from the files in the package tree. No rights asserted beyond what the files themselves state. Where a file is silent, this review says so.

## 1. The project's own code and text — MIT

- `tree/LICENSE`: MIT License, copyright (c) 2026 Terrynce White. Grants use, copy, modification, merger, publication, distribution, sublicensing, and sale, provided the copyright and permission notices are included in all copies or substantial portions. Provided "as is", no warranty.
- `tree/package.json`: `"license": "MIT"`, name `openline-history-lab`, version `0.1.0`, `private: true`. Note: the `private: true` flag is a packaging marker in the source tree; a public release should decide whether to keep or drop it. It does not change the MIT license text. Publication decision 2026-11-09: the founder authorized publication and `private` was flipped to `false` in the published repo; the MIT license text is unchanged.
- The project's own application source (`app.js`, `engine.js`, `styles.css`, `template.html`), scripts, tests, research JSON/Markdown, evidence cards, and documentation are covered by that MIT license as the project's own work, except for the third-party and source-material items below.

## 2. Bundled third-party code — MIT, same copyright holder

- `tree/third_party/mandate-ledger/`: `ledger.py`, `house_clerk_loop.py`, `test_gpt_dependency_recall.py`, plus its own `LICENSE` (MIT, copyright (c) 2026 Terrynce White) and `README.md`. Provenance recorded in `tree/third_party/PROVENANCE.json`: files retrieved 2026-11-08 from `terryncew/mandate-ledger` on GitHub, with per-file blob SHAs listed there.
- `tree/third_party/data/roll283.xml`: a U.S. House Clerk roll-call record (Roll 283, July 23, 2026, H.R. 8884), a public official record used as a frozen fixture. No license file accompanies it in the tree. It is a government record reproduced as data, not code; this review does not assert a license for it beyond noting its public-record character and the source URL recorded in the Mandate Ledger README (`https://clerk.house.gov/evs/2026/roll283.xml`).
- Verdict: the vendored Mandate Ledger code is redistributable under its MIT license with its notices intact. Keep `third_party/mandate-ledger/LICENSE` and `third_party/PROVENANCE.json` in any redistribution.

## 3. Bundled original document — public domain (U.S. federal statute)

- `tree/research/originals/bank-act.pdf` and `tree/dist/originals/bank-act.pdf`: the Emergency Banking Act of March 9, 1933 (48 Stat. 1), fetched 2026-11-08 from govinfo.gov (`https://www.govinfo.gov/content/pkg/STATUTE-48/pdf/STATUTE-48-Pg1.pdf`).
- Rights as recorded in `tree/research/ORIGINALS_MANIFEST.json` and `tree/evidence/bank-act.json`: "US federal government historical work; public domain" / "US federal statute; public domain. Source PDF may be preserved."
- Both copies hash to `2be96cc32f9d1317a45b86b643ddf1171c2484b6a60d81165987d0a7ca727b94` (verified against `SHA256SUMS.txt` and `SOURCE_MANIFEST.json`).
- **Caveat (report-text discrepancy, corrected in Phase 7):** §5.3 of the engineering report previously stated a different hash for this PDF (`332ee7fbd8e57fb2faefeead5eddd4bad5ac1f727d8eb7aa7b0e802c0af33c84`). That string appeared nowhere else in the tree. The in-tree report now states the correct hash `2be96cc32f9d1317a45b86b643ddf1171c2484b6a60d81165987d0a7ca727b94`. The file itself always verified against two manifests, so this was a stale/wrong hash in the report text, not a source-integrity failure.
- Verdict: the PDF is redistributable as a U.S. federal public-domain document, with the govinfo.gov source URL retained.

## 4. The five abstract-only / synopsis-only sources — NOT redistributed as full text

These five sources are represented in the package only as curator cards (paraphrase + link). Their full texts are not in the tree and must not be added without a rights check:

| Source ID | Rights as recorded on its evidence card |
|---|---|
| `bank-wigmore` | Copyrighted; abstract-based paraphrase and link only. Full text may require access. |
| `tri-mcevoy` | Copyright American Bar Foundation 1995. Abstract paraphrased; article not redistributed. |
| `tri-greenwald` | Copyright retained by publisher/author. Synopsis paraphrased; book not redistributed. |
| `hormuz-gholz-press-2010` | Copyright 2010 Taylor and Francis; abstract-verified scholarly paraphrase and link only. |
| `ip-shlaim-lustick-reviews` | Copyright University of California Press / Institute of Historical Research; scholarly review synopsis and link only. |

Verdict: as packaged, these five are links plus short paraphrases, which is how the curators recorded them. Do not expand them into full text in the public package. Any future claim about fair use or fair dealing for the paraphrases is not made here; the paraphrases are short and attributed, and the cards state their limits openly.

## 5. Other sources — links and curator cards, no full text bundled

The remaining 37 of the 42 sources are represented the same way: a curator-written evidence card in `tree/evidence/` with a URL, locator, and notes. No other publisher full text is bundled in the tree. The one attempted second original (`bank-report`, the 1933 Federal Reserve annual report) is recorded as NOT_PRESERVED in `ORIGINALS_MANIFEST.json` (the response exceeded the 10 MiB/PDF acceptance boundary; no complete original retained).

## 6. What a redistributor must keep

1. `tree/LICENSE` (MIT, Terrynce White 2026) with the software and documentation.
2. `tree/third_party/mandate-ledger/LICENSE` with the Mandate Ledger files.
3. `tree/third_party/PROVENANCE.json` so the vendored files can be traced to their upstream blobs.
4. The source URLs and rights notes on every evidence card, and the public-domain attribution for the bank-act PDF.
5. Do not add full text for any of the five sources in §4.

## 7. Open questions (not blockers for a skeleton, must be settled before publication)

- Whether `package.json` keeps `"private": true` in a public release.
- Whether the §5.3 bank-act hash discrepancy is fixed in the report text (see §3 above) — **fixed in Phase 7 (2026-11-09)**; the in-tree report now states the correct hash.
- No independent legal review has been done. This review reads the files; it is not legal advice.
