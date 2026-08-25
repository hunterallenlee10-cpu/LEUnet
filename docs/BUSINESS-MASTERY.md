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
| Homepage hook | The currently-unwired "Start your own venture" button in `PortfolioSection` routes to `/business-mastery`. A new teaser section also introduces the program on the homepage. |
| Join flow | **Application form first.** Own API route, Resend email to `ceo@leeenterprisesunlimited.com`, same pattern as every other venture form. No on-page payment in this build. |
| Payments | None in this build. Stripe checkout for the founding-member one-time payment is Phase C — the scaffolding already exists (`app/api/stripe/*`), but price, guarantee terms, and refund handling must be written first. |
| Founding counter | A value the owner maintains in `data/business-mastery.ts` (`claimed` / `total`). It must show the **real** number — see §6. |
| Unfinished content | Render whatever is confirmed, and mark the rest with a consistent **"coming soon"** treatment (owner's call). Applies to the Journey chapters, the full founder story, and the guarantee terms. |
| Exploratory sections | **Both included**: "How to Build Your Own Empire" and "The Vision" make this first build (owner's call). Placement in §3. |
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

Core through-line, repeated at open and close:

> No great accomplishment in history was achieved alone.

---

## 3. Page flow (final order)

The owner's flow, with the two added sections slotted where they do the most
work:

| # | Section | Content source | State |
| --- | --- | --- | --- |
| 1 | Hero — manifesto | Owner doc §1: title, "No great accomplishment…", "Speedrun Your Way to Success", CTA `ACHIEVE YOUR DREAMS →` scrolls to the offer | Ready |
| 2 | The Core Belief | Owner doc §2: "Nobody Builds Something Great Alone", network as the driving force, hard work + investment are both required | Ready (see §6 on the proof claims) |
| 3 | Who This Is For | Owner doc §3: four audiences (Aspiring / Young / Early-Stage / Growing) + mission line | Ready |
| 4 | **How to Build Your Own Empire** | Owner doc exploratory section: the 8-step framework (Starting from zero → Creating freedom) | Ready as a framework; placed here because it is the roadmap, and the next section is the vehicle |
| 5 | What Business Mastery Actually Is | Owner doc §4: "NOT a Course. A Coach." + seven pillars (classes, webinars, daily calls, coaching, hands-on help, community, tools & resources) | Ready |
| 6 | Founding Member Offer | Owner doc: one-time payment positioning, live-style counter, 30-day guarantee, **application form** | Form ready; price + guarantee terms are content gaps (§6) |
| 7 | The Evolution | Owner doc §5: Phase I Founding Members / Phase II Growth / Phase III Stay In The Room, closing on the through-line | Ready |
| 8 | **The Vision** | Owner doc exploratory section: what BM is becoming, who we want inside, the network, what members accomplish together, bigger than courses | Ready as themes; placed after the Evolution because it answers where the three phases lead |
| 9 | Why I Built LEU | Owner doc §6: legacy statement + supporting idea | Partial — legacy statement candidates exist, full story doesn't. Renders what exists + coming-soon marker |
| 10 | My Journey — timeline | Owner doc §7: interactive 14-chapter timeline | Titles only. Chapter bodies are coming-soon until the My Story document is written |
| 11 | Your Journey Is Just Beginning | Owner doc §8: the transition from my story to your story | Ready |
| 12 | Achieve Your Dreams Today | Owner doc §9: final conversion section, CTA `JOIN LEU BUSINESS MASTERY →` scrolls back to the offer/form | Ready |

### Why the two added sections sit where they do

- **Empire (4)** lands between "who this is for" and "what the program is":
  the visitor sees themselves, then sees the path, then sees the program as
  the way to walk it faster.
- **Vision (8)** follows the three-phase Evolution: the phases describe how
  the network grows, the Vision describes what it grows into. Putting it
  before the founder story also makes section 9 read as "and here is why this
  matters to me personally."

---

## 4. Files

Follows the venture-page architecture exactly (see `docs/H1.md` for the
precedent).

| File | Contents |
| --- | --- |
| `data/business-mastery.ts` | All page copy, the four audiences, the 8 empire steps, the seven pillars, the three phases, the 14 timeline chapters, the founding counter (`claimed`, `total`), palette constants |
| `types/index.ts` | Business Mastery interfaces appended |
| `components/business-mastery/BmHeroSection.tsx` | 1 — manifesto hero |
| `components/business-mastery/BmCoreBeliefSection.tsx` | 2 |
| `components/business-mastery/BmAudienceSection.tsx` | 3 — four audience cards + mission |
| `components/business-mastery/BmEmpireSection.tsx` | 4 — 8-step framework |
| `components/business-mastery/BmProgramSection.tsx` | 5 — "NOT a Course. A Coach." + pillars |
| `components/business-mastery/BmFoundingOfferSection.tsx` | 6 — offer, counter, guarantee expandable |
| `components/business-mastery/BmApplicationForm.tsx` | 6 — the form (fields in §5) |
| `components/business-mastery/BmEvolutionSection.tsx` | 7 — three phases |
| `components/business-mastery/BmVisionSection.tsx` | 8 |
| `components/business-mastery/BmFounderSection.tsx` | 9 — Why I Built LEU |
| `components/business-mastery/BmJourneyTimeline.tsx` | 10 — interactive timeline |
| `components/business-mastery/BmTransitionSection.tsx` | 11 |
| `components/business-mastery/BmFinalCTASection.tsx` | 12 |
| `components/business-mastery/BmComingSoon.tsx` | Shared coming-soon marker (§7) |
| `app/business-mastery/page.tsx` | Page assembly + metadata + structured data |
| `app/api/business-mastery-application/route.ts` | Application form handler, Resend pattern from `app/api/h1-consultation/route.ts` |
| `components/sections/BusinessMasterySection.tsx` | Homepage teaser (§8) |

### Edits outside the new page

| File | Edit |
| --- | --- |
| `app/page.tsx` | Render `BusinessMasterySection` directly after `PortfolioSection` |
| `components/sections/PortfolioSection.tsx` | Wire the "Start your own venture" button to `/business-mastery` (it is currently `type="button"` with no destination — the comment there says intentionally unwired *for now*; now is over) |
| `data/navigation.ts` | Add `businessMastery: "/business-mastery"` to the page map, a nav entry for it, and a `businessMastery` key in `sectionIds` for the homepage teaser anchor |

Nav placement: its own entry in the main nav (it is the flagship program, not
one of the three ventures, so it does not belong inside the Ventures menu).
Easy to move later if the header gets crowded.

---

## 5. The application form

Same skeleton as the H1 consultation form: honeypot field, server-side
validation, per-field errors, Resend delivery, own subject line so a Business
Mastery application is distinguishable in the inbox.

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

1. **"We have built dozens of businesses, worked with hundreds of businesses,
   and helped generate thousands upon thousands of dollars."** Published
   verbatim in `bmProofStatement`. The owner confirmed on 2026-08-25 that
   every figure in this line is true as stated. If the facts ever change,
   change the line — the standard is the words match the record.
2. **The founding counter.** Renders `5 / 20` from `bmFoundingCounter` in
   `data/business-mastery.ts` — the owner confirmed these are the real
   current figures, not an illustration. The counter is owner-maintained:
   update `claimed` there as members join, until Phase C derives it from
   completed Stripe payments. It must always show the true count.
3. **The 30-day guarantee.** *Stated* in this build — allowed because no
   payment is taken on-page — with its expandable showing a plain-language
   summary plus a coming-soon note for the full terms. Full guarantee terms,
   eligibility, refund conditions, and ToS must exist **before Phase C ships
   any checkout**. That is a hard gate, not a nice-to-have.

---

## 7. The coming-soon treatment

Owner's call: for anything not decided yet, put "coming soon" and render
whatever information does exist. One shared component (`BmComingSoon`), one
consistent look — a quiet amber-outlined marker, not a broken-feeling stub —
used in exactly three places:

| Where | What renders now | What's coming |
| --- | --- | --- |
| Why I Built LEU (9) | The legacy statement (§9 below) + the supporting idea | The full founder story from the My Story document |
| Journey timeline (10) | The 14 chapter titles as the interactive structure | Each chapter's story |
| Guarantee expandable (6) | Plain-language guarantee summary | Full terms, eligibility, refund conditions, ToS |

The timeline is worth building fully now even with empty chapters: the
interaction model gets designed and settled, and the story drops in later as
a pure content swap in `data/business-mastery.ts`. Its presentation is the
horizontal chapter-by-chapter experience from the owner's reference (the
"A Life in Full" timeline the original page plan cited as structural
inspiration), in LEU's gold-on-black: a full-width intro slide, one slide
per chapter `01 — The Beginning` through `14 — LEU`, edge arrows, and a
bottom scrubber bar — chapter number above each dot, title below, current
stop lit. Navigation is native horizontal scroll-snap (swipe / sideways
scroll / arrow keys / edge arrows / scrubber clicks) — the page's vertical
scroll is never hijacked. Chapter titles ship as the
owner's current numbered list; the "cinematic" alternates (`OBSESSION`, `ALL
IN`, `THE BOUNCE BACK`…) are recorded in the data file as a commented
alternative, to be settled when the story is written.

Legacy statement: two candidates exist —

> My legacy is a helping hand to all young entrepreneurs.

> My legacy isn't what I build. It's who I help build.

Render the second (the evolved version) as the section's centerpiece unless
the owner objects; keep the first in the data file as the alternate.

---

## 8. The homepage teaser

One section, directly after `PortfolioSection`, anchored by the new
`sectionIds.businessMastery`. It is a doorway, not a summary: the manifesto
line, one or two sentences on what the program is, the founding-member
scarcity line (real counter, shared from the same data file), and a single
CTA — `ACHIEVE YOUR DREAMS →` — routing to `/business-mastery`.

It deliberately does **not** repeat the pillars, phases, or audiences; the
page does that. Two CTAs on the homepage now lead to the same place (this
section's button and the Portfolio "Start your own venture" button), which is
fine — same promise, same destination.

---

## 9. Build phases

| Phase | Scope | Gate |
| --- | --- | --- |
| **A — built** | Everything in §3–§8: the full page with coming-soon markers, the form + API route, the homepage teaser, nav wiring, metadata | Done |
| **B — story integration** | My Story document lands: journey chapters filled, founder section completed, final chapter titles settled | Owner writes the story |
| **C — checkout** | Stripe one-time payment for founding members, counter driven by completed payments via the existing webhook route, guarantee terms page | Price set; guarantee terms + ToS written (§6.3) |
| **Later** | Phase II monthly membership mechanics, Phase III selective admission — marketing copy exists on the page from day one; the mechanics are future business decisions | Business decision |

---

## 10. Open items for the owner

Content the build cannot invent, in priority order. Items 1–2 from the
original list are resolved: the owner confirmed the proof-line figures and
the 5/20 counter as true on 2026-08-25, and both render verbatim.

1. The founding-member price (needed for Phase C, not Phase A).
2. Guarantee terms / eligibility / refund conditions (gates Phase C).
3. The My Story document (gates Phase B).
4. Legacy statement pick — the evolved version renders as the centerpiece
   per §7; say the word to swap in the alternate.
5. Keep `bmFoundingCounter.claimed` current as members join.
