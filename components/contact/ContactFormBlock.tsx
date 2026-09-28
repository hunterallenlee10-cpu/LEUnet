import { Suspense } from "react";
import { ContactForm, type ContactFormProps } from "@/components/contact/ContactForm";
import { ContactFormFromQuery } from "@/components/contact/ContactFormFromQuery";

/**
 * The contact form with "I'm interested in" preselected from the page's
 * `?interest=` (e.g. /contact?interest=lee-systems, where every "Book a free
 * call" leads until a booking link is set).
 *
 * Reading the query string needs `useSearchParams`, which on a prerendered
 * page has to sit inside a Suspense boundary. The fallback is the same form
 * with nothing preselected, so the prerendered HTML carries a complete,
 * working form rather than an empty gap, and the preselected one takes its
 * place as the page hydrates.
 */
export function ContactFormBlock(props: Omit<ContactFormProps, "initialInterest">) {
  return (
    <Suspense fallback={<ContactForm {...props} />}>
      <ContactFormFromQuery {...props} />
    </Suspense>
  );
}
