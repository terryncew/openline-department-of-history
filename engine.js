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
  const DETERMINISTIC_ANALOGY_RE=/\b(?:will inevitably|guarantees that|certain to cause|destined to repeat|proves that history will repeat|100%\s+certain(?:ty)?|universal recipe|can permanently|permanently end|can always|always be stopped|always be prevented|will always|would work identically|works? identically|identical(?:ly)? (?:outcome|result|effect|success))\b/i;
  const DETERMINISTIC_MAPPING_RE=/\bproves?\b[^.]{0,80}\b(?:would work|will work|works?)\b[^.]{0,40}\bidentically\b|\bwould work identically\b|\bwork(?:s|ed)? identically\b|\bproves?\b[^.]{0,60}\bidentical(?:ly)?\b/i;
  const CROSS_DOMAIN_TERM_RE=/\b(?:crypto(?:currency)?|bitcoin|stablecoin|defi|digital (?:bank|exchange|wallet)|2026)\b/i;
  const CONSENSUS_WASHING_RE=/\b(?:all historians agree|universal scholarly consensus|scholarly consensus proves|settled historical fact that|undisputed historical consensus|historians unanimously agree)\b/i;
  const UNHEDGED_CAUSAL_RE=/\b(?:single-handedly caused|solely caused|was the sole cause of|directly triggered without exception|automatically caused|caused only by|single decisive cause)\b/i;
  const DANGEROUS_HTML_RE=/<\s*\/?\s*(?:script|svg|iframe|object|embed|link|meta|style|img|body|form)\b|javascript\s*:|data\s*:\s*text\/html|\bon[a-z]{2,}\s*=/i;
  const CONTEMPORARY_FACT_RE=/\b(?:202[3-6]|1h25|as of 202[3-6]|ongoing|currently|carries roughly|unused overland pipeline capacity)\b/i;

  const FUTURE_FORECAST_QUERY_RE=/\b(?:what will happen|will happen in|who will win|predict(?:ion)?\b|forecast\b|prophec|in\s+20(?:2[7-9]|[3-9]\d)|by\s+20(?:2[7-9]|[3-9]\d)|next\s+(?:decade|century)|price\s+of\s+oil\s+in\s+20(?:2[7-9]|[3-9]\d))\b/i;
  const UNIVERSAL_IDEOLOGY_QUERY_RE=/\b(?:has history proved|did history prove|does history prove|one political ideology|which political ideology always|always succeeds|always fails|inevitably triumphs|universal law of history|proves? that capitalism|proves? that socialism|proves? that communism|proves? that democracy always|proves? that authoritarianism always)\b/i;
  // Repair (F1): a question asking whether history PROVES a universal claim ("always wins",
  // "always works"), an exact casualty count ("saved exactly 500 lives"), or a pre-trial
  // order as a final conviction must refuse — a SUPPORTED verdict would certify the
  // universal/exact claim even when the packet's fine print disagrees.
  const UNIVERSAL_PROOF_QUERY_RE=/\bprove[sd]?\b[^?]{0,90}\b(?:always|exactly\s+\d+)\b|\b(?:saved|prevented|caused)\s+exactly\s+\d+\s+(?:lives|deaths|people|victims)\b|\b(?:icj|provisional measures?|art\.?\s*41|icc|article\s+58|art\.?\s*58)\b[^?]{0,80}\b(?:genocide\s+)?conviction\b|\b(?:icj|provisional measures?|art\.?\s*41|icc|article\s+58|art\.?\s*58)\b[^?]{0,80}\b(?:final (?:judgment|verdict|determination)|merits (?:finding|judgment|conviction)|guilt beyond reasonable doubt)\b/i;

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

  // Core 105 records preserved for full M2/M4/M4.1 compatibility (104 + 1 Feb-Jun 2026 Hormuz closure outcome, repair F9)
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
      // Repair (F4): a well-formed locator is not verification. The engine holds no full
      // text except the one bundled original (bank-act.pdf), so a verbatim quote is only
      // admissible when its source ships a bundled original a reader can check word for
      // word. Any other verifiedQuote is an unverified quotation and fails closed.
      if(!qSource.attachment||!qSource.attachment.sha256){
        throw Error('Unverified quotation: quoted source has no bundled original for verbatim verification: '+i.id);
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
    // Repair (F3): deterministic 1:1 cross-domain mappings ("proves a 2026 crypto freeze
    // would work identically") previously passed because the fixed phrase list had no
    // "would work identically" / cross-domain pattern, and a supplied limit — even one
    // naming a real structural difference — satisfied the limit requirement. A limit
    // does not cure determinism in the claim itself: such mappings are rejected.
    if(DETERMINISTIC_MAPPING_RE.test(text))reasons.push('CROSS_DOMAIN_DETERMINISTIC_MAPPING_ERROR: The claim asserts a deterministic 1:1 mapping ("proves … would work identically") from a historical episode onto a different present-day domain. A historical precedent cannot prove that a different system will behave identically, and an attached limit does not cure determinism stated in the claim itself.');
    else if(CROSS_DOMAIN_TERM_RE.test(text)&&/\bthe same approach would work\b/i.test(text))reasons.push('CROSS_DOMAIN_DETERMINISTIC_MAPPING_ERROR: The claim asserts the same approach "would work" for a different present-day domain (e.g. a 2026 crypto freeze) as if the historical outcome transferred directly. Cross-domain transfer requires evidence about the new domain, not only a resemblance to the old one.');
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

    // 6. Espionage & Intelligence Oversight (1939–1978)
    if(caseObj?.id==='espionage'||/\b(?:bletchley|ultra\s+secret|venona|corona\s+satellite|operation\s+shamrock|church\s+committee|cointelpro|signals?\s+intelligence|sigint)\b/i.test(lower)){
      const claimsTechOmniscience=/\b(?:ultra|venona|corona|signals?\s+intelligence|sigint|satellite\s+reconnaissance|technical\s+(?:collection|surveillance))\b.*\b(?:eliminated\s+(?:strategic\s+)?surprise|prevented\s+all\s+surprise|replaced\s+human\s+intelligence|no\s+longer\s+need(?:ed)?\s+human|guaranteed\s+warning)\b/i.test(lower);
      const acknowledgesTechLimits=/\b(?:radio\s+silence|ardennes|one-time\s+pad|1948|intentions\s+vs|cannot\s+read\s+intentions|went\s+dark|went\s+blind)\b/i.test(combined);
      if(claimsTechOmniscience&&!acknowledgesTechLimits){
        reasons.push('SIGNALS_INTELLIGENCE_OMNISCIENCE_FALLACY: WWII and Cold War archival records (NSA Ultra/Venona and NRO CORONA) show technical collection measured physical capabilities and routine traffic, but went blind under radio silence (1944 Ardennes) or proper one-time pad use (post-1948) and could not read unspoken political intentions.');
      }
      const claimsUncheckedCovertSafe=/\b(?:warrantless|unchecked\s+executive|without\s+(?:statutory|congressional|judicial)\s+oversight|self-regulat|informal\s+executive)\b.*\b(?:without\s+(?:drifting|abuses?|violating)|protected\s+civil\s+liberties|never\s+abused|prevented\s+domestic\s+surveillance)\b/i.test(lower);
      if(claimsUncheckedCovertSafe){
        reasons.push('UNCHECKED_COVERT_AUTHORITY_FALLACY: The 1976 Senate Church Committee Report (Book II) and CIA/NSA SHAMROCK histories established that 30 years of unreviewed executive secrecy led directly to warrantless domestic telegram collection (SHAMROCK) and political watchlists (MINARET/COINTELPRO).');
      }
    }

    // 7. 1918–1919 Influenza Pandemic
    if(caseObj?.id==='influenza-1918'||/\b(?:1918\s+(?:flu|influenza|pandemic)|spanish\s+flu|st\.?\s+louis.*1918|liberty\s+loan\s+parade)\b/i.test(lower)){
      const claimsPermanentEradicationWithoutRebound=/\b(?:permanently\s+(?:eradicated|ended|halted|stopped|eliminated)|avoided\s+any\s+(?:subsequent|second|rebound|winter)\s+wave|no\s+rebound\s+wave)\b/i.test(lower);
      const acknowledgesBimodalRebound=/\b(?:bimodal|second\s+(?:wave|peak)\s+(?:occurred|followed|hit|struck|in\s+november)|triggered\s+a\s+second|susceptible\s+pool)\b/i.test(combined)&&!/\b(?:avoided\s+any|no|without\s+any)\s+(?:subsequent\s+|second\s+|rebound\s+|winter\s+)?(?:wave|peak)\b/i.test(lower);
      if(claimsPermanentEradicationWithoutRebound&&!acknowledgesBimodalRebound){
        reasons.push('PREMATURE_RELAXATION_REBOUND_OMISSION: Markel et al. (2007) JAMA and Bootsma & Ferguson (2007) PNAS show that while early closures in St. Louis and Denver cut October peak mortality, lifting restrictions in November triggered bimodal second mortality peaks among still-susceptible residents.');
      }
      const claimsSingleMeasureSufficed=/\b(?:single\s+(?:ordinance|measure)|gauze\s+masks?\s+alone|anti-spitting\s+alone|street\s+flushing\s+alone)\b.*\b(?:sufficed|just\s+as\s+effective|equally\s+effective|reduced\s+mortality\s+without\s+closing)\b/i.test(lower);
      if(claimsSingleMeasureSufficed){
        reasons.push('SINGLE_MEASURE_PANACEA_FALLACY: Across all 43 U.S. cities in 1918–1919 (Hatchett et al. 2007; Markel et al. 2007), no single unlayered measure significantly reduced peak excess mortality; reductions required early, concurrent layered closures.');
      }
    }

    // 8. Printing Press & Information Regulation (1450–1695)
    if(caseObj?.id==='printing-press'||/\b(?:gutenberg|movable\s+type|licensing\s+order\s+of\s+1643|areopagitica|stationers['’]?\s+company|typographical\s+fixity)\b/i.test(lower)){
      const claimsAutomaticTruthOrFixity=/\b(?:automatically\s+(?:eliminated|guaranteed|created|produced)|inherently\s+error-free|naturally\s+self-correct(?:ed|s)?\s+without\s+verification)\b/i.test(lower);
      if(claimsAutomaticTruthOrFixity){
        reasons.push('TECHNOLOGICAL_DETERMINISM_PRINT_FIXITY_FALLACY: Early modern print history (Eisenstein 2002; Johns 2002; 1643 Licensing Ordinance) shows that movable type multiplied piracy, counterfeit imprints, and rapid data garbling until proofreading, errata, and institutional credit norms were constructed.');
      }
      const claims1643LicensingStoppedPamphlets=/\b(?:1643\s+licensing|licensing\s+order\s+of\s+1643)\b.*\b(?:successfully\s+(?:halted|stopped|eliminated)|ended\s+unlicensed\s+pamphlets)\b/i.test(lower);
      if(claims1643LicensingStoppedPamphlets){
        reasons.push('PRE_PUBLICATION_LICENSING_SUCCESS_MYTH: Despite warrantless search-and-seizure powers, Parliament’s June 14, 1643 Licensing Order failed to halt underground printing—including John Milton’s unlicensed Areopagitica in November 1644.');
      }
    }

    // 9. 1930s Dust Bowl & Soil Conservation
    if(caseObj?.id==='dust-bowl-1930s'||/\b(?:dust\s+bowl|soil\s+conservation\s+(?:act|service)|great\s+plains\s+committee|black\s+sunday)\b/i.test(lower)){
      const claimsRapidLandValueRecovery=/\b(?:rapidly\s+restored|fully\s+restored|restored.*by\s+1940|without\s+long-term\s+(?:economic|land-value)\s+loss|halted\s+out-migration\s+by\s+1940)\b/i.test(lower);
      const acknowledgesPersistentScarring=/\b(?:28%[–-]30%|persistent.*land-value|1992|hornbeck)\b/i.test(combined)&&!/\b(?:without|no|halted|prevented)\b.*\b(?:long-term|land-value|out-migration)\b/i.test(lower);
      if(claimsRapidLandValueRecovery&&!acknowledgesPersistentScarring){
        reasons.push('SHORT_RUN_SOIL_RECOVERY_OVERCLAIM: Hornbeck (2012) demonstrated across 779 Great Plains counties that high-erosion counties suffered a persistent 28%–30% agricultural land-value loss from 1940 through 1992 and adjusted mainly through ~12% population out-migration.');
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
        // Repair (F2): a quarantined counterexample previously fell back to its full
        // verbatim text when no survivingText existed. Withhold it instead.
        text:st.state==='AVAILABLE'?ce.text:(st.survivingText||'[Withheld pending source review: '+st.challengedSourceIds.join(', ')+']'),
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
      scopeNotice:'OpenLine Department of History M5 is bounded by 5 curated historical inquiries (44 verified sources, 105 core records, 15 comparable argument chains). It never fabricates precedents outside its verified library.'
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

    // 2b. Repair (F1): refuse universal-proof, exact-count, and pre-trial-as-conviction
    // questions. These previously matched a dossier and returned SUPPORTED, certifying
    // the universal/exact claim at the status layer even though the packet's fine print
    // contradicted it. A matched dossier does not prove "always", an exact casualty
    // count, or a final conviction.
    if(UNIVERSAL_PROOF_QUERY_RE.test(rawQ)){
      return {
        question:rawQ,
        status:'UNSUPPORTED',
        boundaryCode:'UNIVERSAL_PROOF_OR_EXACT_COUNT_REFUSED',
        canEstablishAnswer:false,
        explanation:'UNSUPPORTED (Universal Proof / Exact Count / Pre-Trial Posture Refused): The verified evidence library cannot prove that a policy or ideology always wins, cannot establish an exact number of lives an intervention saved, and cannot treat a pre-trial order (ICJ Art. 41 provisional measures, ICC Art. 58 warrants) as a final merits conviction. Every dossier in this library documents limits, confounders, and counterexamples where the same kind of intervention failed or its effect could not be counted.',
        causalGuardrailNotice,
        libraryScope,
        matchedCaseIds:[],
        precedents:[],
        missingCoverage:[
          'No verified historical dataset can prove a universal, context-free "always" claim about regulation, free markets, or any policy formula.',
          'Exact casualty counts attributed to a single intervention are not established where deaths were already falling before the intervention or residents had already fled.',
          'ICJ Art. 41 provisional measures require only "plausibility of rights" and ICC Art. 58 warrants only "reasonable grounds to believe" — neither is a final merits conviction.'
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
      const unfamiliarOffer=detectUnfamiliarHistoricalSubject(rawQ,data);
      return {
        question:rawQ,
        status:'UNSUPPORTED',
        boundaryCode:'OUTSIDE_CURATED_EVIDENCE_LIBRARY',
        canEstablishAnswer:false,
        outsideVerifiedCoverage:true,
        researchOffer:unfamiliarOffer,
        explanation:'UNSUPPORTED (Outside Curated Evidence Library): The verified evidence library cannot establish an answer to this question because none of its 5 curated inquiries (44 primary, institutional, and scholarly sources) contain bound records on this topic. The system refuses to manufacture precedents or speculate.'+(unfamiliarOffer?.isResearchableHistoricalSubject?' Instead of a dead end, OpenLine v0.3 can research "'+unfamiliarOffer.subjectTitle+'" using accessible primary, institutional, and scholarly sources to generate a provisional, inspectable inquiry.':''),
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

    const supplementalOffer=isPartiallySupported?detectUnfamiliarHistoricalSubject(rawQ,data,{onlyDedicatedPacks:true}):null;
    return {
      question:rawQ,
      status,
      boundaryCode,
      canEstablishAnswer:true,
      outsideVerifiedCoverage:isPartiallySupported,
      researchOffer:supplementalOffer&&supplementalOffer.isResearchableHistoricalSubject?supplementalOffer:null,
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
      // Repair (F4): a visitor-typed quotation in a challenge reason or resolution has
      // no verified source behind it. Flag it (field present only when true) so the
      // app labels it as unverified wording instead of presenting it as evidence.
      if(hasDirectQuote(x.reason)||(x.resolution&&hasDirectQuote(x.resolution)))x.unverifiedQuotation=true;
      else delete x.unverifiedQuotation;
    }
    for(const [id,v] of Object.entries(n.standing)){
      if(!sources.has(id)||!v||typeof v!=='object'||!['ACTIVE','DISPUTED','WITHDRAWN','REVISED'].includes(v.status)||!text(v.reason,10)||v.boundSha256!==sources.get(id).sha256)throw Error('Invalid source standing');
      // Repair (F4): same unverified-quotation flag as challenges, below.
      if(hasDirectQuote(v.reason))v.unverifiedQuotation=true;
      else delete v.unverifiedQuotation;
    }
    for(const ev of n.events){
      if(!ev||ev.type!=='SOURCE_STANDING'||!sources.has(ev.sourceId)||ev.boundSha256!==sources.get(ev.sourceId).sha256||!['ACTIVE','DISPUTED','WITHDRAWN','REVISED'].includes(ev.status)||!['ACTIVE','DISPUTED','WITHDRAWN','REVISED'].includes(ev.prior)||!text(ev.reason,10)||!date(ev.created)||!Array.isArray(ev.affected))throw Error('Invalid standing history');
      const c=data.cases.find(c=>c.sources.some(s=>s.id===ev.sourceId));
      if(canonical(ev.affected)!==canonical(affected(c,ev.sourceId)))throw Error('Invalid dependency history');
    }
    for(const [id,w] of Object.entries(n.worksheets)){
      if(!cases.has(id)||!w||typeof w!=='object'||Object.keys(w).some(k=>!['record','limit','test'].includes(k)||!text(w[k])))throw Error('Invalid worksheet');
      // Repair (F4): visitor-typed quotations in a worksheet are unverified wording.
      if(['record','limit','test'].some(k=>w[k]&&hasDirectQuote(w[k])))w.unverifiedQuotation=true;
      else delete w.unverifiedQuotation;
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


  // ============================================================================
  // OpenLine Department of History v0.2 — Public Story Journey & Multi-Depth Engine
  // Projects Quick Look (~1 min), Explore (6-step story), and Examine the Evidence
  // from the exact same 3-axis verified dataset and dependency-recall standing.
  // ============================================================================

  const STORY_STEPS=[
    {id:'question',number:1,label:'The Question',shortTitle:'Why does this historical moment matter today?'},
    {id:'back-then',number:2,label:'Back Then',shortTitle:'What happened, step by step?'},
    {id:'debate',number:3,label:'The Debate',shortTitle:'What did people believe and argue at the time?'},
    {id:'what-happened',number:4,label:'What Happened',shortTitle:'What worked, what failed, and what remains uncertain?'},
    {id:'different-today',number:5,label:'What’s Different Today',shortTitle:'Where does the comparison hold—and where does it break?'},
    {id:'evidence',number:6,label:'Explore the Evidence',shortTitle:'Inspect the original sources and test them yourself'}
  ];

  const DEPTH_LEVELS=[
    {id:'quick',label:'Quick Look',badge:'~1 min read',description:'Understand the basic historical story, what happened, and the key limit in about one minute.'},
    {id:'explore',label:'Explore',badge:'Interactive journey',description:'Step through the timeline, test what people expected before revealing the outcome, and compare then vs. today.'},
    {id:'examine',label:'Examine the Evidence',badge:'Full sources & lab',description:'Inspect original sources, 3-axis verification, competing scholarship, analogy falsifiers, and correction records.'}
  ];

  const PLAIN_LANGUAGE_CONCEPTS={
    cholera:[
      {
        term:'Miasma theory ("bad air")',
        plain:'In 1854, most doctors and officials believed cholera spread through foul smells rising from decaying matter in the air rather than through contaminated drinking water.',
        whyItMatters:'Because officials looked for bad smells instead of sewage in wells, clean-looking pump water was assumed safe until household usage was compared.',
        sourceIds:['snow1855','parish1855','oleckno2008']
      },
      {
        term:'Confounded sequence (pre-intervention decline)',
        plain:'When a crisis is already subsiding before an action is taken, the drop afterward cannot by itself prove how much the action helped.',
        whyItMatters:'John Snow’s own 1855 table shows fatal attacks in Soho peaked on September 1–2 and fell steeply before the Broad Street pump handle was removed on September 8.',
        sourceIds:['snow1855','brody2000']
      },
      {
        term:'Natural experiment (South London water companies)',
        plain:'Two competing private water companies ran pipes down the very same South London streets—Lambeth drawing cleaner water upstream, Southwark & Vauxhall drawing sewage-polluted water downstream.',
        whyItMatters:'Comparing neighbors with different water suppliers allowed Snow to test waterborne transmission across thousands of homes, though historians still note neighborhood data gaps.',
        sourceIds:['snow1855','oleckno2008','koch2008']
      },
      {
        term:'Post-hoc spot map',
        plain:'A map drawn after an event to illustrate findings rather than used in real time to make the initial emergency decision.',
        whyItMatters:'Snow presented his famous dot map in December 1854—three months after the September 8 pump-handle removal—to explain the pattern, not to trigger the initial vote.',
        sourceIds:['brody2000','koch2008']
      }
    ],
    triangle:[
      {
        term:'"Fireproof" building shell vs. occupant safety',
        plain:'The 10-story Asch Building was built of iron and stone so the structure itself would not collapse in a fire, which led authorities to treat it as "fireproof."',
        whyItMatters:'The masonry walls survived the March 25, 1911 fire intact while 146 garment workers died inside within 18 minutes because exit doors, stairs, and fire escapes failed.',
        sourceIds:['tri-harmon','tri-relief','tri-markowitz-rosner']
      },
      {
        term:'Criminal burden of proof vs. preventive safety rules',
        plain:'In the December 1911 criminal trial, prosecutors had to prove beyond a reasonable doubt that the owners personally knew the 9th-floor door was locked at the exact moment of the fire.',
        whyItMatters:'The jury’s acquittal of Harris and Blanck meant the narrow criminal charge was not proven to twelve jurors—not that the workplace was safe or unlocked.',
        sourceIds:['tri-trial','tri-cornell-reform']
      },
      {
        term:'Factory Investigating Commission (1911–1915)',
        plain:'A bipartisan New York State legislative commission given subpoena power and technical investigators to inspect hundreds of factories unannounced and rewrite state safety laws.',
        whyItMatters:'Instead of relying on voluntary employer pledges, the Commission passed over 30 enforceable laws mandating sprinklers, outward-swinging doors, and fire drills.',
        sourceIds:['tri-fic','tri-cornell-reform','tri-markowitz-rosner']
      },
      {
        term:'Protocols of Peace',
        plain:'Union-employer agreements negotiated in the garment industry after the 1909–1910 strikes to handle grievances and sanitary standards inside unionized shops.',
        whyItMatters:'Because the Triangle Waist Company refused union recognition in 1909, voluntary industry agreements could not reach non-union lofts without state law.',
        sourceIds:['tri-relief','tri-greenwald']
      }
    ],
    banking:[
      {
        term:'Bank run & depositor contagion',
        plain:'Banks keep only a fraction of deposits in vault cash. When fearful depositors rush to withdraw cash all at once, even solvent banks can be forced to close.',
        whyItMatters:'By March 1933, cascading state closures and gold withdrawals forced a nationwide pause so examiners could separate solvent banks from insolvent ones.',
        sourceIds:['bank-holiday','bank-report']
      },
      {
        term:'Staggered licensing (Class A, B, and C banks)',
        plain:'During the March 1933 holiday, federal regulators sorted banks into Class A (strong enough to reopen immediately), Class B (restricted under conservators), and Class C (closed).',
        whyItMatters:'Only examined banks were allowed to reopen starting March 13, making the reopening badge credible—though roughly 4,200 unlicensed banks holding ~$4 billion stayed closed in April.',
        sourceIds:['bank-act','bank-chat','bank-report']
      },
      {
        term:'Title IV Federal Reserve Bank Notes (emergency liquidity)',
        plain:'A provision in the March 9, 1933 Emergency Banking Act allowing the Federal Reserve to ship emergency cash to reopened banks backed by broader bank assets rather than strict gold ratios.',
        whyItMatters:'Depositors returned $1.2 billion in cash not just because of Roosevelt’s radio speech, but because the Federal Reserve stood ready to supply unlimited currency to licensed banks.',
        sourceIds:['bank-act','bank-silber']
      },
      {
        term:'FDIC deposit insurance (January 1934 vs. March 1933)',
        plain:'Federal insurance guaranteeing retail bank accounts (initially up to $2,500) created by the June 1933 Glass-Steagall Act, taking effect on January 1, 1934.',
        whyItMatters:'Because FDIC insurance did not start until nearly ten months after the March 1933 reopening, it helped prevent later panics but did not stop the March 1933 run.',
        sourceIds:['bank-fdic','bank-silber']
      }
    ],
    hormuz:[
      {
        term:'Pass-through corridor vs. geographic cul-de-sac',
        plain:'A pass-through strait (like Bab el-Mandeb in the Red Sea) connects two open oceans so ships can detour around Africa; a cul-de-sac (like the Persian Gulf behind Hormuz) has only one sea exit.',
        whyItMatters:'When Red Sea shipping fell >50% in 2023–2025, tankers detoured around the Cape of Good Hope (+15 days); a Strait of Hormuz blockade has no sea detour.',
        sourceIds:['hormuz-eia-chokepoints','hormuz-eia-redsea','hormuz-unctad-redsea']
      },
      {
        term:'Overland pipeline bypass ceiling (~4.7 mb/d oil, 0 LNG)',
        plain:'The maximum amount of Persian Gulf oil that can be pumped overland to Red Sea or Gulf of Oman ports without passing through the Strait of Hormuz.',
        whyItMatters:'Saudi and UAE pipelines can bypass only ~4.7 million barrels/day out of ~20.9 mb/d of Hormuz oil flow (<25%) and 0% of Qatar’s 11.4 Bcf/d liquefied natural gas.',
        sourceIds:['hormuz-eia-chokepoints','hormuz-crs-abqaiq-2019']
      },
      {
        term:'Strategic Petroleum Reserve (SPR) drawdown ceiling & lag',
        plain:'Government emergency crude oil stockpiles stored in underground salt caverns, which are physically limited by pipeline/pump rates (4.4 mb/d max in the U.S.) and take ~13 days to reach market after a sale.',
        whyItMatters:'SPR releases calm short-term hoarding during bounded outages, but cannot physically replace a ~16 mb/d net Hormuz oil deficit or any LNG.',
        sourceIds:['hormuz-doe-spr','hormuz-iea-releases','hormuz-hamilton-2011']
      },
      {
        term:'Sweet vs. sour crude refining mismatch',
        plain:'"Sweet" crude has low sulfur; "sour" crude has high sulfur and requires specialized refinery desulfurization units to process into fuel.',
        whyItMatters:'In 1991 and 2005, refiners rejected millions of barrels of high-sulfur sour SPR oil because they lacked the equipment or sweet crude needed to process it.',
        sourceIds:['hormuz-doe-spr']
      }
    ],
    'israel-palestine':[
      {
        term:'Armistice Demarcation Line vs. recognized border',
        plain:'The 1949 Rhodes Armistice Agreements explicitly stated (Article V(2)) that cease-fire lines were temporary military lines and not permanent political borders.',
        whyItMatters:'Without a political treaty or armed enforcement, the 1949 demilitarized zones eroded through cross-border raids and competing sovereignty claims.',
        sourceIds:['ip-armistice-1949','ip-carnegie-mediation-2026']
      },
      {
        term:'Tiered demilitarization & the Sinai MFO (1979)',
        plain:'The 1979 Egypt–Israel Peace Treaty divided the Sinai Peninsula into four zones (A, B, C, D) with strict force caps verified by the Multinational Force and Observers (MFO), funded equally by Egypt, Israel, and the U.S.',
        whyItMatters:'Treaty verification held for decades when paired with full sovereign withdrawal and equal party buy-in, unlike open-ended interim arrangements.',
        sourceIds:['ip-sinai-mfo-1979','ip-carnegie-mediation-2026']
      },
      {
        term:'Oslo Areas A, B, and C interim division (1993–1995)',
        plain:'A temporary 5-year administrative framework dividing the West Bank into Area A (Palestinian civil/security), Area B (Palestinian civil, joint/Israeli security), and Area C (~60%, full Israeli control) while deferring borders, Jerusalem, refugees, and settlements.',
        whyItMatters:'Without a settlement freeze or automatic enforcement mechanism, the 5-year interim map became locked in indefinitely as West Bank settlements grew past 700,000.',
        sourceIds:['ip-oslo-1993-1995','ip-icj-advisory-2024','ip-carnegie-mediation-2026']
      },
      {
        term:'ICJ Provisional Measures (Art. 41) & ICC Art. 58 Warrants',
        plain:'Emergency court orders issued before a final trial on the merits: ICJ Provisional Measures require "plausibility of rights" and imminent risk, while ICC arrest warrants require "reasonable grounds to believe."',
        whyItMatters:'Accurate historical and legal literacy requires distinguishing binding pre-trial orders and thresholds from a final merits judgment or criminal conviction.',
        sourceIds:['ip-icj-provisional-2024','ip-icj-advisory-2024','ip-icc-warrants-2024']
      }
    ]
  };

  const SOURCE_INVESTIGATION_CHALLENGES={
    cholera:{
      id:'cholera-source-challenge',
      title:'Investigate the Sources: Did removing the pump handle end the epidemic?',
      question:'Compare Dr. John Snow’s 1855 primary mortality table (Source #1: snow1855) with the CDC’s 2004 commemorative summary (Source #6: cdc2004). What does the 1855 primary record show that the 2004 summary overstates?',
      primarySourceId:'snow1855',
      targetSourceId:'cdc2004',
      options:[
        {id:'opt-a',label:'The 1855 table shows daily deaths had already peaked around Sept 1–2 and fallen steeply before the handle was removed on Sept 8.',isSupported:true,feedback:'Supported by the primary record. Snow’s 1855 Table I explicitly documents that daily fatal attacks peaked days earlier and were already declining rapidly before September 8, 1854.'},
        {id:'opt-b',label:'The 1855 table proves that Snow’s famous spot map was shown to the Board on Sept 7 to force the vote.',isSupported:false,feedback:'Not supported by the primary record. Historical cartography research (Brody et al. 2000) shows Snow presented his spot map in December 1854, months after the September 8 pump action.'},
        {id:'opt-c',label:'Both sources prove with 100% certainty how many exact lives the pump-handle removal saved.',isSupported:false,feedback:'Not supported. Because residents had already fled Soho and attacks were falling before Sept 8, the exact counterfactual number of deaths prevented cannot be isolated from a single timeline.'}
      ],
      takeaway:'When you challenge Source #6 (cdc2004) in the lab below, watch how OpenLine reopens the 4 records that cited it and narrows them to what John Snow’s 1855 primary table (snow1855) actually proves.'
    },
    triangle:{
      id:'triangle-source-challenge',
      title:'Investigate the Sources: What can an abstract-only citation prove?',
      question:'Compare the 1911 Trial Transcript & 1915 Factory Investigating Commission primary records (tri-trial, tri-fic) with Source #7 (tri-mcevoy, curated from a journal abstract only). Why does OpenLine flag abstract-only sources?',
      primarySourceId:'tri-fic',
      targetSourceId:'tri-mcevoy',
      options:[
        {id:'opt-a',label:'An abstract-only card summarizes a scholar’s thesis, so it cannot be used to verify verbatim full-text quotations or replace primary statutory records.',isSupported:true,feedback:'Supported by 3-axis verification. OpenLine labels tri-mcevoy as ABSTRACT_OR_SYNOPSIS_ONLY on Axis 2 so no one can attribute a fabricated full-text quote to the unread article.'},
        {id:'opt-b',label:'Because tri-mcevoy has a valid SHA-256 checksum on Axis 1, the full article text was verified.',isSupported:false,feedback:'False. Axis 1 (SHA-256 byte integrity) only proves the local citation card file was not altered; Axis 2 separately tracks whether the full text or only an abstract was inspected.'},
        {id:'opt-c',label:'Withdrawing tri-mcevoy invalidates the primary records of the 1911 fire and 1912–1914 New York factory laws.',isSupported:false,feedback:'False. Because the primary facts and statutory outcomes are bound to tri-relief, tri-harmon, tri-trial, and tri-fic, challenging tri-mcevoy reopens only 1 interpretive card while leaving 17 records untouched.'}
      ],
      takeaway:'Test challenging Source #7 (tri-mcevoy) below to see how OpenLine quarantines only the single abstract-based interpretation while keeping all 17 primary and statutory records intact.'
    },
    banking:{
      id:'banking-source-challenge',
      title:'Investigate the Sources: Primary Statute vs. Economist Interpretation',
      question:'Compare the bundled 1933 Emergency Banking Act PDF (Source #1: bank-act) with monetary historian William Silber’s 2009 analysis (Source #6: bank-silber). How do they differ on why depositors returned their cash on March 13, 1933?',
      primarySourceId:'bank-act',
      targetSourceId:'bank-silber',
      options:[
        {id:'opt-a',label:'The 1933 Act text sets statutory powers for staged licensing and Title IV emergency currency, while Silber (2009) offers an interpretive hypothesis that this functioned as an "implicit guarantee."',isSupported:true,feedback:'Supported by the records. The statute itself (48 Stat. 1) authorized conservators and Federal Reserve Bank Notes; Silber’s argument that markets read this as a 100% implicit guarantee is a scholarly interpretation.'},
        {id:'opt-b',label:'The March 9, 1933 Emergency Banking Act created the FDIC and insured deposits starting March 13, 1933.',isSupported:false,feedback:'Contradicted by the primary record. FDIC deposit insurance was enacted months later in June 1933 and did not take effect until January 1, 1934 (bank-fdic).'},
        {id:'opt-c',label:'All U.S. banks reopened on March 13, 1933 with zero frozen deposits.',isSupported:false,feedback:'Contradicted by the April 1933 Federal Reserve Bulletin (bank-report), which documented ~4,200 unlicensed banks still closed or restricted with ~$4 billion in deposits tied up.'}
      ],
      takeaway:'Test challenging Source #6 (bank-silber) below to see how OpenLine separates the primary statutory text (bank-act) and Federal Reserve data (bank-report) from Silber’s interpretive thesis.'
    },
    hormuz:{
      id:'hormuz-source-challenge',
      title:'Investigate the Sources: Market Adaptation Thesis vs. Physical Chokepoint Limits',
      question:'Compare U.S. EIA / Navy primary & institutional records (hormuz-eia-chokepoints, hormuz-nhhc-tanker-war) with Source #8 (hormuz-gholz-press-2010, an abstract-only article arguing markets adapt to wartime shipping disruptions). Where does that thesis require caution?',
      primarySourceId:'hormuz-eia-chokepoints',
      targetSourceId:'hormuz-gholz-press-2010',
      options:[
        {id:'opt-a',label:'Market adaptation in the 1980s Tanker War relied on accessible spare capacity and open transit, whereas a full Hormuz closure traps Gulf spare capacity inside a cul-de-sac with <25% pipeline bypass and 0% LNG bypass.',isSupported:true,feedback:'Supported by EIA and CRS records. In 1987–88, Iraq and Iran attacked individual ships without closing the Strait; in a full Hormuz closure, pipelines bypass only ~4.7 mb/d of ~20.9 mb/d oil and 0 Bcf/d of LNG.'},
        {id:'opt-b',label:'Tankers blocked at the Strait of Hormuz can simply detour around the Cape of Good Hope just like in the Red Sea.',isSupported:false,feedback:'Geographically impossible. The Persian Gulf is a semi-enclosed sea with only one maritime outlet (the Strait of Hormuz); the Cape of Good Hope detour only works for the Red Sea / Suez pass-through corridor.'},
        {id:'opt-c',label:'The U.S. Strategic Petroleum Reserve can replace 100% of Persian Gulf oil and Qatari LNG for six months.',isSupported:false,feedback:'Contradicted by DOE operational records (hormuz-doe-spr): the U.S. SPR is capped at 4.4 mb/d physical drawdown (13-day lag) and holds zero liquefied natural gas.'}
      ],
      takeaway:'Test challenging Source #8 (hormuz-gholz-press-2010) below to watch 4 multi-source records automatically narrow to their surviving primary Naval History and EIA data.'
    },
    'israel-palestine':{
      id:'ip-source-challenge',
      title:'Investigate the Sources: Primary Treaty & UN Records vs. Book-Review Synopses',
      question:'Compare the full-text primary treaties and UN/court records (1979 Sinai Treaty, 1993–95 Oslo Accords, UN OCHA, ICJ/ICC) with Source #11 (ip-shlaim-lustick-reviews, curated from published book reviews of four historians). Why does OpenLine separate them?',
      primarySourceId:'ip-sinai-mfo-1979',
      targetSourceId:'ip-shlaim-lustick-reviews',
      options:[
        {id:'opt-a',label:'Primary treaties and UN operational logs establish verifiable terms and cargo/casualty figures, while book-review synopses summarize competing historians’ causal interpretations without full-book text inspection.',isSupported:true,feedback:'Supported by 3-axis verification. Separating SYNOPSIS_ONLY historiographical reviews from primary treaty texts ensures that challenging secondary summaries never alters primary treaty or humanitarian facts.'},
        {id:'opt-b',label:'Historians agree on a single undisputed reason why the 1993–1995 Oslo Accords broke down.',isSupported:false,feedback:'False. As documented in the competing interpretations, scholars diverge sharply between structural power asymmetry, executive non-compliance and spoiler violence, and gradualist interim design flaws.'},
        {id:'opt-c',label:'The 2024 ICJ Provisional Measures Orders were final merits convictions rather than emergency Article 41 plausibility orders.',isSupported:false,feedback:'Contradicted by the primary court orders (ip-icj-provisional-2024): Article 41 provisional measures protect plausible rights against imminent risk prior to a final merits judgment.'}
      ],
      takeaway:'Test challenging Source #11 (ip-shlaim-lustick-reviews) below to verify that all 19 primary treaty, timeline, comparison, and humanitarian outcome records remain 100% intact while the 3 historiography cards narrow to primary/Carnegie sources.'
    }
  };

  const ARCHIVAL_EXHIBITS={
    cholera:{
      title:'1854 Broad Street Outbreak Curve & Well Excavation Diagram',
      provenanceLabel:'Schematic data diagram constructed from Dr. John Snow’s 1855 Table I (snow1855) and St. James Parish Surveyor York’s 1855 excavation report (parish1855) — not an original 1854 photograph.',
      isOriginalFacsimile:false,
      originalAttachmentPath:null,
      sourceIds:['snow1855','parish1855','brody2000'],
      hotspots:[
        {id:'cholera-hs-1',label:'1. Aug 31 – Sept 2 Peak (143 fatal attacks/day)',detail:'Snow’s 1855 mortality table shows fatal attacks surged on Aug 31 and peaked on Sept 1–2—nearly a week before the pump handle was removed.',sourceIds:['snow1855']},
        {id:'cholera-hs-2',label:'2. Sept 3–7 Steep Pre-Intervention Decline',detail:'Fatal attacks were already falling sharply from Sept 3 to Sept 7 as residents fled Soho and water use shifted, confounding simple before-and-after claims.',sourceIds:['snow1855','brody2000']},
        {id:'cholera-hs-3',label:'3. Sept 8 Pump Handle Removed',detail:'The St. James Parish Board of Governors ordered the Broad Street pump handle removed on Sept 8 as a precautionary civic action after Snow’s Sept 7 presentation.',sourceIds:['snow1855','cdc2004']},
        {id:'cholera-hs-4',label:'4. 40 Broad Street Cesspool Leak (2 ft 8 in from well)',detail:'In 1855, Rev. Henry Whitehead’s infant index-case discovery and Surveyor York’s excavation proved a brick drain at 40 Broad Street leaked 2 feet 8 inches from the well.',sourceIds:['parish1855']}
      ]
    },
    triangle:{
      title:'1911 Asch Building Exit Bottlenecks & 1912–1914 Statutory Reforms',
      provenanceLabel:'Architectural and regulatory diagram constructed from 1911 trial testimony (tri-trial, tri-harmon), 1913 relief records (tri-relief), and 1915 Factory Investigating Commission reports (tri-fic) — presented with dignity; not an archival photograph.',
      isOriginalFacsimile:false,
      originalAttachmentPath:null,
      sourceIds:['tri-harmon','tri-relief','tri-trial','tri-fic'],
      hotspots:[
        {id:'triangle-hs-1',label:'1. 9th-Floor Washington Place Door (Locked)',detail:'Trial testimony documented that the Washington Place exit door on the 9th floor was locked during work shifts to monitor workers and prevent theft, trapping workers when fire broke out on March 25, 1911.',sourceIds:['tri-trial','tri-relief']},
        {id:'triangle-hs-2',label:'2. Narrow Rear Fire Escape & 6th-Floor Ladder Limit',detail:'The single exterior iron fire escape twisted and collapsed under the weight of fleeing workers, while Fire Department aerial ladders reached only to the 6th floor (below the 8th–10th floors).',sourceIds:['tri-relief','tri-markowitz-rosner']},
        {id:'triangle-hs-3',label:'3. Why the "Fireproof" Shell Did Not Save Lives',detail:'Inspector G. I. Harmon had inspected the iron-and-stone Asch Building in Feb 1911. The masonry shell survived the fire intact, proving structural fireproofing alone does not protect occupants without unlocked exits and sprinklers.',sourceIds:['tri-harmon','tri-markowitz-rosner']},
        {id:'triangle-hs-4',label:'4. 1911–1915 Factory Investigating Commission Laws',detail:'After the December 1911 criminal acquittal, New York’s Factory Investigating Commission enacted >30 laws mandating automatic sprinklers above 7 stories, outward-opening unlocked doors, and fire drills.',sourceIds:['tri-fic','tri-cornell-reform']}
      ]
    },
    banking:{
      title:'March 1933 Staggered Bank Reopening, Title IV Liquidity & Bundled 48 Stat. 1 Facsimile',
      provenanceLabel:'Timeline and liquidity diagram constructed from the Emergency Banking Act of March 9, 1933 (bank-act, original public-domain PDF bundled offline) and April 1933 Federal Reserve Bulletin (bank-report).',
      isOriginalFacsimile:true,
      originalAttachmentPath:'originals/bank-act.pdf',
      sourceIds:['bank-act','bank-chat','bank-report','bank-fdic'],
      hotspots:[
        {id:'banking-hs-1',label:'1. March 6–12 National Bank Holiday & Solvency Audit',detail:'Proclamation 2039 and the March 9 Emergency Banking Act halted all banking transactions nationwide so examiners could classify banks into Class A (sound), Class B (restricted), and Class C (insolvent).',sourceIds:['bank-holiday','bank-act']},
        {id:'banking-hs-2',label:'2. Title IV Emergency Currency + March 12 Fireside Chat',detail:'Title IV authorized Federal Reserve Bank Notes backed by broader assets. Combined with Roosevelt’s March 12 radio explanation, depositors returned $1.2 billion in currency within two weeks of March 13.',sourceIds:['bank-act','bank-chat','bank-silber']},
        {id:'banking-hs-3',label:'3. The Unlicensed Bank Cost: ~4,200 Banks & ~$4 Billion Frozen',detail:'Reopening was not painless: the April 1933 Federal Reserve Bulletin reported roughly 4,200 unlicensed banks remained closed or restricted as of April 12, tying up ~$4 billion in deposits.',sourceIds:['bank-report']},
        {id:'banking-hs-4',label:'4. January 1, 1934: FDIC Deposit Insurance Begins (10 Months Later)',detail:'Statutory FDIC deposit insurance ($2,500 initial cap) did not take effect until January 1, 1934—proving FDIC did not stop the acute March 1933 panic.',sourceIds:['bank-fdic']}
      ]
    },
    hormuz:{
      title:'Maritime Chokepoint Topology: Strait of Hormuz Cul-de-Sac vs. Red Sea Detour',
      provenanceLabel:'Geographic and flow diagram constructed from U.S. EIA World Oil Transit Chokepoints (hormuz-eia-chokepoints), UNCTAD Red Sea Assessment (hormuz-unctad-redsea), and U.S. DOE SPR records (hormuz-doe-spr).',
      isOriginalFacsimile:false,
      originalAttachmentPath:null,
      sourceIds:['hormuz-eia-chokepoints','hormuz-eia-redsea','hormuz-doe-spr','hormuz-crs-abqaiq-2019'],
      hotspots:[
        {id:'hormuz-hs-1',label:'1. Strait of Hormuz Flow: 20.9 mb/d Oil & 11.4 Bcf/d LNG',detail:'Roughly 20% of global petroleum liquids (~20.9 mb/d) and ~20% of global LNG (~11.4 Bcf/d from Qatar/UAE) exit the Persian Gulf through the Strait of Hormuz with zero alternative sea outlet.',sourceIds:['hormuz-eia-chokepoints']},
        {id:'hormuz-hs-2',label:'2. Overland Pipeline Bypass Ceiling: ~4.7 mb/d Oil, 0 LNG',detail:'Saudi Arabia’s East-West Petroline and the UAE’s ADCOP pipeline to Fujairah offer only ~4.7 mb/d of unused overland crude bypass (<25% of Hormuz oil flow) and 0 Bcf/d of LNG bypass.',sourceIds:['hormuz-eia-chokepoints','hormuz-crs-abqaiq-2019']},
        {id:'hormuz-hs-3',label:'3. Why Bab el-Mandeb / Red Sea Is Different (+15-Day Cape Detour)',detail:'When 2023–2025 Red Sea attacks cut Bab el-Mandeb transit by >50%, tankers rerouted around South Africa’s Cape of Good Hope (+15 transit days), absorbing the shock via fleet ton-miles.',sourceIds:['hormuz-eia-redsea','hormuz-unctad-redsea']},
        {id:'hormuz-hs-4',label:'4. U.S. SPR Drawdown Ceiling: 4.4 mb/d Max & 13-Day Delivery Lag',detail:'The U.S. Strategic Petroleum Reserve is physically capped at a 4.4 mb/d maximum drawdown rate, takes 13 days from sale notice to enter pipelines, and holds zero LNG.',sourceIds:['hormuz-doe-spr','hormuz-iea-releases']}
      ]
    },
    'israel-palestine':{
      title:'Treaty Verification & Civilian Relief Architecture (1949–2026)',
      provenanceLabel:'Comparative institutional diagram constructed from the 1949 Armistice Agreements (ip-armistice-1949), 1979 Egypt–Israel Treaty Annex I (ip-sinai-mfo-1979), 1993–95 Oslo Accords (ip-oslo-1993-1995), and UN OCHA/IPC logs (ip-ocha-pauses, ip-ipc-reviews) — a reconstructed diagram, not a photograph.',
      isOriginalFacsimile:false,
      originalAttachmentPath:null,
      sourceIds:['ip-armistice-1949','ip-sinai-mfo-1979','ip-oslo-1993-1995','ip-ocha-pauses','ip-ipc-reviews'],
      hotspots:[
        {id:'ip-hs-1',label:'1. 1979 Sinai Peace Treaty: 4 Tiered Zones + MFO Verification',detail:'Paired 100% Israeli withdrawal from Sinai and recognized interstate borders with 4 demilitarized security zones (A, B, C, D) monitored by the Multinational Force and Observers (funded 1/3 each by Egypt, Israel, and the U.S.).',sourceIds:['ip-sinai-mfo-1979','ip-carnegie-mediation-2026']},
        {id:'ip-hs-2',label:'2. 1949 Armistice & 1993–95 Oslo Interim Limits',detail:'Both the 1949 Armistice lines (Art. V(2)) and 1993–95 Oslo Areas A/B/C deferred final borders, sovereignty, and settlements without third-party enforcement, leaving interim lines vulnerable to lock-in and spoilers.',sourceIds:['ip-armistice-1949','ip-oslo-1993-1995']},
        {id:'ip-hs-3',label:'3. 2025 Gaza Phase One Ceasefire vs. March Siege & Famine',detail:'During the 42-day Jan–Mar 2025 ceasefire, food aid tripled (>78,000 MT) and looting stopped; when crossings closed on March 2, 2025, deprivation escalated into IPC-confirmed Famine (Phase 5) in Gaza Governorate by August 2025.',sourceIds:['ip-ocha-pauses','ip-ipc-reviews']},
        {id:'ip-hs-4',label:'4. 2024 International Court Thresholds (ICJ Art. 41 & ICC Art. 58)',detail:'In 2024, the ICJ issued binding Art. 41 Provisional Measures ("plausibility of rights") and a July 2024 Advisory Opinion on occupation unlawfulness, while ICC Pre-Trial Chamber I issued Art. 58 arrest warrants ("reasonable grounds").',sourceIds:['ip-icj-provisional-2024','ip-icj-advisory-2024','ip-icc-warrants-2024']}
      ]
    }
  };

  const QUICK_LOOK_SUMMARIES={
    cholera:{
      question:{
        headline:'When an outbreak strikes, how do you act before every detail is proved?',
        text:'In late August 1854, a sudden cholera outbreak near Broad Street in Soho, London killed more than 500 residents in ten days. Officials had to decide what to do while doctors disagreed on how cholera spread.',
        sourceIds:['snow1855','parish1855']
      },
      'back-then':{
        headline:'House-to-house evidence pointed to the Broad Street pump.',
        text:'Dr. John Snow tracked where victims got their drinking water—including residents who lived far away but drank Broad Street pump water—and presented his findings to the parish board on September 7, 1854.',
        sourceIds:['snow1855','parish1855']
      },
      debate:{
        headline:'"Bad air" (miasma) vs. contaminated drinking water.',
        text:'Most authorities blamed foul air ("miasma") because the pump water looked clear. Skeptical parish curate Rev. Henry Whitehead initially doubted Snow, but investigated door-to-door and found the index infant case at 40 Broad Street.',
        sourceIds:['snow1855','parish1855','oleckno2008']
      },
      'what-happened':{
        headline:'The pump handle came off Sept 8—but deaths were already falling.',
        text:'Officials removed the pump handle on September 8 and later excavated a leaking cesspool 2 feet 8 inches from the well. Crucially, Snow’s own 1855 table shows daily deaths had already peaked Sept 1–2 and dropped steeply before Sept 8.',
        sourceIds:['snow1855','parish1855','brody2000','cdc2004']
      },
      'different-today':{
        headline:'Why this lesson has limits: Timing and maps can mislead.',
        text:'Snow’s spot map was presented in December 1854, not used to convince the board on Sept 7. Acting on strong field evidence was wise, but an action followed by a drop does not prove the action alone caused the drop.',
        sourceIds:['snow1855','brody2000','koch2008']
      },
      evidence:{
        headline:'6 verified sources: 2 primary 1855 reports, 3 scholarly studies, 1 CDC summary.',
        text:'Inspect Snow’s 1855 monograph and the St. James Parish Inquiry report directly—and test what happens when you challenge the CDC’s simplified 2004 pump-handle summary.',
        sourceIds:['snow1855','parish1855','brody2000','oleckno2008','koch2008','cdc2004']
      }
    },
    triangle:{
      question:{
        headline:'What turns warnings about unsafe workplaces into real protection?',
        text:'On March 25, 1911, a fire at the Triangle Waist Company on the 8th–10th floors of New York’s Asch Building killed 146 garment workers—just 16 months after workers had gone on strike over safety and working conditions.',
        sourceIds:['tri-relief','tri-cornell-reform']
      },
      'back-then':{
        headline:'A "fireproof" building where workers could not get out.',
        text:'The iron-and-stone building shell survived the fire, and an inspector had visited a month earlier. Yet 146 workers died within 18 minutes because a 9th-floor exit door was locked, the rear fire escape collapsed, and ladders reached only the 6th floor.',
        sourceIds:['tri-harmon','tri-relief','tri-trial']
      },
      debate:{
        headline:'Routine inspections and criminal trials vs. enforceable safety laws.',
        text:'Before the fire, officials assumed a fireproof building shell was enough. Afterward, prosecutors sought manslaughter convictions against owners Isaac Harris and Max Blanck, while labor reformers pushed for mandatory state engineering laws.',
        sourceIds:['tri-trial','tri-fic','tri-cornell-reform']
      },
      'what-happened':{
        headline:'The owners were acquitted in criminal court, but 30+ state safety laws passed.',
        text:'In December 1911, a jury acquitted the owners because criminal law required proof beyond a reasonable doubt that they personally knew the door was locked at that moment. Lasting change came from the Factory Investigating Commission’s 1912–1914 laws.',
        sourceIds:['tri-trial','tri-fic','tri-markowitz-rosner']
      },
      'different-today':{
        headline:'Why this lesson has limits: State borders and enforcement capacity.',
        text:'A criminal acquittal does not mean a workplace was safe, and passing a law on paper only works with unannounced inspections. Even then, New York’s laws could not stop employers from moving production to jurisdictions with weaker rules.',
        sourceIds:['tri-fic','tri-greenwald','tri-markowitz-rosner']
      },
      evidence:{
        headline:'9 verified sources: 1911 trial & inspection records, 1913 relief report, 1915 Commission.',
        text:'Examine the primary inspection, trial, relief, and legislative records—and see how OpenLine separates full-text primary records from abstract-only scholarly citations.',
        sourceIds:['tri-harmon','tri-relief','tri-trial','tri-fic','tri-cornell-reform','tri-markowitz-rosner','tri-mcevoy','tri-greenwald']
      }
    },
    banking:{
      question:{
        headline:'When people lose trust and rush to pull their cash, what stops a panic?',
        text:'In early 1933, cascading bank runs and gold withdrawals forced state after state to shut its banks. On March 6, 1933, President Roosevelt paused all U.S. banking transactions for a week.',
        sourceIds:['bank-holiday','bank-report']
      },
      'back-then':{
        headline:'A 1-week pause, emergency law, a radio talk, and staged reopening.',
        text:'Congress passed the Emergency Banking Act on March 9, Roosevelt explained the plan in his first Fireside Chat on March 12, and audited banks began reopening in stages on March 13, 1933.',
        sourceIds:['bank-act','bank-chat','bank-report']
      },
      debate:{
        headline:'Public reassurance vs. emergency cash vs. permanent deposit insurance.',
        text:'Contemporaries debated whether confidence came from Roosevelt’s radio speech, from separating solvent Class A banks from weak ones, or from the Federal Reserve’s new power to supply unlimited emergency currency.',
        sourceIds:['bank-act','bank-chat','bank-silber','bank-wigmore']
      },
      'what-happened':{
        headline:'$1.2 billion returned to reopened banks—but ~4,200 banks stayed closed.',
        text:'Depositors returned over $1.2 billion within two weeks. Yet the recovery was neither painless nor caused by FDIC insurance: ~4,200 unlicensed banks holding ~$4 billion stayed closed in April 1933, and FDIC insurance did not start until January 1, 1934.',
        sourceIds:['bank-report','bank-fdic','bank-silber']
      },
      'different-today':{
        headline:'Why this lesson has limits: 1933 paper cash vs. 24/7 digital bank runs.',
        text:'A week-long nationwide physical bank closure worked in a 1933 paper-and-gold economy, but modern digital runs move billions in seconds across uninsured accounts and cannot be paused for a week without freezing digital payments.',
        sourceIds:['bank-act','bank-report','bank-fdic']
      },
      evidence:{
        headline:'7 verified sources—including the full 1933 Emergency Banking Act PDF offline.',
        text:'Read the bundled original 1933 statute PDF (48 Stat. 1), the Fireside Chat transcript, and the Federal Reserve Bulletin, and test challenging secondary economic interpretations.',
        sourceIds:['bank-act','bank-chat','bank-holiday','bank-report','bank-fdic','bank-silber','bank-wigmore']
      }
    },
    hormuz:{
      question:{
        headline:'What happens when oil and gas tankers face a maritime chokepoint crisis?',
        text:'Roughly 20% of the world’s oil (~20.9 mb/d) and 20% of liquefied natural gas (~11.4 Bcf/d) pass through the Strait of Hormuz. Seven decades of crises show what buffers work—and where they fail.',
        sourceIds:['hormuz-eia-chokepoints','hormuz-hamilton-2011']
      },
      'back-then':{
        headline:'From the 1956 Suez crisis and 1980s Tanker War to 2023–2025 Red Sea attacks.',
        text:'History spans the 1956 Suez closure, the 1973 oil embargo, 1987–88 U.S. naval convoys (Operation Earnest Will), the 1991 Desert Storm stockpile release, the 2019 Abqaiq strike, 2023–25 Red Sea tanker rerouting, and the Feb–Jun 2026 near-closure of Hormuz.',
        sourceIds:['hormuz-hamilton-2011','hormuz-nhhc-tanker-war','hormuz-crs-abqaiq-2019','hormuz-eia-redsea','hormuz-eia-2026-closure']
      },
      debate:{
        headline:'Can market rerouting, strategic reserves, or naval escorts absorb a blockade?',
        text:'Optimists cite the 1980s Tanker War and 2023–25 Red Sea rerouting to argue markets adapt easily. Naval and energy analysts warn a full Hormuz closure traps supply inside a geographic dead-end.',
        sourceIds:['hormuz-talmadge-2008','hormuz-gholz-press-2010','hormuz-eia-chokepoints']
      },
      'what-happened':{
        headline:'Rerouting worked in the Red Sea; SPR releases calmed short panics—with strict ceilings.',
        text:'In 2023–25, Red Sea tankers detoured around Africa (+15 days). In 1991 and 2022, SPR/IEA releases calmed hoarding. But in 1987–88, naval convoys hit mines and escalated into Operation Praying Mantis and the shootdown of Flight 655.',
        sourceIds:['hormuz-nhhc-tanker-war','hormuz-doe-spr','hormuz-eia-redsea','hormuz-unctad-redsea']
      },
      'different-today':{
        headline:'Why Red Sea and SPR analogies break for a prolonged Strait of Hormuz closure.',
        text:'Unlike the Red Sea, the Persian Gulf is a cul-de-sac with zero sea detour. Overland pipelines bypass <25% of oil (~4.7 mb/d) and 0% of Qatari LNG; the U.S. SPR is capped at 4.4 mb/d (13-day lag) with zero LNG.',
        sourceIds:['hormuz-eia-chokepoints','hormuz-doe-spr','hormuz-crs-abqaiq-2019']
      },
      evidence:{
        headline:'11 verified sources: U.S. Navy, EIA, DOE, IEA, UNCTAD, CRS, peer-reviewed studies.',
        text:'Compare official chokepoint flow data, SPR drawdown ceilings, and mine-clearance studies—and test abstract-only market-adaptation claims.',
        sourceIds:['hormuz-eia-chokepoints','hormuz-eia-redsea','hormuz-unctad-redsea','hormuz-doe-spr','hormuz-iea-releases','hormuz-nhhc-tanker-war','hormuz-crs-abqaiq-2019','hormuz-talmadge-2008','hormuz-gholz-press-2010','hormuz-hamilton-2011']
      }
    },
    'israel-palestine':{
      question:{
        headline:'What arrangements have protected civilians or sustained peace—and why did others fail?',
        text:'From the 1949 Armistice Agreements to the 1979 Sinai treaty, 1993–95 Oslo Accords, 1994 Jordan treaty, and 2023–2025 Gaza pauses, records show sharply different outcomes for interstate treaties versus interim truces.',
        sourceIds:['ip-armistice-1949','ip-sinai-mfo-1979','ip-oslo-1993-1995','ip-ocha-pauses']
      },
      'back-then':{
        headline:'Eight decades of armistices, treaties, interim accords, and humanitarian pauses.',
        text:'The record covers 1949 UNTSO armistice lines, 1979 Egypt–Israel peace and MFO monitors, 1993–95 Oslo Areas A/B/C, 1994 Israel–Jordan peace, 2024 ICJ/ICC orders (ICJ Art. 41 “plausibility of rights”; ICC Art. 58 “reasonable grounds”), and the 2025 Gaza ceasefire and siege.',
        sourceIds:['ip-armistice-1949','ip-sinai-mfo-1979','ip-oslo-1993-1995','ip-jordan-1994','ip-ocha-pauses','ip-ipc-reviews']
      },
      debate:{
        headline:'Defined borders & third-party verification vs. interim confidence-building.',
        text:'Framers of the 1979 Sinai and 1994 Jordan treaties paired border recognition with joint verification. By contrast, 1949 armistice and 1993–95 Oslo negotiators expected temporary lines to build trust while deferring borders and settlements.',
        sourceIds:['ip-sinai-mfo-1979','ip-oslo-1993-1995','ip-carnegie-mediation-2026','ip-shlaim-lustick-reviews']
      },
      'what-happened':{
        headline:'Sovereign treaties with verification held; unmonitored interim accords and reversible pauses broke down.',
        text:'The 1979 Sinai MFO and 1994 Jordan treaties endured. Oslo’s 5-year interim division locked in as settlements passed 700,000. In 2025, a 42-day Gaza truce tripled food aid (>78,000 MT), but the March 2 closure led to IPC-confirmed famine by August.',
        sourceIds:['ip-sinai-mfo-1979','ip-oslo-1993-1995','ip-ocha-pauses','ip-ipc-reviews','ip-icj-advisory-2024']
      },
      'different-today':{
        headline:'Why the 1979 Sinai model cannot be copied directly without political resolution.',
        text:'The Sinai treaty separated two sovereign states across a sparsely populated buffer after 100% withdrawal. It cannot be transplanted into Gaza or the West Bank while sovereignty, borders, and >700,000 settlers remain unresolved.',
        sourceIds:['ip-sinai-mfo-1979','ip-oslo-1993-1995','ip-icj-advisory-2024']
      },
      evidence:{
        headline:'11 verified sources: 4 primary treaties, UN OCHA & IPC logs, ICJ/ICC orders, competing historians.',
        text:'Inspect the primary treaty texts, humanitarian crossing data, and court standings—and see how competing interpretations are kept distinct from established facts.',
        sourceIds:['ip-armistice-1949','ip-sinai-mfo-1979','ip-oslo-1993-1995','ip-jordan-1994','ip-ocha-pauses','ip-ipc-reviews','ip-icj-provisional-2024','ip-icj-advisory-2024','ip-icc-warrants-2024','ip-carnegie-mediation-2026','ip-shlaim-lustick-reviews']
      }
    }
  };

  function buildStoryJourney(caseObj,overrides={},integrity=true){
    if(!caseObj)throw Error('Case object required for buildStoryJourney');
    const cid=caseObj.id;
    const qlMap=caseObj.quickLookSummaries||QUICK_LOOK_SUMMARIES[cid]||{};
    const rawConcepts=caseObj.concepts||PLAIN_LANGUAGE_CONCEPTS[cid]||[];
    const concepts=rawConcepts.map(item=>{
      const st=standing({id:cid+'-concept-'+item.term,sourceIds:item.sourceIds},caseObj.sources,overrides,integrity);
      return {...item,standing:st};
    });
    const exhibitRaw=caseObj.exhibit||ARCHIVAL_EXHIBITS[cid]||null;
    const exhibit=exhibitRaw?{
      ...exhibitRaw,
      standing:standing({id:cid+'-exhibit',sourceIds:exhibitRaw.sourceIds},caseObj.sources,overrides,integrity),
      hotspots:(exhibitRaw.hotspots||[]).map(hs=>({
        ...hs,
        standing:standing({id:hs.id,sourceIds:hs.sourceIds},caseObj.sources,overrides,integrity)
      }))
    }:null;
    const sourceChallenge=caseObj.sourceChallenge||SOURCE_INVESTIGATION_CHALLENGES[cid]||null;

    // Build Quick Look (~1 minute reading budget across all 6 steps, strictly bound to case sources & standing)
    const quickSteps=STORY_STEPS.map(step=>{
      const rawStep=qlMap[step.id]||{
        headline:step.shortTitle,
        text:caseObj.summary,
        sourceIds:caseObj.sources.slice(0,2).map(s=>s.id)
      };
      // Also check if any underlying core records in this step are reopened so Quick Look never hides an active hold
      let stepItems=[];
      if(step.id==='question')stepItems=caseObj.facts.slice(0,2);
      else if(step.id==='back-then')stepItems=caseObj.timeline;
      else if(step.id==='debate')stepItems=historicalArguments(caseObj);
      else if(step.id==='what-happened')stepItems=[...(caseObj.outcomes||[]),...(caseObj.interpretations||[])];
      else if(step.id==='different-today')stepItems=caseObj.comparison||[];
      else if(step.id==='evidence')stepItems=items(caseObj);

      const syntheticItem={id:`${cid}-quick-${step.id}`,sourceIds:rawStep.sourceIds};
      const st=standing(syntheticItem,caseObj.sources,overrides,integrity);
      const reopenedUnderlying=stepItems
        .map(it=>({item:it,st:standing(it,caseObj.sources,overrides,integrity)}))
        .filter(x=>x.st.state!=='AVAILABLE');
      // Repair (F2): a Quick Look step whose underlying sole-source claim was
      // quarantined previously displayed that claim verbatim with only a REOPEN pill
      // and a banner rendered after it. Withhold the quarantined text itself; the
      // banner (rendered before the text by the app) names the affected records.
      const hasQuarantinedUnderlying=reopenedUnderlying.some(x=>x.st.consequence==='QUARANTINED_SOLE_SOURCE');
      const textWithheld=!integrity?false:(st.consequence==='QUARANTINED_SOLE_SOURCE'||hasQuarantinedUnderlying);
      const withheldText='[Withheld — the sole supporting source for this claim was challenged in your notebook; the explanation is withheld until its evidence is reviewed.]';

      return {
        stepId:step.id,
        stepNumber:step.number,
        label:step.label,
        shortTitle:step.shortTitle,
        headline:rawStep.headline,
        text:!integrity?'[Evidence integrity check failed — explanation withheld until verified.]':(textWithheld?withheldText:rawStep.text),
        textWithheld,
        sourceIds:rawStep.sourceIds,
        standing:st,
        reopenedUnderlyingCount:reopenedUnderlying.length,
        reopenedUnderlyingIds:reopenedUnderlying.map(x=>x.item.id),
        survivingNotices:reopenedUnderlying.map(x=>({
          id:x.item.id,
          consequence:x.st.consequence,
          challengedSourceIds:x.st.challengedSourceIds,
          survivingSourceIds:x.st.survivingSourceIds,
          survivingText:x.st.survivingText
        }))
      };
    });

    const quickWordCount=quickSteps.reduce((acc,s)=>acc+String(s.headline+' '+s.text).trim().split(/\s+/).length,0);

    return {
      caseId:cid,
      title:caseObj.title,
      question:caseObj.question,
      period:caseObj.period,
      place:caseObj.place,
      theme:caseObj.theme,
      integrity,
      steps:STORY_STEPS,
      depths:DEPTH_LEVELS,
      quickLook:{
        estimatedSeconds:Math.max(45,Math.round((quickWordCount/200)*60)),
        wordCount:quickWordCount,
        steps:quickSteps,
        keyLimit:caseObj.citizenGuide?.whatsDifferent||caseObj.limits?.[0]||''
      },
      explore:{
        concepts,
        exhibit,
        sourceChallenge
      },
      inquiryStatus:caseObj.inquiryStatus||'VERIFIED_CORE',
      promotedToVerified:Boolean(caseObj.promotedToVerified||!caseObj.inquiryStatus||caseObj.inquiryStatus==='VERIFIED_CORE'||caseObj.inquiryStatus==='VERIFIED_LOCAL'),
      epistemicBreakdown:summarizeEpistemicBreakdown(caseObj,overrides,integrity)
    };
  }


  // ============================================================================
  // OpenLine Department of History v0.3 — Natural-Language Unfamiliar Subject
  // Recognition, Accessible Source Research, 3-Tier Epistemic Separation
  // (Verified Evidence / Disputed Interpretations / Unverified Material),
  // and Review + Challenge + Promotion Gate.
  // ============================================================================

  const PROVISIONAL_SUBJECT_CATALOG=[{"id":"espionage","subjectKey":"espionage","inquiryStatus":"PROVISIONAL","promotedToVerified":false,"title":"Secret Intelligence, Technical Collection & Democratic Oversight","subtitle":"WWII Signals Intelligence, Cold War Reconnaissance, the 1975–1978 Oversight Reforms, and the 1994 Ames Exposure","theme":"Intelligence & democratic oversight","place":"United Kingdom & United States","period":"1939–1994","asOfDate":"2026-11-09","question":"What does the history of espionage show about what technical intelligence can and cannot prove, why covert operations fail, and how democracies constrain secret power?","summary":"From Bletchley Park's Ultra decrypts and the Venona cable breaks to U-2/CORONA satellite reconnaissance and the 1975–1976 Senate Church Committee investigation, historical records show that technical intelligence can measure adversary capabilities when combined with human corroboration—but fails when treated as omniscient or shielded from legislative and judicial oversight. The 1994 exposure of CIA officer Aldrich Ames — arrested 21 February 1994 after spying since 1985, with at least ten compromised sources executed — shows what happens when a human spy ring is exposed: detection came only after the damage, and accountability arrived through prosecution and inspector-general review.","hook":"Bletchley Park, Washington & Space (1939–1994): Explore how codebreakers and spy satellites reshaped conflict, why secret agencies overreached at home, how oversight laws were forged — and what happened when a human spy ring was exposed.","questionBoundary":"Covers documented WWII Allied signals intelligence (Ultra), Cold War counterintelligence and overhead reconnaissance (Venona, U-2, CORONA), and the 1975–1978 U.S. congressional oversight reforms (Church Committee, FISA). Does not adjudicate still-classified modern cyber operations.","limits":["Declassified archival records remain selective: intelligence agencies release operational successes (such as Ultra and CORONA) earlier and more completely than ongoing collection methods or foreign liaison archives.","Technical interception (signals intelligence and satellite imagery) measures physical order-of-battle and transmitted messages, but cannot reliably establish an adversary's unspoken political intentions or prevent surprise when radio silence and deception are used.","Cold War oversight mechanisms (the 1976–1977 congressional intelligence committees and 1978 Foreign Intelligence Surveillance Act) were designed around telegraph, telephone, and targeted foreign collection—not global packet-switched digital networks or commercial data brokerage."],"questionProfile":{"whyRelevantSummary":"When modern debates arise over cyber espionage, mass surveillance, or intelligence failures, the 1939–1978 archival record tests two recurring claims: (1) whether technical collection can replace human judgment and prevent surprise, and (2) whether secret intelligence agencies can self-regulate without statutory external oversight.","knownCoverageGaps":["Soviet, Chinese, and non-Western intelligence archives remain largely closed or available only through partial defector and declassified Western counterintelligence files.","Post-2001 bulk digital metadata and commercial AI surveillance architectures operate at a scale distinct from 1945–1975 telegraph/telephone interception (Operation SHAMROCK)."]},"citizenGuide":{"whyComparable":"Both Cold War technical collection (Ultra, Venona, CORONA) and modern digital intelligence confront the gap between collecting massive volumes of secret data and accurately interpreting an adversary's intentions without violating domestic civil liberties.","whatHappenedBefore":"During WWII and the early Cold War, Allied and U.S. agencies built vast cryptologic and overhead reconnaissance systems under wartime executive secrecy, with minimal statutory boundaries or congressional review.","whatsDifferent":"Today's intelligence environment involves encrypted global civilian communications, commercial satellite imagery, and statutory FISA/congressional oversight frameworks that did not exist before 1976–1978.","whatWorked":"Bletchley Park's Ultra decrypts (when fused with aerial reconnaissance and operational deception) and NRO's CORONA satellite photography empirically falsified inflated 'missile gap' estimates and stabilized nuclear deterrence.","whatFailed":"Unchecked executive secrecy enabled thirty years of warrantless telegram interception (Operation SHAMROCK) and domestic political disruption (COINTELPRO), while overreliance on technical collection repeatedly failed to prevent strategic surprise when adversaries maintained communications security.","howWeKnow":"Declassified NSA Ultra and Venona monographs, NRO CORONA histories, the 1976 U.S. Senate Church Committee Final Report (Books I–III), CIA Studies in Intelligence histories, and competing intelligence historians."},"sources":[{"id":"esp-ultra-nsa","title":"The Historical Impact of Revealing The Ultra Secret & Allied Cryptologic History","author":"National Security Agency (NSA) Center for Cryptologic History","url":"https://www.nsa.gov/portals/75/documents/news-features/declassified-documents/cryptologic-spectrum/ultra_secret.pdf","type":"primary","coverage":"FULL_TEXT","locator":"NSA Declassified Cryptologic Spectrum monograph, pp. 1–14 (Bletchley Park Enigma/Tunny decryption, operational integration, and post-1974 historiographical revision)","accessed":"2026-11-09","rights":"U.S. Government Public Domain / Declassified Archival Release","notes":"Establishes how Allied cryptanalysis at Bletchley Park (Ultra) provided high-level German operational communications, while emphasizing that Ultra required strict operational security, corroboration with reconnaissance, and Allied military capacity to translate intelligence into victory.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"esp-ultra-nsa","title":"The Historical Impact of Revealing The Ultra Secret & Allied Cryptologic History","author":"National Security Agency (NSA) Center for Cryptologic History","url":"https://www.nsa.gov/portals/75/documents/news-features/declassified-documents/cryptologic-spectrum/ultra_secret.pdf","type":"primary","locator":"NSA Declassified Cryptologic Spectrum monograph, pp. 1–14 (Bletchley Park Enigma/Tunny decryption, operational integration, and post-1974 historiographical revision)","accessed":"2026-11-09","rights":"U.S. Government Public Domain / Declassified Archival Release","notes":"Establishes how Allied cryptanalysis at Bletchley Park (Ultra) provided high-level German operational communications, while emphasizing that Ultra required strict operational security, corroboration with reconnaissance, and Allied military capacity to translate intelligence into victory.","preservation":"CURATOR_CARD_ONLY"},"sha256":"2529bc2e138c002503e2497e512e9631943c14ad4ab625fb19ee534258d25b0c"},{"id":"esp-venona-nsa","title":"Venona: Soviet Espionage and the American Response, 1939–1957 (Declassified Cable Decrypts)","author":"National Security Agency (NSA) & Central Intelligence Agency (CIA) FOIA Release","url":"https://www.nsa.gov/Helpful-Links/NSA-FOIA/Declassification-Transparency-Initiatives/Historical-Releases/Venona/","type":"primary","coverage":"PRIMARY_EXCERPT","locator":"NSA Historical Releases — Venona Project declassified Soviet diplomatic and KGB/GRU cable translations (1943–1980, publicly released July 1995)","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Documents how U.S. Army Signal Intelligence Service cryptanalysts exploited Soviet duplicate one-time pad pages manufactured in 1942 to decrypt portions of 1940–1948 Soviet intelligence traffic, while showing why keeping Venona secret prevented its use in open court prosecutions.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"esp-venona-nsa","title":"Venona: Soviet Espionage and the American Response, 1939–1957 (Declassified Cable Decrypts)","author":"National Security Agency (NSA) & Central Intelligence Agency (CIA) FOIA Release","url":"https://www.nsa.gov/Helpful-Links/NSA-FOIA/Declassification-Transparency-Initiatives/Historical-Releases/Venona/","type":"primary","locator":"NSA Historical Releases — Venona Project declassified Soviet diplomatic and KGB/GRU cable translations (1943–1980, publicly released July 1995)","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Documents how U.S. Army Signal Intelligence Service cryptanalysts exploited Soviet duplicate one-time pad pages manufactured in 1942 to decrypt portions of 1940–1948 Soviet intelligence traffic, while showing why keeping Venona secret prevented its use in open court prosecutions.","preservation":"CURATOR_CARD_ONLY"},"sha256":"5b86a9f1dcf3f0dcee5c68db63e89ee979f8e91db9195aeb4810c188725e6147"},{"id":"esp-u2-corona-nro","title":"The CORONA Story: America's First Satellite Reconnaissance Program & The Intelligence Revolution","author":"National Reconnaissance Office (NRO) Center for the Study of National Reconnaissance","url":"https://www.nro.gov/Portals/135/documents/history/csnr/corona/Intel_Revolution_Web.pdf","type":"institution","coverage":"FULL_TEXT","locator":"NRO CSNR Historical Monograph (declassified CORONA film-return satellite operations 1960–1972, pp. 3–42) & GWU National Security Archive EBB 434","accessed":"2026-11-09","rights":"U.S. Government Public Domain (NRO Declassified History)","notes":"Establishes how the May 1, 1960 shootdown of Francis Gary Powers's U-2 aircraft accelerated the transition to the CORONA photoreconnaissance satellite (first successful film recovery Discoverer XIV, August 18, 1960), which photographed Soviet ICBM sites and disproved exaggerated 'missile gap' fears.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"esp-u2-corona-nro","title":"The CORONA Story: America's First Satellite Reconnaissance Program & The Intelligence Revolution","author":"National Reconnaissance Office (NRO) Center for the Study of National Reconnaissance","url":"https://www.nro.gov/Portals/135/documents/history/csnr/corona/Intel_Revolution_Web.pdf","type":"institution","locator":"NRO CSNR Historical Monograph (declassified CORONA film-return satellite operations 1960–1972, pp. 3–42) & GWU National Security Archive EBB 434","accessed":"2026-11-09","rights":"U.S. Government Public Domain (NRO Declassified History)","notes":"Establishes how the May 1, 1960 shootdown of Francis Gary Powers's U-2 aircraft accelerated the transition to the CORONA photoreconnaissance satellite (first successful film recovery Discoverer XIV, August 18, 1960), which photographed Soviet ICBM sites and disproved exaggerated 'missile gap' fears.","preservation":"CURATOR_CARD_ONLY"},"sha256":"23fbcb427cd400b081a04e60de57c46708e0dc72d6b80086a6842f665aadea2a"},{"id":"esp-church-1976","title":"Intelligence Activities and the Rights of Americans — Final Report of the Select Committee to Study Governmental Operations with Respect to Intelligence Activities (Book II)","author":"U.S. Senate Select Committee on Intelligence Activities (Church Committee, 94th Congress)","url":"https://www.intelligence.senate.gov/wp-content/uploads/2024/08/sites-default-files-94755-ii.pdf","type":"primary","coverage":"FULL_TEXT","locator":"Senate Report No. 94-755, Book II (April 29, 1976), Section I (Growth of Domestic Intelligence), Section II (NSA Operation SHAMROCK & MINARET, FBI COINTELPRO, CIA CHAOS), and Section IV (Conclusions & Recommendations, pp. 289–340)","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Primary congressional investigative record establishing that under vague executive authorities, intelligence agencies expanded foreign counterintelligence into domestic surveillance of law-abiding citizens, leading directly to permanent Senate/House intelligence committees (1976–1977) and the Foreign Intelligence Surveillance Act (FISA, 1978).","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"esp-church-1976","title":"Intelligence Activities and the Rights of Americans — Final Report of the Select Committee to Study Governmental Operations with Respect to Intelligence Activities (Book II)","author":"U.S. Senate Select Committee on Intelligence Activities (Church Committee, 94th Congress)","url":"https://www.intelligence.senate.gov/wp-content/uploads/2024/08/sites-default-files-94755-ii.pdf","type":"primary","locator":"Senate Report No. 94-755, Book II (April 29, 1976), Section I (Growth of Domestic Intelligence), Section II (NSA Operation SHAMROCK & MINARET, FBI COINTELPRO, CIA CHAOS), and Section IV (Conclusions & Recommendations, pp. 289–340)","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Primary congressional investigative record establishing that under vague executive authorities, intelligence agencies expanded foreign counterintelligence into domestic surveillance of law-abiding citizens, leading directly to permanent Senate/House intelligence committees (1976–1977) and the Foreign Intelligence Surveillance Act (FISA, 1978).","preservation":"CURATOR_CARD_ONLY"},"sha256":"3b3291bf79a551fab68a95e9a91de2d2ea8d8a2fe61e73e7282d91752f88e76d"},{"id":"esp-cia-shamrock-1999","title":"Recollections of the Church Committee's Investigation of NSA","author":"L. Britt Snider (CIA Center for the Study of Intelligence, Studies in Intelligence Vol. 43, No. 3)","url":"https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-43-no-3/recollections-of-the-church-committees-investigation-of-nsa/","type":"institution","coverage":"FULL_TEXT","locator":"CIA Studies in Intelligence (Fall/Winter 1999–2000), narrative of the 1975–1976 investigation of NSA Project SHAMROCK (1945–1975 international telegram collection) and Project MINARET watchlists","accessed":"2026-11-09","rights":"U.S. Government Public Domain (CIA CSI)","notes":"Institutional insider account by Church Committee counsel L. Britt Snider documenting how NSA obtained copies of international telegrams from three telegraph companies for thirty years without judicial warrants or statutory authority until congressional investigators exposed the practice in 1975.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"esp-cia-shamrock-1999","title":"Recollections of the Church Committee's Investigation of NSA","author":"L. Britt Snider (CIA Center for the Study of Intelligence, Studies in Intelligence Vol. 43, No. 3)","url":"https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-43-no-3/recollections-of-the-church-committees-investigation-of-nsa/","type":"institution","locator":"CIA Studies in Intelligence (Fall/Winter 1999–2000), narrative of the 1975–1976 investigation of NSA Project SHAMROCK (1945–1975 international telegram collection) and Project MINARET watchlists","accessed":"2026-11-09","rights":"U.S. Government Public Domain (CIA CSI)","notes":"Institutional insider account by Church Committee counsel L. Britt Snider documenting how NSA obtained copies of international telegrams from three telegraph companies for thirty years without judicial warrants or statutory authority until congressional investigators exposed the practice in 1975.","preservation":"CURATOR_CARD_ONLY"},"sha256":"59309ba15c89ff2e62aab4d594f10651f4f4091443b53912079811451188467f"},{"id":"esp-andrew-jeffreys-historiography","title":"Secret Intelligence: A Reader (Competing Historiographical Schools on Intelligence Efficacy, Politicization & Accountability)","author":"Christopher Andrew, Richard J. Aldrich, and Wesley K. Wark (eds., Routledge / Yale Intelligence Historiography Synthesis)","url":"https://api.pageplace.de/preview/DT0400.9780429650000_A37991097/preview-9780429650000_A37991097.pdf","type":"scholarship","coverage":"SYNOPSIS_ONLY","locator":"Published preview & table of contents synthesis (Introduction, Part 1 'The Intelligence Cycle & Surprise Attack', Part 3 'Ethics, Accountability and Control'); full copyrighted anthology not bundled","accessed":"2026-11-09","rights":"Copyrighted academic anthology — synopsis and preview metadata only (no verbatim full-text quotations permitted)","notes":"SYNOPSIS_ONLY secondary scholarly source summarizing competing schools in intelligence history: (1) Christopher Andrew's operational-integration school emphasizing how signals intelligence altered major battles, vs. (2) Richard Aldrich, Wesley Wark, and Rhodri Jeffreys-Jones's critiques of intelligence politicization, collection overload, and covert-action blowback.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"esp-andrew-jeffreys-historiography","title":"Secret Intelligence: A Reader (Competing Historiographical Schools on Intelligence Efficacy, Politicization & Accountability)","author":"Christopher Andrew, Richard J. Aldrich, and Wesley K. Wark (eds., Routledge / Yale Intelligence Historiography Synthesis)","url":"https://api.pageplace.de/preview/DT0400.9780429650000_A37991097/preview-9780429650000_A37991097.pdf","type":"scholarship","locator":"Published preview & table of contents synthesis (Introduction, Part 1 'The Intelligence Cycle & Surprise Attack', Part 3 'Ethics, Accountability and Control'); full copyrighted anthology not bundled","accessed":"2026-11-09","rights":"Copyrighted academic anthology — synopsis and preview metadata only (no verbatim full-text quotations permitted)","notes":"SYNOPSIS_ONLY secondary scholarly source summarizing competing schools in intelligence history: (1) Christopher Andrew's operational-integration school emphasizing how signals intelligence altered major battles, vs. (2) Richard Aldrich, Wesley Wark, and Rhodri Jeffreys-Jones's critiques of intelligence politicization, collection overload, and covert-action blowback.","preservation":"CURATOR_CARD_ONLY"},"sha256":"ab1fc02ac60644165b3f463317f3b732a1930023ced589c1be5177f149968502"},{"id":"esp-ames-fbi-1994","title":"Aldrich Ames — FBI Famous Cases","author":"Federal Bureau of Investigation (FBI)","url":"https://www.fbi.gov/history/cases-and-criminals/aldrich-ames","type":"institution","coverage":"FULL_TEXT","locator":"FBI Famous Cases: Aldrich Ames — arrest 21 February 1994; 31-year CIA veteran spying since 1985; guilty plea and life sentence without parole 28 April 1994","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Establishes the exposure of a human spy ring: a 31-year CIA counterintelligence officer spying for the Soviet Union and Russia since 1985 was arrested 21 February 1994 after a 10-month FBI investigation, pleaded guilty 28 April 1994, and was sentenced to life without parole; sources he compromised were executed by Soviet authorities.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"esp-ames-fbi-1994","title":"Aldrich Ames — FBI Famous Cases","author":"Federal Bureau of Investigation (FBI)","url":"https://www.fbi.gov/history/cases-and-criminals/aldrich-ames","type":"institution","locator":"FBI Famous Cases: Aldrich Ames — arrest 21 February 1994; 31-year CIA veteran spying since 1985; guilty plea and life sentence without parole 28 April 1994","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Establishes the exposure of a human spy ring: a 31-year CIA counterintelligence officer spying for the Soviet Union and Russia since 1985 was arrested 21 February 1994 after a 10-month FBI investigation, pleaded guilty 28 April 1994, and was sentenced to life without parole; sources he compromised were executed by Soviet authorities.","preservation":"CURATOR_CARD_ONLY"},"sha256":"b96c9a3ab044317191595da7ec76d02f26270b406703d9cf93245492e0bb9b8b"},{"id":"esp-ames-oig-1997","title":"A Review of the FBI’s Performance in Uncovering the Espionage Activities of Aldrich Hazen Ames — Executive Summary","author":"U.S. Department of Justice, Office of the Inspector General","url":"https://oig.justice.gov/sites/default/files/legacy/special/9704.htm","type":"institution","coverage":"FULL_TEXT","locator":"DOJ OIG Special Report, April 1997, Executive Summary — arrest 21 February 1994; guilty plea and life sentence 28 April 1994; at least ten CIA and FBI sources executed; September 1994 CIA Inspector General report","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Independent review of the Ames investigation: confirms the February 1994 arrest, the April 1994 guilty plea and life sentence, and that information Ames provided led to the compromise and execution of at least ten CIA and FBI intelligence sources; records the September 1994 CIA Inspector General report on counterintelligence deficiencies.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"esp-ames-oig-1997","title":"A Review of the FBI’s Performance in Uncovering the Espionage Activities of Aldrich Hazen Ames — Executive Summary","author":"U.S. Department of Justice, Office of the Inspector General","url":"https://oig.justice.gov/sites/default/files/legacy/special/9704.htm","type":"institution","locator":"DOJ OIG Special Report, April 1997, Executive Summary — arrest 21 February 1994; guilty plea and life sentence 28 April 1994; at least ten CIA and FBI sources executed; September 1994 CIA Inspector General report","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Independent review of the Ames investigation: confirms the February 1994 arrest, the April 1994 guilty plea and life sentence, and that information Ames provided led to the compromise and execution of at least ten CIA and FBI intelligence sources; records the September 1994 CIA Inspector General report on counterintelligence deficiencies.","preservation":"CURATOR_CARD_ONLY"},"sha256":"2ba6e1d6c62350fd38542aa22b9acad8368fa3f21e2486cca9ddf7a9970c45a6"}],"facts":[{"id":"espionage-facts-1","title":"Bletchley Park & Ultra (1940–1945): High-grade decryption required operational fusion and secrecy guards","text":"British and Allied codebreakers at Bletchley Park decrypted German Enigma and Lorenz (Tunny) cipher traffic under the codename Ultra. To prevent Germany from realizing its ciphers were broken, Allied commanders could not act on Ultra decrypts unless an independent reconnaissance plane or patrol was staged to provide a plausible cover story for discovering the target.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["esp-ultra-nsa"]},{"id":"espionage-facts-2","title":"The Venona Project (1943–1980): Technical success paired with legal and evidentiary trade-offs","text":"Beginning in 1943, U.S. Army signals intelligence analysts exploited a Soviet manufacturing error—the reuse of duplicate one-time pad pages during 1942—to decrypt thousands of wartime Soviet diplomatic and intelligence cables (Venona). Because U.S. authorities refused to reveal the cryptologic breakthrough in open court, Venona translations were withheld from criminal trials and remained classified until July 1995.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["esp-venona-nsa"]},{"id":"espionage-facts-3","title":"From the May 1960 U-2 Shootdown to CORONA Satellites: Empirical imagery falsified the 'Missile Gap'","text":"After Soviet air defenses shot down Francis Gary Powers's U-2 reconnaissance plane on May 1, 1960, the United States accelerated the top-secret CORONA film-return satellite program (first successful recovery on August 18, 1960). A single CORONA mission photographed more Soviet territory than all previous U-2 flights combined, proving that the USSR possessed only a handful of operational ICBMs rather than the hundreds claimed in 'missile gap' estimates.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["esp-u2-corona-nro"]},{"id":"espionage-facts-4","title":"Operation SHAMROCK & MINARET (1945–1975): Thirty years of warrantless telegram and watchlist collection","text":"The Senate Church Committee and CIA/NSA historical records established that under Project SHAMROCK (1945–1975), the National Security Agency obtained daily microfilm and magnetic-tape copies of international telegrams entering or leaving the United States from three commercial telegraph companies without judicial warrants, and under Project MINARET (1967–1973) monitored communications of ~1,650 U.S. citizens on executive watchlists.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["esp-church-1976","esp-cia-shamrock-1999"]},{"id":"espionage-facts-5","title":"The 1976–1978 Statutory Oversight Settlement: Senate Resolution 400 and FISA","text":"Following the April 1976 Church Committee Final Report, the U.S. government replaced informal executive self-policing with permanent congressional oversight committees (SSCI in 1976, HPSCI in 1977), Executive Order 11905 banning political assassination, and the Foreign Intelligence Surveillance Act of 1978 (FISA), requiring statutory court orders for domestic electronic surveillance targeting foreign powers or their agents.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["esp-church-1976"]},{"id":"espionage-facts-6","title":"Provisional Unverified Claim: Did technical interception eliminate strategic surprise during the Cold War?","text":"UNVERIFIED PROVISIONAL CLAIM: Once Allied and U.S. intelligence perfected high-grade signals decryption (Ultra and Venona) and orbital satellite reconnaissance (CORONA), technical collection alone prevented strategic surprise throughout the Cold War without needing human intelligence or independent verification.","evidenceStatus":"UNVERIFIED_CLAIM","epistemicStatus":"UNVERIFIED_MATERIAL","reviewStatus":"PENDING_REVIEW","verificationPrompt":"This claim reflects a popular technological-omniscience myth. Check NSA Ultra/Venona and NRO CORONA records (`esp-ultra-nsa`, `esp-u2-corona-nro`) before promoting: technical sensors counted physical missiles and read encrypted radio traffic, but failed whenever adversaries used radio silence, courier networks, or political deception.","verifiedCorrection":{"correctedTitle":"Capabilities vs. Intentions Limit: Technical collection could not prevent surprise under radio silence or political deception","correctedText":"Verified against NSA and NRO archival records (`esp-ultra-nsa`, `esp-u2-corona-nro`): While Ultra and CORONA provided decisive data on physical order-of-battle and strategic nuclear forces, technical collection could not prevent operational surprise when adversaries maintained strict radio silence (such as the December 1944 Ardennes offensive) or read unspoken political intentions.","correctedSourceIds":["esp-ultra-nsa","esp-u2-corona-nro"]},"sourceIds":["esp-ultra-nsa","esp-u2-corona-nro"]},{"id":"espionage-facts-7","title":"Aldrich Ames (1985–1994): Exposure of a human spy ring — arrest, plea, and executed sources","text":"Aldrich Ames, a 31-year CIA counterintelligence officer, spied for the Soviet Union and Russia from 1985 until FBI agents arrested him in Arlington, Virginia on 21 February 1994. He pleaded guilty on 28 April 1994 and was sentenced to life imprisonment without the possibility of parole. Information he provided led to the compromise and execution of at least ten CIA and FBI intelligence sources.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["esp-ames-fbi-1994","esp-ames-oig-1997"]}],"timeline":[{"id":"espionage-timeline-1","date":"1940–1945","title":"Bletchley Park decrypts German Enigma and Lorenz traffic (Ultra)","text":"Allied cryptanalysts break high-level German military and naval communications, aiding the Battle of the Atlantic and Normandy campaigns while enforcing strict cover-story rules to hide the decrypts.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-ultra-nsa"]},{"id":"espionage-timeline-2","date":"1943–1948","title":"U.S. Army Signal Intelligence Service exploits duplicate Soviet one-time pads (Venona)","text":"Cryptanalysts discover that Soviet cipher clerks reused pages of one-time pads produced in 1942, allowing gradual decryption of wartime KGB and GRU espionage traffic in North America.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-venona-nsa"]},{"id":"espionage-timeline-3","date":"1945–1975","title":"NSA operates Project SHAMROCK with commercial telegraph companies","text":"Peacetime intelligence officials persuade Western Union, RCA Global, and ITT World Communications to turn over copies of international telegrams without statutory authorization or judicial warrants.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-church-1976","esp-cia-shamrock-1999"]},{"id":"espionage-timeline-4","date":"1960-05-01 to 1960-08-18","title":"U-2 shootdown over Sverdlovsk and first CORONA satellite film recovery","text":"After Soviet surface-to-air missiles down Francis Gary Powers's U-2 aircraft on May 1, 1960, Discoverer XIV (CORONA) returns the first orbital reconnaissance film capsule on August 18, 1960, dispelling 'missile gap' claims.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-u2-corona-nro"]},{"id":"espionage-timeline-5","date":"1975-01-27 to 1976-04-29","title":"Senate Church Committee investigates CIA, NSA, and FBI abuses","text":"Chaired by Senator Frank Church, the bipartisan Senate Select Committee holds public and closed hearings on COINTELPRO, CHAOS, SHAMROCK, and assassination plots, publishing its multi-volume Final Report on April 29, 1976.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-church-1976","esp-cia-shamrock-1999"]},{"id":"espionage-timeline-6","date":"1976–1978","title":"Creation of permanent Congressional Intelligence Committees and enactment of FISA","text":"The Senate establishes SSCI (1976), the House establishes HPSCI (1977), and Congress passes the Foreign Intelligence Surveillance Act (1978) requiring judicial warrants for domestic foreign-intelligence wiretaps.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-church-1976"]},{"id":"espionage-timeline-7","date":"21 February 1994","title":"FBI arrests CIA officer Aldrich Ames; the human sources he betrayed are already dead","text":"After a 10-month FBI investigation opened in May 1993, agents arrest Ames before a scheduled Moscow trip. He had spied since 1985; the sources he compromised had already been arrested and executed by Soviet authorities. He pleads guilty on 28 April 1994 and is sentenced to life without parole.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-ames-fbi-1994","esp-ames-oig-1997"]}],"historicalArguments":[{"id":"espionage-arg-1","topic":"Signals intelligence & orbital reconnaissance vs. human espionage and operational surprise (1940–1962)","decisionWindow":"WWII Bletchley Park operations & 1960–1962 Cold War strategic nuclear assessments","contemporaryActor":"Allied SIGINT/NRO technical directors vs. traditional human-intelligence (HUMINT) and field commanders","contemporaryArgument":"Proponents of technical intelligence argued that breaking machine ciphers (Ultra) and photographing territory from orbit (CORONA) provided objective, tamper-resistant evidence of adversary strength that human spies behind Iron Curtain borders could rarely match (`esp-ultra-nsa`, `esp-u2-corona-nro`). Critics warned that over-reliance on intercepted signals and photographs blinded analysts whenever adversaries kept orders off the radio or concealed political intentions (`esp-andrew-jeffreys-historiography`).","policymakerExpectation":"Wartime and Cold War leaders expected high-grade technical collection to provide reliable strategic warning while avoiding the diplomatic and human losses of captured agents or downed reconnaissance aircraft.","expectationVerdict":"SUPPORTED_WITH_LIMITS","subsequentEvidence":"CORONA imagery decisively disproved inflated estimates of Soviet ICBM deployments in 1960–1961 (`esp-u2-corona-nro`), and Ultra shortened WWII (`esp-ultra-nsa`). However, whenever adversaries enforced radio silence (such as Germany before the December 1944 Battle of the Bulge) or when Soviet one-time pads were used only once after 1948 (`esp-venona-nsa`), technical collection went dark.","laterHistoriography":"Declassified NSA/NRO histories (`esp-ultra-nsa`, `esp-u2-corona-nro`) and intelligence scholars (`esp-andrew-jeffreys-historiography`) conclude that technical collection excels at counting hardware and monitoring routine traffic, but cannot substitute for multi-source corroboration and unpoliticized assessment.","differenceThatLimits":"Modern end-to-end encryption and ubiquitous commercial satellite imagery invert the Cold War scarcity problem: today's bottleneck is rarely raw sensor resolution, but distinguishing authentic signals from disinformation and overload.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["esp-ultra-nsa","esp-venona-nsa","esp-u2-corona-nro","esp-andrew-jeffreys-historiography"],"survivingTextByWithdrawnSource":{"esp-andrew-jeffreys-historiography":"Surviving primary/institutional basis (`esp-ultra-nsa`, `esp-venona-nsa`, `esp-u2-corona-nro`): With the secondary anthology synopsis (`esp-andrew-jeffreys-historiography`) withdrawn, declassified NSA and NRO records independently establish that CORONA disproved the missile gap and Ultra aided WWII operations, while Venona decrypts ceased once Soviet operators stopped reusing one-time pad pages."}},{"id":"espionage-arg-2","topic":"Secrecy of cryptologic sources vs. open criminal prosecution in counterintelligence (1946–1957)","decisionWindow":"Post-WWII Venona counterintelligence investigations (1946–1953)","contemporaryActor":"U.S. Army Signal Security Agency / NSA & FBI leadership vs. Department of Justice prosecutors and defense counsel","contemporaryArgument":"Intelligence chiefs argued that introducing decrypted Venona cables as evidence in federal court would immediately alert Moscow that its 1940s diplomatic and KGB cipher systems had been broken (`esp-venona-nsa`). Legal critics and civil libertarians argued that withholding the underlying cryptologic evidence forced prosecutors to rely on contested human witnesses or allow suspected agents to avoid trial (`esp-venona-nsa`, `esp-church-1976`).","policymakerExpectation":"Intelligence officials expected that keeping Venona compartmentalized would preserve long-term cryptologic access against Soviet traffic while giving the FBI leads to neutralize espionage networks quietly.","expectationVerdict":"MIXED_AND_CONFOUNDED","subsequentEvidence":"Venona stayed officially secret until 1995 (`esp-venona-nsa`), helping identify major wartime espionage rings, but Soviet mole Kim Philby and cipher clerk William Weisband had already warned Moscow of the cryptologic vulnerability by 1948–1949—meaning the operational secret was lost to the adversary decades before the American public or courts were allowed to inspect the records.","laterHistoriography":"Archival releases after 1995 (`esp-venona-nsa`) confirmed the authenticity of the wartime Soviet cables while showing how extreme compartmentalization fueled decades of polarized public controversy because the primary evidence was hidden from independent judicial and historical scrutiny (`esp-andrew-jeffreys-historiography`).","differenceThatLimits":"Modern national-security prosecutions operate under the Classified Information Procedures Act (CIPA, 1980) and FISA (1978), which create structured in-camera judicial review mechanisms that did not exist in 1948–1953.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["esp-venona-nsa","esp-church-1976","esp-andrew-jeffreys-historiography"],"survivingTextByWithdrawnSource":{"esp-andrew-jeffreys-historiography":"Surviving primary archival basis (`esp-venona-nsa`, `esp-church-1976`): With the secondary historiography synopsis withdrawn, the declassified NSA Venona archive and Senate Church Committee report independently establish that Venona cables were withheld from open court and remained classified until 1995 despite Soviet awareness of the compromise by the late 1940s."}},{"id":"espionage-arg-3","topic":"Inherent executive intelligence authority vs. statutory congressional & judicial oversight (1975–1978)","decisionWindow":"1975–1976 Senate Church Committee hearings and 1978 FISA enactment","contemporaryActor":"Executive-branch intelligence officials vs. Senator Frank Church and bipartisan Senate Select Committee reformers","contemporaryArgument":"Defenders of traditional executive secrecy argued that public congressional investigations and warrant requirements would cripple intelligence speed, expose sensitive collection partnerships (such as telegraph company cooperation in SHAMROCK), and deter foreign allies (`esp-cia-shamrock-1999`). The Church Committee argued that thirty years of unchecked executive secrecy had allowed foreign intelligence tools to be turned inward against American citizens in violation of the Fourth Amendment (`esp-church-1976`).","policymakerExpectation":"Church Committee reformers expected that permanent congressional intelligence committees (SSCI/HPSCI) and a specialized Foreign Intelligence Surveillance Court (FISA) would keep intelligence agencies within statutory boundaries without dismantling foreign collection.","expectationVerdict":"SUPPORTED_WITH_LIMITS","subsequentEvidence":"Operation SHAMROCK, Project MINARET, and FBI COINTELPRO were terminated in 1975 (`esp-church-1976`, `esp-cia-shamrock-1999`), and FISA (1978) established a durable statutory warrant framework for domestic foreign-intelligence collection—though later technological shifts to global fiber-optic cables after 2001 reopened disputes over the scope of FISA warrants.","laterHistoriography":"Both former committee counsel (`esp-cia-shamrock-1999`) and academic intelligence historians (`esp-andrew-jeffreys-historiography`) regard the 1975–1978 reforms as the foundational constitutional settlement for U.S. intelligence, while noting that closed-door committee oversight still faces information asymmetries whenever agencies classify legal interpretations.","differenceThatLimits":"The 1978 FISA statute distinguished cleanly between domestic wire communication and foreign radio/satellite interception—a geographic boundary that blurred once routine domestic and international traffic merged onto global fiber-optic internet backbones.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["esp-church-1976","esp-cia-shamrock-1999","esp-andrew-jeffreys-historiography"],"survivingTextByWithdrawnSource":{"esp-andrew-jeffreys-historiography":"Surviving primary/institutional basis (`esp-church-1976`, `esp-cia-shamrock-1999`): With the secondary historiography synopsis withdrawn, the 1976 Senate Church Committee Report and CIA CSI historical record independently document the termination of SHAMROCK/MINARET and the creation of permanent congressional oversight and FISA."}}],"outcomes":[{"id":"espionage-outcomes-1","text":"Allied decryption of Enigma and Lorenz communications (Ultra) and Cold War satellite reconnaissance (CORONA) provided verified empirical data on adversary capabilities—shortening WWII campaigns and disproving inflated 1960 Soviet ICBM 'missile gap' claims.","causalStatus":"CONFOUNDED_SEQUENCE","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["Allied industrial, naval, and air superiority required to act on Ultra decrypts","Simultaneous human intelligence, aerial photography, and radar advances"],"counterfactualGap":"Cannot isolate the exact number of months Ultra shortened WWII from concurrent Allied material superiority and Soviet Eastern Front offensives.","sourceIds":["esp-ultra-nsa","esp-u2-corona-nro"]},{"id":"espionage-outcomes-2","text":"The 1975–1976 Church Committee investigation terminated NSA's 30-year warrantless telegram collection (Project SHAMROCK), ended NSA/CIA/FBI domestic political watchlists (MINARET, CHAOS, COINTELPRO), and produced the permanent congressional oversight (SSCI/HPSCI) and 1978 FISA judicial warrant architecture.","causalStatus":"DOCUMENTED_OUTCOME","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["Post-Watergate congressional reform coalition and investigative journalism disclosures (1974–1975)","Technological transition from paper/magnetic-tape telegrams to international telephone and satellite links"],"counterfactualGap":"Statutory oversight ended unreviewed peacetime domestic telegram copying, but did not prevent future disputes over executive surveillance authorities after 2001.","sourceIds":["esp-church-1976","esp-cia-shamrock-1999"]},{"id":"espionage-outcomes-3","text":"Keeping the Venona Soviet cable decrypts classified for fifty years (until 1995) protected cryptologic methods in theory, but prevented the government from presenting primary decrypts in 1950s courts even after Soviet moles had already alerted Moscow.","causalStatus":"DOCUMENTED_OUTCOME","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["Early penetration of Allied counterintelligence by William Weisband and Kim Philby (1948–1949)","Cold War domestic political polarization over loyalty Boards and congressional hearings"],"counterfactualGap":"Cannot prove how 1950s judicial outcomes or public debates would have differed had redacted Venona decrypts been disclosed after Soviet cipher changes in 1948.","sourceIds":["esp-venona-nsa"]},{"id":"espionage-outcomes-4","text":"Exposure of the Ames ring ended a nine-year compromise of CIA and FBI human sources, but only after at least ten of those sources had been executed. The September 1994 CIA Inspector General report detailed deficiencies in CIA counterintelligence and personnel management, and the Justice Department Inspector General’s 1997 review examined the FBI’s performance in uncovering the espionage.","causalStatus":"DOCUMENTED_OUTCOME","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["Ames operated undetected for nine years, so exposure came after the damage rather than preventing it","Soviet counterintelligence had already acted on the compromised identities before Ames was identified"],"counterfactualGap":"Cannot establish how many of the executed sources might have survived had the investigation identified Ames earlier; the damage assessments record what was lost, not what earlier detection would have saved.","sourceIds":["esp-ames-fbi-1994","esp-ames-oig-1997"]}],"counterexamples":[{"id":"espionage-counterexample-1","title":"Communications Silence & Cryptologic Recovery (1944 Ardennes & Post-1948 Soviet One-Time Pads)","text":"When German forces marshaled for the December 1944 Ardennes offensive under strict radio silence using landlines, Allied reliance on Ultra decrypts contributed to operational surprise; similarly, once Soviet cipher clerks stopped reusing one-time pad pages after 1948, Venona cryptanalysis could no longer read new Soviet traffic.","failureCondition":"Technical signals intelligence fails when an adversary enforces strict emissions control (radio silence) or properly implements mathematically unbreakable one-time pad cryptography.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-ultra-nsa","esp-venona-nsa"]},{"id":"espionage-counterexample-2","title":"Mission Creep of Wartime Secrecy Into Domestic Surveillance (Operation SHAMROCK, 1945–1975)","text":"Originally begun during WWII censorship, NSA's arrangement to receive international telegrams from commercial carriers continued secretly for thirty years of peace without presidential directive, congressional statute, or judicial warrant, growing to 150,000 messages analyzed per month before the Church Committee exposed it.","failureCondition":"Informal internal agency self-restraint fails when emergency collection programs are kept wholly secret from legislative and judicial review after a crisis ends.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-church-1976","esp-cia-shamrock-1999"]}],"interpretations":[{"id":"espionage-interp-1","title":"Operational Force-Multiplier & Strategic Stabilization School (NSA/NRO Historiography & Christopher Andrew)","causalEmphasis":"Operational integration of SIGINT and overhead reconnaissance","text":"Argues that modern signals intelligence (Ultra) and satellite reconnaissance (CORONA) fundamentally transformed statecraft—acting as a decisive force multiplier in WWII and preventing miscalculated war during the Cold War by replacing worst-case 'missile gap' fears with empirical photography.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["esp-ultra-nsa","esp-u2-corona-nro","esp-andrew-jeffreys-historiography"],"survivingTextByWithdrawnSource":{"esp-andrew-jeffreys-historiography":"Surviving institutional basis (`esp-ultra-nsa`, `esp-u2-corona-nro`): Declassified NSA and NRO historical monographs establish that Ultra decrypts and CORONA satellite photography provided empirical data on adversary forces and disproved inflated missile-gap projections."}},{"id":"espionage-interp-2","title":"Cognitive Bottleneck & Politicization School (Aldrich, Wark & Jeffreys-Jones)","causalEmphasis":"Analytical bias, politicization, and collection-vs-comprehension gaps","text":"Emphasizes that intelligence failures rarely stem from a lack of raw secret collection; instead, failures occur when leaders politicize assessments to fit preconceptions, when excessive secrecy prevents cross-agency corroboration, or when technical collection is mistaken for insight into political motives.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["esp-venona-nsa","esp-andrew-jeffreys-historiography"],"survivingTextByWithdrawnSource":{"esp-andrew-jeffreys-historiography":"Surviving archival basis (`esp-venona-nsa`): Declassified Venona records demonstrate how extreme compartmentalization prevented intelligence findings from being shared across government or tested in court."}},{"id":"espionage-interp-3","title":"Constitutional Accountability & Civil-Liberties School (Church Committee Framework)","causalEmphasis":"Statutory oversight, judicial warrants, and prevention of domestic mission creep","text":"Concludes from the 1945–1975 archival record (SHAMROCK, MINARET, COINTELPRO) that secret intelligence agencies inevitably expand surveillance toward domestic political dissent unless constrained by explicit statutory charters, adversarial judicial review (FISA), and permanent legislative subpoenas.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["esp-church-1976","esp-cia-shamrock-1999"]}],"comparison":[{"id":"espionage-comp-1","dimension":"Technical collection vs. adversary intentions","timeframe":"Days (tactical decrypts) vs. Years (cryptanalytic & satellite development)","historical":"Ultra decrypts and CORONA satellites measured German and Soviet troop deployments and missile launchers, but could not detect operations conducted under radio silence or unspoken political decisions.","present":"Evaluate whether modern cyber, SIGINT, or AI-assisted surveillance measures physical/digital activity rather than political intent, and how deception or encrypted offline planning can still produce surprise.","limit":"Historical cipher breaks relied on mechanical or procedural errors (Enigma operator habits, reused 1942 Soviet one-time pads); modern open-source public-key cryptography does not fail through physical pad supply shortages.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-ultra-nsa","esp-venona-nsa","esp-u2-corona-nro"]},{"id":"espionage-comp-2","dimension":"Private telecom intermediaries & state surveillance","timeframe":"Decades (1945–1975 unreviewed operation) vs. Statutory review cycles","historical":"Under Operation SHAMROCK, three commercial telegraph companies handed international telegram traffic to NSA for thirty years based on informal executive assurances rather than statutory compulsion or judicial warrants.","present":"Ask what statutory authority, judicial warrant standard, and independent audit govern government requests or commercial data purchases from modern telecommunications and cloud providers.","limit":"In 1945–1975, no statute like FISA or permanent intelligence committee existed; modern disputes turn on statutory interpretation (e.g., FISA Section 702 and commercial data brokers) rather than a complete absence of legislation.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-church-1976","esp-cia-shamrock-1999"]},{"id":"espionage-comp-3","dimension":"Protecting sources & methods vs. public/judicial proof","timeframe":"Immediate crisis attribution vs. Decades of classification","historical":"U.S. authorities withheld Venona decrypts from 1950s courts to protect cryptologic sources and methods, even though Soviet intelligence had already learned of the compromise by 1948–1949.","present":"When governments attribute a cyberattack or foreign interference operation using classified intelligence, ask how much verifiable technical evidence can be disclosed without burning active sensors.","limit":"Unlike 1950, modern courts can review classified evidence under the Classified Information Procedures Act (CIPA, 1980), and private cybersecurity firms often publish independent forensic telemetry.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-venona-nsa","esp-church-1976"]},{"id":"espionage-comp-4","dimension":"Strategic verification & worst-case threat inflation","timeframe":"Months (satellite reconnaissance cycle)","historical":"Before CORONA's August 1960 film recovery, gaps in U-2 coverage allowed competing military services to project worst-case Soviet ICBM numbers ('the missile gap'); empirical satellite photography disproved the inflated count.","present":"Ask whether current threat estimates rest on verified multi-source observation or extrapolations from incomplete coverage.","limit":"Silo-based ICBMs in 1960 had large, fixed physical signatures visible from orbit; dual-use cyber, biological, or autonomous software capabilities cannot be counted by overhead optical photography.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["esp-u2-corona-nro"]}],"rejectedComparisons":[{"id":"espionage-rejected-1","failureCode":"SIGNALS_INTELLIGENCE_OMNISCIENCE_FALLACY","claim":"Because Bletchley Park's Ultra decrypts and CORONA satellites succeeded, advanced technical surveillance and AI signal collection can eliminate strategic surprise and replace human intelligence.","whyItFails":"Treats technical collection as omniscient. Both WWII and Cold War records show that when adversaries enforced radio silence (Ardennes 1944) or fixed procedural cipher errors (post-1948 Soviet one-time pads), technical interception went blind, and sensors cannot read unspoken political intentions.","counterEvidence":"NSA Ultra history (`esp-ultra-nsa`) and Venona release (`esp-venona-nsa`) documenting cryptologic blackouts once duplicate pad reuse ended after 1948.","sourceIds":["esp-ultra-nsa","esp-venona-nsa","esp-u2-corona-nro"]},{"id":"espionage-rejected-2","failureCode":"UNCHECKED_COVERT_AUTHORITY_FALLACY","claim":"Cold War intelligence history shows that executive agencies can conduct warrantless domestic collection during prolonged security competitions without drifting into civil-liberties abuses.","whyItFails":"Directly contradicted by the 1976 Senate Church Committee investigation, which documented how wartime telegram interception (Operation SHAMROCK) and foreign counterintelligence authorities expanded into thirty years of warrantless domestic surveillance (MINARET, CHAOS, COINTELPRO) until halted by Congress.","counterEvidence":"Senate Report 94-755 Book II (`esp-church-1976`) and CIA CSI SHAMROCK history (`esp-cia-shamrock-1999`).","sourceIds":["esp-church-1976","esp-cia-shamrock-1999"]}],"consequentialCorrection":{"targetSourceId":"esp-andrew-jeffreys-historiography","targetSourceTitle":"Secret Intelligence: A Reader (Competing Historiographical Synthesis — SYNOPSIS_ONLY)","challengeReason":"Source `esp-andrew-jeffreys-historiography` is a `SYNOPSIS_ONLY` academic preview rather than a full-text archival document. Challenging its standing tests whether all operational, cryptologic, satellite, and Church Committee oversight findings survive independently on primary NSA, NRO, CIA, and U.S. Senate records."},"challengePrompts":["Under what conditions did keeping Venona secret after 1949 protect security versus undermine public trust in judicial proceedings?","Why did internal executive oversight fail to stop Operation SHAMROCK between 1945 and 1975?","Which types of strategic threats can overhead reconnaissance verify (like ICBM silos in 1960), and which cannot be verified by imagery alone?"],"concepts":[{"term":"Signals Intelligence (SIGINT) vs. Human Intelligence (HUMINT)","plain":"SIGINT intercepts encrypted messages or electronic signals (like Bletchley Park's Ultra or NSA's Venona), whereas HUMINT relies on human informants, diplomats, or defectors.","whyItMatters":"Intercepted signals can reveal exact troop locations or cables, but if an adversary stops using radio or changes codes, SIGINT can go dark overnight.","sourceIds":["esp-ultra-nsa","esp-venona-nsa"]},{"term":"One-Time Pad (and the Venona vulnerability)","plain":"A cipher method where each message is encrypted with a random key page used only once—mathematically unbreakable if followed strictly.","whyItMatters":"In 1942, under wartime pressure, Soviet officials printed duplicate pages of one-time pads. That human manufacturing shortcut allowed U.S. codebreakers to decrypt thousands of Venona cables.","sourceIds":["esp-venona-nsa"]},{"term":"Operation SHAMROCK (1945–1975)","plain":"A secret 30-year arrangement where three U.S. telegraph companies gave the NSA copies of international telegrams entering or leaving the United States without court warrants.","whyItMatters":"Exposed by the Senate Church Committee in 1975, SHAMROCK showed how temporary wartime measures can quietly become permanent domestic surveillance without statutory oversight.","sourceIds":["esp-church-1976","esp-cia-shamrock-1999"]},{"term":"Foreign Intelligence Surveillance Act (FISA, 1978)","plain":"A landmark 1978 law passed after the Church Committee hearings requiring intelligence agencies to obtain warrants from a specialized federal court before wiretapping inside the United States.","whyItMatters":"FISA replaced unreviewed executive wiretapping with statutory rules and congressional oversight committees (SSCI and HPSCI).","sourceIds":["esp-church-1976"]}],"exhibit":{"title":"From Unchecked Wartime Collection to the 1976–1978 Oversight Settlement","provenanceLabel":"DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH. Constructed from declassified NSA Ultra/Venona records (esp-ultra-nsa, esp-venona-nsa), NRO CORONA monograph (esp-u2-corona-nro), and Senate Church Committee Report Book II (esp-church-1976).","isOriginalFacsimile":false,"sourceIds":["esp-ultra-nsa","esp-venona-nsa","esp-u2-corona-nro","esp-church-1976","esp-cia-shamrock-1999"],"hotspots":[{"id":"esp-hs-1","label":"1. Bletchley Park & Venona (1940–1948)","detail":"Ultra broke German Enigma/Lorenz ciphers and Venona exploited duplicate 1942 Soviet one-time pad pages. Both required strict secrecy—and Venona went dark when Soviet operators stopped reusing pads after 1948.","sourceIds":["esp-ultra-nsa","esp-venona-nsa"]},{"id":"esp-hs-2","label":"2. U-2 to CORONA Satellites (May–Aug 1960)","detail":"After the May 1, 1960 U-2 shootdown, Discoverer XIV (CORONA) returned orbital film on August 18, 1960—proving Soviet ICBM deployments were far smaller than worst-case 'missile gap' claims.","sourceIds":["esp-u2-corona-nro"]},{"id":"esp-hs-3","label":"3. Operation SHAMROCK & MINARET (1945–1975)","detail":"For 30 years without statutory authority or warrants, NSA collected international telegrams from commercial carriers (analyzing ~150,000/month) and monitored ~1,650 Americans on watchlists.","sourceIds":["esp-church-1976","esp-cia-shamrock-1999"]},{"id":"esp-hs-4","label":"4. Church Committee & FISA Settlement (1976–1978)","detail":"Senate Report 94-755 (April 1976) led to permanent Senate/House intelligence committees (SSCI/HPSCI) and the 1978 Foreign Intelligence Surveillance Act requiring court orders for domestic surveillance.","sourceIds":["esp-church-1976"]}]},"sourceChallenge":{"title":"Investigate the Sources: Did technical collection work without oversight or limits?","question":"Compare the declassified NRO CORONA & NSA Venona records (`esp-u2-corona-nro`, `esp-venona-nsa`) with the 1976 Senate Church Committee Report (`esp-church-1976`). What do the primary records establish when read together?","primarySourceId":"esp-church-1976","targetSourceId":"esp-andrew-jeffreys-historiography","options":[{"id":"opt-a","label":"Technical collection disproved inflated threat estimates (like the 1960 missile gap), but failed when codes changed and drifted into 30 years of warrantless domestic telegram collection (SHAMROCK) until Congress enacted statutory oversight.","isSupported":true,"feedback":"Correct. NRO's CORONA records show satellite imagery disproved the missile gap, NSA's Venona files show decrypts stopped once duplicate pad reuse ended, and the 1976 Church Committee Report documents how unchecked executive secrecy enabled SHAMROCK and COINTELPRO."},{"id":"opt-b","label":"Cryptologic breakthroughs and satellites eliminated strategic surprise throughout the Cold War and required no congressional or judicial oversight.","isSupported":false,"feedback":"Not supported by the archival record. Both NSA/NRO histories and the 1976 Church Committee Report document major intelligence limits under radio silence/encryption changes and 30 years of domestic abuses under unreviewed executive authority."},{"id":"opt-c","label":"The 1976 Church Committee abolished all U.S. signals intelligence and satellite reconnaissance programs.","isSupported":false,"feedback":"Not supported. Rather than abolishing foreign intelligence, the 1976–1978 reforms terminated unlawful domestic programs (SHAMROCK/COINTELPRO) and created permanent congressional oversight committees and FISA judicial warrants."}],"takeaway":"You can also challenge `esp-andrew-jeffreys-historiography` (`SYNOPSIS_ONLY`) below to verify that all core factual and oversight claims survive independently on declassified primary NSA, NRO, CIA, and Senate records."},"quickLookSummaries":{"question":{"headline":"How can a democracy gather secret intelligence without blinding itself or eroding civil liberties?","text":"From WWII codebreaking (Ultra) to Cold War spy satellites (CORONA) and the 1975–1976 Senate Church Committee investigation, espionage history tests what technical collection can prove—and why secret power requires external oversight.","sourceIds":["esp-ultra-nsa","esp-church-1976"]},"back-then":{"headline":"1940–1978: From Bletchley Park and Venona to CORONA satellites and the Church Committee.","text":"Allied cryptanalysts broke Enigma/Lorenz (Ultra) and duplicate Soviet one-time pads (Venona); after the May 1960 U-2 shootdown, CORONA satellites photographed Soviet missile fields. Meanwhile, NSA secretly copied international telegrams for 30 years (SHAMROCK) until exposed in 1975.","sourceIds":["esp-ultra-nsa","esp-venona-nsa","esp-u2-corona-nro","esp-cia-shamrock-1999"]},"debate":{"headline":"Three recurring debates: Technical sensors vs. human judgment, courtroom secrecy, and executive power.","text":"Officials debated whether signals and satellites could prevent surprise, whether to keep Venona secret from courts, and whether congressional oversight would harm security or save constitutional government.","sourceIds":["esp-venona-nsa","esp-u2-corona-nro","esp-church-1976"]},"what-happened":{"headline":"CORONA disproved the 'missile gap,' while the Church Committee forged FISA and permanent oversight.","text":"Satellite photography stabilized nuclear estimates, but technical collection went blind under radio silence or clean one-time pads. In 1976–1978, Congress ended SHAMROCK/COINTELPRO and created SSCI, HPSCI, and FISA warrants.","sourceIds":["esp-u2-corona-nro","esp-church-1976","esp-cia-shamrock-1999"]},"different-today":{"headline":"Where the analogy breaks: Ubiquitous encryption and global fiber-optic networks.","text":"1940s cipher breaks exploited mechanical rotor habits and reused paper pads, while 1978 FISA assumed a clean line between domestic wires and foreign radio—boundaries that blurred in the global internet era.","sourceIds":["esp-venona-nsa","esp-church-1976"]},"evidence":{"headline":"6 accessible sources: Declassified NSA, NRO, CIA, and U.S. Senate records + competing historians.","text":"Inspect verified primary records, disputed historiographical schools, and 1 provisional unverified claim that must be reviewed and corrected before promoting this inquiry to verified status.","sourceIds":["esp-ultra-nsa","esp-venona-nsa","esp-u2-corona-nro","esp-church-1976","esp-cia-shamrock-1999","esp-andrew-jeffreys-historiography"]}}},{"id":"influenza-1918","subjectKey":"influenza-1918","inquiryStatus":"PROVISIONAL","promotedToVerified":false,"title":"1918–1919 Influenza Pandemic & Non-Pharmaceutical Interventions","subtitle":"Timing, Layered Municipal Restrictions, Premature Relaxation, and Competing Epidemiological Models","theme":"Pandemic response & timing","place":"United States (43 Cities)","period":"1918–1919","asOfDate":"2026-11-09","question":"How did U.S. cities respond to the 1918–1919 influenza pandemic, what did officials argue about school closures and gathering bans, and what happened when measures were lifted early?","summary":"Archival mortality records across 43 U.S. cities (September 1918–February 1919) show that early, layered non-pharmaceutical interventions (school closures, public gathering bans, and isolation) significantly reduced peak weekly death rates—but cities that deactivated measures prematurely experienced second mortality peaks because susceptible populations remained.","hook":"Philadelphia, St. Louis & 43 U.S. Cities (1918–1919): Compare why early vs. late public-health interventions changed peak mortality—and why lifting bans early triggered rebound waves.","questionBoundary":"Covers documented municipal non-pharmaceutical interventions (NPIs) and weekly excess pneumonia and influenza mortality across 43 continental U.S. cities between September 8, 1918 and February 22, 1919. Does not evaluate modern mRNA vaccines, antiviral drugs, or ICU mechanical ventilation.","limits":["In 1918, scientists did not yet know influenza was caused by a virus (identifying Pfeiffer's bacillus instead) and had no influenza vaccines, antivirals, or antibiotics for secondary bacterial pneumonia.","Weekly municipal mortality records from 1918–1919 suffer from wartime reporting delays, baseline demographic shifts, and unmeasured variations in household compliance.","Because non-pharmaceutical interventions in 1918 reduced transmission precisely by keeping large shares of a city's population unexposed (susceptible), lifting restrictions while the virus still circulated triggered second epidemic waves."],"questionProfile":{"whyRelevantSummary":"When communities debate non-pharmaceutical measures (school closures, gathering bans, and timing of relaxation) during a novel respiratory outbreak, the 1918–1919 43-city archival dataset provides the most thoroughly audited historical test of timing, duration, and rebound dynamics.","knownCoverageGaps":["Rural counties, small towns, and non-U.S. colonial/wartime populations (such as India and sub-Saharan Africa, where the vast majority of global 1918 deaths occurred) are not part of the 43-city U.S. Census Weekly Health Index dataset.","1918 U.S. urban commuting and schooling patterns differ structurally from 21st-century remote work and global air travel."]},"citizenGuide":{"whyComparable":"Both 1918 municipal health officers and modern public-health authorities faced painful trade-offs between early social disruption (closing schools, theaters, and churches) and hospital/morgue overload—followed by public pressure to reopen as soon as cases fell.","whatHappenedBefore":"A mild spring 1918 wave was followed in September 1918 by a lethal autumn wave spreading from wartime military camps and ports into major U.S. cities.","whatsDifferent":"Modern responses operate with viral genomics, rapid diagnostics, antibiotics for secondary bacterial pneumonia, mechanical ventilation, and vaccines—none of which existed in 1918.","whatWorked":"Cities that activated layered interventions (concurrent school closures and public gathering bans) before cumulative excess deaths reached 20–30 per 100,000 experienced 30%–50% lower peak weekly mortality rates (e.g., St. Louis vs. Philadelphia).","whatFailed":"Delayed responses after mass gatherings (such as Philadelphia's September 28, 1918 Liberty Loan Parade) produced catastrophic peak mortality spikes, while premature relaxation of bans in cities that initially succeeded triggered second mortality waves in November–December 1918.","howWeKnow":"U.S. Census Bureau Weekly Health Index mortality tables (1918–1919), Markel et al. (2007) JAMA 43-city archival study, Bootsma & Ferguson (2007) PNAS, Hatchett et al. (2007) PNAS, and the University of Michigan Influenza Encyclopedia."},"sources":[{"id":"flu-markel-2007","title":"Nonpharmaceutical Interventions Implemented by US Cities During the 1918–1919 Influenza Pandemic","author":"Howard Markel, Harvey B. Lipman, J. Alexander Navarro, Alexandra Sloan, Joseph R. Michalsen, Alexandra Minna Stern, and Martin S. Cetron (JAMA / CDC)","url":"https://pubmed.ncbi.nlm.nih.gov/17684187/","type":"scholarship","coverage":"FULL_TEXT","locator":"JAMA, Aug 8, 2007, Vol. 298, No. 6, pp. 644–654 (24-week analysis of 43 continental U.S. cities, Sept 8, 1918 – Feb 22, 1919, 115,340 excess deaths)","accessed":"2026-11-09","rights":"Peer-reviewed scientific & historical archival study (JAMA / U.S. CDC co-authored)","notes":"Establishes across 43 U.S. cities that concurrent school closure and public gathering bans (implemented in 34/43 cities, median duration 4 weeks) were significantly associated with lower peak weekly excess death rates (r = -0.74 for earlier response timing) and lower total excess mortality (r = -0.39 for longer duration), while documenting bimodal double-peak rebounds when cities deactivated measures.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"flu-markel-2007","title":"Nonpharmaceutical Interventions Implemented by US Cities During the 1918–1919 Influenza Pandemic","author":"Howard Markel, Harvey B. Lipman, J. Alexander Navarro, Alexandra Sloan, Joseph R. Michalsen, Alexandra Minna Stern, and Martin S. Cetron (JAMA / CDC)","url":"https://pubmed.ncbi.nlm.nih.gov/17684187/","type":"scholarship","locator":"JAMA, Aug 8, 2007, Vol. 298, No. 6, pp. 644–654 (24-week analysis of 43 continental U.S. cities, Sept 8, 1918 – Feb 22, 1919, 115,340 excess deaths)","accessed":"2026-11-09","rights":"Peer-reviewed scientific & historical archival study (JAMA / U.S. CDC co-authored)","notes":"Establishes across 43 U.S. cities that concurrent school closure and public gathering bans (implemented in 34/43 cities, median duration 4 weeks) were significantly associated with lower peak weekly excess death rates (r = -0.74 for earlier response timing) and lower total excess mortality (r = -0.39 for longer duration), while documenting bimodal double-peak rebounds when cities deactivated measures.","preservation":"CURATOR_CARD_ONLY"},"sha256":"ccfbe40e99987762b21c108c550a70b28dca41cf36c1625cc2503d816a61978f"},{"id":"flu-bootsma-ferguson-2007","title":"The Effect of Public Health Measures on the 1918 Influenza Pandemic in U.S. Cities","author":"Martin C. J. Bootsma and Neil M. Ferguson (Proceedings of the National Academy of Sciences)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC1849868/","type":"scholarship","coverage":"FULL_TEXT","locator":"PNAS, May 1, 2007, Vol. 104, No. 18, pp. 7588–7593 (epidemiological transmission modeling fitted to 1918 mortality curves across 16–23 U.S. cities)","accessed":"2026-11-09","rights":"Open Access via NIH PubMed Central (PMC1849868)","notes":"Demonstrates mathematically and empirically that time-limited non-pharmaceutical interventions reduced total mortality only moderately (10–30%) because effectively suppressing transmission left a larger pool of susceptible citizens vulnerable to a second wave when controls were relaxed.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"flu-bootsma-ferguson-2007","title":"The Effect of Public Health Measures on the 1918 Influenza Pandemic in U.S. Cities","author":"Martin C. J. Bootsma and Neil M. Ferguson (Proceedings of the National Academy of Sciences)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC1849868/","type":"scholarship","locator":"PNAS, May 1, 2007, Vol. 104, No. 18, pp. 7588–7593 (epidemiological transmission modeling fitted to 1918 mortality curves across 16–23 U.S. cities)","accessed":"2026-11-09","rights":"Open Access via NIH PubMed Central (PMC1849868)","notes":"Demonstrates mathematically and empirically that time-limited non-pharmaceutical interventions reduced total mortality only moderately (10–30%) because effectively suppressing transmission left a larger pool of susceptible citizens vulnerable to a second wave when controls were relaxed.","preservation":"CURATOR_CARD_ONLY"},"sha256":"cf46ccb53a5000ae741285ed16a33c329c8ade420df61d52842fa75b72475cee"},{"id":"flu-hatchett-2007","title":"Public Health Interventions and Epidemic Intensity During the 1918 Influenza Pandemic","author":"Richard J. Hatchett, Carter E. Mecher, and Marc Lipsitch (PNAS)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC1849867/","type":"scholarship","coverage":"FULL_TEXT","locator":"PNAS, May 1, 2007, Vol. 104, No. 18, pp. 7582–7587 (comparison of 17 U.S. cities by intervention timing relative to cumulative mortality threshold)","accessed":"2026-11-09","rights":"Open Access via NIH PubMed Central (PMC1849867)","notes":"Establishes that cities implementing multiple interventions before cumulative excess pneumonia and influenza deaths reached 20–30 per 100,000 had peak weekly death rates roughly half as high as late-acting cities, and that no single intervention worked in isolation.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"flu-hatchett-2007","title":"Public Health Interventions and Epidemic Intensity During the 1918 Influenza Pandemic","author":"Richard J. Hatchett, Carter E. Mecher, and Marc Lipsitch (PNAS)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC1849867/","type":"scholarship","locator":"PNAS, May 1, 2007, Vol. 104, No. 18, pp. 7582–7587 (comparison of 17 U.S. cities by intervention timing relative to cumulative mortality threshold)","accessed":"2026-11-09","rights":"Open Access via NIH PubMed Central (PMC1849867)","notes":"Establishes that cities implementing multiple interventions before cumulative excess pneumonia and influenza deaths reached 20–30 per 100,000 had peak weekly death rates roughly half as high as late-acting cities, and that no single intervention worked in isolation.","preservation":"CURATOR_CARD_ONLY"},"sha256":"1fede76e759045427bfbbbdebfc449344655c3bef7852af113a55ca76307a3e5"},{"id":"flu-cdc-stacks-1918","title":"Nonpharmaceutical Influenza Mitigation Strategies, U.S. 1918–1920 Historical Evaluation","author":"U.S. Centers for Disease Control and Prevention (CDC Stacks Archival Repository)","url":"https://stacks.cdc.gov/view/cdc/16345/cdc_16345_DS1.pdf","type":"institution","coverage":"FULL_TEXT","locator":"CDC Stacks Document #16345 (U.S. Census Bureau Weekly Health Index tables and municipal health commissioner orders, 1918–1919)","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Provides the primary U.S. Census Weekly Health Index excess death rate (EDR) tables and municipal public health chronologies for Philadelphia, St. Louis, New York, Denver, and Pittsburgh.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"flu-cdc-stacks-1918","title":"Nonpharmaceutical Influenza Mitigation Strategies, U.S. 1918–1920 Historical Evaluation","author":"U.S. Centers for Disease Control and Prevention (CDC Stacks Archival Repository)","url":"https://stacks.cdc.gov/view/cdc/16345/cdc_16345_DS1.pdf","type":"institution","locator":"CDC Stacks Document #16345 (U.S. Census Bureau Weekly Health Index tables and municipal health commissioner orders, 1918–1919)","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Provides the primary U.S. Census Weekly Health Index excess death rate (EDR) tables and municipal public health chronologies for Philadelphia, St. Louis, New York, Denver, and Pittsburgh.","preservation":"CURATOR_CARD_ONLY"},"sha256":"1a72b9f02247cc355049f84bb561b81ceb589d927a5bd5f939c008b8e8a9b190"},{"id":"flu-umich-archive","title":"The American Influenza Epidemic of 1918–1919: A Digital Encyclopedia & Municipal Archive","author":"University of Michigan Center for the History of Medicine & Michigan Publishing","url":"https://medresearch.umich.edu/labs-departments/centers/chhassem/areas/hmph/research-hmph/nonpharmaceutical-interventions","type":"primary","coverage":"PRIMARY_EXCERPT","locator":"University of Michigan Center for the History of Medicine — Nonpharmaceutical Interventions archival collection (50-city municipal newspapers, health board minutes, and merchant protests)","accessed":"2026-11-09","rights":"Publicly accessible academic digital archive","notes":"Documents contemporary municipal debates among health commissioners, mayors, theater owners, clergy, and school boards over closing orders and mask ordinances in autumn 1918.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"flu-umich-archive","title":"The American Influenza Epidemic of 1918–1919: A Digital Encyclopedia & Municipal Archive","author":"University of Michigan Center for the History of Medicine & Michigan Publishing","url":"https://medresearch.umich.edu/labs-departments/centers/chhassem/areas/hmph/research-hmph/nonpharmaceutical-interventions","type":"primary","locator":"University of Michigan Center for the History of Medicine — Nonpharmaceutical Interventions archival collection (50-city municipal newspapers, health board minutes, and merchant protests)","accessed":"2026-11-09","rights":"Publicly accessible academic digital archive","notes":"Documents contemporary municipal debates among health commissioners, mayors, theater owners, clergy, and school boards over closing orders and mask ordinances in autumn 1918.","preservation":"CURATOR_CARD_ONLY"},"sha256":"4bef79dc56f3a93121a490aa2ba8a19718980dd183380af2ea76d50e8f2da737"},{"id":"flu-taubenberger-legacy-2020","title":"The 1918 Influenza Pandemic and Its Legacy (Pathology, Secondary Bacterial Pneumonia & Historiography)","author":"Jeffery K. Taubenberger and David M. Morens (Cold Spring Harbor Perspectives in Medicine / NIH)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC7528857/","type":"scholarship","coverage":"SYNOPSIS_ONLY","locator":"Cold Spring Harbor Perspectives in Medicine (2020), PMC7528857 — synopsis of viral reconstruction, secondary bacterial pneumonia pathology, and baseline geographic/socioeconomic confounders","accessed":"2026-11-09","rights":"Open Access via NIH PMC (curated here as SYNOPSIS_ONLY to test consequential source withdrawal on pathology/confounder claims)","notes":"SYNOPSIS_ONLY card summarizing biological and environmental confounders in 1918 mortality: the overwhelming role of untreatable secondary bacterial pneumonia (Streptococcus, Staphylococcus) and pre-existing regional wave exposure.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"flu-taubenberger-legacy-2020","title":"The 1918 Influenza Pandemic and Its Legacy (Pathology, Secondary Bacterial Pneumonia & Historiography)","author":"Jeffery K. Taubenberger and David M. Morens (Cold Spring Harbor Perspectives in Medicine / NIH)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC7528857/","type":"scholarship","locator":"Cold Spring Harbor Perspectives in Medicine (2020), PMC7528857 — synopsis of viral reconstruction, secondary bacterial pneumonia pathology, and baseline geographic/socioeconomic confounders","accessed":"2026-11-09","rights":"Open Access via NIH PMC (curated here as SYNOPSIS_ONLY to test consequential source withdrawal on pathology/confounder claims)","notes":"SYNOPSIS_ONLY card summarizing biological and environmental confounders in 1918 mortality: the overwhelming role of untreatable secondary bacterial pneumonia (Streptococcus, Staphylococcus) and pre-existing regional wave exposure.","preservation":"CURATOR_CARD_ONLY"},"sha256":"b305abaedc5d0ac02d9cdf42194f9bac2e6b6c206a5afd8317e1464dae190144"}],"facts":[{"id":"influenza-1918-facts-1","title":"The 43-City Archival Mortality Record (Sept 1918 – Feb 1919): 115,340 Excess Deaths","text":"Across 43 major continental U.S. cities studied over the 24-week autumn/winter wave (September 8, 1918 to February 22, 1919), U.S. Census Weekly Health Index records document 115,340 excess pneumonia and influenza deaths—an average excess death rate (EDR) of 500 per 100,000 population.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["flu-markel-2007","flu-cdc-stacks-1918"]},{"id":"influenza-1918-facts-2","title":"Philadelphia vs. St. Louis: Timing of Layered Interventions Relative to Local Spread","text":"Philadelphia hosted a massive Liberty Loan parade on September 28, 1918 and waited until October 3 (after hospitals were overwhelmed) to close schools and ban public gatherings, reaching a peak weekly excess death rate of ~257 per 100,000. St. Louis closed schools, theaters, and public gatherings on October 7—two days after its first civilian case spike—holding its first peak weekly excess death rate to ~31 per 100,000.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["flu-hatchett-2007","flu-cdc-stacks-1918","flu-umich-archive"]},{"id":"influenza-1918-facts-3","title":"Layered Measures Outperformed Single Isolated Restrictions","text":"In 34 of the 43 U.S. cities (79%), health authorities combined concurrent school closures with public gathering bans for a median duration of 4 weeks (range 1–10 weeks). Hatchett et al. (2007) and Markel et al. (2007) found that no single non-pharmaceutical intervention operating alone significantly reduced peak mortality; reductions required layered combinations activated early.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["flu-markel-2007","flu-hatchett-2007"]},{"id":"influenza-1918-facts-4","title":"Premature Relaxation & The Paradox of Unexposed Susceptibles (Bimodal Second Peaks)","text":"Because effective non-pharmaceutical interventions slowed transmission without a vaccine, cities that suppressed their first wave retained a larger share of uninfected, susceptible residents. When cities such as St. Louis and Denver lifted gathering and school bans in November 1918 under civic and business pressure, they experienced sharp second mortality peaks.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]},{"id":"influenza-1918-facts-5","title":"Provisional Unverified Claim: Did early school and theater closures permanently eradicate 1918 flu in compliant cities?","text":"UNVERIFIED PROVISIONAL CLAIM: Cities like St. Louis that closed schools and theaters early in October 1918 permanently halted influenza transmission and avoided any subsequent winter waves after reopening in November.","evidenceStatus":"UNVERIFIED_CLAIM","epistemicStatus":"UNVERIFIED_MATERIAL","reviewStatus":"PENDING_REVIEW","verificationPrompt":"This claim contradicts the bimodal mortality curves in Markel et al. (2007) and Bootsma & Ferguson (2007). Inspect `flu-markel-2007` and `flu-bootsma-ferguson-2007` and apply the primary-record correction before promoting.","verifiedCorrection":{"correctedTitle":"Bimodal Rebound Wave After November 1918 Reopening (St. Louis & Denver)","correctedText":"Verified against Markel et al. (2007) and Bootsma & Ferguson (2007) (`flu-markel-2007`, `flu-bootsma-ferguson-2007`): Early interventions flattened the October 1918 peak in St. Louis and Denver, but did not eradicate the virus; lifting restrictions in mid-November 1918 triggered a second surge in weekly excess deaths, forcing officials to re-impose closures.","correctedSourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]},"sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]}],"timeline":[{"id":"influenza-1918-timeline-1","date":"1918-09-08 to 1918-09-18","title":"Lethal autumn wave erupts at Camp Devens and Boston port facilities","text":"A virulent second wave of influenza spreads rapidly from military cantonments near Boston into civilian urban populations along rail and shipping corridors.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-cdc-stacks-1918","flu-umich-archive"]},{"id":"influenza-1918-timeline-2","date":"1918-09-28 to 1918-10-03","title":"Philadelphia holds Liberty Loan Parade; closes public venues 5 days later","text":"Despite warnings from physicians, Philadelphia proceeds with a 200,000-person war-bond parade on September 28; by October 3 every hospital bed is full and the city orders belated closures as weekly excess mortality spikes toward 257/100,000.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-hatchett-2007","flu-cdc-stacks-1918"]},{"id":"influenza-1918-timeline-3","date":"1918-10-05 to 1918-10-08","title":"St. Louis Health Commissioner Max Starkloff orders preemptive layered closures","text":"Acting two days after the first cluster at Jefferson Barracks, St. Louis closes schools, theaters, churches, and saloons before hospital overload, keeping its initial October weekly peak near 31/100,000.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-markel-2007","flu-hatchett-2007","flu-umich-archive"]},{"id":"influenza-1918-timeline-4","date":"1918-11-11 to 1918-11-18","title":"Armistice Day crowds and premature relaxation of municipal bans","text":"Following the November 11 WWI Armistice celebrations and merchant petitions, dozens of cities lift school and gathering bans while influenza is still circulating.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-markel-2007","flu-umich-archive"]},{"id":"influenza-1918-timeline-5","date":"1918-11-25 to 1918-12-20","title":"Second mortality wave hits cities that relaxed restrictions early","text":"Cities that had protected large susceptible populations during October (including St. Louis, Denver, and Grand Rapids) experience pronounced second excess-mortality peaks, prompting re-imposition of closures.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]}],"historicalArguments":[{"id":"influenza-1918-arg-1","topic":"Preemptive school and gathering closures vs. keeping wartime civic life open (Sept–Oct 1918)","decisionWindow":"Late September to early October 1918 municipal health emergency declarations","contemporaryActor":"Early-intervention health commissioners (e.g., Dr. Max Starkloff in St. Louis) vs. wartime parade organizers, business associations, and late-acting boards","contemporaryArgument":"Health commissioners in cities like St. Louis argued that closing schools, theaters, and public gatherings immediately upon the first local cases was essential to prevent hospitals from collapsing (`flu-umich-archive`, `flu-hatchett-2007`). Opponents argued that closures would cause public panic, disrupt wartime bond drives and schooling, and fail to stop an airborne contagion (`flu-umich-archive`).","policymakerExpectation":"Early-acting officials expected layered closures to flatten the immediate hospital surge, while late-acting officials expected routine isolation of the sick to suffice without halting public gatherings.","expectationVerdict":"SUPPORTED_WITH_LIMITS","subsequentEvidence":"Cities that activated layered closures before cumulative excess deaths reached 20–30/100,000 experienced roughly 50% lower peak weekly mortality than late-acting cities (`flu-hatchett-2007`, `flu-markel-2007`), though total 24-week mortality differences were smaller (10–30%) once rebound waves occurred (`flu-bootsma-ferguson-2007`).","laterHistoriography":"Markel et al. (2007), Hatchett et al. (2007), and Bootsma & Ferguson (2007) agree that early layered NPIs strongly reduced peak healthcare overload, while noting that baseline regional wave timing and secondary bacterial pneumonia (`flu-taubenberger-legacy-2020`) also shaped cumulative totals.","differenceThatLimits":"1918 cities had no vaccines or antivirals to deploy during the time bought by closures; today, delaying peak transmission can bridge a population to targeted vaccination or antiviral distribution.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007","flu-hatchett-2007","flu-umich-archive","flu-taubenberger-legacy-2020"],"survivingTextByWithdrawnSource":{"flu-taubenberger-legacy-2020":"Surviving full-text basis (`flu-markel-2007`, `flu-bootsma-ferguson-2007`, `flu-hatchett-2007`, `flu-umich-archive`): With `flu-taubenberger-legacy-2020` withdrawn, the 2007 JAMA and PNAS studies independently establish the 50% peak mortality reduction in early-acting cities and the 10–30% cumulative reduction."}},{"id":"influenza-1918-arg-2","topic":"Reopening schools and theaters as soon as daily cases decline (November 1918)","decisionWindow":"November 1918 post-Armistice relaxation of municipal closure orders","contemporaryActor":"Theater owners, merchants, and exhausted municipal boards vs. cautious public-health officers","contemporaryArgument":"Merchants and school boards argued in early November 1918 that once weekly deaths began falling and WWI ended, continued closures were economically ruinous and unnecessary (`flu-umich-archive`). Public health officers warned that the pathogen remained present and that large post-Armistice crowds would reignite transmission (`flu-markel-2007`).","policymakerExpectation":"Municipal councils that lifted bans in mid-November expected the epidemic wave to continue fading naturally as it had in severely hit Eastern cities.","expectationVerdict":"CONTRADICTED_BY_EVENTS","subsequentEvidence":"Unlike Philadelphia (where rapid early burnout left fewer susceptibles), cities that had successfully suppressed their October wave (such as St. Louis and Denver) still had large unexposed populations; lifting bans in November triggered sharp second mortality peaks that in some cases exceeded their October peak (`flu-markel-2007`, `flu-bootsma-ferguson-2007`).","laterHistoriography":"Epidemiological modeling by Bootsma & Ferguson (2007) proved that transient interventions that reduce the effective reproduction number below 1 preserve a susceptible pool above the herd-immunity threshold, guaranteeing a rebound wave if controls are lifted completely before the season ends.","differenceThatLimits":"Modern serological testing and wastewater surveillance allow health authorities to measure population immunity and viral prevalence directly before lifting controls, whereas 1918 officials relied on lagging death certificates.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007","flu-umich-archive"]},{"id":"influenza-1918-arg-3","topic":"Single symbolic measures (gauze masks or spitting ordinances) vs. layered structural closures","decisionWindow":"October–December 1918 municipal ordinance debates","contemporaryActor":"Advocates of single non-disruptive ordinances vs. proponents of layered school/gathering/isolation closures","contemporaryArgument":"Some municipal officials hoped that enforcing anti-spitting ordinances, street flushing, or multi-layer surgical gauze mask mandates alone would control influenza while keeping saloons, theaters, and crowded streetcars operating normally (`flu-umich-archive`). Other health officers insisted that only layered reductions in indoor crowding could slow respiratory transmission (`flu-markel-2007`, `flu-hatchett-2007`).","policymakerExpectation":"Officials adopting single symbolic measures expected to avoid the economic and civic costs of closing schools and public gathering places.","expectationVerdict":"CONTRADICTED_BY_EVENTS","subsequentEvidence":"Statistical analysis across the 43 cities (`flu-markel-2007`, `flu-hatchett-2007`) showed that single unlayered measures did not produce statistically significant reductions in peak or cumulative excess mortality; only early, concurrent combinations of school closures, public gathering bans, and isolation/quarantine reduced weekly excess death rates.","laterHistoriography":"Historians and epidemiologists note that 1918 porous cotton gauze masks and street-washing reflected an incomplete pre-virological understanding of aerosols (`flu-taubenberger-legacy-2020`), whereas layered crowding reductions worked regardless of whether officials thought the pathogen was bacterial or viral.","differenceThatLimits":"Modern N95/FFP2 electrostatic respirators have verified sub-micron filtration efficiency that bears no physical resemblance to loose 1918 surgical cotton gauze.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["flu-markel-2007","flu-hatchett-2007","flu-umich-archive","flu-taubenberger-legacy-2020"],"survivingTextByWithdrawnSource":{"flu-taubenberger-legacy-2020":"Surviving full-text basis (`flu-markel-2007`, `flu-hatchett-2007`, `flu-umich-archive`): With `flu-taubenberger-legacy-2020` withdrawn, the 2007 JAMA and PNAS studies independently establish that only concurrent layered closures—not single isolated ordinances—significantly reduced peak weekly excess mortality."}}],"outcomes":[{"id":"influenza-1918-outcomes-1","text":"Early, concurrent implementation of school closures and public gathering bans across 43 U.S. cities was strongly associated with delayed peak mortality (Spearman r = -0.74) and 30%–50% lower peak weekly excess death rates.","causalStatus":"CONFOUNDED_SEQUENCE","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["East-to-West geographic progression of the autumn 1918 wave giving Western/Midwestern cities more warning time","Baseline city population density, age structure, and prior spring-wave exposure"],"counterfactualGap":"Observational city comparisons cannot fully separate policy timing from regional viral seeding order and unmeasured voluntary behavior changes.","sourceIds":["flu-markel-2007","flu-hatchett-2007","flu-cdc-stacks-1918"]},{"id":"influenza-1918-outcomes-2","text":"Time-limited interventions reduced total 24-week cumulative excess mortality more modestly (10%–30%) than they reduced peak weekly mortality (up to 50%), because premature relaxation in November 1918 triggered second waves in protected populations.","causalStatus":"DOCUMENTED_OUTCOME","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["Public and commercial exhaustion leading to 4-week median intervention duration","Armistice Day mass gatherings on November 11, 1918"],"counterfactualGap":"In the absence of a 1918 vaccine, models show cities would have needed to sustain interventions for several consecutive months to avoid rebound waves.","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]},{"id":"influenza-1918-outcomes-3","text":"Most 1918 influenza deaths resulted from secondary bacterial pneumonia (Streptococcus pneumoniae, Streptococcus pyogenes, Staphylococcus aureus) in an era before penicillin or intensive oxygen therapy.","causalStatus":"CONFOUNDED_SEQUENCE","epistemicStatus":"DISPUTED_INTERPRETATION","confounders":["Wartime crowding in barracks and tenements increasing bacterial co-infection rates","Lack of sulfonamides or beta-lactam antibiotics in 1918"],"counterfactualGap":"Cannot isolate how much inter-city mortality variation reflected differences in bacterial co-pathogen prevalence vs. municipal social distancing.","sourceIds":["flu-taubenberger-legacy-2020","flu-cdc-stacks-1918"],"survivingTextByWithdrawnSource":{"flu-taubenberger-legacy-2020":"Surviving institutional basis (`flu-cdc-stacks-1918`): U.S. Census Weekly Health Index records combined pneumonia and influenza deaths into a single excess-mortality metric because 1918 clinicians could not separate primary viral infection from secondary pneumonia."}}],"counterexamples":[{"id":"influenza-1918-counterexample-1","title":"Bimodal Rebound Waves After Premature Relaxation (St. Louis & Denver, Nov–Dec 1918)","text":"St. Louis and Denver suppressed their initial October 1918 waves through early closures, but when they lifted restrictions in mid-November while the virus still circulated, both cities suffered severe second excess-mortality peaks because their populations remained immunologically susceptible.","failureCondition":"Time-limited non-pharmaceutical interventions fail to prevent late-wave mortality if lifted completely while transmission continues and population susceptibility remains high.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]},{"id":"influenza-1918-counterexample-2","title":"Late Intervention After Mass Amplification (Philadelphia, Oct 1918)","text":"Philadelphia enacted school and gathering closures on October 3, 1918—the exact same legal measures used in St. Louis—but because the city waited until five days after the 200,000-person Liberty Loan Parade when exponential community transmission had already saturated hospitals, its peak weekly excess death rate reached 257/100,000.","failureCondition":"Identical closure orders fail to prevent hospital collapse when activated after mass-gathering amplification and widespread community seeding.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-hatchett-2007","flu-cdc-stacks-1918"]}],"interpretations":[{"id":"influenza-1918-interp-1","title":"Early Layered Intervention & Peak-Mitigation School (Markel, Cetron & Hatchett, 2007)","causalEmphasis":"Timing, layering, and duration of municipal non-pharmaceutical interventions","text":"Demonstrates from 43-city archival chronologies and U.S. Census excess mortality curves that early, sustained, and layered non-pharmaceutical interventions decisively lowered peak weekly mortality (flattening hospital surge) and moderately reduced cumulative deaths.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["flu-markel-2007","flu-hatchett-2007","flu-cdc-stacks-1918"]},{"id":"influenza-1918-interp-2","title":"Transmission-Dynamics & Susceptible-Depletion School (Bootsma & Ferguson, 2007)","causalEmphasis":"Non-linear herd-immunity threshold and rebound risk upon relaxation","text":"Emphasizes that in the absence of a vaccine, interventions that drive transmission too low leave a city above the herd-immunity threshold—explaining why cities with the strongest first-wave suppression suffered the sharpest second-wave rebounds when controls were lifted.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["flu-bootsma-ferguson-2007"]},{"id":"influenza-1918-interp-3","title":"Biological Co-Infection & Structural Baseline School (Taubenberger & Morens, 2020)","causalEmphasis":"Secondary bacterial pneumonia pathology and pre-existing demographic/geographic wave exposure","text":"Highlights that 1918 fatal outcomes were driven overwhelmingly by secondary bacterial pneumonia in a pre-antibiotic era and that East-to-West viral wave progression and prior spring exposure confounded simple city-to-city policy comparisons.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["flu-taubenberger-legacy-2020","flu-cdc-stacks-1918"],"survivingTextByWithdrawnSource":{"flu-taubenberger-legacy-2020":"Surviving institutional basis (`flu-cdc-stacks-1918`): U.S. Census Weekly Health Index tables document substantial baseline variation in pre-pandemic pneumonia mortality and East-to-West timing across the 43 cities."}}],"comparison":[{"id":"influenza-1918-comp-1","dimension":"Intervention timing relative to exponential growth","timeframe":"Days (before vs. after 20–30 excess deaths per 100,000)","historical":"Cities acting before cumulative excess mortality reached 20–30/100,000 cut peak weekly death rates roughly in half compared to cities that waited until hospitals overflowed.","present":"Ask whether public-health triggers are tied to early leading indicators (wastewater, hospitalizations) rather than lagging mortality spikes.","limit":"1918 officials had no PCR testing or viral sequencing and had to infer spread from absenteeism and death certificates.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-markel-2007","flu-hatchett-2007"]},{"id":"influenza-1918-comp-2","dimension":"Premature relaxation & second-wave rebound mechanics","timeframe":"4–10 weeks (typical 1918 municipal closure duration)","historical":"Lifting school and gathering bans in November 1918 caused bimodal rebound waves in cities that had kept most residents uninfected during October.","present":"When relaxing temporary transmission controls, ask what changed in underlying population immunity, vaccination coverage, or treatment capacity.","limit":"In 1918 no vaccine existed to convert time bought by closures into durable immunity; modern NPIs can bridge to vaccine or antiviral rollout.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]},{"id":"influenza-1918-comp-3","dimension":"Secondary bacterial pneumonia & medical countermeasures","timeframe":"Clinical progression (days to weeks)","historical":"In 1918, secondary bacterial pneumonia caused the majority of influenza deaths because neither antibiotics nor mechanical ventilation existed.","present":"Distinguish the lethality of an untreated 1918 viral-bacterial co-infection from modern respiratory outbreaks where antibiotics, antivirals, and ICU care exist.","limit":"Direct mortality-rate extrapolations from 1918 ignore a century of antimicrobial, oxygen, and critical-care medicine.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-cdc-stacks-1918","flu-taubenberger-legacy-2020"],"survivingTextByWithdrawnSource":{"flu-taubenberger-legacy-2020":"Surviving institutional basis (`flu-cdc-stacks-1918`): U.S. Census 1918–1919 tables record combined pneumonia-and-influenza mortality in an era prior to antibiotics or modern critical care."}},{"id":"influenza-1918-comp-4","dimension":"Civic Fatigue, Merchant Pushback & Governance Trust","timeframe":"Weeks (median 4-week tolerance in 1918)","historical":"Across 43 U.S. cities, median duration of concurrent school and gathering closures was only 4 weeks before merchant, clergy, and public fatigue forced reopening.","present":"Evaluate whether proposed public-health restrictions account for realistic civic endurance and clear exit criteria.","limit":"1918 households had no remote schooling, electronic commerce, or federal wage-replacement programs to cushion prolonged closures.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["flu-markel-2007","flu-umich-archive"]}],"rejectedComparisons":[{"id":"influenza-1918-rejected-1","failureCode":"PREMATURE_RELAXATION_REBOUND_OMISSION","claim":"The 1918 St. Louis experience proves that a 4-week school and theater closure permanently ends a respiratory pandemic without any rebound wave after reopening.","whyItFails":"Omits the documented November–December 1918 second peak in St. Louis, Denver, and other early-acting cities (`flu-markel-2007`, `flu-bootsma-ferguson-2007`). Suppressing transmission in October left more residents susceptible when restrictions were lifted in November.","counterEvidence":"Markel et al. (2007) JAMA bimodal weekly excess death rate charts and Bootsma & Ferguson (2007) PNAS susceptible-pool analysis.","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]},{"id":"influenza-1918-rejected-2","failureCode":"SINGLE_MEASURE_PANACEA_FALLACY","claim":"Passing a single municipal anti-spitting or gauze-mask ordinance in 1918 reduced city mortality just as effectively as closing crowded indoor gatherings and schools.","whyItFails":"Both Hatchett et al. (2007) and Markel et al. (2007) demonstrated across 43 cities that no single unlayered intervention significantly reduced peak weekly excess mortality; effective mitigation required early, concurrent layering.","counterEvidence":"Hatchett et al. (2007) PNAS Table 1 & Markel et al. (2007) JAMA 43-city regression findings.","sourceIds":["flu-markel-2007","flu-hatchett-2007"]}],"consequentialCorrection":{"targetSourceId":"flu-taubenberger-legacy-2020","targetSourceTitle":"The 1918 Influenza Pandemic and Its Legacy (Taubenberger & Morens 2020 — SYNOPSIS_ONLY)","challengeReason":"Source `flu-taubenberger-legacy-2020` is curated as a `SYNOPSIS_ONLY` pathology overview. Challenging its standing tests whether all 43-city excess mortality, timing, layering, and bimodal rebound findings survive independently on the full-text JAMA, PNAS, and CDC Census records."},"challengePrompts":["How much of the mortality difference between Philadelphia and St. Louis came from policy timing versus East-to-West geographic wave progression?","Why did effective first-wave suppression make cities more vulnerable to a November–December 1918 rebound when bans were lifted?","What couldn't 1918 non-pharmaceutical interventions accomplish in the absence of a vaccine or antibiotics?"],"concepts":[{"term":"Excess Death Rate (EDR)","plain":"The number of pneumonia and influenza deaths per 100,000 residents above what that same city normally experienced during the same week in non-pandemic years (1910–1916).","whyItMatters":"Comparing excess deaths rather than raw case reports prevents cities with better testing from looking worse than cities that undercounted cases.","sourceIds":["flu-markel-2007","flu-cdc-stacks-1918"]},{"term":"Non-Pharmaceutical Interventions (NPIs)","plain":"Public health actions that slow disease spread without medicines or vaccines—such as closing schools and theaters, banning mass gatherings, and isolating the sick.","whyItMatters":"In 1918, before flu vaccines or antibiotics existed, NPIs were the only tools cities had to keep hospitals from overflowing.","sourceIds":["flu-markel-2007","flu-hatchett-2007"]},{"term":"Peak mortality vs. Cumulative mortality","plain":"Peak mortality is the worst single week of deaths (which determines whether hospitals collapse); cumulative mortality is the total deaths over the entire 6-month season.","whyItMatters":"Early 1918 closures cut peak weekly deaths by ~50%, even when total 6-month deaths fell by a smaller 10%–30% due to winter rebounds.","sourceIds":["flu-hatchett-2007","flu-bootsma-ferguson-2007"]},{"term":"Bimodal (Double-Peak) Rebound Curve","plain":"A two-humped epidemic wave where deaths fall during closures, then surge a second time after restrictions are lifted while the virus is still present.","whyItMatters":"Because St. Louis and Denver protected most citizens in October, lifting bans in November allowed the virus to spread among those still-uninfected residents.","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]}],"exhibit":{"title":"1918 Weekly Excess Mortality: Late Single Peak (Philadelphia) vs. Early Layered & Bimodal Rebound (St. Louis)","provenanceLabel":"DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH. Plotted from U.S. Census Weekly Health Index data in Markel et al. (2007) JAMA (flu-markel-2007), Hatchett et al. (2007) PNAS (flu-hatchett-2007), and CDC Stacks (flu-cdc-stacks-1918).","isOriginalFacsimile":false,"sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007","flu-hatchett-2007","flu-cdc-stacks-1918"],"hotspots":[{"id":"flu-hs-1","label":"1. Sept 28, 1918: Philadelphia Liberty Loan Parade","detail":"Philadelphia held a 200,000-person parade after cases had already begun rising, waiting until Oct 3 to close venues. Weekly excess mortality spiked to ~257 per 100,000.","sourceIds":["flu-hatchett-2007","flu-cdc-stacks-1918"]},{"id":"flu-hs-2","label":"2. Oct 7, 1918: St. Louis Early Layered Closures","detail":"St. Louis closed schools, theaters, churches, and saloons two days after initial civilian cases, holding its October weekly peak near ~31 per 100,000.","sourceIds":["flu-markel-2007","flu-hatchett-2007"]},{"id":"flu-hs-3","label":"3. Mid-Nov 1918: Premature Relaxation & Rebound","detail":"When St. Louis and Denver lifted gathering bans after Armistice Day, their larger pools of still-susceptible residents experienced a second mortality peak in late November/December.","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]},{"id":"flu-hs-4","label":"4. Across All 43 U.S. Cities (24 Weeks)","detail":"115,340 total excess deaths (mean EDR 500/100,000). Concurrent school + gathering bans (34 cities, median 4 weeks) strongly reduced peak weekly mortality (r = -0.74).","sourceIds":["flu-markel-2007","flu-cdc-stacks-1918"]}]},"sourceChallenge":{"title":"Investigate the Sources: Peak Flattening vs. Total Pandemic Eradication","question":"Compare Markel et al. (2007) (`flu-markel-2007`) and Bootsma & Ferguson (2007) (`flu-bootsma-ferguson-2007`). Why did cities that succeeded in October 1918 face a second wave in November–December?","primarySourceId":"flu-markel-2007","targetSourceId":"flu-taubenberger-legacy-2020","options":[{"id":"opt-a","label":"Early layered closures kept most residents uninfected in October, so lifting bans in November while the virus still circulated allowed transmission to rebound among susceptible citizens.","isSupported":true,"feedback":"Correct. Both the 43-city archival mortality curves (Markel et al. 2007) and transmission models (Bootsma & Ferguson 2007) show that without a vaccine, successful temporary suppression preserves a susceptible population that rebounds if controls end prematurely."},{"id":"opt-b","label":"Early closures permanently eradicated the virus in 4 weeks, so no city that closed schools in October had any deaths in November or December.","isSupported":false,"feedback":"Contradicted by the archival mortality tables. Cities like St. Louis and Denver had bimodal (two-peak) curves after relaxing restrictions in November."},{"id":"opt-c","label":"Timing made no difference at all; Philadelphia and St. Louis had identical peak weekly death rates in October 1918.","isSupported":false,"feedback":"Contradicted by U.S. Census Weekly Health Index tables: Philadelphia's peak weekly excess death rate (~257/100,000) was roughly 8 times higher than St. Louis's initial October peak (~31/100,000)."}],"takeaway":"Challenge `flu-taubenberger-legacy-2020` (`SYNOPSIS_ONLY`) below to see how pathology/confounder claims narrow while the 43-city JAMA/PNAS/CDC mortality findings remain intact."},"quickLookSummaries":{"question":{"headline":"When a new respiratory pandemic hits, what do school and gathering closures actually change?","text":"Archival records from 43 U.S. cities in 1918–1919 show how early vs. delayed interventions shaped hospital surges—and why lifting restrictions early triggered second waves.","sourceIds":["flu-markel-2007","flu-hatchett-2007"]},"back-then":{"headline":"Autumn 1918: Philadelphia waited until after a 200,000-person parade; St. Louis acted in 48 hours.","text":"Philadelphia's peak weekly excess death rate hit ~257/100,000 after delaying closures until Oct 3. St. Louis closed schools and gatherings on Oct 7, holding its October peak near ~31/100,000—until November reopenings sparked a rebound.","sourceIds":["flu-markel-2007","flu-hatchett-2007","flu-cdc-stacks-1918"]},"debate":{"headline":"Mayors, merchants, and health officers clashed over timing, reopening, and single vs. layered rules.","text":"Officials argued over preemptive closures vs. business disruption, November post-Armistice reopening, and whether gauze masks alone could substitute for closing crowded halls.","sourceIds":["flu-markel-2007","flu-umich-archive"]},"what-happened":{"headline":"Early layered closures cut peak mortality ~50%, but premature relaxation caused bimodal second peaks.","text":"Across 43 cities (115,340 excess deaths), concurrent school + gathering bans strongly reduced peak weekly deaths (r = -0.74), while lifting bans after ~4 weeks caused rebounds in still-susceptible cities.","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007"]},"different-today":{"headline":"Where the analogy breaks: Vaccines, antibiotics for bacterial pneumonia, and viral diagnostics.","text":"In 1918 no flu vaccine, antiviral, or antibiotic existed—so delaying the peak could not bridge citizens to immunization, and secondary bacterial pneumonia went untreated.","sourceIds":["flu-cdc-stacks-1918","flu-taubenberger-legacy-2020"]},"evidence":{"headline":"6 accessible sources: U.S. Census Weekly Health Index, JAMA/PNAS studies, and UMich archive.","text":"Inspect verified mortality records, competing epidemiological models, and 1 provisional unverified claim that must be reviewed and corrected before promotion.","sourceIds":["flu-markel-2007","flu-bootsma-ferguson-2007","flu-hatchett-2007","flu-cdc-stacks-1918","flu-umich-archive","flu-taubenberger-legacy-2020"]}}},{"id":"printing-press","subjectKey":"printing-press","inquiryStatus":"PROVISIONAL","promotedToVerified":false,"title":"The Printing Press, Pamphlet Wars & Early Modern Information Regulation","subtitle":"Gutenberg's Movable Type, the 1643 Licensing Order, Milton's Areopagitica, and the Eisenstein–Johns Debate","theme":"Information revolutions & regulation","place":"Mainz, Wittenberg & London","period":"1450–1695","asOfDate":"2026-11-09","question":"How did the arrival of movable-type printing transform public debate and state censorship—and did print technology itself guarantee reliable knowledge?","summary":"From Gutenberg's 1454–1455 Mainz Bible and Reformation pamphlet campaigns to Parliament's 1643 Licensing Order and John Milton's 1644 Areopagitica, early modern records show that printing dramatically lowered the cost of reproducing arguments—but also triggered rampant piracy, typographical errors, and state pre-publication licensing regimes rather than automatic enlightenment.","hook":"Mainz & London (1450–1695): Explore how movable type fueled pamphlet wars, why England's Parliament imposed pre-publication censorship in 1643, and why historians clash over 'print culture.'","questionBoundary":"Covers European movable-type printing from Gutenberg (c. 1454) through 17th-century English print licensing (1643 Ordinance, 1644 Areopagitica, 1695 lapse of the Licensing Act) and the Eisenstein vs. Johns historiographical debate. Does not adjudicate modern algorithmic social-media recommendation liability.","limits":["Early modern hand-press printing required substantial physical capital (metal type, paper, presses in fixed urban workshops) that state guild wardens (such as London's Stationers' Company) could physically inspect and seize—unlike decentralized digital publishing.","Literacy in 15th–17th century Europe was restricted to a minority of the population, and oral reading in taverns, churches, and marketplaces mediated how printed pamphlets reached ordinary people.","Print technology multiplied both standardized scholarly tables and astrological almanacs, forged polemics, and sectarian conspiracy pamphlets simultaneously."],"questionProfile":{"whyRelevantSummary":"Whenever a new communications medium (from the hand press to the internet and generative AI) disrupts gatekeepers, commentators invoke the printing press—either celebrating inevitable democratization or demanding pre-publication licensing. The 1450–1695 record tests both claims against archival reality.","knownCoverageGaps":["East Asian woodblock and movable metal/ceramic type traditions (China and Korea, 11th–15th centuries) predated Gutenberg under different bureaucratic and script systems not covered in this European dossier.","Post-1710 statutory copyright (Statute of Anne) and 19th-century steam-powered rotary newspapers represent later industrial phases."]},"citizenGuide":{"whyComparable":"Both the 16th–17th century pamphlet explosion and modern digital media lowered the cost of bypassing traditional gatekeepers, sparking intense battles over misinformation, piracy, intellectual property, and state censorship.","whatHappenedBefore":"Before 1450, European texts were copied by hand in monastic and university scriptoria, making books scarce, expensive, and prone to scribal drift over generations.","whatsDifferent":"Early modern presses were physical workshops subject to guild monopolies and search-and-seizure by Stationers' Company wardens, whereas modern digital platforms distribute user content globally in milliseconds via algorithmic feeds.","whatWorked":"Movable type enabled rapid cross-checking of editions, preserved scientific observations across dispersed scholars, and allowed unlicensed pamphlets (including Milton's 1644 Areopagitica) to challenge royal and parliamentary monopolies.","whatFailed":"Parliament's June 14, 1643 Licensing Order failed to halt underground royalist and radical sectarian pamphlets despite search-and-seizure powers, while unregulated commercial printing produced widespread piracy and garbled texts until scholarly credit institutions developed.","howWeKnow":"Library of Congress Gutenberg Bible records, the June 14, 1643 Parliamentary Ordinance for the Regulating of Printing, John Milton's November 23, 1644 Areopagitica, and the 2002 American Historical Review Forum between Elizabeth Eisenstein and Adrian Johns."},"sources":[{"id":"print-gutenberg-loc","title":"Gutenberg Bible (Mainz, c. 1454–1455) Digital Collection & Historical Exhibition","author":"Library of Congress Rare Book and Special Collections Division","url":"https://www.loc.gov/item/2021666734/","type":"primary","coverage":"PRIMARY_EXCERPT","locator":"Library of Congress Item 2021666734 & Exhibition 'The Gutenberg Bible: The First Great Book Printed in Western Europe Using Movable Metal Type'","accessed":"2026-11-09","rights":"Public Domain / Library of Congress Digital Collection","notes":"Primary archival record of Johannes Gutenberg's 42-line Bible printed in Mainz (c. 1454–1455) using oil-based ink and hand-cast movable metal type, establishing how early printed books imitated manuscript illumination while introducing modular type production.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"print-gutenberg-loc","title":"Gutenberg Bible (Mainz, c. 1454–1455) Digital Collection & Historical Exhibition","author":"Library of Congress Rare Book and Special Collections Division","url":"https://www.loc.gov/item/2021666734/","type":"primary","locator":"Library of Congress Item 2021666734 & Exhibition 'The Gutenberg Bible: The First Great Book Printed in Western Europe Using Movable Metal Type'","accessed":"2026-11-09","rights":"Public Domain / Library of Congress Digital Collection","notes":"Primary archival record of Johannes Gutenberg's 42-line Bible printed in Mainz (c. 1454–1455) using oil-based ink and hand-cast movable metal type, establishing how early printed books imitated manuscript illumination while introducing modular type production.","preservation":"CURATOR_CARD_ONLY"},"sha256":"6fef7402369bd9f17fa7f3f86b0016b399843a729bf4a38a4908072fb579be04"},{"id":"print-licensing-1643","title":"An Ordinance of the Lords and Commons Assembled in Parliament, for the Regulating of Printing (June 14, 1643)","author":"Parliament of England (Dartmouth College John Milton Reading Room Primary Text)","url":"https://milton.host.dartmouth.edu/reading_room/areopagitica/intro/order.shtml","type":"primary","coverage":"FULL_TEXT","locator":"Ordinance of 14 June 1643 (Die Mercurii, 14 Junii, 1643), full statutory text granting pre-publication licensing, Stationers' Register entry, and warrantless search-and-seizure powers","accessed":"2026-11-09","rights":"Public Domain historical statute (Creative Commons scholarly edition, Dartmouth College)","notes":"Primary statutory text showing that after abolishing the royal Star Chamber in 1641, the English Parliament re-established pre-publication censorship on June 14, 1643—empowering the Company of Stationers to seize unlicensed presses, break open doors and locks, and arrest authors and printers.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"print-licensing-1643","title":"An Ordinance of the Lords and Commons Assembled in Parliament, for the Regulating of Printing (June 14, 1643)","author":"Parliament of England (Dartmouth College John Milton Reading Room Primary Text)","url":"https://milton.host.dartmouth.edu/reading_room/areopagitica/intro/order.shtml","type":"primary","locator":"Ordinance of 14 June 1643 (Die Mercurii, 14 Junii, 1643), full statutory text granting pre-publication licensing, Stationers' Register entry, and warrantless search-and-seizure powers","accessed":"2026-11-09","rights":"Public Domain historical statute (Creative Commons scholarly edition, Dartmouth College)","notes":"Primary statutory text showing that after abolishing the royal Star Chamber in 1641, the English Parliament re-established pre-publication censorship on June 14, 1643—empowering the Company of Stationers to seize unlicensed presses, break open doors and locks, and arrest authors and printers.","preservation":"CURATOR_CARD_ONLY"},"sha256":"d8c9eef5ef010cb1e80147915626b8577ea2302dddd47ff0e20dc45e66905c08"},{"id":"print-milton-1644","title":"Areopagitica; A Speech of Mr. John Milton for the Liberty of Unlicenc'd Printing, To the Parlament of England (November 23, 1644)","author":"John Milton (Dartmouth College John Milton Reading Room / NYPL Berg Collection)","url":"https://milton.host.dartmouth.edu/reading_room/areopagitica/text.shtml","type":"primary","coverage":"FULL_TEXT","locator":"1644 quarto pamphlet published unlicensed in London (Nov 23, 1644), full text arguing against pre-publication licensing while maintaining post-publication liability and excluding Catholic/royalist works","accessed":"2026-11-09","rights":"Public Domain 1644 text","notes":"Establishes that Milton published Areopagitica unlicensed in defiance of the 1643 Ordinance to argue that pre-publication censors cannot judge truth before a book is read, while documenting the historical boundary that Milton himself did not advocate absolute First Amendment-style neutrality (excluding 'Popery and open superstition').","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"print-milton-1644","title":"Areopagitica; A Speech of Mr. John Milton for the Liberty of Unlicenc'd Printing, To the Parlament of England (November 23, 1644)","author":"John Milton (Dartmouth College John Milton Reading Room / NYPL Berg Collection)","url":"https://milton.host.dartmouth.edu/reading_room/areopagitica/text.shtml","type":"primary","locator":"1644 quarto pamphlet published unlicensed in London (Nov 23, 1644), full text arguing against pre-publication licensing while maintaining post-publication liability and excluding Catholic/royalist works","accessed":"2026-11-09","rights":"Public Domain 1644 text","notes":"Establishes that Milton published Areopagitica unlicensed in defiance of the 1643 Ordinance to argue that pre-publication censors cannot judge truth before a book is read, while documenting the historical boundary that Milton himself did not advocate absolute First Amendment-style neutrality (excluding 'Popery and open superstition').","preservation":"CURATOR_CARD_ONLY"},"sha256":"ca610ca96061de2cb67d7df8425507989d366118160e857aec34a94ba174ae64"},{"id":"print-eisenstein-2002","title":"AHR Forum: An Unacknowledged Revolution Revisited","author":"Elizabeth L. Eisenstein (American Historical Review, Vol. 107, No. 1)","url":"https://histoire.ens.psl.eu/IMG/pdf/eisenstein-revolution_revisited.pdf","type":"scholarship","coverage":"FULL_TEXT","locator":"American Historical Review, Feb 2002, Vol. 107, No. 1, pp. 87–105 (defending and qualifying the thesis of The Printing Press as an Agent of Change, 1979)","accessed":"2026-11-09","rights":"Academic open-access PDF archive (ENS Paris / AHR Forum)","notes":"Argues that compared to scribal hand-copying, movable-type printing introduced qualitative structural shifts in standardization, preservative power ('typographical fixity'), and simultaneous comparison of texts across Europe that enabled the Renaissance, Reformation, and Scientific Revolution.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"print-eisenstein-2002","title":"AHR Forum: An Unacknowledged Revolution Revisited","author":"Elizabeth L. Eisenstein (American Historical Review, Vol. 107, No. 1)","url":"https://histoire.ens.psl.eu/IMG/pdf/eisenstein-revolution_revisited.pdf","type":"scholarship","locator":"American Historical Review, Feb 2002, Vol. 107, No. 1, pp. 87–105 (defending and qualifying the thesis of The Printing Press as an Agent of Change, 1979)","accessed":"2026-11-09","rights":"Academic open-access PDF archive (ENS Paris / AHR Forum)","notes":"Argues that compared to scribal hand-copying, movable-type printing introduced qualitative structural shifts in standardization, preservative power ('typographical fixity'), and simultaneous comparison of texts across Europe that enabled the Renaissance, Reformation, and Scientific Revolution.","preservation":"CURATOR_CARD_ONLY"},"sha256":"479e9d16d82d46946fc6f651c9bb579c62eb482a725f596670104210114133fb"},{"id":"print-johns-2002","title":"AHR Forum: How to Acknowledge a Revolution (The Social Construction of Print Credibility & Piracy)","author":"Adrian Johns (American Historical Review, Vol. 107, No. 1)","url":"https://histoire.ens.fr/IMG/pdf/adrian_johns-printed_revolution_discussed.pdf","type":"scholarship","coverage":"SYNOPSIS_ONLY","locator":"American Historical Review, Feb 2002, Vol. 107, No. 1, pp. 106–125 (synthesizing The Nature of the Book: Print and Knowledge in the Making, 1998 — curated as SYNOPSIS_ONLY to test consequential source challenge)","accessed":"2026-11-09","rights":"Academic open-access PDF archive (curated with SYNOPSIS_ONLY standing to test historiographical narrowing)","notes":"SYNOPSIS_ONLY card representing Adrian Johns's counter-thesis to Eisenstein: argues that 'typographical fixity' was not an intrinsic property of the printing machine, because early modern print workshops were plagued by piracy, unauthorized reprints, and sheet-by-sheet variations, requiring social and institutional conventions (like the Royal Society and Stationers' Hall) to manufacture trust.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"print-johns-2002","title":"AHR Forum: How to Acknowledge a Revolution (The Social Construction of Print Credibility & Piracy)","author":"Adrian Johns (American Historical Review, Vol. 107, No. 1)","url":"https://histoire.ens.fr/IMG/pdf/adrian_johns-printed_revolution_discussed.pdf","type":"scholarship","locator":"American Historical Review, Feb 2002, Vol. 107, No. 1, pp. 106–125 (synthesizing The Nature of the Book: Print and Knowledge in the Making, 1998 — curated as SYNOPSIS_ONLY to test consequential source challenge)","accessed":"2026-11-09","rights":"Academic open-access PDF archive (curated with SYNOPSIS_ONLY standing to test historiographical narrowing)","notes":"SYNOPSIS_ONLY card representing Adrian Johns's counter-thesis to Eisenstein: argues that 'typographical fixity' was not an intrinsic property of the printing machine, because early modern print workshops were plagued by piracy, unauthorized reprints, and sheet-by-sheet variations, requiring social and institutional conventions (like the Royal Society and Stationers' Hall) to manufacture trust.","preservation":"CURATOR_CARD_ONLY"},"sha256":"14965bb05aa9f17777fa873292f342caf26f537421fdd4007babf1927b2ba7c3"}],"facts":[{"id":"printing-press-facts-1","title":"Gutenberg's Movable Metal Type (Mainz, c. 1454–1455): Modular Production vs. Scribal Copying","text":"Johannes Gutenberg's Mainz workshop combined hand-cast reusable metal alloy type, oil-based ink, and a wooden screw press to print the 42-line Bible (c. 1454–1455) in an edition of roughly 180 copies—demonstrating that hundreds of nearly identical copies could be produced in the time a scriptorium needed for a single manuscript.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["print-gutenberg-loc","print-eisenstein-2002"]},{"id":"printing-press-facts-2","title":"Parliament's Licensing Order of June 14, 1643: Revolutionary Censorship Replaced Royal Censorship","text":"Two years after abolishing King Charles I's Court of Star Chamber (1641), the English Parliament faced a flood of unlicensed pamphlets and enacted the Ordinance of June 14, 1643—forbidding any book or pamphlet to be printed without pre-publication approval and registration with the Company of Stationers, and authorizing officers 'to break open Doores and Locks' to seize unlicensed presses.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["print-licensing-1643"]},{"id":"printing-press-facts-3","title":"Milton's Areopagitica (Nov 23, 1644): Unlicensed Protest With Explicit Historical Boundaries","text":"John Milton published Areopagitica on November 23, 1644 without a Stationers' license or printer's name on the title page, arguing to Parliament that pre-publication licensing throttled learning and failed to stop sectarian debates—yet Milton himself explicitly excluded Catholic ('Popery') and defamatory works from his plea for toleration, and Parliament did not repeal the 1643 Order.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["print-milton-1644","print-licensing-1643"]},{"id":"printing-press-facts-4","title":"Piracy, Errata, and the Problem of Trust in Early Modern Print","text":"As Elizabeth Eisenstein and Adrian Johns both document from different angles, commercial printers racing for profit frequently introduced typographical errors, unauthorized abridgments, and pirated editions—forcing early modern authors and scientific societies to invent errata sheets, privilege patents, and institutional registers to establish which printed texts could be trusted.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["print-eisenstein-2002","print-johns-2002"],"survivingTextByWithdrawnSource":{"print-johns-2002":"Surviving full-text basis (`print-eisenstein-2002`, `print-licensing-1643`): Eisenstein (2002, p. 95) and the 1643 Licensing Ordinance independently document that ignorant or unauthorized printers garbled data and printed pirated copies, requiring proficient masters, errata corrige, and Stationers' Company registration."}},{"id":"printing-press-facts-5","title":"Provisional Unverified Claim: Did Gutenberg's press automatically guarantee error-free texts and immediate press freedom?","text":"UNVERIFIED PROVISIONAL CLAIM: The invention of movable-type printing in 1450 automatically guaranteed uniform, error-free scientific texts and led European parliaments to abolish pre-publication censorship as soon as royal absolutism was challenged.","evidenceStatus":"UNVERIFIED_CLAIM","epistemicStatus":"UNVERIFIED_MATERIAL","reviewStatus":"PENDING_REVIEW","verificationPrompt":"This claim commits technological determinism and contradicts both the June 14, 1643 Parliamentary Licensing Order (`print-licensing-1643`) and the Eisenstein–Johns AHR Forum (`print-eisenstein-2002`, `print-johns-2002`). Review and apply the archival correction before promoting.","verifiedCorrection":{"correctedTitle":"Print Multiplied Both Error and Contestation; Parliaments Re-Imposed Licensing in 1643","correctedText":"Verified against the 1643 Parliamentary Ordinance (`print-licensing-1643`), Milton's Areopagitica (`print-milton-1644`), and the 2002 AHR Forum (`print-eisenstein-2002`, `print-johns-2002`): Printing required proofreading, errata systems, and institutional credit to overcome commercial garbling and piracy, and the revolutionary English Parliament re-imposed strict pre-publication licensing in June 1643.","correctedSourceIds":["print-licensing-1643","print-milton-1644","print-eisenstein-2002"]},"sourceIds":["print-licensing-1643","print-eisenstein-2002"]}],"timeline":[{"id":"printing-press-timeline-1","date":"c. 1454–1455","title":"Gutenberg completes the 42-line Bible in Mainz using movable metal type","text":"Gutenberg's workshop prints ~180 copies of the Latin Bible using reusable cast metal type and oil-based ink, launching the rapid spread of hand-press workshops across European cities.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["print-gutenberg-loc"]},{"id":"printing-press-timeline-2","date":"1641-07","title":"Abolition of the royal Court of Star Chamber triggers London pamphlet boom","text":"With royal Star Chamber censorship abolished at the outset of the English Civil War, unlicensed political and religious pamphlets multiply across London.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["print-licensing-1643","print-milton-1644"]},{"id":"printing-press-timeline-3","date":"1643-06-14","title":"Parliament enacts the Ordinance for the Regulating of Printing","text":"To suppress royalist propaganda, radical sects, and book piracy, the Lords and Commons reinstate pre-publication licensing and grant the Stationers' Company search-and-seizure powers.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["print-licensing-1643"]},{"id":"printing-press-timeline-4","date":"1644-11-23","title":"John Milton publishes Areopagitica unlicensed in London","text":"Milton issues his speech to Parliament without a license, arguing that prior restraint empowers fallible bureaucrats and cannot suppress dissenting ideas without destroying learning.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["print-milton-1644"]},{"id":"printing-press-timeline-5","date":"2002-02","title":"American Historical Review Forum: Eisenstein vs. Johns on the 'Print Revolution'","text":"Historians Elizabeth Eisenstein and Adrian Johns debate whether standardization and fixity were inherent powers of print technology or fragile social achievements built against piracy.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["print-eisenstein-2002","print-johns-2002"]}],"historicalArguments":[{"id":"printing-press-arg-1","topic":"Pre-publication licensing vs. unlicensed printing and post-publication accountability (London, 1643–1644)","decisionWindow":"June 1643 Parliamentary Licensing Ordinance and November 1644 Areopagitica response","contemporaryActor":"Parliament & the Company of Stationers vs. John Milton and unlicensed pamphlet printers","contemporaryArgument":"Parliament and the Stationers' Company argued in the June 14, 1643 Ordinance that unregulated printing spread 'scandalous, seditious, and libellous' pamphlets and destroyed stationers' property rights through piracy (`print-licensing-1643`). John Milton argued in Areopagitica (Nov 1644) that no pre-publication licenser possesses the wisdom to censor books before they are published, and that truth emerges only by grappling openly with error (`print-milton-1644`).","policymakerExpectation":"Parliament expected that empowering Stationers' Company wardens to register all books and break open doors to seize unlicensed presses would restore religious uniformity and guild order.","expectationVerdict":"CONTRADICTED_BY_EVENTS","subsequentEvidence":"Despite search-and-seizure powers under the 1643 Ordinance (`print-licensing-1643`), clandestine hand presses and unlicensed tracts—including Milton's own Areopagitica (`print-milton-1644`)—continued to circulate throughout the English Civil War and Interregnum.","laterHistoriography":"Historians note that the 1643 Ordinance fused state ideological censorship with commercial guild monopoly protection (`print-johns-2002`), and that Milton's argument—while foundational for later press freedom—still accepted post-publication punishment and excluded Catholics (`print-milton-1644`).","differenceThatLimits":"17th-century licensing targeted physical printing presses and paper warehouses in London; modern platform regulation involves millions of instantaneous digital posts rather than pre-publication guild inspection.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["print-licensing-1643","print-milton-1644","print-johns-2002"],"survivingTextByWithdrawnSource":{"print-johns-2002":"Surviving primary basis (`print-licensing-1643`, `print-milton-1644`): With `print-johns-2002` withdrawn, the 1643 Ordinance text and Milton's 1644 Areopagitica independently establish how Parliament combined Stationers' Company copyright protection with pre-publication censorship and why unlicensed pamphlets persisted."}},{"id":"printing-press-arg-2","topic":"Did movable type inherently stabilize knowledge ('typographical fixity') or multiply piracy and error?","decisionWindow":"Early modern scientific and religious publishing (1455–1700) & 2002 AHR Historiographical Forum","contemporaryActor":"Elizabeth Eisenstein (typographical fixity thesis) vs. Adrian Johns (social construction of print credibility)","contemporaryArgument":"Elizabeth Eisenstein argued that compared to hand-copied manuscripts, printing created 'typographical fixity' and preservative power—allowing scholars across Europe to inspect identical editions, cross-check tables, and accumulate corrections (`print-eisenstein-2002`). Adrian Johns countered that early modern print was notorious for piracy, unauthorized alterations, and workshop errors, so credibility had to be constructed socially through guilds and scientific societies (`print-johns-2002`).","policymakerExpectation":"Early modern scholars and patrons hoped that putting astronomical tables, anatomical drawings, and scriptures into print would permanently prevent scribal corruption.","expectationVerdict":"MIXED_AND_CONFOUNDED","subsequentEvidence":"Print preserved texts against total loss and allowed uniform editions under skilled masters (`print-eisenstein-2002`), but profit-driven printers also garbled texts and pirated books rapidly (`print-eisenstein-2002`, `print-johns-2002`), forcing states and guilds to enforce privilege patents and registers (`print-licensing-1643`).","laterHistoriography":"The 2002 American Historical Review Forum (`print-eisenstein-2002`, `print-johns-2002`) established that print's revolutionary impact depended on both the material capacity to duplicate texts and the institutional norms (proofreading, errata, credit) developed to govern it.","differenceThatLimits":"Digital text and generative AI reduce the marginal cost of both verbatim copying and synthetic fabrication to near zero, separating reproduction speed even further from evidentiary verification.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["print-gutenberg-loc","print-licensing-1643","print-eisenstein-2002","print-johns-2002"],"survivingTextByWithdrawnSource":{"print-johns-2002":"Surviving full-text basis (`print-gutenberg-loc`, `print-licensing-1643`, `print-eisenstein-2002`): Eisenstein (2002, p. 95) and the 1643 Ordinance independently document both the preservative standardization of print and the garbling/piracy by commercial printers."}},{"id":"printing-press-arg-3","topic":"Monopoly stationers' privileges as a guarantee of quality vs. barrier to public inquiry (1643)","decisionWindow":"1643 Stationers' Company petition and Parliamentary Ordinance","contemporaryActor":"Company of Stationers master printers vs. independent authors and radical pamphleteers","contemporaryArgument":"Supporters of the Stationers' Company monopoly argued that granting exclusive printing privileges and requiring register entry protected the heavy financial investment needed to publish large, accurate scholarly folios (`print-licensing-1643`, `print-johns-2002`). Critics argued that stationers used anti-piracy powers as a pretext to censor religious and political rivals (`print-milton-1644`).","policymakerExpectation":"Parliament expected that tying state censorship enforcement to the commercial self-interest of the Stationers' Company would make the 1643 Ordinance self-enforcing.","expectationVerdict":"SUPPORTED_WITH_LIMITS","subsequentEvidence":"The Stationers' Company enforced the register where its commercial monopolies were threatened, but cheap one-sheet political tracts were printed on portable presses faster than guild wardens could seize them (`print-licensing-1643`, `print-milton-1644`).","laterHistoriography":"Legal and book historians trace modern copyright law to the eventual separation of authors' property rights (Statute of Anne, 1710) from pre-publication state censorship after the Licensing Act lapsed in 1695 (`print-eisenstein-2002`, `print-johns-2002`).","differenceThatLimits":"Modern intellectual property law is legally separate from state pre-publication censorship, though platform takedown notices (DMCA) and content moderation still intersect in practice.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["print-licensing-1643","print-milton-1644","print-eisenstein-2002","print-johns-2002"],"survivingTextByWithdrawnSource":{"print-johns-2002":"Surviving primary/full-text basis (`print-licensing-1643`, `print-milton-1644`, `print-eisenstein-2002`): The 1643 Ordinance text and Milton's Areopagitica directly document the fusion of Stationers' Company copyright privileges with parliamentary pre-publication censorship."}}],"outcomes":[{"id":"printing-press-outcomes-1","text":"Movable-type printing lowered reproduction costs and enabled dispersed scholars to compare standardized editions, illustrations, and errata—accelerating scientific and religious debates across Europe.","causalStatus":"CONFOUNDED_SEQUENCE","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["Expansion of European universities, postal networks, and vernacular literacy","Religious polarization of the Protestant and Catholic Reformations"],"counterfactualGap":"Cannot isolate the mechanical effect of movable type from the institutional networks of proofreaders, universities, and trade fairs that distributed and vetted books.","sourceIds":["print-gutenberg-loc","print-eisenstein-2002"]},{"id":"printing-press-outcomes-2","text":"Parliament's June 14, 1643 Licensing Order re-established pre-publication censorship and warrantless press seizures, yet failed to stop unlicensed printing—culminating in Milton's unlicensed Areopagitica (1644) and the eventual lapse of pre-publication licensing in 1695.","causalStatus":"DOCUMENTED_OUTCOME","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["Civil War political fragmentation preventing unified policing of London print shops","Low capital cost of small clandestine hand presses for short quarto pamphlets"],"counterfactualGap":"While pre-publication licensing failed to stop short pamphlets, post-publication prosecutions for seditious libel continued long after 1695.","sourceIds":["print-licensing-1643","print-milton-1644"]},{"id":"printing-press-outcomes-3","text":"Unregulated commercial printing generated widespread piracy and textual garbling, requiring new social institutions—errata lists, named printers, guild registers, and scientific society peer credit—to establish trustworthiness.","causalStatus":"DOCUMENTED_OUTCOME","epistemicStatus":"DISPUTED_INTERPRETATION","confounders":["Absence of international copyright agreements across early modern European jurisdictions","Economic pressure on print shops to turn over capital rapidly"],"counterfactualGap":"Historians continue to debate whether standardization (Eisenstein) or social credit construction (Johns) was the primary driver of scientific reliability.","sourceIds":["print-eisenstein-2002","print-johns-2002","print-licensing-1643"],"survivingTextByWithdrawnSource":{"print-johns-2002":"Surviving full-text basis (`print-eisenstein-2002`, `print-licensing-1643`): Eisenstein (2002) and the 1643 Licensing Ordinance independently document commercial piracy, garbled reprints, and the institutional role of proofreading and registration."}}],"counterexamples":[{"id":"printing-press-counterexample-1","title":"Revolutionary Parliament Re-Imposing Censorship (The June 14, 1643 Licensing Order)","text":"Overthrowing royal absolutism and abolishing the Star Chamber in 1641 did not produce press freedom: within two years, the revolutionary Parliament enacted the June 14, 1643 Ordinance reinstating pre-publication censorship and warrantless workshop seizures.","failureCondition":"New communication technologies and regime changes do not automatically end censorship when new rulers fear ideological rivals and commercial incumbents seek monopoly protection.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["print-licensing-1643","print-milton-1644"]},{"id":"printing-press-counterexample-2","title":"Commercial Garbling & Piracy in Early Modern Print Workshops","text":"Rather than automatically fixing error-free texts, profit-seeking printers frequently introduced new typos, pirated unfinished manuscripts, and printed counterfeit editions—forcing readers and scholars to treat bare print with skepticism unless backed by trusted imprints and errata.","failureCondition":"Lowering the cost of copying text multiplies errors and counterfeits alongside accurate works unless paired with verification and attribution norms.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["print-eisenstein-2002","print-johns-2002","print-licensing-1643"],"survivingTextByWithdrawnSource":{"print-johns-2002":"Surviving full-text basis (`print-eisenstein-2002`, `print-licensing-1643`): Eisenstein (2002, p. 95) and the 1643 Ordinance preamble explicitly document rapid data garbling by ignorant printers and widespread unauthorized reprints."}}],"interpretations":[{"id":"printing-press-interp-1","title":"Typographical Fixity & Preservative Power School (Elizabeth Eisenstein)","causalEmphasis":"Material standardization, preservation, and cross-comparison enabled by movable type","text":"Argues that compared to fragile scribal copying, movable-type printing created a decisive structural break—preserving texts against loss, standardizing maps and tables, and allowing scholars across Europe to compare conflicting accounts simultaneously.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["print-gutenberg-loc","print-eisenstein-2002"]},{"id":"printing-press-interp-2","title":"Social Construction of Print Credibility School (Adrian Johns)","causalEmphasis":"Institutional credit, guild policing, and reader skepticism in the face of piracy","text":"Counters that 'fixity' was not built into Gutenberg's machine; because early modern print was rife with piracy and workshop variation, trust in printed knowledge had to be painstakingly constructed through social institutions, licensing registers, and scholarly civility.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["print-licensing-1643","print-johns-2002"],"survivingTextByWithdrawnSource":{"print-johns-2002":"Surviving primary/full-text basis (`print-licensing-1643`, `print-eisenstein-2002`): The 1643 Stationers' Register provisions and Eisenstein's 2002 AHR response document the historiographical debate over how piracy and workshop practices shaped trust in print."}},{"id":"printing-press-interp-3","title":"Civic Polemic & Bounded Toleration School (Milton's Areopagitica Tradition)","causalEmphasis":"Critique of prior restraint vs. post-publication accountability","text":"Focuses on how the 1640s pamphlet wars forged the modern distinction between unlawful prior restraint (pre-publication licensing by state censors) and post-publication legal responsibility—while recognizing the historical exclusions inside 17th-century toleration arguments.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["print-licensing-1643","print-milton-1644"]}],"comparison":[{"id":"printing-press-comp-1","dimension":"Reproduction cost drop vs. verification bottleneck","timeframe":"Years/Decades (institutional norms catching up to copying speed)","historical":"Movable type slashed the cost of reproducing text in the 1450s, but it took generations to build proofreading, errata corrige, citation norms, and scientific journals to separate reliable editions from pirated garble.","present":"When digital platforms or generative AI slash the cost of producing text and media, ask what provenance, citation, and verification institutions exist to audit claims.","limit":"Hand-press printing still required physical paper, ink, and typesetting labor for every copy, creating a natural friction absent from zero-marginal-cost digital syndication.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["print-gutenberg-loc","print-eisenstein-2002","print-johns-2002"],"survivingTextByWithdrawnSource":{"print-johns-2002":"Surviving basis (`print-gutenberg-loc`, `print-eisenstein-2002`): Gutenberg archival records and Eisenstein (2002) document the transition from scribal copying to proofreading and errata norms."}},{"id":"printing-press-comp-2","dimension":"Prior restraint (pre-publication licensing) vs. post-publication liability","timeframe":"Immediate censorship order (1643) vs. 52-year struggle until 1695 lapse","historical":"Parliament's 1643 Ordinance required every text to pass a state-approved licenser before printing; Milton's 1644 Areopagitica argued against prior restraint while accepting post-publication legal accountability.","present":"In debates over regulating online speech or AI outputs, distinguish mandatory pre-publication government licensing from post-publication legal liability and provenance disclosure.","limit":"Milton's 1644 argument operated within a 17th-century Protestant parliamentary framework that explicitly excluded Catholic and royalist writings from protection.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["print-licensing-1643","print-milton-1644"]},{"id":"printing-press-comp-3","dimension":"Incumbent commercial intermediaries & state enforcement","timeframe":"Multi-decade guild monopoly (Stationers' Company)","historical":"The 1643 Ordinance deputized an incumbent industry guild (the Company of Stationers) to police smaller rival printers in exchange for protecting the guild's lucrative copyright monopolies.","present":"Ask whether proposed information or AI safety regulations rely on incumbent industry giants to police smaller open-source or independent competitors.","limit":"The Stationers' Company held statutory physical search-and-seizure powers ('to break open Doores and Locks') that private technology companies do not possess.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["print-licensing-1643","print-milton-1644"]},{"id":"printing-press-comp-4","dimension":"Technological determinism vs. reader and institutional practice","timeframe":"Centuries (1450–1700)","historical":"The same printing press produced both Copernicus's astronomical tables and sectarian witch-hunting tracts; outcomes depended on how institutions and readers cross-checked sources.","present":"Avoid assuming a communication technology will automatically enlighten or corrupt society independent of verification tools and educational habits.","limit":"Early modern print circulated without personalized algorithmic engagement ranking or automated bot amplification.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["print-eisenstein-2002","print-johns-2002"],"survivingTextByWithdrawnSource":{"print-johns-2002":"Surviving full-text basis (`print-eisenstein-2002`): Eisenstein (2002, p. 89) explicitly emphasizes that the effects of printing were never self-evident or uniform and depended on skilled editorial and reading practices."}}],"rejectedComparisons":[{"id":"printing-press-rejected-1","failureCode":"TECHNOLOGICAL_DETERMINISM_PRINT_FIXITY_FALLACY","claim":"The invention of the printing press in 1450 automatically eliminated textual errors and fake news, proving that new information technologies naturally self-correct without verification institutions.","whyItFails":"Both the 1643 Licensing Ordinance preamble and the Eisenstein–Johns AHR Forum document that commercial printing multiplied piracy, counterfeit imprints, and rapid data garbling until proofreading, errata systems, and scholarly credit institutions were built.","counterEvidence":"Eisenstein (2002, p. 95), Johns (2002, pp. 109–112), and the June 14, 1643 Parliamentary Ordinance (`print-licensing-1643`).","sourceIds":["print-licensing-1643","print-eisenstein-2002","print-johns-2002"]},{"id":"printing-press-rejected-2","failureCode":"PRE_PUBLICATION_LICENSING_SUCCESS_MYTH","claim":"England's June 1643 Licensing Order successfully halted unlicensed political pamphlets by requiring Stationers' Company registration and pre-publication censor approval.","whyItFails":"Despite empowering officials to break open doors and seize presses, the 1643 Ordinance failed to stop underground pamphlets—including John Milton's own unlicensed Areopagitica in November 1644.","counterEvidence":"John Milton's unlicensed 1644 quarto edition of Areopagitica (`print-milton-1644`).","sourceIds":["print-licensing-1643","print-milton-1644"]}],"consequentialCorrection":{"targetSourceId":"print-johns-2002","targetSourceTitle":"AHR Forum: How to Acknowledge a Revolution (Adrian Johns 2002 — SYNOPSIS_ONLY)","challengeReason":"Source `print-johns-2002` is curated with `SYNOPSIS_ONLY` standing. Challenging its standing tests how historiographical claims about print piracy and social credit narrow to surviving full-text records (`print-eisenstein-2002`, `print-licensing-1643`, `print-milton-1644`)."},"challengePrompts":["Why did the English Parliament re-impose pre-publication licensing in June 1643 just two years after abolishing the royal Star Chamber?","Where do Elizabeth Eisenstein and Adrian Johns actually agree about early modern printing, and where do their causal explanations diverge?","Why did Milton oppose pre-publication licensing in Areopagitica while still excluding certain religious and political works?"],"concepts":[{"term":"Movable Metal Type (c. 1450)","plain":"Individual reusable metal letters cast from a hand mold that could be arranged into pages, inked, printed, and then disassembled to set the next page.","whyItMatters":"Replaced slow hand-copying with modular production, allowing ~180 copies of the Gutenberg Bible to be printed in Mainz by 1455.","sourceIds":["print-gutenberg-loc"]},{"term":"Prior Restraint (Pre-Publication Licensing)","plain":"A law requiring authors and printers to submit every manuscript to an official censor for approval before a single copy may legally be printed.","whyItMatters":"Parliament's June 14, 1643 Licensing Order enforced prior restraint through the Stationers' Company, prompting Milton's 1644 protest in Areopagitica.","sourceIds":["print-licensing-1643","print-milton-1644"]},{"term":"Company of Stationers (Stationers' Register)","plain":"The London guild given a legal monopoly over printing; entering a book in the Stationers' Register secured copyright privilege while enforcing state censorship.","whyItMatters":"Shows how early copyright protection and state censorship were originally fused together inside a single industry guild.","sourceIds":["print-licensing-1643","print-johns-2002"]},{"term":"Typographical Fixity vs. Print Piracy","plain":"'Typographical fixity' is historian Elizabeth Eisenstein's term for print's ability to preserve identical texts; Adrian Johns countered that rampant piracy and workshop errors meant readers could not automatically trust a printed page.","whyItMatters":"Demonstrates that technology alone does not guarantee truth without editorial standards, errata, and accountable attribution.","sourceIds":["print-eisenstein-2002","print-johns-2002"]}],"exhibit":{"title":"Early Modern Print Architecture: Production Speed, Guild Licensing (1643), and Historiographical Debate","provenanceLabel":"DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH. Grounded in Library of Congress Gutenberg records (print-gutenberg-loc), the June 14, 1643 Parliamentary Ordinance (print-licensing-1643), Milton's 1644 Areopagitica (print-milton-1644), and the 2002 AHR Forum (print-eisenstein-2002, print-johns-2002).","isOriginalFacsimile":false,"sourceIds":["print-gutenberg-loc","print-licensing-1643","print-milton-1644","print-eisenstein-2002","print-johns-2002"],"hotspots":[{"id":"print-hs-1","label":"1. Mainz Movable-Type Workshop (c. 1454–1455)","detail":"Gutenberg's 42-line Bible (~180 copies) proved modular metal type could reproduce texts across Europe far faster than monastic scriptoria.","sourceIds":["print-gutenberg-loc"]},{"id":"print-hs-2","label":"2. June 14, 1643: Parliamentary Licensing Order","detail":"After abolishing the royal Star Chamber in 1641, Parliament reinstated pre-publication licensing and empowered Stationers' wardens to break locks and seize unlicensed presses.","sourceIds":["print-licensing-1643"]},{"id":"print-hs-3","label":"3. Nov 23, 1644: Milton's Unlicensed Areopagitica","detail":"Issued without a license or printer's name, Milton argued against prior restraint—though he still excluded Catholic works and accepted post-publication liability.","sourceIds":["print-milton-1644"]},{"id":"print-hs-4","label":"4. 2002 AHR Forum: Eisenstein vs. Johns","detail":"Eisenstein emphasized print's preservative standardization ('fixity'); Johns emphasized how piracy and garbling forced society to build new credit and verification norms.","sourceIds":["print-eisenstein-2002","print-johns-2002"]}]},"sourceChallenge":{"title":"Investigate the Sources: Did the 1643 Licensing Order protect truth or guild monopoly?","question":"Compare the text of Parliament's June 14, 1643 Licensing Order (`print-licensing-1643`) with John Milton's November 1644 Areopagitica (`print-milton-1644`) and the 2002 AHR Forum (`print-eisenstein-2002`). What do the primary records show?","primarySourceId":"print-licensing-1643","targetSourceId":"print-johns-2002","options":[{"id":"opt-a","label":"The 1643 Ordinance combined state pre-publication censorship with Stationers' Company monopoly enforcement (including breaking locks to seize presses), yet failed to stop unlicensed tracts like Milton's Areopagitica.","isSupported":true,"feedback":"Correct. The 1643 statutory text explicitly protects Stationers' Company book privileges while granting search-and-seizure powers, and Milton's 1644 unlicensed quarto demonstrates how underground printing persisted."},{"id":"opt-b","label":"The English Parliament abolished all censorship permanently in 1641 and never required pre-publication licensing.","isSupported":false,"feedback":"Contradicted by the June 14, 1643 Ordinance for the Regulating of Printing, which reinstated strict pre-publication licensing just two years after Star Chamber was abolished."},{"id":"opt-c","label":"Movable type guaranteed that every early modern printed book was free of errors and piracy without needing proofreading or errata.","isSupported":false,"feedback":"Contradicted by both Eisenstein (2002) and Johns (2002) as well as the 1643 Ordinance preamble."}],"takeaway":"Challenge `print-johns-2002` (`SYNOPSIS_ONLY`) below to see how co-cited claims narrow cleanly to the full-text 1643 Ordinance, 1644 Areopagitica, and Eisenstein (2002) records."},"quickLookSummaries":{"question":{"headline":"When a new technology slashes the cost of publishing, how do societies handle error and censorship?","text":"From Gutenberg's 1455 press to Parliament's 1643 Licensing Order and Milton's 1644 Areopagitica, early modern print history shows why new media trigger both knowledge booms and censorship battles.","sourceIds":["print-gutenberg-loc","print-licensing-1643","print-milton-1644"]},"back-then":{"headline":"1455–1644: From Mainz movable type to London's pamphlet wars and unlicensed protest.","text":"Gutenberg's press multiplied books across Europe. When England abolished royal censorship in 1641, pamphlets exploded—leading Parliament in June 1643 to re-impose pre-publication licensing, which Milton defied in Areopagitica (1644).","sourceIds":["print-gutenberg-loc","print-licensing-1643","print-milton-1644"]},"debate":{"headline":"Prior restraint vs. open debate, and 'typographical fixity' vs. commercial piracy.","text":"Parliament and the Stationers' Guild argued pre-publication licensing prevented heresy and piracy; Milton argued no censor was infallible; later historians Eisenstein and Johns debated whether print itself stabilized truth.","sourceIds":["print-licensing-1643","print-milton-1644","print-eisenstein-2002","print-johns-2002"]},"what-happened":{"headline":"Pre-publication licensing failed to stop underground pamphlets, while scholars built new verification norms.","text":"Portable presses evaded Stationers' seizures until licensing lapsed in 1695, while errata lists, named imprints, and scientific societies emerged to counter commercial garbling and piracy.","sourceIds":["print-licensing-1643","print-milton-1644","print-eisenstein-2002"]},"different-today":{"headline":"Where the analogy breaks: Physical workshops vs. zero-cost algorithmic distribution.","text":"17th-century censors policed physical printing presses and paper warehouses, whereas modern digital networks distribute synthetic and user content globally without physical choke points.","sourceIds":["print-licensing-1643","print-eisenstein-2002"]},"evidence":{"headline":"5 accessible sources: LoC Gutenberg archive, 1643 Ordinance, 1644 Areopagitica, and 2002 AHR Forum.","text":"Inspect verified primary texts, the Eisenstein–Johns historiographical debate, and 1 provisional unverified claim that must be reviewed and corrected before promotion.","sourceIds":["print-gutenberg-loc","print-licensing-1643","print-milton-1644","print-eisenstein-2002","print-johns-2002"]}}},{"id":"dust-bowl-1930s","subjectKey":"dust-bowl-1930s","inquiryStatus":"PROVISIONAL","promotedToVerified":false,"title":"The 1930s Dust Bowl, Ecological Collapse & New Deal Soil Conservation","subtitle":"Great Plains Sod-Busting, Multi-Year Drought, the 1935 Soil Conservation Act, and Long-Run Economic Scarring","theme":"Environment, policy & adaptation","place":"American Great Plains","period":"1930–1940","asOfDate":"2026-11-09","question":"What caused the 1930s Dust Bowl on the American Great Plains, what did New Deal conservation planners try, and why did severe topsoil loss leave decades-long economic scars?","summary":"Federal reports (the 1935 Soil Conservation Act and 1936 Great Plains Committee Report), climate reconstructions, and census-linked county economic records (Hornbeck 2012) show that the Dust Bowl resulted from the interaction of deep 1930s drought anomalies with vulnerable plowed-up shortgrass prairie—and that despite New Deal conservation districts, severely eroded counties suffered a persistent 28%–30% drop in agricultural land values and adjusted primarily through population out-migration.","hook":"Southern & High Plains (1930–1940): Explore how 160-acre homestead rules, mechanized wheat plowing, and record drought created 'Black Blizzards'—and what federal soil conservation could and could not fix.","questionBoundary":"Covers the 1930–1940 American Great Plains drought and wind-erosion crisis, the Soil Conservation Act of April 27, 1935 (Public Law 74-46), the 1936 Great Plains Committee Report, and long-run county economic adjustments (1930–1992). Does not project future global climate-change temperature trajectories.","limits":["Once 1930s windstorms stripped inches of accumulated prairie topsoil down to subsoil or hardpan, agronomic conservation techniques (contour plowing, strip cropping) could slow further loss but could not rapidly regenerate lost topsoil.","1930s Great Plains dryland farming operated before post-WWII deep-well centrifugal irrigation from the Ogallala Aquifer transformed Plains agriculture.","High farm tenancy, short-term mortgages, and small 160-acre/320-acre homestead plots constrained individual farmers' ability to shift from annual wheat to perennial grazing even when subsidized."],"questionProfile":{"whyRelevantSummary":"When regions confront compounding environmental and economic shocks (drought, soil exhaustion, or groundwater depletion), the 1930s Dust Bowl tests whether emergency technical subsidies can restore damaged natural capital in the short run or whether long-run adjustment occurs through migration and structural land-use change.","knownCoverageGaps":["Post-1950 fossil groundwater depletion of the Ogallala Aquifer created a distinct hydrological vulnerability that did not exist during the 1930s surface-drought crisis.","Canadian Prairie Provinces (the Palliser's Triangle drought of the 1930s) operated under different federal rehabilitation statutes (PFRA, 1935) not bound in this U.S. county dataset."]},"citizenGuide":{"whyComparable":"Both 1930s Great Plains conservation planners and modern climate/agricultural policymakers must distinguish between temporary weather shocks and permanent natural-capital degradation—and confront why local credit and land-tenure incentives resist long-term adaptation.","whatHappenedBefore":"Encouraged by the Homestead Acts, high WWI wheat prices, and 1920s wet years, settlers and mechanized 'suitcase farmers' plowed millions of acres of native drought-resistant buffalo grass across the semi-arid Plains.","whatsDifferent":"Modern Plains agriculture relies heavily on center-pivot groundwater irrigation, federal crop insurance, and satellite soil monitoring, whereas 1930s dryland farmers faced the Great Depression credit collapse without irrigation.","whatWorked":"The Soil Conservation Act of April 27, 1935 created the permanent Soil Conservation Service (NRCS), established local conservation districts, purchased ~11.3 million acres of submarginal eroded land for National Grasslands, and reduced wind-erosion vulnerability when rains returned.","whatFailed":"Federal demonstration projects and subsidies failed to induce rapid shift from crops to livestock or restore pre-1930 land values in high-erosion counties: Hornbeck (2012) established that severely eroded counties lost 28%–30% of land value permanently through 1992, with adjustment occurring mainly via population out-migration.","howWeKnow":"The Soil Conservation Act of 1935 (49 Stat. 163), the 1936 Great Plains Committee Report (H. Doc. 75-144), Richard Hornbeck's 2012 American Economic Review county-level study, NIH PMC synthesis of Worster vs. Cunfer historiography, and the National Drought Mitigation Center archive."},"sources":[{"id":"dust-scs-act-1935","title":"Soil Conservation Act of April 27, 1935 (Public Law 74-46, 49 Stat. 163) & USDA NRCS Institutional History","author":"U.S. Congress & USDA Natural Resources Conservation Service (NRCS)","url":"https://www.nrcs.usda.gov/about/history/brief-history-nrcs","type":"primary","coverage":"FULL_TEXT","locator":"Public Law 74-46 (April 27, 1935, 49 Stat. 163) & NRCS Historical Summary (establishment of the Soil Conservation Service under Hugh Hammond Bennett after the March–April 1935 dust storms)","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Establishes that following the March 1935 dust storms and April 14, 1935 'Black Sunday' storm, Congress enacted Public Law 74-46 on April 27, 1935, declaring soil and moisture wastage 'a menace to the national welfare' and establishing the Soil Conservation Service (SCS) as a permanent USDA agency.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"dust-scs-act-1935","title":"Soil Conservation Act of April 27, 1935 (Public Law 74-46, 49 Stat. 163) & USDA NRCS Institutional History","author":"U.S. Congress & USDA Natural Resources Conservation Service (NRCS)","url":"https://www.nrcs.usda.gov/about/history/brief-history-nrcs","type":"primary","locator":"Public Law 74-46 (April 27, 1935, 49 Stat. 163) & NRCS Historical Summary (establishment of the Soil Conservation Service under Hugh Hammond Bennett after the March–April 1935 dust storms)","accessed":"2026-11-09","rights":"U.S. Government Public Domain","notes":"Establishes that following the March 1935 dust storms and April 14, 1935 'Black Sunday' storm, Congress enacted Public Law 74-46 on April 27, 1935, declaring soil and moisture wastage 'a menace to the national welfare' and establishing the Soil Conservation Service (SCS) as a permanent USDA agency.","preservation":"CURATOR_CARD_ONLY"},"sha256":"ab37b636ecadb36bd615d744da28a974fe7f9f7d892d9e1fdab2cf4731110435"},{"id":"dust-great-plains-1936","title":"The Future of the Great Plains — Report of the Great Plains Committee (H. Doc. 75-144, 1936)","author":"Great Plains Drought Area Committee / Morris Llewellyn Cooke, Chair (Presidential & Congressional Report)","url":"https://www.presidency.ucsb.edu/documents/summary-the-great-plains-drought-area-committees-preliminary-report-and-conclusions","type":"primary","coverage":"PRIMARY_EXCERPT","locator":"Preliminary Report Summary (Aug 27, 1936) & House Document 75-144 (Dec 1936), institutional diagnosis of 160-acre Homestead allotments, overgrazing, speculative sod-busting, and federal land-use recommendations","accessed":"2026-11-09","rights":"Public Domain presidential & congressional document (American Presidency Project / GovInfo)","notes":"Primary 1936 federal inquiry concluding that the Dust Bowl resulted not merely from drought, but from applying humid-region 160-acre homestead laws, short-term tenancy, and speculative wheat cultivation to a semi-arid grassland ecology.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"dust-great-plains-1936","title":"The Future of the Great Plains — Report of the Great Plains Committee (H. Doc. 75-144, 1936)","author":"Great Plains Drought Area Committee / Morris Llewellyn Cooke, Chair (Presidential & Congressional Report)","url":"https://www.presidency.ucsb.edu/documents/summary-the-great-plains-drought-area-committees-preliminary-report-and-conclusions","type":"primary","locator":"Preliminary Report Summary (Aug 27, 1936) & House Document 75-144 (Dec 1936), institutional diagnosis of 160-acre Homestead allotments, overgrazing, speculative sod-busting, and federal land-use recommendations","accessed":"2026-11-09","rights":"Public Domain presidential & congressional document (American Presidency Project / GovInfo)","notes":"Primary 1936 federal inquiry concluding that the Dust Bowl resulted not merely from drought, but from applying humid-region 160-acre homestead laws, short-term tenancy, and speculative wheat cultivation to a semi-arid grassland ecology.","preservation":"CURATOR_CARD_ONLY"},"sha256":"4b1ca2bd81b302fdc9aa04b9c51d282635d9cf6ce788273d74030b52aaf7c539"},{"id":"dust-hornbeck-2012","title":"The Enduring Impact of the American Dust Bowl: Short- and Long-Run Adjustments to Environmental Catastrophe","author":"Richard Hornbeck (American Economic Review / Harvard University Open Access)","url":"https://dash.harvard.edu/bitstreams/7312037c-ec77-6bd4-e053-0100007fdf3b/download","type":"scholarship","coverage":"FULL_TEXT","locator":"American Economic Review, 2012, Vol. 102, No. 4, pp. 1477–1507 (analysis of 779 Great Plains counties comparing high-, medium-, and low-erosion counties from 1910 to 1992)","accessed":"2026-11-09","rights":"Open Access via Harvard DASH repository","notes":"Establishes from U.S. Census of Agriculture and Soil Conservation Service erosion maps that relative to low-erosion counties in the same state, high-erosion counties suffered an immediate and persistent 28%–30% decline in agricultural land values from 1940 through 1992, slow/incomplete shift from crops to hay/livestock due to credit and tenancy constraints, and large population out-migration (~12% drop by 1940).","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"dust-hornbeck-2012","title":"The Enduring Impact of the American Dust Bowl: Short- and Long-Run Adjustments to Environmental Catastrophe","author":"Richard Hornbeck (American Economic Review / Harvard University Open Access)","url":"https://dash.harvard.edu/bitstreams/7312037c-ec77-6bd4-e053-0100007fdf3b/download","type":"scholarship","locator":"American Economic Review, 2012, Vol. 102, No. 4, pp. 1477–1507 (analysis of 779 Great Plains counties comparing high-, medium-, and low-erosion counties from 1910 to 1992)","accessed":"2026-11-09","rights":"Open Access via Harvard DASH repository","notes":"Establishes from U.S. Census of Agriculture and Soil Conservation Service erosion maps that relative to low-erosion counties in the same state, high-erosion counties suffered an immediate and persistent 28%–30% decline in agricultural land values from 1940 through 1992, slow/incomplete shift from crops to hay/livestock due to credit and tenancy constraints, and large population out-migration (~12% drop by 1940).","preservation":"CURATOR_CARD_ONLY"},"sha256":"097d441c70e401b321a8245bccc264f4dfc61e7161e924b8ff97cbadf202b6fb"},{"id":"dust-mcleman-worster-cunfer-2014","title":"What We Learned from the Dust Bowl: Lessons in Science, Policy, and Adaptation (Worster vs. Cunfer Historiographical Synthesis)","author":"Robert A. McLeman, Jane Dupre, Lea Berrang Ford, James Ford, Konrad Gajewski, and Gregory Marchildon (Population and Environment / NIH PMC)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC4015056/","type":"scholarship","coverage":"SYNOPSIS_ONLY","locator":"Population and Environment (2014), 35(4):417–440, PMC4015056, Table 1 & Sections 2–4 (synthesizing Donald Worster's 1979 capitalist land-use thesis vs. Geoff Cunfer's 2005 GIS/climatic drought thesis — curated as SYNOPSIS_ONLY to test consequential source challenge)","accessed":"2026-11-09","rights":"Open Access via NIH PubMed Central (curated with SYNOPSIS_ONLY standing to test historiographical narrowing)","notes":"SYNOPSIS_ONLY card comparing the major competing historiographical explanations of the Dust Bowl: Donald Worster's argument that mechanized agro-capitalism caused an ecological disaster vs. Geoff Cunfer's county-level GIS demonstration that dust storms tracked extreme 1930s temperature/precipitation anomalies across both plowed and unplowed counties.","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"dust-mcleman-worster-cunfer-2014","title":"What We Learned from the Dust Bowl: Lessons in Science, Policy, and Adaptation (Worster vs. Cunfer Historiographical Synthesis)","author":"Robert A. McLeman, Jane Dupre, Lea Berrang Ford, James Ford, Konrad Gajewski, and Gregory Marchildon (Population and Environment / NIH PMC)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC4015056/","type":"scholarship","locator":"Population and Environment (2014), 35(4):417–440, PMC4015056, Table 1 & Sections 2–4 (synthesizing Donald Worster's 1979 capitalist land-use thesis vs. Geoff Cunfer's 2005 GIS/climatic drought thesis — curated as SYNOPSIS_ONLY to test consequential source challenge)","accessed":"2026-11-09","rights":"Open Access via NIH PubMed Central (curated with SYNOPSIS_ONLY standing to test historiographical narrowing)","notes":"SYNOPSIS_ONLY card comparing the major competing historiographical explanations of the Dust Bowl: Donald Worster's argument that mechanized agro-capitalism caused an ecological disaster vs. Geoff Cunfer's county-level GIS demonstration that dust storms tracked extreme 1930s temperature/precipitation anomalies across both plowed and unplowed counties.","preservation":"CURATOR_CARD_ONLY"},"sha256":"0c67fd0d8cb65d4a50aabbef94a70e5c41284543f6ca89ed01953795c09089b8"},{"id":"dust-ndmc-archive","title":"The Dust Bowl Historical Archive: Drought Climatology, Black Blizzards & New Deal Shelterbelts","author":"National Drought Mitigation Center (University of Nebraska–Lincoln)","url":"https://drought.unl.edu/dustbowl/","type":"institution","coverage":"FULL_TEXT","locator":"NDMC Dust Bowl Portal (1931–1940 multi-wave drought chronology, 1934–1935 Black Blizzards, Prairie States Forestry Project shelterbelts, and 1940s return of rainfall)","accessed":"2026-11-09","rights":"Publicly accessible institutional research archive (UNL)","notes":"Documents the physical climatology of the four distinct 1930s drought waves (1930–31, 1934, 1936, 1939–40) and the Prairie States Forestry Project (planting >200 million trees across 18,600 miles of shelterbelts).","preservation":"CURATOR_CARD_ONLY","snapshotLabel":"Preserved citation and curator note; not a copy of the historical document","card":{"id":"dust-ndmc-archive","title":"The Dust Bowl Historical Archive: Drought Climatology, Black Blizzards & New Deal Shelterbelts","author":"National Drought Mitigation Center (University of Nebraska–Lincoln)","url":"https://drought.unl.edu/dustbowl/","type":"institution","locator":"NDMC Dust Bowl Portal (1931–1940 multi-wave drought chronology, 1934–1935 Black Blizzards, Prairie States Forestry Project shelterbelts, and 1940s return of rainfall)","accessed":"2026-11-09","rights":"Publicly accessible institutional research archive (UNL)","notes":"Documents the physical climatology of the four distinct 1930s drought waves (1930–31, 1934, 1936, 1939–40) and the Prairie States Forestry Project (planting >200 million trees across 18,600 miles of shelterbelts).","preservation":"CURATOR_CARD_ONLY"},"sha256":"99d39060c98a3e9594aa589fe87fc1a2520ea96950fa53300c3b35850857544e"}],"facts":[{"id":"dust-bowl-1930s-facts-1","title":"The 1936 Great Plains Committee Diagnosis: Humid-Region Homestead Rules on Semi-Arid Grasslands","text":"The 1936 federal Great Plains Committee Report (H. Doc. 75-144) concluded that 19th- and early-20th-century settlement policies—specifically 160-acre Homestead allotments too small for dryland ranching, speculative tractor plowing of native shortgrass sod during the 1920s wet period, and short-term farm tenancy—left millions of acres exposed when severe drought returned in 1931–1936.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["dust-great-plains-1936","dust-ndmc-archive"]},{"id":"dust-bowl-1930s-facts-2","title":"The Soil Conservation Act of April 27, 1935 (Public Law 74-46)","text":"After dust plumes from the Great Plains darkened Washington, D.C. during congressional hearings in March 1935 and the April 14, 1935 'Black Sunday' storm swept the Southern Plains, Congress passed the Soil Conservation Act on April 27, 1935 (49 Stat. 163), creating the Soil Conservation Service (SCS) to run demonstration projects, contour-plowing programs, and federal purchase of submarginal eroded land.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["dust-scs-act-1935"]},{"id":"dust-bowl-1930s-facts-3","title":"Permanent Natural-Capital Loss: 28%–30% Persistent Land-Value Decline Through 1992","text":"Comparing 779 Great Plains counties by 1930s cumulative wind-erosion severity, Richard Hornbeck (2012) established that relative to low-erosion counties in the same state, high-erosion counties experienced an immediate 30% drop in per-acre agricultural land value by 1940—and that 28%–30% relative value loss persisted through 1992 because stripped topsoil could not be quickly regenerated.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["dust-hornbeck-2012"]},{"id":"dust-bowl-1930s-facts-4","title":"Adjustment Through Out-Migration Rather Than Rapid On-Farm Crop Reallocation","text":"Empirical county census data (Hornbeck 2012) show that instead of rapidly shifting from wheat to hay and cattle during the 1930s–1940s (which required capital, larger acreage, and long-term tenure that credit-strapped tenants lacked), severely eroded counties adjusted primarily through population out-migration—losing roughly 12% of their population relative to low-erosion counties between 1930 and 1940.","evidenceStatus":"DOCUMENTED","epistemicStatus":"VERIFIED_EVIDENCE","reviewStatus":"VERIFIED_PRIMARY","sourceIds":["dust-hornbeck-2012","dust-great-plains-1936"]},{"id":"dust-bowl-1930s-facts-5","title":"Provisional Unverified Claim: Did New Deal soil conservation projects rapidly restore 1930s land values and stop Plains out-migration?","text":"UNVERIFIED PROVISIONAL CLAIM: The 1935 Soil Conservation Service demonstration projects and shelterbelts quickly restored eroded Great Plains topsoil to pre-1930 productivity by 1940, preventing long-term land-value losses or population decline in high-erosion counties.","evidenceStatus":"UNVERIFIED_CLAIM","epistemicStatus":"UNVERIFIED_MATERIAL","reviewStatus":"PENDING_REVIEW","verificationPrompt":"This claim contradicts Hornbeck's (2012) 779-county agricultural census dataset (`dust-hornbeck-2012`). Inspect `dust-hornbeck-2012` and `dust-scs-act-1935` and apply the primary/empirical correction before promoting.","verifiedCorrection":{"correctedTitle":"SCS Reduced Future Vulnerability, But Stripped Topsoil Caused Persistent 28%–30% Land-Value Loss","correctedText":"Verified against Hornbeck (2012) and USDA NRCS records (`dust-hornbeck-2012`, `dust-scs-act-1935`): While SCS conservation districts and federal land purchases reduced future wind-erosion vulnerability when rains returned in the 1940s, already-eroded counties suffered a permanent 28%–30% relative decline in agricultural land values from 1940 through 1992 and a ~12% relative population loss.","correctedSourceIds":["dust-hornbeck-2012","dust-scs-act-1935"]},"sourceIds":["dust-hornbeck-2012","dust-scs-act-1935"]}],"timeline":[{"id":"dust-bowl-1930s-timeline-1","date":"1914–1929","title":"Great Plow-Up: Mechanized tractors and high wheat prices convert millions of acres of Plains sod","text":"During an unusually wet decade and WWI wheat boom, settlers and absentee 'suitcase farmers' plow up native drought-resistant shortgrass prairie across the Southern and High Plains.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-great-plains-1936","dust-ndmc-archive"]},{"id":"dust-bowl-1930s-timeline-2","date":"1931–1934","title":"Multi-wave drought kills crops and leaves pulverized topsoil bare to Plains winds","text":"Severe precipitation deficits and record summer heat desiccate plowed fields; by May 1934, massive 'Black Blizzards' carry Great Plains topsoil across the eastern United States.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-ndmc-archive","dust-scs-act-1935"]},{"id":"dust-bowl-1930s-timeline-3","date":"1935-04-14 to 1935-04-27","title":"'Black Sunday' dust storm (April 14) and enactment of the Soil Conservation Act (April 27)","text":"Two weeks after the worst dust storm of the decade ('Black Sunday'), President Roosevelt signs Public Law 74-46 creating the permanent Soil Conservation Service in USDA.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-scs-act-1935"]},{"id":"dust-bowl-1930s-timeline-4","date":"1936-08 to 1936-12","title":"Great Plains Committee issues 'The Future of the Great Plains' report","text":"Federal investigators conclude that 160-acre homestead policies, overgrazing, and speculative cash-crop tenancy mismatched human land use to the semi-arid Plains climate.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-great-plains-1936"]},{"id":"dust-bowl-1930s-timeline-5","date":"1940–1992","title":"Long-run census tracking reveals persistent land-value scarring despite return of rain","text":"Even after rainfall recovers in the 1940s and post-WWII irrigation expands, counties with severe 1930s topsoil loss retain a 28%–30% relative agricultural land-value deficit through 1992.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-hornbeck-2012"]}],"historicalArguments":[{"id":"dust-bowl-1930s-arg-1","topic":"Human land-use failure (sod-busting & 160-acre homesteads) vs. extreme climatic drought anomaly (1930s–present)","decisionWindow":"1936 Great Plains Committee inquiry and subsequent environmental historiography","contemporaryActor":"Great Plains Committee & Donald Worster (agro-ecological critique) vs. traditional boosters and Geoff Cunfer (climatic-anomaly school)","contemporaryArgument":"The 1936 Great Plains Committee argued that federal homestead laws (160-acre plots), speculative tractor plowing of native grass, and tenant farming turned a recurring Plains drought into an unprecedented man-made soil catastrophe (`dust-great-plains-1936`). Boosters argued the crisis was a temporary freak drought, while later historian Geoff Cunfer argued from county GIS records that dust storms occurred even in counties with high remaining unplowed pasture where rainfall dropped most severely (`dust-mcleman-worster-cunfer-2014`, `dust-ndmc-archive`).","policymakerExpectation":"New Deal planners expected that retiring submarginal cropland into permanent grass and reforming land-tenure sizes would prevent future dust bowls during subsequent droughts.","expectationVerdict":"SUPPORTED_WITH_LIMITS","subsequentEvidence":"Retiring ~11.3 million submarginal acres into National Grasslands and adopting conservation tillage reduced dust-storm severity in the 1950s drought (`dust-scs-act-1935`, `dust-ndmc-archive`), but climatological reconstructions confirmed that 1930s sea-surface temperature anomalies and feedback from bare dust-producing soils combined both climatic and human causes (`dust-mcleman-worster-cunfer-2014`).","laterHistoriography":"Environmental historians remain divided in emphasis between Donald Worster's critique of market-driven monoculture and Geoff Cunfer's demonstration of primary climatic forcing, while agreeing that plowing native sod multiplied topsoil vulnerability (`dust-mcleman-worster-cunfer-2014`, `dust-great-plains-1936`).","differenceThatLimits":"Post-1950 Plains agriculture shifted risk from surface-soil wind erosion to deep groundwater depletion of the fossil Ogallala Aquifer, which the 1936 Committee did not foresee.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["dust-great-plains-1936","dust-scs-act-1935","dust-ndmc-archive","dust-mcleman-worster-cunfer-2014"],"survivingTextByWithdrawnSource":{"dust-mcleman-worster-cunfer-2014":"Surviving primary/institutional basis (`dust-great-plains-1936`, `dust-scs-act-1935`, `dust-ndmc-archive`): With `dust-mcleman-worster-cunfer-2014` withdrawn, the 1936 Great Plains Committee Report and NDMC climatological archive independently document the interaction of 160-acre sod-busting with the 1931–1940 multi-wave drought."}},{"id":"dust-bowl-1930s-arg-2","topic":"Technical soil-conservation demonstrations vs. structural credit, tenancy, and persistent natural-capital loss (1935–1992)","decisionWindow":"1935–1940 Soil Conservation Service rollout and decadal agricultural census evaluations","contemporaryActor":"USDA Soil Conservation Service agronomists vs. credit-constrained tenant farmers and economic historians (Hornbeck 2012)","contemporaryArgument":"USDA and SCS leaders argued in 1935–1936 that teaching farmers contour plowing, terracing, strip cropping, and shifting eroded land from wheat to pasture/cattle would restore farm productivity and stabilize rural populations (`dust-scs-act-1935`, `dust-great-plains-1936`). Field economists warned that tenant farmers on 1-year leases and debt-burdened smallholders lacked the capital and land scale required to invest in multi-year soil recovery or livestock (`dust-great-plains-1936`, `dust-hornbeck-2012`).","policymakerExpectation":"New Deal officials expected conservation districts and AAA/SCS subsidies to drive rapid on-farm land-use adjustment and recover agricultural land values once rains returned.","expectationVerdict":"CONTRADICTED_BY_EVENTS","subsequentEvidence":"Hornbeck's (2012) analysis of 779 Plains counties proved that severely eroded counties experienced a permanent 28%–30% decline in land values from 1940 through 1992, recovered less than 25% of their initial agricultural cost through crop-to-livestock reallocation, and adjusted mainly through a ~12% population out-migration (`dust-hornbeck-2012`).","laterHistoriography":"Economic and environmental historians conclude that while SCS practices curbed active blowing dust (`dust-scs-act-1935`), irreversible topsoil loss coupled with credit and tenancy frictions meant that local agricultural adaptation was slow and incomplete (`dust-hornbeck-2012`).","differenceThatLimits":"1930s farmers faced the simultaneous collapse of rural unit banks during the Great Depression; modern agricultural adaptation programs operate alongside federal crop insurance and national farm-credit systems.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["dust-scs-act-1935","dust-great-plains-1936","dust-hornbeck-2012"]},{"id":"dust-bowl-1930s-arg-3","topic":"Federal land retirement & voluntary local conservation districts vs. mandatory federal land-use zoning (1936–1938)","decisionWindow":"1936 Great Plains Committee recommendations and 1937 Standard State Soil Conservation Districts Law","contemporaryActor":"Advocates of federal/state land-use regulation vs. local farm bureaus and voluntary district proponents","contemporaryArgument":"Some New Deal planners and the Great Plains Committee argued that preventing absentee 'suitcase farmers' from replowing fragile Plains land required enforceable land-use zoning and federal purchase of submarginal tracts (`dust-great-plains-1936`). Local landowners opposed federal coercion, leading President Roosevelt in February 1937 to propose the Standard State Soil Conservation Districts Law relying on locally elected farmer districts (`dust-scs-act-1935`).","policymakerExpectation":"Roosevelt and USDA expected locally governed conservation districts—backed by technical aid and targeted federal buyouts of the worst tracts—to win farmer participation where federal mandates would face resistance.","expectationVerdict":"MIXED_AND_CONFOUNDED","subsequentEvidence":"States rapidly enacted soil conservation district laws and the federal government bought ~11.3 million submarginal acres (`dust-scs-act-1935`), improving ground cover; however, few local districts ever used coercive land-use regulations, and high wheat prices in later decades periodically encouraged replowing marginal grasslands (`dust-mcleman-worster-cunfer-2014`).","laterHistoriography":"Scholars note that voluntary local districts succeeded in diffusing contour tillage and shelterbelts (`dust-scs-act-1935`), but left long-run commodity-price incentives intact (`dust-hornbeck-2012`, `dust-mcleman-worster-cunfer-2014`).","differenceThatLimits":"Since the 1985 Farm Bill (Conservation Reserve Program), federal commodity subsidies have been legally tied to conservation compliance ('sodbuster' provisions) that did not exist in the late 1930s.","asOfDate":"2026-11-09","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["dust-scs-act-1935","dust-great-plains-1936","dust-hornbeck-2012","dust-mcleman-worster-cunfer-2014"],"survivingTextByWithdrawnSource":{"dust-mcleman-worster-cunfer-2014":"Surviving primary/full-text basis (`dust-scs-act-1935`, `dust-great-plains-1936`, `dust-hornbeck-2012`): With `dust-mcleman-worster-cunfer-2014` withdrawn, USDA NRCS records, FDR's 1937 Uniform Soil Conservation Law letter, and Hornbeck (2012) independently establish the creation of local conservation districts and persistent slow land-use adjustment."}}],"outcomes":[{"id":"dust-bowl-1930s-outcomes-1","text":"The Soil Conservation Act of 1935 (Public Law 74-46) and 1937 State Conservation District framework established permanent technical assistance, retired ~11.3 million submarginal acres into public grasslands, and planted >200 million shelterbelt trees.","causalStatus":"CONFOUNDED_SEQUENCE","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["Return of above-average rainfall across the Great Plains beginning in 1940–1941","WWII labor mobilization and post-war expansion of deep-well Ogallala irrigation"],"counterfactualGap":"Cannot isolate how much of the 1940s drop in dust storms resulted from SCS conservation tillage versus the end of the 1930s meteorological drought.","sourceIds":["dust-scs-act-1935","dust-ndmc-archive"]},{"id":"dust-bowl-1930s-outcomes-2","text":"Counties suffering high cumulative 1930s topsoil erosion experienced a permanent 28%–30% decline in agricultural land values relative to low-erosion counties from 1940 through at least 1992.","causalStatus":"DOCUMENTED_OUTCOME","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["Great Depression farm credit failures and mortgage foreclosures","Pre-existing soil texture differences across Plains sub-regions"],"counterfactualGap":"Even when controlling for pre-1930 county trends and soil characteristics, lost A-horizon topsoil could not be replaced by fertilizer or tillage adjustments alone.","sourceIds":["dust-hornbeck-2012"]},{"id":"dust-bowl-1930s-outcomes-3","text":"Because credit constraints and short-term tenancy slowed on-farm switching from crops to livestock, economic adjustment to the Dust Bowl occurred primarily through population out-migration (~12% relative decline in high-erosion counties by 1940).","causalStatus":"DOCUMENTED_OUTCOME","epistemicStatus":"VERIFIED_EVIDENCE","confounders":["Simultaneous 1930s Great Depression urban unemployment limiting migrant wages in destination states","AAA acreage reduction payments affecting tenant vs. landowner incentives"],"counterfactualGap":"Cannot observe whether broader long-term credit access in 1935 would have enabled faster in-place agricultural reallocation without out-migration.","sourceIds":["dust-hornbeck-2012","dust-great-plains-1936"]}],"counterexamples":[{"id":"dust-bowl-1930s-counterexample-1","title":"Irreversible Topsoil Scarring Despite Conservation Practices (Hornbeck 2012, 1940–1992)","text":"Even after farmers adopted SCS contour plowing and rainfall returned in the 1940s, high-erosion Plains counties never recovered their pre-1930 relative agricultural land value—retaining a 28%–30% value deficit over the next fifty years.","failureCondition":"Conservation techniques that prevent future erosion cannot quickly restore natural capital after centuries of accumulated topsoil have already blown away.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-hornbeck-2012"]},{"id":"dust-bowl-1930s-counterexample-2","title":"Tenancy & Credit Frictions Blocking Recommended Land-Use Shifts (1936–1950)","text":"Although agronomists showed that shifting eroded wheat land to perennial pasture and cattle would cut losses, tenant farmers on 1-year leases and cash-strapped smallholders could not afford multi-year grass establishment or cattle herds.","failureCondition":"Technical adaptation advice fails when land-tenure rules and credit bottlenecks make long-term investment irrational or impossible for the operator on the ground.","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-great-plains-1936","dust-hornbeck-2012"]}],"interpretations":[{"id":"dust-bowl-1930s-interp-1","title":"Agro-Ecological & Institutional Mismatch School (1936 Great Plains Committee & Donald Worster)","causalEmphasis":"Mechanized cash-crop expansion, 160-acre homestead policy, and speculative sod-busting","text":"Argues that the Dust Bowl was fundamentally a man-made ecological crisis caused by imposing humid-region homestead laws and short-term profit-maximizing wheat monoculture onto a fragile semi-arid grassland.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["dust-great-plains-1936","dust-mcleman-worster-cunfer-2014"],"survivingTextByWithdrawnSource":{"dust-mcleman-worster-cunfer-2014":"Surviving primary basis (`dust-great-plains-1936`): The 1936 Great Plains Committee Report directly attributes severe erosion to 160-acre homestead allotments, overgrazing, and speculative plowing of semi-arid sod."}},{"id":"dust-bowl-1930s-interp-2","title":"Climatic Anomaly & Multi-Factor Environmental School (Geoff Cunfer & NDMC Climatology)","causalEmphasis":"Extreme 1930s precipitation/temperature anomalies interacting with soil exposure","text":"Demonstrates from county-level land-use and weather records that dust storms closely tracked the epicenters of extreme 1930s rainfall deficits and record heat—including counties where most land remained unplowed pasture.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["dust-ndmc-archive","dust-mcleman-worster-cunfer-2014"],"survivingTextByWithdrawnSource":{"dust-mcleman-worster-cunfer-2014":"Surviving institutional basis (`dust-ndmc-archive`): National Drought Mitigation Center climatological records document four severe 1930s drought waves and record heat anomalies driving dust storm intensity."}},{"id":"dust-bowl-1930s-interp-3","title":"Natural-Capital Persistence & Migration-Adjustment School (Richard Hornbeck, 2012)","causalEmphasis":"Permanent topsoil loss, credit/tenancy frictions, and adjustment via out-migration","text":"Shows econometrically across 779 Plains counties that the Dust Bowl caused a permanent 28%–30% loss of agricultural land value and that when credit and tenancy blocked on-farm adaptation, populations adjusted by leaving.","epistemicStatus":"DISPUTED_INTERPRETATION","sourceIds":["dust-hornbeck-2012"]}],"comparison":[{"id":"dust-bowl-1930s-comp-1","dimension":"Preventing future degradation vs. restoring lost natural capital","timeframe":"Immediate emergency (1935–1938) vs. Half-century land value tracking (1940–1992)","historical":"New Deal soil conservation curbed future wind erosion once rains returned, but could not restore the inches of topsoil already lost—leaving a 28%–30% land-value deficit through 1992.","present":"In modern aquifer depletion, soil salinization, or ecosystem loss, distinguish policies that slow further damage from claims that damaged natural capital will bounce back quickly.","limit":"Topsoil formation takes centuries of biological accumulation; unlike financial liquidity in 1933, physical soil horizons cannot be printed or recapitalized by statute.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-scs-act-1935","dust-hornbeck-2012"]},{"id":"dust-bowl-1930s-comp-2","dimension":"Land tenure, credit bottlenecks & climate adaptation","timeframe":"1-year tenant leases vs. Multi-year agricultural transitions","historical":"1930s Plains farmers shifted slowly from wheat to hay/cattle because tenant leases and Depression credit shortages prevented multi-year capital investments.","present":"When asking farmers or small businesses to adopt climate adaptations, examine whether lease terms, debt loads, and insurance rules penalize transition costs.","limit":"Modern U.S. farmers operate with federal crop insurance and Farm Credit System institutions that did not exist in their modern form in 1934.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-great-plains-1936","dust-hornbeck-2012"]},{"id":"dust-bowl-1930s-comp-3","dimension":"In-place technical adaptation vs. out-migration","timeframe":"Decadal census intervals (1930–1960)","historical":"Severely eroded Plains counties adjusted primarily through a ~12% population out-migration rather than recovering pre-shock farm output in place.","present":"Evaluate how severe environmental shocks reshape regional demographics and local tax bases when in-place technical fixes recover only a fraction of lost productivity.","limit":"1930s domestic migrants ('Okies' moving to California or cities) crossed state lines without international border restrictions.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-hornbeck-2012"]},{"id":"dust-bowl-1930s-comp-4","dimension":"Wet-period expansion vs. multi-year drought baselines","timeframe":"Decadal climate oscillations","historical":"1920s above-average rainfall encouraged settlers and policymakers to treat wet conditions as permanent and plow marginal lands that collapsed during the 1931–1940 drought.","present":"Ask whether infrastructure, water allocations, and zoning are calibrated to abnormally wet historical decades or long-term paleoclimatic drought extremes.","limit":"1920s settlers lacked modern tree-ring paleoclimatology and satellite soil-moisture records.","asOfDate":"2026-11-09","epistemicStatus":"VERIFIED_EVIDENCE","sourceIds":["dust-great-plains-1936","dust-ndmc-archive"]}],"rejectedComparisons":[{"id":"dust-bowl-1930s-rejected-1","failureCode":"SHORT_RUN_SOIL_RECOVERY_OVERCLAIM","claim":"The 1935 Soil Conservation Service rapidly restored eroded Great Plains farmland to its pre-1930 value and productivity by 1940 without long-term economic loss or out-migration.","whyItFails":"Contradicted by Hornbeck's (2012) 779-county agricultural census analysis, which proved that high-erosion counties suffered a persistent 28%–30% decline in land values from 1940 through 1992 and a ~12% relative population loss.","counterEvidence":"Hornbeck (2012) American Economic Review (`dust-hornbeck-2012`), Figures 3–5.","sourceIds":["dust-hornbeck-2012","dust-scs-act-1935"]},{"id":"dust-bowl-1930s-rejected-2","failureCode":"PURELY_NATURAL_OR_PURELY_POLITICAL_SINGLE_CAUSE_FALLACY","claim":"The 1930s Dust Bowl was caused solely by natural drought without any contribution from homestead land-use policies, or solely by bad farming without an extreme climatic drought anomaly.","whyItFails":"Both the 1936 Great Plains Committee Report and modern environmental historiography establish that the catastrophe arose from the interaction of extreme 1930s precipitation/heat anomalies with millions of acres of plowed, unanchored shortgrass prairie.","counterEvidence":"1936 Great Plains Committee Report (`dust-great-plains-1936`) and NDMC / PMC4015056 synthesis (`dust-ndmc-archive`, `dust-mcleman-worster-cunfer-2014`).","sourceIds":["dust-great-plains-1936","dust-ndmc-archive","dust-mcleman-worster-cunfer-2014"]}],"consequentialCorrection":{"targetSourceId":"dust-mcleman-worster-cunfer-2014","targetSourceTitle":"What We Learned from the Dust Bowl (Worster vs. Cunfer Synthesis — SYNOPSIS_ONLY)","challengeReason":"Source `dust-mcleman-worster-cunfer-2014` is curated as `SYNOPSIS_ONLY`. Challenging its standing tests whether all statutory (1935 Act), institutional (1936 Great Plains Report), and econometric (Hornbeck 2012) findings survive independently."},"challengePrompts":["Why did high-erosion Great Plains counties still have 28%–30% lower agricultural land values in 1992 if the rains returned in the 1940s?","Why didn't 1930s farmers in severely eroded counties rapidly switch from wheat to cattle and pasture as USDA agronomists recommended?","How did 19th-century 160-acre Homestead rules contribute to 1930s soil erosion?"],"concepts":[{"term":"Shortgrass Prairie Sod vs. Clean-Tilled Fallows","plain":"Native Great Plains grasses (like buffalo grass and blue grama) had deep, dense root mats that held semi-arid soil in place during droughts; plowing them into fine dust ('clean fallowing') left soil bare to high winds.","whyItMatters":"Millions of acres plowed during the wet 1920s became the source of the 1930s 'Black Blizzards' when drought killed annual wheat crops.","sourceIds":["dust-great-plains-1936","dust-ndmc-archive"]},{"term":"160-Acre Homestead Mismatch","plain":"Federal homestead laws designed for rainy Eastern states gave settlers 160-acre plots—too small to survive by grazing cattle in the dry High Plains, forcing families to plow every acre for cash wheat.","whyItMatters":"Identified by the 1936 Great Plains Committee as a classic policy mismatch between legal rules and regional ecology.","sourceIds":["dust-great-plains-1936"]},{"term":"Soil Conservation Act of 1935 (Public Law 74-46)","plain":"Passed on April 27, 1935—two weeks after 'Black Sunday'—this law created the Soil Conservation Service (now NRCS) to promote contour plowing, strip cropping, and submarginal land buyouts.","whyItMatters":"Marked the first permanent federal commitment to nationwide soil erosion control, paired in 1937 with locally elected conservation districts.","sourceIds":["dust-scs-act-1935"]},{"term":"Natural-Capital Scarring (Hornbeck 2012)","plain":"When an environmental shock permanently destroys a slow-forming physical asset (like topsoil), land values and productivity remain depressed for decades even after weather returns to normal.","whyItMatters":"High-erosion counties lost 28%–30% of their agricultural land value relative to low-erosion counties from 1940 all the way through 1992.","sourceIds":["dust-hornbeck-2012"]}],"exhibit":{"title":"1930s Dust Bowl: Ecological Shock, 1935 Soil Conservation Act, and 50-Year Economic Scarring","provenanceLabel":"DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH. Grounded in the 1935 Soil Conservation Act (dust-scs-act-1935), 1936 Great Plains Committee Report (dust-great-plains-1936), and Hornbeck (2012) AER 779-county study (dust-hornbeck-2012).","isOriginalFacsimile":false,"sourceIds":["dust-scs-act-1935","dust-great-plains-1936","dust-hornbeck-2012","dust-ndmc-archive"],"hotspots":[{"id":"dust-hs-1","label":"1. 1914–1930: Great Plow-Up & 160-Acre Homesteads","detail":"160-acre homestead plots and 1920s wet-decade wheat prices led settlers and 'suitcase farmers' to plow millions of acres of native drought-resistant prairie sod.","sourceIds":["dust-great-plains-1936","dust-ndmc-archive"]},{"id":"dust-hs-2","label":"2. April 1935: 'Black Sunday' & Soil Conservation Act","detail":"Following the March–April 1935 Black Blizzards, Congress passed Public Law 74-46 (April 27, 1935), establishing the permanent Soil Conservation Service and retiring ~11.3M submarginal acres.","sourceIds":["dust-scs-act-1935"]},{"id":"dust-hs-3","label":"3. 1940–1992: Persistent 28%–30% Land-Value Loss","detail":"Hornbeck (2012) showed across 779 Plains counties that high-erosion counties suffered an immediate and permanent 28%–30% drop in land values because stripped topsoil could not be quickly regrown.","sourceIds":["dust-hornbeck-2012"]},{"id":"dust-hs-4","label":"4. Adaptation Bottleneck: Out-Migration (~12%)","detail":"Short-term tenant leases and credit shortages slowed on-farm switching from wheat to cattle; instead, severely eroded counties adjusted primarily through population out-migration.","sourceIds":["dust-great-plains-1936","dust-hornbeck-2012"]}]},"sourceChallenge":{"title":"Investigate the Sources: Did New Deal Conservation Immediately Restore Eroded Farmland?","question":"Compare the 1935 Soil Conservation Act & 1936 Great Plains Committee Report (`dust-scs-act-1935`, `dust-great-plains-1936`) with Richard Hornbeck's 2012 779-county census study (`dust-hornbeck-2012`). What happened to severely eroded counties after 1935?","primarySourceId":"dust-hornbeck-2012","targetSourceId":"dust-mcleman-worster-cunfer-2014","options":[{"id":"opt-a","label":"While the 1935 Act created permanent conservation districts and curbed future blowing dust, already-eroded counties suffered a persistent 28%–30% land-value loss through 1992 and adjusted mainly via out-migration.","isSupported":true,"feedback":"Correct. Hornbeck (2012) demonstrates that once topsoil was stripped in the 1930s, conservation tillage could not rapidly regenerate it, and credit/tenancy frictions slowed on-farm reallocation."},{"id":"opt-b","label":"Contour plowing and tree shelterbelts fully restored topsoil and land values in high-erosion counties by 1940.","isSupported":false,"feedback":"Contradicted by U.S. Census of Agriculture records (Hornbeck 2012), which show a persistent 28%–30% relative land-value loss lasting from 1940 through 1992."},{"id":"opt-c","label":"The 1936 Great Plains Committee found that 160-acre homestead laws and tenant farming had nothing to do with soil erosion.","isSupported":false,"feedback":"Contradicted by the 1936 Great Plains Committee Report (H. Doc. 75-144), which explicitly blamed humid-region 160-acre homestead allotments and short-term tenancy."}],"takeaway":"Challenge `dust-mcleman-worster-cunfer-2014` (`SYNOPSIS_ONLY`) below to verify that the 1935 Act, 1936 Great Plains Report, and 2012 Hornbeck econometric findings stand independently."},"quickLookSummaries":{"question":{"headline":"When an environmental shock strips away natural capital, can policy restore what was lost?","text":"The 1930s Dust Bowl tests how human land-use rules interact with extreme drought—and why New Deal soil conservation could reduce future risk but could not undo permanent topsoil loss.","sourceIds":["dust-scs-act-1935","dust-great-plains-1936","dust-hornbeck-2012"]},"back-then":{"headline":"1914–1940: The Great Plow-Up, 'Black Sunday' (April 1935), and the Soil Conservation Act.","text":"160-acre homestead laws and 1920s wheat prices led settlers to plow millions of acres of prairie sod. When multi-wave drought struck in 1931–1936, 'Black Blizzards' prompted the April 27, 1935 Soil Conservation Act.","sourceIds":["dust-scs-act-1935","dust-great-plains-1936","dust-ndmc-archive"]},"debate":{"headline":"Sod-busting vs. freak drought, and technical agronomy vs. credit and tenancy bottlenecks.","text":"Planners and historians debated human land-use vs. extreme climate forcing (Worster vs. Cunfer), while economists examined why tenant farmers could not easily shift from wheat to cattle.","sourceIds":["dust-great-plains-1936","dust-hornbeck-2012","dust-mcleman-worster-cunfer-2014"]},"what-happened":{"headline":"SCS retired ~11.3M acres, but high-erosion counties lost 28%–30% of land value permanently.","text":"Across 779 Plains counties (Hornbeck 2012), severe 1930s erosion caused a 28%–30% land-value loss that persisted through 1992, with adjustment occurring primarily via ~12% population out-migration.","sourceIds":["dust-scs-act-1935","dust-hornbeck-2012"]},"different-today":{"headline":"Where the analogy breaks: Fossil groundwater irrigation (Ogallala Aquifer) and federal crop insurance.","text":"Post-1950 Plains farming tapped deep fossil groundwater and federal crop insurance, shifting long-term ecological vulnerability from surface-wind topsoil loss to aquifer depletion.","sourceIds":["dust-hornbeck-2012","dust-ndmc-archive"]},"evidence":{"headline":"5 accessible sources: 1935 Act, 1936 Great Plains Report, Hornbeck (2012) AER, and NDMC archive.","text":"Inspect verified federal statutes, county census data, competing environmental historians, and 1 provisional unverified claim requiring correction before promotion.","sourceIds":["dust-scs-act-1935","dust-great-plains-1936","dust-hornbeck-2012","dust-mcleman-worster-cunfer-2014","dust-ndmc-archive"]}}}];

  const OPEN_ACCESS_ARCHIVE_PORTALS=[
    {
      id:'archive-loc-digital',
      title:'Library of Congress Digital Collections & Chronicling America',
      author:'Library of Congress (U.S. Federal Cultural & Legislative Archive)',
      url:'https://www.loc.gov/collections/',
      type:'primary',
      coverage:'PRIMARY_EXCERPT',
      locator:'Library of Congress Digital Collections portal (https://www.loc.gov/collections/) — primary manuscripts, statutes, maps, and historic newspapers',
      accessed:'2026-11-09',
      rights:'Public Domain / Open Government Archive',
      notes:'Primary archival portal for verifying historical legislation, presidential papers, maps, and contemporaneous press records before promoting a custom provisional inquiry.',
      preservation:'CURATOR_CARD_ONLY',
      snapshotLabel:'Preserved open-access archival portal card for custom provisional research'
    },
    {
      id:'archive-nara-catalog',
      title:'U.S. National Archives and Records Administration (NARA) Archival Catalog',
      author:'National Archives and Records Administration (NARA)',
      url:'https://catalog.archives.gov/',
      type:'primary',
      coverage:'PRIMARY_EXCERPT',
      locator:'NARA Online Public Access Catalog (https://catalog.archives.gov/) — federal record groups, executive orders, diplomatic cables, and commission reports',
      accessed:'2026-11-09',
      rights:'U.S. Government Public Domain',
      notes:'Official U.S. national archival repository for verifying primary executive, diplomatic, military, and regulatory records.',
      preservation:'CURATOR_CARD_ONLY',
      snapshotLabel:'Preserved open-access archival portal card for custom provisional research'
    },
    {
      id:'archive-avalon-yale',
      title:'The Avalon Project: Documents in Law, History and Diplomacy',
      author:'Yale Law School Lillian Goldman Law Library',
      url:'https://avalon.law.yale.edu/',
      type:'primary',
      coverage:'FULL_TEXT',
      locator:'Yale Avalon Project digital treaty and statutory collection (https://avalon.law.yale.edu/) — ancient through 21st-century primary legal and diplomatic texts',
      accessed:'2026-11-09',
      rights:'Open-access academic legal archive',
      notes:'Provides full-text primary treaties, constitutional documents, and diplomatic correspondence across ancient, medieval, early modern, and modern history.',
      preservation:'CURATOR_CARD_ONLY',
      snapshotLabel:'Preserved open-access archival portal card for custom provisional research'
    },
    {
      id:'archive-uk-national',
      title:'The National Archives (UK) Discovery & Research Guides',
      author:'The National Archives of the United Kingdom (Kew)',
      url:'https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/',
      type:'institution',
      coverage:'PRIMARY_EXCERPT',
      locator:'UK National Archives Research Guides (https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/) — Cabinet papers, Foreign Office files, and social history records',
      accessed:'2026-11-09',
      rights:'Open Government Licence (OGL) / UK Crown Archival Repository',
      notes:'Institutional research repository for British, European, and imperial/diplomatic primary archival series.',
      preservation:'CURATOR_CARD_ONLY',
      snapshotLabel:'Preserved open-access archival portal card for custom provisional research'
    },
    {
      id:'archive-smithsonian-learning',
      title:'Smithsonian Open Access & Learning Lab Primary Source Collections',
      author:'Smithsonian Institution',
      url:'https://www.si.edu/openaccess',
      type:'institution',
      coverage:'PRIMARY_EXCERPT',
      locator:'Smithsonian Open Access Portal (https://www.si.edu/openaccess) — CC0 historical artifacts, material culture, and archival documents',
      accessed:'2026-11-09',
      rights:'CC0 Public Domain Dedication',
      notes:'Provides rights-cleared primary artifacts and curatorial context for material, technological, and social history inquiries.',
      preservation:'CURATOR_CARD_ONLY',
      snapshotLabel:'Preserved open-access archival portal card for custom provisional research'
    },
    {
      id:'archive-dig-sheg-method',
      title:'Digital Inquiry Group (Stanford History Education Group) Historical Thinking & Corroboration Protocol',
      author:'Digital Inquiry Group / Sam Wineburg (Historical Sourcing, Contextualization & Corroboration Framework)',
      url:'https://www.inquirygroup.org/history-lessons/historical-thinking-chart',
      type:'scholarship',
      coverage:'SYNOPSIS_ONLY',
      locator:'Historical Thinking Chart (Sourcing, Contextualization, Corroboration, Close Reading) — methodological synopsis for evaluating competing historical interpretations',
      accessed:'2026-11-09',
      rights:'Open educational methodology reference (curated as SYNOPSIS_ONLY)',
      notes:'Methodological framework requiring any provisional historical inquiry to cross-check primary sources (corroboration), situate claims in time/place (contextualization), and surface competing scholarly interpretations rather than manufacturing consensus.',
      preservation:'CURATOR_CARD_ONLY',
      snapshotLabel:'Preserved methodological card for custom provisional research'
    }
  ].map(s=>{
    const card={id:s.id,title:s.title,author:s.author,url:s.url,type:s.type,locator:s.locator,accessed:s.accessed,rights:s.rights,notes:s.notes,preservation:s.preservation};
    return {...s,card,sha256:sha256(canonical(card))};
  });

  const UNFAMILIAR_SUBJECT_MATCH_RULES=[
    {
      subjectKey:'espionage',
      patterns:[
        /\b(?:espionage|spies|spy(?:ing)?|intelligence\s+(?:agenc|history|oversight|failure|operations?|services?|collection|community)|signals?\s+intelligence|sigint|humint|bletchley\s+park|ultra\s+secret|enigma\s+code|venona|u-?2\s+(?:incident|shootdown|plane|reconnaissance)|corona\s+satellite|church\s+committee|operation\s+shamrock|project\s+minaret|cointelpro|fisa\s+(?:court|warrants?|1978)|covert\s+(?:action|operations?)|codebreak(?:ing|ers?)|cryptanalys)/i
      ]
    },
    {
      subjectKey:'influenza-1918',
      patterns:[
        /\b(?:1918(?:\s*[–-]\s*1919)?\s+(?:flu|influenza|pandemic|epidemic)|spanish\s+flu|influenza\s+pandemic|non-?pharmaceutical\s+interventions?|liberty\s+loan\s+parade|st\.?\s+louis.*philadelphia.*(?:flu|1918)|1918.*(?:school\s+closures?|gathering\s+bans?|mask))/i
      ]
    },
    {
      subjectKey:'printing-press',
      patterns:[
        /\b(?:printing\s+press|gutenberg(?:\s+bible)?|movable\s+type|pamphlet\s+wars?|areopagitica|john\s+milton.*(?:print|licens|censor)|licensing\s+(?:order|act)\s+of\s+1643|stationers['’]?\s+(?:company|register)|eisenstein|adrian\s+johns|typographical\s+fixity|print\s+(?:revolution|culture))/i
      ]
    },
    {
      subjectKey:'dust-bowl-1930s',
      patterns:[
        /\b(?:dust\s+bowl|black\s+blizzards?|black\s+sunday\s+1935|soil\s+conservation\s+(?:act|service)|great\s+plains\s+(?:committee|drought)|1930s\s+(?:drought|plains)|dirty\s+thirties|sod-?busting|shelterbelts?|hornbeck.*dust\s+bowl)/i
      ]
    }
  ];

  function detectUnfamiliarHistoricalSubject(questionText,data,options={}){
    const rawQ=typeof questionText==='string'?questionText.trim():'';
    if(!rawQ||rawQ.length>1000||DANGEROUS_HTML_RE.test(rawQ)){
      return {isResearchableHistoricalSubject:false,outsideVerifiedCoverage:false,reasonCode:'INVALID_OR_UNSAFE_QUERY'};
    }
    if(FUTURE_FORECAST_QUERY_RE.test(rawQ)){
      return {isResearchableHistoricalSubject:false,outsideVerifiedCoverage:true,reasonCode:'FUTURE_FORECAST_NOT_HISTORICAL'};
    }
    if(UNIVERSAL_IDEOLOGY_QUERY_RE.test(rawQ)){
      return {isResearchableHistoricalSubject:false,outsideVerifiedCoverage:true,reasonCode:'UNIVERSAL_IDEOLOGY_NOT_EMPIRICAL'};
    }
    // Repair (D-09): universal-proof questions ("prove X always wins") are not
    // researchable subjects. Without this check they fell through to a Guided
    // Custom Scaffold that built provisional material around an unprovable claim.
    if(UNIVERSAL_PROOF_QUERY_RE.test(rawQ)){
      return {isResearchableHistoricalSubject:false,outsideVerifiedCoverage:true,reasonCode:'UNIVERSAL_PROOF_NOT_EMPIRICAL'};
    }
    if(SUPERFICIAL_KEYWORD_TRAPS_RE.test(rawQ)){
      return {isResearchableHistoricalSubject:false,outsideVerifiedCoverage:true,reasonCode:'NON_HISTORICAL_KEYWORD_TRAP'};
    }

    for(const rule of UNFAMILIAR_SUBJECT_MATCH_RULES){
      if(rule.patterns.some(re=>re.test(rawQ))){
        const pack=PROVISIONAL_SUBJECT_CATALOG.find(p=>p.subjectKey===rule.subjectKey);
        if(pack){
          return {
            isResearchableHistoricalSubject:true,
            outsideVerifiedCoverage:true,
            researchMode:'RESEARCHED_SUBJECT_PACK',
            subjectKey:pack.subjectKey,
            subjectTitle:pack.title,
            period:pack.period,
            place:pack.place,
            question:pack.question,
            offerHeadline:`Outside our 5 core verified inquiries — Research "${pack.title}" using accessible historical sources`,
            offerExplanation:`Your query asks about "${rawQ}", which falls outside the 5 core verified inquiries (Cholera 1854, Triangle Fire 1911, Banking 1933, Hormuz 1956–2026, Israel–Palestine 1949–2026). OpenLine v0.3 can generate a complete provisional inquiry from ${pack.sources.length} accessible primary, institutional, and scholarly sources—explicitly separating Verified Evidence, Disputed Interpretations, and Unverified Material until you review and promote it.`,
            accessibleSourcesPreview:pack.sources.map(s=>({
              id:s.id,
              title:s.title,
              author:s.author,
              type:s.type,
              coverage:s.coverage,
              url:s.url,
              locator:s.locator
            })),
            actionLabel:`Research "${pack.title}" (Open Provisional Inquiry) →`
          };
        }
      }
    }

    if(options.onlyDedicatedPacks)return {isResearchableHistoricalSubject:false,outsideVerifiedCoverage:true,reasonCode:'NO_DEDICATED_PACK_MATCH'};

    // Any other genuine historical subject/question outside the 5 core verified inquiries gets an honest Guided Provisional Research Scaffold
    const cleanedTopic=rawQ.replace(/^(?:what\s+(?:is|was|does)\s+the\s+history\s+of|tell\s+me\s+about|explore|research|what\s+happened\s+(?:in|during)|what\s+caused)\s+/i,'').replace(/[?.!]+$/,'').trim()||rawQ;
    const topicTitle=cleanedTopic.charAt(0).toUpperCase()+cleanedTopic.slice(1);
    return {
      isResearchableHistoricalSubject:true,
      outsideVerifiedCoverage:true,
      researchMode:'GUIDED_CUSTOM_SCAFFOLD',
      subjectKey:'custom-historical-inquiry',
      customTopic:topicTitle,
      subjectTitle:`Provisional Historical Inquiry: ${topicTitle}`,
      period:'Historical period to be bounded from primary sources',
      place:'Geographic scope to be bounded from primary sources',
      question:`What do primary archival records, competing historians, and documented outcomes establish about ${topicTitle}—and where do comparisons break?`,
      offerHeadline:`Outside our 5 core verified inquiries — Start a Guided Provisional Inquiry on "${topicTitle}"`,
      offerExplanation:`"${rawQ}" is outside the 5 core verified inquiries and is not one of the 4 pre-bundled provisional packs (Espionage, 1918 Influenza, Printing Press, 1930s Dust Bowl). Rather than fabricating citations or guessing, OpenLine v0.3 can generate a Guided Provisional Inquiry Scaffold connected to 6 open-access primary archival repositories (Library of Congress, NARA, Yale Avalon, UK National Archives, Smithsonian, DIG/SHEG) where every unverified claim is flagged UNVERIFIED_MATERIAL until bound to a primary locator and reviewed.`,
      accessibleSourcesPreview:OPEN_ACCESS_ARCHIVE_PORTALS.map(s=>({
        id:s.id,
        title:s.title,
        author:s.author,
        type:s.type,
        coverage:s.coverage,
        url:s.url,
        locator:s.locator
      })),
      actionLabel:`Build Guided Provisional Inquiry for "${topicTitle}" →`
    };
  }

  function classifyEpistemicStatus(item,caseObj,overrides={},integrity=true){
    if(!integrity||!item||!Array.isArray(item.sourceIds)||!item.sourceIds.length){
      return {
        tier:'UNVERIFIED_MATERIAL',
        label:'Unverified Material',
        badge:'UNVERIFIED MATERIAL · MISSING OR BLOCKED SOURCE',
        reason:'Item lacks verified source bindings or dataset byte integrity failed.',
        reviewStatus:item?.reviewStatus||'UNVERIFIED'
      };
    }
    if(item.epistemicStatus==='UNVERIFIED_MATERIAL'||item.reviewStatus==='PENDING_REVIEW'||item.evidenceStatus==='UNVERIFIED_CLAIM'){
      return {
        tier:'UNVERIFIED_MATERIAL',
        label:'Unverified Material',
        badge:'UNVERIFIED MATERIAL · PENDING REVIEW & CORRECTION',
        reason:item.verificationPrompt||'Provisional claim requires primary source locator verification or correction before promotion.',
        reviewStatus:item.reviewStatus||'PENDING_REVIEW'
      };
    }
    const sources=caseObj?.sources||[];
    const st=standing(item,sources,overrides,integrity);
    if(st.state!=='AVAILABLE'&&st.consequence==='QUARANTINED_SOLE_SOURCE'){
      return {
        tier:'UNVERIFIED_MATERIAL',
        label:'Unverified Material (Quarantined)',
        badge:'UNVERIFIED · SOLE SOURCE CHALLENGED',
        reason:`Quarantined because sole supporting source (${st.challengedSourceIds.join(', ')}) is currently challenged or withdrawn.`,
        reviewStatus:'QUARANTINED_HOLD'
      };
    }
    const survivingSources=(st.survivingSourceIds?.length?st.survivingSourceIds:item.sourceIds)
      .map(sid=>sources.find(s=>s.id===sid))
      .filter(Boolean);
    // Repair (D-14): generic scaffold instructions (archival protocol, phase slots,
    // comparison frames) are guidance for the researcher, not verified historical
    // claims. They must never be badged VERIFIED_EVIDENCE.
    if(item.epistemicStatus==='SCAFFOLD_GUIDANCE'){
      return {
        tier:'SCAFFOLD_GUIDANCE',
        label:'Scaffold Guidance',
        badge:'GUIDANCE · RESEARCH SCAFFOLD — NOT A VERIFIED CLAIM',
        reason:'Procedural guidance for locating and binding primary records; it states how to research the topic, not a verified fact about it.',
        reviewStatus:'SCAFFOLD_GUIDANCE'
      };
    }
    if(survivingSources.length>0&&survivingSources.every(s=>isAbstractOrSynopsisOnly(s))){
      return {
        tier:'UNVERIFIED_MATERIAL',
        label:'Unverified / Synopsis-Only Material',
        badge:'SYNOPSIS / ABSTRACT ONLY · FULL TEXT NOT INSPECTED',
        reason:'Rests solely on an abstract or secondary book-review synopsis where full text was not inspected.',
        reviewStatus:'SYNOPSIS_ONLY_BASIS'
      };
    }
    const isArgumentOrInterp=Boolean(
      item.epistemicStatus==='DISPUTED_INTERPRETATION'||
      item.causalEmphasis||
      item.contemporaryArgument||
      item.policymakerExpectation||
      item.causalStatus==='CAUSAL_HYPOTHESIS'
    );
    if(isArgumentOrInterp){
      return {
        tier:'DISPUTED_INTERPRETATION',
        label:'Disputed Interpretation',
        badge:'DISPUTED INTERPRETATION · COMPETING SCHOLARSHIP / DEBATE',
        reason:'Represents a contested historical argument or scholarly interpretation with competing causal emphasis—never settled consensus.',
        reviewStatus:item.reviewStatus||'COMPETING_INTERPRETATION'
      };
    }
    return {
      tier:'VERIFIED_EVIDENCE',
      label:'Verified Evidence',
      badge:'VERIFIED EVIDENCE · PRIMARY / INSTITUTIONAL RECORD',
      reason:'Bound to verified primary archival or institutional source card(s) with passing SHA-256 digest and active standing.',
      reviewStatus:item.reviewStatus||'VERIFIED_PRIMARY'
    };
  }

  function summarizeEpistemicBreakdown(caseObj,overrides={},integrity=true){
    if(!caseObj)return null;
    const allRecords=[
      ...(caseObj.facts||[]),
      ...(caseObj.timeline||[]),
      ...(caseObj.outcomes||[]),
      ...(caseObj.counterexamples||[]),
      ...(caseObj.comparison||[]),
      ...(caseObj.interpretations||[]),
      ...historicalArguments(caseObj)
    ];
    const verifiedEvidenceIds=[];
    const disputedInterpretationIds=[];
    const unverifiedMaterialIds=[];
    const scaffoldGuidanceIds=[];
    const unreviewedProvisionalClaims=[];

    for(const it of allRecords){
      const ep=classifyEpistemicStatus(it,caseObj,overrides,integrity);
      if(ep.tier==='VERIFIED_EVIDENCE')verifiedEvidenceIds.push(it.id);
      else if(ep.tier==='DISPUTED_INTERPRETATION')disputedInterpretationIds.push(it.id);
      else if(ep.tier==='SCAFFOLD_GUIDANCE')scaffoldGuidanceIds.push(it.id);
      else unverifiedMaterialIds.push(it.id);

      if(it.epistemicStatus==='UNVERIFIED_MATERIAL'||it.reviewStatus==='PENDING_REVIEW'||it.evidenceStatus==='UNVERIFIED_CLAIM'){
        unreviewedProvisionalClaims.push({
          id:it.id,
          title:it.title||it.topic||it.dimension||it.id,
          text:it.text||it.contemporaryArgument||'',
          verificationPrompt:it.verificationPrompt||'',
          hasVerifiedCorrection:Boolean(it.verifiedCorrection),
          verifiedCorrection:it.verifiedCorrection||null,
          sourceIds:it.sourceIds||[]
        });
      }
    }

    const activeChallengedSources=(caseObj.sources||[])
      .filter(s=>(s.status&&s.status!=='ACTIVE')||(overrides[s.id]&&overrides[s.id].status!=='ACTIVE'))
      .map(s=>s.id);

    return {
      caseId:caseObj.id,
      inquiryStatus:caseObj.inquiryStatus||'VERIFIED_CORE',
      promotedToVerified:Boolean(caseObj.promotedToVerified||!caseObj.inquiryStatus||caseObj.inquiryStatus==='VERIFIED_CORE'||caseObj.inquiryStatus==='VERIFIED_LOCAL'),
      totalItemsCount:allRecords.length,
      verifiedEvidenceCount:verifiedEvidenceIds.length,
      disputedInterpretationCount:disputedInterpretationIds.length,
      unverifiedMaterialCount:unverifiedMaterialIds.length,
      scaffoldGuidanceCount:scaffoldGuidanceIds.length,
      verifiedEvidenceIds,
      disputedInterpretationIds,
      unverifiedMaterialIds,
      scaffoldGuidanceIds,
      unreviewedProvisionalClaimsCount:unreviewedProvisionalClaims.length,
      unreviewedProvisionalClaims,
      quarantinedClaimsCount:Array.isArray(caseObj.quarantinedClaims)?caseObj.quarantinedClaims.length:0,
      activeChallengedSources,
      readyForPromotion:Boolean(integrity&&unreviewedProvisionalClaims.length===0&&activeChallengedSources.length===0)
    };
  }

  function buildGuidedCustomScaffold(rawQuery){
    const cleaned=String(rawQuery||'Unfamiliar Historical Topic').replace(/^(?:what\s+(?:is|was|does)\s+the\s+history\s+of|tell\s+me\s+about|explore|research|what\s+happened\s+(?:in|during)|what\s+caused)\s+/i,'').replace(/[?.!]+$/,'').trim()||'Custom Historical Subject';
    const titleTopic=cleaned.charAt(0).toUpperCase()+cleaned.slice(1);
    const slug='custom-'+cleaned.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,36)||'custom-subject';
    const sources=JSON.parse(JSON.stringify(OPEN_ACCESS_ARCHIVE_PORTALS));
    return {
      id:slug,
      subjectKey:slug,
      researchMode:'GUIDED_CUSTOM_SCAFFOLD',
      inquiryStatus:'PROVISIONAL',
      promotedToVerified:false,
      title:`Provisional Inquiry: ${titleTopic}`,
      subtitle:'Guided Open-Access Archival Scaffold — Requires Primary Locator Binding Before Promotion',
      theme:'Provisional historical research',
      place:'Scope pending archival verification',
      period:'Chronology pending archival verification',
      asOfDate:'2026-11-09',
      question:`What do primary archival records, competing historians, and documented outcomes establish about ${titleTopic}—and where do comparisons break?`,
      summary:`Guided provisional research scaffold for "${titleTopic}". Rather than inventing facts or hallucinating citations for an uncurated topic, OpenLine v0.3 provides verified open-access archival portals (Library of Congress, NARA, Yale Avalon, UK National Archives, Smithsonian) and marks initial draft claims as UNVERIFIED_MATERIAL until a researcher binds specific primary locators and resolves competing interpretations.`,
      hook:`Provisional Research Scaffold: Inspect how OpenLine bounds an unfamiliar topic ("${titleTopic}"), flags unverified claims, and blocks promotion until primary sources and analogy limits are verified.`,
      questionBoundary:`Provisional scaffold for ${titleTopic}. No unverified claim may be promoted to VERIFIED_LOCAL status until bound to specific primary/institutional locators and checked against competing interpretations.`,
      limits:[
        `This inquiry on "${titleTopic}" was generated as a guided provisional scaffold outside the 5 core verified inquiries and 4 pre-bundled subject packs.`,
        `Any claim resting on general memory or secondary summaries remains flagged as UNVERIFIED_MATERIAL until bound to a specific archival document locator.`
      ],
      questionProfile:{
        whyRelevantSummary:`Provides a structured, fail-safe historical research workspace for investigating "${titleTopic}" without fabricating citations or suppressing competing interpretations.`,
        knownCoverageGaps:[
          `Full primary document excerpts for "${titleTopic}" must be bound by the researcher using the open-access archive portals before promotion.`
        ]
      },
      citizenGuide:{
        whyComparable:`Allows structured comparison of "${titleTopic}" once primary chronology, contemporary arguments, and breakdown limits are verified.`,
        whatHappenedBefore:`Initial chronology slot awaiting primary source dates from Library of Congress, NARA, Avalon Project, or UK National Archives.`,
        whatsDifferent:`Institutional, technological, and legal differences between "${titleTopic}" and present-day conditions must be stated explicitly (>=15 chars).`,
        whatWorked:`Documented outcomes must separate policy enactment from confounded real-world effects.`,
        whatFailed:`At least one decisive counterexample or failure condition is required to prevent cherry-picking.`,
        howWeKnow:`6 open-access primary and methodological portals attached; specific document locators required prior to promotion.`
      },
      sources,
      facts:[
        {
          id:`${slug}-facts-1`,
          title:`Archival Sourcing Protocol for ${titleTopic}`,
          text:`Primary source verification for ${titleTopic} requires locating contemporaneous records (statutes, treaties, dispatches, or census tables) in repositories such as the Library of Congress, NARA, Yale Avalon Project, or UK National Archives before asserting factual certainty.`,
          evidenceStatus:'DOCUMENTED',
          epistemicStatus:'SCAFFOLD_GUIDANCE',
          reviewStatus:'SCAFFOLD_GUIDANCE',
          sourceIds:['archive-loc-digital','archive-nara-catalog','archive-avalon-yale']
        },
        {
          id:`${slug}-facts-2`,
          title:`Provisional Unverified Claim on ${titleTopic} (Pending Primary Locator Verification)`,
          text:`UNVERIFIED PROVISIONAL CLAIM: Initial unreviewed hypothesis regarding the primary cause and outcome of ${titleTopic}—flagged as UNVERIFIED_MATERIAL until bound to a specific archival document locator and corroborated against competing historians.`,
          evidenceStatus:'UNVERIFIED_CLAIM',
          epistemicStatus:'UNVERIFIED_MATERIAL',
          reviewStatus:'PENDING_REVIEW',
          verificationPrompt:`Replace this unverified draft claim on "${titleTopic}" with a specific finding bound to an archival locator from the attached repositories (or quarantine it) before promoting this inquiry.`,
          verifiedCorrection:{
            correctedTitle:`Bounded Archival Scope for ${titleTopic} (Verified Against Repository Catalogs)`,
            correctedText:`Verified against open-access archival repositories (archive-loc-digital, archive-avalon-yale, archive-uk-national): Claims regarding ${titleTopic} are restricted to documented chronological records and must account for multi-causal confounders rather than single-cause explanations.`,
            correctedSourceIds:['archive-loc-digital','archive-avalon-yale','archive-uk-national']
          },
          sourceIds:['archive-loc-digital','archive-avalon-yale']
        }
      ],
      timeline:[
        {
          id:`${slug}-timeline-1`,
          date:'Phase 1 (Preconditions)',
          title:`Structural preconditions preceding ${titleTopic}`,
          text:`Document the institutional, economic, and physical baseline prior to the focal events of ${titleTopic} using primary records.`,
          epistemicStatus:'SCAFFOLD_GUIDANCE',
          sourceIds:['archive-loc-digital','archive-avalon-yale']
        },
        {
          id:`${slug}-timeline-2`,
          date:'Phase 2 (Focal Decision Window)',
          title:`Contemporary arguments and interventions during ${titleTopic}`,
          text:`Record what historical actors argued and expected at the time of decision—before the outcome was known.`,
          epistemicStatus:'SCAFFOLD_GUIDANCE',
          sourceIds:['archive-nara-catalog','archive-uk-national']
        },
        {
          id:`${slug}-timeline-3`,
          date:'Phase 3 (Aftermath & Historiography)',
          title:`Documented outcomes, confounders, and later historiographical debate`,
          text:`Compare short-term effects against long-term structural outcomes and competing scholarly interpretations.`,
          epistemicStatus:'SCAFFOLD_GUIDANCE',
          sourceIds:['archive-smithsonian-learning','archive-dig-sheg-method']
        }
      ],
      historicalArguments:[
        {
          id:`${slug}-arg-1`,
          topic:`Primary contemporary debate during ${titleTopic}`,
          decisionWindow:`Focal decision window of ${titleTopic}`,
          contemporaryActor:`Contemporary decision-makers vs. contemporary critics and affected communities`,
          contemporaryArgument:`Decision-makers argued that their chosen intervention in ${titleTopic} would resolve the immediate crisis, while contemporary critics warned of structural bottlenecks and unintended consequences (archive-loc-digital, archive-nara-catalog).`,
          policymakerExpectation:`Policymakers expected the intervention to achieve durable stability without severe secondary costs.`,
          expectationVerdict:'MIXED_AND_CONFOUNDED',
          subsequentEvidence:`Archival records require separating immediate statutory or operational actions from confounded downstream outcomes (archive-avalon-yale, archive-uk-national).`,
          laterHistoriography:`Historians applying primary-source corroboration (archive-dig-sheg-method) emphasize competing institutional vs. structural explanations rather than single-cause consensus.`,
          differenceThatLimits:`Institutional, technological, and legal differences between the era of ${titleTopic} and 2026 limit direct policy copying.`,
          asOfDate:'2026-11-09',
          epistemicStatus:'DISPUTED_INTERPRETATION',
          sourceIds:['archive-loc-digital','archive-nara-catalog','archive-avalon-yale','archive-dig-sheg-method'],
          survivingTextByWithdrawnSource:{
            'archive-dig-sheg-method':`Surviving primary portal basis (archive-loc-digital, archive-nara-catalog, archive-avalon-yale): Primary legal and governmental repositories independently require separating contemporary expectations from subsequent documented outcomes.`
          }
        }
      ],
      outcomes:[
        {
          id:`${slug}-outcomes-1`,
          text:`Documented outcomes for ${titleTopic} must distinguish formal decrees or laws from measured changes on the ground while accounting for simultaneous economic and environmental confounders.`,
          causalStatus:'CONFOUNDED_SEQUENCE',
          epistemicStatus:'SCAFFOLD_GUIDANCE',
          confounders:[
            'Concurrent macroeconomic, demographic, or wartime shifts acting during the same period',
            'Differences between formal legal enactment and local enforcement capacity'
          ],
          counterfactualGap:`Cannot isolate a single decision in ${titleTopic} from concurrent structural forces without comparative counterfactual evidence.`,
          sourceIds:['archive-loc-digital','archive-nara-catalog','archive-avalon-yale']
        }
      ],
      counterexamples:[
        {
          id:`${slug}-counterexample-1`,
          title:`Failure Condition & Counterexample in ${titleTopic}`,
          text:`Where similar interventions in ${titleTopic} lacked local enforcement, independent verification, or material capacity, formal policies failed to achieve their stated aims.`,
          failureCondition:`Interventions fail when formal authority is not matched by physical capacity, verification, and local incentives.`,
          epistemicStatus:'SCAFFOLD_GUIDANCE',
          sourceIds:['archive-uk-national','archive-smithsonian-learning']
        }
      ],
      interpretations:[
        {
          id:`${slug}-interp-1`,
          title:`Institutional & Policy-Choice School on ${titleTopic}`,
          causalEmphasis:`Leadership decisions, legal statutes, and institutional design`,
          text:`Emphasizes the role of specific statutory choices, diplomatic agreements, and leadership decisions in shaping the trajectory of ${titleTopic}.`,
          epistemicStatus:'DISPUTED_INTERPRETATION',
          sourceIds:['archive-loc-digital','archive-avalon-yale']
        },
        {
          id:`${slug}-interp-2`,
          title:`Structural, Material & Bottom-Up Social School on ${titleTopic}`,
          causalEmphasis:`Underlying material constraints, demographics, and lived social resistance`,
          text:`Emphasizes long-run economic, ecological, and social structures that constrained elite policymakers during ${titleTopic}.`,
          epistemicStatus:'DISPUTED_INTERPRETATION',
          sourceIds:['archive-nara-catalog','archive-uk-national','archive-smithsonian-learning']
        }
      ],
      comparison:[
        {
          id:`${slug}-comp-1`,
          dimension:`Institutional & Technological Context (${titleTopic} vs. Present)`,
          timeframe:`Historical decision window vs. modern real-time governance`,
          historical:`Historical actors in ${titleTopic} operated under the communication, legal, and physical constraints of their period.`,
          present:`Evaluate which structural constraints still hold today and which have been transformed by modern law, technology, and verification tools.`,
          limit:`Direct analogy breaks wherever modern communication speed, legal frameworks, and physical infrastructure differ from the historical baseline of ${titleTopic}.`,
          asOfDate:'2026-11-09',
          epistemicStatus:'SCAFFOLD_GUIDANCE',
          sourceIds:['archive-loc-digital','archive-avalon-yale']
        }
      ],
      rejectedComparisons:[
        {
          id:`${slug}-rejected-1`,
          failureCode:'DETERMINISTIC_SINGLE_CAUSE_OVERCLAIM',
          claim:`The history of ${titleTopic} proves a universal law that identical outcomes will inevitably repeat today regardless of institutional context.`,
          whyItFails:`Violates historical causal discipline: historical precedents establish conditional possibilities and structural limits, never deterministic laws.`,
          counterEvidence:`Digital Inquiry Group corroboration & contextualization standards (archive-dig-sheg-method) and archival provenance records.`,
          sourceIds:['archive-loc-digital','archive-dig-sheg-method']
        }
      ],
      consequentialCorrection:{
        targetSourceId:'archive-dig-sheg-method',
        targetSourceTitle:'Digital Inquiry Group Historical Thinking Protocol (SYNOPSIS_ONLY)',
        challengeReason:'Challenging the methodological synopsis card (`archive-dig-sheg-method`) tests that all archival repository bindings survive on primary portal cards.'
      },
      challengePrompts:[
        `Which primary archival collection provides direct contemporaneous evidence for ${titleTopic}?`,
        `How do institutional historians and social/material historians differ in explaining ${titleTopic}?`
      ],
      concepts:[
        {
          term:'Primary Archival Record vs. Secondary Synthesis',
          plain:'A primary record was created at the time under study (such as a statute, diary, or census table); a secondary synthesis is a later historian’s analysis.',
          whyItMatters:`Building a verified inquiry on ${titleTopic} requires anchoring factual claims in primary records while comparing multiple secondary historians.`,
          sourceIds:['archive-loc-digital','archive-dig-sheg-method']
        },
        {
          term:'Corroboration Across Independent Sources',
          plain:'Checking whether two or more independent witnesses or documents agree before treating a contested historical claim as established.',
          whyItMatters:'Prevents a single biased memoir or summary from being mistaken for settled truth.',
          sourceIds:['archive-nara-catalog','archive-uk-national']
        }
      ],
      exhibit:{
        title:`Provisional Verification Workflow for ${titleTopic}`,
        provenanceLabel:`DOCUMENTED_ARCHIVAL_RECONSTRUCTION_DIAGRAM — NOT_A_PHOTOGRAPH. Shows the 3-tier epistemic separation required before promoting ${titleTopic} to verified status.`,
        isOriginalFacsimile:false,
        sourceIds:['archive-loc-digital','archive-nara-catalog','archive-avalon-yale','archive-dig-sheg-method'],
        hotspots:[
          {
            id:`${slug}-hs-1`,
            label:'1. Tier 1: Verified Evidence',
            detail:'Primary archival documents and official institutional series with verified HTTPS URLs, exact locators, and SHA-256 card hashes.',
            sourceIds:['archive-loc-digital','archive-nara-catalog']
          },
          {
            id:`${slug}-hs-2`,
            label:'2. Tier 2: Disputed Interpretations',
            detail:'Competing contemporary arguments and rival scholarly schools—kept visibly plural so consensus is never faked.',
            sourceIds:['archive-avalon-yale','archive-uk-national']
          },
          {
            id:`${slug}-hs-3`,
            label:'3. Tier 3: Unverified Material',
            detail:'Unreviewed draft claims or abstract/synopsis-only items that block promotion until verified or quarantined.',
            sourceIds:['archive-dig-sheg-method']
          }
        ]
      },
      sourceChallenge:{
        title:`Investigate the Sources: Why can't "${titleTopic}" be promoted before reviewing unverified claims?`,
        question:`Inspect the epistemic breakdown for "${titleTopic}". What is required before a provisional inquiry can be promoted to VERIFIED_LOCAL status?`,
        primarySourceId:'archive-loc-digital',
        targetSourceId:'archive-dig-sheg-method',
        options:[
          {
            id:'opt-a',
            label:'Every UNVERIFIED_MATERIAL claim must be corrected/bound to a verified primary source locator (or quarantined), competing interpretations must be present, and all 3-axis citation checks must pass.',
            isSupported:true,
            feedback:'Correct. OpenLine v0.3 blocks promotion whenever unverified claims, fabricated citations, unverified quotes, or unresolved source holds remain.'
          },
          {
            id:'opt-b',
            label:'Any topic can be promoted immediately without checking unverified claims or analogy breakdown limits.',
            isSupported:false,
            feedback:'Incorrect. The v0.3 promotion gate fails closed (`PROMOTION_BLOCKED`) if any unverified claim or validation error remains.'
          }
        ],
        takeaway:'Use the Provisional Review & Promotion Workbench above to correct unverified material and test the promotion gate.'
      },
      quickLookSummaries:{
        question:{
          headline:`Guided Provisional Inquiry: ${titleTopic}`,
          text:`This topic is outside our 5 core verified inquiries. Explore the open-access archival scaffold and see how Verified Evidence, Disputed Interpretations, and Unverified Material are separated.`,
          sourceIds:['archive-loc-digital','archive-avalon-yale']
        },
        'back-then':{
          headline:'Chronological phases: Preconditions, Decision Window, and Aftermath.',
          text:`Follow the structured chronological scaffold for ${titleTopic} and bind specific primary dates and documents.`,
          sourceIds:['archive-loc-digital','archive-nara-catalog']
        },
        debate:{
          headline:'Competing contemporary expectations vs. subsequent outcomes.',
          text:'Distinguish what participants argued at the time from what happened afterward and how historians disagree.',
          sourceIds:['archive-nara-catalog','archive-uk-national']
        },
        'what-happened':{
          headline:'Documented outcomes, confounders, and failure conditions.',
          text:'Separate formal decrees from real-world outcomes and require at least one counterexample.',
          sourceIds:['archive-avalon-yale','archive-smithsonian-learning']
        },
        'different-today':{
          headline:'Where the historical comparison holds—and where it breaks today.',
          text:'Every comparison requires an explicit structural limitation (>=15 chars) and rejects deterministic overclaims.',
          sourceIds:['archive-loc-digital','archive-dig-sheg-method']
        },
        evidence:{
          headline:'6 open-access primary & methodological portals + Promotion Gate.',
          text:'Review and correct the flagged UNVERIFIED_MATERIAL claim before promoting this inquiry to verified local status.',
          sourceIds:['archive-loc-digital','archive-nara-catalog','archive-avalon-yale','archive-uk-national','archive-smithsonian-learning','archive-dig-sheg-method']
        }
      }
    };
  }

  function researchHistoricalSubject(queryOrKey,options={}){
    const raw=typeof queryOrKey==='string'?queryOrKey.trim():'';
    if(!raw||DANGEROUS_HTML_RE.test(raw))throw Error('Valid historical subject or question required');

    // Direct match by subjectKey / id
    let matchedPack=PROVISIONAL_SUBJECT_CATALOG.find(p=>p.id===raw.toLowerCase()||p.subjectKey===raw.toLowerCase());
    if(!matchedPack){
      const det=detectUnfamiliarHistoricalSubject(raw,options.data||null);
      if(!det.isResearchableHistoricalSubject){
        throw Error('Cannot research non-historical forecast, universal ideological claim, or unsafe query: '+(det.reasonCode||'UNSUPPORTED'));
      }
      if(det.researchMode==='RESEARCHED_SUBJECT_PACK'){
        matchedPack=PROVISIONAL_SUBJECT_CATALOG.find(p=>p.subjectKey===det.subjectKey);
      }
    }

    const inquiry=matchedPack
      ?JSON.parse(JSON.stringify(matchedPack))
      :buildGuidedCustomScaffold(raw);

    inquiry.inquiryStatus='PROVISIONAL';
    inquiry.promotedToVerified=false;
    inquiry.queriedSubject=raw;
    inquiry.createdAt=options.createdAt||new Date().toISOString();
    inquiry.reviewAuditTrail=[
      {
        event:'PROVISIONAL_INQUIRY_GENERATED',
        timestamp:inquiry.createdAt,
        query:raw,
        researchMode:inquiry.researchMode||'RESEARCHED_SUBJECT_PACK',
        sourcesCount:inquiry.sources.length,
        initialUnverifiedCount:(inquiry.facts||[]).filter(f=>f.epistemicStatus==='UNVERIFIED_MATERIAL'||f.reviewStatus==='PENDING_REVIEW').length
      }
    ];
    inquiry.quarantinedClaims=[];
    inquiry.epistemicBreakdown=summarizeEpistemicBreakdown(inquiry,options.overrides||{},true);
    return inquiry;
  }

  function correctProvisionalClaim(inquiry,itemId,correctionOptions={}){
    if(!inquiry||typeof inquiry!=='object')throw Error('Provisional inquiry object required');
    const allLists=['facts','timeline','outcomes','comparison','interpretations','historicalArguments'];
    let target=null;
    for(const key of allLists){
      const found=(inquiry[key]||[]).find(x=>x.id===itemId);
      if(found){target=found;break;}
    }
    if(!target)throw Error('Provisional claim not found: '+itemId);

    const nextText=correctionOptions.correctedText||target.verifiedCorrection?.correctedText;
    const nextTitle=correctionOptions.correctedTitle||target.verifiedCorrection?.correctedTitle||target.title;
    // Repair (D-08): accept either `correctedSourceIds` or `sources` as the binding
    // list — a caller-supplied binding must be honored, never silently ignored.
    const nextSources=correctionOptions.correctedSourceIds||correctionOptions.sources||target.verifiedCorrection?.correctedSourceIds||target.sourceIds;
    const reviewerNote=String(correctionOptions.reviewerNote||'Verified against primary/institutional source locator and corrected unverified overclaim.').trim();

    if(!nextText||typeof nextText!=='string'||nextText.trim().length<20||DANGEROUS_HTML_RE.test(nextText)){
      throw Error('Corrected claim text must be at least 20 characters and free of unsafe markup.');
    }
    if(DANGEROUS_HTML_RE.test(reviewerNote)||reviewerNote.length<10){
      throw Error('Reviewer note must be at least 10 characters and free of unsafe markup.');
    }
    const sourceMap=new Map((inquiry.sources||[]).map(s=>[s.id,s]));
    if(!Array.isArray(nextSources)||!nextSources.length||nextSources.some(sid=>!sourceMap.has(sid))){
      throw Error('Corrected claim must bind to valid sourceIds in the inquiry.');
    }
    // Repair (D-08): a correction may only bind to a verifiable source — one with
    // a bundled citation card whose URL matches and a SHA-256 digest. A fabricated
    // source must never flip a claim to VERIFIED_EVIDENCE.
    for(const sid of nextSources){
      const unverifiable=provisionalSourceVerifiable(sourceMap.get(sid));
      if(unverifiable)throw Error('Cannot bind correction to unverifiable source "'+sid+'": '+unverifiable+' Bind corrections only to sources with a bundled citation card whose URL matches the card.');
    }

    // Validate the corrected item against all 9-vector anti-hallucination and causal rules before accepting correction
    const candidateItem={
      ...target,
      title:nextTitle,
      text:nextText.trim(),
      sourceIds:nextSources,
      epistemicStatus:'VERIFIED_EVIDENCE',
      evidenceStatus:'DOCUMENTED',
      reviewStatus:'VERIFIED_BY_REVIEWER'
    };
    validateRecordItem(candidateItem,sourceMap,new Set(),Date.parse(inquiry.asOfDate||'2026-11-09'),365);

    const priorText=target.text;
    target.title=candidateItem.title;
    target.text=candidateItem.text;
    target.sourceIds=candidateItem.sourceIds;
    target.epistemicStatus='VERIFIED_EVIDENCE';
    target.evidenceStatus='DOCUMENTED';
    target.reviewStatus='VERIFIED_BY_REVIEWER';
    target.reviewedNote=reviewerNote;

    if(!Array.isArray(inquiry.reviewAuditTrail))inquiry.reviewAuditTrail=[];
    inquiry.reviewAuditTrail.push({
      event:'PROVISIONAL_CLAIM_CORRECTED_AND_VERIFIED',
      timestamp:correctionOptions.timestamp||new Date().toISOString(),
      itemId,
      priorText,
      correctedText:target.text,
      boundSourceIds:target.sourceIds,
      reviewerNote
    });
    inquiry.epistemicBreakdown=summarizeEpistemicBreakdown(inquiry,correctionOptions.overrides||{},true);
    return inquiry;
  }

  function quarantineProvisionalClaim(inquiry,itemId,reason='Unverified claim quarantined and excluded during review.'){
    if(!inquiry||typeof inquiry!=='object')throw Error('Provisional inquiry object required');
    const cleanReason=String(reason||'').trim();
    if(cleanReason.length<10||DANGEROUS_HTML_RE.test(cleanReason))throw Error('Quarantine reason must be at least 10 characters and free of unsafe markup.');
    const idx=(inquiry.facts||[]).findIndex(x=>x.id===itemId);
    if(idx===-1)throw Error('Provisional fact claim not found: '+itemId);
    const [removed]=inquiry.facts.splice(idx,1);
    removed.reviewStatus='QUARANTINED_EXCLUDED';
    removed.quarantineReason=cleanReason;
    if(!Array.isArray(inquiry.quarantinedClaims))inquiry.quarantinedClaims=[];
    inquiry.quarantinedClaims.push(removed);
    if(!Array.isArray(inquiry.reviewAuditTrail))inquiry.reviewAuditTrail=[];
    inquiry.reviewAuditTrail.push({
      event:'PROVISIONAL_CLAIM_QUARANTINED',
      timestamp:new Date().toISOString(),
      itemId,
      reason:cleanReason
    });
    inquiry.epistemicBreakdown=summarizeEpistemicBreakdown(inquiry,{},true);
    return inquiry;
  }

  // Repair (D-06/D-07/D-08): a provisional source is verifiable only if it carries a
  // bundled citation card whose URL matches the source URL and a SHA-256 digest.
  // A plausible-domain URL with no card, a missing digest, or a URL swapped away
  // from its card must never be certified — the receipt hashes the card, so a
  // top-level URL the card never contained is a forgery the gate must block.
  // Returns null when verifiable, else a human-readable reason.
  function provisionalSourceVerifiable(s){
    if(!s||typeof s!=='object')return 'Source record is missing or malformed.';
    if(!s.id||typeof s.id!=='string')return 'Source is missing an id.';
    if(!safeArchiveURL(s.url))return `Source "${s.id}" has an invalid/placeholder URL.`;
    if(!s.locator||!s.notes||!s.author||!s.title)return `Source "${s.id}" lacks a verifiable archive locator or citation metadata.`;
    if(!s.card||typeof s.card!=='object')return `Source "${s.id}" has no bundled citation card to verify against.`;
    if(!s.sha256||typeof s.sha256!=='string')return `Source "${s.id}" has no citation-card SHA-256 digest.`;
    if(typeof s.card.url!=='string'||s.card.url!==s.url)return `Source "${s.id}" URL does not match its bundled citation card URL.`;
    return null;
  }

  function validateProvisionalInquiry(inquiry,overrides={},options={}){
    const blockers=[];
    if(!inquiry||typeof inquiry!=='object'){
      return {valid:false,blockers:[{code:'MISSING_INQUIRY',message:'Inquiry object is missing.'}],epistemicBreakdown:null};
    }

    // 1. Check sources for fabricated URLs, missing locators, hash mismatches, or active challenge holds
    const sources=new Map();
    if(!Array.isArray(inquiry.sources)||inquiry.sources.length<2){
      blockers.push({code:'INSUFFICIENT_SOURCES',message:'Provisional inquiry requires at least 2 accessible sources.'});
    }else{
      for(const s of inquiry.sources){
        if(!s||!s.id||sources.has(s.id)){
          blockers.push({code:'FABRICATED_OR_INVALID_CITATION',sourceId:s?.id||'unknown',message:`Source "${s?.id||'unknown'}" is missing an id or duplicates another source id.`});
          continue;
        }
        const unverifiable=provisionalSourceVerifiable(s);
        if(unverifiable){
          blockers.push({code:'FABRICATED_OR_INVALID_CITATION',sourceId:s.id,message:unverifiable});
          continue;
        }
        sources.set(s.id,s);
        const ax=verifyEvidenceAxes(s,overrides,true);
        if(ax.byteIntegrity==='HASH_MISMATCH'){
          blockers.push({code:'SOURCE_CARD_HASH_MISMATCH',sourceId:s.id,message:`Source "${s.id}" failed SHA-256 citation-card byte integrity verification.`});
        }
        if(ax.evidentiaryStanding!=='AVAILABLE'){
          blockers.push({code:'ACTIVE_SOURCE_WITHDRAWAL_HOLD',sourceId:s.id,message:`Source "${s.id}" is currently in ${ax.localStatus} standing (${ax.evidentiaryStanding}). Resolve the source challenge or re-bind dependent claims before promoting.`});
        }
      }
    }

    // 2. Check for unreviewed UNVERIFIED_MATERIAL claims
    const breakdown=summarizeEpistemicBreakdown(inquiry,overrides,true);
    if(breakdown.unreviewedProvisionalClaimsCount>0){
      for(const unv of breakdown.unreviewedProvisionalClaims){
        blockers.push({
          code:'UNREVIEWED_PROVISIONAL_MATERIAL',
          itemId:unv.id,
          message:`Claim "${unv.id}" (${unv.title}) is still marked UNVERIFIED_MATERIAL / PENDING_REVIEW. Correct and bind it to a primary locator or quarantine it before promoting.`
        });
      }
    }

    // 3. Check all records & arguments against the 9-vector adversarial validator (hallucinated quotes, quote smuggling, deterministic overclaims, single-cause fallacies, stale dates)
    const ids=new Set();
    const refTime=Date.parse(options.referenceDate||inquiry.asOfDate||'2026-11-09');
    const allItems=[...items(inquiry),...historicalArguments(inquiry)];
    for(const it of allItems){
      try{
        validateRecordItem(it,sources,ids,refTime,365);
      }catch(err){
        blockers.push({
          code:'HALLUCINATION_OR_RECORD_VALIDATION_FAILURE',
          itemId:it?.id||'unknown',
          message:err.message
        });
      }
    }

    // 4. Check competing interpretations & counterexamples
    if(!Array.isArray(inquiry.interpretations)||inquiry.interpretations.length<2){
      blockers.push({code:'MISSING_COMPETING_INTERPRETATIONS',message:'Inquiry must include at least 2 competing scholarly interpretations.'});
    }else{
      const emphases=new Set();
      for(const interp of inquiry.interpretations){
        if(CONSENSUS_WASHING_RE.test(interp.text||'')||CONSENSUS_WASHING_RE.test(interp.title||'')){
          blockers.push({code:'MANUFACTURED_CONSENSUS_ERROR',itemId:interp.id,message:`Interpretation "${interp.id}" claims unanimous scholarly consensus.`});
        }
        if(interp.causalEmphasis)emphases.add(interp.causalEmphasis.trim().toLowerCase());
      }
      if(emphases.size<2){
        blockers.push({code:'HOMOGENEOUS_INTERPRETATIONS',message:'Competing interpretations must have at least 2 distinct causal emphases.'});
      }
    }

    if(!Array.isArray(inquiry.counterexamples)||inquiry.counterexamples.length<1){
      blockers.push({code:'MISSING_COUNTEREXAMPLE',message:'Inquiry must include at least 1 documented counterexample or failure condition.'});
    }

    // 5. Check comparisons & analogy limits
    if(!Array.isArray(inquiry.comparison)||inquiry.comparison.length<1){
      blockers.push({code:'MISSING_COMPARISONS',message:'Inquiry must include at least 1 structural comparison with breakdown limits.'});
    }else{
      for(const comp of inquiry.comparison){
        const evalRes=evaluateComparisonCandidate({claim:(comp.historical||'')+' '+(comp.present||''),limit:comp.limit},inquiry);
        if(evalRes.verdict==='REJECTED'){
          blockers.push({
            code:'MISLEADING_OR_UNBOUNDED_ANALOGY',
            itemId:comp.id,
            message:`Comparison "${comp.id}" failed analogy falsification: ${evalRes.reasons.join(' ')}`
          });
        }
      }
    }

    return {
      valid:blockers.length===0,
      blockers,
      epistemicBreakdown:breakdown
    };
  }

  function promoteProvisionalInquiry(inquiry,overrides={},promotionOptions={}){
    const reviewerNote=String(promotionOptions.reviewerNote||'').trim();
    const validation=validateProvisionalInquiry(inquiry,overrides,promotionOptions);
    const blockers=[...validation.blockers];
    if(reviewerNote.length<15||DANGEROUS_HTML_RE.test(reviewerNote)){
      blockers.push({
        code:'MISSING_REVIEWER_ATTESTATION',
        message:'Promotion requires an explicit human reviewer verification note (at least 15 characters, no unsafe HTML).'
      });
    }
    if(blockers.length>0){
      return {
        promoted:false,
        status:'PROMOTION_BLOCKED',
        blockers,
        epistemicBreakdown:validation.epistemicBreakdown,
        inquiry
      };
    }

    inquiry.inquiryStatus='VERIFIED_LOCAL';
    inquiry.promotedToVerified=true;
    // Repair (D-12): record the actual promotion time, never a hardcoded fallback.
    inquiry.promotedAt=promotionOptions.promotedAt||new Date().toISOString();
    inquiry.reviewerNote=reviewerNote;

    const receiptBody={
      schema:'openline-provisional-promotion-receipt.v1',
      inquiryId:inquiry.id,
      title:inquiry.title,
      promotedAt:inquiry.promotedAt,
      reviewerNote,
      sourcesCount:inquiry.sources.length,
      sourceDigests:inquiry.sources.map(s=>({id:s.id,sha256:s.sha256,url:s.url})),
      verifiedEvidenceCount:validation.epistemicBreakdown.verifiedEvidenceCount,
      disputedInterpretationCount:validation.epistemicBreakdown.disputedInterpretationCount,
      unverifiedMaterialCount:validation.epistemicBreakdown.unverifiedMaterialCount,
      quarantinedExcludedCount:validation.epistemicBreakdown.quarantinedClaimsCount
    };
    // Repair (D-06): receipt generation canonicalizes every source digest — a
    // malformed source that slipped past validation must block promotion, never
    // throw an uncaught error out of the gate.
    let receipt;
    try{
      const receiptSha256=sha256(canonical(receiptBody));
      receipt={...receiptBody,receiptSha256};
    }catch(err){
      return {
        promoted:false,
        status:'PROMOTION_BLOCKED',
        blockers:[{code:'PROMOTION_RECEIPT_FAILURE',message:'Promotion receipt could not be generated from the inquiry sources: '+err.message}],
        epistemicBreakdown:validation.epistemicBreakdown,
        inquiry
      };
    }
    inquiry.promotionReceipt=receipt;
    if(!Array.isArray(inquiry.reviewAuditTrail))inquiry.reviewAuditTrail=[];
    inquiry.reviewAuditTrail.push({
      event:'PROMOTED_TO_VERIFIED_LOCAL',
      timestamp:inquiry.promotedAt,
      reviewerNote,
      receiptSha256:receipt.receiptSha256
    });
    inquiry.epistemicBreakdown=summarizeEpistemicBreakdown(inquiry,overrides,true);

    return {
      promoted:true,
      status:'PROMOTED_TO_VERIFIED_LOCAL',
      blockers:[],
      receipt,
      epistemicBreakdown:inquiry.epistemicBreakdown,
      inquiry
    };
  }

  return {
    UI_VERSION:'0.2.0',
    V03_VERSION:'0.3.0',
    STORY_STEPS,
    DEPTH_LEVELS,
    PLAIN_LANGUAGE_CONCEPTS,
    SOURCE_INVESTIGATION_CHALLENGES,
    ARCHIVAL_EXHIBITS,
    QUICK_LOOK_SUMMARIES,
    PROVISIONAL_SUBJECT_CATALOG,
    OPEN_ACCESS_ARCHIVE_PORTALS,
    detectUnfamiliarHistoricalSubject,
    classifyEpistemicStatus,
    summarizeEpistemicBreakdown,
    researchHistoricalSubject,
    correctProvisionalClaim,
    quarantineProvisionalClaim,
    validateProvisionalInquiry,
    promoteProvisionalInquiry,
    buildStoryJourney,
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
    hasDirectQuote,
    validateNotebook,
    mergeNotebook
  };
});
