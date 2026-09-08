import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { BusinessMasterySection } from "@/components/sections/BusinessMasterySection";
import { MarketingMasterySection } from "@/components/sections/MarketingMasterySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LegalSection } from "@/components/sections/LegalSection";

export default function Home() {
  return (
    <main className="w-full bg-neutral-950">
      <MainHeader />

      <HeroSection />
      <AboutSection />
      <BusinessMasterySection />
      <MarketingMasterySection />

      <ContactSection />
      <LegalSection />

      <MainFooter />
    </main>
  );
}
