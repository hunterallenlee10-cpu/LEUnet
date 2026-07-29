import { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { getVentureById } from "@/data/ventures";
import { PelicanHeroSection } from "@/components/pelican/PelicanHeroSection";
import { PelicanServicesSection } from "@/components/pelican/PelicanServicesSection";
import { PelicanBeforeAfterSection } from "@/components/pelican/PelicanBeforeAfterSection";
import { PelicanWhyChooseSection } from "@/components/pelican/PelicanWhyChooseSection";
import { PelicanEquipmentSection } from "@/components/pelican/PelicanEquipmentSection";
import { PelicanProcessSection } from "@/components/pelican/PelicanProcessSection";
import { PelicanPricingSection } from "@/components/pelican/PelicanPricingSection";
import { PelicanServiceAreasSection } from "@/components/pelican/PelicanServiceAreasSection";
import { PelicanTestimonialsSection } from "@/components/pelican/PelicanTestimonialsSection";
import { PelicanCTASection } from "@/components/pelican/PelicanCTASection";

export const metadata: Metadata = {
  title: "Pelican Power Wash | Professional Exterior Cleaning",
  description:
    "Professional power washing and exterior cleaning services for residential and commercial properties. Get a free quote today!",
  keywords: [
    "power washing",
    "pressure washing",
    "exterior cleaning",
    "property cleaning",
    "commercial cleaning",
  ],
};

export default function PelicanPage() {
  const venture = getVentureById("pelican");

  if (!venture) {
    return <div>Venture not found</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <MainHeader />

      <main className="pt-20">
        <PelicanHeroSection venture={venture} />
        <PelicanServicesSection venture={venture} />
        <PelicanBeforeAfterSection venture={venture} />
        <PelicanWhyChooseSection venture={venture} />
        <PelicanEquipmentSection venture={venture} />
        <PelicanProcessSection venture={venture} />
        <PelicanPricingSection venture={venture} />
        <PelicanServiceAreasSection venture={venture} />
        <PelicanTestimonialsSection venture={venture} />
        <PelicanCTASection venture={venture} />
      </main>

      <MainFooter />
    </div>
  );
}
