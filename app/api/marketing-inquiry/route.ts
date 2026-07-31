import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Constructed per request rather than at module scope: the Resend constructor
// throws when the key is missing, which fails `next build` on any environment
// that doesn't expose RESEND_API_KEY at build time.
function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

// Delivers to the site-wide contact address, matching every other form on the
// site. A separate route from /api/lmm-consultation and /api/website-inquiry
// rather than a shared one with a flag: the subject line is what distinguishes
// a marketing lead from an automation or website lead in the inbox, and that
// only works if it is set here.
const MARKETING_TO_EMAIL =
  process.env.MARKETING_TO_EMAIL ||
  process.env.LMM_TO_EMAIL ||
  process.env.CONTACT_TO_EMAIL ||
  "ceo@leeenterprisesunlimited.com";

const fromAddress =
  process.env.CONTACT_FROM_EMAIL || "noreply@leeenterprisesunlimited.com";

interface MarketingInquiryRequest {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website?: string;
  channels?: unknown;
  goals: string;
  additionalDetails?: string;
  honeypot?: string;
}

/**
 * The channel list is the only free-form array the site accepts from a browser,
 * so it is bounded here rather than trusted: anything non-string is dropped,
 * entries are length-capped, and the list itself is capped. Without this a
 * crafted post could inflate the outbound email arbitrarily.
 */
function normalizeChannels(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((c): c is string => typeof c === "string")
    .map((c) => c.trim().slice(0, 80))
    .filter(Boolean)
    .slice(0, 20);
}

export async function POST(request: NextRequest) {
  try {
    const body: MarketingInquiryRequest = await request.json();

    // Honeypot field check - silently return 200 if filled
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json(
        { message: "Thank you for your submission" },
        { status: 200 }
      );
    }

    const errors: Record<string, string> = {};

    const fullName = body.fullName?.trim() || "";
    if (!fullName) {
      errors.fullName = "Full name is required";
    } else if (fullName.length < 2) {
      errors.fullName = "Name must be at least 2 characters";
    }

    const businessName = body.businessName?.trim() || "";
    if (!businessName) errors.businessName = "Business name is required";

    const email = body.email?.trim() || "";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    const phone = body.phone?.trim() || "";
    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!/^[\d\s\-().+]+$/.test(phone) || phone.length < 10) {
      errors.phone = "Please enter a valid phone number";
    }

    const channels = normalizeChannels(body.channels);
    if (channels.length === 0) {
      errors.channels = "Please select at least one option";
    }

    const goals = body.goals?.trim() || "";
    if (!goals) {
      errors.goals = "Please describe what you are trying to accomplish";
    } else if (goals.length < 10) {
      errors.goals = "Please add a little more detail";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const emailBody = `
Full Name: ${fullName}
Business Name: ${businessName}
Email Address: ${email}
Phone Number: ${phone}
Business Website: ${body.website?.trim() || "None / not provided"}

Interested In:
${channels.map((c) => `- ${c}`).join("\n")}

What They Are Trying to Accomplish:
${goals}

Additional Details:
${body.additionalDetails?.trim() || "Not provided"}
    `.trim();

    const subject = `New Marketing Request — ${businessName} — ${fullName}`;

    // Checked up front so a missing key is reported as itself rather than as a
    // generic failure: the Resend constructor throws on an absent key.
    if (!process.env.RESEND_API_KEY) {
      console.error(
        "[v0] RESEND_API_KEY is not set - the marketing inquiry form cannot send email."
      );
      return NextResponse.json(
        { error: "Failed to send email", code: "email_not_configured" },
        { status: 500 }
      );
    }

    const response = await getResend().emails.send({
      from: fromAddress,
      to: MARKETING_TO_EMAIL,
      replyTo: email,
      subject,
      text: emailBody,
    });

    if (response.error) {
      // Logged field by field: Resend's error object stringifies to "[object
      // Object]" through console.error on Vercel, hiding the actual reason.
      console.error(
        "[v0] Resend rejected the marketing inquiry email.",
        `name=${response.error.name}`,
        `message=${response.error.message}`,
        `from=${fromAddress}`,
        `to=${MARKETING_TO_EMAIL}`
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
  } catch (error) {
    console.error("[v0] Marketing inquiry form error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
