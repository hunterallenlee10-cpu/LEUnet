import { NextResponse } from "next/server";
import { Resend } from "resend";
import { companyInfo } from "@/data/company";

/**
 * Constructed per call rather than at module scope: the Resend constructor
 * throws when the key is missing, which fails `next build` on any environment
 * that doesn't expose RESEND_API_KEY at build time.
 */
export function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * The sender on every email the site sends. Resend's shared test sender by
 * default, the one the .com site already sends from (2026-10-19): it works
 * without a verified domain, but Resend only delivers it to the address the
 * Resend account is registered under, which is the inbox the forms go to.
 * Once leeenterprisesunlimited.com is verified in Resend, set
 * CONTACT_FROM_EMAIL to e.g. noreply@leeenterprisesunlimited.com.
 */
export const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

/**
 * Where the invoice payment notifications land (app/api/stripe/webhook).
 */
export const DEFAULT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || companyInfo.contactEmail;

/**
 * Where every form on the site delivers: ceo@leeenterprisesunlimited.com,
 * always (the owner's call, 2026-10-19). Deliberately not read from the
 * environment, so a leftover variable such as CONTACT_TO_EMAIL,
 * LEE_SYSTEMS_TO_EMAIL, WEBSITE_TO_EMAIL or BM_TO_EMAIL can never send leads
 * to another inbox. The subject line tells the forms apart.
 */
export const FORMS_TO_EMAIL = companyInfo.contactEmail;

interface LeadEmail {
  /** The route's log prefix, e.g. "contact" for "[contact] ...". */
  tag: string;
  /** The form as log lines name it, e.g. "contact form". */
  form: string;
  to: string;
  /** The visitor's address, so the owner can answer straight from the inbox. */
  replyTo: string;
  subject: string;
  text: string;
}

/**
 * Emails a lead form's submission to the owner and returns the response for
 * the browser. The Lee Systems and Business Mastery forms show `code` as the
 * reference on a failure, which is what tells a missing key apart from a
 * rejected send.
 */
export async function sendLeadEmail({
  tag,
  form,
  to,
  replyTo,
  subject,
  text,
}: LeadEmail): Promise<NextResponse> {
  // Checked up front so a missing key is reported as itself rather than as a
  // generic failure: the Resend constructor throws on an absent key.
  if (!process.env.RESEND_API_KEY) {
    console.error(
      `[${tag}] RESEND_API_KEY is not set - the ${form} cannot send email.`
    );
    return NextResponse.json(
      { error: "Failed to send email", code: "email_not_configured" },
      { status: 500 }
    );
  }

  const response = await getResend().emails.send({
    from: FROM_EMAIL,
    to,
    replyTo,
    subject,
    text,
  });

  if (response.error) {
    // Logged field by field: Resend's error object stringifies to "[object
    // Object]" through console.error on Vercel, hiding the actual reason.
    console.error(
      `[${tag}] Resend rejected the ${form} email.`,
      `name=${response.error.name}`,
      `message=${response.error.message}`,
      `from=${FROM_EMAIL}`,
      `to=${to}`
    );
    return NextResponse.json(
      { error: "Failed to send email", code: "email_rejected" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Email sent successfully", id: response.data?.id },
    { status: 200 }
  );
}
