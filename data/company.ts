/**
 * The site's own origin, no trailing slash. Canonical links, share cards,
 * structured data and Stripe's return URLs are all built from it, so it is the
 * one place to change if the primary domain ever moves (to the www host, say).
 */
export const SITE_URL = "https://leeenterprisesunlimited.com";

export const companyInfo = {
  name: "Lee Enterprises Unlimited",
  /**
   * `tagline` and `description` render nowhere today. Both counted and named
   * Thread T-Shirts' apparel until Thread came off this site on 2026-09-25
   * (docs/THREAD.md); they now describe the program and the venture the site
   * actually leads to, so whoever wires them up is not handed stale copy.
   */
  tagline: "Empowering Excellence in Business and Marketing",
  description:
    "Lee Enterprises Unlimited is a holding company dedicated to building and scaling exceptional ventures in business development and marketing. Each venture is designed to deliver premium value and results.",
  heroTitle: "Lee Enterprises Unlimited",
  /**
   * Renders in three places, not just the homepage hero: the /partners and
   * /support pages both use it as the strapline under their H1.
   */
  heroSubtitle: "Mastery that makes you better. Systems that make you money.",
  /**
   * Homepage hero only - unlike `heroSubtitle` above, /partners and /support
   * take that line without this one, so this can address a visitor who has
   * not yet said what they need.
   */
  heroDescription:
    "Business Mastery gives you the personal help, step by step demonstrations, and network to grow your business. Lee Systems builds the systems that bring revenue straight into your account.",
  logo: "/logos/leu-logo.webp",
  logoAlt: "Lee Enterprises Unlimited logo",
  /**
   * The LEU monogram without the name lettered under it, for the header,
   * where the full name is set as text right beside it. 204x160.
   */
  mark: "/logos/leu-mark.webp",
  contactEmail: "ceo@leeenterprisesunlimited.com",
  website: "leeenterprisesunlimited.com",
};

/**
 * The homepage section that puts the two ventures side by side
 * (components/sections/VenturesSection.tsx): the heading over the pair, and
 * the label at the top of each panel.
 *
 * The heading renders as `{start}, or {end}.`, and its two phrases are the two
 * panels in order - `start` is Business Mastery on the left, `end` is Lee
 * Systems Co. on the right - each set in that panel's accent. Keep them in that
 * order, and keep them close in length: from 1024px up the heading is one
 * line, and two phrases of about the same length are what put its "or" over
 * the seam between the panels.
 */
export const venturesHome = {
  eyebrow: "Two ways to work with LEU",
  title: {
    start: "Learn to build it",
    end: "have it built for you",
  },
  labels: {
    businessMastery: "Learn it yourself",
    leeSystems: "Done for you",
  },
} as const;

/**
 * Nothing renders this today; it is kept as the copy a final CTA would use.
 * The list of interests used to read "marketing services, property cleaning,
 * athletic training, or premium apparel". Athletic training left with H1
 * Performance (docs/H1.md), premium apparel with Thread T-Shirts
 * (docs/THREAD.md), and property cleaning named a venture this site has never
 * had - unrendered copy drifts, which is why all three are cut here rather than
 * left for whoever wires this up.
 */
export const ctaContent = {
  final: {
    title: "Ready to Get Started?",
    description:
      "Whether you're interested in Business Mastery or marketing services, we're here to help.",
    buttonText: "Contact Us Today",
  },
};

export const footerContent = {
  copyright: `© ${new Date().getFullYear()} Lee Enterprises Unlimited. All rights reserved.`,
  links: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
  ],
};

export const privacyPolicyContent = {
  title: "Privacy Policy",
  sections: [
    {
      heading: "Introduction",
      content:
        "Lee Enterprises Unlimited is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.",
    },
    {
      heading: "Information We Collect",
      content:
        "We may collect information about you in a variety of ways. The information we may collect on the site includes your name, email address, phone number, and any other information you voluntarily provide through our contact forms.",
    },
    {
      heading: "Use of Your Information",
      content:
        "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to respond to your inquiries, process your requests, and send you marketing communications if you have opted in.",
    },
    {
      heading: "Disclosure of Your Information",
      content:
        "We do not sell, trade, or rent your personal information to third parties. We may disclose your information when we believe disclosure is in your best interest to comply with the law.",
    },
  ],
};

export const termsOfServiceContent = {
  title: "Terms of Service",
  sections: [
    {
      heading: "Agreement to Terms",
      content:
        "By accessing and using this website, you accept and agree to be bound by and comply with these terms and conditions.",
    },
    {
      heading: "Intellectual Property Rights",
      content:
        "Unless otherwise stated, Lee Enterprises Unlimited and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this for your personal use subject to restrictions set in these terms and conditions.",
    },
    {
      heading: "User Responsibilities",
      content:
        "You warrant and represent that your use of the site will be consistent with these Terms and will not violate any applicable law or regulation, nor will it infringe the rights of any third party.",
    },
    {
      heading: "Limitation of Liability",
      content:
        "In no event shall Lee Enterprises Unlimited, nor any of its officers, directors and employees, be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website for any indirect, special or consequential loss, or for any business losses, loss of revenue or income.",
    },
  ],
};
