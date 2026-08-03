# LMM Marketing Services — Build Spec

Execution plan and settled decisions for `/lee-marketing-mastery/marketing`, the
Lee Marketing Mastery page covering traditional and digital marketing services.

**Status:** built. The page passes a production build. What remains is business
confirmation, not code — see §7.

| Done | File |
| --- | --- |
| ✅ | `data/marketing.ts` — FAQs, traditional list, digital list |
| ✅ | `app/lee-marketing-mastery/marketing/page.tsx` — page + structured data |
| ✅ | 12 components in `components/marketing/` |
| ✅ | `app/api/marketing-inquiry/route.ts` |
| ✅ | 2 edits outside the page — the LMM hero pill (§5), `.env.example` |

---

## 1. Settled decisions

| | |
| --- | --- |
| Route | `/lee-marketing-mastery/marketing` |
| Button label | "Traditional & Digital Marketing" |
| Prices | **Hidden.** Every CTA routes to the quote form |
| Apparel | Links to `/thread-t-shirts` rather than duplicating it |
| Billboards / TV / radio | Framed as network-reachable, **not** standing offerings |
| Testimonials | **None.** Same line as the other two pages |
| Lead capture | Own API route, own subject line |
| Contact | `ceo@leeenterprisesunlimited.com`, same as every other form |

### Where the service lists came from

The digital list mirrors the Lee Marketing Mastery card on the LEU homepage
(`ventureServices.lmm` in `data/services.ts`) so the two never drift apart.

Two entries from that card are deliberately **absent**: Business Automation and
website development already have their own pages. `MarketingRelatedSection`
cross-links to both rather than restating them, which keeps each page's claim
distinct and gives the three offerings an obvious path between them.

The traditional list is print, signage, and vehicle graphics. Branded apparel is
a real capability but it is produced by Thread, so it renders as a link-out card
rather than a fourth service card with a details toggle that goes nowhere.

### Why billboards and TV are not in the offer catalog

They are brokered through a network, not produced in house, and
`MarketingCustomIdeasSection` says exactly that. Listing them in
`hasOfferCatalog` alongside print and paid ads would assert they are standing
offerings. The section invites the request without making the claim.

### Why no prices

These channels price on genuinely different models — print is per piece and
drops sharply at volume, ad management is monthly, a vehicle wrap is one time,
and ad spend goes to the platforms directly. A single number would be
meaningless rather than merely imprecise. `MarketingPricingSection` explains the
four inputs instead. Matches the automation and websites pages.

---

## 2. Page structure

| Section | Component | Job |
| --- | --- | --- |
| Hero | `MarketingHeroSection` + `ChannelMixVisual` | The claim, two CTAs |
| Outcome strip | `MarketingOutcomeStrip` | Four concrete outcomes |
| Why both | `MarketingProblemSection` | Digital-only vs traditional-only vs both |
| Digital | `MarketingDigitalSection` | Six online channels |
| Traditional | `MarketingTraditionalSection` | Three offline channels + Thread link |
| Unique ideas | `MarketingCustomIdeasSection` | Billboards, TV, sponsorships |
| Process | `MarketingProcessSection` | Six steps |
| Pricing | `MarketingPricingSection` | What a quote is built from |
| Works with | `MarketingRelatedSection` | Cross-link to websites + automation |
| Quote form | `MarketingInquiryCTA` + `MarketingInquiryForm` | The conversion |
| FAQ | `MarketingFAQSection` | Remaining objections |
| Final CTA | `MarketingFinalCTA` | Last ask + links back up |

`MarketingServiceGrid` is shared by the digital and traditional sections.

### The client-boundary constraint

`MarketingServiceGrid` is a client component (it holds the expand/collapse
state). Its icon map lives **inside** that module rather than being passed in as
a prop, because the sections rendering it are server components and a React
component is a function — passing one across the boundary fails the build with
`Functions cannot be passed directly to Client Components`.

This is the same class of constraint documented in `data/lmm.ts`, from the other
direction. Keeping icons in the client module also keeps `data/marketing.ts`
fully serializable, which the page needs in order to read the service lists for
structured data.

---

## 3. The honesty constraints

Same line as `docs/WEBSITES.md` §3 and the parent LMM page:

1. **No fabricated proof.** No testimonials, no client count, no campaign
   results, no "3x your leads."
2. **Measurement is described accurately.** The FAQ says digital channels report
   on themselves and traditional ones need trackable numbers, landing pages, or
   offer codes — and that we would rather call a channel unmeasurable than
   invent a number for it.
3. **Ad spend ownership is stated.** The client pays platforms directly, in
   their own name, and keeps the account and its history. That is in both the
   FAQ and the pricing section.
4. **The hero visual is abstract.** `ChannelMixVisual` is a channel diagram, not
   a mock billboard or invented ad creative.

---

## 4. The lead route

`app/api/marketing-inquiry/route.ts` follows `website-inquiry` and
`lmm-consultation`: per-request Resend construction, honeypot, server-side
recipient, field-by-field error logging.

**One thing it does that the others do not:** it accepts an array. `channels` is
the only free-form array the site takes from a browser, so `normalizeChannels`
bounds it — non-strings dropped, each entry capped at 80 characters, list capped
at 20. Without that, a crafted post could inflate the outbound email
arbitrarily.

Recipient resolution, first match wins:

```
MARKETING_TO_EMAIL → LMM_TO_EMAIL → CONTACT_TO_EMAIL → ceo@leeenterprisesunlimited.com
```

No new required environment variable. Documented in `.env.example`.

---

## 5. The entry point

A pill above the Channel Mix panel, beside one for websites. The row is
`LmmSiblingLinks` and every LMM hero renders it — see `docs/CROSS-LINKS.md`.

The row is `flex-wrap`: at 1440px the two sit side by side across the panel
width, and narrower than that they stack.

**Known tradeoff, inherited from the websites pill.** The hero grid is
`lg:grid-cols-2`, so below that breakpoint the right column stacks under the
headline column. At 390px the pills land ~854px down — past the fold, after both
primary CTAs. Desktop visitors see both pills immediately; phone visitors have
to scroll. See `docs/WEBSITES.md` §5 for the responsive-duplication fix if that
turns out to matter.

---

## 6. Reused, not rebuilt

- `MainHeader` / `MainFooter` — unchanged
- `btn-primary`, `btn-secondary`, `section-container`, `heading-xl/lg`
- `.lmm-status` pulse (reduced-motion safe) for the "Running" dot
- `smoothScrollToElement` from `lib/scrollUtils`
- The amber LMM palette — this is an LMM page, not a new brand

---

## 7. Before this is advertised

Code is done; these are business confirmations:

- [ ] **Resend domain verification** — until a domain is verified, Resend
      refuses every recipient except the account's own address. Applies to all
      three LMM forms.
- [ ] **Print and signage fulfillment** — confirm the supplier and turnaround
      for flyers, postcards, brochures, business cards, mailers, yard signs,
      banners, storefront signage, and vehicle graphics. The page names all of
      them.
- [ ] **Vehicle wraps** — full wraps are materially harder than decals and
      magnets. Confirm full wraps are actually deliverable or trim that line.
- [ ] **Ad account structure** — the page states clients pay platforms directly
      and keep the account. Confirm that matches how you intend to operate.
- [ ] **The network claim** — "we have the network to make it happen" for
      billboards, TV, radio, and sponsorships is the page's strongest assertion.
      Confirm there are real contacts behind it.
- [ ] **Review generation** — confirm the method is compliant with platform
      rules. Google and Yelp both prohibit incentivized reviews.
- [ ] **OG image** — currently reuses `/og/lee-marketing-mastery.png`.
