'use strict';
const E=HistoryEvidence, $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='openline-history-notebook-v1-'+DATA_HASH;
let notebook={schema:'openline-history-notebook.v1',dataHash:DATA_HASH,challenges:[],events:[],standing:{},worksheets:{}}, persistence=true, integrity=false, active='hormuz', tabName='timeline', lastAnalogyResult=null, compareOtherCaseId='banking', currentQuestionText='What can history tell us about a prolonged Strait of Hormuz disruption?';
const sections=[
  ['timeline','Timeline & record'],
  ['arguments','Arguments & expectations'],
  ['compare','Compare & falsify'],
  ['outcomes','Outcomes & counterexamples'],
  ['perspectives','Interpretations'],
  ['sources','Sources (3-Axis)'],
  ['notebook','Challenge & correction'],
  ['educator','Educator']
];
try{
  E.validate(DATA);
  if(!DATA.cases.some(c=>c.id===active))active=DATA.cases[0].id;
  const saved=localStorage.getItem(KEY);
  if(saved){const parsed=E.validateNotebook(JSON.parse(saved),DATA);if(parsed.dataHash===DATA_HASH)notebook=parsed;else persistence=false;}
}catch(e){persistence=false;}
const current=()=>DATA.cases.find(c=>c.id===active)||DATA.cases[0];
function notify(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(notify.timer);notify.timer=setTimeout(()=>$('#toast').classList.remove('show'),5000);}
function save(){try{localStorage.setItem(KEY,JSON.stringify(notebook));persistence=true;}catch{persistence=false;notify('Browser storage unavailable. Export your notebook to keep this work.');}$('#note-count').textContent=notebook.challenges.length;}
async function sha(v){return E.sha256(v);}
function download(name,obj,type='application/json'){const a=document.createElement('a');const blob=new Blob([typeof obj==='string'?obj:JSON.stringify(obj,null,2)+'\n'],{type});const u=URL.createObjectURL(blob);a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
function source(c,id){return c.sources.find(s=>s.id===id);}
function sourceType(s){
  const ax=E.verifyEvidenceAxes(s,notebook.standing,integrity);
  if(ax.provenanceStanding==='ABSTRACT_OR_SYNOPSIS_ONLY')return 'Scholarship · Abstract/Synopsis only';
  if(s.type==='primary')return 'Primary record';
  if(s.type.startsWith('scholar'))return 'Scholarship';
  return 'Institutional account';
}
function refs(item,c=current()){
  return `<div class="source-chips">${(item.sourceIds||[]).map(id=>{
    const s=source(c,id);
    const st=notebook.standing[id]?.status||'ACTIVE';
    const tag=st!=='ACTIVE'?` (${st})`:'';
    return `<button class="source-chip" data-case-source="${esc(c.id)}" data-source="${esc(id)}" title="${esc(s?.title||'Missing source')}">[${c.sources.findIndex(x=>x.id===id)+1}] ${esc((s?.author||'').split(';')[0].split(',')[0]||id)}${esc(tag)}</button>`;
  }).join('')}</div>`;
}
function status(item,c=current()){return E.standing(item,c.sources,notebook.standing,integrity);}
function actions(item){
  const count=notebook.challenges.filter(x=>x.itemId===item.id&&x.status==='OPEN').length;
  return `<div class="record-actions"><span class="help">${count?count+' open challenge'+(count>1?'s':''):''}</span><button class="challenge-link" data-challenge="${esc(item.id)}">Challenge this reasoning ↗</button></div>`;
}
function blocked(item,c=current()){
  const s=status(item,c);
  if(s.state==='AVAILABLE')return '';
  const consequenceLabel=s.consequence==='QUARANTINED_SOLE_SOURCE'
    ?'QUARANTINED · SOLE SOURCE CHALLENGED'
    :s.consequence==='CHANGED_SURVIVING_BASIS'
    ?'REOPENED · NARROWED TO SURVIVING INDEPENDENT EVIDENCE'
    :s.state+' · REVIEW REQUIRED';
  return `<div class="reopen"><strong>${esc(consequenceLabel)}</strong><br>${esc(s.reason)} ${s.survivingText?'Unverified dependence on the challenged source is withheld; see the surviving independent basis below.':'The explanation is withheld until its evidence is reviewed.'}${s.survivingText?`<div class="surviving-box"><strong>Surviving independent basis (${esc(s.survivingSourceIds.join(', '))}):</strong><br>${esc(s.survivingText)}</div>`:''}</div>`;
}
function causalMeta(item){
  if(!item.causalStatus||item.causalStatus==='DOCUMENTED_RECORD')return '';
  const label=item.causalStatus==='DOCUMENTED_OUTCOME'?'Documented outcome (bounded effect)':item.causalStatus==='CONFOUNDED_SEQUENCE'?'Confounded sequence (multiple simultaneous causes)':'Causal hypothesis (open to falsification)';
  const conf=Array.isArray(item.confounders)&&item.confounders.length?`<br><strong>Confounders:</strong> ${esc(item.confounders.join(' · '))}`:'';
  const gap=item.counterfactualGap?`<br><strong>Counterfactual limit:</strong> ${esc(item.counterfactualGap)}`:'';
  return `<div class="meta-box"><strong>Causal status:</strong> ${esc(label)}${conf}${gap}</div>`;
}
function card(item,kind='Record',title=''){
  const pillClass=kind==='Record'?'fact':kind.includes('Counterexample')?'rejected':'interpretation';
  return `<article class="record" id="${esc(item.id)}"><div class="pill-row"><span class="pill ${pillClass}">${esc(kind)}</span>${item.causalEmphasis?`<span class="pill axis">Emphasis: ${esc(item.causalEmphasis)}</span>`:''}</div>${blocked(item)||`${title?`<h4>${esc(title)}</h4>`:''}<p>${esc(item.text)}</p>${causalMeta(item)}`}${refs(item)}${actions(item)}</article>`;
}
function boundaries(){return `<aside class="boundaries"><h3>Where this<br>comparison stops.</h3><ul>${current().limits.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></aside>`;}
function expectationBadge(verdict){
  if(verdict==='SUPPORTED_WITH_LIMITS')return `<span class="pill fact">EXPECTATION SUPPORTED (WITH LIMITS)</span>`;
  if(verdict==='CONTRADICTED_BY_EVENTS')return `<span class="pill rejected">EXPECTATION CONTRADICTED BY EVENTS</span>`;
  return `<span class="pill uncertainty">MIXED &amp; CONFOUNDED OUTCOME</span>`;
}
function renderArgumentCard(arg,c=current()){
  const st=status(arg,c);
  const isReopened=st.state!=='AVAILABLE';
  return `<article class="arg-card" id="${esc(arg.id)}">
    <div class="arg-card-head">
      <div>
        <div class="pill-row">
          <span class="pill interpretation">COMPARABLE HISTORICAL ARGUMENT</span>
          <span class="pill axis">${esc(arg.decisionWindow||'Historical decision window')}</span>
          ${expectationBadge(arg.expectationVerdict)}
        </div>
        <h4>${esc(arg.topic)}</h4>
        <span class="help"><strong>Contemporary actors:</strong> ${esc(arg.contemporaryActor)}</span>
      </div>
    </div>
    ${isReopened?blocked(arg,c):`
    <div class="arg-columns">
      <div class="arg-col">
        <strong class="col-label">1. What contemporaries argued</strong>
        <p>${esc(arg.contemporaryArgument)}</p>
      </div>
      <div class="arg-col">
        <strong class="col-label">2. What policymakers expected</strong>
        <p>${esc(arg.policymakerExpectation)}</p>
      </div>
      <div class="arg-col">
        <strong class="col-label">3. What actually happened afterward</strong>
        <p>${esc(arg.subsequentEvidence)}</p>
      </div>
      <div class="arg-col">
        <strong class="col-label">4. What later historians concluded</strong>
        <p>${esc(arg.laterHistoriography)}</p>
      </div>
    </div>
    <div class="arg-limit-bar"><strong>Where this argument’s lesson stops being reliable:</strong> ${esc(arg.differenceThatLimits)}</div>`}
    ${refs(arg,c)}
    ${actions(arg)}
  </article>`;
}
function renderQuestionBriefing(){
  const container=$('#question-briefing');
  if(!container)return;
  const inputEl=$('#citizen-question-input');
  if(inputEl&&!inputEl.value)inputEl.value=currentQuestionText;
  const res=E.askHistory(currentQuestionText,DATA,notebook.standing,integrity);
  const statusPill=res.status==='SUPPORTED'
    ?`<span class="pill fact">SUPPORTED BY VERIFIED DOSSIER(S) · ${esc(res.boundaryCode)}</span>`
    :res.status==='PARTIALLY_SUPPORTED'
    ?`<span class="pill uncertainty">PARTIALLY SUPPORTED · COVERAGE GAPS DISCLOSED (${esc(res.boundaryCode)})</span>`
    :`<span class="pill rejected">UNSUPPORTED · REFUSED TO MANUFACTURE PRECEDENT (${esc(res.boundaryCode)})</span>`;

  const gapsHtml=res.missingCoverage&&res.missingCoverage.length
    ?`<div class="coverage-gaps" id="question-coverage-gaps">
        <h4>Evidence boundary &amp; coverage limits for this question</h4>
        <ul>${res.missingCoverage.map(g=>`<li>${esc(g)}</li>`).join('')}</ul>
      </div>`
    :'';

  const precedentsHtml=res.precedents.map(p=>{
    const caseObj=DATA.cases.find(x=>x.id===p.caseId)||current();
    const corrNotice=p.activeCorrectionSummary.reopenedRecordsCount>0||p.activeCorrectionSummary.reopenedArgumentsCount>0
      ?`<div class="reopen"><strong>Active Consequential Hold in Notebook (${esc(p.activeCorrectionSummary.challengedSourceIds.join(', '))}):</strong> ${p.activeCorrectionSummary.reopenedRecordsCount} of ${p.activeCorrectionSummary.totalRecordsCount} core records and ${p.activeCorrectionSummary.reopenedArgumentsCount} of ${p.activeCorrectionSummary.totalArgumentsCount} argument chains are reopened/narrowed to surviving independent sources.</div>`
      :'';
    return `<section class="precedent-packet" data-precedent-case="${esc(p.caseId)}">
      <div class="precedent-top">
        <div>
          <div class="pill-row">
            <span class="pill fact">PRECEDENT DOSSIER: ${esc(p.caseId.toUpperCase())}</span>
            <span class="pill axis">${esc(p.place)} · ${esc(p.period)}</span>
            <span class="pill axis">${p.sourcesAndStanding.length} verified sources</span>
          </div>
          <h4>${esc(p.title)} — ${esc(p.question)}</h4>
          <p class="help"><strong>Why this precedent was retrieved:</strong> ${esc(p.matchReasons.join(' · '))}</p>
        </div>
        <div class="notebook-controls" style="margin:0">
          <button type="button" data-open-dossier="${esc(p.caseId)}" data-open-tab="arguments">Compare arguments in workbench ↘</button>
          <button type="button" class="secondary" data-open-dossier="${esc(p.caseId)}" data-open-tab="timeline">Open full dossier ↘</button>
        </div>
      </div>
      ${corrNotice}
      <div class="precedent-grid">
        <div class="precedent-cell">
          <h5>1. Why this precedent is relevant</h5>
          <p>${esc(p.whyRelevant)}</p>
        </div>
        <div class="precedent-cell">
          <h5>2. Competing scholarly interpretations (${p.competingInterpretations.length})</h5>
          <ul>${p.competingInterpretations.map(i=>`<li><strong>${esc(i.title)}</strong> (${esc(i.causalEmphasis||'Competing thesis')})${i.standing?.state!=='AVAILABLE'?` <span class="pill uncertainty">[${esc(i.standing.consequence)}]</span>`:''}: ${esc(i.text)}${refs(i,caseObj)}</li>`).join('')}</ul>
        </div>
        <div class="precedent-cell">
          <h5>3. What happened afterward (outcomes &amp; failures)</h5>
          <ul>
            ${p.whatHappenedAfterward.documentedOutcomes.slice(0,2).map(o=>`<li><strong>Outcome${o.standing?.state!=='AVAILABLE'?` [${esc(o.standing.consequence)}]`:''}:</strong> ${esc(o.text)}${refs(o,caseObj)}</li>`).join('')}
            ${p.whatHappenedAfterward.counterexamplesAndFailures.slice(0,2).map(ce=>`<li><strong>Counterexample (${esc(ce.title)}):</strong> ${esc(ce.failureCondition)}${refs(ce,caseObj)}</li>`).join('')}
          </ul>
        </div>
        <div class="precedent-cell">
          <h5>4. Differences that limit the comparison</h5>
          <ul>${p.differencesThatLimit.caseBoundaries.map(lim=>`<li>${esc(lim)}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="section-line" style="margin-top:14px"><h3>Comparable historical arguments: What contemporaries believed vs. what happened &amp; what historians concluded (${p.comparableArguments.length})</h3><span>Distinguishing participant expectations from hindsight</span></div>
      <div class="arg-matrix">
        ${(caseObj.historicalArguments||[]).map(arg=>renderArgumentCard(arg,caseObj)).join('')}
      </div>
    </section>`;
  }).join('');

  container.innerHTML=`<div class="briefing-box">
    <div class="briefing-header">
      <div>
        <div class="pill-row">${statusPill}<span class="pill axis">Curated as of 2026-11-08</span></div>
        <h3>Question: “${esc(res.question)}”</h3>
        <p style="margin:6px 0 0;font-size:14px">${esc(res.explanation)}</p>
      </div>
    </div>
    <div class="briefing-scope">
      <strong>Causal &amp; Scope Guardrail:</strong> ${esc(res.causalGuardrailNotice)} <em>(${esc(res.libraryScope.scopeNotice)})</em>
    </div>
    ${gapsHtml}
    ${precedentsHtml}
  </div>`;
}
function renderCitizenGuide(){
  const c=current(), g=c.citizenGuide;
  if(!g)return '';
  const cells=[
    ['01 · What happened before?',g.whatHappenedBefore,'timeline','Inspect timeline & records ↗'],
    ['02 · What were people arguing?',`Inspect ${E.historicalArguments(c).length} structured debates comparing contemporary expectations against subsequent events and later scholarship.`,'arguments','Compare historical arguments ↗'],
    ['03 · What’s different?',g.whatsDifferent,'compare','Inspect analogy limits ↗'],
    ['04 · What worked?',g.whatWorked,'outcomes','Inspect documented outcomes ↗'],
    ['05 · What failed?',g.whatFailed,'outcomes','Inspect counterexamples ↗'],
    ['06 · How do we know?',g.howWeKnow,'sources','Inspect 3-axis sources ↗']
  ];
  return `<details class="citizen-guide" open><summary><span>QUICK CITIZEN GUIDE · 6 QUESTIONS TO TEST THIS INQUIRY</span><span class="help">Toggle overview</span></summary><div class="citizen-grid">${cells.map(([h,p,tab,btn])=>`<div class="citizen-cell"><div><h4>${esc(h)}</h4><p>${esc(p)}</p></div><button class="citizen-jump" data-tab="${esc(tab)}">${esc(btn)}</button></div>`).join('')}</div></details>`;
}
function renderTimeline(){
  const c=current();
  return `<div class="panel-intro"><div><h3>Follow the sequence. Question the cause.</h3><p>Events are ordered by date. Spacing is schematic, not a time scale. A later event does not establish the cause of an earlier change.</p></div><span class="pill fact">RECORDS, WITH ATTRIBUTION</span></div><ol class="timeline">${c.timeline.map(i=>`<li>${blocked(i)||`<time>${esc(i.date)}</time><h4>${esc(i.title)}</h4><p>${esc(i.text)}</p>`}${refs(i)}${actions(i)}</li>`).join('')}</ol><div class="section-line"><h3>What the records establish (${c.facts.length} verified records)</h3><span>Inspect the source behind each statement</span></div><div class="facts-grid">${c.facts.map(i=>card(i)).join('')}</div>${boundaries()}`;
}
function renderArguments(){
  const c=current();
  const args=E.historicalArguments(c);
  if(compareOtherCaseId===c.id){
    const fallback=DATA.cases.find(x=>x.id!==c.id);
    if(fallback)compareOtherCaseId=fallback.id;
  }
  const otherCase=DATA.cases.find(x=>x.id===compareOtherCaseId)||DATA.cases.find(x=>x.id!==c.id)||c;
  const otherArgs=E.historicalArguments(otherCase);
  return `<div class="panel-intro"><div><h3>Make the arguments themselves comparable.</h3><p>What were people arguing at the time? What did policymakers believe would happen? Which expectations were supported or contradicted by subsequent events, and how did later historians' conclusions diverge from contemporary beliefs?</p></div><span class="pill interpretation">${args.length} COMPARABLE ARGUMENT CHAINS</span></div>
  <div class="arg-matrix">${args.map(arg=>renderArgumentCard(arg,c)).join('')}</div>
  <div class="comparator-bar">
    <label for="compare-other-case"><strong>Cross-Inquiry Argument Comparator:</strong> Compare ${esc(c.title)} arguments side-by-side with another dossier:</label>
    <select id="compare-other-case">
      ${DATA.cases.filter(x=>x.id!==c.id).map(x=>`<option value="${esc(x.id)}" ${x.id===otherCase.id?'selected':''}>${esc(x.title)} (${esc(x.period)})</option>`).join('')}
    </select>
  </div>
  <div class="section-line"><h3>Side-by-side comparison with: ${esc(otherCase.title)} (${esc(otherCase.period)})</h3><span>Notice how policymaker expectations and structural limits differ across domains</span></div>
  <div class="arg-matrix">${otherArgs.slice(0,2).map(arg=>renderArgumentCard(arg,otherCase)).join('')}</div>
  ${boundaries()}`;
}
function renderCompare(){
  const c=current(), rejs=c.rejectedComparisons||[];
  return `<div class="panel-intro"><div><h3>A resemblance is a starting question—not a prediction.</h3><p>The historical column is sourced. The present-day column contains dated investigative prompts (as of ${esc(c.asOfDate||'2026-11-08')}) and intervention timeframes. Below the defensible comparisons, inspect rejected analogies that fail structural or evidentiary checks.</p></div><span class="pill interpretation">DEFENSIBLE VS. REJECTED ANALOGIES</span></div><div class="comparison-labels"><span>DIMENSION &amp; CLOCK</span><span>HISTORICAL RECORD</span><span>WHAT TO EXAMINE TODAY &amp; LIMIT</span></div>${c.comparison.map(i=>`<article class="comparison-row" id="${esc(i.id)}"><div class="dimension"><h4>${esc(i.dimension)}</h4>${i.timeframe?`<span class="pill axis">Clock: ${esc(i.timeframe)}</span>`:''}</div>${blocked(i)?`<div>${blocked(i)}${refs(i)}</div><div>${actions(i)}</div>`:`<div><span class="present-label">HISTORICAL RECORD</span><p>${esc(i.historical)}</p>${refs(i)}</div><div><span class="present-label">INVESTIGATIVE PROMPT · AS OF ${esc(i.asOfDate||'2026-11-08')}</span><p>${esc(i.present)}</p><p class="limit"><strong>Where this analogy breaks</strong><br>${esc(i.limit)}</p>${actions(i)}</div>`}</article>`).join('')}<div class="section-line" style="margin-top:36px"><h3>Rejected comparisons — why misleading analogies fail (${rejs.length})</h3><span>Automatically flagged by the History Lab falsifier</span></div>${rejs.map(r=>`<article class="rejected-card" id="${esc(r.id)}"><div class="pill-row"><span class="pill rejected">REJECTED · MISLEADING ANALOGY</span><span class="pill axis">${esc(r.failureCode)}</span></div><h4>Misleading claim: “${esc(r.claim)}”</h4><p><strong>Why this comparison fails:</strong> ${esc(r.whyItFails)}</p><div class="meta-box"><strong>Decisive counter-evidence:</strong> ${esc(r.counterEvidence)}</div>${refs(r,c)}</article>`).join('')}<div class="record" style="margin-top:28px"><span class="pill uncertainty">INTERACTIVE ANALOGY FALSIFIER</span><h4>Test a proposed comparison against this dossier</h4><p class="help">Submit a candidate analogy to test whether it states an explicit breakdown limit or commits a deterministic overclaim, single-cause fallacy, or structural topology mismatch.</p><form id="analogy-test-form"><label for="analogy-claim">Proposed comparison claim</label><textarea id="analogy-claim" maxlength="2000" required placeholder="Example: Because Red Sea attacks did not spike oil prices, a Strait of Hormuz closure will inevitably be absorbed by tanker rerouting."></textarea><label for="analogy-limit">Where could this comparison break? (Leave blank to test missing-limit rejection)</label><input id="analogy-limit" maxlength="1000" placeholder="Example: Hormuz has no oceanic detour around the Cape of Good Hope and pipelines bypass less than 25% of flow."><div class="notebook-controls"><button type="submit">Evaluate comparison</button><button type="button" class="secondary" id="fill-rejected-sample">Load misleading sample</button><button type="button" class="secondary" id="fill-defensible-sample">Load bounded sample</button></div></form>${lastAnalogyResult?`<div class="${lastAnalogyResult.verdict==='REJECTED'?'reopen':'surviving-box'}" id="analogy-test-output" role="status"><strong>Verdict: ${esc(lastAnalogyResult.verdict)} (${esc(lastAnalogyResult.code)})</strong><ul>${lastAnalogyResult.reasons.length?lastAnalogyResult.reasons.map(x=>`<li>${esc(x)}</li>`).join(''):'<li>Includes an explicit structural breakdown limit and avoids deterministic predictive overclaims.</li>'}</ul></div>`:'<div id="analogy-test-output" role="status"></div>'}</div>${boundaries()}`;
}
function renderOutcomes(){
  const c=current(), ces=c.counterexamples||[];
  return `<div class="panel-intro"><div><h3>What changed, what failed, and what remains unproved.</h3><p>A policy being enacted, a behavior changing, and a harm being prevented are different findings. Every outcome below separates documented effects from confounders and decisive counterexamples.</p></div><span class="pill uncertainty">OUTCOMES &amp; COUNTEREXAMPLES</span></div><div class="outcome-grid">${c.outcomes.map(i=>card(i,'Documented outcome')).join('')}</div>${ces.length?`<div class="section-line" style="margin-top:36px"><h3>Decisive counterexamples &amp; failure conditions (${ces.length})</h3><span>Required to prevent selective confirmation bias</span></div><div class="outcome-grid">${ces.map(ce=>`<article class="record" id="${esc(ce.id)}"><div class="pill-row"><span class="pill rejected">COUNTEREXAMPLE · FAILURE MODE</span></div><h4>${esc(ce.title)}</h4><p>${esc(ce.text)}</p><div class="meta-box"><strong>Condition where intervention fails:</strong> ${esc(ce.failureCondition)}</div>${refs(ce,c)}</article>`).join('')}</div>`:''}${boundaries()}`;
}
function renderPerspectives(){
  const c=current();
  return `<div class="panel-intro"><div><h3>The explanation is open to argument.</h3><p>These scholars differ in causal emphasis and interpretation. Their claims may overlap. This selection is not a vote, a forced two-sided debate, or a survey of consensus.</p></div><span class="pill interpretation">${c.interpretations.length} COMPETING FRAMEWORKS</span></div><div class="perspectives">${c.interpretations.map(i=>card(i,'Interpretation',i.title)).join('')}</div><div class="record" style="margin-top:24px"><span class="pill uncertainty">UNRESOLVED QUESTIONS &amp; FALSIFIERS</span>${c.challengePrompts.map(p=>`<p>• ${esc(p)}</p>`).join('')}</div>`;
}
function renderSources(){
  const c=current();
  return `<div class="panel-intro"><div><h3>Go behind the explanation (3-Axis Verification).</h3><p>Every source is audited across three separate axes: (1) Cryptographic Byte Integrity (card/PDF SHA-256), (2) Provenance &amp; Inspection Depth (Primary, Institutional, Full/Excerpt Scholarship, or Abstract/Synopsis Only), and (3) Evidentiary Standing in your notebook.</p></div><button id="download-bibliography" class="secondary">Export bibliography</button></div><div class="source-list">${c.sources.map((s,n)=>{
    const ax=E.verifyEvidenceAxes(s,notebook.standing,integrity);
    return `<button class="source-card" data-source="${esc(s.id)}"><div class="pill-row"><span class="pill">${n+1} / ${esc(sourceType(s))}</span><span class="pill axis">Axis 1: ${esc(ax.byteIntegrity)}</span><span class="pill axis">Axis 2: ${esc(ax.provenanceStanding)}</span><span class="pill ${ax.evidentiaryStanding==='AVAILABLE'?'fact':'uncertainty'}">Axis 3: ${esc(ax.evidentiaryStanding)} (${esc(ax.localStatus)})</span></div><strong>${esc(s.title)}</strong><span>${esc(s.author)}</span><span>${esc(s.locator)}</span><span class="source-open">Inspect 3-axis provenance, uses &amp; standing ↗</span></button>`;
  }).join('')}</div>`;
}
function renderCorrectionDrill(c){
  const cc=c.consequentialCorrection;
  if(!cc)return '';
  const activeChallenged=c.sources.filter(s=>notebook.standing[s.id]&&notebook.standing[s.id].status!=='ACTIVE').map(s=>s.id);
  const isChallenged=activeChallenged.length>0;
  const targetIds=isChallenged?activeChallenged:[cc.targetSourceId];
  const sim=E.evaluateConsequentialCorrection(c,targetIds,isChallenged?(notebook.standing[targetIds[0]]?.status||'WITHDRAWN'):'WITHDRAWN',cc.challengeReason,notebook.standing);
  const targetLabel=targetIds.join(', ');
  return `<section class="drill-card" id="consequential-drill" aria-label="Consequential source correction lab"><div class="pill-row"><span class="pill ${isChallenged?'uncertainty':'fact'}">${isChallenged?'ACTIVE CONSEQUENTIAL HOLD IN NOTEBOOK':'CONSEQUENTIAL CORRECTION LAB · READY TO TEST'}</span><span class="pill axis">${isChallenged?'Challenged source(s): '+esc(targetLabel):'Target source: '+esc(cc.targetSourceId)}</span></div><h4>Consequential correction: What happens when ${isChallenged?`<code>${esc(targetLabel)}</code> ${targetIds.length>1?'are':'is'} challenged`:`“${esc(cc.targetSourceTitle)}” is challenged`}?</h4><p>${esc(cc.challengeReason)}</p><div class="notebook-controls">${!notebook.standing[cc.targetSourceId]||notebook.standing[cc.targetSourceId].status==='ACTIVE'?`<button type="button" id="trigger-case-correction" data-source="${esc(cc.targetSourceId)}">Challenge &amp; withdraw ${esc(cc.targetSourceId)} in notebook ⚡</button>`:`<button type="button" class="secondary" id="restore-case-correction" data-source="${esc(cc.targetSourceId)}">Restore ${esc(cc.targetSourceId)} after local review ↺</button>`}<button type="button" class="secondary" data-source="${esc(cc.targetSourceId)}">Open source card in inspector ↗</button></div><div class="drill-grid"><div class="drill-col"><strong>1. Quarantined (${sim.quarantinedCount} records with no surviving source)</strong><p class="help">Lose all supporting sources and are withheld until reviewed:</p><ul>${sim.quarantined.length?sim.quarantined.map(x=>`<li><code>${esc(x.id)}</code>: ${esc(x.title)}</li>`).join(''):'<li>None (all dependent records have a secondary source to narrow to)</li>'}</ul></div><div class="drill-col"><strong>2. Changed / Narrowed (${sim.changedCount} core records + ${sim.argumentsChangedCount} arguments)</strong><p class="help">Drop claims from <code>${esc(targetLabel)}</code> and narrow to surviving independent sources:</p><ul>${sim.changed.length?sim.changed.map(x=>`<li><code>${esc(x.id)}</code> [${esc(x.consequence)}] → survives on <b>${esc(x.survivingSourceIds.join(', '))}</b>: ${esc(x.survivingText)}</li>`).join(''):'<li>None</li>'}</ul></div><div class="drill-col"><strong>3. Survived Untouched (${sim.unaffectedCount} independent records)</strong><p class="help">Backed by unrelated accepted sources; preserved without disruption:</p><p>${sim.unaffectedCount} of ${E.items(c).length} core records and ${sim.argumentsUnaffectedCount} of ${E.historicalArguments(c).length} comparable argument chains remain <code>AVAILABLE</code>.</p></div></div></section>`;
}
function renderNotebook(){
  const c=current();
  const challenges=notebook.challenges.filter(x=>x.caseId===c.id);
  const challengeTargets=[...E.items(c),...E.historicalArguments(c)];
  return `<div class="panel-intro"><div><h3>Make the reasoning answerable.</h3><p>Challenges and source-standing changes remain local, auditable, and exportable. Challenging a source reopens only dependent records and arguments while preserving unrelated work.</p></div></div><p class="integrity ${persistence?'':'warn'}">${persistence?'Notebook saved in this browser. Export it for durable storage or peer review.':'Browser persistence is unavailable or an older dataset notebook was detected. Export this session before leaving.'}</p>${renderCorrectionDrill(c)}<div class="notebook-controls"><button id="export-notebook">Export notebook</button><button id="import-notebook" class="secondary">Import notebook</button><input class="hidden" id="notebook-file" type="file" accept="application/json,.json"></div><div class="notebook-layout"><form id="challenge-form"><h3>Open an evidence challenge</h3><label for="challenge-item">Record, argument, or comparison</label><select id="challenge-item">${challengeTargets.map(i=>`<option value="${esc(i.id)}">${esc(i.id)} · ${esc((i.title||i.topic||i.dimension||i.text||'').slice(0,75))}</option>`).join('')}</select><label for="challenge-reason">What does the evidence fail to establish?</label><textarea id="challenge-reason" minlength="10" maxlength="5000" required placeholder="Name the claim, the gap, and what evidence could change it."></textarea><label for="challenge-url">Supporting source URL (optional, HTTPS)</label><input id="challenge-url" type="url" maxlength="2000" placeholder="https://…"><button ${integrity?'':'disabled'}>Save local challenge</button><p class="help">Avoid personal information. HTML/script tags and unsafe URLs are rejected automatically.</p></form><div><h3>Challenges in this inquiry (${challenges.length})</h3>${challenges.length?challenges.map(x=>`<article class="challenge-card"><span class="pill ${x.status==='OPEN'?'uncertainty':'fact'}">${esc(x.status)} · LOCAL REVIEW</span><p class="help">${esc(x.itemId)} · ${esc(x.created)}</p><p>${esc(x.reason)}</p>${x.url?`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">Inspect proposed source ↗</a>`:''}${x.resolution?`<p><strong>Local resolution:</strong> ${esc(x.resolution)}</p>`:`<form class="resolve-form" data-id="${esc(x.id)}"><label for="resolve-${esc(x.id)}">Document a local resolution</label><textarea id="resolve-${esc(x.id)}" minlength="10" maxlength="5000" required placeholder="Explain what was checked and whether the interpretation should change."></textarea><button class="secondary">Record resolution</button></form>`}</article>`).join(''):'<p class="help">No record-level challenges yet. Every sourced record and comparable argument has a challenge link, or use the Consequential Correction Lab above to challenge a source across all its dependents.</p>'}</div></div><details style="margin-top:24px" open><summary>Auditable source-standing trail (${notebook.events.length} local events)</summary><pre>${esc(JSON.stringify(notebook.events,null,2))}</pre></details>`;
}
function renderEducator(){
  const c=current(), w=notebook.worksheets?.[c.id]||{};
  return `<div class="panel-intro"><div><h3>Run an inquiry, not a recall test.</h3><p>A suggested 25-minute activity for secondary-school, university, and civic learners. Adjust time and scaffolding for your group. No student accounts or names are needed.</p></div><button id="export-worksheet" class="secondary">Export worksheet</button></div><div class="notebook-layout"><div class="numbered"><div class="study-step"><div><h4>Compare contemporary expectations vs. hindsight · 7 min</h4><p>Open the Arguments &amp; expectations tab. Identify what contemporaries argued would happen, what subsequent events supported or contradicted, and how later historians differed.</p></div></div><div class="study-step"><div><h4>Test a defensible vs. rejected comparison · 8 min</h4><p>Choose one comparison dimension and one rejected analogy. Explain what structural difference breaks the rejected analogy.</p></div></div><div class="study-step"><div><h4>Trigger a consequential correction · 10 min</h4><p>Challenge one source in the inspector or correction lab. Record which conclusions are quarantined, which narrow to a surviving source, and which remain untouched.</p></div></div><p class="help">Assess source use, attribution, limits and willingness to revise—not agreement with an approved political conclusion.</p></div><form id="worksheet-form" class="worksheet"><label for="ws-record">What did contemporaries expect vs. what primary records establish?</label><textarea id="ws-record" data-ws="record" maxlength="5000">${esc(w.record||'')}</textarea><label for="ws-limit">Which difference breaks the misleading analogy?</label><textarea id="ws-limit" data-ws="limit" maxlength="5000">${esc(w.limit||'')}</textarea><label for="ws-test">What evidence or source challenge would change your conclusion?</label><textarea id="ws-test" data-ws="test" maxlength="5000">${esc(w.test||'')}</textarea><button>Save worksheet locally</button><p class="help">This worksheet is part of the notebook export.</p></form></div>`;
}
const renders={timeline:renderTimeline,arguments:renderArguments,compare:renderCompare,outcomes:renderOutcomes,perspectives:renderPerspectives,sources:renderSources,notebook:renderNotebook,educator:renderEducator};
function render(){
  const c=current();
  renderQuestionBriefing();
  $('#case-list').innerHTML=DATA.cases.map((x,n)=>`<button class="case-card" data-case="${esc(x.id)}" aria-pressed="${x.id===active}"><span class="card-meta"><span>${esc(x.theme)}</span><span class="card-number">0${n+1}</span></span><strong>${esc(x.question)}</strong><span class="card-foot"><span>${esc(x.period)} · ${x.sources.length} sources · ${E.historicalArguments(x).length} arguments</span><span class="arrow" aria-hidden="true">↗</span></span></button>`).join('');
  $('#case-place').textContent='03 / '+c.place+' · '+c.period;
  $('#case-title').textContent=c.title;
  const allItems=E.items(c);
  const reopenedItems=allItems.filter(i=>status(i,c).state!=='AVAILABLE');
  const reopened=reopenedItems.length;
  const narrowed=reopenedItems.filter(i=>status(i,c).consequence==='CHANGED_SURVIVING_BASIS').length;
  const quarantined=reopenedItems.filter(i=>status(i,c).consequence==='QUARANTINED_SOLE_SOURCE').length;
  $('#case-summary').textContent=reopened
    ?`Consequential Correction Active: ${reopened} of ${allItems.length} records reopened (${quarantined} sole-source quarantined, ${narrowed} narrowed to surviving independent sources, ${allItems.length-reopened} unaffected).`
    :c.summary;
  $('#integrity-status').classList.toggle('warn',reopened>0||!integrity);
  $('#integrity-status').textContent=!integrity
    ?'Evidence checks pending or failed. Explanations are withheld.'
    :reopened
    ?`Decision Recall & Consequential Correction: ${reopened} dependent records reopened (${quarantined} quarantined, ${narrowed} narrowed to surviving sources). ${allItems.length-reopened} unrelated records remain AVAILABLE.`
    :`3-Axis Verification PASS: ${c.sources.length} preserved citation cards passed SHA-256 byte checks. Checksums prove byte integrity, not historical truth or publisher signature.`;
  $('#citizen-guide-container').innerHTML=renderCitizenGuide();
  $('#tabs').innerHTML=sections.map(([id,label])=>`<button data-tab="${id}" ${id===tabName?'aria-current="page"':''}>${esc(label)}</button>`).join('');
  $('#panel').innerHTML=(renders[tabName]||renderTimeline)();
  $('#note-count').textContent=notebook.challenges.length+Object.values(notebook.standing).filter(v=>v.status!=='ACTIVE').length;
  $('#export-receipt').disabled=!integrity;
}
function openSource(id,caseId=active){
  const c=DATA.cases.find(x=>x.id===caseId)||current(),s=source(c,id);if(!s)return;
  const deps=[...E.items(c),...E.historicalArguments(c)].filter(i=>i.sourceIds&&i.sourceIds.includes(id));
  const ax=E.verifyEvidenceAxes(s,notebook.standing,integrity);
  const state=notebook.standing[id]?.status||'ACTIVE';
  $('#source-body').innerHTML=`<div class="pill-row"><span class="pill">${esc(sourceType(s))}</span><span class="pill axis">Axis 1: ${esc(ax.byteIntegrity)}</span><span class="pill axis">Axis 2: ${esc(ax.provenanceStanding)}</span><span class="pill ${state==='ACTIVE'?'fact':'uncertainty'}">Axis 3: ${esc(ax.evidentiaryStanding)} (${esc(state)})</span></div><h2 id="source-title">${esc(s.title)}</h2><p>${esc(s.author)}</p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Open original at its archive ↗</a><dl><dt>Where to look (Exact Locator)</dt><dd>${esc(s.locator)}</dd><dt>Inspection Depth &amp; Provenance Standing</dt><dd>${esc(ax.provenanceStanding)} · ${esc(s.coverage||'EXCERPT_WITH_CONTEXT')}</dd><dt>Consulted</dt><dd>${esc(s.accessed)} · curated review, no live monitoring</dd><dt>Rights &amp; access</dt><dd>${esc(s.rights)}</dd></dl>${s.attachment?`<p><a href="${esc(s.attachment.path)}" target="_blank" rel="noopener" download>Download preserved original PDF (offline in full package) ↗</a></p><div class="digest">Original PDF SHA-256<br>${esc(s.attachment.sha256)}</div>`:""}<h3>What this source can support (and its limits)</h3><p>${esc(s.notes)}</p><p class="help">${esc(ax.disclaimer)}</p><div class="digest">SHA-256 of the citation card<br>${esc(s.sha256)}</div><button class="secondary" data-card-download="${esc(id)}" data-card-case="${esc(c.id)}">Download preserved card</button><details><summary>Exact preserved card</summary><pre>${esc(E.canonical(s.card))}</pre></details><details open><summary>Used by ${deps.length} records &amp; arguments in this inquiry</summary><ul class="source-uses">${deps.map(i=>{const st=status(i,c);return `<li><code>${esc(i.id)}</code> [${esc(st.consequence)}] · ${esc(i.title||i.topic||i.dimension||i.text)}</li>`;}).join('')}</ul></details><details class="source-ops" open><summary>Researcher: change local source standing (Consequential Correction)</summary><p class="help">Changing standing reopens dependent records and comparable arguments in your notebook: sole-source claims are quarantined, while multi-source claims narrow to their surviving independent sources.</p><form id="source-standing-form" data-source="${esc(id)}" data-case="${esc(c.id)}"><label for="standing-select">New local standing</label><select id="standing-select"><option value="DISPUTED" ${state==='DISPUTED'?'selected':''}>Disputed — investigate</option><option value="WITHDRAWN" ${state==='WITHDRAWN'?'selected':''}>Withdrawn — do not use</option><option value="REVISED" ${state==='REVISED'?'selected':''}>Revision reported — recheck dependent claims</option><option value="ACTIVE" ${state==='ACTIVE'?'selected':''}>Restore after local review</option></select><label for="standing-reason">Evidence and review reason (required, min 10 chars)</label><textarea id="standing-reason" minlength="10" maxlength="5000" required>${esc(notebook.standing[id]?.reason||c.consequentialCorrection?.challengeReason||'')}</textarea><button ${integrity?'':'disabled'}>Record standing &amp; recall</button></form></details>`;
  $('#source-dialog').showModal();
}
function applySourceStanding(caseObj,id,newStatus,reason){
  if(!integrity)return;
  const s=source(caseObj,id);if(!s)return;
  notebook.events.push({type:'SOURCE_STANDING',sourceId:id,boundSha256:s.sha256,prior:notebook.standing[id]?.status||'ACTIVE',status:newStatus,reason,created:new Date().toISOString(),affected:E.affected(caseObj,id)});
  notebook.standing[id]={status:newStatus,reason,boundSha256:s.sha256};
  save();render();
}
document.addEventListener('click',async ev=>{
  const b=ev.target.closest('button');if(!b)return;
  if(b.dataset.close){document.getElementById(b.dataset.close).close();return;}
  if(b.classList.contains('sample-q')&&b.dataset.q){
    currentQuestionText=b.dataset.q;
    const inp=$('#citizen-question-input');
    if(inp)inp.value=currentQuestionText;
    const res=E.askHistory(currentQuestionText,DATA,notebook.standing,integrity);
    if(res.matchedCaseIds.length)active=res.matchedCaseIds[0];
    render();
    return;
  }
  if(b.id==='citizen-question-reset'){
    currentQuestionText='What can history tell us about a prolonged Strait of Hormuz disruption?';
    const inp=$('#citizen-question-input');
    if(inp)inp.value=currentQuestionText;
    active='hormuz';
    render();
    return;
  }
  if(b.dataset.openDossier){
    active=b.dataset.openDossier;
    if(b.dataset.openTab)tabName=b.dataset.openTab;
    render();
    $('#investigation').scrollIntoView();
    return;
  }
  if(b.dataset.case){active=b.dataset.case;lastAnalogyResult=null;location.hash=active;tabName='timeline';render();return;}
  if(b.dataset.tab){tabName=b.dataset.tab;render();const curTab=$('#tabs').querySelector('[aria-current]');if(curTab)curTab.focus();return;}
  if(b.dataset.source&&!b.id){openSource(b.dataset.source,b.dataset.caseSource||active);return;}
  if(b.dataset.challenge){
    const targetId=b.dataset.challenge;
    const ownerCase=DATA.cases.find(x=>E.items(x).some(i=>i.id===targetId)||E.historicalArguments(x).some(a=>a.id===targetId));
    if(ownerCase)active=ownerCase.id;
    tabName='notebook';render();$('#challenge-item').value=targetId;$('#challenge-reason').focus();return;
  }
  if(b.dataset.cardDownload){
    const c=DATA.cases.find(x=>x.id===b.dataset.cardCase)||current();
    const s=source(c,b.dataset.cardDownload);
    if(s)download(s.id+'-citation-card.json',s.card);
    return;
  }
  if(['method-open','footer-method'].includes(b.id)){$('#method-dialog').showModal();return;}
  if(b.id==='notebook-top'){tabName='notebook';render();$('#investigation').scrollIntoView();return;}
  if(b.id==='run-correction-drill'){tabName='notebook';render();const el=$('#consequential-drill');if(el)el.scrollIntoView();return;}
  if(b.id==='trigger-case-correction'){const c=current(),cc=c.consequentialCorrection;if(cc){applySourceStanding(c,cc.targetSourceId,'WITHDRAWN',cc.challengeReason);notify(`Consequential correction applied on ${cc.targetSourceId}. Inspect quarantined vs. narrowed records and arguments.`);}return;}
  if(b.id==='restore-case-correction'){const c=current(),cc=c.consequentialCorrection;if(cc){applySourceStanding(c,cc.targetSourceId,'ACTIVE','Restored after inspecting surviving primary basis and documenting scope limits.');notify(`Restored ${cc.targetSourceId} to ACTIVE after documented local review.`);}return;}
  if(b.id==='fill-rejected-sample'){const c=current(),r=c.rejectedComparisons?.[0];if(r){$('#analogy-claim').value=r.claim;$('#analogy-limit').value='';}return;}
  if(b.id==='fill-defensible-sample'){const c=current(),comp=c.comparison?.[0];if(comp){$('#analogy-claim').value=comp.historical+' '+comp.present;$('#analogy-limit').value=comp.limit;}return;}
  if(b.id==='export-notebook'){download('openline-history-notebook.json',notebook);return;}
  if(b.id==='import-notebook'){$('#notebook-file').click();return;}
  if(b.id==='download-bibliography'){download(current().id+'-bibliography.json',current().sources.map(s=>s.card));return;}
  if(b.id==='export-worksheet'){download(current().id+'-worksheet.json',{caseId:active,dataHash:DATA_HASH,questions:current().challengePrompts,responses:notebook.worksheets?.[active]||{}});return;}
  if(b.id==='export-receipt'){
    try{
      const c=current();
      const body={
        schema:'openline-history-receipt.v1',
        signature:'UNSIGNED',
        scope:'Citation-card and dataset byte consistency + 3-axis provenance/standing report; not historical truth or authenticated publisher signature',
        caseId:c.id,
        created:new Date().toISOString(),
        dataSha256:DATA_HASH,
        sourceCards:c.sources.map(s=>{const ax=E.verifyEvidenceAxes(s,notebook.standing,integrity);return {id:s.id,sha256:s.sha256,url:s.url,byteIntegrity:ax.byteIntegrity,provenanceStanding:ax.provenanceStanding,evidentiaryStanding:ax.evidentiaryStanding,standing:ax.localStatus};}),
        records:E.items(c).map(i=>{const st=status(i,c);return {id:i.id,sourceIds:i.sourceIds,state:st.state,consequence:st.consequence,survivingSourceIds:st.survivingSourceIds};}),
        comparableArguments:E.historicalArguments(c).map(a=>{const st=status(a,c);return {id:a.id,sourceIds:a.sourceIds,state:st.state,consequence:st.consequence,survivingSourceIds:st.survivingSourceIds};}),
        openChallenges:notebook.challenges.filter(x=>x.caseId===c.id&&x.status==='OPEN'),
        standingEvents:notebook.events.filter(e=>c.sources.some(s=>s.id===e.sourceId))
      };
      download(c.id+'-evidence-receipt.json',{body,sha256:await sha(E.canonical(body))});
      notify('Unsigned 3-axis evidence receipt exported.');
    }catch(e){notify(e.message);}
    return;
  }
  if(b.id==='print-case'){
    const before=tabName;
    $('#panel').innerHTML=renderTimeline()+renderArguments()+renderCompare()+renderOutcomes()+renderPerspectives()+renderSources()+renderEducator();
    window.print();
    tabName=before;
    render();
  }
});
document.addEventListener('submit',ev=>{
  ev.preventDefault();const f=ev.target;
  if(f.id==='citizen-question-form'){
    const q=($('#citizen-question-input').value||'').trim();
    if(!q)return;
    currentQuestionText=q;
    const res=E.askHistory(currentQuestionText,DATA,notebook.standing,integrity);
    if(res.matchedCaseIds.length)active=res.matchedCaseIds[0];
    render();
    notify(`Question evaluated: ${res.status} (${res.boundaryCode})`);
    return;
  }
  if(f.id==='unsupported-form'){
    const q=($('#other-question').value||'').trim();
    currentQuestionText=q;
    const inp=$('#citizen-question-input');
    if(inp)inp.value=q;
    const res=E.askHistory(q,DATA,notebook.standing,integrity);
    if(res.matchedCaseIds.length)active=res.matchedCaseIds[0];
    $('#unsupported-result').textContent=`${res.status} (${res.boundaryCode}) — ${res.explanation}`;
    render();
    return;
  }
  if(f.id==='analogy-test-form'){
    const claim=$('#analogy-claim').value.trim(), limit=$('#analogy-limit').value.trim();
    lastAnalogyResult=E.evaluateComparisonCandidate({claim,limit},current());
    render();
    notify(lastAnalogyResult.verdict==='REJECTED'?'Misleading or unbounded analogy rejected.':'Bounded comparison accepted with explicit limits.');
    return;
  }
  if(f.id==='challenge-form'){
    const url=$('#challenge-url').value.trim(),reason=$('#challenge-reason').value.trim();
    if(reason.length<10||url&&!E.safeURL(url)){notify('Add a substantive reason and use an HTTPS source URL.');return;}
    try{
      const candidate={id:'challenge-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),caseId:active,itemId:$('#challenge-item').value,reason,url,created:new Date().toISOString(),status:'OPEN'};
      const testNb=JSON.parse(JSON.stringify(notebook));
      testNb.challenges.push(candidate);
      E.validateNotebook(testNb,DATA);
      notebook=testNb;save();render();notify('Challenge saved locally. Export it to share.');
    }catch(e){notify('Challenge refused: '+e.message);}
    return;
  }
  if(f.matches('.resolve-form')){
    const x=notebook.challenges.find(x=>x.id===f.dataset.id),reason=f.querySelector('textarea').value.trim();
    if(reason.length<10)return;
    x.status='RESOLVED';x.resolution=reason;x.resolved=new Date().toISOString();
    save();render();notify('Local resolution recorded; historical dataset unchanged.');
    return;
  }
  if(f.id==='source-standing-form'){
    if(!integrity)return;
    const id=f.dataset.source,caseId=f.dataset.case||active,reason=$('#standing-reason').value.trim(),newStatus=$('#standing-select').value;
    if(reason.length<10){notify('Document a review reason of at least 10 characters.');return;}
    const targetCase=DATA.cases.find(x=>x.id===caseId)||current();
    applySourceStanding(targetCase,id,newStatus,reason);
    $('#source-dialog').close();
    notify(newStatus==='ACTIVE'?'Local review recorded; source standing restored.':'Dependent explanations and arguments reopened; surviving independent sources preserved.');
    return;
  }
  if(f.id==='worksheet-form'){
    notebook.worksheets=notebook.worksheets||{};
    notebook.worksheets[active]=Object.fromEntries([...f.querySelectorAll('[data-ws]')].map(e=>[e.dataset.ws,e.value]));
    save();notify('Worksheet saved in your notebook.');
  }
});
document.addEventListener('change',async ev=>{
  if(ev.target.id==='compare-other-case'){
    compareOtherCaseId=ev.target.value;
    render();
    return;
  }
  if(ev.target.id!=='notebook-file')return;
  const file=ev.target.files[0];if(!file)return;
  try{
    if(file.size>1024*1024)throw Error('Notebook exceeds the 1 MB limit');
    const incoming=JSON.parse(await file.text());
    notebook=E.mergeNotebook(notebook,incoming,DATA);
    save();render();notify('Notebook merged as unverified local material. Imported approvals cannot clear local holds.');
  }catch(e){notify('Import refused: '+e.message);}
});
addEventListener('hashchange',()=>{const next=location.hash.slice(1);if(DATA.cases.some(c=>c.id===next)){active=next;lastAnalogyResult=null;render();}});
(async()=>{
  if(DATA.cases.some(c=>c.id===location.hash.slice(1)))active=location.hash.slice(1);
  try{
    E.validate(DATA);
    if(await sha(E.canonical(DATA))!==DATA_HASH)throw Error('Dataset digest mismatch');
    for(const c of DATA.cases)for(const s of c.sources)if(await sha(E.canonical(s.card))!==s.sha256)throw Error('Citation card mismatch');
    integrity=true;render();
  }catch(e){integrity=false;render();notify('Evidence unavailable: '+e.message);}
})();

window.__historyLabState=()=>({notebook,active,tabName,integrity,persistence,currentQuestionText,DATA,DATA_HASH,Engine:E});
