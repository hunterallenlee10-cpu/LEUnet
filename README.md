# leu

The Lee Enterprises Unlimited website: the homepage (`/`), Business Mastery
(`/business-mastery`), Lee Systems Co. (`/lee-systems`,
`/lee-systems/automation`, `/lee-systems/websites`), `/contact` and `/legal`,
plus `/book`, a short address that forwards to wherever "Book a free call"
goes. Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript, hosted
on Vercel.

## Business facts

Phone, email, the booking link, the reply-time promise, Instagram, the stats,
the founder photo and bio, projects, and Business Mastery's price and join
settings all live in one file: [`data/site.ts`](data/site.ts). Every page
reads them from there. An empty value hides whatever needs it, or shows a
"coming soon" slot while `showPlaceholders` is true (the photo, the bio and the
projects). Adding the Lee Systems Co. booking link is one line there:
`bookingUrl`.

The repo was bootstrapped with [v0](https://v0.app) and is linked to a
[v0 project](https://v0.app/chat/projects/prj_p4e4z6MPaVlpOBMeE2pJ7PACajYn),
which can push commits to it.

## Setup

The repo uses pnpm only (`pnpm-lock.yaml`); don't install with npm or yarn.

```bash
pnpm install
cp .env.example .env.local   # then fill in the values you need
git config core.hooksPath .githooks
```

The last line enables the pre-commit hook, once per clone. It runs
`scripts/check-secrets.sh`, which blocks commits containing Stripe keys or
webhook secrets. `.env.example` documents the environment variables the site
reads.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Development server at <http://localhost:3000> |
| `pnpm build` | Production build (fails on type errors) |
| `pnpm start` | Serves the production build |
| `pnpm lint` | ESLint over the repo |
| `pnpm typecheck` | Generates Next's route types, then runs `tsc --noEmit` |

## Payments

Stripe Invoicing is wired up for Lee Systems Co. (formerly Lee Marketing
Mastery, still tagged `lmm`), and invoices can still be tagged `h1` for H1
Performance and `thread` for Thread T-Shirts, which are invoiced from here even
though neither is on this site any more ([docs/H1.md](docs/H1.md),
[docs/THREAD.md](docs/THREAD.md)). The public Support Us contribution page came
off the site on 2026-09-28. See [docs/STRIPE.md](docs/STRIPE.md) for setup,
environment variables, the go-live checklist, and the cleanup the removal
leaves for Stripe and Vercel.

## Lee Systems Co.

Lee Systems Co. replaced Lee Marketing Mastery on 2026-09-25. It lives at
`/lee-systems` (main page), `/lee-systems/automation` and
`/lee-systems/websites`, and every old `/lee-marketing-mastery/*` URL
301-redirects to its new equivalent. Shared copy and brand details are in
`data/lee-systems.ts`.

See [docs/LEE-SYSTEMS.md](docs/LEE-SYSTEMS.md) for the page structure and
what is still to fill in.

## Thread T-Shirts

Thread T-Shirts runs from its own repo and website:
[hunterallenlee10-cpu/TREAD](https://github.com/hunterallenlee10-cpu/TREAD).
Like H1 Performance, it is no longer one of the ventures this site lists —
nothing here names it or links to it.

What remains is the redirect: `/thread-t-shirts` and the old `/thread/*` image
paths forward to the Thread site, so the URLs that page used to answer on keep
their inbound links and search placement instead of 404ing. Set
`NEXT_PUBLIC_THREAD_SITE_URL` to the Thread site's origin in the Vercel
environment (Production and Preview, no trailing slash), or attach
`thread.leeenterprisesunlimited.com` to the Thread project — that subdomain is
the fallback while the variable is unset, and the redirect stays a temporary
307 until the variable is set. Confirm the target answers first: once set, the
redirect is a permanent 308, and a 308 is cached indefinitely.

See [docs/THREAD.md](docs/THREAD.md) for what left, what stayed, and why.

## H1 Performance

H1 Performance runs from its own repo and website:
[hunterallenlee10-cpu/h1-performance](https://github.com/hunterallenlee10-cpu/h1-performance).
It is no longer one of the ventures this site lists — nothing here names it or
links to it. The site covers Lee Enterprises Unlimited, Lee Systems Co. and
Business Mastery only.

What remains is the redirect: `/h1-performance` and `/h1/*` forward to the H1
site so the URLs that page used to answer on keep their inbound links and
search placement instead of 404ing. Set `NEXT_PUBLIC_H1_SITE_URL` to the H1
site's domain in the Vercel environment (Production and Preview, no trailing
slash), and confirm that target answers first — the redirect becomes a
permanent 308 once the variable is set, and a 308 is cached indefinitely. Until
it is set, the redirect targets a fallback alias and stays a temporary 307.

See [docs/H1.md](docs/H1.md) for what each stage of the split left behind here,
what stayed, and why.

## Docs

- [docs/TODO.md](docs/TODO.md) - Hunter's to-do list: what only he can do for
  the site (links, photos, decisions, account set-up).
- [docs/BUSINESS-MASTERY.md](docs/BUSINESS-MASTERY.md) - build spec and
  settled decisions for `/business-mastery` and its homepage presence.
- [docs/LEE-SYSTEMS.md](docs/LEE-SYSTEMS.md) - the Lee Systems Co. pages, where
  their copy lives, and the placeholders still to fill in.
- [docs/WEBSITES.md](docs/WEBSITES.md) - historical build spec for the websites
  page before the Lee Systems rename; its claims standard still applies.
- [docs/STRIPE.md](docs/STRIPE.md) - invoicing: setup, environment
  variables, security and the go-live checklist.
- [docs/H1.md](docs/H1.md) - what H1 Performance's move to its own site left
  here, and why.
- [docs/THREAD.md](docs/THREAD.md) - the same for Thread T-Shirts.
