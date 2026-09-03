import { Venture } from "@/types";
import { VENTURE_COLORS } from "@/lib/colors";

export const ventures: Venture[] = [
  {
    id: "lmm",
    name: "Lee Marketing Mastery",
    tagline: "Done-For-You Marketing That Drives Real Results",
    logo: "/lee-marketing-mastery-logo.png",
    logoAlt: "Lee Marketing Mastery logo",
    /**
     * This description renders on the homepage, in the "About Lee Marketing
     * Mastery" card of `VentureDetailSection`, which is one click away from
     * /lee-marketing-mastery/websites. It used to sell speed and superlatives -
     * "world-class websites", "delivered at lightning speed" - and closed on a
     * promise of "measurable revenue growth". All three had to go. The speed
     * claim directly contradicted the websites page, which argues that how fast
     * a site ships is not what the buyer is paying for; the revenue promise is
     * a result nobody here can show a visitor, and there are no completed
     * client builds to derive it from. What replaced them names the work and
     * how it is scoped, which is verifiable, rather than what it will earn,
     * which is not. Keep this in the same calm register as the rest of the
     * repo, and do not put a result promise back.
     */
    description:
      "Marketing, automation, and business websites for owners who would rather have the work done than manage it. The websites are built around one job - turning a visitor into a customer - and the rest of the work points at the same end: content that states plainly what you do, paid advertising, follow-up that does not depend on someone remembering to send it, and integrations that connect the tools you already use. Scope is agreed before anything is built, and the reporting is written in plain language.",
    ctaPrimary: "Book a Free Strategy Call",
    ctaSecondary: "View Our Services",
    heroSubtitle: "Grow Your Brand. Master Your Market.",
    heroDescription:
      "Done-For-You Marketing & Systems That Drives Leads, Builds Trust, and Scales Businesses.",
    colors: VENTURE_COLORS.lmm,
  },
  {
    id: "thread",
    name: "Thread T-Shirts",
    tagline: "Premium Casual Wear Designed for Everyday Excellence",
    logo: "/logos/thread-logo.png",
    logoAlt: "Thread T-Shirts logo",
    description:
      "Thread creates premium everyday apparel and custom designs for individuals, brands, teams, businesses, and events. Every piece is built around lasting comfort, dependable quality, and a clean style you can wear with confidence.",
    ctaPrimary: "Design Your Own",
    ctaPrimaryHref: "/thread-t-shirts#order-request",
    ctaSecondary: "View Styles",
    heroSubtitle: "Wear Your Style. Elevate Everyday Essentials.",
    heroDescription:
      "Stylish. Comfortable. Made to last. Thread T-Shirts are designed for those who expect more from their everyday wear.",
    colors: VENTURE_COLORS.thread,
  },
];

export function getVentureById(id: string): Venture | undefined {
  return ventures.find((venture) => venture.id === id);
}

export function getVentureByName(name: string): Venture | undefined {
  return ventures.find((venture) => venture.name.toLowerCase() === name.toLowerCase());
}
