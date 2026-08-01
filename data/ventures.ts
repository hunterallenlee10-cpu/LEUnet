import { Venture } from "@/types";
import { VENTURE_COLORS } from "@/lib/colors";

export const ventures: Venture[] = [
  {
    id: "lmm",
    name: "Lee Marketing Mastery",
    tagline: "Done-For-You Marketing That Drives Real Results",
    logo: "/lee-marketing-mastery-logo.png",
    logoAlt: "Lee Marketing Mastery logo",
    description:
      "Marketing, automation systems, and world-class websites built to generate leads, improve follow-up, increase conversions, and create long-term customer growth. From professional websites delivered at lightning speed, to content, paid advertising, automated workflows, advanced integrations, and performance reporting, every solution is designed to save time, strengthen your online presence, and produce measurable revenue growth.",
    ctaPrimary: "Book a Free Strategy Call",
    ctaSecondary: "View Our Services",
    heroSubtitle: "Grow Your Brand. Master Your Market.",
    heroDescription:
      "Done-For-You Marketing & Systems That Drives Leads, Builds Trust, and Scales Businesses.",
    colors: VENTURE_COLORS.lmm,
  },
  {
    id: "pelican",
    name: "Pelican Power Wash",
    tagline: "Professional Exterior Cleaning That Gets Results",
    logo: "/logos/pelican-logo.png",
    logoAlt: "Pelican Power Wash mascot and logo",
    description:
      "Pelican Power Wash delivers dependable residential and commercial exterior cleaning designed to restore curb appeal and protect your property. Using professional-grade equipment and surface-safe cleaning methods, we remove dirt, mold, mildew, and buildup with precision. From homes and driveways to decks, fences, and commercial properties, we provide reliable service and results you can feel confident about.",
    ctaPrimary: "Get a Free Quote",
    ctaSecondary: "View Services",
    heroSubtitle: "Make Your Property Shine. Power Washing That Gets Results.",
    heroDescription:
      "Professional exterior cleaning that safely removes buildup, restores your property's appearance, and delivers lasting curb appeal for residential and commercial clients.",
    colors: VENTURE_COLORS.pelican,
  },
  {
    id: "h1",
    name: "H1 Performance",
    tagline: "Elite Training. Proven Results.",
    logo: "/logos/h1-performance-white.png",
    logoAlt: "H1 Performance logo",
    description:
      "H1 Performance provides personalized athletic development designed to help athletes become stronger, faster, more explosive, and more confident in competition. Through expert coaching, structured training, nutrition guidance, recovery planning, and measurable performance tracking, every program is built around the athlete’s individual goals. Our mission is to develop complete athletes and produce results that translate from the gym directly to the field.",
    ctaPrimary: "Book a Consultation",
    ctaSecondary: "View Programs",
    heroSubtitle: "Train Harder. Perform Higher.",
    heroDescription:
      "Elite Training. Proven Results. H1 Performance delivers personalized athletic development designed to build strength, speed, power, and measurable performance on and off the field.",
    colors: VENTURE_COLORS.h1,
  },
  {
    id: "thread",
    name: "Thread T-Shirts",
    tagline: "Premium Casual Wear Designed for Everyday Excellence",
    logo: "/logos/thread-logo.png",
    logoAlt: "Thread T-Shirts logo",
    description:
      "Thread creates premium everyday apparel and custom designs for individuals, brands, teams, businesses, and events. Every piece is built around lasting comfort, dependable quality, and a clean style you can wear with confidence.",
    ctaPrimary: "Shop Collection",
    ctaSecondary: "View Styles",
    heroSubtitle: "Wear Your Style. Elevate Everyday Essentials.",
    heroDescription:
      "Stylish. Comfortable. Made to last. Thread T-Shirts are designed for those who expect more from their everyday wear.",
    colors: VENTURE_COLORS.thread,
  },
];

export function getVentureById(id: string): Venture | undefined {
  return ventures.find((venture) => venture.id === id);
}

export function getVentureByName(name: string): Venture | undefined {
  return ventures.find((venture) => venture.name.toLowerCase() === name.toLowerCase());
}
