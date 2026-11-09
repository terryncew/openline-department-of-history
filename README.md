# OpenLine Department of History — v0.2 (Make History Accessible to Everybody)

OpenLine Department of History (`v0.2.0`) is a free, open-source ([MIT License](LICENSE)), offline-capable public history experience and civic evidence engine. It transforms the `v0.1.0` specialist research interface into a welcoming, story-first experience for ordinary people, teenagers, families, and curious adults—while preserving 100% of the underlying OpenLine evidence engine, 3-axis verification, analogy falsification, and consequential source-withdrawal recall underneath.

## What Is New in v0.2

1. **Welcoming Front Door**: Opens with **"What does history say?"** and *"Something happening today sound familiar? Explore what happened before, what people believed, what they tried, and what happened next."* Provides a plain-English question console, 5 one-click everyday example questions, and 5 visual story cards—reducing initial visible words on load by **62.6%** (`4,114` words in `v0.1.0` → `1,537` words in `v0.2`) and moving cryptographic hashes and specialist controls into a `"How this works ↗"` modal and an expandable specialist drawer.
2. **One Product, Three Progressive Depths**:
   - **Quick Look (~1 min read)**: Understand the complete 6-step historical story, competing arguments, documented outcomes, and analogy limits on a single screen (~260–271 narrative words) with clickable source chips.
   - **Explore (Interactive 6-Step Story Journey)**: Follow **`1. The Question → 2. Back Then → 3. The Debate → 4. What Happened → 5. What’s Different Today → 6. Explore the Evidence`**.
   - **Examine the Evidence (Full Source Ledger & Specialist Lab)**: Inspect all 44 three-axis source cards, trigger consequential source-withdrawal drills, compare arguments across inquiries, and use the 8-tab specialist workbench (`Facts`, `Arguments`, `Timeline`, `Compare`, `Outcomes`, `Historians`, `Falsify`, `Notebook`).
   - All three depths are deterministically generated from the exact same verified dataset (`dist/data.json`, canonical SHA-256 `933bfa186b928a91bd6ae365c7c1362070cb5e99848ffe185e72310e93826e4a`) and stay synchronized when any source is challenged in `notebook.standing`.
3. **Interactive Historical Inquiry Without Trivialization or Gamification**:
   - **Archival Reconstruction Exhibits (Step 1)**: 5 accessible SVG diagrams with 20 source-bound interactive hotspots and explicit `DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH` provenance disclosures, plus 20 plain-language concept explainers (`PLAIN_LANGUAGE_CONCEPTS`).
   - **Swipeable & Keyboard-Accessible Timelines (Step 2)**: Step through chronological events via date pills, `"What happened next?"` buttons, `ArrowLeft`/`ArrowRight` keys, touch swipe, or `"Show all events at once"`.
   - **"What Did People Believe?" Expectation-vs-Outcome Reveals (Step 3)**: Read what contemporaries argued and what policymakers expected before revealing the documented historical outcome and later historiography (with a 1-click `"Reveal all outcomes at once"` toggle).
   - **Before-and-After Analogy Explorer (Step 5)**: Compare `Back Then` vs. `What to Examine Today` across 20 structural dimensions with explicit `"Where this analogy breaks"` warnings and rejected overclaims.
   - **Source-Investigation Challenges (Step 6)**: 5 primary-vs-secondary source corroboration challenges with 1-click live Consequential Correction triggers.
   - **Zero Manipulative Gamification**: No points, streaks, badges, ideological scoring, or entertainment mechanics around human suffering. Restrained motion respects `@media (prefers-reduced-motion: reduce)`.

## Curated Inquiries (5 Dossiers, 44 Sources, 105 Core Records, 15 Argument Chains)

1. **1854 Broad Street Cholera Outbreak (`cholera`)**: *When should a community act on incomplete evidence of a public-health hazard?* Grounded in [John Snow's 1855 monograph](https://www.academia.dk/MedHist/Biblioteket/Print/snow_1855.html) and the [1855 Parish of St. James Cholera Inquiry Report](https://upload.wikimedia.org/wikipedia/commons/1/1c/Report_on_the_cholera_outbreak_in_the_Parish_of_St._James,_Westminster,_during_the_autumn_of_1854_(IA_b21780778).pdf).
2. **1911 Triangle Shirtwaist Factory Fire (`triangle`)**: *What turns warnings about unsafe work into enforceable protection?* Grounded in the [Cornell ILR Triangle Fire Archive](https://trianglefire.ilr.cornell.edu/) and [New York Factory Investigating Commission Fourth Report (1915)](https://trianglefire.ilr.cornell.edu/primary/reports/FourthReportOfFIC).
3. **1933 U.S. Banking Crisis (`banking`)**: *What helps restore trust when a financial system is under strain?* Grounded in the [Emergency Banking Act of March 9, 1933](https://www.govinfo.gov/content/pkg/STATUTE-48/pdf/STATUTE-48-Pg1.pdf) (bundled offline in `dist/originals/bank-act.pdf`) and [FDR's First Fireside Chat of March 12, 1933](https://www.presidency.ucsb.edu/documents/fireside-chat-banking).
4. **Case A — Strait of Hormuz & Maritime Energy Chokepoints (`hormuz`)**: *What can historical maritime chokepoint crises teach us about reducing energy-price shocks without escalating conflict?* Grounded in [U.S. EIA World Oil Transit Chokepoints (2026)](https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints), [U.S. EIA Short-Term Energy Outlook, August 2026 — Global Energy Security Data (Strait of Hormuz tables)](https://www.eia.gov/outlooks/steo/report/energysecurity/article.php), [U.S. EIA Red Sea Analysis (2024)](https://www.eia.gov/todayinenergy/detail.php?id=61363), [U.S. DOE Strategic Petroleum Reserve Quick Facts](https://www.energy.gov/hgeo/opr/spr-quick-facts), [IEA Collective Stock Release Records](https://www.iea.org/news/iea-governing-board-concludes-2022-collective-actions), [U.S. Navy NHHC H-Gram 018-1 on the 1987–1988 Tanker War](https://www.history.navy.mil/about-us/leadership/director/directors-corner/h-grams/h-gram-018/h-018-1.html), [CRS Insight IN11173](https://www.everycrsreport.com/reports/IN11173.html) & [CRS Report R42335](https://www.everycrsreport.com/reports/R42335.html), [UNCTAD Rapid Assessment of the Red Sea Crisis (2024)](https://unctad.org/publication/navigating-troubled-waters-impact-global-trade-disruption-shipping-routes-red-sea-black), [Caitlin Talmadge (International Security, 2008)](https://www.belfercenter.org/publication/closing-time-assessing-iranian-threat-strait-hormuz), [Eugene Gholz & Daryl G. Press (Security Studies, 2010 — Abstract Only)](https://www.tandfonline.com/doi/abs/10.1080/09636412.2010.505865), and [James D. Hamilton (NBER Working Paper 16790, 2011)](https://www.nber.org/papers/w16790).
5. **Case B — Israel–Palestine, Civilian Protection & Durable Arrangements (`israel-palestine`)**: *What documented historical interventions have reduced civilian harm or sustained negotiated arrangements, and under what conditions did they succeed or fail?* Grounded in the [1949 Rhodes General Armistice Agreement (UN Peacemaker)](https://peacemaker.un.org/en/node/9440), [1979 Egypt–Israel Peace Treaty & Multinational Force and Observers (MFO)](https://www.mfo.org/origins), [1993–1995 Oslo I & II Accords](https://peacemaker.un.org/en/node/9432), [1994 Israel–Jordan Treaty of Peace](https://peacemaker.un.org/en/node/9431), [UN OCHA Phase One Ceasefire Operational Report (March 2025)](https://www.ochaopt.org/content/report-humanitarian-response-un-and-humanitarian-partners-during-phase-one-ceasefire), [IPC Acute Food Insecurity & Famine Review Committee Gaza Reports (2025–2026)](https://www.ipcinfo.org/ipc-country-analysis/en/?country=PSE), [ICJ Case 192 Provisional Measures Orders (Jan/Mar/May 2024)](https://www.icj-cij.org/case/192/orders), [ICJ Case 186 Advisory Opinion (July 19, 2024)](https://www.icj-cij.org/case/186/advisory-opinions), [ICC Pre-Trial Chamber I Article 58 Arrest Warrants (Nov 21, 2024)](https://www.icc-cpi.int/news/situation-state-palestine-icc-pre-trial-chamber-i-rejects-state-israels-challenges), [Carnegie Endowment Comparative Peace-Process Analysis (Feb 2026)](https://carnegieendowment.org/research/2026/02/gaza-trump-board-of-peace-negotiations-israel-lessons-from-oslo), and [IHR Review #153](https://reviews.history.ac.uk/review/153/) / [JPS Book Review Synthesis](https://online.ucpress.edu/jps/article/49/4/145/111934/Review-Paradigm-Lost-From-Two-State-Solution-to).

## Verification & Build Commands (Offline Standard Library Only)

```bash
# 1. Deterministic build of dist/data.json, dist/index.html, and root index.html
python3 scripts/build.py && cp dist/index.html index.html

# 2. Verify the hash-chained SQLite authoring ledger (151 events)
python3 scripts/evidence_ledger.py --dir evidence/authoring-ledger verify --expected-head $(python3 -c 'import json;print(json.load(open("evidence/AUTHORING_HEAD.json"))["head"])')

# 3. Run all 66 Node engine, notebook, 9-vector adversarial, Astra blind, M5.1, v0.2 journey, and v0.2 repair tests
node --test tests/*.test.cjs

# 4. Run all 13 Python ledger/baseline tests + 3 upstream Mandate-Ledger recall tests (16 Python tests total)
python3 -m unittest discover -s tests -p "test_*.py" -v
python3 -m unittest discover -s third_party/mandate-ledger -p "test_*.py" -v

# 5. Generate and evaluate the Conventional Searchable Reference Baseline & v0.2 Comparison
python3 scripts/conventional_baseline.py

# 6. Run the real headless Chromium browser playtest across Phone, Chromebook, and Desktop (273 states)
python3 scripts/browser_playtest.py
```

## Key v0.2 Documentation

- `LIMITATIONS.md` — Explicit scope, coverage, procedural, and simulated-testing limitations.
