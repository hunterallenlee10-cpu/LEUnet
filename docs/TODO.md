# Hunter's to-do list

The things only Hunter can do for the site: links, photos, decisions and
account set-up. Last updated 2026-10-05, when "Our projects" became "Recent
Builds", a grid of website boxes starting with the LEU site.

Ask Claude for "my to-do list" in any session on this repo and it reads this
file. Tell Claude when something is done and it checks it off here.

## Open

- [ ] **"Who we help" pictures.** Six pictures for the industry cards on
      /lee-systems were made in your Everygen account on 2026-09-29, but
      the Claude environment's network settings block where Everygen keeps
      them (media.viewmax.io). Add that host under Network access (the cloud
      environment menu in the session's title bar, then Edit), or paste the
      six pictures into a session, and Claude puts them in. Until then each
      card shows a brass glow where its picture goes.
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
- [ ] **Tool logos.** The moving strip under the homepage hero shows 42 tools
      since 2026-09-29: AI models and messaging on one row (Claude, OpenAI,
      Grok, xAI, Gemini, Perplexity and more), business apps on the other
      (HubSpot, Zapier, Make, Shopify, Instagram and more). It reads as "tools
      we work with", so tell Claude which to keep, drop or add (`tools` in
      `data/site.ts`).
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
      contact form, to confirm the email arrives with the interest tag in its
      subject, and two through the form at the bottom of /lee-systems: one
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
- [ ] **H1 Performance and Thread T-Shirts links.** Both go in "Recent
      Builds" as websites we built (2026-10-05), but the repo only has
      stand-in addresses for them. Send each live link, plus the rest of the
      details in [RECENT-BUILDS.md](RECENT-BUILDS.md).
- [ ] **Automation walkthroughs: pick the format.** Recent Builds shows
      websites only for now. Talk through with Claude how automations should
      appear (a screen recording, an animated diagram or a narrated video),
      then send them the way [RECENT-BUILDS.md](RECENT-BUILDS.md) describes.
- [ ] **Over time.** More finished builds for "Recent Builds" (`projects`),
      only work you have permission to show, sent in the format in
      [RECENT-BUILDS.md](RECENT-BUILDS.md). The grid has the LEU site and two
      "coming soon" boxes since 2026-10-05; each build you add takes one.
      And Google reviews from finished clients.

## Waiting on your go

- [ ] **Analytics (Phase 3).** Pick a tool, and Claude will track clicks on
      every "Book a free call", both homepage paths and contact form sends.
      Vercel Analytics already counts page views.

## Done

- [x] **Stats and scarcity** (2026-09-28). The stats stay exactly as
      published and the scarcity claims are gone. Optional: a one-line
      definition under each stat (`site.stats[].definition`).
