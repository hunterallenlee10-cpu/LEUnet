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
