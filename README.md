# OneStopService — Muang Srisuk Group

Static Thai/English corporate website for GitHub Pages.

## Preview

Run `python -m http.server 8090 --bind 127.0.0.1` in this directory. Open http://127.0.0.1:8090/pricing.html.

## September 2026 update

- PDF-inspired navy, electric blue and cyan design with technology imagery.
- Shared opaque navigation, grouped services and pricing, mobile menu and explicit back links.
- `pricing.html` is the pricing hub. `payroll-calculator.html` and `recruitment-calculator.html` are separate calculators.
- Payroll retains the published headcount-band schedule (not progressive tiers). Recruitment offers standard retainers and annual-income-based success fees. Existing commercial terms stay in `recruitment.html`.
- Ten original Thai/English practical articles with search, category filters, related reading, checklists and primary-source links. See `docs/article-sources.md`.
- Quote form prepares a message for the visitor to send through email or LINE. Calculator details are carried into the draft; there is no backend receipt, automatic delivery or attachment upload.
- Estimator values persist in session storage. Recruitment salary inputs are not put in the URL. No invented client logos, testimonials or company credentials.

## Editing

Shared style: `assets/corporate.css`, `assets/pdf-style.css`, `assets/experience.css`. Shared navigation/language/quote interactions: `assets/corporate.js`. Legacy recruitment/privacy content still uses `assets/style.css` and `assets/i18n.js`.

Commercial calculations live in `assets/pricing-model.js`; UI in `assets/calculators.js`. Update the visible explanatory tables as well when changing approved prices.

Article source data: `scripts/site-data/articles-1.json` and `articles-2.json`. Rebuild with `python scripts/build-content.py`. Pricing pages: `python scripts/build-pricing.py`. Shared header: `scripts/site_helpers.py`; roll it out using `python scripts/update-navigation.py`. These generators preserve the homepage/footer template. Regenerate sitemap when adding pages. 404 has a GitHub Pages `/OneStopService/` base.

## Validation

Run preview server first, then `node scripts/test-site.cjs` and `python scripts/check-links.py`. Set `PLAYWRIGHT_MODULE` to an installed `@playwright/test` path if needed.

The suite includes 23 pages × 2 languages × 2 viewport sizes, pricing boundaries and invalid values, article filtering, 48 navigation checks across 320/768/1024/1440 pixels in light/dark preferences, and quotation draft handoff. No email or LINE messages are sent. See `docs/experience-validation.md` for results.

## Deployment

Production: https://atibettop.github.io/OneStopService-V2/. Source is maintained in the private OneStopService-V2 repository. The proposed Pages URL is not yet published; receiving-server and analytics activation remain separate configuration steps.

## Release preparation
See docs/release-improvements.md and server/README.md for the English build, real lead API, tracking hooks, and configuration still required before launch.
