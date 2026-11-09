'use strict';
const E=HistoryEvidence, $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='openline-history-notebook-v1-'+DATA_HASH;
let notebook={schema:'openline-history-notebook.v1',dataHash:DATA_HASH,challenges:[],events:[],standing:{},worksheets:{}},
  persistence=true,
  integrity=false,
  active='hormuz',
  depthMode='explore',
  storyStep='question',
  timelineIndex=0,
  timelineShowAll=false,
  revealedDebates=new Set(),
  debateReflections={},
  selectedHotspot={},
  compareFilter='all',
  selectedSleuthOption={},
  hasSubmittedQuestion=false,
  workbenchOpen=false,
  tabName='timeline',
  lastAnalogyResult=null,
  compareOtherCaseId='banking',
  currentQuestionText='What can history tell us about a prolonged Strait of Hormuz disruption?';

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

const CASE_HOOKS={
  cholera:'Soho, London (1854): Over 500 neighbors died in 10 days. Follow how house-to-house clues pointed to a water pump—and why the famous map is often misunderstood.',
  triangle:'New York City (1911): 146 garment workers died in 18 minutes inside a "fireproof" building. Follow the strike, the criminal acquittal, and the 30+ safety laws that followed.',
  banking:'United States (1933): Panicked savers rushed to pull cash from banks. Explore the 1-week pause, the radio chat, emergency Fed cash, and the ~4,200 banks left behind.',
  hormuz:'Persian Gulf & Red Sea (1956–2026): 20% of world oil and LNG passes through a narrow strait. Compare naval convoys, strategic reserves, and why Red Sea detours don’t work in a cul-de-sac.',
  'israel-palestine':'Sinai, Jordan, West Bank & Gaza (1949–2026): Why did the 1979 Sinai and 1994 Jordan peace treaties hold for decades while interim accords and short truces broke down?'
};

try{
  E.validate(DATA);
  if(!DATA.cases.some(c=>c.id===active))active=DATA.cases[0].id;
  const saved=localStorage.getItem(KEY);
  if(saved){const parsed=E.validateNotebook(JSON.parse(saved),DATA);if(parsed.dataHash===DATA_HASH)notebook=parsed;else persistence=false;}
}catch(e){persistence=false;}

const current=()=>DATA.cases.find(c=>c.id===active)||DATA.cases[0];
function notify(t){const el=$('#toast');if(!el)return;el.textContent=t;el.classList.add('show');clearTimeout(notify.timer);notify.timer=setTimeout(()=>el.classList.remove('show'),5000);}
function save(){try{localStorage.setItem(KEY,JSON.stringify(notebook));persistence=true;}catch{persistence=false;notify('Browser storage unavailable. Export your notebook to keep this work.');}const nc=$('#note-count');if(nc)nc.textContent=notebook.challenges.length;}
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
function refsBySourceIds(sourceIds,c=current()){
  return `<div class="source-chips">${(sourceIds||[]).map(id=>{
    const s=source(c,id);
    const st=notebook.standing[id]?.status||'ACTIVE';
    const tag=st!=='ACTIVE'?` (${st})`:'';
    return `<button type="button" class="source-chip" data-case-source="${esc(c.id)}" data-source="${esc(id)}" title="${esc(s?.title||'Missing source')}">[${c.sources.findIndex(x=>x.id===id)+1}] ${esc((s?.author||'').split(';')[0].split(',')[0]||id)}${esc(tag)}</button>`;
  }).join('')}</div>`;
}
function refs(item,c=current()){return refsBySourceIds(item?.sourceIds||[],c);}
function status(item,c=current()){return E.standing(item,c.sources,notebook.standing,integrity);}
function actions(item){
  const count=notebook.challenges.filter(x=>x.itemId===item.id&&x.status==='OPEN').length;
  return `<div class="record-actions"><span class="help">${count?count+' open challenge'+(count>1?'s':''):''}</span><button type="button" class="challenge-link" data-challenge="${esc(item.id)}">Challenge this reasoning ↗</button></div>`;
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
  const conf=Array.isArray(item.confounders)&&item.confounders.length?`<br><strong>Other factors acting at the same time (confounders):</strong> ${esc(item.confounders.join(' · '))}`:'';
  const gap=item.counterfactualGap?`<br><strong>What remains uncertain:</strong> ${esc(item.counterfactualGap)}`:'';
  return `<div class="meta-box"><strong>Evidence status:</strong> ${esc(label)}${conf}${gap}</div>`;
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
        <span class="help"><strong>Who was arguing:</strong> ${esc(arg.contemporaryActor)}</span>
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

/* Archival Diagram SVG Generator (Rights-Cleared, Grounded in Primary Records) */
function renderArchivalSvg(caseId){
  if(caseId==='cholera'){
    return `<svg viewBox="0 0 760 228" role="img" aria-label="1854 Broad Street Cholera daily fatal attacks chart showing peak on Sept 1-2 and steep decline before the Sept 8 pump handle removal">
      <title>1854 Broad Street Cholera Daily Fatal Attacks (Snow 1855 Table I) &amp; 40 Broad Street Cesspool Diagram</title>
      <rect width="760" height="228" fill="#faf8f0" rx="6"/>
      <text x="20" y="26" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#172a27">Daily Fatal Attacks in Soho (Aug 30 – Sept 12, 1854 · Snow 1855 Table I)</text>
      <line x1="40" y1="165" x2="480" y2="165" stroke="#53605a" stroke-width="1.5"/>
      <!-- Bars: Aug30:8, Aug31:56, Sept1:143, Sept2:116, Sept3:54, Sept4:46, Sept5:36, Sept6:20, Sept7:28, Sept8:12, Sept9:11, Sept10:5 -->
      <g fill="#1d4638">
        <rect x="50" y="157" width="24" height="8"/><text x="62" y="180" font-size="9" text-anchor="middle" fill="#4c5a54">8/30</text>
        <rect x="85" y="115" width="24" height="50"/><text x="97" y="180" font-size="9" text-anchor="middle" fill="#4c5a54">8/31</text>
        <rect x="120" y="40" width="24" height="125" fill="#9b4728"/><text x="132" y="34" font-size="10" font-weight="bold" text-anchor="middle" fill="#9b4728">143</text><text x="132" y="180" font-size="9" text-anchor="middle" fill="#172a27" font-weight="bold">9/1</text>
        <rect x="155" y="63" width="24" height="102" fill="#9b4728"/><text x="167" y="57" font-size="10" font-weight="bold" text-anchor="middle" fill="#9b4728">116</text><text x="167" y="180" font-size="9" text-anchor="middle" fill="#172a27" font-weight="bold">9/2</text>
        <rect x="190" y="117" width="24" height="48"/><text x="202" y="180" font-size="9" text-anchor="middle" fill="#4c5a54">9/3</text>
        <rect x="225" y="124" width="24" height="41"/><text x="237" y="180" font-size="9" text-anchor="middle" fill="#4c5a54">9/4</text>
        <rect x="260" y="133" width="24" height="32"/><text x="272" y="180" font-size="9" text-anchor="middle" fill="#4c5a54">9/5</text>
        <rect x="295" y="147" width="24" height="18"/><text x="307" y="180" font-size="9" text-anchor="middle" fill="#4c5a54">9/6</text>
        <rect x="330" y="140" width="24" height="25"/><text x="342" y="180" font-size="9" text-anchor="middle" fill="#4c5a54">9/7</text>
        <rect x="365" y="154" width="24" height="11" fill="#2b6a55"/><text x="377" y="180" font-size="9" text-anchor="middle" fill="#1d4638" font-weight="bold">9/8</text>
        <rect x="400" y="155" width="24" height="10"/><text x="412" y="180" font-size="9" text-anchor="middle" fill="#4c5a54">9/9</text>
        <rect x="435" y="160" width="24" height="5"/><text x="447" y="180" font-size="9" text-anchor="middle" fill="#4c5a54">9/10</text>
      </g>
      <line x1="377" y1="38" x2="377" y2="165" stroke="#9b4728" stroke-width="2" stroke-dasharray="4,3"/>
      <rect x="270" y="36" width="195" height="36" rx="4" fill="#fcf2e6" stroke="#9b4728"/>
      <text x="367" y="51" font-size="10" font-weight="bold" text-anchor="middle" fill="#784610">Sept 8: Pump Handle Removed</text>
      <text x="367" y="65" font-size="9.5" text-anchor="middle" fill="#4c5a54">(Attacks had already fallen ~90%)</text>
      <!-- Right inset: 1855 Surveyor York Excavation -->
      <rect x="505" y="22" width="235" height="168" rx="6" fill="#fffef9" stroke="#c8cec2"/>
      <text x="622" y="42" font-family="Georgia,serif" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#172a27">1855 Parish Excavation (40 Broad St)</text>
      <rect x="525" y="65" width="75" height="75" fill="#fcf2e6" stroke="#9b4728"/>
      <text x="562" y="98" font-size="10" font-weight="bold" text-anchor="middle" fill="#784610">Leaking</text>
      <text x="562" y="112" font-size="10" font-weight="bold" text-anchor="middle" fill="#784610">Cesspool</text>
      <path d="M600 102 L645 102" stroke="#9b4728" stroke-width="3" stroke-dasharray="3,2"/>
      <text x="622" y="94" font-size="9.5" font-weight="bold" text-anchor="middle" fill="#9b4728">2 ft 8 in</text>
      <rect x="645" y="65" width="75" height="75" fill="#e6efe9" stroke="#1d4638"/>
      <text x="682" y="98" font-size="10" font-weight="bold" text-anchor="middle" fill="#1d4638">Broad St</text>
      <text x="682" y="112" font-size="10" font-weight="bold" text-anchor="middle" fill="#1d4638">Pump Well</text>
      <text x="622" y="164" font-size="9.5" text-anchor="middle" fill="#4c5a54">Confirmed by Rev. Whitehead &amp; Surveyor York</text>
    <text x="380" y="222" font-size="10.5" font-weight="bold" text-anchor="middle" fill="#4c5a54">DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH</text>
    </svg>`;
  }
  if(caseId==='triangle'){
    return `<svg viewBox="0 0 760 228" role="img" aria-label="Diagram comparing 1911 Asch Building exit bottlenecks with 1912-1914 Factory Investigating Commission safety mandates">
      <title>1911 Asch Building Bottlenecks vs. 1912–1914 Factory Investigating Commission Mandates</title>
      <rect width="760" height="228" fill="#faf8f0" rx="6"/>
      <rect x="18" y="18" width="340" height="174" rx="6" fill="#fffef9" stroke="#c8cec2"/>
      <text x="34" y="42" font-family="Georgia,serif" font-size="13.5" font-weight="bold" fill="#87251d">March 25, 1911: Asch Building (8th–10th Floors)</text>
      <text x="34" y="64" font-size="11" fill="#172a27">• Iron &amp; stone shell survived ("fireproof" building)</text>
      <text x="34" y="86" font-size="11" fill="#87251d" font-weight="bold">• 9th-floor Washington Place door locked during shift</text>
      <text x="34" y="108" font-size="11" fill="#172a27">• Single exterior iron fire escape collapsed over airshaft</text>
      <text x="34" y="130" font-size="11" fill="#172a27">• Fire Dept ladders reached 6th floor only (below 8th–10th)</text>
      <text x="34" y="154" font-size="11" fill="#4c5a54">• Dec 1911 Trial: Owners acquitted under narrow criminal</text>
      <text x="44" y="170" font-size="11" fill="#4c5a54">standard requiring proof of personal knowledge at that hour</text>
      <path d="M366 105 L394 105" stroke="#1d4638" stroke-width="2.5"/>
      <polygon points="394,100 404,105 394,110" fill="#1d4638"/>
      <rect x="410" y="18" width="332" height="174" rx="6" fill="#e6efe9" stroke="#1d4638"/>
      <text x="426" y="42" font-family="Georgia,serif" font-size="13.5" font-weight="bold" fill="#1d4638">1911–1915: Factory Investigating Commission</text>
      <text x="426" y="64" font-size="11" fill="#172a27">• Subpoena power + unannounced on-site loft inspections</text>
      <text x="426" y="86" font-size="11" fill="#1d4638" font-weight="bold">• 30+ New York State statutory labor &amp; fire laws enacted</text>
      <text x="426" y="108" font-size="11" fill="#172a27">• Mandatory automatic sprinklers in buildings &gt;7 stories</text>
      <text x="426" y="130" font-size="11" fill="#172a27">• Outward-swinging unlocked doors &amp; enclosed fire towers</text>
      <text x="426" y="154" font-size="11" fill="#4c5a54">• Limit: Bound N.Y. State only; could not stop employers</text>
      <text x="436" y="170" font-size="11" fill="#4c5a54">relocating across state lines with weaker enforcement</text>
    <text x="380" y="222" font-size="10.5" font-weight="bold" text-anchor="middle" fill="#4c5a54">DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH</text>
    </svg>`;
  }
  if(caseId==='banking'){
    return `<svg viewBox="0 0 760 228" role="img" aria-label="1933 Banking Crisis timeline separating the March 1933 holiday and emergency Fed liquidity from the January 1934 FDIC insurance start">
      <title>March 1933 Bank Reopening Architecture vs. January 1934 FDIC Insurance</title>
      <rect width="760" height="228" fill="#faf8f0" rx="6"/>
      <rect x="16" y="22" width="168" height="166" rx="6" fill="#fffef9" stroke="#c8cec2"/>
      <text x="28" y="44" font-size="11" font-weight="bold" fill="#9b4728">MARCH 6–12, 1933</text>
      <text x="28" y="64" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#172a27">1. National Pause</text>
      <text x="28" y="86" font-size="10.5" fill="#4c5a54">Proclamation 2039 &amp;</text>
      <text x="28" y="101" font-size="10.5" fill="#4c5a54">March 9 Emergency</text>
      <text x="28" y="116" font-size="10.5" fill="#4c5a54">Banking Act (48 Stat. 1)</text>
      <text x="28" y="140" font-size="10.5" fill="#1d4638" font-weight="bold">Examiners audit &amp; sort</text>
      <text x="28" y="155" font-size="10.5" fill="#1d4638" font-weight="bold">banks into Class A / B / C</text>

      <rect x="198" y="22" width="184" height="166" rx="6" fill="#e6efe9" stroke="#1d4638"/>
      <text x="210" y="44" font-size="11" font-weight="bold" fill="#1d4638">MARCH 12–15, 1933</text>
      <text x="210" y="64" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#172a27">2. Staged Reopening</text>
      <text x="210" y="86" font-size="10.5" fill="#172a27">• March 12 Fireside Chat</text>
      <text x="210" y="103" font-size="10.5" fill="#172a27">• Title IV Fed Bank Notes</text>
      <text x="210" y="120" font-size="10.5" fill="#172a27">  (emergency cash liquidity)</text>
      <text x="210" y="144" font-size="10.5" fill="#1d4638" font-weight="bold">+$1.2B cash &amp; gold</text>
      <text x="210" y="159" font-size="10.5" fill="#1d4638" font-weight="bold">returned by depositors</text>

      <rect x="396" y="22" width="172" height="166" rx="6" fill="#fcf2e6" stroke="#9b4728"/>
      <text x="408" y="44" font-size="11" font-weight="bold" fill="#784610">APRIL 12, 1933</text>
      <text x="408" y="64" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#172a27">3. Hidden Cost</text>
      <text x="408" y="86" font-size="10.5" fill="#784610" font-weight="bold">~4,200 unlicensed banks</text>
      <text x="408" y="102" font-size="10.5" fill="#172a27">remained closed or</text>
      <text x="408" y="117" font-size="10.5" fill="#172a27">restricted, freezing</text>
      <text x="408" y="134" font-size="10.5" fill="#784610" font-weight="bold">~$4 billion in deposits</text>
      <text x="408" y="156" font-size="10" fill="#4c5a54">(Fed Bulletin, Apr 1933)</text>

      <rect x="582" y="22" width="162" height="166" rx="6" fill="#fffef9" stroke="#1d4638" stroke-dasharray="5,3"/>
      <text x="594" y="44" font-size="11" font-weight="bold" fill="#1d4638">JANUARY 1, 1934</text>
      <text x="594" y="64" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#172a27">4. FDIC Starts</text>
      <text x="594" y="86" font-size="10.5" fill="#4c5a54">10 months AFTER the</text>
      <text x="594" y="101" font-size="10.5" fill="#4c5a54">March 1933 reopening</text>
      <text x="594" y="124" font-size="10.5" fill="#172a27">Initial coverage cap:</text>
      <text x="594" y="140" font-size="10.5" fill="#1d4638" font-weight="bold">$2,500 per depositor</text>
      <text x="594" y="160" font-size="10" fill="#4c5a54">(Did not stop Mar ’33 run)</text>
    <text x="380" y="222" font-size="10.5" font-weight="bold" text-anchor="middle" fill="#4c5a54">DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH</text>
    </svg>`;
  }
  if(caseId==='hormuz'){
    return `<svg viewBox="0 0 760 228" role="img" aria-label="Comparison between Bab el-Mandeb Red Sea pass-through corridor with Cape of Good Hope detour and Strait of Hormuz cul-de-sac">
      <title>Maritime Chokepoint Topology: Red Sea Pass-Through vs. Strait of Hormuz Cul-de-Sac</title>
      <rect width="760" height="228" fill="#faf8f0" rx="6"/>
      <rect x="18" y="18" width="345" height="174" rx="6" fill="#fffef9" stroke="#c8cec2"/>
      <text x="34" y="42" font-family="Georgia,serif" font-size="13.5" font-weight="bold" fill="#1d4638">A. Red Sea / Bab el-Mandeb (Pass-Through Corridor)</text>
      <text x="34" y="65" font-size="11" fill="#172a27">• 2023–25 Attacks: Transit fell &gt;50% (9.3 → 4.1 mb/d)</text>
      <text x="34" y="87" font-size="11" fill="#1d4638" font-weight="bold">• Oceanic Detour Exists: Cape of Good Hope (+15 days)</text>
      <text x="34" y="109" font-size="11" fill="#172a27">• Result: Higher freight/insurance, but cargo still arrives</text>
      <rect x="34" y="126" width="310" height="48" rx="4" fill="#e6efe9"/>
      <text x="46" y="145" font-size="10.5" font-weight="bold" fill="#1d4638">U.S. SPR Buffer Limit (DOE Records):</text>
      <text x="46" y="162" font-size="10.5" fill="#172a27">Max 4.4 mb/d crude drawdown · 13-day lag · 0 Bcf/d LNG</text>

      <rect x="382" y="18" width="360" height="174" rx="6" fill="#fcf2e6" stroke="#9b4728"/>
      <text x="398" y="42" font-family="Georgia,serif" font-size="13.5" font-weight="bold" fill="#87251d">B. Strait of Hormuz (Semi-Enclosed Cul-de-Sac)</text>
      <text x="398" y="65" font-size="11" fill="#172a27" font-weight="bold">• Total Chokepoint Flow: ~20.9 mb/d Oil + 11.4 Bcf/d LNG</text>
      <text x="398" y="87" font-size="11" fill="#87251d" font-weight="bold">• Zero Oceanic Detour: Only 1 sea exit from Persian Gulf</text>
      <text x="398" y="109" font-size="11" fill="#172a27">• Pipeline Bypass Ceiling: ~4.7 mb/d oil (&lt;25%) &amp; 0% LNG</text>
      <rect x="398" y="126" width="328" height="48" rx="4" fill="#fffef9" stroke="#9b4728"/>
      <text x="410" y="145" font-size="10.5" font-weight="bold" fill="#87251d">Why Red Sea &amp; Abqaiq Analogies Break Here:</text>
      <text x="410" y="162" font-size="10.5" fill="#172a27">OPEC spare capacity sits inside the Gulf behind the blockade</text>
    <text x="380" y="222" font-size="10.5" font-weight="bold" text-anchor="middle" fill="#4c5a54">DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH</text>
    </svg>`;
  }
  return `<svg viewBox="0 0 760 228" role="img" aria-label="Comparison of 1979 Sinai Peace Treaty verification zones, 1993-95 Oslo interim areas, and 2025 Gaza ceasefire vs crossing closure">
    <title>1949–2026 Treaty Verification &amp; Humanitarian Pause Architecture</title>
    <rect width="760" height="228" fill="#faf8f0" rx="6"/>
    <rect x="16" y="18" width="235" height="174" rx="6" fill="#e6efe9" stroke="#1d4638"/>
    <text x="28" y="40" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#1d4638">1979 Sinai &amp; 1994 Jordan</text>
    <text x="28" y="62" font-size="10.5" fill="#172a27">• Sovereign states + defined borders</text>
    <text x="28" y="82" font-size="10.5" fill="#172a27">• 100% Sinai withdrawal + 4 zones</text>
    <text x="28" y="102" font-size="10.5" fill="#1d4638" font-weight="bold">• MFO monitors funded 1/3 each</text>
    <text x="28" y="122" font-size="10.5" fill="#172a27">• Jordan Joint Water Committee</text>
    <text x="28" y="152" font-size="10.5" font-weight="bold" fill="#1d4638">Outcome: Durable interstate peace</text>

    <rect x="263" y="18" width="235" height="174" rx="6" fill="#fcf2e6" stroke="#9b4728"/>
    <text x="275" y="40" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#784610">1949 DMZs &amp; 1993–95 Oslo</text>
    <text x="275" y="62" font-size="10.5" fill="#172a27">• Deferred borders, Jerusalem,</text>
    <text x="275" y="77" font-size="10.5" fill="#172a27">  refugees &amp; settlements (5-yr interim)</text>
    <text x="275" y="97" font-size="10.5" fill="#784610" font-weight="bold">• No settlement freeze or 3rd-party</text>
    <text x="275" y="112" font-size="10.5" fill="#784610" font-weight="bold">  enforcement mechanism</text>
    <text x="275" y="152" font-size="10.5" font-weight="bold" fill="#87251d">Outcome: Interim Areas A/B/C lock-in</text>

    <rect x="510" y="18" width="234" height="174" rx="6" fill="#fffef9" stroke="#c8cec2"/>
    <text x="522" y="40" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#172a27">2023–2025 Gaza Pauses</text>
    <text x="522" y="62" font-size="10.5" fill="#1d4638" font-weight="bold">• Jan–Mar 2025 (42-day truce):</text>
    <text x="522" y="77" font-size="10.5" fill="#172a27">  &gt;78,000 MT food aid, looting halted</text>
    <text x="522" y="99" font-size="10.5" fill="#87251d" font-weight="bold">• Mar 2, 2025 crossing closure:</text>
    <text x="522" y="114" font-size="10.5" fill="#172a27">  Led to Aug 2025 IPC Phase 5 Famine</text>
    <text x="522" y="152" font-size="10.5" font-weight="bold" fill="#4c5a54">Limit: Reversible without treaty</text>
  <text x="380" y="222" font-size="10.5" font-weight="bold" text-anchor="middle" fill="#4c5a54">DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH</text>
    </svg>`;
}

function renderQuestionBriefing(){
  const container=$('#question-briefing');
  if(!container)return;
  const inputEl=$('#citizen-question-input');
  if(inputEl&&!inputEl.value)inputEl.value=currentQuestionText;

  if(!hasSubmittedQuestion){
    container.innerHTML=`<div class="briefing-compact-bar">
      <span><strong>Ready to explore:</strong> Ask any question above, tap one of the example questions, or pick a historical story below.</span>
      <button type="button" class="secondary" id="expand-initial-briefing">Preview answer for current question ↘</button>
    </div>`;
    return;
  }

  const res=E.askHistory(currentQuestionText,DATA,notebook.standing,integrity);
  const statusPill=res.status==='SUPPORTED'
    ?`<span class="pill fact">SUPPORTED BY VERIFIED DOSSIER(S) · ${esc(res.boundaryCode)}</span>`
    :res.status==='PARTIALLY_SUPPORTED'
    ?`<span class="pill uncertainty">PARTIALLY SUPPORTED · COVERAGE GAPS DISCLOSED (${esc(res.boundaryCode)})</span>`
    :`<span class="pill rejected">UNSUPPORTED · REFUSED TO MANUFACTURE PRECEDENT (${esc(res.boundaryCode)})</span>`;

  const gapsHtml=res.missingCoverage&&res.missingCoverage.length
    ?`<div class="coverage-gaps" id="question-coverage-gaps">
        <h4>What our 5-story library covers—and what it does not cover</h4>
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
            <span class="pill fact">MATCHED STORY: ${esc(p.title.toUpperCase())}</span>
            <span class="pill axis">${esc(p.place)} · ${esc(p.period)}</span>
            <span class="pill axis">${p.sourcesAndStanding.length} verified sources</span>
          </div>
          <h4>${esc(p.title)} — ${esc(p.question)}</h4>
          <p class="help"><strong>Why this story matches your question:</strong> ${esc(p.matchReasons.join(' · '))}</p>
        </div>
        <div class="briefing-actions">
          <button type="button" data-start-journey="${esc(p.caseId)}" data-start-depth="quick">1-Min Quick Look ↓</button>
          <button type="button" class="secondary" data-start-journey="${esc(p.caseId)}" data-start-depth="explore">Explore 6-Step Story ↓</button>
          <button type="button" class="secondary" data-open-dossier="${esc(p.caseId)}" data-open-tab="arguments">Compare arguments ↘</button>
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
        <p style="margin:6px 0 0;font-size:15px">${esc(res.explanation)}</p>
      </div>
      <button type="button" class="secondary" id="collapse-briefing-btn">Hide briefing ▲</button>
    </div>
    <div class="briefing-scope">
      <strong>How to read this evidence:</strong> ${esc(res.causalGuardrailNotice)} <em>(${esc(res.libraryScope.scopeNotice)})</em>
    </div>
    ${gapsHtml}
    ${precedentsHtml}
  </div>`;
}

/* ==========================================================================
   V0.2 STORY STAGE RENDERER (Quick Look · Explore 6-Step Journey · Examine)
   ========================================================================== */
function renderStepPager(){
  const idx=E.STORY_STEPS.findIndex(s=>s.id===storyStep);
  const prev=idx>0?E.STORY_STEPS[idx-1]:null;
  const next=idx<E.STORY_STEPS.length-1?E.STORY_STEPS[idx+1]:null;
  return `<div class="step-pager" aria-label="Story step navigation">
    <div>${prev?`<button type="button" class="secondary" data-step="${esc(prev.id)}">← Step ${prev.number}: ${esc(prev.label)}</button>`:''}</div>
    <span class="help">Step ${idx+1} of ${E.STORY_STEPS.length} · ${esc(E.STORY_STEPS[idx]?.label||'')}</span>
    <div>${next?`<button type="button" data-step="${esc(next.id)}">Next: Step ${next.number} (${esc(next.label)}) →</button>`:`<button type="button" data-depth="examine">Switch to Examine the Evidence →</button>`}</div>
  </div>`;
}

function renderQuickLookStage(c,journey){
  const ql=journey.quickLook;
  return `<div class="quick-look-view">
    <div class="quick-look-banner">
      <div>
        <div class="pill-row">
          <span class="pill fact">QUICK LOOK · ~1 MINUTE READ (${ql.wordCount} WORDS)</span>
          <span class="pill axis">${c.sources.length} verified sources attached</span>
        </div>
        <h3>The 1-Minute Story: ${esc(c.title)}</h3>
        <p class="help" style="margin:0">Every card below summarizes the verified historical record and its limits. Click any source chip to inspect the original citation, or jump deeper into any step.</p>
      </div>
      <button type="button" data-depth="explore" data-step="question">Start interactive 6-step journey →</button>
    </div>
    <div class="quick-look-grid">
      ${ql.steps.map(s=>{
        const reopenBanner=s.reopenedUnderlyingCount>0
          ?`<div class="reopen"><strong>Active Consequential Hold (${s.reopenedUnderlyingCount} dependent record${s.reopenedUnderlyingCount>1?'s':''} reopened):</strong> Source challenge in your notebook affects ${esc(s.reopenedUnderlyingIds.join(', '))}. ${s.survivingNotices[0]?.survivingText?`<div class="surviving-box"><strong>Surviving independent basis:</strong> ${esc(s.survivingNotices[0].survivingText)}</div>`:''}</div>`
          :'';
        return `<article class="quick-step-card" data-quick-step="${esc(s.stepId)}">
          <div>
            <div class="pill-row">
              <span class="pill axis">STEP ${s.stepNumber} · ${esc(s.label.toUpperCase())}</span>
              ${s.standing.state!=='AVAILABLE'?`<span class="pill uncertainty">${esc(s.standing.consequence)}</span>`:''}
            </div>
            ${reopenBanner}
            <h4>${esc(s.headline)}</h4>
            <p>${esc(s.text)}</p>
          </div>
          <div>
            ${refsBySourceIds(s.sourceIds,c)}
            <div class="quick-step-foot">
              <button type="button" class="text-button" data-depth="explore" data-step="${esc(s.stepId)}">Explore ${esc(s.label)} in depth →</button>
            </div>
          </div>
        </article>`;
      }).join('')}
    </div>
    <div class="ba-limit-box" style="margin-top:20px">
      <strong>Key Uncertainty &amp; Analogy Limit to Remember:</strong> ${esc(ql.keyLimit)}
    </div>
  </div>`;
}

function renderExploreStepQuestion(c,journey){
  const exhibit=journey.explore.exhibit;
  const activeHsId=selectedHotspot[c.id]||(exhibit?.hotspots?.[0]?.id||'');
  const activeHs=exhibit?.hotspots?.find(h=>h.id===activeHsId)||exhibit?.hotspots?.[0]||null;
  const concepts=journey.explore.concepts||[];

  return `<div class="explore-step-view" data-active-step="question">
    <div class="step-stage-header">
      <div>
        <span class="pill fact">STEP 1 OF 6 · THE QUESTION</span>
        <h3>${esc(c.question)}</h3>
        <p>${esc(c.citizenGuide?.whatHappenedBefore||c.summary)}</p>
      </div>
      <button type="button" class="secondary" data-depth="quick">Switch to 1-min Quick Look</button>
    </div>

    <div class="precedent-grid">
      <div class="precedent-cell">
        <h5>Why this historical question still echoes today</h5>
        <p>${esc(c.citizenGuide?.whyComparable||c.summary)}</p>
      </div>
      <div class="precedent-cell">
        <h5>What makes this a serious historical test</h5>
        <p>${esc(c.citizenGuide?.whatsDifferent||c.limits?.[0]||'')}</p>
      </div>
    </div>

    ${exhibit?`<section class="exhibit-card" aria-label="Visual historical diagram and hotspots">
      <div class="exhibit-head">
        <div>
          <span class="pill axis">${exhibit.isOriginalFacsimile?'ARCHIVAL DIAGRAM + BUNDLED PUBLIC-DOMAIN PDF':'DIAGRAM CONSTRUCTED FROM VERIFIED PRIMARY RECORDS'}</span>
          <h4>${esc(exhibit.title)}</h4>
        </div>
        ${exhibit.originalAttachmentPath?`<a class="secondary" style="padding:8px 12px;border:1px solid var(--green);border-radius:6px;text-decoration:none;font-size:12.5px;font-weight:650" href="${esc(exhibit.originalAttachmentPath)}" target="_blank" rel="noopener" download>Download original 1933 Act PDF (offline) ↗</a>`:''}
      </div>
      <p class="exhibit-provenance"><strong>Provenance &amp; Visual Honesty Note:</strong> ${esc(exhibit.provenanceLabel)}</p>
      <div class="exhibit-svg-wrap">${renderArchivalSvg(c.id)}</div>
      <div class="hotspot-bar" role="group" aria-label="Inspect diagram callouts">
        <span class="sample-label">Tap a callout to inspect the record:</span>
        ${exhibit.hotspots.map(hs=>`<button type="button" class="hotspot-btn" data-hotspot="${esc(hs.id)}" aria-expanded="${hs.id===activeHs?.id}">${esc(hs.label)}</button>`).join('')}
      </div>
      ${activeHs?`<div class="hotspot-detail-box" id="hotspot-detail">
        ${activeHs.standing?.consequence==='QUARANTINED_SOLE_SOURCE'
          ?`${blocked({id:activeHs.id,sourceIds:activeHs.sourceIds},c)}${refsBySourceIds(activeHs.sourceIds,c)}`
          :`<strong>${esc(activeHs.label)}</strong>
        <p style="margin:6px 0">${esc(activeHs.detail)}</p>
        ${refsBySourceIds(activeHs.sourceIds,c)}`}
      </div>`:''}
    </section>`:''}

    <div class="section-line">
      <h3>Unfamiliar concepts explained in plain English (${concepts.length})</h3>
      <span>Serious ideas without specialist jargon</span>
    </div>
    <div class="concepts-grid">
      ${concepts.map(item=>item.standing?.consequence==='QUARANTINED_SOLE_SOURCE'
        ?`<article class="concept-card"><h5>${esc(item.term)}</h5>${blocked({id:c.id+'-concept-'+item.term,sourceIds:item.sourceIds},c)}${refsBySourceIds(item.sourceIds,c)}</article>`
        :`<article class="concept-card">
        <h5>${esc(item.term)}</h5>
        ${item.standing?.state!=='AVAILABLE'?`<span class="pill uncertainty">${esc(item.standing.consequence)}</span>`:''}
        <p><strong>In plain English:</strong> ${esc(item.plain)}</p>
        <p class="help" style="margin-top:6px"><strong>Why it matters here:</strong> ${esc(item.whyItMatters)}</p>
        ${refsBySourceIds(item.sourceIds,c)}
      </article>`).join('')}
    </div>
    ${renderStepPager()}
  </div>`;
}

function renderExploreStepBackThen(c){
  const tl=c.timeline||[];
  if(timelineIndex>=tl.length)timelineIndex=0;
  if(timelineIndex<0)timelineIndex=0;
  const curEv=tl[timelineIndex]||tl[0];
  const nextEv=timelineIndex<tl.length-1?tl[timelineIndex+1]:null;

  return `<div class="explore-step-view" data-active-step="back-then">
    <div class="step-stage-header">
      <div>
        <span class="pill fact">STEP 2 OF 6 · BACK THEN</span>
        <h3>Follow what happened, step by step (${esc(c.period)})</h3>
        <p>Step through the chronological events using the milestone buttons, Previous/Next controls, or Left/Right arrow keys. Remember: one event following another does not automatically prove the first caused the second.</p>
      </div>
      <button type="button" class="secondary" id="toggle-timeline-mode">${timelineShowAll?'Switch to step-by-step view':'Show all '+tl.length+' events at once'}</button>
    </div>

    ${!timelineShowAll&&curEv?`<div class="timeline-explorer" id="interactive-timeline" aria-label="Interactive step-by-step historical timeline">
      <div class="timeline-controls-top">
        <span class="pill axis">EVENT ${timelineIndex+1} OF ${tl.length}</span>
        <span class="help">Swipe card or use ← / → arrow keys to move through time</span>
      </div>
      <div class="timeline-Nodes" role="tablist" aria-label="Timeline milestones">
        ${tl.map((ev,idx)=>`<button type="button" class="tl-node-btn" data-tl-idx="${idx}" aria-current="${idx===timelineIndex}">${idx+1}. ${esc(ev.date)}</button>`).join('')}
      </div>
      <article class="tl-stage-card" id="tl-active-card" tabindex="0">
        ${blocked(curEv,c)||`<time>${esc(curEv.date)}</time>
        <h4>${esc(curEv.title)}</h4>
        <p>${esc(curEv.text)}</p>`}
        ${refs(curEv,c)}
        ${actions(curEv)}
      </article>
      <div class="tl-stepper-bar">
        <button type="button" class="secondary" id="tl-prev-btn" ${timelineIndex===0?'disabled':''}>← Previous event</button>
        ${nextEv?`<button type="button" id="tl-next-btn">What happened next? (${esc(nextEv.date)}: ${esc(nextEv.title)}) →</button>`:`<button type="button" data-step="debate">Continue to Step 3: The Debate →</button>`}
      </div>
    </div>`:`<ol class="timeline" style="margin-bottom:28px">${tl.map(i=>`<li>${blocked(i,c)||`<time>${esc(i.date)}</time><h4>${esc(i.title)}</h4><p>${esc(i.text)}</p>`}${refs(i,c)}${actions(i)}</li>`).join('')}</ol>`}

    <div class="section-line">
      <h3>What the primary &amp; institutional records establish (${c.facts.length} verified records)</h3>
      <span>Every statement is bound to inspectable source cards</span>
    </div>
    <div class="facts-grid">${c.facts.map(i=>card(i)).join('')}</div>
    ${renderStepPager()}
  </div>`;
}

function renderExploreStepDebate(c){
  const args=E.historicalArguments(c);
  const allRevealed=args.every(a=>revealedDebates.has(a.id));

  return `<div class="explore-step-view" data-active-step="debate">
    <div class="step-stage-header">
      <div>
        <span class="pill interpretation">STEP 3 OF 6 · THE DEBATE</span>
        <h3>What did people argue and expect at the time?</h3>
        <p>History is lived forward before the outcome is known. For each debate below, read what people argued and what policymakers expected would happen—then test your intuition and reveal the documented historical outcome.</p>
      </div>
      <button type="button" class="secondary" id="toggle-all-debates">${allRevealed?'Hide outcomes to re-test':'Reveal all '+args.length+' outcomes at once'}</button>
    </div>

    ${args.map((arg,idx)=>{
      const st=status(arg,c);
      const isReopened=st.state!=='AVAILABLE';
      const isRevealed=revealedDebates.has(arg.id);
      const userGuess=debateReflections[arg.id]||null;

      return `<article class="debate-reveal-card" id="story-${esc(arg.id)}">
        <div class="arg-card-head">
          <div>
            <div class="pill-row">
              <span class="pill interpretation">DEBATE ${idx+1} OF ${args.length}</span>
              <span class="pill axis">${esc(arg.decisionWindow||'Decision window')}</span>
              ${isRevealed?expectationBadge(arg.expectationVerdict):`<span class="pill axis">OUTCOME READY TO REVEAL</span>`}
            </div>
            <h4>${esc(arg.topic)}</h4>
            <span class="help"><strong>Who was arguing:</strong> ${esc(arg.contemporaryActor)}</span>
          </div>
        </div>

        ${isReopened?blocked(arg,c):`
        <div class="debate-before-grid">
          <div class="debate-box">
            <strong class="col-label">1. What people argued at the time</strong>
            <p>${esc(arg.contemporaryArgument)}</p>
          </div>
          <div class="debate-box">
            <strong class="col-label">2. What policymakers expected would happen</strong>
            <p>${esc(arg.policymakerExpectation)}</p>
          </div>
        </div>

        ${!isRevealed?`<div class="debate-prompt-bar">
          <h5>Before revealing the record: What do you think happened next?</h5>
          <p class="help" style="margin:0">Pick an expectation check below (no points or grading—just historical inquiry) or reveal the documented outcome directly:</p>
          <div class="debate-guess-row">
            <button type="button" class="secondary" data-reveal-debate="${esc(arg.id)}" data-guess="SUPPORTED_WITH_LIMITS">Expectation mostly held (with limits)</button>
            <button type="button" class="secondary" data-reveal-debate="${esc(arg.id)}" data-guess="CONTRADICTED_BY_EVENTS">Events contradicted their expectation</button>
            <button type="button" class="secondary" data-reveal-debate="${esc(arg.id)}" data-guess="MIXED_AND_CONFOUNDED">Mixed — multiple forces acted at once</button>
            <button type="button" data-reveal-debate="${esc(arg.id)}">Reveal documented outcome ↓</button>
          </div>
        </div>`:`<div class="debate-outcome-panel">
          <div class="pill-row" style="justify-content:space-between;align-items:center">
            <div>${expectationBadge(arg.expectationVerdict)} ${userGuess?`<span class="pill axis">Your reflection: ${esc(userGuess.replace(/_/g,' '))}</span>`:''}</div>
            <button type="button" class="text-button" data-hide-debate="${esc(arg.id)}">Hide outcome ▲</button>
          </div>
          <div class="debate-before-grid" style="margin-top:10px">
            <div class="debate-box">
              <strong class="col-label">3. What actually happened afterward</strong>
              <p>${esc(arg.subsequentEvidence)}</p>
            </div>
            <div class="debate-box">
              <strong class="col-label">4. What later historians concluded</strong>
              <p>${esc(arg.laterHistoriography)}</p>
            </div>
          </div>
          <div class="arg-limit-bar"><strong>Where this argument’s lesson stops being reliable:</strong> ${esc(arg.differenceThatLimits)}</div>
        </div>`}`}
        ${refs(arg,c)}
        ${actions(arg)}
      </article>`;
    }).join('')}
    ${renderStepPager()}
  </div>`;
}

function renderExploreStepWhatHappened(c){
  const ces=c.counterexamples||[];
  return `<div class="explore-step-view" data-active-step="what-happened">
    <div class="step-stage-header">
      <div>
        <span class="pill uncertainty">STEP 4 OF 6 · WHAT HAPPENED</span>
        <h3>What changed, where it failed, and what remains uncertain</h3>
        <p>Passing a law, changing people’s behavior, and preventing harm are three different things. Below, compare documented outcomes against decisive counterexamples and competing historians’ interpretations.</p>
      </div>
    </div>

    <div class="section-line" style="border-top:0;padding-top:0">
      <h3>Documented outcomes &amp; confounding factors (${c.outcomes.length})</h3>
      <span>Explicitly separating proven effects from uncertainty</span>
    </div>
    <div class="outcome-grid">${c.outcomes.map(i=>card(i,'Documented outcome')).join('')}</div>

    ${ces.length?`<div class="section-line" style="margin-top:28px">
      <h3>Where interventions failed — decisive counterexamples (${ces.length})</h3>
      <span>Required to prevent selective cherry-picking</span>
    </div>
    <div class="outcome-grid">${ces.map(ce=>{const b=blocked(ce,c);return b?`<article class="record" id="story-${esc(ce.id)}"><div class="pill-row"><span class="pill rejected">COUNTEREXAMPLE · FAILURE CONDITION</span></div>${b}${refs(ce,c)}</article>`:`<article class="record" id="story-${esc(ce.id)}"><div class="pill-row"><span class="pill rejected">COUNTEREXAMPLE · FAILURE CONDITION</span></div><h4>${esc(ce.title)}</h4><p>${esc(ce.text)}</p><div class="meta-box"><strong>Condition where the approach failed:</strong> ${esc(ce.failureCondition)}</div>${refs(ce,c)}</article>`;}).join('')}</div>`:''}

    <div class="section-line" style="margin-top:28px">
      <h3>How historians still disagree (${c.interpretations.length} competing perspectives)</h3>
      <span>Different causal emphases supported by the archival record</span>
    </div>
    <div class="perspectives">${c.interpretations.map(i=>card(i,'Historian perspective',i.title)).join('')}</div>
    ${renderStepPager()}
  </div>`;
}

function renderExploreStepDifferentToday(c){
  const comps=c.comparison||[];
  const rejs=c.rejectedComparisons||[];
  const filteredComps=compareFilter==='all'?comps:comps.filter((_,idx)=>String(idx)===String(compareFilter));

  return `<div class="explore-step-view" data-active-step="different-today">
    <div class="step-stage-header">
      <div>
        <span class="pill interpretation">STEP 5 OF 6 · WHAT’S DIFFERENT TODAY</span>
        <h3>Before &amp; After: Where the historical analogy holds—and where it breaks</h3>
        <p>A historical parallel is a starting question, never a crystal ball. Compare how key mechanisms worked back then versus today (dated as of ${esc(c.asOfDate||'2026-11-08')}), and see why overstretched analogies fail.</p>
      </div>
    </div>

    <div class="compare-filter-bar" role="group" aria-label="Filter comparison dimensions">
      <button type="button" class="tl-node-btn" data-comp-filter="all" aria-current="${compareFilter==='all'}">All ${comps.length} dimensions</button>
      ${comps.map((comp,idx)=>`<button type="button" class="tl-node-btn" data-comp-filter="${idx}" aria-current="${String(compareFilter)===String(idx)}">${idx+1}. ${esc(comp.dimension)}</button>`).join('')}
    </div>

    ${filteredComps.map(i=>`<article class="before-after-card" id="story-${esc(i.id)}">
      <div class="pill-row">
        <span class="pill fact">DIMENSION: ${esc(i.dimension.toUpperCase())}</span>
        ${i.timeframe?`<span class="pill axis">Decision clock: ${esc(i.timeframe)}</span>`:''}
        <span class="pill axis">As of ${esc(i.asOfDate||'2026-11-08')}</span>
      </div>
      ${blocked(i,c)?`${blocked(i,c)}${refs(i,c)}${actions(i)}`:`
      <div class="before-after-grid">
        <div class="ba-col">
          <strong class="col-label" style="color:var(--rust);font-size:11px;text-transform:uppercase;letter-spacing:.6px">Back Then (${esc(c.period)})</strong>
          <p style="margin:6px 0 0">${esc(i.historical)}</p>
        </div>
        <div class="ba-col today">
          <strong class="col-label" style="color:var(--green);font-size:11px;text-transform:uppercase;letter-spacing:.6px">What to Examine Today</strong>
          <p style="margin:6px 0 0">${esc(i.present)}</p>
        </div>
      </div>
      <div class="ba-limit-box"><strong>Where this analogy breaks:</strong> ${esc(i.limit)}</div>
      ${refs(i,c)}
      ${actions(i)}`}
    </article>`).join('')}

    <div class="section-line" style="margin-top:28px">
      <h3>Why common misleading analogies fail (${rejs.length} flagged claims)</h3>
      <span>Checked against physical, legal, and chronological constraints</span>
    </div>
    ${rejs.map(r=>`<article class="rejected-card"><div class="pill-row"><span class="pill rejected">MISLEADING ANALOGY</span><span class="pill axis">${esc(r.failureCode)}</span></div><h4>Claim: “${esc(r.claim)}”</h4><p><strong>Why it fails:</strong> ${esc(r.whyItFails)}</p><div class="meta-box"><strong>Decisive counter-evidence:</strong> ${esc(r.counterEvidence)}</div>${refs(r,c)}</article>`).join('')}

    ${boundaries()}
    ${renderStepPager()}
  </div>`;
}

function renderExploreStepEvidence(c,journey){
  const sleuth=journey.explore.sourceChallenge;
  const chosenOptId=selectedSleuthOption[c.id]||null;
  const chosenOpt=sleuth?.options?.find(o=>o.id===chosenOptId)||null;
  const cc=c.consequentialCorrection;
  const isTargetWithdrawn=cc&&notebook.standing[cc.targetSourceId]&&notebook.standing[cc.targetSourceId].status!=='ACTIVE';

  return `<div class="explore-step-view" data-active-step="evidence">
    <div class="step-stage-header">
      <div>
        <span class="pill fact">STEP 6 OF 6 · EXPLORE THE EVIDENCE</span>
        <h3>Inspect the original sources and test them yourself</h3>
        <p>Don’t take our word for it. Every claim in this story is tied to one of ${c.sources.length} preserved citation cards. Below, try the short source-investigation challenge, inspect the 3-axis source cards, or test what happens when a source is challenged.</p>
      </div>
    </div>

    ${sleuth?`<section class="sleuth-card" id="source-sleuth-challenge" aria-label="Short source-investigation challenge">
      <div class="pill-row">
        <span class="pill fact">SOURCE-INVESTIGATION CHALLENGE</span>
        <span class="pill axis">Comparing ${esc(sleuth.primarySourceId)} vs. ${esc(sleuth.targetSourceId)}</span>
      </div>
      <h4>${esc(sleuth.title)}</h4>
      <p style="margin:6px 0 12px">${esc(sleuth.question)}</p>
      <div class="notebook-controls" style="margin:8px 0 14px">
        <button type="button" class="secondary" data-source="${esc(sleuth.primarySourceId)}">Inspect Primary Source (${esc(sleuth.primarySourceId)}) ↗</button>
        <button type="button" class="secondary" data-source="${esc(sleuth.targetSourceId)}">Inspect Compared Source (${esc(sleuth.targetSourceId)}) ↗</button>
      </div>
      <div class="sleuth-options" role="group" aria-label="Investigation findings">
        ${sleuth.options.map(opt=>`<button type="button" class="sleuth-opt-btn" data-sleuth-opt="${esc(opt.id)}" aria-pressed="${opt.id===chosenOptId}">${esc(opt.label)}</button>`).join('')}
      </div>
      ${chosenOpt?`<div class="sleuth-feedback" role="status">
        <span class="pill ${chosenOpt.isSupported?'fact':'rejected'}">${chosenOpt.isSupported?'SUPPORTED BY ARCHIVAL RECORD':'CONTRADICTED BY ARCHIVAL RECORD'}</span>
        <p style="margin:8px 0">${esc(chosenOpt.feedback)}</p>
        <p class="help" style="margin:6px 0 10px"><strong>Try it live:</strong> ${esc(sleuth.takeaway)}</p>
        ${cc?(!isTargetWithdrawn
          ?`<button type="button" data-trigger-sleuth-correction="${esc(cc.targetSourceId)}">Test consequential correction — challenge &amp; withdraw ${esc(cc.targetSourceId)} to see which claims narrow ⚡</button>`
          :`<button type="button" class="secondary" data-restore-sleuth-correction="${esc(cc.targetSourceId)}">Restore ${esc(cc.targetSourceId)} after reviewing surviving sources ↺</button>`):''}
      </div>`:`<p class="help" style="margin:10px 0 0"><strong>Test consequential correction:</strong> answer the challenge above — the correction control appears here with your feedback, and withdrawing the source reopens every claim that depends on it.</p>`}
    </section>`:''}

    <div class="section-line">
      <h3>All ${c.sources.length} verified sources in this inquiry (click any card to inspect)</h3>
      <span>Axis 1: File Checksum · Axis 2: Source Type · Axis 3: Current Standing</span>
    </div>
    <div class="source-list">${c.sources.map((s,n)=>{
      const ax=E.verifyEvidenceAxes(s,notebook.standing,integrity);
      return `<button type="button" class="source-card" data-source="${esc(s.id)}"><div class="pill-row"><span class="pill">${n+1} / ${esc(sourceType(s))}</span><span class="pill axis">Axis 1: ${esc(ax.byteIntegrity)}</span><span class="pill axis">Axis 2: ${esc(ax.provenanceStanding)}</span><span class="pill ${ax.evidentiaryStanding==='AVAILABLE'?'fact':'uncertainty'}">Axis 3: ${esc(ax.evidentiaryStanding)} (${esc(ax.localStatus)})</span></div><strong>${esc(s.title)}</strong><span>${esc(s.author)}</span><span>${esc(s.locator)}</span><span class="source-open">Inspect 3-axis provenance, uses &amp; standing ↗</span></button>`;
    }).join('')}</div>
    ${renderStepPager()}
  </div>`;
}

function renderExamineStage(c){
  return `<div class="examine-stage-view">
    <div class="step-stage-header">
      <div>
        <span class="pill fact">DEPTH 3 · EXAMINE THE EVIDENCE</span>
        <h3>Full Evidence, Source Standing &amp; Consequential Correction Workbench</h3>
        <p>You are in the full scholarly and verification mode. Below, test what happens when a material source is challenged in your notebook, inspect all ${c.sources.length} source cards, or use the 8 specialist tabs underneath.</p>
      </div>
      <div class="notebook-controls" style="margin:0">
        <button type="button" class="secondary" data-depth="quick">Switch to 1-min Quick Look</button>
        <button type="button" class="secondary" data-depth="explore">Switch to 6-Step Story</button>
      </div>
    </div>
    ${renderCorrectionDrill(c,'examine-')}
    ${renderSources()}
  </div>`;
}

function renderStoryStage(){
  const c=current();
  const journey=E.buildStoryJourney(c,notebook.standing,integrity);

  // Render Depth Switcher
  const ds=$('#depth-switcher');
  if(ds){
    ds.innerHTML=journey.depths.map(d=>`<button type="button" class="depth-btn" data-depth="${esc(d.id)}" aria-pressed="${d.id===depthMode}">
      <span class="depth-btn-title">${esc(d.label)}</span>
      <span class="depth-btn-badge">${esc(d.badge)}</span>
    </button>`).join('');
  }
  const dd=$('#depth-description');
  if(dd){
    const curD=journey.depths.find(d=>d.id===depthMode)||journey.depths[1];
    dd.textContent=curD.description;
  }

  // Render 6-Step Story Journey Nav
  const nav=$('#story-steps-nav');
  if(nav){
    nav.innerHTML=journey.steps.map(s=>`<button type="button" class="step-nav-btn" data-step="${esc(s.id)}" ${depthMode==='explore'&&s.id===storyStep?'aria-current="step"':''}>
      <span class="step-num">Step 0${s.number}</span>
      <span class="step-label">${esc(s.label)}</span>
    </button>`).join('');
  }

  const stage=$('#story-stage');
  if(!stage)return;
  if(depthMode==='quick'){
    stage.innerHTML=renderQuickLookStage(c,journey);
  }else if(depthMode==='examine'){
    stage.innerHTML=renderExamineStage(c);
  }else{
    if(storyStep==='question')stage.innerHTML=renderExploreStepQuestion(c,journey);
    else if(storyStep==='back-then')stage.innerHTML=renderExploreStepBackThen(c);
    else if(storyStep==='debate')stage.innerHTML=renderExploreStepDebate(c);
    else if(storyStep==='what-happened')stage.innerHTML=renderExploreStepWhatHappened(c);
    else if(storyStep==='different-today')stage.innerHTML=renderExploreStepDifferentToday(c);
    else stage.innerHTML=renderExploreStepEvidence(c,journey);
  }
}

/* ==========================================================================
   UNDERLYING 8-TAB RESEARCHER WORKBENCH (Preserved 100% for Deep Audit & Tests)
   ========================================================================== */
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
  return `<details class="citizen-guide" open><summary><span>QUICK CITIZEN GUIDE · 6 QUESTIONS TO TEST THIS INQUIRY</span><span class="help">Toggle overview</span></summary><div class="citizen-grid">${cells.map(([h,p,tab,btn])=>`<div class="citizen-cell"><div><h4>${esc(h)}</h4><p>${esc(p)}</p></div><button type="button" class="citizen-jump" data-tab="${esc(tab)}">${esc(btn)}</button></div>`).join('')}</div></details>`;
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
  return `<div class="panel-intro"><div><h3>What changed, what failed, and what remains unproved.</h3><p>A policy being enacted, a behavior changing, and a harm being prevented are different findings. Every outcome below separates documented effects from confounders and decisive counterexamples.</p></div><span class="pill uncertainty">OUTCOMES &amp; COUNTEREXAMPLES</span></div><div class="outcome-grid">${c.outcomes.map(i=>card(i,'Documented outcome')).join('')}</div>${ces.length?`<div class="section-line" style="margin-top:36px"><h3>Decisive counterexamples &amp; failure conditions (${ces.length})</h3><span>Required to prevent selective confirmation bias</span></div><div class="outcome-grid">${ces.map(ce=>{const b=blocked(ce,c);return b?`<article class="record" id="${esc(ce.id)}"><div class="pill-row"><span class="pill rejected">COUNTEREXAMPLE · FAILURE MODE</span></div>${b}${refs(ce,c)}</article>`:`<article class="record" id="${esc(ce.id)}"><div class="pill-row"><span class="pill rejected">COUNTEREXAMPLE · FAILURE MODE</span></div><h4>${esc(ce.title)}</h4><p>${esc(ce.text)}</p><div class="meta-box"><strong>Condition where intervention fails:</strong> ${esc(ce.failureCondition)}</div>${refs(ce,c)}</article>`;}).join('')}</div>`:''}${boundaries()}`;
}
function renderPerspectives(){
  const c=current();
  return `<div class="panel-intro"><div><h3>The explanation is open to argument.</h3><p>These scholars differ in causal emphasis and interpretation. Their claims may overlap. This selection is not a vote, a forced two-sided debate, or a survey of consensus.</p></div><span class="pill interpretation">${c.interpretations.length} COMPETING FRAMEWORKS</span></div><div class="perspectives">${c.interpretations.map(i=>card(i,'Interpretation',i.title)).join('')}</div><div class="record" style="margin-top:24px"><span class="pill uncertainty">UNRESOLVED QUESTIONS &amp; FALSIFIERS</span>${c.challengePrompts.map(p=>`<p>• ${esc(p)}</p>`).join('')}</div>`;
}
function renderSources(){
  const c=current();
  return `<div class="panel-intro"><div><h3>Go behind the explanation (3-Axis Verification).</h3><p>Every source is audited across three separate axes: (1) Cryptographic Byte Integrity (card/PDF SHA-256), (2) Provenance &amp; Inspection Depth (Primary, Institutional, Full/Excerpt Scholarship, or Abstract/Synopsis Only), and (3) Evidentiary Standing in your notebook.</p></div><button type="button" id="download-bibliography" class="secondary">Export bibliography</button></div><div class="source-list">${c.sources.map((s,n)=>{
    const ax=E.verifyEvidenceAxes(s,notebook.standing,integrity);
    return `<button type="button" class="source-card" data-source="${esc(s.id)}"><div class="pill-row"><span class="pill">${n+1} / ${esc(sourceType(s))}</span><span class="pill axis">Axis 1: ${esc(ax.byteIntegrity)}</span><span class="pill axis">Axis 2: ${esc(ax.provenanceStanding)}</span><span class="pill ${ax.evidentiaryStanding==='AVAILABLE'?'fact':'uncertainty'}">Axis 3: ${esc(ax.evidentiaryStanding)} (${esc(ax.localStatus)})</span></div><strong>${esc(s.title)}</strong><span>${esc(s.author)}</span><span>${esc(s.locator)}</span><span class="source-open">Inspect 3-axis provenance, uses &amp; standing ↗</span></button>`;
  }).join('')}</div>`;
}
function renderCorrectionDrill(c,idPrefix=''){
  const cc=c.consequentialCorrection;
  if(!cc)return '';
  const activeChallenged=c.sources.filter(s=>notebook.standing[s.id]&&notebook.standing[s.id].status!=='ACTIVE').map(s=>s.id);
  const isChallenged=activeChallenged.length>0;
  const targetIds=isChallenged?activeChallenged:[cc.targetSourceId];
  const sim=E.evaluateConsequentialCorrection(c,targetIds,isChallenged?(notebook.standing[targetIds[0]]?.status||'WITHDRAWN'):'WITHDRAWN',cc.challengeReason,notebook.standing);
  const targetLabel=targetIds.join(', ');
  return `<section class="drill-card" id="${idPrefix}consequential-drill" aria-label="Consequential source correction lab"><div class="pill-row"><span class="pill ${isChallenged?'uncertainty':'fact'}">${isChallenged?'ACTIVE CONSEQUENTIAL HOLD IN NOTEBOOK':'CONSEQUENTIAL CORRECTION LAB · READY TO TEST'}</span><span class="pill axis">${isChallenged?'Challenged source(s): '+esc(targetLabel):'Target source: '+esc(cc.targetSourceId)}</span></div><h4>Consequential correction: What happens when ${isChallenged?`<code>${esc(targetLabel)}</code> ${targetIds.length>1?'are':'is'} challenged`:`“${esc(cc.targetSourceTitle)}” is challenged`}?</h4><p>${esc(cc.challengeReason)}</p><div class="notebook-controls">${!notebook.standing[cc.targetSourceId]||notebook.standing[cc.targetSourceId].status==='ACTIVE'?`<button type="button" id="${idPrefix}trigger-case-correction" data-trigger-sleuth-correction="${esc(cc.targetSourceId)}" data-source="${esc(cc.targetSourceId)}">Challenge &amp; withdraw ${esc(cc.targetSourceId)} in notebook ⚡</button>`:`<button type="button" class="secondary" id="${idPrefix}restore-case-correction" data-restore-sleuth-correction="${esc(cc.targetSourceId)}" data-source="${esc(cc.targetSourceId)}">Restore ${esc(cc.targetSourceId)} after local review ↺</button>`}<button type="button" class="secondary" data-source="${esc(cc.targetSourceId)}">Open source card in inspector ↗</button></div><div class="drill-grid"><div class="drill-col"><strong>1. Quarantined (${sim.quarantinedCount} records with no surviving source)</strong><p class="help">Lose all supporting sources and are withheld until reviewed:</p><ul>${sim.quarantined.length?sim.quarantined.map(x=>`<li><code>${esc(x.id)}</code>: ${esc(x.title)}</li>`).join(''):'<li>None (all dependent records have a secondary source to narrow to)</li>'}</ul></div><div class="drill-col"><strong>2. Changed / Narrowed (${sim.changedCount} core records + ${sim.argumentsChangedCount} arguments)</strong><p class="help">Drop claims from <code>${esc(targetLabel)}</code> and narrow to surviving independent sources:</p><ul>${sim.changed.length?sim.changed.map(x=>`<li><code>${esc(x.id)}</code> [${esc(x.consequence)}] → survives on <b>${esc(x.survivingSourceIds.join(', '))}</b>: ${esc(x.survivingText)}</li>`).join(''):'<li>None</li>'}</ul></div><div class="drill-col"><strong>3. Survived Untouched (${sim.unaffectedCount} independent records)</strong><p class="help">Backed by unrelated accepted sources; preserved without disruption:</p><p>${sim.unaffectedCount} of ${E.items(c).length} core records and ${sim.argumentsUnaffectedCount} of ${E.historicalArguments(c).length} comparable argument chains remain <code>AVAILABLE</code>.</p></div></div></section>`;
}
function renderNotebook(){
  const c=current();
  const challenges=notebook.challenges.filter(x=>x.caseId===c.id);
  const challengeTargets=[...E.items(c),...E.historicalArguments(c)];
  return `<div class="panel-intro"><div><h3>Make the reasoning answerable.</h3><p>Challenges and source-standing changes remain local, auditable, and exportable. Challenging a source reopens only dependent records and arguments while preserving unrelated work.</p></div></div><p class="integrity ${persistence?'':'warn'}">${persistence?'Notebook saved in this browser. Export it for durable storage or peer review.':'Browser persistence is unavailable or an older dataset notebook was detected. Export this session before leaving.'}</p>${renderCorrectionDrill(c)}<div class="notebook-controls"><button type="button" id="export-notebook">Export notebook</button><button type="button" id="import-notebook" class="secondary">Import notebook</button><input class="hidden" id="notebook-file" type="file" accept="application/json,.json"></div><div class="notebook-layout"><form id="challenge-form"><h3>Open an evidence challenge</h3><label for="challenge-item">Record, argument, or comparison</label><select id="challenge-item">${challengeTargets.map(i=>`<option value="${esc(i.id)}">${esc(i.id)} · ${esc((i.title||i.topic||i.dimension||i.text||'').slice(0,75))}</option>`).join('')}</select><label for="challenge-reason">What does the evidence fail to establish?</label><textarea id="challenge-reason" minlength="10" maxlength="5000" required placeholder="Name the claim, the gap, and what evidence could change it."></textarea><label for="challenge-url">Supporting source URL (optional, HTTPS)</label><input id="challenge-url" type="url" maxlength="2000" placeholder="https://…"><button type="submit" ${integrity?'':'disabled'}>Save local challenge</button><p class="help">Avoid personal information. HTML/script tags and unsafe URLs are rejected automatically. Quoted wording you type is shown as your own unverified wording, never as a verified source quotation.</p></form><div><h3>Challenges in this inquiry (${challenges.length})</h3>${challenges.length?challenges.map(x=>`<article class="challenge-card"><span class="pill ${x.status==='OPEN'?'uncertainty':'fact'}">${esc(x.status)} · LOCAL REVIEW</span>${x.unverifiedQuotation?`<span class="pill rejected">UNVERIFIED QUOTATION — visitor wording, not a verified source quote</span>`:''}<p class="help">${esc(x.itemId)} · ${esc(x.created)}</p><p>${esc(x.reason)}</p>${x.url?`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">Inspect proposed source ↗</a>`:''}${x.resolution?`<p><strong>Local resolution:</strong> ${esc(x.resolution)}</p>`:`<form class="resolve-form" data-id="${esc(x.id)}"><label for="resolve-${esc(x.id)}">Document a local resolution</label><textarea id="resolve-${esc(x.id)}" minlength="10" maxlength="5000" required placeholder="Explain what was checked and whether the interpretation should change."></textarea><button type="submit" class="secondary">Record resolution</button></form>`}</article>`).join(''):'<p class="help">No record-level challenges yet. Every sourced record and comparable argument has a challenge link, or use the Consequential Correction Lab above to challenge a source across all its dependents.</p>'}</div></div><details style="margin-top:24px" open><summary>Auditable source-standing trail (${notebook.events.length} local events)</summary><pre>${esc(JSON.stringify(notebook.events,null,2))}</pre></details>`;
}
function renderEducator(){
  const c=current(), w=notebook.worksheets?.[c.id]||{};
  return `<div class="panel-intro"><div><h3>Run an inquiry, not a recall test.</h3><p>A suggested 25-minute activity for secondary-school, university, and civic learners. Adjust time and scaffolding for your group. No student accounts or names are needed.</p></div><button type="button" id="export-worksheet" class="secondary">Export worksheet</button></div><div class="notebook-layout"><div class="numbered"><div class="study-step"><div><h4>Compare contemporary expectations vs. hindsight · 7 min</h4><p>Open The Debate step or Arguments tab. Identify what contemporaries argued would happen, what subsequent events supported or contradicted, and how later historians differed.</p></div></div><div class="study-step"><div><h4>Test a defensible vs. rejected comparison · 8 min</h4><p>Choose one comparison dimension and one rejected analogy. Explain what structural difference breaks the rejected analogy.</p></div></div><div class="study-step"><div><h4>Trigger a consequential correction · 10 min</h4><p>Challenge one source in the inspector or correction lab. Record which conclusions are quarantined, which narrow to a surviving source, and which remain untouched.</p></div></div><p class="help">Assess source use, attribution, limits and willingness to revise—not agreement with an approved political conclusion.</p></div><form id="worksheet-form" class="worksheet"><label for="ws-record">What did contemporaries expect vs. what primary records establish?</label><textarea id="ws-record" data-ws="record" maxlength="5000">${esc(w.record||'')}</textarea><label for="ws-limit">Which difference breaks the misleading analogy?</label><textarea id="ws-limit" data-ws="limit" maxlength="5000">${esc(w.limit||'')}</textarea><label for="ws-test">What evidence or source challenge would change your conclusion?</label><textarea id="ws-test" data-ws="test" maxlength="5000">${esc(w.test||'')}</textarea><button type="submit">Save worksheet locally</button><p class="help">This worksheet is part of the notebook export.${w.unverifiedQuotation?' <strong>Unverified quotation:</strong> quoted wording in this worksheet is your own unverified wording, not a verified source quotation.':''}</p></form></div>`;
}
const renders={timeline:renderTimeline,arguments:renderArguments,compare:renderCompare,outcomes:renderOutcomes,perspectives:renderPerspectives,sources:renderSources,notebook:renderNotebook,educator:renderEducator};

function render(){
  const c=current();
  renderQuestionBriefing();
  $('#case-list').innerHTML=DATA.cases.map((x,n)=>`<button type="button" class="case-card" data-case="${esc(x.id)}" aria-pressed="${x.id===active}">
    <div>
      <span class="card-meta"><span>${esc(x.place)} · ${esc(x.period)}</span><span class="card-number">0${n+1}</span></span>
      <strong>${esc(x.question)}</strong>
      <p class="card-hook">${esc(CASE_HOOKS[x.id]||x.summary)}</p>
    </div>
    <span class="card-foot"><span>1 min Quick Look · 6-step story · ${x.sources.length} sources</span><span class="arrow" aria-hidden="true">→</span></span>
  </button>`).join('');

  $('#case-place').textContent=c.theme.toUpperCase()+' · '+c.place.toUpperCase()+' · '+c.period;
  $('#case-title').textContent=c.title;

  const allItems=E.items(c);
  const reopenedItems=allItems.filter(i=>status(i,c).state!=='AVAILABLE');
  const reopened=reopenedItems.length;
  const narrowed=reopenedItems.filter(i=>status(i,c).consequence==='CHANGED_SURVIVING_BASIS').length;
  const quarantined=reopenedItems.filter(i=>status(i,c).consequence==='QUARANTINED_SOLE_SOURCE').length;

  $('#case-summary').textContent=reopened
    ?`Consequential Correction Active: ${reopened} of ${allItems.length} records reopened (${quarantined} sole-source quarantined, ${narrowed} narrowed to surviving independent sources, ${allItems.length-reopened} unaffected).`
    :c.summary;

  renderStoryStage();

  const wb=$('#workbench-drawer');
  if(wb)wb.open=(depthMode==='examine'||workbenchOpen);

  $('#integrity-status').classList.toggle('warn',reopened>0||!integrity);
  $('#integrity-status').textContent=!integrity
    ?'Evidence checks pending or failed. Explanations are withheld.'
    :reopened
    ?`Decision Recall & Consequential Correction: ${reopened} dependent records reopened (${quarantined} quarantined, ${narrowed} narrowed to surviving sources). ${allItems.length-reopened} unrelated records remain AVAILABLE.`
    :`3-Axis Verification PASS: ${c.sources.length} preserved citation cards passed SHA-256 byte checks. Checksums prove byte integrity, not historical truth or publisher signature.`;

  $('#citizen-guide-container').innerHTML=renderCitizenGuide();
  $('#tabs').innerHTML=sections.map(([id,label])=>`<button type="button" data-tab="${id}" ${id===tabName?'aria-current="page"':''}>${esc(label)}</button>`).join('');
  $('#panel').innerHTML=(renders[tabName]||renderTimeline)();
  $('#note-count').textContent=notebook.challenges.length+Object.values(notebook.standing).filter(v=>v.status!=='ACTIVE').length;
  $('#export-receipt').disabled=!integrity;
}

function openSource(id,caseId=active){
  const c=DATA.cases.find(x=>x.id===caseId)||current(),s=source(c,id);if(!s)return;
  const deps=[...E.items(c),...E.historicalArguments(c)].filter(i=>i.sourceIds&&i.sourceIds.includes(id));
  const ax=E.verifyEvidenceAxes(s,notebook.standing,integrity);
  const state=notebook.standing[id]?.status||'ACTIVE';
  $('#source-body').innerHTML=`<div class="pill-row"><span class="pill">${esc(sourceType(s))}</span><span class="pill axis">Axis 1: ${esc(ax.byteIntegrity)}</span><span class="pill axis">Axis 2: ${esc(ax.provenanceStanding)}</span><span class="pill ${state==='ACTIVE'?'fact':'uncertainty'}">Axis 3: ${esc(ax.evidentiaryStanding)} (${esc(state)})</span></div><h2 id="source-title">${esc(s.title)}</h2><p>${esc(s.author)}</p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Open original at its archive ↗</a><dl><dt>Where to look (Exact Locator)</dt><dd>${esc(s.locator)}</dd><dt>Inspection Depth &amp; Provenance Standing</dt><dd>${esc(ax.provenanceStanding)} · ${esc(s.coverage||'EXCERPT_WITH_CONTEXT')}</dd><dt>Consulted</dt><dd>${esc(s.accessed)} · curated review, no live monitoring</dd><dt>Rights &amp; access</dt><dd>${esc(s.rights)}</dd></dl>${s.attachment?`<p><a href="${esc(s.attachment.path)}" target="_blank" rel="noopener" download>Download preserved original PDF (offline in full package) ↗</a></p><div class="digest">Original PDF SHA-256<br>${esc(s.attachment.sha256)}</div>`:""}<h3>What this source can support (and its limits)</h3><p>${esc(s.notes)}</p><p class="help">${esc(ax.disclaimer)}</p><div class="digest">SHA-256 of the citation card<br>${esc(s.sha256)}</div><button type="button" class="secondary" data-card-download="${esc(id)}" data-card-case="${esc(c.id)}">Download preserved card</button><details><summary>Exact preserved card</summary><pre>${esc(E.canonical(s.card))}</pre></details><details open><summary>Used by ${deps.length} records &amp; arguments in this inquiry</summary><ul class="source-uses">${deps.map(i=>{const st=status(i,c);return `<li><code>${esc(i.id)}</code> [${esc(st.consequence)}] · ${esc(i.title||i.topic||i.dimension||i.text)}</li>`;}).join('')}</ul></details><details class="source-ops" open><summary>Researcher: change local source standing (Consequential Correction)</summary><p class="help">Changing standing reopens dependent records and comparable arguments in your notebook: sole-source claims are quarantined, while multi-source claims narrow to their surviving independent sources.</p><form id="source-standing-form" data-source="${esc(id)}" data-case="${esc(c.id)}"><label for="standing-select">New local standing</label><select id="standing-select"><option value="DISPUTED" ${state==='DISPUTED'?'selected':''}>Disputed — investigate</option><option value="WITHDRAWN" ${state==='WITHDRAWN'?'selected':''}>Withdrawn — do not use</option><option value="REVISED" ${state==='REVISED'?'selected':''}>Revision reported — recheck dependent claims</option><option value="ACTIVE" ${state==='ACTIVE'?'selected':''}>Restore after local review</option></select><label for="standing-reason">Evidence and review reason (required, min 10 chars)</label><textarea id="standing-reason" minlength="10" maxlength="5000" required>${esc(notebook.standing[id]?.reason||c.consequentialCorrection?.challengeReason||'')}</textarea>${notebook.standing[id]?.unverifiedQuotation?`<p class="help"><strong>Unverified quotation:</strong> the review reason above contains quoted wording with no verified source behind it; it is shown as your own unverified wording.</p>`:''}<button type="submit" ${integrity?'':'disabled'}>Record standing &amp; recall</button></form></details>`;
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
  if(b.id==='expand-initial-briefing'){hasSubmittedQuestion=true;render();return;}
  if(b.id==='collapse-briefing-btn'){hasSubmittedQuestion=false;render();return;}

  if(b.classList.contains('sample-q')&&b.dataset.q){
    currentQuestionText=b.dataset.q;
    hasSubmittedQuestion=true;
    const inp=$('#citizen-question-input');
    if(inp)inp.value=currentQuestionText;
    const res=E.askHistory(currentQuestionText,DATA,notebook.standing,integrity);
    if(res.matchedCaseIds.length){
      active=res.matchedCaseIds[0];
      timelineIndex=0;
      compareFilter='all';
    }
    render();
    return;
  }
  if(b.id==='citizen-question-reset'){
    currentQuestionText='What can history tell us about a prolonged Strait of Hormuz disruption?';
    hasSubmittedQuestion=false;
    const inp=$('#citizen-question-input');
    if(inp)inp.value=currentQuestionText;
    active='hormuz';
    timelineIndex=0;
    compareFilter='all';
    render();
    return;
  }
  if(b.dataset.startJourney){
    active=b.dataset.startJourney;
    depthMode=b.dataset.startDepth||'explore';
    storyStep='question';
    timelineIndex=0;
    compareFilter='all';
    render();
    $('#investigation').scrollIntoView();
    return;
  }
  if(b.dataset.openDossier){
    active=b.dataset.openDossier;
    if(b.dataset.openTab)tabName=b.dataset.openTab;
    workbenchOpen=true;
    render();
    $('#investigation').scrollIntoView();
    return;
  }
  if(b.dataset.depth){
    depthMode=b.dataset.depth;
    if(b.dataset.step)storyStep=b.dataset.step;
    workbenchOpen=(depthMode==='examine');
    render();
    return;
  }
  if(b.dataset.step){
    depthMode='explore';
    storyStep=b.dataset.step;
    render();
    const stg=$('#story-steps-nav');
    if(stg)stg.scrollIntoView({block:'nearest'});
    return;
  }
  if(b.dataset.hotspot){
    selectedHotspot[active]=b.dataset.hotspot;
    renderStoryStage();
    return;
  }
  if(b.id==='toggle-timeline-mode'){
    timelineShowAll=!timelineShowAll;
    renderStoryStage();
    return;
  }
  if(b.dataset.tlIdx!==undefined){
    timelineIndex=Number(b.dataset.tlIdx)||0;
    renderStoryStage();
    return;
  }
  if(b.id==='tl-prev-btn'){
    if(timelineIndex>0){timelineIndex--;renderStoryStage();}
    return;
  }
  if(b.id==='tl-next-btn'){
    const tl=current().timeline||[];
    if(timelineIndex<tl.length-1){timelineIndex++;renderStoryStage();}
    return;
  }
  if(b.dataset.revealDebate){
    const aid=b.dataset.revealDebate;
    revealedDebates.add(aid);
    if(b.dataset.guess)debateReflections[aid]=b.dataset.guess;
    renderStoryStage();
    return;
  }
  if(b.dataset.hideDebate){
    revealedDebates.delete(b.dataset.hideDebate);
    renderStoryStage();
    return;
  }
  if(b.id==='toggle-all-debates'){
    const args=E.historicalArguments(current());
    const allRev=args.every(a=>revealedDebates.has(a.id));
    if(allRev)args.forEach(a=>revealedDebates.delete(a.id));
    else args.forEach(a=>revealedDebates.add(a.id));
    renderStoryStage();
    return;
  }
  if(b.dataset.compFilter!==undefined){
    compareFilter=b.dataset.compFilter;
    renderStoryStage();
    return;
  }
  if(b.dataset.sleuthOpt){
    selectedSleuthOption[active]=b.dataset.sleuthOpt;
    renderStoryStage();
    return;
  }
  if(b.dataset.triggerSleuthCorrection||b.id==='trigger-case-correction'||b.id==='examine-trigger-case-correction'){
    const c=current(),cc=c.consequentialCorrection;
    if(cc){
      applySourceStanding(c,cc.targetSourceId,'WITHDRAWN',cc.challengeReason);
      notify(`Consequential correction applied on ${cc.targetSourceId}. Inspect quarantined vs. narrowed records and arguments.`);
    }
    return;
  }
  if(b.dataset.restoreSleuthCorrection||b.id==='restore-case-correction'||b.id==='examine-restore-case-correction'){
    const c=current(),cc=c.consequentialCorrection;
    if(cc){
      applySourceStanding(c,cc.targetSourceId,'ACTIVE','Restored after inspecting surviving primary basis and documenting scope limits.');
      notify(`Restored ${cc.targetSourceId} to ACTIVE after documented local review.`);
    }
    return;
  }
  if(b.dataset.case){
    active=b.dataset.case;
    lastAnalogyResult=null;
    timelineIndex=0;
    compareFilter='all';
    storyStep='question';
    location.hash=active;
    tabName='timeline';
    render();
    return;
  }
  if(b.dataset.tab){
    tabName=b.dataset.tab;
    workbenchOpen=true;
    render();
    return;
  }
  if(b.dataset.source&&!b.id&&!b.dataset.triggerSleuthCorrection&&!b.dataset.restoreSleuthCorrection){
    openSource(b.dataset.source,b.dataset.caseSource||active);
    return;
  }
  if(b.dataset.challenge){
    const targetId=b.dataset.challenge;
    const ownerCase=DATA.cases.find(x=>E.items(x).some(i=>i.id===targetId)||E.historicalArguments(x).some(a=>a.id===targetId));
    if(ownerCase)active=ownerCase.id;
    tabName='notebook';
    workbenchOpen=true;
    render();
    $('#challenge-item').value=targetId;
    $('#challenge-reason').focus();
    return;
  }
  if(b.dataset.cardDownload){
    const c=DATA.cases.find(x=>x.id===b.dataset.cardCase)||current();
    const s=source(c,b.dataset.cardDownload);
    if(s)download(s.id+'-citation-card.json',s.card);
    return;
  }
  if(['method-open','footer-method'].includes(b.id)){$('#method-dialog').showModal();return;}
  if(b.id==='notebook-top'){
    tabName='notebook';
    workbenchOpen=true;
    render();
    $('#workbench-drawer').scrollIntoView();
    return;
  }
  if(b.id==='run-correction-drill'){
    tabName='notebook';
    workbenchOpen=true;
    render();
    const el=$('#consequential-drill');
    if(el)el.scrollIntoView();
    return;
  }
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

// Keyboard Left/Right navigation for Interactive Timeline & Story Steps
document.addEventListener('keydown',ev=>{
  if(ev.target.matches('input,textarea,select'))return;
  if(depthMode==='explore'&&storyStep==='back-then'&&!timelineShowAll){
    const tl=current().timeline||[];
    if(ev.key==='ArrowRight'&&timelineIndex<tl.length-1){
      timelineIndex++;
      renderStoryStage();
    }else if(ev.key==='ArrowLeft'&&timelineIndex>0){
      timelineIndex--;
      renderStoryStage();
    }
  }
});

// Touch swipe support for the Interactive Timeline on mobile
let touchStartX=null;
document.addEventListener('touchstart',ev=>{
  if(ev.target.closest('#interactive-timeline')&&ev.touches.length===1){
    touchStartX=ev.touches[0].clientX;
  }else{
    touchStartX=null;
  }
},{passive:true});
document.addEventListener('touchend',ev=>{
  if(touchStartX===null||!ev.changedTouches.length)return;
  const dx=ev.changedTouches[0].clientX-touchStartX;
  touchStartX=null;
  if(Math.abs(dx)<45)return;
  const tl=current().timeline||[];
  if(dx<0&&timelineIndex<tl.length-1){timelineIndex++;renderStoryStage();}
  else if(dx>0&&timelineIndex>0){timelineIndex--;renderStoryStage();}
},{passive:true});

document.addEventListener('submit',ev=>{
  ev.preventDefault();const f=ev.target;
  if(f.id==='citizen-question-form'){
    const q=($('#citizen-question-input').value||'').trim();
    if(!q)return;
    currentQuestionText=q;
    hasSubmittedQuestion=true;
    const res=E.askHistory(currentQuestionText,DATA,notebook.standing,integrity);
    if(res.matchedCaseIds.length){
      active=res.matchedCaseIds[0];
      timelineIndex=0;
      compareFilter='all';
    }
    render();
    notify(`Question evaluated: ${res.status} (${res.boundaryCode})`);
    return;
  }
  if(f.id==='unsupported-form'){
    const q=($('#other-question').value||'').trim();
    currentQuestionText=q;
    hasSubmittedQuestion=true;
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


document.querySelector('#workbench-drawer')?.addEventListener('toggle',ev=>{
  workbenchOpen=ev.target.open;
});

addEventListener('hashchange',()=>{const next=location.hash.slice(1);if(DATA.cases.some(c=>c.id===next)){active=next;lastAnalogyResult=null;timelineIndex=0;render();}});
(async()=>{
  if(DATA.cases.some(c=>c.id===location.hash.slice(1)))active=location.hash.slice(1);
  try{
    E.validate(DATA);
    if(await sha(E.canonical(DATA))!==DATA_HASH)throw Error('Dataset digest mismatch');
    for(const c of DATA.cases)for(const s of c.sources)if(await sha(E.canonical(s.card))!==s.sha256)throw Error('Citation card mismatch');
    integrity=true;render();
  }catch(e){integrity=false;render();notify('Evidence unavailable: '+e.message);}
})();

window.__historyLabState=()=>({
  notebook,
  active,
  depthMode,
  storyStep,
  timelineIndex,
  timelineShowAll,
  revealedDebates:[...revealedDebates],
  hasSubmittedQuestion,
  tabName,
  integrity,
  persistence,
  currentQuestionText,
  DATA,
  DATA_HASH,
  Engine:E
});
