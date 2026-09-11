"""Shared static-page helpers. Run build-content.py after editing site-data."""
from pathlib import Path
from html import escape
import re
ROOT = Path(__file__).resolve().parents[1]

def t(th, en, tag='span', cls=''):
    return f'<{tag}'+(f' class="{cls}"' if cls else '')+f' data-en="{escape(en,quote=True)}">{th}</{tag}>'
def icon(name):
    return f'<svg class="ms-icon" aria-hidden="true"><use href="#i-{name}"/></svg>'
def btn(th,en,href,secondary=False):
    return f'<a class="ms-btn'+(' secondary' if secondary else '')+f'" href="{href}">{t(th,en)}<span aria-hidden="true">↗</span></a>'
SERVICES=[('payroll-outsourcing','Payroll Outsourcing','ดูแลงานเงินเดือน','Payroll support'),('recruitment','Recruitment','สรรหาบุคลากร','Recruitment services'),('hr-consulting','HR Consulting','วางระบบ HR','HR consulting'),('foreign-worker','Foreign Worker','ประสานงานแรงงานต่างด้าว','Foreign worker services'),('visa-work-permit','Visa & Work Permit','วีซ่าและใบอนุญาตทำงาน','Visa & work permits'),('event-management','Event Management','จัดกิจกรรมองค์กร','Corporate events')]
logo='<a class="ms-brand" href="index.html"><img src="assets/favicon.svg" alt="Muang Srisuk Group" width="40" height="40"><span>MUANG SRISUK GROUP<small>HR & BUSINESS SOLUTIONS</small></span></a>'
def header():
    svc=''.join(f'<a href="{slug}.html"><strong>{name}</strong>{t(th,en,"small")}</a>' for slug,name,th,en in SERVICES)
    return f'''<a class="ms-skip" href="#main">{t('ข้ามไปเนื้อหาหลัก','Skip to content')}</a>
<header class="ms-header site-header"><div class="ms-container site-header-inner">{logo}
<nav id="main-menu" class="ms-menu site-nav" aria-label="Main navigation">
<a href="index.html" data-nav="home">{t('หน้าแรก','Home')}</a>
<details class="ms-dropdown site-dropdown" data-nav="services"><summary>{t('บริการของเรา','Services')}</summary><div class="site-menu-panel site-services-panel"><div class="site-menu-caption">HR & BUSINESS SOLUTIONS</div>{svc}<a class="site-menu-all" href="index.html#services">{t('ดูบริการทั้งหมด','Explore all services')} ↗</a></div></details>
<details class="ms-dropdown site-dropdown" data-nav="pricing"><summary>{t('ราคาและแพ็กเกจ','Pricing & plans')}</summary><div class="site-menu-panel site-pricing-panel"><a href="pricing.html">{icon('brief')}<span>{t('ราคาและแพ็กเกจทั้งหมด','All pricing & plans','strong')}{t('เลือกบริการที่เหมาะกับคุณ','Choose the right service','small')}</span></a><a href="payroll-calculator.html">{icon('calc')}<span>{t('คำนวณค่าบริการ Payroll','Payroll calculator','strong')}{t('ตามจำนวนพนักงานและแพ็กเกจ','By headcount and package','small')}</span></a><a href="recruitment-calculator.html">{icon('people')}<span>{t('คำนวณค่าบริการสรรหาคน','Recruitment calculator','strong')}{t('เหมารายเดือน / จ่ายเมื่อเริ่มงาน','Monthly retainer / success fee','small')}</span></a></div></details>
<a href="index.html#about" data-nav="about">{t('เกี่ยวกับเรา','About')}</a><a href="insights.html" data-nav="insights">{t('บทความ HR','HR insights')}</a><a href="index.html#contact" data-nav="contact">{t('ติดต่อเรา','Contact')}</a>
</nav><div class="site-header-actions"><div class="ms-languages"><a data-lang="th" href="?lang=th" lang="th" aria-label="ภาษาไทย">TH</a><span>|</span><a data-lang="en" href="?lang=en" lang="en" aria-label="English">EN</a></div>{btn('ขอใบเสนอราคา','Get a quote','request-quotation.html')}<button class="ms-menu-toggle" aria-controls="main-menu" aria-expanded="false" aria-label="Open navigation">☰</button></div></div></header>'''

def template_parts():
    h=(ROOT/'index.html').read_text(encoding='utf-8-sig')
    return re.search(r'<svg width="0".*?</svg>',h,re.S).group(0), re.search(r'<footer class="ms-footer">.*?</aside>',h,re.S).group(0)

def shell(title,body,filename,description,script=''):
    sprite,footer=template_parts();url='https://atibettop.github.io/OneStopService/'+filename
    return f'''<!doctype html>
<html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)} | Muang Srisuk Group</title><meta name="description" content="{escape(description,quote=True)}"><meta name="theme-color" content="#071d66"><link rel="canonical" href="{url}"><link rel="alternate" hreflang="th" href="{url}"><link rel="alternate" hreflang="en" href="{url}?lang=en"><meta property="og:type" content="website"><meta property="og:title" content="{escape(title,quote=True)}"><meta property="og:description" content="{escape(description,quote=True)}"><meta property="og:image" content="https://atibettop.github.io/OneStopService/assets/people-technology-v5.webp"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="assets/corporate.css?v=4"><link rel="stylesheet" href="assets/pdf-style.css?v=2"><link rel="stylesheet" href="assets/experience.css?v=6"><script src="assets/corporate.js?v=7" defer></script><script src="assets/analytics.js?v=20260810-2" defer></script>{script}<link rel="icon" type="image/svg+xml" href="assets/favicon.svg?v=brand7"><link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png?v=brand7"><link rel="shortcut icon" href="favicon.ico?v=brand7"><link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png?v=brand7"><link rel="stylesheet" href="assets/brand-system.css?v=7"></head>
<body class="ms-site" data-modern="true">{sprite}{header()}<main id="main">{body}</main>{footer}</body></html>'''
def backbar(current):
    return f'<div class="page-wayfinding"><div class="ms-container"><nav aria-label="Breadcrumb"><a href="index.html">{t("หน้าแรก","Home")}</a><span aria-hidden="true">/</span><a href="pricing.html">{t("ราคาและแพ็กเกจ","Pricing & plans")}</a><span aria-hidden="true">/</span>{current}</nav><a class="back-pricing" href="pricing.html">← {t("กลับหน้าราคารวม","All pricing & plans")}</a></div></div>'
def service_switch(active):
    return f'<nav class="calculator-switch" aria-label="Price calculators"><a href="payroll-calculator.html"'+(' aria-current="page"' if active=='payroll' else '')+f'>{icon("calc")} Payroll</a><a href="recruitment-calculator.html"'+(' aria-current="page"' if active=='recruitment' else '')+f'>{icon("people")} Recruitment</a></nav>'
