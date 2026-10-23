import Link from "next/link";
import type { MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { serviceGroups, servicePath, servicesRoutes } from "@/data/services";
import { serviceIcons } from "@/components/services/serviceIcons";

/**
 * The rows of the header's Services menu (MainHeader owns opening and
 * closing it): the six service groups, each with its icon, name and outcome
 * line and linking to its page, then "All services" and "Try the demos".
 * `variant="panel"` is the desktop drop-down, two columns of three;
 * `variant="drawer"` is the same list stacked inside the mobile menu.
 */
export function ServicesMenu({
  id,
  variant,
  onNavigate,
  isCurrent,
}: {
  id: string;
  variant: "panel" | "drawer";
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void;
  isCurrent: (href: string) => boolean;
}) {
  const panel = variant === "panel";

  return (
    <div
      id={id}
      className={
        panel
          ? "w-[min(44rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-3 shadow-2xl"
          : "mb-2 ml-3 border-l border-neutral-800 pl-2"
      }
    >
      <ul className={panel ? "grid grid-cols-2 gap-1" : "space-y-0.5"}>
        {serviceGroups.map(({ slug, name, outcome, icon }) => {
          const Icon = serviceIcons[icon];
          const href = servicePath(slug);
          return (
            <li key={slug}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={isCurrent(href) ? "page" : undefined}
                className="group flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-neutral-900 motion-reduce:transition-none"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-brass-400/30 bg-brass-400/[0.06]">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-brass-400" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold whitespace-normal text-white group-hover:text-amber-400">
                    {name}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug whitespace-normal text-neutral-400">
                    {outcome}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        className={
          panel
            ? "mt-2 flex items-center justify-between gap-4 border-t border-neutral-800 px-3 pt-3 pb-1"
            : "mt-1 flex flex-col gap-0.5"
        }
      >
        <Link
          href={servicesRoutes.hub}
          onClick={onNavigate}
          aria-current={isCurrent(servicesRoutes.hub) ? "page" : undefined}
          className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-neutral-300 hover:text-amber-400 md:px-0"
        >
          All services
        </Link>
        <Link
          href={servicesRoutes.demoLab}
          onClick={onNavigate}
          className="group inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-brass-300 hover:text-brass-200 md:px-0"
        >
          Try the demos
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
