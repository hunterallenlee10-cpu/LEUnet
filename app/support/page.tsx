import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
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
    <main className="w-full bg-neutral-950">
      <MainHeader />

      {/* pt-32 clears the fixed header. */}
      <section className="mx-auto w-full max-w-2xl px-6 pt-32 pb-24">
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Support {companyInfo.name}
          </h1>
          <p className="mt-3 text-sm text-amber-300/90">
            {companyInfo.heroSubtitle}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-neutral-400">
            Every venture under Lee Enterprises Unlimited is built to deliver
            real results for the people it serves. If the work has been valuable
            to you and you&apos;d like to put something behind it, a one-time
            contribution goes directly into building and improving what we do.
          </p>
        </header>

        <GlassCardPadded size="lg" className="mt-10">
          <SupportForm />
        </GlassCardPadded>
      </section>

      <MainFooter />
    </main>
  );
}
