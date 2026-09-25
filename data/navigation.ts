import { NavItem } from "@/types";
import { THREAD_SITE_URL } from "@/lib/thread-site";

// Business Mastery is LEU's flagship program rather than one of the two
// ventures, which is why its route lives here rather than in `venturePages`.
export const businessMasteryPage = "/business-mastery";

// Single source of truth for venture id -> dedicated page route. A venture
// missing from this map has no page of its own and falls back to its homepage
// section anchor, which is why lookups are optional everywhere it's used.
//
// Both ventures have a page. Lee Marketing Mastery's is a route on this domain;
// Thread T-Shirts' is its own site since 2026-09-25 (docs/THREAD.md), so its
// entry is an absolute URL, read from the one shared constant every link to
// Thread uses. H1 Performance held an absolute entry here the same way while
// it was still listed as a venture; it is off this site entirely now, and
// docs/H1.md records what that left behind.
//
// MainFooter reads this map for its "Our Ventures" rows and renders each as a
// Link, which handles an external href. The two venture entries in
// `navigationItems` below take their hrefs from it too, and MainHeader's
// handleNavClick navigates to anything that is not a `#` anchor, so Thread's
// absolute URL is a full navigation there rather than a scroll.
export const venturePages: Record<string, string> = {
  lmm: "/lee-marketing-mastery",
  thread: THREAD_SITE_URL,
};

// The nav is flat: every destination is one top-level entry, and an entry with
// `subItems` renders a dropdown of its own pages. There used to be a "Ventures"
// tab holding both ventures, with Lee Marketing Mastery's three offerings on a
// second level behind a hover flyout. The owner asked for the ventures to sit
// beside Business Mastery instead, so that tab is gone and its two rows were
// promoted; LMM keeps its three offerings, now one level up in its own dropdown.
//
// The Ventures tab's own href was "#ventures", an anchor no page has rendered
// since the homepage Ventures section was removed (docs/BUSINESS-MASTERY.md
// §4) — clicking the tab only ever toggled its menu. Nothing is lost with it.
//
// Order follows the rest of the site: Business Mastery is the flagship program
// and leads, then the ventures in `data/ventures.ts` order (LMM, then Thread),
// which is the order MainFooter lists them in too.
//
// LMM's sub-item labels and order match LmmSiblingLinks, which names the same
// three destinations on the pages themselves — the nav and the pages should not
// disagree about what an offering is called. The dropdown holds exactly those
// three pages; the venture hub at `/lee-marketing-mastery` is where the tab
// itself leads, so it needs no row of its own.
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
    label: "Business Mastery",
    href: businessMasteryPage,
    id: "nav-business-mastery",
  },
  {
    // "Marketing Mastery", not the venture's full "Lee Marketing Mastery".
    // The owner asked for the shorter name in the nav bar; every other surface
    // (footer, hub page, the offering pages) still names the venture in full,
    // and this tab leads to that hub, which says it on arrival.
    label: "Marketing Mastery",
    href: venturePages.lmm,
    id: "nav-lmm",
    subItems: [
      {
        label: "Business Automation",
        href: `${venturePages.lmm}/automation`,
        id: "nav-lmm-automation",
      },
      {
        label: "Websites That Convert",
        href: `${venturePages.lmm}/websites`,
        id: "nav-lmm-websites",
      },
      {
        label: "Traditional & Digital Marketing",
        href: `${venturePages.lmm}/marketing`,
        id: "nav-lmm-marketing",
      },
    ],
  },
  {
    label: "Thread T-Shirts",
    href: venturePages.thread,
    id: "nav-thread",
  },
  {
    label: "Contact",
    href: "#contact",
    id: "nav-contact",
  },
];

export const sectionIds = {
  hero: "hero",
  businessMastery: "business-mastery",
  lmm: "lmm",
  thread: "thread",
  sharedValues: "shared-values",
  about: "about",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
} as const;
