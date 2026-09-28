/**
 * The field rules every form and its API route share. The browser checks them
 * so a visitor sees the problem before sending; the route checks them again
 * because a request can come from anywhere. Keeping both sides on this one file
 * is what stops the two from drifting apart - they used to be ten hand-copied
 * regexes.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s\-().+]+$/;

/** Shortest phone number accepted, counting spaces and punctuation. */
const PHONE_MIN_LENGTH = 10;

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
  return PHONE_PATTERN.test(value) && value.length >= PHONE_MIN_LENGTH;
}
