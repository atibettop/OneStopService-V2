# Brand consistency review — 11 September 2026

- Shared finishing styles loaded on all 24 HTML pages and the page generator.
- Legacy Recruitment and Privacy colors aligned to navy/blue/cyan; light surfaces stay light under dark OS preferences. Removed remaining gold emphasis through shared tokens.
- Table headings, highlighted plan columns, buttons and corner radii aligned; section-specific 3D and homepage styling preserved.
- SVG logo remains the source. PNG (32px), Apple touch icon (180px) and multi-size ICO re-rendered from that same SVG. All pages reference the same versioned icon set and theme color, including 404.
- Corrected unrelated navigation highlighting on Privacy, quotation and 404. Privacy heading hierarchy adjusted visually without changing policy text.
- Validation: 92 content-page cases passed; 48 light/dark navigation scenarios passed (minimum measured contrast 5.82:1); quote draft and both calculators passed. All 24 pages have the same four favicon declarations and icons return HTTP 200 (404's production base mapped to local preview for verification). Local links passed.
- Screenshots inspected for Recruitment and Privacy in dark OS preference, plus pricing/estimator screenshots from the full suite.
- Existing cached tabs may require reloading to display the new icon declarations.
