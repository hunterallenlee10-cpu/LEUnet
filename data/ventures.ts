import { Venture } from "@/types";
import { VENTURE_COLORS } from "@/lib/colors";

/**
 * The ventures this site lists. One now, Lee Systems Co. (Lee Marketing Mastery
 * until 2026-09-25): Thread T-Shirts came off this site on
 * 2026-09-25 after moving to its own (docs/THREAD.md), as H1 Performance did on
 * 2026-09-03 (docs/H1.md). LEU Business Mastery is the flagship program rather
 * than a venture, so it is not in this list; MainFooter and the nav give it an
 * entry of its own.
 */
export const ventures: Venture[] = [
  {
    // `lmm` is the venture's id from when it was Lee Marketing Mastery. It is
    // kept because Stripe invoices are tagged with it
    // (app/api/stripe/invoice/route.ts); only the names people see changed.
    id: "lmm",
    name: "Lee Systems Co.",
    tagline: "Systems that run your business while you run the work.",
    /** No logo file yet; nothing renders this field today. docs/LEE-SYSTEMS.md. */
    logo: "/logos/leu-logo.png",
    logoAlt: "Lee Systems Co.",
    description:
      "Business automation and website builds for service businesses. Custom systems answer new leads, handle intake, send follow-ups, request reviews and clear out admin work, and websites are fully built before the client pays anything.",
    ctaPrimary: "Book a Free Automation Audit",
    ctaSecondary: "See What We Build",
    heroSubtitle: "A Lee Enterprises Unlimited company",
    heroDescription:
      "Custom automation and conversion-focused websites for service businesses, from Frederick, Maryland.",
    colors: VENTURE_COLORS.lmm,
  },

];

export function getVentureById(id: string): Venture | undefined {
  return ventures.find((venture) => venture.id === id);
}

export function getVentureByName(name: string): Venture | undefined {
  return ventures.find((venture) => venture.name.toLowerCase() === name.toLowerCase());
}
