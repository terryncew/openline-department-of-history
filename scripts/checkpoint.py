#!/usr/bin/env python3
import pathlib,hashlib,zipfile,sys,json
r=pathlib.Path(__file__).resolve().parents[1]
milestone=sys.argv[1]
found={p for p in r.rglob('*') if p.is_file() and not any(x in {'checkpoints','__pycache__','.git','node_modules','.openai'} for x in p.relative_to(r).parts) and p.name!='SHA256SUMS.txt'}
for extra in ['M5_ENGINEERING_HANDOFF.md','ASTRA_M5_BLIND_ACCEPTANCE.md','M5_FINAL_RECOVERY_AND_QUALIFICATION_REPORT.md']:
 ep=r/extra
 if ep.exists():found.add(ep)
files=sorted(found)
manifest=''.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+p.relative_to(r).as_posix()+'\n' for p in files)
(r/'SHA256SUMS.txt').write_text(manifest)
prefix='OPENLINE_DEPARTMENT_OF_HISTORY' if milestone.startswith('M5') else 'OPENLINE_HISTORY_LAB'
out=r/'checkpoints'/f'{prefix}_{milestone}_PRIVATE.zip';out.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files+[r/'SHA256SUMS.txt']:z.write(p,'openline-history-lab/'+p.relative_to(r).as_posix())
sha=hashlib.sha256(out.read_bytes()).hexdigest()
(out.with_suffix('.sha256')).write_text(sha+'  '+out.name+'\n')
print(json.dumps({'path':str(out),'sha256':sha,'bytes':out.stat().st_size,'files':len(files)+1}))
