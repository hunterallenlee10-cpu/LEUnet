import Link from "next/link";
import { Scale, Home } from "lucide-react";
import { leeSystemsIndustries, otherIndustriesLine } from "@/data/lee-systems";

const industryIcons = {
  "law-firms": Scale,
  "home-services": Home,
} as const;

/**
 * The two industries the owner knows best, each with the automations built
 * for them and a link to its own page. Other industries get one line rather
 * than cards with nothing specific to say.
 */
export function AutomationIndustriesSection() {
  return (
    <section id="industries" className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            Industries we know best
          </p>
          <h2 className="heading-lg text-white">
            Built in the language of your business
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {leeSystemsIndustries.map(({ id, name, summary, examples, page }) => {
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
                <Link
                  href={page.href}
                  className="mt-auto inline-flex min-h-11 items-center self-start pt-4 text-sm font-semibold text-brass-300 underline-offset-4 hover:underline"
                >
                  See the page for {name.toLowerCase()}
                </Link>
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
