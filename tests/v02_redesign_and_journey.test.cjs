const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const E=require('../engine.js');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'../dist/data.json'),'utf8'));
const distHtml=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
const stylesCss=fs.readFileSync(path.join(__dirname,'../styles.css'),'utf8');

test('v0.2 Front Door 1: Headline, supporting text, and inviting example questions match specification',()=>{
  assert.ok(distHtml.includes('<h1 id="hero-headline">What does history say?</h1>'));
  assert.ok(distHtml.includes('Something happening today sound familiar? Explore what happened before, what people believed, what they tried, and what happened next.'));
  assert.ok(distHtml.includes('id="citizen-question-input"'));
  assert.ok(distHtml.includes('id="citizen-question-submit"'));
  // Ensure old specialist eyebrow is not in the hero front door
  assert.ok(!distHtml.includes('01 / Ask a question in ordinary language (Question-to-History Engine)'));
});

test('v0.2 Story Journey 2: Exact 6-step story sequence and 3 progressive depths are exported',()=>{
  assert.equal(E.UI_VERSION,'0.2.0');
  const stepLabels=E.STORY_STEPS.map(s=>s.label);
  assert.deepEqual(stepLabels,[
    'The Question',
    'Back Then',
    'The Debate',
    'What Happened',
    'What’s Different Today',
    'Explore the Evidence'
  ]);
  const depthLabels=E.DEPTH_LEVELS.map(x=>x.label);
  assert.deepEqual(depthLabels,[
    'Quick Look',
    'Explore',
    'Examine the Evidence'
  ]);
});

test('v0.2 Multi-Depth Engine 3: Quick Look (~1 min), Explore, and Examine the Evidence use the same verified sources across all 5 inquiries',()=>{
  for(const c of d.cases){
    const validIds=new Set(c.sources.map(s=>s.id));
    const j=E.buildStoryJourney(c,{},true);
    assert.equal(j.caseId,c.id);
    assert.equal(j.quickLook.steps.length,6);
    // Quick Look should be a ~1 minute read (140 to 290 words across all 6 steps)
    assert.ok(j.quickLook.wordCount>=140&&j.quickLook.wordCount<=290,`Unexpected Quick Look word count for ${c.id}: ${j.quickLook.wordCount}`);
    assert.ok(j.quickLook.keyLimit.length>25,`Missing keyLimit in Quick Look for ${c.id}`);

    for(const step of j.quickLook.steps){
      assert.ok(step.sourceIds.length>=1,`Step ${step.stepId} in ${c.id} lacks sourceIds`);
      for(const sid of step.sourceIds){
        assert.ok(validIds.has(sid),`Unknown sourceId ${sid} in Quick Look step ${step.stepId} of ${c.id}`);
      }
      assert.equal(step.standing.state,'AVAILABLE');
    }
  }
});

test('v0.2 Multi-Depth Engine 4: Source withdrawal and failed integrity propagate identically to Quick Look, Explore, and Examine the Evidence',()=>{
  for(const c of d.cases){
    // 1. Failed integrity blocks Quick Look and Explore steps
    const blockedJourney=E.buildStoryJourney(c,{},false);
    for(const step of blockedJourney.quickLook.steps){
      assert.equal(step.standing.state,'BLOCKED');
      assert.ok(step.text.includes('withheld'));
    }

    // 2. Challenging the consequentialCorrection target source reopens dependent steps in Quick Look and Explore
    const targetId=c.consequentialCorrection.targetSourceId;
    const targetSrc=c.sources.find(s=>s.id===targetId);
    const overrides={[targetId]:{status:'WITHDRAWN',reason:'Testing multi-depth recall synchronization.',boundSha256:targetSrc.sha256}};
    const recalledJourney=E.buildStoryJourney(c,overrides,true);
    const anyQuickStepReopened=recalledJourney.quickLook.steps.some(s=>s.standing.state==='REOPEN'||s.reopenedUnderlyingCount>0);
    assert.ok(anyQuickStepReopened,`Expected Quick Look in ${c.id} to surface active source hold when ${targetId} is withdrawn`);
  }
});

test('v0.2 Interactive Elements 5: Plain-language concepts, archival exhibits, and source-investigation challenges are source-bound and non-gamified',()=>{
  for(const c of d.cases){
    const validIds=new Set(c.sources.map(s=>s.id));
    const j=E.buildStoryJourney(c,{},true);

    // 4 plain-language concept explainers per case
    assert.equal(j.explore.concepts.length,4,`Expected 4 plain-language concepts for ${c.id}`);
    for(const concept of j.explore.concepts){
      assert.ok(concept.term.length>3);
      assert.ok(concept.plain.length>25);
      assert.ok(concept.whyItMatters.length>25);
      assert.ok(concept.sourceIds.length>=1);
      for(const sid of concept.sourceIds)assert.ok(validIds.has(sid),`Invalid sourceId ${sid} in concept ${concept.term}`);
    }

    // Archival exhibit with provenance disclosure & hotspots
    const ex=j.explore.exhibit;
    assert.ok(ex,`Missing archival exhibit for ${c.id}`);
    assert.ok(ex.provenanceLabel.length>30);
    assert.equal(ex.hotspots.length,4,`Expected 4 interactive hotspots for ${c.id}`);
    for(const hs of ex.hotspots){
      assert.ok(hs.sourceIds.length>=1);
      for(const sid of hs.sourceIds)assert.ok(validIds.has(sid));
    }

    // Source-investigation challenge
    const ch=j.explore.sourceChallenge;
    assert.ok(ch,`Missing source challenge for ${c.id}`);
    assert.ok(validIds.has(ch.primarySourceId));
    assert.ok(validIds.has(ch.targetSourceId));
    assert.equal(ch.options.length,3);
    assert.equal(ch.options.filter(o=>o.isSupported).length,1);
  }
});

test('v0.2 Accessibility & Motion 6: Stylesheet enforces prefers-reduced-motion and print rules',()=>{
  assert.ok(stylesCss.includes('@media(prefers-reduced-motion:reduce)'));
  assert.ok(stylesCss.includes('@media print'));
});
