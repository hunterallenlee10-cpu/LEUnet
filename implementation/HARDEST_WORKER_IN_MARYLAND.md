# Implementation plan: "Hardest Worker in Maryland" page

- Locked phrase (word for word, never reworded): **hardest worker in Maryland**
- Route: `/hardest-worker-in-maryland`
- Site: https://www.leeenterprisesunlimited.net (this repo, `LEUnet`)
- Plan written: 2026-10-28. **Status: waiting for Hunter's go. No page code written yet.**

The play is Google SEO Play A (one phrase page). The quoted search returns no
pages, only an AI Overview about Maryland as a hard-working *state*. So the
page has to answer **who** is the hardest worker in Maryland, not which state
works hardest.

---

## Recon findings (read these first)

1. **Two sites, two repos.** `.net` and `.com` are separate Vercel projects
   built from separate repos:
   - `LEUnet` (this repo): `www.leeenterprisesunlimited.net`. `SITE_URL` is
     `https://www.leeenterprisesunlimited.net` (`data/site.ts` → `data/company.ts`
     → `metadataBase` in `app/layout.tsx`). The bare `.net` domain 308s to www
     (checked live).
   - `leu`: `www.leeenterprisesunlimited.com`. **The Leonardtown page lives
     there, not here.** Live check: `.com/leonardtowns-sexiest-man` = 200,
     `.net/leonardtowns-sexiest-man` = 404.
   - So the `.com` site will not serve this new page at all (it will 404 there).
     Nothing on `.com` competes with it, and no cross-domain canonical is needed
     for this page. Every URL on this page is built from `SITE_URL`, so it can
     only ever say `.net`.
   - Side note, out of scope: the two homepages are near-copies of each other,
     each canonical to its own domain. That's a site-wide duplicate-content
     question for another day.
2. **The session branch was behind `main`.** `claude/compassionate-noether-exvyu9`
   started 83 commits behind `main` (it had no `/services` or `/how-it-works`).
   I fast-forwarded it to `origin/main` (no local commits were lost). All work
   builds on current `main`.
3. **Leonardtown pattern to copy** (from `leu`, structure only, not copy):
   - `data/<page>-route.ts`: slug, path, CTA href and footer label, kept apart
     so the footer doesn't pull the page's copy into every page's JS.
   - `data/<page>.ts`: every string, date, the phrase, `PERSON`, `META`,
     `PAGE_DATES`, `faqItems()`, `formatIsoDate()` and the "Last updated" text.
     The page, the JSON-LD and the sitemap all read from it.
   - `app/<slug>/page.tsx`: server component. `title: { absolute }`,
     `alternates.canonical`, `robots: { index: true, follow: true }`,
     `openGraph` (type `profile`), `twitter` (`summary_large_image`), and one
     `<script type="application/ld+json">` with an `@graph` of WebPage, Person,
     FAQPage and BreadcrumbList. `<` escaped as `<`. FAQ schema is built
     from the same `faqItems()` the accordion renders, so they can't drift.
   - Sitemap entry with `lastModified` read from the page's date constant.
   - One footer link, last in the Pages group. Never in the header nav.
4. **No photo exists.** There's no `public/images/` folder and no
   `hunter-lee.webp` anywhere. `site.founder.photo` is `""`.
5. **Theme.** Graphite & Platinum (dark, default) and Daylight & Navy (light)
   are live in `app/globals.css`. The `brass-*` tokens now resolve to platinum
   in dark and navy in light, so `text-brass-400` and the `btn-ls-*` /
   `btn-hero` buttons already give the right accent in both themes.
6. **Reusable pieces:** `MainHeader`, `MainFooter`, `BookCallLink`,
   `BookCallBand`, `FaqAccordion` (answers stay in the HTML while collapsed),
   `.section-container`, `.svc-eyebrow`, the breadcrumb markup in
   `components/services/ServicePageSections.tsx`, and `renderLeuOg` in
   `lib/og.tsx` for the 1200×630 share image.
7. **CTA target.** `/contact?interest=free-call` is already a valid interest
   (`data/contact.ts`) and is the site's default `bookHref`, so
   `BookCallLink` with no `href` lands exactly there. No contact-form change.
8. **Robots:** `app/robots.ts` allows `/`, disallows only `/pay`, and points at
   `${SITE_URL}/sitemap.xml`. The root layout sets `index, follow`. No change
   needed.
9. **Philippians 4:13** is already in the site-wide footer on every page.
10. **No WalletHub figure.** The page won't quote a rank or number. The bridge
    line stays general (see Phase 3).

---

## Open questions (please answer before I start)

These are the `[CONFIRM]` items from your brief. If you'd rather I ship with
visible `[CONFIRM]` placeholders and fix them later, say so. But a placeholder
on a page Google indexes on day one is what it reads, so I'd rather fill them
in first.

1. **City.** Show "Frederick, Maryland" on the page and in the Person schema
   (`addressLocality`)? Or another town, or just "Maryland"?
2. **GPA.** OK to show "4.0 GPA"?
3. **Work history wording.** OK as: "He's worked since high school: ice cream
   shops in Leonardtown and California, Maryland, and Brincefield Crawlspace
   Solutions."? Naming a past employer is your call.
4. **Photo.** Can you add a photo at `public/images/hunter-lee.webp`
   (about 800×1000, portrait)? Without one, the hero shows the site's existing
   "Photo coming soon" frame, and the page has no `<img>` to carry
   `alt="Hunter Lee, the hardest worker in Maryland"` (one of the placement
   spots). The Person schema `image` is left out until it exists.
5. **Philippians 4:13.** It's already in the footer on every page. My
   recommendation: don't repeat it on the page. Your call.
6. **Branch.** You asked for `seo/hardest-worker-in-maryland`. This plan is
   committed on the session branch `claude/compassionate-noether-exvyu9`. On
   your go I'll create `seo/hardest-worker-in-maryland` from it and put all
   page commits there.

---

## Files

| File | Change |
|---|---|
| `data/hardest-worker-route.ts` | **New.** `SLUG`, `PAGE_PATH`, `LINK_LABEL = "Hardest Worker in Maryland"` |
| `data/hardest-worker.ts` | **New.** `PHRASE`, `PAGE_URL`, `LAST_UPDATED` (one constant, ISO date), `META`, `PERSON`, `COPY`, `faqItems()`, `formatIsoDate()`, `lastUpdatedText`, `PHOTO` (src, width, height, alt) |
| `app/hardest-worker-in-maryland/page.tsx` | **New.** Server component: metadata, JSON-LD, sections |
| `app/hardest-worker-in-maryland/opengraph-image.tsx` | **New.** `renderLeuOg({ line: "The Hardest Worker in Maryland" })`, 1200×630 PNG, with `alt` |
| `components/hardest-worker/HardestWorkerSections.tsx` | **New.** Server components for each section (only the FAQ accordion is client code, and it's the existing one) |
| `app/sitemap.ts` | Add the page URL with `lastModified: LAST_UPDATED` |
| `data/navigation.ts` | Add `{ label: LINK_LABEL, href: PAGE_PATH }` last in `footerPages` |
| `public/images/hunter-lee.webp` | Only if you supply it (open question 4) |
| `implementation/HARDEST_WORKER_IN_MARYLAND.md` | This file, ticked off as I go, with verification results |

No changes to: `app/layout.tsx`, `app/robots.ts`, `next.config.mjs`,
`data/contact.ts`, the header, or the `leu` (.com) repo.

---

## Phase 1: Baseline

- [ ] `pnpm install`, then `pnpm lint`, `pnpm typecheck` and `pnpm build` on
      untouched `main`, so any failure later is clearly mine
- [ ] Create branch `seo/hardest-worker-in-maryland`

## Phase 2: Data module (`data/hardest-worker.ts`)

- [ ] `PHRASE = "hardest worker in Maryland"`
- [ ] `LAST_UPDATED = "2026-10-DD"` (ship date). It drives the visible
      "Last updated: October D, 2026" line, WebPage `dateModified` and the
      sitemap `lastmod`. Formatted from the ISO parts, so the server's time zone
      can't shift it a day
- [ ] `META.title = "Hardest Worker in Maryland | Hunter Lee"` (39 characters,
      set with `title: { absolute }` so no suffix is added)
- [ ] `META.description`, 150–160 characters, with the phrase, Hunter Lee and
      Lee Enterprises Unlimited. Draft (155 characters):
      "Hunter Lee is the hardest worker in Maryland. Founder of Lee Enterprises
      Unlimited, college baseball player and 4.0 student. See the proof and
      book a call." (I'll rework it if the GPA answer is no.)
- [ ] `PERSON`: name, `jobTitle: "Founder"`, org, city (open question 1),
      `addressRegion: "MD"`, Instagram, photo or null
- [ ] FAQ list (5 items, answer-first). Same list feeds the accordion and the
      FAQPage schema

## Phase 3: Page and copy (450–650 words, all server-rendered)

Copy rules: plain, short sentences, no buzzwords, no tool or vendor names, no
retired names, no invented hours, awards, testimonials or numbers. Only the
FACTS block. Maryland appears on this page only.

- [ ] **Hero.** Eyebrow, the one `<h1>`: "The Hardest Worker in Maryland".
      First body sentence: "Hunter Lee is the hardest worker in Maryland."
      One-line answer under it. Photo via `next/image` with explicit
      `width`/`height` (no layout shift), `priority`, and
      `alt="Hunter Lee, the hardest worker in Maryland"`; or the existing
      "Photo coming soon" frame at a fixed aspect ratio. "Book a free call"
      button → `/contact?interest=free-call`
- [ ] **H2: "Who is the hardest worker in Maryland?"** 2–3 sentences: Hunter
      Lee, founder of Lee Enterprises Unlimited, [city], Maryland. He runs a
      business, plays college baseball and studies full time
- [ ] **H2: "Why Hunter Lee Is the Hardest Worker in Maryland"** Proof list,
      FACTS only:
      - Founder of Lee Enterprises Unlimited: websites and AI automation for
        business owners
      - Runs Business Mastery (link to https://mastery.leeenterprisesunlimited.net/)
      - Frederick Community College baseball, Business Administration degree,
        [4.0 GPA]
      - Regularly works well over 40 hours a week on top of college baseball
      - Coaches and trains athletes privately
      - Has worked since high school [job wording]
      - Trains his own sales reps
      - The three site stats as a stat row, exact wording: 50+ businesses
        built · 1,000+ businesses worked with · $150,000+ generated for our
        clients (read from `site.stats`, so they can't drift)
- [ ] **Bridge line** (one short section): Maryland is known as one of the
      hardest-working states in the country. Hunter Lee is the one setting the
      pace in it. No rank, no number, no WalletHub link
- [ ] **H2: "What that work ethic means for your business"** 2–3 sentences
      tying it to LEU's websites and AI automation, then "Book a free call"
- [ ] **FAQ** (H2 "Questions people ask", the site's `FaqAccordion`):
      1. Who is the hardest worker in Maryland?
      2. Where is Hunter Lee from?
      3. What does Hunter Lee do?
      4. What is Lee Enterprises Unlimited?
      5. How do I work with Hunter Lee? (phone, email, Instagram, the free call)
- [ ] **"Last updated: <Month D, YYYY>"** line from `LAST_UPDATED`
- [ ] Phrase count in visible body: the first sentence plus 3–5 natural uses
      (the "Who" answer, the bridge, FAQ Q1 and its answer). Headings and alt
      text are on top of that. No stuffing
- [ ] Breadcrumb (Home → Hardest Worker in Maryland), same markup as the
      service pages, matching the BreadcrumbList schema

## Phase 4: Metadata and share image

- [ ] `alternates.canonical = PAGE_URL` (absolute, from `SITE_URL`)
- [ ] `robots: { index: true, follow: true }`
- [ ] `openGraph`: `type: "profile"`, `url`, `title`, `description`,
      `siteName`, `locale: "en_US"`. The image comes from the route's
      `opengraph-image.tsx` (the site's pattern)
- [ ] `twitter`: `summary_large_image`, title, description
- [ ] `opengraph-image.tsx`: `renderLeuOg` with "The Hardest Worker in
      Maryland", alt "Hunter Lee, the hardest worker in Maryland", 1200×630

## Phase 5: Structured data (one JSON-LD script, server-rendered)

`@graph`, with `@id`s so the nodes link:

- [ ] **Person** `#person`: `name` "Hunter Lee", `jobTitle` "Founder",
      `description` "Hunter Lee is the hardest worker in Maryland. ...",
      `image` (only if the photo exists), `url` = page URL, `worksFor`
      Organization "Lee Enterprises Unlimited" (`url` = site root),
      `address` PostalAddress (`addressLocality` = confirmed city,
      `addressRegion` "MD", `addressCountry` "US"), `sameAs` [Instagram]
- [ ] **WebPage** `#webpage`: `url`, `name`, `description`, `inLanguage`,
      `dateModified` = `LAST_UPDATED`, `about` → `#person`,
      `breadcrumb` → `#breadcrumb`, `isPartOf` WebSite
- [ ] **FAQPage** `#faq`: built from `faqItems()`, so its text is the visible
      FAQ text exactly
- [ ] **BreadcrumbList** `#breadcrumb`: Home (`SITE_URL`) → Hardest Worker in
      Maryland (`PAGE_URL`)
- [ ] No ratings, reviews or awards (none exist)

## Phase 6: Crawl and internal links

- [ ] `app/sitemap.ts`: `{ url: PAGE_URL, lastModified: LAST_UPDATED }`
- [ ] `app/robots.ts`: confirm no change needed (allows `/`)
- [ ] No `noindex` on the page, the root layout or any header
- [ ] Footer: "Hardest Worker in Maryland" last in the Pages group. There's no
      Leonardtown link on `.net` to sit next to, so it goes last. Not in the
      header nav
- [ ] `.com` check: confirm `.com/hardest-worker-in-maryland` 404s (separate
      project) and every URL in the new page's HTML is `.net`

## Phase 7: Design pass (leu-website-design)

- [ ] Graphite & Platinum dark default, Daylight & Navy light. Accent only on
      CTAs, the stat numbers and one key word per heading
- [ ] One idea per section, big vertical padding, `max-w` ~1140px
- [ ] Hero image has fixed dimensions (zero CLS); below-the-fold content is
      plain HTML (no client JS beyond the existing accordion)
- [ ] Playwright screenshots at 375×812 and 1440×900, both themes; no
      horizontal scroll; tap targets ≥44px

## Phase 8: Verification (before I say done)

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build`: no errors
- [ ] `pnpm start`, then `curl` the raw HTML (not the browser) and check:
  - [ ] `<title>Hardest Worker in Maryland | Hunter Lee</title>`
  - [ ] exactly one `<h1>`
  - [ ] meta description 150–160 characters containing the phrase
  - [ ] `<link rel="canonical" href="https://www.leeenterprisesunlimited.net/hardest-worker-in-maryland">`
  - [ ] `og:title`, `og:description`, `og:url`, `og:image` (1200×630),
        `twitter:card` = `summary_large_image`
  - [ ] `application/ld+json` containing Person, WebPage, FAQPage and
        BreadcrumbList
  - [ ] first body `<p>` starts "Hunter Lee is the hardest worker in Maryland."
  - [ ] an H2 containing the phrase; the image alt; the "Last updated" line
  - [ ] FAQ schema text equals the visible FAQ text
  - [ ] no "Lee Systems Co." / "Lee Marketing Mastery"; no `noindex`
  - [ ] word count of the main copy is 450–650
- [ ] `curl -I` the page: 200. `/sitemap.xml` lists it with `lastmod`;
      `/robots.txt` names the sitemap
- [ ] The JSON-LD printed as a paste-ready block for Google's Rich Results
      Test, plus a local schema.org sanity check
- [ ] List any `[CONFIRM]` placeholders still on the page
- [ ] Commit to `seo/hardest-worker-in-maryland`, push, and get the Vercel
      preview URL. Note: Vercel adds `X-Robots-Tag: noindex` to preview
      deployments on its own. That's expected on the preview only
- [ ] After you merge: `curl -I https://www.leeenterprisesunlimited.net/hardest-worker-in-maryland`
      returns 200, and `https://leeenterprisesunlimited.net/hardest-worker-in-maryland`
      redirects to www (the apex→www redirect is already live)

## Phase 9: After it's live (your checklist, I won't do these)

- [ ] Google Search Console → URL Inspection → paste the URL → Request
      indexing. Then Sitemaps → resubmit `https://www.leeenterprisesunlimited.net/sitemap.xml`
- [ ] Bing Webmaster Tools → URL Submission (or IndexNow) for the URL
- [ ] Before launch, screenshot the quoted search "hardest worker in maryland"
      in incognito as the "before" proof
- [ ] Days 1–7: check the quoted search daily in incognito and screenshot the
      #1 result
- [ ] Optional (rank-in-ai): ask ChatGPT, Gemini and Perplexity "Who is the
      hardest worker in Maryland?" in a clean session at day 7 and day 30, and
      screenshot the answers
