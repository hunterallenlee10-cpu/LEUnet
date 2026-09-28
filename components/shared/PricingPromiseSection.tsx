import { Check } from "lucide-react";
import { pricingPromise } from "@/data/lee-systems";

/**
 * "No surprises on price." One slim band with the owner's five offer terms:
 * a row on desktop, a stack on a phone. On the industry pages (the homepage's
 * copy gave way to the tool strip on 2026-09-28, at the owner's request).
 */
export function PricingPromiseSection() {
  return (
    <section
      aria-labelledby="pricing-promise-title"
      className="border-b border-white/[0.08]"
    >
      <div className="section-container flex flex-col gap-5 py-10 md:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <h2
          id="pricing-promise-title"
          className="shrink-0 text-2xl font-bold text-white md:text-3xl"
        >
          No surprises on price.
        </h2>
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3 lg:justify-end">
          {pricingPromise.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-neutral-200">
              <Check className="h-4 w-4 shrink-0 text-brass-300" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
