# OpenLine Department of History — v0.3 (Make Historical Exploration Genuinely Useful)

OpenLine Department of History (`v0.3.0`) is a free, open-source ([MIT License](LICENSE)), offline-capable public history experience and civic evidence engine. Built on the verified `v0.2.0` story-first interface and `v0.1.0` evidence engine, `v0.3.0` adds natural-language exploration of **unfamiliar historical subjects** outside the original five dossiers—recognizing coverage boundaries honestly, offering accessible-source research, separating **Verified Evidence**, **Disputed Interpretations**, and **Unverified Material**, and enforcing a strict **Review, Correction, Challenge & Promotion Gate** before promoting new material to verified local status.

## What Is New in v0.3

1. **Recognizes Unfamiliar Historical Subjects Instead of Silently Failing**:
   - When a visitor asks about a historical topic outside the 5 core inquiries (such as *"the history of espionage"*, *"the 1918 influenza pandemic"*, *"the history of the printing press"*, *"the 1930s Dust Bowl"*, or any other historical topic like *"What caused the fall of the Roman Republic?"*), `Engine.detectUnfamiliarHistoricalSubject()` and `Engine.askHistory()` recognize the subject as outside core verified coverage (`outsideVerifiedCoverage: true`) and offer 1-click research using accessible historical sources—while still refusing non-historical future predictions (*"What will happen in 2030?"*) and universal ideological claims.
2. **Three-Tier Epistemic Separation (`Engine.classifyEpistemicStatus`)**:
   - **Tier 1 — `VERIFIED_EVIDENCE`**: Primary archival and official institutional records with verified HTTPS URLs, exact locators, passing SHA-256 card hashes, and active standing.
   - **Tier 2 — `DISPUTED_INTERPRETATION`**: Competing contemporary arguments and rival scholarly schools with distinct causal emphases—never flattened into artificial consensus.
   - **Tier 3 — `UNVERIFIED_MATERIAL`**: Unreviewed provisional claims (`PENDING_REVIEW`), popular myths awaiting primary-locator correction, sole-source `ABSTRACT_ONLY` / `SYNOPSIS_ONLY` items, or quarantined claims.
3. **Four Deeply Researched Provisional Subject Packs + Open-Topic Archival Scaffold (`research/provisional_subjects.json`)**:
   - **Espionage (`espionage`)**: *Secret Intelligence, Technical Collection & Democratic Oversight (1939–1978)* (6 accessible sources: NSA Ultra & Venona, NRO CORONA, 1976 Senate Church Committee Report Book II, CIA CSI SHAMROCK, Andrew/Aldrich/Wark historiography).
   - **1918 Influenza (`influenza-1918`)**: *1918–1919 Influenza Pandemic & Non-Pharmaceutical Interventions* (6 accessible sources: Markel et al. 2007 *JAMA*, Bootsma & Ferguson 2007 *PNAS*, Hatchett et al. 2007 *PNAS*, CDC Stacks U.S. Census Weekly Health Index, Univ. of Michigan Archive, Taubenberger & Morens 2020).
   - **Printing Press (`printing-press`)**: *The Printing Press, Pamphlet Wars & Early Modern Information Regulation (1450–1695)* (5 accessible sources: LoC Gutenberg Bible, June 14, 1643 Parliamentary Licensing Order, Milton's Nov 23, 1644 *Areopagitica*, Eisenstein 2002 *AHR*, Johns 2002 *AHR*).
   - **1930s Dust Bowl (`dust-bowl-1930s`)**: *The 1930s Dust Bowl, Ecological Collapse & New Deal Soil Conservation (1930–1940)* (5 accessible sources: 1935 Soil Conservation Act, 1936 Great Plains Committee Report, Hornbeck 2012 *AER* 779-county study, McLeman et al. 2014 Worster–Cunfer synthesis, NDMC Archive).
   - **Guided Open-Access Archival Scaffold (`GUIDED_CUSTOM_SCAFFOLD`)**: 6 verified open-access repository portals for any other historical question.
4. **Review, Correction, Challenge & Promotion Gate (`Engine.promoteProvisionalInquiry`)**:
   - Blocks promotion (`PROMOTION_BLOCKED`) whenever unreviewed `UNVERIFIED_MATERIAL` remains, a source is under active challenge hold, a citation URL is fabricated/unsafe, a quote is unverified or smuggled onto a synopsis source, or an analogy lacks breakdown limits or commits structural fallacies.
   - Issues a deterministic SHA-256 promotion receipt (`openline-provisional-promotion-receipt.v1`) upon human review and verification.

## Core Verified Inquiries (5 Dossiers, 44 Sources, 105 Core Records, 15 Argument Chains — 100% Preserved)

1. **1854 Broad Street Cholera Outbreak (`cholera`)**
2. **1911 Triangle Shirtwaist Factory Fire (`triangle`)**
3. **1933 U.S. Banking Crisis (`banking`)**
4. **Case A — Strait of Hormuz & Maritime Energy Chokepoints (`hormuz`)**
5. **Case B — Israel–Palestine, Civilian Protection & Durable Arrangements (`israel-palestine`)**

## Verification & Build Commands (Offline Standard Library Only)

```bash
# 1. Deterministic build of dist/data.json, dist/index.html, and root index.html
python3 scripts/build.py && cp dist/index.html index.html

# 2. Verify the hash-chained SQLite authoring ledger (151 events)
python3 scripts/evidence_ledger.py --dir evidence/authoring-ledger verify --expected-head $(python3 -c 'import json;print(json.load(open("evidence/AUTHORING_HEAD.json"))["head"])')

# 3. Run all 74 Node engine, notebook, 9-vector adversarial, v0.2 journey, v0.2 repair, and v0.3 provisional research/promotion tests
node --test tests/*.test.cjs

# 4. Run all 14 Python ledger/baseline/v0.3 tests + 3 upstream Mandate-Ledger recall tests (17 Python tests total)
python3 -m unittest discover -s tests -p "test_*.py" -v
python3 -m unittest discover -s third_party/mandate-ledger -p "test_*.py" -v

# 5. Inspect v0.3 provisional subjects via CLI
python3 scripts/research_subject.py --list

# 6. Run the real headless Chromium browser playtest across Phone, Chromebook, and Desktop
python3 scripts/browser_playtest.py
```
