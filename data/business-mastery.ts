import { BmAudience, BmChapter, BmPillar, BmTenet } from "@/types";

// ---------------------------------------------------------------------------
// LEU Business Mastery (/business-mastery)
//
// Nearly every sentence here is the owner's own copy, carried verbatim from
// the page plan recorded in docs/BUSINESS-MASTERY.md. The owner confirmed on
// 2026-08-25 that the published figures — the proof line in
// `bmProofStatement` and the 5/20 founding counter — are accurate as stated.
// Do not soften, round, or "improve" them without the owner.
// ---------------------------------------------------------------------------

/** In-page anchor for the offer + application form. Every CTA on the page
 * points here, including the hero's. */
export const BM_OFFER_ID = "bm-offer";

/**
 * The founding-member count. NOTHING RENDERS THIS RIGHT NOW - it is a record,
 * not display copy, and no page states a number of spots.
 *
 * It was the "5 / 20 FOUNDING MEMBERS" figure in the offer section until the
 * owner asked for a plain "Limited Spots" box there, which was also what
 * retired it from the homepage teaser before that (`bmHero.scarcityLine`).
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

export const bmHero = {
  title: "LEU Business Mastery",
  manifesto: "No great accomplishment in history was achieved alone.",
  subtitle: "Speedrun Your Way to Success.",
  description:
    "Skip years of unnecessary trial and error by learning from people already building, failing, adapting, and winning.",
  /**
   * The scarcity line on the homepage teaser. This slot used to render the
   * live "5 / 20 FOUNDING MEMBERS" figures from `bmFoundingCounter`; it is a
   * flat statement now, at the owner's request. Unlike the counter it
   * replaced, nothing in the repo can check it - it is a claim about the
   * owner's own enrollment, so it stays true only as long as that is true.
   * Change or remove it when enrollment is no longer closing.
   */
  scarcityLine: "Enrollment Closing Soon",
  cta: "Achieve Your Dreams",
} as const;

// --- 2. The Core Belief ----------------------------------------------------

export const bmCoreBelief = {
  heading: "Nobody Builds Something Great Alone.",
  message:
    "Be prepared to work harder than you've ever worked. Learn more than you've ever learned. Achieve more than you've ever achieved.",
  lead: "None of this happens without one of the greatest driving forces behind success:",
  force: "Network.",
  clarifier:
    "LEU Business Mastery is not about avoiding hard work. It is about making that hard work more effective by putting you around people, information, systems, and opportunities that can accelerate your progress.",
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

/** The owner's track record, published exactly as stated and confirmed
 * accurate by the owner. */
export const bmProofStatement =
  "We have built dozens of businesses, worked with hundreds of businesses, and helped generate thousands upon thousands of dollars.";

/**
 * The same track record, re-set as its three figures for the row in
 * BmManifestoSection.
 *
 * NOT A REWRITE AND NOT A SECOND CLAIM. Every word below is lifted from
 * `bmProofStatement` above, and that sentence is still what the page
 * publishes: the section renders it verbatim for screen readers and draws
 * this row for everyone else. The sentence is the record; this is only how it
 * is set. Nothing is rounded, softened or added - "dozens", "hundreds" and
 * "thousands upon thousands" are the owner's own quantities, and the three
 * labels are the sentence's own verbs.
 *
 * The file header's rule therefore governs both, and the two cannot be allowed
 * to drift: if the owner changes a figure, change it in `bmProofStatement` and
 * here in the same edit, or the page states two different track records at
 * once.
 */
export const bmProofPoints = [
  { label: "Built", figure: "Dozens of businesses" },
  { label: "Worked with", figure: "Hundreds of businesses" },
  { label: "Helped generate", figure: "Thousands upon thousands of dollars" },
] as const;

// --- 3. Who This Is For ----------------------------------------------------

export const bmAudienceHeading = "Built for People Who Know They Want More.";

export const bmAudiences: BmAudience[] = [
  {
    id: "aspiring",
    title: "Aspiring Entrepreneurs",
    description:
      "You know you want to build something, but you don't know where to start.",
  },
  {
    id: "young",
    title: "Young Entrepreneurs",
    description:
      "You have ambition, but may lack experience, connections, systems, capital, or guidance.",
  },
  {
    id: "early",
    title: "Early-Stage Business Owners",
    description:
      "You've already started, but you're figuring everything out as you go.",
  },
  {
    id: "growing",
    title: "Growing Business Owners",
    description:
      "You already have something working and want help taking it to another level.",
  },
];

// --- 4. Our Core Tenets ----------------------------------------------------

// The three tenet titles are the owner's, in the owner's order: Speed, Money
// In, For Free. They replaced the eight-step "How to Build Your Own Empire"
// ladder at the owner's request. Do not rename, expand, or re-order them, and
// do not grow the list back into a framework - three is the point. The
// heading is the owner's phrase as well, title-cased to match every other
// heading on the page. The one-line descriptions expand each title in the
// same register; they are the build's copy, not the owner's, and are the
// safest place to edit.
//
// One of them is load-bearing. "For Free" is about what it takes to START A
// BUSINESS - free tools and the member's own effort - and must never be
// written so it can be read as a claim about the price of membership, which
// is paid and carries the guarantee in `bmOffer`. Keep the word "free" tied
// to what the business is built with, never to access, price, or a refund.
// For the same reason nothing here lists the network, the tools library, or
// anything else membership includes among the things that cost nothing.

export const bmTenetsIntro = {
  heading: "Our Core Tenets",
  description:
    "Three principles sit behind everything we build and everything we help members build. Every part of Business Mastery runs on them.",
} as const;

export const bmTenets: BmTenet[] = [
  {
    id: "speed",
    number: 1,
    title: "Speed",
    description:
      "Speed comes from people who have already done it, not from figuring everything out alone.",
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

// --- 5. What LEU Business Mastery Actually Is ------------------------------

export const bmProgram = {
  heading: "NOT a Course. A Coach.",
  description:
    "Members are not simply purchasing prerecorded information. They're entering a business-development environment.",
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
    title: "Subject-Specific Classes",
    description:
      "Step-by-step education covering different areas of starting, operating, and growing businesses.",
  },
  {
    id: "webinars",
    title: "Live Webinars",
    description:
      "Deeper sessions focused on specific strategies, problems, opportunities, and industries.",
  },
  {
    id: "calls",
    title: "Daily Calls",
    description:
      "Regular access to conversations, lessons, accountability, collaboration, and guidance.",
  },
  {
    id: "coaching",
    title: "Personal Coaching",
    description:
      "Direct help based on each member's individual business, goals, situation, and problems.",
  },
  {
    id: "hands-on",
    title: "Hands-On Help",
    description:
      "We don't just tell you what to do. We help you work through it.",
  },
  {
    id: "community",
    title: "Private Community & Professional Network",
    description:
      "A network of entrepreneurs building businesses alongside one another.",
  },
  {
    id: "tools",
    title: "Tools & Resources",
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
  eyebrow: "Founding Member Offer",
  heading: "Join LEU Business Mastery",
  guaranteeHeading: "90-Day Money-Back Guarantee",
  guaranteeSummary:
    "Join, get inside the network, and see the value for yourself. If Business Mastery isn't for you, tell us within 90 days of joining and we'll refund your payment.",
  // Rendered inside the guarantee expandable. The full legal terms are a hard
  // gate for Phase C (checkout) — see docs/BUSINESS-MASTERY.md §6.
  guaranteeTermsNote:
    "Full guarantee terms, eligibility requirements, refund conditions, and Terms of Service are being finalized and will be published here.",
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
    "I want my legacy to be helping the next generation of entrepreneurs believe they can build something of their own — and giving them the guidance, network, resources, and opportunities to actually do it.",
  comingSoonNote: "The full story behind LEU is being written.",
} as const;

// --- 8. My Journey ---------------------------------------------------------

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
 * introduced it exists only to divide the section's halves and went out at the
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
    "LEU Business Mastery exists so you don't have to learn every lesson the hard way.",
  ],
} as const;

// --- 10. Achieve Your Dreams Today -----------------------------------------

export const bmFinalCta = {
  heading: "Achieve Your Dreams Today.",
  description:
    "You can keep trying to figure everything out alone. Or you can build alongside people who are doing it with you.",
  cta: "Join LEU Business Mastery",
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
