import { BusinessMasterySection } from "@/components/sections/BusinessMasterySection";
import { LeeSystemsSection } from "@/components/sections/LeeSystemsSection";
import { venturesHome } from "@/data/company";

/**
 * The homepage's two doorways as one choice: a shared heading - "Learn to
 * build it, or have it built for you." - over Business Mastery on the left and
 * Lee Systems Co. on the right, with an "or" on the seam between them. From
 * 1024px up the panels sit side by side; below that they stack in the same
 * order and the "or" becomes a divider between them.
 *
 * They were two full-width sections one above the other, which asked a
 * visitor to scroll past one business to find the other and never said how
 * the two relate. The heading says it: Business Mastery teaches you to build
 * it, Lee Systems builds it for you. Each of its two phrases is set in its own
 * panel's accent, so the sentence maps onto the pair.
 *
 * THIS SECTION OWNS THE FRAME AND NOTHING ELSE. Each panel still owns its own
 * light (Constellation on the left, Signal Routes and the orb pair on the
 * right), so a visitor who clicks through lands on the background they just
 * saw. What lives here is the heading, the grid, the seam and its "or", and the
 * hover spotlight; all of it is `.ventures` in app/globals.css.
 *
 * Both panels stretch to the taller one's height and pin their status line and
 * CTA to their own bottom, so the two buttons sit on one line even though the
 * Lee Systems manifesto runs longer.
 */
export function VenturesSection() {
  return (
    <section aria-labelledby="ventures-title" className="ventures">
      <header className="ventures-head">
        <p className="ventures-eyebrow">{venturesHome.eyebrow}</p>
        <h2 id="ventures-title" className="ventures-title">
          <span className="ventures-title-start">{venturesHome.title.start}</span>
          , or <span className="ventures-title-end">{venturesHome.title.end}</span>.
        </h2>
      </header>

      <div className="ventures-pair">
        <BusinessMasterySection />

        {/* Decorative: the heading already says "or" in words. Between the
            two panels in the markup so that, stacked, it falls between them
            as a divider; side by side it is lifted onto the seam. */}
        <div className="ventures-or" aria-hidden="true">
          <span>or</span>
        </div>

        <LeeSystemsSection />

        {/* The gold hairline between the halves, with a glint that runs down
            it. Side by side only. */}
        <span className="ventures-seam" aria-hidden="true" />
      </div>
    </section>
  );
}
