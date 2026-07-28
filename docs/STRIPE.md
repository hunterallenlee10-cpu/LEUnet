# Stripe Integration — Lee Enterprises Unlimited

Payments and Invoicing for the LEU portfolio: Lee Marketing Mastery, Pelican
Power Wash, H1 Performance, and Thread T-Shirts.

- **Stripe API version:** `2026-06-24.dahlia` (pinned in `lib/stripe.ts`)
- **SDK:** `stripe` 22.3.x for Node
- **Framework:** Next.js 16 App Router, Node runtime for all Stripe routes

---

## 1. Why this shape

The four ventures sell in two distinct ways, which maps cleanly onto the two
Stripe products you asked for:

| Sales motion | Example | Stripe product |
| --- | --- | --- |
| Fixed price, customer pays now | H1 session pack, Thread deposit, Pelican booking deposit | **Checkout Sessions** |
| Quoted work, price agreed first | LMM retainer, Pelican whole-property job, Thread bulk order | **Invoicing** |

Your existing site is a lead-generation funnel: the contact form collects a
budget range and timeline, then you follow up. Invoicing slots directly into
that flow — inquiry, quote, invoice, paid — while Checkout captures the
customers who are ready to pay immediately without a conversation.

### Deliberate choices

- **Checkout Sessions, not raw PaymentIntents.** Stripe hosts the payment page,
  handles 3DS/SCA, discounts, and adaptive pricing. Less code, less PCI scope.
- **No `payment_method_types` anywhere.** Omitting it enables dynamic payment
  methods, so Stripe picks the highest-converting eligible methods per customer.
  You control which methods are available from the Dashboard, not from code.
  Hardcoding `['card']` would silently disable everything else.
- **Prices live on the server.** `lib/stripe-catalog.ts` is the only source of
  truth for amounts. The browser sends an offering *slug*, never a price.
- **Stripe Tax is off.** Enabling `automatic_tax` without an active tax
  registration causes Stripe to collect **nothing** while appearing to work.
  See §7 before turning it on.

---

## 2. What was built

```
lib/stripe.ts                       Stripe client, pinned API version, site URL
lib/stripe-catalog.ts               Server-side offering catalog (prices)
lib/admin-auth.ts                   Bearer-token guard for internal endpoints
app/api/stripe/checkout/route.ts    POST — create a Checkout Session
app/api/stripe/invoice/route.ts     POST — create + send an invoice (admin only)
app/api/stripe/webhook/route.ts     POST — signed event receiver
app/checkout/success/page.tsx       Post-payment confirmation
app/checkout/canceled/page.tsx      Abandoned checkout
components/payments/CheckoutButton.tsx  Client button that starts Checkout
scripts/check-secrets.sh            Blocks committing Stripe keys
.githooks/pre-commit                Runs the scanner on every commit
```

---

## 3. Setup

### 3.1 Get keys

If you don't have an account yet, you can generate working test keys with no
registration:

```bash
npm i -g @stripe/cli
stripe sandbox create
```

### 3.2 Use a restricted key, not a secret key

Create a **restricted API key** (`rk_...`) at
<https://dashboard.stripe.com/apikeys> rather than using the account secret key
(`sk_...`). A leaked restricted key can do far less damage. Grant only:

| Resource | Permission |
| --- | --- |
| Checkout Sessions | Write |
| Customers | Write |
| Invoices | Write |
| Invoice Items | Write |
| Products, Prices | Write |
| PaymentIntents | Read |

Use a **separate key per environment** (test / preview / production), and add an
access policy to each so a stolen key is bound to your infrastructure.

### 3.3 Configure environment variables

Copy `.env.example` to `.env.local` for local work. In production, set these in
Vercel as **sensitive environment variables** so the values are write-only and
never appear in logs or the dashboard UI.

Required: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_ADMIN_TOKEN`,
`NEXT_PUBLIC_SITE_URL`.

Generate the admin token with:

```bash
openssl rand -base64 32
```

### 3.4 Turn on the pre-commit key scanner

One command per clone:

```bash
git config core.hooksPath .githooks
```

Scan the whole repo at any time with `./scripts/check-secrets.sh --all`.

---

## 4. Payments (Checkout)

Offerings are defined in `lib/stripe-catalog.ts`. Drop a button anywhere:

```tsx
import { CheckoutButton } from "@/components/payments/CheckoutButton";

<CheckoutButton
  offering="pelican-service-deposit"
  label="Reserve Your Cleaning — $99"
/>
```

The browser posts only `{ offering, quantity?, email? }`. The server resolves
the amount from the catalog, so a tampered request cannot change what is
charged. Quantity is clamped to each offering's `maxQuantity`.

> **Placeholder pricing.** The amounts in `lib/stripe-catalog.ts` are starting
> values so the integration runs end to end. Replace them with your real pricing
> before going live.

### Graduating to a Dashboard catalog

Inline amounts are fine to start. When you want Stripe-side reporting, create a
Product and Price in the Dashboard and paste the `price_...` ID into the matching
`STRIPE_PRICE_*` variable. The route picks it up automatically — no code change.

When you model products, **one Product per offering**. Don't put Starter /
Professional / Enterprise prices on a single Product: every line item would show
the same name and customers couldn't tell them apart.

---

## 5. Invoicing

`POST /api/stripe/invoice` is **admin-only** — it emails real customers and
creates real receivables, so it requires the bearer token and must never be
called from the browser.

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
      { "description": "Driveway cleaning", "amountCents": 18000 },
      { "description": "Deck & patio cleaning", "amountCents": 22000 }
    ]
  }'
```

Response includes `hostedInvoiceUrl` (send it to the customer or let Stripe
email it) and `invoicePdf`.

What it does: finds or creates the Customer by email, opens a draft invoice with
`collection_method: "send_invoice"`, attaches each line, finalizes, and sends.
Pass `"send": false` to leave it as a draft you review in the Dashboard first.

Customers are reused by email, so each client accumulates one payment history
rather than scattering across duplicate records.

---

## 6. Webhooks

The webhook is the **only** trustworthy signal that money moved. The success
page is just reassurance — a customer can close the tab, and asynchronous
payment methods settle minutes or days later.

### Local testing

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# copy the whsec_... it prints into STRIPE_WEBHOOK_SECRET
stripe trigger checkout.session.completed
```

### Production

Add an endpoint at <https://dashboard.stripe.com/webhooks> pointing to
`https://leeenterprisesunlimited.com/api/stripe/webhook`, subscribed to:

`checkout.session.completed`, `checkout.session.async_payment_failed`,
`payment_intent.payment_failed`, `invoice.paid`, `invoice.payment_failed`

Copy that endpoint's signing secret into `STRIPE_WEBHOOK_SECRET`.

Every event is signature-verified against the raw request body before anything
else happens. Handled events currently email `CONTACT_TO_EMAIL` via the Resend
account the contact form already uses.

### Before you automate fulfillment

The replay guard in the webhook is in-memory, which is best-effort on serverless
where instances are recycled constantly. It is fine for sending notification
emails. Before you make the webhook do anything that must not happen twice —
charging, provisioning, shipping — back it with a persisted `processed_events`
table keyed on `event.id`.

### Test cards

`4242 4242 4242 4242` succeeds · `4000 0000 0000 0002` is declined ·
`4000 0025 0000 3155` requires 3D Secure. Any future expiry, any CVC.

---

## 7. Tax

Stripe Tax is intentionally **not** enabled.

Setting `automatic_tax: { enabled: true }` without an active tax registration
means Stripe calculates and collects **no tax** and returns **no error** — you
would believe tax was handled while it silently wasn't. This is the most common
Stripe Tax mistake.

To enable it properly: register in the jurisdictions where you have nexus, add
those registrations at <https://dashboard.stripe.com/tax>, assign product tax
codes, then turn on `automatic_tax` in the checkout and invoice routes. Power
washing and training services in particular have state-specific taxability —
confirm with your accountant before switching it on.

---

## 8. Security notes

- Keys are never in source. The pre-commit hook enforces it; run
  `./scripts/check-secrets.sh --all` to audit history-adjacent working state.
- Restricted keys over secret keys, one per environment.
- All Stripe calls happen server-side. Nothing but the publishable key should
  ever reach the browser, and this integration doesn't need even that.
- Webhook signatures are verified on the raw body before any handling.
- CSP is set in `next.config.mjs` allowing `https://*.stripe.com` for
  script/frame/connect and `https://*.link.com` for Link. `'unsafe-inline'` is
  present for Next's hydration bootstrap — to remove it, emit a per-request
  nonce from middleware (a nonce and `'unsafe-inline'` cannot be combined;
  browsers ignore the latter when a nonce is present).
- Route errors are logged server-side and returned to the browser as generic
  messages so Stripe/account details don't leak.
- Rotate keys when anyone with access leaves. If a key is ever exposed, roll it
  immediately at <https://dashboard.stripe.com/apikeys>, then review Workbench
  request logs for unrecognized activity.

---

## 9. Go-live checklist

- [ ] Replace placeholder amounts in `lib/stripe-catalog.ts` with real pricing
- [ ] Swap test keys for live restricted keys (Vercel sensitive env vars)
- [ ] Point `NEXT_PUBLIC_SITE_URL` at `https://leeenterprisesunlimited.com`
- [ ] Register the production webhook endpoint and set its signing secret
- [ ] Enable the payment methods you want in Dashboard → Payment methods
- [ ] Set statement descriptor, business name, and support contact
- [ ] Decide on Stripe Tax (§7) with your accountant
- [ ] Verify the CSP doesn't break the live site after deploy
- [ ] Persist webhook idempotency before automating fulfillment
- [ ] Run `git config core.hooksPath .githooks` on every clone
- [ ] Review <https://docs.stripe.com/get-started/checklist/go-live>

---

## 10. Not built yet

Out of scope for this pass, worth knowing about:

- **Subscriptions.** If LMM retainers become recurring, use Billing with
  `mode: "subscription"` Checkout Sessions plus the Customer Portal for
  self-service upgrades and cancellation — not a manual renewal loop.
- **Usage-based billing.** If any venture bills on usage, use Metronome rather
  than the Billing Meters API.
- **Connect.** Only needed if LEU ever collects money on behalf of independent
  operators. Standard accounts are the safe default — Express and Custom put
  fraud and dispute liability on you.
- **A database.** Payments currently notify by email and live in Stripe. Durable
  order records and idempotent fulfillment need persistence.
