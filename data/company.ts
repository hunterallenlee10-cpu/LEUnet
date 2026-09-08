export const companyInfo = {
  name: "Lee Enterprises Unlimited",
  tagline: "Empowering Excellence Across Two Distinct Ventures",
  description:
    "Lee Enterprises Unlimited is a holding company dedicated to building and scaling exceptional ventures across marketing and apparel. Each venture is designed to deliver premium value and results.",
  heroTitle: "Lee Enterprises Unlimited",
  heroSubtitle: "Multiple Ventures. Unified Excellence.",
  heroDescription:
    "Discover our portfolio of premium businesses, each dedicated to delivering exceptional results in their respective industries.",
  logo: "/logos/leu-logo.png",
  logoAlt: "Lee Enterprises Unlimited logo",
  contactEmail: "ceo@leeenterprisesunlimited.com",
  website: "leeenterprisesunlimited.com",
};

export const aboutSection = {
  title: "About Lee Enterprises Unlimited",
  /**
   * Was "Built on a Foundation of Excellence", which named one of the four
   * value cards below it and otherwise said nothing the mission does not say
   * better. This states the actual shape of the company instead.
   */
  subtitle: "One Vision, Several Businesses",
  /**
   * ONE statement, where the section used to carry two.
   *
   * There was an intro paragraph here (`description`) as well as a mission
   * hardcoded in AboutSection, and roughly two thirds of each was the other
   * one restated: both built lasting ventures, both delivered results (the
   * word landed three times between them), both offered to help someone launch
   * a venture of their own, and both closed by asking for contact - in a
   * section whose only button goes to Business Mastery rather than to Contact.
   * The mission also listed "innovation, integrity, and excellence", which is
   * the value cards directly above it, in prose.
   *
   * What survived is each block's one non-overlapping half: what the company
   * is, from the intro, and who it is for, from the mission. The closing ask
   * is gone from the copy entirely - the button under the card is the ask, and
   * it now goes unopposed rather than being the third one in the section.
   *
   * `heading` is the card's own title, separate because the card renders it as
   * an h3 above the statement.
   */
  mission: {
    heading: "Our Mission",
    statement:
      "Lee Enterprises Unlimited brings together a growing portfolio of specialized businesses under one vision: create value, deliver results that hold up, and build ventures designed to last. What ties them together is who they are for - people turning an idea into a business of their own, whether that means one of our services, a partnership, or a venture you start yourself.",
  },
  values: [
    {
      id: "excellence",
      title: "Excellence",
      description:
        "We pursue the highest standards in everything we do, from service delivery to product quality.",
    },
    {
      id: "integrity",
      title: "Integrity",
      description:
        "We operate with transparency, honesty, and accountability in all our business relationships.",
    },
    {
      id: "innovation",
      title: "Innovation",
      description:
        "We continuously seek better ways to serve our customers and solve their challenges.",
    },
    {
      id: "growth",
      title: "Growth",
      description:
        "We support the success and development of our clients, partners, and team members.",
    },
  ],
};

/**
 * Nothing renders this today; it is kept as the copy a final CTA would use.
 * The list of interests used to read "marketing services, property cleaning,
 * athletic training, or premium apparel". Athletic training left with H1
 * Performance (docs/H1.md), and property cleaning named a venture this site has
 * never had - unrendered copy drifts, which is why both are cut here rather
 * than left for whoever wires this up.
 */
export const ctaContent = {
  final: {
    title: "Ready to Get Started?",
    description:
      "Whether you're interested in marketing services or premium apparel, we're here to help.",
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
