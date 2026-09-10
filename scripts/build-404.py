from site_helpers import *
body='<section class="pricing-hero"><div class="ms-container"><span class="ms-eyebrow">404 / PAGE NOT FOUND</span>'+t('ไม่พบหน้าที่คุณต้องการ','We could not find this page','h1')+t('เลือกกลับหน้าแรก ดูบริการ หรือคำนวณค่าบริการได้จากเมนูด้านบน','Use the navigation to explore services or estimate your costs.','p')+'<div style="margin-top:25px">'+btn('กลับหน้าแรก','Back to home','index.html')+'</div></div></section>'
h=shell('ไม่พบหน้า / Page not found',body,'404.html','Page not found')
h=h.replace('<head>','<head><base href="/OneStopService/"><meta name="robots" content="noindex,follow">')
(ROOT/'404.html').write_text(h,encoding='utf-8')
p=ROOT/'.gitignore';s=p.read_text(encoding='utf-8-sig');
if '__pycache__/' not in s:p.write_text(s+'\n__pycache__/\n',encoding='utf-8')
