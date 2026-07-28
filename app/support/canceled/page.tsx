import Link from "next/link";

import { GlassCardPadded } from "@/components/cards/GlassCard";

export default function SupportCanceledPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-neutral-950 px-6 py-24">
      <GlassCardPadded size="lg" className="w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold text-white">Nothing was charged</h1>

        <p className="mt-4 text-sm text-neutral-300">
          You canceled before completing your contribution, so no payment was
          taken. You&apos;re welcome back any time.
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
