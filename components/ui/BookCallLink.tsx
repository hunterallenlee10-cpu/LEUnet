import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { bookHref, bookLabel, bookLabelHero, isExternalHref } from "@/data/site";

/**
 * Every "Book a free call" on the site. One component so the label and the
 * destination can only ever be the ones in data/site.ts: the booking page
 * once `bookingUrl` is set, the contact form with LEU picked until
 * then.
 *
 * The one exception is `href`, for a page that carries its own form:
 * /how-it-works passes `#contact-form`, so the buttons in its body scroll down
 * to the form instead of leaving the page. The label never changes.
 *
 * Styled as the brass LEU button by default, since booking a call is
 * LEU's action wherever it appears; `variant="secondary"` is the
 * outlined version for a section whose primary action is something else,
 * `variant="hero"` is the homepage hero's large gold button, which also
 * carries the hero's longer wording (`bookLabelHero`), and `variant="glow"`
 * is the lit gold button of the How It Works page's hero, "Two paths" and
 * "The choice is yours" sections. `arrow` adds a trailing arrow that steps
 * forward on hover, for a button that stands alone.
 */
export function BookCallLink({
  className,
  variant = "primary",
  href = bookHref,
  arrow = false,
}: {
  className?: string;
  variant?: "primary" | "secondary" | "hero" | "glow";
  /** An in-page anchor such as `#contact-form`. Omit it to use `bookHref`. */
  href?: string;
  arrow?: boolean;
}) {
  const text = variant === "hero" ? bookLabelHero : bookLabel;
  const label = arrow ? (
    <>
      {text}
      <ArrowRight
        className="h-5 w-5 shrink-0 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
        aria-hidden="true"
      />
    </>
  ) : (
    text
  );
  const classes = clsx(
    {
      primary: "btn-ls-primary",
      secondary: "btn-ls-secondary",
      hero: "btn-hero",
      glow: "btn-ls-glow",
    }[variant],
    "inline-flex min-h-11 items-center justify-center text-center",
    arrow && "group gap-2.5",
    className
  );

  // A plain link for an in-page anchor, as for any other in-page link on the
  // site, so the scroll is the smooth one SmoothScroll gives every anchor.
  if (isExternalHref(href) || href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
