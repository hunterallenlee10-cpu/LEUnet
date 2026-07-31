# LMM Websites — Build Spec

Execution plan and settled decisions for `/lee-marketing-mastery/websites`, the
Lee Marketing Mastery page focused solely on selling professionally built,
AI-produced websites.

**Status:** built. The page is live on the branch and passes a production build.
What remains is business confirmation, not code — see §7.

| Done | File |
| --- | --- |
| ✅ | `data/websites.ts` — FAQ list + portfolio list |
| ✅ | `app/lee-marketing-mastery/websites/page.tsx` — page + structured data |
| ✅ | 11 components in `components/websites/` |
| ✅ | `app/api/website-inquiry/route.ts` |
| ✅ | 1 edit outside the page — the LMM hero button (§5) |

---

## 1. Settled decisions

| | |
| --- | --- |
| Route | `/lee-marketing-mastery/websites` |
| Offer | New builds, redesigns, built-in AI features, optional care plans |
| Prices | **Hidden.** Every CTA routes to the quote form |
| Proof | LEU's own four sites, linked live. No client work claimed |
| Testimonials | **None.** Not a single fabricated quote — see §3 |
| Lead capture | Own API route, own subject line |
| Contact | `ceo@leeenterprisesunlimited.com`, same as every other form |
| Payments | None. This page quotes, it does not sell |

### Why a sub-route and not a fifth venture

This is a Lee Marketing Mastery offering, not a sibling of Pelican or Thread.
Nesting it under `/lee-marketing-mastery/` makes the parent-child relationship
legible in the URL itself, and both the hero and the final CTA link back up to
the parent page.

Consequence: it is deliberately **not** in `ventureNavItems`
(`data/navigation.ts`). The global "Ventures" dropdown lists ventures, and
putting a service offering in it would misrepresent what it is. The page is
reached from the LMM hero button, from search, and from direct links. If it
needs a global nav entry later, that is a decision to make on purpose, not a
side effect of this build.

### Why no prices

The offer spans a one-page site for a new business and a rebuild with booking
and automated follow-up. There is no honest single number, and a "starting at"
figure invites the wrong conversation before scope is known.
`WebsitesPricingSection` therefore explains the four inputs a quote is built
from — page count, whether content exists, required functionality, and
post-launch care — so a visitor can self-qualify without a number.

This matches the Thread precedent (`docs/THREAD.md` §1), where prices are hidden
because they were not settled.

---

## 2. Page structure

Ordered to answer objections in the order a skeptical visitor raises them.

| Section | Component | Job |
| --- | --- | --- |
| Hero | `WebsitesHeroSection` + `BrowserFrameVisual` | The claim, and two CTAs |
| Outcome strip | `WebsitesOutcomeStrip` | Four concrete outcomes |
| Problem | `WebsitesProblemSection` | Why traditional builds stall |
| What we build | `WebsitesServicesSection` | All four offerings, expandable |
| How AI works | `WebsitesAiSection` | **The trust section** — see §3 |
| Proof | `WebsitesWorkSection` | Four live sites, each clickable |
| Process | `WebsitesProcessSection` | Six steps, no surprises |
| Pricing | `WebsitesPricingSection` | What a quote is built from |
| Quote form | `WebsitesInquiryCTA` + `WebsitesInquiryForm` | The conversion |
| FAQ | `WebsitesFAQSection` | Remaining objections |
| Final CTA | `WebsitesFinalCTA` | Last ask + links back up |

The FAQ and portfolio arrays live in `data/websites.ts` rather than in their
components because the page also emits them as `FAQPage` and `ItemList`
structured data. A `"use client"` module's exports become client references on
the server, so a server component cannot read the array back out of one — the
same constraint documented in `data/lmm.ts`.

---

## 3. The honesty constraints

`app/lee-marketing-mastery/page.tsx` limits its structured data to "what the
site can actually substantiate: no ratings, reviews or service-area claims."
This page holds the same line, and it matters more here because "built with AI"
is the exact claim a skeptical buyer distrusts.

Three rules the page follows:

1. **No fabricated proof.** No testimonials, no client count, no "300% more
   leads." The portfolio is four sites on this domain that a visitor can open
   and use. The copy states plainly that they are LEU's own ventures rather
   than client projects.
2. **AI's role is stated, not hidden.** `WebsitesAiSection` splits the work
   explicitly: AI drafts copy, generates layouts, produces imagery, writes code;
   people set direction, edit and fact-check, test, and approve. The claim is
   that AI changes production speed, not that nobody reviews the output.
3. **No screenshots of work we did not do.** `BrowserFrameVisual` is an abstract
   wireframe for exactly this reason — a stock screenshot in a hero implies a
   portfolio that does not exist.

If real client sites or real testimonials become available, they replace
`websitePortfolio` in `data/websites.ts` and the copy in `WebsitesWorkSection`
loses its "our own ventures" caveat. Until then the caveat stays.

---

## 4. The lead route

`app/api/website-inquiry/route.ts` is a near-clone of
`app/api/lmm-consultation/route.ts`: per-request Resend construction (the
constructor throws on a missing key and would fail `next build`), honeypot,
server-side recipient, field-by-field error logging.

A separate route rather than a flag on the LMM one, because the subject line —
`New Website Request — {business} — {name}` — is what separates a website lead
from an automation lead in the inbox, and that only works if it is set here.

Recipient resolution, first match wins:

```
WEBSITE_TO_EMAIL → LMM_TO_EMAIL → CONTACT_TO_EMAIL → ceo@leeenterprisesunlimited.com
```

No new required environment variable. `WEBSITE_TO_EMAIL` is optional and only
needed if website leads should route somewhere other than the shared inbox.

---

## 5. The entry point

One edit outside the new page: `components/lmm/LmmHeroSection.tsx`.

A pill-style link sits in the hero's right-hand column, directly above the
System Flow panel and aligned to its left edge. A second pill for the marketing
page now sits beside it — both render from one `siblingOfferings` array in
`components/lmm/LmmHeroSection.tsx`, so a third is a data edit rather than a
layout edit. See `docs/MARKETING.md` §5.

It is deliberately not a solid button — the two CTAs under the headline are that
page's primary conversion, and a competing amber button would split them. The
pill fills solid on hover and carries an arrow so it still reads as a link.

**Known tradeoff.** The hero grid is `lg:grid-cols-2`, so below the `lg`
breakpoint the right column stacks *under* the headline column. At 390px the
pill lands ~804px down — just past the fold on a typical phone, after both
primary CTAs. Desktop visitors see it immediately; phone visitors have to
scroll.

If phone visibility matters later, the fix is to render it twice with
responsive visibility (`lg:hidden` in the headline column, `hidden lg:block`
above the panel) — the same two-layout duplication `AutomationFlowVisual`
already uses for its mobile rail versus desktop graph.

---

## 6. Reused, not rebuilt

- `MainHeader` / `MainFooter` — unchanged
- `btn-primary`, `btn-secondary`, `section-container`, `heading-xl/lg` from
  `app/globals.css`
- `.lmm-status` pulse (reduced-motion safe) for the "Live" dot
- `smoothScrollToElement` from `lib/scrollUtils`
- The amber LMM palette throughout — this is an LMM page, not a new brand

---

## 7. Before this is advertised

Code is done; these are business confirmations:

- [ ] **Care plan** — confirm it is actually offered, and at what cadence, before
      pointing ad spend at the page. The page says "optional, quoted
      separately" and names no price.
- [ ] **AI features** — chat, booking, and CRM routing are listed as available.
      Confirm each can be delivered, or trim the list in
      `WebsitesServicesSection`.
- [ ] **Turnaround** — the page deliberately promises no number of days. Keep it
      that way until there are enough completed builds to quote an honest range.
- [ ] **Domain/hosting setup** — listed as included in a new build. Confirm who
      pays for the domain and hosting, and whether that is inside the quote.
- [ ] **Ownership** — the FAQ states the client owns the finished site. Confirm
      this matches how care-plan hosting is actually structured.
- [ ] **OG image** — currently reuses `/og/lee-marketing-mastery.png`. A
      websites-specific image would perform better when shared.
