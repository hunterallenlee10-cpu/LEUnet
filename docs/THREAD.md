# Thread T-Shirts — Build Spec

Execution plan for `/thread-t-shirts`. Every decision below is settled — this
document exists so the build session writes components instead of re-deriving
choices.

**Status:** built. The page is live on the branch and passes a production
build; what remains is business confirmation, not code — see §10.

| Done | File |
| --- | --- |
| ✅ | `data/thread.ts` — palette, 24-product catalog, all page copy |
| ✅ | `types/index.ts` — Thread interfaces appended |
| ✅ | `public/thread/*.svg` — 8 placeholder product images |
| ✅ | 15 components + 1 page + 1 API route (§4) |
| ✅ | 2 one-line edits outside the page (§7) |

---

## 1. Settled decisions

| | |
| --- | --- |
| Route | `/thread-t-shirts` |
| Launch state | **Pre-launch.** Takes requests, does not sell |
| Prices | Hidden — `priceCents: null` renders "Price coming soon" |
| Product photos | Generated SVG placeholders, swappable per product |
| Turnaround | 2–4 weeks, from **proof approval** (`THREAD_TURNAROUND`) |
| Custom minimum | **None.** Custom printing runs at any quantity, down to one piece |
| Printing | "Professional custom apparel supplier with commercial-grade equipment" |
| Fulfillment | Shipping |
| Sizes | S, M, L, XL, 2XL, 3XL |
| Design | Both — Thread designs it, or the customer submits artwork |
| Group pricing | "Contact us for group pricing." No tiers, no numbers |
| Catalog | 24 products, 3 in each of 8 categories |
| Contact | `ceo@leeenterprisesunlimited.com`, same as every other form |
| Checkout | **Order request only.** No payment, no card fields |

### Why no real checkout

The conditional in the original plan resolves to "no commerce system." Stripe is
wired for exactly two flows, neither of which is a product catalog:
`/api/stripe/support` is a single pay-what-you-choose line item, and
`/api/stripe/invoice` is admin-only and must never be called from a browser
(`docs/STRIPE.md` §2). Fixed-price Checkout items were built and removed
(§8). There is no database, and §"Before automating fulfillment" warns against
automated fulfillment until webhook idempotency is persisted. Stripe Tax is off
by design (§5).

If real checkout is added later: **prices must resolve server-side from a SKU.**
A cart that posts prices from `data/thread.ts` is exploitable. `docs/STRIPE.md`
§1 notes the support flow inverts the usual "client never sends a price" rule
specifically because it is pay-what-you-choose — that exemption does not
transfer to a catalog.

---

## 2. Brand

`VENTURE_COLORS.thread` in `lib/colors.ts` is byte-identical to the parent LEU
gold, which leaves Thread with no identity of its own. **Do not edit it** —
that token also styles the Thread block on the homepage, and changing it
restyles a page outside this scope.

Instead use `THREAD_PALETTE` from `data/thread.ts`, scoped to this page:

| Token | Hex | Use |
| --- | --- | --- |
| `bone` | `#EDE7DA` | Primary buttons, headline accents. Always with `ink` text |
| `champagne` | `#C2A878` | Category labels, hovers, hairlines, icon strokes |
| `ink` | `#0B0B0B` | Deepest background, and text on bone buttons |
| `charcoal` | `#141414` | Cards, alternating section backgrounds |
| `border` | `#2A2724` | Warm-tinted borders, distinct from `neutral-800` |
| `muted` | `#8A8378` | Secondary body copy |

Bone-on-near-black is the standard premium apparel signature, and champagne
keeps Thread visibly related to the LEU gold without repeating it.

**Applying it:** follow the existing repo idiom — inline `style={{ }}` for brand
colors (see `VentureDetailSection.tsx:50`), Tailwind `neutral-*` for structure.
No `globals.css` changes. Zero blast radius on other pages.

**Do not use `.btn-primary` / `.btn-secondary`** — both are hardcoded amber
(`globals.css:440`). Thread's recipe:

```tsx
// Primary
className="px-6 py-3 font-semibold rounded-lg transition-all duration-200
           hover:scale-[1.02] active:scale-95"
style={{ backgroundColor: THREAD_PALETTE.bone, color: THREAD_PALETTE.ink }}

// Secondary
className="px-6 py-3 font-semibold rounded-lg border-2 transition-all duration-200"
style={{ borderColor: THREAD_PALETTE.champagne, color: THREAD_PALETTE.champagne }}
```

Reusable and unchanged: `.section-container`, `.section-padding`, `.heading-xl`,
`.heading-lg`, `.heading-md`, `GlassCard`, `GlassCardPadded`, `MainHeader`,
`MainFooter`.

---

## 3. Page composition

`app/thread-t-shirts/page.tsx` — server component (needs `export const
metadata`), wrapping everything in the client cart provider.

| # | Section | Content source |
| --- | --- | --- |
| 1 | Hero | Pre-launch badge, headline, two CTAs → `#catalog` and `#order-request` |
| 2 | Brand story | The two paths: original label **and** custom print service |
| 3 | Quality | `threadQualityPillars` (4) |
| 4 | Featured | `getFeaturedThreadProducts()` (10) |
| 5 | Categories | `threadCategories` (8) — clicking one filters the catalog |
| 6 | Catalog | `threadProducts` (24) + category filter. `id="catalog"` |
| 7 | Use cases | `threadUseCases` (8) |
| 8 | Process | `threadProcessSteps` (5) |
| 9 | Group orders | `threadGroupOrderInfo` |
| 10 | FAQ | `threadFaqs` (10), accordion |
| 11 | Order request | Cart review + contact form. `id="order-request"` |
| 12 | Closing CTA | — |

Plus `ThreadCartDrawer`, fixed-position, rendered once at page level.

Page shell: `min-h-screen`, `<MainHeader />`, `<main className="pt-20">`,
`<MainFooter />` — the shared pattern for venture pages on this site.

---

## 4. Files to create

```
app/thread-t-shirts/page.tsx
app/api/thread-order/route.ts
components/thread/ThreadCartProvider.tsx          "use client"
components/thread/ThreadCatalogFilterProvider.tsx "use client"
components/thread/ThreadCartDrawer.tsx            "use client"
components/thread/ThreadProductCard.tsx           "use client"
components/thread/ThreadProductGallery.tsx        "use client"
components/thread/ThreadCatalogSection.tsx        "use client"
components/thread/ThreadCategoriesSection.tsx     "use client"
components/thread/ThreadFeaturedSection.tsx       "use client"
components/thread/ThreadOrderRequestForm.tsx      "use client"
components/thread/ThreadFAQSection.tsx            "use client"
components/thread/ThreadUI.tsx
components/thread/ThreadHeroSection.tsx
components/thread/ThreadBrandStorySection.tsx
components/thread/ThreadQualitySection.tsx
components/thread/ThreadUseCasesSection.tsx
components/thread/ThreadProcessSection.tsx
components/thread/ThreadGroupOrderSection.tsx
components/thread/ThreadCTASection.tsx
```

Three files here weren't in the original plan. `ThreadUI.tsx` holds the shared
button, heading, and section shells so twelve sections don't each re-declare
the palette recipe. `ThreadCatalogFilterProvider.tsx` shares the active
category between the categories section and the catalog grid, which are
siblings — clicking a category card filters the grid and scrolls to it.
`ThreadProductGallery.tsx` is the card's photo panel: a product carrying an
`imageBack` gets both sides as views the reader can swipe, tap, or step
through with an arrow or a dot, and a mouse still peeks at the second one on
hover. A product with one photo renders exactly as it did before it existed,
with no controls at all. Which side is which comes from the product's
`imageSide`, not from photo order — one listing leads with its back.

---

## 5. Cart contract

`ThreadCartProvider` — React context, no new dependencies.

```ts
interface ThreadCartContext {
  items: ThreadCartItem[];          // types/index.ts
  addItem(item: Omit<ThreadCartItem, "key">): void;
  updateQuantity(key: string, quantity: number): void;
  removeItem(key: string): void;
  clear(): void;
  totalPieces: number;
  isOpen: boolean;
  setOpen(open: boolean): void;
}
```

- **Variant identity** is `` `${productId}:${colorId}:${sizeId}` ``. Adding an
  existing variant increments quantity rather than appending a row.
- **Persistence:** `localStorage`, key `thread-order-request-v1`. Read inside
  `useEffect`, never during render — reading during render desyncs SSR and
  client HTML and throws a hydration error.
- **Quantity bounds:** 1–1000 per line, clamped in the provider so the UI cannot
  post something the API will reject.
- **There is no minimum order.** Custom printing runs at any quantity, down to
  a single piece, and the UI says nothing about quantity rules. There was a
  5-piece minimum with a `meetsCustomMinimum` flag and notices in the cart
  drawer, the request form, and the catalog header; all of it is gone. Do not
  reintroduce a quantity gate or notice without a product decision behind it.
- Design packages (`isPackage: true`) have no colors. Use `colorId: ""`,
  `colorName: "—"` so the variant key stays well-formed.

---

## 6. `POST /api/thread-order`

Same Resend construction, honeypot, server-side validation, plain-text email,
and generic error messages as the other form routes in `app/api/`.

**Request:**

```ts
{
  fullName: string;          // required, >= 2 chars
  email: string;             // required — the reply channel for artwork
  phone: string;             // required, >= 10 digits
  organization?: string;
  orderType: "ready-made" | "custom" | "both";
  useCase?: string;          // business | team | school | event | ...
  preferredContact: "email" | "phone" | "text";
  needByDate?: string;
  hasArtwork: "yes" | "no" | "unsure";
  designNotes?: string;
  additionalNotes?: string;
  items: ThreadCartItem[];   // may be empty — custom-only requests are valid
  honeypot?: string;
}
```

**Two rules that matter:**

1. **Re-resolve every `productId` against `threadProducts` server-side and use
   the server's product name in the email.** Never interpolate the client's
   `productName` — that is an open channel for writing arbitrary text into your
   inbox.
2. **Bound the payload** before formatting: reject more than 100 line items, and
   clamp each quantity to 1–1000. An unbounded cart becomes an unbounded email.

**Email is required** — artwork exchange happens over email, so a phone-only
request cannot complete the flow.

**Delivery:** `THREAD_TO_EMAIL || CONTACT_TO_EMAIL || ceo@leeenterprisesunlimited.com`.
Default behavior is the shared inbox, as decided. The env var exists purely as
a future escape hatch — add it to `.env.example` with the same note about
Resend refusing non-account recipients until a domain is verified.

Subject: `New Thread Order Request — ${fullName}`. Set `replyTo` to the
customer's email.

---

## 7. Edits outside the new page

Only two, both one-liners, both required or the page is unreachable:

1. **`data/navigation.ts:46`** — Thread's nav entry is the anchor `#thread`.
   Change `href` to `/thread-t-shirts`. `MainHeader.handleNavClick` already
   routes any `href` starting with `/` correctly (`MainHeader.tsx:57`).
2. **`components/sections/VentureDetailSection.tsx:15`** — add
   `thread: "/thread-t-shirts"` to `venturePages`. Without it the homepage
   Thread section's "Learn More" falls through to the contact form
   (`VentureDetailSection.tsx:33`).

Nothing else outside `app/thread-t-shirts/`, `components/thread/`,
`app/api/thread-order/`, `data/thread.ts`, and `types/index.ts` should change.

---

## 8. Constraints

- **No external image hosts.** CSP is `img-src 'self' data: blob:
  https://*.stripe.com` (`next.config.mjs:16`). A Shopify/Printful/Unsplash URL
  will be blocked. Real photos go in `/public/thread/`.
- **`images: { unoptimized: true }`** (`next.config.mjs:43`) — `next/image`
  passes files through. SVG placeholders work as-is.
- **No database.** Requests are email-only: no order numbers, no history, no
  status lookup. Say "we'll reply within one business day," never "track your
  order."
- **`typescript.ignoreBuildErrors: true`** (`next.config.mjs:40`) — a type error
  will **not** fail `next build`. Run `npx tsc --noEmit` explicitly before
  pushing.
- **Pre-launch honesty.** No stated prices, no delivery promise beyond "2–4
  weeks from proof approval," no claim about equipment beyond the agreed
  supplier language, and no capability claim about print methods — screen print
  vs. DTG vs. embroidery was never confirmed, so all copy stays
  method-agnostic. `data/thread.ts` fabric weights are plausible placeholders
  and must be confirmed before they are advertised.

---

## 9. Build order

Each step is independently verifiable in the browser.

1. `ThreadCartProvider` — foundation everything else consumes
2. `page.tsx` + Hero + BrandStory + Quality — page renders and routes
3. `ThreadProductCard` → Catalog → Categories → Featured — the largest step
4. `ThreadCartDrawer` + `ThreadOrderRequestForm` + API route — the flow, end to end
5. UseCases + Process + GroupOrder + FAQ + CTA — remaining content sections
6. The two edits in §7
7. `npx tsc --noEmit` and `npm run build`

---

## 10. Before this goes public

- [ ] Confirm the fabric weights in `data/thread.ts` or replace them
- [ ] Confirm the supplier language in the `printing` FAQ is accurate
- [ ] Replace at least the 10 featured products' images with real photos
- [ ] Set real `priceCents` values, or leave "Price coming soon" until launch
- [ ] Send one live test request and confirm it lands in the inbox
- [ ] Decide whether the nav links to Thread at launch or stays unlisted until
      inventory is real
