# Stripe Integration — Lee Enterprises Unlimited

- **Stripe API version:** `2026-06-24.dahlia` (pinned in `lib/stripe.ts`)
- **SDK:** `stripe` 22.3.x for Node
- **Framework:** Next.js 16 App Router, Node runtime for all Stripe routes
- **Account model:** one Stripe account covering Lee Systems Co. (formerly Lee Marketing Mastery, still tagged `lmm`), the one venture on this site, plus H1 and Thread invoicing (`docs/H1.md`, `docs/THREAD.md`)

Two flows are live in code:

| Flow | Route | Who calls it |
| --- | --- | --- |
| **Support** — one-time, pay-what-you-choose | `POST /api/stripe/support` | Public |
| **Invoicing** — quoted work | `POST /api/stripe/invoice` | Internal only |

Both are live. `/support` is linked from the site header ("Support Us"); no
individual venture section links to it. Invoicing is admin-only and has no UI.

---

## 1. Support flow

One-time contributions with a supporter-chosen amount. Bounds live in
`lib/support-config.ts`:

| Setting | Value |
| --- | --- |
| Minimum | $5.00 |
| Maximum | $2,500.00 |
| Presets | $25 / $50 / $100 |
| Prefilled on the custom page | $50 |
| Statement descriptor suffix | `SUPPORT` |

### How the amount stays safe

Pay-what-you-choose inverts the usual rule that a client must never send a
price. Both paths are still bounded server-side:

- **Presets** post `amountCents`, which the route re-validates against
  `[SUPPORT_MIN_CENTS, SUPPORT_MAX_CENTS]` before building the line item.
- **"Other amount"** posts *no* amount. Checkout uses a Stripe **Price** with
  `custom_unit_amount`, and the supporter types the figure on Stripe's own
  hosted page. The minimum and maximum are stored in Stripe, so nothing from
  the browser can widen them.

`custom_unit_amount` exists only on the Prices API — Checkout's inline
`price_data` does not support it. That is why a setup script is required.

### Create the custom-amount Price

```bash
STRIPE_SECRET_KEY=sk_test_... node scripts/stripe-setup.mjs
```

It prints a `price_...` ID; put it in `STRIPE_PRICE_SUPPORT_CUSTOM`. The script
is idempotent (it looks up `leu_support_custom_amount` before creating) and
refuses to run against a live key. It keeps its own copy of the bounds and the
API version, so change it together with `lib/support-config.ts` and
`lib/stripe.ts`.

Without that variable, preset amounts still work and "Other amount" returns a
503, so set it in every environment that serves /support.

### Supporter details

Name and message are collected as Checkout `custom_fields` on Stripe's page, so
they never pass through LEU servers. Both are optional and arrive on the
`checkout.session.completed` event, or on
`checkout.session.async_payment_succeeded` for a bank debit that clears later.

### Usage

```tsx
import { SupportForm } from "@/components/payments/SupportForm";

<SupportForm />
```

### Not a donation

LEU is a for-profit holding company, so contributions here are **not**
tax-deductible charitable donations. Two deliberate consequences in the code:

- `submit_type` is `"pay"`, not `"donate"` — the latter would label the button
  "Donate" and imply charity status.
- The form and the success page both carry a plain-language disclaimer.

Keep that framing if you change the copy. Implying deductibility for a
for-profit creates real tax and consumer-protection exposure, and Stripe's
nonprofit features and rates don't apply.

---

## 2. Invoicing

`POST /api/stripe/invoice` is **admin-only** — it creates receivables and emails
real customers, so it requires a bearer token and must never be called from a
browser.

```bash
curl https://leeenterprisesunlimited.com/api/stripe/invoice \
  -X POST \
  -H "Authorization: Bearer $STRIPE_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "customer": { "email": "client@example.com", "name": "Example Co" },
    "ventureId": "thread",
    "daysUntilDue": 14,
    "description": "Custom apparel order — Example Co",
    "lines": [
      { "description": "Custom t-shirts (50 units)", "amountCents": 45000 },
      { "description": "Design setup", "amountCents": 18000 }
    ]
  }'
```

Finds or creates the Customer by email, opens a draft with
`collection_method: "send_invoice"`, attaches each line, finalizes, and sends.
Response includes `hostedInvoiceUrl` and `invoicePdf`.

Pass `"send": false` to stop at the draft and review it in the Dashboard
first. It is left unfinalized, so it is not yet numbered and its lines can
still be edited; finalize and send it from the Dashboard. The response then
has `"status": "draft"` and `null` for `hostedInvoiceUrl` and `invoicePdf`.

Customers are reused by email so each client accumulates one payment history.

`ventureId` must be one of `lmm`, `h1`, `thread` — it tags the
invoice for per-venture reporting inside the single shared account. H1
Performance is off the LEU site entirely (`docs/H1.md`) and its own site takes
no payment, but H1 clients are still invoiced from here, so the tag is
unchanged. This route sits behind `STRIPE_ADMIN_TOKEN` and renders nothing, so
accepting `h1` says nothing to a visitor about which ventures LEU lists.
Thread T-Shirts is the same case since 2026-09-25 (`docs/THREAD.md`): off this
site entirely, taking no payment on its own, and invoiced from here, tagged
`thread`, as before.

---

## 3. Setup

### 3.1 Use a restricted key

Create a **restricted API key** (`rk_...`) at
<https://dashboard.stripe.com/apikeys> rather than using the account secret key.
Grant only:

The **support flow alone** needs only three, so a key scoped to the public site
can stop here:

| Resource | Permission |
| --- | --- |
| Checkout Sessions | Write |
| Products | Write |
| Prices | Write |

Products and Prices are required because preset amounts use inline `price_data`
with `product_data`, which makes Stripe create those objects per session. The
"other amount" path only references an existing Price.

Add these when you start **invoicing**:

| Resource | Permission |
| --- | --- |
| Customers | Write |
| Invoices | Write |
| PaymentIntents | Read |

Stripe has since folded invoice items into the **Invoices** permission — there
is no longer a separate "Invoice Items" row to grant.

Separate key per environment (test / preview / production), with an access
policy on each. Permissions can be edited after creation, so start narrow.

### 3.2 Environment variables

`.env.local` locally; **sensitive** environment variables in Vercel for
production, so values are write-only and never surface in logs.

Required: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_ADMIN_TOKEN`,
`NEXT_PUBLIC_SITE_URL`, `STRIPE_PRICE_SUPPORT_CUSTOM`.

```bash
openssl rand -base64 32   # STRIPE_ADMIN_TOKEN
```

### 3.3 Statement descriptor

`SUPPORT` is sent as `statement_descriptor_suffix`. Cards **reject**
`statement_descriptor` on a PaymentIntent outright, so the suffix is the only
per-charge option.

Your account prefix (Dashboard → Settings → Public details), the space Stripe
inserts, and this suffix must total **22 characters or fewer** or Stripe
rejects the charge. With a 7-character suffix the prefix can be up to 14.
Stripe also enforces a **5-character minimum** on the descriptor, so `LEU`
alone is rejected — `LEE ENT` gives `LEE ENT SUPPORT`.

Setting an invalid prefix fails as an `invalid_request_error` on
`POST /v1/account`, visible in Workbench → Health. Verify with a real charge
and read your own bank statement before going live.

### 3.4 Pre-commit key scanner

```bash
git config core.hooksPath .githooks
```

Audit any time with `./scripts/check-secrets.sh --all`.

---

## 4. Webhooks

The webhook is the **only** trustworthy signal that money moved. The success
page is reassurance — supporters close tabs, and some payment methods settle
days later.

### Local

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# copy the printed whsec_... into STRIPE_WEBHOOK_SECRET
stripe trigger checkout.session.completed
```

### Production

Endpoint `https://www.leeenterprisesunlimited.com/api/stripe/webhook`,
subscribed to:

`checkout.session.completed`, `checkout.session.async_payment_succeeded`,
`checkout.session.async_payment_failed`, `payment_intent.payment_failed`,
`invoice.paid`, `invoice.payment_failed`

`checkout.session.async_payment_succeeded` is what reports a delayed method (a
bank debit) once it clears: its `checkout.session.completed` arrives unpaid and
is skipped. An endpoint not subscribed to it never sends that "Support
received" email.

Every event is signature-verified against the raw request body before anything
else runs. Handled events email `CONTACT_TO_EMAIL` through the Resend account
the contact form already uses.

**The hostname must be canonical.** Stripe does not follow redirects. Register
the apex when the site redirects apex → `www` and every delivery fails with a
`308`, having never reached the route — the response time looks healthy because
the edge answered, not the app. Match whatever `NEXT_PUBLIC_SITE_URL` uses.

A `200` here does not prove the notification email sent. `notify()` returns
silently when `RESEND_API_KEY` is unset, and logs a Resend error (as
`[stripe] notification email rejected` or `... failed`) rather than failing,
so a failed email never fails the webhook. Confirm delivery by reading the
inbox, not the status code.

### Before automating fulfillment

The replay guard is in-memory, which is best-effort on serverless where
instances recycle constantly. Fine for notification email. Before the webhook
does anything that must not happen twice, back it with a persisted
`processed_events` table keyed on `event.id`.

### Test cards

`4242 4242 4242 4242` succeeds · `4000 0000 0000 0002` declines ·
`4000 0025 0000 3155` requires 3D Secure. Any future expiry, any CVC.

---

## 5. Tax

Stripe Tax is intentionally **not** enabled.

Setting `automatic_tax: { enabled: true }` without an active registration means
Stripe calculates and collects **nothing** and returns **no error** — you would
believe tax was handled while it silently wasn't.

Note that voluntary contributions to a for-profit are ordinary business revenue,
not gifts. Confirm treatment with your accountant. To enable Stripe Tax
properly: register where you have nexus, add registrations at
<https://dashboard.stripe.com/tax>, assign product tax codes, then turn on
`automatic_tax`.

---

## 6. Security

- Keys never in source; pre-commit hook enforces it.
- Restricted keys over secret keys, one per environment.
- All Stripe calls are server-side.
- Webhook signatures verified on the raw body before handling.
- Checkout is hosted and reached by a plain redirect: the site loads no
  Stripe.js and embeds no Stripe UI, so the CSP in `next.config.mjs` allows no
  Stripe hosts (a top-level navigation to `checkout.stripe.com` is not governed
  by CSP). Adopting Stripe.js or embedded Checkout means adding
  `https://*.stripe.com` (and `https://*.link.com` for Link) to
  script/frame/connect. `'unsafe-inline'` is present for Next's hydration
  bootstrap; to remove it, emit a per-request nonce from `proxy.ts` (Next 16's
  name for middleware; a nonce and `'unsafe-inline'` cannot be combined —
  browsers ignore the latter when a nonce is present).
- Route errors log server-side and return generic messages so account detail
  doesn't leak.
- If a key is ever exposed, roll it at <https://dashboard.stripe.com/apikeys>,
  then review Workbench request logs for unrecognized activity.

---

## 7. Go-live checklist

- [ ] Create the live custom-amount Price **in the Dashboard** and set its ID.
      `scripts/stripe-setup.mjs` refuses live keys by design (§1), so it cannot
      do this step. Match `lib/support-config.ts` exactly: min $5, max $2,500,
      preset $50 — if the bounds drift, the form promises a range Stripe rejects
- [ ] Swap test keys for live restricted keys (Vercel sensitive env vars)
- [ ] Point `NEXT_PUBLIC_SITE_URL` at the canonical host, including `www`
- [ ] Register the production webhook endpoint, subscribed to every event in
      §4 (including `checkout.session.async_payment_succeeded`), and set its
      signing secret
- [ ] Redeploy — env vars do nothing until a fresh build, and `/support`
      prerenders as static
- [ ] Confirm account prefix + `SUPPORT` is ≤ 22 characters and ≥ 5 total
- [ ] Enable the payment methods you want in Dashboard → Payment methods
- [ ] Decide on Stripe Tax (§5) with your accountant
- [ ] Verify the CSP doesn't break the live site after deploy
- [ ] Persist webhook idempotency before automating fulfillment
- [ ] `git config core.hooksPath .githooks` on every clone
- [ ] Review <https://docs.stripe.com/get-started/checklist/go-live>

---

## 8. Deferred

- **Fixed-price Checkout items.** H1 session packs, LMM onboarding, and
  per-venture deposits were built and then removed — support-only for now. The
  pattern is in git history if you want them back.
- **Recurring support.** One-time only today. A monthly tier means Billing,
  `mode: "subscription"`, and the Customer Portal for self-service management.
- **Per-venture support routing.** Contributions are LEU-wide; nothing asks the
  supporter to pick a venture.
- **Connect.** Only relevant if LEU ever collects on behalf of independent
  operators. Standard accounts are the safe default.
- **A database.** Payments notify by email and live in Stripe. Durable records
  and idempotent fulfillment need persistence.
