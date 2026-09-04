# LMM Hero Cross-Links

How the three Lee Marketing Mastery offering pages point at each other.

**Status:** built. All three offering heroes render the row.

| | |
| --- | --- |
| Component | `components/lmm/LmmSiblingLinks.tsx` |
| Rendered by | `LmmHeroSection`, `WebsitesHeroSection`, `MarketingHeroSection` |

---

## 1. What it does

Lee Marketing Mastery is a venture hub plus three offering pages, and a visitor
who lands on any one of the three had no way to reach the other two without
going back out to the nav (the Ventures menu then; the Lee Marketing Mastery
dropdown now). The row fixes that: each offering hero
carries pills to the *other two* offerings.

The hub at `/lee-marketing-mastery` does not render this row, and should not.
It is the parent rather than a sibling, so it has no "other two" — it names all
three, in `components/lmm-hub/hubOfferings.ts`. That is also why `current` has
never needed to admit the hub route: see §2.

| Page | Shows |
| --- | --- |
| `/lee-marketing-mastery/automation` | Websites That Convert · Traditional & Digital Marketing |
| `/lee-marketing-mastery/websites` | Business Automation · Traditional & Digital Marketing |
| `/lee-marketing-mastery/marketing` | Business Automation · Websites That Convert |

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

### Two rules for the labels

**Every label names the offering or what it does, never how the work is
produced.** The websites pill read "New Websites, Built with AI" until the
websites page was repositioned. Advertising a production method puts the
destination in the same category as tools the prospect could run himself and
leaves speed as the only thing to compete on — `docs/WEBSITES.md` §3.1 is the
full account of why that was dropped, and it is not a decision to reopen one
label at a time. It now reads "Websites That Convert", matching the card title
in `MarketingRelatedSection` and the job the destination page sells. The icon
moved from Sparkles to Globe for the same reason: Sparkles read as AI-magic,
Globe matches the grammar of the row, where Workflow and Megaphone name the
category rather than the mood.

**Keep the websites label at or under about 27 characters.** It has to sit on
one line beside "Traditional & Digital Marketing" (31) at 1440px, inside a panel
roughly 576px wide. The constraint is repeated in the component so it is visible
at the point of editing.

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
