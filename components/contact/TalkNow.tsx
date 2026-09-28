import clsx from "clsx";
import { site, telHref } from "@/data/site";
import { BookCallLink } from "@/components/ui/BookCallLink";

/**
 * "Rather talk now? Connect with us." beside the contact form, on the homepage and /contact.
 *
 * The "Book a free call" button only appears here once a booking link is set
 * in data/site.ts. Until then that button leads to this same contact form, so
 * showing it next to the form would send people in a circle; the phone number
 * is the way to talk now instead.
 */
export function TalkNow({
  headingLevel = "h3",
  showEmail = false,
  className,
}: {
  headingLevel?: "h2" | "h3";
  showEmail?: boolean;
  className?: string;
}) {
  const Heading = headingLevel;
  const phoneLink = site.phone ? telHref(site.phone) : "";

  return (
    <div className={clsx("rounded-xl border border-white/10 p-6", className)}>
      <Heading className="text-lg font-semibold text-white">Rather talk now? Connect with us.</Heading>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {site.bookingUrl && <BookCallLink variant="secondary" />}
        {phoneLink &&
          (site.bookingUrl ? (
            <a
              href={phoneLink}
              className="inline-flex min-h-11 items-center font-semibold text-amber-400 underline-offset-4 hover:underline"
            >
              Call {site.phone}
            </a>
          ) : (
            <a
              href={phoneLink}
              className="btn-secondary inline-flex min-h-11 items-center justify-center"
            >
              Call {site.phone}
            </a>
          ))}
      </div>

      {showEmail && (
        <p className="mt-4 text-sm text-neutral-400">
          Or email{" "}
          <a
            href={`mailto:${site.email}`}
            className="break-all font-medium text-amber-400 underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
        </p>
      )}
    </div>
  );
}
