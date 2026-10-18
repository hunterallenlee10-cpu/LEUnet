import type { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { ToolsMarqueeSection } from "@/components/sections/ToolsMarqueeSection";
import { RecentWorkSection } from "@/components/shared/RecentWorkSection";
import { BmJourneyTimeline } from "@/components/business-mastery/BmJourneyTimeline";
import { BmJourneyLocked } from "@/components/business-mastery/BmJourneyLocked";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/data/site";
import { BM_JOURNEY_LOCKED } from "@/data/business-mastery";

const title = "Lee Enterprises Unlimited | AI Automation & Websites";
const description =
  "Lee Enterprises Unlimited builds websites that bring in customers and AI automations that answer every call, follow up and book the job.";

// The canonical and og:url live here rather than in the root layout, where
// every page without its own would inherit them and point at the homepage.
// The share image is app/opengraph-image.tsx.
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
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
 * The homepage: the hero and the LEU offer with its calculator, the
 * six service groups (ServicesShowcase, 2026-10-17), the moving strip of
 * tools, the journey, recent work, and the contact form.
 * Business Mastery is linked from the footer only (the owner's call,
 * 2026-10-06). The order is the site fix
 * plan's, except that on 2026-09-28 the owner swapped the pricing promise for
 * the tool strip, moved the journey here from /business-mastery (right above
 * recent work), and paused "Who you'll work with" and "What LEU
 * sets up". Nothing else goes here.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <MainHeader />

      <main>
        <HeroSection />
        {/* "What we do": the six service groups as a bento of tiles with
            live previews, each linking to its page (2026-10-17). */}
        <ServicesShowcase />
        <ToolsMarqueeSection />
        {/* "What LEU sets up" is out at the owner's request
            (2026-09-28). LeeSystemsSetupSection is intact; putting it back
            is this line plus its import. */}
        {/* The journey, locked or open: BM_JOURNEY_LOCKED
            (data/business-mastery.ts) is the switch, and flipping it is the
            whole unlock. */}
        {BM_JOURNEY_LOCKED ? <BmJourneyLocked /> : <BmJourneyTimeline />}
        <RecentWorkSection />
        {/* Who you'll work with is out "for now" at the owner's request
            (2026-09-28). WhoYoullWorkWithSection is intact; putting it back
            is this line plus its import. */}
        <ContactSection />
      </main>

      <MainFooter />
    </div>
  );
}
