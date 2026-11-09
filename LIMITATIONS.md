# Limitations and Uncertainty Disclosures (v0.3)

Read this before relying on anything in this package. These limits are part of the product, not fine print to skip.

## 1. Two distinct layers: 5 Core Verified Inquiries vs. Provisional Research Inquiries

OpenLine Department of History `v0.3` separates its historical coverage into two explicit layers:

1. **Five Core Verified Inquiries (`VERIFIED_CORE`)**: `cholera` (1854 Broad Street cholera), `triangle` (1911 Triangle Shirtwaist fire), `banking` (1933 U.S. banking crisis), `hormuz` (Strait of Hormuz & maritime energy chokepoints), and `israel-palestine` (Israel–Palestine civilian protection & treaties). These 5 inquiries (44 sources, 105 core records, 15 comparable argument chains) are locked to canonical `dist/data.json` (`data_sha256: 933bfa186b928a91bd6ae365c7c1362070cb5e99848ffe185e72310e93826e4a`) and the 151-event SQLite authoring ledger (`evidence/authoring-ledger/history.sqlite3`, SHA-256 `fb87e229aab88aa03f2c05751450924eed6f4028d481ff4ec03bb1bf778234e3`).
2. **Provisional Research Inquiries (`PROVISIONAL` → `VERIFIED_LOCAL`)**:
   - **Four Researched Provisional Subject Packs (`research/provisional_subjects.json`)**: `espionage` (1939–1978 Signals Intelligence, Satellites & Church Committee Oversight), `influenza-1918` (1918–1919 Influenza Pandemic & Non-Pharmaceutical Interventions across 43 U.S. Cities), `printing-press` (1450–1695 Printing Press, 1643 Licensing Order, 1644 *Areopagitica* & Eisenstein–Johns Debate), and `dust-bowl-1930s` (1930–1940 Great Plains Dust Bowl, 1935 Soil Conservation Act & Long-Run Economic Scarring).
   - **Guided Open-Access Archival Scaffold (`GUIDED_CUSTOM_SCAFFOLD`)**: For any other historical question outside both the 5 core inquiries and the 4 pre-bundled packs (e.g., *"What caused the fall of the Roman Republic?"*), the system generates a non-hallucinating methodological scaffold linked to 6 open-access primary archive portals (Library of Congress, NARA, Yale Avalon, UK National Archives, Smithsonian Open Access, and Digital Inquiry Group). It **does not** fetch live web pages at runtime (the bundle operates 100% offline with zero external network requests and zero paid APIs), so custom scaffold claims remain flagged as `UNVERIFIED_MATERIAL` until a human researcher binds specific archival locators.

## 2. Local promotion (`VERIFIED_LOCAL`) is a reviewer receipt, not canonical repository mutation

When a user or reviewer corrects all `UNVERIFIED_MATERIAL` claims in a provisional inquiry, resolves any active source-standing holds, and clicks **Promote to Verified Status**, `Engine.promoteProvisionalInquiry()` transitions the inquiry to `VERIFIED_LOCAL` and computes a SHA-256 promotion receipt (`openline-provisional-promotion-receipt.v1`). This promotion applies to the local workspace/session (or an isolated provisional SQLite ledger via `scripts/research_subject.py`) and intentionally **never** mutates the canonical 5-inquiry `dist/data.json` or `evidence/authoring-ledger/history.sqlite3` without separate repository curation and founder sign-off.

## 3. Abstract-only and synopsis-only sources in both layers

- In the **5 Core Inquiries**, five sources are `ABSTRACT_ONLY` or `SYNOPSIS_ONLY`: `bank-wigmore`, `tri-mcevoy`, `tri-greenwald`, `hormuz-gholz-press-2010`, and `ip-shlaim-lustick-reviews`.
- In the **4 Provisional Subject Packs**, four historiography sources are curated as `SYNOPSIS_ONLY` to represent secondary scholarly syntheses and test consequential source withdrawal: `esp-andrew-jeffreys-historiography` (`espionage`), `flu-taubenberger-legacy-2020` (`influenza-1918`), `print-johns-2002` (`printing-press`), and `dust-mcleman-worster-cunfer-2014` (`dust-bowl-1930s`), plus `archive-dig-sheg-method` in custom scaffolds.
- The engine strictly forbids attributing verbatim quotations to any `ABSTRACT_ONLY` or `SYNOPSIS_ONLY` source, classifies sole-source claims on them as `UNVERIFIED_MATERIAL` (`SYNOPSIS_ONLY_BASIS`), and allows 1-click consequential withdrawal to verify that all core factual claims survive on full-text primary and institutional records.

## 4. Archival diagrams are source-bound visual reconstructions, not photographs

All 9 interactive SVG archival diagrams (5 core + 4 provisional subject packs, plus the custom epistemic workflow diagram) carry an explicit `DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH` provenance banner citing the primary sources behind each hotspot. The only bundled facsimile original in the offline package is the public-domain [Emergency Banking Act of March 9, 1933 PDF](https://www.govinfo.gov/content/pkg/STATUTE-48/pdf/STATUTE-48-Pg1.pdf) (`dist/originals/bank-act.pdf`, SHA-256 `2be96cc32f9d1317a45b86b643ddf1171c2484b6a60d81165987d0a7ca727b94`).

## 5. Hashes prove local byte integrity — nothing more

SHA-256 digests on the 44 core citation cards, 22 provisional citation cards, `dist/data.json`, the 151-event authoring ledger, and v0.3 promotion receipts prove only that local bytes have not changed since curation or review. They never certify objective historical truth or publisher authenticity.

## 6. Court orders and statutory enactments

- In `israel-palestine`, ICJ Article 41 Provisional Measures Orders (`ip-icj-provisional-2024`) and ICC Article 58 pre-trial arrest warrants (`ip-icc-warrants-2024`) are preliminary procedural rulings, not final trial judgments on the merits.
- In `banking` (1933 Emergency Banking Act), `espionage` (1978 Foreign Intelligence Surveillance Act), `printing-press` (1643 Licensing Order), and `dust-bowl-1930s` (1935 Soil Conservation Act), a statute proves what was legally enacted or authorized—not that implementation succeeded without confounders or unintended consequences.

## 7. Simulated browser acceptance is not a real human usability study

All browser playtests in `v0.3` (`scripts/browser_playtest.py`, recorded in `evidence/BROWSER_PLAYTEST_RESULTS.json`) were executed in real headless Chromium (`SIMULATED_ACCEPTANCE_EXERCISE_HEADLESS_CHROMIUM_NO_REAL_HUMAN_PARTICIPANT`). While automated checks verify layout (`0` horizontal overflows across all viewports), keyboard/ARIA semantics, and end-to-end functional flows across all 5 core inquiries, 4 unfamiliar provisional subjects, and custom scaffolds, the 15-minute human comprehension study with 3–5 real first-time readers remains required before public deployment.

## 8. Eisenstein provisional PDF URL is UNCONFIRMED

The printing-press pack cites Elizabeth L. Eisenstein (2002, *American Historical Review*) at `https://histoire.ens.psl.eu/IMG/pdf/eisenstein-revolution_revisited.pdf`. That URL is **UNCONFIRMED**: both hosts checked were unreachable, and it is not claimed as verified anywhere in this release. Treat the Eisenstein card as provisional / `SYNOPSIS_ONLY` until a reachable copy is confirmed.
