# Client billing (/pay)

Private payment links for clients. The owner makes a Stripe Payment Link at
`/pay/admin`, texts the client `https://www.leeenterprisesunlimited.com/pay/{id}`,
and the client reviews it there and pays on Stripe's own checkout.

| Path | What it is | Who sees it |
| --- | --- | --- |
| `/pay/admin` | Make links, copy them, deactivate them | The owner (Basic Auth) |
| `/pay/admin/api/links` | `GET` list, `POST` create | The admin page (Basic Auth) |
| `/pay/admin/api/links/{id}/deactivate` | `POST` | The admin page (Basic Auth) |
| `/pay/{paymentLinkId}` | Read-only summary and the checkout button | The client |
| `/pay/success` | Thank-you page Stripe redirects to after checkout | The client |

Nothing is stored on this site. Stripe is the record, and every amount the
pages show is read back from the Payment Link's own line items.

## Code

- `lib/pay-rules.ts`: the form rules, shared by the admin form and the route.
  `MAX_AMOUNT_CENTS` is the per-amount cap ($25,000); change it there.
- `lib/pay.ts`: everything that talks to Stripe (server only).
- `lib/pay-auth.ts` and `proxy.ts`: Basic Auth (and the cross-site POST guard).
- `app/pay/*`: the pages and admin routes. `components/pay/*`: their UI.

## What a link is

Creating one makes, in Stripe:

1. A **Product**, named for what it's for, described "For {client}".
2. A **one-time Price** (if the one-time amount is above $0).
3. A **monthly recurring Price** (if the monthly amount is above $0).
4. A **Payment Link** with those line items, limited to **one completed
   checkout**, redirecting to `/pay/success`, with metadata
   `source=leu-pay`, `client_name`, `description` and `client_email` (when
   given). The same name and description ride along to the payment or
   subscription it creates.

Monthly only is a subscription link. One-time only is a regular payment link.
Both together: today's charge is the one-time amount plus the first month,
then the monthly amount each month until canceled.

USD only. No `payment_method_types`, so Stripe shows whatever is enabled in
Dashboard → Settings → Payment methods. Tax is off, as with invoicing
(docs/STRIPE.md §5).

Each create is keyed for idempotency on a per-form id, so a double click
returns the same link instead of making two.

### Why there is no "start monthly billing later" option

A delayed start would be a trial on the Payment Link's subscription
(`subscription_data.trial_period_days`). The requirement was to offer it only if
Stripe's docs clearly confirm that the one-time amount still charges on the
day of checkout. As of 2026-10-10 they don't:

- The Checkout API reference says one-time prices in subscription mode "will
  be on the initial invoice only".
- The trials guide says one-time charges are paid upfront during a trial,
  but only for one-time items added with `add_invoice_items` on the
  Subscriptions API, which Payment Links don't use.
- No page says what a Payment Link with a trial charges for its one-time line
  items on the day of checkout.

So monthly billing always starts the day the client pays. To add a delayed
start later, confirm the behavior in a **test-mode** sandbox first (a $1
one-time + $1/month link with a 7-day trial, paid with `4242 4242 4242 4242`,
should show a $1.00 charge today). If it does, pass
`subscription_data.trial_period_days` in `createPayLink` and teach
`summarize` to show the start date. `summarize` currently refuses links with
a trial, because their line items alone don't say what's due today.

## The client page

`/pay/{id}` fetches the link and its line items from Stripe on every request.
It shows the client's name, what it's for, "Due today", and "Then $Y/month,
billed until canceled" for a monthly link. It also has one button to the Stripe
link, with `?prefilled_email=` when an email was given. It has no inputs, so
there is nothing for a client to change.

It shows "This payment link is no longer active" when the id is malformed,
missing, not tagged `source=leu-pay`, deactivated, or already used. If Stripe
doesn't answer, it says so instead, so an outage never reads as "inactive".

## Security

- **Basic Auth** on `/pay/admin` and everything under it, in `proxy.ts`,
  checked against `PAY_ADMIN_USER` and `PAY_ADMIN_PASSWORD` with a
  constant-time comparison. The admin page and both routes check again
  themselves. With either variable unset, or a password under 16 characters,
  nobody gets in.
- The admin API lives under `/pay/admin/api` so the browser reuses the
  credentials it has for `/pay/admin`.
- The routes refuse POSTs that aren't same-origin JSON. Browsers attach Basic
  Auth credentials to any request to this origin, so this stops another site
  from making a link or deactivating one with the owner's login.
- Every Stripe call is server-side with `STRIPE_SECRET_KEY` (never
  `NEXT_PUBLIC_`). Failures log only Stripe's error type, code, message and
  request id, never the request body, client details or a key.
- Kept out of search: `noindex, nofollow` in `app/pay/layout.tsx`, an
  `X-Robots-Tag` header from `next.config.mjs`, `Disallow: /pay` in
  `app/robots.ts`, no sitemap entry, and no link from anywhere on the site.
  Page titles never name the client, since a texted link's preview shows it.

## Environment variables

Set in Vercel for Production and Preview, as **sensitive** variables:

| Variable | Value |
| --- | --- |
| `STRIPE_SECRET_KEY` | Already set for invoicing. Its permissions need Products, Prices and Payment Links: Write (docs/STRIPE.md §3.1). |
| `PAY_ADMIN_USER` | The admin user name. |
| `PAY_ADMIN_PASSWORD` | At least 16 characters: `openssl rand -base64 24`. |

Redeploy after setting them.
