from pathlib import Path
import re
root=Path('.')
icons='<link rel="icon" type="image/svg+xml" href="assets/favicon.svg?v=brand7"><link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png?v=brand7"><link rel="shortcut icon" href="favicon.ico?v=brand7"><link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png?v=brand7">'
for p in [*root.glob('*.html'),root/'scripts/site_helpers.py']:
 s=p.read_text(encoding='utf-8-sig')
 s=re.sub(r'<link\b[^>]*\brel="(?:icon|alternate icon|shortcut icon|apple-touch-icon)"[^>]*>','',s)
 s=re.sub(r'<meta name="theme-color" content="[^"]*">','<meta name="theme-color" content="#071d66">',s)
 s=re.sub(r'<link rel="stylesheet" href="assets/brand-system.css[^"]*">','',s)
 s=s.replace('</head>',icons+'<link rel="stylesheet" href="assets/brand-system.css?v=7"></head>')
 p.write_text(s,encoding='utf-8')
