# Implementation plan: "Hardest Worker in Maryland" page

- Locked phrase (word for word, never reworded): **hardest worker in Maryland**
- Route: `/hardest-worker-in-maryland`
- Site: https://www.leeenterprisesunlimited.net (this repo, `LEUnet`)
- Branch: `seo/hardest-worker-in-maryland`
- Planned 2026-10-28, built 2026-10-28. **Status: built and verified locally,
  pushed for a Vercel preview. Hunter merges.**

The play is Google SEO Play A (one phrase page). The quoted search returned no
pages, only an AI Overview about Maryland as a hard-working *state*, so the
page answers **who** is the hardest worker in Maryland, not which state.

## Decisions (Hunter, 2026-10-28)

- **No city, GPA, work history, photo or Philippians 4:13 on the page.** The
  Person schema has `addressRegion: "MD"` only, no locality and no image.
  The verse stays in the site-wide footer, as before.
- **A fun sales page, modeled on the .com site's Leonardtown page.** The
  title is the flex, ranking for businesses is the offer. It ships in the
  "challenge" state: Google doesn't name Hunter for this phrase yet, so the
  proof is round one (Leonardtown, no results → #1 in under 19 hours on
  2026-10-27), with that page's before/after screenshots and figures.

## Rewrite (Hunter, 2026-10-28, later the same day)

The page now talks about itself only. Round one (Leonardtown) is gone: no
before/after screenshots, no figures, no link to the `.com` page, and the
copied images in `public/leonardtown/` are deleted. In their place:

- **How this page is built to rank #1 on Google**: six cards on what this
  page does (exact words in the right places, answer first, structured data,
  speed, sitemap/Search Console/IndexNow, built for calls) and a "Search it
  now" link so visitors check the result themselves.
- The offer is "Want your business ranked higher on Google?", and a new
  "Who hires the hardest worker in Maryland?" section lists the kinds of
  businesses it's for, laid out like the Leonardtown page's "Who it's for".
- The FAQ drops "What is Lee Enterprises Unlimited?" and adds why the page
  exists, how a page ranks higher, whether we can rank your business, how
  long it takes and what it costs.

The order is now: hero, who, why, how it ranks, method, offer, fair warning,
who it's for, FAQ, closing CTA.

## Recon findings

1. **Two sites, two repos.** `LEUnet` is `www.leeenterprisesunlimited.net`
   (`SITE_URL` in `data/site.ts` → `metadataBase`). `leu` is
   `www.leeenterprisesunlimited.com`, and the Leonardtown page lives there.
   The `.com` project doesn't serve this page (it 404s there), so nothing on
   `.com` competes with it and no cross-domain canonical is needed. Every URL
   on the page is built from `SITE_URL`. (Out of scope: the two homepages are
   near-copies, each canonical to its own domain.)
2. The session branch started 83 commits behind `main`. It was
   fast-forwarded to `origin/main` before any work.
3. Leonardtown pattern copied (structure only, own copy): route constants
   file, one data file with every string and date, a server page with
   absolute title, canonical, index/follow, OG `profile`, Twitter large card,
   and one JSON-LD `@graph` (WebPage, Person, FAQPage, BreadcrumbList) whose
   FAQ is built from the same list the accordion renders. Sitemap entry with
   a real lastmod. One footer link, never the header nav. Click tracking on
   every "Book a free call" and a sticky CTA bar on phones.
4. Light theme: `--svc-surface` is a dark-theme value, so every card carries
   `light:bg-[#fff]` and the light shadow, like the service pages.

## Files

| File | Change |
|---|---|
| `data/hardest-worker-route.ts` | New. Slug, path, footer label |
| `data/hardest-worker.ts` | New. Phrase, `LAST_UPDATED`, meta, person, round-one proof, all copy, FAQ, date formatter |
| `app/hardest-worker-in-maryland/page.tsx` | New. Metadata, JSON-LD, sections, sticky CTA |
| `app/hardest-worker-in-maryland/opengraph-image.tsx` | New. `renderLeuOg`, 1200×630, alt "Hunter Lee, the hardest worker in Maryland" |
| `components/hardest-worker/HardestWorkerSections.tsx` | New. Hero, who, why, round one, method, offer, fair warning, FAQ, CTA |
| `components/hardest-worker/TrackCta.tsx`, `StickyCta.tsx` | New. Vercel Analytics click event, phone sticky bar |
| `public/leonardtown/before.webp`, `after-google-1.webp`, `after-google-1@2x.webp` | Copied from the `leu` repo |
| `app/sitemap.ts` | Page added with `lastModified: LAST_UPDATED` |
| `data/navigation.ts` | Footer link "Hardest Worker in Maryland", last in Pages |

No changes to the layout, robots, `next.config.mjs`, the header or the `.com` repo.

## Page, in order

1. **Hero**: eyebrow "The Google challenge · Round two", the one `<h1>`
   "The Hardest Worker in Maryland", first `<p>` "Hunter Lee is the hardest
   worker in Maryland.", "Book a free call" (→ `/contact?interest=free-call`),
   "See round one", "Google it yourself", and a "#1?" badge (fixed aspect
   ratio, no photo).
2. **Who is the hardest worker in Maryland?** Direct answer, plus the bridge
   line (Maryland as a hard-working state, Hunter setting the pace, no
   WalletHub number).
3. **Why Hunter Lee Is the Hardest Worker in Maryland**: seven proof cards,
   facts only.
4. **Round one**: Leonardtown before/after screenshots, four figures, link to
   the full story on `.com`.
5. **The method**: four steps.
6. **What that work ethic means for your business**: the offer (four linked
   services), flat quote, CTA, the three site stats.
7. **Fair warning**: no ranking guarantees.
8. **FAQ**: six questions, answer-first.
9. **Closing CTA** and "Last updated: October 28, 2026".

## Verification (2026-10-28, local production build)

- [x] `pnpm lint`, `pnpm typecheck`, `pnpm build` pass (also on untouched main)
- [x] Raw HTML (curl): 200; title "Hardest Worker in Maryland | Hunter Lee"
      (39 chars); one `<h1>`; description 154 chars with the phrase, Hunter Lee
      and Lee Enterprises Unlimited; canonical
      `https://www.leeenterprisesunlimited.net/hardest-worker-in-maryland`;
      og:title/description/url/type/image (1200×630)/image:alt;
      twitter:card `summary_large_image`; robots `index, follow`
- [x] One `application/ld+json` with WebPage, Person, FAQPage, BreadcrumbList;
      FAQ schema text equals the visible FAQ
- [x] First `<p>` in main is "Hunter Lee is the hardest worker in Maryland.";
      two H2s contain the phrase; the phrase appears in four more body
      sentences
- [x] No retired names, no `noindex`, no city/GPA/work history/verse in main,
      no WalletHub
- [x] Sitemap lists the page with `<lastmod>2026-10-28</lastmod>`; robots.txt
      allows `/` and names the sitemap
- [x] Footer link present, header nav doesn't have it
- [x] Playwright 375×812 and 1440×900, dark and light: no horizontal scroll
- [x] Live: `https://leeenterprisesunlimited.net/hardest-worker-in-maryland`
      308s to www; `.com/hardest-worker-in-maryland` is 404
- Main copy is about 920 words, over the original 450–650 target, because
  the page now carries the Leonardtown-style sales sections.
- No `[CONFIRM]` placeholders on the page.

## Follow-up

- [ ] When an incognito quoted search shows this page #1, switch the hero
      and proof to the won state with this page's own before/after
      screenshots, and bump `LAST_UPDATED`.

## After it's live (Hunter)

- [ ] Before requesting indexing, screenshot the quoted search "hardest
      worker in maryland" in incognito as the "before"
- [ ] Google Search Console → URL Inspection → Request indexing; Sitemaps →
      resubmit `https://www.leeenterprisesunlimited.net/sitemap.xml`
- [ ] Bing Webmaster Tools → URL Submission (or IndexNow) for the URL
- [ ] Days 1–7: quoted search daily in incognito, screenshot the #1 result
