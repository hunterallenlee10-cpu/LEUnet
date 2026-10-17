/**
 * The paths a contact-form link can carry in `?interest=`, e.g.
 * /contact?interest=lee-systems from every "Book a free call". The form has no
 * field for it since 2026-10-06; it passes the link's value along, and
 * /api/contact checks it against this list and puts its `subjectTag` at the
 * front of the email subject, "[General]" when there is none.
 */
export const contactInterests = [
  { value: "lee-systems", label: "Lee Systems Co.", subjectTag: "Lee Systems Co." },
  { value: "something-else", label: "Something else", subjectTag: "General" },
] as const;

export type ContactInterest = (typeof contactInterests)[number]["value"];

export function isContactInterest(value: string): value is ContactInterest {
  return contactInterests.some((option) => option.value === value);
}
