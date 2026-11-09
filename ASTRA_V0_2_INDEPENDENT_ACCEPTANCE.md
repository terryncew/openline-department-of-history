# Independent Acceptance & Adversarial Falsification Assignment — OpenLine Department of History v0.2

**Target Assignee**: Astra (or designated Independent Acceptance & Falsification Reviewer)  
**Candidate Under Review**: `OPENLINE_DEPARTMENT_OF_HISTORY_V0_2_PRIVATE.zip` (`v0.2.0`)  
**Published Baseline Compared**: `v0.1.0` (commit `b1686b284b17f814781342547547dda5af90f0bb`, tag `v0.1.0` / `8e420a2045368b224147cb321b9b148e72ece56f`)  
**Private History Lab Drive Folder**: `OpenLine History Lab — Private Development` (`[private Drive ID — redacted]`)

---

## 1. Mission & Review Posture

Do **not** trust Argon's self-reported claims or summary tables. Your mandate under the Agent Operating Law (`Bound-First → Receipts → Falsifiers → Emergence → Coherence`) is to independently verify, stress-test, and attempt to falsify `OpenLine Department of History v0.2` against the nine product requirements:

1. **Research-to-Design Grounding**: Verify that every cited best practice in `RESEARCH_TO_DESIGN_DECISIONS.md` maps to an actual, observable change in the running software (`dist/index.html`) rather than decorative prose.
2. **Front Door Rebuild**: Open `dist/index.html` cold (`file://`) and verify within 5 seconds:
   - Exact headline: `What does history say?`
   - Exact supporting text: `“Something happening today sound familiar? Explore what happened before, what people believed, what they tried, and what happened next.”`
   - Prominent plain-English question input and 5 inviting example questions.
   - No SHA-256 hashes, source manifests, verification axes, or 8-tab engineering controls cluttering the initial front door, while confirming those capabilities remain accessible via `"How this works ↗"`, `"Examine the Evidence"`, and the `"Full Research & Verification Workbench"` drawer underneath.
3. **6-Step Interactive Story Journey**: Verify that every one of the 5 inquiries (`cholera`, `triangle`, `banking`, `hormuz`, `israel-palestine`) renders the exact 6-step sequence (`The Question → Back Then → The Debate → What Happened → What’s Different Today → Explore the Evidence`) and that all interactive components operate cleanly via mouse, touch swipe, and keyboard.
4. **Enjoyable Without Trivializing History (Dignity Audit)**: Inspect the 1911 Triangle Shirtwaist Fire (`triangle`), 1854 Broad Street Cholera (`cholera`), and Israel–Palestine Civilian Protection (`israel-palestine`) inquiries across all 3 depths. Confirm zero points, zero streaks/badges, zero ideological scoring, zero invented quotes or motives, and explicit `DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH` provenance labels on all 5 SVG exhibits.
5. **One Product, Multiple Depths (`Quick Look`, `Explore`, `Examine the Evidence`)**: Verify that all three depths pull from the exact same `dist/data.json` evidence base, that `Quick Look` is readable in ~1 minute (~210–271 narrative words) without stripping citations or hiding analogy limits, and that challenging a source in `notebook.standing` immediately updates all three depths.
6. **100% Evidence Engine Preservation**: Verify that `dist/data.json` (`4c21b49e0c46d25ff6898ee044fce6a8e4302fafb4dccb6cd4737aa68d529088` canonical / `84f16aec8a6a120a50c5742da843b5ab2cbbe174c31861c3d3f4d8ab11fd1439` file bytes) and `evidence/authoring-ledger/history.sqlite3` (`fb87e229aab88aa03f2c05751450924eed6f4028d481ff4ec03bb1bf778234e3`, 151 events) are untouched and all 75 automated tests pass.

---

## 2. Step-by-Step Verification Protocol (Run Cold From Archive)

### Step A: Archive & Manifest Integrity Gate
```bash
# 1. Verify outer archive SHA-256 against OPENLINE_DEPARTMENT_OF_HISTORY_V0_2_PRIVATE.sha256
sha256sum -c OPENLINE_DEPARTMENT_OF_HISTORY_V0_2_PRIVATE.sha256

# 2. Unzip into a clean directory and verify every internal file against SHA256SUMS.txt
unzip -q OPENLINE_DEPARTMENT_OF_HISTORY_V0_2_PRIVATE.zip -d /tmp/astra_v02_audit
cd /tmp/astra_v02_audit
sha256sum -c SHA256SUMS.txt
```
*Fail Condition*: If any file hash mismatches or is missing, return `HOLD` immediately.

### Step B: Deterministic Rebuild & SQLite Authoring Ledger Gate
```bash
# 1. Re-run build.py and verify dist/data.json and dist/index.html are byte-deterministic
cp dist/index.html /tmp/pre_build_index.html
python3 scripts/build.py
cmp -s dist/index.html /tmp/pre_build_index.html && echo "DETERMINISTIC_BUILD_PASS"

# 2. Verify the 151-event hash-chained SQLite authoring ledger on a temporary copy
cp -r evidence/authoring-ledger /tmp/ledger_verify_copy
python3 scripts/evidence_ledger.py --dir /tmp/ledger_verify_copy verify \
  --expected-head f978269a4ddd55c03189f313813c7494106ea0175d1c529b98aa6fcd2edf8ca0
```
*Fail Condition*: If `build.py` mutates `dist/index.html` or `evidence/authoring-ledger/history.sqlite3` fails head verification, return `HOLD`.

### Step C: Automated Unit, Adversarial & Multi-Depth Test Gate (75 Tests)
```bash
# 1. Run all 59 Node tests (53 v0.1.0 baseline + 6 v0.2 redesign & multi-depth tests)
node --test tests/*.test.cjs

# 2. Run all 13 Python ledger & baseline comparison tests
python3 -m unittest discover -s tests -p "test_*.py" -v

# 3. Run all 3 upstream Mandate-Ledger dependency recall tests
python3 -m unittest discover -s third_party/mandate-ledger -p "test_*.py" -v
```
*Fail Condition*: Any test failure across the 75 tests (`59 + 13 + 3`).

### Step D: Real Headless Browser Playtest Gate (Phone, Chromebook, Desktop)
```bash
python3 scripts/browser_playtest.py
```
Inspect `evidence/BROWSER_PLAYTEST_RESULTS.json` and confirm:
- `allPassed: true`
- `viewports.phone_390x844.horizontalOverflow: false` (`91` combinations + `6` questions)
- `viewports.chromebook_1024x768.horizontalOverflow: false` (`91` combinations + `6` questions)
- `viewports.desktop_1280x850.horizontalOverflow: false` (`91` combinations + `6` questions)
- `consoleErrors: []` (`0` severe console errors)
- `externalRequests: []` (`0` outbound network requests)

---

## 3. Adversarial Falsification Challenges for Astra

Execute at least the following five blind adversarial probes against `v0.2`:

1. **Probe 1 — Cross-Depth Consequential Hold Synchronization**:
   - In `Engine.buildStoryJourney`, challenge a sole-source record (`hormuz-facts-1` via `hormuz-eia-2026` or `cholera-outcomes-3` via `cdc2004`) AND simultaneously challenge a co-cited source (`ip-shlaim-lustick-reviews` + `ip-oslo-1993-1995`).
   - Verify that `Quick Look` (`journey.quickLook`), `Explore` (`journey.steps`), and `Examine the Evidence` (`journey.consequential`) all withhold quarantined sole-source claims and never leak a withdrawn source's single-source fallback text into `Quick Look` summaries or `Step 3 (The Debate)` cards.
2. **Probe 2 — Anti-Simplification Audit of `Quick Look` & Plain-Language Concepts**:
   - Compare every statement in `Engine.QUICK_LOOK_SUMMARIES` and `Engine.PLAIN_LANGUAGE_CONCEPTS` against the underlying `dist/data.json` records and `evidence/*.json` cards.
   - Attempt to find any simplified claim that drops a required procedural qualification (e.g., ICJ Article 41 plausibility threshold, ICC Article 58 reasonable-grounds threshold, or pre-September 8 cholera decline) or cites an abstract-only source (`bank-wigmore`, `tri-mcevoy`, `tri-greenwald`, `hormuz-gholz-press-2010`, `ip-shlaim-lustick-reviews`) as if full text had been inspected.
3. **Probe 3 — Fail-Closed Ordinary-Language Question Traps**:
   - Submit novel ordinary-language questions combining a valid historical topic with a future prediction or partisan/ideological demand (e.g., `"Based on the 1933 bank holiday, what will happen to U.S. banks in 2028?"` or `"Does the Triangle Shirtwaist fire prove that regulation or free markets always win?"`).
   - Verify that the Front Door console fails closed (`UNSUPPORTED`) rather than routing to a confident historical briefing.
4. **Probe 4 — Keyboard-Only & Reduced-Motion Walkthrough**:
   - Navigate from the Front Door through `Quick Look`, `Explore` (`Steps 1–6`), timeline stepping (`ArrowLeft`/`ArrowRight`), expectation reveal (`Step 3`), source-investigation challenge (`Step 6`), and the `3-Axis Source Inspector` modal (`Escape` to close and restore focus) using only the keyboard.
5. **Probe 5 — Offline `file://` Isolation & Malicious Notebook Import**:
   - Open `dist/index.html` offline via `file://` and import a crafted notebook JSON containing `<img src=x onerror=alert(1)>` inside `challenges[].reason` and `events[].note`. Confirm that all rendered views across `Quick Look`, `Explore`, and `Examine the Evidence` escape HTML strictly and execute zero scripts.

---

## 4. Required Acceptance Verdict Format

Return your independent report in `OpenLine History Lab — Private Development` (`[private Drive ID — redacted]`) with one of three verdicts:
- `READY FOR FOUNDER PUBLIC RELEASE APPROVAL` — All integrity gates, 75 automated tests, 273 browser states, and 5 adversarial falsification probes pass with zero blockers.
- `PARTIAL` — Software runs and preserves the evidence engine, but non-critical UX or documentation defects require a `v0.2.1` patch before founder review.
- `HOLD` — Any byte-integrity failure, fabricated citation/quote, broken source-withdrawal recall, or fail-open unsupported question.
