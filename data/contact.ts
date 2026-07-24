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
    options: [
      { value: "", label: "Select a venture or service..." },
      { value: "lmm", label: "Lee Marketing Mastery" },
      { value: "pelican", label: "Pelican Power Wash" },
      { value: "h1", label: "H1 Performance" },
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
  howHeardAboutUs: {
    id: "howHeardAboutUs",
    label: "How did you hear about us?",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select an option..." },
      { value: "search-engine", label: "Search Engine (Google, etc.)" },
      { value: "social-media", label: "Social Media" },
      { value: "referral", label: "Referral from Friend or Family" },
      { value: "business-referral", label: "Business Referral" },
      { value: "advertisement", label: "Online Advertisement" },
      { value: "event", label: "Event or Networking" },
      { value: "other", label: "Other" },
    ],
  },
};

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
