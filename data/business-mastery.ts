import { BmAudience, BmChapter, BmPillar, BmTenet } from "@/types";
import { site } from "@/data/site";
import { businessMasteryPage } from "@/data/navigation";

// ---------------------------------------------------------------------------
// Business Mastery (/business-mastery)
//
// Nearly every sentence here is the owner's own copy, carried verbatim from
// the page plan recorded in docs/BUSINESS-MASTERY.md. The owner confirmed on
// 2026-08-25 that the published figures — the proof line in
// `bmProofStatement` and the 5/20 founding counter — are accurate as stated,
// and on 2026-09-13 replaced the proof line's word-quantities ("dozens",
// "hundreds", "thousands upon thousands") with the hard figures it carries
// now. Do not soften, round, or "improve" them without the owner.
// ---------------------------------------------------------------------------

/** In-page anchor for the offer + application form. Every CTA on the page
 * points here, including the hero's. */
export const BM_OFFER_ID = "bm-offer";

const joinByLink =
  site.businessMastery.joinMode === "join" && site.businessMastery.joinUrl;

/**
 * The one Business Mastery action, wherever it appears off the Business
 * Mastery page: "Apply to join" while people apply through the form on the
 * page, "Join Business Mastery" once `joinMode` in data/site.ts is "join" and
 * a join link is set.
 */
export const businessMasteryAction = joinByLink
  ? { label: "Join Business Mastery", href: site.businessMastery.joinUrl }
  : { label: "Apply to join", href: `${businessMasteryPage}#${BM_OFFER_ID}` };

/**
 * The same action on the Business Mastery page itself, where applying is a
 * scroll down to the form rather than a trip to the page. A bare #fragment,
 * so it works whichever address the page is on: /business-mastery here, or
 * the root of its own subdomain.
 */
export const bmPageAction = joinByLink
  ? businessMasteryAction
  : { label: businessMasteryAction.label, href: `#${BM_OFFER_ID}` };

/**
 * The founding-member count. NOTHING RENDERS THIS RIGHT NOW - it is a record,
 * not display copy, and no page states a number of spots.
 *
 * It was the "5 / 20 FOUNDING MEMBERS" figure in the offer section until the
 * owner asked for a plain "Limited Spots" box there, which was also what
 * retired it from the homepage teaser before that. Both the box and the
 * teaser's "Enrollment Closing Soon · 4 Spots Remain" line came off on
 * 2026-09-28 at the owner's request; any scarcity wording now lives in
 * `site.businessMastery.scarcity` (data/site.ts) and shows only when set.
 * Kept because it is the owner's real enrollment state and Phase C of
 * docs/BUSINESS-MASTERY.md is built around it - that phase derives the count
 * from completed Stripe payments and needs somewhere to put it.
 *
 * Because it is unrendered, `claimed` being stale misleads nobody today. The
 * moment anything displays it again, §6.2's true-count rule applies and it
 * has to be correct first.
 */
export const bmFoundingCounter = {
  claimed: 5,
  total: 20,
} as const;

// --- 1. Hero ---------------------------------------------------------------

// The manifesto and subtitle replaced "Learn how to build, scale, and
// dominate." and "Speedrun Your Way to Success." on 2026-09-28, from the
// owner's site fix plan. The description is the owner's line, kept.
export const bmHero = {
  manifesto: "Learn to start a business and actually use AI.",
  /**
   * The manifesto, set as two lines since 2026-10-06: the first dim, the
   * second bright, the way every "why now" row below sets its heading. Not
   * new copy. Joined with a space these ARE `manifesto`, verbatim, and
   * `bmHeroCopyIsConsistent` below holds the two to that. Change the sentence
   * and change the split in the same edit.
   */
  manifestoLines: ["Learn to start a business", "and actually use AI."],
  subtitle: "Live demos, coaching, and a community of people building alongside you.",
  /**
   * `subtitle` as runs, so the hero can set its key phrase bright against a
   * grey sentence, as the paragraphs in the "why now" rows do. Same words,
   * same order; `bmHeroCopyIsConsistent` holds them to `subtitle`.
   */
  subtitleRuns: [
    { text: "Live demos, coaching, and " },
    { text: "a community of people building alongside you.", strong: true },
  ],
  description:
    "Skip years of unnecessary trial and error by learning from people already building, failing, adapting, and winning.",
} as const;

/**
 * The line under the hero's button (2026-10-06): three facts the page already
 * states, each restated in three words so they fit on one line. Not new
 * claims, and never a count, a deadline or a price:
 *
 * - "By application" is `site.businessMastery.joinMode` being "apply", and
 *   leaves the line when joining stops being by application.
 * - "Paid monthly membership" is `site.businessMastery.format`, which the
 *   offer section renders in full ("A paid monthly membership").
 * - "90-day money-back guarantee" is the guarantee in
 *   data/business-mastery-terms.ts, which the offer section renders as one
 *   of its membership terms.
 *
 * Change the fact where it lives and change the short form here in the same
 * edit, or the page states two versions of one thing.
 */
export const bmHeroTrust: readonly string[] = [
  ...(site.businessMastery.joinMode === "apply" ? ["By application"] : []),
  "Paid monthly membership",
  "90-day money-back guarantee",
];

/**
 * True when the two split forms of the hero copy still spell the sentences
 * they were split from. Read by the hero, which falls back to the whole
 * sentences if this is ever false, so an edit to one side can never publish a
 * sentence the owner didn't write.
 */
export const bmHeroCopyIsConsistent =
  bmHero.manifestoLines.join(" ") === bmHero.manifesto &&
  bmHero.subtitleRuns.map((run) => run.text).join("") === bmHero.subtitle;

// --- Why now: The World Is About To Change (page slot 2) ------------------

/**
 * Section 2, "why now": three alternating rows modelled on a layout the owner
 * sent on 2026-09-29 (The Real World's "The World Is About To Change"), each
 * with a pill label, a two-line heading (the first line dim, the second
 * bright) and a paragraph whose `strong` phrases are set bright.
 *
 * BUILD COPY, written for that request and safe to edit, EXCEPT the two lines
 * carried over from the "Who this is for" section this replaced:
 * `bmAudienceHeading` and `bmAudienceSubheading` are still the owner's
 * sentences, verbatim, and the third row's path still draws `bmAudiences`.
 * Nothing here is a result or a figure: no income, no "10x", no client
 * claims, the same standard as §6 of docs/BUSINESS-MASTERY.md.
 *
 * Each paragraph is a list of runs; a run with `strong` renders bright.
 */
export const bmShift = {
  eyebrow: "Why now",
  heading: "The world is about to change.",
  rows: [
    {
      id: "time",
      label: "Time's ticking",
      dim: "You're running",
      bright: "out of time.",
      body: [
        { text: "AI is changing how businesses are started, run and grown, and it is happening " },
        { text: "now, not someday.", strong: true },
        { text: " Every month you wait, the people already learning it get further ahead. " },
        { text: "What are you doing to prepare?", strong: true },
      ],
    },
    {
      id: "ai",
      label: "The AI shift",
      dim: "AI is here.",
      bright: "Use it or fall behind.",
      body: [
        { text: "Imagine replying to every lead in seconds, writing a week of content in an afternoon, and " },
        { text: "letting your admin run itself", strong: true },
        { text: " while you do the work that pays. The tools already exist, and most are cheap or free. " },
        { text: "Most people just haven't learned how to use them.", strong: true },
      ],
    },
    {
      id: "way-out",
      label: "The way out",
      dim: "Learn the skill.",
      bright: "Build the business.",
      body: [
        { text: "Business Mastery teaches you to start a business and actually use AI, with live demos, coaching, and a network of people building alongside you. Wherever you are, " },
        { text: "you learn by doing.", strong: true },
        { text: " Don't wait for success to find you. " },
        { text: "Take control.", strong: true },
      ],
    },
  ],
} as const;

// --- 2. The Core Belief ----------------------------------------------------

/**
 * NOTHING IN HERE RENDERS RIGHT NOW. The owner asked the manifesto ("What we
 * believe", "Nobody builds something great alone.", the message, the lead-in
 * and "Network.") off the page on 2026-09-29; the tenets that shared its
 * section stayed. Kept on the same terms as the fields below that were
 * already off: the owner's own copy, and taking a block off a page is not the
 * same decision as deleting the words. BmManifestoSection records how it
 * goes back. The file header's rule applies the moment any of it renders.
 */
export const bmCoreBelief = {
  heading: "Nobody builds something great alone.",
  message:
    "Be prepared to work harder than you've ever worked. Learn more than you've ever learned. Achieve more than you've ever achieved.",
  lead: "None of this happens without one of the greatest driving forces behind success:",
  force: "Network.",
  /**
   * NOTHING RENDERS THIS RIGHT NOW. The owner asked it off the page on
   * 2026-09-15, and it is kept on the same terms as the two below: it is the
   * owner's own confirmed copy, and taking a paragraph off a page is not the
   * same decision as deleting the words. It was the last paragraph of
   * BmManifestoSection, under the proof row. If it renders again, the file
   * header's rule applies: the owner's sentence, verbatim.
   */
  clarifier:
    "Business Mastery is not about avoiding hard work. It is about making that hard work more effective by putting you around people, information, systems, and opportunities that can accelerate your progress.",
  /**
   * NOTHING RENDERS THESE TWO RIGHT NOW. The owner asked the Core Philosophy
   * block off the page on 2026-09-07, and they are kept for the same reason
   * `bmFoundingCounter` is: they are the owner's own confirmed copy, and taking
   * a block off a page is not the same decision as deleting the words. They are
   * one JSX block away from coming back — BmManifestoSection records where it
   * used to sit, between the clarifier and the gold seam rule.
   *
   * Because they are unrendered, editing them changes nothing on the site. The
   * moment either one renders again, the file header's rule applies to it in
   * full: it is the owner's sentence, verbatim, not to be softened or improved.
   */
  philosophyTitle: "Core Philosophy",
  philosophy:
    "Everyone wants to build freedom through business. But too many people question a small investment and endless work as though either one is optional. Success requires both.",
} as const;

/** The owner's track record, published exactly as stated. The figures are the
 * owner's own, supplied 2026-09-13, replacing the word-quantities ("dozens",
 * "hundreds", "thousands upon thousands") the owner had confirmed on
 * 2026-08-25 — hard numbers now, still the owner's to change and nobody
 * else's. The "+" on each is the owner's own floor, not a flourish. */
export const bmProofStatement =
  "We have built 50+ businesses, worked with 1,000+ businesses, and helped generate $150,000+ for our clients.";

/**
 * The same track record, re-set as its three figures for the row in
 * BmProofSection (the foot of BmManifestoSection until 2026-09-28).
 *
 * NOT A REWRITE AND NOT A SECOND CLAIM. Every figure below is lifted from
 * `bmProofStatement` above, and that sentence is still what the page
 * publishes: the section renders it verbatim for screen readers and draws
 * this row for everyone else. The sentence is the record; this is only how it
 * is set. Each `value` is the number exactly as the sentence states it, and
 * each `label` is the sentence's own words for what that number counts.
 *
 * The file header's rule therefore governs both, and the two copies of this
 * claim cannot be allowed to drift: if the owner changes a figure, change it
 * in `bmProofStatement` and here in the same edit, or the site states two
 * different track records at once.
 */
export const bmProofPoints = [
  { value: "50+", label: "Businesses built" },
  { value: "1,000+", label: "Businesses worked with" },
  { value: "$150,000+", label: "Generated for our clients" },
] as const;

// --- 3. Who This Is For ----------------------------------------------------

export const bmAudienceHeading = "Built for people who know they want more.";

/** The line under the heading above, chosen by the owner on 2026-09-15. The
 * file header's rule applies: the owner's sentence, verbatim. */
export const bmAudienceSubheading =
  "Because traffic, cubicle, sleep, repeat was never the dream.";

// Three stages, read left to right as a path. The owner asked on 2026-09-27
// for the original four audiences cut to three: "Aspiring Entrepreneurs" and
// "Young Entrepreneurs" merged into stage 01 ("Young" was an age, not a
// stage, and overlapped with "Aspiring"). Stages 02 and 03 are the owner's
// "Early-Stage" and "Growing" lines, lightly trimmed.
export const bmAudiences: BmAudience[] = [
  {
    id: "starting",
    title: "Starting from zero",
    description:
      "You know you want to build something but don't know where to start, and you may lack the experience, connections, or capital to get going.",
  },
  {
    id: "early",
    title: "Just getting started",
    description:
      "You've already started, but you're figuring everything out as you go.",
  },
  {
    id: "growing",
    title: "Ready to grow",
    description:
      "You have something working and want help taking it to the next level.",
  },
];

// --- 4. Our Core Tenets ----------------------------------------------------

// The three tenet titles are the owner's, in the owner's order: Speed, Money
// In, For Free. They replaced the eight-step "How to Build Your Own Empire"
// ladder at the owner's request. Do not rename, expand, or re-order them
// without the owner, and do not grow the list back into a framework - three
// is the point. The titles stay capitalized as names; the heading is sentence
// case like every other heading on the site. The one-line descriptions expand
// each title in the same register; "Money In" and "For Free" are the
// build's copy, not the owner's, and are the safest place to edit. The
// "Speed" description is the owner's own, supplied 2026-09-15 — the file
// header's rule applies to it: verbatim, not to be softened or improved.
//
// "For Free" was "Start Lean" for part of 2026-09-28 (the owner's site fix
// plan), because "For Free" beside a paid membership can read as a claim
// about its price; the owner asked for "For Free" back the same day. It is
// about what it takes to START A BUSINESS - free tools and the
// member's own effort - and must never be written so it can be read as a
// claim about the price of membership, which is paid monthly and carries the
// guarantee in `bmOffer`. For the same reason nothing here lists the network,
// the tools library, or anything else membership includes among the things
// that cost nothing.

// Cut to its first sentence on 2026-09-28, when the tenets merged into the
// manifesto (BmManifestoSection) at the owner's request. The dropped sentence
// was "Every part of Business Mastery runs on them.", which restated the
// first once the two sections were one.
export const bmTenetsIntro = {
  heading: "Our core tenets",
  description:
    "Three principles sit behind everything we build and everything we help members build.",
} as const;

export const bmTenets: BmTenet[] = [
  {
    id: "speed",
    number: 1,
    title: "Speed",
    description:
      "Forward momentum coupled with instant action is how winners stay ahead. Plan to move quickly and destroy the habit of procrastination.",
  },
  {
    id: "money-in",
    number: 2,
    title: "Money In",
    description:
      "Revenue is the first real proof an idea works, so getting paid comes early, not last.",
  },
  {
    id: "for-free",
    number: 3,
    title: "For Free",
    description:
      "A business can start with free tools and your own effort, long before it needs money.",
  },
];

// --- 5. What Business Mastery Actually Is ----------------------------------

export const bmProgram = {
  // The owner's replacement for "NOT a Course. A Coach." (2026-09-15),
  // title-cased to match every other heading on the page, with the plural
  // apostrophe dropped ("entrepreneur's" -> "Entrepreneurs").
  heading: "A network of dedicated entrepreneurs.",
  // The owner's wording, supplied 2026-09-27; it replaced "Members are not
  // simply purchasing prerecorded information. They're entering a
  // business-development environment."
  description:
    "Learn the skills to start, build, & develop your business to the next level.",
  /**
   * NOTHING RENDERS THIS RIGHT NOW. The owner asked the closing line off
   * section 5 on 2026-09-07, in the same pass that took the Core Philosophy
   * block off section 2, and it is kept on the same terms: it is the owner's
   * own copy, and taking a line off a page is not the same decision as deleting
   * the sentence. BmProgramSection records where it used to sit — one paragraph
   * under the pillar grid.
   *
   * Editing it changes nothing on the site while that stays true. The moment it
   * renders again, the file header's rule applies to it in full.
   */
  closer:
    "If someone doesn't even know what business they want to start yet, we help them work through that too.",
} as const;

export const bmPillars: BmPillar[] = [
  {
    id: "classes",
    title: "Subject-specific demos",
    description:
      "Watch real business tasks done start to finish, with demos broken down by subject across starting, operating, and growing a business.",
  },
  {
    id: "webinars",
    title: "Live webinars",
    description:
      "Deeper sessions focused on specific strategies, problems, opportunities, and industries.",
  },
  {
    id: "calls",
    title: "Daily calls",
    description:
      "Regular access to conversations, lessons, accountability, collaboration, and guidance.",
  },
  {
    id: "coaching",
    title: "Personal coaching",
    description:
      "Direct help based on each member's individual business, goals, situation, and problems.",
  },
  {
    id: "hands-on",
    title: "Hands-on help",
    description:
      "We don't just tell you what to do. We help you work through it. We provide step-by-step, bulletproof instruction for success.",
  },
  {
    id: "community",
    title: "Private community and professional network",
    description:
      "A network of entrepreneurs building businesses alongside one another.",
  },
  {
    id: "tools",
    title: "Tools and resources",
    description:
      "A growing library of what you need to build with, added to over time.",
    items: [
      "Business ideas and templates",
      "Systems",
      "Automation",
      "Marketing resources",
      "Sales resources",
      "Job opportunities",
      "Business opportunities",
      "Networking opportunities",
      "Templates and documents",
      "New resources added over time",
    ],
  },
];

// --- 6. Founding Member Offer ----------------------------------------------

export const bmOffer = {
  eyebrow: "Member offer",
  heading: "Join Business Mastery",
  // The guarantee, with billing, renewal and cancellation, is in
  // data/business-mastery-terms.ts (the owner's terms, 2026-10-23).
} as const;

// --- 7. Why I Built LEU ----------------------------------------------------
// Feeds BmFounderSection, which the page does not render at the moment (the
// owner asked for that section out "for now"). Kept as-is so the section can
// go back with no content work.

export const bmFounder = {
  heading: "Why I Built LEU",
  description:
    "The personal mission behind the company and Business Mastery.",
  legacyLabel: "My Legacy",
  /** The evolved version, chosen as the centerpiece. */
  legacy: "My legacy isn't what I build. It's who I help build.",
  /** The original phrasing, kept as the recorded alternate. */
  legacyAlternate: "My legacy is a helping hand to all young entrepreneurs.",
  supporting:
    "I want my legacy to be helping the next generation of entrepreneurs believe they can build something of their own, and giving them the guidance, network, resources, and opportunities to actually do it.",
  comingSoonNote: "The full story behind LEU is being written.",
} as const;

// --- 8. My Journey ---------------------------------------------------------

/**
 * THE LOCK ON THE JOURNEY (section 8). While this is `true`, the page renders
 * the section as BmJourneyLocked — visibly present, visibly not open: the
 * section's title and the shared Coming Soon marker where the interactive
 * timeline will be. The owner asked for the section held back until launch on
 * 2026-09-13, the same day chose this visible placeholder over taking the
 * section off the page, and then chose "Coming Soon" over a lock badge for
 * its marker.
 *
 * TO UNLOCK: change `true` to `false` on this one line. That is the whole
 * launch — nothing else needs touching. `app/page.tsx` (the homepage, where
 * the section has lived since 2026-09-28) is the only reader of the flag, and
 * it swaps BmJourneyLocked for BmJourneyTimeline on the flip. Everything the
 * open section is made of (`bmJourney`, `bmChapters`, BmJourneyTimeline.tsx)
 * stays whole and unchanged while locked, so it arrives exactly as it last
 * rendered. Both states sit on the same neutral-950 ground, so the page never
 * notices the flip.
 */
export const BM_JOURNEY_LOCKED: boolean = true;

export const bmJourney = {
  heading: "The Journey",
  description: "The experiences that built LEU.",
  startCta: "Start Timeline",
  hint: "Click arrows",
  /** Shown once, on the timeline's intro slide. */
  comingSoonNote:
    "The full story behind each chapter is being written and will be added here.",
  /** The one-line body every chapter slide carries until its story exists. */
  chapterNote: "This chapter's story is being written.",
  /** The tease line on the locked placeholder, under the section title. The
   * owner's sentence, supplied 2026-09-15 — the file header's rule applies:
   * verbatim, not to be softened or improved. It replaced a line derived
   * from `bmChapters` (count, first title, last title). */
  lockedTease: "The Chapters of life that led to Lee Enterprises Unlimited",
  /** The line beside the locked placeholder's Coming Soon badge
   * (BmJourneyLocked, while BM_JOURNEY_LOCKED is true). Build copy, safe to
   * edit. */
  lockedNote: "The story is being written. The timeline opens when it's done.",
  /** NOTHING RENDERS THIS RIGHT NOW. It was the locked placeholder's badge —
   * "Locked Until Complete" behind a Lock icon — until the owner asked the
   * badge to read "Coming Soon" instead (2026-09-13, the same day the lock
   * itself arrived), which the shared BmComingSoon carries as its fixed
   * label. Kept so putting the lock wording back is a one-line swap in
   * BmJourneyLocked.tsx. */
  lockedLabel: "Locked Until Complete",
} as const;

// Chapter titles are the owner's working list. An alternative, more cinematic
// naming (THE BEGINNING → OBSESSION → THE TRANSITION → THE HUSTLE → TAKING
// THE RISK → LOST TIME → THE LOSSES → THE IDEA → ALL IN → YEARS IN THE MAKING
// → THE FALL → THE BOUNCE BACK → SOMETHING BIGGER → LEE ENTERPRISES
// UNLIMITED) is under consideration; final names get settled when the full
// story is written. docs/BUSINESS-MASTERY.md §7.
export const bmChapters: BmChapter[] = [
  { id: "beginning", number: 1, title: "The Beginning" },
  { id: "born", number: 2, title: "Born" },
  { id: "obsession", number: 3, title: "Young Obsession" },
  { id: "transition", number: 4, title: "The Teenage Transition" },
  { id: "hustle", number: 5, title: "Focused Hustle" },
  { id: "risks", number: 6, title: "Taking Risks" },
  { id: "lost-time", number: 7, title: "Lost Time" },
  { id: "battles", number: 8, title: "Defeated Battles" },
  { id: "ideas", number: 9, title: "Triumphant Ideas" },
  { id: "continued", number: 10, title: "Continued Hustle" },
  { id: "years", number: 11, title: "Years of Work" },
  { id: "fall", number: 12, title: "The Fall" },
  { id: "bounce", number: 13, title: "The Bounce" },
  { id: "leu", number: 14, title: "LEU" },
];

// --- 9. Your Journey Is Just Beginning -------------------------------------

/**
 * NOTHING RENDERS THIS RIGHT NOW. The owner asked the pivot off the page on
 * 2026-09-13, and it is kept on the same terms as `bmCoreBelief.philosophy`,
 * `bmProgram.closer`, `bmFinalCta.supporting` and `bmFoundingCounter`: it is
 * the owner's own confirmed copy, and taking a block off a page is not the
 * same decision as deleting the words.
 *
 * It has now been off the page twice for different reasons, which is worth
 * knowing before restoring it. As slot 9 it was its own section, deleted when
 * it merged up into BmManifestoSection on 2026-09-07; as the closing movement
 * of that section it came off on 2026-09-13. BmManifestoSection records where
 * it sat and what has to come back with it — the gold seam rule that
 * introduced it existed only to divide the section's halves and went out at the
 * same time.
 *
 * Because it is unrendered, editing it changes nothing on the site. The moment
 * it renders again, the file header's rule applies to it in full: these are the
 * owner's sentences, verbatim, not to be softened or improved.
 */
export const bmTransition = {
  heading: "Your Journey Is Just Beginning.",
  paragraphs: [
    "Everything that came before LEU taught me something.",
    "Some lessons came from wins. Others came from failures. Some lessons took years to understand. Some came from risks. Some came from mistakes. Some came from simply refusing to stop.",
    "Business Mastery exists so you don't have to learn every lesson the hard way.",
  ],
} as const;

// --- 10. Achieve Your Dreams Today -----------------------------------------
// Feeds BmFinalCTASection, which the page does not render at the moment (the
// owner asked for that section off on 2026-09-27). Kept as-is so the section
// can go back with no content work.

export const bmFinalCta = {
  heading: "Achieve Your Dreams Today.",
  description:
    "You can keep trying to figure everything out alone. Or you can build alongside people who are doing it with you.",
  cta: "Join Business Mastery",
  /**
   * NOTHING RENDERS THIS RIGHT NOW — off the page 2026-09-07 at the owner's
   * request, alongside `bmProgram.closer`, and kept on the same terms as that
   * one and as `bmFoundingCounter`.
   *
   * Worth knowing before restoring it: it was the last text on the page, under
   * the CTA button, and it is the only place the page listed what membership
   * includes outside section 5. If it goes back, check it against §6 of
   * docs/BUSINESS-MASTERY.md first — a list of inclusions sitting directly
   * under the one action on the page is closer to an offer than the rest of
   * this copy is, and the price and guarantee terms are still Phase C gates.
   */
  supporting:
    "Courses. Coaching. Community. Daily support. Real opportunities. One mission: helping you build what you've been dreaming about.",
} as const;

// ===========================================================================
// The Real World sections (2026-10-18)
//
// Eight sections added at the owner's request from screenshots of The Real
// World's landing page ("add all of these sections into my page with my
// businesses context"): Master the skills / A modern approach, Is this you?,
// Dominate the new economy, Your way out, What you'll learn, New skills, and
// The choice is yours / Or do nothing.
//
// ALL OF IT IS BUILD COPY, written for that request and safe to edit. It
// follows the reference's structure and voice but not its claims, under the
// same standard as §6 of docs/BUSINESS-MASTERY.md: no member counts, no
// income promises, no "millionaire mentors", no price and no price rise.
// Where the reference states a figure, these sections use the owner's own
// (`bmProofPoints`), and where it shows social proof under a button, they
// show `bmHeroTrust`, facts the page already states. Where the reference
// states a price ("$99", "lock in your price"), the choice card shows
// `site.businessMastery.price` only once it is set, and nothing about a
// price rising, because none is planned.
//
// Each paragraph is a list of runs; a run with `strong` renders bright.
// ===========================================================================

/** A paragraph as runs of text; `strong` runs render bright. */
export type BmRun = { readonly text: string; readonly strong?: boolean };

// --- Intro: Master the skills / A modern approach ---------------------------

export const bmIntro = {
  skills: {
    headingLines: ["Master the skills that", "build a business."],
    paragraphs: [
      [
        { text: "Business Mastery", strong: true },
        { text: " is a membership that teaches you how to start a business and actually use AI to run it." },
      ],
      [
        { text: "Through live demos, daily calls and personal coaching, you learn how to find customers, get paid, and build the systems that keep a business running." },
      ],
    ] as readonly (readonly BmRun[])[],
  },
  modern: {
    headingLines: ["A modern approach", "to business education."],
    paragraphs: [
      [
        { text: "Traditional education is rigid and slow to change. " },
        { text: "Business Mastery", strong: true },
        { text: " moves at the speed business does: when something new starts working, members learn it now." },
      ],
      [
        { text: "The program focuses on practical skills you use in your own business this week, rather than " },
        { text: "waiting years for a degree.", strong: true },
      ],
    ] as readonly (readonly BmRun[])[],
  },
  /** The skills panel beside the first row. Subjects the program covers. */
  skillsPanel: [
    "Finding the idea",
    "Sales",
    "Marketing",
    "AI & automation",
    "Systems & operations",
  ],
  /** The comparison panel beside the second row. */
  compare: {
    old: {
      label: "The old route",
      items: ["Years of theory", "A fixed syllabus", "Learn it, then maybe use it"],
    },
    bm: {
      label: "Business Mastery",
      items: ["Live demos of real work", "Updated as business changes", "Use it in your business this week"],
    },
  },
} as const;

// --- Is this you? -----------------------------------------------------------

export const bmIsThisYou = {
  eyebrow: "Be honest with yourself",
  headingLead: "Is this",
  headingAccent: "you?",
  items: [
    [{ text: "You're " }, { text: "tired of watching others", strong: true }, { text: " build the life you want." }],
    [{ text: "You know you're capable of more, but " }, { text: "nobody around you", strong: true }, { text: " gets it." }],
    [{ text: "You've tried learning from YouTube and free content, " }, { text: "but nothing sticks.", strong: true }],
    [{ text: "You want a " }, { text: "step-by-step system", strong: true }, { text: ", not random advice from people who haven't done it." }],
    [{ text: "You're willing to " }, { text: "put in the work", strong: true }, { text: " if someone shows you exactly what to do." }],
    [{ text: "You want to " }, { text: "build real skills", strong: true }, { text: " that bring money in, not a certificate that collects dust." }],
    [{ text: "You're ready to " }, { text: "surround yourself with builders", strong: true }, { text: " instead of people who drag you down." }],
    [{ text: "You want to " }, { text: "escape the 9-5", strong: true }, { text: " and build something of your own." }],
  ] as readonly (readonly BmRun[])[],
  closer: "If that's you, Business Mastery was built for you.",
  closerNote:
    "Not for people who want to sit around and think about it. For people who are ready to move.",
} as const;

// --- Dominate the new economy -----------------------------------------------

export const bmEconomy = {
  eyebrow: "Why this matters right now",
  headingLead: "Dominate the new economy with",
  headingAccent: "Business Mastery.",
  subheading: [
    { text: "Old ways of working are " },
    { text: "disappearing", strong: true },
  ] as readonly BmRun[],
  paragraphs: [
    "New businesses are being built overnight. AI, automation and the internet have rewritten the rules of starting and running a business.",
    "The playbook that worked for your parents' generation won't carry yours. The world has moved on, and the people who see it early are the ones who build something.",
    "Prices keep rising. A degree doesn't guarantee a job anymore. Waiting is a decision too.",
  ],
  features: [
    { title: "Build your own income", body: "Learn the skills the modern economy actually pays for" },
    { title: "Stay ahead of the curve", body: "Daily calls on new tools, strategies and opportunities" },
    { title: "Future-proof yourself", body: "Learn to use AI before everyone else is forced to" },
  ],
} as const;

// --- Your way out -------------------------------------------------------------

export const bmWayOut = {
  headingLead: "Business Mastery.",
  headingAccent: "Your way out.",
  paragraphs: [
    [{ text: "School won't teach you how to start a business. Your employer doesn't want you to leave. The system is built to keep you exactly where you are." }],
    [{ text: "Business Mastery gives you the skills, the coaching and the network to break out, on your own terms, at your own speed." }],
    [{ text: "The chance to build a business with AI has never been bigger. But the window doesn't stay open forever." }],
    [
      // The figures are `bmProofPoints`' own; change them together.
      { text: "We have built 50+ businesses and worked with 1,000+ more. " },
      { text: "Living proof that this works.", strong: true },
    ],
  ] as readonly (readonly BmRun[])[],
  features: [
    { title: "Take control", body: "Stop waiting for permission to build the life you want" },
    { title: "A proven system", body: "Follow the same steps we use to build our own businesses" },
    { title: "Real mentorship", body: "Get coached by people who build businesses for a living" },
  ],
  /** The labels on the panel's network, read around its centre. */
  panelNodes: ["Coaching", "Daily calls", "Live demos", "Members", "Tools", "Opportunities"],
} as const;

// --- What you'll learn --------------------------------------------------------

export const bmLearn = {
  eyebrow: "The latest information",
  heading: "What you'll learn",
  lead: "When a new technology changes how business works,",
  leadRuns: [
    { text: "Business Mastery", strong: true },
    { text: " is where you'll learn " },
    { text: "how to take advantage of it.", strong: true },
  ] as readonly BmRun[],
  paragraphs: [
    [
      { text: "Members get " },
      { text: "the latest information on the daily calls.", strong: true },
      { text: " New tools, new strategies and new ways to bring money in, explained by people using them." },
    ],
    [
      { text: "Business is changing faster than ever. Whole business models are being rewritten by " },
      { text: "AI and the internet.", strong: true },
      { text: " The people who learn the right skills at the right moment are the ones who build something that lasts. " },
      { text: "Everyone else watches from the sidelines.", strong: true },
    ],
  ] as readonly (readonly BmRun[])[],
  /** What the demos and calls cover, across starting, running and growing. */
  topics: [
    "Finding a business idea",
    "Getting your first customers",
    "Sales that close",
    "Marketing that brings leads in",
    "AI tools and automation",
    "Systems that save you hours",
    "Money, pricing and getting paid",
    "Growing past the first stage",
  ],
} as const;

// --- New skills ---------------------------------------------------------------

export const bmNewSkills = {
  heading: "New skills",
  description:
    "We're always adding new demos, tools and strategies as business changes. Join Business Mastery and level up now.",
  /** The band's cycling items, one at a time. */
  items: [
    { title: "Artificial Intelligence", note: "Built into every subject" },
    { title: "Automation", note: "Let the busywork run itself" },
    { title: "Sales", note: "Turn conversations into customers" },
    { title: "Marketing", note: "Get seen by the right people" },
    { title: "Systems", note: "Run the business without burning out" },
  ],
  ctaNote: "Get access to every demo, call and resource",
} as const;

// --- The choice is yours / Or do nothing ---------------------------------------

export const bmChoice = {
  heading: "The choice is yours",
  action: {
    heading: "Take action",
    subheading: "You need to act now.",
    /** What membership includes, each from `bmPillars` or the audience. */
    items: [
      "Step-by-step live demos",
      "Daily calls",
      "Personal coaching",
      "Hands-on help with your business",
      "Private community and network",
      "No experience needed",
    ],
    /** The guarantee in data/business-mastery-terms.ts, said plainly; change the two together. */
    guarantee: "90-day money-back guarantee",
    note: "Applying is free. No payment is taken when you apply.",
  },
  nothing: {
    heading: "Or do nothing...",
    lines: ["Go watch Netflix. Work a 9-5.", 'Keep scrolling. Keep consuming. Keep telling yourself "next month."'],
    paragraphs: [
      [
        { text: "The timing will never be perfect.", strong: true },
        { text: " And every day spent on the outside is a day the people inside pull further ahead." },
      ],
      [
        { text: "The difference between people building something right now and people watching it happen " },
        { text: "isn't talent, luck, or connections. It's a single decision, made at a single moment.", strong: true },
      ],
    ] as readonly (readonly BmRun[])[],
  },
  decision: {
    heading: "Make the decision today.",
    paragraphs: [
      "Applying takes a few minutes and costs nothing. Hunter reviews every application personally and follows up with you.",
      "The people inside are already building. Don't let next month become next year.",
    ],
  },
} as const;
