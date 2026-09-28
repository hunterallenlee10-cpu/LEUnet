import clsx from "clsx";
import { Mail } from "lucide-react";
import { site, telHref } from "@/data/site";
import { BookCallLink } from "@/components/ui/BookCallLink";

/**
 * "Rather talk now? Connect with us." beside the contact form, on the homepage
 * and /contact: the call button, then Instagram and email, each a link.
 *
 * The "Book a free call" button only appears here once a booking link is set
 * in data/site.ts. Until then that button leads to this same contact form, so
 * showing it next to the form would send people in a circle; the phone number
 * is the way to talk now instead.
 */
export function TalkNow({
  headingLevel = "h3",
  className,
}: {
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  const phoneLink = site.phone ? telHref(site.phone) : "";
  const instagramHandle = site.instagramUrl
    ? `@${site.instagramUrl.replace(/\/+$/, "").split("/").pop()}`
    : "";

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

      <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
        {site.instagramUrl && (
          <li>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={rowClass}
            >
              <span className={iconClass}>
                <InstagramIcon />
              </span>
              <span className="min-w-0 break-all">{instagramHandle}</span>
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>
          </li>
        )}
        <li>
          <a href={`mailto:${site.email}`} className={rowClass}>
            <span className={iconClass}>
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 break-all">{site.email}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

const rowClass =
  "group inline-flex min-h-11 items-center gap-3 font-medium text-neutral-200 transition-colors hover:text-amber-400";

const iconClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-amber-400 transition-colors group-hover:border-amber-400/40";

/** lucide-react dropped its brand icons, so the Instagram glyph is drawn here
 *  in the same 24px, 2px-stroke style as the Mail icon beside it. */
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
