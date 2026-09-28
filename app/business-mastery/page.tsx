import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
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
import { BM_JOURNEY_LOCKED } from "@/data/business-mastery";

/** The Business Mastery manifesto line, and nothing else on the site, which
 *  is why it is declared here rather than in the root layout: only this page
 *  preloads it. Only the two light weights the hero uses are fetched. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
});

const title = "Business Mastery | Learn to Start a Business and Use AI | LEU";
const description =
  "Courses, coaching and a community for people starting a business and learning to use AI. A paid monthly membership, part of Lee Enterprises Unlimited.";

// The share image is app/business-mastery/opengraph-image.tsx.
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/business-mastery",
  },
  openGraph: {
    type: "website",
    url: "/business-mastery",
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
 * change it there first.
 */
export default function BusinessMasteryPage() {
  return (
    <div className={`min-h-screen w-full bg-neutral-950 ${cormorant.variable}`}>
      <MainHeader />

      <main>
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
            than abutting as two black sections. (The closing CTA is itself off
            the page since 2026-09-27 — see below.) */}
        {/* Section 8, The Journey, is LOCKED — on the page, visibly not open.
            While BM_JOURNEY_LOCKED (data/business-mastery.ts) is true, the slot
            renders BmJourneyLocked: the section's title and the shared Coming
            Soon marker in place of the interactive timeline. The owner asked
            the section held back until launch on 2026-09-13, the same day chose
            this visible placeholder over having it off the page entirely, and
            then chose "Coming Soon" over a lock badge for its marker. Flipping
            that one flag to false is the whole unlock. Both components sit on
            neutral-950, so the join described above holds in either state and
            BmFinalCTASection stays black throughout. The 2026-09-28 site fix
            plan asked for this section off the page; the owner chose the same
            day to keep it exactly as it is. */}
        {BM_JOURNEY_LOCKED ? <BmJourneyLocked /> : <BmJourneyTimeline />}
      </main>
      {/* Section 10, Achieve Your Dreams Today, came off at the owner's
          request on 2026-09-27, so the page now ends on the journey slot.
          BmFinalCTASection and `bmFinalCta` are intact; putting it back is
          this line plus its import. */}

      <MainFooter />
    </div>
  );
}
