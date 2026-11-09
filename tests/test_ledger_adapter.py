import pathlib,tempfile,unittest,sys
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parents[1]/'scripts'))
from evidence_ledger import HistoryLedger,upstream
class AdapterTests(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup);self.h=HistoryLedger(self.tmp.name);self.addCleanup(self.h.close)
  self.url='https://example.org/historical-source';self.h.init_case('case',self.url)
  for sid in ['one','two']:self.h.ingest('case',sid,self.url,b'original '+sid.encode());self.h.bind('case','review-'+sid,[sid],'Explicit test evidence binding')
 def test_update_recalls_only_dependents(self):
  self.h.ingest('case','one',self.url,b'corrected original')
  states={r['review_id']:r['status'] for r in self.h.status('case')};self.assertEqual(states,{'review-one':'REOPEN','review-two':'CURRENT'})
 def test_human_rebind_after_revision(self):
  self.h.ingest('case','one',self.url,b'corrected original');self.h.bind('case','review-one',['one'],'Reviewed the corrected historical record')
  self.assertTrue(all(r['status']=='CURRENT' for r in self.h.status('case')))
 def test_withdrawal_cannot_silently_reingest(self):
  self.h.withdraw('case','one','Source attribution no longer defensible')
  with self.assertRaises(ValueError):self.h.ingest('case','one',self.url,b'original one')
  with self.assertRaises(ValueError):self.h.bind('case','new-review',['one'],'Attempt binding revoked historical source')
 def test_original_bytes_preserved_after_revision(self):
  old=self.h.latest('case','one')['payload']['source_sha256'];self.h.ingest('case','one',self.url,b'new version')
  self.assertEqual((self.h.folder/'snapshots'/old).read_bytes(),b'original one')
 def test_snapshot_corruption_fails_review(self):
  old=self.h.latest('case','one')['payload']['source_sha256'];(self.h.folder/'snapshots'/old).write_bytes(b'corrupt')
  self.assertEqual(self.h.status('case')[0]['status'],'REOPEN')
  with self.assertRaises(ValueError):self.h.bind('case','new',['one'],'Must reject corrupted snapshot bytes')
 def test_unchanged_source_is_idempotent(self):
  head=upstream.checked(self.h.conn)['head'];self.h.ingest('case','one',self.url,b'original one');self.assertEqual(upstream.checked(self.h.conn)['head'],head)
 def test_anchor_detects_later_append(self):
  head=upstream.checked(self.h.conn)['head'];self.h.withdraw('case','one','Documented uncertainty now needs review')
  with self.assertRaises(ValueError):upstream.checked(self.h.conn,head)
 def test_changed_source_url_refused(self):
  with self.assertRaises(ValueError):self.h.ingest('case','one','https://different.example.org/source',b'new')

import json, subprocess
import conventional_baseline

ROOT = pathlib.Path(__file__).resolve().parents[1]

class ArgonLedgerAndBaselineTests(unittest.TestCase):
 def setUp(self):
  self.data = json.loads((ROOT / "dist" / "data.json").read_text(encoding="utf-8"))

 def test_five_cases_and_44_sources_present_in_dataset(self):
  case_ids = [c["id"] for c in self.data["cases"]]
  self.assertEqual(case_ids, ["cholera", "triangle", "banking", "hormuz", "israel-palestine"])
  total_sources = sum(len(c["sources"]) for c in self.data["cases"])
  self.assertEqual(total_sources, 44)  # Repair F7/F9: +2 sources (tri-dyrud-insurance, hormuz-eia-2026-closure)

 def test_hormuz_and_israel_palestine_consequential_withdrawal_in_sqlite_ledger(self):
  with tempfile.TemporaryDirectory() as tmp:
   h = HistoryLedger(pathlib.Path(tmp) / "ledger")
   self.addCleanup(h.close)
   for c in self.data["cases"]:
    h.init_case(c["id"], c["sources"][0]["url"])
    for s in c["sources"]:
     h.ingest(c["id"], s["id"], s["url"], upstream.canonical(s["card"]).encode())
    for group in ["facts", "timeline", "comparison", "outcomes", "interpretations"]:
     for item in c[group]:
      h.bind(c["id"], item["id"], item["sourceIds"], "Curated dependency declaration; human historical validity review remains required")
   self.assertEqual(len(h.rows()), 154)  # Repair F7/F9: +3 ledger events (+2 sources, +1 outcome)

   # 1. Challenge hormuz-gholz-press-2010 in Strait of Hormuz case
   h.withdraw("hormuz", "hormuz-gholz-press-2010", "Public online landing page provides only abstract and metadata; full text paywalled.")
   hormuz_reopened = sorted(r["review_id"] for r in h.status("hormuz") if r["status"] == "REOPEN")
   self.assertEqual(hormuz_reopened, [
    "hormuz-comparison-3",
    "hormuz-facts-5",
    "hormuz-interpretations-1",
    "hormuz-outcomes-1",
   ])
   hormuz_current = [r["review_id"] for r in h.status("hormuz") if r["status"] == "CURRENT"]
   self.assertEqual(len(hormuz_current), 19)  # Repair F9: +1 untouched Hormuz record (hormuz-outcomes-4)

   # 2. Challenge ip-icj-provisional-2024 in Israel-Palestine case
   h.withdraw("israel-palestine", "ip-icj-provisional-2024", "Quarantining ICJ Art. 41 Provisional Measures Order to test whether humanitarian facts survive on UN OCHA operational data.")
   ip_reopened = sorted(r["review_id"] for r in h.status("israel-palestine") if r["status"] == "REOPEN")
   self.assertEqual(ip_reopened, [
    "ip-facts-6",
    "ip-outcomes-3",
    "israel-palestine-comparison-4",
    "israel-palestine-timeline-5",
   ])
   ip_current = [r["review_id"] for r in h.status("israel-palestine") if r["status"] == "CURRENT"]
   self.assertEqual(len(ip_current), 18)

   # Re-review surviving multi-source claim israel-palestine-comparison-4 using remaining sources
   h.bind(
    "israel-palestine",
    "israel-palestine-comparison-4",
    ["ip-icj-advisory-2024", "ip-icc-warrants-2024"],
    "Survives on ICJ Advisory Opinion (2024) and ICC Pre-Trial Chamber I warrants without relying on ICJ Art. 41 order.",
   )
   ip_reopened_after = sorted(r["review_id"] for r in h.status("israel-palestine") if r["status"] == "REOPEN")
   self.assertEqual(ip_reopened_after, [
    "ip-facts-6",
    "ip-outcomes-3",
    "israel-palestine-timeline-5",
   ])

 def test_conventional_baseline_generates_and_evaluates_all_six_criteria(self):
  brief_path = conventional_baseline.generate_conventional_brief(self.data)
  self.assertTrue(brief_path.exists())
  brief_html = brief_path.read_text(encoding="utf-8")
  self.assertIn("Strait of Hormuz", brief_html)
  self.assertIn("Israel–Palestine", brief_html)

  summary = conventional_baseline.evaluate_comparison(self.data, brief_path)
  self.assertEqual(summary["casesCount"], 5)
  self.assertEqual(summary["sourcesCount"], 44)  # Repair F7/F9
  self.assertEqual(summary["recordsCount"], 105)  # Repair F9: +1 outcome record
  self.assertEqual(len(summary["criteria"]), 6)
  verdicts = {c["id"]: c["verdict"] for c in summary["criteria"]}
  self.assertEqual(verdicts["C5_correction_after_challenged_evidence"], "PARITY_ON_SINGLE_SOURCE_LOOKUP_IMPROVED_ON_MULTI_SOURCE_COMBINATORIAL_NARROWING")
  self.assertIn("Explicit Source-Dependency &amp; Reverse-Impact Matrix", brief_html)


 def test_m5_comparable_arguments_and_searchable_reference_baseline(self):
  total_args = sum(len(c.get("historicalArguments", [])) for c in self.data["cases"])
  self.assertEqual(total_args, 15)
  for c in self.data["cases"]:
   self.assertIn("questionProfile", c)
   self.assertEqual(len(c["historicalArguments"]), 3)
  brief_path = conventional_baseline.generate_conventional_brief(self.data)
  brief_html = brief_path.read_text(encoding="utf-8")
  self.assertIn("6B. Comparable Historical Arguments", brief_html)
  self.assertIn("ref-search-input", brief_html)
  summary = conventional_baseline.evaluate_comparison(self.data, brief_path)
  self.assertEqual(summary["argumentsCount"], 15)
  self.assertTrue(summary["searchableReferenceInterface"])


 def test_v02_progressive_depths_and_v010_comparison_metrics(self):
  brief_path = conventional_baseline.generate_conventional_brief(self.data)
  summary = conventional_baseline.evaluate_comparison(self.data, brief_path)
  self.assertEqual(summary["version"], "0.2.0")
  v02m = summary["v02ComparisonMetrics"]
  self.assertEqual(v02m["progressiveDepthLevels"], 3)
  self.assertEqual(v02m["storyJourneySteps"], 6)
  self.assertEqual(v02m["plainLanguageConcepts"], 20)
  self.assertEqual(v02m["sourceInvestigationChallenges"], 5)
  self.assertGreater(v02m["initialReadingBurdenReductionPercent"], 50.0)

if __name__=="__main__":unittest.main()
