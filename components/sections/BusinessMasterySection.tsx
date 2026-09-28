import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { businessMasteryPage, sectionIds } from "@/data/navigation";
import { bmHero } from "@/data/business-mastery";
import { venturesHome } from "@/data/company";
import { BmHeroBackground } from "@/components/business-mastery/BmHeroBackground";

/**
 * Homepage doorway to /business-mastery — deliberately not a summary. The
 * page carries the pillars, tenets, and audiences; this carries the
 * manifesto, a scarcity line, and one CTA. The scarcity line used to be the
 * real founding counter, sharing the page's owner-maintained figures; it is
 * `bmHero.scarcityLine` now, so no figure is stated on the teaser or the
 * page. docs/BUSINESS-MASTERY.md §8.
 *
 * It is the left half of `VenturesSection`, not a section of its own: the
 * heading over the pair, the grid, the seam and the hover spotlight live
 * there. The article is named by the business rather than by the manifesto,
 * so a screen reader announces which door this is before what it says.
 */
export function BusinessMasterySection() {
  return (
    <article
      id={sectionIds.businessMastery}
      aria-labelledby="venture-bm-name"
      className="venture-panel venture-panel--start group/panel"
    >
      {/* The same "Constellation" field the page's own hero runs, rather than
          a gradient that merely shares its palette: this block is the doorway
          to that page, and arriving on a hero that moves the way the teaser
          moved is what makes the two read as one destination. It replaces a
          single static gold pool — which is still here, as the first layer of
          `.bmc-field`, so the panel reads gold rather than blue-black once
          the links are drawn over it.

          Second consumer of the component. It is self-contained: absolutely
          positioned inside the nearest positioned ancestor (this panel),
          drawing a field whose density is derived from the box it is given,
          so a half-width panel composes as its own frame rather than a crop
          of the hero. */}
      {/* Wrapped so the field fades out at its top and bottom edges like
          every other section's background. `.venture-bg` is the layer the
          hover spotlight dims when the other panel is the one being pointed
          at. */}
      <div className="venture-bg absolute inset-0 section-fade" aria-hidden="true">
        <BmHeroBackground />
      </div>

      {/* Ceiling fade. The field's ground is at its lightest along its top
          edge - the gold pool it opens with sits at 12% of the frame - so
          against the flat `bg-neutral-950` under the section heading above
          it, the boundary read as a hard horizontal line. It belongs to the
          join rather than to the field, so it sits outside the background
          component. */}
      <div
        className="absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-neutral-950 to-transparent"
        aria-hidden="true"
      />

      {/* The whole panel is the way through, not just the button - the
          spotlight makes the panel look like a door, so it has to open like
          one. A second link rather than stretching the CTA's own: the CTA
          scales on hover, and a transformed element becomes the containing
          block for its `::after`, which would shrink the target back to the
          button at the moment the pointer reaches it. Hidden from assistive
          tech and the tab order, because the CTA below is the same link. */}
      <Link
        href={businessMasteryPage}
        className="venture-panel-link"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Which of the heading's two paths this is, in words a visitor
          scanning for "which one is for me" is already using. The icon takes
          the panel's accent. */}
      <p className="venture-copy venture-path mb-6">
        <GraduationCap className="text-amber-400" aria-hidden="true" />
        {venturesHome.labels.businessMastery}
      </p>

      {/* `.venture-masthead` — shared with the Lee Systems Co. panel, and it
          has to stay shared: the two doorways are deliberately the same shape,
          so the names may differ in wording and in nothing else. See the
          block in app/globals.css. */}
      <p className="venture-copy venture-masthead mb-5">
        <span id="venture-bm-name">Business Mastery</span>
      </p>
      <h3 className="venture-copy venture-heading mb-6">
        {bmHero.manifesto}
      </h3>
      <p className="venture-copy venture-body mb-8">
        {bmHero.homeDescription}
      </p>

      <div className="venture-copy venture-status mb-10 flex items-center gap-2.5">
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
        className="venture-copy venture-cta btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base uppercase tracking-wide shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 sm:text-lg"
      >
        {bmHero.cta}
        <ArrowRight
          className="h-5 w-5 transition-transform group-hover/panel:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
