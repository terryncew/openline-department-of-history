# Independent Acceptance & Adversarial Falsification Assignment — OpenLine Department of History v0.3

**Target Assignee**: Astra (or designated Independent Acceptance & Falsification Reviewer)  
**Candidate Under Review**: `OPENLINE_DEPARTMENT_OF_HISTORY_V0_3_PRIVATE.zip` (`v0.3.0`)  
**Recovered Baseline Preserved**: `v0.2.0` (`9ccc17bb3ed1f04813535d6fa38754e92a71d04711a4b06d7a5557d63b08ac8f`) & `v0.1.0` (`b1686b284b17f814781342547547dda5af90f0bb`)  
**Private History Lab Drive Folder**: `OpenLine History Lab — Private Development` (`[private Drive ID — redacted]`)

---

## 1. Acceptance Mandate

Your task is to independently verify and attempt to falsify `OpenLine Department of History v0.3` against the v0.3 mission:
> *"Acceptance test: A first-time visitor asks about a historical topic outside the original five and receives a useful, sourced research experience—not a dead end or fabricated certainty."*

Specifically, verify all five system requirements:
1. **Unfamiliar Subject Recognition**: Recognizes when an inquiry falls outside its verified 5-dossier coverage instead of silently failing—while still refusing non-historical future forecasts (`"What will happen in 2030?"`) and ideological determinism.
2. **Accessible Historical Source Offer**: Offers to research the new subject using accessible primary, institutional, and scholarly sources (with real HTTPS URLs, locators, and SHA-256 citation cards).
3. **Three-Tier Epistemic Separation**: Visibly distinguishes **Verified Evidence (`VERIFIED_EVIDENCE`)**, **Disputed Interpretations (`DISPUTED_INTERPRETATION`)**, and **Unverified Material (`UNVERIFIED_MATERIAL`)**.
4. **Provisional, Explorable Inquiry**: Generates a complete provisional inquiry (`espionage`, `influenza-1918`, `printing-press`, `dust-bowl-1930s`, or a custom guided scaffold) with sources, competing interpretations, documented outcomes, counterexamples, and limits of comparison across all 6 story steps and 3 reading depths (`Quick Look`, `Explore`, `Examine the Evidence`).
5. **Review, Correction, Challenge & Promotion Gate**: Allows review, correction, and source challenges before promoting new material to verified status (`VERIFIED_LOCAL`), blocking premature promotion whenever unverified claims, source holds, fabricated citations, hallucinated quotes, or misleading analogies are present.

---

## 2. Cold Verification Commands

```bash
# 1. Verify outer archive SHA-256 and unzip
sha256sum -c OPENLINE_DEPARTMENT_OF_HISTORY_V0_3_PRIVATE.sha256
unzip -q OPENLINE_DEPARTMENT_OF_HISTORY_V0_3_PRIVATE.zip -d /tmp/astra_v03_audit
cd /tmp/astra_v03_audit

# 2. Verify all internal file hashes
sha256sum -c SHA256SUMS.txt

# 3. Verify canonical 5-case dataset & 151-event SQLite authoring ledger are untouched
python3 scripts/build.py
cp -r evidence/authoring-ledger /tmp/ledger_v03_check
python3 scripts/evidence_ledger.py --dir /tmp/ledger_v03_check verify \
  --expected-head f978269a4ddd55c03189f313813c7494106ea0175d1c529b98aa6fcd2edf8ca0

# 4. Run all 80 automated tests (63 Node + 14 Python + 3 Mandate-Ledger)
node --test tests/*.test.cjs
python3 -m unittest discover -s tests -p "test_*.py" -v
python3 -m unittest discover -s third_party/mandate-ledger -p "test_*.py" -v

# 5. Run the CLI provisional subject researcher & SQLite ledger verifier
python3 scripts/research_subject.py --list
python3 scripts/research_subject.py --subject espionage

# 6. Run the real headless Chromium browser playtest across Phone, Chromebook, and Desktop
python3 scripts/browser_playtest.py
```

---

## 3. Five Blind Adversarial Falsification Probes for Astra

1. **Probe 1 — Premature Promotion Gate Probe**:
   - Call `Engine.researchHistoricalSubject("the history of espionage")` and immediately invoke `Engine.promoteProvisionalInquiry(inq, {}, {reviewerNote: "Trying to bypass unverified material review."})`.
   - Confirm `promoted === false`, `status === "PROMOTION_BLOCKED"`, and `blockers` contains `UNREVIEWED_PROVISIONAL_MATERIAL` for `espionage-facts-6`.
2. **Probe 2 — Hallucinated Quote & Co-Cited Synopsis Quote Smuggling Probe**:
   - Attempt to call `Engine.correctProvisionalClaim` on `espionage`, `influenza-1918`, `printing-press`, or `dust-bowl-1930s` with a fabricated direct quotation (`"..."`) attributed to a `SYNOPSIS_ONLY` source (`esp-andrew-jeffreys-historiography`, `flu-taubenberger-legacy-2020`, `print-johns-2002`, or `dust-mcleman-worster-cunfer-2014`) even when co-cited with a `FULL_TEXT` primary source.
   - Confirm the engine throws an error and blocks promotion.
3. **Probe 3 — Fabricated / Placeholder Citation Probe**:
   - Append a source with `url: "https://example.org/fabricated-espionage-file"` or `http://insecure.example/doc` or a mutated `sha256` card digest to a provisional inquiry and attempt `Engine.promoteProvisionalInquiry()`.
   - Confirm `PROMOTION_BLOCKED` with `FABRICATED_OR_INVALID_CITATION` or `SOURCE_CARD_HASH_MISMATCH`.
4. **Probe 4 — Misleading Analogy Probe Across All 4 New Subjects**:
   - Test `Engine.evaluateComparisonCandidate` with sophisticated false analogies on `espionage` (claiming signals intelligence/AI eliminates strategic surprise or warrantless domestic collection is safe), `influenza-1918` (claiming 4-week closures permanently eradicated flu without November rebounds), `printing-press` (claiming movable type automatically guaranteed error-free truth), and `dust-bowl-1930s` (claiming New Deal soil conservation restored land values by 1940).
   - Confirm all 4 return `verdict: "REJECTED"` with specific structural failure codes.
5. **Probe 5 — Active Source Withdrawal Hold Blocking Promotion**:
   - In `espionage` (or any of the 4 subjects), correct the `UNVERIFIED_MATERIAL` claim, then withdraw `esp-andrew-jeffreys-historiography` (`status: "WITHDRAWN"`) and attempt `Engine.promoteProvisionalInquiry(inq, overrides, {reviewerNote: "Promoting while a source is challenged."})`.
   - Confirm promotion is blocked (`ACTIVE_SOURCE_WITHDRAWAL_HOLD`) until the source hold is resolved or dependent claims are re-bound.
