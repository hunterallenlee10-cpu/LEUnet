# Thread T-Shirts — Off This Site

**Thread T-Shirts became its own website, from its own repo, on 2026-09-25
(<https://github.com/hunterallenlee10-cpu/TREAD>), and came off this site
altogether the same day. Lee Enterprises Unlimited lists one venture here now,
Lee Marketing Mastery, beside its flagship program, LEU Business Mastery.**

The build spec that used to be this file — every settled decision about the
page, the cart contract, the order-request rules, and the pre-launch honesty
rules about prices, fabrics and print methods — moved with the page and is
`docs/THREAD.md` there. Read that before changing anything about Thread's
catalog or order form; nothing in it was loosened by the move.

This file records what the change left behind here, and why. Unlike H1
Performance, which kept its listing here for two days after its page moved
(`docs/H1.md`), Thread's page and its listing came off in one change.

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

## 2. What left, with the listing

Nothing on this site names Thread T-Shirts, links to it, or counts it any more:

| Removed | Where it showed |
| --- | --- |
| The `thread` record in `data/ventures.ts` | The footer's "Our Ventures" list (`MainFooter` renders one row per venture) |
| `venturePages.thread` and the `nav-thread` entry in `data/navigation.ts` | The nav bar, desktop and mobile (`MainHeader`). Five entries remain; the desktop bar stays at `xl`, and `MainHeader` has the measurement that says why |
| `sectionIds.thread` | Nothing — no page has rendered a Thread section to anchor to |
| The `thread` option in `data/contact.ts` | The homepage contact form's "venture or service" select |
| The Thread card in `websitePortfolio` (`data/websites.ts`) | The Work section of `/lee-marketing-mastery/websites`, and the `ItemList` structured data that page emits |
| The "Branded Apparel & Team Gear" link-out card in `MarketingTraditionalSection` | `/lee-marketing-mastery/marketing`, below the traditional services |
| Thread's name in the apparel answer in `data/marketing.ts` | The same page's FAQ and its FAQPage structured data. The answer itself stayed — §3 |
| `VENTURE_COLORS.thread`, `VENTURES_BY_ID.thread` and the `thread` Tailwind map in `lib/colors.ts` | Nothing rendered — the venture record was the only reader. `getTailwindColorClass`, which fell back to Thread's map, falls back to LMM's |
| `ventureServices.thread` and `ventureValuesProps.thread` in `data/services.ts` | Nothing. That file has no consumer today; the Thread keys went with the venture rather than being left as stale entries |
| `lib/thread-site.ts` | Deleted. It existed so app code could read the Thread site's URL; no app code links to Thread now |
| `public/logos/thread-logo.png` | Deleted. Only the venture record named it, in `logo`. The Thread repo carries its own copy |
| "two distinct ventures: Lee Marketing Mastery and Thread T-Shirts" and the `apparel` keyword in `app/layout.tsx` | Page metadata, Open Graph and Twitter cards — they now name LEU Business Mastery and Lee Marketing Mastery |
| The venture counts and apparel copy in `data/company.ts`, and the portfolio counts in `data/websites.ts` and `WebsitesWorkSection` | See §4 |

## 3. What stayed, and why

- **The `/thread-t-shirts` and `/thread/*` redirects** in `next.config.mjs`.
  They are the one thing here that still points at the Thread site, and they
  are deliberate: `/thread-t-shirts` answered on this domain for months, and
  the H1 site's footer still links to it for H1 apparel, so its inbound links,
  bookmarks and search placement are worth forwarding rather than throwing at
  a 404. No page on this site links to them. Remove them only when the Thread
  site's own domain has held that traffic long enough that the old URL stops
  being followed — and expect a 404 for anyone still on an old link when you
  do.
- **`config/thread-site.mjs` and `NEXT_PUBLIC_THREAD_SITE_URL`**, because the
  redirects need a target. §5 has the wiring.
- **Invoicing.** `POST /api/stripe/invoice` still accepts `ventureId: "thread"`.
  The Thread site takes no payment; a customer who needs an invoice is invoiced
  from here through the shared Stripe account, tagged `thread` for reporting
  (`docs/STRIPE.md` §2). It is a back-office route behind `STRIPE_ADMIN_TOKEN`,
  not a page, so it says nothing to a visitor about who LEU's ventures are.
- **Branded apparel on the marketing page, without Thread's name.** The FAQ
  still answers "Can you handle branded apparel too?" with a yes, and "Branded
  apparel" is still a channel on the inquiry form. Neither names or links to
  Thread. The answer lost the clause "rather than through an outside
  supplier", which only Thread could back. Whether Lee Marketing Mastery keeps
  offering apparel at all is a separate decision; if it does not, both come out
  together (`docs/MARKETING.md`).
- **Thread's catalog, including its six H1 Performance shirts and its two LEU
  shirts**, moved with the page and is Thread's to change — the same reasoning
  `docs/H1.md` §3 gives for leaving the H1 line alone.

## 4. The counts that moved with it

The LMM websites portfolio is the one place a number had to change in visible
copy. It is two entries now — `/lee-marketing-mastery` and `/` — both routes on
this one domain and deployment, and both the site the visitor is reading:

- `WebsitesWorkSection`: the eyebrow reads "Two Live Sites, All Ours". The
  heading keeps "Every Site on This Domain Was Built to Turn a Visitor Into a
  Customer" — it is still true, and it is the phrase that stops "two sites"
  reading as two separate builds for two separate clients (`docs/WEBSITES.md`
  §3.5).
- The lead paragraph states the structure outright: both run on this one
  domain, and both are the site being read.
- The LEU portfolio card counted ventures. It now names the two destinations
  the home page leads to, LEU Business Mastery and Lee Marketing Mastery, and
  its chips read "Two destinations, one site", "A section for each" and
  "Venture-labeled enquiries". The contact form offers exactly those two.
- The page's `ItemList` is two entries, both prefixed with `SITE_URL`.

Worth knowing: with Thread gone, the portfolio is this site and nothing else.
The section says so honestly, but it is thin proof. The fix is the one
`docs/WEBSITES.md` §3.5 already names — real client builds, at which point the
"our own ventures" caveat comes out with them.

`data/company.ts` also said "Two Distinct Ventures", "ventures across marketing
and apparel" and "marketing services or premium apparel". Nothing renders those
strings today, but unrendered copy drifts, so all three now describe business
development and marketing rather than being left for whoever wires them up.

## 5. The wiring that is left

`NEXT_PUBLIC_THREAD_SITE_URL` drives the redirects and nothing else. The
fallback and the normalisation live in `config/thread-site.mjs`;
`next.config.mjs` resolves the variable through it. No app code reads it, so
there is no `env` key handing it to the bundles.

**The fallback is `https://thread.leeenterprisesunlimited.com`, and that is
deliberate.** H1's fallback is Vercel's default alias for a project named
`h1-performance`. A project named after the Thread repo would be `thread` or
`tread`, and those `*.vercel.app` aliases are almost certainly other people's
sites: a guess there would forward this site's old links to a stranger. A
guess on this site's own domain can only fail to resolve.

| From | To |
| --- | --- |
| `/thread-t-shirts` and `/thread-t-shirts/*` | The Thread site's root. A `#catalog` or `#order-request` fragment survives, and those ids are unchanged there |
| `/thread/*` | The same path on the Thread site, which serves the identical files |

The redirects are temporary (307) while the variable is unset and permanent
(308) once it is set, so nothing caches a redirect to a host that might not be
final. Deploy the Thread site first (its README has the steps), then either
attach `thread.leeenterprisesunlimited.com` to that project or set the variable
in this project's Vercel environment (Production and Preview, no trailing
slash) — confirming the URL answers first, since a 308 is cached indefinitely.
Nothing on this site links to Thread any more, so deploying this change before
then breaks no visible link; it only means old `/thread-t-shirts` links land on
the fallback until the Thread site is reachable there.
