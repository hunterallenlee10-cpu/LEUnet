# leu

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_p4e4z6MPaVlpOBMeE2pJ7PACajYn)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Payments

Stripe Payments and Invoicing are wired up here for both ventures this site
lists, including Thread T-Shirts, whose own site takes no payment
([docs/THREAD.md](docs/THREAD.md)). Invoices can still be tagged `h1` for H1
Performance, which is invoiced from here even though it is no longer on this
site ([docs/H1.md](docs/H1.md)). See [docs/STRIPE.md](docs/STRIPE.md) for
setup, environment variables, and the go-live checklist.

## Thread T-Shirts

Thread T-Shirts runs from its own repo and website:
[hunterallenlee10-cpu/TREAD](https://github.com/hunterallenlee10-cpu/TREAD).
Unlike H1 Performance it is still one of this site's two ventures, so the nav,
footer, websites portfolio and marketing page link to it, and `/thread-t-shirts`
and the old `/thread/*` image paths redirect there instead of 404ing.

All of that reads one value. Set `NEXT_PUBLIC_THREAD_SITE_URL` to the Thread
site's origin in the Vercel environment (Production and Preview, no trailing
slash), or attach `thread.leeenterprisesunlimited.com` to the Thread project —
that subdomain is the fallback while the variable is unset. Do one of them
before deploying the change that removed the page, and confirm the target
answers first: the redirect becomes a permanent 308 once the variable is set,
and a 308 is cached indefinitely.

See [docs/THREAD.md](docs/THREAD.md) for what moved, what stayed, and why.

## H1 Performance

H1 Performance runs from its own repo and website:
[hunterallenlee10-cpu/h1-performance](https://github.com/hunterallenlee10-cpu/h1-performance).
It is no longer one of the ventures this site lists — nothing here names it or
links to it. Lee Enterprises Unlimited lists two ventures: Lee Marketing
Mastery and Thread T-Shirts.

What remains is the redirect: `/h1-performance` and `/h1/*` forward to the H1
site so the URLs that page used to answer on keep their inbound links and
search placement instead of 404ing. Set `NEXT_PUBLIC_H1_SITE_URL` to the H1
site's domain in the Vercel environment (Production and Preview, no trailing
slash), and confirm that target answers first — the redirect becomes a
permanent 308 once the variable is set, and a 308 is cached indefinitely. Until
it is set, the redirect targets a fallback alias and stays a temporary 307.

See [docs/H1.md](docs/H1.md) for what each stage of the split left behind here,
what stayed, and why.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
