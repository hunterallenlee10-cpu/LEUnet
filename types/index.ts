export interface Venture {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  logoAlt: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  colors: VentureColors;
  heroSubtitle: string;
  heroDescription: string;
}

export interface VentureColors {
  primary: string;
  accent: string;
  dark: string;
  light: string;
  text: string;
  textMuted: string;
  border: string;
  glassBg: string;
  glassOpacity: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface VentureService extends Service {
  ventureId: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  description: string;
  ventureId: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  imageAlt: string;
  bio: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  ventureOfInterest: string;
  preferredContactMethod: "email" | "phone";
  projectDescription: string;
  budgetRange: string;
  desiredTimeline: string;
  howHeardAboutUs: string;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
  featured?: boolean;
}

export interface SharedValue {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}
