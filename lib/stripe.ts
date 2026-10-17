import Stripe from "stripe";

import { SITE_URL } from "@/data/company";

/**
 * Pinned to the API version bundled with stripe@22.x. Upgrade this string and
 * the SDK together — never let it drift silently.
 */
const STRIPE_API_VERSION = "2026-06-24.dahlia" as const;

let client: Stripe | null = null;

/**
 * Lazily builds the Stripe client so that importing this module (during a build,
 * or in a route that never reaches Stripe) doesn't require the key to be set.
 */
export function getStripe(): Stripe {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it as a sensitive environment variable, and never commit it."
    );
  }

  if (!client) {
    client = new Stripe(apiKey, {
      apiVersion: STRIPE_API_VERSION,
      appInfo: {
        name: "Lee Enterprises Unlimited",
        url: SITE_URL,
      },
      typescript: true,
      maxNetworkRetries: 2,
    });
  }

  return client;
}
