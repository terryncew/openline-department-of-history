# Release Notes — OpenLine Department of History v0.2.0

## Status: PUBLIC RELEASE (2026-11-09)

Version `0.2.0` (`package.json`, `Engine.UI_VERSION = "0.2.0"`, `private: false`).
Built from published baseline `v0.1.0` (commit `b1686b284b17f814781342547547dda5af90f0bb`,
tag `v0.1.0`). Public repository: `https://github.com/terryncew/openline-department-of-history`;
live site: `https://terryncew.github.io/openline-department-of-history/`.

This is a public research preview, not an official government institution. It covers
five curated historical inquiries (44 sources, 105 core records, 15 comparable
argument chains) — incomplete historical coverage by design. No independent human
comprehension study has occurred yet; the §6 comprehension-test gate is still
PENDING (see "Known limits" below).

## What changed from v0.1.0

### 1. Front Door Rebuild (`template.html`, `styles.css`, `app.js`, `engine.js`)

- Headline: **`What does history say?`**
- Supporting text: **`"Something happening today sound familiar? Explore what happened before, what people believed, what they tried, and what happened next."`**
- Prominent plain-English question input with 5 inviting one-click example questions
  (`Engine.FRONT_DOOR_SAMPLE_QUESTIONS`) and a 5-card visual story selector.
- Reduced initial visible words on desktop load from **4,114 words** (`v0.1.0`) to
  **1,537 words** (`v0.2.0`, **-62.6%**) and initial scroll height from **9,962 px** to
  **4,607 px** (**-53.8%**).
- Moved cryptographic SHA-256 manifest details into an on-demand `"How this works ↗"`
  dialog and tucked the 8-tab specialist workbench inside an expandable
  `<details id="workbench-drawer">` drawer underneath the main story journey.

### 2. 6-Step Interactive Story Journey (`Engine.STORY_STEPS`, `Engine.buildStoryJourney`)

- `Step 1: The Question` — Plain-language stakes, why people compare this to today,
  interactive SVG archival reconstruction exhibit with 4 clickable hotspots
  (`Engine.ARCHIVAL_EXHIBITS`), and 4 expandable plain-language concept cards
  (`Engine.PLAIN_LANGUAGE_CONCEPTS`).
- `Step 2: Back Then` — Swipeable and keyboard-accessible (`ArrowLeft`/`ArrowRight`)
  chronological timeline stepper with `"What happened next?"` progression and a
  `"Show all events at once"` toggle.
- `Step 3: The Debate` — Interactive `"What did people believe?"`
  expectation-vs-outcome reveals across all 15 comparable argument chains, allowing
  visitors to test what contemporaries expected before revealing the documented outcome
  and later historiography.
- `Step 4: What Happened` — Documented outcomes with explicit confounders and
  uncertainty boxes, paired with decisive historical counterexamples and competing
  historians' interpretations.
- `Step 5: What's Different Today` — Interactive Before-and-After comparison explorer
  (`Back Then` vs. `What to Examine Today`) with dimension filter pills, explicit
  `"Where this analogy breaks"` banners, and rejected analogies.
- `Step 6: Explore the Evidence` — Interactive Source-Investigation Challenges
  (`Engine.SOURCE_INVESTIGATION_CHALLENGES`) comparing primary vs. secondary records,
  1-click Consequential Correction triggers, and the 3-axis source card grid.

### 3. Three Progressive Reading Depths (`Engine.DEPTH_LEVELS`)

- `Quick Look` (~1 min read, ~260–271 narrative words across all 6 steps on one screen).
- `Explore` (Interactive 6-step story journey).
- `Examine the Evidence` (Full 3-axis source ledger, live consequential correction
  workbench, and 8 specialist tabs).
- All three depths share the exact same verified underlying dataset (`dist/data.json`,
  canonical SHA-256 `933bfa186b928a91bd6ae365c7c1362070cb5e99848ffe185e72310e93826e4a`)
  and automatically reflect any source challenge in `notebook.standing`.

### 4. Nine defects repaired after independent qualification (F1–F9)

Independent acceptance and adversarial review of the v0.2 candidate found nine
material defects; all nine are repaired in this release and covered by 7 new
regression tests (`tests/repair_v02.test.cjs`):

- **F1 — Universal-proof / exact-count / pre-trial-as-conviction questions returned
  SUPPORTED.** Now refused (`UNSUPPORTED / UNIVERSAL_PROOF_OR_EXACT_COUNT_REFUSED`):
  "does the Triangle fire prove regulation always wins", "did Snow prove the pump
  handle saved exactly 500 lives", "is the ICJ provisional measures order a genocide
  conviction", and variants.
- **F2 — Withdrawn sole-source claims displayed verbatim.** Withdrawing a sole source
  now withholds the dependent claim text everywhere (Quick Look, Examine cards, Step 4
  counterexamples, concepts, exhibit hotspots) instead of showing it under a banner.
- **F3 — Deterministic 1:1 cross-domain analogy accepted.** "The 1933 bank holiday
  proves a 2026 government crypto freeze would work identically" is now REJECTED
  (`CROSS_DOMAIN_DETERMINISTIC_MAPPING_ERROR`); defensible comparisons are unchanged.
- **F4 — Fabricated quotes passed validation and rendered unflagged.** A quoted
  verbatim claim now requires a bundled original for verification; visitor-quoted
  wording in challenges and worksheets is flagged `UNVERIFIED QUOTATION — visitor
  wording, not a verified source quote`.
- **F5 — Triangle civil-suit settlement date wrong.** Corrected to March 11, 1914
  ($75 per life lost), per the cited Cornell `tri-trial` source.
- **F6 — Attribution and garble slips.** Cholera "40 Broad Street feet from the pump
  well" corrected to "2 feet 8 inches"; the pump-handle overstatement corrected to
  "removed a continuing source of contamination — without establishing how many
  illnesses the removal prevented"; Silber's "unlimited" phrasing moved out of
  Roosevelt's contemporary argument into later historiography as Silber's own wording.
- **F7 — Triangle omitted owners' insurance profit.** New source `tri-dyrud-insurance`
  (Dyrud, IEEE 2006, via Von Drehle) and new counterexample `tri-ce-3`: owners
  collected ~$65,000 excess (~$445 per victim) while families settled for $75 per life.
- **F8 — Buried thresholds and measurement slips.** IP Quick Look now states the ICJ
  Art. 41 / ICC Art. 58 thresholds; "Six decades" → "Seven decades" (Hormuz,
  1956–2025); IP "Seven decades" → "Eight decades" (1949–2026); cholera "3 feet" →
  "2 feet 8 inches" (text and exhibit label); IP exhibit labelled a reconstructed
  diagram, not a photograph.
- **F9 — Hormuz closure framed as untested; Feb–Jun 2026 closure documented.** New
  source `hormuz-eia-2026-closure` (EIA Short-Term Energy Outlook, August 2026,
  Global Energy Security Data, Tables 2 and 4) and new outcome `hormuz-outcomes-4`:
  a Feb–Jun 2026 **de facto near-closure**, not a zero-flow blockade — total oil flows
  21.6 mb/d (4Q25) → 14.9 (1Q26) → 4.9 mb/d (2Q26); LNG 10.5 Bcf/d (4Q25) →
  7.4 Bcf/d (1Q26) → 0.8 Bcf/d (2Q26); military action began Feb 28, 2026. EIA's
  caveat is preserved verbatim in the data: AIS ship-signal data for Hormuz became
  "especially unreliable" from late February 2026 and 2026 volumes are revised
  frequently. The 2019/2023–25 counterfactual gap now states those cases did not test
  a closure, and the 2026 event tested a near-closure, not a zero-flow blockade.

Also repaired in this release: **D-1** (required exhibit label
`DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH` now present on all 5
exhibits), **D-2** (Quick Look summaries trimmed into the claimed ~210–271 word band;
measured range ~260–271), **D-3** (keyboard: 4 skip links; Tab cost from the question
input to the first case card cut from ~70 to 10), **D1** (Step 6 consequential-correction
trigger renamed to "Test consequential correction — challenge & withdraw [source] to
see which claims narrow" and made discoverable with an always-visible note), and
**D2** (wrong claims in the in-tree comparison docs corrected: v0.1.0 headline,
baseline-brief size, Quick Look word counts, record counts).

### 5. Comprehension-test kit corrected for v0.2 (private — not in this tree)

The human comprehension-test kit (§6 protocol) is corrected against the repaired
tree: Task 4 now names the actual correction controls and the Step 6
challenge-first flow (the old wording named a button that was not visible until the
challenge was answered); Task 3 now uses the real tab label "Compare & falsify" and
the route to reach it; stale M5.1 build identifiers and test counts are updated.
The kit itself stays private. The corrected kit was re-run as a simulation only
(two simulated first-time readers, desktop + phone, 38/38 checks, 0 console/page
errors); **the §6 human gate remains PENDING — no real participants have run it.**

## Verification actuals (re-run on the release tree, 2026-11-09)

- **Node test suite (`node --test tests/*.test.cjs`)**: **66/66 PASS** (59 baseline +
  7 new v0.2 repair tests).
- **Python ledger & baseline suite**: **13/13 PASS**.
- **Upstream Mandate-Ledger recall suite**: **3/3 PASS**.
- **Total automated tests**: **82/82 PASS, zero failures**.
- **Browser re-verification (Playwright headless Chromium, desktop 1280×850 + phone
  390×844)**: **21/21 checks PASS**, 0 console errors, 0 page errors.
- **Dataset**: 5 cases, **44 sources** (was 42), **105 core records** (was 104),
  15 comparable argument chains. Canonical `dist/data.json` SHA-256
  `933bfa186b928a91bd6ae365c7c1362070cb5e99848ffe185e72310e93826e4a`
  (file SHA-256 `abc519d754a87cd3d6f35074f391400ae6cd849f70304ef02537c5a724d61d9d`).
- **Authoring ledger untouched**: `evidence/authoring-ledger/history.sqlite3`
  (`fb87e229aab88aa03f2c05751450924eed6f4028d481ff4ec03bb1bf778234e3`, 151 events,
  head `f978269a4ddd55c03189f313813c7494106ea0175d1c529b98aa6fcd2edf8ca0`).
- **Tree manifest**: `SHA256SUMS.txt`, 144 entries, all verified OK.

## Known limits

- **No independent human comprehension study yet.** Automated suites and simulated
  browser checks do not substitute for real first-time readers. See `LIMITATIONS.md` §7.
- **D4 (known behaviour, no change):** the analogy falsifier's topology check rejects
  even hedged Hormuz-absorption claims; the built-in sample is accepted. Works as
  designed.
- **Coverage is five curated inquiries only.** Anything outside them returns
  `UNSUPPORTED` rather than guessing. Historical coverage is incomplete by design.
- **Hashes prove local bytes, not historical truth.** See `LIMITATIONS.md` §4.
