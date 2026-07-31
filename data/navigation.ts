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
