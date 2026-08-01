/**
 * Thread T-Shirts — page content and placeholder catalog.
 *
 * EVERYTHING customer-facing on /thread-t-shirts lives here. Replacing the
 * placeholder catalog with real inventory should never require touching a
 * component: swap the objects below and the page follows.
 *
 * Placeholder status (as of the pre-launch build):
 *
 *  - Every product carries `priceCents: null`, which renders as
 *    THREAD_PRICE_LABEL ("Price coming soon"). Set a real integer number of
 *    CENTS to show a price. Do not store dollars — `lib/money.ts` formats
 *    minor units, and mixing the two silently shows $0.45 for a $45 shirt.
 *  - Every `image` points at a generated SVG in /public/thread/. They are
 *    deliberately obvious placeholders. Drop a real photo in /public/thread/
 *    and repoint the product's `image` — one product at a time is fine.
 *  - Product names, copy, and fabric specs are written to be plausible, not
 *    contractual. Confirm the fabric weights before any of this is advertised.
 *
 * Interfaces live in types/index.ts, matching how every other domain object in
 * this repo is typed.
 */

import type {
  ThreadCategory,
  ThreadColorOption,
  ThreadFaq,
  ThreadProcessStep,
  ThreadProduct,
  ThreadQualityPillar,
  ThreadSize,
  ThreadUseCase,
} from "@/types";

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

/**
 * Thread's palette, deliberately scoped to this page.
 *
 * `VENTURE_COLORS.thread` in lib/colors.ts is byte-identical to the parent
 * LEU gold, which gives Thread no identity of its own. Rather than edit that
 * shared token — which would restyle the Thread block on the homepage as a
 * side effect — the apparel page uses this palette and leaves lib/colors.ts
 * alone.
 *
 * The logic: bone as the primary action color with near-black text is the
 * standard premium-apparel signature, and champagne keeps Thread visibly
 * related to the LEU gold without repeating it.
 */
export const THREAD_PALETTE = {
  /** Primary. Buttons, headline accents. Pair with `ink` text. */
  bone: "#EDE7DA",
  /** Secondary. Category labels, hovers, hairline accents. */
  champagne: "#C2A878",
  /** Deepest background. */
  ink: "#0B0B0B",
  /** Card and alternating section background. */
  charcoal: "#141414",
  /** Warm-tinted border, distinct from the site's neutral-800. */
  border: "#2A2724",
  /** Secondary body copy. */
  muted: "#8A8378",
  glassBg: "rgba(237, 231, 218, 0.06)",
} as const;

// ---------------------------------------------------------------------------
// Ordering constants
// ---------------------------------------------------------------------------

/** Shown wherever a price would go until real pricing lands. */
export const THREAD_PRICE_LABEL = "Price coming soon";

/** Minimum pieces on any custom-printed order. Ready-made stock has none. */
export const THREAD_CUSTOM_MIN_QUANTITY = 5;

/** Typical production time. Confirmed by the owner; keep copy consistent. */
export const THREAD_TURNAROUND = "about one week";

/** Thread is pre-launch: the page takes requests, it does not sell. */
export const THREAD_IS_PRELAUNCH = true;

/** Every order request routes to the address the rest of the site uses. */
export const THREAD_CONTACT_EMAIL = "ceo@leeenterprisesunlimited.com";

export const THREAD_SIZES: ThreadSize[] = [
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "2xl", label: "2XL" },
  { id: "3xl", label: "3XL" },
];

/**
 * Garment colorways. `hex` drives the swatch dot in the product card, so it
 * should approximate the real fabric — it is decoration, not a spec.
 */
export const THREAD_COLORS: Record<string, ThreadColorOption> = {
  black: { id: "black", name: "Black", hex: "#111111" },
  bone: { id: "bone", name: "Bone", hex: "#EDE7DA" },
  white: { id: "white", name: "White", hex: "#FFFFFF" },
  heather: { id: "heather", name: "Heather Grey", hex: "#9A9A96" },
  navy: { id: "navy", name: "Navy", hex: "#1E2A3A" },
  forest: { id: "forest", name: "Forest", hex: "#2A3B2F" },
  sand: { id: "sand", name: "Sand", hex: "#C9BBA2" },
  burgundy: { id: "burgundy", name: "Burgundy", hex: "#4A2028" },
  charcoal: { id: "charcoal", name: "Charcoal", hex: "#3A3A38" },
  royal: { id: "royal", name: "Royal", hex: "#1E3A8A" },
};

const ALL_SIZES = ["s", "m", "l", "xl", "2xl", "3xl"];

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const threadCategories: ThreadCategory[] = [
  {
    id: "tees",
    name: "Signature Tees",
    blurb:
      "The foundation of the line. Combed cotton, clean necklines, and a fit that holds its shape past the first wash.",
    image: "/thread/tee.svg",
  },
  {
    id: "hoodies",
    name: "Hoodies & Pullovers",
    blurb:
      "Brushed interiors and structured hoods built for daily wear, not a single season.",
    image: "/thread/hoodie.svg",
  },
  {
    id: "long-sleeve",
    name: "Long Sleeve",
    blurb:
      "Layering pieces that work on their own — waffle knits, henleys, and everyday crews.",
    image: "/thread/long-sleeve.svg",
  },
  {
    id: "performance",
    name: "Performance",
    blurb:
      "Moisture-wicking, breathable fabrics for training, practice, and long days outdoors.",
    image: "/thread/performance.svg",
  },
  {
    id: "business",
    name: "Business Apparel",
    blurb:
      "Polos, button-downs, and quarter-zips that carry a logo without looking like a uniform.",
    image: "/thread/business.svg",
  },
  {
    id: "event",
    name: "Event Shirts",
    blurb:
      "Volunteer, staff, and fundraiser shirts turned around on an event timeline.",
    image: "/thread/event.svg",
  },
  {
    id: "custom",
    name: "Custom Design Packages",
    blurb:
      "Bring artwork or start from nothing — design, proofing, and production handled together.",
    image: "/thread/custom.svg",
  },
];

// ---------------------------------------------------------------------------
// Catalog — 24 placeholder products, three per category
// ---------------------------------------------------------------------------

export const threadProducts: ThreadProduct[] = [
  // --- Signature Tees -----------------------------------------------------
  {
    id: "tee-core",
    name: "The Core Tee",
    categoryId: "tees",
    tagline: "The one you reach for first",
    description:
      "A midweight combed cotton crew with a ribbed collar that keeps its shape. Cut straight through the body so it layers cleanly and wears well on its own.",
    fabric: "5.3 oz combed ringspun cotton",
    fit: "Classic straight fit",
    details: [
      "Ribbed crew neck with shoulder-to-shoulder taping",
      "Side-seamed body to prevent twisting in the wash",
      "Pre-shrunk — expect true-to-size after laundering",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/tee.svg",
    imageAlt: "The Core Tee — placeholder product image",
    colors: ["black", "bone", "white", "heather", "navy"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: true,
    customizable: true,
  },
  {
    id: "tee-heavyweight",
    name: "The Heavyweight Tee",
    categoryId: "tees",
    tagline: "Structured, boxy, built to last",
    description:
      "A heavier cotton with real body to it. Sits square across the shoulders with a slightly cropped, boxy length that holds its line instead of draping.",
    fabric: "6.5 oz heavyweight cotton",
    fit: "Boxy relaxed fit",
    details: [
      "Wide ribbed collar with reinforced stitching",
      "Drop shoulder seam",
      "Holds structure through repeated washing",
      "Machine wash cold, hang dry recommended",
    ],
    image: "/thread/tee.svg",
    imageAlt: "The Heavyweight Tee — placeholder product image",
    colors: ["black", "bone", "sand", "forest", "charcoal"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: true,
    customizable: true,
  },
  {
    id: "tee-pocket",
    name: "The Pocket Tee",
    categoryId: "tees",
    tagline: "Quiet detail, everyday cut",
    description:
      "The Core Tee with a clean chest pocket and a slightly relaxed body. The detail that makes a plain shirt look considered.",
    fabric: "5.3 oz combed ringspun cotton",
    fit: "Relaxed fit",
    details: [
      "Set-in chest pocket with matched grain",
      "Ribbed crew neck",
      "Side-seamed body",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/tee.svg",
    imageAlt: "The Pocket Tee — placeholder product image",
    colors: ["black", "heather", "navy", "sand"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: true,
  },

  // --- Hoodies & Pullovers ------------------------------------------------
  {
    id: "hoodie-classic",
    name: "The Classic Hoodie",
    categoryId: "hoodies",
    tagline: "Midweight, all-season pullover",
    description:
      "A brushed-fleece pullover that works from early fall through spring. Structured hood, deep front pocket, and ribbing that recovers instead of stretching out.",
    fabric: "8.5 oz cotton-poly brushed fleece",
    fit: "Regular fit",
    details: [
      "Double-lined hood with flat drawcords",
      "Split kangaroo pocket",
      "Ribbed cuffs and hem with spandex for recovery",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/hoodie.svg",
    imageAlt: "The Classic Hoodie — placeholder product image",
    colors: ["black", "heather", "navy", "forest"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: true,
    customizable: true,
  },
  {
    id: "hoodie-heavy",
    name: "The Heavyweight Hoodie",
    categoryId: "hoodies",
    tagline: "Cold-weather weight",
    description:
      "A dense brushed fleece with a substantial hand feel. Heavier through the body and hood, cut with enough room to layer underneath.",
    fabric: "12 oz brushed fleece",
    fit: "Oversized fit",
    details: [
      "Three-panel lined hood",
      "Reinforced pocket bartacks",
      "Extended ribbed cuffs",
      "Machine wash cold, hang dry recommended",
    ],
    image: "/thread/hoodie.svg",
    imageAlt: "The Heavyweight Hoodie — placeholder product image",
    colors: ["black", "bone", "charcoal", "burgundy"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: true,
  },
  {
    id: "crew-fleece",
    name: "The Fleece Crewneck",
    categoryId: "hoodies",
    tagline: "Hoodie warmth, cleaner line",
    description:
      "Same fleece as the Classic Hoodie without the hood — the better option when a design needs an uninterrupted chest or back.",
    fabric: "8.5 oz cotton-poly brushed fleece",
    fit: "Regular fit",
    details: [
      "Ribbed collar, cuffs, and hem",
      "Full front and back print area",
      "Set-in sleeves",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/hoodie.svg",
    imageAlt: "The Fleece Crewneck — placeholder product image",
    colors: ["black", "bone", "heather", "navy", "sand"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: true,
  },

  // --- Long Sleeve --------------------------------------------------------
  {
    id: "ls-core",
    name: "The Core Long Sleeve",
    categoryId: "long-sleeve",
    tagline: "The Core Tee, extended",
    description:
      "The same combed cotton and straight body as the Core Tee with full-length sleeves and ribbed cuffs. Prints well on the sleeve as well as the chest.",
    fabric: "5.3 oz combed ringspun cotton",
    fit: "Classic straight fit",
    details: [
      "Ribbed crew neck and cuffs",
      "Sleeve print area available",
      "Side-seamed body",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/long-sleeve.svg",
    imageAlt: "The Core Long Sleeve — placeholder product image",
    colors: ["black", "bone", "white", "heather", "navy"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: true,
    customizable: true,
  },
  {
    id: "ls-thermal",
    name: "The Thermal Waffle",
    categoryId: "long-sleeve",
    tagline: "Texture with insulation",
    description:
      "A waffle-knit thermal that traps warmth without bulk. Wears as a standalone piece or as a base layer under fleece.",
    fabric: "6 oz cotton-blend waffle knit",
    fit: "Slim fit",
    details: [
      "Waffle-knit body and sleeves",
      "Reinforced neckline",
      "Slim through the body and arm",
      "Machine wash cold, hang dry recommended",
    ],
    image: "/thread/long-sleeve.svg",
    imageAlt: "The Thermal Waffle — placeholder product image",
    colors: ["black", "sand", "forest", "burgundy"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: false,
  },
  {
    id: "ls-henley",
    name: "The Henley",
    categoryId: "long-sleeve",
    tagline: "Collarless, three-button placket",
    description:
      "A cleaner alternative to a crew when a collar is too much. Three-button placket in matched thread, cut close but not tight.",
    fabric: "5.8 oz slub cotton",
    fit: "Tailored fit",
    details: [
      "Three-button placket with tonal buttons",
      "Slub texture reads as intentional, not flawed",
      "Ribbed cuffs",
      "Machine wash cold, hang dry recommended",
    ],
    image: "/thread/long-sleeve.svg",
    imageAlt: "The Henley — placeholder product image",
    colors: ["bone", "charcoal", "navy", "sand"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: false,
  },

  // --- Performance --------------------------------------------------------
  {
    id: "perf-tee",
    name: "The Performance Tee",
    categoryId: "performance",
    tagline: "Moisture-wicking, training-ready",
    description:
      "A lightweight technical knit that moves sweat off the skin and dries fast. Built for practice, lifting, and long days on your feet.",
    fabric: "4 oz recycled polyester interlock",
    fit: "Athletic fit",
    details: [
      "Moisture-wicking finish",
      "Four-way stretch",
      "Flatlock seams to reduce chafing",
      "Machine wash cold, tumble dry low, no fabric softener",
    ],
    image: "/thread/performance.svg",
    imageAlt: "The Performance Tee — placeholder product image",
    colors: ["black", "white", "charcoal", "royal", "navy"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: true,
    customizable: true,
  },
  {
    id: "perf-ls",
    name: "The Performance Long Sleeve",
    categoryId: "performance",
    tagline: "Sun coverage without the weight",
    description:
      "Full-coverage technical long sleeve for outdoor work and warm-weather training. Same wicking knit as the Performance Tee with extended sleeves.",
    fabric: "4 oz recycled polyester interlock",
    fit: "Athletic fit",
    details: [
      "Moisture-wicking finish",
      "Extended sleeve coverage",
      "Flatlock seams",
      "Machine wash cold, tumble dry low, no fabric softener",
    ],
    image: "/thread/performance.svg",
    imageAlt: "The Performance Long Sleeve — placeholder product image",
    colors: ["black", "white", "charcoal", "navy"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: true,
  },
  {
    id: "perf-tank",
    name: "The Training Tank",
    categoryId: "performance",
    tagline: "Full range of motion",
    description:
      "A cut-away tank with a dropped armhole for unrestricted overhead movement. Light enough to layer under a hoodie between sets.",
    fabric: "4 oz polyester-spandex blend",
    fit: "Athletic fit",
    details: [
      "Dropped armhole",
      "Moisture-wicking finish",
      "Ribbed neckline",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/performance.svg",
    imageAlt: "The Training Tank — placeholder product image",
    colors: ["black", "white", "charcoal"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: true,
  },

  // --- Business Apparel ---------------------------------------------------
  {
    id: "biz-polo",
    name: "The Corporate Polo",
    categoryId: "business",
    tagline: "Logo-ready, not uniform-looking",
    description:
      "A structured piqué polo with a collar that stays flat through a workday. The default choice for staff apparel that still reads as clothing.",
    fabric: "6 oz cotton-poly piqué",
    fit: "Regular fit",
    details: [
      "Three-button placket with flat collar stays",
      "Left-chest embroidery or print area",
      "Side vents at the hem",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/business.svg",
    imageAlt: "The Corporate Polo — placeholder product image",
    colors: ["black", "white", "navy", "charcoal", "forest"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: true,
    customizable: true,
  },
  {
    id: "biz-oxford",
    name: "The Oxford Button-Down",
    categoryId: "business",
    tagline: "For client-facing teams",
    description:
      "A woven oxford that holds a press and takes left-chest embroidery cleanly. The step up when a polo is too casual for the room.",
    fabric: "Cotton-blend oxford weave",
    fit: "Tailored fit",
    details: [
      "Button-down collar",
      "Adjustable single-button cuff",
      "Embroidery recommended over screen print",
      "Machine wash cold, hang dry and press",
    ],
    image: "/thread/business.svg",
    imageAlt: "The Oxford Button-Down — placeholder product image",
    colors: ["white", "bone", "navy", "charcoal"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: true,
  },
  {
    id: "biz-quarterzip",
    name: "The Quarter-Zip",
    categoryId: "business",
    tagline: "Layer that carries a logo well",
    description:
      "A smooth-face knit quarter-zip that layers over a polo or button-down. Reads professional in an office and holds up on a job site.",
    fabric: "9 oz smooth-face performance knit",
    fit: "Regular fit",
    details: [
      "Quarter-length zip with chin guard",
      "Left-chest embroidery area",
      "Ribbed cuffs and hem",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/business.svg",
    imageAlt: "The Quarter-Zip — placeholder product image",
    colors: ["black", "charcoal", "navy", "heather"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: true,
  },

  // --- Event Shirts -------------------------------------------------------
  {
    id: "event-tee",
    name: "The Event Tee",
    categoryId: "event",
    tagline: "Built for a date on the calendar",
    description:
      "A cost-effective cotton tee for events where quantity matters. Full-front print area sized for a date, logo, and sponsor row.",
    fabric: "5 oz cotton",
    fit: "Classic straight fit",
    details: [
      "Full-front and full-back print areas",
      "Sponsor placement on sleeves available",
      "Scales cleanly to large quantities",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/event.svg",
    imageAlt: "The Event Tee — placeholder product image",
    colors: ["black", "white", "bone", "royal", "burgundy", "forest"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: true,
    customizable: true,
  },
  {
    id: "event-staff",
    name: "The Staff Shirt",
    categoryId: "event",
    tagline: "Visible from across a room",
    description:
      "High-contrast staff and volunteer shirts with a large back panel so attendees can spot help from a distance.",
    fabric: "5.3 oz combed ringspun cotton",
    fit: "Classic straight fit",
    details: [
      "Oversized back print area",
      "Left-chest role label available",
      "High-visibility colorways",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/event.svg",
    imageAlt: "The Staff Shirt — placeholder product image",
    colors: ["black", "white", "royal", "burgundy"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: true,
  },
  {
    id: "event-fundraiser",
    name: "The Fundraiser Tee",
    categoryId: "event",
    tagline: "Priced to raise money",
    description:
      "Structured for fundraising runs where the margin is the point. Built around a simple one- or two-color design that keeps unit cost down.",
    fabric: "5 oz cotton",
    fit: "Classic straight fit",
    details: [
      "One- and two-color designs keep unit cost low",
      "Sponsor back panel available",
      "Quantity breaks quoted per campaign",
      "Machine wash cold, tumble dry low",
    ],
    image: "/thread/event.svg",
    imageAlt: "The Fundraiser Tee — placeholder product image",
    colors: ["black", "white", "bone", "navy", "burgundy"],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: true,
  },

  // --- Custom Design Packages ---------------------------------------------
  {
    id: "pkg-starter",
    name: "Starter Design Package",
    categoryId: "custom",
    tagline: "One design, one garment, done right",
    description:
      "For a first order with a clear idea. Thread handles the design work from your description, sends a proof, and prints once it is approved.",
    fabric: "Garment selected during the quote",
    fit: "Selected during the quote",
    details: [
      "One original design concept",
      "Two rounds of revisions",
      "Digital proof before anything is printed",
      "Print-ready files kept on file for reorders",
    ],
    image: "/thread/custom.svg",
    imageAlt: "Starter Design Package — placeholder product image",
    colors: [],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: true,
    customizable: true,
    isPackage: true,
    includes: [
      "Design consultation",
      "One original concept",
      "Two revision rounds",
      "Digital proof and approval",
    ],
  },
  {
    id: "pkg-brand",
    name: "Brand Identity Package",
    categoryId: "custom",
    tagline: "A full apparel look, not one shirt",
    description:
      "For businesses and organizations building a consistent look across several pieces. One design system applied to tees, hoodies, and business apparel together.",
    fabric: "Multiple garments selected during the quote",
    fit: "Selected per garment",
    details: [
      "Design system applied across multiple garment types",
      "Coordinated colorways across the run",
      "Placement mapped per garment",
      "Print-ready files kept on file for reorders",
    ],
    image: "/thread/custom.svg",
    imageAlt: "Brand Identity Package — placeholder product image",
    colors: [],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: true,
    customizable: true,
    isPackage: true,
    includes: [
      "Everything in the Starter Package",
      "Design applied across up to three garment types",
      "Coordinated color matching",
      "Placement guide for future reorders",
    ],
  },
  {
    id: "pkg-fullrun",
    name: "Full Production Run",
    categoryId: "custom",
    tagline: "Large orders, sorted and delivered",
    description:
      "For rosters, staff, and events ordering at volume. Sizes collected and sorted per person, then packed so distribution is not your problem.",
    fabric: "Multiple garments selected during the quote",
    fit: "Selected per garment",
    details: [
      "Size collection and per-person sorting",
      "Individual names and numbers where needed",
      "Packed for distribution on arrival",
      "Reorder pricing held for the season",
    ],
    image: "/thread/custom.svg",
    imageAlt: "Full Production Run — placeholder product image",
    colors: [],
    sizes: ALL_SIZES,
    priceCents: null,
    featured: false,
    customizable: true,
    isPackage: true,
    includes: [
      "Everything in the Brand Identity Package",
      "Size collection and sorting",
      "Names and numbers per piece",
      "Packed and labeled for distribution",
    ],
  },
];

// ---------------------------------------------------------------------------
// Section copy
//
// Headings and intros live here rather than inline in components so the whole
// page reads — and edits — from one file.
// ---------------------------------------------------------------------------

export const threadCopy = {
  hero: {
    badge: "Launching Soon",
    title: "Wear Your Style.",
    titleAccent: "Elevate Everyday Essentials.",
    description:
      "Thread is two things at once: an original apparel label, and a custom print service for anyone who needs their idea on a shirt. Premium blanks, careful prints, and a fit you can order for a whole team without guessing.",
    primaryCta: "Browse the Collection",
    secondaryCta: "Start a Custom Order",
    note: "Pricing is being finalized. Requests are open now — no payment required.",
  },
  story: {
    eyebrow: "Two Ways to Work With Thread",
    title: "A Label and a Print Shop",
    lead: "Most apparel companies do one or the other. Thread does both, and they make each other better — the same standards that go into the original line go into every custom order.",
    paths: [
      {
        id: "shop",
        title: "Shop the Collection",
        description:
          "Original Thread pieces designed around fabric that holds up and a fit that stays consistent from tee to hoodie. Ready to wear, nothing to design.",
        cta: "Browse the Collection",
        href: "#catalog",
      },
      {
        id: "custom",
        title: "Order Custom Apparel",
        description:
          "Your logo, your design, your roster. For businesses, teams, schools, events, organizations, fundraisers, or one idea you want to see printed.",
        cta: "Start a Custom Order",
        href: "#order-request",
      },
    ],
  },
  quality: {
    eyebrow: "Why Thread",
    title: "Built to Outlast the First Wash",
    description:
      "Apparel is easy to make cheaply and hard to make well. These are the four things Thread refuses to compromise on.",
  },
  featured: {
    eyebrow: "Featured",
    title: "Start Here",
    description:
      "The pieces most orders are built around, across every category Thread produces.",
  },
  categories: {
    eyebrow: "Categories",
    title: "Find Your Piece",
    description:
      "Eight categories covering everyday wear, performance, business apparel, and full custom production.",
  },
  catalog: {
    eyebrow: "The Collection",
    title: "Every Piece Thread Makes",
    description:
      "Pick your colors, sizes, and quantities, then send the whole thing over as one request. Nothing is charged and nothing is committed.",
    allLabel: "All Products",
  },
  useCases: {
    eyebrow: "Custom Apparel",
    title: "Who Thread Prints For",
    description:
      "If it needs a logo, a roster, a date, or an idea on the front of it, Thread has printed something like it.",
  },
  process: {
    eyebrow: "The Process",
    title: "How an Order Works",
    description:
      "Five steps from first message to a box at your door. Nothing prints until you have seen it and approved it.",
  },
  faq: {
    eyebrow: "Questions",
    title: "Answers Before You Ask",
    description:
      "The things people want to know before sending a request. If yours is not here, ask in the form.",
  },
  order: {
    eyebrow: "Order Request",
    title: "Send Your Order Request",
    description:
      "Review what you picked, tell Thread how to reach you, and send it over. This takes no payment and no card details — you will get a written quote to approve first.",
  },
  finalCta: {
    title: "Have an Idea? Send It Over.",
    description:
      "Whether you know exactly what you want or have nothing but a rough concept, the fastest way to find out what it costs is to ask.",
    primaryCta: "Start Your Order",
    secondaryCta: "Browse the Collection",
  },
};

// ---------------------------------------------------------------------------
// Supporting content
// ---------------------------------------------------------------------------

export const threadQualityPillars: ThreadQualityPillar[] = [
  {
    id: "fabric",
    title: "Fabric That Holds Up",
    description:
      "Combed and ringspun cotton, pre-shrunk before it is cut. The shirt you get back from the third wash should still be the shirt you ordered.",
  },
  {
    id: "print",
    title: "Prints That Stay Put",
    description:
      "Designs are cured properly so they flex with the fabric instead of cracking off it. No peeling edges after a season of wear.",
  },
  {
    id: "fit",
    title: "Fit You Can Predict",
    description:
      "Consistent sizing from S through 3XL, so ordering for a team means every person gets the fit they picked.",
  },
  {
    id: "proof",
    title: "Nothing Prints Unapproved",
    description:
      "Every custom order gets a digital proof first. Production does not start until you have signed off on exactly what you are getting.",
  },
];

export const threadUseCases: ThreadUseCase[] = [
  {
    id: "business",
    title: "Businesses",
    description:
      "Staff apparel, branded polos, and uniforms that make a team look established without looking corporate.",
  },
  {
    id: "teams",
    title: "Teams & Clubs",
    description:
      "Jerseys, warm-ups, and shooters with names and numbers handled per player across the full roster.",
  },
  {
    id: "schools",
    title: "Schools",
    description:
      "Class shirts, club apparel, spirit wear, and staff gear produced on a school-year timeline.",
  },
  {
    id: "events",
    title: "Events",
    description:
      "Volunteer, staff, and attendee shirts turned around against a fixed date on the calendar.",
  },
  {
    id: "organizations",
    title: "Organizations",
    description:
      "Member apparel and branded pieces that keep a consistent look across chapters and locations.",
  },
  {
    id: "fundraisers",
    title: "Fundraisers",
    description:
      "Campaign shirts structured so the margin actually funds the cause behind them.",
  },
  {
    id: "personal",
    title: "Personal Projects",
    description:
      "One idea, a small run, and a design team to get it from a sentence to a finished shirt.",
  },
  {
    id: "reorders",
    title: "Reorders",
    description:
      "Approved artwork stays on file, so a second run matches the first without starting over.",
  },
];

export const threadProcessSteps: ThreadProcessStep[] = [
  {
    id: "request",
    step: 1,
    title: "Send the Request",
    description:
      "Pick your pieces, sizes, and colors, then submit the request with what you have in mind. No payment is taken at this stage.",
  },
  {
    id: "reply",
    step: 2,
    title: "We Reply Within One Business Day",
    description:
      "Thread follows up to confirm quantities, garment choices, and artwork, and to answer anything the form did not cover.",
  },
  {
    id: "proof",
    step: 3,
    title: "Design & Digital Proof",
    description:
      "Send your artwork or have Thread design it. Either way you get a digital proof and a written quote before anything is printed.",
  },
  {
    id: "approve",
    step: 4,
    title: "You Approve, Then We Print",
    description:
      "Production starts only after you sign off on the proof and the quote. Nothing is printed on a guess.",
  },
  {
    id: "deliver",
    step: 5,
    title: "Production & Shipping",
    description: `Most orders are produced in ${THREAD_TURNAROUND} and shipped to you, sorted and packed by size.`,
  },
];

export const threadFaqs: ThreadFaq[] = [
  {
    id: "minimum",
    question: "Is there a minimum order?",
    answer: `Custom-printed orders start at ${THREAD_CUSTOM_MIN_QUANTITY} pieces. That is low enough for a small team, a family, or a first test run before committing to a larger order.`,
  },
  {
    id: "turnaround",
    question: "How long does an order take?",
    answer: `Most orders are produced in ${THREAD_TURNAROUND} once artwork and quantities are approved. The clock starts at proof approval, not at the request — so getting artwork settled early is the fastest way to move a deadline up.`,
  },
  {
    id: "design",
    question: "What if I don't have a design?",
    answer:
      "Thread designs it for you. Come with a rough idea, a sketch, or nothing but a description, and you will get a concept back to react to. If you already have artwork, send it and Thread will prepare it for print.",
  },
  {
    id: "artwork",
    question: "How do I send my artwork?",
    answer:
      "Submit the order request first, and Thread will reply with an email address to send files to. Vector formats print best, but a high-resolution image works for most designs.",
  },
  {
    id: "printing",
    question: "Who actually prints the shirts?",
    answer:
      "Thread produces through a professional custom apparel supplier with commercial-grade equipment, which is what keeps quality consistent across a large run and reorders matching the original.",
  },
  {
    id: "shipping",
    question: "Do you ship?",
    answer:
      "Yes. Orders ship to you, sorted and packed by size. Shipping is quoted with the rest of the order so there is no surprise at the end.",
  },
  {
    id: "pricing",
    question: "Why aren't prices listed?",
    answer:
      "Thread is pre-launch and pricing is still being finalized. Apparel pricing also moves with garment, quantity, print colors, and placement, so a request gets you a real quote rather than a number that changes later.",
  },
  {
    id: "sizes",
    question: "What sizes are available?",
    answer:
      "S through 3XL across the line. Sizing stays consistent between styles, so a large in a tee matches a large in a hoodie.",
  },
  {
    id: "payment",
    question: "Am I paying anything by submitting this?",
    answer:
      "No. The request form takes no payment and no card details. It starts a conversation — you will get a written quote to approve before any money changes hands.",
  },
  {
    id: "reorder",
    question: "Can I reorder later?",
    answer:
      "Yes. Approved artwork stays on file, so a reorder matches the first run without redoing the design work.",
  },
];

export const threadGroupOrderInfo = {
  title: "Group & Bulk Orders",
  description:
    "Larger orders are quoted individually. Garment mix, print colors, placement count, and quantity all move the number, so a real conversation gets you a better price than a rate card would.",
  points: [
    "Sizes collected and sorted per person before delivery",
    "Names and numbers handled individually where you need them",
    "Consistent color matching across the full run",
    "Reorder pricing held so a second run matches the first",
  ],
  ctaLabel: "Contact Us for Group Pricing",
};

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export function getThreadProductById(id: string): ThreadProduct | undefined {
  return threadProducts.find((product) => product.id === id);
}

export function getThreadProductsByCategory(
  categoryId: string
): ThreadProduct[] {
  return threadProducts.filter((product) => product.categoryId === categoryId);
}

export function getFeaturedThreadProducts(): ThreadProduct[] {
  return threadProducts.filter((product) => product.featured);
}

export function getThreadCategoryById(
  id: string
): ThreadCategory | undefined {
  return threadCategories.find((category) => category.id === id);
}

/** Resolves a product's color IDs to full swatch objects, skipping unknowns. */
export function getThreadColors(colorIds: string[]): ThreadColorOption[] {
  return colorIds
    .map((id) => THREAD_COLORS[id])
    .filter((color): color is ThreadColorOption => Boolean(color));
}

/** Resolves a product's size IDs to labels, preserving THREAD_SIZES order. */
export function getThreadSizes(sizeIds: string[]): ThreadSize[] {
  return THREAD_SIZES.filter((size) => sizeIds.includes(size.id));
}

/**
 * Display price for a product. Returns THREAD_PRICE_LABEL while `priceCents`
 * is null, so setting a real price is the only change needed to show one.
 */
export function formatThreadPrice(product: ThreadProduct): string {
  if (product.priceCents === null) return THREAD_PRICE_LABEL;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: product.priceCents % 100 === 0 ? 0 : 2,
  }).format(product.priceCents / 100);
}
