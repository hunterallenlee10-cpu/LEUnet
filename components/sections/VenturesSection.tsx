import { BusinessMasterySection } from "@/components/sections/BusinessMasterySection";
import { LeeSystemsSection } from "@/components/sections/LeeSystemsSection";

/**
 * The homepage's two doorways, side by side: Business Mastery on the left and
 * Lee Systems Co. on the right from 1024px up, stacked in the same order below.
 *
 * They were two full-width sections one above the other. Beside each other
 * they read as a pair - which is what the two teasers were always built to be
 * (see LeeSystemsSection's header) - and the homepage stops asking a visitor to
 * scroll past one business to find the other.
 *
 * THIS SECTION OWNS THE LAYOUT AND NOTHING ELSE. Each panel still owns its own
 * light (Constellation on the left, Signal Routes and the orb pair on the
 * right), so a visitor who clicks through lands on the background they just
 * saw. What lives here is the grid, the seam between the halves, and the
 * hover spotlight; all three are `.ventures` in app/globals.css.
 *
 * Both panels stretch to the taller one's height and pin their status line
 * and CTA to their own bottom, so the two buttons sit on one line even though
 * the Lee Systems manifesto runs longer.
 */
export function VenturesSection() {
  return (
    <section aria-label="Our ventures" className="ventures">
      <BusinessMasterySection />
      <LeeSystemsSection />

      {/* The gold hairline between the halves, with a glint that runs down it.
          Desktop only: stacked, the Lee Systems panel draws its own horizontal
          rule along its top edge instead. */}
      <span className="ventures-seam" aria-hidden="true" />
    </section>
  );
}
