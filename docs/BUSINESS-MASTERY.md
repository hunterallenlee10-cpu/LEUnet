# LEU Business Mastery — Build Spec

Execution plan and settled decisions for `/business-mastery`, the LEU Business
Mastery program page, plus its homepage presence.

**Status:** Phase A built. The page, application form + API route, homepage
teaser, and nav wiring are live on the branch and pass a production build.
This document records the decisions made with the owner on 2026-08-25 and the
full section-by-section plan derived from the owner's page-plan document.
Phases B (story) and C (checkout) remain — see §9.

---

## 1. Settled decisions

| | |
| --- | --- |
| Placement | **Dedicated page at `/business-mastery`** + one homepage teaser section. The homepage stays the company hub. |
| Homepage hook | A teaser section introduces the program on the homepage. It was originally reached by two routes: this section, plus the "Start your own venture" button in `PortfolioSection`, which had sat unwired until this program gave it a destination. That Portfolio section has since been removed from the homepage entirely. The homepage had two hooks again for a while: the teaser, plus the "Get started on your dreams" button under the mission statement in `AboutSection`, which had likewise sat unwired. The About section has since been removed from the homepage too, so the teaser is the one hook. |
| Join flow | **Application form first.** Own API route, Resend email to `ceo@leeenterprisesunlimited.com`, same pattern as every other venture form. No on-page payment in this build. |
| Payments | None in this build. Stripe checkout for the founding-member one-time payment is Phase C — the scaffolding already exists (`app/api/stripe/*`), but price, guarantee terms, and refund handling must be written first. |
| Founding counter | Not rendered. `bmFoundingCounter` (`claimed` / `total`) survives in `data/business-mastery.ts` as a record and a Phase C hook; the offer section shows a plain "Limited Spots" box instead — see §6. |
| Unfinished content | Render whatever is confirmed, and mark the rest with a consistent **"coming soon"** treatment (owner's call). Applies to the Journey chapters and the guarantee terms; it applied to the full founder story too, until that section came off the page (§3). |
| Exploratory sections | **Empire in, Vision out**: "How to Build Your Own Empire" made the first build; "The Vision" shipped alongside it and was removed at the owner's request. Superseded on 2026-09-07 — the Empire framework was itself replaced, by the owner's three **Core Tenets** (Speed / Money In / For Free) in the same slot. Placement in §3. |
| Palette | LEU's own amber/gold on black — the homepage identity, not a new sub-brand palette. Business Mastery is LEU itself, and the page should look like it. |
| Contact | `ceo@leeenterprisesunlimited.com`, same as every other form. |

---

## 2. What this page is

Not a venture page in the H1/Thread sense — it is LEU's flagship program: a
paid business-development network (classes, live webinars, daily calls,
personal coaching, hands-on help, private community, tools and resources).
The page is manifesto-scale by design. Its one conversion action in this build
is the founding-member **application form**; every CTA on the page scrolls to
it.

Core through-line, carried by the hero:

> No great accomplishment in history was achieved alone.

It used to be repeated at the close, as the Evolution section's last line.
That section is gone (§3), so the line now appears once, at the top. If the
owner wants the bookend back, the final CTA is where it belongs.

---

## 3. Page flow (final order)

The owner's flow, with the added section slotted where it does the most work:

| # | Section | Content source | State |
| --- | --- | --- | --- |
| 1 | Hero — manifesto | Owner doc §1: title, "No great accomplishment…", "Speedrun Your Way to Success", CTA `ACHIEVE YOUR DREAMS →` scrolls to the offer | Ready |
| 2 | **The Manifesto** | Owner doc §2 ("Nobody Builds Something Great Alone", network as the driving force, hard work + investment are both required). Owner doc §8 was merged in here on 2026-09-07 and taken back off on 2026-09-13 | Ready (see §6 on the proof claims) |
| 3 | Who This Is For | Owner doc §3: four audiences (Aspiring / Young / Early-Stage / Growing) + mission line | Ready |
| 4 | **Our Core Tenets** | The owner's three tenets, supplied 2026-09-07: Speed, Money In, For Free. Replaced the 8-step "How to Build Your Own Empire" framework (Starting from zero → Creating freedom) in this slot | Ready. Titles and heading are the owner's; the Speed description is the owner's own copy (supplied 2026-09-15), the other two one-line descriptions are build copy — see the note on `bmTenets` before editing "For Free" |
| 5 | What Business Mastery Actually Is | Owner doc §4: "NOT a Course. A Coach." + six pillars (classes, webinars, daily calls, coaching, hands-on help, community); Tools & Resources removed 2026-09-27, data kept | Ready |
| 6 | Founding Member Offer | Owner doc: one-time payment positioning, a "Limited Spots" box (a live-style counter until the owner asked for the words alone), 90-day guarantee (30-day at first build, extended by the owner), **application form** | Form ready; price + guarantee terms are content gaps (§6) |
| 7 | Why I Built LEU | Owner doc §6: legacy statement + supporting idea | **Not on the page right now** — pulled at the owner's request, see below. Built and ready: renders the legacy statement + coming-soon marker whenever it goes back |
| 8 | My Journey — timeline (on-page eyebrow: "A Life in Full") | Owner doc §7: interactive 14-chapter timeline | Built, **visibly locked** until the owner launches it — the slot renders a Coming Soon placeholder; `BM_JOURNEY_LOCKED` in `data/business-mastery.ts` is the switch, see below. Titles only; chapter bodies are coming-soon until the My Story document is written |
| ~~9~~ | ~~Your Journey Is Just Beginning~~ | Owner doc §8 — merged up into slot 2 on 2026-09-07, then **off the page entirely** on 2026-09-13, see the note below | Not on the page in any slot; the copy is unchanged and still `bmTransition` |
| 10 | Achieve Your Dreams Today | Owner doc §9: final conversion section, CTA `JOIN LEU BUSINESS MASTERY →` scrolls back to the offer/form | **Not on the page right now** — pulled at the owner's request on 2026-09-27; `BmFinalCTASection` and `bmFinalCta` are intact |

**Sections 2 and 9 became one section on 2026-09-07, at the owner's
request.** They were always the same claim made twice — a centred column of
neutral-300 paragraphs on neutral-950, arguing that nobody builds alone — and
eight sections apart they read as two text walls rather than as one thought.
`BmManifestoSection.tsx` carried both; `BmCoreBeliefSection.tsx` and
`BmTransitionSection.tsx` are deleted. **No copy changed**: every sentence was
still the owner's, verbatim, from `bmCoreBelief`, `bmProofStatement` and
`bmTransition`, only re-ordered and re-grouped. `bmTransition` stays in the data
file under its own name, and did so through what happened next.

**The pivot came back off on 2026-09-13**, at the owner's request, which ends
the merge: slot 2 is the Core Belief and the proof line, and owner doc §8 is not
on the page in any slot. `bmTransition` is unchanged in the data file and
renders nowhere — the same treatment `bmFoundingCounter` gets, and for the same
reason. **The gold seam rule went with it**, because it existed only to divide
the two halves and would otherwise be a hairline dividing the last paragraph
from the section's bottom padding; it has to come back with the pivot, not
before it. That also settles the trade recorded at the foot of this section:
the first-person "me" no longer arrives six sections before the story it refers
to, because it is not on the page at all.

**The Core Philosophy block came off slot 2 on 2026-09-07**, also at the
owner's request. It was the amber card in the old section and survived the merge
as the pull-quote; removing it left slot 2 as a single centred column.
`bmCoreBelief.philosophyTitle` and `bmCoreBelief.philosophy` are unchanged in
the data file and render nowhere now, on the same terms.

**Two more lines came off the page the same day**, also at the owner's request
and on the same terms: `bmProgram.closer` ("If someone doesn't even know what
business they want to start yet…"), the centred paragraph under section 5's
pillar grid, and `bmFinalCta.supporting` ("Courses. Coaching. Community…"), the
last text on the page under section 10's button. Section 5 ends on the pillars
now and section 10 ends on its one action. Both strings are unchanged in the
data file and render nowhere. `bmFinalCta.supporting` carries an extra warning
there: it was the only place outside section 5 that listed what membership
includes, and a list of inclusions sitting directly under the page's one action
needs checking against §6 before it goes back, while price and guarantee terms
are still Phase C gates.

**The clarifier came off slot 2 on 2026-09-15**, at the owner's request and on
the same terms: `bmCoreBelief.clarifier` ("LEU Business Mastery is not about
avoiding hard work…") is unchanged in the data file and renders nowhere. It was
the section's last paragraph, under the proof row, so slot 2 now ends on the
proof line.

Slot 2 rather than slot 9, and the trade was real enough to record — it is
history now that the pivot is off the page, and it is the first thing to read if
it ever goes back. Slot 2 won because `bmProofStatement` is the page's only
credibility claim and has to be read *before* the offer and the application form
at slot 6, not after them. What it cost: `bmTransition` is written in the first
person and this table used to define it as "the transition from my story to your
story", so at slot 2 the "me" in "Everything that came before LEU taught me
something" arrived six sections before the story it refers to (the timeline,
slot 8), and the merged column ran we → I → you under one heading. Moving the
whole section below the timeline is one line in `page.tsx` if that trade ever
reads the wrong way round again.

Removing slot 9 also removed a join. That section existed so the timeline would
not run straight into a sales pitch, and without it slots 8 and 10 abut — two
`bg-black` sections, both carrying amber glows, with the timeline's scrubber
against the closing CTA's headline. This page has no dividers between sections,
so the light/dark alternation *is* the separator: `BmJourneyTimeline` is
`bg-neutral-950` now, and the closing CTA's own copy ("You can keep trying to
figure everything out alone…") is the bridge the deleted section used to be.
The numbering is **not** re-flowed — slot 9 is struck through above rather than
renamed — for the same reason section 7's hole is kept: the record has to stay
legible against the builds that came before it.

Two sections shipped in earlier builds and were removed at the owner's
request, with the sections after each renumbered: "The Vision" (the other
exploratory section), which sat between the Evolution and the founder story,
and **The Evolution** itself — the Phase I / II / III model that ran between
the founding offer and the founder story. The phase copy is gone from the
page, the data file, and `types/index.ts`; the phase model still stands as a
business plan (§9), it is just no longer marketed on the page.

**Section 7, Why I Built LEU, is a different case: it is paused, not
removed.** The owner asked for it out "for now", so `page.tsx` stops
rendering it while `BmFounderSection.tsx` and `bmFounder` stay whole and
unchanged — restoring the section is one JSX line plus its import, with no
content to rewrite. For that reason the numbering above deliberately keeps
its slot and the later sections are **not** renumbered; the table's #7 is a
hole in the live page today, not a mistake. Anything below that describes
section 7 as rendering describes the built section, not the page as it
currently ships.

**Section 8, The Journey, is locked — on the page, visibly not open.** The
owner asked it held back until launch on 2026-09-13, the same day chose a
visible placeholder over having it off the page entirely, and then chose
"Coming Soon" over a lock badge for its marker. Because launching is the
stated intent, the lock is a flag rather than a deleted line:
`BM_JOURNEY_LOCKED` in `data/business-mastery.ts`, read only by `page.tsx`.
While `true`, the slot renders `BmJourneyLocked` — the section's eyebrow and
title as the intro slide sets them, a chapter tease derived from `bmChapters`
(count, first title, last title, so it cannot drift from the data), and the
shared `BmComingSoon` marker with its own note (`bmJourney.lockedNote`) where
the timeline's start affordance would be. The retired badge text survives
unrendered as `bmJourney.lockedLabel`. **Unlocking is flipping that one
`true` to `false`** — nothing else. `BmJourneyTimeline`, `bmJourney`, and
`bmChapters` are all whole and unchanged, so the timeline arrives exactly as
it last rendered, coming-soon markers and all. Both states sit on
`bg-neutral-950`, so the join the note above records is intact throughout
and the closing CTA stays black. Slot 8 keeps its number on the same terms
as slot 7's hole.

### Why the added section sits where it does

- **Core Tenets (4)** lands between "who this is for" and "what the program
  is": the visitor sees themselves, then sees how we operate, then sees the
  program that operates that way. The slot was chosen for the 8-step Empire
  framework on a roadmap argument — "then sees the path". Three principles
  are not a path, so the placement now rests on stance rather than sequence;
  it survived the swap because the order still reads.

---

## 4. Files

Follows the venture-page architecture exactly (see `docs/THREAD.md` in the
Thread repo, or `docs/H1.md` in the H1 Performance repo, for the precedent;
both pages that set it have since moved to their own repos - see this repo's
`docs/THREAD.md` and `docs/H1.md`).

| File | Contents |
| --- | --- |
| `data/business-mastery.ts` | All page copy, the four audiences, the 3 core tenets, the seven pillars, the 14 timeline chapters, the founding counter (`claimed`, `total`, unrendered), palette constants |
| `types/index.ts` | Business Mastery interfaces appended |
| `components/business-mastery/BmHeroSection.tsx` | 1 — manifesto hero |
| `components/business-mastery/BmManifestoSection.tsx` | 2 — the merged manifesto (replaced `BmCoreBeliefSection.tsx` and `BmTransitionSection.tsx`) |
| `components/business-mastery/BmAudienceSection.tsx` | 3 — four audience cards + mission |
| `components/business-mastery/BmTenetsSection.tsx` | 4 — the three core tenets |
| `components/business-mastery/BmProgramSection.tsx` | 5 — "NOT a Course. A Coach." + pillars |
| `components/business-mastery/BmFoundingOfferSection.tsx` | 6 — offer, limited-spots box, guarantee expandable |
| `components/business-mastery/BmApplicationForm.tsx` | 6 — the form (fields in §5) |
| `components/business-mastery/BmFounderSection.tsx` | 7 — Why I Built LEU (built, not currently rendered — §3) |
| `components/business-mastery/BmJourneyTimeline.tsx` | 8 — interactive timeline |
| `components/business-mastery/BmJourneyLocked.tsx` | 8 — the Coming Soon placeholder rendered while `BM_JOURNEY_LOCKED` is true (§3) |
| `components/business-mastery/BmFinalCTASection.tsx` | 10 (built, not currently rendered — §3) |
| `components/business-mastery/BmComingSoon.tsx` | Shared coming-soon marker (§7) |
| `app/business-mastery/page.tsx` | Page assembly + metadata + structured data |
| `app/api/business-mastery-application/route.ts` | Application form handler, same Resend pattern as the other venture forms (Thread's `app/api/thread-order/route.ts` now lives in the Thread repo) |
| `components/sections/BusinessMasterySection.tsx` | Homepage teaser (§8), rendered as the left panel of `components/sections/VenturesSection.tsx` |

### Edits outside the new page

| File | Edit |
| --- | --- |
| `app/page.tsx` | Render `BusinessMasterySection` directly after `PortfolioSection` (that Portfolio section has since been removed, and so has `AboutSection`, so the teaser now follows the hero; it is now rendered through `VenturesSection`, beside the Lee Systems Co. teaser) |
| `components/sections/PortfolioSection.tsx` | Wire the "Start your own venture" button to `/business-mastery` (it was `type="button"` with no destination — the comment there said intentionally unwired *for now*; now was over). Superseded: the whole section was later removed from the homepage. |
| `components/sections/AboutSection.tsx` | Wire the "Get started on your dreams" button under the mission statement to `/business-mastery` (same story as the Portfolio button: `type="button"`, no destination, a comment saying intentionally unwired *for now*). The mission copy ends on making dreams of starting a business come true, so this program is where that sentence lands. |
| `data/navigation.ts` | Add `businessMastery: "/business-mastery"` to the page map, a nav entry for it, and a `businessMastery` key in `sectionIds` for the homepage teaser anchor |

Nav placement: its own entry in the main nav (it is the flagship program, not
one of the ventures, so it did not belong inside the Ventures menu). That menu
has since been flattened at the owner's request — the ventures became
top-level entries beside this one, with Lee Marketing Mastery keeping its three
offerings in a dropdown of its own. Lee Marketing Mastery is the one venture
left since Thread T-Shirts came off this site (`docs/THREAD.md`); Business
Mastery leads the two.
Easy to move later if the header gets crowded.

---

## 5. The application form

Same skeleton as the other venture forms (the LMM consultations; Thread's
order request and the H1 consultation form it was modelled on now live in their
own repos): honeypot field, server-side validation, per-field errors, Resend
delivery, own subject line so a Business Mastery application is
distinguishable in the inbox.

Proposed fields:

| Field | Required |
| --- | --- |
| Full name | yes |
| Email | yes |
| Phone | yes |
| Where are you right now? (the four audiences from §3 as options, so the answer maps to the page's own language) | yes |
| What are you building — or what do you want to build? | yes |
| Why do you want in as a founding member? | no |
| Honeypot | hidden |

Env override pattern mirrors the other routes:
`BM_TO_EMAIL || CONTACT_TO_EMAIL || "ceo@leeenterprisesunlimited.com"`.

---

## 6. Honesty constraints (repo standard, applies here)

This repo has an explicit, documented standard — see the long comment in
`data/ventures.ts` — of publishing only what can be substantiated: name the
work, not the promised result. Three items in the owner's copy were checked
against that standard before rendering:

1. **"We have built 50+ businesses, worked with 1,000+ businesses, and helped
   generate $150,000+ for our clients."** Published verbatim in
   `bmProofStatement`. The owner confirmed the original word-quantity version
   of this line ("dozens", "hundreds", "thousands upon thousands") as true on
   2026-08-25, and supplied these hard figures on 2026-09-13. If the facts
   ever change, change the line — the standard is the words match the record.
2. **The founding counter — retired, and with it the claim.** It rendered
   `5 / 20` from `bmFoundingCounter`, figures the owner confirmed as real
   rather than illustrative. The owner has since asked for a plain "Limited
   Spots" box in its place, so no page states a number of spots and this
   standard has nothing left to check here. `bmFoundingCounter` stays in
   `data/business-mastery.ts` as the record and as Phase C's hook, unrendered
   and therefore free to go stale. If anything displays it again — Phase C
   deriving it from completed Stripe payments, or the counter coming back —
   the true-count rule comes back with it: it must show the real figure
   before it ships. What replaced it is weaker in kind, the same trade §9
   describes for the teaser: "limited spots" is not checkable against
   anything, and holds only while spots really are limited.
3. **The 90-day guarantee.** *Stated* in this build — allowed because no
   payment is taken on-page — with its expandable showing a plain-language
   summary plus a line pointing to the contact email for the full terms
   (it carried a coming-soon marker until 2026-09-27). Full guarantee terms,
   eligibility, refund conditions, and ToS must exist **before Phase C ships
   any checkout**. That is a hard gate, not a nice-to-have.

---

## 7. The coming-soon treatment

Owner's call: for anything not decided yet, put "coming soon" and render
whatever information does exist. One shared component (`BmComingSoon`), one
consistent look — a quiet amber-outlined marker, not a broken-feeling stub —
used in three places. One renders today: the journey's — carried by the locked placeholder (`BmJourneyLocked`, §3) with
its own note (`bmJourney.lockedNote`) while the timeline is closed, and by
the timeline's intro slide (`bmJourney.comingSoonNote`) once it opens. This
is the journey's sanctioned marker in either state, not a fourth place. The
placeholder briefly carried a Lock-badged "Locked Until Complete" instead,
until the owner chose "Coming Soon" the same day; the retired badge text
survives unrendered as `bmJourney.lockedLabel`. The founder section is
paused (§3), so its marker renders nowhere until the section returns. The
guarantee expandable dropped its marker on 2026-09-27 at the owner's request
and now points people to the contact email instead.

| Where | What renders now | What's coming |
| --- | --- | --- |
| Why I Built LEU (8) — *section paused, §3* | The legacy statement (§9 below) + the supporting idea | The full founder story from the My Story document |
| Journey timeline (9) — *section locked, §3* | The locked placeholder: title, chapter tease, Coming Soon. Once unlocked: the 14 chapter titles as the interactive structure | Each chapter's story |
| Guarantee expandable (6) — *no marker since 2026-09-27* | Plain-language guarantee summary + contact email for the details | Full terms, eligibility, refund conditions, ToS |

The timeline is worth building fully now even with empty chapters: the
interaction model gets designed and settled, and the story drops in later as
a pure content swap in `data/business-mastery.ts`. Its presentation is the
horizontal chapter-by-chapter experience from the timeline the original page
plan cited as structural inspiration, in LEU's gold-on-black: a full-width
intro slide, one slide per chapter in the owner's order — The Beginning
through LEU — edge arrows, and a bottom scrubber bar: a dot per stop with its
title below, current stop lit.

**Chapter numbers are not displayed anywhere in this section.** The reference
numbered both the scrubber stops and the slides, and this did too — stops
labelled `01`–`14`, slides carrying a ghost numeral behind a `CHAPTER 01 / 14`
eyebrow — until the owner asked them off the scrubber and then off the slides
as well. Both eyebrow and numeral went with the numbers rather than surviving
as a bare "CHAPTER", which would label nothing. `chapter.number` stays in the
data as the ordering key and in the accessible names of the slides and stops,
where position still has to be legible; it is no longer a visible element, so
the chapters are identified on screen by title alone. Navigation is native horizontal scroll-snap (swipe /
sideways scroll / arrow keys / edge arrows / scrubber clicks) — the page's
vertical scroll is never hijacked. Chapter titles ship as the owner's current
numbered list; the "cinematic" alternates (`OBSESSION`, `ALL IN`, `THE BOUNCE
BACK`…) are recorded in the data file as a commented alternative, to be
settled when the story is written.

Legacy statement: two candidates exist —

> My legacy is a helping hand to all young entrepreneurs.

> My legacy isn't what I build. It's who I help build.

Render the second (the evolved version) as the section's centerpiece unless
the owner objects; keep the first in the data file as the alternate. That is
still how the section is built — it just is not on the page at the moment
(§3), so nothing renders either candidate today.

---

## 8. The homepage teaser

One section, anchored by the new `sectionIds.businessMastery`. It shipped
directly after `PortfolioSection`; that section has since been removed from
the homepage, as has `AboutSection` after it, so it now follows the hero. It is a doorway, not a
summary: the manifesto line, one or two sentences on what the program is, a
scarcity line, and a single CTA — `ACHIEVE YOUR DREAMS →` — routing to
`/business-mastery`.

The scarcity line shipped as the real founding counter, sharing
`bmFoundingCounter` with the page. At the owner's request it is now the flat
statement `bmHero.scarcityLine` ("Enrollment Closing Soon"), so the teaser
states no number. Note what changed in kind: the counter was checkable
against a figure the owner maintains, and this line is not — it holds only as
long as enrollment really is closing, so it needs changing when that stops
being true.

The page's own counter has since gone the same way, for the same reason —
a "Limited Spots" box in the offer section (§6.2). Both surfaces now make an
unquantified scarcity claim, and no rendered figure remains to check.

Since 2026-09-26 it is no longer a full-width section of its own: it is the
left half of `VenturesSection`, under a shared heading - "Learn to build it,
or have it built for you." - side by side with the Lee Systems Co. teaser from
1024px up, with an "or" on the seam between them, and stacked above it on
smaller screens. It opens with a "Learn it yourself" label; the heading and
both labels are `venturesHome` in `data/company.ts`. The copy is centred in
the panel, the whole panel links to `/business-mastery`, and pointing at one
panel dims the other. The layout lives in `.ventures` in `app/globals.css`;
the teaser's own copy above is unchanged.

It deliberately does **not** repeat the pillars or audiences; the page does
that. It shipped alongside a second homepage CTA to the same place — the
Portfolio "Start your own venture" button — which was fine, same promise, same
destination. With the Portfolio section removed, this section's button is the
homepage's only route to `/business-mastery`.

---

## 9. Build phases

| Phase | Scope | Gate |
| --- | --- | --- |
| **A — built** | Everything in §3–§8: the full page with coming-soon markers, the form + API route, the homepage teaser, nav wiring, metadata | Done |
| **B — story integration** | My Story document lands: journey chapters filled, founder section completed, final chapter titles settled | Owner writes the story — and, since the founder section is paused (§3), decides whether it goes back on the page |
| **C — checkout** | Stripe one-time payment for founding members, counter driven by completed payments via the existing webhook route, guarantee terms page | Price set; guarantee terms + ToS written (§6.3) |
| **Later** | Phase II monthly membership mechanics, Phase III selective admission — the model is a business plan only; its marketing copy was removed from the page with the Evolution section (§3) | Business decision |

---

## 10. Open items for the owner

Content the build cannot invent, in priority order. Items 1–2 from the
original list are resolved: the owner confirmed the proof-line figures and
the 5/20 counter as true on 2026-08-25, and on 2026-09-13 replaced the
proof line's word-quantities with hard numbers (§6.1). The proof line
renders verbatim; the counter no longer renders at all (§6.2).

1. The founding-member price (needed for Phase C, not Phase A).
2. Guarantee terms / eligibility / refund conditions (gates Phase C).
3. The My Story document (gates Phase B).
4. Legacy statement pick — the evolved version is the built centerpiece per
   §7; say the word to swap in the alternate. Not urgent while the section
   is off the page (§3), since neither candidate renders today.
5. ~~Keep `bmFoundingCounter.claimed` current as members join.~~ Moot while
   nothing renders it (§6.2). It becomes a live obligation again the moment
   a spot count is displayed anywhere.
