#!/usr/bin/env python3
"""Historical-source adapter over the unchanged MIT Mandate Ledger event chain.

No network requests. Legacy promise=editorial inquiry, official=editorial owner,
action=source/review event, correction=standing event. Never a politician score.
"""
import argparse,json,pathlib,sys,datetime,hashlib,shutil,sqlite3,tempfile
ROOT=pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'third_party/mandate-ledger'))
import ledger as upstream

class HistoryLedger:
 def __init__(self,folder):
  self.folder=pathlib.Path(folder);self.folder.mkdir(parents=True,exist_ok=True)
  self.target_db=self.folder/'history.sqlite3'
  self._stage_dir=None
  try:
   self.conn=upstream.open_db(self.target_db)
  except sqlite3.OperationalError:
   self._stage_dir=tempfile.TemporaryDirectory(prefix='hl-sqlite-')
   self._staged_db=pathlib.Path(self._stage_dir.name)/'history.sqlite3'
   if self.target_db.exists():shutil.copy2(self.target_db,self._staged_db)
   self.conn=upstream.open_db(self._staged_db)
   self._sync()
 def _sync(self):
  if self._stage_dir is not None:
   self.conn.commit()
   self.conn.execute('PRAGMA wal_checkpoint(TRUNCATE)')
   shutil.copy2(self._staged_db,self.target_db)
 def close(self):
  try:
   try:
    self.conn.commit()
    self.conn.execute('PRAGMA wal_checkpoint(TRUNCATE)')
    self.conn.execute('PRAGMA journal_mode=DELETE')
    self.conn.commit()
    if self._stage_dir is not None and self.target_db.parent.exists():
     shutil.copy2(self._staged_db,self.target_db)
   except sqlite3.OperationalError:
    pass
  finally:
   self.conn.close()
   if self._stage_dir is not None:self._stage_dir.cleanup()
 def rows(self):upstream.checked(self.conn);return list(upstream.entries(self.conn))
 def init_case(self,case_id,url):
  if not any(r['payload']['id']==case_id for r in self.rows()):
   self._append('promise',{'id':case_id,'title':'Historical inquiry: '+case_id,'source_url':url,'official':'History Lab editorial inquiry owner','operation':'INQUIRY'})
 def _append(self,kind,payload):
  payload={'date':datetime.date.today().isoformat(),**payload}
  upstream.append(self.conn,kind,payload)
  return upstream.checked(self.conn)
 def _events(self,case_id):return [r for r in self.rows() if r['payload'].get('promise_id')==case_id]
 def ingest(self,case_id,source_id,url,raw,reason='Initial source preservation',kind='CURATOR_CARD'):
  upstream.require_source(url)
  if not raw or len(raw)>10*1024*1024:raise ValueError('Source must be 1 byte to 10 MiB')
  if len(reason.strip())<10:raise ValueError('Document a source review reason')
  if kind not in {'CURATOR_CARD','ORIGINAL_FILE'}:raise ValueError('Invalid preservation kind')
  prior=[r for r in self._events(case_id) if r['payload'].get('source_id')==source_id and r['payload'].get('operation') in {'SOURCE','WITHDRAW'}]
  digest=upstream.digest(raw)
  if prior:
   latest=prior[-1]['payload']
   if latest['source_url']!=url:raise ValueError('Source URL changed; new source ID and review required')
   if latest['operation']=='WITHDRAW':raise ValueError('Withdrawn source requires a new source ID and explicit re-review')
   if latest.get('source_sha256')==digest:return {'status':'UNCHANGED',**upstream.checked(self.conn)}
  path=self.folder/'snapshots'/digest;path.parent.mkdir(exist_ok=True)
  if path.exists() and upstream.digest(path.read_bytes())!=digest:raise ValueError('Stored snapshot corrupted')
  if not path.exists():path.write_bytes(raw)
  version=1+sum(r['payload'].get('operation')=='SOURCE' for r in prior)
  self._append('action',{'id':f'{case_id}-{source_id}-v{version}','title':'Preserved source version','promise_id':case_id,'relation_note':reason,'source_url':url,'operation':'SOURCE','source_id':source_id,'source_sha256':digest,'version':version,'byte_length':len(raw),'preservation':kind})
  return {'status':'PRESERVED','sha256':digest,'version':version,**upstream.checked(self.conn)}
 def latest(self,case_id,source_id):
  events=[r for r in self._events(case_id) if r['payload'].get('source_id')==source_id and r['payload'].get('operation') in {'SOURCE','WITHDRAW'}]
  if not events:raise ValueError('Unknown source')
  return events[-1]
 def withdraw(self,case_id,source_id,reason):
  if len(reason.strip())<10:raise ValueError('Withdrawal needs evidence/reason')
  last=self.latest(case_id,source_id)
  if last['payload']['operation']=='WITHDRAW':raise ValueError('Already withdrawn')
  return self._append('correction',{'id':f'{case_id}-{source_id}-withdraw-{last["seq"]}','title':'Source standing withdrawn','promise_id':case_id,'relation_note':reason,'source_url':last['payload']['source_url'],'operation':'WITHDRAW','source_id':source_id,'bound_sha256':last['payload']['source_sha256']})
 def bind(self,case_id,review_id,source_ids,reason):
  if len(reason.strip())<10 or not source_ids or len(set(source_ids))!=len(source_ids):raise ValueError('Explicit sources and substantive human rubric required')
  bindings=[]
  for sid in source_ids:
   last=self.latest(case_id,sid);p=last['payload']
   if p['operation']!='SOURCE':raise ValueError('Cannot bind withdrawn evidence')
   raw=(self.folder/'snapshots'/p['source_sha256']).read_bytes()
   if upstream.digest(raw)!=p['source_sha256']:raise ValueError('Stored snapshot corrupted')
   bindings.append({'source_id':sid,'event_hash':last['event_hash'],'sha256':p['source_sha256']})
  return self._append('action',{'id':f'{case_id}-{review_id}-review-{len(self.rows())+1}','title':'Human review dependency binding','promise_id':case_id,'relation_note':reason,'source_url':self.latest(case_id,source_ids[0])['payload']['source_url'],'operation':'REVIEW','review_id':review_id,'bindings':bindings})
 def status(self,case_id):
  reviews={r['payload']['review_id']:r for r in self._events(case_id) if r['payload'].get('operation')=='REVIEW'}
  result=[]
  for name,row in reviews.items():
   reasons=[]
   for binding in row['payload']['bindings']:
    last=self.latest(case_id,binding['source_id']);p=last['payload']
    if p['operation']!='SOURCE' or last['event_hash']!=binding['event_hash']:reasons.append(binding['source_id']+': source revised or withdrawn')
    try:
     if upstream.digest((self.folder/'snapshots'/binding['sha256']).read_bytes())!=binding['sha256']:reasons.append(binding['source_id']+': snapshot integrity failed')
    except OSError:reasons.append(binding['source_id']+': preserved snapshot missing')
   result.append({'review_id':name,'status':'REOPEN' if reasons else 'CURRENT','reasons':reasons,'bindings':row['payload']['bindings']})
  return result

def main():
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--dir',required=True);sub=p.add_subparsers(dest='cmd',required=True)
 s=sub.add_parser('seed');s.add_argument('--dataset',default=str(ROOT/'dist/data.json'))
 s=sub.add_parser('ingest');s.add_argument('--case',required=True);s.add_argument('--source',required=True);s.add_argument('--url',required=True);s.add_argument('--file',required=True);s.add_argument('--reason',required=True);s.add_argument('--kind',choices=['CURATOR_CARD','ORIGINAL_FILE'],default='ORIGINAL_FILE')
 s=sub.add_parser('withdraw');s.add_argument('--case',required=True);s.add_argument('--source',required=True);s.add_argument('--reason',required=True)
 s=sub.add_parser('review');s.add_argument('--case',required=True);s.add_argument('--review-id',required=True);s.add_argument('--sources',nargs='+',required=True);s.add_argument('--reason',required=True)
 s=sub.add_parser('status');s.add_argument('--case',required=True)
 s=sub.add_parser('verify');s.add_argument('--expected-head')
 a=p.parse_args();h=HistoryLedger(a.dir)
 try:
  if a.cmd=='seed':
   for c in json.loads(pathlib.Path(a.dataset).read_text())['cases']:
    h.init_case(c['id'],c['sources'][0]['url'])
    for source in c['sources']:h.ingest(c['id'],source['id'],source['url'],upstream.canonical(source['card']).encode())
    existing={r['review_id'] for r in h.status(c['id'])}
    for group in ['facts','timeline','comparison','outcomes','interpretations']:
     for i in c[group]:
      if i['id'] not in existing:h.bind(c['id'],i['id'],i['sourceIds'],'Curated dependency declaration; human historical validity review remains required')
   result=upstream.checked(h.conn)
  elif a.cmd=='ingest':result=h.ingest(a.case,a.source,a.url,pathlib.Path(a.file).read_bytes(),a.reason,a.kind)
  elif a.cmd=='withdraw':result=h.withdraw(a.case,a.source,a.reason)
  elif a.cmd=='review':result=h.bind(a.case,a.review_id,a.sources,a.reason)
  elif a.cmd=='status':result=h.status(a.case)
  else:result=upstream.checked(h.conn,a.expected_head)
  print(json.dumps(result,indent=2))
 finally:h.close()
if __name__=='__main__':
 try:main()
 except (ValueError,OSError) as e:print('REFUSED: '+str(e),file=sys.stderr);sys.exit(2)
