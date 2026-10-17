import { Suspense } from "react";
import { ContactForm, type ContactFormProps } from "@/components/contact/ContactForm";
import { ContactFormFromQuery } from "@/components/contact/ContactFormFromQuery";

/**
 * The contact form carrying the page's `?interest=` for the email's subject
 * tag (e.g. /contact?interest=lee-systems, where every "Book a free
 * call" leads until a booking link is set).
 *
 * Reading the query string needs `useSearchParams`, which on a prerendered
 * page has to sit inside a Suspense boundary. The fallback is the same form
 * without it, so the prerendered HTML carries a complete, working form
 * rather than an empty gap, and the one carrying it takes its place as the
 * page hydrates.
 */
export function ContactFormBlock(props: Omit<ContactFormProps, "initialInterest">) {
  return (
    <Suspense fallback={<ContactForm {...props} />}>
      <ContactFormFromQuery {...props} />
    </Suspense>
  );
}
