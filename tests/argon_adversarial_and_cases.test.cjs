const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const E=require('../engine.js');
const d=JSON.parse(fs.readFileSync(__dirname+'/../dist/data.json','utf8'));
const clone=x=>JSON.parse(JSON.stringify(x));

// 1. 3-Axis Verification Model Tests
test('3-axis verification separates byteIntegrity, provenanceStanding, and evidentiaryStanding',()=>{
  const banking=d.cases.find(c=>c.id==='banking');
  const bankAct=banking.sources.find(s=>s.id==='bank-act');
  const axOriginal=E.verifyEvidenceAxes(bankAct,{},true);
  assert.equal(axOriginal.byteIntegrity,'VERIFIED_ORIGINAL_HASH');
  assert.equal(axOriginal.provenanceStanding,'PRIMARY_ARCHIVAL_RECORD');
  assert.equal(axOriginal.evidentiaryStanding,'AVAILABLE');

  const bankWigmore=banking.sources.find(s=>s.id==='bank-wigmore');
  const axAbstract=E.verifyEvidenceAxes(bankWigmore,{},true);
  assert.equal(axAbstract.byteIntegrity,'VERIFIED_CARD_HASH');
  assert.equal(axAbstract.provenanceStanding,'ABSTRACT_OR_SYNOPSIS_ONLY');
  assert.equal(axAbstract.evidentiaryStanding,'AVAILABLE');

  // A matching SHA-256 card hash does NOT prevent REOPEN when source is challenged
  const axWithdrawn=E.verifyEvidenceAxes(bankWigmore,{[bankWigmore.id]:{status:'WITHDRAWN',boundSha256:bankWigmore.sha256}},true);
  assert.equal(axWithdrawn.byteIntegrity,'VERIFIED_CARD_HASH');
  assert.equal(axWithdrawn.evidentiaryStanding,'REOPEN');
});

// 2. Nine Adversarial Attack Vectors
test('Attack Vector 1: Fabricated citations (placeholder domain) and unverified direct quotations are refused',()=>{
  const badDomain=clone(d);
  badDomain.cases[0].sources[0].url='https://example.com/fabricated-archive';
  assert.throws(()=>E.validate(badDomain),/Invalid source/);

  const badQuote=clone(d);
  badQuote.cases[0].facts[0].text='Snow declared "I have proven with 100% laboratory certainty that the pump caused every case."';
  assert.throws(()=>E.validate(badQuote),/Unverified quotation/);
});

test('Attack Vector 2: Misleading excerpts or verbatim quotes claimed from abstract/synopsis-only sources are refused',()=>{
  const badExcerpt=clone(d);
  const triIdx=badExcerpt.cases.findIndex(c=>c.id==='triangle');
  badExcerpt.cases[triIdx].interpretations[0].text='McEvoy writes verbatim that "every factory owner in New York conspired to lock the doors."';
  badExcerpt.cases[triIdx].interpretations[0].verifiedQuote={sourceId:'tri-mcevoy',locator:'p. 625',verbatim:true};
  assert.throws(()=>E.validate(badExcerpt),/abstract\/synopsis-only source/);

  const badFullTextClaim=clone(d);
  badFullTextClaim.cases[triIdx].interpretations[0].claimsFullTextReview=true;
  assert.throws(()=>E.validate(badFullTextClaim),/Misleading full-text claim on abstract\/synopsis-only source/);
});

test('Attack Vector 3: Unsupported historical analogies and deterministic predictive overclaims are refused',()=>{
  const badAnalogy=clone(d);
  badAnalogy.cases[0].comparison[0].present='This historical precedent guarantees that modern outbreaks will inevitably follow the same trajectory.';
  assert.throws(()=>E.validate(badAnalogy),/deterministic analogy overclaim/);

  const superficialLimit=clone(d);
  superficialLimit.cases[0].comparison[0].limit='Too short';
  assert.throws(()=>E.validate(superficialLimit),/Comparison limitation is too superficial/);
});

test('Attack Vector 4: Outdated current-event claims exceeding the freshness window are refused',()=>{
  const stale=clone(d);
  const hIdx=stale.cases.findIndex(c=>c.id==='hormuz');
  stale.cases[hIdx].comparison[0].asOfDate='2020-01-01';
  assert.throws(()=>E.validate(stale,{referenceDate:'2026-11-08',maxStalenessDays:365}),/Outdated contemporary claim exceeds freshness window/);
});

test('Attack Vector 5: Correlation presented as single-cause causation is refused',()=>{
  const badCausal=clone(d);
  badCausal.cases[0].outcomes[0].text='Removing the pump handle single-handedly caused the end of the Soho cholera epidemic.';
  assert.throws(()=>E.validate(badCausal),/Correlation presented as single-cause causation/);

  const missingConfounders=clone(d);
  missingConfounders.cases[0].outcomes[0].causalStatus='CAUSAL_HYPOTHESIS';
  missingConfounders.cases[0].outcomes[0].confounders=[];
  assert.throws(()=>E.validate(missingConfounders),/Causal hypothesis missing confounders/);
});

test('Attack Vector 6: Selective evidence omitting decisive counterexamples is refused',()=>{
  const selective=clone(d);
  selective.cases[0].counterexamples=[];
  selective.cases[0].outcomes=selective.cases[0].outcomes.map(o=>({...o,text:'The policy succeeded completely in all respects.'}));
  assert.throws(()=>E.validate(selective),/Selective evidence omitting counterexamples/);
});

test('Attack Vector 7: Revoked or superseded sources in active dataset are refused and local challenges non-destructively reopen only dependents',()=>{
  const revokedInDataset=clone(d);
  revokedInDataset.cases[0].sources[0].status='WITHDRAWN';
  assert.throws(()=>E.validate(revokedInDataset),/Revoked or superseded source/);

  const hormuz=d.cases.find(c=>c.id==='hormuz');
  const corr=E.evaluateConsequentialCorrection(hormuz,'hormuz-gholz-press-2010','WITHDRAWN','Abstract-only source challenged.');
  assert.equal(corr.changedCount,4);
  assert.equal(corr.unaffectedCount,18);
});

test('Attack Vector 8: Conflicting scholarly interpretations presented as consensus are refused',()=>{
  const consensusWash=clone(d);
  consensusWash.cases[0].interpretations[0].text='All historians agree and universal scholarly consensus proves that Snow solved the epidemic alone.';
  assert.throws(()=>E.validate(consensusWash),/Conflicting interpretations presented as consensus/);

  const singleSchool=clone(d);
  singleSchool.cases[0].interpretations=[singleSchool.cases[0].interpretations[0]];
  assert.throws(()=>E.validate(singleSchool),/Case lacks competing scholarly interpretations/);
});

test('Attack Vector 9: Malicious imported notebook content (XSS/script/SVG payloads, prototype pollution, hold clearing) is refused',()=>{
  const hash=E.sha256(E.canonical(d));
  const blank=()=>({schema:'openline-history-notebook.v1',dataHash:hash,challenges:[],events:[],standing:{},worksheets:{}});
  const xssNb=blank();
  xssNb.challenges=[{
    id:'xss-1',
    caseId:'hormuz',
    itemId:'hormuz-facts-1',
    reason:'Malicious payload <script>alert(1)</script> inside challenge reason',
    url:'https://example.org/doc',
    created:'2026-11-08T00:00:00Z',
    status:'OPEN'
  }];
  assert.throws(()=>E.validateNotebook(xssNb,d),/Invalid challenge/);

  const svgWorksheet=blank();
  svgWorksheet.worksheets={hormuz:{record:'<svg onload=alert(1)>bad</svg>',limit:'valid text',test:'valid text'}};
  assert.throws(()=>E.validateNotebook(svgWorksheet,d),/Invalid worksheet/);
});

// 3. Case A (Hormuz) & Case B (Israel-Palestine): Defensible Comparisons, Rejected Comparisons, and Consequential Corrections
test('Case A (Strait of Hormuz): demonstrates defensible comparison, rejected comparison, and consequential correction',()=>{
  const hormuz=d.cases.find(c=>c.id==='hormuz');
  assert.ok(hormuz);
  assert.equal(hormuz.sources.length,10);

  // 1. Defensible comparison accepted with explicit limits
  const defensible=E.evaluateComparisonCandidate(hormuz.comparison[0],hormuz);
  assert.equal(defensible.verdict,'DEFENSIBLE_WITH_LIMITS');

  // 2. Rejected comparison detected with exact failure explanation
  const rejected1=E.evaluateComparisonCandidate(hormuz.rejectedComparisons[0],hormuz);
  assert.equal(rejected1.verdict,'REJECTED');
  assert.ok(rejected1.reasons.some(r=>r.includes('Cape of Good Hope')||r.includes('cul-de-sac')));

  const rejected2=E.evaluateComparisonCandidate(hormuz.rejectedComparisons[1],hormuz);
  assert.equal(rejected2.verdict,'REJECTED');
  assert.ok(rejected2.reasons.some(r=>r.includes('4.4 mb/d')||r.includes('deterministic')));

  // 3. Consequential correction: challenging hormuz-gholz-press-2010 narrows 4 multi-source records to surviving primary/institutional basis and leaves 16 untouched
  const corrGholz=E.evaluateConsequentialCorrection(hormuz,'hormuz-gholz-press-2010','WITHDRAWN',hormuz.consequentialCorrection.challengeReason);
  assert.equal(corrGholz.changedCount,4);
  assert.equal(corrGholz.unaffectedCount,18);
  assert.ok(corrGholz.changed.every(x=>x.survivingSourceIds.length>=1&&x.survivingText.includes('Surviving')));

  // Challenging hormuz-eia-chokepoints quarantines sole-source record hormuz-facts-1
  const corrEia=E.evaluateConsequentialCorrection(hormuz,'hormuz-eia-chokepoints','WITHDRAWN','Testing sole-source quarantine.');
  assert.ok(corrEia.quarantined.some(x=>x.id==='hormuz-facts-1'));
});

test('Case B (Israel–Palestine): demonstrates defensible comparison, rejected comparison, and consequential correction',()=>{
  const ip=d.cases.find(c=>c.id==='israel-palestine');
  assert.ok(ip);
  assert.equal(ip.sources.length,11);

  // 1. Defensible comparison accepted with explicit limits
  const defensible=E.evaluateComparisonCandidate(ip.comparison[0],ip);
  assert.equal(defensible.verdict,'DEFENSIBLE_WITH_LIMITS');

  // 2. Rejected comparison detected (Sinai/MFO turnkey transplant & ICJ/ICC procedural conflation)
  const rejectedSinai=E.evaluateComparisonCandidate(ip.rejectedComparisons[0],ip);
  assert.equal(rejectedSinai.verdict,'REJECTED');
  assert.ok(rejectedSinai.reasons.some(r=>r.includes('sovereignty')||r.includes('Sinai')));

  const rejectedLegal=E.evaluateComparisonCandidate(ip.rejectedComparisons[1],ip);
  assert.equal(rejectedLegal.verdict,'REJECTED');
  assert.ok(rejectedLegal.reasons.some(r=>r.includes('plausible')||r.includes('Art. 41')||r.includes('Art. 58')));

  // 3. Consequential correction: challenging ip-shlaim-lustick-reviews narrows 3 interpretation records to surviving primary treaty/Carnegie bases while leaving 19 primary/institutional records untouched
  const corrReviews=E.evaluateConsequentialCorrection(ip,'ip-shlaim-lustick-reviews','WITHDRAWN',ip.consequentialCorrection.challengeReason);
  assert.equal(corrReviews.changedCount,3);
  assert.equal(corrReviews.unaffectedCount,19);
  assert.ok(corrReviews.changed.every(x=>x.survivingSourceIds.length>=1&&x.survivingText.includes('Surviving')));

  // Challenging ip-armistice-1949 quarantines sole-source records ip-facts-1 and ip-timeline-1
  const corrArmistice=E.evaluateConsequentialCorrection(ip,'ip-armistice-1949','WITHDRAWN','Testing sole-source quarantine on 1949 armistice.');
  assert.ok(corrArmistice.quarantined.some(x=>x.id==='ip-facts-1'||x.id==='israel-palestine-facts-1'));
});

// 4. Astra Independent Acceptance — 5 Blind Adversarial Challenge Regressions
test('Astra Blind Challenge 1: Co-cited quotation attributed in prose to abstract/synopsis-only author is refused even with FULL_TEXT co-citation',()=>{
  const smuggledIp=clone(d);
  const ipCase=smuggledIp.cases.find(c=>c.id==='israel-palestine');
  ipCase.facts.push({
    id:'ip-facts-smuggled-quote',
    asOfDate:'2026-11-08',
    text:'In his monograph, Shlaim writes verbatim that "Israel never intended to relinquish control of Area C under any interim formula," while the 1979 Sinai treaty created four zones.',
    sourceIds:['ip-sinai-mfo-1979','ip-shlaim-lustick-reviews'],
    causalStatus:'DOCUMENTED_RECORD',
    verifiedQuote:{sourceId:'ip-sinai-mfo-1979',locator:'Annex I, Art. II',verbatim:true}
  });
  assert.throws(()=>E.validate(smuggledIp),/Co-cited quotation attributed in prose to abstract\/synopsis-only source/);

  const smuggledHormuz=clone(d);
  const hCase=smuggledHormuz.cases.find(c=>c.id==='hormuz');
  hCase.facts.push({
    id:'hormuz-facts-smuggled-quote',
    asOfDate:'2026-11-08',
    text:'Gholz and Press state verbatim on page 461 that "global oil inventories automatically neutralize any Strait of Hormuz blockade within forty-eight hours."',
    sourceIds:['hormuz-nhhc-tanker-war','hormuz-gholz-press-2010'],
    causalStatus:'DOCUMENTED_RECORD',
    verifiedQuote:{sourceId:'hormuz-nhhc-tanker-war',locator:'H-018-1 p. 4',verbatim:true}
  });
  assert.throws(()=>E.validate(smuggledHormuz),/Co-cited quotation attributed in prose to abstract\/synopsis-only source/);
});

test('Astra Blind Challenge 2: Simultaneous multi-source withdrawal in Hormuz and Israel-Palestine narrows cleanly and never leaks withdrawn sources into survivingText',()=>{
  const hormuz=d.cases.find(c=>c.id==='hormuz');
  const simH1=E.evaluateConsequentialCorrection(
    hormuz,
    ['hormuz-gholz-press-2010','hormuz-crs-abqaiq-2019'],
    'WITHDRAWN',
    'Simultaneous withdrawal of Gholz & Press 2010 and CRS Abqaiq/R42335.'
  );
  assert.equal(simH1.quarantinedCount,3);
  assert.equal(simH1.changedCount,7);
  assert.equal(simH1.unaffectedCount,12);
  for(const ch of simH1.changed){
    assert.ok(!ch.survivingSourceIds.includes('hormuz-gholz-press-2010'));
    assert.ok(!ch.survivingSourceIds.includes('hormuz-crs-abqaiq-2019'));
    assert.ok(!/`hormuz-crs-abqaiq-2019`/.test(ch.survivingText));
  }

  const simH2=E.evaluateConsequentialCorrection(
    hormuz,
    ['hormuz-gholz-press-2010','hormuz-eia-chokepoints'],
    'WITHDRAWN',
    'Simultaneous withdrawal of Gholz & Press 2010 and EIA Chokepoints.'
  );
  assert.equal(simH2.quarantinedCount,1);
  assert.equal(simH2.changedCount,8);
  assert.equal(simH2.unaffectedCount,13);
  for(const ch of simH2.changed){
    assert.ok(!ch.survivingSourceIds.includes('hormuz-gholz-press-2010'));
    assert.ok(!ch.survivingSourceIds.includes('hormuz-eia-chokepoints'));
    assert.ok(!/`hormuz-eia-chokepoints`/.test(ch.survivingText));
  }

  const ip=d.cases.find(c=>c.id==='israel-palestine');
  const simIp1=E.evaluateConsequentialCorrection(
    ip,
    ['ip-icj-provisional-2024','ip-icj-advisory-2024'],
    'WITHDRAWN',
    'Simultaneous withdrawal of ICJ Case 192 Provisional Orders and ICJ Case 186 Advisory Opinion.'
  );
  assert.equal(simIp1.quarantinedCount,0);
  assert.equal(simIp1.changedCount,5);
  assert.equal(simIp1.unaffectedCount,17);
  for(const ch of simIp1.changed){
    assert.ok(!ch.survivingSourceIds.includes('ip-icj-provisional-2024'));
    assert.ok(!ch.survivingSourceIds.includes('ip-icj-advisory-2024'));
    assert.ok(ch.survivingText.includes('Surviving primary'));
  }

  const simIp2=E.evaluateConsequentialCorrection(
    ip,
    ['ip-shlaim-lustick-reviews','ip-sinai-mfo-1979'],
    'WITHDRAWN',
    'Simultaneous withdrawal of book reviews and 1979 Sinai MFO source.'
  );
  const interp3=simIp2.changed.find(x=>x.id==='israel-palestine-interpretations-3');
  assert.ok(interp3);
  assert.deepEqual(interp3.survivingSourceIds,['ip-carnegie-mediation-2026']);
  assert.ok(!/`ip-sinai-mfo-1979`/.test(interp3.survivingText));
});

test('Astra Blind Challenge 3: evaluateComparisonCandidate rejects all 5 hedged academic analogies committing structural errors',()=>{
  const hormuz=d.cases.find(c=>c.id==='hormuz');
  const ip=d.cases.find(c=>c.id==='israel-palestine');
  const hedged=[
    [hormuz,{
      claim:'The 1991 Desert Storm Strategic Petroleum Reserve drawdown suggests that coordinated strategic reserve releases can substantially buffer a six-month disruption of the 11.4 Bcf/d of Qatari liquefied natural gas transiting the Strait of Hormuz.',
      limit:'Requires timely coordination among IEA member governments and public auction participation during the initial weeks.'
    },/NO_STRATEGIC_LNG_RESERVE/],
    [hormuz,{
      claim:'Empirical evidence from the 2023–2025 Bab el-Mandeb shipping crisis indicates that commercial maritime networks can accommodate a Strait of Hormuz blockade primarily by elongating tanker voyages around the Cape of Good Hope.',
      limit:'Longer voyage distances increase ton-mile demand and raise clean tanker freight rates by roughly twenty percent.'
    },/GEOGRAPHIC_BYPASS_TOPOLOGY_ERROR/],
    [hormuz,{
      claim:'The rapid two-week price recovery after the September 2019 Abqaiq attack demonstrates that activating Saudi and UAE upstream OPEC spare capacity inside the Persian Gulf can offset a full maritime closure of the Strait of Hormuz.',
      limit:'Activating spare wellhead capacity requires up to thirty days of technical pressure adjustments by national oil companies.'
    },/UPSTREAM_SPARE_CAPACITY_TRAPPED_BEHIND_CHOKEPOINT/],
    [ip,{
      claim:'The forty-five-year durability of the 1979 Egypt–Israel treaty and Multinational Force and Observers indicates that third-party verification monitors can stabilize the West Bank and Gaza while deferring final borders, sovereignty, and Area C settlements.',
      limit:'Observer missions depend on tripartite budgetary appropriations and periodic force-protection reviews.'
    },/STRUCTURAL_SOVEREIGNTY_AND_DEMOGRAPHIC_MISMATCH/],
    [ip,{
      claim:'The International Court of Justice January 2024 Provisional Measures Order and the November 2024 International Criminal Court Article 58 warrants constitute final judicial determinations on the merits establishing criminal guilt beyond reasonable doubt.',
      limit:'International courts lack an independent police force and rely on state party enforcement.'
    },/JUDICIAL_PROCEDURAL_POSTURE_CONFLATION/]
  ];
  for(const [caseObj,cand,expectedRe] of hedged){
    const res=E.evaluateComparisonCandidate(cand,caseObj);
    assert.equal(res.verdict,'REJECTED');
    assert.ok(res.reasons.some(r=>expectedRe.test(r)),`Expected ${expectedRe} in ${JSON.stringify(res.reasons)}`);
  }
});

test('Astra Blind Challenge 4: Contemporary claims across facts, timeline, comparison, outcomes, and interpretations require explicit fresh asOfDate',()=>{
  for(const cid of ['hormuz','israel-palestine']){
    const c=d.cases.find(x=>x.id===cid);
    for(const item of E.items(c)){
      assert.equal(item.asOfDate,'2026-11-08',`Record ${item.id} missing explicit asOfDate`);
    }
  }
  const missingFactDate=clone(d);
  delete missingFactDate.cases.find(c=>c.id==='hormuz').facts[0].asOfDate;
  assert.throws(()=>E.validate(missingFactDate),/Contemporary claim lacks explicit asOfDate/);

  const missingIpOutcomeDate=clone(d);
  delete missingIpOutcomeDate.cases.find(c=>c.id==='israel-palestine').outcomes[1].asOfDate;
  assert.throws(()=>E.validate(missingIpOutcomeDate),/Contemporary claim lacks explicit asOfDate/);
});

test('M5 Question-to-History 1: Mandatory supported questions retrieve verified precedents, relevance, comparable arguments, outcomes, limits, and 3-axis sources',()=>{
  const qHormuz=E.askHistory('What can history tell us about a prolonged Strait of Hormuz disruption?',d);
  assert.equal(qHormuz.status,'SUPPORTED');
  assert.equal(qHormuz.boundaryCode,'VERIFIED_DOSSIER_MATCH');
  assert.equal(qHormuz.canEstablishAnswer,true);
  assert.deepEqual(qHormuz.matchedCaseIds,['hormuz']);
  assert.equal(qHormuz.precedents[0].comparableArguments.length,3);
  assert.ok(qHormuz.precedents[0].whyRelevant.includes('20.9 mb/d'));
  assert.ok(qHormuz.precedents[0].whatHappenedAfterward.documentedOutcomes.length>=3);
  assert.ok(qHormuz.precedents[0].whatHappenedAfterward.counterexamplesAndFailures.length>=2);
  assert.ok(qHormuz.precedents[0].differencesThatLimit.caseBoundaries.length>=3);
  assert.equal(qHormuz.precedents[0].sourcesAndStanding.length,10);

  const qConflict=E.askHistory('What historical arrangements have reduced civilian harm during territorial conflicts?',d);
  assert.equal(qConflict.status,'SUPPORTED');
  assert.deepEqual(qConflict.matchedCaseIds,['israel-palestine']);
  assert.equal(qConflict.precedents[0].comparableArguments.length,3);
  assert.ok(qConflict.precedents[0].comparableArguments.some(a=>a.topic.includes('1979 Sinai Peace Treaty')));
  assert.ok(qConflict.precedents[0].comparableArguments.some(a=>a.topic.includes('Temporary humanitarian pauses')&&a.subsequentEvidence.includes('Phase One')));
  assert.equal(qConflict.precedents[0].sourcesAndStanding.length,11);

  const qBanking=E.askHistory('What happened when governments responded to banking panics?',d);
  assert.equal(qBanking.status,'SUPPORTED');
  assert.deepEqual(qBanking.matchedCaseIds,['banking']);
  assert.equal(qBanking.precedents[0].comparableArguments.length,3);
  assert.ok(qBanking.precedents[0].comparableArguments.some(a=>a.subsequentEvidence.includes('4,200 unlicensed')));
  assert.ok(qBanking.precedents[0].comparableArguments.some(a=>a.subsequentEvidence.includes('January 1, 1934')));
});

test('M5 Question-to-History 2: Mandatory boundary-testing questions refuse ideological determinism and future predictions without inventing precedents',()=>{
  const qIdeology=E.askHistory('Has history proved that one political ideology always succeeds?',d);
  assert.equal(qIdeology.status,'UNSUPPORTED');
  assert.equal(qIdeology.boundaryCode,'UNIVERSAL_IDEOLOGY_OR_DETERMINISM_REFUSED');
  assert.equal(qIdeology.canEstablishAnswer,false);
  assert.equal(qIdeology.precedents.length,0);
  assert.ok(qIdeology.explanation.includes('cannot establish that any single political ideology'));

  const q2030=E.askHistory('What will happen in 2030?',d);
  assert.equal(q2030.status,'UNSUPPORTED');
  assert.equal(q2030.boundaryCode,'EXTERNAL_FUTURE_FORECAST_REFUSED');
  assert.equal(q2030.canEstablishAnswer,false);
  assert.equal(q2030.precedents.length,0);
  assert.ok(q2030.explanation.includes('cannot predict what will happen in 2030'));
});

test('M5 Question-to-History 3: Partially supported questions return verified precedents AND explicitly identify missing coverage',()=>{
  const qPartialBank=E.askHistory('How did the 1933 banking panic compare to the 2023 Silicon Valley Bank run and European sovereign debt crises?',d);
  assert.equal(qPartialBank.status,'PARTIALLY_SUPPORTED');
  assert.equal(qPartialBank.boundaryCode,'PARTIAL_LIBRARY_COVERAGE_WITH_EXPLICIT_GAPS');
  assert.equal(qPartialBank.canEstablishAnswer,true);
  assert.deepEqual(qPartialBank.matchedCaseIds,['banking']);
  assert.equal(qPartialBank.precedents.length,1);
  assert.ok(qPartialBank.missingCoverage.some(g=>/Silicon Valley Bank/i.test(g)));
  assert.ok(qPartialBank.missingCoverage.some(g=>/European/i.test(g)));

  const qPartialHormuz=E.askHistory('What can Strait of Hormuz history tell us about a Taiwan Strait semiconductor blockade?',d);
  assert.equal(qPartialHormuz.status,'PARTIALLY_SUPPORTED');
  assert.deepEqual(qPartialHormuz.matchedCaseIds,['hormuz']);
  assert.ok(qPartialHormuz.missingCoverage.some(g=>/Taiwan Strait/i.test(g)));
});

test('M5 Question-to-History 4: Out-of-library questions and superficial keyword traps fail closed without manufacturing analogies',()=>{
  const qRoman=E.askHistory('What caused the fall of the Roman Republic in the first century BCE?',d);
  assert.equal(qRoman.status,'UNSUPPORTED');
  assert.equal(qRoman.boundaryCode,'OUTSIDE_CURATED_EVIDENCE_LIBRARY');
  assert.equal(qRoman.canEstablishAnswer,false);
  assert.equal(qRoman.precedents.length,0);

  const qTrap=E.askHistory('How do I build a campfire on a river bank while fishing?',d);
  assert.equal(qTrap.status,'UNSUPPORTED');
  assert.equal(qTrap.boundaryCode,'SUPERFICIAL_KEYWORD_RESEMBLANCE_REJECTED');
  assert.equal(qTrap.canEstablishAnswer,false);
  assert.equal(qTrap.precedents.length,0);

  const qXss=E.askHistory('<script>alert(1)</script>What happened in 1933?',d);
  assert.equal(qXss.status,'UNSUPPORTED');
  assert.equal(qXss.boundaryCode,'INVALID_OR_UNSAFE_QUERY');
});

test('M5 Comparable Historical Arguments 5: All 5 cases have 3 complete comparable arguments distinguishing contemporary beliefs from subsequent events and later historiography',()=>{
  let totalArgs=0;
  for(const c of d.cases){
    const args=E.historicalArguments(c);
    assert.equal(args.length,3,`Expected 3 comparable arguments in ${c.id}`);
    totalArgs+=args.length;
    for(const arg of args){
      assert.ok(arg.contemporaryActor.length>5);
      assert.ok(arg.contemporaryArgument.length>30);
      assert.ok(arg.policymakerExpectation.length>30);
      assert.ok(['SUPPORTED_WITH_LIMITS','CONTRADICTED_BY_EVENTS','MIXED_AND_CONFOUNDED'].includes(arg.expectationVerdict));
      assert.ok(arg.subsequentEvidence.length>30);
      assert.ok(arg.laterHistoriography.length>30);
      assert.ok(arg.differenceThatLimits.length>20);
      assert.equal(arg.asOfDate,'2026-11-08');
    }
  }
  assert.equal(totalArgs,15);
});

test('M5 Comparable Historical Arguments 6: Source withdrawal narrows comparable arguments in both evaluateConsequentialCorrection and askHistory',()=>{
  const banking=d.cases.find(c=>c.id==='banking');
  const wigmoreSrc=banking.sources.find(s=>s.id==='bank-wigmore');
  const silberSrc=banking.sources.find(s=>s.id==='bank-silber');

  const corrSingle=E.evaluateConsequentialCorrection(banking,'bank-wigmore','WITHDRAWN','Withdrawing abstract-only source to test argument narrowing.');
  assert.equal(corrSingle.argumentsChangedCount,1);
  assert.equal(corrSingle.argumentsUnaffectedCount,2);
  assert.equal(corrSingle.argumentsChanged[0].id,'banking-arg-3');
  assert.ok(corrSingle.argumentsChanged[0].survivingText.includes('bank-act'));

  // Simultaneous multi-source withdrawal of bank-silber and bank-wigmore
  const corrMulti=E.evaluateConsequentialCorrection(banking,['bank-silber','bank-wigmore'],'WITHDRAWN','Simultaneous withdrawal of both scholarly interpretations.');
  const arg3Multi=corrMulti.argumentsChanged.find(a=>a.id==='banking-arg-3');
  assert.ok(arg3Multi);
  assert.equal(arg3Multi.consequence,'CHANGED_SURVIVING_BASIS');
  assert.ok(!/\bbank-silber\b/i.test(arg3Multi.survivingText));
  assert.ok(!/\bbank-wigmore\b/i.test(arg3Multi.survivingText));

  // Verify askHistory reflects active source standing overrides in live argument packets
  const overrides={
    'bank-wigmore':{status:'WITHDRAWN',reason:'Abstract-only source challenged.',boundSha256:wigmoreSrc.sha256}
  };
  const qRes=E.askHistory('What happened when governments responded to banking panics?',d,overrides,true);
  const arg3Packet=qRes.precedents[0].comparableArguments.find(a=>a.id==='banking-arg-3');
  assert.equal(arg3Packet.standing.state,'REOPEN');
  assert.equal(arg3Packet.standing.consequence,'CHANGED_SURVIVING_BASIS');
  assert.equal(qRes.precedents[0].activeCorrectionSummary.reopenedArgumentsCount,1);
});

test('M5 Comparable Historical Arguments 7: Validator rejects fabricated quotations and co-cited quote smuggling inside historicalArguments',()=>{
  const badArgQuote=clone(d);
  const arg=badArgQuote.cases.find(c=>c.id==='banking').historicalArguments[2];
  arg.laterHistoriography='Wigmore (1987) wrote verbatim that "foreign central banks liquidated every dollar deposit in New York within forty-eight hours" while the Federal Reserve watched.';
  arg.verifiedQuote={
    sourceId:'bank-act',
    locator:'Emergency Banking Act, Title I',
    verbatim:true
  };
  assert.throws(()=>E.validate(badArgQuote),/Co-cited quotation attributed in prose to abstract\/synopsis-only source \(bank-wigmore\)/);
});

test('M5 Notebook Challenge Integration 8: Citizens can file and validate local challenges directly against comparable historical arguments',()=>{
  const nb={
    schema:'openline-history-notebook.v1',
    dataHash:E.sha256(E.canonical(d)),
    challenges:[{
      id:'challenge-banking-arg-1',
      caseId:'banking',
      itemId:'banking-arg-1',
      reason:'Testing whether RFC preferred-stock recapitalization mattered more than emergency discount window lending in Class B banks.',
      url:'https://www.federalreservehistory.org/essays/bank-holiday-of-1933',
      created:'2026-11-08T20:00:00Z',
      status:'OPEN'
    }],
    events:[],
    standing:{},
    worksheets:{}
  };
  const validated=E.validateNotebook(nb,d);
  assert.equal(validated.challenges.length,1);
  assert.equal(validated.challenges[0].itemId,'banking-arg-1');
});

test('M5.1 Held-Out Challenge 9: Everyday non-jargon citizen questions across all 5 domains and the 21-word founding meta-question route accurately',()=>{
  const ordinaryQuestions=[
    {q:'What happened when people panicked and tried to pull all their cash out of banks at once?',expectedCase:'banking'},
    {q:'Did taking the handle off the water pump in London actually stop people from dying?',expectedCase:'cholera'},
    {q:'Why didn’t the bosses go to prison when 146 garment workers burned to death behind a locked door?',expectedCase:'triangle'},
    {q:'What happens to world oil and gas supplies if tankers get blocked in the Persian Gulf?',expectedCase:'hormuz'},
    {q:'Can international peacekeepers or temporary truces actually protect civilians when two sides are fighting over land?',expectedCase:'israel-palestine'}
  ];
  for(const item of ordinaryQuestions){
    const res=E.askHistory(item.q,d);
    assert.equal(res.status,'SUPPORTED',`Failed on ${item.q}`);
    assert.ok(res.matchedCaseIds.includes(item.expectedCase),`Expected ${item.expectedCase} in ${JSON.stringify(res.matchedCaseIds)}`);
  }
  const meta=E.askHistory('What does history say about this situation? What happened before? What were people arguing? What did they try? What actually happened?',d);
  assert.equal(meta.status,'PARTIALLY_SUPPORTED');
  assert.equal(meta.boundaryCode,'BROAD_INQUIRY_REQUIRES_DOMAIN_SELECTION');
  assert.ok(meta.precedents.length>=3);
});

test('M5.1 Held-Out Challenge 10: Sophisticated false analogies across cholera, triangle, and banking with >15-char limits are rejected by structural rules',()=>{
  const casesMap=new Map(d.cases.map(c=>[c.id,c]));
  const attacks=[
    ['cholera',{
      claim:'Dr. John Snow’s 1854 Voronoi spot map of Soho fatalities convinced the St. James Parish Board to remove the Broad Street pump handle on September 8, which rapidly terminated the cholera outbreak.',
      limit:'Victorian London relied on shallow parish hand pumps rather than pressurized municipal water mains.'
    },/POST_HOC_MAP_AND_PRE_INTERVENTION_DECLINE_ERROR/],
    ['triangle',{
      claim:'The December 1911 jury verdict in People v. Harris and Blanck established that the Asch Building’s exit doors complied with New York safety standards and that the owners bore no responsibility for the fire.',
      limit:'Early twentieth-century loft buildings used iron-and-stone structural shells without modern automatic sprinkler piping.'
    },/CRIMINAL_ACQUITTAL_CONFLATED_WITH_WORKPLACE_SAFETY/],
    ['banking',{
      claim:'The March 13, 1933 bank reopening succeeded primarily because the newly enacted Federal Deposit Insurance Corporation insured retail bank accounts during the first week of the national bank holiday.',
      limit:'The 1933 banking system consisted of thousands of small unit banks operating under a gold reserve constraint.'
    },/CHRONOLOGICAL_FDIC_ANACHRONISM_ERROR/],
    ['banking',{
      claim:'Roosevelt’s March 1933 Emergency Banking Act and Fireside Chat reopened the entire United States banking system within seven days without leaving significant depositor funds frozen in closed institutions.',
      limit:'Physical cash hoarding in 1933 moved more slowly than twenty-first century electronic mobile wire transfers.'
    },/UNLICENSED_BANK_CREDIT_CONTRACTION_OMISSION/]
  ];
  for(const [cid,cand,expectedRe] of attacks){
    const res=E.evaluateComparisonCandidate(cand,casesMap.get(cid));
    assert.equal(res.verdict,'REJECTED',`Expected REJECTED on ${cid}`);
    assert.ok(res.reasons.some(r=>expectedRe.test(r)),`Expected ${expectedRe} in ${JSON.stringify(res.reasons)}`);
  }
});

test('M5.1 Held-Out Challenge 11: Simultaneous withdrawal of hormuz-gholz-press-2010 and hormuz-crs-abqaiq-2019 narrows hormuz-arg-1 to primary naval and Talmadge records',()=>{
  const hormuz=d.cases.find(c=>c.id==='hormuz');
  const overrides={
    'hormuz-gholz-press-2010':{status:'WITHDRAWN',reason:'Held-out multi-source test',boundSha256:hormuz.sources.find(s=>s.id==='hormuz-gholz-press-2010').sha256},
    'hormuz-crs-abqaiq-2019':{status:'WITHDRAWN',reason:'Held-out multi-source test',boundSha256:hormuz.sources.find(s=>s.id==='hormuz-crs-abqaiq-2019').sha256}
  };
  const res=E.askHistory('What can history tell us about a prolonged Strait of Hormuz disruption?',d,overrides,true);
  const arg1=res.precedents[0].comparableArguments.find(a=>a.id==='hormuz-arg-1');
  assert.equal(arg1.standing.consequence,'CHANGED_SURVIVING_BASIS');
  assert.ok(!/hormuz-gholz-press-2010|hormuz-crs-abqaiq-2019/i.test(arg1.contemporaryArgument));
  assert.ok(arg1.contemporaryArgument.includes('hormuz-nhhc-tanker-war'));
});
