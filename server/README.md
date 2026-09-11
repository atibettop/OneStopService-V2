# Receiver activation

`server/lead_api.py` is an implemented SQLite-backed inbox API, tested using real HTTP requests. It is NOT deployed or connected on the public site yet. Static GitHub Pages cannot run it.

1. Run Python on a persistent server behind an HTTPS reverse proxy. The API binds 127.0.0.1 only. Set `LEAD_DB_PATH` outside the public web root, `LEAD_PORT`, and `LEAD_ALLOWED_ORIGINS` to the exact public website origin (comma-separated if needed).
2. Keep the database private, restrict server access, configure backups and agree retention/deletion with the company. Add gateway rate limiting for the public service; the included per-IP limit is process-local. Do not expose SQLite or publish an unauthenticated inbox viewer.
3. Configure `assets/site-config.js` leadEndpoint with the approved HTTPS `/leads` URL. Rebuild English pages. CORS is a browser restriction, not authentication.
4. Verify real browser submission and retrieval by an authorized operator before inviting customer submissions. A successful response means the record committed to SQLite, not that an employee read it or an email was delivered.

API: POST `/leads`, JSON body. Required: requestId (UUID), company, name, phone, email, requirement, services (array). Optional: employees, position, estimate. Payroll requires employees. Returns `{ "status": "received", "leadId": "MSG-..." }`. Repeating the same UUID and payload returns the original receipt; changed payload with the same UUID returns 409. Validation 422, rate limit 429, storage failure 503. No public read endpoint.

The browser keeps the same UUID for network retries, locks inputs while sending, and only shows a receipt on a validated successful server response. Without an endpoint the existing email/LINE draft remains available, with no false receipt.

Run integration tests: set PLAYWRIGHT_MODULE and TEST_NODE as needed, then `python scripts/test-lead-api.py` with local preview on 8090. Test data is isolated in a temporary database and no email/LINE messages are sent.

## Local preview (enabled)

On localhost/127.0.0.1 port 8090 only, the form connects to the local receiver on port 8091. It explicitly labels requests as local tests. Public hosts keep direct submission disabled until a production endpoint is configured.

Start after restarting Windows: `scripts/start-local-receiver.ps1 -PythonPath <python.exe> -DatabasePath <private-path-outside-website>`. The script opens no visible terminal window and refuses an occupied port. Set the same database path to retain local requests.

Read receipts locally: `python server/inbox.py --db <private-path> --limit 20`; inspect one with `--show MSG-...`. The reader does not expose data through the website.

English export deliberately disables the local receiver while rendering so test controls are never baked into public HTML. At runtime the preview-only controls appear on local preview pages.
