import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormFields, optionLabel } from "@/data/contact";

// Constructed per request rather than at module scope: the Resend constructor
// throws when the key is missing, which fails `next build` on any environment
// that doesn't expose RESEND_API_KEY at build time.
function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

interface ContactFormRequest {
  fullName: string;
  email: string;
  phone?: string;
  ventureOfInterest: string;
  preferredContactMethod: "email" | "phone";
  projectDescription: string;
  budgetRange?: string;
  desiredTimeline?: string;
  howHeardAboutUs?: string;
  honeypot?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormRequest = await request.json();

    // Honeypot field check - silently return 200 if filled
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json(
        { message: "Thank you for your submission" },
        { status: 200 }
      );
    }

    // Server-side validation
    const errors: Record<string, string> = {};

    // Full Name validation
    const fullNameTrimmed = body.fullName?.trim() || "";
    if (!fullNameTrimmed) {
      errors.fullName = "Full name is required";
    } else if (fullNameTrimmed.length < 2) {
      errors.fullName = "Name must be at least 2 characters";
    }

    // Email validation
    const emailTrimmed = body.email?.trim() || "";
    if (!emailTrimmed) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation - only required if phone is preferred contact method
    const phoneTrimmed = body.phone?.trim() || "";
    if (body.preferredContactMethod === "phone" && !phoneTrimmed) {
      errors.phone = "Phone number is required";
    } else if (
      phoneTrimmed &&
      (!/^[\d\s\-().+]+$/.test(phoneTrimmed) || phoneTrimmed.length < 10)
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    // Venture selection validation
    if (!body.ventureOfInterest) {
      errors.ventureOfInterest = "Please select a venture or service";
    }

    // Contact method validation
    if (!body.preferredContactMethod) {
      errors.preferredContactMethod = "Please select a contact method";
    }

    // Project description validation
    const projectDescriptionTrimmed = body.projectDescription?.trim() || "";
    if (!projectDescriptionTrimmed) {
      errors.projectDescription = "Please describe your project or request";
    } else if (projectDescriptionTrimmed.length < 10) {
      errors.projectDescription = "Description must be at least 10 characters";
    }

    // Budget range validation
    if (!body.budgetRange) {
      errors.budgetRange = "Please select a budget range";
    }

    // Timeline validation
    if (!body.desiredTimeline) {
      errors.desiredTimeline = "Please select a timeline";
    }

    // How heard about us validation. This is free text rather than a select
    // now, so it is trimmed and capped here as well as in the browser - the
    // maxLength attribute on the input is a convenience, not a guarantee.
    const howHeardTrimmed = body.howHeardAboutUs?.trim() || "";
    const howHeardMax = contactFormFields.howHeardAboutUs.validation.maxLength;
    if (!howHeardTrimmed) {
      errors.howHeardAboutUs = "Please let us know how you heard about us";
    } else if (howHeardTrimmed.length > howHeardMax) {
      errors.howHeardAboutUs = `Please keep this under ${howHeardMax} characters`;
    }

    // Return errors if validation fails
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // The select fields store codes ("lmm", "5k-10k"), which this used to email
    // verbatim - an inquiry arrived reading "Venture or Service: lmm" and the
    // owner had to translate their own form. optionLabel resolves each one back
    // to the label the visitor actually picked.
    const ventureLabel = optionLabel(
      contactFormFields.ventureOfInterest.options,
      body.ventureOfInterest
    );

    // Build email body with "Not provided" for optional empty fields
    const emailBody = `
Full Name: ${fullNameTrimmed}
Email Address: ${emailTrimmed}
Phone Number: ${phoneTrimmed || "Not provided"}
Venture or Service: ${ventureLabel}
Preferred Contact Method: ${body.preferredContactMethod === "email" ? "Email" : "Phone"}
Budget Range: ${optionLabel(contactFormFields.budgetRange.options, body.budgetRange)}
Desired Timeline: ${optionLabel(contactFormFields.desiredTimeline.options, body.desiredTimeline)}
How They Heard About Us: ${howHeardTrimmed || "Not provided"}

Project or Request Description:
${projectDescriptionTrimmed}
    `.trim();

    // Build subject line
    const subject = `New Website Inquiry — ${ventureLabel} — ${fullNameTrimmed}`;

    // Send email via Resend
    const response = await getResend().emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "noreply@leeenterprisesunlimited.com",
      to: process.env.CONTACT_TO_EMAIL || "ceo@leeenterprisesunlimited.com",
      replyTo: emailTrimmed,
      subject: subject,
      text: emailBody,
    });

    if (response.error) {
      console.error("[v0] Resend error:", response.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: response.data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Contact form error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
