import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { BusinessMasterySection } from "@/components/sections/BusinessMasterySection";
import { LeeSystemsSection } from "@/components/sections/LeeSystemsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LegalSection } from "@/components/sections/LegalSection";

export default function Home() {
  return (
    <main className="w-full bg-neutral-950">
      <MainHeader />

      <HeroSection />
      <BusinessMasterySection />
      <LeeSystemsSection />

      <ContactSection />
      <LegalSection />

      <MainFooter />
    </main>
  );
}
