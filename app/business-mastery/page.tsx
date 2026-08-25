import type { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { BmHeroSection } from "@/components/business-mastery/BmHeroSection";
import { BmCoreBeliefSection } from "@/components/business-mastery/BmCoreBeliefSection";
import { BmAudienceSection } from "@/components/business-mastery/BmAudienceSection";
import { BmEmpireSection } from "@/components/business-mastery/BmEmpireSection";
import { BmProgramSection } from "@/components/business-mastery/BmProgramSection";
import { BmFoundingOfferSection } from "@/components/business-mastery/BmFoundingOfferSection";
import { BmEvolutionSection } from "@/components/business-mastery/BmEvolutionSection";
import { BmVisionSection } from "@/components/business-mastery/BmVisionSection";
import { BmFounderSection } from "@/components/business-mastery/BmFounderSection";
import { BmJourneyTimeline } from "@/components/business-mastery/BmJourneyTimeline";
import { BmTransitionSection } from "@/components/business-mastery/BmTransitionSection";
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
      <BmCoreBeliefSection />
      <BmAudienceSection />
      <BmEmpireSection />
      <BmProgramSection />
      <BmFoundingOfferSection />
      <BmEvolutionSection />
      <BmVisionSection />
      <BmFounderSection />
      <BmJourneyTimeline />
      <BmTransitionSection />
      <BmFinalCTASection />

      <MainFooter />
    </main>
  );
}
