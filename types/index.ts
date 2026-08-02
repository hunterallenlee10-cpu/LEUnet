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

/** A published program result. Figures come from H1's own S&C document. */
export interface H1Result {
  id: string;
  /** The number itself, e.g. "+15 MPH". Rendered at display size. */
  figure: string;
  label: string;
  detail: string;
}

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
}

export interface H1Faq {
  id: string;
  question: string;
  answer: string;
}
