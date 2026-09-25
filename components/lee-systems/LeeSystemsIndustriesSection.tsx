import Link from "next/link";
import { ArrowRight, Home, Scale } from "lucide-react";
import {
  leeSystemsIndustries,
  leeSystemsRoutes,
  otherIndustriesLine,
} from "@/data/lee-systems";

const industryIcons = {
  "law-firms": Scale,
  "home-services": Home,
} as const;

/**
 * Who it is for. Each card links to that industry's block on the automation
 * page, whose id matches the industry id in data/lee-systems.ts.
 */
export function LeeSystemsIndustriesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass-300">
            Who It&apos;s For
          </p>
          <h2 className="heading-lg text-white">Industries we know best</h2>
        </div>

        <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {leeSystemsIndustries.map(({ id, name, summary }) => {
            const Icon = industryIcons[id];
            return (
              <li key={id}>
                <Link
                  href={`${leeSystemsRoutes.automation}#${id}`}
                  className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-brass-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300"
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-brass-400/30 bg-brass-400/10">
                    <Icon className="h-5 w-5 text-brass-300" aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-white">{name}</h3>
                  <p className="mb-5 text-neutral-400">{summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brass-300">
                    See what we automate for {name.toLowerCase()}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-neutral-300">
          {otherIndustriesLine}
        </p>
      </div>
    </section>
  );
}
