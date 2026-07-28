import Link from "next/link";
import { Check } from "lucide-react";

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
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 px-6 py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(212,175,55,0.14),transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-900/70 p-8 text-center shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10">
          <Check className="size-7 text-amber-300" strokeWidth={2.5} aria-hidden="true" />
        </span>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white">
          {supporterName ? `Thank you, ${supporterName}` : "Thank you"}
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
          {paid
            ? "Your contribution came through, and it genuinely helps."
            : "We've received your contribution. If your payment method settles later, you'll get a confirmation once it clears."}
        </p>

        {amountLabel && (
          <p className="mt-7 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
            {amountLabel}
          </p>
        )}

        <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-relaxed text-neutral-500">
          Lee Enterprises Unlimited is a for-profit company. This contribution is
          not a tax-deductible charitable donation.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex h-11 items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-medium text-white transition-colors hover:border-amber-300/50 hover:text-amber-200"
        >
          Return to Lee Enterprises Unlimited
        </Link>
      </div>
    </main>
  );
}
