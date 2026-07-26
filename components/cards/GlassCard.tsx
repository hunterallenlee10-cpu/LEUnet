import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glassOpacity?: string;
  borderColor?: string;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glassOpacity = "bg-white/8",
  borderColor = "border-white/10",
  onClick,
}: GlassCardProps) {
  // Determine hover border color based on initial border color
  const getHoverBorderColor = () => {
    if (borderColor.includes("amber")) return "hover:border-amber-300";
    return "hover:border-white/20";
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "backdrop-blur-md rounded-lg border transition-all duration-300",
        glassOpacity,
        borderColor,
        hover && `${getHoverBorderColor()} hover:backdrop-blur-lg hover:bg-white/15`,
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface GlassCardPaddingProps extends Omit<GlassCardProps, "children"> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export function GlassCardPadded({
  children,
  size = "md",
  ...props
}: GlassCardPaddingProps) {
  const paddingClass = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }[size];

  return (
    <GlassCard className={paddingClass} {...props}>
      {children}
    </GlassCard>
  );
}
