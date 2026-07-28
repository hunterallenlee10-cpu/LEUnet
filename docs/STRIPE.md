# Stripe Integration — Lee Enterprises Unlimited

- **Stripe API version:** `2026-06-24.dahlia` (pinned in `lib/stripe.ts`)
- **SDK:** `stripe` 22.3.x for Node
- **Framework:** Next.js 16 App Router, Node runtime for all Stripe routes
- **Account model:** one Stripe account covering all four ventures

Two flows are live in code:

| Flow | Route | Who calls it |
| --- | --- | --- |
| **Support** — one-time, pay-what-you-choose | `POST /api/stripe/support` | Public |
| **Invoicing** — quoted work | `POST /api/stripe/invoice` | Internal only |

Nothing is wired into the site's pages yet. `SupportForm` and the
`/support/*` pages exist and work, but no venture section links to them.

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
| Statement descriptor suffix | `payment-L-E-U` |

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
refuses to run against a live key.

Without that variable, preset amounts still work and "Other amount" returns a
503.

### Supporter details

Name and message are collected as Checkout `custom_fields` on Stripe's page, so
they never pass through LEU servers. Both are optional and arrive on the
`checkout.session.completed` event.

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
    "ventureId": "pelican",
    "daysUntilDue": 14,
    "description": "Total Exterior Cleaning Package — 123 Main St",
    "lines": [
      { "description": "House washing (2,400 sq ft)", "amountCents": 45000 },
      { "description": "Driveway cleaning", "amountCents": 18000 }
    ]
  }'
```

Finds or creates the Customer by email, opens a draft with
`collection_method: "send_invoice"`, attaches each line, finalizes, and sends.
Pass `"send": false` to review the draft in the Dashboard first. Response
includes `hostedInvoiceUrl` and `invoicePdf`.

Customers are reused by email so each client accumulates one payment history.

`ventureId` must be one of `lmm`, `pelican`, `h1`, `thread` — it tags the
invoice for per-venture reporting inside the single shared account.

---

## 3. Setup

### 3.1 Use a restricted key

Create a **restricted API key** (`rk_...`) at
<https://dashboard.stripe.com/apikeys> rather than using the account secret key.
Grant only:

| Resource | Permission |
| --- | --- |
| Checkout Sessions | Write |
| Customers | Write |
| Invoices | Write |
| Invoice Items | Write |
| Products, Prices | Write |
| PaymentIntents | Read |

Separate key per environment (test / preview / production), with an access
policy on each.

### 3.2 Environment variables

`.env.local` locally; **sensitive** environment variables in Vercel for
production, so values are write-only and never surface in logs.

Required: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_ADMIN_TOKEN`,
`NEXT_PUBLIC_SITE_URL`, `STRIPE_PRICE_SUPPORT_CUSTOM`.

```bash
openssl rand -base64 32   # STRIPE_ADMIN_TOKEN
```

### 3.3 Statement descriptor

`payment-L-E-U` is sent as `statement_descriptor_suffix`. Cards **reject**
`statement_descriptor` on a PaymentIntent outright, so the suffix is the only
per-charge option.

Your account prefix (Dashboard → Settings → Public details) plus this suffix
must total **22 characters or fewer** or Stripe rejects the charge. With a
13-character suffix, keep the prefix to 9 characters or fewer. Verify with a
real test charge before going live.

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

Endpoint `https://leeenterprisesunlimited.com/api/stripe/webhook`, subscribed to:

`checkout.session.completed`, `checkout.session.async_payment_failed`,
`payment_intent.payment_failed`, `invoice.paid`, `invoice.payment_failed`

Every event is signature-verified against the raw request body before anything
else runs. Handled events email `CONTACT_TO_EMAIL` through the Resend account
the contact form already uses.

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
- CSP in `next.config.mjs` allows `https://*.stripe.com` for
  script/frame/connect and `https://*.link.com` for Link. `'unsafe-inline'` is
  present for Next's hydration bootstrap; to remove it, emit a per-request nonce
  from middleware (a nonce and `'unsafe-inline'` cannot be combined — browsers
  ignore the latter when a nonce is present).
- Route errors log server-side and return generic messages so account detail
  doesn't leak.
- If a key is ever exposed, roll it at <https://dashboard.stripe.com/apikeys>,
  then review Workbench request logs for unrecognized activity.

---

## 7. Go-live checklist

- [ ] Run `scripts/stripe-setup.mjs` against live and set the live Price ID
- [ ] Swap test keys for live restricted keys (Vercel sensitive env vars)
- [ ] Point `NEXT_PUBLIC_SITE_URL` at `https://leeenterprisesunlimited.com`
- [ ] Register the production webhook endpoint and set its signing secret
- [ ] Confirm account prefix + `payment-L-E-U` is ≤ 22 characters
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
