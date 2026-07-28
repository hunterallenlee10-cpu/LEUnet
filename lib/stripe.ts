import Stripe from "stripe";

/**
 * Pinned to the API version bundled with stripe@22.x. Upgrade this string and
 * the SDK together — never let it drift silently.
 */
export const STRIPE_API_VERSION = "2026-06-24.dahlia" as const;

/**
 * Stable label applied to every Checkout Session we create so the Dashboard can
 * compare this flow against any future ones. The 8-letter suffix is fixed on
 * purpose: a value that changed per request would make the comparison useless.
 */
export const CHECKOUT_INTEGRATION_ID = "leu_checkout_qmwzptvx";

let client: Stripe | null = null;

/**
 * Lazily builds the Stripe client so that importing this module (during a build,
 * or in a route that never reaches Stripe) doesn't require the key to be set.
 */
export function getStripe(): Stripe {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it as a sensitive environment variable — never commit it."
    );
  }

  if (!client) {
    client = new Stripe(apiKey, {
      apiVersion: STRIPE_API_VERSION,
      appInfo: {
        name: "Lee Enterprises Unlimited",
        url: "https://leeenterprisesunlimited.com",
      },
      typescript: true,
      maxNetworkRetries: 2,
    });
  }

  return client;
}

/** True when the configured key is a live-mode key. */
export function isLiveMode(): boolean {
  return (process.env.STRIPE_SECRET_KEY ?? "").includes("_live_");
}

/**
 * Absolute origin used to build Checkout return URLs. Stripe rejects relative
 * URLs, so this must be a full origin in every environment.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  if (process.env.VERCEL_ENV === "production") {
    return "https://leeenterprisesunlimited.com";
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}
