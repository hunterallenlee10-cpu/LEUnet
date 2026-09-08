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
  return (
    <div
      onClick={onClick}
      className={cn(
        "backdrop-blur-md rounded-lg border transition-all duration-300",
        glassOpacity,
        borderColor,
        hover && "hover:border-white/20 hover:backdrop-blur-lg",
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
  className,
  ...props
}: GlassCardPaddingProps) {
  const paddingClass = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }[size];

  /* `className` is merged with the size padding rather than spread over it.
     It used to arrive in `...props` AFTER `className={paddingClass}`, so any
     caller passing one silently lost the padding this component exists to
     apply — a card with `size="lg"` and a className rendered with none at all.
     Nothing passed one until now, which is why it never showed. `cn` is
     tailwind-merge, so a caller can still override the padding deliberately by
     naming its own. */
  return (
    <GlassCard className={cn(paddingClass, className)} {...props}>
      {children}
    </GlassCard>
  );
}
