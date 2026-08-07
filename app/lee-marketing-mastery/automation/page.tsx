import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { LmmHeroSection } from "@/components/lmm/LmmHeroSection";
import { LmmOutcomeStrip } from "@/components/lmm/LmmOutcomeStrip";
import { LmmProblemSection } from "@/components/lmm/LmmProblemSection";
import { LmmServicesSection } from "@/components/lmm/LmmServicesSection";
import { LmmResultsSection } from "@/components/lmm/LmmResultsSection";
import { LmmProcessSection } from "@/components/lmm/LmmProcessSection";
import { LmmUseCasesSection } from "@/components/lmm/LmmUseCasesSection";
import { LmmWhyChooseSection } from "@/components/lmm/LmmWhyChooseSection";
import { LmmConsultationCTA } from "@/components/lmm/LmmConsultationCTA";
import { LmmFAQSection } from "@/components/lmm/LmmFAQSection";
import { LmmFinalCTA } from "@/components/lmm/LmmFinalCTA";
import { lmmFaqs } from "@/data/lmm";

const title = "Business Automation Systems | Lee Marketing Mastery";
const description =
  "Lee Marketing Mastery builds custom automation systems that help small and medium-sized businesses generate opportunities, streamline operations, improve follow-up, and create more capacity for growth.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "business automation",
    "workflow automation",
    "lead generation systems",
    "CRM automation",
    "marketing automation",
    "small business automation",
  ],
  alternates: {
    canonical: "/lee-marketing-mastery/automation",
  },
  openGraph: {
    type: "website",
    url: "/lee-marketing-mastery/automation",
    title,
    description,
    images: [
      {
        url: "/og/lee-marketing-mastery.png",
        width: 1200,
        height: 630,
        alt: "Lee Marketing Mastery - Business Automation Systems",
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
 * Structured data limited to what the site can actually substantiate: who the
 * provider is, what it offers, and the FAQ content rendered on the page. No
 * ratings, reviews or service-area claims - none are verified.
 *
 * This page used to define the `#business` ProfessionalService node itself,
 * because it used to own the /lee-marketing-mastery URL. That URL is now the
 * venture hub, and a node's `@id` has to be the URL that actually describes it,
 * so the ProfessionalService moved there and this page became a `Service` -
 * exactly the shape the websites and marketing pages already use, referencing
 * the same `#business` @id as their provider. All three offerings are now
 * siblings in the graph under one business, which is what the site says in
 * prose. Do not reintroduce a second ProfessionalService here: two nodes
 * claiming one @id at two URLs is the one thing this arrangement exists to
 * prevent.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/lee-marketing-mastery/automation#service`,
      name: "Business Automation Systems",
      description,
      serviceType: "Business process automation",
      url: `${SITE_URL}/lee-marketing-mastery/automation`,
      provider: {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/lee-marketing-mastery#business`,
        name: "Lee Marketing Mastery",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Custom Automation Systems",
        itemListElement: [
          "Lead Generation and Prospecting",
          "Decision-Maker Research and Lead Enrichment",
          "CRM and Pipeline Automation",
          "Automated Follow-Up and Lead Nurturing",
          "Client Intake and Appointment Workflows",
          "Reporting and Operations Dashboards",
          "Custom Business Process Automation",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: lmmFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function LeeMarketingMasteryAutomationPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MainHeader />

      <main className="pt-20">
        <LmmHeroSection />
        <LmmOutcomeStrip />
        <LmmProblemSection />
        <LmmServicesSection />
        <LmmResultsSection />
        <LmmProcessSection />
        <LmmUseCasesSection />
        <LmmWhyChooseSection />
        <LmmConsultationCTA />
        <LmmFAQSection />
        <LmmFinalCTA />
      </main>

      <MainFooter />
    </div>
  );
}
