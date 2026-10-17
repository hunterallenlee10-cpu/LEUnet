import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { leeSystemsLinks, serviceGroups } from "@/data/lee-systems";
import { serviceIcons } from "@/components/lee-systems/serviceIcons";

/**
 * "Everything we do" on the homepage (the owner's ask, 2026-10-17): the six
 * Lee Systems Co. service groups as one compact row, icon and name only, each
 * linking to the full list on /lee-systems (`#services`). The homepage stays
 * a short hub; the detail lives there. Six across on wide screens, three on
 * tablets, two on a phone, every link at least 44px tall.
 */
export function ServiceGroupsRow() {
  return (
    <nav
      aria-labelledby="home-services-title"
      className="section-container mt-14 md:mt-20"
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2
          id="home-services-title"
          className="text-xs font-semibold tracking-[0.22em] text-brass-300 uppercase"
        >
          Everything we do
        </h2>
        <Link
          href={leeSystemsLinks.services}
          className="group inline-flex min-h-11 items-center gap-1.5 rounded text-sm font-semibold text-brass-300 hover:text-brass-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-300"
        >
          See what&apos;s included
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {serviceGroups.map(({ anchor, icon, name }) => {
          const Icon = serviceIcons[icon];
          return (
            <li key={anchor} className="flex">
              <Link
                href={leeSystemsLinks.services}
                className="flex min-h-14 w-full items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm leading-snug font-semibold text-white transition-colors duration-200 hover:border-brass-400/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300 motion-reduce:transition-none light:bg-[#fff]"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-5 w-5 shrink-0 text-brass-400"
                />
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
