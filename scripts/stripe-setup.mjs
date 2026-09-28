#!/usr/bin/env node
/**
 * Creates the Stripe Product and custom-amount Price backing the "support us"
 * flow, then prints the Price ID to put in STRIPE_PRICE_SUPPORT_CUSTOM.
 *
 * A Price is required because `custom_unit_amount` — the field that lets a
 * customer type their own amount — exists only on the Prices API. Checkout's
 * inline `price_data` does not support it.
 *
 * Safe to re-run: it reuses the active Price with lookup key
 * leu_support_custom_amount if one exists (it does not re-check the bounds).
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/stripe-setup.mjs
 */

import Stripe from "stripe";

// Mirrors lib/support-config.ts and lib/stripe.ts; change them together.
const MIN_CENTS = 500;
const MAX_CENTS = 250_000;
const PRESET_CENTS = 5_000;
const CURRENCY = "usd";
const PRODUCT_NAME = "Support Lee Enterprises Unlimited";
const PRODUCT_DESCRIPTION =
  "A one-time contribution supporting the Lee Enterprises Unlimited portfolio.";
const LOOKUP_KEY = "leu_support_custom_amount";

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey) {
  console.error("STRIPE_SECRET_KEY is not set.");
  process.exit(1);
}

if (apiKey.includes("_live_")) {
  console.error(
    "Refusing to run against a LIVE key. Re-run with a test key first, then\n" +
      "create the live Product and Price deliberately from the Dashboard."
  );
  process.exit(1);
}

const stripe = new Stripe(apiKey, { apiVersion: "2026-06-24.dahlia" });

async function main() {
  // Reuse the active Price with this lookup key, so re-runs don't litter the
  // account with duplicates.
  const existing = await stripe.prices.list({
    lookup_keys: [LOOKUP_KEY],
    active: true,
    limit: 1,
    expand: ["data.product"],
  });

  if (existing.data.length > 0) {
    const price = existing.data[0];
    console.log("Found an existing custom-amount Price — reusing it.\n");
    report(price);
    return;
  }

  const product = await stripe.products.create({
    name: PRODUCT_NAME,
    description: PRODUCT_DESCRIPTION,
    metadata: { kind: "support" },
  });

  const price = await stripe.prices.create({
    product: product.id,
    currency: CURRENCY,
    lookup_key: LOOKUP_KEY,
    custom_unit_amount: {
      enabled: true,
      minimum: MIN_CENTS,
      maximum: MAX_CENTS,
      preset: PRESET_CENTS,
    },
    metadata: { kind: "support" },
  });

  console.log("Created the support Product and custom-amount Price.\n");
  report(price);
}

function report(price) {
  const bounds = price.custom_unit_amount ?? {};
  console.log(`  Price ID : ${price.id}`);
  console.log(`  Product  : ${typeof price.product === "string" ? price.product : price.product.id}`);
  console.log(`  Minimum  : ${(bounds.minimum ?? 0) / 100} ${CURRENCY.toUpperCase()}`);
  console.log(`  Maximum  : ${(bounds.maximum ?? 0) / 100} ${CURRENCY.toUpperCase()}`);
  console.log(`  Preset   : ${(bounds.preset ?? 0) / 100} ${CURRENCY.toUpperCase()}`);
  console.log("\nAdd this to your environment:\n");
  console.log(`  STRIPE_PRICE_SUPPORT_CUSTOM=${price.id}\n`);
}

main().catch((error) => {
  console.error("Setup failed:", error.message ?? error);
  process.exit(1);
});
