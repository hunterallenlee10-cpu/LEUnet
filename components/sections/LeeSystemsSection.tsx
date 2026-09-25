import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectionIds, venturePages } from "@/data/navigation";
import { leeSystemsHomeTeaser } from "@/data/lee-systems";
import { SignalRoutes } from "@/components/lee-systems/SignalRoutes";

/**
 * Homepage doorway to /lee-systems, and the sibling of `BusinessMasterySection`:
 * the site's two main things each get one screen on the homepage.
 *
 * DELIBERATELY THE SAME SHAPE as the Business Mastery teaser - eyebrow,
 * manifesto, one paragraph, one status line, one CTA - so the two read as two
 * of a kind. What differs is the light: this one carries the Lee Systems main
 * page's background (the warm-right/cool-left orbs and "Signal Routes"), so a
 * visitor who clicks through recognises where they came from.
 *
 * It was the Lee Marketing Mastery teaser until the rename on 2026-09-25.
 */
export function LeeSystemsSection() {
  return (
    <section
      id={sectionIds.leeSystems}
      className="relative overflow-hidden bg-black py-20 md:py-32"
    >
      {/* The Lee Systems main page hero's two offset orbs — warm high and right, cool low and
          left — rather than the sibling section's single centred pool, so each
          teaser is lit like the page it leads to.

          Sized and weighted to land at roughly the sibling's brightness: its
          pool is a 70%-wide gradient at 0.1 alpha, so a pair of orbs at the
          same alpha but a fraction of the width read as an unlit section
          beside it. These are viewport-relative for that reason — a fixed
          `w-96` is most of a phone and a sixth of a wide desktop, which is the
          span where the difference showed.

          THE LEE SYSTEMS MAIN PAGE HERO RUNS THIS EXACT PAIR, so clicking
          through lands on the same light. Both sides are tuned here; if these
          values change, change `LeeSystemsHeroSection` with them. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-16 right-[18%] h-[34rem] w-[34rem] max-w-[80vw] translate-x-1/2 rounded-full bg-brass-400/[0.16] blur-3xl" />
        <div className="absolute -bottom-16 left-[20%] h-[28rem] w-[28rem] max-w-[70vw] -translate-x-1/2 rounded-full bg-slate-400/[0.09] blur-3xl" />

        {/* Drawn over the orbs, and inside this wrapper rather than beside it
            so it stays under the copy: the column below is `relative` and
            comes later in the document, which is the whole of what keeps the
            two apart.

            `center`: this section's column is centred, so the field dims in the
            middle. Before the mask existed the long sweep ran clean through the
            H2 here, which is the failure the prop exists to prevent. */}
        <SignalRoutes focus="center" />
      </div>

      <div className="section-container relative text-center">
        {/* `.venture-masthead` — shared with the Business Mastery teaser above.
            Same treatment, same measurements; only the name differs, which is
            the whole of what keeps the two sections reading as two of a kind. */}
        <p className="venture-masthead mb-5">
          <span>{leeSystemsHomeTeaser.eyebrow}</span>
        </p>
        <h2 className="heading-lg mx-auto mb-6 max-w-3xl text-white">
          {leeSystemsHomeTeaser.manifesto}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
          {leeSystemsHomeTeaser.subtitle} {leeSystemsHomeTeaser.description}
        </p>

        {/* The brand's own pulse rather than the sibling's `animate-ping`:
            `ls-status` is what marks the live dot on the Lee Systems pages,
            and app/globals.css already stills it under
            prefers-reduced-motion. */}
        <div className="mb-10 flex items-center justify-center gap-2.5">
          <span
            className="ls-status h-2.5 w-2.5 rounded-full bg-brass-400"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass-400">
            {leeSystemsHomeTeaser.assuranceLine}
          </p>
        </div>

        <Link
          href={venturePages.lmm}
          className="btn-ls-primary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base uppercase tracking-wide shadow-lg shadow-brass-400/20 sm:text-lg"
        >
          {leeSystemsHomeTeaser.cta}
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
