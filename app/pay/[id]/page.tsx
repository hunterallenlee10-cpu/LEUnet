import Link from "next/link";
import { Lock } from "lucide-react";

import { PayContact } from "@/components/pay/PayContact";
import { getPayLink } from "@/lib/pay";
import { formatAmount } from "@/lib/money";

/**
 * /pay/{paymentLinkId}: what the owner texts a client. Read-only: it reads
 * the Payment Link and its line items from Stripe on every request and shows
 * what's due, then hands off to Stripe's own checkout. Nothing on the page
 * takes an amount, so there is nothing for a client to change. docs/PAY.md.
 */
export const dynamic = "force-dynamic";

export default async function PayLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPayLink(id);

  if (result.status === "inactive") {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold tracking-tight text-balance text-white sm:text-3xl">
          This payment link is no longer active
        </h1>
        <p className="mt-4 leading-relaxed text-neutral-400">
          It may have been paid already or replaced with a new one. Reach out
          and we'll sort it out.
        </p>
        <PayContact lead="Contact us:" className="mt-8" />
      </div>
    );
  }

  if (result.status === "error") {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold tracking-tight text-balance text-white sm:text-3xl">
          We couldn't load this payment
        </h1>
        <p className="mt-4 leading-relaxed text-neutral-400">
          Nothing has been charged. Please refresh in a minute.
        </p>
        <PayContact lead="Still not loading?" className="mt-8" />
      </div>
    );
  }

  const { link } = result;
  const both = link.oneTimeCents > 0 && link.monthlyCents > 0;

  return (
    <div className="mx-auto max-w-lg">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] indent-[0.2em] text-amber-400">
          Payment for
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance break-words text-white sm:text-4xl">
          {link.clientName}
        </h1>
        <p className="mt-3 leading-relaxed text-pretty break-words text-neutral-300">
          {link.description}
        </p>
      </div>

      <section
        aria-label="Payment summary"
        className="glass-card mt-10 p-6 md:p-8"
      >
        <dl>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-base text-neutral-300">Due today</dt>
            <dd className="text-3xl font-bold tracking-tight tabular-nums text-white">
              {formatAmount(link.dueTodayCents)}
            </dd>
          </div>
          {both && (
            <p className="mt-2 text-right text-sm tabular-nums text-neutral-500">
              {formatAmount(link.oneTimeCents)} one-time +{" "}
              {formatAmount(link.monthlyCents)} first month
            </p>
          )}
          {link.monthlyCents > 0 && (
            <div className="mt-5 border-t border-white/10 pt-5">
              <dt className="sr-only">After today</dt>
              <dd className="text-neutral-300">
                Then{" "}
                <span className="font-semibold tabular-nums text-white">
                  {formatAmount(link.monthlyCents)}/month
                </span>
                , billed until canceled
              </dd>
            </div>
          )}
        </dl>

        <a
          href={link.checkoutUrl}
          className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-base font-semibold text-neutral-950 transition-colors duration-200 hover:bg-amber-300"
        >
          <Lock className="h-4 w-4" aria-hidden="true" />
          Continue to secure checkout
        </a>

        <p className="mt-4 text-center text-xs leading-relaxed text-neutral-500">
          Payment is processed by Stripe. By continuing, you agree to our{" "}
          <Link
            href="/legal#terms"
            className="text-neutral-300 underline underline-offset-2 hover:text-amber-300"
          >
            terms of service
          </Link>
          .
        </p>
      </section>

      <PayContact className="mt-10" />
    </div>
  );
}
