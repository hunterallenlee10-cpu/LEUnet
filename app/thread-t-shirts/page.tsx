import type { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { THREAD_PALETTE } from "@/data/thread";
import { ThreadCartProvider } from "@/components/thread/ThreadCartProvider";
import { ThreadCatalogFilterProvider } from "@/components/thread/ThreadCatalogFilterProvider";
import { ThreadCartDrawer } from "@/components/thread/ThreadCartDrawer";
import { ThreadHeroSection } from "@/components/thread/ThreadHeroSection";
import { ThreadBrandStorySection } from "@/components/thread/ThreadBrandStorySection";
import { ThreadQualitySection } from "@/components/thread/ThreadQualitySection";
import { ThreadFeaturedSection } from "@/components/thread/ThreadFeaturedSection";
import { ThreadCategoriesSection } from "@/components/thread/ThreadCategoriesSection";
import { ThreadCatalogSection } from "@/components/thread/ThreadCatalogSection";
import { ThreadUseCasesSection } from "@/components/thread/ThreadUseCasesSection";
import { ThreadProcessSection } from "@/components/thread/ThreadProcessSection";
import { ThreadGroupOrderSection } from "@/components/thread/ThreadGroupOrderSection";
import { ThreadFAQSection } from "@/components/thread/ThreadFAQSection";
import { ThreadOrderRequestForm } from "@/components/thread/ThreadOrderRequestForm";
import { ThreadCTASection } from "@/components/thread/ThreadCTASection";

export const metadata: Metadata = {
  title: "Thread T-Shirts | Premium & Custom Apparel",
  description:
    "Premium everyday apparel and custom printed T-shirts, hoodies, and team gear for businesses, teams, schools, events, and fundraisers. Send an order request — no payment required.",
  keywords: [
    "custom t-shirts",
    "custom apparel",
    "team apparel",
    "business apparel",
    "screen printing",
    "event shirts",
    "custom hoodies",
  ],
};

/**
 * Thread is pre-launch: this page takes order requests, it does not sell.
 * See docs/THREAD.md for the reasoning and for what has to be confirmed before
 * any of the placeholder catalog is advertised as real.
 */
export default function ThreadPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: THREAD_PALETTE.ink }}
    >
      <MainHeader />

      <ThreadCartProvider>
        <ThreadCatalogFilterProvider>
          <main className="pt-20">
            <ThreadHeroSection />
            <ThreadBrandStorySection />
            <ThreadQualitySection />
            <ThreadFeaturedSection />
            <ThreadCategoriesSection />
            <ThreadCatalogSection />
            <ThreadUseCasesSection />
            <ThreadProcessSection />
            <ThreadGroupOrderSection />
            <ThreadFAQSection />
            <ThreadOrderRequestForm />
            <ThreadCTASection />
          </main>

          <ThreadCartDrawer />
        </ThreadCatalogFilterProvider>
      </ThreadCartProvider>

      <MainFooter />
    </div>
  );
}
