import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { auditIndustryOptions, auditTeamSizeOptions } from "@/data/lee-systems";

// Constructed per request rather than at module scope: the Resend constructor
// throws when the key is missing, which fails `next build` on any environment
// that doesn't expose RESEND_API_KEY at build time.
function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

// Delivers to the site-wide contact address, matching the contact form and the
// payment notifications. LEE_SYSTEMS_TO_EMAIL splits Lee Systems leads out if
// that is ever wanted; LMM_TO_EMAIL is still read so an environment configured
// before the Lee Marketing Mastery rename keeps delivering where it did.
const AUDIT_TO_EMAIL =
  process.env.LEE_SYSTEMS_TO_EMAIL ||
  process.env.LMM_TO_EMAIL ||
  process.env.CONTACT_TO_EMAIL ||
  "ceo@leeenterprisesunlimited.com";

const fromAddress =
  process.env.CONTACT_FROM_EMAIL || "noreply@leeenterprisesunlimited.com";

interface AutomationAuditRequest {
  fullName: string;
  businessName: string;
  industry: string;
  teamSize: string;
  timeWaster: string;
  email: string;
  phone: string;
  honeypot?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AutomationAuditRequest = await request.json();

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
      errors.fullName = "Name is required";
    } else if (fullName.length < 2) {
      errors.fullName = "Name must be at least 2 characters";
    }

    const businessName = body.businessName?.trim() || "";
    if (!businessName) errors.businessName = "Business name is required";

    // Checked against the form's own lists so the email never carries a value
    // the form could not have sent.
    const industry = body.industry?.trim() || "";
    if (!(auditIndustryOptions as readonly string[]).includes(industry)) {
      errors.industry = "Please choose your industry";
    }

    const teamSize = body.teamSize?.trim() || "";
    if (!(auditTeamSizeOptions as readonly string[]).includes(teamSize)) {
      errors.teamSize = "Please choose your team size";
    }

    const timeWaster = body.timeWaster?.trim() || "";
    if (!timeWaster) {
      errors.timeWaster = "Please tell us your biggest time-waster";
    } else if (timeWaster.length < 10) {
      errors.timeWaster = "Please add a little more detail";
    }

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

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const emailBody = `
Name: ${fullName}
Business: ${businessName}
Industry: ${industry}
Team Size: ${teamSize}
Email: ${email}
Phone: ${phone}

Biggest Time-Waster:
${timeWaster}

Reply promised within 12 hours.
    `.trim();

    // The subject line is what separates an audit request from a website
    // request in the inbox, so it names the brand and the form.
    const subject = `Lee Systems Co.: New Automation Audit Request from ${fullName}, ${businessName}`;

    // Checked up front so a missing key is reported as itself rather than as a
    // generic failure: the Resend constructor throws on an absent key.
    if (!process.env.RESEND_API_KEY) {
      console.error(
        "[v0] RESEND_API_KEY is not set - the automation audit form cannot send email."
      );
      return NextResponse.json(
        { error: "Failed to send email", code: "email_not_configured" },
        { status: 500 }
      );
    }

    const response = await getResend().emails.send({
      from: fromAddress,
      to: AUDIT_TO_EMAIL,
      replyTo: email,
      subject,
      text: emailBody,
    });

    if (response.error) {
      // Logged field by field: Resend's error object stringifies to "[object
      // Object]" through console.error on Vercel, hiding the actual reason.
      console.error(
        "[v0] Resend rejected the automation audit email.",
        `name=${response.error.name}`,
        `message=${response.error.message}`,
        `from=${fromAddress}`,
        `to=${AUDIT_TO_EMAIL}`
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
    console.error("[v0] Automation audit form error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
