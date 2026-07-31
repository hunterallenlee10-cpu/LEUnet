/**
 * Shared content for the Lee Marketing Mastery websites offering.
 *
 * Same split as `data/lmm.ts`: the FAQ list lives here rather than in the
 * accordion component because the page also renders it as FAQPage structured
 * data, and a "use client" module's exports become client references on the
 * server, so a server component cannot read the array back out of one.
 *
 * `websitePortfolio` is here for the same reason - the page emits it as an
 * ItemList alongside the FAQs.
 */

export const websiteFaqs = [
  {
    question: "What does “built with AI” actually mean here?",
    answer:
      "AI is used during the build - drafting copy, generating layout and design options, producing images, and writing code - so a site that would normally take weeks of billable design time comes together in a fraction of it. A person reviews, edits, and approves everything before launch. You are not receiving raw generated output.",
  },
  {
    question: "Is an AI-built website lower quality than a hand-built one?",
    answer:
      "It is the same web technology either way. These sites are built on Next.js and React, the same framework behind the pages in this portfolio, and they are hand-reviewed before launch. AI changes how quickly the work gets done, not what gets delivered.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Pricing depends on the number of pages, how much custom functionality is involved, whether content and images already exist, and which integrations are required. We quote each project after a short conversation about scope rather than publishing a universal price.",
  },
  {
    question: "How long does a build take?",
    answer:
      "The timeline depends on scope, how quickly content and feedback come back, and how many revision rounds are needed. AI-assisted production removes much of the slowest part of a traditional build, but review and approval still take real time. We scope the timeline during the consultation.",
  },
  {
    question: "Do I own the website when it is finished?",
    answer:
      "Yes. The finished site and its content are yours. If you later move to another provider or want to manage it in-house, the site goes with you.",
  },
  {
    question: "Can you rebuild my existing website instead of starting over?",
    answer:
      "Yes. Redesigns are a common request. We review what is already working, what content is worth keeping, and what is costing you visitors, then rebuild on a modern foundation rather than patching an aging one.",
  },
  {
    question: "Will the site work on phones?",
    answer:
      "Every build is responsive by default. Layouts are designed to work from small phone screens up to large desktop monitors, and pages are checked at multiple widths before launch.",
  },
  {
    question: "What happens after the site launches?",
    answer:
      "You can take it from there, or we can keep it maintained with a care plan covering hosting, updates, backups, security patches, and small content changes. The care plan is optional and is quoted separately from the build.",
  },
  {
    question: "Can the website connect to the automation systems you build?",
    answer:
      "That is the most common reason clients come to us for both. A website that captures a lead is more valuable when the lead is automatically routed, enriched, and followed up on. The site and the automation system can be designed together from the start.",
  },
  {
    question: "Do I need to have my content and images ready first?",
    answer:
      "No. Missing copy and imagery are the most common reason website projects stall, which is exactly where AI-assisted production helps most. We can draft page copy and produce imagery for your review, then revise from your feedback.",
  },
];

/**
 * Proof shown on the page. Every entry is a site built by Lee Enterprises
 * Unlimited and reachable from this domain, so a visitor can verify each claim
 * by clicking it. These are LEU's own ventures, not client work, and the page
 * copy says so - see docs/WEBSITES.md for why that distinction is kept explicit.
 */
export interface WebsitePortfolioItem {
  name: string;
  href: string;
  summary: string;
  highlights: string[];
}

export const websitePortfolio: WebsitePortfolioItem[] = [
  {
    name: "Pelican Power Wash",
    href: "/pelican-power-wash",
    summary:
      "A service business site built to turn local searches into quote requests, with the pricing and service-area questions answered before a visitor has to ask.",
    highlights: [
      "Quote request form",
      "Before and after slider",
      "Service area detail",
    ],
  },
  {
    name: "Thread T-Shirts",
    href: "/thread-t-shirts",
    summary:
      "A product catalog with filtering, a cart, and an order-request flow, built to collect orders before a payment system was in place.",
    highlights: ["24-product catalog", "Filtering and cart", "Order requests"],
  },
  {
    name: "Lee Marketing Mastery",
    href: "/lee-marketing-mastery",
    summary:
      "A services site that explains a technical offering in plain language and routes qualified interest into a structured consultation request.",
    highlights: [
      "Animated system visual",
      "Expandable service detail",
      "Consultation form",
    ],
  },
  {
    name: "H1 Performance",
    href: "/h1-performance",
    summary:
      "A coaching site that prices two remote training packages up front and qualifies athletes through a consultation request built around sport, goals, and available equipment.",
    highlights: [
      "Package pricing",
      "Coach credentials",
      "Athlete intake form",
    ],
  },
  {
    name: "Lee Enterprises Unlimited",
    href: "/",
    summary:
      "The parent company site tying four ventures together under one brand, with a portfolio, an About section, and a routed contact form.",
    highlights: ["Multi-venture structure", "Portfolio", "Contact routing"],
  },
];
