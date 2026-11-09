/* Browser & Node projection of OpenLine Department of History (M5.1):
   3-Axis Evidence Engine, Mandate Ledger version-bound review/REOPEN rule,
   9-Vector Adversarial Falsifier, Comparable Historical Arguments Engine,
   and Deterministic Local-First Question-to-History Router.
   No authentication or historical truth is implied by a cryptographic digest. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.HistoryEvidence=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const forbidden=new Set(['__proto__','constructor','prototype']);
  const PLACEHOLDER_HOST_RE=/^(?:localhost|127(?:\.\d{1,3}){3}|0\.0\.0\.0|(?:.+\.)?(?:example\.(?:com|org|net|edu)|invalid|test|local|localhost|fake|placeholder))$/i;
  const IPV4_HOST_RE=/^(?:\d{1,3}\.){3}\d{1,3}$/;
  const DETERMINISTIC_ANALOGY_RE=/\b(?:will inevitably|guarantees that|certain to cause|destined to repeat|proves that history will repeat|100%\s+certain(?:ty)?|universal recipe|can permanently|permanently end|can always|always be stopped|always be prevented|will always)\b/i;
  const CONSENSUS_WASHING_RE=/\b(?:all historians agree|universal scholarly consensus|scholarly consensus proves|settled historical fact that|undisputed historical consensus|historians unanimously agree)\b/i;
  const UNHEDGED_CAUSAL_RE=/\b(?:single-handedly caused|solely caused|was the sole cause of|directly triggered without exception|automatically caused|caused only by|single decisive cause)\b/i;
  const DANGEROUS_HTML_RE=/<\s*\/?\s*(?:script|svg|iframe|object|embed|link|meta|style|img|body|form)\b|javascript\s*:|data\s*:\s*text\/html|\bon[a-z]{2,}\s*=/i;
  const CONTEMPORARY_FACT_RE=/\b(?:202[3-6]|1h25|as of 202[3-6]|ongoing|currently|carries roughly|unused overland pipeline capacity)\b/i;

  const FUTURE_FORECAST_QUERY_RE=/\b(?:what will happen|will happen in|who will win|predict(?:ion)?\b|forecast\b|prophec|in\s+20(?:2[7-9]|[3-9]\d)|by\s+20(?:2[7-9]|[3-9]\d)|next\s+(?:decade|century)|price\s+of\s+oil\s+in\s+20(?:2[7-9]|[3-9]\d))\b/i;
  const UNIVERSAL_IDEOLOGY_QUERY_RE=/\b(?:has history proved|did history prove|does history prove|one political ideology|which political ideology always|always succeeds|always fails|inevitably triumphs|universal law of history|proves? that capitalism|proves? that socialism|proves? that communism|proves? that democracy always|proves? that authoritarianism always)\b/i;

  function canonical(v){
    if(v===null||typeof v==='boolean'||typeof v==='string')return JSON.stringify(v);
    if(typeof v==='number'){if(!Number.isSafeInteger(v))throw Error('Only safe integers allowed');return JSON.stringify(v);}
    if(Array.isArray(v))return '['+v.map(canonical).join(',')+']';
    if(typeof v!=='object'||Object.getPrototypeOf(v)!==Object.prototype)throw Error('Invalid record');
    for(const k of Object.getOwnPropertyNames(v)){if(forbidden.has(k))throw Error('Forbidden key');}
    return '{'+Object.keys(v).sort().map(k=>{if(forbidden.has(k))throw Error('Forbidden key');return JSON.stringify(k)+':'+canonical(v[k]);}).join(',')+'}';
  }

  function safeURL(value){
    if(typeof value!=='string'||!value||value.length>2000||DANGEROUS_HTML_RE.test(value))return false;
    try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&Boolean(u.hostname)&&u.hostname.includes('.');}catch{return false;}
  }

  function safeArchiveURL(value){
    if(!safeURL(value))return false;
    try{const u=new URL(value);const h=u.hostname.toLowerCase();return !PLACEHOLDER_HOST_RE.test(h)&&!IPV4_HOST_RE.test(h);}catch{return false;}
  }

  // SHA-256 fallback for file/offline and non-secure local preview origins.
  // Integer operations follow FIPS 180-4; cross-checked against Node/Python crypto.
  function sha256(text){
    const bytes=new TextEncoder().encode(text),bitLength=bytes.length*8;
    const length=Math.ceil((bytes.length+9)/64)*64,padded=new Uint8Array(length);padded.set(bytes);padded[bytes.length]=128;
    const view=new DataView(padded.buffer);view.setUint32(length-8,Math.floor(bitLength/4294967296));view.setUint32(length-4,bitLength>>>0);
    const K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    const H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19],w=new Uint32Array(64),rotr=(n,b)=>(n>>>b)|(n<<(32-b));
    for(let off=0;off<length;off+=64){for(let i=0;i<16;i++)w[i]=view.getUint32(off+i*4);for(let i=16;i<64;i++){const x=w[i-15],y=w[i-2];w[i]=(w[i-16]+(rotr(x,7)^rotr(x,18)^(x>>>3))+w[i-7]+(rotr(y,17)^rotr(y,19)^(y>>>10)))>>>0;}
      let [a,b,c,d,e,f,g,h]=H;for(let i=0;i<64;i++){const t1=(h+(rotr(e,6)^rotr(e,11)^rotr(e,25))+((e&f)^(~e&g))+K[i]+w[i])>>>0,t2=((rotr(a,2)^rotr(a,13)^rotr(a,22))+((a&b)^(a&c)^(b&c)))>>>0;h=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b;b=a;a=(t1+t2)>>>0;}[a,b,c,d,e,f,g,h].forEach((v,i)=>H[i]=(H[i]+v)>>>0);
    }return H.map(x=>x.toString(16).padStart(8,'0')).join('');
  }

  // Core 104 records preserved for full M2/M4/M4.1 compatibility
  function items(c){return [...(c.facts||[]),...(c.timeline||[]),...(c.comparison||[]),...(c.outcomes||[]),...(c.interpretations||[])];}

  // Comparable historical arguments added in M5
  function historicalArguments(c){return Array.isArray(c?.historicalArguments)?c.historicalArguments:[];}

  function isAbstractOrSynopsisOnly(s){
    if(!s)return false;
    if(s.coverage==='ABSTRACT_ONLY'||s.coverage==='SYNOPSIS_ONLY')return true;
    const combined=((s.locator||'')+' '+(s.notes||'')).toLowerCase();
    return /\b(?:abstract only|publicly accessible abstract|synopsis only|publisher's book description|full article was not|full book not reviewed)\b/.test(combined);
  }

  function authorTokensForSource(s){
    if(!s)return [];
    const stop=new Set(['review','reviews','history','institute','historical','research','journal','palestine','studies','university','press','temple','cambridge','taylor','francis','synopsis','publisher','description','competing','historiographical','syntheses','the','and','for','from','with','into','over','under','between']);
    const raw=((s.author||'')+' '+(s.title||'')).replace(/[^a-zA-Z\s-]/g,' ');
    return [...new Set(raw.split(/\s+/).map(w=>w.trim().toLowerCase()).filter(w=>w.length>=5&&!stop.has(w)))];
  }

  function detectAttributedQuoteToAbstractSource(bodyText,item,sources){
    if(!item||!Array.isArray(item.sourceIds))return null;
    const abstractSources=item.sourceIds.map(sid=>sources.get(sid)).filter(s=>s&&isAbstractOrSynopsisOnly(s));
    if(!abstractSources.length)return null;
    const quoteRe=/([^\n.;]{0,120})(?:"([^"\n]{12,})"|\u201c([^\u201d\n]{12,})\u201d)([^\n.;]{0,80})/g;
    let m;
    while((m=quoteRe.exec(bodyText))!==null){
      const lead=(m[1]||'').toLowerCase();
      const tail=(m[4]||'').toLowerCase();
      const windowText=lead+' '+tail;
      for(const absSrc of abstractSources){
        const tokens=authorTokensForSource(absSrc);
        if(tokens.some(t=>windowText.includes(t))){
          return absSrc.id;
        }
      }
    }
    return null;
  }

  // Three-Axis Verification Model separating cryptographic byte integrity from provenance and evidentiary standing
  function verifyEvidenceAxes(s,overrides={},integrity=true){
    if(!s||typeof s!=='object')return {byteIntegrity:'HASH_MISMATCH',provenanceStanding:'UNVERIFIED_EXTERNAL',evidentiaryStanding:'UNSUPPORTED',disclaimer:'Missing source object.',reasons:['Missing source']};
    const reasons=[];
    let byteIntegrity='VERIFIED_CARD_HASH';
    if(!integrity){
      byteIntegrity='HASH_MISMATCH';
      reasons.push('Dataset or card integrity failed');
    }else if(s.card&&s.sha256){
      try{
        if(sha256(canonical(s.card))!==s.sha256){byteIntegrity='HASH_MISMATCH';reasons.push('Card SHA-256 mismatch');}
        else if(s.attachment&&s.attachment.sha256){byteIntegrity='VERIFIED_ORIGINAL_HASH';}
      }catch{byteIntegrity='HASH_MISMATCH';reasons.push('Canonicalization failed');}
    }

    let provenanceStanding='UNVERIFIED_EXTERNAL';
    if(!safeArchiveURL(s.url)||!s.author||!s.title||!s.locator||!s.notes){
      provenanceStanding='UNVERIFIED_EXTERNAL';
      reasons.push('Source lacks verifiable archive URL, locator, or provenance notes');
    }else if(isAbstractOrSynopsisOnly(s)){
      provenanceStanding='ABSTRACT_OR_SYNOPSIS_ONLY';
      reasons.push('Only abstract, review, or publisher synopsis was inspected; cannot support verbatim full-text quotes');
    }else if(s.type==='primary'){
      provenanceStanding='PRIMARY_ARCHIVAL_RECORD';
    }else if(s.type&&s.type.startsWith('scholar')){
      provenanceStanding='PEER_REVIEWED_SCHOLARSHIP';
    }else if(s.type&&s.type.startsWith('institution')){
      provenanceStanding='INSTITUTIONAL_RECORD';
    }

    const ov=overrides&&overrides[s.id];
    let evidentiaryStanding='AVAILABLE';
    if(byteIntegrity==='HASH_MISMATCH'){
      evidentiaryStanding='BLOCKED';
    }else if(provenanceStanding==='UNVERIFIED_EXTERNAL'){
      evidentiaryStanding='UNSUPPORTED';
    }else if(s.status&&s.status!=='ACTIVE'){
      evidentiaryStanding='REOPEN';
      reasons.push('Source metadata status is '+s.status);
    }else if(ov){
      if(ov.status!=='ACTIVE'||ov.boundSha256!==s.sha256){
        evidentiaryStanding='REOPEN';
        reasons.push('Local notebook standing is '+(ov.status||'REOPEN')+(ov.boundSha256!==s.sha256?' (obsolete review binding)':''));
      }
    }

    return {
      sourceId:s.id,
      byteIntegrity,
      provenanceStanding,
      evidentiaryStanding,
      localStatus:ov?.status||s.status||'ACTIVE',
      disclaimer:byteIntegrity==='VERIFIED_ORIGINAL_HASH'
        ?'Citation card and attached public-domain PDF match their SHA-256 digests. Proves byte integrity, not historical truth.'
        :byteIntegrity==='VERIFIED_CARD_HASH'
        ?'Citation card matches its SHA-256 digest. Proves local byte integrity only—not publisher signature or historical truth.'
        :'Cryptographic digest verification failed; dependent claims are blocked.',
      reasons
    };
  }

  function hasDirectQuote(text){
    if(typeof text!=='string')return false;
    return /"[^"\n]{12,}"|\u201c[^\u201d\n]{12,}\u201d/.test(text);
  }

  function validateRecordItem(i,sources,ids,refTime,maxStalenessDays){
    if(!i.id||!i.sourceIds?.length||i.sourceIds.some(s=>!sources.has(s)))throw Error('Unsupported record: '+i.id);
    if(ids.has(i.id))throw Error('Duplicate record');ids.add(i.id);
    const bodyText=[
      i.text,i.historical,i.present,i.limit,i.title,
      i.topic,i.contemporaryActor,i.contemporaryArgument,i.policymakerExpectation,i.subsequentEvidence,i.laterHistoriography,i.differenceThatLimits
    ].filter(Boolean).join(' ');
    if(DANGEROUS_HTML_RE.test(bodyText))throw Error('Unsafe markup in record: '+i.id);
    // Attack 1 & 2 (hardened for Challenge 1 co-cited quote smuggling):
    if(hasDirectQuote(bodyText)){
      if(!i.verifiedQuote||!i.verifiedQuote.sourceId||!i.verifiedQuote.locator||i.verifiedQuote.verbatim!==true){
        throw Error('Unverified quotation without exact locator: '+i.id);
      }
      if(!i.sourceIds.includes(i.verifiedQuote.sourceId)){
        throw Error('Quotation sourceId is not attached to record: '+i.id);
      }
      const qSource=sources.get(i.verifiedQuote.sourceId);
      if(!qSource||isAbstractOrSynopsisOnly(qSource))throw Error('Misleading excerpt or quote from abstract/synopsis-only source: '+i.id);
      const smuggledSource=detectAttributedQuoteToAbstractSource(bodyText,i,sources);
      if(smuggledSource&&smuggledSource!==i.verifiedQuote.sourceId){
        throw Error('Co-cited quotation attributed in prose to abstract/synopsis-only source ('+smuggledSource+'): '+i.id);
      }
    }
    if(i.claimsFullTextReview===true&&i.sourceIds.some(sid=>isAbstractOrSynopsisOnly(sources.get(sid)))){
      throw Error('Misleading full-text claim on abstract/synopsis-only source: '+i.id);
    }
    // Attack 3: Deterministic analogy overclaims
    if(DETERMINISTIC_ANALOGY_RE.test(bodyText))throw Error('Unsupported deterministic analogy overclaim: '+i.id);
    // Attack 5: Correlation presented as unhedged single-cause causation
    if(UNHEDGED_CAUSAL_RE.test(bodyText))throw Error('Correlation presented as single-cause causation: '+i.id);
    if(i.causalStatus==='CAUSAL_HYPOTHESIS'&&(!Array.isArray(i.confounders)||!i.confounders.length)){
      throw Error('Causal hypothesis missing confounders: '+i.id);
    }
    // Attack 8: Consensus-washing inside records
    if(CONSENSUS_WASHING_RE.test(bodyText))throw Error('Manufactured scholarly consensus in record: '+i.id);
    // Attack 4 (hardened for Challenge 4): Contemporary claims require explicit, fresh asOfDate
    if(!i.asOfDate&&CONTEMPORARY_FACT_RE.test(bodyText)){
      throw Error('Contemporary claim lacks explicit asOfDate: '+i.id);
    }
    if(i.asOfDate){
      const ts=Date.parse(i.asOfDate);
      if(Number.isNaN(ts))throw Error('Invalid asOfDate on record: '+i.id);
      if(!Number.isNaN(refTime)&&(refTime-ts)/(1000*60*60*24)>maxStalenessDays){
        throw Error('Outdated contemporary claim exceeds freshness window: '+i.id);
      }
    }
  }

  function validate(data,options={}){
    if(!data||data.schema!=='openline-history-lab.v1'||!Array.isArray(data.cases)||!data.cases.length)throw Error('Invalid dataset');
    canonical(data);
    const ids=new Set();
    const refTime=Date.parse(options.referenceDate||data.curatedOn||'2026-11-08');
    const maxStalenessDays=options.maxStalenessDays||365;
    for(const c of data.cases){
      if(!c.id||ids.has(c.id))throw Error('Duplicate/missing case');ids.add(c.id);
      if(!c.sources?.length||!c.limits?.length||!c.question)throw Error('Case lacks boundaries');
      if(!c.interpretations||c.interpretations.length<2)throw Error('Case lacks competing scholarly interpretations: '+c.id);
      const sources=new Map();
      for(const s of c.sources){
        if(!s.id||sources.has(s.id)||!safeArchiveURL(s.url)||!s.locator||!s.notes||!s.author||!s.title)throw Error('Invalid source: '+(s?.id||'unknown'));
        if(s.status&&['WITHDRAWN','REVOKED','SUPERSEDED','DISPUTED'].includes(s.status))throw Error('Revoked or superseded source in active dataset: '+s.id);
        sources.set(s.id,s);
      }
      // Attack 6: Check that case includes counterexamples or documented outcome limits
      const hasCounterexample=(Array.isArray(c.counterexamples)&&c.counterexamples.length>0)||(Array.isArray(c.outcomes)&&c.outcomes.some(o=>/\b(?:cannot|did not|failed|acquittal|uneven|restricted|declining|limit|however|yet)\b/i.test(o.text||'')));
      if(!hasCounterexample)throw Error('Selective evidence omitting counterexamples: '+c.id);

      // Attack 8: Check competing interpretations for consensus-washing or homogeneous emphasis
      const emphases=new Set();
      for(const interp of c.interpretations){
        if(CONSENSUS_WASHING_RE.test(interp.text||'')||CONSENSUS_WASHING_RE.test(interp.title||''))throw Error('Conflicting interpretations presented as consensus: '+interp.id);
        if(interp.causalEmphasis)emphases.add(interp.causalEmphasis.trim().toLowerCase());
      }
      if(c.interpretations.some(i=>i.causalEmphasis)&&emphases.size<2)throw Error('Homogeneous causal emphasis across interpretations: '+c.id);

      for(const i of items(c)){
        validateRecordItem(i,sources,ids,refTime,maxStalenessDays);
      }
      for(const arg of historicalArguments(c)){
        validateRecordItem(arg,sources,ids,refTime,maxStalenessDays);
        if(!arg.topic||!arg.contemporaryActor||!arg.contemporaryArgument||!arg.policymakerExpectation||!arg.expectationVerdict||!arg.subsequentEvidence||!arg.laterHistoriography||!arg.differenceThatLimits){
          throw Error('Incomplete comparable historical argument structure: '+arg.id);
        }
        if(!['SUPPORTED_WITH_LIMITS','CONTRADICTED_BY_EVENTS','MIXED_AND_CONFOUNDED'].includes(arg.expectationVerdict)){
          throw Error('Invalid expectationVerdict on historical argument: '+arg.id);
        }
      }
      for(const r of c.comparison){
        if(!r.limit||!r.historical||!r.present)throw Error('Comparison lacks limitation');
        if(r.limit.trim().length<15)throw Error('Comparison limitation is too superficial');
        if(!r.asOfDate)throw Error('Comparison present-day prompt lacks explicit asOfDate: '+r.id);
      }
    }
    return true;
  }

  function resolveSurvivingText(item,challenged,surviving){
    if(!surviving.length||!item||!item.survivingTextByWithdrawnSource||typeof item.survivingTextByWithdrawnSource!=='object')return null;
    const map=item.survivingTextByWithdrawnSource;
    const compositeKey=[...challenged].sort().join('+');
    if(map[compositeKey])return map[compositeKey];
    let candidate=null;
    let sourceKey=null;
    if(challenged.length===1){
      sourceKey=challenged[0];
      candidate=map[sourceKey]||null;
    }else{
      for(const cid of challenged){
        if(map[cid]){sourceKey=cid;candidate=map[cid];break;}
      }
    }
    if(!candidate)return null;
    // Challenge 2 enforcement: when multiple sources are challenged, never display a single-source survivingText string if it still relies on any OTHER challenged/withdrawn source ID
    for(const cid of challenged){
      if(cid===sourceKey)continue;
      const pat=new RegExp('\\b'+cid.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i');
      if(pat.test(candidate))return null;
    }
    return candidate;
  }

  function standing(item,sources,overrides={},integrity=true){
    if(!integrity)return {state:'BLOCKED',reason:'Evidence integrity could not be established.',consequence:'BLOCKED_INTEGRITY',survivingSourceIds:[],challengedSourceIds:[]};
    if(!item||!item.sourceIds?.length)return {state:'UNSUPPORTED',reason:'No source is attached.',consequence:'UNSUPPORTED_NO_SOURCE',survivingSourceIds:[],challengedSourceIds:[]};
    const challenged=[];
    const surviving=[];
    for(const id of item.sourceIds){
      const s=sources.find(s=>s.id===id);
      if(!s)return {state:'UNSUPPORTED',reason:'Referenced source is missing: '+id,consequence:'UNSUPPORTED_MISSING_SOURCE',survivingSourceIds:[],challengedSourceIds:[id]};
      if((s.status&&s.status!=='ACTIVE')||(overrides[id]&&(overrides[id].status!=='ACTIVE'||overrides[id].boundSha256!==s.sha256))){
        challenged.push(id);
      }else{
        surviving.push(id);
      }
    }
    if(challenged.length){
      const survivingText=resolveSurvivingText(item,challenged,surviving);
      const consequence=surviving.length===0
        ?'QUARANTINED_SOLE_SOURCE'
        :survivingText
        ?'CHANGED_SURVIVING_BASIS'
        :'REOPEN_SHARED_BASIS';
      const plural=challenged.length>1;
      return {
        state:'REOPEN',
        reason:'Source'+(plural?'s ':' ')+challenged.join(', ')+(plural?' have':' has')+' a local standing change or an obsolete review binding.',
        consequence,
        challengedSourceIds:challenged,
        survivingSourceIds:surviving,
        survivingText
      };
    }
    return {
      state:'AVAILABLE',
      reason:'Curated evidence attached. This is not a truth certification.',
      consequence:'SURVIVED_UNTOUCHED',
      challengedSourceIds:[],
      survivingSourceIds:surviving,
      survivingText:null
    };
  }

  function affected(c,id){return items(c).filter(i=>i.sourceIds.includes(id)).map(i=>i.id);}

  function evaluateComparisonCandidate(candidate,caseObj){
    const reasons=[];
    if(!candidate||typeof candidate!=='object')return {verdict:'REJECTED',code:'INVALID_CANDIDATE',reasons:['Candidate comparison object is missing.']};
    const text=[candidate.claim,candidate.historical,candidate.present].filter(Boolean).join(' ');
    const limitText=String(candidate.limit||'').trim();
    const combined=(text+' '+limitText).toLowerCase();
    if(!text.trim())reasons.push('Comparison claim text is empty.');
    if(DETERMINISTIC_ANALOGY_RE.test(text))reasons.push('Contains deterministic predictive overclaim (e.g., "will inevitably", "guarantees that", "universal recipe").');
    if(UNHEDGED_CAUSAL_RE.test(text))reasons.push('Presents a confounded sequence as unhedged single-cause causation.');
    if(CONSENSUS_WASHING_RE.test(text))reasons.push('Asserts manufactured scholarly consensus where historians disagree.');
    if(!limitText||limitText.length<15)reasons.push('Omits an explicit structural limitation explaining where the analogy breaks.');
    if(caseObj&&Array.isArray(caseObj.rejectedComparisons)){
      for(const rej of caseObj.rejectedComparisons){
        const keywords=(rej.failureCode||'').toLowerCase().split('_').filter(w=>w.length>3);
        if(candidate.id===rej.id||(candidate.claim&&rej.claim&&candidate.claim.toLowerCase().includes(rej.claim.slice(0,32).toLowerCase()))){
          reasons.push(rej.whyItFails);
        }else if(keywords.length&&keywords.every(k=>text.toLowerCase().includes(k))){
          reasons.push(rej.whyItFails);
        }
      }
    }
    const lower=text.toLowerCase();

    // Domain-specific structural checks across ALL 5 inquiries (catching sophisticated hedged false analogies)
    // 1. Cholera (Broad Street 1854)
    if(caseObj?.id==='cholera'||/\b(?:broad\s+street|john\s+snow|pump\s+handle|soho.*cholera)\b/.test(lower)){
      const claimsMapConvincedOrHandleEnded=/\b(?:spot\s+map|voronoi|dot\s+map|map\s+of\s+soho)\b.*\b(?:convinced|persuaded|caused\s+the\s+board|led\s+the\s+board)\b|\b(?:pump\s+handle|remove\s+the.*handle|removing\s+the.*handle)\b.*\b(?:rapidly\s+terminated|terminated|halted|ended|stopped|eliminated)\s+the\s+(?:cholera\s+)?(?:outbreak|epidemic)\b/.test(lower);
      const acknowledgesPreDeclineAndPostHocMap=/\b(?:already\s+(?:declin|fall|peak)|peaked\s+before|drawn\s+after|published\s+after|december\s+1854|1855|did\s+not\s+single-handedly)\b/.test(combined);
      if(claimsMapConvincedOrHandleEnded&&!acknowledgesPreDeclineAndPostHocMap){
        reasons.push('POST_HOC_MAP_AND_PRE_INTERVENTION_DECLINE_ERROR: Snow’s mortality tables show daily Soho cholera attacks had already peaked around Sept 1–2 and declined substantially before the pump handle was removed on Sept 8, 1854, and Snow’s famous spot map was drawn after the outbreak rather than used to persuade the Board on Sept 7.');
      }
    }

    // 2. Triangle Shirtwaist Fire (1911)
    if(caseObj?.id==='triangle'||/\b(?:triangle\s+(?:fire|shirtwaist|waist)|harris\s+and\s+blanck|asch\s+building)\b/.test(lower)){
      const conflatesAcquittalWithSafety=/\b(?:verdict|acquittal|acquitted|harris\s+and\s+blanck|december\s+1911\s+jury)\b.*\b(?:established|proved|showed|confirmed|demonstrated)\b.*\b(?:complied|safe|unlocked|no\s+responsibility|adequate)\b/.test(lower);
      const negatesAcquittalConflation=/\b(?:did\s+not\s+establish|not\s+a\s+finding\s+that|narrow\s+criminal|personal\s+knowledge\s+at\s+the\s+time)\b/.test(combined);
      if(conflatesAcquittalWithSafety&&!negatesAcquittalConflation){
        reasons.push('CRIMINAL_ACQUITTAL_CONFLATED_WITH_WORKPLACE_SAFETY: The December 1911 acquittal in People v. Harris and Blanck turned on narrow criminal jury instructions requiring proof beyond a reasonable doubt that the owners personally knew the 9th-floor door was locked at the exact moment of the fire; it never established that the exits complied with safety needs.');
      }
      const claimsFireproofShellOrRoutineInspectionSufficient=/\b(?:fireproof\s+building|masonry\s+shell|february\s+1911\s+inspection|routine\s+inspection)\b.*\b(?:guaranteed|sufficed|sufficient\s+to\s+protect|prevented\s+mass\s+casualties|fundamentally safe|itself was safe|was fundamentally safe|completely safe)\b/.test(lower);
      if(claimsFireproofShellOrRoutineInspectionSufficient){
        reasons.push('FIREPROOF_SHELL_OR_INSPECTION_COMPLIANCE_FALLACY: The Asch Building’s masonry shell survived the March 25, 1911 fire intact while 146 workers died within 18 minutes due to a locked exit door, overcrowding, a collapsed exterior fire escape, and 6th-floor fire ladder limits.');
      }
    }

    // 3. 1933 U.S. Banking Crisis
    if(caseObj?.id==='banking'||/\b(?:1933\s+bank|emergency\s+banking\s+act|fireside\s+chat|bank\s+holiday)\b/.test(lower)){
      const claimsFdicStoppedMarch1933Panic=/\b(?:fdic|federal\s+deposit\s+insurance)\b.*\b(?:march\s+(?:13,?\s*)?1933|bank\s+holiday|first\s+week\s+of\s+the\s+national)\b|\b(?:march\s+(?:13,?\s*)?1933\s+(?:bank\s+)?reopening)\b.*\b(?:fdic|federal\s+deposit\s+insurance)\b/.test(lower);
      const acknowledgesJan1934FdicDate=/\b(?:january\s+1,?\s*1934|jan\.?\s*1,?\s*1934|ten\s+months\s+later|did\s+not\s+begin\s+until\s+1934|not\s+in\s+effect\s+in\s+march\s+1933)\b/.test(combined);
      if(claimsFdicStoppedMarch1933Panic&&!acknowledgesJan1934FdicDate){
        reasons.push('CHRONOLOGICAL_FDIC_ANACHRONISM_ERROR: Federal deposit insurance (FDIC) did not take effect until January 1, 1934 (initially up to $2,500)—nearly ten months after the March 13, 1933 bank reopening, which relied on solvency auditing and emergency Federal Reserve liquidity.');
      }
      const claimsPainlessFullReopening=/\b(?:reopened\s+the\s+entire|all\s+banks\s+reopened|without\s+leaving\s+(?:significant\s+)?(?:depositor\s+)?funds\s+frozen|painless(?:ly)?\s+reopened|100%\s+of\s+banks\s+reopened)\b/.test(lower);
      const acknowledgesUnlicensedFrozenBanks=/\b(?:4,200\s+unlicensed|4\s+billion|remained\s+closed|unlicensed\s+banks)\b/.test(combined);
      if(claimsPainlessFullReopening&&!acknowledgesUnlicensedFrozenBanks){
        reasons.push('UNLICENSED_BANK_CREDIT_CONTRACTION_OMISSION: The March 1933 reopening did not reopen the entire banking system; as of April 12, 1933, the Federal Reserve reported roughly 4,200 unlicensed banks remained closed or restricted, freezing approximately $4 billion in deposits.');
      }
    }

    // 4. Strait of Hormuz & Maritime Chokepoints
    const mentionsHormuz=/\bhormuz\b/.test(lower);
    if(caseObj?.id==='hormuz'||mentionsHormuz){
      const mentionsRedSeaOrCape=/\b(?:red sea|bab el-mandeb|suez|cape of good hope|tip of africa)\b/.test(lower);
      const claimsRerouteOrAbsorb=/\b(?:shrug off|same|bypass|rerout(?:e|ing)|divert(?:ing)?|elongat(?:e|ing)|accommodate|absorb|detour)\b/.test(lower);
      const acknowledgesHormuzCulDeSac=/\b(?:cul-de-sac|no oceanic detour|cannot bypass|only ~?4\.7|<25%|zero sea detour)\b/.test(lower);
      if(mentionsRedSeaOrCape&&claimsRerouteOrAbsorb&&!acknowledgesHormuzCulDeSac){
        reasons.push('GEOGRAPHIC_BYPASS_TOPOLOGY_ERROR: Bab el-Mandeb/Suez has an oceanic detour around the Cape of Good Hope (+15 days), whereas the Strait of Hormuz is a cul-de-sac where pipelines bypass <25% of oil (~4.7 mb/d) and 0% of LNG.');
      }

      const mentionsSprOrReleases=/\b(?:spr|strategic petroleum reserve|strategic reserve|stock release|iea release|desert storm)\b/.test(lower);
      const mentionsLng=/\b(?:lng|liquefied natural gas|qatari gas|11\.4\s*bcf)\b/.test(lower);
      const acknowledgesZeroLngReserve=/\b(?:no strategic reserve|zero.*lng|absence of.*lng|cannot.*lng|0\s*bcf)\b/.test(lower);
      if(mentionsSprOrReleases&&mentionsLng&&!acknowledgesZeroLngReserve){
        reasons.push('NO_STRATEGIC_LNG_RESERVE_AND_RATE_CEILING_ERROR: Strategic petroleum reserves hold crude oil (capped at 4.4 mb/d in the U.S. SPR) and provide zero physical reserve for the 11.4 Bcf/d of Qatari LNG transiting the Strait of Hormuz.');
      }

      const claimsFullOrMultiMonthOffset=/\b(?:fully offset|bloodless|immediate|guarantees|six-month|6-month|prolonged closure|full closure|replace a full)\b/.test(lower);
      const acknowledgesRateOrMcmLimits=/\b(?:4\.4\s*mb\/d|cannot offset|cannot replace|37[–-]112\s*days|praying mantis|flight 655)\b/.test(lower);
      if((mentionsSprOrReleases||/\bearnest will\b/.test(lower))&&claimsFullOrMultiMonthOffset&&!acknowledgesRateOrMcmLimits){
        reasons.push('RATE_CEILING_AND_MCM_ESCALATION_BLINDNESS: US SPR is capped at 4.4 mb/d (13-day lag, 0 LNG reserve) vs. ~20.9 mb/d Hormuz oil flow, and Earnest Will escalated into Operation Praying Mantis and Flight 655 while modern MCM+ASCM clearance takes 37–112 days.');
      }

      const mentionsAbqaiqOrSpare=/\b(?:abqaiq|khurais|spare capacity|opec spare)\b/.test(lower);
      const claimsSpareOffsetsHormuzClosure=/\b(?:offset|buffer|absorb|replace|compensate|overcome)\b.*\b(?:closure|blockade|shut-?in|hormuz)\b|\b(?:closure|blockade)\b.*\b(?:offset|buffer|absorb|replace)\b/.test(lower);
      const acknowledgesTrappedUpstream=/\b(?:trapped|behind the strait|inside the persian gulf|4\.7\s*mb\/d|pipeline bypass is full)\b/.test(lower)&&/\b(?:cannot|limit|trapped|unless)\b/.test(combined);
      if(mentionsAbqaiqOrSpare&&mentionsHormuz&&claimsSpareOffsetsHormuzClosure&&!acknowledgesTrappedUpstream){
        reasons.push('UPSTREAM_SPARE_CAPACITY_TRAPPED_BEHIND_CHOKEPOINT: Almost 100% of Gulf OPEC spare capacity sits inside the Persian Gulf upstream of the Strait of Hormuz; once the ~4.7 mb/d pipeline bypass is full, upstream spare capacity is geographically trapped by a Hormuz closure.');
      }
    }

    // 5. Israel–Palestine, Civilian Protection & Durable Arrangements
    if(caseObj?.id==='israel-palestine'||/\b(?:sinai|mfo|oslo|icj|icc)\b/i.test(lower)){
      const mentionsSinaiOrMfo=/\b(?:sinai|mfo|multinational force and observers|1979 egypt)\b/.test(lower);
      const claimsDeferralOrTurnkey=/\b(?:without resolving sovereignty|without settlement|deferring final|deferring borders|while deferring|copy directly|turnkey|indefinitely without)\b/.test(lower);
      if(mentionsSinaiOrMfo&&claimsDeferralOrTurnkey){
        reasons.push('STRUCTURAL_SOVEREIGNTY_AND_DEMOGRAPHIC_MISMATCH: The 1979 Sinai/MFO treaty succeeded between two sovereign states after 100% Israeli withdrawal and settlement evacuation; it cannot be copied into Area C/Gaza while deferring sovereignty, borders, and >700,000 settlers.');
      }
      const mentionsIcjOrIcc=/\b(?:icj|international court of justice|provisional measures|icc|international criminal court|article 58|art\.\s*58|art\.\s*41)\b/.test(lower);
      const conflatesMeritsOrConviction=/\b(?:convicted|conviction|exonerated|dismissed the case|final judgment on the merits|final judicial determination|criminal guilt beyond reasonable doubt|established guilt on the merits)\b/.test(lower);
      const negatesConflation=/\b(?:not a final|neither a final|distinct from|rather than a final|not a conviction|prior to.*conviction)\b/.test(lower);
      if(mentionsIcjOrIcc&&conflatesMeritsOrConviction&&!negatesConflation){
        reasons.push('JUDICIAL_PROCEDURAL_POSTURE_CONFLATION: Conflates ICJ Art. 41 Provisional Measures ("plausibility of rights") or ICC Art. 58 pre-trial warrants ("reasonable grounds to believe") with a final merits conviction or dismissal.');
      }
    }
    return {
      verdict:reasons.length?'REJECTED':'DEFENSIBLE_WITH_LIMITS',
      code:reasons.length?'REJECTED_MISLEADING_ANALOGY':'ACCEPTED_BOUNDED_COMPARISON',
      reasons
    };
  }

  function evaluateConsequentialCorrection(caseObj,sourceId,newStatus='WITHDRAWN',reason='Material source challenged during audit.',existingOverrides={}){
    if(!caseObj||!sourceId)throw Error('Case and sourceId required');
    const srcIds=Array.isArray(sourceId)?sourceId:[sourceId];
    const nextOverrides={...existingOverrides};
    for(const sid of srcIds){
      const src=caseObj.sources.find(s=>s.id===sid);
      if(!src)throw Error('Unknown source: '+sid);
      if(newStatus==='ACTIVE'){
        delete nextOverrides[sid];
      }else{
        nextOverrides[sid]={status:newStatus,reason,boundSha256:src.sha256};
      }
    }
    const activeChallengedSourceIds=caseObj.sources
      .filter(s=>(s.status&&s.status!=='ACTIVE')||(nextOverrides[s.id]&&nextOverrides[s.id].status!=='ACTIVE'))
      .map(s=>s.id);
    const quarantined=[];
    const changed=[];
    const unaffected=[];
    for(const item of items(caseObj)){
      const st=standing(item,caseObj.sources,nextOverrides,true);
      if(st.state==='AVAILABLE'){
        unaffected.push({id:item.id,title:item.title||item.dimension||item.text.slice(0,80)});
      }else if(st.consequence==='QUARANTINED_SOLE_SOURCE'){
        quarantined.push({id:item.id,title:item.title||item.dimension||item.text.slice(0,80),challengedSourceIds:st.challengedSourceIds,reason:st.reason});
      }else{
        changed.push({
          id:item.id,
          title:item.title||item.dimension||item.text.slice(0,80),
          originalText:item.text||item.historical||'',
          consequence:st.consequence,
          challengedSourceIds:st.challengedSourceIds,
          survivingSourceIds:st.survivingSourceIds,
          survivingText:st.survivingText||('Requires re-verification using surviving independent source(s): '+st.survivingSourceIds.join(', '))
        });
      }
    }
    const argumentsQuarantined=[];
    const argumentsChanged=[];
    const argumentsUnaffected=[];
    for(const arg of historicalArguments(caseObj)){
      const st=standing(arg,caseObj.sources,nextOverrides,true);
      if(st.state==='AVAILABLE'){
        argumentsUnaffected.push({id:arg.id,topic:arg.topic});
      }else if(st.consequence==='QUARANTINED_SOLE_SOURCE'){
        argumentsQuarantined.push({id:arg.id,topic:arg.topic,challengedSourceIds:st.challengedSourceIds,reason:st.reason});
      }else{
        argumentsChanged.push({
          id:arg.id,
          topic:arg.topic,
          consequence:st.consequence,
          challengedSourceIds:st.challengedSourceIds,
          survivingSourceIds:st.survivingSourceIds,
          survivingText:st.survivingText||('Requires re-verification using surviving independent source(s): '+st.survivingSourceIds.join(', '))
        });
      }
    }
    return {
      caseId:caseObj.id,
      sourceId:Array.isArray(sourceId)?sourceId[0]:sourceId,
      activeChallengedSourceIds,
      newStatus,
      reason,
      quarantinedCount:quarantined.length,
      changedCount:changed.length,
      narrowedCount:changed.filter(x=>x.consequence==='CHANGED_SURVIVING_BASIS').length,
      reopenSharedCount:changed.filter(x=>x.consequence==='REOPEN_SHARED_BASIS').length,
      unaffectedCount:unaffected.length,
      quarantined,
      changed,
      unaffected,
      argumentsQuarantinedCount:argumentsQuarantined.length,
      argumentsChangedCount:argumentsChanged.length,
      argumentsUnaffectedCount:argumentsUnaffected.length,
      argumentsQuarantined,
      argumentsChanged,
      argumentsUnaffected
    };
  }

  // Deterministic Local-First Question-to-History Engine (M5.1 — expanded for everyday citizen language)
  const CASE_MATCH_RULES=[
    {
      caseId:'hormuz',
      highWeightPatterns:[
        {re:/\bhormuz\b/i,weight:10,reason:'Directly names the Strait of Hormuz maritime chokepoint'},
        {re:/\b(?:tanker\s+wars?|earnest\s+will|praying\s+mantis)\b/i,weight:9,reason:'Directly references the 1980–1988 Persian Gulf Tanker War / Operation Earnest Will'},
        {re:/\b(?:bab\s+el-mandeb|red\s+sea\s+(?:shipping|attacks?|rerout(?:e|ing)|tankers?|cris[ie]s|disruptions?))\b/i,weight:8,reason:'References Red Sea / Bab el-Mandeb maritime shipping disruption and rerouting'},
        {re:/\b(?:strategic\s+petroleum\s+reserves?|\bspr\b|iea\s+(?:stocks?|releases?))\b/i,weight:8,reason:'References Strategic Petroleum Reserve or IEA collective emergency stock releases'},
        {re:/\b(?:abqaiq|khurais)\b/i,weight:8,reason:'References the 2019 Abqaiq-Khurais Saudi oil facility attack'},
        {re:/\b(?:maritime|oil|energy|lng|petroleum)\s+(?:chokepoints?|blockades?|disruptions?|shut-?ins?|straits?)\b/i,weight:7,reason:'Examines maritime energy chokepoint disruption mechanics'},
        {re:/\b(?:persian\s+gulf|qatari?\s+lng|suez\s+canal|oil\s+shocks?)\b/i,weight:7,reason:'Examines Persian Gulf energy transit or historical oil shocks'},
        {re:/\b(?:oil|gas|lng|energy|fuel|tankers?)\b.*\b(?:blocked|blockade[d]?|trapped|attacked|cut\s+off|closed|disrupted)\b.*\b(?:gulf|strait|sea\s+lanes?|middle\s+east|red\s+sea)\b/i,weight:8,reason:'Examines everyday question about oil/gas tankers blocked or attacked in Gulf/Middle East sea lanes'}
      ],
      contextPatterns:[
        {re:/\b(?:tankers?|crude|pipelines?|petroline|adcop|mine\s+clearance|ascm|brent)\b/i,weight:3}
      ]
    },
    {
      caseId:'israel-palestine',
      highWeightPatterns:[
        {re:/\b(?:israel|palestin(?:e|ian)s?|gaza|west\s+bank|sinai)\b/i,weight:10,reason:'Directly names Israel, Palestine, Gaza, West Bank, or Sinai'},
        {re:/\b(?:oslo\s+(?:accords?|i|ii|interim)|1949\s+armistices?|wadi\s+araba|multinational\s+force\s+and\s+observers|\bmfo\b|untso)\b/i,weight:9,reason:'Directly references the 1949 Armistice, 1979 Sinai/MFO treaty, 1993–95 Oslo Accords, or 1994 Israel–Jordan treaty'},
        {re:/\b(?:civilian\s+(?:harm|protection|casualties|relief)|protect(?:ing)?\s+civilians?|humanitarian\s+(?:pauses?|ceasefires?|corridors?|aid|truces?))\b/i,weight:7,reason:'Examines historical arrangements and humanitarian pauses aimed at protecting civilians and reducing civilian harm in armed conflict'},
        {re:/\b(?:territorial\s+conflicts?|fighting\s+over\s+(?:land|territory|borders?)|ceasefires?|armistices?|peace\s+treat(?:y|ies)|peacekeep(?:ing|ers?)|demilitarized\s+zones?|hostage\s+releases?)\b/i,weight:6,reason:'Examines ceasefires, peacekeeping monitors, and territorial conflict arrangements'},
        {re:/\b(?:icj\s+provisional|icc\s+warrants?|article\s+58|genocide\s+convention|ipc\s+famine)\b/i,weight:8,reason:'Examines 2024–2025 international court orders or IPC famine assessments in Gaza'}
      ],
      contextPatterns:[
        {re:/\b(?:occupation|settlements?|two-state|one-state|mediation|crossings?|famine|truces?|monitors?)\b/i,weight:3}
      ]
    },
    {
      caseId:'banking',
      highWeightPatterns:[
        {re:/\b(?:banking\s+(?:panics?|cris[ie]s|failures?|closures?|reforms?)|bank\s+(?:runs?|holidays?|panics?|failures?|closures?))\b/i,weight:10,reason:'Directly examines banking panics, bank runs, or emergency bank holidays'},
        {re:/\b(?:1933\s+bank(?:ing)?|emergency\s+banking\s+act|fireside\s+chats?|fdic|deposit\s+insurance)\b/i,weight:9,reason:'Directly references the March 1933 U.S. Banking Crisis, Emergency Banking Act, Fireside Chat, or FDIC deposit insurance'},
        {re:/\b(?:lender\s+of\s+last\s+resort|federal\s+reserve|central\s+bank\s+liquidity|financial\s+(?:panics?|cris[ie]s)|depositor\s+confidence)\b/i,weight:7,reason:'Examines central-bank emergency liquidity and depositor confidence during financial panics'},
        {re:/\b(?:pull(?:ing|ed)?|withdraw(?:ing|n|als?)?|take|taking|get(?:ting)?|rush(?:ed|ing)?)\b.*\b(?:cash|money|savings|deposits?)\b.*\b(?:banks?|accounts?)\b|\b(?:banks?)\b.*\b(?:pull(?:ing|ed)?|withdraw(?:ing|n)?|run\s+out\s+of\s+money|froze|frozen)\b/i,weight:8,reason:'Examines everyday question about depositors rushing to pull cash/savings out of banks during a bank run'},
        {re:/\b(?:banks?)\b.*\b(?:clos(?:e|ed|ing)|shut\s+down)\b.*\b(?:trust|confidence|reopen(?:ed|ing|s)?|old\s+days|again|1930s)\b/i,weight:8,reason:'Examines everyday question about banks closing and what restored trust or reopened them'}
      ],
      contextPatterns:[
        {re:/\b(?:roosevelt|fdr|silber|wigmore|gold\s+outflows?|hoarding|solvency|conservators?)\b/i,weight:3}
      ]
    },
    {
      caseId:'cholera',
      highWeightPatterns:[
        {re:/\b(?:cholera|broad\s+street|john\s+snow|pump\s+handles?)\b/i,weight:10,reason:'Directly references the 1854 Broad Street cholera outbreak or Dr. John Snow'},
        {re:/\b(?:miasma|waterborne|st\.\s*james\s+parish|henry\s+whitehead|southwark|lambeth\s+water)\b/i,weight:9,reason:'Directly references the 1854–1855 Soho waterborne vs. miasma investigation'},
        {re:/\b(?:epidemics?|outbreaks?|pandemics?|contagion|public\s+health\s+investigations?|disease\s+mapping|epidemiolog)/i,weight:6,reason:'Examines epidemic investigation and contested causal evidence during a public health emergency'},
        {re:/\b(?:handle\s+off.*(?:water\s+)?pump|water\s+pump.*(?:london|soho|dying|deaths?|sick(?:ness)?)|contaminated\s+(?:drinking\s+)?water.*(?:outbreak|dying|deaths?|london))\b/i,weight:8,reason:'Examines everyday question about removing the London water pump handle and stopping waterborne disease deaths'},
        {re:/\b(?:shut|clos(?:e|ing|ed)|turn\s+off)\b.*\b(?:well|pump|water\s+supply)\b.*\b(?:sick|sickness|ill|dying|deaths?|disease)\b|\b(?:sick|ill|dying)\b.*\b(?:well|pump|tap|drinking\s+water)\b/i,weight:8,reason:'Examines everyday question about shutting a well or pump when people fall sick from the water'}
      ],
      contextPatterns:[
        {re:/\b(?:soho|cesspools?|water\s+supply|sanitation|mortality\s+maps?)\b/i,weight:3}
      ]
    },
    {
      caseId:'triangle',
      highWeightPatterns:[
        {re:/\b(?:triangle\s+(?:shirtwaist|waist|fires?)|asch\s+building|factory\s+investigating\s+commission)\b/i,weight:10,reason:'Directly references the 1911 Triangle Shirtwaist Factory fire or New York Factory Investigating Commission'},
        {re:/\b(?:harris\s+and\s+blanck|shirtwaist\s+strikes?|protocols\s+of\s+peace)\b/i,weight:9,reason:'Directly references the 1909–1911 garment strikes or Triangle Fire manslaughter trial'},
        {re:/\b(?:workplace\s+safety|factory\s+(?:fires?|safety|inspections?)|building\s+code\s+enforcement|locked\s+(?:exits?|doors?)|industrial\s+accidents?|worker\s+protection|labor\s+safety)\b/i,weight:7,reason:'Examines how workplace safety warnings, inspections, criminal trials, and statutory labor reforms interact'},
        {re:/\b(?:bosses|owners?|employers?)\b.*\b(?:prison|jail|acquitted|trial|punished)\b.*\b(?:workers?|factory|fire|burned|locked\s+doors?)\b|\b(?:garment|factory)\s+workers?\b.*\b(?:burned|trapped|locked\s+doors?)\b/i,weight:8,reason:'Examines everyday question about factory owners, locked exit doors, criminal acquittal, and garment worker deaths'},
        {re:/\b(?:clos(?:e|ing|ed)|locked|locking)\b.*\b(?:factory|exit)\s+doors?\b.*\b(?:fire|burned|died|deaths?|trapped|killed)\b|\b(?:factory|exit)\s+doors?\b.*\b(?:fire|burned|died|deaths?|killed)\b/i,weight:8,reason:'Examines everyday question about factory exit doors and fire deaths'}
      ],
      contextPatterns:[
        {re:/\b(?:manslaughter|acquittals?|sprinklers?|fire\s+escapes?|ilgwu|wtul|frances\s+perkins)\b/i,weight:3}
      ]
    }
  ];

  // Explicit detectors for uncurated topics that trigger PARTIALLY_SUPPORTED when paired with a supported domain
  const UNCURATED_PARTIAL_TOPICS=[
    {re:/\b(?:crypto(?:currency)?|bitcoin|stablecoin|defi|terra|ftx)\b/i,gap:'Cryptocurrency, stablecoin, and decentralized-finance (DeFi) runs are not in the curated evidence library; the library covers only the 1933 U.S. commercial banking panic.'},
    {re:/\b(?:2008|lehman|subprime|repo\s+market|bear\s+stearns|aig)\b/i,gap:'The 2008 global shadow-banking and mortgage-backed repo crisis is not a full curated dossier in this library (only 1933 U.S. commercial banking records are bound).'},
    {re:/\b(?:silicon\s+valley\s+bank|\bsvb\b|signature\s+bank|first\s+republic|2023\s+bank)\b/i,gap:'The 2023 regional banking runs (SVB/Signature) appear only as a present-day comparative prompt in the 1933 Banking dossier, not as an independently sourced archival dossier.'},
    {re:/\b(?:europe(?:an)?|eurozone|greek|cyprus|uk\s+bank|northern\s+rock|credit\s+suisse)\b/i,gap:'European, UK, and Eurozone sovereign-banking crises are outside the 5 curated dossiers; the banking dossier covers only the March 1933 United States crisis.'},
    {re:/\b(?:taiwan(?:\s+strait)?|malacca|south\s+china\s+sea|panama\s+canal|semiconductor|microchip)\b/i,gap:'Taiwan Strait, Malacca Strait, and semiconductor supply-chain blockades are not in the curated evidence library; the maritime dossier covers only Persian Gulf / Strait of Hormuz and Red Sea / Bab el-Mandeb energy transit.'},
    {re:/\b(?:ukraine|russia|bosnia|dayton|northern\s+ireland|good\s+friday|rwanda|syria|cyprus|colombia|kashmir|sudan)\b/i,gap:'Territorial conflicts outside the 1949–2026 Israel–Palestine, Sinai, and Jordan treaties (such as Ukraine, Bosnia/Dayton, Northern Ireland, Syria, or Sudan) are not in the curated 5-dossier library.'},
    {re:/\b(?:covid(?:-19)?|coronavirus|sars|influenza|1918\s+flu|ebola|hiv|aids|vaccine|mrna|lockdown)\b/i,gap:'Modern viral/respiratory pandemics (COVID-19, 1918 influenza, vaccine trials, and national lockdowns) are not in the curated library; the public health dossier covers only the 1854 London waterborne cholera investigation.'},
    {re:/\b(?:rana\s+plaza|bangladesh|boeing|deepwater\s+horizon|chernobyl|fukushima|bhopal|osha)\b/i,gap:'Modern industrial/supply-chain disasters (such as 2013 Rana Plaza, Bhopal, or federal OSHA administrative rulemaking) are not full dossiers in this library; the workplace dossier covers only the 1911–1915 New York Triangle Fire investigation.'}
  ];

  // False-friend keyword traps where a surface word ("bank", "water", "fire", "strike") is used in a non-historical/unrelated sense
  const SUPERFICIAL_KEYWORD_TRAPS_RE=/\b(?:river\s+bank|fish(?:ing)?\s+on\s+the\s+bank|camp\s*fire|forest\s+fire|wildfire|bowling\s+strike|lightning\s+strike|drink\s+eight\s+glasses\s+of\s+water|recipe\s+for|how\s+to\s+cook|stock\s+market\s+pick|sports?\s+score)\b/i;

  function buildPrecedentPacket(caseObj,matchReasons,overrides={},integrity=true){
    const args=historicalArguments(caseObj).map(arg=>{
      const st=standing(arg,caseObj.sources,overrides,integrity);
      return {
        id:arg.id,
        topic:arg.topic,
        decisionWindow:arg.decisionWindow,
        contemporaryActor:arg.contemporaryActor,
        contemporaryArgument:st.state==='AVAILABLE'?arg.contemporaryArgument:(st.survivingText||'[Quarantined pending source review: '+st.reason+']'),
        policymakerExpectation:arg.policymakerExpectation,
        expectationVerdict:arg.expectationVerdict,
        subsequentEvidence:st.state==='AVAILABLE'?arg.subsequentEvidence:(st.survivingText||'[Withheld pending review of '+st.challengedSourceIds.join(', ')+']'),
        laterHistoriography:st.state==='AVAILABLE'?arg.laterHistoriography:(st.survivingText||'[Historiographical synthesis narrowed/withheld due to challenged source: '+st.challengedSourceIds.join(', ')+']'),
        differenceThatLimits:arg.differenceThatLimits,
        asOfDate:arg.asOfDate,
        sourceIds:arg.sourceIds,
        standing:st
      };
    });

    const interpretations=(caseObj.interpretations||[]).map(interp=>{
      const st=standing(interp,caseObj.sources,overrides,integrity);
      return {
        id:interp.id,
        title:interp.title,
        causalEmphasis:interp.causalEmphasis||'',
        text:st.state==='AVAILABLE'?interp.text:(st.survivingText||'[Quarantined pending source review: '+st.reason+']'),
        sourceIds:interp.sourceIds,
        standing:st
      };
    });

    const outcomes=(caseObj.outcomes||[]).map(out=>{
      const st=standing(out,caseObj.sources,overrides,integrity);
      return {
        id:out.id,
        text:st.state==='AVAILABLE'?out.text:(st.survivingText||'[Quarantined pending source review: '+st.reason+']'),
        causalStatus:out.causalStatus||'DOCUMENTED_OUTCOME',
        confounders:out.confounders||[],
        counterfactualGap:out.counterfactualGap||'',
        sourceIds:out.sourceIds,
        standing:st
      };
    });

    const counterexamples=(caseObj.counterexamples||[]).map(ce=>{
      const st=standing(ce,caseObj.sources,overrides,integrity);
      return {
        id:ce.id,
        title:ce.title,
        text:st.state==='AVAILABLE'?ce.text:(st.survivingText||ce.text),
        failureCondition:ce.failureCondition,
        sourceIds:ce.sourceIds,
        standing:st
      };
    });

    const comparisons=(caseObj.comparison||[]).map(comp=>{
      const st=standing(comp,caseObj.sources,overrides,integrity);
      return {
        id:comp.id,
        dimension:comp.dimension,
        timeframe:comp.timeframe||'',
        historical:st.state==='AVAILABLE'?comp.historical:(st.survivingText||'[Quarantined pending source review]'),
        present:comp.present,
        limit:comp.limit,
        asOfDate:comp.asOfDate,
        sourceIds:comp.sourceIds,
        standing:st
      };
    });

    const sourcesAndStanding=(caseObj.sources||[]).map(s=>{
      const ax=verifyEvidenceAxes(s,overrides,integrity);
      return {
        id:s.id,
        title:s.title,
        author:s.author,
        url:s.url,
        locator:s.locator,
        type:s.type,
        coverage:s.coverage||'EXCERPT_WITH_CONTEXT',
        notes:s.notes,
        axes:ax
      };
    });

    const allCaseItems=items(caseObj);
    const reopenedRecords=allCaseItems.filter(i=>standing(i,caseObj.sources,overrides,integrity).state!=='AVAILABLE');
    const reopenedArguments=args.filter(a=>a.standing.state!=='AVAILABLE');

    return {
      caseId:caseObj.id,
      title:caseObj.title,
      question:caseObj.question,
      period:caseObj.period,
      place:caseObj.place,
      theme:caseObj.theme,
      asOfDate:caseObj.asOfDate||'2026-11-08',
      whyRelevant:caseObj.questionProfile?.whyRelevantSummary||caseObj.summary,
      matchReasons,
      comparableArguments:args,
      competingInterpretations:interpretations,
      whatHappenedAfterward:{
        documentedOutcomes:outcomes,
        counterexamplesAndFailures:counterexamples
      },
      differencesThatLimit:{
        caseBoundaries:caseObj.limits||[],
        dimensionLimits:comparisons,
        rejectedAnalogies:caseObj.rejectedComparisons||[]
      },
      sourcesAndStanding,
      knownCoverageGaps:caseObj.questionProfile?.knownCoverageGaps||[],
      activeCorrectionSummary:{
        reopenedRecordsCount:reopenedRecords.length,
        totalRecordsCount:allCaseItems.length,
        reopenedArgumentsCount:reopenedArguments.length,
        totalArgumentsCount:args.length,
        challengedSourceIds:sourcesAndStanding.filter(s=>s.axes.evidentiaryStanding!=='AVAILABLE').map(s=>s.id)
      }
    };
  }

  function askHistory(questionText,data,overrides={},integrity=true){
    const rawQ=typeof questionText==='string'?questionText.trim():'';
    const libraryScope={
      curatedInquiriesCount:Array.isArray(data?.cases)?data.cases.length:5,
      verifiedSourcesCount:Array.isArray(data?.cases)?data.cases.reduce((a,c)=>a+(c.sources?.length||0),0):42,
      coreRecordsCount:Array.isArray(data?.cases)?data.cases.reduce((a,c)=>a+items(c).length,0):104,
      comparableArgumentsCount:Array.isArray(data?.cases)?data.cases.reduce((a,c)=>a+historicalArguments(c).length,0):15,
      scopeNotice:'OpenLine Department of History M5 is bounded by 5 curated historical inquiries (42 verified sources, 104 core records, 15 comparable argument chains). It never fabricates precedents outside its verified library.'
    };
    const causalGuardrailNotice='Keyword resemblance is not historical causation. Historical precedents establish what specific actors argued, tried, and experienced under documented constraints—and where structural differences break the analogy today.';

    if(!rawQ||rawQ.length>1000||DANGEROUS_HTML_RE.test(rawQ)){
      return {
        question:rawQ,
        status:'UNSUPPORTED',
        boundaryCode:'INVALID_OR_UNSAFE_QUERY',
        canEstablishAnswer:false,
        explanation:'Query is empty, exceeds length limits, or contains disallowed markup. Enter an ordinary-language historical question.',
        causalGuardrailNotice,
        libraryScope,
        matchedCaseIds:[],
        precedents:[],
        missingCoverage:['No query was evaluated.']
      };
    }

    if(!integrity){
      return {
        question:rawQ,
        status:'UNSUPPORTED',
        boundaryCode:'EVIDENCE_INTEGRITY_BLOCKED',
        canEstablishAnswer:false,
        explanation:'Dataset or citation-card SHA-256 verification failed. The engine fails closed and withholds historical explanations until byte integrity is restored.',
        causalGuardrailNotice,
        libraryScope,
        matchedCaseIds:[],
        precedents:[],
        missingCoverage:['Evidence integrity check failed.']
      };
    }

    // 1. Refuse future predictions / date forecasts (e.g. "What will happen in 2030?")
    if(FUTURE_FORECAST_QUERY_RE.test(rawQ)){
      return {
        question:rawQ,
        status:'UNSUPPORTED',
        boundaryCode:'EXTERNAL_FUTURE_FORECAST_REFUSED',
        canEstablishAnswer:false,
        explanation:'UNSUPPORTED (Future Forecast Refused): Historical evidence cannot predict what will happen in 2030 or any future date. This library can only show what past actors argued, what interventions were tried, what outcomes and unintended consequences followed, and what structural constraints bounded those episodes.',
        causalGuardrailNotice,
        libraryScope,
        matchedCaseIds:[],
        precedents:[],
        missingCoverage:[
          'Future events (such as 2030 outcomes) do not have empirical records or archival sources.',
          'To investigate a structural mechanism instead of a future prediction, ask how historical actors responded to a specific problem (e.g., maritime chokepoint closures, territorial ceasefires, banking panics, epidemic outbreaks, or workplace safety disasters).'
        ]
      };
    }

    // 2. Refuse universal ideological determinism (e.g. "Has history proved that one political ideology always succeeds?")
    if(UNIVERSAL_IDEOLOGY_QUERY_RE.test(rawQ)){
      return {
        question:rawQ,
        status:'UNSUPPORTED',
        boundaryCode:'UNIVERSAL_IDEOLOGY_OR_DETERMINISM_REFUSED',
        canEstablishAnswer:false,
        explanation:'UNSUPPORTED (Universal Ideological / Deterministic Claim Refused): The verified evidence library cannot establish that any single political ideology or policy formula always succeeds. Across all five curated inquiries, historical outcomes depended on specific physical constraints, verification mechanisms, institutional design, and confounding variables—and every case includes counterexamples where interventions failed.',
        causalGuardrailNotice,
        libraryScope,
        matchedCaseIds:[],
        precedents:[],
        missingCoverage:[
          'No verified historical dataset can prove a universal, context-free law that one political ideology always succeeds.',
          'All five dossiers in this library document competing scholarly interpretations and explicit failure conditions rather than ideological inevitability.'
        ]
      };
    }

    // 3. Reject superficial false-friend keyword traps
    if(SUPERFICIAL_KEYWORD_TRAPS_RE.test(rawQ)){
      return {
        question:rawQ,
        status:'UNSUPPORTED',
        boundaryCode:'SUPERFICIAL_KEYWORD_RESEMBLANCE_REJECTED',
        canEstablishAnswer:false,
        explanation:'UNSUPPORTED (Keyword Resemblance Rejected): Although this question shares surface words with terms in the library, keyword overlap is not historical relevance or causation. None of the five curated inquiries cover this topic.',
        causalGuardrailNotice,
        libraryScope,
        matchedCaseIds:[],
        precedents:[],
        missingCoverage:['Topic is outside the five curated historical inquiries (1854 London Cholera, 1911 Triangle Fire, 1933 U.S. Banking Crisis, 1956–2026 Strait of Hormuz & Maritime Chokepoints, 1949–2026 Israel–Palestine Arrangements).']
      };
    }

    // 4. Score each of the 5 curated dossiers deterministically
    const scored=[];
    for(const rule of CASE_MATCH_RULES){
      const caseObj=data.cases.find(c=>c.id===rule.caseId);
      if(!caseObj)continue;
      let score=0;
      const reasons=[];
      for(const pat of rule.highWeightPatterns){
        if(pat.re.test(rawQ)){
          score+=pat.weight;
          reasons.push(pat.reason);
        }
      }
      if(score>0){
        for(const ctx of rule.contextPatterns){
          if(ctx.re.test(rawQ))score+=ctx.weight;
        }
      }
      if(score>=6){
        scored.push({caseObj,score,reasons});
      }
    }

    // Allow broad founding questions ("What does history say about this situation? What happened before? What were people arguing? What did they try? What actually happened?") without a specific domain
    if(scored.length===0&&/\b(?:what\s+does\s+history\s+say|has\s+(?:something|anything)\s+like\s+(?:this|that)\s+happened\s+before|what\s+were\s+people\s+arguing)\b/i.test(rawQ)&&rawQ.split(/\s+/).length<=35){
      return {
        question:rawQ,
        status:'PARTIALLY_SUPPORTED',
        boundaryCode:'BROAD_INQUIRY_REQUIRES_DOMAIN_SELECTION',
        canEstablishAnswer:true,
        explanation:'PARTIALLY SUPPORTED: Your question asks broadly what history says, what people argued, what they tried, and what actually happened—which is the founding workflow of this Department of History—without naming a specific domain yet. Below are the verified dossiers in our 5-inquiry library so you can inspect concrete arguments, outcomes, and limits.',
        causalGuardrailNotice,
        libraryScope,
        matchedCaseIds:['hormuz','israel-palestine','banking'],
        precedents:['hormuz','israel-palestine','banking'].map(cid=>{
          const c=data.cases.find(x=>x.id===cid);
          return buildPrecedentPacket(c,['Selected as a representative verified inquiry for the founding Question-to-History workflow'],overrides,integrity);
        }),
        missingCoverage:[
          'This library covers 5 specific historical dossiers (Strait of Hormuz, Israel–Palestine, 1933 Banking Crisis, 1854 Broad Street Cholera, and 1911 Triangle Shirtwaist Fire) rather than all of human history.',
          'Name a specific domain or click any inquiry below to inspect targeted historical precedents.'
        ]
      };
    }

    if(scored.length===0){
      return {
        question:rawQ,
        status:'UNSUPPORTED',
        boundaryCode:'OUTSIDE_CURATED_EVIDENCE_LIBRARY',
        canEstablishAnswer:false,
        explanation:'UNSUPPORTED (Outside Curated Evidence Library): The verified evidence library cannot establish an answer to this question because none of its 5 curated inquiries (42 primary, institutional, and scholarly sources) contain bound records on this topic. The system refuses to manufacture precedents or speculate.',
        causalGuardrailNotice,
        libraryScope,
        matchedCaseIds:[],
        precedents:[],
        missingCoverage:[
          'No bound primary, institutional, or peer-reviewed sources in the 5-dossier library cover this question.',
          'Currently verified dossiers are strictly limited to: (1) Strait of Hormuz & Maritime Energy Chokepoints 1956–2026, (2) Israel–Palestine Civilian Protection & Treaties 1949–2026, (3) 1933 U.S. Banking Crisis, (4) 1854 London Broad Street Cholera Outbreak, and (5) 1911 Triangle Shirtwaist Factory Fire.'
        ]
      };
    }

    scored.sort((a,b)=>b.score-a.score);
    const precedents=scored.map(s=>buildPrecedentPacket(s.caseObj,s.reasons,overrides,integrity));
    const matchedCaseIds=precedents.map(p=>p.caseId);

    // Check whether the query also asks about an uncurated topic/region/episode -> PARTIALLY_SUPPORTED
    const explicitPartialGaps=[];
    for(const item of UNCURATED_PARTIAL_TOPICS){
      if(item.re.test(rawQ)){
        explicitPartialGaps.push(item.gap);
      }
    }

    const isPartiallySupported=explicitPartialGaps.length>0;
    const missingCoverage=[
      ...explicitPartialGaps,
      ...precedents.flatMap(p=>p.knownCoverageGaps)
    ];

    const status=isPartiallySupported?'PARTIALLY_SUPPORTED':'SUPPORTED';
    const boundaryCode=isPartiallySupported?'PARTIAL_LIBRARY_COVERAGE_WITH_EXPLICIT_GAPS':'VERIFIED_DOSSIER_MATCH';
    const explanation=isPartiallySupported
      ?`PARTIALLY SUPPORTED: The evidence library has verified historical records for ${precedents.map(p=>p.title+' ('+p.period+')').join(' and ')}, but explicitly lacks bound sources for part of your question (${explicitPartialGaps.join(' ')}). Inspect the verified precedent(s) and explicit coverage limits below.`
      :`SUPPORTED BY VERIFIED DOSSIER${precedents.length>1?'S':''} (${precedents.map(p=>p.caseId).join(', ')}): Retrieved ${precedents.reduce((a,p)=>a+p.comparableArguments.length,0)} comparable historical arguments, ${precedents.reduce((a,p)=>a+p.competingInterpretations.length,0)} competing scholarly interpretations, and ${precedents.reduce((a,p)=>a+p.sourcesAndStanding.length,0)} 3-axis verified sources—bounded by explicit coverage and analogy limits.`;

    return {
      question:rawQ,
      status,
      boundaryCode,
      canEstablishAnswer:true,
      explanation,
      causalGuardrailNotice,
      libraryScope,
      matchedCaseIds,
      precedents,
      missingCoverage
    };
  }

  function validateNotebook(n,data){
    const text=(s,min=0,max=5000)=>typeof s==='string'&&s.length>=min&&s.length<=max&&!DANGEROUS_HTML_RE.test(s);
    const identifier=s=>text(s,1,150)&&/^[a-zA-Z0-9_-]+$/.test(s);
    const date=s=>text(s,10,40)&&!Number.isNaN(Date.parse(s));
    const sources=new Map(data.cases.flatMap(c=>c.sources).map(s=>[s.id,s]));
    if(!n||n.schema!=='openline-history-notebook.v1'||!Array.isArray(n.challenges)||n.challenges.length>300||!Array.isArray(n.events)||n.events.length>1000)throw Error('Invalid notebook');
    if(n.dataHash!==sha256(canonical(data)))throw Error('Dataset version differs');
    if(!n.standing||typeof n.standing!=='object'||Array.isArray(n.standing)||!n.worksheets||typeof n.worksheets!=='object'||Array.isArray(n.worksheets))throw Error('Invalid notebook maps');
    const cases=new Map(data.cases.map(c=>[c.id,c]));
    const ids=new Set();
    for(const x of n.challenges){
      const c=cases.get(x.caseId);
      const validTarget=c&&(items(c).some(i=>i.id===x.itemId)||historicalArguments(c).some(a=>a.id===x.itemId));
      if(!c||!identifier(x.id)||ids.has(x.id)||!date(x.created)||!text(x.reason,10)||!validTarget||!['OPEN','RESOLVED'].includes(x.status))throw Error('Invalid challenge');
      ids.add(x.id);
      if(!text(x.url,0,2000)||x.url&&!safeURL(x.url))throw Error('Challenge URL must use HTTPS');
      if(x.status==='RESOLVED'&&(!text(x.resolution,10)||!date(x.resolved)))throw Error('Resolution needs reasons');
    }
    for(const [id,v] of Object.entries(n.standing)){
      if(!sources.has(id)||!v||typeof v!=='object'||!['ACTIVE','DISPUTED','WITHDRAWN','REVISED'].includes(v.status)||!text(v.reason,10)||v.boundSha256!==sources.get(id).sha256)throw Error('Invalid source standing');
    }
    for(const ev of n.events){
      if(!ev||ev.type!=='SOURCE_STANDING'||!sources.has(ev.sourceId)||ev.boundSha256!==sources.get(ev.sourceId).sha256||!['ACTIVE','DISPUTED','WITHDRAWN','REVISED'].includes(ev.status)||!['ACTIVE','DISPUTED','WITHDRAWN','REVISED'].includes(ev.prior)||!text(ev.reason,10)||!date(ev.created)||!Array.isArray(ev.affected))throw Error('Invalid standing history');
      const c=data.cases.find(c=>c.sources.some(s=>s.id===ev.sourceId));
      if(canonical(ev.affected)!==canonical(affected(c,ev.sourceId)))throw Error('Invalid dependency history');
    }
    for(const [id,w] of Object.entries(n.worksheets)){
      if(!cases.has(id)||!w||typeof w!=='object'||Object.keys(w).some(k=>!['record','limit','test'].includes(k)||!text(w[k])))throw Error('Invalid worksheet');
    }
    canonical(n);return n;
  }

  function mergeNotebook(local,incoming,data){
    validateNotebook(local,data);validateNotebook(incoming,data);
    const merged=JSON.parse(JSON.stringify(local));
    for(const x of incoming.challenges){
      const old=merged.challenges.find(y=>y.id===x.id);
      if(old&&canonical(old)!==canonical(x))throw Error('Challenge ID conflict; preserve both packets for manual review');
      if(!old)merged.challenges.push(x);
    }
    // Imported ACTIVE cannot clear a local hold. Restoration requires a local review action.
    for(const [id,v] of Object.entries(incoming.standing)){
      if(v.status!=='ACTIVE'){
        const cur=merged.standing[id];
        // Preserve stricter local WITHDRAWN hold over incoming DISPUTED/REVISED unless local had no WITHDRAWN hold
        if(!cur||cur.status!=='WITHDRAWN'||v.status==='WITHDRAWN')merged.standing[id]=v;
      }
    }
    for(const ev of incoming.events)if(!merged.events.some(y=>canonical(y)===canonical(ev)))merged.events.push(ev);
    for(const [id,w] of Object.entries(incoming.worksheets))if(!merged.worksheets[id])merged.worksheets[id]=w;
    return validateNotebook(merged,data);
  }

  return {
    canonical,
    sha256,
    safeURL,
    safeArchiveURL,
    items,
    historicalArguments,
    isAbstractOrSynopsisOnly,
    verifyEvidenceAxes,
    validate,
    standing,
    affected,
    evaluateComparisonCandidate,
    evaluateConsequentialCorrection,
    askHistory,
    routeCitizenQuestion:askHistory,
    validateNotebook,
    mergeNotebook
  };
});
