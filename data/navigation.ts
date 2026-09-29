import { NavItem } from "@/types";
import { leeSystemsLinks, leeSystemsRoutes } from "@/data/lee-systems";

export const businessMasteryPage = "/business-mastery";
export const contactPage = "/contact";

/**
 * The header's links, in order: Lee Systems Co. first because hiring it is
 * the site's main path, then Business Mastery, then Contact. The gold "Book a
 * free call" button after them is not an entry here; MainHeader draws it from
 * `bookLabel` and `bookHref` in data/site.ts.
 *
 * Lee Systems Co. keeps its dropdown of its two services (the owner's call,
 * 2026-09-28); the tab itself leads to the page. The services had pages of
 * their own until 2026-09-29, so the two entries now lead to their sections
 * on /lee-systems.
 */
export const navigationItems: NavItem[] = [
  {
    label: "Lee Systems Co.",
    href: leeSystemsRoutes.home,
    id: "nav-lee-systems",
    subItems: [
      {
        label: "Business automation",
        href: leeSystemsLinks.automation,
        id: "nav-lee-systems-automation",
      },
      {
        label: "Website builds",
        href: leeSystemsLinks.websites,
        id: "nav-lee-systems-websites",
      },
    ],
  },
  {
    label: "Business Mastery",
    href: businessMasteryPage,
    id: "nav-business-mastery",
  },
  {
    label: "Contact",
    href: contactPage,
    id: "nav-contact",
  },
];

/** The footer's page links: the three places the site leads. */
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
