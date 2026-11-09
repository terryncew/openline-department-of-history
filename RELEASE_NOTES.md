# Release Notes — OpenLine Department of History v0.3.0 (Public Release)

## Status: PUBLIC RELEASE v0.3.0 (2026-11-09)

Published from the independently repaired v0.3 tree, rebased onto published `v0.2.0` (`terryncew/openline-department-of-history`, tag `v0.2.0`, main `08ee3782`; canonical dataset SHA-256 `933bfa186b928a91bd6ae365c7c1362070cb5e99848ffe185e72310e93826e4a`).

Version `0.3.0` (`package.json`, `Engine.V03_VERSION = "0.3.0"`). Rebased onto published `v0.2.0` (`terryncew/openline-department-of-history`, tag `v0.2.0`, main `08ee3782`; canonical dataset SHA-256 `933bfa186b928a91bd6ae365c7c1362070cb5e99848ffe185e72310e93826e4a`). Restores all v0.2.0 repairs (F1–F4, F9, 2 sources, 1 record, 4 corrected texts, repair test suite) on top of the v0.3 provisional-research capability. Preserves 100% of the five core inquiries, authority controls, SHA-256 receipts, 151-event SQLite authoring ledger (`fb87e229aab88aa03f2c05751450924eed6f4028d481ff4ec03bb1bf778234e3`), and all existing tests.

## What Is New in v0.3.0

1. **Unfamiliar Subject Recognition & Accessible-Source Research Offer (`Engine.detectUnfamiliarHistoricalSubject`, `Engine.askHistory`)**:
   - Recognizes when a natural-language question asks about a historical topic outside the 5 core verified inquiries (such as *"the history of espionage"*, *"the 1918 influenza pandemic"*, *"the history of the printing press"*, *"the 1930s Dust Bowl"*, or any other historical topic like *"What caused the fall of the Roman Republic?"*) instead of silently failing or ending at a static refusal.
   - Continues to fail closed (`UNSUPPORTED`, `isResearchableHistoricalSubject: false`) on non-historical future predictions (*"What will happen in 2030?"*), universal ideological claims, and superficial false-friend keyword traps.
   - Renders an interactive **Research Offer Card** in the Front Door Question Console previewing accessible primary, institutional, and scholarly sources and offering a 1-click transition to generate a provisional inquiry.

2. **Three-Tier Epistemic Status Separation (`Engine.classifyEpistemicStatus`, `Engine.summarizeEpistemicBreakdown`)**:
   - Explicitly separates and badges every claim, argument, interpretation, and source across both core and provisional inquiries into:
     - **Tier 1 — `VERIFIED_EVIDENCE`**: Primary archival and official institutional records with verified HTTPS URLs, exact locators, passing SHA-256 card hashes, and active standing.
     - **Tier 2 — `DISPUTED_INTERPRETATION`**: Competing contemporary arguments and rival scholarly schools kept visibly plural.
     - **Tier 3 — `UNVERIFIED_MATERIAL`**: Unreviewed provisional claims (`PENDING_REVIEW`), popular myths awaiting primary-locator correction, sole-source `ABSTRACT_ONLY` / `SYNOPSIS_ONLY` claims, or quarantined items.

3. **Provisional Inquiry Generation Across 4 Dogfooded Unfamiliar Subjects + Custom Archival Scaffolds (`Engine.researchHistoricalSubject`, `scripts/research_subject.py`)**:
   - **Espionage (`espionage`)**: *Secret Intelligence, Technical Collection & Democratic Oversight (1939–1994)* — 8 accessible sources (NSA Ultra & Venona, NRO CORONA, 1976 Senate Church Committee Report Book II, CIA CSI SHAMROCK, Andrew/Aldrich/Wark historiography, plus the 1994 Aldrich Ames exposure case: FBI Famous Cases and the DOJ OIG 1997 review).
   - **1918 Influenza (`influenza-1918`)**: *1918–1919 Influenza Pandemic & Non-Pharmaceutical Interventions* — 6 accessible sources (Markel et al. 2007 *JAMA*, Bootsma & Ferguson 2007 *PNAS*, Hatchett et al. 2007 *PNAS*, CDC Stacks U.S. Census Weekly Health Index, Univ. of Michigan Archive, Taubenberger & Morens 2020).
   - **Printing Press (`printing-press`)**: *The Printing Press, Pamphlet Wars & Early Modern Information Regulation (1450–1695)* — 5 accessible sources (LoC Gutenberg Bible, June 14, 1643 Parliamentary Licensing Order, Milton's Nov 23, 1644 *Areopagitica*, Eisenstein 2002 *AHR*, Johns 2002 *AHR*).
   - **1930s Dust Bowl (`dust-bowl-1930s`)**: *The 1930s Dust Bowl, Ecological Collapse & New Deal Soil Conservation (1930–1940)* — 5 accessible sources (1935 Soil Conservation Act, 1936 Great Plains Committee Report, Hornbeck 2012 *AER* 779-county study, McLeman et al. 2014 Worster–Cunfer synthesis, NDMC Archive).
   - **Guided Open-Access Archival Scaffold (`GUIDED_CUSTOM_SCAFFOLD`)**: 6 verified open-access repository portals for any other historical topic.
   - Every provisional inquiry is immediately explorable across all **6 story steps** and **3 reading depths** (`Quick Look`, `Explore`, `Examine the Evidence`), complete with custom SVG archival reconstruction diagrams and source-investigation challenges.

4. **Review, Correction, Source Challenge & Promotion Gate (`Engine.correctProvisionalClaim`, `Engine.quarantineProvisionalClaim`, `Engine.validateProvisionalInquiry`, `Engine.promoteProvisionalInquiry`)**:
   - Blocks promotion (`PROMOTION_BLOCKED`) whenever unreviewed `UNVERIFIED_MATERIAL` remains, a source is under active challenge hold, a citation URL is fabricated/unsafe, a quote is unverified or smuggled onto a synopsis source, or an analogy lacks breakdown limits or commits structural fallacies.
   - Once reviewed and corrected with a signed reviewer note, promotes the inquiry to `VERIFIED_LOCAL` and issues a deterministic SHA-256 promotion receipt (`openline-provisional-promotion-receipt.v1`).

## Verification Actuals on the Final v0.3 Tree (2026-11-09)

- **Node tests (`node --test tests/*.test.cjs`)**: **74/74 PASS** (`53` baseline engine/notebook/adversarial + `10` v0.2 story journey + `7` v0.2 repair + `4` v0.3 provisional research/promotion).
- **Python ledger & baseline tests (`python3 -m unittest discover -s tests -p "test_*.py" -v`)**: **14/14 PASS**.
- **Mandate-Ledger upstream recall tests (`python3 -m unittest discover -s third_party/mandate-ledger -p "test_*.py" -v`)**: **3/3 PASS**.
- **Total automated unit/integration tests**: **91/91 PASS, zero failures** (74 Node + 14 Python ledger/baseline + 3 Mandate-Ledger upstream).
- **Real headless Chromium browser playtest (`python3 scripts/browser_playtest.py`)**: **PASS** across Phone (`390×844`), Chromebook (`1024×768`), and Desktop (`1280×850` / `1280×900`) viewports, including end-to-end verification of `espionage`, `influenza-1918`, `printing-press`, `dust-bowl-1930s`, and custom Roman Republic scaffold (`0` horizontal overflows, `0` console errors, `0` external network requests).

## Known Limitations at Release (2026-11-09)

- **Eisenstein provisional PDF URL UNCONFIRMED.** The printing-press pack cites Elizabeth L. Eisenstein (2002, *American Historical Review*) at `https://histoire.ens.psl.eu/IMG/pdf/eisenstein-revolution_revisited.pdf`. That URL remains **UNCONFIRMED**: both hosts checked were unreachable, and it is **not** claimed as verified anywhere in this release. Treat the Eisenstein card as `SYNOPSIS_ONLY` / provisional until a reachable copy is confirmed.
- **§6 human comprehension study still PENDING.** Automated acceptance and browser verification tests were performed; no independent human comprehension study has occurred yet (see `LIMITATIONS.md` §7).
- This is a research preview, not an official government institution. Historical coverage is incomplete: 5 curated core inquiries plus 4 provisional packs and a guided archival scaffold.

## v0.3 Repair (2026-11-09, rebased onto published v0.2.0)

- Rebased the candidate onto published v0.2.0: restored engine repairs F1 (universal-proof/exact-count refusal), F2 (Quick Look/packet withholding + banner before claim + blocked() on Step 4/Examine), F3 (cross-domain deterministic-mapping rejection), F4 (verifiedQuote requires a bundled original; unverifiedQuotation flags), the F9 Hormuz framing (de facto near-closure, EIA STEO Aug 2026, Feb 28 2026, oil 21.6→14.9→4.9 mb/d, LNG 10.5→7.4→0.8 Bcf/d), sources `tri-dyrud-insurance` and `hormuz-eia-2026-closure`, record `hormuz-outcomes-4`, the 4 corrected core texts, and `tests/repair_v02.test.cjs` (7 tests). Core dataset is now 44 sources / 105 records (`data_sha256 933bfa18…`, identical to published v0.2.0).
- Hardened the provisional promotion gate: a card-less or URL-forged source now blocks promotion with `FABRICATED_OR_INVALID_CITATION` (URL checked against the bundled citation card) instead of crashing or certifying a forgery; corrections may only bind to verifiable sources; universal-proof questions are refused with no research offer or scaffold; promotion receipts record the actual promotion time.
- Espionage pack gains the Aldrich Ames human spy-ring exposure case (arrest 21 Feb 1994, guilty plea and life sentence 28 Apr 1994, at least ten sources executed), bound to two verified institutional sources (FBI, DOJ OIG). Pack is now 8 sources, 1939–1994, with exactly one unreviewed claim (`espionage-facts-6`) as before.
- Custom archival scaffolds badge generic procedural items as `SCAFFOLD_GUIDANCE`, never `VERIFIED_EVIDENCE`.
- Visible branding now reads v0.3 throughout (title, eyebrow, footer); scope notice reads 44 sources / 105 core records.
