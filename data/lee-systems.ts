/**
 * Lee Systems Co. - shared brand details and page content.
 *
 * Lee Systems Co. replaced Lee Marketing Mastery on 2026-09-25. It sells AI
 * automation (the lead offer, AI call answering included) and website builds.
 * The old /lee-marketing-mastery URLs redirect here (next.config.mjs).
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
 * FAQ lists live here rather than in their accordion components because the
 * pages also emit them as FAQPage structured data, and a server component
 * cannot read an array back out of a "use client" module.
 */

import { site } from "@/data/site";

export const leeSystemsRoutes = {
  home: "/lee-systems",
  automation: "/lee-systems/automation",
  websites: "/lee-systems/websites",
} as const;

/**
 * Section ids the CTAs scroll to. Kept here so a link and its target agree.
 * The automation form keeps the id "audit" from when it requested the free
 * Automation Audit, so links made then still land on it.
 */
export const leeSystemsAnchors = {
  automationForm: "audit",
  websiteForm: "website-quote",
} as const;

export const leeSystems = {
  name: "Lee Systems Co.",
  tagline: "A Lee Enterprises Unlimited company",
  parentName: "Lee Enterprises Unlimited",
  headline: "Systems that run your business while you run the work.",
  owner: "Hunter Lee",
  /** The parent company's inbox until Lee Systems Co. has its own. */
  contactEmail: site.email,
  phone: site.phone,
} as const;

/** What the automation form offers in its two dropdowns. */
export const auditIndustryOptions = [
  "Law firm",
  "Home services / roofing",
  "Medical, dental or wellness",
  "Real estate",
  "Accounting or financial services",
  "Other service business",
] as const;

export const auditTeamSizeOptions = [
  "Just me",
  "2-5 people",
  "6-15 people",
  "16-50 people",
  "More than 50",
] as const;

/**
 * What the website quote form asks the visitor to pick. The route checks the
 * posted value against this list, the same way the audit route checks its two
 * dropdowns above, so a label can change here without touching either.
 */
export const websiteProjectTypes = [
  "New website",
  "Redesign of my existing site",
  "Website plus lead follow-up automation",
  "Care plan for a site I already have",
  "Not sure yet",
] as const;

/**
 * The six things the main page says get automated. Short on purpose: the
 * automation page carries the full list, grouped by area.
 */
export const automatedTasks = [
  {
    id: "lead-response",
    title: "Instant lead response",
    body: "Every new inquiry gets a reply within a minute, day or night, and you get a text with the details.",
  },
  {
    id: "intake",
    title: "Client intake",
    body: "Intake forms collect the right information up front and file it where your team already works.",
  },
  {
    id: "follow-up",
    title: "Follow-up sequences",
    body: "Quotes, consultations and missed calls get followed up on a schedule, so nothing depends on memory.",
  },
  {
    id: "reviews",
    title: "Review requests",
    body: "Finished jobs and closed matters trigger a polite review request at the right moment.",
  },
  {
    id: "invoicing",
    title: "Invoice reminders",
    body: "Unpaid invoices get friendly reminders without anyone having to chase them by hand.",
  },
  {
    id: "reporting",
    title: "Daily reports",
    body: "A short summary each morning: new leads, booked appointments, and anything waiting on you.",
  },
] as const;

/**
 * The industries named on the main page and the automation page. Law firms and
 * home services are the two the owner knows best; the closing line covers
 * everyone else rather than listing industries with nothing specific to say.
 */
export const leeSystemsIndustries = [
  {
    id: "law-firms",
    name: "Law firms",
    summary:
      "Intake, consultations and client updates without the phone tag.",
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

export const otherIndustriesLine =
  "Don't see your industry? If your business depends on following up with people, we can automate it.";

export const automationFaqs = [
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
      "Mostly n8n, an automation platform that connects the tools you already use, with AI where it earns its place: drafting replies, sorting inquiries, and summarizing information. You do not need to learn either one to use what we build.",
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
      "It depends on how many steps and tools are involved. You get a timeline before you commit.",
  },
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "Any service business that depends on responding to and following up with people. Law firms and home services companies are the two we know best.",
  },
];

export const websiteFaqs = [
  {
    question: "What does “built before you pay” mean?",
    answer:
      "We build your site in full and show it to you working. You pay only once you have seen the finished site. If you decide not to go ahead, you do not pay.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Each project is quoted on its own. The price depends on how many pages you need, whether copy and photos already exist, and what the site has to do, such as booking appointments or connecting to other tools. The quote is free.",
  },
  {
    question: "How long does a build take?",
    answer:
      "It depends on the size of the site and how quickly feedback comes back. You get a timeline with your quote, and nothing goes live until you approve it.",
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
 * How Lee Systems Co. prices its work: the owner's offer terms, stated on the
 * homepage ("No surprises on price.") and on the industry pages.
 */
export const pricingPromise = [
  "Flat upfront quote",
  "No hidden fees",
  "No revenue share",
  "No required ad spend",
  "You choose the contract terms",
] as const;

/** The four things the homepage says Lee Systems Co. sets up. */
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
    body: "Built to bring in leads, and fully built before you pay.",
  },
] as const;
