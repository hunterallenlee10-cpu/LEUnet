"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LeeSystemsInquiryForm } from "@/components/lee-systems/LeeSystemsInquiryForm";
import { inquiryNeeds } from "@/data/services";

/**
 * The Lee Systems form with "What do you need?" picked from the link that
 * brought the visitor: ?service=<slug> (every demo's CTA and every service
 * page's "Book a free call") or ?interest=<slug>. Without either it starts on
 * `defaultNeed`, which a service page sets to its own group.
 *
 * Reading the query string needs `useSearchParams`, which on a prerendered
 * page has to sit inside a Suspense boundary. The fallback is the same form
 * on `defaultNeed`, so the prerendered HTML carries a complete, working form.
 */
export function LeeSystemsInquiryFormBlock({ defaultNeed = "" }: { defaultNeed?: string }) {
  return (
    <Suspense fallback={<LeeSystemsInquiryForm initialNeed={defaultNeed} />}>
      <FormFromQuery defaultNeed={defaultNeed} />
    </Suspense>
  );
}

function FormFromQuery({ defaultNeed }: { defaultNeed: string }) {
  const params = useSearchParams();
  const requested = params.get("service") ?? params.get("interest") ?? "";
  const initialNeed = inquiryNeeds.some(({ value }) => value === requested)
    ? requested
    : defaultNeed;

  // Keyed by the preselection, so a link to a different ?service= on the
  // same page starts the form on the new choice.
  return <LeeSystemsInquiryForm key={initialNeed} initialNeed={initialNeed} />;
}
