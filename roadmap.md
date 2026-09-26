# Roadmap

- [x] Clone clinic-connect-suite, keep only .md files
- [x] Remove all non-.md files from project
- [x] Clone caddy-patient-hub, copy frontend files in, exclude its .md files (kept existing docs)
- [x] Verify preview builds and runs
- [x] Redesign as Crescent & Pearl Dental per docs/MYCLINIC_FRONTEND.md (home, services, dentists, pricing, about, contact, 5-step booking, reception, owner, odontogram, private queue board)
- [x] Distinguish home treatment picker from services catalog; give visit story Caddy illustrations and a demo conversation-to-booking path
- [x] Introduce Caddy after the first screen with a visual sound pulse, floating illustrated guide shortcut, and animated actionable visit steps
- [ ] Real accounts, saved bookings, messages and payments — waits on backend (Lovable Cloud) approval
- [ ] Real clinic details (phone, address, hours, rates, dentist credentials) — waits on clinic owner
- [x] Consolidate documentation into docs/ with an index; drop the superseded dental demo spec
- [x] Full UX/UI review of every route (docs/UX_REVIEW.md)
- [ ] Apply UX_REVIEW fixes — awaiting your go-ahead on priority order

## Done — UX fixes pass 1 (2026-09-26)
- Removed BootLoader splash; site loads instantly
- New dental hero illustration (soft warm style); real photos added to About gallery
- Mobile hero: headline + Book button now first
- Name unified to "Crescent & Pearl" everywhere
- Staff pages (Reception/Dentist/Owner) behind demo staff code gate (1234)
- Booking: numbered steps, Back hidden on step 1, services grouped by category
- Footer: giant wordmark + duplicate "Powered by" removed
- Profile: dermatologist/pediatrician replaced with orthodontist/pediatric dentist; "6 clinics" fixed

## Still open
- Typography/contrast pass (ALL-CAPS headings, cream-on-cream cards, safety warning contrast)
- Bell icon aria-label; disabled reception controls styling
- Treatment picker tap targets
