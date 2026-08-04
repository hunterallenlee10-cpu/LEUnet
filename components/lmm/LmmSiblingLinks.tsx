import Link from "next/link";
import { ArrowRight, Globe, Megaphone, Workflow } from "lucide-react";

/**
 * The three Lee Marketing Mastery offerings, in one place so the hero rows on
 * all three pages stay in step. A fourth offering is a data edit here, not a
 * layout edit on three pages.
 */
const offerings = [
  {
    href: "/lee-marketing-mastery",
    label: "Business Automation",
    Icon: Workflow,
  },
  {
    /**
     * The label names what the finished site does for the owner, not how it
     * was produced. "New Websites, Built with AI" sold a production method,
     * which put this pill in the same category as tools the prospect could
     * run themselves and made speed the only thing left to compete on. The
     * websites page now leads with the job - turning a visitor into a
     * customer - and this pill has to promise the same thing.
     *
     * Sparkles went with it: the icon was reading as AI-magic. Globe is the
     * same mark `MarketingRelatedSection` already uses for this destination,
     * and it matches the grammar of the row, where Workflow and Megaphone
     * name the category rather than the outcome.
     *
     * Keep this label at or under about 27 characters. It has to sit on one
     * line beside "Traditional & Digital Marketing" (31) at 1440px inside a
     * panel roughly 576px wide - see docs/CROSS-LINKS.md.
     */
    href: "/lee-marketing-mastery/websites",
    label: "Websites That Convert",
    Icon: Globe,
  },
  {
    href: "/lee-marketing-mastery/marketing",
    label: "Traditional & Digital Marketing",
    Icon: Megaphone,
  },
] as const;

type LmmRoute = (typeof offerings)[number]["href"];

interface LmmSiblingLinksProps {
  /**
   * Route of the page rendering the row. It is dropped from the output, so
   * each page shows only the other two. Typed to the known routes: a typo
   * would otherwise render a link to the page you are already on, and fail
   * silently.
   */
  current: LmmRoute;
}

/**
 * Cross-links to the other two LMM offerings, sitting above the hero visual
 * rather than in the headline column: pills in the eyebrow row crowded the
 * brand badge, and the CTAs under the headline are each page's primary
 * conversion. Pills rather than solid buttons for the same reason - these are
 * alternate destinations, not competing actions. The hover fill and arrow keep
 * them reading as links.
 *
 * The row is `flex-wrap`: at 1440px the two sit side by side across the panel
 * width, and below roughly 1400px they stack.
 *
 * Known tradeoff. Each hero grid is `lg:grid-cols-2`, so below that breakpoint
 * the visual column stacks under the headline column and these land past the
 * fold on a phone. Desktop visitors see them immediately; phone visitors have
 * to scroll. See `docs/WEBSITES.md` §5 for the responsive-duplication fix if
 * that turns out to matter.
 */
export function LmmSiblingLinks({ current }: LmmSiblingLinksProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-3">
      {offerings
        .filter((offering) => offering.href !== current)
        .map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className="group inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-amber-400/[0.14] px-4 py-2 text-sm font-semibold text-amber-200 transition-colors hover:bg-amber-400 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ))}
    </div>
  );
}
