import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { LeeSystemsHeroSection } from "@/components/lee-systems/LeeSystemsHeroSection";
import { LeeSystemsOfferingsSection } from "@/components/lee-systems/LeeSystemsOfferingsSection";
import { LeeSystemsAutomatesSection } from "@/components/lee-systems/LeeSystemsAutomatesSection";
import { LeeSystemsIndustriesSection } from "@/components/lee-systems/LeeSystemsIndustriesSection";
import { RecentWorkSection } from "@/components/shared/RecentWorkSection";
import { LeeSystemsHowItWorksSection } from "@/components/lee-systems/LeeSystemsHowItWorksSection";
import { LeeSystemsFinalCTA } from "@/components/lee-systems/LeeSystemsFinalCTA";
import { SITE_URL } from "@/data/company";
import { leeSystems, leeSystemsRoutes } from "@/data/lee-systems";

/**
 * The Lee Systems Co. main page. It replaced the Lee Marketing Mastery hub at
 * /lee-marketing-mastery, which now redirects here (next.config.mjs).
 *
 * The order sells automation first: offerings with automation as the large
 * card, then what gets automated, who it is for, recent work, how it works.
 * Websites appear once, as the smaller card, and have their own page.
 */
const title = "Lee Systems Co. | AI Automation & Websites for Business Owners";
const description =
  "Lee Systems Co. builds AI systems that answer your calls and new leads, handle intake and send follow-ups, plus websites built to bring in leads.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: leeSystemsRoutes.home,
  },
  openGraph: {
    type: "website",
    url: leeSystemsRoutes.home,
    siteName: leeSystems.name,
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
 * This page is the SOLE definer of the `#business` node. Both offering pages
 * emit a `Service` whose `provider` points here by @id; a second definition
 * elsewhere would give one @id two descriptions.
 *
 * An Organization rather than a LocalBusiness type: the site publishes no
 * address or service area (the owner's call, 2026-09-28), and local-business
 * data without an address is flagged as incomplete. No rating or review: none
 * exist to cite.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}${leeSystemsRoutes.home}#business`,
      name: leeSystems.name,
      description,
      url: `${SITE_URL}${leeSystemsRoutes.home}`,
      email: leeSystems.contactEmail,
      ...(leeSystems.phone ? { telephone: leeSystems.phone } : {}),
      founder: { "@type": "Person", name: leeSystems.owner },
      parentOrganization: {
        "@type": "Organization",
        name: leeSystems.parentName,
        url: SITE_URL,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Lee Systems Co. Services",
        itemListElement: [
          `${SITE_URL}${leeSystemsRoutes.automation}#service`,
          `${SITE_URL}${leeSystemsRoutes.websites}#service`,
        ].map((id) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", "@id": id },
        })),
      },
    },
  ],
};

export default function LeeSystemsPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MainHeader />

      <main className="pt-20">
        <LeeSystemsHeroSection />
        <LeeSystemsOfferingsSection />
        <LeeSystemsAutomatesSection />
        <LeeSystemsIndustriesSection />
        <RecentWorkSection />
        <LeeSystemsHowItWorksSection />
        <LeeSystemsFinalCTA />
      </main>

      <MainFooter />
    </div>
  );
}
