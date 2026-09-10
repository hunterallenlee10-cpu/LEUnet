import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessMasteryPage, sectionIds } from "@/data/navigation";
import { bmHero } from "@/data/business-mastery";
import { BmHeroBackground } from "@/components/business-mastery/BmHeroBackground";

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
      {/* The same "Constellation" field the page's own hero runs, rather than
          a gradient that merely shares its palette: this block is the doorway
          to that page, and arriving on a hero that moves the way the teaser
          moved is what makes the two read as one destination. It replaces a
          single static gold pool — which is still here, as the first layer of
          `.bmc-field`, so the section reads gold rather than blue-black once
          the links are drawn over it.

          Second consumer of the component. It is self-contained: absolutely
          positioned inside the nearest positioned ancestor (this section),
          drawing a field whose density is derived from the box it is given,
          so a 600px band composes like the full-height hero rather than a
          crop of it. */}
      <BmHeroBackground />

      {/* Ceiling fade. The field's ground is at its lightest along its top
          edge - the gold pool it opens with sits at 12% of the frame - so
          against the flat `bg-neutral-950` of the About section above it, the
          section boundary read as a hard horizontal line. The previous static
          pool was centred and reached the edge already black, which is why
          this is new. Same idiom as the floor fade under the hero on
          /business-mastery, mirrored: it belongs to the join between two
          sections rather than to the field, so it sits outside the background
          component. */}
      <div
        className="absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-neutral-950 to-transparent"
        aria-hidden="true"
      />

      <div className="section-container relative z-[2] text-center">
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
