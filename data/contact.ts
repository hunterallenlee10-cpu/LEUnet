export const contactFormFields = {
  fullName: {
    id: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    required: true,
    validation: {
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Z\s'-]+$/,
    },
  },
  email: {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  phone: {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "(555) 000-0000",
    required: true,
    validation: {
      pattern: /^[\d\s\-().+]+$/,
      minLength: 10,
    },
  },
  ventureOfInterest: {
    id: "ventureOfInterest",
    label: "Which venture or service are you contacting us about?",
    type: "select",
    required: true,
    /**
     * The site's three destinations, in the order the nav lists them, then a
     * catch-all. LEU Business Mastery was missing entirely: it is the flagship
     * program, with its own page, nav tab and homepage section, and anyone
     * contacting us about it had to file the inquiry under "Other".
     *
     * Deliberately coarse. Lee Marketing Mastery sells three separate
     * offerings, but each has its own form on its own page with its own
     * subject line; this is the general enquiry form, and splitting it here
     * would duplicate that routing without the context those pages give.
     */
    options: [
      { value: "", label: "Select a venture or service..." },
      { value: "business-mastery", label: "LEU Business Mastery" },
      { value: "lmm", label: "Lee Marketing Mastery" },
      { value: "thread", label: "Thread T-Shirts" },
      { value: "other", label: "Other / Lee Enterprises Inquiry" },
    ],
  },
  preferredContactMethod: {
    id: "preferredContactMethod",
    label: "How would you prefer we contact you?",
    type: "radio",
    required: true,
    options: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
    ],
  },
  projectDescription: {
    id: "projectDescription",
    label: "Tell us about your project or request",
    type: "textarea",
    placeholder:
      "Describe what you're looking for and how we can help you achieve your goals...",
    required: true,
    validation: {
      minLength: 10,
      maxLength: 2000,
    },
  },
  budgetRange: {
    id: "budgetRange",
    label: "What's your budget range?",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select a budget range..." },
      { value: "under-1k", label: "Under $1,000" },
      { value: "1k-5k", label: "$1,000 - $5,000" },
      { value: "5k-10k", label: "$5,000 - $10,000" },
      { value: "10k-25k", label: "$10,000 - $25,000" },
      { value: "25k-50k", label: "$25,000 - $50,000" },
      { value: "50k-plus", label: "$50,000+" },
      { value: "not-sure", label: "Not sure yet" },
    ],
  },
  desiredTimeline: {
    id: "desiredTimeline",
    label: "What's your desired timeline?",
    type: "select",
    required: true,
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
   * `maxLength` is enforced on both sides. A required free-text field is the
   * one place on this form where a visitor can put arbitrary length into an
   * email, so the API caps it too rather than trusting the attribute.
   */
  howHeardAboutUs: {
    id: "howHeardAboutUs",
    label: "How did you hear about us?",
    type: "text",
    placeholder: "Google, Instagram, a friend...",
    required: true,
    validation: {
      maxLength: 200,
    },
  },
};

/**
 * Resolves a select field's stored value to the label the visitor actually
 * picked.
 *
 * The form stores option values ("lmm", "5k-10k", "1-3-months") and the API
 * emailed those verbatim, so an inquiry landed in the owner's inbox reading
 * "Venture or Service: lmm" and "Budget Range: 5k-10k" - they had to translate
 * their own form to read it, and the subject line carried the same code.
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

export const contactEmail = "ceo@leeenterprisesunlimited.com";

export function buildMailtoLink(
  data: Record<string, string | string[]>
): string {
  const to = contactEmail;
  const subject = `Lee Enterprises Inquiry - ${data.ventureOfInterest}`;
  const body = `
Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Venture/Service: ${data.ventureOfInterest}
Preferred Contact: ${data.preferredContactMethod}
Budget Range: ${data.budgetRange}
Timeline: ${data.desiredTimeline}
How They Found Us: ${data.howHeardAboutUs}

Project/Request Description:
${data.projectDescription}
  `.trim();

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
