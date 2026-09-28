import Link from "next/link";
import clsx from "clsx";
import { bookHref, bookLabel, bookLabelHero, isExternalHref } from "@/data/site";

/**
 * Every "Book a free call" on the site. One component so the label and the
 * destination can only ever be the ones in data/site.ts: the booking page
 * once `bookingUrl` is set, the contact form with Lee Systems Co. picked until
 * then.
 *
 * Styled as the brass Lee Systems button by default, since booking a call is
 * Lee Systems Co.'s action wherever it appears; `variant="secondary"` is the
 * outlined version for a section whose primary action is something else, and
 * `variant="hero"` is the homepage hero's large gold button, which also
 * carries the hero's longer wording (`bookLabelHero`).
 */
export function BookCallLink({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: "primary" | "secondary" | "hero";
}) {
  const label = variant === "hero" ? bookLabelHero : bookLabel;
  const classes = clsx(
    {
      primary: "btn-ls-primary",
      secondary: "btn-ls-secondary",
      hero: "btn-hero",
    }[variant],
    "inline-flex min-h-11 items-center justify-center text-center",
    className
  );

  if (isExternalHref(bookHref)) {
    return (
      <a href={bookHref} className={classes}>
        {label}
      </a>
    );
  }

  return (
    <Link href={bookHref} className={classes}>
      {label}
    </Link>
  );
}
