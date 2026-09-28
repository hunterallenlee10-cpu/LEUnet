import { NextRequest, NextResponse } from "next/server";
import { websiteProjectTypes } from "@/data/lee-systems";
import { readJsonBody, stringField, tooLongMessage } from "@/lib/api";
import { DEFAULT_TO_EMAIL, sendLeadEmail } from "@/lib/email";
import { FIELD_LIMITS, isValidEmail, isValidPhone } from "@/lib/validation";

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
  DEFAULT_TO_EMAIL;

/** What the form posts. Typed `unknown` because a request can come from anywhere. */
interface WebsiteInquiryRequest {
  fullName?: unknown;
  businessName?: unknown;
  email?: unknown;
  phone?: unknown;
  currentWebsite?: unknown;
  projectType?: unknown;
  businessDescription?: unknown;
  goals?: unknown;
  honeypot?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const parsed = await readJsonBody(request);
    if (parsed instanceof NextResponse) return parsed;
    const body: WebsiteInquiryRequest = parsed;

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
      errors.fullName = "Full name is required";
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

    const currentWebsite = stringField(body.currentWebsite).trim();
    if (currentWebsite.length > FIELD_LIMITS.short) {
      errors.currentWebsite = tooLongMessage(FIELD_LIMITS.short);
    }

    // Checked against the form's own list so the email never carries a value
    // the form could not have sent.
    const projectType = stringField(body.projectType).trim();
    if (!(websiteProjectTypes as readonly string[]).includes(projectType)) {
      errors.projectType = "Please select what you are looking for";
    }

    const businessDescription = stringField(body.businessDescription).trim();
    if (!businessDescription) {
      errors.businessDescription = "Please describe what your business does";
    } else if (businessDescription.length < 10) {
      errors.businessDescription = "Please add a little more detail";
    } else if (businessDescription.length > FIELD_LIMITS.long) {
      errors.businessDescription = tooLongMessage(FIELD_LIMITS.long);
    }

    const goals = stringField(body.goals).trim();
    if (goals.length > FIELD_LIMITS.long) {
      errors.goals = tooLongMessage(FIELD_LIMITS.long);
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const emailBody = `
Full Name: ${fullName}
Business Name: ${businessName}
Email Address: ${email}
Phone Number: ${phone}
Current Website: ${currentWebsite || "None / not provided"}
What They Are Looking For: ${projectType}

What the Business Does:
${businessDescription}

What the Website Should Accomplish:
${goals || "Not provided"}
    `.trim();

    return await sendLeadEmail({
      tag: "website-inquiry",
      form: "website inquiry form",
      to: WEBSITE_TO_EMAIL,
      replyTo: email,
      subject: `Lee Systems Co.: New Website Request from ${fullName}, ${businessName}`,
      text: emailBody,
    });
  } catch (error) {
    console.error("[website-inquiry] Website inquiry form error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
