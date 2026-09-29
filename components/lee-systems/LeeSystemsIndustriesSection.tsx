import Link from "next/link";
import { CarFront, Dumbbell, Home, KeyRound, Scale, UtensilsCrossed } from "lucide-react";
import {
  industryInSentence,
  leeSystemsIndustries,
  leeSystemsRoutes,
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

/**
 * Every card links somewhere: an industry with its own page goes there, the
 * rest go to their card on the automation page (each card carries its id).
 */
const industries = [
  ...leeSystemsIndustries.map(({ id, name, summary, page }) => ({
    id,
    name,
    summary,
    href: page.href as string,
  })),
  ...moreIndustries.map(({ id, name, summary }) => ({
    id,
    name,
    summary,
    href: `${leeSystemsRoutes.automation}#${id}`,
  })),
];

/**
 * Who it is for, framed as examples rather than the only businesses served
 * (the owner's request, 2026-09-29; the automation page's industries heading
 * says the same). Law firms and home services link to their own pages
 * (/lee-systems/law-firms, /lee-systems/home-services); the rest link to
 * their card on the automation page.
 */
export function LeeSystemsIndustriesSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">
            Who we help
          </p>
          <h2 className="heading-lg text-white">
            For example, we help businesses like these
          </h2>
        </div>

        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ id, name, summary, href }) => {
            const Icon = industryIcons[id];
            return (
              <li key={id}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 md:p-8 transition-colors hover:border-brass-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300"
                >
                  <Icon className="mb-4 h-7 w-7 text-brass-300" aria-hidden="true" />
                  <h3 className="mb-2 text-xl font-bold text-white">{name}</h3>
                  <p className="mb-5 text-neutral-400">{summary}</p>
                  <span className="mt-auto text-sm font-semibold text-brass-300 group-hover:underline group-hover:underline-offset-4">
                    See what we automate for {industryInSentence(name)}
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
