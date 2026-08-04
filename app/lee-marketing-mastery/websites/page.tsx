import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { WebsitesHeroSection } from "@/components/websites/WebsitesHeroSection";
import { WebsitesOutcomeStrip } from "@/components/websites/WebsitesOutcomeStrip";
import { WebsitesShiftSection } from "@/components/websites/WebsitesShiftSection";
import { WebsitesProblemSection } from "@/components/websites/WebsitesProblemSection";
import { WebsitesServicesSection } from "@/components/websites/WebsitesServicesSection";
import { WebsitesWorkSection } from "@/components/websites/WebsitesWorkSection";
import { WebsitesProcessSection } from "@/components/websites/WebsitesProcessSection";
import { WebsitesPricingSection } from "@/components/websites/WebsitesPricingSection";
import { WebsitesInquiryCTA } from "@/components/websites/WebsitesInquiryCTA";
import { WebsitesFAQSection } from "@/components/websites/WebsitesFAQSection";
import { WebsitesFinalCTA } from "@/components/websites/WebsitesFinalCTA";
import { websiteFaqs, websitePortfolio } from "@/data/websites";

/**
 * The title and description sell the job the finished site does, not how it was
 * produced. The previous pair led with "Built with AI", which put this page in
 * the same search results as consumer site builders and invited the reader to
 * ask why they would not just do it themselves. A buyer comparing us to a tool
 * is a buyer we lose on price; a buyer comparing us to their current site that
 * is not producing calls is the one this page is written for.
 *
 * This description string is reused verbatim by openGraph, twitter, and the
 * Service node in structured data below, so it has to stand on its own as a
 * one-sentence answer to "what is this" in all three places - and it has to
 * clear the bar the Service node sets, since a crawler reads it as a claim
 * about the business. It listed "lead capture that answers after hours" as
 * though that were already running somewhere. It is an offering, quoted per
 * project like the rest, and docs/WEBSITES.md section 7 still has the pieces it
 * depends on marked unconfirmed. The list now names what is sold, and the
 * closing clause says how it is sold. Keep it that way in all three consumers.
 */
const title =
  "Websites Built to Turn Visitors Into Customers | Lee Marketing Mastery";
const description =
  "Lee Marketing Mastery builds business websites around one job: turning a visitor into a customer. New builds, redesigns, lead capture and follow-up, and ongoing care plans - each scoped and quoted per project.";

export const metadata: Metadata = {
  title,
  description,
  /**
   * "AI website design" and "AI website builder" were removed rather than
   * reworded. They rank us against people shopping for the cheapest way to
   * generate a site, which is the opposite of the buyer described above. What
   * replaced them is what an owner types when their current site is not
   * bringing in work.
   */
  keywords: [
    "website design that converts",
    "professional business website",
    "website redesign",
    "small business web design",
    "lead generation website",
    "conversion focused web design",
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
        alt: "Lee Marketing Mastery - Websites Built to Turn Visitors Into Customers",
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
      name: "Websites Built to Convert",
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
        /**
         * These four mirror the card titles rendered by
         * WebsitesServicesSection one for one, so the markup a crawler reads
         * matches the page a person reads. The third entry was "AI Features and
         * Lead Capture", which named the technology instead of the result. The
         * same offering is also a menu option in WebsitesInquiryForm, which
         * carried a third name for a while - all three read "Never Miss a Lead"
         * now. If a card is ever retitled, retitle it here and in that form too.
         */
        itemListElement: [
          "New Website Builds",
          "Website Redesigns",
          "Never Miss a Lead",
          "Ongoing Care Plans",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "ItemList",
      // Named the same way the section itself names them: these are Lee
      // Enterprises Unlimited's own ventures, not client work. The rendered
      // copy says so plainly, and the markup must not imply otherwise.
      // This is a JSON string, not JSX, so no HTML entities here - they would
      // be served literally to a crawler.
      name: "Lee Enterprises Unlimited ventures - websites we built and run",
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
        {/* The market-shift section sits ahead of the offer on purpose: the
            reader has to understand why their current site stopped producing
            calls before the services below read as anything but a price list. */}
        <WebsitesShiftSection />
        <WebsitesProblemSection />
        <WebsitesServicesSection />
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
