import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Constructed per request rather than at module scope: the Resend constructor
// throws when the key is missing, which fails `next build` on any environment
// that doesn't expose RESEND_API_KEY at build time.
function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

// Delivers to the site-wide contact address, matching the contact form, the
// Lee Systems automation audit form and the payment notifications.
// A separate route from /api/automation-audit rather than a shared one with a
// flag: the subject line is what distinguishes a website lead from an
// automation lead in the inbox, and that only works if it is set here.
// LMM_TO_EMAIL is still read so an environment configured before the Lee
// Marketing Mastery rename keeps delivering where it did.
const WEBSITE_TO_EMAIL =
  process.env.WEBSITE_TO_EMAIL ||
  process.env.LEE_SYSTEMS_TO_EMAIL ||
  process.env.LMM_TO_EMAIL ||
  process.env.CONTACT_TO_EMAIL ||
  "ceo@leeenterprisesunlimited.com";

const fromAddress =
  process.env.CONTACT_FROM_EMAIL || "noreply@leeenterprisesunlimited.com";

interface WebsiteInquiryRequest {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  currentWebsite?: string;
  projectType: string;
  businessDescription: string;
  goals?: string;
  honeypot?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: WebsiteInquiryRequest = await request.json();

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

    if (!body.projectType) {
      errors.projectType = "Please select what you are looking for";
    }

    const businessDescription = body.businessDescription?.trim() || "";
    if (!businessDescription) {
      errors.businessDescription = "Please describe what your business does";
    } else if (businessDescription.length < 10) {
      errors.businessDescription = "Please add a little more detail";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const emailBody = `
Full Name: ${fullName}
Business Name: ${businessName}
Email Address: ${email}
Phone Number: ${phone}
Current Website: ${body.currentWebsite?.trim() || "None / not provided"}
What They Are Looking For: ${body.projectType}

What the Business Does:
${businessDescription}

What the Website Should Accomplish:
${body.goals?.trim() || "Not provided"}
    `.trim();

    const subject = `Lee Systems Co. — New Website Request — ${businessName} — ${fullName}`;

    // Checked up front so a missing key is reported as itself rather than as a
    // generic failure: the Resend constructor throws on an absent key.
    if (!process.env.RESEND_API_KEY) {
      console.error(
        "[v0] RESEND_API_KEY is not set - the website inquiry form cannot send email."
      );
      return NextResponse.json(
        { error: "Failed to send email", code: "email_not_configured" },
        { status: 500 }
      );
    }

    const response = await getResend().emails.send({
      from: fromAddress,
      to: WEBSITE_TO_EMAIL,
      replyTo: email,
      subject,
      text: emailBody,
    });

    if (response.error) {
      // Logged field by field: Resend's error object stringifies to "[object
      // Object]" through console.error on Vercel, hiding the actual reason.
      console.error(
        "[v0] Resend rejected the website inquiry email.",
        `name=${response.error.name}`,
        `message=${response.error.message}`,
        `from=${fromAddress}`,
        `to=${WEBSITE_TO_EMAIL}`
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
    console.error("[v0] Website inquiry form error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
