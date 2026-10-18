import { Zap } from "lucide-react";
import { bmIsThisYou } from "@/data/business-mastery";
import { BmCta } from "@/components/business-mastery/BmCta";
import { BmRuns } from "@/components/business-mastery/BmRuns";

/**
 * "Is this you?": eight lines a visitor either recognises or doesn't, after
 * The Real World's section of that name (the owner's reference, 2026-10-18).
 * Two columns from md up, one below.
 *
 * Carries a glow: the page alternates one (docs/BUSINESS-MASTERY.md §3).
 */
export function BmIsThisYouSection() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 z-0 section-fade" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 20%, rgb(var(--amber) / 0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-[1]">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] indent-[0.3em] text-neutral-500">
            {bmIsThisYou.eyebrow}
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            {bmIsThisYou.headingLead}{" "}
            <span className="text-amber-400">{bmIsThisYou.headingAccent}</span>
          </h2>
        </div>

        <ul className="bm-reveal mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2">
          {bmIsThisYou.items.map((runs, i) => (
            <li key={i} className="flex gap-3.5 text-lg leading-relaxed text-neutral-400">
              <Zap
                className="mt-1 h-5 w-5 shrink-0 fill-amber-400/25 text-amber-400"
                aria-hidden="true"
              />
              <span>
                <BmRuns runs={runs} />
              </span>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-xl font-semibold text-white md:text-2xl">
            {bmIsThisYou.closer}
          </p>
          <p className="mt-4 text-lg text-neutral-400 text-balance">
            {bmIsThisYou.closerNote}
          </p>
          <div className="mt-10">
            <BmCta />
          </div>
        </div>
      </div>
    </section>
  );
}
