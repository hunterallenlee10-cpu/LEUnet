import Link from "next/link";
import { Shirt, ArrowUpRight } from "lucide-react";
import { traditionalServices } from "@/data/marketing";
import { MarketingServiceGrid } from "@/components/marketing/MarketingServiceGrid";
import { THREAD_SITE_URL } from "@/lib/thread-site";

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

        <MarketingServiceGrid services={traditionalServices} />

        {/* Apparel is a real capability, but it is produced by Thread rather
            than here, so it links out instead of rendering as a fourth service
            card with a details toggle that goes nowhere. Thread is its own
            site since 2026-09-25 (docs/THREAD.md), so "links out" is literal
            now; the arrow already said as much. */}
        <div className="mt-6">
          <Link
            href={THREAD_SITE_URL}
            className="group flex flex-col gap-5 rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 md:flex-row md:items-center md:p-8"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
              <Shirt className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </span>

            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold text-white">
                Branded Apparel &amp; Team Gear
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                Shirts, hats, and team gear come from Thread T-Shirts, our own
                apparel venture, rather than an outside supplier - so the
                branding stays consistent with the rest of your campaign and
                there is one less vendor in the middle.
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-amber-400">
              See Thread
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
