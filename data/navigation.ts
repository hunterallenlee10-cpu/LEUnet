import { NavItem } from "@/types";
import { leeSystemsRoutes } from "@/data/lee-systems";
import {
  BUSINESS_MASTERY_SITE_LIVE,
  BUSINESS_MASTERY_SITE_URL,
} from "@/config/business-mastery-site.mjs";

/**
 * Where Business Mastery is: its own subdomain once
 * `BUSINESS_MASTERY_SITE_LIVE` is on (config/business-mastery-site.mjs), the
 * page on this site until then. Every link to it reads this, so the switch
 * moves them all at once.
 */
export const businessMasteryPage = BUSINESS_MASTERY_SITE_LIVE
  ? `${BUSINESS_MASTERY_SITE_URL}/`
  : "/business-mastery";
export const contactPage = "/contact";

/**
 * The header's links, in order: Lee Systems Co., then Contact. Business
 * Mastery is linked from the footer only (`footerPages`), at the owner's
 * request (2026-10-06): it is promoted on its own, not from this site. The gold "Book a
 * free call" button after them is not an entry here; MainHeader draws it from
 * `bookLabel` and `bookHref` in data/site.ts.
 *
 * Lee Systems Co. is a plain link to the top of /lee-systems. Its dropdown
 * of the two services came off at the owner's request (2026-09-29), once
 * both lived on that one page.
 */
export const navigationItems: NavItem[] = [
  {
    label: "Lee Systems Co.",
    href: leeSystemsRoutes.home,
    id: "nav-lee-systems",
  },
  {
    label: "Contact",
    href: contactPage,
    id: "nav-contact",
  },
];

/**
 * The footer's page links. The footer is the one place on the main site that
 * links to Business Mastery (the owner's call, 2026-10-06).
 */
export const footerPages = [
  { label: "Lee Systems Co.", href: leeSystemsRoutes.home },
  { label: "Business Mastery", href: businessMasteryPage },
  { label: "Contact", href: contactPage },
] as const;

export const sectionIds = {
  hero: "hero",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
} as const;
