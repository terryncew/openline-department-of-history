#!/usr/bin/env python3
"""Promise Ledger 001: local neutral civic evidence log. Python 3.11+, no dependencies."""
import argparse
import datetime as dt
import hashlib
import json
import pathlib
import re
import sqlite3
import sys
import xml.etree.ElementTree as ET
from urllib.parse import urlparse

GENESIS = '0' * 64
VALID_TYPES = {'promise', 'action', 'outcome', 'correction'}


def canonical(obj):
    return json.dumps(obj, ensure_ascii=False, sort_keys=True, separators=(',', ':'))


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def require_date(value):
    dt.date.fromisoformat(value)
    return value


def require_source(url):
    parsed = urlparse(url)
    if parsed.scheme != 'https' or not parsed.netloc or parsed.username or parsed.password:
        raise ValueError('Source must be a public HTTPS URL without credentials')
    return url


def open_db(path):
    c = sqlite3.connect(path)
    c.execute('PRAGMA busy_timeout=3000')
    c.execute('PRAGMA journal_mode=WAL')
    c.execute('CREATE TABLE IF NOT EXISTS events (seq INTEGER PRIMARY KEY, created TEXT NOT NULL, kind TEXT NOT NULL, payload TEXT NOT NULL, prev_hash TEXT NOT NULL, event_hash TEXT NOT NULL)')
    c.execute('CREATE TRIGGER IF NOT EXISTS no_update BEFORE UPDATE ON events BEGIN SELECT RAISE(ABORT, "append-only"); END')
    c.execute('CREATE TRIGGER IF NOT EXISTS no_delete BEFORE DELETE ON events BEGIN SELECT RAISE(ABORT, "append-only"); END')
    c.commit()
    return c


def entries(c):
    for r in c.execute('SELECT seq, created, kind, payload, prev_hash, event_hash FROM events ORDER BY seq'):
        yield dict(seq=r[0], created=r[1], kind=r[2], payload=json.loads(r[3]), prev_hash=r[4], event_hash=r[5])


def checked(c, expected_head=None):
    prev = GENESIS
    n = 0
    ids = set()
    for row in entries(c):
        n += 1
        if row['seq'] != n or row['prev_hash'] != prev or row['kind'] not in VALID_TYPES:
            raise ValueError('Broken ledger sequence or previous hash at event ' + str(n))
        candidate = dict(seq=n, created=row['created'], kind=row['kind'], payload=row['payload'], prev_hash=prev)
        if digest(canonical(candidate).encode()) != row['event_hash']:
            raise ValueError('Altered event content at event ' + str(n))
        payload = row['payload']
        eid = payload.get('id')
        if not isinstance(eid, str) or not eid or eid in ids:
            raise ValueError('Missing or duplicate event ID at event ' + str(n))
        ids.add(eid)
        prev = row['event_hash']
    if expected_head is not None and prev != expected_head:
        raise ValueError('Ledger head differs from externally saved anchor')
    return {'events': n, 'head': prev, 'hash_chain_valid': True, 'external_anchor_checked': expected_head is not None}


def append(c, kind, payload):
    if kind not in VALID_TYPES:
        raise ValueError('Unsupported kind')
    for key in ('id', 'title', 'date', 'source_url'):
        if not isinstance(payload.get(key), str) or not payload[key].strip():
            raise ValueError('Missing ' + key)
    require_date(payload['date'])
    require_source(payload['source_url'])
    if kind == 'promise' and not payload.get('official'):
        raise ValueError('Promise needs an official or candidate name')
    if kind != 'promise' and not payload.get('promise_id'):
        raise ValueError('Evidence needs explicit promise_id')
    if kind != 'promise' and not payload.get('relation_note'):
        raise ValueError('Evidence link needs a human-readable relevance note')
    c.execute('BEGIN IMMEDIATE')
    try:
        # Do not append onto an already corrupted chain.
        checked(c)
        old = list(entries(c))
        if any(x['payload']['id'] == payload['id'] for x in old):
            raise ValueError('Duplicate ID')
        if kind != 'promise' and not any(x['kind']=='promise' and x['payload']['id']==payload['promise_id'] for x in old):
            raise ValueError('Linked promise not found')
        seq = len(old) + 1
        prev = old[-1]['event_hash'] if old else GENESIS
        created = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()
        body = {'seq':seq,'created':created,'kind':kind,'payload':payload,'prev_hash':prev}
        h = digest(canonical(body).encode())
        c.execute('INSERT INTO events VALUES (?,?,?,?,?,?)', (seq,created,kind,canonical(payload),prev,h))
        c.commit()
    except Exception:
        c.rollback()
        raise
    return h


def export_data(c):
    status = checked(c)
    promises = []
    by_id = {}
    for e in entries(c):
        item = dict(e['payload'])
        item['kind'] = e['kind']
        item['event_hash'] = e['event_hash']
        item['logged_at'] = e['created']
        if e['kind'] == 'promise':
            p = dict(item)
            p['evidence'] = []
            promises.append(p)
            by_id[p['id']] = p
        else:
            by_id[item['promise_id']]['evidence'].append(item)
    return {'schema': 'promise-ledger.v0.1', 'mode':'LOCAL_UNVERIFIED_SOURCE_CONTENT', 'integrity':status, 'promises':promises,
            'disclaimer':'Links and hashes show attribution and file integrity, not truth, fulfillment, causation, or independently anchored provenance.'}


def senate_xml_to_action(path, source_url, promise_id, senator, event_id, note):
    require_source(source_url)
    parsed_url = urlparse(source_url)
    if parsed_url.hostname != 'www.senate.gov' or '/roll_call_votes/' not in parsed_url.path or not parsed_url.path.endswith('.xml'):
        raise ValueError('Senate XML source must be a www.senate.gov roll_call_votes XML URL')
    raw = pathlib.Path(path).read_bytes()
    if len(raw) > 2_000_000 or b'<!DOCTYPE' in raw.upper() or b'<!ENTITY' in raw.upper():
        raise ValueError('XML too large or has document/entity declarations')
    root = ET.fromstring(raw)
    def val(key):
        node = root.find('.//' + key)
        return (node.text or '').strip() if node is not None else ''
    congress, session, vote_no = val('congress'), val('session'), val('vote_number')
    vote_date = val('vote_date')
    question = val('vote_question_text') or val('vote_question')
    result = val('vote_result')
    if not congress or not session or not vote_no or not question:
        raise ValueError('Not a recognized Senate roll-call XML record')
    candidates = []
    needle = ' '.join(senator.lower().split())
    for m in root.findall('.//members/member'):
        full = ' '.join(filter(None, [(m.findtext('first_name') or '').strip(), (m.findtext('last_name') or '').strip()]))
        # Requires exact full name; never infer a vote by partial surname.
        if ' '.join(full.lower().split()) == needle:
            candidates.append({'name':full,'vote':(m.findtext('vote_cast') or '').strip()})
    if len(candidates) != 1 or not candidates[0]['vote']:
        raise ValueError('Exactly one full-name senator match with a recorded vote required')
    return {'id':event_id,'title':f'Senate roll call {congress}-{session} #{vote_no}: {question}',
            'date':dt.date.today().isoformat(), 'source_url':source_url, 'promise_id':promise_id,
            'relation_note':note, 'official_source_sha256':digest(raw),
            'senator':candidates[0]['name'],'senator_vote':candidates[0]['vote'],
            'vote_date_as_published':vote_date,'senate_result':result,'congress':congress,
            'session':session,'vote_number':vote_no,
            'caution':'Imported record only. Relevance to a promise is editorial, not automatically established. Event date is ingestion date; original vote date preserved separately.'}


def main(argv=None):
    p=argparse.ArgumentParser(description='Independent local campaign-promise evidence ledger')
    p.add_argument('--db', default='promise-ledger.sqlite3')
    subs=p.add_subparsers(dest='cmd',required=True)
    subs.add_parser('init')
    q=subs.add_parser('add')
    q.add_argument('--kind',choices=sorted(VALID_TYPES),required=True)
    q.add_argument('--json',required=True,help='Path to an evidence JSON file')
    q=subs.add_parser('verify')
    q.add_argument('--expected-head',help='Hash previously saved outside this database')
    q=subs.add_parser('export')
    q.add_argument('--output',required=True)
    q=subs.add_parser('import-senate-xml')
    for name in ['file','source-url','promise-id','senator','event-id','relation-note']:
        q.add_argument('--'+name,required=True)
    a=p.parse_args(argv)
    c=open_db(a.db)
    if a.cmd=='init':
        print('Initialized separate local ledger:',a.db)
    elif a.cmd=='add':
        payload=json.loads(pathlib.Path(a.json).read_text(encoding='utf-8'))
        print('Saved event hash:',append(c,a.kind,payload))
    elif a.cmd=='import-senate-xml':
        payload=senate_xml_to_action(a.file,a.source_url,a.promise_id,a.senator,a.event_id,a.relation_note)
        print('Saved imported Senate action:',append(c,'action',payload))
    elif a.cmd=='verify':
        print(json.dumps(checked(c,a.expected_head),indent=2))
    elif a.cmd=='export':
        out=export_data(c)
        pathlib.Path(a.output).write_text(json.dumps(out,indent=2,ensure_ascii=False),encoding='utf-8')
        print('Exported',len(out['promises']),'promises to',a.output,'head',out['integrity']['head'])
    c.close()

if __name__=='__main__':
    try: main()
    except (ValueError,sqlite3.Error,ET.ParseError) as ex:
        print('REFUSED:',ex,file=sys.stderr)
        sys.exit(2)
