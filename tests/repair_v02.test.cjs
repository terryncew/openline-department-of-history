const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const E=require('../engine.js');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'../dist/data.json'),'utf8'));
const distHtml=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
const clone=o=>JSON.parse(JSON.stringify(o));

// F1: deterministic universal-proof / exact-count / pre-trial-as-conviction questions refuse.
test('Repair F1: universal-proof, exact-count, and pre-trial-as-conviction questions return UNSUPPORTED',()=>{
  const probes=[
    'Does the Triangle fire prove regulation or free markets always win?',
    'Does the Triangle Shirtwaist fire prove that regulation always wins?',
    'Does the 1933 bank holiday prove FDR\'s policies always work?',
    'Did Snow prove the pump handle saved exactly 500 lives?',
    'Is the ICJ provisional measures order a genocide conviction?',
    // Fresh variants (not in the attack report)
    'Does the 1933 bank holiday prove government intervention always works?',
    'Did the Triangle fire prove that regulation always wins and free markets always fail?',
    'Was the ICJ provisional measures order a final judgment on the merits?',
    'Is the ICC arrest warrant a criminal conviction?',
    'Did Snow prove the pump handle saved exactly 500 lives in one day?'
  ];
  for(const q of probes){
    const r=E.askHistory(q,d,{},true);
    assert.equal(r.status,'UNSUPPORTED',`Expected UNSUPPORTED for: ${q} (got ${r.status})`);
    assert.equal(r.boundaryCode,'UNIVERSAL_PROOF_OR_EXACT_COUNT_REFUSED',`Wrong boundary code for: ${q}`);
  }
  // Controls: genuine bounded questions still route.
  assert.equal(E.askHistory('What happened when governments responded to banking panics?',d,{},true).status,'SUPPORTED');
  assert.equal(E.askHistory('Should the US copy the 1979 Sinai MFO model for Gaza today?',d,{},true).status,'SUPPORTED');
  assert.equal(E.askHistory('What did the ICJ provisional measures order require?',d,{},true).status,'SUPPORTED');
  assert.equal(E.askHistory('How did the 1933 banking panic compare to the 2023 Silicon Valley Bank run and European sovereign debt crises?',d,{},true).status,'PARTIALLY_SUPPORTED');
});

// F2: withdrawn sole-source claims are withheld in Quick Look and in precedent packets.
test('Repair F2: Quick Look withholds quarantined sole-source text instead of displaying it verbatim',()=>{
  const hormuz=d.cases.find(c=>c.id==='hormuz');
  const src=hormuz.sources.find(s=>s.id==='hormuz-eia-chokepoints');
  const overrides={'hormuz-eia-chokepoints':{status:'WITHDRAWN',reason:'repair probe',boundSha256:src.sha256}};
  const j=E.buildStoryJourney(hormuz,overrides,true);
  const q=j.quickLook.steps.find(s=>s.stepId==='question');
  assert.equal(q.standing.state,'REOPEN');
  assert.ok(q.textWithheld,'Expected Quick Look question step to be withheld');
  assert.ok(!q.text.includes('20.9'),'Withheld Quick Look text still contains the quarantined 20.9 mb/d figure');
  assert.ok(!q.text.includes('11.4'),'Withheld Quick Look text still contains the quarantined 11.4 Bcf/d figure');
  assert.ok(q.text.includes('Withheld'),'Withheld Quick Look text must say so');
  // Baseline (no withdrawal) still shows the figures.
  const base=E.buildStoryJourney(hormuz,{},true);
  assert.ok(base.quickLook.steps.find(s=>s.stepId==='question').text.includes('20.9'));

  // Snow/CDC double withdrawal withholds cholera Quick Look claims too.
  const cholera=d.cases.find(c=>c.id==='cholera');
  const ov2={};
  for(const id of ['snow1855','cdc2004']){
    const s2=cholera.sources.find(s=>s.id===id);
    ov2[id]={status:'WITHDRAWN',reason:'repair probe',boundSha256:s2.sha256};
  }
  const jc=E.buildStoryJourney(cholera,ov2,true);
  const leaked=jc.quickLook.steps.filter(s=>s.text.includes('September 8')&&s.textWithheld===false&&s.reopenedUnderlying.some(n=>n.consequence==='QUARANTINED_SOLE_SOURCE'));
  assert.equal(leaked.length,0,'A Quick Look step with a quarantined underlying record still displays its text');

  // Precedent-packet counterexamples no longer fall back to verbatim text.
  const res=E.askHistory('What can history tell us about a prolonged Strait of Hormuz disruption?',d,overrides,true);
  const ces=res.precedents[0].whatHappenedAfterward.counterexamplesAndFailures;
  const origCes=hormuz.counterexamples;
  for(const ce of ces.filter(x=>x.standing.state!=='AVAILABLE')){
    const orig=origCes.find(o=>o.id===ce.id);
    assert.ok(ce.text!==orig.text||ce.text.includes('Withheld'),`Quarantined counterexample ${ce.id} still carries its original verbatim text`);
  }
});

// F3: deterministic 1:1 cross-domain mappings are rejected; controls stay defensible.
test('Repair F3: deterministic crypto/2026 1:1 mapping is REJECTED with reasons; valid controls stay defensible',()=>{
  const banking=d.cases.find(c=>c.id==='banking');
  const probe=E.evaluateComparisonCandidate({
    claim:'The 1933 bank holiday proves a 2026 government crypto freeze would work identically: close the exchanges for a week, audit them, reopen the sound ones, and confidence returns.',
    limit:'Crypto exchanges are decentralized and run 24/7, unlike 1933 banks.'
  },banking);
  assert.equal(probe.verdict,'REJECTED');
  assert.ok(probe.reasons.some(r=>/CROSS_DOMAIN_DETERMINISTIC_MAPPING_ERROR/.test(r)));
  // Fresh variants.
  for(const cand of [
    {claim:'The 1933 bank holiday shows that the same approach would work for a 2026 crypto exchange freeze.',limit:'Crypto exchanges are decentralized and run 24/7.'},
    {claim:'The 1933 bank holiday proves a government freeze would work identically today.',limit:'Modern freezes face different legal constraints.'},
    {claim:'Because the 1933 holiday worked, a 2026 stablecoin freeze would work identically.',limit:'Stablecoins settle on-chain without bank holidays.'}
  ]){
    const r=E.evaluateComparisonCandidate(cand,banking);
    assert.equal(r.verdict,'REJECTED',`Expected REJECTED for: ${cand.claim}`);
  }
  // The 6 correctly-REJECTED attack candidates (exact probe texts) stay rejected.
  const attackRejected=[
    ['cholera',{claim:'Removing the Broad Street pump handle rapidly terminated the cholera outbreak, so lockdowns end pandemics the same way.',limit:'Lockdowns are a different intervention from a pump handle.'}],
    ['banking',{claim:'The FDIC stopped the March 1933 panic when banks reopened on March 13, 1933, so deposit insurance stops all bank runs.',limit:''}],
    ['hormuz',{claim:'Hormuz can be bypassed like the Red Sea: just reroute tankers around the Cape of Good Hope and the market will shrug it off.',limit:'Shipping can adapt to longer routes.'}],
    ['triangle',{claim:'The Asch Building was fireproof and passed a February 1911 inspection, which guaranteed it was fundamentally safe for workers.',limit:'Inspections look at the building shell, not exits.'}],
    ['israel-palestine',{claim:'The Sinai MFO model can be copied directly as a turnkey solution for Gaza without resolving sovereignty or borders.',limit:'Gaza is not Sinai.'}],
    ['cholera',{claim:'Snow\u2019s spot map convinced the Board of Guardians to remove the pump handle on September 7, 1854.',limit:'The map is famous.'}]
  ];
  for(const [cid,cand] of attackRejected){
    const r=E.evaluateComparisonCandidate(cand,d.cases.find(c=>c.id===cid));
    assert.equal(r.verdict,'REJECTED',`Expected REJECTED for ${cid}: ${cand.claim}`);
  }
  // Valid controls (built-in defensible samples) stay DEFENSIBLE_WITH_LIMITS.
  for(const c of d.cases){
    const r=E.evaluateComparisonCandidate({claim:c.comparison[0].historical+' '+c.comparison[0].present,limit:c.comparison[0].limit},c);
    assert.equal(r.verdict,'DEFENSIBLE_WITH_LIMITS',`Expected defensible control for ${c.id}`);
  }
});

// F4: fabricated quotes fail validation; notebook quotes are flagged, not presented as verified.
test('Repair F4: fabricated quote with plausible locator fails validate(); notebook quotes are flagged unverified',()=>{
  const bad=clone(d);
  const f=bad.cases[0].facts[0];
  f.text+=' Snow wrote verbatim that "the pump handle saved exactly five hundred lives in one day."';
  f.verifiedQuote={sourceId:'snow1855',locator:'p. 42',verbatim:true};
  assert.throws(()=>E.validate(bad),/Unverified quotation: quoted source has no bundled original/);
  // Shipped data still validates (no live fabricated quote exists).
  assert.equal(E.validate(d),true);

  const nb={
    schema:'openline-history-notebook.v1',
    dataHash:E.sha256(E.canonical(d)),
    challenges:[
      {id:'ch-snow',caseId:'cholera',itemId:'cholera-f1',reason:'Snow wrote that "the pump handle saved exactly five hundred lives in one day" and that must be checked.',url:'',created:'2026-11-08T20:00:00Z',status:'OPEN'},
      {id:'ch-judge',caseId:'triangle',itemId:'tri-f1',reason:'The trial judge said "these owners are guilty beyond any doubt" according to my notes.',url:'',created:'2026-11-08T20:00:00Z',status:'OPEN'},
      {id:'ch-plain',caseId:'cholera',itemId:'cholera-f1',reason:'This claim needs a more exact locator.',url:'',created:'2026-11-08T20:00:00Z',status:'OPEN'}
    ],
    events:[],standing:{},
    worksheets:{cholera:{record:'Roosevelt said "every bank will reopen tomorrow and no depositor will ever lose a cent again".',limit:'x',test:'y'}}
  };
  const v=E.validateNotebook(nb,d);
  assert.equal(v.challenges.find(c=>c.id==='ch-snow').unverifiedQuotation,true);
  assert.equal(v.challenges.find(c=>c.id==='ch-judge').unverifiedQuotation,true);
  assert.equal(v.challenges.find(c=>c.id==='ch-plain').unverifiedQuotation,undefined);
  assert.equal(v.worksheets.cholera.unverifiedQuotation,true);
  // Rendering labels the flag (built artifact).
  assert.ok(distHtml.includes('UNVERIFIED QUOTATION'));
});

// F5/F6/F8 data corrections.
test('Repair F5/F6/F8: corrected dates, attributions, thresholds, and measurements in data',()=>{
  const tri=d.cases.find(c=>c.id==='triangle');
  const arg2=tri.historicalArguments.find(a=>a.id==='triangle-arg-2');
  assert.ok(arg2.subsequentEvidence.includes('March 11, 1914'),'F5: settlement year still wrong');
  assert.ok(!arg2.subsequentEvidence.includes('settled in 1913'),'F5: stale 1913 settlement text remains');
  assert.ok(arg2.subsequentEvidence.includes('$75 per life lost'),'F5: per-life wording');
  const cholera=d.cases.find(c=>c.id==='cholera');
  const carg1=cholera.historicalArguments.find(a=>a.id==='cholera-arg-1');
  assert.ok(!carg1.subsequentEvidence.includes('40 Broad Street feet'),'F6: garble remains');
  assert.ok(carg1.subsequentEvidence.includes('2 feet 8 inches'),'F6: distance figure missing');
  assert.ok(!carg1.subsequentEvidence.includes('prevented a secondary wave'),'F6: overstatement remains');
  assert.ok(carg1.subsequentEvidence.includes('without establishing how many illnesses the removal prevented'),'F6: limit not stated');
  const banking=d.cases.find(c=>c.id==='banking');
  const barg1=banking.historicalArguments.find(a=>a.id==='banking-arg-1');
  assert.ok(!barg1.contemporaryArgument.includes('unlimited Federal Reserve Bank notes'),'F6: Silber phrasing still inside contemporary argument');
  assert.ok(barg1.laterHistoriography.includes("Silber (2009) later characterized"),'F6: Silber attribution missing from historiography');
  // F8: thresholds in IP Quick Look; seven decades; 2 feet 8 inches in cholera QL.
  const ip=d.cases.find(c=>c.id==='israel-palestine');
  const ipQl=E.buildStoryJourney(ip,{},true).quickLook;
  assert.ok(ipQl.steps.find(s=>s.stepId==='back-then').text.includes('Art. 41'),'F8: Art. 41 threshold missing from IP Quick Look');
  assert.ok(ipQl.steps.find(s=>s.stepId==='back-then').text.includes('Art. 58'),'F8: Art. 58 threshold missing from IP Quick Look');
  const hormuz=d.cases.find(c=>c.id==='hormuz');
  assert.ok(E.buildStoryJourney(hormuz,{},true).quickLook.steps.find(s=>s.stepId==='question').text.includes('Seven decades'),'F8: Six decades not fixed');
  assert.ok(E.buildStoryJourney(cholera,{},true).quickLook.steps.find(s=>s.stepId==='what-happened').text.includes('2 feet 8 inches'),'F8: 3 feet not fixed');
});

// F7/F9: new sourced records exist.
test('Repair F7/F9: insurance-profit counterexample and 2026 Hormuz closure outcome are present and sourced',()=>{
  const tri=d.cases.find(c=>c.id==='triangle');
  const ce=tri.counterexamples.find(x=>x.id==='tri-ce-3');
  assert.ok(ce,'F7: tri-ce-3 missing');
  assert.ok(ce.text.includes('$65,000')&&ce.text.includes('$75 per life lost'),'F7: figures missing');
  assert.ok(tri.sources.some(s=>s.id==='tri-dyrud-insurance'),'F7: source missing');
  const hormuz=d.cases.find(c=>c.id==='hormuz');
  const out=hormuz.outcomes.find(x=>x.id==='hormuz-outcomes-4');
  assert.ok(out,'F9: hormuz-outcomes-4 missing');
  assert.ok(out.text.includes('4.9 mb/d')&&out.text.includes('0.8 Bcf/d'),'F9: flow figures missing');
  assert.ok(out.text.includes('7.4 Bcf/d in 1Q26'),'F9: 1Q26 LNG intermediate (7.4 Bcf/d, EIA STEO Table 4) missing');
  assert.ok(hormuz.sources.find(s=>s.id==='hormuz-eia-2026-closure').notes.includes('7.4 Bcf/d in 1Q26'),'F9: source note lacks 1Q26 LNG figure');
  assert.ok(out.text.includes('especially unreliable'),'F9: EIA reliability caveat missing');
  assert.ok(hormuz.sources.some(s=>s.id==='hormuz-eia-2026-closure'),'F9: source missing');
  const o3=hormuz.outcomes.find(x=>x.id==='hormuz-outcomes-3');
  assert.ok(!o3.counterfactualGap.startsWith('Neither case tested'),'F9: stale untested framing remains');
  assert.equal(E.validate(d),true);
});

// D-1/D-2/D-3: built artifact carries the label, in-band word counts, and skip links.
test('Repair D-1/D-2/D-3: exhibit label present, Quick Look in band, skip links present',()=>{
  const label='DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM \u2014 NOT_A_PHOTOGRAPH';
  const hits=distHtml.split(label).length-1;
  assert.ok(hits>=5,`Expected the required exhibit label at least 5 times in dist/index.html, found ${hits}`);
  for(const c of d.cases){
    const wc=E.buildStoryJourney(c,{},true).quickLook.wordCount;
    assert.ok(wc>=210&&wc<=271,`Quick Look word count for ${c.id} out of band: ${wc}`);
  }
  for(const target of ['href="#case-list"','href="#depth-switcher"','href="#story-steps-nav"']){
    assert.ok(distHtml.includes(target),`Missing skip link ${target}`);
  }
  assert.ok(distHtml.includes('Test consequential correction'),'D1-comparison: Step 6 trigger label missing');
});
