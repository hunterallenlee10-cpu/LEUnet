import { Globe, Megaphone, Workflow, type LucideIcon } from "lucide-react";
import { MiniReachVisual } from "@/components/lmm-hub/visuals/MiniReachVisual";
import { MiniConvertVisual } from "@/components/lmm-hub/visuals/MiniConvertVisual";
import { MiniFlowVisual } from "@/components/lmm-hub/visuals/MiniFlowVisual";

/**
 * The three Lee Marketing Mastery offerings as the hub presents them.
 *
 * One array, read by every section of the hub - the hero's offering switch, the
 * three door cards, and the closing router. Those three surfaces name the same
 * destinations three times on one page, and they are exactly the kind of thing
 * that drifts: a label gets improved in one place, and the page quietly starts
 * calling one offering by two names within a single scroll.
 *
 * WHAT THIS IS NOT. `LmmSiblingLinks` covers a different job - the pill row on
 * each deep page pointing at its two siblings - and it is deliberately not
 * reused here. Its `current` prop is a union of the three deep routes, so the
 * hub could only render it by widening that type to admit a route that is not
 * an offering, and the whole point of the union is that a route which is not
 * one of the three fails to compile. The two lists agree on labels because both
 * take them from the same place (docs/CROSS-LINKS.md §2), not because one
 * imports the other.
 *
 * ORDER. Journey order - get found, get chosen, get followed up with - which is
 * the order a customer actually moves through, and the order the hero's H1
 * states its three clauses in. The nav dropdown and `LmmSiblingLinks` still
 * list automation first, which is the order they have always used. That is a
 * deliberate, contained difference: this page argues a sequence, and a menu
 * lists destinations. If the nav is ever reordered to match, this comment is
 * the thing to delete.
 */
export interface HubOffering {
  id: string;
  /** The job, in the visitor's terms. Doubles as the hero switch's rail label. */
  job: string;
  /** Canonical offering name. Must match the nav, the pills, and data/services.ts. */
  name: string;
  href: string;
  Icon: LucideIcon;
  /** One line for the hero switch - what this offering is for, not what it includes. */
  switchLine: string;
  /**
   * The door card's promise. Compressed from that page's own hero paragraph, so
   * a visitor who clicks through meets the argument they were just given rather
   * than a new one.
   */
  promise: string;
  /** Three points, taken from that page's outcome strip. Never four - the card is not a strip. */
  points: string[];
  /** Door card link text. */
  cta: string;
  /**
   * Deep link into that offering's own enquiry form. The hub has no form of its
   * own and must not grow one: every form on the site posts to its own route and
   * emails with a subject line naming which offering the enquiry is about, and
   * that subject line is how leads are told apart in one shared inbox. A generic
   * hub form would arrive labelled as none of the three.
   */
  formHref: string;
  formCta: string;
  /** The card-scale visual. See components/lmm-hub/visuals/README-ish notes in each file. */
  Visual: () => React.JSX.Element;
}

export const hubOfferings: HubOffering[] = [
  {
    id: "marketing",
    job: "Get found",
    name: "Traditional & Digital Marketing",
    href: "/lee-marketing-mastery/marketing",
    Icon: Megaphone,
    switchLine: "Reach people who have not heard of you yet.",
    promise:
      "Your next customer is not all in one place. Print, signage, and vehicles offline; search, ads, social, and email online - so the same message reaches them wherever they are.",
    points: [
      "Seen more often, online and off",
      "Visible in the area you actually serve",
      "One look across every channel",
    ],
    cta: "See marketing",
    formHref: "/lee-marketing-mastery/marketing#marketing-inquiry-form",
    formCta: "Get a Free Marketing Quote",
    Visual: MiniReachVisual,
  },
  {
    id: "websites",
    job: "Get chosen",
    name: "Websites That Convert",
    href: "/lee-marketing-mastery/websites",
    Icon: Globe,
    switchLine: "Turn the people who arrive into customers.",
    promise:
      "When someone reaches your website they are often already comparing their options. The site's one job is to establish trust, say plainly what you do, and make the next step obvious.",
    points: [
      "Written for the decision the visitor came to make",
      "Plain claims and work you can open and check",
      "Each service and campaign gets its own page",
    ],
    cta: "See websites",
    formHref: "/lee-marketing-mastery/websites#website-inquiry-form",
    formCta: "Get a Free Website Quote",
    Visual: MiniConvertVisual,
  },
  {
    id: "automation",
    job: "Get followed up with",
    name: "Business Automation",
    href: "/lee-marketing-mastery/automation",
    Icon: Workflow,
    switchLine: "Stop letting good leads wait on someone remembering.",
    promise:
      "Custom systems that find opportunities, organize leads, and follow up without depending on anyone remembering to - so the work moves whether or not you are at your desk.",
    points: [
      "New opportunities trigger the next action",
      "Every lead lands in the right place",
      "Hours returned to revenue-producing work",
    ],
    cta: "See automation",
    formHref: "/lee-marketing-mastery/automation#consultation-form",
    formCta: "Book an Automation Consultation",
    Visual: MiniFlowVisual,
  },
];
