"""Operator-only local inbox reader. No public web endpoint."""
import argparse,json,sqlite3
from pathlib import Path
from contextlib import closing
parser=argparse.ArgumentParser()
parser.add_argument('--db',required=True,help='Private SQLite path outside website')
parser.add_argument('--show',help='Show one receipt by its MSG reference')
parser.add_argument('--limit',type=int,default=20)
a=parser.parse_args()
p=Path(a.db).resolve()
if not p.is_file():parser.error('Database does not exist')
with closing(sqlite3.connect(p.as_uri()+'?mode=ro',uri=True)) as db:
 if a.show:
  row=db.execute('SELECT lead_id,created_at,status,payload FROM leads WHERE lead_id=?',(a.show,)).fetchone()
  if not row:parser.error('Reference not found')
  print(json.dumps(dict(reference=row[0],created_at=row[1],status=row[2],request=json.loads(row[3])),ensure_ascii=False,indent=2))
 else:
  rows=db.execute('SELECT lead_id,created_at,status FROM leads ORDER BY created_at DESC LIMIT ?',(max(1,min(100,a.limit)),)).fetchall()
  print(json.dumps([dict(reference=r[0],created_at=r[1],status=r[2]) for r in rows],ensure_ascii=False,indent=2))
