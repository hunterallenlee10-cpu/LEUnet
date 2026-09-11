import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectionIds, venturePages } from "@/data/navigation";
import { lmmHomeTeaser } from "@/data/lmm";
import { LmmSignalRoutes } from "@/components/lmm/LmmSignalRoutes";

/**
 * Homepage doorway to /lee-marketing-mastery, and the sibling of
 * `BusinessMasterySection`: the site's two main things now each get one screen
 * on the homepage rather than the flagship getting one and the venture getting
 * a footer row.
 *
 * DELIBERATELY THE SAME SHAPE as the Business Mastery teaser — eyebrow,
 * manifesto, one paragraph, one status line, one CTA. Two sections built the
 * same way are what makes them read as two of a kind; giving this one a
 * different composition would rank it below the other before a visitor read a
 * word of it.
 *
 * WHAT DIFFERS IS THE LIGHT, and now the field over it. Both sections sit on
 * black, so the boundary between them is invisible, and each carries its own
 * destination's background: Business Mastery its "Constellation", this one the
 * pair of offset orbs — warm right, cool left — that open the venture hub,
 * with "Signal Routes" running over them. A visitor arriving at that page
 * should recognise where they came from.
 *
 * Like its sibling, this is not a summary. The hub carries the three
 * offerings, their diagrams and their routes; this carries the one sentence
 * that says why there are three of them.
 */
export function MarketingMasterySection() {
  return (
    <section
      id={sectionIds.lmm}
      className="relative overflow-hidden bg-black py-20 md:py-32"
    >
      {/* The hub hero's two offset orbs — warm high and right, cool low and
          left — rather than the sibling section's single centred pool, so each
          teaser is lit like the page it leads to.

          Sized and weighted to land at roughly the sibling's brightness: its
          pool is a 70%-wide gradient at 0.1 alpha, so a pair of orbs at the
          same alpha but a fraction of the width read as an unlit section
          beside it. These are viewport-relative for that reason — a fixed
          `w-96` is most of a phone and a sixth of a wide desktop, which is the
          span where the difference showed.

          THE HUB HERO NOW RUNS THIS EXACT PAIR. It used to light itself with a
          smaller, dimmer one that a negative z-index hid behind the section's
          own background anyway, so clicking through went from a warm teaser to
          a flat black hero. Both sides are tuned here; if these values change,
          change `HubHeroSection` with them. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-16 right-[18%] h-[34rem] w-[34rem] max-w-[80vw] translate-x-1/2 rounded-full bg-amber-400/[0.16] blur-3xl" />
        <div className="absolute -bottom-16 left-[20%] h-[28rem] w-[28rem] max-w-[70vw] -translate-x-1/2 rounded-full bg-slate-400/[0.09] blur-3xl" />

        {/* Drawn over the orbs, and inside this wrapper rather than beside it
            so it stays under the copy: the column below is `relative` and
            comes later in the document, which is the whole of what keeps the
            two apart.

            `center`: this section's column is centred, so the field dims in the
            middle. The hub hero passes `left` for its two-column grid. Before
            the mask existed the long sweep ran clean through the H2 here, which
            is the failure the prop exists to prevent. */}
        <LmmSignalRoutes focus="center" />
      </div>

      <div className="section-container relative text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
          {lmmHomeTeaser.eyebrow}
        </p>
        <h2 className="heading-lg mx-auto mb-6 max-w-3xl text-white">
          {lmmHomeTeaser.manifesto}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
          {lmmHomeTeaser.subtitle} {lmmHomeTeaser.description}
        </p>

        {/* The venture's own pulse rather than the sibling's `animate-ping`:
            `lmm-status` is what marks the live dot on every Lee Marketing
            Mastery page, and app/globals.css already stills it under
            prefers-reduced-motion. */}
        <div className="mb-10 flex items-center justify-center gap-2.5">
          <span
            className="lmm-status h-2.5 w-2.5 rounded-full bg-amber-400"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            {lmmHomeTeaser.assuranceLine}
          </p>
        </div>

        <Link
          href={venturePages.lmm}
          className="btn-primary group inline-flex items-center justify-center gap-2 px-8 py-4 text-base uppercase tracking-wide shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 sm:text-lg"
        >
          {lmmHomeTeaser.cta}
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
