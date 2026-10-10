import { Mail, Phone } from "lucide-react";
import clsx from "clsx";

import { site, telHref } from "@/data/site";

/**
 * The owner's phone and email, from data/site.ts, under every /pay page's
 * card: how a client asks a question before or after paying.
 */
export function PayContact({
  lead = "Questions?",
  className,
}: {
  lead?: string;
  className?: string;
}) {
  const linkClass =
    "inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-neutral-200 underline-offset-4 transition-colors hover:text-amber-300 hover:underline";

  return (
    <div className={clsx("text-center text-sm text-neutral-400", className)}>
      <p>{lead}</p>
      <div className="mt-1 flex flex-col items-center sm:flex-row sm:justify-center sm:gap-6">
        {site.phone && (
          <a href={telHref(site.phone)} className={linkClass}>
            <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />
            {site.phone}
          </a>
        )}
        <a href={`mailto:${site.email}`} className={linkClass}>
          <Mail className="h-4 w-4 text-amber-400" aria-hidden="true" />
          {site.email}
        </a>
      </div>
    </div>
  );
}
