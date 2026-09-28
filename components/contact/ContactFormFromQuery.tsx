"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm, type ContactFormProps } from "@/components/contact/ContactForm";
import { isContactInterest } from "@/data/contact";

/** ContactForm with its interest taken from `?interest=`. See ContactFormBlock. */
export function ContactFormFromQuery(props: Omit<ContactFormProps, "initialInterest">) {
  const requested = useSearchParams().get("interest") ?? "";
  const initialInterest = isContactInterest(requested) ? requested : "";

  // Keyed by the preselection, so following a link to a different
  // `?interest=` on the same page starts the form on the new choice instead
  // of keeping the old one.
  return <ContactForm key={initialInterest} {...props} initialInterest={initialInterest} />;
}
