import { NavItem } from "@/types";

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
    label: "Contact",
    href: "#contact",
    id: "nav-contact",
  },
];

// Single source of truth for venture id -> dedicated page route. A venture
// missing from this map has no page of its own and falls back to its homepage
// section anchor, which is why lookups are optional everywhere it's used.
export const venturePages: Record<string, string> = {
  lmm: "/lee-marketing-mastery",
  pelican: "/pelican-power-wash",
  h1: "/h1-performance",
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
    // what an offering is called. The first entry repeats the row's own href
    // on purpose: the submenu lists all three pages so a visitor who has
    // opened it never has to work out that the parent row is the third one.
    subItems: [
      {
        label: "Business Automation",
        href: venturePages.lmm,
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
    label: "Pelican Power Wash",
    href: venturePages.pelican,
    id: "nav-venture-pelican",
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
  ventureSnapshot: "venture-snapshot",
  portfolio: "portfolio",
  lmm: "lmm",
  pelican: "pelican",
  h1: "h1",
  thread: "thread",
  sharedValues: "shared-values",
  about: "about",
  helpSelector: "help-selector",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
} as const;
