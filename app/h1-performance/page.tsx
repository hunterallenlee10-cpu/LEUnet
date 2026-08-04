import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { H1_PALETTE, H1_PHONE, h1Coaches, h1Faqs, h1Packages } from "@/data/h1";
import { H1HeroSection } from "@/components/h1/H1HeroSection";
import { H1ResultsStrip } from "@/components/h1/H1ResultsStrip";
import { H1ProblemSection } from "@/components/h1/H1ProblemSection";
import { H1ProgramSection } from "@/components/h1/H1ProgramSection";
import { H1CoachesSection } from "@/components/h1/H1CoachesSection";
import { H1ProcessSection } from "@/components/h1/H1ProcessSection";
import { H1PricingSection } from "@/components/h1/H1PricingSection";
import { H1TestimonialsSection } from "@/components/h1/H1TestimonialsSection";
import { H1FAQSection } from "@/components/h1/H1FAQSection";
import { H1ConsultationForm } from "@/components/h1/H1ConsultationForm";
import { H1CTASection } from "@/components/h1/H1CTASection";

const title = "H1 Performance | Remote Strength & Conditioning for Athletes";
const description =
  "Personalized remote strength and conditioning for athletes of any age and any sport. Custom 4-week training blocks, nutrition and supplement research, and round-the-clock access to your coaches.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "athlete strength and conditioning",
    "remote strength training",
    "online athletic training program",
    "speed and power training",
    "baseball strength training",
    "youth athlete training program",
    "custom workout programming",
  ],
  alternates: {
    canonical: "/h1-performance",
  },
  openGraph: {
    type: "website",
    url: "/h1-performance",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const SITE_URL = "https://leeenterprisesunlimited.com";

/**
 * Same restraint as the other venture pages: structured data covers only what
 * the site can substantiate - who provides the service, the two packages priced
 * on the page, the coaches, and the FAQ rendered below. No ratings and no
 * review counts, because there are no published reviews yet.
 *
 * The Committed package carries no `offers` entry while its price is null -
 * an Offer without a price is worse than no Offer at all.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/h1-performance#service`,
      name: "H1 Performance Strength & Conditioning",
      description,
      serviceType: "Remote athletic strength and conditioning coaching",
      url: `${SITE_URL}/h1-performance`,
      telephone: H1_PHONE,
      areaServed: "US",
      provider: {
        "@type": "Organization",
        "@id": `${SITE_URL}/h1-performance#business`,
        name: "H1 Performance",
        telephone: H1_PHONE,
        parentOrganization: {
          "@type": "Organization",
          name: "Lee Enterprises Unlimited",
          url: SITE_URL,
        },
        employee: h1Coaches.map(({ name, role }) => ({
          "@type": "Person",
          name,
          jobTitle: role,
        })),
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Training Packages",
        itemListElement: h1Packages.map((pkg) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: pkg.name },
          ...(pkg.price
            ? {
                price: pkg.price.replace(/[^0-9.]/g, ""),
                priceCurrency: "USD",
              }
            : {}),
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: h1Faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function H1PerformancePage() {
  return (
    <div
      className="min-h-screen"
      // The palette reaches the `.h1-*` and `.h1c-*` rules in globals.css
      // through these, so no stylesheet holds a second copy of a colour that
      // could survive an edit to H1_PALETTE.
      style={
        {
          backgroundColor: H1_PALETTE.ink,
          "--h1c-gold": H1_PALETTE.gold,
          "--h1c-ink": H1_PALETTE.ink,
        } as CSSProperties
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MainHeader />

      <main className="pt-20">
        <H1HeroSection />
        <H1ResultsStrip />
        <H1ProblemSection />
        <H1ProgramSection />
        <H1CoachesSection />
        <H1ProcessSection />
        <H1PricingSection />
        <H1TestimonialsSection />
        <H1FAQSection />
        <H1ConsultationForm />
        <H1CTASection />
      </main>

      <MainFooter />
    </div>
  );
}
