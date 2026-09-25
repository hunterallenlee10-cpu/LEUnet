export const ventureServices = {
  lmm: [
    {
      /**
       * This entry used to sell the build itself - how fast it shipped and
       * what it was made with. That framing put the offer up against tools a
       * prospect could run alone and left price and speed as the only things
       * to argue about, so it was rewritten around what the finished site
       * does for the owner. The title matches the pill in `LmmSiblingLinks`
       * and the card in `MarketingRelatedSection`, the same way "Business
       * Automation" below is shared across all three; see docs/CROSS-LINKS.md
       * for why those names are kept in step. Nothing here claims a result we
       * cannot show a visitor, which is the standing rule for this repo.
       */
      id: "lmm-websites",
      title: "Websites That Convert",
      description:
        "Business websites built around one job: turning a visitor into a customer. Outcome-led copy, a focused page for each offer, and one obvious next step on every screen.",
      icon: "💻",
    },
    {
      id: "lmm-seo",
      title: "Business Automation",
      description:
        "Custom automation systems that streamline operations, save time, improve follow-up, and create scalable revenue opportunities.",
      icon: "⚙️",
    },
    {
      id: "lmm-paid",
      title: "Paid Ad Management",
      description:
        "Targeted advertising campaigns designed to generate qualified leads, increase conversions, and maximize performance.",
      icon: "📊",
    },
    {
      id: "lmm-content",
      title: "Content Creation",
      description:
        "Scroll-stoping creative content that communicates your value, strengthens your brand, and captures attention.",
      icon: "✍️",
    },
    {
      id: "lmm-email",
      title: "Lead Nurturing Systems",
      description:
        "Strategic follow-up campaigns designed to build trust, improve conversions, and encourage repeat business.",
      icon: "🌱",
    },
    {
      /**
       * This is the catch-all card for work that does not fit one of the five
       * named offerings above. It was titled "Custom Growth Solutions" and used
       * "solutions" as a noun twice in two sentences, which is the jargon
       * register the rest of this file has been moved away from - it describes
       * nothing a buyer can picture. The rewrite names the actual kinds of work
       * instead, and says how they are priced. Keep it concrete.
       */
      id: "lmm-analytics",
      title: "Custom Growth Projects",
      description:
        "Work that does not fit a standard package: lead-generation systems, a new website, branding, automation - scoped around what the business needs and quoted per project.",
      icon: "📈",
    },
  ],
};

export const ventureValuesProps = {
  lmm: [
    {
      id: "lmm-results",
      title: "Results Driven",
      description:
        "We focus on what matters most—real revenue, real growth.",
    },
    {
      id: "lmm-strategy",
      title: "Strategy First",
      description:
        "Every campaign is built on a custom strategy tailored to your business and goals.",
    },
    {
      id: "lmm-dfy",
      title: "Done-For-You",
      description:
        "We handle everything from content to ads so you can focus on running your business.",
    },
    {
      id: "lmm-proven",
      title: "Proven Systems",
      description:
        "Our tested systems have delivered measurable growth across businesses of every size—from independent startups to nine-figure enterprises. Every strategy is built to scale, perform, and produce real results.",
    },
  ],
};
