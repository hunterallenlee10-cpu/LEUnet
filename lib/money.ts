/** Formats a minor-unit amount for display, e.g. 2500 -> "$25.00". */
export function formatAmount(amountCents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}
