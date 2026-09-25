/**
 * Shared content for the Lee Marketing Mastery marketing-services offering.
 *
 * Same split as `data/lmm.ts` and `data/websites.ts`: the FAQ list lives here
 * rather than in the accordion component because the page also renders it as
 * FAQPage structured data, and a "use client" module's exports become client
 * references on the server, so a server component cannot read the array back
 * out of one.
 *
 * The digital list mirrors the Lee Marketing Mastery card on the LEU homepage
 * (`ventureServices.lmm` in `data/services.ts`) so the two never drift apart.
 * Two entries from that card are deliberately absent: Business Automation and
 * website development already have their own pages, and this page cross-links
 * to them rather than restating them.
 */

export const marketingFaqs = [
  {
    question: "Do I have to buy traditional and digital together?",
    answer:
      "No. Some businesses need a mailer and a vehicle wrap and nothing else. Others need paid ads and a review system. We scope whichever mix fits how your customers actually find you, and we will say so if you only need one side.",
  },
  {
    question: "Why bother with print when everything is online?",
    answer:
      "Because attention is not only online. A wrapped vehicle parked at a job site, a yard sign in a finished customer's lawn, and a postcard on a kitchen counter all reach people who are not searching yet. Print and digital work best when they reinforce each other, not when one replaces the other.",
  },
  {
    question: "Do you design the materials, or do I need to supply artwork?",
    answer:
      "We design them. If you already have branding, we work inside it. If you do not, we can build the look alongside the campaign so your signage, mailers, and social posts do not look like they came from three different companies.",
  },
  {
    question: "What does it cost?",
    answer:
      "It depends on the channels, the print quantities, and whether an ad budget is involved. Print is a per-piece cost that drops sharply at volume, ad management is ongoing, and a one-time vehicle wrap is neither. We quote each project rather than publishing a universal price.",
  },
  {
    question: "Do you manage the ad budget, or do I pay the platforms directly?",
    answer:
      "You pay the platforms directly, so the ad spend stays in your name and under your control. We manage the campaigns, targeting, creative, and reporting. That separation also means you keep the account and its history if we ever stop working together.",
  },
  {
    question: "How do I know whether any of it is working?",
    answer:
      "Digital channels report on themselves - impressions, clicks, cost per lead, and conversions are all measurable. Traditional channels are harder to attribute, so we use trackable phone numbers, dedicated landing pages, or offer codes where it makes sense. We would rather tell you a channel is unmeasurable than invent a number for it.",
  },
  {
    // This answer named the producer, and the page linked out to it, until
    // that venture came off this site on 2026-09-25 (docs/THREAD.md). The offer
    // stands, so the answer still says yes; it no longer points anywhere, and
    // it dropped "rather than through an outside supplier", which only that
    // venture could back.
    question: "Can you handle branded apparel too?",
    answer:
      "Yes. Shirts, hats, and team gear can be produced alongside the rest of your campaign, so the branding stays consistent with everything else you run.",
  },
  {
    question: "What if I need something that is not on this page?",
    answer:
      "Ask. Billboards, TV spots, radio, and event sponsorships are all reachable through our network even though they are not standing offerings. Tell us the idea and we will tell you honestly whether we can make it happen.",
  },
  {
    question: "Do you also build websites and automation systems?",
    answer:
      "Yes, and they are separate offerings with their own pages. Marketing that drives traffic works better when the site receiving that traffic is built to convert and the leads it captures are followed up on automatically. Many clients start with one and add the others.",
  },
];

export interface MarketingService {
  id: string;
  title: string;
  description: string;
  items: string[];
}

/** Physical, offline channels. */
export const traditionalServices: MarketingService[] = [
  {
    id: "print",
    title: "Print & Direct Mail",
    description:
      "The materials a customer can hold on to, hand to someone else, or leave sitting on a counter until they need you.",
    items: [
      "Flyers",
      "Postcards",
      "Brochures",
      "Business cards",
      "Direct mailers",
    ],
  },
  {
    id: "signage",
    title: "Signs & Banners",
    description:
      "Physical presence where the work happens and where your customers already are. A finished job site is the cheapest advertising a local business has.",
    items: [
      "Yard signs",
      "Event and trade show banners",
      "Storefront signage",
      "Job site signage",
    ],
  },
  {
    id: "vehicle",
    title: "Vehicle Graphics & Magnets",
    description:
      "A truck that already drives your service area every day, turned into advertising that works while it is parked.",
    items: [
      "Full and partial vehicle wraps",
      "Door and tailgate decals",
      "Removable magnets",
      "Fleet consistency across vehicles",
    ],
  },
];

/** Online channels. Mirrors the LMM card on the LEU homepage. */
export const digitalServices: MarketingService[] = [
  {
    id: "seo",
    title: "SEO & Local Search",
    description:
      "Getting found by people who are already looking for what you sell, in the area you actually serve.",
    items: [
      "Google Business Profile setup and management",
      "Local map rankings",
      "On-site SEO",
      "Local keyword targeting",
      "Listing consistency",
    ],
  },
  {
    id: "paid-ads",
    title: "Paid Ad Management",
    description:
      "Targeted advertising campaigns designed to generate qualified leads, increase conversions, and maximize performance.",
    items: [
      "Google Ads",
      "Facebook and Instagram ads",
      "Audience and geographic targeting",
      "Ad creative",
      "Budget management",
      "Performance reporting",
    ],
  },
  {
    id: "social",
    title: "Social Media Marketing",
    description:
      "Strategic content and audience engagement that strengthen your brand, build trust, and turn attention into opportunity.",
    items: [
      "Content planning and posting",
      "Page setup and management",
      "Audience engagement",
      "Community growth",
      "Profile optimization",
    ],
  },
  {
    id: "content",
    title: "Content Creation",
    description:
      "Creative that communicates your value, strengthens your brand, and captures attention instead of blending in.",
    items: [
      "Photo and video content",
      "Graphics and ad creative",
      "Written copy",
      "Campaign creative sets",
    ],
  },
  {
    id: "email",
    title: "Email Marketing & Reviews",
    description:
      "Staying in front of past customers, and turning satisfied ones into the reviews that convince the next person to call.",
    items: [
      "Email campaigns and newsletters",
      "Follow-up and nurture sequences",
      "Review generation",
      "Reputation monitoring",
      "Repeat-business campaigns",
    ],
  },
  {
    id: "branding",
    title: "Branding & Creative Direction",
    description:
      "One consistent look across every channel, so your signage, mailers, and social presence read as the same business.",
    items: [
      "Logo and brand development",
      "Color and typography systems",
      "Brand guidelines",
      "Consistency across print and digital",
    ],
  },
];
