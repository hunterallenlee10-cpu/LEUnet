import { FIELD_LIMITS } from "@/lib/validation";

/**
 * The general enquiry form's wording: labels, placeholders and select options.
 * components/sections/ContactSection.tsx renders it, and /api/contact reads
 * the options back to email each choice by its label. The form and the route
 * each validate the fields themselves, on the shared email, phone and length
 * rules in lib/validation.ts.
 */
export const contactFormFields = {
  fullName: {
    label: "Full Name",
    placeholder: "John Doe",
  },
  email: {
    label: "Email Address",
    placeholder: "john@example.com",
  },
  phone: {
    label: "Phone Number",
    placeholder: "(555) 000-0000",
  },
  preferredContactMethod: {
    label: "How would you prefer we contact you?",
    options: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
    ],
  },
  projectDescription: {
    label: "Tell us about your project or request",
    placeholder:
      "Describe what you're looking for and how we can help you achieve your goals...",
  },
  budgetRange: {
    label: "What's your budget range?",
    options: [
      { value: "", label: "Select a budget range..." },
      { value: "under-1k", label: "Under $1,000" },
      { value: "1k-5k", label: "$1,000 to $5,000" },
      { value: "5k-10k", label: "$5,000 to $10,000" },
      { value: "10k-25k", label: "$10,000 to $25,000" },
      { value: "25k-50k", label: "$25,000 to $50,000" },
      { value: "50k-plus", label: "$50,000+" },
      { value: "not-sure", label: "Not sure yet" },
    ],
  },
  desiredTimeline: {
    label: "What's your desired timeline?",
    options: [
      { value: "", label: "Select a timeline..." },
      { value: "asap", label: "ASAP / Within 1 week" },
      { value: "1-4-weeks", label: "1-4 weeks" },
      { value: "1-3-months", label: "1-3 months" },
      { value: "3-6-months", label: "3-6 months" },
      { value: "flexible", label: "Flexible / Open" },
    ],
  },
  /**
   * Free text rather than a select, at the owner's request.
   *
   * The seven options it replaced sorted every answer into a bucket the owner
   * already knew about, and the most useful answer - which friend, which post,
   * which event - only ever arrived as "Other". A visitor can now name it.
   *
   * `maxLength` is the same one-line cap as the form's other short fields. The
   * form shows its own message for it, and the API checks it again rather than
   * trusting the attribute.
   */
  howHeardAboutUs: {
    label: "How did you hear about us?",
    placeholder: "Google, Instagram, a friend...",
    validation: {
      maxLength: FIELD_LIMITS.short,
    },
  },
};

/**
 * Resolves a select field's stored value to the label the visitor actually
 * picked.
 *
 * The form stores option values ("5k-10k", "1-3-months") and the API emailed
 * those verbatim, so an inquiry landed in the owner's inbox reading "Budget
 * Range: 5k-10k" - they had to translate their own form to read it.
 *
 * Falls back to the raw value rather than an empty string: an option retired
 * from the list still has old submissions referring to it, and a code is more
 * use than a blank line.
 */
export function optionLabel(
  options: readonly { value: string; label: string }[],
  value: string | undefined
): string {
  const trimmed = value?.trim();
  if (!trimmed) return "Not provided";
  return options.find((option) => option.value === trimmed)?.label ?? trimmed;
}
