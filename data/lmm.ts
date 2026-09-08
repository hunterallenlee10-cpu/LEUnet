/**
 * Shared Lee Marketing Mastery content.
 *
 * The FAQ list lives here rather than in the accordion component because the
 * page also renders it as FAQPage structured data. A "use client" module's
 * exports become client references on the server, so a server component cannot
 * read the array back out of one.
 */
export const lmmFaqs = [
  {
    question: "What is business automation?",
    answer:
      "Business automation uses connected software and structured workflows to complete repetitive tasks, organize information, trigger actions, and reduce the amount of manual work required from a team.",
  },
  {
    question: "Will the system be customized for my business?",
    answer:
      "Yes. The workflow is designed around your business's current process, tools, objectives, and operational needs.",
  },
  {
    question: "Do I need to replace my current software?",
    answer:
      "Not necessarily. Many automation systems can connect the tools a business already uses. The consultation determines which platforms can remain and where changes may be beneficial.",
  },
  {
    question: "What types of businesses can benefit from automation?",
    answer:
      "Small and medium-sized businesses with repetitive administrative work, inconsistent follow-up, disconnected information, manual lead research, or growing operational demands may benefit.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "The timeline depends on the complexity of the workflow, the number of integrations, the amount of data involved, and testing requirements. We scope it during the consultation rather than quoting a universal completion time.",
  },
  {
    question: "Can automation help generate leads?",
    answer:
      "A custom system can help identify, organize, enrich, qualify, and route potential business opportunities. It improves how consistently opportunities are handled; it does not guarantee sales.",
  },
  {
    question: "What happens during the consultation?",
    answer:
      "We review your current process, bottlenecks, goals, and existing tools, then discuss the potential value of building a custom system.",
  },
];

/**
 * The homepage teaser for Lee Marketing Mastery — the venture's counterpart to
 * `bmHero` in data/business-mastery.ts, which feeds the Business Mastery
 * teaser in the same slot on the same page.
 *
 * Every line here is the venture's existing words, not new claims: the
 * manifesto and description are HubHeroSection's own opening paragraph, split
 * at its first sentence, and `assuranceLine` is the note under that hero's
 * CTAs. The teaser's job is to say what the hub already says, in one screen,
 * and hand the visitor to the page that argues it properly.
 *
 * The slot `assuranceLine` occupies is where the Business Mastery teaser puts
 * `bmHero.scarcityLine` ("Enrollment Closing Soon"). It is deliberately NOT a
 * scarcity line here. Business Mastery has a real enrollment that really is
 * closing; this venture sells three services per project, with nothing to run
 * out of, so an urgency line in the same slot would be a claim nobody could
 * make true. What sits there instead is a fact about how the work is sold.
 */
export const lmmHomeTeaser = {
  eyebrow: "Lee Marketing Mastery",
  manifesto:
    "Getting attention, converting it, and following up are three different jobs.",
  subtitle: "Marketing, Websites & Business Automation.",
  description:
    "Lee Marketing Mastery does all three for owners who would rather have the work done than manage it. Take one, or take all three.",
  assuranceLine: "Scoped & Quoted Per Project",
  cta: "See What We Do",
} as const;
