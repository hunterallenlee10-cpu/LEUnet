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
  /**
   * Pages belonging to this item, shown as a dropdown under it. Carrying them
   * is what makes an entry a dropdown — there is no separate flag. The header
   * renders one level only.
   */
  subItems?: NavItem[];
}

export interface SharedValue {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
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

/** One of the three core tenets. `number` is the display number, zero-padded
 * by the component ("01" from 1), the same as `BmChapter` below. */
export interface BmTenet {
  id: string;
  number: number;
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
