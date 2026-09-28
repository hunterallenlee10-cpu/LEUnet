import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { sectionIds, venturePages } from "@/data/navigation";
import { leeSystemsHomeTeaser } from "@/data/lee-systems";
import { venturesHome } from "@/data/company";
import { SignalRoutes } from "@/components/lee-systems/SignalRoutes";

/**
 * Homepage doorway to /lee-systems, and the sibling of `BusinessMasterySection`:
 * the site's two main things sit side by side in `VenturesSection`, this one
 * on the right, under the heading's "have it built for you".
 *
 * DELIBERATELY THE SAME SHAPE as the Business Mastery panel - path label,
 * eyebrow, manifesto, one paragraph, one status line, one CTA - so the two
 * read as two of a kind. What differs is the light: this one carries the Lee
 * Systems main page's background (the warm-right/cool-left orbs and "Signal
 * Routes"), so a visitor who clicks through recognises where they came from.
 *
 * It was the Lee Marketing Mastery teaser until the rename on 2026-09-25.
 */
export function LeeSystemsSection() {
  return (
    <article
      id={sectionIds.leeSystems}
      aria-labelledby="venture-ls-name"
      className="venture-panel venture-panel--end group/panel"
    >
      {/* The Lee Systems main page hero's two offset orbs — warm high and right, cool low and
          left — rather than the sibling panel's single pool, so each
          teaser is lit like the page it leads to.

          Sized and weighted to land at roughly the sibling's brightness. These
          are viewport-relative because a fixed `w-96` is most of a phone and a
          sixth of a wide desktop, which is the span where the difference
          showed.

          THE LEE SYSTEMS MAIN PAGE HERO RUNS THIS EXACT PAIR, so clicking
          through lands on the same light. Both sides are tuned here; if these
          values change, change `LeeSystemsHeroSection` with them.

          `.venture-bg` is the layer the hover spotlight dims when the other
          panel is the one being pointed at. */}
      <div className="venture-bg absolute inset-0 section-fade" aria-hidden="true">
        <div className="absolute -top-16 right-[18%] h-[34rem] w-[34rem] max-w-[80vw] translate-x-1/2 rounded-full bg-brass-400/[0.16] blur-3xl" />
        <div className="absolute -bottom-16 left-[20%] h-[28rem] w-[28rem] max-w-[70vw] -translate-x-1/2 rounded-full bg-slate-400/[0.09] blur-3xl" />

        {/* Drawn over the orbs, and inside this wrapper rather than beside it
            so it stays under the copy, which carries `.venture-copy` and so
            paints above.

            `center`: the copy is centred in the panel. `.ventures` in
            app/globals.css widens that mask to the panel's proportions, which
            are taller and narrower than the full-width band it was tuned
            for. */}
        <SignalRoutes focus="center" />
      </div>

      {/* The whole panel is the way through; see the same link on the
          Business Mastery panel for why it is a second link. */}
      <Link
        href={venturePages.lmm}
        className="venture-panel-link"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* The same label as the Business Mastery panel's, for the other
          path. */}
      <p className="venture-copy venture-path mb-6">
        <Wrench className="text-brass-400" aria-hidden="true" />
        {venturesHome.labels.leeSystems}
      </p>

      {/* `.venture-masthead` — shared with the Business Mastery panel. Same
          treatment, same measurements; only the name differs, which is the
          whole of what keeps the two panels reading as two of a kind. */}
      <p className="venture-copy venture-masthead mb-5">
        <span id="venture-ls-name">{leeSystemsHomeTeaser.eyebrow}</span>
      </p>
      <h3 className="venture-copy venture-heading mb-6">
        {leeSystemsHomeTeaser.manifesto}
      </h3>
      <p className="venture-copy venture-body mb-8">
        {leeSystemsHomeTeaser.description}
      </p>

      {/* The brand's own pulse rather than the sibling's `animate-ping`:
          `ls-status` is what marks the live dot on the Lee Systems pages,
          and app/globals.css already stills it under
          prefers-reduced-motion. */}
      <div className="venture-copy venture-status mb-10 flex items-center gap-2.5">
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
        className="venture-copy venture-cta btn-ls-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base uppercase tracking-wide shadow-lg shadow-brass-400/20 sm:text-lg"
      >
        {leeSystemsHomeTeaser.cta}
        <ArrowRight
          className="h-5 w-5 transition-transform group-hover/panel:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
