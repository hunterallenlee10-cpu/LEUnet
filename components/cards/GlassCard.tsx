import { ReactNode } from "react";
import clsx from "clsx";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glassOpacity?: string;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glassOpacity = "bg-white/[0.04]",
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-white/10 transition-colors duration-300",
        glassOpacity,
        hover && "hover:border-white/20",
        className
      )}
    >
      {children}
    </div>
  );
}

interface GlassCardPaddingProps extends Omit<GlassCardProps, "children"> {
  children: ReactNode;
  size: "sm" | "lg";
}

export function GlassCardPadded({
  children,
  size,
  className,
  ...props
}: GlassCardPaddingProps) {
  const paddingClass = {
    sm: "p-4",
    lg: "p-8",
  }[size];

  /* `className` is added alongside the size padding rather than spread over
     it, which would drop the padding. It is plain clsx, not tailwind-merge, so
     a padding class in it would conflict with the size's instead of replacing
     it - pick or add a `size` for different padding. */
  return (
    <GlassCard className={clsx(paddingClass, className)} {...props}>
      {children}
    </GlassCard>
  );
}
