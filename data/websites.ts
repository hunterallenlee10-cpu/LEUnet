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

/**
 * Two questions were deleted here rather than rewritten: "What does built with
 * AI actually mean here?" and "Is an AI-built website lower quality than a
 * hand-built one?". Both existed only to defend a production claim the page no
 * longer makes, and an FAQ that raises an objection nobody asked is a net loss
 * of trust. AI now appears in this list only where it describes something the
 * finished site does for the visitor's own customers - answering a question at
 * 11pm, routing a lead - never how the site was produced. Do not add the
 * production framing back in.
 *
 * Build speed is a real advantage and it stays, but only as the first answer
 * below states it: what the owner loses while a project drags. It is never the
 * promise, and it does not belong in the leading clause of any answer.
 *
 * These render as FAQPage structured data as well as on the page, so each
 * answer has to stand on its own and has to be defensible. Nothing here claims
 * a result we cannot show, and nothing here claims a frequency we cannot count
 * - see docs/WEBSITES.md section 3.
 *
 * Claims that were pulled from this file, and why, so they do not come back:
 *
 * - Form-fill and phone-call attribution ("see which pages produce calls").
 *   The repo wires Vercel Analytics in app/layout.tsx, which reports pageviews
 *   and landing pages only. There is no form-fill event and no call tracking
 *   anywhere in this codebase. What replaced it - arrivals, landing pages, and
 *   an email on every submission - is all true and is stated in the "How will I
 *   know if it is working?" answer.
 * - "Most builds are measured in weeks rather than months." There are no
 *   completed client builds to derive a typical timeframe from. The answer now
 *   names what the timeline depends on instead of how long it usually takes.
 * - "That is the most common reason clients come to us for both." This asserted
 *   a client base that the first answer on this same page correctly says does
 *   not exist. A page cannot contradict itself in two accordion panels.
 * - "Redesigns are a common request", "the most common reason a website project
 *   stalls", "most visitors will see your site on a phone first", "most
 *   businesses need several". Every "most X" here was an unmeasured guess about
 *   the market or about our own clients. The underlying point survives in each
 *   case as reasoning; it just no longer poses as data.
 *
 * The rule going forward: a specific, modest, checkable claim beats both an
 * overclaim and a hedge. If a sentence needs a number we have not counted, cut
 * the number, not the sentence.
 */
export const websiteFaqs = [
  {
    // Opens expanded by default, so it carries the page's honesty position. The
    // only proof we have is structural and inspectable, and saying that plainly
    // reads better to a skeptical buyer than a hedged claim about results would.
    //
    // This answer invites the reader to go verify something, which means the
    // portfolio has to actually show whatever this sentence says it shows. It
    // used to list "a focused page for each offer" as visible in the portfolio;
    // three of the four entries are single long pages, so the invitation failed
    // on inspection. It now points at the one entry that genuinely demonstrates
    // page-per-offer - Lee Marketing Mastery, which is a hub about the venture
    // with its own page for websites, marketing, and automation, one of which
    // is the page this FAQ sits on.
    //
    // The count is three, and it is checkable in one click - keep it in step
    // with the LMM portfolio entry's summary further down this file, which
    // makes the same claim to the same reader on the same screen. It said two
    // for a while, because /lee-marketing-mastery was itself the automation
    // page and carried that offering inline; automation now has its own route
    // and the broader phrasing is simply correct. Still do not widen the
    // invitation out to the whole portfolio: the other three entries remain
    // single long pages, which is the reason this sentence names one entry
    // rather than gesturing at all four.
    question: "How do I know it will actually bring in customers?",
    answer:
      "We do not publish client results, because the sites in the portfolio on this page are our own ventures rather than client projects. What we offer instead is inspection: every one is live right now, so open one on your phone, read the first screen, and send the form the way a customer would. For the page-per-offer structure, look at the Lee Marketing Mastery entry - a hub about the business, plus its own page for websites, marketing, and automation, one of which you are reading. What gets built for you follows the same pattern: copy that leads with the outcome someone came looking for, one obvious next step on every screen, and measurement connected before launch rather than months later.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Pricing depends on the number of pages, how much custom functionality is involved, whether content and images already exist, and which integrations are required. We quote each project after a short conversation about scope rather than publishing a universal price.",
  },
  {
    // The Shift section already argues WHY one homepage is not enough, using the
    // gutter cleaning example. This answer used to repeat that argument almost
    // sentence for sentence, which wasted the slot - someone who opened an FAQ
    // has accepted the argument and wants the practical answer. So this one
    // answers the actual question: how many pages, and what decides it.
    question: "Do I need one page or several?",
    answer:
      "It depends on how many separate things you sell and how many you want to be found for on their own. A useful starting rule is one page per offer you would spend advertising money on, plus a home page and a way to get in touch - so a business with three real services is looking at about five pages, not one. A single page is enough when you sell one service, or when the site exists to receive one campaign's traffic. Pages can be added later without rebuilding. We map the list during the consultation so you only pay for pages that have a job.",
  },
  {
    // Scoped deliberately to what the stack actually reports. Analytics gives
    // arrivals and landing pages; the API routes email every submission with a
    // subject line identifying the form. Neither of those is conversion
    // attribution, and this answer must not imply it is. If call tracking or
    // form-fill events are ever added, this is the answer that gets to grow.
    question: "How will I know if it is working?",
    answer:
      "Two things are set up before launch rather than months after it. Analytics tells you how many people arrive and which pages they land on, so “the site feels quiet” becomes something you can actually look at. And every form emails you the moment it is submitted, with a subject line naming which form it came from, so enquiries reach you directly rather than waiting in a dashboard. We will walk you through the analytics, or hand them over if you would rather read them yourself.",
  },
  {
    // No typical duration is quoted here, and none should be added until there
    // are enough finished client builds to average - docs/WEBSITES.md section 7
    // makes the same call. Naming the variables is more useful to a buyer than
    // a range we would have invented, and it survives contact with reality.
    question: "How long does a build take?",
    answer:
      "It depends on scope - how many pages, whether copy and images already exist, what functionality is involved - and on how quickly feedback comes back. We would rather scope that with you during the consultation than quote a number of days at a project we have not seen. Nothing goes live until you approve it.",
  },
  {
    // The demoted speed point lives here, framed as what the delay costs the
    // owner. The point stands as reasoning - a project cannot ship without copy
    // - so it does not need the frequency claim it used to carry ("the most
    // common reason a website project stalls"), which was never counted.
    question: "Do I need to have my content and images ready first?",
    answer:
      "No. A build stalls when the copy never gets written, and every month it sits half-finished is visitors landing on the old site and deciding without you. We draft the page copy and produce the imagery for your review, then revise from your feedback. If you already have branding, photography, or copy worth keeping, we keep it.",
  },
  {
    question: "Can you rebuild my existing website instead of starting over?",
    answer:
      "Yes. Rebuilds are part of what we quote for. We review what is already working, what content is worth keeping, and what is costing you visitors, then rebuild on a current foundation rather than patching an aging one.",
  },
  {
    question: "Do I own the website when it is finished?",
    answer:
      "Yes. The finished site and its content are yours. If you later move to another provider or want to manage it in-house, the site goes with you.",
  },
  {
    // Answering a direct question, not selling a feature - a phone layout is the
    // floor in 2026, and the page deliberately does not advertise it as a
    // differentiator anywhere else. The old closing line asserted that most
    // visitors arrive on a phone, which we have never measured; it is now
    // conditional, which costs the sentence nothing.
    question: "Will the site work on phones?",
    answer:
      "Every build is responsive by default. Layouts are designed to work from small phone screens up to large desktop monitors, and pages are checked at several widths before launch. If a customer finds you on a phone, that is the screen your site gets judged on - it is not treated as a shrunk-down desktop layout.",
  },
  {
    question: "What happens after the site launches?",
    answer:
      "You can take it from there, or we can keep it maintained with a care plan covering hosting, updates, backups, security patches, and small content changes. The care plan is optional and is quoted separately from the build.",
  },
  {
    // Reframed from "this is why clients come to us for both" - which claimed a
    // client base the first answer on this page says we do not have - to what
    // the two offerings can be scoped to do together. Everything named here is
    // quoted per project, matching how the rest of the page describes it.
    question: "Can the website connect to the automation systems you build?",
    answer:
      "Yes, and the two are easier to scope together than to join up afterwards. A lead the site captures is worth more when it reaches your phone right away, gets a first response without anyone remembering to send one, and is followed up on a set schedule. That can be built around the form from the start or added to a site that is already live, and either way it is quoted as part of the project.",
  },
];

/**
 * Proof shown on the page. Every entry is a site built by Lee Enterprises
 * Unlimited and reachable from this domain, so a visitor can verify each claim
 * by clicking it. These are LEU's own ventures, not client work, and the page
 * copy says so - see docs/WEBSITES.md for why that distinction is kept explicit.
 *
 * Each summary states what the site converts and into what, because the section
 * now proves the outcome rather than the production method. They used to list
 * features ("24-product catalog, filtering and cart"), which reads as a spec
 * sheet and asks the buyer to work out the value themselves. Keep them
 * outcome-first, and keep them checkable - every claim below is something a
 * visitor can confirm by opening the page. No traffic figures, no conversion
 * numbers, nothing that would need a screenshot to substantiate.
 *
 * The `highlights` chips are allowed to stay concrete and feature-ish. They are
 * the evidence under the claim, not the claim itself. They are also load-bearing
 * as claims in their own right - "Routed contact form" sat here until someone
 * read app/api/contact/route.ts and found that every submission goes to one
 * CONTACT_TO_EMAIL address with only the subject line varying by venture. A chip
 * has to be checkable in the code or on the page, same as a summary.
 *
 * One thing this list must never imply: these are four separate websites for
 * four separate businesses. They are four routes on one domain and one
 * deployment, and two of them are the site the visitor is reading. The section
 * heading in WebsitesWorkSection carries that honesty; do not undercut it here
 * by writing summaries that read like separate client engagements.
 */
export interface WebsitePortfolioItem {
  name: string;
  href: string;
  summary: string;
  highlights: string[];
}

export const websitePortfolio: WebsitePortfolioItem[] = [
  {
    name: "Thread T-Shirts",
    href: "/thread-t-shirts",
    summary:
      "Turns a team, a shop, or an event organizer browsing shirts into a written order request - garment, quantity, artwork, and deadline all captured - without a checkout system behind it. Nobody has to email to ask how ordering works.",
    highlights: [
      "Filterable catalog",
      "Cart and order request",
      "Bulk order path",
    ],
  },
  {
    // The one entry that demonstrates page-per-offer, which is why the first FAQ
    // sends the reader here specifically rather than at the portfolio as a
    // whole. Keep the offer-page detail in the summary and the chip: it is the
    // only structural proof on the page for an argument the page makes
    // repeatedly, and it is verifiable in one click.
    //
    // This entry used to carry a caveat: the route was itself the automation
    // page and carried that offering inline, so it could only claim two offer
    // pages rather than a page per offering. That is no longer true. The route
    // is now a hub about the venture with three offer pages under it - websites,
    // marketing, and automation - so the structural claim can be stated plainly
    // and the reader finds exactly that when they click. Keep the count at
    // three and keep "one of which you are reading now": both are checkable in
    // one click, which is the only reason this entry earns its place.
    name: "Lee Marketing Mastery",
    href: "/lee-marketing-mastery",
    summary:
      "Takes three offerings that are hard to picture from a description and makes each one concrete enough to act on, then hands the visitor a request that arrives with the scope already described. It is also the page-per-offer structure in use - a hub about the business, plus its own page for websites, marketing, and automation, one of which you are reading now.",
    highlights: [
      "Hub plus offer pages",
      "Expandable service detail",
      "Consultation form",
    ],
  },
  {
    name: "H1 Performance",
    href: "/h1-performance",
    summary:
      "Turns a parent or athlete weighing remote coaching into a consultation request. Both packages are priced on the page and the coaches’ playing records are listed, so cost and credentials are settled before anyone has to send a message asking.",
    highlights: [
      "Package pricing",
      "Coach credentials",
      "Athlete intake form",
    ],
  },
  {
    // The summary and the third chip both used to say this site routes the
    // contact form to the right place. It does not. app/api/contact/route.ts
    // sends every submission to a single CONTACT_TO_EMAIL recipient and varies
    // only the subject line by the venture the visitor selected. That is still
    // worth claiming - the enquiry arrives already labeled - but it is labeling,
    // not routing. Do not restore the routing wording unless the route changes.
    name: "Lee Enterprises Unlimited",
    href: "/",
    summary:
      "Sends a visitor who came for one of three very different businesses to the right one without making them guess, then asks on the contact form which venture they are here about - so the enquiry lands already labeled instead of as a blank “get in touch” message.",
    highlights: [
      "Three ventures, one site",
      "Venture-by-venture detail",
      "Venture-labeled enquiries",
    ],
  },
];
