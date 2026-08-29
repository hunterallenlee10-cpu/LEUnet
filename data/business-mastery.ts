import {
  BmAudience,
  BmChapter,
  BmEmpireStep,
  BmPhase,
  BmPillar,
} from "@/types";

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
 * The founding-member counter, rendered as "5 / 20 FOUNDING MEMBERS" on the
 * page and on the homepage teaser. Owner-maintained: update `claimed` here as
 * members join. Phase C of docs/BUSINESS-MASTERY.md replaces this with a
 * count derived from completed Stripe payments.
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
  philosophyTitle: "Core Philosophy",
  philosophy:
    "Everyone wants to build freedom through business. But too many people question a small investment and endless work as though either one is optional. Success requires both.",
} as const;

/** The owner's track record, published exactly as stated and confirmed
 * accurate by the owner. */
export const bmProofStatement =
  "We have built dozens of businesses, worked with hundreds of businesses, and helped generate thousands upon thousands of dollars.";

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

// --- 4. How to Build Your Own Empire ---------------------------------------

export const bmEmpire = {
  heading: "How to Build Your Own Empire",
  description:
    "The larger framework behind building something of your own. Every part of Business Mastery exists to move you along this path faster.",
} as const;

// The eight titles are the owner's. The one-line descriptions expand each
// title in the same register; they are the build's copy, not the owner's, and
// are the safest place to edit.
export const bmEmpireSteps: BmEmpireStep[] = [
  {
    id: "zero",
    step: 1,
    title: "Starting From Zero",
    description:
      "No business, no roadmap, no network. Everyone here started at exactly this point.",
  },
  {
    id: "opportunity",
    step: 2,
    title: "Finding an Opportunity",
    description:
      "Learning to see the problems around you that someone would pay to have solved.",
  },
  {
    id: "skills",
    step: 3,
    title: "Building Skills",
    description:
      "Developing the abilities the opportunity actually requires — selling, building, operating.",
  },
  {
    id: "income",
    step: 4,
    title: "Creating Income",
    description:
      "Turning skill into your first dollars, then into dependable revenue.",
  },
  {
    id: "systems",
    step: 5,
    title: "Building Systems",
    description:
      "Making the work repeatable so the business runs on process, not memory.",
  },
  {
    id: "people",
    step: 6,
    title: "Hiring & Networking",
    description:
      "Surrounding the business with people who multiply what you can do alone.",
  },
  {
    id: "scaling",
    step: 7,
    title: "Scaling",
    description:
      "Growing what works — more customers, more capacity, more reach.",
  },
  {
    id: "freedom",
    step: 8,
    title: "Creating Freedom",
    description:
      "The point of all of it: a business that serves your life instead of consuming it.",
  },
];

// --- 5. What LEU Business Mastery Actually Is ------------------------------

export const bmProgram = {
  heading: "NOT a Course. A Coach.",
  description:
    "Members are not simply purchasing prerecorded information. They're entering a business-development environment.",
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
  counterLabel: "Founding Members",
  guaranteeHeading: "90-Day Money-Back Guarantee",
  guaranteeSummary:
    "Join, get inside the network, and see the value for yourself. If Business Mastery isn't for you, tell us within 90 days of joining and we'll refund your payment.",
  // Rendered inside the guarantee expandable. The full legal terms are a hard
  // gate for Phase C (checkout) — see docs/BUSINESS-MASTERY.md §6.
  guaranteeTermsNote:
    "Full guarantee terms, eligibility requirements, refund conditions, and Terms of Service are being finalized and will be published here.",
} as const;

// --- 7. The Evolution of Business Mastery ----------------------------------

export const bmEvolution = {
  heading: "The Evolution of Business Mastery",
  description:
    "This is not a normal membership model. The network evolves in three phases, and when you enter decides what you pay — and what you never have to pay again.",
  closer: "No great accomplishment in history was achieved alone.",
} as const;

export const bmPhases: BmPhase[] = [
  {
    id: "founding",
    numeral: "I",
    name: "The Founding Members",
    headline: "Enter Business Mastery",
    paragraphs: [
      "One-time initial investment. Founding members receive everything LEU Business Mastery has to offer for life as a reward for believing in the network early.",
      "They were the people willing to trust the vision before it became what we believe it can become.",
    ],
    promise: {
      title: "Founding Member Promise",
      text: "Those who trusted us first will never have to invest another dollar to remain part of the network.",
    },
  },
  {
    id: "growth",
    numeral: "II",
    name: "Growth",
    headline: "The Network Opens",
    paragraphs: [
      "As LEU Business Mastery grows, new members enter through a monthly membership model.",
      "Founding members maintain lifetime access without the recurring membership cost.",
    ],
    includes: [
      "Courses",
      "Webinars",
      "Daily calls",
      "Personal coaching",
      "Community",
      "New resources",
      "Direct assistance",
      "New opportunities",
      "Networking",
      "Future programs",
    ],
  },
  {
    id: "room",
    numeral: "III",
    name: "Stay In The Room",
    headline: "Admission Becomes Selective",
    paragraphs: [
      "As the network matures, admission becomes more selective. The goal is a tight, fast-acting group of serious performers built to produce results.",
      "At this stage, entry may require an upfront membership fee and a monthly retainer.",
      "This is no longer simply paying for access to videos. Members are paying to stay inside an active network of entrepreneurs, operators, mentors, opportunities, information, resources, and relationships.",
    ],
  },
];

// --- 8. Why I Built LEU ----------------------------------------------------

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

// --- 9. My Journey ---------------------------------------------------------

export const bmJourney = {
  heading: "The Journey",
  description: "The experiences that built LEU.",
  startCta: "Start Timeline",
  hint: "Scroll or click arrows",
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

// --- 10. Your Journey Is Just Beginning ------------------------------------

export const bmTransition = {
  heading: "Your Journey Is Just Beginning.",
  paragraphs: [
    "Everything that came before LEU taught me something.",
    "Some lessons came from wins. Others came from failures. Some lessons took years to understand. Some came from risks. Some came from mistakes. Some came from simply refusing to stop.",
    "LEU Business Mastery exists so you don't have to learn every lesson the hard way.",
  ],
} as const;

// --- 11. Achieve Your Dreams Today -----------------------------------------

export const bmFinalCta = {
  heading: "Achieve Your Dreams Today.",
  description:
    "You can keep trying to figure everything out alone. Or you can build alongside people who are doing it with you.",
  cta: "Join LEU Business Mastery",
  supporting:
    "Courses. Coaching. Community. Daily support. Real opportunities. One mission: helping you build what you've been dreaming about.",
} as const;
