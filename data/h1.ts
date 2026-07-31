import {
  H1Coach,
  H1Faq,
  H1Package,
  H1ProcessStep,
  H1ProgramFeature,
  H1Result,
  H1Testimonial,
} from "@/types";

/**
 * Page-scoped palette for /h1-performance.
 *
 * `VENTURE_COLORS.h1` in `lib/colors.ts` is gold-on-black, near enough to the
 * LEU parent gold and to Lee Marketing Mastery's amber that the three pages
 * read as the same brand. Do not edit that token — it also styles the H1 block
 * on the homepage, and changing it restyles a page outside this scope.
 *
 * H1's own mark is white on black, so this palette leads with chalk white and
 * keeps gold as an accent. That inverts LMM's amber-dominant look while staying
 * true to the logo.
 */
export const H1_PALETTE = {
  /** Page background. */
  ink: "#08090A",
  /** Raised surfaces — cards, panels. */
  steel: "#12141A",
  /** Primary type and primary buttons. Always with `ink` text on top. */
  chalk: "#F5F7FA",
  /** Accent: badges, stat figures, icon strokes. Matches VENTURE_COLORS.h1. */
  gold: "#FFD700",
  /** Hovers and gradient ends. */
  goldDeep: "#E0AC00",
  /** Hairlines and card borders. */
  line: "#23262E",
  /** Secondary type. */
  muted: "#8C93A1",
} as const;

/** Public phone number, taken from the H1 flyer. */
export const H1_PHONE = "240-925-2609";
export const H1_PHONE_HREF = "tel:+12409252609";

/**
 * Program results, quoted from H1's own Strength & Conditioning program
 * document. These are the client's published figures — do not round, embellish,
 * or add to them without a source.
 */
export const h1Results: H1Result[] = [
  {
    id: "h1-result-exit-velo",
    figure: "+15 MPH",
    label: "Exit velocity",
    detail: "Gained in three months of training.",
  },
  {
    id: "h1-result-forty",
    figure: "5.1 → 4.5",
    label: "40-yard dash",
    detail: "Six tenths off the clock in two months.",
  },
  {
    id: "h1-result-pr",
    figure: "+30%",
    label: "Powerlifting PR",
    detail: "One athlete's increase in a single month.",
  },
  {
    id: "h1-result-blocks",
    figure: "4-week",
    label: "Training blocks",
    detail: "Each one built on the last, never repeated blindly.",
  },
];

export const h1ProgramFeatures: H1ProgramFeature[] = [
  {
    id: "h1-feature-personalized",
    title: "A Plan Built Around You",
    description:
      "Your program is written for your sport, your training age, and the equipment you actually have access to. We set the plan to whatever your current setup is — a full weight room, a garage, or a single set of dumbbells.",
  },
  {
    id: "h1-feature-blocks",
    title: "Progressive 4-Week Blocks",
    description:
      "Each block is designed to build on the last, stacking real strength, speed, and durability that shows up on the field. No random workouts, no repeating the same month forever.",
  },
  {
    id: "h1-feature-access",
    title: "Round-the-Clock Coach Access",
    description:
      "Direct access to your coaches, not a chatbot and not a queue. Ask unlimited questions and get answers when you need them, whether that's before a lift or after a game.",
  },
  {
    id: "h1-feature-resources",
    title: "Resources Updated Daily",
    description:
      "The resource library is updated daily, with new material posted every month. Every day there is something new to learn and apply.",
  },
  {
    id: "h1-feature-research",
    title: "Supplement & Diet Research",
    description:
      "Large, continuously improving research documents covering supplements, nutrition, and recovery — written so an athlete can actually use them, and expanded as the research changes.",
  },
  {
    id: "h1-feature-community",
    title: "A Locked-In Training Group",
    description:
      "Access to every other athlete in the program, all chasing the same thing. You train alongside a group that supports each other and holds the standard, instead of grinding alone.",
  },
];

/**
 * `price` is a display string, or null to render "Pricing on request".
 * The Committed tier is deliberately null — see docs/H1.md §1. Set it here and
 * nowhere else once the figure is confirmed.
 */
export const h1Packages: H1Package[] = [
  {
    id: "h1-basic",
    name: "Basic Strength Package",
    price: "$50",
    period: "per month",
    summary:
      "Everything you need to start training with a real plan and work up to a full professional lifting schedule.",
    features: [
      "Fully custom training plan built for your goals",
      "Programming matched to your current equipment and schedule",
      "Progressive 4-week blocks that build on each other",
      "Direct access to your coaches for questions",
      "Daily-updated resource library",
      "Access to the H1 athlete training group",
    ],
    highlighted: false,
    ctaLabel: "Start With Basic",
  },
  {
    id: "h1-committed",
    name: "Committed Strength Package",
    price: null,
    period: "per month",
    summary:
      "Everything in Basic, plus the full library of supplemental resources — nutrition, recovery, and the mental side of competing.",
    features: [
      "Everything in the Basic Strength Package",
      "Supplement research PDF, updated monthly",
      "Personalized diet plan built for your body and sport",
      "In-depth recovery and mobility guidance",
      "Goal setting and competitive mentality coaching",
      "Every supplemental resource H1 produces",
    ],
    highlighted: true,
    ctaLabel: "Go Committed",
  },
];

export const h1ProcessSteps: H1ProcessStep[] = [
  {
    id: "h1-step-1",
    step: 1,
    title: "Tell Us Where You're At",
    description:
      "Send a request with your sport, your goals, and what you're training with right now. There is no cost and no obligation to find out whether this is a fit.",
  },
  {
    id: "h1-step-2",
    step: 2,
    title: "We Build Your Plan",
    description:
      "Your coaches write a program around your setup — your equipment, your season, and your training experience. Nothing is copied off a template.",
  },
  {
    id: "h1-step-3",
    step: 3,
    title: "Train Your First Block",
    description:
      "You start a four-week block with a clear plan for every session, plus the full resource library and the athlete group from day one.",
  },
  {
    id: "h1-step-4",
    step: 4,
    title: "Adjust and Stack",
    description:
      "Ask questions any time and we adjust as you go. When the block ends, the next one is built on what you just did — not reset to zero.",
  },
];

/**
 * Credentials transcribed from the H1 flyer. Every line is the client's own
 * claim about their own record — do not add accolades that aren't on the flyer.
 */
export const h1Coaches: H1Coach[] = [
  {
    id: "h1-coach-hunter",
    name: "Hunter Lee",
    role: "Founder",
    credentials: [
      "2024 4A State Champion",
      "1st Team All-SMAC (Leonardtown)",
      "Leonardtown single-season and career home run leader",
      "Several additional offensive and defensive records at LHS",
      "Played at a top-5 JUCO in the nation, transferring to St. Mary's College of Maryland",
      "2024 Leonardtown High School alumnus",
    ],
  },
  {
    id: "h1-coach-aaron",
    name: "Aaron Wathen",
    role: "Co-Founder",
    credentials: [
      "2021 American Legion World Series",
      "1st Team All-United East (St. Mary's)",
      "Current active St. Mary's hits, RBI, and batting average leader",
      "Career at St. Mary's — .360 AVG, .934 OPS",
      "Current infielder at St. Mary's College of Maryland",
      "2023 Leonardtown High School alumnus",
    ],
  },
];

/**
 * Empty on purpose. The section renders nothing while this list is empty, so
 * the live page never shows an empty shell or a placeholder quote. Paste real
 * testimonials in here and the section appears on its own.
 *
 * Shape:
 *   { id: "h1-testimonial-1", quote: "...", name: "First L.", detail: "Sport, class year" }
 */
export const h1Testimonials: H1Testimonial[] = [];

export const h1Faqs: H1Faq[] = [
  {
    id: "h1-faq-remote",
    question: "Is this in-person or online?",
    answer:
      "The strength and conditioning program is fully remote. Your programming, resources, and coach access are all delivered online, so it works whether you train at school, at a commercial gym, or at home.",
  },
  {
    id: "h1-faq-who",
    question: "Who is this program for?",
    answer:
      "Athletes of any age and any sport. The program has been used by baseball players, sprinters, and powerlifters alike, because the plan is written around your sport and your goals rather than a single template.",
  },
  {
    id: "h1-faq-equipment",
    question: "What equipment do I need?",
    answer:
      "Whatever you already have. We set the plan to your current setup — a full weight room, a home gym, or limited equipment. Tell us what you have access to on your request and the program is built around it.",
  },
  {
    id: "h1-faq-access",
    question: "How much access do I get to a coach?",
    answer:
      "Round-the-clock direct access. You can ask an unlimited number of questions and get real answers from your coaches, not automated replies.",
  },
  {
    id: "h1-faq-updates",
    question: "How often is the program updated?",
    answer:
      "Resources inside the program are updated daily, and new resources are posted every month. Your training itself runs in four-week blocks, each one built on the block before it.",
  },
  {
    id: "h1-faq-included",
    question: "What's the difference between the two packages?",
    answer:
      "Basic covers your fully custom training plan and coach access. Committed includes all of that plus the supplemental library: the monthly supplement research PDF, a personalized diet plan, and in-depth guidance on recovery, mobility, goal setting, and mentality.",
  },
  {
    id: "h1-faq-start",
    question: "How do I start?",
    answer:
      "Send a consultation request from this page. It's free, it takes a couple of minutes, and we'll follow up to confirm your goals and set up your first block. Spots are limited so every athlete gets coached properly.",
  },
  {
    id: "h1-faq-parents",
    question: "I'm a parent signing up my athlete. Can I fill this out?",
    answer:
      "Yes. The request form has space for a parent or guardian to submit on an athlete's behalf — just enter your own contact details and your athlete's information in the fields provided.",
  },
];

/** Shown beneath the nutrition and supplement content. */
export const H1_NUTRITION_DISCLAIMER =
  "H1 Performance nutrition and supplement resources are educational and are not medical advice. Athletes should consult a physician before starting any training, diet, or supplement program — especially athletes under 18, who should have a parent or guardian involved in that decision.";
