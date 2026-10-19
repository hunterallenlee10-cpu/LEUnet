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
import { BookCallBand } from "@/components/ui/BookCallBand";
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
 * tools, recent work, the contact form, and the journey, with a "Book a free
 * call" band after the tools and after recent work.
 * Business Mastery is linked from the footer only (the owner's call,
 * 2026-10-06). The order is the site fix
 * plan's, except that on 2026-09-28 the owner swapped the pricing promise for
 * the tool strip, moved the journey here from /business-mastery (right above
 * recent work), and paused "Who you'll work with" and "What LEU
 * sets up". On 2026-10-19 the owner moved the journey to the very bottom,
 * under the contact form. Nothing else goes here.
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
        {/* A "Book a free call" band every couple of sections, worded for
            the section above it (the owner's ask, 2026-10-19). */}
        <BookCallBand
          title="Already using these tools? We'll plug right in."
          line="Book a free call and we'll map out what to automate first, around the tools you already run."
        />
        {/* "What LEU sets up" is out at the owner's request
            (2026-09-28). LeeSystemsSetupSection is intact; putting it back
            is this line plus its import. */}
        <RecentWorkSection />
        <BookCallBand
          title="Want a website like these?"
          line="Book a free call and get a flat upfront quote, built personally for your business."
        />
        {/* Who you'll work with is out "for now" at the owner's request
            (2026-09-28). WhoYoullWorkWithSection is intact; putting it back
            is this line plus its import. */}
        <ContactSection />
        {/* The journey sits last, under the contact form (the owner's call,
            2026-10-19). BM_JOURNEY_LOCKED (data/business-mastery.ts) is the
            switch between locked and open, and flipping it is the whole
            unlock. */}
        {BM_JOURNEY_LOCKED ? <BmJourneyLocked /> : <BmJourneyTimeline />}
      </main>

      <MainFooter />
    </div>
  );
}
