import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { LeeSystemsHeroSection } from "@/components/lee-systems/LeeSystemsHeroSection";
import { LeeSystemsOfferingsSection } from "@/components/lee-systems/LeeSystemsOfferingsSection";
import { LeeSystemsAutomatesSection } from "@/components/lee-systems/LeeSystemsAutomatesSection";
import { LeeSystemsIndustriesSection } from "@/components/lee-systems/LeeSystemsIndustriesSection";
import { LeeSystemsProofSection } from "@/components/lee-systems/LeeSystemsProofSection";
import { LeeSystemsHowItWorksSection } from "@/components/lee-systems/LeeSystemsHowItWorksSection";
import { LeeSystemsAboutSection } from "@/components/lee-systems/LeeSystemsAboutSection";
import { LeeSystemsFinalCTA } from "@/components/lee-systems/LeeSystemsFinalCTA";
import { SITE_URL } from "@/data/company";
import { leeSystems, leeSystemsRoutes } from "@/data/lee-systems";

/**
 * The Lee Systems Co. main page. It replaced the Lee Marketing Mastery hub at
 * /lee-marketing-mastery, which now redirects here (next.config.mjs).
 *
 * The order sells automation first: offerings with automation as the large
 * card, then what gets automated, who it is for, proof, how it works. Websites
 * appear once, as the smaller card, and have their own page.
 */
const title = "Lee Systems Co. | Business Automation & Websites in Frederick, MD";
const description =
  "Lee Systems Co. builds custom automation that answers leads, handles intake, sends follow-ups and removes admin busywork, plus websites fully built before you pay. Frederick, Maryland. A Lee Enterprises Unlimited company.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "business automation",
    "small business automation Maryland",
    "Frederick MD web design",
    "lead follow-up automation",
    "law firm automation",
    "home services automation",
  ],
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
 * ProfessionalService is a LocalBusiness subtype, which is what local search
 * reads. The address is city-level only (no street address is published), and
 * areaServed states what the page states: Maryland, and remote nationwide. No
 * rating or review: none exist to cite.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}${leeSystemsRoutes.home}#business`,
      name: leeSystems.name,
      description,
      url: `${SITE_URL}${leeSystemsRoutes.home}`,
      email: leeSystems.contactEmail,
      ...(leeSystems.phone ? { telephone: leeSystems.phone } : {}),
      founder: { "@type": "Person", name: leeSystems.owner },
      address: {
        "@type": "PostalAddress",
        addressLocality: leeSystems.city,
        addressRegion: leeSystems.regionCode,
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: `${leeSystems.city}, ${leeSystems.regionCode}` },
        { "@type": "State", name: leeSystems.region },
        { "@type": "Country", name: "United States" },
      ],
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
        <LeeSystemsProofSection />
        <LeeSystemsHowItWorksSection />
        <LeeSystemsAboutSection />
        <LeeSystemsFinalCTA />
      </main>

      <MainFooter />
    </div>
  );
}
