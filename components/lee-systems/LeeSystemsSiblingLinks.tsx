import Link from "next/link";
import { Globe, Workflow } from "lucide-react";
import { leeSystemsRoutes } from "@/data/lee-systems";

/**
 * The two Lee Systems Co. offerings, in one place so the hero on each page
 * points at the other. A third offering is one entry here, not a layout edit.
 */
const offerings = [
  {
    href: leeSystemsRoutes.automation,
    label: "Business automation",
    Icon: Workflow,
  },
  {
    href: leeSystemsRoutes.websites,
    label: "Website builds",
    Icon: Globe,
  },
] as const;

type OfferingRoute = (typeof offerings)[number]["href"];

interface LeeSystemsSiblingLinksProps {
  /**
   * Route of the page rendering the row; it is filtered out so each page links
   * only to the other offering. Typed to the known routes so a typo is a build
   * error rather than a link to the page you are already on.
   */
  current: OfferingRoute;
}

/**
 * A pill to the sibling offering, above the hero visual. A pill rather than a
 * button because it is an alternate destination, not the page's main action.
 */
export function LeeSystemsSiblingLinks({ current }: LeeSystemsSiblingLinksProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-3">
      {offerings
        .filter((offering) => offering.href !== current)
        .map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brass-400/60 bg-brass-400/[0.12] px-4 py-2 text-sm font-semibold text-brass-200 transition-colors hover:bg-brass-400 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </Link>
        ))}
    </div>
  );
}
