import type { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { LegalSection } from "@/components/sections/LegalSection";
import { companyInfo } from "@/data/company";

const title = `Privacy Policy & Terms of Service | ${companyInfo.name}`;
const description = `Privacy Policy and Terms of Service for ${companyInfo.name}.`;

// Its own share card, not the homepage's. This openGraph replaces the root
// layout's, so it carries the image itself.
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/legal",
  },
  openGraph: {
    type: "website",
    url: "/legal",
    title,
    description,
    images: [
      {
        url: "/logos/leu-logo.png",
        width: 512,
        height: 512,
        alt: "Lee Enterprises Unlimited Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

// The legal text used to sit at the bottom of the homepage. It lives here now,
// reached from the footer's Legal links.
export default function LegalPage() {
  return (
    <main className="w-full bg-neutral-950">
      <MainHeader />
      <LegalSection />
      <MainFooter />
    </main>
  );
}
