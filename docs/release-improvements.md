# Release improvements and remaining configuration

Implemented:
- Focus scroll margins and JS viewport correction keep keyboard targets above the mobile contact bar; verified 260 keyboard stops.
- Visible Payroll headcount-band explanation next to the total; published rates unchanged.
- Static English pages (`en/`), English title/description/Article metadata, reciprocal language links, and separate English canonical URLs.
- Site URLs and sitemap target the proposed V2 repository path from `site-settings.json`. This is a prepared target, not a deployed website. A custom domain or a different chosen URL requires changing this setting before publishing.
- About section includes the existing company name and email/phone/LINE channels. Additional address, office hours and contact-person fields are configurable but intentionally blank until provided.
- Sanitized event names and service/plan categories for calculator use, request preparation, delivery outcomes and contact clicks. No contact details, salary inputs, requirement text or URL query strings are included in these event payloads. Events are exposed via `ms:metric`; forwarding to GA happens only when consent-enabled gtag is present. No analytics property was invented or activated.
- Real SQLite inbox API and browser delivery/receipt/retry support, tested locally; production endpoint remains unset pending hosting details.

Build after changing source HTML: `python scripts/prepare-release.py`, then with preview running `node scripts/build-english.cjs`. Pricing/content generators run BEFORE those two commands. Existing legacy metadata URLs are replaced by the configured release target during this step. Keep generated English pages in Git.

Still requires owner information: approved receiving server URL/deployment access, final public site URL, company address/contact hours/person, and analytics destination if conversion collection is wanted. Production Core Web Vitals cannot be verified from localhost.

Validation results: real inbox API and interrupted-response retry passed; 260 keyboard stops passed; 48 static English checks (JS on/off) passed; recursive page/asset/fragment scan passed. No production submissions or email/LINE messages were sent during tests.

Local continuation: receiver now runs on 127.0.0.1:8091 for the preview at port 8090. A labeled local-only form submission was saved, read back using its receipt, and removed after verification. Database stays outside the web root. Production remains unconfigured. Public English HTML is exported with preview submission disabled.
