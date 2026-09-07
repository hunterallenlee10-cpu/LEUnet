import type { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { BmHeroSection } from "@/components/business-mastery/BmHeroSection";
import { BmManifestoSection } from "@/components/business-mastery/BmManifestoSection";
import { BmAudienceSection } from "@/components/business-mastery/BmAudienceSection";
import { BmTenetsSection } from "@/components/business-mastery/BmTenetsSection";
import { BmProgramSection } from "@/components/business-mastery/BmProgramSection";
import { BmFoundingOfferSection } from "@/components/business-mastery/BmFoundingOfferSection";
import { BmJourneyTimeline } from "@/components/business-mastery/BmJourneyTimeline";
import { BmFinalCTASection } from "@/components/business-mastery/BmFinalCTASection";

const title = "LEU Business Mastery | Speedrun Your Way to Success";
const description =
  "A business-development network for entrepreneurs at every stage: subject-specific classes, live webinars, daily calls, personal coaching, hands-on help, and a private professional network. Founding member spots are limited.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "business mastery program",
    "entrepreneur network",
    "business coaching",
    "start a business",
    "young entrepreneurs",
    "business community",
    "founding member",
  ],
  alternates: {
    canonical: "/business-mastery",
  },
  openGraph: {
    type: "website",
    url: "/business-mastery",
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
 * change it there first.
 */
export default function BusinessMasteryPage() {
  return (
    <main className="w-full bg-neutral-950">
      <MainHeader />

      <BmHeroSection />
      <BmManifestoSection />
      <BmAudienceSection />
      <BmTenetsSection />
      <BmProgramSection />
      <BmFoundingOfferSection />
      {/* Section 7, Why I Built LEU, is out at the owner's request — "for
          now", so this is a pause rather than a deletion. BmFounderSection
          and `bmFounder` are both intact and unchanged; putting the section
          back is this line plus its import, nothing more. Unlike The Vision
          and The Evolution (docs/BUSINESS-MASTERY.md §3) the sections after
          it are NOT renumbered, because the numbering has to survive the
          section coming back. */}
      {/* Section 9, Your Journey Is Just Beginning, is not paused like 7 — it
          has been merged into BmManifestoSection at slot 2, and
          BmTransitionSection.tsx is deleted rather than left behind
          (docs/BUSINESS-MASTERY.md §3). That section existed so the timeline
          would not run straight into a sales pitch, so removing it puts that
          join back: the closing CTA's own copy ("You can keep trying to figure
          everything out alone…") is the bridge now, and the timeline drops to
          neutral-950 so the two are still separated by the page's light/dark
          alternation rather than abutting as two black sections. */}
      <BmJourneyTimeline />
      <BmFinalCTASection />

      <MainFooter />
    </main>
  );
}
