/**
 * Configuration for the "Support Lee Enterprises Unlimited" contribution flow.
 *
 * This is a pay-what-you-choose model, so unlike a fixed catalog the customer
 * genuinely does pick the amount. That is safe because both paths are bounded
 * on the server:
 *
 *  - Preset buttons post an `amountCents` that must land inside [MIN, MAX].
 *  - "Other amount" posts no amount at all. Stripe collects it on its own
 *    hosted page using a Price with `custom_unit_amount`, whose minimum and
 *    maximum are fixed in Stripe. Nothing from the browser can widen them.
 *
 * IMPORTANT: Lee Enterprises Unlimited is a for-profit holding company.
 * Contributions here are NOT tax-deductible charitable donations. Keep the
 * customer-facing copy free of charity framing, and note that `submit_type` is
 * deliberately "pay" rather than "donate".
 */

/** Minimum contribution. Stripe's own floor for USD is 50 cents. */
export const SUPPORT_MIN_CENTS = 500;

/** Maximum contribution accepted without a conversation. */
export const SUPPORT_MAX_CENTS = 250_000;

/** Amount pre-filled on Stripe's page when the supporter enters their own. */
export const SUPPORT_PRESET_CENTS = 5_000;

/** One-click amounts offered before the "other amount" option. */
export const SUPPORT_PRESETS_CENTS = [2_500, 5_000, 10_000] as const;

export const SUPPORT_CURRENCY = "usd";

export const SUPPORT_PRODUCT_NAME = "Support Lee Enterprises Unlimited";

export const SUPPORT_PRODUCT_DESCRIPTION =
  "A one-time contribution supporting the Lee Enterprises Unlimited portfolio.";

/**
 * Appended to the account's statement descriptor so the charge is recognizable
 * on a card statement. Cards reject `statement_descriptor` outright, so this
 * must be sent as `statement_descriptor_suffix`.
 *
 * The account prefix (set in Dashboard → Settings → Public details), the space
 * Stripe inserts, and this suffix must total 22 characters or fewer, or Stripe
 * rejects the charge. At 7 characters that leaves 14 for the prefix.
 *
 * Keep it a plain word. A supporter reading their statement weeks later has to
 * recognize the charge — an unrecognizable descriptor is a leading cause of
 * chargebacks. "LEE ENT SUPPORT" reads as something they chose to pay for.
 */
export const SUPPORT_STATEMENT_DESCRIPTOR_SUFFIX = "SUPPORT";

/**
 * Stripe Price ID (`price_...`) for the customer-entered amount. Created by
 * `node scripts/stripe-setup.mjs`, which prints the value to put here.
 * Without it, only the preset amounts are available.
 */
export function getCustomAmountPriceId(): string | undefined {
  const value = process.env.STRIPE_PRICE_SUPPORT_CUSTOM?.trim();
  return value ? value : undefined;
}

/** True when the amount is a whole number of cents inside the allowed range. */
export function isAllowedSupportAmount(amountCents: unknown): boolean {
  return (
    typeof amountCents === "number" &&
    Number.isInteger(amountCents) &&
    amountCents >= SUPPORT_MIN_CENTS &&
    amountCents <= SUPPORT_MAX_CENTS
  );
}
