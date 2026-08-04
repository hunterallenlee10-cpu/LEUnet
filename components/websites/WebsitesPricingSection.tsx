"use client";

import { ArrowRight, FileText, Layers, Workflow, Repeat } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";

/**
 * No prices, by decision - see docs/WEBSITES.md. Rather than showing a number
 * this section explains what a quote is built from, so a visitor can estimate
 * where they land before they ever talk to us.
 *
 * The factors are deliberately stated as scope - how much site, and what the
 * site has to accomplish - never as production time saved. "The build is
 * shorter" and the Zap icon both priced the work by speed, which is the one axis
 * this page does not compete on. Keep the answer to "what does it cost" tied to
 * what the finished site does.
 */
const factors = [
  {
    Icon: Layers,
    title: "How many pages",
    detail:
      "One focused page and a page for every service, town, and campaign are different amounts of work.",
  },
  {
    Icon: FileText,
    title: "Whether content exists",
    detail:
      "If copy, photos, and branding are ready, there is less to produce. If not, we write and shoot what the pages need.",
  },
  {
    Icon: Workflow,
    title: "What it has to do",
    detail:
      "A site that captures form fills, one that books appointments, and one that answers questions at 11pm are different builds.",
  },
  {
    Icon: Repeat,
    title: "What happens after launch",
    detail:
      "A care plan is priced monthly and separately. Skipping it does not change the build price.",
  },
];

export function WebsitesPricingSection() {
  return (
    <section className="bg-gradient-to-b from-neutral-950 to-amber-950/[0.06] py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Pricing
          </p>
          <h2 className="heading-lg mb-6 text-white">
            Every Project Is Quoted, Not Packaged.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            We do not publish a universal price, because a single focused page
            for a new business and a rebuild that books appointments and follows
            up on its own are not the same project. Four things decide what a
            build costs, and all four come down to how much site you need and
            what it has to accomplish.
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
          <button
            onClick={() =>
              smoothScrollToElement("website-inquiry-form", { focus: true })
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
