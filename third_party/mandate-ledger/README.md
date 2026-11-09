# Mandate Ledger — Evidence That Remembers

**Experimental open-source source release v0.3.3 | MIT | Public records, no political scoring**

Governments make records; people need to know what those records support. Mandate Ledger preserves original source bytes and versions, tracks recorded actions and human-reviewed commitments, automatically reopens dependent reviews when the evidence changes, and refuses to turn missing data or contributions into unsupported allegations.

**This is a public-data research tool, not a political endorsement, politician ranking, or certified fact-checker.** Its included browser demo contains fictional promises. A separate frozen House Clerk roll-call example contains real recorded votes.

## Try it now — 0 accounts, 0 API keys

Python 3.11+ (standard library only), all commands local:

```sh
./REPLAY_EXPERIMENTAL.sh
python3 house_cli.py --db ./local/mandate.sqlite3 ingest \
  --file data/roll283.xml \
  --source-url https://clerk.house.gov/evs/2026/roll283.xml
python3 house_cli.py --db ./local/mandate.sqlite3 member \
  --year 2026 --roll 283 --id A000055
```

These commands store a provided official-record example, detect duplicate imports, and show its exact member vote, with the source URL and content digest. On a network-enabled machine, one optional read-only public-data sync can be triggered:

```sh
python3 house_cli.py --db ./local/mandate.sqlite3 sync --year 2026 --roll 283
```

To watch for future source changes automatically, run `watch --year 2026 --roll 283 --interval-seconds 86400` under your own process supervisor. It only performs public HTTPS GETs and updates a local database; it does not post findings, contact officeholders, or score candidates. **The live HTTPS watcher has not been validated end-to-end against the government endpoint in this independent review environment**; use the frozen-source offline path for reproducible proof.

## Evidence and limits

- Verified source example: U.S. House Clerk roll call **283**, July 23, 2026, H.R. 8884. The package includes `data/roll283.xml` SHA-256 `6700b416be260164cc4d6804f9b0c46da878aa33a1ffce53a93cebb719c3fc8f` and matches the official published summary: 232 Yea, 188 Nay, 0 Present, 11 Not Voting. Source page: https://clerk.house.gov/evs/2026/roll283
- SQLite records original bytes and SHA-256, preserves versions, and reopens reviews when votes or source standing change. An unchanged repeat import is idempotent.
- The source URL must match the exact Clerk domain and roll number. DTD/entities, oversized or malformed XML, redirects, and reimport of revoked evidence are refused. **A matching official URL supplied by a caller is not proof the bytes actually originated from that server.** The database field `evidence_status=VERIFIED` indicates structural/internal consistency only, *not independent authentication of publisher origin*.
- An official roll call proves recorded vote positions. It does not prove campaign-promise fulfillment, motive, bribery, or how an officeholder should be rated. A separate human rubric is needed for interpretive conclusions.
- The original Mandate Ledger 002 package was unavailable to Argon's environment; this 003 candidate builds from the **verified earlier Promise Ledger 001** plus a separate official House Clerk ingestion extension. It does **not** silently claim to be the 47-test Mandate Ledger 002 lineage.
- Tests: **38/38** (31 previous plus 7 new source-standing, integrity, party-tally and tampered-row falsifiers). The `member` command refuses revoked evidence and a member row that disagrees with the preserved Clerk XML. Full reconciliation checks every stored member and essential record metadata, not merely sampled votes. A competent conventional SQLite baseline matches the tested data correctness; OpenLine adds discipline about evidence standing, review reopening, and explicit no-inference rules.

The static `web/index.html` is a clearly fictional example. It does not auto-fetch official data or verify imported JSON itself. Use the Python ledger for authoritative local integrity checks.

See `RELEASE_GATE.md`, `DEDICATION.md`, and `SHA256SUMS.txt`.
