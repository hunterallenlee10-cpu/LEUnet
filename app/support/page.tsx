import Link from "next/link";
import { Hammer, Sparkles, Users } from "lucide-react";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { SupportForm } from "@/components/payments/SupportForm";
import { companyInfo } from "@/data/company";
import { sectionIds } from "@/data/navigation";

export const metadata = {
  title: `Support ${companyInfo.name}`,
  description:
    "Make a one-time contribution supporting the Lee Enterprises Unlimited portfolio.",
};

const supportUses = [
  {
    icon: Hammer,
    title: "Tools and equipment",
    description:
      "The gear, software, and systems each venture runs on day to day.",
  },
  {
    icon: Users,
    title: "Better service",
    description:
      "More capacity to take on work and to do right by the people we already serve.",
  },
  {
    icon: Sparkles,
    title: "Room to grow",
    description:
      "Groundwork for the next venture, so the portfolio keeps expanding.",
  },
];

export default function SupportPage() {
  return (
    <main className="relative w-full overflow-hidden bg-neutral-950">
      <MainHeader />

      {/* Ambient background. Purely decorative, so it stays out of the a11y
          tree and never intercepts clicks on the form above it. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(212,175,55,0.13),transparent_70%)]" />
        <div className="absolute -top-40 -left-40 size-[520px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-48 size-[560px] rounded-full bg-amber-400/[0.07] blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      {/* pt-32 clears the fixed header. */}
      <section className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-24 sm:pt-40">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            Support us
          </p>

          <h1 className="heading-xl mt-4 text-white">
            Support{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              {companyInfo.name}
            </span>
          </h1>

          <p className="mt-4 text-sm font-medium tracking-wide text-amber-300/90">
            {companyInfo.heroSubtitle}
          </p>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-400">
            Every venture under Lee Enterprises Unlimited is built to deliver
            real results for the people it serves. If the work has been valuable
            to you and you&apos;d like to put something behind it, a one-time
            contribution goes directly into building and improving what we do.
          </p>
        </header>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
          {/* On narrow screens the card leads — the supporting copy shouldn't
              push the actual action below the fold. */}
          <div className="order-2 lg:order-1 lg:sticky lg:top-32">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">
              Where your support goes
            </h2>

            <ul className="mt-6 space-y-6">
              {supportUses.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/[0.07]">
                    <Icon
                      className="size-[18px] text-amber-300"
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-neutral-500">
              Looking to hire one of our ventures instead?{" "}
              <Link
                href={`/#${sectionIds.contact}`}
                className="text-amber-300 underline-offset-4 hover:underline"
              >
                Get in touch
              </Link>
              .
            </p>
          </div>

          {/* A solid elevated surface rather than the glass card used
              elsewhere — on a payments page legibility beats the effect. */}
          <div className="order-1 rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8 lg:order-2">
            <SupportForm />
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
