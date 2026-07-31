import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { MarketingHeroSection } from "@/components/marketing/MarketingHeroSection";
import { MarketingOutcomeStrip } from "@/components/marketing/MarketingOutcomeStrip";
import { MarketingProblemSection } from "@/components/marketing/MarketingProblemSection";
import { MarketingDigitalSection } from "@/components/marketing/MarketingDigitalSection";
import { MarketingTraditionalSection } from "@/components/marketing/MarketingTraditionalSection";
import { MarketingCustomIdeasSection } from "@/components/marketing/MarketingCustomIdeasSection";
import { MarketingProcessSection } from "@/components/marketing/MarketingProcessSection";
import { MarketingPricingSection } from "@/components/marketing/MarketingPricingSection";
import { MarketingRelatedSection } from "@/components/marketing/MarketingRelatedSection";
import { MarketingInquiryCTA } from "@/components/marketing/MarketingInquiryCTA";
import { MarketingFAQSection } from "@/components/marketing/MarketingFAQSection";
import { MarketingFinalCTA } from "@/components/marketing/MarketingFinalCTA";
import {
  marketingFaqs,
  traditionalServices,
  digitalServices,
} from "@/data/marketing";

const title =
  "Traditional & Digital Marketing Services | Lee Marketing Mastery";
const description =
  "Lee Marketing Mastery runs both sides of a marketing mix - print, signage, and vehicle graphics offline, plus SEO, paid ads, social, email, and branding online. Quoted per channel, not sold as a bundle.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "traditional marketing",
    "digital marketing services",
    "local marketing",
    "print and direct mail",
    "vehicle wraps",
    "SEO and local search",
    "paid ad management",
    "social media marketing",
  ],
  alternates: {
    canonical: "/lee-marketing-mastery/marketing",
  },
  openGraph: {
    type: "website",
    url: "/lee-marketing-mastery/marketing",
    title,
    description,
    images: [
      {
        url: "/og/lee-marketing-mastery.png",
        width: 1200,
        height: 630,
        alt: "Lee Marketing Mastery - Traditional and Digital Marketing",
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
 * Same restraint as the other Lee Marketing Mastery pages: structured data
 * covers only what the site can substantiate - who provides the service, the
 * channels actually offered, and the FAQ content rendered below. No ratings, no
 * review counts, no client claims.
 *
 * Billboards, TV, radio and sponsorships are intentionally absent from the
 * offer catalog. They are reachable through a network rather than standing
 * offerings, and the page says so - listing them here would assert otherwise.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/lee-marketing-mastery/marketing#service`,
      name: "Traditional and Digital Marketing",
      description,
      serviceType: "Marketing services",
      url: `${SITE_URL}/lee-marketing-mastery/marketing`,
      provider: {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/lee-marketing-mastery#business`,
        name: "Lee Marketing Mastery",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Marketing Channels",
        itemListElement: [...traditionalServices, ...digitalServices].map(
          ({ title: name, description: serviceDescription }) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
              description: serviceDescription,
            },
          })
        ),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: marketingFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function LeeMarketingMasteryMarketingPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MainHeader />

      <main className="pt-20">
        <MarketingHeroSection />
        <MarketingOutcomeStrip />
        <MarketingProblemSection />
        <MarketingDigitalSection />
        <MarketingTraditionalSection />
        <MarketingCustomIdeasSection />
        <MarketingProcessSection />
        <MarketingPricingSection />
        <MarketingRelatedSection />
        <MarketingInquiryCTA />
        <MarketingFAQSection />
        <MarketingFinalCTA />
      </main>

      <MainFooter />
    </div>
  );
}
