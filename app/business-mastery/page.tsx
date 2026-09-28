import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono } from "next/font/google";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { BmHeroSection } from "@/components/business-mastery/BmHeroSection";
import { BmProgramSection } from "@/components/business-mastery/BmProgramSection";
import { BmAudienceSection } from "@/components/business-mastery/BmAudienceSection";
import { BmProofSection } from "@/components/business-mastery/BmProofSection";
import { BmManifestoSection } from "@/components/business-mastery/BmManifestoSection";
import { BmFoundingOfferSection } from "@/components/business-mastery/BmFoundingOfferSection";

/** The Business Mastery manifesto line, and nothing else on the site, which
 *  is why it is declared here rather than in the root layout: only this page
 *  preloads it. Only the two light weights the hero uses are fetched. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
});

/** The hero's eyebrow, and likewise nothing else on the site. It was declared
 *  in the root layout until 2026-09-28, which had every page preload a font
 *  only this one draws. It feeds the `font-mono-geist` token in
 *  app/globals.css. */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
 * change it there first. It was last reordered on 2026-09-28, to put what
 * members get before the philosophy. Every section shares the body's
 * neutral-950, so what alternates is a glow layer: 2, 4 and 6 carry one, 3
 * and 5 don't. Keep that alternation if the order changes again.
 */
export default function BusinessMasteryPage() {
  return (
    <div
      className={`min-h-screen w-full bg-neutral-950 ${cormorant.variable} ${geistMono.variable}`}
    >
      <MainHeader />

      <main>
        <BmHeroSection />
        <BmProgramSection />
        <BmAudienceSection />
        <BmProofSection />
        <BmManifestoSection />
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
            request on 2026-09-28, right above Recent work (app/page.tsx), and
            took its BM_JOURNEY_LOCKED switch with it. The page now ends on the
            founding offer. Putting it back here is the one line in
            app/page.tsx plus its imports. */}
      </main>
      {/* Section 10, Achieve Your Dreams Today, came off at the owner's
          request on 2026-09-27. BmFinalCTASection and `bmFinalCta` are
          intact; putting it back is this line plus its import. */}

      <MainFooter />
    </div>
  );
}
