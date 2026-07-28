/** Formats a minor-unit amount for display, e.g. 2500 -> "$25.00". */
export function formatAmount(amountCents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}

/** Formats without trailing cents when the amount is whole, e.g. 2500 -> "$25". */
export function formatAmountCompact(
  amountCents: number,
  currency = "usd"
): string {
  const isWhole = amountCents % 100 === 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amountCents / 100);
}
