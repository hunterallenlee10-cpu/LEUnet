import { serviceGroups, type ServiceSlug } from "@/data/services";

/**
 * The paths a contact-form link can carry in `?interest=`, e.g.
 * /contact?interest=free-call from every "Book a free call". The form has no
 * field for it since 2026-10-06; it passes the link's value along, and
 * /api/contact checks it against this list and puts its `subjectTag` at the
 * front of the email subject, "[General]" when there is none.
 */
export type ContactInterest = "free-call" | "lee-systems" | "something-else" | ServiceSlug;

/**
 * Since 2026-10-17 a link can also name one of the six service groups by its
 * slug (/contact?interest=ai-calls), which tags the email with the group:
 * "[LEU · AI Call Answering]".
 *
 * "lee-systems" was the free-call value until the owner retired the Lee
 * Systems Co. name (2026-10-17). Links already sent with it still work and
 * are tagged the same as "free-call".
 */
export const contactInterests: readonly {
  value: ContactInterest;
  label: string;
  subjectTag: string;
}[] = [
  { value: "free-call", label: "A free call (LEU services)", subjectTag: "LEU" },
  { value: "lee-systems", label: "A free call (LEU services)", subjectTag: "LEU" },
  ...serviceGroups.map(({ slug, name }) => ({
    value: slug,
    label: `LEU services: ${name}`,
    subjectTag: `LEU · ${name}`,
  })),
  { value: "something-else", label: "Something else", subjectTag: "General" },
];

export function isContactInterest(value: string): value is ContactInterest {
  return contactInterests.some((option) => option.value === value);
}
