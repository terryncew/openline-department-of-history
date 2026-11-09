#!/usr/bin/env python3
"""Deterministic, offline, standard-library build. No dependency installation."""
import json,hashlib,pathlib,sys,shutil
ROOT=pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'third_party/mandate-ledger'))
from ledger import canonical,digest,require_source
cases=[]
originals=json.loads((ROOT/'research/ORIGINALS_MANIFEST.json').read_text()) if (ROOT/'research/ORIGINALS_MANIFEST.json').exists() else []
for name in ['cholera','triangle','banking','hormuz','israel_palestine']:
 c=json.loads((ROOT/'research'/f'research_{name}.json').read_text())
 c['theme']={'cholera':'Evidence & public health','triangle':'Work & accountability','banking':'Trust & institutions','hormuz':'Energy & maritime security','israel_palestine':'Civilian protection & treaties'}[name]
 c['place']={'cholera':'London, England','triangle':'New York, United States','banking':'United States','hormuz':'Strait of Hormuz / Red Sea','israel_palestine':'Israel, Palestine & Sinai'}[name]
 for group in ['facts','timeline','comparison','outcomes','interpretations','historicalArguments']:
  for n,item in enumerate(c.get(group,[])):item['id']=item.get('id') or f'{c["id"]}-{group}-{n+1}'
 for s in c['sources']:
  require_source(s['url'])
  s['preservation']='CURATOR_CARD_ONLY'
  s['snapshotLabel']='Preserved citation and curator note; not a copy of the historical document'
  card={k:s[k] for k in ['id','title','author','url','type','locator','accessed','rights','notes','preservation']}
  original=next((o for o in originals if o['sourceId']==s['id'] and 'sha256' in o),None)
  if original:
   raw=(ROOT/original['path']).read_bytes()
   if digest(raw)!=original['sha256']:raise ValueError('Preserved original digest failed')
   dest=ROOT/'dist/originals'/pathlib.Path(original['path']).name;dest.parent.mkdir(exist_ok=True);dest.write_bytes(raw)
   s['attachment']={'path':'originals/'+dest.name,'sha256':original['sha256'],'bytes':len(raw),'acquisition':original['acquisition']}
   s['snapshotLabel']='Citation card preserved; a separately hashed original PDF is included with this release'
   card['attachment']=s['attachment']
  s['card']=card;s['sha256']=digest(canonical(card).encode())
  (ROOT/'evidence'/f'{s["id"]}.json').write_text(canonical(card)+'\n')
 cases.append(c)
data={'schema':'openline-history-lab.v1','version':'0.1.0','curatedOn':'2026-11-08','cases':cases}
raw=canonical(data)
(ROOT/'dist/data.json').write_text(raw+'\n')
(ROOT/'SOURCE_MANIFEST.json').write_text(json.dumps({'schema':'openline-history-sources.v1','data_sha256':digest(raw.encode()),'scope':'Card hashes preserve exact curator notes, not publisher origin or truth. Original attachments have separate hashes. No live monitoring.','originals':originals,'sources':[{k:s[k] for k in ['id','title','url','locator','type','accessed','rights','preservation','sha256']} for c in cases for s in c['sources']]},indent=2)+'\n')
template=(ROOT/'template.html').read_text()
template=template.replace('/*STYLES*/',(ROOT/'styles.css').read_text()).replace('/*ENGINE*/',(ROOT/'engine.js').read_text()).replace('/*DATA*/','const DATA='+raw.replace('<','\\u003c')+'; const DATA_HASH="'+digest(raw.encode())+'";').replace('/*APP*/',(ROOT/'app.js').read_text())
(ROOT/'dist/index.html').write_text(template)
print(json.dumps({'cases':len(cases),'sources':sum(len(c['sources']) for c in cases),'records':sum(sum(len(c[k]) for k in ['facts','timeline','comparison','outcomes','interpretations']) for c in cases),'arguments':sum(len(c.get('historicalArguments',[])) for c in cases),'data_sha256':digest(raw.encode()),'index_bytes':len(template.encode())}))
