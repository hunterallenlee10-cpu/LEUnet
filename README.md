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

Stripe Payments and Invoicing are wired up for all three ventures. See
[docs/STRIPE.md](docs/STRIPE.md) for setup, environment variables, and the
go-live checklist.

## H1 Performance

H1 Performance runs from its own repo and website:
[hunterallenlee10-cpu/h1-performance](https://github.com/hunterallenlee10-cpu/h1-performance).
This site redirects `/h1-performance` there and links to it from the Ventures
menu, the footer, and the Lee Marketing Mastery portfolio, all through one
value: set `NEXT_PUBLIC_H1_SITE_URL` to the H1 site's domain in the Vercel
environment.

Deploy the H1 project first, confirm its URL, set `NEXT_PUBLIC_H1_SITE_URL`
here, and only then deploy this — the `/h1-performance` redirect is a permanent
(308) redirect once that variable is set, so its target must already answer.
See [docs/H1.md](docs/H1.md) §3 for the ordering and for what stayed here and
why.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
