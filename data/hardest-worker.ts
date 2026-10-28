/**
 * The "Hardest Worker in Maryland" page (/hardest-worker-in-maryland): every
 * string, date, image and schema value it uses. The page, its structured
 * data, its share image and the sitemap all read from here.
 *
 * Why it exists: round two of the TRW Business Mastery "rank #1 for your own
 * phrase" play. Round one, "Leonardtown's sexiest man", went from no results
 * to #1 on Google on 2026-10-27 (its page lives on the .com site). Like that
 * page, this one is a sales page told for fun: the title is the flex, the
 * method is the offer, and every section points at "Book a free call"
 * (implementation/HARDEST_WORKER_IN_MARYLAND.md).
 *
 * It ships in the "challenge" state: Google doesn't name Hunter for this
 * phrase yet, so the proof is round one's result. Once an incognito search
 * shows this page first, swap the hero and proof copy to the won state with
 * this page's own screenshots.
 *
 * Rules for this file:
 * - The phrase is locked: "hardest worker in Maryland", word for word, in
 *   the URL, <title>, H1, description, first sentence, an H2 and the share
 *   image's alt. Never reword it.
 * - The quoted search showed an AI Overview about Maryland as a hard-working
 *   state, so the page answers "who", not "which state".
 * - True facts only: the owner's list of 2026-10-28 and round one's verified
 *   timeline (the .com site's data/leonardtown.ts and its proof manifest).
 *   No city, GPA, work history, photo or verse on this page (the owner's
 *   call, 2026-10-28). No invented hours, awards, testimonials, prices,
 *   numbers or ranking guarantees. No WalletHub rank.
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
  /** 154 characters. */
  description:
    "Hunter Lee is the hardest worker in Maryland. Lee Enterprises Unlimited took one phrase from no results to #1 on Google in a day. Want your business next?",
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

/**
 * Round one: "Leonardtown's sexiest man", 2026-10-27, Eastern time. Every
 * figure is from the .com site's verified timeline and proof manifest: live
 * at 2:01 AM, crawled at 2:40 AM, indexed by 11:34 AM, PageSpeed 100 at
 * 12:26 PM, #1 at 8:19 PM (Google, exact phrase in quotes, not
 * personalized). 2:01 AM to 8:19 PM is 18h18m, so "under 19 hours".
 */
export const ROUND_ONE = {
  phrase: "Leonardtown's sexiest man",
  url: "https://www.leeenterprisesunlimited.com/leonardtowns-sexiest-man",
  hours: "Under 19 hours",
};

/** One screenshot: its file, its 2x copy (or null), its 1x size, alt and caption. */
export interface ProofShot {
  src: string;
  src2x: string | null;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

/** Round one's before and after, copied from the .com site's public/leonardtown. */
export const BEFORE_SHOT: ProofShot = {
  src: "/leonardtown/before.webp",
  src2x: null,
  width: 1210,
  height: 275,
  alt: "Google search for \"Leonardtown's sexiest man\" on October 27, 2026, before launch, showing no results",
  caption: "Before: no results. Oct 27, 2026, before launch.",
};

export const AFTER_SHOT: ProofShot = {
  src: "/leonardtown/after-google-1.webp",
  src2x: "/leonardtown/after-google-1@2x.webp",
  width: 1200,
  height: 315,
  alt: "Google search for \"Leonardtown's sexiest man\" on October 27, 2026 at 8:19 PM ET showing Hunter Lee's page as the #1 result",
  caption: "After: #1 on Google. Oct 27, 2026, 8:19 PM ET.",
};

/** The owner's published figures (data/site.ts), word for word. */
const receipts = site.stats.map((stat) => ({
  value: stat.value,
  label: stat.label.charAt(0).toLowerCase() + stat.label.slice(1),
}));

/** "@leeenterprisesunlimited", from the Instagram URL. */
const instagramHandle = `@${site.instagramUrl.replace(/\/+$/, "").split("/").pop()}`;

/** Where each "Book a free call" sits, for the click event in Vercel Analytics. */
export type CtaLocation = "hero" | "offer" | "final" | "sticky";

/** The anchor "See the proof" jumps to. */
export const PROOF_ANCHOR = "proof";

export const COPY = {
  hero: {
    eyebrow: "The Google challenge · Round two",
    h1: "The Hardest Worker in Maryland",
    /** The first sentence of the body. Never reword it. */
    answer: "Hunter Lee is the hardest worker in Maryland.",
    sub: "Google doesn't know that yet. Last time we taught it something like this, it took one page and under 19 hours.",
    mark: "#1?",
    markCaption: "Round two. The clock is running.",
    markSrText: "Round two of the Google challenge is running.",
    secondaryCta: "See round one",
    googleLabel: "Google it yourself",
    googleUrl: "https://www.google.com/search?q=%22hardest+worker+in+Maryland%22",
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
  proof: {
    eyebrow: "Round one",
    h2: "We've done this before.",
    lead: "October 27, 2026. Nobody on Google had answered \"Leonardtown's sexiest man.\" So we built one page that did.",
    stats: [
      { value: "39 min", label: "to Google's first crawl", source: "Search Console, 2:40 AM" },
      { value: "Same day", label: "indexed", source: "Search Console, by 11:34 AM" },
      { value: "#1", label: "for the exact phrase", source: "Google, 8:19 PM, not personalized" },
      { value: "100", label: "PageSpeed, mobile and desktop", source: "PageSpeed Insights, 12:26 PM" },
    ],
    summary: "Under 19 hours from page live to #1 on Google.",
    linkLabel: "See the full round one story",
  },
  method: {
    eyebrow: "The point",
    h2: "Ranking for a joke is easy. Ranking for your business is the job.",
    body: "Every day your customers type questions into Google. The business with the best answer gets the call. Same method, pointed at the searches that make you money.",
    steps: [
      {
        title: "Pick the search.",
        body: "The exact words your customers type, like \"[service] in [town]\", where today's answers are weak.",
      },
      {
        title: "Build the best answer.",
        body: "One fast, focused page that answers that search better than anything else online.",
      },
      {
        title: "Get Google to see it.",
        body: "Search Console, a sitemap, structured data and a clean technical setup, so it's found fast.",
      },
      {
        title: "Turn clicks into calls.",
        body: "A clear offer, tap-to-call and follow-up that runs on its own. Our AI answers the phone and books the job.",
      },
    ],
  },
  offer: {
    eyebrow: "For business owners",
    h2: "What that work ethic means for your business",
    lead: "The same hours go into your business. You get the person who ranked a joke in a day, working on the searches that matter to you.",
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
    ],
    pricing: "Flat upfront quote. No hidden fees.",
    builtFor: "Built personally for you.",
    receiptsTitle: "The numbers so far",
    receipts,
  },
  expectations: {
    eyebrow: "Fair warning",
    h2: "Real talk about rankings",
    body: [
      "The hardest worker in Maryland has no competition on Google. \"[Your service] near me\" does.",
      "We start with the searches you can win fast, then go after the bigger ones. Nobody can honestly promise #1, and we won't.",
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
        q: "What does Hunter Lee do?",
        a: "He runs Lee Enterprises Unlimited, which builds websites and AI automation for business owners, including pages that rank on Google. He also runs Business Mastery, plays college baseball, coaches athletes privately and trains his own sales reps.",
      },
      {
        q: "What is Lee Enterprises Unlimited?",
        a: `Lee Enterprises Unlimited is Hunter Lee's company. It builds websites that bring customers in and AI automation that answers calls, follows up with leads and books jobs. So far: ${receipts
          .map((stat) => `${stat.value} ${stat.label}`)
          .join(", ")
          .replace(/, ([^,]*)$/, " and $1")}.`,
      },
      {
        q: "Can you get my business to #1 on Google?",
        a: "Nobody can honestly promise that, and be wary of anyone who does. We start with the searches you can win, show you the plan on a free call, then go after the bigger ones.",
      },
      {
        q: "How do I work with Hunter Lee?",
        a: `Book a free call. You can also call ${site.phone}, email ${site.email} or message ${instagramHandle} on Instagram.`,
      },
    ],
  },
  cta: {
    h2: "Google is about to learn my name twice. Let's teach it yours.",
    sub: "Flat upfront quote. No hidden fees. Built personally for you.",
  },
  sticky: {
    label: "Your business next?",
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
