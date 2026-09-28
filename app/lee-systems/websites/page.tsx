import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { WebsitesHeroSection } from "@/components/websites/WebsitesHeroSection";
import { WebsitesGuaranteeSection } from "@/components/websites/WebsitesGuaranteeSection";
import { WebsitesServicesSection } from "@/components/websites/WebsitesServicesSection";
import { RecentWorkSection } from "@/components/shared/RecentWorkSection";
import { WebsitesProcessSection } from "@/components/websites/WebsitesProcessSection";
import { WebsitesFAQSection } from "@/components/websites/WebsitesFAQSection";
import { WebsitesBridgeSection } from "@/components/websites/WebsitesBridgeSection";
import { WebsitesInquiryCTA } from "@/components/websites/WebsitesInquiryCTA";
import { SITE_URL } from "@/data/company";
import { leeSystems, leeSystemsRoutes, websiteFaqs } from "@/data/lee-systems";

const title = "Small Business Websites, Built Before You Pay | Lee Systems Co.";
const description =
  "Conversion-focused websites for small businesses, fully built before you pay anything. Mobile-first, fast, lead forms, basic SEO, and you own it. Free quotes from Lee Systems Co.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: leeSystemsRoutes.websites,
  },
  openGraph: {
    type: "website",
    url: leeSystemsRoutes.websites,
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
 * A `Service` under the `#business` node the Lee Systems main page defines,
 * the same shape as the automation page's. No portfolio ItemList until the
 * portfolio has real entries.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}${leeSystemsRoutes.websites}#service`,
      name: "Website Builds",
      description,
      serviceType: "Website design and development",
      url: `${SITE_URL}${leeSystemsRoutes.websites}`,
      provider: {
        "@type": "Organization",
        "@id": `${SITE_URL}${leeSystemsRoutes.home}#business`,
        name: leeSystems.name,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website Services",
        itemListElement: [
          "New Website Builds",
          "Website Redesigns",
          "Ongoing Care Plans",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: websiteFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function LeeSystemsWebsitesPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MainHeader />

      <main className="pt-20">
        <WebsitesHeroSection />
        <WebsitesGuaranteeSection />
        <WebsitesServicesSection />
        <RecentWorkSection id="website-work" />
        <WebsitesProcessSection />
        <WebsitesFAQSection />
        <WebsitesBridgeSection />
        <WebsitesInquiryCTA />
      </main>

      <MainFooter />
    </div>
  );
}
