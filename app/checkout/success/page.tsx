import Link from "next/link";

import { GlassCardPadded } from "@/components/cards/GlassCard";
import { getStripe } from "@/lib/stripe";
import { formatAmount } from "@/lib/stripe-catalog";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  let amountLabel: string | null = null;
  let customerEmail: string | null = null;
  let paid = false;

  // This page is only for reassurance. Fulfillment is driven by the webhook,
  // which is the trustworthy signal — a customer can always close this tab.
  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      customerEmail = session.customer_details?.email ?? null;
      if (session.amount_total != null) {
        amountLabel = formatAmount(session.amount_total, session.currency ?? "usd");
      }
    } catch (error) {
      console.error("[stripe] could not retrieve checkout session:", error);
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-neutral-950 px-6 py-24">
      <GlassCardPadded size="lg" className="w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold text-white">
          {paid ? "Payment received" : "Thank you"}
        </h1>

        <p className="mt-4 text-sm text-neutral-300">
          {paid
            ? "Your payment is confirmed and our team has been notified."
            : "We've received your order. If your payment method settles later, you'll get a confirmation as soon as it clears."}
        </p>

        {amountLabel && (
          <p className="mt-6 text-lg font-medium text-white">{amountLabel}</p>
        )}

        {customerEmail && (
          <p className="mt-2 text-sm text-neutral-400">
            A receipt is on its way to {customerEmail}.
          </p>
        )}

        <Link
          href="/"
          className="mt-8 inline-block text-sm text-amber-300 underline-offset-4 hover:underline"
        >
          Return to Lee Enterprises Unlimited
        </Link>
      </GlassCardPadded>
    </main>
  );
}
