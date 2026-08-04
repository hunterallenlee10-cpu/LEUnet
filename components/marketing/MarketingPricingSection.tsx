"use client";

import { ArrowRight, Layers, Package, Repeat, Wallet } from "lucide-react";
import { LmmMark } from "@/components/lmm/LmmMark";
import { smoothScrollToElement } from "@/lib/scrollUtils";

/**
 * No prices, matching the automation and websites pages. The channels price on
 * genuinely different models - print is per piece, ad management is monthly, a
 * wrap is one time - so a single number would be meaningless rather than merely
 * imprecise.
 */
const factors = [
  {
    Icon: Layers,
    title: "Which channels",
    detail:
      "One mailer and a yard sign is a different project than a full mix across print, search, social, and paid.",
  },
  {
    Icon: Package,
    title: "Print quantities",
    detail:
      "Print is priced per piece and the per-piece cost drops sharply at volume. 250 postcards and 5,000 are not proportional.",
  },
  {
    Icon: Repeat,
    title: "One-time or ongoing",
    detail:
      "A vehicle wrap is paid once. Ad management and social are monthly. Most mixes are some of both.",
  },
  {
    Icon: Wallet,
    title: "Ad budget",
    detail:
      "Paid ad spend goes to the platforms directly, in your name. That is separate from what we charge to manage it.",
  },
];

export function MarketingPricingSection() {
  return (
    <section className="bg-gradient-to-b from-neutral-950 to-amber-950/[0.06] py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Pricing
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Quoted by Channel, Not Sold as a Bundle.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            We do not publish a monthly retainer, because these channels price
            on completely different models. Four things determine what a
            campaign costs.
          </p>
        </div>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {factors.map(({ Icon, title, detail }) => (
            <li
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
                <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
              </span>
              <h3 className="mb-2 font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {detail}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          {/* The quote is the promise this section makes, so the mark goes
              above the button that asks for it - the same signature the
              automation page puts on its closing panel. */}
          <LmmMark size="md" className="mx-auto mb-6" />
          <button
            onClick={() =>
              smoothScrollToElement("marketing-inquiry-form", { focus: true })
            }
            className="btn-primary inline-flex items-center justify-center gap-2 group"
          >
            Get a Free Quote
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
          <p className="mt-4 text-sm text-neutral-500">
            Quotes are free and carry no obligation.
          </p>
        </div>
      </div>
    </section>
  );
}
