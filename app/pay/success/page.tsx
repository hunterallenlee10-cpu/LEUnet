import { CheckCircle2 } from "lucide-react";

import { PayContact } from "@/components/pay/PayContact";

/**
 * /pay/success: where Stripe sends a client after checkout (each link's
 * after_completion redirect, lib/pay.ts). It says only what is always true
 * after a completed checkout; it doesn't read the session, so there's no
 * client detail here to leak.
 */
export default function PaySuccessPage() {
  return (
    <div className="mx-auto max-w-md text-center">
      <CheckCircle2
        className="mx-auto h-12 w-12 text-amber-400"
        aria-hidden="true"
      />
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Payment received
      </h1>
      <p className="mt-4 leading-relaxed text-neutral-300">
        Thank you. Stripe is emailing your receipt now.
      </p>
      <PayContact className="mt-10" />
    </div>
  );
}
