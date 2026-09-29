# Hunter's to-do list

The things only Hunter can do for the site: links, photos, decisions and
account set-up. Last updated 2026-09-28, after Phases 1 and 2 of the site fix
plan.

Ask Claude for "my to-do list" in any session on this repo and it reads this
file. Tell Claude when something is done and it checks it off here.

## Open

- [ ] **Booking link.** Set up a Google Calendar booking page on
      ceo@leeenterprisesunlimited.com and send Claude the link. Every "Book a
      free call" button switches to it (`bookingUrl` in `data/site.ts`). Until
      then those buttons open the contact form with Lee Systems Co. picked.
- [ ] **Business phone line.** (240) 925-2609 is on the site now. If the AI
      call assistant answers a line, send that number too and the automation
      page will offer it as a live demo (`callAnswering.demoPhone`).
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
- [ ] **Google Business Profile.** Create one, as a service-area business if
      there's no public office.
- [ ] **Search Console (after it's live).** Verify the domain and submit
      https://www.leeenterprisesunlimited.com/sitemap.xml.
- [ ] **PageSpeed Insights (after it's live).** Run it on mobile for /,
      /lee-systems and /business-mastery, and send Claude the results.
- [ ] **Test the contact form (after it's live).** OK one real submission, to
      confirm the email arrives with the interest tag in its subject.
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
- [ ] **Over time.** 2–3 project walkthroughs (only work you have permission
      to show) for the "Our projects" frames (`projects`), and Google reviews
      from finished clients.

## Waiting on your go

- [ ] **Analytics (Phase 3).** Pick a tool, and Claude will track clicks on
      every "Book a free call", both homepage paths and contact form sends.
      Vercel Analytics already counts page views.

## Done

- [x] **Stats and scarcity** (2026-09-28). The stats stay exactly as
      published and the scarcity claims are gone. Optional: a one-line
      definition under each stat (`site.stats[].definition`).
