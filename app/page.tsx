import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { VentureDetailSection } from "@/components/sections/VentureDetailSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LegalSection } from "@/components/sections/LegalSection";
import { ventures } from "@/data/ventures";

export default function Home() {
  return (
    <main className="w-full bg-neutral-950">
      <MainHeader />

      <HeroSection />
      <AboutSection />
      <PortfolioSection />

      {ventures.map((venture) => (
        <VentureDetailSection key={venture.id} venture={venture} />
      ))}

      <ContactSection />
      <LegalSection />

      <MainFooter />
    </main>
  );
}
