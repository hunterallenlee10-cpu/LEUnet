import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { AutomationHeroSection } from "@/components/automation/AutomationHeroSection";
import { AutomationProblemSection } from "@/components/automation/AutomationProblemSection";
import { AutomationServicesSection } from "@/components/automation/AutomationServicesSection";
import { AutomationIndustriesSection } from "@/components/automation/AutomationIndustriesSection";
import { AutomationProcessSection } from "@/components/automation/AutomationProcessSection";
import { AutomationFAQSection } from "@/components/automation/AutomationFAQSection";
import { AutomationAuditCTA } from "@/components/automation/AutomationAuditCTA";
import { SITE_URL } from "@/data/company";
import { automationFaqs, leeSystems, leeSystemsRoutes } from "@/data/lee-systems";

const title = "Business Automation for Service Businesses | Lee Systems Co.";
const description =
  "Lee Systems Co. builds custom automation that answers new leads, handles intake, sends follow-ups, requests reviews and clears out admin work. Start with a free Automation Audit. Based in Frederick, Maryland.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "business automation",
    "small business automation",
    "law firm intake automation",
    "home services automation",
    "lead follow-up automation",
    "n8n automation",
    "Frederick Maryland automation",
  ],
  alternates: {
    canonical: leeSystemsRoutes.automation,
  },
  openGraph: {
    type: "website",
    url: leeSystemsRoutes.automation,
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
 * A `Service` whose provider is the `#business` node the Lee Systems main page
 * defines. Only the main page defines that node; this page refers to it by @id
 * so there is one description of the business, at the URL that describes it.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}${leeSystemsRoutes.automation}#service`,
      name: "Business Automation",
      description,
      serviceType: "Business process automation",
      url: `${SITE_URL}${leeSystemsRoutes.automation}`,
      areaServed: [
        { "@type": "State", name: leeSystems.region },
        { "@type": "Country", name: "United States" },
      ],
      provider: {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}${leeSystemsRoutes.home}#business`,
        name: leeSystems.name,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Automation Systems",
        itemListElement: [
          "Lead Response Automation",
          "Sales Follow-Up Automation",
          "Client Intake and Communication",
          "Review and Referral Requests",
          "Billing Reminders",
          "Internal Operations Automation",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: automationFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function LeeSystemsAutomationPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MainHeader />

      <main className="pt-20">
        <AutomationHeroSection />
        <AutomationProblemSection />
        <AutomationServicesSection />
        <AutomationIndustriesSection />
        <AutomationProcessSection />
        <AutomationFAQSection />
        <AutomationAuditCTA />
      </main>

      <MainFooter />
    </div>
  );
}
