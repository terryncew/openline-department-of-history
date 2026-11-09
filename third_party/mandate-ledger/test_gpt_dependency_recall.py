"""Synthetic source-change falsifiers; never represented as real changed Clerk files."""
from pathlib import Path
import tempfile,sys,unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from house_clerk_loop import MandateEvidenceLoop
ROOT=Path(__file__).resolve().parents[1]
XML=(ROOT/'data'/'roll283.xml').read_bytes()
URL='https://clerk.house.gov/evs/2026/roll283.xml'
class DependencyRecall(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
  self.loop=MandateEvidenceLoop(Path(self.tmp.name)/'db.sqlite');self.addCleanup(self.loop.close)
  rec=self.loop.ingest_rollcall_xml(XML,source_url=URL)
  self.rk=rec['record_key']
  for name,bg in [('aderholt','A000055'),('adams','A000370')]:
   self.loop.register_review(review_id='r-'+name,promise_id='fictional-p-'+name,record_key=self.rk,
                bioguide_id=bg,human_rubric_id='fictional-human-rubric',summary_note='synthetic test review')
 def test_changed_bill_description_reopens_reviews_even_when_all_votes_identical(self):
  new=XML.replace(b'Removing Barriers to Work for Disabled Americans Act',b'CORRECTED DATA SYNTHETIC BILL TITLE',1)
  self.assertNotEqual(new,XML)
  result=self.loop.ingest_rollcall_xml(new,source_url=URL)
  self.assertEqual(set(result['reopened_reviews']),{'r-aderholt','r-adams'})
 def test_changed_member_identity_reopens_that_members_review(self):
  new=XML.replace(b'unaccented-name="Aderholt"',b'unaccented-name="Aderholt synthetic correction"',1)
  self.assertNotEqual(new,XML)
  result=self.loop.ingest_rollcall_xml(new,source_url=URL)
  self.assertEqual(set(result['reopened_reviews']),{'r-aderholt'})
 def test_legislation_reference_correction_persists_and_reopens(self):
  new=XML.replace(b'<legis-num>H R 8884</legis-num>',b'<legis-num>H R 8885</legis-num>',1)
  self.assertNotEqual(new,XML)
  result=self.loop.ingest_rollcall_xml(new,source_url=URL)
  self.assertEqual(set(result['reopened_reviews']),{'r-aderholt','r-adams'})
  rec=self.loop.conn.execute('SELECT legis_num FROM rollcall_records').fetchone()[0]
  self.assertEqual(rec,'H R 8885')
if __name__=='__main__':unittest.main()
