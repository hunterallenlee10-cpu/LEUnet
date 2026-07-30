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

// Ventures with a dedicated page use a real route; the others are homepage
// section anchors. MainHeader's handleNavClick distinguishes the two.
export const ventureNavItems: NavItem[] = [
  {
    label: "Lee Marketing Mastery",
    href: "/lee-marketing-mastery",
    id: "nav-venture-lmm",
  },
  {
    label: "Pelican Power Wash",
    href: "/pelican-power-wash",
    id: "nav-venture-pelican",
  },
  {
    label: "H1 Performance",
    href: "#h1",
    id: "nav-venture-h1",
  },
  {
    label: "Thread T-Shirts",
    href: "#thread",
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
