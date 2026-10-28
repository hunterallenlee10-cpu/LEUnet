import type { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import {
  FINAL_CTA_ID,
  HERO_CTA_ID,
  HardestWorkerCta,
  HardestWorkerExpectations,
  HardestWorkerFaq,
  HardestWorkerForWho,
  HardestWorkerHero,
  HardestWorkerHow,
  HardestWorkerMethod,
  HardestWorkerOffer,
  HardestWorkerWho,
  HardestWorkerWhy,
} from "@/components/hardest-worker/HardestWorkerSections";
import { StickyCta } from "@/components/hardest-worker/StickyCta";
import {
  COPY,
  CTA_HREF,
  LAST_UPDATED,
  META,
  PAGE_URL,
  PERSON,
  PUBLISHED,
  SITE_URL,
  breadcrumbs,
  faqItems,
} from "@/data/hardest-worker";

/**
 * /hardest-worker-in-maryland: one page built to rank first on Google for
 * the exact phrase "hardest worker in Maryland", and a fun sales page for
 * getting a business ranked higher on Google (data/hardest-worker.ts says
 * why and holds every word). It talks about itself only. Linked from the
 * footer only, never the header nav. The share image is the route's
 * opengraph-image.tsx.
 */
export const metadata: Metadata = {
  title: { absolute: META.title },
  description: META.description,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: PAGE_URL,
    title: META.title,
    description: META.description,
    siteName: PERSON.org,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
  },
};

const personId = `${PAGE_URL}#person`;

/**
 * WebPage, Person, FAQPage and BreadcrumbList. The FAQ text is the same
 * `faqItems()` the accordion renders, so the two can't disagree. No photo,
 * city, rating or review: the owner keeps the first two off this page, and
 * none of the others exist to cite.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: META.title,
      description: META.description,
      inLanguage: "en-US",
      datePublished: PUBLISHED,
      dateModified: LAST_UPDATED,
      about: { "@id": personId },
      isPartOf: { "@type": "WebSite", url: SITE_URL, name: PERSON.org },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: PERSON.name,
      jobTitle: PERSON.jobTitle,
      description: PERSON.description,
      url: PAGE_URL,
      worksFor: { "@type": "Organization", name: PERSON.org, url: SITE_URL },
      address: {
        "@type": "PostalAddress",
        addressRegion: "MD",
        addressCountry: "US",
      },
      sameAs: [PERSON.instagram],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: faqItems().map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.href === "/" ? SITE_URL : `${SITE_URL}${crumb.href}`,
      })),
    },
  ],
};

export default function HardestWorkerPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <MainHeader />

      <main className="pt-20">
        <HardestWorkerHero />
        <HardestWorkerWho />
        <HardestWorkerWhy />
        <HardestWorkerHow />
        <HardestWorkerMethod />
        <HardestWorkerOffer />
        <HardestWorkerExpectations />
        <HardestWorkerForWho />
        <HardestWorkerFaq />
        <HardestWorkerCta />
      </main>

      <MainFooter />

      <StickyCta
        href={CTA_HREF}
        label={COPY.sticky.label}
        showAfterId={HERO_CTA_ID}
        hideAtId={FINAL_CTA_ID}
      />
    </div>
  );
}
