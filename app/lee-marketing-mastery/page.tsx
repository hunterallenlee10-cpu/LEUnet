import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { HubHeroSection } from "@/components/lmm-hub/HubHeroSection";
import { HubDoorsSection } from "@/components/lmm-hub/HubDoorsSection";
import { HubCompanySection } from "@/components/lmm-hub/HubCompanySection";
import { HubRouterSection } from "@/components/lmm-hub/HubRouterSection";

/**
 * The Lee Marketing Mastery venture hub.
 *
 * WHAT THIS ROUTE USED TO BE. Until this page existed, /lee-marketing-mastery
 * was the Business Automation page - so the header dropdown row labelled "Lee
 * Marketing Mastery" delivered a visitor to one of the venture's three
 * offerings rather than to the venture. That offering now lives at
 * /lee-marketing-mastery/automation and all three sit one level below this
 * page, which is the only page on the site that is about the company.
 *
 * DELIBERATELY SHORT. Four sections, against eleven on the automation page,
 * eleven on websites and twelve on marketing. This page is not a fourth sales
 * page and must not be allowed to become one: everything that argues for a
 * particular offering belongs on that offering's page, where there is room to
 * argue properly. The things it is missing are missing on purpose -
 *
 *   No FAQ. All three deep pages carry one, and a fourth would either repeat
 *   their answers or emit a second FAQPage node competing with theirs.
 *   No form. See the header comment on HubRouterSection - the subject line on
 *   each existing form is what separates three kinds of lead in one inbox.
 *   No pricing section, no process rail, no use-case grid, no outcome strip,
 *   no portfolio. Each of those exists on all three deep pages already, and a
 *   merged version of three genuinely different processes would say nothing.
 *
 * If this page grows past about six screens, something has been added that
 * belongs one level down.
 */
const title =
  "Lee Marketing Mastery | Marketing, Websites & Business Automation";
const description =
  "Lee Marketing Mastery handles marketing, business websites and custom automation for owners who would rather have the work done than manage it. Three offerings, each scoped and quoted on its own - take one, or take all three.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "small business marketing company",
    "marketing websites and automation",
    "done for you marketing",
    "business website design",
    "business automation systems",
    "local marketing agency",
  ],
  alternates: {
    canonical: "/lee-marketing-mastery",
  },
  openGraph: {
    type: "website",
    url: "/lee-marketing-mastery",
    title,
    description,
    images: [
      {
        url: "/og/lee-marketing-mastery.png",
        width: 1200,
        height: 630,
        alt: "Lee Marketing Mastery - marketing, websites and business automation",
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
 * This page is the SOLE definer of the `#business` ProfessionalService node.
 *
 * All three offering pages emit a `Service` node whose `provider` references
 * `.../lee-marketing-mastery#business` by @id. That node used to be defined by
 * the automation page, because the automation page owned this URL; a node's
 * @id has to be the URL that actually describes it, so it moved here when the
 * URL did. Two pages defining one @id is the failure this arrangement exists to
 * prevent - if a ProfessionalService ever needs adding elsewhere, it needs a
 * different @id, not a copy of this one.
 *
 * `hasOfferCatalog` lists the three offerings as bare @id references - no name,
 * no description, no catalogue of its own. Each Service node already carries all
 * of that at the URL that defines it, and restating any of it here would create
 * a second place for it to go stale. It already had: this block briefly carried
 * its own names for the three, and all three disagreed with the names the deep
 * pages give the same @ids ("Traditional and Digital Marketing" there against
 * "Traditional & Digital Marketing" here, "Websites Built to Convert" against
 * "Websites That Convert"). A reference resolves to whatever the owning page
 * says, which is the behaviour worth having.
 *
 * No FAQPage node: the hub renders no FAQ. No aggregateRating, no review, no
 * areaServed - none of the three is substantiated anywhere on this site.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/lee-marketing-mastery#business`,
      name: "Lee Marketing Mastery",
      description,
      url: `${SITE_URL}/lee-marketing-mastery`,
      parentOrganization: {
        "@type": "Organization",
        name: "Lee Enterprises Unlimited",
        url: SITE_URL,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Lee Marketing Mastery Offerings",
        itemListElement: [
          `${SITE_URL}/lee-marketing-mastery/marketing#service`,
          `${SITE_URL}/lee-marketing-mastery/websites#service`,
          `${SITE_URL}/lee-marketing-mastery/automation#service`,
        ].map((id) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", "@id": id },
        })),
      },
    },
  ],
};

export default function LeeMarketingMasteryHubPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MainHeader />

      <main className="pt-20">
        <HubHeroSection />
        <HubDoorsSection />
        <HubCompanySection />
        <HubRouterSection />
      </main>

      <MainFooter />
    </div>
  );
}
