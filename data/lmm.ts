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
 * The manifesto is the owner's track record: the same claim published as
 * `bmProofStatement` in data/business-mastery.ts, recast as three fragments so
 * it carries as a headline. The figures are the owner's own, supplied
 * 2026-09-13 (hard numbers, replacing the word-quantities confirmed
 * 2026-08-25), and a figure change touches `bmProofStatement`,
 * `bmProofPoints` and this line in the same edit or the site states two
 * different track records at once. Nothing in the repo can check it. Like
 * `bmHero.scarcityLine` it is a claim about the owner's own history and stays
 * true only as long as that is true. Note also that `bmProofStatement` is
 * Business Mastery's line; stating it here attributes the same record to this
 * venture, at the owner's request.
 *
 * `subtitle` and `description` are ONE sentence split at its colon, not the
 * two whole sentences the sibling teaser puts in those fields. The component
 * renders them as `subtitle + " " + description` inside a single paragraph, so
 * the split is invisible - it exists only because these two fields are the
 * shape this section shares with BusinessMasterySection. Keep the halves
 * joinable by exactly one space.
 *
 * THIS DELIBERATELY NO LONGER MATCHES THE HUB. These fields used to quote
 * HubHeroSection's opening paragraph verbatim; that paragraph still carries
 * the old "three different jobs" wording, so the teaser and the page it links
 * to now open on different claims. That divergence was reviewed and kept: the
 * owner asked for the teaser to change and for the hub to stay as it is. The
 * teaser sells the track record, the hub explains the structure of the work.
 * Do not "fix" this by reverting the teaser or by rewriting the hub - either
 * one undoes a decision, not an oversight.
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
    "50+ businesses built. 1,000+ worked with. $150,000+ generated for our clients.",
  subtitle: "That's what's behind every project we take on:",
  description: "marketing, websites, and business automation, done for you.",
  assuranceLine: "Scoped & Quoted Per Project",
  cta: "See What We Do",
} as const;
