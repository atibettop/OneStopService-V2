from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
class Scan(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='a' and 'href' in a:self.links.append(a['href'])
root=Path('.');docs={}
for p in root.glob('*.html'):
 q=Scan();q.feed(p.read_text(encoding='utf-8-sig'));docs[p.name]=q
issues=[]
for filename,doc in docs.items():
 if filename=='404.html':continue
 for href in doc.links:
  u=urlsplit(href)
  if u.scheme or u.netloc or u.path.startswith('/'):continue
  target=u.path or filename
  if target in docs and u.fragment and unquote(u.fragment) not in docs[target].ids:issues.append((filename,href))
  elif target not in docs and not Path(target).exists():issues.append((filename,href))
print('broken local links:',issues)
