import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { WebsitesHeroSection } from "@/components/websites/WebsitesHeroSection";
import { WebsitesOutcomeStrip } from "@/components/websites/WebsitesOutcomeStrip";
import { WebsitesProblemSection } from "@/components/websites/WebsitesProblemSection";
import { WebsitesServicesSection } from "@/components/websites/WebsitesServicesSection";
import { WebsitesAiSection } from "@/components/websites/WebsitesAiSection";
import { WebsitesWorkSection } from "@/components/websites/WebsitesWorkSection";
import { WebsitesProcessSection } from "@/components/websites/WebsitesProcessSection";
import { WebsitesPricingSection } from "@/components/websites/WebsitesPricingSection";
import { WebsitesInquiryCTA } from "@/components/websites/WebsitesInquiryCTA";
import { WebsitesFAQSection } from "@/components/websites/WebsitesFAQSection";
import { WebsitesFinalCTA } from "@/components/websites/WebsitesFinalCTA";
import { websiteFaqs, websitePortfolio } from "@/data/websites";

const title = "Professional Websites Built with AI | Lee Marketing Mastery";
const description =
  "Lee Marketing Mastery designs and builds modern business websites using AI-assisted production. New builds, redesigns, built-in AI lead capture, and optional care plans - quoted per project.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AI website design",
    "professional business website",
    "website redesign",
    "small business web design",
    "AI website builder",
    "custom website development",
    "website care plan",
  ],
  alternates: {
    canonical: "/lee-marketing-mastery/websites",
  },
  openGraph: {
    type: "website",
    url: "/lee-marketing-mastery/websites",
    title,
    description,
    images: [
      {
        url: "/og/lee-marketing-mastery.png",
        width: 1200,
        height: 630,
        alt: "Lee Marketing Mastery - Professional Websites Built with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og/lee-marketing-mastery.png"],
  },
};

const SITE_URL = "https://leeenterprisesunlimited.com";

/**
 * Same restraint as the parent LMM page: structured data covers only what the
 * site can substantiate - who provides the service, what is offered, the FAQ
 * content rendered below, and a portfolio of sites that are genuinely reachable
 * on this domain. No ratings, no review counts, no client claims.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/lee-marketing-mastery/websites#service`,
      name: "Professional Websites Built with AI",
      description,
      serviceType: "Website design and development",
      url: `${SITE_URL}/lee-marketing-mastery/websites`,
      provider: {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/lee-marketing-mastery#business`,
        name: "Lee Marketing Mastery",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website Services",
        itemListElement: [
          "New Website Builds",
          "Website Redesigns",
          "AI Features and Lead Capture",
          "Ongoing Website Care Plans",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "ItemList",
      name: "Websites built by Lee Enterprises Unlimited",
      itemListElement: websitePortfolio.map(({ name, href }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${SITE_URL}${href === "/" ? "" : href}`,
      })),
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

export default function LeeMarketingMasteryWebsitesPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MainHeader />

      <main className="pt-20">
        <WebsitesHeroSection />
        <WebsitesOutcomeStrip />
        <WebsitesProblemSection />
        <WebsitesServicesSection />
        <WebsitesAiSection />
        <WebsitesWorkSection />
        <WebsitesProcessSection />
        <WebsitesPricingSection />
        <WebsitesInquiryCTA />
        <WebsitesFAQSection />
        <WebsitesFinalCTA />
      </main>

      <MainFooter />
    </div>
  );
}
