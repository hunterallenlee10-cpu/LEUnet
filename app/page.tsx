import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { BusinessMasterySection } from "@/components/sections/BusinessMasterySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LegalSection } from "@/components/sections/LegalSection";

export default function Home() {
  return (
    <main className="w-full bg-neutral-950">
      <MainHeader />

      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <BusinessMasterySection />

      <ContactSection />
      <LegalSection />

      <MainFooter />
    </main>
  );
}
