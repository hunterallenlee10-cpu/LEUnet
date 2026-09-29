import Link from "next/link";
import { CarFront, Dumbbell, Home, KeyRound, Scale, UtensilsCrossed } from "lucide-react";
import {
  industryInSentence,
  leeSystemsIndustries,
  moreIndustries,
  otherIndustriesLine,
} from "@/data/lee-systems";

const industryIcons = {
  "law-firms": Scale,
  "home-services": Home,
  "real-estate": KeyRound,
  fitness: Dumbbell,
  dealerships: CarFront,
  restaurants: UtensilsCrossed,
} as const;

/** Law firms and home services first (they have pages), then the rest. */
const industries = [...leeSystemsIndustries, ...moreIndustries];

/**
 * Example industries, each with the automations built for them; the two with
 * their own page link to it. The heading frames them as examples, not the only
 * businesses served (the owner's request, 2026-09-29); other industries get
 * one line rather than cards with nothing specific to say.
 */
export function AutomationIndustriesSection() {
  return (
    <section id="industries" className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            Who we help
          </p>
          <h2 className="heading-lg text-white">
            For example, we help businesses like these
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const { id, name, summary, examples } = industry;
            const page = "page" in industry ? industry.page : null;
            const Icon = industryIcons[id];
            return (
              <div
                key={id}
                id={id}
                className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="h-7 w-7 text-brass-300" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-white">{name}</h3>
                </div>
                <p className="mb-5 text-neutral-300">{summary}</p>
                <ul className="space-y-2.5 border-t border-white/10 pt-5">
                  {examples.map((example) => (
                    <li
                      key={example}
                      className="flex items-start gap-2.5 text-sm text-neutral-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brass-400"
                      />
                      {example}
                    </li>
                  ))}
                </ul>
                {page && (
                  <Link
                    href={page.href}
                    className="mt-auto inline-flex min-h-11 items-center self-start pt-4 text-sm font-semibold text-brass-300 underline-offset-4 hover:underline"
                  >
                    See the page for {industryInSentence(name)}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-neutral-300">
          {otherIndustriesLine}
        </p>
      </div>
    </section>
  );
}
