# OpenLine History Lab — Dependencies & Provenance

## Runtime & Build Dependencies
- **Runtime (`dist/index.html`)**: **Zero external dependencies**. Runs 100% offline in any modern browser under strict Content Security Policy (`default-src 'self' data: blob:; connect-src 'self'; object-src 'none'`).
- **Build & Ledger (`scripts/`)**: Python 3 standard library only (`json`, `hashlib`, `pathlib`, `sqlite3`, `zipfile`, `html`).
- **Embedded First-Party Component (`third_party/mandate-ledger/`)**: Unchanged MIT-licensed [OpenLine Mandate Ledger](third_party/mandate-ledger/ledger.py) hash-chained SQLite event store and dependency recall engine (`3/3` upstream tests passing in `third_party/mandate-ledger/test_gpt_dependency_recall.py`, verified against Congressional Roll Call 283 XML fixture `third_party/data/roll283.xml`).
