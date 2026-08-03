# LMM Hero Cross-Links

How the three Lee Marketing Mastery pages point at each other.

**Status:** built. All three heroes render the row.

| | |
| --- | --- |
| Component | `components/lmm/LmmSiblingLinks.tsx` |
| Rendered by | `LmmHeroSection`, `WebsitesHeroSection`, `MarketingHeroSection` |

---

## 1. What it does

Lee Marketing Mastery is three pages, and a visitor who lands on any one of them
had no way to reach the other two without going back out to the venture menu.
The row fixes that: each hero carries pills to the *other two* offerings.

| Page | Shows |
| --- | --- |
| `/lee-marketing-mastery` | New Websites, Built with AI · Traditional & Digital Marketing |
| `/lee-marketing-mastery/websites` | Business Automation · Traditional & Digital Marketing |
| `/lee-marketing-mastery/marketing` | Business Automation · New Websites, Built with AI |

---

## 2. One list, not three

All three offerings live in a single `offerings` array in the component. Each
page passes `current` — its own route — and that entry is filtered out. Nothing
lists its siblings by hand, so the three pages cannot drift apart, and a fourth
offering is one array entry rather than three layout edits.

`current` is typed to the union of the known routes (`as const` on the array), so
a mistyped route is a build error. Without that it would fail silently: the
filter would match nothing and the page would render a pill pointing at itself.

The automation pill reads "Business Automation" — the name already used by
`ventureServices.lmm` in `data/services.ts` and by `MarketingRelatedSection`.
Length matters here as well as consistency: at 1440px "Business Automation
Systems" pushed the websites row past the panel width and wrapped it to two
lines.

---

## 3. Placement

Above the hero visual in the right-hand column — the System Flow panel, the
browser wireframe, or the channel mix — not in the headline column. Pills in the
eyebrow row crowded the brand badge, and the two CTAs under each headline are
that page's primary conversion, so these stay pills rather than solid buttons:
alternate destinations, not competing actions. The hover fill and arrow keep
them reading as links.

The row is `flex-wrap`. Both pills fit on one line at 1440px on all three pages.

**Known tradeoff.** Each hero grid is `lg:grid-cols-2`, so below that breakpoint
the visual column stacks under the headline column and the pills land past the
fold on a phone. Carried over from when the row lived only on the automation
page; `docs/WEBSITES.md` §5 has the responsive-duplication fix if phone
visibility turns out to matter.

---

## 4. Not the only path between the pages

The row is the fast path, not the whole story. `MarketingRelatedSection` still
makes the longer case for why the three offerings are worth more together, and
each page's final CTA links back to the LMM hub. Those stay — the pills are for
a visitor who already knows what they want.
