const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const crypto=require('node:crypto');const E=require('../engine.js');const d=JSON.parse(fs.readFileSync(__dirname+'/../dist/data.json','utf8'));
test('all 5 curated cases have valid explicit dependencies',()=>{assert.equal(d.cases.length,5);assert.equal(E.validate(d),true)});
test('every source card digest matches the preserved note',()=>{for(const c of d.cases)for(const s of c.sources)assert.equal(crypto.createHash('sha256').update(E.canonical(s.card)).digest('hex'),s.sha256)});
test('missing source fails visibly',()=>assert.equal(E.standing({sourceIds:['missing']},[]).state,'UNSUPPORTED'));
test('revocation reopens dependents and preserves unrelated records',()=>{const c=d.cases[0],id=c.sources[0].id,overrides={[id]:{status:'WITHDRAWN'}};for(const i of E.items(c))assert.equal(E.standing(i,c.sources,overrides).state,i.sourceIds.includes(id)?'REOPEN':'AVAILABLE')});
test('failed integrity blocks all supported claims',()=>{const c=d.cases[0];assert.equal(E.standing(c.facts[0],c.sources,{},false).state,'BLOCKED')});
test('URL policies reject script, credentials and HTTP',()=>{for(const u of ['javascript:alert(1)','https://x:y@example.com','http://example.com'])assert.equal(E.safeURL(u),false)});
