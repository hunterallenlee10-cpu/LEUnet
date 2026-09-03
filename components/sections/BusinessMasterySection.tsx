import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessMasteryPage, sectionIds } from "@/data/navigation";
import { bmHero } from "@/data/business-mastery";

/**
 * Homepage doorway to /business-mastery — deliberately not a summary. The
 * page carries the pillars, phases, and audiences; this carries the
 * manifesto, a scarcity line, and one CTA. The scarcity line used to be the
 * real founding counter, sharing the page's owner-maintained figures; it is
 * `bmHero.scarcityLine` now, so the teaser no longer states a number and the
 * page's counter stands alone. docs/BUSINESS-MASTERY.md §8.
 */
export function BusinessMasterySection() {
  return (
    <section
      id={sectionIds.businessMastery}
      className="relative overflow-hidden bg-black py-20 md:py-32"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 45%, rgba(251, 191, 36, 0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
          LEU Business Mastery
        </p>
        <h2 className="heading-lg mx-auto mb-6 max-w-3xl text-white">
          {bmHero.manifesto}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
          {bmHero.subtitle} {bmHero.description}
        </p>

        <div className="mb-10 flex items-center justify-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            {bmHero.scarcityLine}
          </p>
        </div>

        <Link
          href={businessMasteryPage}
          className="btn-primary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base uppercase tracking-wide shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 sm:text-lg"
        >
          {bmHero.cta}
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
