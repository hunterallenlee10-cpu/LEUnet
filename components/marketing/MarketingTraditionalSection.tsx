import { traditionalServices } from "@/data/marketing";
import { MarketingServiceGrid } from "@/components/marketing/MarketingServiceGrid";

export function MarketingTraditionalSection() {
  return (
    <section className="border-y border-white/10 bg-neutral-950/60 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Traditional Marketing
          </p>
          <h2 className="heading-lg mb-6 text-white">
            The Kind of Advertising People Can Actually Touch.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            Print, signage, and vehicles still work, especially for local
            businesses, because they reach people who are not searching yet.
            We design them so they match everything you are doing online.
          </p>
        </div>

        {/* The three services and nothing after them. A link-out card for
            branded apparel sat below this grid until the venture it pointed
            at came off this site on 2026-09-25 (docs/MARKETING.md). */}
        <MarketingServiceGrid services={traditionalServices} />
      </div>
    </section>
  );
}
