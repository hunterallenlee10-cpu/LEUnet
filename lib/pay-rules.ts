import { FIELD_LIMITS, isValidEmail } from "@/lib/validation";

/**
 * The rules for a client billing link (/pay, docs/PAY.md). Like
 * lib/validation.ts, this file is shared: the admin form checks them so the
 * owner sees a mistake before sending, and the route checks them again,
 * because the server is the only side that counts. Nothing here touches
 * Stripe, so it is safe in the browser.
 */

/**
 * The most either amount can be, in cents: $25,000. The one number to change
 * to raise or lower the cap; the form and the route both read it.
 */
export const MAX_AMOUNT_CENTS = 2_500_000;

/**
 * Stripe's minimum charge in USD is $0.50, so a smaller amount would make a
 * link the client can't pay. Zero still means "none".
 */
export const MIN_AMOUNT_CENTS = 50;

/** Longest value each text field accepts. */
export const PAY_FIELD_LIMITS = {
  clientName: 120,
  /** Shown as the product name in Stripe Checkout and on receipts. */
  description: FIELD_LIMITS.short,
  email: FIELD_LIMITS.email,
} as const;

/** What the admin form posts. Amounts are the dollar strings as typed. */
export interface PayLinkInput {
  clientName: string;
  description: string;
  oneTime: string;
  monthly: string;
  clientEmail: string;
}

export interface PayLinkValues {
  clientName: string;
  description: string;
  oneTimeCents: number;
  monthlyCents: number;
  clientEmail: string;
}

export type PayLinkErrors = Partial<Record<keyof PayLinkInput | "form", string>>;

/** "$1,500", "1500.5" and " 1500.00 " are all fine; "1e3" and "-5" are not. */
const DOLLARS_PATTERN = /^\d{1,9}(\.\d{1,2})?$/;

/**
 * Dollars as typed to whole cents, or null when it isn't a plain amount. Done
 * on the digits rather than with floating point, so "19.99" is exactly 1999
 * and never 1998.9999. An empty box is $0.
 */
export function dollarsToCents(value: string): number | null {
  const cleaned = value.trim().replace(/^\$/, "").replace(/,/g, "").trim();
  if (cleaned === "") return 0;
  if (!DOLLARS_PATTERN.test(cleaned)) return null;
  const [whole, fraction = ""] = cleaned.split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}

function amountError(cents: number | null): string | undefined {
  if (cents === null) return "Enter a dollar amount, like 1500 or 1500.00.";
  if (cents === 0) return undefined;
  if (cents < MIN_AMOUNT_CENTS) return "Stripe's minimum is $0.50. Use 0 for none.";
  if (cents > MAX_AMOUNT_CENTS) {
    return `The most a link can be is $${(MAX_AMOUNT_CENTS / 100).toLocaleString("en-US")}.`;
  }
  return undefined;
}

/**
 * Checks the form and returns either the cleaned values or the errors by
 * field. Text is trimmed and checked against PAY_FIELD_LIMITS; amounts go to
 * integer cents, never negative, never over MAX_AMOUNT_CENTS, and at least
 * one has to be above zero.
 */
export function validatePayLink(
  input: PayLinkInput
): { values: PayLinkValues } | { errors: PayLinkErrors } {
  const errors: PayLinkErrors = {};

  const clientName = input.clientName.trim();
  const description = input.description.trim();
  const clientEmail = input.clientEmail.trim();

  if (!clientName) errors.clientName = "Enter the client or business name.";
  else if (clientName.length > PAY_FIELD_LIMITS.clientName)
    errors.clientName = `Keep this under ${PAY_FIELD_LIMITS.clientName} characters.`;

  if (!description) errors.description = "Say what it's for.";
  else if (description.length > PAY_FIELD_LIMITS.description)
    errors.description = `Keep this under ${PAY_FIELD_LIMITS.description} characters.`;

  const oneTimeCents = dollarsToCents(input.oneTime);
  const monthlyCents = dollarsToCents(input.monthly);
  const oneTimeError = amountError(oneTimeCents);
  const monthlyError = amountError(monthlyCents);
  if (oneTimeError) errors.oneTime = oneTimeError;
  if (monthlyError) errors.monthly = monthlyError;
  if (!oneTimeError && !monthlyError && !oneTimeCents && !monthlyCents) {
    errors.oneTime = "Enter a one-time amount, a monthly amount, or both.";
  }

  if (clientEmail) {
    if (clientEmail.length > PAY_FIELD_LIMITS.email || !isValidEmail(clientEmail))
      errors.clientEmail = "Enter a valid email, or leave it blank.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  return {
    values: {
      clientName,
      description,
      oneTimeCents: oneTimeCents ?? 0,
      monthlyCents: monthlyCents ?? 0,
      clientEmail,
    },
  };
}

/** Stripe's Payment Link ids: "plink_" and letters and digits. */
const PAYMENT_LINK_ID_PATTERN = /^plink_[A-Za-z0-9]{8,64}$/;

export function isPaymentLinkId(value: string): boolean {
  return PAYMENT_LINK_ID_PATTERN.test(value);
}
