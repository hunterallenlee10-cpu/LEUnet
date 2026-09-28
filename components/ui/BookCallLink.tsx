import Link from "next/link";
import clsx from "clsx";
import { bookHref, bookLabel, isExternalHref } from "@/data/site";

/**
 * Every "Book a free call" on the site. One component so the label and the
 * destination can only ever be the ones in data/site.ts: the booking page
 * once `bookingUrl` is set, the contact form with Lee Systems Co. picked until
 * then.
 *
 * Styled as the brass Lee Systems button by default, since booking a call is
 * Lee Systems Co.'s action wherever it appears; `variant="secondary"` is the
 * outlined version for a section whose primary action is something else.
 */
export function BookCallLink({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const classes = clsx(
    variant === "primary" ? "btn-ls-primary" : "btn-ls-secondary",
    "inline-flex min-h-11 items-center justify-center text-center",
    className
  );

  if (isExternalHref(bookHref)) {
    return (
      <a href={bookHref} className={classes}>
        {bookLabel}
      </a>
    );
  }

  return (
    <Link href={bookHref} className={classes}>
      {bookLabel}
    </Link>
  );
}
