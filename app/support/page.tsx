import Link from "next/link";

import { GlassCardPadded } from "@/components/cards/GlassCard";
import { SupportForm } from "@/components/payments/SupportForm";
import { companyInfo } from "@/data/company";

export const metadata = {
  title: `Support ${companyInfo.name}`,
  description:
    "Make a one-time contribution supporting the Lee Enterprises Unlimited portfolio.",
};

export default function SupportPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-neutral-950 px-6 py-24">
      <div className="w-full max-w-lg">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white">
            Support {companyInfo.name}
          </h1>
          <p className="mt-3 text-sm text-neutral-400">
            {companyInfo.heroSubtitle}
          </p>
        </header>

        <GlassCardPadded size="lg">
          <SupportForm />
        </GlassCardPadded>

        <p className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-amber-300 underline-offset-4 hover:underline"
          >
            Return to {companyInfo.name}
          </Link>
        </p>
      </div>
    </main>
  );
}
