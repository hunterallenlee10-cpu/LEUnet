import type { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { VenturesSection } from "@/components/sections/VenturesSection";
import { ContactSection } from "@/components/sections/ContactSection";

const title = "Lee Enterprises Unlimited";

// The canonical and og:url live here rather than in the root layout, where
// every page without its own would inherit them and point at the homepage.
// This openGraph replaces the root one, so it repeats the image.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description:
      "A premium business portfolio dedicated to excellence: LEU Business Mastery and Lee Systems Co.",
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
    description: "Premium business portfolio: LEU Business Mastery and Lee Systems Co.",
  },
};

export default function Home() {
  return (
    <main className="w-full bg-neutral-950">
      <MainHeader />

      <HeroSection />
      <VenturesSection />

      <ContactSection />

      <MainFooter />
    </main>
  );
}
