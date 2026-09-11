from pathlib import Path
import json,re
from html import escape
root=Path('.')
base=json.loads((root/'site-settings.json').read_text(encoding='utf-8-sig'))['baseUrl'].rstrip('/')+'/'
meta={
'index':('HR & Business Solutions','Payroll, recruitment and HR support for growing organizations.'),
'pricing':('Pricing & Plans','Compare payroll and recruitment services and estimate your service costs.'),
'payroll-calculator':('Payroll Cost Calculator','Estimate monthly payroll fees, compare service scope and review headcount-band pricing.'),
'recruitment-calculator':('Recruitment Cost Calculator','Compare monthly retainers and estimate success fees by role level and annual income.'),
'payroll-outsourcing':('Payroll Outsourcing','Explore payroll calculations, reports and support with a scope tailored to your organization.'),
'recruitment':('Recruitment Services','Explore monthly recruitment retainers, candidate sourcing and success-based hiring services.'),
'hr-consulting':('HR Consulting','Plan organization structure, HR processes and performance management with our consulting support.'),
'foreign-worker':('Foreign Worker Services','Discuss workforce requirements and document coordination for foreign worker services.'),
'visa-work-permit':('Visa & Work Permit Services','Explore document preparation and coordination for visa and work permit requirements.'),
'event-management':('Corporate Event Management','Plan and coordinate corporate activities, meetings and events.'),
'request-quotation':('Request a Quotation','Prepare your service requirements and contact Muang Srisuk Group for a formal quotation.'),
'privacy':('Privacy Policy','Learn how this website handles contact information, browser storage and analytics.'),
'insights':('HR & Business Insights','Ten practical guides to payroll, recruitment, HR technology and organization development.'),
'404':('Page Not Found','Return to the homepage or explore HR and business services.')}
for f in ['articles-1.json','articles-2.json']:
 for a in json.loads((root/'scripts/site-data'/f).read_text(encoding='utf-8-sig')):meta[a['slug']]=(a['title'][1],a['summary'][1])
for p in root.glob('*.html'):
 s=p.read_text(encoding='utf-8-sig');name=p.stem;title,description=meta[name]
 s=re.sub(r' data-en-content="[^"]*"','',s)
 s=re.sub(r'https://atibettop.github.io/OneStopService(?:-V2)?/',lambda _:base,s).replace('<base href="/OneStopService/">','<base href="/'+base.split('/',3)[3]+'">')
 s=re.sub(r'<title(?: [^>]*)?>(.*?)</title>',lambda m:'<title data-en="'+escape(title+' | Muang Srisuk Group',quote=True)+'">'+m[1]+'</title>',s)
 s=re.sub(r'<meta name="description"[^>]*>',lambda m:m[0][:-1]+' data-en-content="'+escape(description,quote=True)+'">',s)
 s=re.sub(r'<link rel="alternate" hreflang="en"[^>]*>','<link rel="alternate" hreflang="en" href="'+base+'en/'+p.name+'">',s)
 if '<link rel="alternate" hreflang="en"' not in s:s=s.replace('</head>','<link rel="alternate" hreflang="en" href="'+base+'en/'+p.name+'"></head>')
 if '<link rel="alternate" hreflang="th"' not in s:s=s.replace('</head>','<link rel="alternate" hreflang="th" href="'+base+p.name+'"></head>')
 if 'assets/site-config.js' not in s:s=s.replace('<script src="assets/corporate.js','<script src="assets/site-config.js?v=8" defer></script><script src="assets/corporate.js')
 if 'assets/ux-improvements.js' not in s:s=s.replace('</head>','<link rel="stylesheet" href="assets/ux-improvements.css?v=8"><script src="assets/ux-improvements.js?v=8" defer></script><script src="assets/lead-delivery.js?v=8" defer></script></head>')
 s=s.replace('assets/corporate.js?v=7','assets/corporate.js?v=8').replace('assets/calculators.js?v=6','assets/calculators.js?v=8')
 p.write_text(s,encoding='utf-8')
p=root/'assets/corporate.js';s=p.read_text(encoding='utf-8-sig');anchor="document.querySelectorAll('[data-en]').forEach(el => { if (en) el.innerHTML = el.dataset.en; });"
s=s.replace(anchor,anchor+"\n  document.querySelectorAll('[data-en-content]').forEach(el=>{if(en)el.content=el.dataset.enContent;});\n  if(en){document.querySelector('meta[property=\"og:title\"]')?.setAttribute('content',document.title);document.querySelector('meta[property=\"og:description\"]')?.setAttribute('content',document.querySelector('meta[name=description]')?.content||'');}")
p.write_text(s,encoding='utf-8')
p=root/'assets/lead-delivery.js';s=p.read_text(encoding='utf-8-sig').replace("estimate:document.querySelector('#prepared-message').value", "estimate:document.querySelector('.quote-estimate-preview')?.textContent||('Payroll package: '+(new URLSearchParams(location.search).get('package')||'unspecified'))");p.write_text(s,encoding='utf-8')
(root/'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: '+base+'sitemap.xml\n',encoding='utf-8')
urls=[base+prefix+p.name for prefix in ['', 'en/'] for p in sorted(root.glob('*.html')) if p.name!='404.html']
(root/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>'+u+'</loc></url>' for u in urls)+'</urlset>',encoding='utf-8')
(root/'scripts/site-data/english-meta.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
