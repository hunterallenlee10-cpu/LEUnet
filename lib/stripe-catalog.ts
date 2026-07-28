/**
 * Server-side catalog of everything that can be bought through Checkout.
 *
 * The amounts live here, on the server, and the browser only ever sends an
 * `offering` slug. Never accept a price, amount, or currency from the client —
 * that is the single most common way a payments integration gets drained.
 *
 * PLACEHOLDER PRICING: the amounts below are starting values so the integration
 * runs end to end. Replace them with Lee Enterprises Unlimited's real pricing
 * before switching to live keys.
 */

export type OfferingSlug =
  | "lmm-strategy-deposit"
  | "lmm-onboarding"
  | "pelican-service-deposit"
  | "h1-session-pack-4"
  | "h1-session-pack-8"
  | "thread-custom-order-deposit";

export interface Offering {
  /** Which venture this belongs to — flows into metadata for reporting. */
  ventureId: "lmm" | "pelican" | "h1" | "thread";
  /** Shown as the line item name on Checkout, receipts, and invoices. */
  name: string;
  description: string;
  /** Amount in the smallest currency unit (cents for USD). */
  amountCents: number;
  currency: "usd";
  /** Upper bound on quantity, guarding against absurd client input. */
  maxQuantity: number;
  /**
   * Optional env var holding a Stripe Price ID (`price_...`). When set, the
   * Price from the Dashboard wins over `amountCents`. This is the migration
   * path: start with inline amounts, graduate to a modelled catalog in Stripe
   * without touching route code.
   */
  priceIdEnvVar?: string;
}

export const CATALOG: Record<OfferingSlug, Offering> = {
  "lmm-strategy-deposit": {
    ventureId: "lmm",
    name: "Marketing Strategy Engagement — Deposit",
    description:
      "Deposit to reserve a Lee Marketing Mastery strategy engagement. Credited against your first invoice.",
    amountCents: 25_000,
    currency: "usd",
    maxQuantity: 1,
    priceIdEnvVar: "STRIPE_PRICE_LMM_STRATEGY_DEPOSIT",
  },
  "lmm-onboarding": {
    ventureId: "lmm",
    name: "Marketing Systems Onboarding",
    description:
      "One-time build and onboarding for automation, lead nurturing, and reporting systems.",
    amountCents: 150_000,
    currency: "usd",
    maxQuantity: 1,
    priceIdEnvVar: "STRIPE_PRICE_LMM_ONBOARDING",
  },
  "pelican-service-deposit": {
    ventureId: "pelican",
    name: "Exterior Cleaning — Service Deposit",
    description:
      "Deposit to schedule a Pelican Power Wash job. Applied to the final invoice on completion.",
    amountCents: 9_900,
    currency: "usd",
    maxQuantity: 1,
    priceIdEnvVar: "STRIPE_PRICE_PELICAN_DEPOSIT",
  },
  "h1-session-pack-4": {
    ventureId: "h1",
    name: "H1 Performance — 4 Session Pack",
    description: "Four personalized athletic development sessions.",
    amountCents: 20_000,
    currency: "usd",
    maxQuantity: 10,
    priceIdEnvVar: "STRIPE_PRICE_H1_PACK_4",
  },
  "h1-session-pack-8": {
    ventureId: "h1",
    name: "H1 Performance — 8 Session Pack",
    description: "Eight personalized athletic development sessions.",
    amountCents: 38_000,
    currency: "usd",
    maxQuantity: 10,
    priceIdEnvVar: "STRIPE_PRICE_H1_PACK_8",
  },
  "thread-custom-order-deposit": {
    ventureId: "thread",
    name: "Thread — Custom Order Deposit",
    description:
      "Deposit to start a custom apparel run for your brand, team, business, or event.",
    amountCents: 15_000,
    currency: "usd",
    maxQuantity: 1,
    priceIdEnvVar: "STRIPE_PRICE_THREAD_DEPOSIT",
  },
};

export function isOfferingSlug(value: unknown): value is OfferingSlug {
  return typeof value === "string" && value in CATALOG;
}

export function getOffering(slug: OfferingSlug): Offering {
  return CATALOG[slug];
}

/** Resolves the Stripe Price ID for an offering, if one is configured. */
export function resolvePriceId(offering: Offering): string | undefined {
  if (!offering.priceIdEnvVar) return undefined;
  const value = process.env[offering.priceIdEnvVar]?.trim();
  return value ? value : undefined;
}

/** Formats a minor-unit amount for display, e.g. 25000 -> "$250.00". */
export function formatAmount(amountCents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}
