import Link from "next/link";

import { GlassCardPadded } from "@/components/cards/GlassCard";
import { getStripe } from "@/lib/stripe";
import { formatAmount } from "@/lib/money";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SupportSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  let amountLabel: string | null = null;
  let supporterName: string | null = null;
  let paid = false;

  // Reassurance only. The webhook is the trustworthy signal that money moved —
  // a supporter can always close this tab before it renders.
  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";

      if (session.amount_total != null) {
        amountLabel = formatAmount(
          session.amount_total,
          session.currency ?? "usd"
        );
      }

      supporterName =
        session.custom_fields?.find((field) => field.key === "supportername")
          ?.text?.value ?? null;
    } catch (error) {
      console.error("[stripe] could not retrieve support session:", error);
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-neutral-950 px-6 py-24">
      <GlassCardPadded size="lg" className="w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold text-white">
          {supporterName ? `Thank you, ${supporterName}` : "Thank you"}
        </h1>

        <p className="mt-4 text-sm text-neutral-300">
          {paid
            ? "Your contribution came through, and it genuinely helps."
            : "We've received your contribution. If your payment method settles later, you'll get a confirmation once it clears."}
        </p>

        {amountLabel && (
          <p className="mt-6 text-lg font-medium text-white">{amountLabel}</p>
        )}

        <p className="mt-6 text-xs text-neutral-500">
          Lee Enterprises Unlimited is a for-profit company. This contribution is
          not a tax-deductible charitable donation.
        </p>

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
