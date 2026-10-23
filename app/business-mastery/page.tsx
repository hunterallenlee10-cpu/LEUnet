import type { Metadata } from "next";
import { MainFooter } from "@/components/layout/MainFooter";
import { BmHeader } from "@/components/business-mastery/BmHeader";
import { BmHeroSection } from "@/components/business-mastery/BmHeroSection";
import { BmProgramSection } from "@/components/business-mastery/BmProgramSection";
import { BmShiftSection } from "@/components/business-mastery/BmShiftSection";
import { BmIntroSection } from "@/components/business-mastery/BmIntroSection";
import { BmIsThisYouSection } from "@/components/business-mastery/BmIsThisYouSection";
import { BmEconomySection } from "@/components/business-mastery/BmEconomySection";
import { BmWayOutSection } from "@/components/business-mastery/BmWayOutSection";
import { BmLearnSection } from "@/components/business-mastery/BmLearnSection";
import { BmNewSkillsSection } from "@/components/business-mastery/BmNewSkillsSection";
import { BmChoiceSection } from "@/components/business-mastery/BmChoiceSection";
import { BmManifestoSection } from "@/components/business-mastery/BmManifestoSection";
import { BmFoundingOfferSection } from "@/components/business-mastery/BmFoundingOfferSection";
import { businessMasteryPage } from "@/data/navigation";

const title = "Business Mastery | Learn to Start a Business and Use AI | LEU";
const description =
  "Courses, coaching, and a community for people starting a business and learning to use AI. A $199/month membership, part of Lee Enterprises Unlimited.";

// The share image is app/business-mastery/opengraph-image.tsx. The canonical
// address is the subdomain's root once BUSINESS_MASTERY_SITE_LIVE is on
// (config/business-mastery-site.mjs), and this site's /business-mastery
// until then, so search engines treat the subdomain as a copy before launch.
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: businessMasteryPage,
  },
  openGraph: {
    type: "website",
    url: businessMasteryPage,
    siteName: "Lee Enterprises Unlimited",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

/**
 * No JSON-LD on this page yet, and that is the same restraint the venture
 * pages document: structured data covers only what the site can substantiate,
 * and until Phase C sets a price there is no Offer to describe — an Offer
 * with no price, or a Product standing in for a membership, would imply
 * commerce this page does not yet transact. Revisit when checkout ships
 * (docs/BUSINESS-MASTERY.md §9).
 *
 * Section order is the settled page flow from docs/BUSINESS-MASTERY.md §3 —
 * change it there first. It was last changed on 2026-10-18, when eight
 * sections after The Real World's landing page joined it at the owner's
 * request (the intro rows, Is this you?, the new economy, Your way out with
 * the proof figures at its foot, What you'll learn, New skills, and The
 * choice is yours). Every section shares the body's neutral-950, so what
 * alternates is a glow layer: the even sections carry one (the shift, Is
 * this you?, the new economy, What you'll learn, New skills, the offer) and
 * the odd ones don't. Keep that alternation if the order changes again.
 */
export default function BusinessMasteryPage() {
  return (
    <div className="min-h-screen w-full bg-neutral-950">
      {/* Its own header and footer rather than the main site's: the page is
          Business Mastery's own site, on its own subdomain
          (docs/BUSINESS-MASTERY.md). */}
      <BmHeader />

      <main>
        <BmHeroSection />
        <BmShiftSection />
        <BmIntroSection />
        <BmIsThisYouSection />
        <BmProgramSection />
        <BmEconomySection />
        <BmWayOutSection />
        <BmLearnSection />
        <BmManifestoSection />
        <BmNewSkillsSection />
        <BmChoiceSection />
        <BmFoundingOfferSection />
        {/* Section 7, Why I Built LEU, is out at the owner's request — "for
            now", so this is a pause rather than a deletion. BmFounderSection
            and `bmFounder` are both intact and unchanged; putting the section
            back is this line plus its import, nothing more. Unlike The Vision
            and The Evolution (docs/BUSINESS-MASTERY.md §3) the sections after
            it are NOT renumbered, because the numbering has to survive the
            section coming back. */}
        {/* Section 9, Your Journey Is Just Beginning, is off the page entirely
            (docs/BUSINESS-MASTERY.md §3). It stopped being its own section on
            2026-09-07, when it merged into BmManifestoSection at slot 2 and
            BmTransitionSection.tsx was deleted rather than left behind; the owner
            asked that half back off the manifesto on 2026-09-13. `bmTransition`
            is whole and unchanged in the data file either way. */}
        {/* Section 8, The Journey, moved to the homepage at the owner's
            request on 2026-09-28, right above Recent Builds (app/page.tsx), and
            took its BM_JOURNEY_LOCKED switch with it. The page now ends on the
            founding offer. Putting it back here is the one line in
            app/page.tsx plus its imports. */}
      </main>
      {/* Section 10, Achieve Your Dreams Today, came off at the owner's
          request on 2026-09-27. BmFinalCTASection and `bmFinalCta` are
          intact; putting it back is this line plus its import. */}

      <MainFooter variant="business-mastery" />
    </div>
  );
}
