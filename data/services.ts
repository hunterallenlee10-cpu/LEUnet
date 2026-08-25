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
  h1: [
    {
      id: "h1-strength",
      title: "Strength Training",
      description:
        "Build real strength and develop a solid foundation for peak performance.",
      icon: "💪",
    },
    {
      id: "h1-speed",
      title: "Speed & Agility",
      description:
        "Move faster, react quicker, and dominate your competition.",
      icon: "⚡",
    },
    {
      id: "h1-power",
      title: "Power & Explosiveness",
      description:
        "Increase power output and generate force in every movement.",
      icon: "🔥",
    },
    {
      id: "h1-recovery",
      title: "Recovery & Mobility",
      description:
        "Stay healthy, move well, and recover so you can keep performing.",
      icon: "♻️",
    },
    {
      id: "h1-hitting",
      title: "Diet & Growth Plan",
      description:
        "Structured nutrition and growth plans built to help athletes gain muscle mass, recover faster, and perform at their best.",
      icon: "🍎",
    },
    {
      id: "h1-programming",
      title: "Supplement Resources",
      description:
        "Research-backed supplement education and personalized planning designed to help athletes support performance, recovery, and nutrition with informed, responsible decisions.",
      icon: "🫙",
    },
  ],
  thread: [
    {
      id: "thread-quality",
      title: "Premium Quality",
      description:
        "High-quality fabrics selected for lasting comfort, durability, breathability, and everyday wear.",
      icon: "✨",
    },
    {
      id: "thread-support",
      title: "Support Small Business",
      description:
        "Every apparel purchase helps support the growth of our businesses, brands, and the vision behind Lee Enterprises Unlimited.",
      icon: "🤝",
    },
    {
      id: "thread-design",
      title: "Clean Design",
      description:
        "Timeless looks that keep your style sharp and effortless.",
      icon: "🎨",
    },
    {
      id: "thread-shipping",
      title: "Fast, Reliable Shipping",
      description:
        "Quick, dependable delivery that gets your order to you without unnecessary delays.",
      icon: "📦",
    },
    {
      id: "thread-custom",
      title: "Custom Designs",
      description:
        "Original apparel designs created for individuals, brands, teams, businesses, and special events.",
      icon: "✍️",
    },
    {
      id: "thread-personal",
      title: "Personalized Apparel",
      description:
        "Personalized apparel tailored to your vision, style, message, and intended audience. Contact us today to get started.",
      icon: "👕",
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
  h1: [
    {
      id: "h1-focused",
      title: "Athlete Focused",
      description:
        "Every program is built around your goals, your sport, and the areas you need most to improve.",
    },
    {
      id: "h1-driven",
      title: "Results-Driven",
      description:
        "We develop real strength, speed, power, and confidence that translate directly to performance.",
    },
    {
      id: "h1-expert",
      title: "Expert Coaching",
      description:
        "Train with knowledgeable coaches who push you, guide you, and help bring out your best.",
    },
    {
      id: "h1-results",
      title: "Proven Development",
      description:
        "Our athletes make measurable progress in the gym, in competition, and in their overall development.",
    },
  ],
  thread: [
    {
      id: "thread-fabric",
      title: "Premium Comfort",
      description:
        "Soft, breathable fabrics selected for all-day comfort and dependable everyday wear.",
    },
    {
      id: "thread-fit",
      title: "Perfect, Reliable Fit",
      description:
        "Thoughtfully designed sizing and cuts that provide a comfortable, confident fit.",
    },
    {
      id: "thread-craft",
      title: "Quality Craftsmanship",
      description:
        "Quality materials and careful construction designed to maintain their look, feel, and shape.",
    },
    {
      id: "thread-versatile",
      title: "Versatile Styles",
      description:
        "Clean, modern apparel made for everyday wear, special occasions, teams, brands, and events. ",
    },
  ],
};
