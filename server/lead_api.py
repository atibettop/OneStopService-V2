"""Minimal private lead inbox API. Deploy behind HTTPS; never publish its SQLite file."""
import json, os, re, sqlite3, time, uuid, threading
from pathlib import Path
from contextlib import closing
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
ORIGINS=set(os.environ.get('LEAD_ALLOWED_ORIGINS','http://127.0.0.1:8090').split(','))
if not os.environ.get('LEAD_DB_PATH'):raise RuntimeError('Set LEAD_DB_PATH to a private absolute path outside the website directory')
DB=Path(os.environ['LEAD_DB_PATH']).resolve()
if DB.is_relative_to(Path(__file__).resolve().parents[1]):raise RuntimeError('Database must be outside the website directory')
DB.parent.mkdir(parents=True,exist_ok=True)
with closing(sqlite3.connect(DB)) as db:
 db.execute('CREATE TABLE IF NOT EXISTS leads (request_id TEXT PRIMARY KEY, lead_id TEXT UNIQUE, created_at TEXT, payload TEXT, status TEXT DEFAULT "New")')
LIMITS={};LOCK=threading.Lock()
SERVICES={'payroll-outsourcing','recruitment','hr-consulting','foreign-worker','visa-work-permit','event-management'}
class Handler(BaseHTTPRequestHandler):
 def log_message(self,*args): pass # Do not log request bodies or contact data.
 def respond(self,status,data):
  self.send_response(status)
  origin=self.headers.get('Origin','')
  if origin in ORIGINS:self.send_header('Access-Control-Allow-Origin',origin)
  self.send_header('Vary','Origin');self.send_header('Cache-Control','no-store');self.send_header('Content-Type','application/json');self.end_headers();self.wfile.write(json.dumps(data).encode())
 def do_OPTIONS(self):
  if self.headers.get('Origin') not in ORIGINS:return self.respond(403,{'error':'origin'})
  self.send_response(204);self.send_header('Access-Control-Allow-Origin',self.headers['Origin']);self.send_header('Access-Control-Allow-Methods','POST, OPTIONS');self.send_header('Access-Control-Allow-Headers','Content-Type');self.send_header('Vary','Origin');self.end_headers()
 def do_POST(self):
  if self.path!='/leads':return self.respond(404,{'error':'not_found'})
  if self.headers.get('Origin') not in ORIGINS:return self.respond(403,{'error':'origin'})
  if self.headers.get('Content-Type','').split(';')[0]!='application/json':return self.respond(415,{'error':'content_type'})
  try:
   size=int(self.headers.get('Content-Length','0'))
   if not 0<size<=32000:return self.respond(413,{'error':'size'})
   data=json.loads(self.rfile.read(size))
   if not isinstance(data,dict):raise ValueError()
   request_id=str(uuid.UUID(data.get('requestId','')))
   fields={}
   for key,maximum in [('company',160),('name',100),('phone',40),('email',160),('requirement',5000),('position',160),('estimate',2000)]:
    value=data.get(key,'')
    if not isinstance(value,str) or len(value)>maximum:raise ValueError()
    fields[key]=value.strip()
   if any(not fields[k] for k in ['company','name','phone','email','requirement']):raise ValueError()
   if not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+',fields['email']):raise ValueError()
   if len(re.sub(r'\D','',fields['phone']))<7:raise ValueError()
   services=data.get('services')
   if not isinstance(services,list) or not services or len(services)>6 or any(not isinstance(x,str) or x not in SERVICES for x in services):raise ValueError()
   fields['services']=services
   employees=data.get('employees','')
   if employees!='':
    if isinstance(employees,bool) or not str(employees).isdigit() or not 1<=int(employees)<=1000000:raise ValueError()
   elif 'payroll-outsourcing' in services:raise ValueError()
   fields['employees']=employees
   if data.get('website'):raise ValueError()
  except (ValueError,TypeError,AttributeError):return self.respond(422,{'error':'validation'})
  payload=json.dumps(fields,ensure_ascii=False,sort_keys=True)
  try:
   with LOCK,closing(sqlite3.connect(DB)) as db:
    old=db.execute('SELECT lead_id,payload FROM leads WHERE request_id=?',(request_id,)).fetchone()
    if old:
     if old[1]!=payload:return self.respond(409,{'error':'request_changed'})
     return self.respond(200,{'leadId':old[0],'status':'received'})
    now=time.time();ip=self.client_address[0]
    for key in list(LIMITS):
     LIMITS[key]=[t for t in LIMITS[key] if now-t<600]
     if not LIMITS[key]:del LIMITS[key]
    history=LIMITS.setdefault(ip,[])
    if len(history)>=10:return self.respond(429,{'error':'rate_limit'})
    lead_id='MSG-'+uuid.uuid4().hex[:12].upper()
    db.execute('INSERT INTO leads(request_id,lead_id,created_at,payload) VALUES(?,?,?,?)',(request_id,lead_id,time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),payload))
    db.commit();history.append(now)
   return self.respond(201,{'leadId':lead_id,'status':'received'})
  except sqlite3.Error:return self.respond(503,{'error':'storage_unavailable'})
if __name__=='__main__':
 print('Lead inbox listening on configured local port; no public read endpoint.',flush=True)
 ThreadingHTTPServer(('127.0.0.1',int(os.environ.get('LEAD_PORT','8091'))),Handler).serve_forever()
