/**
 * The field rules every form and its API route share. The browser checks them
 * so a visitor sees the problem before sending; the route checks them again
 * because a request can come from anywhere. Keeping both sides on this one file
 * is what stops the two from drifting apart - they used to be ten hand-copied
 * regexes.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s\-().+]+$/;

/**
 * A person's name: letters in any script (so "José" and "Nguyễn" pass), plus
 * the spaces, hyphens, apostrophes and periods real names use. No digits or
 * symbols, and it has to start with a letter.
 */
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}'’. -]*$/u;
/** Everything a name may not contain, for stripping it as the visitor types. */
const NAME_DISALLOWED = /[^\p{L}\p{M}'’. -]/gu;
/** Everything a phone number may not contain: letters and stray symbols. */
const PHONE_DISALLOWED = /[^\d\s\-().+]/g;

/**
 * Digits a phone number needs, not counting spaces and punctuation: a US
 * number with its area code at least, and E.164's ceiling of 15 at most.
 * Counting digits rather than characters is what stops "((((((((((" passing.
 */
const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 15;

/**
 * Longest value any field accepts. Generous on purpose - they exist to stop a
 * bot posting megabytes into the owner's inbox, not to cut a real visitor off
 * mid-sentence. Each form sets the same figure as its inputs' `maxLength`, so
 * nobody can type past what the route will take.
 */
export const FIELD_LIMITS = {
  /** Names, business names, websites, dropdown values and similar one-liners. */
  short: 200,
  /** RFC 5321's ceiling for an address. */
  email: 254,
  phone: 40,
  /** The open "tell us about it" boxes. */
  long: 10_000,
} as const;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

export function isValidPhone(value: string): boolean {
  if (!PHONE_PATTERN.test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS;
}

/** At least two letters, and nothing a name would not contain. */
export function isValidName(value: string): boolean {
  return (
    NAME_PATTERN.test(value) && value.replace(/[^\p{L}]/gu, "").length >= 2
  );
}

/** The fields `filterInput` knows how to clean. */
export type FilteredField = "name" | "phone";

const INPUT_FILTERS: Record<FilteredField, { drop: RegExp; message: string }> = {
  name: {
    drop: NAME_DISALLOWED,
    message: "Names can only use letters, spaces, hyphens and apostrophes",
  },
  phone: {
    drop: PHONE_DISALLOWED,
    message: "Phone numbers can only use digits, spaces and ( ) - + .",
  },
};

/**
 * The input filter. Each form runs a name or phone field's value through this
 * on every change, so a digit typed (or pasted) into a name, or a letter into
 * a phone number, never lands. `dropped` is what to tell the visitor when
 * something was taken out, so the key press does not just seem to do nothing.
 * The routes still check with the validators above.
 */
export function filterInput(
  field: FilteredField | null,
  value: string
): { value: string; dropped?: string } {
  if (!field) return { value };
  const { drop, message } = INPUT_FILTERS[field];
  const cleaned = value.replace(drop, "");
  return cleaned === value ? { value } : { value: cleaned, dropped: message };
}

/** What the forms and routes say when a name fails `isValidName`. */
export const INVALID_NAME_MESSAGE =
  "Please enter your name using letters only";
