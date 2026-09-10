# Implementation status — 10 September 2026

The user clarified the correct target as atibettop/OneStopService, then chose the A_P Innovation PDF as the primary color/style reference. The implementation uses deep navy, electric blue, cyan gradients and angular panels. Company information, client logos and certifications from that reference were not copied.

The existing GitHub Pages site is static. This revision implements the public design, service pages, bilingual navigation, enquiry-message preparation and existing calculator integration. The broader V.4 document remains a proposal, not a claim that a backend CRM has been implemented.

Contact details and price schedules are retained from the original OneStopService repository. The original rate formula is unchanged, including its existing step changes at 201 and 501 employees. The 12-month number is monthly price multiplied by 12, not a binding annual quotation. Recruitment rates and commercial terms are retained.

The quotation flow does not submit automatically, collect attachments, persist personal data locally or send tracking events containing form contents. The visitor explicitly sends their prepared draft using email or LINE. Marketing analytics configuration is unchanged from the source repository.

QA: all 14 content pages checked in TH/EN at 390px and 1440px; navigation, FAQ, draft validation, invalidation after edits, package/headcount handoff, rate boundaries and invalid numbers covered. Additional 320px, 768px and 1024px checks cover homepage, pricing, recruitment and enquiry. No email or LINE message is sent by tests.

Unrelated Payroll application: the temporary content.ts created before target clarification was removed; no tracked Payroll application file was changed.
