import type { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { ToolsMarqueeSection } from "@/components/sections/ToolsMarqueeSection";
import { LeeSystemsSetupSection } from "@/components/sections/LeeSystemsSetupSection";
import { RecentWorkSection } from "@/components/shared/RecentWorkSection";
import { WhoYoullWorkWithSection } from "@/components/sections/WhoYoullWorkWithSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/data/site";

const title = "Lee Enterprises Unlimited | AI Automation & Business Training";
const description =
  "Hire Lee Systems Co. for AI automation and websites, or learn to start a business and use AI with Business Mastery.";

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
 * The homepage: the hero and the two paths, the moving strip of tools, what
 * Lee Systems Co. sets up, recent work, who you'll work with, and the contact
 * form. The order is the site fix plan's, except that the owner swapped the
 * pricing promise for the tool strip on 2026-09-28. Nothing else goes here.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <MainHeader />

      <main>
        <HeroSection />
        <ToolsMarqueeSection />
        <LeeSystemsSetupSection />
        <RecentWorkSection />
        <WhoYoullWorkWithSection />
        <ContactSection />
      </main>

      <MainFooter />
    </div>
  );
}
