import { NavItem } from "@/types";

// Business Mastery is LEU's flagship program rather than a venture, which is
// why its route lives here rather than in `venturePages`.
export const businessMasteryPage = "/business-mastery";

// Single source of truth for venture id -> dedicated page route. A venture
// missing from this map has no page of its own and falls back to its homepage
// section anchor, which is why lookups are optional everywhere it's used.
//
// Lee Marketing Mastery is the one venture this site lists, and its page is a
// route on this domain. H1 Performance and Thread T-Shirts each held an
// absolute entry here while they were listed from sites of their own; both are
// off this site entirely now (docs/H1.md, docs/THREAD.md).
//
// MainFooter reads this map for its "Our Ventures" rows. The venture's nav
// entry in `navigationItems` below takes its href from it too.
export const venturePages: Record<string, string> = {
  lmm: "/lee-marketing-mastery",
};

// The nav is flat: every destination is one top-level entry, and an entry with
// `subItems` renders a dropdown of its own pages. There used to be a "Ventures"
// tab holding both ventures, with Lee Marketing Mastery's three offerings on a
// second level behind a hover flyout. The owner asked for the ventures to sit
// beside Business Mastery instead, so that tab is gone and its rows were
// promoted; LMM keeps its three offerings, now one level up in its own dropdown.
// (Thread T-Shirts had the entry after LMM's until it came off this site on
// 2026-09-25 - docs/THREAD.md.)
//
// The Ventures tab's own href was "#ventures", an anchor no page has rendered
// since the homepage Ventures section was removed (docs/BUSINESS-MASTERY.md
// §4) — clicking the tab only ever toggled its menu. Nothing is lost with it.
//
// Order follows the rest of the site: Business Mastery is the flagship program
// and leads, then Lee Marketing Mastery, the venture in `data/ventures.ts`.
// MainFooter lists the program after the venture instead, at the owner's
// request.
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
    label: "Contact",
    href: "#contact",
    id: "nav-contact",
  },
];

export const sectionIds = {
  hero: "hero",
  businessMastery: "business-mastery",
  lmm: "lmm",
  sharedValues: "shared-values",
  about: "about",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
} as const;
