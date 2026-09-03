import { NavItem } from "@/types";
import { H1_SITE_URL } from "@/lib/h1-site";

// Business Mastery is LEU's flagship program rather than one of the three
// ventures, which is why it gets a top-level nav entry below instead of a row
// in the Ventures menu, and why its route lives here rather than in
// `venturePages`.
export const businessMasteryPage = "/business-mastery";

export const navigationItems: NavItem[] = [
  {
    label: "Home",
    href: "#hero",
    id: "nav-home",
  },
  {
    label: "About",
    href: "#about",
    id: "nav-about",
  },
  {
    label: "Ventures",
    href: "#ventures",
    id: "nav-ventures",
    featured: true,
  },
  {
    label: "Business Mastery",
    href: businessMasteryPage,
    id: "nav-business-mastery",
  },
  {
    label: "Contact",
    href: "#contact",
    id: "nav-contact",
  },
];

// Single source of truth for venture id -> dedicated page route. A venture
// missing from this map has no page of its own and falls back to its homepage
// section anchor, which is why lookups are optional everywhere it's used.
//
// H1 Performance's page is its own site now (docs/H1.md), so its entry is an
// absolute URL rather than a route. Both consumers cope: MainFooter renders a
// Link, which handles an external href, and MainHeader's handleNavClick
// navigates to anything that is not a `#` anchor.
export const venturePages: Record<string, string> = {
  lmm: "/lee-marketing-mastery",
  h1: H1_SITE_URL,
  thread: "/thread-t-shirts",
};

// Ventures with a dedicated page use a real route; the others are homepage
// section anchors. MainHeader's handleNavClick distinguishes the two.
export const ventureNavItems: NavItem[] = [
  {
    label: "Lee Marketing Mastery",
    href: venturePages.lmm,
    id: "nav-venture-lmm",
    // LMM's three offerings, revealed when the row is hovered. Labels and
    // order match LmmSiblingLinks, which names the same three destinations on
    // the pages themselves — the nav and the pages should not disagree about
    // what an offering is called.
    //
    // The row itself now lands on the venture hub, which is a page about the
    // company that shows all three offerings, rather than on the automation
    // page. No sub-item repeats the row's href any more: it used to, because
    // the row led to offering #1 and a submenu that omitted it read as the
    // automation page simply being missing from the menu. The hub is not one
    // of the three, so the row and the three sub-items are now four distinct
    // destinations and the duplicate would be a genuine mistake.
    subItems: [
      {
        label: "Business Automation",
        href: `${venturePages.lmm}/automation`,
        id: "nav-venture-lmm-automation",
      },
      {
        label: "Websites That Convert",
        href: `${venturePages.lmm}/websites`,
        id: "nav-venture-lmm-websites",
      },
      {
        label: "Traditional & Digital Marketing",
        href: `${venturePages.lmm}/marketing`,
        id: "nav-venture-lmm-marketing",
      },
    ],
  },
  {
    label: "H1 Performance",
    href: venturePages.h1,
    id: "nav-venture-h1",
  },
  {
    label: "Thread T-Shirts",
    href: venturePages.thread,
    id: "nav-venture-thread",
  },
];

export const sectionIds = {
  hero: "hero",
  portfolio: "portfolio",
  businessMastery: "business-mastery",
  lmm: "lmm",
  h1: "h1",
  thread: "thread",
  sharedValues: "shared-values",
  about: "about",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
} as const;
