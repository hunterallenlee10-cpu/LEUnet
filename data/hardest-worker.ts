/**
 * The "Hardest Worker in Maryland" page (/hardest-worker-in-maryland): every
 * string, date and schema value it uses. The page, its structured data, its
 * share image and the sitemap all read from here.
 *
 * Why it exists: a TRW Business Mastery "rank #1 for your own phrase" page.
 * It's a sales page told for fun: the title is the flex, the page itself is
 * the demo, and the offer is getting businesses ranked higher on Google.
 * Every section points at "Book a free call"
 * (implementation/HARDEST_WORKER_IN_MARYLAND.md).
 *
 * The page talks about itself only: no other ranking pages, no other
 * sites, no borrowed screenshots or results (the owner's call, 2026-10-28).
 * Once an incognito quoted search shows this page first, add this page's
 * own before/after screenshots and result.
 *
 * Rules for this file:
 * - The phrase is locked: "hardest worker in Maryland", word for word, in
 *   the URL, <title>, H1, description, first sentence, H2s and the share
 *   image's alt. Never reword it.
 * - The quoted search showed no page that answered it, only an AI Overview
 *   about Maryland as a hard-working state, so the page answers "who", not
 *   "which state".
 * - True facts only: the owner's list of 2026-10-28 and what this page
 *   actually does. No city, GPA, work history, photo or verse on this page
 *   (the owner's call, 2026-10-28). No invented hours, awards,
 *   testimonials, prices, results or ranking guarantees. No WalletHub rank.
 * - Maryland is named on this page only. The rest of the site states no
 *   location.
 */

import { SITE_URL } from "@/data/company";
import { businessMasteryPage } from "@/data/navigation";
import { servicePath } from "@/data/services";
import { site } from "@/data/site";
import { LINK_LABEL, PAGE_PATH, SLUG } from "@/data/hardest-worker-route";

export { SITE_URL, SLUG, PAGE_PATH };
export const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

/** The locked phrase, word for word. */
export const PHRASE = "hardest worker in Maryland";

/** Every "Book a free call" on the page (the owner's brief). */
export const CTA_HREF = "/contact?interest=free-call";

/**
 * The one date constant. Drives the visible "Last updated" line, the
 * WebPage's dateModified and the sitemap's lastmod. Bump it on every real
 * content change, and only then.
 */
export const LAST_UPDATED = "2026-10-28";
/** First published. Stays put. */
export const PUBLISHED = "2026-10-28";

export const META = {
  /** 39 characters. Set as an absolute title, so no suffix is added. */
  title: "Hardest Worker in Maryland | Hunter Lee",
  /** 151 characters. */
  description:
    "Hunter Lee is the hardest worker in Maryland. This page was built to rank #1 on Google for that search. Want your business ranked higher on Google too?",
  /** The share image's alt text. */
  imageAlt: "Hunter Lee, the hardest worker in Maryland",
};

export const PERSON = {
  name: site.founder.name,
  jobTitle: "Founder",
  org: site.name,
  instagram: site.instagramUrl,
  description:
    "Hunter Lee is the hardest worker in Maryland. He is the founder of Lee Enterprises Unlimited, which builds websites and AI automation for business owners.",
};

/** Home › this page. The visible breadcrumb and BreadcrumbList read this. */
export const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: LINK_LABEL, href: PAGE_PATH },
] as const;

/** The owner's published figures (data/site.ts), word for word. */
const receipts = site.stats.map((stat) => ({
  value: stat.value,
  label: stat.label.charAt(0).toLowerCase() + stat.label.slice(1),
}));

/** "@leeenterprisesunlimited", from the Instagram URL. */
const instagramHandle = `@${site.instagramUrl.replace(/\/+$/, "").split("/").pop()}`;

/** Where each "Book a free call" sits, for the click event in Vercel Analytics. */
export type CtaLocation = "hero" | "offer" | "final" | "sticky";

/** The anchor the hero's second button jumps to: how this page ranks. */
export const HOW_ANCHOR = "how-it-ranks";

/** The quoted Google search for the phrase. */
const GOOGLE_URL = "https://www.google.com/search?q=%22hardest+worker+in+Maryland%22";

/** One card in "How this page is built to rank". */
export interface RankPart {
  /** Picks the card's icon in HardestWorkerSections. */
  icon: "words" | "answer" | "schema" | "speed" | "index" | "calls";
  title: string;
  body: string;
}

/** One row of the offer's checklist, tied to the service page that sells it. */
interface OfferItem {
  text: string;
  service: string;
  href: string;
}

export const COPY = {
  hero: {
    eyebrow: "The Google challenge",
    h1: "The Hardest Worker in Maryland",
    /** The first sentence of the body. Never reword it. */
    answer: "Hunter Lee is the hardest worker in Maryland.",
    sub: "Ask Google who that is and, until now, nobody had an answer. This page is built to be the one it shows first, and to show you how we rank businesses higher on Google.",
    /** The big gold badge beside the copy (no photo on this page). */
    mark: "#1",
    markCaption: "The only spot this page is built for",
    markSrText: "Built for one spot on Google: number one.",
    secondaryCta: "See how it ranks",
    googleLabel: "Google it yourself",
    googleUrl: GOOGLE_URL,
  },
  who: {
    eyebrow: "The answer",
    h2: "Who is the hardest worker in Maryland?",
    body: [
      "Hunter Lee is the hardest worker in Maryland. He is the founder of Lee Enterprises Unlimited, which builds websites and AI automation for business owners.",
      "He runs it while playing baseball for Frederick Community College and earning a Business Administration degree.",
    ],
    bridge: "Maryland is known as one of the hardest-working states in the country. Hunter Lee is the one setting the pace in it.",
  },
  why: {
    eyebrow: "The receipts",
    h2: "Why Hunter Lee Is the Hardest Worker in Maryland",
    lead: "The title is a flex. The schedule is real.",
    items: [
      {
        title: "Runs Lee Enterprises Unlimited",
        body: "He founded it and he runs it. Websites and AI automation for business owners.",
      },
      {
        title: "Runs Business Mastery",
        body: "LEU's program that teaches people to start a business and learn skills like AI.",
        link: { label: "Visit Business Mastery", href: businessMasteryPage },
      },
      {
        title: "Plays college baseball",
        body: "A student-athlete on the Frederick Community College baseball team.",
      },
      {
        title: "Earns a business degree",
        body: "Working toward a Business Administration degree at the same time.",
      },
      {
        title: "Works well over 40 hours a week",
        body: "Regularly. On top of college baseball.",
      },
      {
        title: "Coaches athletes",
        body: "He also coaches and trains athletes privately.",
      },
      {
        title: "Trains his own sales reps",
        body: "He trains LEU's sales reps himself.",
      },
    ] as { title: string; body: string; link?: { label: string; href: string } }[],
  },
  how: {
    eyebrow: "Under the hood",
    h2: "How this page is built to rank #1 on Google",
    lead: "Before this page, Google had no page that answered \"hardest worker in Maryland.\" It only offered a summary about Maryland being a hard-working state. An open question with no good answer is the easiest kind to win. Here's everything this page does to win it.",
    parts: [
      {
        icon: "words",
        title: "The exact words, in the right places",
        body: "\"Hardest worker in Maryland\" sits in the web address, the title Google shows, the main headline and the very first sentence. Word for word.",
      },
      {
        icon: "answer",
        title: "The answer comes first",
        body: "The first line answers the search outright: Hunter Lee. Google and AI search can lift it straight into their results.",
      },
      {
        icon: "schema",
        title: "Google is told who, in its own language",
        body: "Structured data names the person, the company and every question on this page, so Google knows exactly what it's looking at.",
      },
      {
        icon: "speed",
        title: "Fast on every phone",
        body: "No heavy scripts, no slow images, nothing that jumps around as it loads. Speed is part of how Google ranks a page.",
      },
      {
        icon: "index",
        title: "Search engines hear about it right away",
        body: "A sitemap, Google Search Console and IndexNow, so search engines find the page fast instead of waiting to stumble on it.",
      },
      {
        icon: "calls",
        title: "Built to turn visits into calls",
        body: "Every section ends in the same place: a free call. A ranking only matters if it brings in business.",
      },
    ] as RankPart[],
    checkTitle: "Don't take our word for it.",
    checkBody: "Search \"hardest worker in Maryland\" on Google and see who comes up.",
    checkLabel: "Search it now",
    checkUrl: GOOGLE_URL,
  },
  method: {
    eyebrow: "The point",
    h2: "Ranking a title is the warm-up. Ranking your business is the job.",
    body: "Right now, people are searching Google for exactly what you sell. Most of them call one of the first businesses they see. Everything on this page works the same way for \"[your service] in [your town].\"",
    steps: [
      {
        title: "Find the searches that pay.",
        body: "The exact words your customers type, picked for what they're worth to you and how beatable today's results are.",
      },
      {
        title: "Build a page for each one.",
        body: "A fast, focused page that answers that search better than anyone else around you.",
      },
      {
        title: "Make sure Google sees it.",
        body: "Search Console, a sitemap, structured data, Google Maps and a clean technical setup.",
      },
      {
        title: "Turn visitors into booked jobs.",
        body: "Tap-to-call, quick forms and follow-up that runs on its own. Our AI answers the phone and books the job.",
      },
    ],
  },
  offer: {
    eyebrow: "The offer",
    h2: "Want your business ranked higher on Google?",
    lead: "Same work ethic, same playbook as this page. Aimed at the searches that bring you customers.",
    includedTitle: "What you get",
    // Only services LEU already sells (data/services.ts), each linked to its page.
    included: [
      {
        text: "A fast, focused page for each search you want to win",
        service: "Websites & Online Stores",
        href: servicePath("websites"),
      },
      {
        text: "Google Maps, local SEO and AI search visibility",
        service: "Marketing & Lead Generation",
        href: servicePath("get-found"),
      },
      {
        text: "An AI phone assistant that answers every call, day or night",
        service: "AI Call Answering",
        href: servicePath("ai-calls"),
      },
      {
        text: "Every new lead followed up and booked",
        service: "Follow-Up & Booking Automation",
        href: servicePath("follow-up"),
      },
    ] as OfferItem[],
    pricing: "Flat upfront quote. No hidden fees.",
    builtFor: "Built personally for you.",
    receiptsTitle: "The numbers so far",
    receipts,
  },
  expectations: {
    eyebrow: "Fair warning",
    h2: "Real talk about rankings",
    body: [
      "\"Hardest worker in Maryland\" had no real competition. \"[Your service] near me\" usually does.",
      "So we start with the searches you can win soon, then climb toward the bigger ones. Nobody can honestly promise #1, and we won't. What we promise is the work.",
    ],
  },
  forWho: {
    eyebrow: "Who it's for",
    h2: "Who hires the hardest worker in Maryland?",
    lead: "Business owners whose customers search Google before they pick up the phone.",
    examples: [
      "Contractors",
      "Roofers",
      "HVAC and plumbing",
      "Auto detailers",
      "Salons and med spas",
      "Gyms and trainers",
      "Law firms",
      "Restaurants",
    ],
  },
  faq: {
    eyebrow: "FAQ",
    h2: "Questions people ask",
    items: [
      {
        q: "Who is the hardest worker in Maryland?",
        a: "Hunter Lee is the hardest worker in Maryland. He founded Lee Enterprises Unlimited, plays baseball for Frederick Community College and is earning a Business Administration degree, while regularly working well over 40 hours a week.",
      },
      {
        q: "Where is Hunter Lee from?",
        a: "Maryland. Hunter Lee is based in Maryland, where he runs Lee Enterprises Unlimited, plays college baseball and coaches athletes.",
      },
      {
        q: "Why build a page like this?",
        a: "To show the method in public. Pick a search nobody answers well, build the best answer to it, and make sure Google sees it. The same steps get businesses ranked higher for the searches their customers make.",
      },
      {
        q: "How do you get a page to rank higher on Google?",
        a: "Answer one search better than anyone else. Put the exact words in the web address, title, headline and first sentence. Answer the question in the first line. Add structured data, keep the page fast, and use a sitemap and Search Console so Google finds it quickly.",
      },
      {
        q: "Can you get my business ranked higher on Google?",
        a: "That's the job. We start with the searches you can win soon, then work toward the bigger ones. Nobody can honestly promise #1, and be wary of anyone who does, but we'll show you the plan on a free call.",
      },
      {
        q: "How long does it take?",
        a: "It depends on the competition. A new page for a search nobody owns can be found by Google within days. Busy searches like \"[your service] near me\" take longer. We'll tell you which is which on the call.",
      },
      {
        q: "What does it cost?",
        a: "A flat upfront quote after a free call. No hidden fees. We quote once we know what you need.",
      },
      {
        q: "How do I work with Hunter Lee?",
        a: `Book a free call. You can also call ${site.phone}, email ${site.email} or message ${instagramHandle} on Instagram.`,
      },
    ],
  },
  cta: {
    h2: "I built a page to put my name at the top of Google. Let's put your business there next.",
    sub: "Flat upfront quote. No hidden fees. Built personally for you.",
  },
  sticky: {
    label: "Rank higher on Google?",
  },
  lastUpdatedLabel: "Last updated",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * "2026-10-28" -> "October 28, 2026", built from the ISO parts, so the
 * server's time zone can never shift it a day.
 */
export function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/** The visible FAQ. The FAQPage structured data reads the same list. */
export function faqItems() {
  return COPY.faq.items.map(({ q, a }) => ({ question: q, answer: a }));
}

/** "Last updated: October 28, 2026". */
export const lastUpdatedText = `${COPY.lastUpdatedLabel}: ${formatIsoDate(LAST_UPDATED)}`;
