import Link from "next/link";
import clsx from "clsx";
import { bookHref, bookLabel, bookLabelHero, isExternalHref } from "@/data/site";

/**
 * Every "Book a free call" on the site. One component so the label and the
 * destination can only ever be the ones in data/site.ts: the booking page
 * once `bookingUrl` is set, the contact form with Lee Systems Co. picked until
 * then.
 *
 * The one exception is `href`, for a page that carries its own form:
 * /lee-systems passes `#contact-form`, so the buttons in its body scroll down
 * to the form instead of leaving the page. The label never changes.
 *
 * Styled as the brass Lee Systems button by default, since booking a call is
 * Lee Systems Co.'s action wherever it appears; `variant="secondary"` is the
 * outlined version for a section whose primary action is something else,
 * `variant="hero"` is the homepage hero's large gold button, which also
 * carries the hero's longer wording (`bookLabelHero`), and `variant="glow"`
 * is the lit gold button of the Lee Systems page's "Two paths" and "The
 * choice is yours" sections.
 */
export function BookCallLink({
  className,
  variant = "primary",
  href = bookHref,
}: {
  className?: string;
  variant?: "primary" | "secondary" | "hero" | "glow";
  /** An in-page anchor such as `#contact-form`. Omit it to use `bookHref`. */
  href?: string;
}) {
  const label = variant === "hero" ? bookLabelHero : bookLabel;
  const classes = clsx(
    {
      primary: "btn-ls-primary",
      secondary: "btn-ls-secondary",
      hero: "btn-hero",
      glow: "btn-ls-glow",
    }[variant],
    "inline-flex min-h-11 items-center justify-center text-center",
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
