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
import { BmJourneyLocked } from "@/components/business-mastery/BmJourneyLocked";
import { BmFinalCTASection } from "@/components/business-mastery/BmFinalCTASection";
import { BM_JOURNEY_LOCKED } from "@/data/business-mastery";

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
      {/* Section 9, Your Journey Is Just Beginning, is off the page entirely
          (docs/BUSINESS-MASTERY.md §3). It stopped being its own section on
          2026-09-07, when it merged into BmManifestoSection at slot 2 and
          BmTransitionSection.tsx was deleted rather than left behind; the owner
          asked that half back off the manifesto on 2026-09-13. `bmTransition`
          is whole and unchanged in the data file either way.

          Its removal is why the timeline's join is what it is. That section
          existed so the timeline would not run straight into a sales pitch:
          the closing CTA's own copy ("You can keep trying to figure everything
          out alone…") is the bridge now, and the timeline sits on neutral-950
          so the two are separated by the page's light/dark alternation rather
          than abutting as two black sections. */}
      {/* Section 8, The Journey, is LOCKED — on the page, visibly not open.
          While BM_JOURNEY_LOCKED (data/business-mastery.ts) is true, the slot
          renders BmJourneyLocked: the section's title and a "Locked Until
          Complete" marker in place of the interactive timeline. The owner
          asked the section held back until launch on 2026-09-13, and the same
          day chose this visible lock over having it off the page entirely.
          Flipping that one flag to false is the whole unlock. Both components
          sit on neutral-950, so the join described above holds in either
          state and BmFinalCTASection stays black throughout. */}
      {BM_JOURNEY_LOCKED ? <BmJourneyLocked /> : <BmJourneyTimeline />}
      <BmFinalCTASection />

      <MainFooter />
    </main>
  );
}
