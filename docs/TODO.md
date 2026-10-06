# Hunter's to-do list

The things only Hunter can do for the site: links, photos, decisions and
account set-up. Last updated 2026-10-06, when the tools strip took your
lists of 40.

Ask Claude for "my to-do list" in any session on this repo and it reads this
file. Tell Claude when something is done and it checks it off here.

## Open

- [ ] **Booking link.** Set up a Google Calendar booking page on
      ceo@leeenterprisesunlimited.com and send Claude the link. Every "Book a
      free call" button switches to it (`bookingUrl` in `data/site.ts`), except
      the ones in the body of /lee-systems, which scroll to that page's own
      form. Until then the rest open the contact form with Lee Systems Co.
      picked.
- [ ] **Business phone line.** (240) 925-2609 is on the site now. If the AI
      call assistant answers a line, send that number too and /lee-systems
      will offer it as a live demo under its automation animation
      (`callAnswering.demoPhone`).
- [ ] **Photo and bio.** A real photo and a few lines about you. They replace
      the "Photo coming soon" and "More about me coming soon" slots on the
      homepage (`founder.photo`, `founder.bio`).
- [ ] **Business Mastery details.** Price, platform (Skool, for example), join
      link and the written guarantee terms. Already settled: a paid monthly
      membership, joining by application, and the 90-day guarantee as it
      reads now.
- [ ] **A video (VSL), if you want one.** Suggested 2026-09-29: the pages
      would be even better with pictures and a video sales letter. The "Two
      paths" frame on /lee-systems is now a narrated animated example (the
      Pham voice, with captions); record a short video (you on camera, or a
      walkthrough of a system) and send Claude the link, and it can play
      that instead or beside it. Photos of you or real work go in the same
      way.
- [ ] **Google Business Profile.** Create one, as a service-area business if
      there's no public office.
- [ ] **Search Console (after it's live).** Verify the domain and submit
      https://www.leeenterprisesunlimited.com/sitemap.xml.
- [ ] **PageSpeed Insights (after it's live).** Run it on mobile for /,
      /lee-systems and /business-mastery, and send Claude the results.
- [ ] **Test the forms (after it's live).** One real submission through the
      contact form, to confirm the email arrives (tagged "[General]" from the
      homepage form, "[Lee Systems Co.]" after a "Book a free call"), and two through the form at the bottom of /lee-systems: one
      picking "Website" (subject "Lee Systems Co.: New Website Request from
      …") and one picking anything else ("…New Consultation Request from
      …").
- [ ] **Inbox filters.** The form emails' subjects changed, for example
      "[Lee Systems Co.] New inquiry from …". Update any filter that matches the
      old ones.
- [ ] **Vercel clean-up.** Delete `STRIPE_PRICE_SUPPORT_CUSTOM` and
      `NEXT_PUBLIC_SITE_URL`. Nothing reads them any more.
- [ ] **Stripe clean-up.** Archive the Support Us product and price, and turn
      off the `checkout.session.*` events on the webhook (see
      [STRIPE.md](STRIPE.md)).
- [ ] **Privacy policy.** It doesn't mention Vercel Analytics, Stripe or a
      booking tool. Claude doesn't rewrite legal text, so this one is yours.
- [ ] **Automation walkthroughs: pick the format.** Recent Builds shows
      websites only for now. Talk through with Claude how automations should
      appear (a screen recording, an animated diagram or a narrated video),
      then send them the way [RECENT-BUILDS.md](RECENT-BUILDS.md) describes.
- [ ] **Over time.** More finished builds for "Recent Builds" (`projects`),
      only work you have permission to show, sent in the format in
      [RECENT-BUILDS.md](RECENT-BUILDS.md). The row has nine builds since
      2026-10-05 (eight client sites and the LEU site).
      And Google reviews from finished clients.

- [ ] **Calculator numbers.** The homepage's "See what you're missing"
      calculator (added 2026-10-06) starts at 40 calls a week, 20% missed, a
      $500 average job and 30% of leads closed. Tell Claude if other starting
      numbers or ranges fit your clients better (the top of
      `components/sections/MissedRevenueCalculator.tsx`).

## Waiting on your go

- [ ] **Analytics (Phase 3).** Pick a tool, and Claude will track clicks on
      every "Book a free call", both homepage paths and contact form sends.
      Vercel Analytics already counts page views.

## Done

- [x] **Tool logos** (2026-10-06). The strip under the homepage hero shows
      your two lists of 40 in your order, plus xAI after Grok, 81 tools in
      all. Five marks no free icon set carries (Clio, GoHighLevel, Jotform,
      RingCentral, Angi) are drawn after the real ones; send the official
      logo files if you'd like them swapped in.
- [x] **Business Mastery subdomain** (2026-10-06). The subdomain is added in
      Vercel with its CNAME record at Wix, and
      https://mastery.leeenterprisesunlimited.com is Business Mastery's
      address now. Every link on the main site goes there, and the old
      /business-mastery address forwards to it.
- [x] **"Who we help" pictures** (2026-10-06). The six pictures made in
      your Everygen account on 2026-09-29 are on the /lee-systems industry
      cards, now that media.viewmax.io is reachable.
- [x] **Recent Builds sites, H1 and Thread links included** (2026-10-05).
      Eight client sites went in alongside the LEU site, each with a
      screenshot of its live first screen.

- [x] **Stats and scarcity** (2026-09-28). The stats stay exactly as
      published and the scarcity claims are gone. Optional: a one-line
      definition under each stat (`site.stats[].definition`).
