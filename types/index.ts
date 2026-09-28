export interface Venture {
  id: string;
  name: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
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

// ---------------------------------------------------------------------------
// LEU Business Mastery (/business-mastery)
//
// Content lives in data/business-mastery.ts. The page carries the owner's own
// copy largely verbatim — see docs/BUSINESS-MASTERY.md before editing any of
// it, especially the figures.
// ---------------------------------------------------------------------------

/** One of the three stages of entrepreneur the program is built for. */
export interface BmAudience {
  id: string;
  title: string;
  description: string;
}

/** One of the three core tenets. `number` is the display number, zero-padded
 * by the component ("01" from 1). */
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
  /** Orders the chapters and names them for assistive tech; not displayed. */
  number: number;
  title: string;
}
