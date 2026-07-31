"use client";

import { ArrowRight, Lightbulb, Newspaper, Radio, Tv, Users } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";

/**
 * Deliberately framed as reachable through a network rather than as a standing
 * service. Billboards, TV, radio, and sponsorships are brokered, not produced
 * in house, and the copy says so - listing them as offerings alongside print
 * and paid ads would overstate what is on the shelf.
 */
const reachable = [
  { Icon: Newspaper, label: "Billboards" },
  { Icon: Tv, label: "TV spots" },
  { Icon: Radio, label: "Radio" },
  { Icon: Users, label: "Sponsorships" },
];

export function MarketingCustomIdeasSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="section-container">
        <div className="mx-auto max-w-4xl rounded-xl border border-amber-400/30 bg-gradient-to-b from-amber-400/[0.07] to-transparent p-8 text-center md:p-12">
          <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10">
            <Lightbulb className="h-6 w-6 text-amber-400" aria-hidden="true" />
          </span>

          <h2 className="heading-lg mb-6 text-white">
            Have a Unique Idea to Market Your Business?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Contact us and we will make your dream come true. From billboards,
            to TV ads, to sponsorships - we have the network to make it happen.
          </p>

          <ul className="mx-auto mb-9 flex max-w-2xl flex-wrap justify-center gap-2.5">
            {reachable.map(({ Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-300"
              >
                <Icon className="h-4 w-4 text-amber-400" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <button
            onClick={() =>
              smoothScrollToElement("marketing-inquiry-form", { focus: true })
            }
            className="btn-primary inline-flex items-center justify-center gap-2 group"
          >
            Tell Us Your Idea
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <p className="mt-6 text-sm text-neutral-500">
            If it is something we cannot deliver, we will tell you that instead
            of taking the project.
          </p>
        </div>
      </div>
    </section>
  );
}
