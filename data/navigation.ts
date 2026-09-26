import { NavItem } from "@/types";

// Business Mastery is LEU's flagship program rather than a venture, which is
// why its route lives here rather than in `venturePages`.
export const businessMasteryPage = "/business-mastery";

// Single source of truth for venture id -> dedicated page route. A venture
// missing from this map has no page of its own and falls back to its homepage
// section anchor, which is why lookups are optional everywhere it's used.
//
// Lee Systems Co. is the one venture this site lists, and its page is a route
// on this domain. It replaced Lee Marketing Mastery on 2026-09-25; the old
// /lee-marketing-mastery URLs redirect to it (next.config.mjs). The key stays
// `lmm` because it is the venture's id, which Stripe invoices are tagged with
// (app/api/stripe/invoice/route.ts) - renaming it would orphan those tags. H1 Performance and Thread T-Shirts each held an
// absolute entry here while they were listed from sites of their own; both are
// off this site entirely now (docs/H1.md, docs/THREAD.md).
//
// MainFooter reads this map for its "Our Ventures" rows. The venture's nav
// entry in `navigationItems` below takes its href from it too.
export const venturePages: Record<string, string> = {
  lmm: "/lee-systems",
};

// The nav is flat: every destination is one top-level entry, and an entry with
// `subItems` renders a dropdown of its own pages. There used to be a "Ventures"
// tab holding both ventures, with Lee Marketing Mastery's three offerings on a
// second level behind a hover flyout. The owner asked for the ventures to sit
// beside Business Mastery instead, so that tab is gone and its rows were
// promoted; the venture keeps its offerings, now one level up in its own
// dropdown. (Thread T-Shirts had the entry after it until it came off this
// site on 2026-09-25 - docs/THREAD.md.)
//
// The Ventures tab's own href was "#ventures", an anchor no page has rendered
// since the homepage Ventures section was removed (docs/BUSINESS-MASTERY.md
// §4) — clicking the tab only ever toggled its menu. Nothing is lost with it.
//
// Order follows the rest of the site: Business Mastery is the flagship program
// and leads, then Lee Systems Co., the venture in `data/ventures.ts`.
// MainFooter lists the program after the venture instead, at the owner's
// request.

export const navigationItems: NavItem[] = [
  {
    label: "Home",
    href: "#hero",
    id: "nav-home",
  },
  {
    label: "Business Mastery",
    href: businessMasteryPage,
    id: "nav-business-mastery",
  },
  {
    // The venture's full name, which is short enough for the nav bar. (Lee
    // Marketing Mastery sat here as "Marketing Mastery" until the rename.) The
    // dropdown holds the two offering pages; the tab itself leads to the main
    // page, so it needs no row of its own. Labels match
    // LeeSystemsSiblingLinks, which names the same two pages on the pages.
    label: "Lee Systems Co.",
    href: venturePages.lmm,
    id: "nav-lee-systems",
    subItems: [
      {
        label: "Business Automation",
        href: `${venturePages.lmm}/automation`,
        id: "nav-lee-systems-automation",
      },
      {
        label: "Website Builds",
        href: `${venturePages.lmm}/websites`,
        id: "nav-lee-systems-websites",
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
  leeSystems: "lee-systems",
  sharedValues: "shared-values",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
} as const;
