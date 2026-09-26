import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { VenturesSection } from "@/components/sections/VenturesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LegalSection } from "@/components/sections/LegalSection";

export default function Home() {
  return (
    <main className="w-full bg-neutral-950">
      <MainHeader />

      <HeroSection />
      <VenturesSection />

      <ContactSection />
      <LegalSection />

      <MainFooter />
    </main>
  );
}
