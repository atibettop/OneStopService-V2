# OneStopService — Muang Srisuk Group

Static Thai/English corporate website hosted on GitHub Pages.

## Preview

Run `python -m http.server 8090 --bind 127.0.0.1` in this directory and open http://127.0.0.1:8090/.
No build step, framework migration or backend is required.

## September 2026 redesign

- PDF-inspired deep navy/electric blue/cyan homepage with gradients and angular panels, responsive service cards, payroll illustration, recruitment overview, process, FAQ and verified existing contact channels.
- Dedicated Payroll, HR Consulting, Foreign Worker, Visa & Work Permit, and Event pages; existing recruitment pricing retained.
- Existing Payroll rates and calculation model retained, with strict whole-number validation, a 12-month estimate and package/headcount handoff to the quotation form.
- Quote form prepares an email or copyable message. The visitor must send it using email or LINE. No claim of server receipt, no lead database, no attachment upload and no new external form processor.
- Thai/English UI, shared mobile navigation, privacy link and updated sitemap.
- No fabricated testimonials, client logos, office address or certifications.

The V.4 specification in docs is a broader product proposal. CRM, automatic form delivery, file uploads, admin workflow and any new legal/privacy terms require a separately configured backend and operational decisions; they are not implemented by this static website revision.

## Editing

Edit HTML files directly. `assets/corporate.css`, `assets/pdf-style.css` and `assets/corporate.js` contain shared design and interactions. The existing `style.css` and `i18n.js` continue supporting legacy pricing/recruitment/privacy content. Rates remain in `pricing.html`; recruitment commercial terms remain in `recruitment.html`.

## Tests

With Playwright available, run `node scripts/test-site.cjs` against the preview server. Set `PLAYWRIGHT_MODULE` to an installed @playwright/test module path if it is outside this repository. `TEST_BASE_URL` can point at a static preview served at the GitHub Pages subpath.

The suite covers all content pages in Thai/English at desktop/mobile sizes, missing assets/icons, page overflow, heading structure, navigation, FAQ, quotation draft validation and existing pricing boundaries. It does not send email or LINE messages.

## Deployment

The production target is https://atibettop.github.io/OneStopService/. Publish the reviewed static files to the repository's configured Pages source. Do not deploy the unrelated payroll application.
