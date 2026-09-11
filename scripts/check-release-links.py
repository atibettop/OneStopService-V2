from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
root=Path('.').resolve()
class Scan(HTMLParser):
 def __init__(self):super().__init__();self.ids=set();self.refs=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id'in a:self.ids.add(a['id'])
  for key in ['href','src']:
   if key in a and tag!='base':self.refs.append(a[key])
docs={}
for p in [*root.glob('*.html'),*root.glob('en/*.html')]:
 d=Scan();d.feed(p.read_text(encoding='utf-8-sig'));docs[p]=d
issues=[]
for p,d in docs.items():
 for raw in d.refs:
  u=urlsplit(raw)
  if u.scheme or u.netloc:continue
  path=unquote(u.path)
  if path.startswith('/OneStopService-V2/'):target=root/path.removeprefix('/OneStopService-V2/')
  elif path.startswith('/'):target=root/path.lstrip('/')
  else:target=(p.parent/path).resolve() if path else p
  if not target.exists():issues.append((str(p.relative_to(root)),raw))
  elif target in docs and u.fragment and unquote(u.fragment) not in docs[target].ids:issues.append((str(p.relative_to(root)),raw))
print('Broken page/asset/fragment references:',issues)
raise SystemExit(bool(issues))
