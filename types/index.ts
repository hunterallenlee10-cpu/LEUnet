export interface Venture {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  logoAlt: string;
  description: string;
  ctaPrimary: string;
  /**
   * Destination for the primary CTA. When set, the button becomes a link to
   * this route; when omitted it falls back to scrolling to the homepage
   * contact section.
   */
  ctaPrimaryHref?: string;
  ctaSecondary: string;
  colors: VentureColors;
  heroSubtitle: string;
  heroDescription: string;
}

export interface VentureColors {
  primary: string;
  accent: string;
  dark: string;
  light: string;
  text: string;
  textMuted: string;
  border: string;
  glassBg: string;
  glassOpacity: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface VentureService extends Service {
  ventureId: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  description: string;
  ventureId: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  imageAlt: string;
  bio: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  ventureOfInterest: string;
  preferredContactMethod: "email" | "phone";
  projectDescription: string;
  budgetRange: string;
  desiredTimeline: string;
  howHeardAboutUs: string;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
  featured?: boolean;
  /** Pages nested under this item, shown in a submenu one level deep. */
  subItems?: NavItem[];
}

export interface SharedValue {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Thread T-Shirts
//
// Content for these lives in data/thread.ts. Thread is pre-launch, so the
// catalog is placeholder inventory — see that file's header before editing.
// ---------------------------------------------------------------------------

export interface ThreadSize {
  id: string;
  label: string;
}

export interface ThreadColorOption {
  id: string;
  name: string;
  /** Approximate swatch color for the UI dot. Decoration, not a fabric spec. */
  hex: string;
}

export interface ThreadCategory {
  id: string;
  name: string;
  blurb: string;
  image: string;
}

export interface ThreadProduct {
  id: string;
  name: string;
  categoryId: string;
  tagline: string;
  description: string;
  fabric: string;
  fit: string;
  /** Spec bullets shown in the product detail panel. */
  details: string[];
  image: string;
  imageAlt: string;
  /**
   * The garment's other side, for pieces photographed from both. When set, the
   * catalog card becomes a two-view gallery — swipe, tap, arrow, or dot, with
   * mouse hover peeking at it as before. When omitted the card renders the one
   * photo and no controls.
   *
   * Reachable on every device now, so it can carry detail a buyer needs rather
   * than only a second look. `details` is still the place for anything that has
   * to be readable without looking at a photograph at all.
   */
  imageBack?: string;
  /** Alt text for `imageBack`. Required whenever that is set. */
  imageBackAlt?: string;
  /**
   * Which side `image` shows. Defaults to the front. Set to "back" for a piece
   * that leads with its reverse — the gallery names its views from this, and a
   * control labelled "Front" that shows the back is worse than no label.
   */
  imageSide?: "front" | "back";
  /** Keys into THREAD_COLORS. Empty for design packages, which have no garment. */
  colors: string[];
  /** Keys into THREAD_SIZES. */
  sizes: string[];
  /**
   * Price in CENTS, or null to render "Price coming soon". Never store dollars
   * here — the formatter divides by 100.
   */
  priceCents: number | null;
  featured: boolean;
  /** Whether custom artwork can be printed on this piece. */
  customizable: boolean;
  /** True for design services rather than a physical garment. */
  isPackage?: boolean;
  /** What a package covers. Only meaningful when `isPackage` is true. */
  includes?: string[];
  /**
   * Placeholder for a line that is not orderable yet. The card renders name and
   * a "Coming soon" line only — no colors, sizes, quantity, or request button,
   * since there is nothing to configure or add.
   */
  comingSoon?: boolean;
  /**
   * For an offer with nothing fixed to configure — the reader describes what
   * they want rather than picking from options. The whole card becomes a link
   * to the order request form, and the colour, size, and quantity controls are
   * not rendered, because there is nothing here to add to a request as a line
   * item.
   *
   * Mutually exclusive with `comingSoon`; the card checks this one first.
   */
  requestOnly?: boolean;
  /** Link text on a `requestOnly` card. Required for one to read sensibly. */
  ctaLabel?: string;
}

export interface ThreadQualityPillar {
  id: string;
  title: string;
  description: string;
}

export interface ThreadUseCase {
  id: string;
  title: string;
  description: string;
}

export interface ThreadProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface ThreadFaq {
  id: string;
  question: string;
  answer: string;
}

/** One configured line in the order-request cart. */
export interface ThreadCartItem {
  /** `${productId}:${colorId}:${sizeId}` — the variant identity. */
  key: string;
  productId: string;
  productName: string;
  colorId: string;
  colorName: string;
  sizeId: string;
  sizeLabel: string;
  quantity: number;
}

// ---------------------------------------------------------------------------
// H1 Performance (/h1-performance)
// ---------------------------------------------------------------------------

interface H1ProofBase {
  id: string;
  /** What was measured, e.g. "40-yard dash". */
  label: string;
  /** One athlete's result, or an average across athletes. */
  scope: "individual" | "average";
  /**
   * Who the result belongs to. Singular for an individual ("football player"),
   * plural for an average ("baseball players") — `proofAttribution()` composes
   * a sentence around this, so the number has to agree with `scope`.
   */
  subject: string;
  /** Timeframe. Set only when the client stated one, e.g. "two months". */
  period?: string;
}

/**
 * One measured result. The hero readout rotates these and the results strip
 * lists them, both from the same array in `data/h1.ts`.
 *
 * `scope` is the only place the individual/average distinction is stored. The
 * visible wording is composed from it by `proofAttribution()`, never written by
 * hand — two fields carrying the same fact can disagree, and on a page making
 * public performance claims that disagreement would be an average presented as
 * one athlete's result.
 *
 * A union rather than one interface with optional fields, because on this page
 * the type is the last guard between the data and a false public claim. Flat
 * optionals would let a pair missing `to` compile and render "5.1 → undefined",
 * and would make `precision` skippable — leaving a formatter to pick a default
 * number of decimal places, which is exactly the invented precision docs/H1.md
 * §3 forbids.
 */
export type H1ProofPoint =
  | (H1ProofBase & {
      /** Renders `from → to`, and the hero counts between the two. */
      kind: "pair";
      from: number;
      to: number;
      /** Decimal places. Required, and must match the client's published precision. */
      precision: number;
      /** Unit shown after the second figure, e.g. "lb". */
      unit?: string;
    })
  | (H1ProofBase & {
      /**
       * A single figure with no stated starting point, e.g. `+30%`. Rendered
       * verbatim wherever it is at rest. The hero readout counts it up from
       * zero — a meter filling, not a claimed baseline — reading both its
       * target and its decimal places straight out of this string, so nothing
       * stored elsewhere can disagree with what is on screen. docs/H1.md §3.
       */
      kind: "delta";
      figure: string;
    });

export interface H1ProgramFeature {
  id: string;
  title: string;
  description: string;
}

export interface H1Package {
  id: string;
  name: string;
  /**
   * Display string including the currency symbol, or null to render
   * "Pricing on request". Null is a real state, not a placeholder bug.
   */
  price: string | null;
  /** Billing period shown beside the price, e.g. "per month". */
  period: string;
  summary: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
}

export interface H1ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface H1Coach {
  id: string;
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  credentials: string[];
}

export interface H1Testimonial {
  id: string;
  quote: string;
  name: string;
  /** Sport, position, or class year — whatever identifies the athlete. */
  detail: string;
  /**
   * Optional athlete photo, under `public/h1/testimonials/`. One field rather
   * than `photo` + `photoAlt` so an image cannot ship without its alt text.
   * Cards render without one, so a mixed grid stays legal.
   */
  photo?: {
    src: string;
    alt: string;
  };
}

export interface H1Faq {
  id: string;
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// LEU Business Mastery (/business-mastery)
//
// Content lives in data/business-mastery.ts. The page carries the owner's own
// copy largely verbatim — see docs/BUSINESS-MASTERY.md before editing any of
// it, especially the figures.
// ---------------------------------------------------------------------------

/** One of the four kinds of people the program is built for. */
export interface BmAudience {
  id: string;
  title: string;
  description: string;
}

/** One rung of the "How to Build Your Own Empire" framework. */
export interface BmEmpireStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

/** One of the things membership actually includes. */
export interface BmPillar {
  id: string;
  title: string;
  description: string;
  /** Bullet list under the description, e.g. the Tools & Resources items. */
  items?: string[];
}

/** One chapter of the founder journey timeline. Bodies arrive with the story. */
export interface BmChapter {
  id: string;
  /** Display number, zero-padded by the component ("01" from 1). */
  number: number;
  title: string;
}

export interface BmApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  stage: string;
  building: string;
  why: string;
}
