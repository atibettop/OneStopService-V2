import os, tempfile, subprocess, socket, time, json, urllib.request, urllib.error, uuid, sqlite3, sys
origin='http://127.0.0.1:8090'
with tempfile.TemporaryDirectory() as d:
 sock=socket.socket();sock.bind(('127.0.0.1',0));port=sock.getsockname()[1];sock.close()
 env=dict(os.environ,LEAD_PORT=str(port),LEAD_DB_PATH=d+'/leads.sqlite3',LEAD_ALLOWED_ORIGINS=origin)
 proc=subprocess.Popen([sys.executable,'server/lead_api.py'],env=env,stdout=subprocess.PIPE)
 try:
  for _ in range(100):
   try:
    with socket.create_connection(('127.0.0.1',port),timeout=.1):break
   except OSError:time.sleep(.05)
  url=f'http://127.0.0.1:{port}/leads'
  data=dict(requestId=str(uuid.uuid4()),company='TEST ONLY',name='Test',phone='0000000000',email='test@example.com',requirement='Integration test; do not contact.',services=['recruitment'],employees='',estimate='Success fee test',website='')
  def post(payload,site=origin):
   req=urllib.request.Request(url,json.dumps(payload).encode(),{'Origin':site,'Content-Type':'application/json'})
   try:
    with urllib.request.urlopen(req) as response:return response.status,json.load(response)
   except urllib.error.HTTPError as e:return e.code,json.load(e)
  code,res=post(data);assert code==201 and res['status']=='received'
  code,again=post(data);assert code==200 and again['leadId']==res['leadId']
  assert post(dict(data,company='Changed'))[0]==409
  assert post(dict(data,requestId=str(uuid.uuid4()),email='wrong'))[0]==422
  assert post(data,'https://unapproved.example')[0]==403
  connection=sqlite3.connect(d+'/leads.sqlite3');assert connection.execute('SELECT count(*) FROM leads').fetchone()[0]==1;connection.close()
  testenv=dict(os.environ,TEST_LEAD_ENDPOINT=url)
  node=os.environ.get('TEST_NODE','node')
  subprocess.run([node,'scripts/test-ux-release.cjs'],env=testenv,check=True)
  print('PASS: real SQLite receipt, idempotent retry, changed request rejected, validation and origin restriction. Temporary test data only.')
 finally:proc.terminate();proc.wait(timeout=5)
