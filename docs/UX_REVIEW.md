# UX / UI Review — Crescent & Pearl Dental demo

**Reviewed:** 26 Sep 2026, every route at 1280px and 390px width.
**Result:** all 14 routes load, no console or build errors. The problems below are experience problems, not bugs.

## A. Blockers (fix first)

1. **Full-screen splash on entry.** `BootLoader` holds a 1.9s branded animation over the whole app before any content appears, with no skip. A clinic site should show the clinic, the phone number and the booking button immediately. Remove it, or reduce it to a sub-300ms fade that never blocks the first paint.
2. **Illustrated/AI-styled hero and treatment photos.** The hero doctor and the six treatment cards are stylised cartoon illustrations. `MYCLINIC_FRONTEND.md` §2 requires "real dental care… not abstract software imagery". For a medical service this is the single biggest trust cost — patients read it as not a real clinic. Replace with photographic clinic/treatment imagery, or a restrained non-figurative brand illustration.
3. **Mobile first screen shows no value and no action.** At 390px the order is: emergency strip → nav → a 400px tall illustration → caption → eyebrow → heading. The promise and the Book button are two scrolls down. Put heading + one-line promise + Book above the image on mobile.
4. **Two brand names.** Header and public pages say *Crescent & Pearl*; page titles on `/login`, `/profile`, `/queue`, `/dashboard` say *Caddy Care*. Patients see one clinic; the platform name belongs only in the footer line.
5. **Staff routes are publicly reachable.** `/reception`, `/doctor`, `/owner` open with no sign-in and carry the patient marketing header, marquee and giant footer wordmark. Even in demo, gate them behind the patient-login screen and give them a plain staff shell.

## B. Layout and hierarchy

6. **Too much chrome before content.** Emergency strip + floating nav pill + hero = roughly 200px of fixed furniture. The emergency strip is a full sentence, always on, not dismissible. Shorten it to "Dental emergency? Get help →" and let it collapse after first view.
7. **Four booking entry points in one screen** — nav button, hero button, Caddy card "Book a visit", floating Caddy bubble. Keep one primary (nav) and one in the hero; demote the rest.
8. **Dead vertical space.** `/book` and `/reception` end their content column and leave a ~400px empty band before the footer. Let the page shell grow, or add the relevant next step (what to bring, cancellation policy) there.
9. **Footer noise.** The scrolling feature marquee is clipped at both edges and the oversized "CRESCENT & PEARL" wordmark adds a screen of nothing. Both can go; the link columns are good.

## C. Typography and visual system

10. **Three competing type personalities on one page:** a rounded brand face for the hero, a heavy condensed all-caps display for section headings ("WHAT BRINGS YOU IN TODAY?"), and letter-spaced all-caps micro-labels on almost every block. The condensed all-caps reads loud and hard to scan and contradicts the "calm, precise" positioning. Pick one display face and one text face; use sentence case for headings; cap the all-caps labels at one per section.
11. **Low-contrast surfaces.** Cream cards on a cream background separate only by a hairline; several muted captions fall below AA. The urgent-care strip — the one message that must be readable — is pale orange on cream.
12. **Text over photos** on treatment cards has no scrim; white labels sit on bright areas.

## D. Interaction and flow

13. **Treatment picker costs two screens** before anything actionable, and only the small arrow reads as clickable. Make the whole card a button, add a visible hover/focus state, show 4 and a "See all services" link.
14. **Booking stepper is weak.** Steps have no numbers or done/current/upcoming states, "Back" appears on step 1 where it has nowhere to go, and there is no "takes about 2 minutes" expectation. 13 service rows arrive with no grouping or search, and their tiny tooth glyphs carry no meaning.
15. **Inert controls look live.** Reception's "Save — needs backend", "Confirm close (demo)" and all payment chips are visually the same weight as working buttons and give no feedback on click. Style disabled states clearly and add a short "demo only" line per panel rather than per button.
16. **Floating Caddy bubble overlaps content** at the bottom-right on mobile, sitting on top of the hero text and card actions.

## E. Content and data credibility

17. **Patient profile is off-brand for a dental clinic** — visit history lists a dermatologist, a pediatrician and a general physician, and stats say "across 6 clinics". In a single-clinic demo this confuses the story.
18. **"Engagement streak" gamification** (day streak, "Momentum looks good on you") belongs in a fitness app, not a clinical record. Replace with something clinically meaningful: next cleaning due, treatment plan progress.
19. **Staff density is missing.** `DENTAL_CLINIC_DEMO.md` §2 asks staff screens to be dense and fast-scanning. Reception currently uses the same soft rounded cards and generous spacing as marketing; the allergy warning is a pale chip rather than a high-contrast alert.

## F. Accessibility

20. Notification bell has a count badge and no accessible label.
21. Motion: several loops (orb pulse, marquee, splash) run continuously; honour `prefers-reduced-motion` throughout, as the spec requires.
22. Focus states are largely default or invisible on custom cards and chips; the booking flow must be completable by keyboard.

## Suggested order of work

1. Remove the splash, fix mobile hero order, unify the brand name, gate staff routes.
2. Replace illustrated imagery with photographic assets.
3. Typography pass: one display face, sentence case, fewer all-caps labels, fix contrast.
4. Booking flow: numbered stepper, grouped services, clear disabled states.
5. Strip footer decoration, fill the empty bands, give staff screens their own dense shell.
