/**
 * The choices on the shared contact form (components/contact/ContactForm.tsx,
 * on the homepage and /contact). /api/contact checks a posted interest
 * against this list and puts its `subjectTag` at the front of the email
 * subject, so the inbox shows which path each inquiry is about.
 *
 * `value` is also what `?interest=` in a link preselects, e.g.
 * /contact?interest=lee-systems.
 */
export const contactInterests = [
  { value: "lee-systems", label: "Lee Systems Co.", subjectTag: "Lee Systems Co." },
  { value: "business-mastery", label: "Business Mastery", subjectTag: "Business Mastery" },
  { value: "something-else", label: "Something else", subjectTag: "General" },
] as const;

export type ContactInterest = (typeof contactInterests)[number]["value"];

export function isContactInterest(value: string): value is ContactInterest {
  return contactInterests.some((option) => option.value === value);
}
