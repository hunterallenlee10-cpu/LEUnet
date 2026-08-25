import { VentureColors } from "@/types";

export const LEU_COLORS = {
  primary: "#D4AF37",
  accent: "#F4D03F",
  dark: "#0F0F0F",
  light: "#FFFFFF",
  text: "#FFFFFF",
  textMuted: "#B0B0B0",
  border: "#3A3A3A",
  glassBg: "rgba(255, 255, 255, 0.08)",
  glassOpacity: "0.08",
} as const;

export const VENTURE_COLORS: Record<string, VentureColors> = {
  lmm: {
    primary: "#FFC107", // Bright gold/yellow from reference
    accent: "#FF9800", // Orange
    dark: "#1A1A1A",
    light: "#FFFFFF",
    text: "#FFFFFF",
    textMuted: "#B0B0B0",
    border: "#2A2A2A",
    glassBg: "rgba(255, 193, 7, 0.08)",
    glassOpacity: "0.08",
  },
  h1: {
    primary: "#FFD700", // Gold/yellow
    accent: "#FFC107", // Bright gold
    dark: "#0A0A0A",
    light: "#FFFFFF",
    text: "#FFFFFF",
    textMuted: "#B0B0B0",
    border: "#2A2A2A",
    glassBg: "rgba(255, 215, 0, 0.08)",
    glassOpacity: "0.08",
  },
  thread: {
    primary: "#D4AF37", // Gold (luxury)
    accent: "#F4D03F", // Lighter gold
    dark: "#1A1A1A",
    light: "#FFFFFF",
    text: "#FFFFFF",
    textMuted: "#B0B0B0",
    border: "#3A3A3A",
    glassBg: "rgba(212, 175, 55, 0.08)",
    glassOpacity: "0.08",
  },
};

export const VENTURES_BY_ID = {
  lmm: "lmm",
  h1: "h1",
  thread: "thread",
} as const;

export function getVentureColors(ventureId: string): VentureColors {
  return VENTURE_COLORS[ventureId as keyof typeof VENTURE_COLORS] || LEU_COLORS;
}

export function getTailwindColorClass(
  ventureId: string,
  intensity: "primary" | "accent" | "dark" | "light" = "primary"
): string {
  const colorMap: Record<string, Record<string, string>> = {
    lmm: {
      primary: "from-amber-400 to-amber-500",
      accent: "from-orange-400 to-orange-500",
      dark: "bg-neutral-950",
      light: "bg-white",
    },
    h1: {
      primary: "from-yellow-400 to-yellow-500",
      accent: "from-amber-400 to-amber-500",
      dark: "bg-neutral-950",
      light: "bg-white",
    },
    thread: {
      primary: "from-yellow-500 to-amber-500",
      accent: "from-yellow-400 to-amber-400",
      dark: "bg-neutral-950",
      light: "bg-white",
    },
  };

  return colorMap[ventureId]?.[intensity] || colorMap.thread.primary;
}
