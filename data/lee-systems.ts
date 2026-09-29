/**
 * Lee Systems Co. - shared brand details and page content.
 *
 * Lee Systems Co. replaced Lee Marketing Mastery on 2026-09-25. It sells AI
 * automation (the lead offer, AI call answering included) and website builds,
 * both on one page, /lee-systems. The automation and websites pages folded
 * into it on 2026-09-29: their URLs, and the old /lee-marketing-mastery ones,
 * redirect to its #automation and #websites sections (next.config.mjs).
 *
 * Business facts - phone, email, the booking link and the reply time - live
 * in data/site.ts. At the owner's request (2026-09-28) the pages say nothing
 * about where the business is based or which area it serves.
 *
 * The first step is a free consultation call, booked with "Book a free call"
 * (`bookLabel` and `bookHref` in data/site.ts). It replaced the free
 * Automation Audit and its written plan on 2026-09-28, also at the owner's
 * request.
 *
 * The FAQ list lives here rather than in its accordion component because the
 * page also emits it as FAQPage structured data, and a server component
 * cannot read an array back out of a "use client" module.
 */

import { site } from "@/data/site";

export const leeSystemsRoutes = {
  home: "/lee-systems",
  lawFirms: "/lee-systems/law-firms",
  homeServices: "/lee-systems/home-services",
} as const;

/**
 * Section ids on /lee-systems that links point at, kept here so a link and
 * its target agree. The form also keeps the ids the two forms it replaced had
 * on their own pages - "audit" (from when the automation form requested the
 * free Automation Audit) and "website-quote" - on wrappers around it, so
 * links made for either still land on it.
 */
export const leeSystemsAnchors = {
  automation: "automation",
  websites: "websites",
  form: "contact-form",
  auditForm: "audit",
  websiteQuoteForm: "website-quote",
} as const;

/** The two offerings' sections, linked from anywhere on the site. */
export const leeSystemsLinks = {
  automation: `${leeSystemsRoutes.home}#${leeSystemsAnchors.automation}`,
  websites: `${leeSystemsRoutes.home}#${leeSystemsAnchors.websites}`,
} as const;

export const leeSystems = {
  name: "Lee Systems Co.",
  tagline: "A Lee Enterprises Unlimited company",
  parentName: "Lee Enterprises Unlimited",
  /**
   * The main page's headline, in two parts so the hero can light the second
   * in brass (the owner's "get ahead of your competition" framing,
   * 2026-09-29). The link preview reads both.
   */
  headline: "The world is changing.",
  headlineAccent: "Beat your competition to every lead.",
  owner: "Hunter Lee",
  /** The parent company's inbox until Lee Systems Co. has its own. */
  contactEmail: site.email,
  phone: site.phone,
} as const;

/**
 * The industries on /lee-systems ("Who we help"), each with a page of its own
 * (`page`) that the owner can send prospects in that industry. Law firms and
 * home services are the two the owner knows best; the closing line covers
 * everyone else rather than listing industries with nothing specific to say.
 *
 * The industry pages are built only from copy already on the site: the
 * industry's summary and examples here, the Audit, Build, Run steps, the
 * pricing promise and the closing call to action. Nothing on them is new
 * claim-wise.
 */
export const leeSystemsIndustries = [
  {
    id: "law-firms",
    name: "Law firms",
    summary:
      "Intake, consultations and client updates without the phone tag.",
    page: {
      href: leeSystemsRoutes.lawFirms,
      title: "Law Firm Intake Automation | Lee Systems Co.",
      description:
        "Intake forms, consultation booking, follow-up for prospective clients and case status updates for law firms, automated by Lee Systems Co.",
    },
    examples: [
      "Intake forms that collect case details before the first call",
      "Consultation booking with automatic reminders",
      "Follow-up for prospective clients who have not signed yet",
      "Document requests that chase themselves",
      "Case status updates sent to clients at each stage",
      "Review requests when a matter closes",
    ],
  },
  {
    id: "home-services",
    name: "Home services & roofing",
    summary:
      "Every lead answered, every estimate followed up, every job reviewed.",
    page: {
      href: leeSystemsRoutes.homeServices,
      title: "Home Services & Roofing Automation | Lee Systems Co.",
      description:
        "Instant replies to every lead, inspection scheduling, estimate follow-up and review requests for home services and roofing, automated by Lee Systems Co.",
    },
    examples: [
      "Instant replies to web, phone and ad leads",
      "Inspection scheduling with reminders the day before",
      "Estimate follow-up until the customer says yes or no",
      "Job status texts: scheduled, on the way, finished",
      "Review and referral requests after the job",
      "Invoice reminders until it is paid",
    ],
  },
] as const;

/**
 * More example industries, added on the owner's request (2026-09-29). Shown
 * as cards next to the two above on /lee-systems, but without pages of their
 * own, so they are kept apart from `leeSystemsIndustries` (which the industry
 * pages read). The examples say what the automations do, not work already
 * done: no client claims.
 */
export const moreIndustries = [
  {
    id: "real-estate",
    name: "Real estate",
    summary:
      "Every inquiry answered fast, every showing booked, every past client remembered.",
    examples: [
      "Instant replies to listing and portal inquiries",
      "Showing scheduling with reminders",
      "Follow-up for buyers and sellers who are not ready yet",
      "Updates to clients at each step of the deal",
      "Review and referral requests after closing",
    ],
  },
  {
    id: "fitness",
    name: "Fitness & PT",
    summary:
      "Trial sign-ups followed up, sessions booked and members kept coming back.",
    examples: [
      "Instant replies to trial and class inquiries",
      "Session booking with reminders",
      "Follow-up after a missed session or no-show",
      "Check-ins for members who have gone quiet",
      "Review requests after a milestone",
    ],
  },
  {
    id: "dealerships",
    name: "Dealerships",
    summary:
      "Every lead answered in minutes, test drives booked and service customers brought back.",
    examples: [
      "Instant replies to website and third-party leads",
      "Test drive and appointment booking with reminders",
      "Follow-up for shoppers who have not bought yet",
      "Service reminders when a car is due",
      "Review requests after a sale or service visit",
    ],
  },
  {
    id: "restaurants",
    name: "Restaurants",
    summary:
      "Calls answered, reservations and catering handled, regulars brought back.",
    examples: [
      "AI call answering for hours, menu and reservation questions",
      "Reservation booking with reminders",
      "Catering and large-order inquiry follow-up",
      "Messages to regulars about specials and events",
      "Review requests after a visit",
    ],
  },
] as const;

/**
 * An industry name mid-sentence ("See the page for law firms"): only the
 * first letter drops to lower case, so "Fitness & PT" keeps its PT.
 */
export function industryInSentence(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

export const otherIndustriesLine =
  "Don't see your industry? If your business depends on following up with people, we can automate it.";

/**
 * "What do you need?" on the /lee-systems form, which replaced the automation
 * consultation form and the website quote form. A `website` choice is
 * delivered the way the website quote form's requests were (its recipient and
 * its subject line); everything else the way the consultation form's were.
 * The route checks the posted value against this list, so a label can change
 * here without touching it.
 */
export const inquiryNeeds = [
  { label: "AI call answering", website: false },
  { label: "Automation", website: false },
  { label: "Website", website: true },
  { label: "Website + automation", website: true },
  { label: "Not sure", website: false },
] as const;

/** The form's industry choices: the industries the page shows, then Other. */
export const inquiryIndustryOptions: readonly string[] = [
  ...leeSystemsIndustries.map(({ name }) => name),
  ...moreIndustries.map(({ name }) => name),
  "Other",
];

/**
 * The /lee-systems FAQ: the automation page's questions, then the websites
 * page's, merged when those pages folded into /lee-systems (2026-09-29).
 * Both asked "How long does a build take?"; it is asked once here, and its
 * answer joins the two existing answers without adding to them.
 */
export const leeSystemsFaqs = [
  {
    question: "What happens on the free call?",
    answer:
      "It's a free consultation. We talk through how calls, leads, intake, follow-ups and admin work in your business today, and where time goes or inquiries slip through. If something is worth automating, you get a flat quote up front: no hidden fees, no revenue share and no required ad spend.",
  },
  {
    question: "Is the call really free?",
    answer:
      "Yes. There is no charge and no obligation to hire us afterwards.",
  },
  {
    question: "What do you build the systems with?",
    answer:
      "AI and the tools you already use every day. If anything new needs setting up, we handle that for you too.",
  },
  {
    question: "What can the AI phone assistant do?",
    answer:
      "It works like a 24/7 virtual receptionist and sales assistant. It answers calls, handles frequently asked questions, books and reschedules appointments, qualifies leads, takes messages, transfers calls, texts missed callers, follows up with leads and past customers, sends reminders and updates your CRM automatically. It can also make outbound calls for lead follow-up, appointment confirmations, customer reactivation and review requests.",
  },
  {
    question: "Do I need to replace my current software?",
    answer:
      "Usually not. Most systems connect the email, calendar, phone, CRM and billing tools you already have. If something you use cannot be connected, we'll tell you on the call.",
  },
  {
    question: "Will AI talk to my customers without me knowing?",
    answer:
      "No. Anything a customer or client will see is written with you and approved by you before it goes live.",
  },
  {
    question: "How long does a build take?",
    answer:
      "It depends on how many steps and tools are involved, or for a website, on the size of the site and how quickly feedback comes back. You get a timeline with your quote, before you commit, and nothing goes live until you approve it.",
  },
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "Any service business that depends on responding to and following up with people.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Each project is quoted on its own. The price depends on how many pages you need, whether copy and photos already exist, and what the site has to do, such as booking appointments or connecting to other tools. The quote is free.",
  },
  {
    question: "Do I need my content and photos ready first?",
    answer:
      "No. We draft the page copy for your review and revise it from your feedback. If you already have branding, photos or copy worth keeping, we keep them.",
  },
  {
    question: "Can you rebuild my existing website?",
    answer:
      "Yes. We review what is working on the current site and what content is worth keeping, then rebuild it on a current foundation.",
  },
  {
    question: "Do I own the website?",
    answer:
      "Yes. You own your domain and your content. If you later move to another provider, the site goes with you.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You can take it from there, or we can keep it maintained with an optional care plan covering hosting, updates, backups and small changes. The care plan is quoted separately from the build.",
  },
  {
    question: "Can the site connect to the automation systems you build?",
    answer:
      "Yes. A lead the site captures can get an instant reply, reach your phone, and be followed up on a schedule. That can be built in from the start or added to a site that is already live.",
  },
];

/**
 * How Lee Systems Co. prices its work: the owner's offer terms, stated in
 * "The choice is yours" on /lee-systems and in the industry pages' band
 * ("No surprises on price.").
 */
export const pricingPromise = [
  "Flat upfront quote",
  "No hidden fees",
  "No revenue share",
  "No required ad spend",
  "You choose the contract terms",
] as const;

/** The four things the homepage says Lee Systems Co. sets up. NOTHING RENDERS
 * THIS RIGHT NOW: LeeSystemsSetupSection came off the homepage at the owner's
 * request (2026-09-28) and is kept so it can go back with no content work. */
export const homeSetupItems = [
  {
    id: "calls",
    title: "AI call answering",
    body: "An AI assistant that answers your business calls 24/7.",
  },
  {
    id: "follow-up",
    title: "Instant follow-up",
    body: "Every new inquiry gets a reply in under a minute.",
  },
  {
    id: "crm",
    title: "CRM and intake",
    body: "Lead and client details land in one place, with no retyping.",
  },
  {
    id: "websites",
    title: "Websites",
    body: "Built to bring in leads, and you own it.",
  },
] as const;
