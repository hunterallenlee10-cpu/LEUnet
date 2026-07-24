import { Venture } from "@/types";
import { VENTURE_COLORS } from "@/lib/colors";

export const ventures: Venture[] = [
  {
    id: "lmm",
    name: "Lee Marketing Mastery",
    tagline: "Done-For-You Marketing That Drives Real Results",
    logo: "/logos/lmm-logo.png",
    logoAlt: "Lee Marketing Mastery logo",
    description:
      "Full-service marketing solutions to help you attract, convert, and retain more customers. We specialize in strategic marketing, content creation, paid advertising, and comprehensive reporting.",
    ctaPrimary: "Book a Free Strategy Call",
    ctaSecondary: "View Our Services",
    heroSubtitle: "Grow Your Brand. Master Your Market.",
    heroDescription:
      "Done-For-You Marketing That Drives Leads, Builds Trust, and Scales Businesses.",
    colors: VENTURE_COLORS.lmm,
  },
  {
    id: "pelican",
    name: "Pelican Power Wash",
    tagline: "Professional Exterior Cleaning That Gets Results",
    logo: "/logos/pelican-logo.png",
    logoAlt: "Pelican Power Wash mascot and logo",
    description:
      "Professional power washing and exterior cleaning for residential and commercial properties. We deliver stunning results that protect your investment and enhance curb appeal.",
    ctaPrimary: "Get a Free Quote",
    ctaSecondary: "View Services",
    heroSubtitle: "Make Your Property Shine. Power Washing That Gets Results.",
    heroDescription:
      "Professional exterior cleaning for homes and businesses. We use high-quality equipment and proven techniques to deliver a deep, safe clean that enhances curb appeal and protects your investment.",
    colors: VENTURE_COLORS.pelican,
  },
  {
    id: "h1",
    name: "H1 Performance",
    tagline: "Elite Training. Proven Results.",
    logo: "/logos/h1-logo.png",
    logoAlt: "H1 Performance logo",
    description:
      "Elite athletic training programs designed to help athletes build strength, increase power, and reach their full potential with expert coaching and proven training methods.",
    ctaPrimary: "Book a Consultation",
    ctaSecondary: "View Programs",
    heroSubtitle: "Train Harder. Perform Higher.",
    heroDescription:
      "Elite Training. Proven Results. H1 Performance helps athletes build strength, increase power, and reach their full potential.",
    colors: VENTURE_COLORS.h1,
  },
  {
    id: "thread",
    name: "Thread T-Shirts",
    tagline: "Premium Casual Wear Designed for Everyday Excellence",
    logo: "/logos/thread-logo.png",
    logoAlt: "Thread T-Shirts logo",
    description:
      "Stylish, comfortable t-shirts crafted with high-grade fabrics for lasting durability and style. Designed for those who expect more from their everyday wear.",
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
