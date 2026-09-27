import { MainHeader } from "@/components/layout/MainHeader";
import { MainFooter } from "@/components/layout/MainFooter";
import { LegalSection } from "@/components/sections/LegalSection";
import { companyInfo } from "@/data/company";

export const metadata = {
  title: `Privacy Policy & Terms of Service | ${companyInfo.name}`,
  description: `Privacy Policy and Terms of Service for ${companyInfo.name}.`,
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
