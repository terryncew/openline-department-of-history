const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const ROOT=path.resolve(__dirname,'..');
const E=require(path.join(ROOT,'engine.js'));
const DATA=JSON.parse(fs.readFileSync(path.join(ROOT,'dist','data.json'),'utf8'));

test('v0.3 Requirement 1 & 2: System recognizes unfamiliar historical subjects outside core 5 and offers accessible-source research without failing open on forecasts/ideology',()=>{
  assert.equal(E.V03_VERSION,'0.3.0');
  assert.equal(E.PROVISIONAL_SUBJECT_CATALOG.length,4);

  // 1. "the history of espionage" + 3 unfamiliar historical subjects
  const unfamiliarQueries=[
    {q:'the history of espionage',expectedKey:'espionage'},
    {q:'How did U.S. cities respond to the 1918 influenza pandemic and school closures?',expectedKey:'influenza-1918'},
    {q:'What is the history of the printing press, Gutenberg, and Milton’s Areopagitica?',expectedKey:'printing-press'},
    {q:'What caused the 1930s Dust Bowl and did New Deal soil conservation restore eroded land?',expectedKey:'dust-bowl-1930s'}
  ];

  for(const item of unfamiliarQueries){
    const det=E.detectUnfamiliarHistoricalSubject(item.q,DATA);
    assert.equal(det.isResearchableHistoricalSubject,true,`Expected researchable for ${item.q}`);
    assert.equal(det.outsideVerifiedCoverage,true);
    assert.equal(det.researchMode,'RESEARCHED_SUBJECT_PACK');
    assert.equal(det.subjectKey,item.expectedKey);
    assert.ok(det.accessibleSourcesPreview.length>=5);
    for(const src of det.accessibleSourcesPreview){
      assert.ok(E.safeArchiveURL(src.url),`Invalid archive URL ${src.url}`);
      assert.ok(src.locator.length>10);
    }

    const askRes=E.askHistory(item.q,DATA);
    assert.equal(askRes.outsideVerifiedCoverage,true);
    assert.ok(askRes.researchOffer,`Expected researchOffer attached to askHistory for ${item.q}`);
    assert.equal(askRes.researchOffer.isResearchableHistoricalSubject,true);
    assert.equal(askRes.researchOffer.subjectKey,item.expectedKey);
  }

  // 2. Arbitrary novel historical question outside the 4 dedicated packs gets Guided Provisional Scaffold offer
  const romanRes=E.askHistory('What caused the fall of the Roman Republic in the first century BCE?',DATA);
  assert.equal(romanRes.status,'UNSUPPORTED');
  assert.equal(romanRes.boundaryCode,'OUTSIDE_CURATED_EVIDENCE_LIBRARY');
  assert.ok(romanRes.researchOffer);
  assert.equal(romanRes.researchOffer.isResearchableHistoricalSubject,true);
  assert.equal(romanRes.researchOffer.researchMode,'GUIDED_CUSTOM_SCAFFOLD');
  assert.equal(romanRes.researchOffer.accessibleSourcesPreview.length,6);

  // 3. Future forecasts, ideological determinism, and non-historical keyword traps must NOT offer historical research
  const q2030=E.askHistory('What will happen in 2030?',DATA);
  assert.equal(q2030.status,'UNSUPPORTED');
  assert.equal(Boolean(q2030.researchOffer?.isResearchableHistoricalSubject),false);

  const qIdeology=E.askHistory('Has history proved that one political ideology always succeeds?',DATA);
  assert.equal(qIdeology.status,'UNSUPPORTED');
  assert.equal(Boolean(qIdeology.researchOffer?.isResearchableHistoricalSubject),false);

  const qTrap=E.askHistory('How do I build a campfire on a river bank while fishing?',DATA);
  assert.equal(qTrap.status,'UNSUPPORTED');
  assert.equal(Boolean(qTrap.researchOffer?.isResearchableHistoricalSubject),false);
});

test('v0.3 Requirement 3 & 4: Generates provisional, explorable inquiries for Espionage + 3 unfamiliar subjects separating Verified Evidence, Disputed Interpretations, and Unverified Material',()=>{
  const subjects=['espionage','influenza-1918','printing-press','dust-bowl-1930s'];
  for(const key of subjects){
    const inq=E.researchHistoricalSubject(key);
    assert.equal(inq.id,key);
    assert.equal(inq.inquiryStatus,'PROVISIONAL');
    assert.equal(inq.promotedToVerified,false);
    assert.ok(inq.sources.length>=5,`Expected >=5 sources in ${key}`);
    assert.ok(inq.facts.length>=5,`Expected >=5 facts in ${key}`);
    assert.ok(inq.timeline.length>=5,`Expected >=5 timeline events in ${key}`);
    assert.equal(inq.historicalArguments.length,3,`Expected 3 comparable arguments in ${key}`);
    // Repair D-11: espionage gains a 4th outcome (Ames exposure consequences); the other packs keep 3.
    assert.equal(inq.outcomes.length,key==='espionage'?4:3,`Expected ${key==='espionage'?4:3} outcomes in ${key}`);
    assert.equal(inq.counterexamples.length,2,`Expected 2 counterexamples in ${key}`);
    assert.equal(inq.interpretations.length,3,`Expected 3 competing interpretations in ${key}`);
    assert.equal(inq.comparison.length,4,`Expected 4 structural comparisons in ${key}`);
    assert.equal(inq.rejectedComparisons.length,2,`Expected 2 rejected comparisons in ${key}`);

    // Verify 3-axis source integrity on every source card
    for(const s of inq.sources){
      const ax=E.verifyEvidenceAxes(s,{},true);
      assert.equal(ax.byteIntegrity,'VERIFIED_CARD_HASH',`Card hash mismatch on ${s.id}`);
      assert.equal(ax.evidentiaryStanding,'AVAILABLE');
    }

    // Verify epistemic status separation: must contain all 3 tiers initially
    const eb=inq.epistemicBreakdown;
    assert.ok(eb.verifiedEvidenceCount>=10,`Expected >=10 VERIFIED_EVIDENCE items in ${key}, got ${eb.verifiedEvidenceCount}`);
    assert.ok(eb.disputedInterpretationCount>=6,`Expected >=6 DISPUTED_INTERPRETATION items in ${key}, got ${eb.disputedInterpretationCount}`);
    assert.ok(eb.unverifiedMaterialCount>=1,`Expected >=1 UNVERIFIED_MATERIAL items in ${key}, got ${eb.unverifiedMaterialCount}`);
    assert.equal(eb.unreviewedProvisionalClaimsCount,1,`Expected 1 initial unreviewed provisional claim in ${key}`);
    assert.equal(eb.readyForPromotion,false,`Initial provisional inquiry ${key} must not be readyForPromotion before review`);

    // Verify full compatibility with v0.2 6-step Story Journey and 3 progressive reading depths
    const journey=E.buildStoryJourney(inq,{},true);
    assert.equal(journey.steps.length,6);
    assert.equal(journey.depths.length,3);
    assert.equal(journey.quickLook.steps.length,6);
    assert.ok(journey.quickLook.wordCount>=120&&journey.quickLook.wordCount<=420);
    assert.equal(journey.explore.concepts.length,4);
    assert.equal(journey.explore.exhibit.hotspots.length,4);
    assert.ok(journey.explore.sourceChallenge.options.length>=3);
  }
});

test('v0.3 Requirement 5A: Adversarial tests for hallucinations, fabricated citations, and misleading analogies block promotion across all 4 subjects',()=>{
  // 1. Unreviewed UNVERIFIED_MATERIAL blocks immediate promotion
  const esp=E.researchHistoricalSubject('the history of espionage');
  const blockedInitial=E.promoteProvisionalInquiry(esp,{},{reviewerNote:'Attempting premature promotion without reviewing unverified claims.'});
  assert.equal(blockedInitial.promoted,false);
  assert.equal(blockedInitial.status,'PROMOTION_BLOCKED');
  assert.ok(blockedInitial.blockers.some(b=>b.code==='UNREVIEWED_PROVISIONAL_MATERIAL'));

  // 2. Fabricated citation URL (placeholder or HTTP) blocks validation & promotion
  const espBadUrl=E.researchHistoricalSubject('espionage');
  E.correctProvisionalClaim(espBadUrl,'espionage-facts-6',{reviewerNote:'Corrected capability-vs-intentions scope.'});
  espBadUrl.sources.push({
    id:'esp-fake-url',
    title:'Fabricated Intelligence Archive',
    author:'Fake Author',
    url:'https://example.com/fake-archive-doc',
    type:'primary',
    locator:'Section 1',
    accessed:'2026-11-09',
    rights:'Public Domain',
    notes:'Fake source for testing.'
  });
  const blockedFakeUrl=E.promoteProvisionalInquiry(espBadUrl,{},{reviewerNote:'Testing fabricated URL detection.'});
  assert.equal(blockedFakeUrl.promoted,false);
  assert.ok(blockedFakeUrl.blockers.some(b=>b.code==='FABRICATED_OR_INVALID_CITATION'));

  // 3. Hallucinated direct quote / quote smuggled onto SYNOPSIS_ONLY source is caught and refused
  const espBadQuote=E.researchHistoricalSubject('espionage');
  assert.throws(()=>E.correctProvisionalClaim(espBadQuote,'espionage-facts-6',{
    correctedText:'Christopher Andrew wrote verbatim that "Ultra decrypts single-handedly won every battle in Europe without human spies" in the 1944 campaign.',
    correctedSourceIds:['esp-ultra-nsa','esp-andrew-jeffreys-historiography'],
    reviewerNote:'Testing unverified quotation injection.'
  }),/Unverified quotation without exact locator/);

  // 4. Misleading analogies across all 4 new subjects are rejected by evaluateComparisonCandidate and block promotion
  const misleadingAnalogies=[
    ['espionage',{
      claim:'Because Bletchley Park Ultra and CORONA satellites succeeded, modern technical signals intelligence and AI surveillance have eliminated strategic surprise and replaced human intelligence.',
      limit:'Cold War satellites used film return capsules rather than digital downlinks.'
    },/SIGNALS_INTELLIGENCE_OMNISCIENCE_FALLACY/],
    ['espionage',{
      claim:'Cold War intelligence history proves that executive agencies can conduct warrantless domestic collection without drifting into civil-liberties abuses.',
      limit:'Telegraph companies in 1945 used paper tape rather than fiber-optic packets.'
    },/UNCHECKED_COVERT_AUTHORITY_FALLACY/],
    ['influenza-1918',{
      claim:'St. Louis’s October 1918 school and theater closures permanently eradicated influenza in the city and avoided any second wave after restrictions were lifted in November.',
      limit:'1918 cities relied on horse-drawn ambulances and newspaper notices.'
    },/PREMATURE_RELAXATION_REBOUND_OMISSION/],
    ['printing-press',{
      claim:'Gutenberg’s movable-type printing press automatically guaranteed error-free texts and naturally self-corrected misinformation without verification institutions.',
      limit:'Early modern presses were operated by hand screws.'
    },/TECHNOLOGICAL_DETERMINISM_PRINT_FIXITY_FALLACY/],
    ['dust-bowl-1930s',{
      claim:'The 1935 Soil Conservation Service rapidly restored eroded Great Plains farmland values by 1940 without long-term economic loss or out-migration.',
      limit:'1930s tractors had lower horsepower than modern combines.'
    },/SHORT_RUN_SOIL_RECOVERY_OVERCLAIM/]
  ];

  for(const [key,cand,expectedRe] of misleadingAnalogies){
    const inq=E.researchHistoricalSubject(key);
    const res=E.evaluateComparisonCandidate(cand,inq);
    assert.equal(res.verdict,'REJECTED',`Expected REJECTED on ${key} misleading analogy`);
    assert.ok(res.reasons.some(r=>expectedRe.test(r)),`Expected ${expectedRe} in ${JSON.stringify(res.reasons)}`);
  }
});

test('v0.3 Requirement 5B: Source withdrawal, claim correction, and promotion to VERIFIED_LOCAL succeed across all 4 unfamiliar subjects and guided custom scaffolds',()=>{
  const subjects=['espionage','influenza-1918','printing-press','dust-bowl-1930s'];
  for(const key of subjects){
    const inq=E.researchHistoricalSubject(key);
    const targetSrcId=inq.consequentialCorrection.targetSourceId;
    const targetSrc=inq.sources.find(s=>s.id===targetSrcId);
    assert.ok(targetSrc);

    // 1. Test consequential source withdrawal on the provisional inquiry
    const corr=E.evaluateConsequentialCorrection(inq,targetSrcId,'WITHDRAWN',inq.consequentialCorrection.challengeReason);
    assert.ok(corr.changedCount+corr.argumentsChangedCount>=1,`Expected narrowed records/arguments when withdrawing ${targetSrcId} in ${key}`);

    // Active source withdrawal hold blocks promotion until resolved
    const unverifiedFact=inq.facts.find(f=>f.epistemicStatus==='UNVERIFIED_MATERIAL');
    E.correctProvisionalClaim(inq,unverifiedFact.id,{
      reviewerNote:`Verified primary locator for ${unverifiedFact.id} and replaced unverified popular claim.`
    });

    const holdOverrides={
      [targetSrcId]:{status:'WITHDRAWN',reason:'Holding synopsis source during audit.',boundSha256:targetSrc.sha256}
    };
    const blockedByHold=E.promoteProvisionalInquiry(inq,holdOverrides,{
      reviewerNote:'Attempting promotion while a source is actively withdrawn.'
    });
    assert.equal(blockedByHold.promoted,false);
    assert.ok(blockedByHold.blockers.some(b=>b.code==='ACTIVE_SOURCE_WITHDRAWAL_HOLD'));

    // 2. Once source challenge is resolved/restored and unverified claim is corrected, promotion succeeds
    const promotedRes=E.promoteProvisionalInquiry(inq,{},{
      reviewerNote:`Completed 3-axis source inspection and primary locator verification for ${key}.`
    });
    assert.equal(promotedRes.promoted,true,`Expected promotion to succeed for ${key}: ${JSON.stringify(promotedRes.blockers)}`);
    assert.equal(promotedRes.status,'PROMOTED_TO_VERIFIED_LOCAL');
    assert.equal(inq.inquiryStatus,'VERIFIED_LOCAL');
    assert.equal(inq.promotedToVerified,true);
    assert.equal(promotedRes.receipt.receiptSha256.length,64);
    assert.equal(promotedRes.epistemicBreakdown.unreviewedProvisionalClaimsCount,0);
  }

  // Also test Guided Custom Scaffold workflow (e.g. "the 1956 Suez Crisis")
  const customInq=E.researchHistoricalSubject('What happened during the 1956 Suez Crisis?');
  assert.equal(customInq.researchMode,'GUIDED_CUSTOM_SCAFFOLD');
  assert.equal(customInq.epistemicBreakdown.unreviewedProvisionalClaimsCount,1);
  const blockedCustom=E.promoteProvisionalInquiry(customInq,{},{reviewerNote:'Premature custom promotion.'});
  assert.equal(blockedCustom.promoted,false);

  const unvCustomId=customInq.epistemicBreakdown.unreviewedProvisionalClaims[0].id;
  E.quarantineProvisionalClaim(customInq,unvCustomId,'Quarantining unverified draft hypothesis until specific archival box locators are bound.');
  const promotedCustom=E.promoteProvisionalInquiry(customInq,{},{
    reviewerNote:'Quarantined unverified hypothesis; remaining methodological scaffold verified against repository cards.'
  });
  assert.equal(promotedCustom.promoted,true);
  assert.equal(promotedCustom.status,'PROMOTED_TO_VERIFIED_LOCAL');
});
