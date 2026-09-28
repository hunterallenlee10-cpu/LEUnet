/**
 * Lee Systems Co. - shared brand details and page content.
 *
 * Lee Systems Co. replaced Lee Marketing Mastery on 2026-09-25. It sells two
 * things: business automation (the lead offer) and website builds. The old
 * /lee-marketing-mastery URLs redirect here (next.config.mjs), and the
 * Traditional & Digital Marketing offering was retired with the rename.
 *
 * Anything the owner still has to supply is marked PLACEHOLDER here or in the
 * component that renders it, and every one is listed in docs/LEE-SYSTEMS.md.
 *
 * FAQ lists live here rather than in their accordion components because the
 * pages also emit them as FAQPage structured data, and a server component
 * cannot read an array back out of a "use client" module.
 */

export const leeSystemsRoutes = {
  home: "/lee-systems",
  automation: "/lee-systems/automation",
  websites: "/lee-systems/websites",
} as const;

/** Section ids the CTAs scroll to. Kept here so a link and its target agree. */
export const leeSystemsAnchors = {
  auditForm: "audit",
  websiteForm: "website-quote",
} as const;

export const leeSystems = {
  name: "Lee Systems Co.",
  tagline: "A Lee Enterprises Unlimited company",
  parentName: "Lee Enterprises Unlimited",
  parentUrl: "https://www.leeenterprisesunlimited.com",
  headline: "Systems that run your business while you run the work.",
  owner: "Hunter Lee",
  city: "Frederick",
  region: "Maryland",
  regionCode: "MD",
  serviceArea: "Frederick, Maryland, and remote nationwide",
  contactEmail: "ceo@leeenterprisesunlimited.com",
  /** PLACEHOLDER: no phone number is published yet. Leave null to hide it. */
  phone: null as string | null,
} as const;

/** The free Automation Audit, as the automation page and the form describe it. */
export const automationAudit = {
  name: "Automation Audit",
  price: "Free",
  turnaround: "5 business days",
  responseTime: "12 hours",
} as const;

/** What the audit form offers in its two dropdowns. */
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
 * The six things the main page says get automated. Short on purpose: the
 * automation page carries the full list, grouped by area.
 */
export const automatedTasks = [
  {
    id: "lead-response",
    title: "Instant lead response",
    body: "Every new enquiry gets a reply within a minute, day or night, and you get a text with the details.",
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
    name: "Law Firms",
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
    name: "Home Services & Roofing",
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
    question: "What is the Automation Audit?",
    answer:
      "A free review of how leads, intake, follow-ups and admin work in your business today. We look at where time goes and where enquiries slip through, then send you a written list of what is worth automating, in what order, and what each piece would cost. You get it within 5 business days.",
  },
  {
    question: "Is the audit really free?",
    answer:
      "Yes. There is no charge and no obligation to hire us afterwards. The list is yours to use however you like.",
  },
  {
    question: "What do you build the systems with?",
    answer:
      "Mostly n8n, an automation platform that connects the tools you already use, with AI where it earns its place: drafting replies, sorting enquiries, and summarizing information. You do not need to learn either one to use what we build.",
  },
  {
    question: "Do I need to replace my current software?",
    answer:
      "Usually not. Most systems connect the email, calendar, phone, CRM and billing tools you already have. If something you use cannot be connected, the audit will say so.",
  },
  {
    question: "Will AI talk to my customers without me knowing?",
    answer:
      "No. Anything a customer or client will see is written with you and approved by you before it goes live.",
  },
  {
    question: "How long does a build take?",
    answer:
      "It depends on how many steps and tools are involved. The audit includes a timeline for each piece, so you know before you commit.",
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
 * The homepage teaser for Lee Systems Co., in the slot beside the Business
 * Mastery teaser, and the same shape as `bmHero` in data/business-mastery.ts.
 *
 * The manifesto is the owner's own track record, supplied 2026-09-13 and
 * carried over from the Lee Marketing Mastery teaser at the rename. It is the
 * same claim as `bmProofStatement` in data/business-mastery.ts, so a change to
 * the figures touches both in the same edit.
 *
 * `subtitle` and `description` are one sentence split at its colon; the
 * component joins them with a single space.
 *
 * `assuranceLine` sits where the Business Mastery teaser puts its scarcity
 * line. It is a fact about how the work is sold, not an urgency claim.
 */
export const leeSystemsHomeTeaser = {
  eyebrow: "Lee Systems Co.",
  manifesto:
    "50+ businesses built. 1,000+ worked with. $150,000+ generated for our clients.",
  subtitle: "That's what's behind every system we build:",
  description:
    "business automation that answers, follows up and files for you, and websites built before you pay.",
  assuranceLine: "Free Consultation",
  cta: "See What We Build",
} as const;
