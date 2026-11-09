# OpenLine History Lab — Three-Axis Evidence Verification & Adversarial Model

OpenLine History Lab enforces a strict separation between **cryptographic byte integrity**, **provenance & inspection depth**, and **evidentiary standing** under the OpenLine Agent Operating Law (`Bound-First → Receipts → Falsifiers → Emergence → Coherence`).

## 1. Three-Axis Verification Model (`verifyEvidenceAxes`)

A single `SHA-256` badge can mislead users into believing that a cryptographic hash proves historical truth or publisher authenticity. History Lab evaluates and displays three independent axes on every source card:

1. **Axis 1 — Byte Integrity (`byteIntegrity`)**:
   - `VERIFIED_CARD_HASH` or `VERIFIED_ORIGINAL_HASH`: Recomputes the canonical `SHA-256` of the 10-key curator card (and any bundled original PDF in `dist/originals/`) in the browser. Proves **only** that local bytes were not altered after packaging.
2. **Axis 2 — Provenance & Inspection Depth (`provenanceStanding`)**:
   - `PRIMARY_ARCHIVAL_RECORD` (`FULL_TEXT` or `EXCERPT_WITH_CONTEXT`): Original treaty, statute, court order, or operational archive (e.g., [1979 Egypt–Israel Treaty & MFO](https://www.mfo.org/origins), [ICJ Case 192 Orders](https://www.icj-cij.org/case/192/orders)).
   - `INSTITUTIONAL_RECORD`: Official statistical or technical report (e.g., [U.S. EIA World Oil Transit Chokepoints](https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints), [UN OCHA Phase One Ceasefire Report](https://www.ochaopt.org/content/report-humanitarian-response-un-and-humanitarian-partners-during-phase-one-ceasefire)).
   - `PEER_REVIEWED_SCHOLARSHIP`: Full-text or excerpted academic study (e.g., [James D. Hamilton, NBER w16790](https://www.nber.org/papers/w16790), [Caitlin Talmadge, International Security 2008](https://www.belfercenter.org/publication/closing-time-assessing-iranian-threat-strait-hormuz)).
   - `ABSTRACT_OR_SYNOPSIS_ONLY`: Publicly accessible landing page or peer-reviewed book review summarizing a paywalled work (e.g., [Gholz & Press, Security Studies 2010](https://www.tandfonline.com/doi/abs/10.1080/09636412.2010.505865); [IHR Review #153](https://reviews.history.ac.uk/review/153/) & [JPS Book Review](https://online.ucpress.edu/jps/article/49/4/145/111934/Review-Paradigm-Lost-From-Two-State-Solution-to)). Cannot be used to claim verbatim page quotations—even when co-cited alongside a `FULL_TEXT` source (`detectAttributedQuoteToAbstractSource`).
3. **Axis 3 — Evidentiary Standing (`evidentiaryStanding`)**:
   - `AVAILABLE` (`ACTIVE`), `REOPEN` (`DISPUTED` / `REVISED` / `WITHDRAWN`), or `BLOCKED` (`HASH_MISMATCH`).

## 2. Consequential Source Correction (`evaluateConsequentialCorrection` & `resolveSurvivingText`)

When a user or auditor challenges one or more material sources (`WITHDRAWN` or `DISPUTED`), History Lab's dependency graph (`engine.js` and `scripts/evidence_ledger.py`) categorizes every record in the inquiry into three explicit buckets:

- **Quarantined (`QUARANTINED_SOLE_SOURCE`)**: Claims whose supporting sources have all been withdrawn are withheld until reviewed.
- **Changed / Narrowed (`CHANGED_SURVIVING_BASIS` / `REOPEN_SHARED_BASIS`)**: Multi-source claims drop any unverified dependence on all challenged sources and display their narrowed `survivingTextByWithdrawnSource` grounded strictly in their remaining active sources. When multiple sources are withdrawn simultaneously, `resolveSurvivingText` checks composite withdrawal keys (`sourceA+sourceB`) and refuses to display any single-source fallback string that still references another withdrawn source.
- **Survived Untouched (`AVAILABLE`)**: Records backed by independent sources remain intact.

## 3. Nine-Vector Adversarial Defense Matrix + Astra Blind Acceptance Hardening

| Vector | Attack Surface | Engine Enforcement (`engine.js` & `scripts/evidence_ledger.py`) | Automated Test |
| :--- | :--- | :--- | :--- |
| **V1** | Fabricated citations & unverified quotes | Rejects placeholder domains (`example.com`, `localhost`), non-HTTPS URLs, and direct quotes lacking exact page/section locators. | `argon_adversarial_and_cases.test.cjs` #2 |
| **V2** | Misleading excerpts & co-cited quote smuggling from abstract-only sources | Blocks verbatim quotes (`"..."`) on `ABSTRACT_ONLY` / `SYNOPSIS_ONLY` sources and rejects prose attributing a quote to an abstract/synopsis-only author even when co-cited with a `FULL_TEXT` source. | `argon_adversarial_and_cases.test.cjs` #3, `astra_blind_acceptance.test.cjs` #1 |
| **V3** | Unsupported analogies, predictive overclaims & hedged structural fallacies | Rejects comparisons lacking a `>= 15` char `limit`, deterministic prediction phrases (`will inevitably`, `guarantees that`), and hedged domain fallacies (e.g., SPR for Qatari LNG, Cape rerouting for Hormuz, upstream spare capacity behind a closed strait, Sinai MFO without border/settlement resolution, ICJ/ICC procedural conflation). | `argon_adversarial_and_cases.test.cjs` #4, `astra_blind_acceptance.test.cjs` #3 |
| **V4** | Outdated or undated contemporary claims | Enforces `asOfDate` presence on all contemporary claims (`CONTEMPORARY_FACT_RE`) and rejects claims older than the freshness threshold. | `argon_adversarial_and_cases.test.cjs` #5, `astra_blind_acceptance.test.cjs` #4 |
| **V5** | Correlation presented as single-cause causation | Requires `causalStatus`, non-empty `confounders`, and `counterfactualGap` on outcomes; rejects `solely caused by`. | `argon_adversarial_and_cases.test.cjs` #6 |
| **V6** | Selective evidence omitting counterexamples | Requires every inquiry to include documented `counterexamples` with explicit `failureCondition` and verified citations. | `argon_adversarial_and_cases.test.cjs` #7 |
| **V7** | Revoked sources & simultaneous multi-source withdrawal | Refuses active dataset sources marked `WITHDRAWN`/`REVOKED`; local single or multi-source withdrawal reopens only dependent claims and prevents stale surviving-basis text. | `argon_adversarial_and_cases.test.cjs` #8, `astra_blind_acceptance.test.cjs` #2 |
| **V8** | Conflicting interpretations presented as consensus | Requires competing interpretations with distinct `causalEmphasis`; rejects consensus-flattening phrases (`all historians agree`). | `argon_adversarial_and_cases.test.cjs` #9 |
| **V9** | Malicious imported notebook content | Rejects HTML/SVG/script payloads, `javascript:`/`data:` URLs, prototype pollution (`__proto__`), fake source IDs, and imported attempts to clear local holds. | `argon_adversarial_and_cases.test.cjs` #10 |
