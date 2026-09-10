from site_helpers import *
for p in ROOT.glob('*.html'):
 if p.name=='404.html': continue
 h=p.read_text(encoding='utf-8-sig')
 h=re.sub(r'<a class="ms-skip".*?</a>','',h,flags=re.S)
 h=re.sub(r'<header class="ms-header[^\"]*">.*?</header>',lambda _:header(),h,count=1,flags=re.S)
 if 'assets/experience.css' not in h:h=h.replace('</head>','<link rel="stylesheet" href="assets/experience.css?v=6"></head>')
 h=re.sub(r'assets/corporate.js\?v=[^\"]+','assets/corporate.js?v=6',h)
 h=re.sub(r'<a([^>]*?)href="pricing.html"([^>]*?)>((?:(?!</a>).)*?(?:คำนวณราคา Payroll|Payroll calculator)(?:(?!</a>).)*?)</a>',r'<a\1href="payroll-calculator.html"\2>\3</a>',h,flags=re.S)
 if p.name=='request-quotation.html' and 'assets/pricing-model.js' not in h:h=h.replace('<script src="assets/corporate.js','<script src="assets/pricing-model.js?v=6" defer></script><script src="assets/corporate.js')
 if p.name=='recruitment.html' and 'class="recruitment-wayfinding"' not in h:
  h=h.replace('</header>','</header><div class="recruitment-wayfinding">'+backbar('Recruitment')+'<div class="ms-container" style="padding-block:20px">'+btn('คำนวณค่าบริการสรรหาคน','Calculate recruitment costs','recruitment-calculator.html')+'</div></div>',1)
 p.write_text(h,encoding='utf-8')
