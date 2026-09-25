# Thread T-Shirts — Its Own Site

**Thread T-Shirts became its own website, from its own repo, on 2026-09-25
(<https://github.com/hunterallenlee10-cpu/TREAD>). It is still one of the two
ventures Lee Enterprises Unlimited lists here: the nav, the footer, the contact
form, the websites portfolio and the marketing page all still name it, and the
ones that linked to its page now link to its site.**

The build spec that used to be this file — every settled decision about the
page, the cart contract, the order-request rules, and the pre-launch honesty
rules about prices, fabrics and print methods — moved with the page and is
`docs/THREAD.md` there. Read that before changing anything about Thread's
catalog or order form; nothing in it was loosened by the move.

This file records what the move left behind here, and why.

## 1. What left, with the page

| Left this repo | Now |
| --- | --- |
| `app/thread-t-shirts/page.tsx` | `app/page.tsx` in the Thread repo — the page is that site's homepage |
| `app/api/thread-order/route.ts` | Same path there, unchanged. Requests still deliver to the LEU inbox by default |
| `components/thread/` — 21 components | Same path |
| `data/thread.ts`, and the Thread interfaces in `types/index.ts` | Same paths |
| `public/thread/` — product photos, placeholder art, the wordmark | Same path, byte for byte |
| `THREAD_TO_EMAIL` in `.env.example` | The Thread project's environment |
| This file's build spec | `docs/THREAD.md` there, with a §11 on exactly what changed in the move |

Nothing in `app/globals.css` was Thread's. The page kept its styling in its
own `ThreadStyles` component, precisely so it would not touch this stylesheet,
and used five shared utilities (`.section-container`, `.section-padding`,
`.heading-xl`, `.heading-lg`, `.heading-md`) that the pages here still use. The
stylesheet is unchanged.

## 2. What stayed, and why

- **The listing.** Thread is still one of this site's two ventures, so
  everything that listed it stays, and everything that linked to the page links
  to the site instead — through the one shared constant, `THREAD_SITE_URL`
  (§4):

  | Where | What reads it |
  | --- | --- |
  | The "Thread T-Shirts" nav entry, desktop and mobile | `venturePages.thread` in `data/navigation.ts`. `MainHeader`'s `handleNavClick` navigates to an absolute URL rather than scrolling |
  | The footer's "Our Ventures" row | The same map, rendered by `MainFooter` as a `Link` |
  | Thread's card in the LMM websites portfolio, and the page's `ItemList` | `data/websites.ts`; see §3 |
  | The "Branded Apparel & Team Gear" card on the LMM marketing page | `MarketingTraditionalSection` |
  | `ctaPrimaryHref` on Thread's record in `data/ventures.ts` | Nothing renders it today; it points at the site's `#order-request` rather than at a route that no longer exists |

  Unchanged, because they name Thread without linking to the page: the contact
  form's venture option (`data/contact.ts`), the site metadata's "two distinct
  ventures" (`app/layout.tsx`), the marketing FAQ's apparel answer,
  `VENTURE_COLORS.thread`, and the Thread entries in `data/services.ts`, which
  had no consumer before the move either.
- **`public/logos/thread-logo.png`**, because `data/ventures.ts` still names it
  in `logo`. Nothing here renders that field today — the header, footer and
  hero use the LEU mark — but the record should not point at a missing file.
  The Thread repo carries its own copy.
- **Invoicing.** `POST /api/stripe/invoice` still accepts `ventureId: "thread"`.
  The Thread site takes no payment; a customer who needs an invoice is invoiced
  from here, through the shared Stripe account (`docs/STRIPE.md` §2).
- **Old URLs.** `/thread-t-shirts` answered here for months, and the H1 site's
  footer still links to it for H1 apparel, so it redirects to the Thread site
  rather than 404ing, as does anything under it and every old `/thread/*` image
  path (§4).

Thread's catalog — including its six H1 Performance shirts and its two LEU
shirts — moved with the page and is Thread's to change. `docs/H1.md` §3 says why
the H1 line was left alone when H1 came off this site.

## 3. The websites portfolio copy

The portfolio on `/lee-marketing-mastery/websites` is still three entries, all
LEU's own, and still says so. What changed is where they live, and the Work
section's own rule covers it: when an entry moves off this domain, "On This
Domain" comes out of the heading (`WebsitesWorkSection`, `docs/WEBSITES.md`
§3.5).

- The heading reads "Every Site We Run Was Built to Turn a Visitor Into a
  Customer", as it did for the two days H1 Performance was listed on its own
  domain.
- The lead paragraph states the structure outright: two of the three run on
  this domain and both are the site being read; the third, Thread T-Shirts, runs
  as its own site from its own codebase.
- The eyebrow, "Three Live Sites, All Ours", was already true and stayed.
- The LEU card's "Two ventures, one site" chip stayed. This site still presents
  both ventures, as it presented H1 while H1 was listed on its own domain.
- The page's `ItemList` emits an absolute href as-is again instead of prefixing
  `SITE_URL` to it, which would produce `https://…comhttps://…`.

## 4. The wiring

`NEXT_PUBLIC_THREAD_SITE_URL` — the Thread site's origin, no trailing slash —
drives every link in §2 and every redirect below. The fallback and the
normalisation live in `config/thread-site.mjs`. `next.config.mjs` resolves the
variable through it and hands the resolved value to the app through its `env`
key; `lib/thread-site.ts` is what app code imports. (The arrangement is the one
`config/h1-site.mjs` describes, and for the same reason: `next.config.mjs`
cannot import TypeScript, and Next only inlines `NEXT_PUBLIC_*` reads in the
app's own TypeScript.)

**The fallback is `https://thread.leeenterprisesunlimited.com`, and that is
deliberate.** H1's fallback is Vercel's default alias for a project named
`h1-performance`. A project named after the Thread repo would be `thread` or
`tread`, and those `*.vercel.app` aliases are almost certainly other people's
sites: a guess there would send this site's visitors to a stranger. A guess on
this site's own domain can only fail to resolve.

The redirects, in `next.config.mjs`:

| From | To |
| --- | --- |
| `/thread-t-shirts` and `/thread-t-shirts/*` | The Thread site's root. A `#catalog` or `#order-request` fragment survives, and those ids are unchanged there |
| `/thread/*` | The same path on the Thread site, which serves the identical files |

They are temporary (307) while the variable is unset and permanent (308) once
it is set, so nothing caches a redirect to a host that might not be final. A
cart built on the old page does not follow the visitor: `localStorage` belongs
to an origin, and the Thread site starts empty.

**Deploy order — before this change goes live:**

1. Deploy the Thread site from its repo (its README has the steps).
2. Either attach `thread.leeenterprisesunlimited.com` to that Vercel project,
   or set `NEXT_PUBLIC_THREAD_SITE_URL` in this project's Vercel environment to
   the Thread site's origin (Production and Preview, no trailing slash) and
   confirm it answers first — a 308 is cached indefinitely.
3. Then deploy this change. Until it is deployed, the live site keeps serving
   the old page at `/thread-t-shirts`, so nothing breaks in between.
