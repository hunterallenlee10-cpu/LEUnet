import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { LeeSystemsHeroSection } from "@/components/lee-systems/LeeSystemsHeroSection";
import { LeeSystemsTwoPathsSection } from "@/components/lee-systems/LeeSystemsTwoPathsSection";
import { LeeSystemsWebsiteVideoSection } from "@/components/lee-systems/LeeSystemsWebsiteVideoSection";
import { LeeSystemsServicesSection } from "@/components/lee-systems/LeeSystemsServicesSection";
import { LeeSystemsLiveDemoSection } from "@/components/lee-systems/LeeSystemsLiveDemoSection";
import { LeeSystemsWorkflowFilmSection } from "@/components/lee-systems/LeeSystemsWorkflowFilmSection";
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
  leeSystemsRoutes,
  serviceGroups,
} from "@/data/lee-systems";

/**
 * The Lee Systems Co. page, and since 2026-09-29 the only one: the automation
 * and websites pages folded into it, and their URLs 301 to its #automation
 * and #websites sections (next.config.mjs). It replaced the Lee Marketing
 * Mastery hub at /lee-marketing-mastery, which redirects here too.
 *
 * The order: the hero, the two paths (an example lead with and without the
 * systems), the website video (a visit to an outdated site, then to one
 * built right), what we do (the six service groups, `#services`, which
 * replaced the two offerings side by side on 2026-10-17), then the live demo of both working as one (a website catching a lead, and the
 * system handling it), the workflow film (one system running a week's calls,
 * leads, jobs and reports), who it is for, recent work, the onboarding process, the
 * FAQ, the choice between doing nothing and a free call, and the form. Every
 * "Book a free call" in the body scrolls to the form; the header's goes
 * where `bookHref` says. The two paths and the choice follow The Real World's
 * page (the owner's reference, 2026-09-29).
 */
const title = "Lee Systems Co. | AI Automation & Websites for Business Owners";
const description =
  "Lee Systems Co. builds websites that bring in customers, AI that answers calls and follows up every lead, plus marketing and content that gets you found.";

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
 * The business, its six service groups and the FAQ, all at this one URL.
 * Each group (`serviceGroups` in data/lee-systems.ts, the "What we do" cards)
 * is a Service pointing at its own card, with what it includes as an offer
 * catalogue; the Organization's catalogue lists the six. They replaced the
 * two Service nodes (automation and websites) on 2026-10-17.
 *
 * An Organization rather than a LocalBusiness type: the site publishes no
 * address or service area (the owner's call, 2026-09-28), and local-business
 * data without an address is flagged as incomplete. No rating, review or
 * price: none exist to cite.
 */
const businessNode = {
  "@type": "Organization",
  "@id": `${pageUrl}#business`,
  name: leeSystems.name,
};

const services = serviceGroups.map(({ anchor, name, outcome, items }) => ({
  "@id": `${pageUrl}#${anchor}`,
  name,
  description: outcome,
  url: `${pageUrl}#${anchor}`,
  items,
}));

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
    ...services.map(({ items, ...service }) => ({
      "@type": "Service",
      ...service,
      provider: businessNode,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.name,
        itemListElement: items.map((name) => ({
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
        <LeeSystemsServicesSection />
        <LeeSystemsLiveDemoSection />
        <LeeSystemsWorkflowFilmSection />
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
