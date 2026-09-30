import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { LeeSystemsHeroSection } from "@/components/lee-systems/LeeSystemsHeroSection";
import { LeeSystemsTwoPathsSection } from "@/components/lee-systems/LeeSystemsTwoPathsSection";
import { LeeSystemsWebsiteVideoSection } from "@/components/lee-systems/LeeSystemsWebsiteVideoSection";
import { LeeSystemsOfferingsSection } from "@/components/lee-systems/LeeSystemsOfferingsSection";
import { ExamplesSeam } from "@/components/lee-systems/ExamplesSeam";
import { LeeSystemsLiveDemoSection } from "@/components/lee-systems/LeeSystemsLiveDemoSection";
import { LeeSystemsIndustriesSection } from "@/components/lee-systems/LeeSystemsIndustriesSection";
import { RecentWorkSection } from "@/components/shared/RecentWorkSection";
import { LeeSystemsOnboardingSection } from "@/components/lee-systems/LeeSystemsOnboardingSection";
import { LeeSystemsFAQSection } from "@/components/lee-systems/LeeSystemsFAQSection";
import { LeeSystemsChoiceSection } from "@/components/lee-systems/LeeSystemsChoiceSection";
import { LeeSystemsContactSection } from "@/components/lee-systems/LeeSystemsContactSection";
import { SITE_URL } from "@/data/company";
import {
  leeSystems,
  leeSystemsFaqs,
  leeSystemsLinks,
  leeSystemsRoutes,
} from "@/data/lee-systems";

/**
 * The Lee Systems Co. page, and since 2026-09-29 the only one: the automation
 * and websites pages folded into it, and their URLs 301 to its #automation
 * and #websites sections (next.config.mjs). It replaced the Lee Marketing
 * Mastery hub at /lee-marketing-mastery, which redirects here too.
 *
 * The order: the hero, the two paths (an example lead with and without the
 * systems), the website video (a visit to an outdated site, then to one
 * built right), the two offerings side by side at equal weight, then the
 * live demo of both working as one (a website catching a lead, and the
 * system handling it), opening off the offerings' spine as it scrolls in
 * (ExamplesSeam), who it is for, recent work, the onboarding process, the
 * FAQ, the choice between doing nothing and a free call, and the form. Every
 * "Book a free call" in the body scrolls to the form; the header's goes
 * where `bookHref` says. The two paths and the choice follow The Real World's
 * page (the owner's reference, 2026-09-29).
 */
const title = "Lee Systems Co. | AI Automation & Websites for Business Owners";
const description =
  "Lee Systems Co. builds AI systems that answer your calls and new leads, handle intake and send follow-ups, plus websites built to bring in leads.";

/** The page's one canonical URL, on the www host. */
const pageUrl = `${SITE_URL}${leeSystemsRoutes.home}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
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
 * The business, the two services it sells and the FAQ, all at this one URL.
 * The two `Service` nodes used to live on the automation and websites pages;
 * they keep their names, descriptions and catalogues, and point at their
 * sections here.
 *
 * An Organization rather than a LocalBusiness type: the site publishes no
 * address or service area (the owner's call, 2026-09-28), and local-business
 * data without an address is flagged as incomplete. No rating or review: none
 * exist to cite.
 */
const businessNode = {
  "@type": "Organization",
  "@id": `${pageUrl}#business`,
  name: leeSystems.name,
};

const services = [
  {
    "@id": `${pageUrl}#service-automation`,
    name: "Business Automation",
    description:
      "AI call answering, instant lead replies, intake, follow-ups and review requests, built around the tools you already use. Start with a free call.",
    serviceType: "Business process automation",
    url: `${SITE_URL}${leeSystemsLinks.automation}`,
    catalog: "Automation Systems",
    offers: [
      "AI Call Answering",
      "Lead Response Automation",
      "Sales Follow-Up Automation",
      "Client Intake and Communication",
      "Review and Referral Requests",
      "Billing Reminders",
      "Internal Operations Automation",
    ],
  },
  {
    "@id": `${pageUrl}#service-websites`,
    name: "Website Builds",
    description:
      "Conversion-focused websites for businesses. Mobile-first, fast, lead forms, basic SEO, and you own it. Free quotes from Lee Systems Co.",
    serviceType: "Website design and development",
    url: `${SITE_URL}${leeSystemsLinks.websites}`,
    catalog: "Website Services",
    offers: ["New Website Builds", "Website Redesigns", "Ongoing Care Plans"],
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...businessNode,
      description,
      url: pageUrl,
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
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", "@id": service["@id"] },
        })),
      },
    },
    ...services.map(({ catalog, offers, ...service }) => ({
      "@type": "Service",
      ...service,
      provider: businessNode,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: catalog,
        itemListElement: offers.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    })),
    {
      "@type": "FAQPage",
      mainEntity: leeSystemsFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
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
        <LeeSystemsTwoPathsSection />
        <LeeSystemsWebsiteVideoSection />
        <LeeSystemsOfferingsSection />
        <ExamplesSeam>
          <LeeSystemsLiveDemoSection />
        </ExamplesSeam>
        <LeeSystemsIndustriesSection />
        <RecentWorkSection />
        <LeeSystemsOnboardingSection />
        <LeeSystemsFAQSection />
        <LeeSystemsChoiceSection />
        <LeeSystemsContactSection />
      </main>

      <MainFooter />
    </div>
  );
}
