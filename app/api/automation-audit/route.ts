import { NextRequest, NextResponse } from "next/server";
import {
  auditIndustryOptions,
  auditTeamSizeOptions,
  automationAudit,
} from "@/data/lee-systems";
import { readJsonBody, stringField, tooLongMessage } from "@/lib/api";
import { DEFAULT_TO_EMAIL, sendLeadEmail } from "@/lib/email";
import { FIELD_LIMITS, isValidEmail, isValidPhone } from "@/lib/validation";

// Delivers to the site-wide contact address, matching the contact form and the
// payment notifications. LEE_SYSTEMS_TO_EMAIL splits Lee Systems leads out if
// that is ever wanted; LMM_TO_EMAIL is still read so an environment configured
// before the Lee Marketing Mastery rename keeps delivering where it did.
const AUDIT_TO_EMAIL =
  process.env.LEE_SYSTEMS_TO_EMAIL ||
  process.env.LMM_TO_EMAIL ||
  DEFAULT_TO_EMAIL;

/** What the form posts. Typed `unknown` because a request can come from anywhere. */
interface AutomationAuditRequest {
  fullName?: unknown;
  businessName?: unknown;
  industry?: unknown;
  teamSize?: unknown;
  timeWaster?: unknown;
  email?: unknown;
  phone?: unknown;
  honeypot?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const parsed = await readJsonBody(request);
    if (parsed instanceof NextResponse) return parsed;
    const body: AutomationAuditRequest = parsed;

    // Honeypot field check - silently return 200 if filled
    if (stringField(body.honeypot).trim() !== "") {
      return NextResponse.json(
        { message: "Thank you for your submission" },
        { status: 200 }
      );
    }

    const errors: Record<string, string> = {};

    const fullName = stringField(body.fullName).trim();
    if (!fullName) {
      errors.fullName = "Name is required";
    } else if (fullName.length < 2) {
      errors.fullName = "Name must be at least 2 characters";
    } else if (fullName.length > FIELD_LIMITS.short) {
      errors.fullName = tooLongMessage(FIELD_LIMITS.short);
    }

    const businessName = stringField(body.businessName).trim();
    if (!businessName) {
      errors.businessName = "Business name is required";
    } else if (businessName.length > FIELD_LIMITS.short) {
      errors.businessName = tooLongMessage(FIELD_LIMITS.short);
    }

    // Checked against the form's own lists so the email never carries a value
    // the form could not have sent.
    const industry = stringField(body.industry).trim();
    if (!(auditIndustryOptions as readonly string[]).includes(industry)) {
      errors.industry = "Please choose your industry";
    }

    const teamSize = stringField(body.teamSize).trim();
    if (!(auditTeamSizeOptions as readonly string[]).includes(teamSize)) {
      errors.teamSize = "Please choose your team size";
    }

    const timeWaster = stringField(body.timeWaster).trim();
    if (!timeWaster) {
      errors.timeWaster = "Please tell us your biggest time-waster";
    } else if (timeWaster.length < 10) {
      errors.timeWaster = "Please add a little more detail";
    } else if (timeWaster.length > FIELD_LIMITS.long) {
      errors.timeWaster = tooLongMessage(FIELD_LIMITS.long);
    }

    const email = stringField(body.email).trim();
    if (!email) {
      errors.email = "Email is required";
    } else if (email.length > FIELD_LIMITS.email || !isValidEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    const phone = stringField(body.phone).trim();
    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (phone.length > FIELD_LIMITS.phone || !isValidPhone(phone)) {
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

Reply promised within ${automationAudit.responseTime}.
    `.trim();

    return await sendLeadEmail({
      tag: "automation-audit",
      form: "automation audit form",
      to: AUDIT_TO_EMAIL,
      replyTo: email,
      // The subject line is what separates an audit request from a website
      // request in the inbox, so it names the brand and the form.
      subject: `Lee Systems Co.: New Automation Audit Request from ${fullName}, ${businessName}`,
      text: emailBody,
    });
  } catch (error) {
    console.error("[automation-audit] Automation audit form error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
