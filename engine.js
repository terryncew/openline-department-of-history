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
    const qlMap=QUICK_LOOK_SUMMARIES[cid]||{};
    const concepts=(PLAIN_LANGUAGE_CONCEPTS[cid]||[]).map(item=>{
      const st=standing({id:cid+'-concept-'+item.term,sourceIds:item.sourceIds},caseObj.sources,overrides,integrity);
      return {...item,standing:st};
    });
    const exhibitRaw=ARCHIVAL_EXHIBITS[cid]||null;
    const exhibit=exhibitRaw?{
      ...exhibitRaw,
      standing:standing({id:cid+'-exhibit',sourceIds:exhibitRaw.sourceIds},caseObj.sources,overrides,integrity),
      hotspots:(exhibitRaw.hotspots||[]).map(hs=>({
        ...hs,
        standing:standing({id:hs.id,sourceIds:hs.sourceIds},caseObj.sources,overrides,integrity)
      }))
    }:null;
    const sourceChallenge=SOURCE_INVESTIGATION_CHALLENGES[cid]||null;

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
      }
    };
  }

  return {
    UI_VERSION:'0.2.0',
    STORY_STEPS,
    DEPTH_LEVELS,
    PLAIN_LANGUAGE_CONCEPTS,
    SOURCE_INVESTIGATION_CHALLENGES,
    ARCHIVAL_EXHIBITS,
    QUICK_LOOK_SUMMARIES,
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
