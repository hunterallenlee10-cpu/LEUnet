import { digitalServices } from "@/data/marketing";
import { MarketingServiceGrid } from "@/components/marketing/MarketingServiceGrid";

export function MarketingDigitalSection() {
  return (
    <section
      id="marketing-services"
      className="scroll-mt-24 bg-gradient-to-b from-neutral-950 to-amber-950/[0.06] py-20 md:py-28"
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Digital Marketing
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Reach People Where They Already Spend Their Attention.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Search, paid ads, social, and email, plus the branding that keeps
            them all looking like the same business. Take one or take the set.
          </p>
        </div>

        <MarketingServiceGrid services={digitalServices} />
      </div>
    </section>
  );
}
