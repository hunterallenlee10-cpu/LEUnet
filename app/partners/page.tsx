import Link from "next/link";
import { Handshake } from "lucide-react";

import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { companyInfo } from "@/data/company";
import { sectionIds } from "@/data/navigation";

export const metadata = {
  title: `Partners | ${companyInfo.name}`,
  description:
    "The partners backing the Lee Enterprises Unlimited portfolio — to be listed soon.",
};

export default function PartnersPage() {
  return (
    <main className="relative w-full overflow-hidden bg-neutral-950">
      <MainHeader />

      {/* Ambient background. Purely decorative, so it stays out of the a11y
          tree and never intercepts clicks. Same treatment as /support so the
          two recognition-adjacent pages read as siblings. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(212,175,55,0.13),transparent_70%)]" />
        <div className="absolute -top-40 -left-40 size-[520px] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-48 size-[560px] rounded-full bg-amber-400/[0.07] blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      {/* pt-32 clears the fixed header. min-h keeps the footer from riding up
          on tall screens while the page has only the placeholder card. */}
      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col px-6 pt-32 pb-24 sm:pt-40">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-amber-300/25 bg-amber-300/[0.07] px-3.5 py-1.5 text-xs font-medium tracking-wide text-amber-200/90 uppercase">
            Partners
          </span>

          <h1 className="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Partners
            </span>
          </h1>

          <p className="mt-4 text-sm font-medium tracking-wide text-amber-300/90">
            {companyInfo.heroSubtitle}
          </p>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-400">
            The businesses and individuals who stand behind Lee Enterprises
            Unlimited help every venture in the portfolio go further. This is
            where they&apos;ll be recognized.
          </p>
        </header>

        {/* Solid elevated surface, matching the /support form card, so the
            placeholder still reads as a finished page rather than a gap. */}
        <div className="mx-auto mt-16 w-full max-w-2xl rounded-2xl border border-white/10 bg-neutral-900/70 p-8 text-center shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-12">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10">
            <Handshake className="size-7 text-amber-300" aria-hidden="true" />
          </span>

          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Partners to be listed soon
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
            We&apos;re putting together our first partner lineup. Check back
            soon to see the people and businesses backing our work.
          </p>

          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">
              Interested in partnering?
            </p>

            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/#${sectionIds.contact}`}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-amber-400 px-6 text-sm font-semibold text-neutral-950 transition-colors hover:bg-amber-300 sm:w-auto"
              >
                Get in Touch
              </Link>

              <Link
                href="/support"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-medium text-white transition-colors hover:border-amber-300/50 hover:text-amber-200 sm:w-auto"
              >
                Support Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
