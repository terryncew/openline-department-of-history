# HISTORY_LAB_ARGON_REVIEW_GATE.md — Independent Engineering, Historical Falsification, and Final Handoff Gate

- **Recovered Date**: 2026-11-09 UTC (2026-11-08 PST)
- **Role**: Argon — Independent engineering lead, historical-evidence auditor, adversarial reviewer, and release-qualification agent for OpenLine History Lab
- **Private Development Folder**: `[private Drive ID — redacted]` ([private Drive link — redacted for public release])
- **Recovered Astra M1 Source**: `OPENLINE_HISTORY_LAB_M1_PRIVATE.zip` (`[private Drive ID — redacted]`)
  - **Verified SHA-256**: `f783cb054c71277f3b90f1ea3dbb3a1b8db89b38941a0cd0c9aafbfb798c70e3` (EXACT MATCH)
- **Recovered Astra M2 Source**: `OPENLINE_HISTORY_LAB_M2_PRIVATE.zip` (`[private Drive ID — redacted]`)
  - **Verified SHA-256**: `4494f936ef5e0a3c5144be638e47d98f48b521d824aede40f4a7575c3a00dd7c` (EXACT MATCH)
- **Recovered Operating Law v1**: `OpenLine_Agent_Operating_Law_v1.pdf` (`[private Drive ID — redacted]`)
  - **Verified SHA-256**: `a3ea42f6cde5355acea07fa1f0c947cf4b96b5a4efcb48bd80133bb38afb9c81`
- **Recovered Dogfood 001**: `openline_law_dogfood_001.zip` (`[private Drive ID — redacted]`)
  - **Verified SHA-256**: `0535e56b63bd114eadf4e7d38208c5661a86702d21caeeba0dee0e62e0e4444f` (EXACT MATCH, 6/6 deterministic tests passing)
- **Astra M3/M4 Checkpoints Search**: Exhaustively searched Google Drive (`[private Drive ID — redacted]` and root), Gmail, Keep, and VM workspaces; Astra stopped after M2 (`HANDOFF.md`: "M3 and M4 each must be uploaded and read back before continuation"). No M3 or M4 archives existed prior to Argon takeover.
- **Reproduced M2 Baseline**:
  - `sha256sum -c SHA256SUMS.txt`: 66/66 files OK
  - Node test suite (`node --test tests/*.test.cjs`): 26/26 PASS
  - Python adapter test suite (`python3 -m unittest discover -s tests -p "test_*.py" -v`): 8/8 PASS
  - Total reproduced baseline: **34/34 PASS**
  - **Initial Defect Found in M2 Baseline**: Running `unittest discover` on `third_party/mandate-ledger/test_gpt_dependency_recall.py` fails with `FileNotFoundError: .../third_party/data/roll283.xml` because `third_party/mandate-ledger` was vendored with its test file but without its `data/roll283.xml` fixture or path guard.

## Mandatory Release-Qualification Requirements (Argon Gate)
1. **Preserve Accepted Work**: Preserve all 3 existing M2 cases (London Cholera 1854–55, Triangle Fire 1909–15, US Banking 1933–34), all 21 M2 citation cards, the bundled `bank-act.pdf` original, the Mandate Ledger SQLite event-chain adapter (`scripts/evidence_ledger.py`), and all 34 baseline tests.
2. **Obey OpenLine Agent Operating Law & Dogfood 001**:
   - `Bound-First -> Receipts -> Falsifiers -> Emergence -> Coherence`
   - `READ -> VERIFY -> FIND BOTTLENECK -> COMPARE -> BUILD -> FALSIFY -> PRESERVE/REOPEN -> REPEAT`
   - Distinguish immediate verified progress (`r_verified`) from future option value (`V_{t+1}`), make `STOP` an explicit choice, and never confuse a proposed change with an accepted change.
3. **Customer Outcome**:
   - Help an ordinary citizen investigate a difficult contemporary problem through independently inspectable historical evidence, answering:
     "What happened before? Why might it be comparable? What’s different? What worked? What failed? How do we know?"
4. **Dogfood Two Real-World Stress-Test Cases**:
   - **Case A — Strait of Hormuz and energy prices**: "What can historical maritime chokepoint crises teach us about reducing energy-price shocks without escalating conflict?"
     - Distinguish physical oil supply, shipping capacity, insurance, market expectations, strategic reserves, diplomacy, refining constraints, and intervention timelines.
     - Show documented historical outcomes, relevant differences, counterexamples, and conditional intervention tradeoffs. Date and source contemporary claims; never promise a historical intervention will produce the same result today.
   - **Case B — Israel–Palestine, civilian protection, and durable arrangements**: "What documented historical interventions have reduced civilian harm or sustained negotiated arrangements, and under what conditions did they succeed or fail?"
     - Independently sourced humanitarian facts, legal findings and allegations with procedural status, diplomatic records, relevant precedents, and competing scholarly interpretations.
     - Distinguish established evidence, contested interpretations, and uncertainty without manufacturing consensus, false equivalence, or ranking political actors.
5. **Adversarial Evidence System Hardening (9 Attack Families)**:
   - Refuse, quarantine, correct, or clearly label:
     (1) Fabricated citations and quotations
     (2) Misleading excerpts from genuine sources
     (3) Unsupported historical analogies
     (4) Outdated current-event claims
     (5) Correlation presented as causation
     (6) Selective evidence omitting decisive counterexamples
     (7) Revoked or corrected sources
     (8) Conflicting scholarly interpretations presented as consensus
     (9) Malicious imported notebook content
   - Separate byte-integrity (`sha256`) from provenance and evidentiary standing.
   - Ensure source challenges reopen affected conclusions without destroying unrelated accepted work.
6. **Human Reasoning Comparison vs. Fair Conventional Baseline**:
   - Construct a competent, source-backed historical research brief using the exact same evidence pack and compare across:
     (1) Claim traceability, (2) Important differences & omitted context, (3) Competing explanations, (4) Conditional interventions & falsifiers, (5) Correction after challenged evidence, (6) First-time user effort.
7. **Real Browser Playtesting**:
   - Test phone, Chromebook, and desktop layouts; keyboard navigation; readable citations; visual timelines; side-by-side comparisons; challenge creation/resolution; export/re-import; printing; and offline behavior.
