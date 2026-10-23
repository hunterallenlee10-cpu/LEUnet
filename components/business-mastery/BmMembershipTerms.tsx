import {
  CalendarX,
  ChevronDown,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  bmTerms,
  bmTermsHeading,
  bmTermsNote,
  type BmTerm,
} from "@/data/business-mastery-terms";
import { companyInfo } from "@/data/company";

const icons: Record<BmTerm["id"], LucideIcon> = {
  billing: CreditCard,
  renewal: RefreshCw,
  cancellation: CalendarX,
  guarantee: ShieldCheck,
};

const linkClass =
  "font-medium text-amber-400 underline-offset-4 hover:underline";

/** The contact email inside a term's text, as a mailto link. */
function withEmailLink(text: string) {
  const email = companyInfo.contactEmail;
  const parts = text.split(email);
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a key={i} href={`mailto:${email}`} className={linkClass}>
            {email}
          </a>,
          part,
        ],
  );
}

/**
 * Billing, renewal, cancellation and the 90-day guarantee, one dropdown each,
 * in the member offer section under the price (the owner's request,
 * 2026-10-23). The wording is data/business-mastery-terms.ts, which /legal's
 * Terms of Service shows too. Native <details>, so it works with no JS.
 */
export function BmMembershipTerms() {
  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {bmTermsHeading}
      </h3>
      <div className="divide-y divide-neutral-800 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 light:bg-[#fff]">
        {bmTerms.map((term) => {
          const Icon = icons[term.id];
          return (
            <details key={term.id} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <Icon
                    className="h-6 w-6 shrink-0 text-amber-400"
                    aria-hidden="true"
                  />
                  <span className="text-base font-bold text-white sm:text-lg">
                    {term.heading}
                  </span>
                </span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="border-t border-neutral-800 p-5 text-left">
                <p className="leading-relaxed text-neutral-300">
                  {withEmailLink(term.body)}
                </p>
              </div>
            </details>
          );
        })}
      </div>
      <p className="mt-4 text-center text-sm leading-relaxed text-neutral-400">
        {bmTermsNote}{" "}
        <a href={`mailto:${companyInfo.contactEmail}`} className={linkClass}>
          {companyInfo.contactEmail}
        </a>
        .
      </p>
    </div>
  );
}
