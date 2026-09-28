import Link from "next/link";
import { Home, Scale } from "lucide-react";
import { leeSystemsIndustries, otherIndustriesLine } from "@/data/lee-systems";

const industryIcons = {
  "law-firms": Scale,
  "home-services": Home,
} as const;

/**
 * Who it is for. Each card links to that industry's own page
 * (/lee-systems/law-firms, /lee-systems/home-services).
 */
export function LeeSystemsIndustriesSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            Who it&apos;s for
          </p>
          <h2 className="heading-lg text-white">Industries we know best</h2>
        </div>

        <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {leeSystemsIndustries.map(({ id, name, summary, page }) => {
            const Icon = industryIcons[id];
            return (
              <li key={id}>
                <Link
                  href={page.href}
                  className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 md:p-8 transition-colors hover:border-brass-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300"
                >
                  <Icon className="mb-4 h-7 w-7 text-brass-300" aria-hidden="true" />
                  <h3 className="mb-2 text-xl font-bold text-white">{name}</h3>
                  <p className="mb-5 text-neutral-400">{summary}</p>
                  <span className="mt-auto text-sm font-semibold text-brass-300 group-hover:underline group-hover:underline-offset-4">
                    See what we automate for {name.toLowerCase()}
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
