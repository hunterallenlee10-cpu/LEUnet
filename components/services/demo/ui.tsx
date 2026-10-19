"use client";

import { useEffect, useState, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Small pieces the demos share: a segmented choice, text that types itself
 * out, a number that counts up, and the "Example" tag for a panel.
 */

/**
 * A row of mutually exclusive choices (industry, device, scenario), as
 * buttons with aria-pressed inside a labelled group.
 */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  wrap = true,
  className,
}: {
  label: string;
  options: readonly { value: T; label: string; icon?: ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  /** false keeps the choices on one line, for a row that scrolls sideways. */
  wrap?: boolean;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={clsx("flex gap-1.5", wrap ? "flex-wrap" : "shrink-0 flex-nowrap", className)}
    >
      {options.map((option) => {
        const pressed = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(option.value)}
            className={clsx(
              "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg border px-3 whitespace-nowrap text-[13px] font-semibold transition-colors motion-reduce:transition-none",
              pressed
                ? "border-brass-400 bg-brass-400/10 text-white"
                : "border-white/10 text-neutral-300 hover:border-white/25 hover:text-white"
            )}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Text that types itself out over `duration` ms while `play` is true, and
 * shows in full otherwise. Give it a `key` that changes when it should
 * start again (the step or run it belongs to).
 */
export function TypeText({
  text,
  play,
  duration = 1200,
  className,
}: {
  text: string;
  play: boolean;
  duration?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!play) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setShown(Math.round(progress * text.length));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play, text, duration]);

  const count = play ? shown : text.length;
  return (
    <span className={className}>
      {/* The full text for screen readers; the typing is for the eye. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {play && count < text.length && (
          <span className="ml-px inline-block h-[1em] w-px translate-y-[2px] bg-current opacity-70" />
        )}
      </span>
    </span>
  );
}

/** A number counting up to `to` over `duration` ms while `play` is true. */
export function CountUp({
  to,
  play,
  duration = 1200,
  format = (n: number) => n.toLocaleString("en-US"),
}: {
  to: number;
  play: boolean;
  duration?: number;
  format?: (n: number) => string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!play) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // Ease out, so it settles rather than stops.
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play, to, duration]);

  return <>{format(play ? value : to)}</>;
}

/** The small "Example" tag on a panel inside a demo. */
export function ExampleTag({ children = "Example" }: { children?: ReactNode }) {
  return (
    <span className="rounded border border-white/15 px-1.5 py-px text-[10px] font-semibold tracking-[0.14em] text-neutral-300 uppercase">
      {children}
    </span>
  );
}

/** A panel inside a demo: surface, hairline, small heading. */
export function Panel({
  title,
  tag,
  className,
  children,
}: {
  title?: ReactNode;
  tag?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-white/10 bg-white/[0.03] p-4 light:bg-[#f6f7f9]",
        className
      )}
    >
      {(title || tag) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && <p className="text-[13px] font-semibold text-white">{title}</p>}
          {tag}
        </div>
      )}
      {children}
    </div>
  );
}
