import { NextRequest, NextResponse } from "next/server";
import { contactFormFields, optionLabel } from "@/data/contact";
import { readJsonBody, stringField, tooLongMessage } from "@/lib/api";
import { DEFAULT_TO_EMAIL, sendLeadEmail } from "@/lib/email";
import { FIELD_LIMITS, isValidEmail, isValidPhone } from "@/lib/validation";

/** What the form posts. Typed `unknown` because a request can come from anywhere. */
interface ContactFormRequest {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  preferredContactMethod?: unknown;
  projectDescription?: unknown;
  budgetRange?: unknown;
  desiredTimeline?: unknown;
  howHeardAboutUs?: unknown;
  honeypot?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const parsed = await readJsonBody(request);
    if (parsed instanceof NextResponse) return parsed;
    const body: ContactFormRequest = parsed;

    // Honeypot field check - silently return 200 if filled
    if (stringField(body.honeypot).trim() !== "") {
      return NextResponse.json(
        { message: "Thank you for your submission" },
        { status: 200 }
      );
    }

    // Server-side validation
    const errors: Record<string, string> = {};

    // Full Name validation
    const fullNameTrimmed = stringField(body.fullName).trim();
    if (!fullNameTrimmed) {
      errors.fullName = "Full name is required";
    } else if (fullNameTrimmed.length < 2) {
      errors.fullName = "Name must be at least 2 characters";
    } else if (fullNameTrimmed.length > FIELD_LIMITS.short) {
      errors.fullName = tooLongMessage(FIELD_LIMITS.short);
    }

    // Email validation
    const emailTrimmed = stringField(body.email).trim();
    if (!emailTrimmed) {
      errors.email = "Email is required";
    } else if (
      emailTrimmed.length > FIELD_LIMITS.email ||
      !isValidEmail(emailTrimmed)
    ) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation - only required if phone is preferred contact method
    const preferredContactMethod = stringField(body.preferredContactMethod);
    const phoneTrimmed = stringField(body.phone).trim();
    if (preferredContactMethod === "phone" && !phoneTrimmed) {
      errors.phone = "Phone number is required";
    } else if (
      phoneTrimmed &&
      (phoneTrimmed.length > FIELD_LIMITS.phone || !isValidPhone(phoneTrimmed))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    // Contact method validation
    if (!preferredContactMethod) {
      errors.preferredContactMethod = "Please select a contact method";
    }

    // Project description validation
    const projectDescriptionTrimmed = stringField(body.projectDescription).trim();
    if (!projectDescriptionTrimmed) {
      errors.projectDescription = "Please describe your project or request";
    } else if (projectDescriptionTrimmed.length < 10) {
      errors.projectDescription = "Description must be at least 10 characters";
    } else if (projectDescriptionTrimmed.length > FIELD_LIMITS.long) {
      errors.projectDescription = tooLongMessage(FIELD_LIMITS.long);
    }

    // Budget range and timeline. A value that is not one of the options is
    // still accepted and emailed as sent (see optionLabel), so it is capped
    // like any other one-line field.
    const budgetRange = stringField(body.budgetRange);
    if (!budgetRange || budgetRange.length > FIELD_LIMITS.short) {
      errors.budgetRange = "Please select a budget range";
    }

    const desiredTimeline = stringField(body.desiredTimeline);
    if (!desiredTimeline || desiredTimeline.length > FIELD_LIMITS.short) {
      errors.desiredTimeline = "Please select a timeline";
    }

    // How heard about us validation. This is free text rather than a select
    // now, so it is trimmed and capped here as well as in the browser - the
    // maxLength attribute on the input is a convenience, not a guarantee.
    const howHeardTrimmed = stringField(body.howHeardAboutUs).trim();
    const howHeardMax = contactFormFields.howHeardAboutUs.validation.maxLength;
    if (!howHeardTrimmed) {
      errors.howHeardAboutUs = "Please let us know how you heard about us";
    } else if (howHeardTrimmed.length > howHeardMax) {
      errors.howHeardAboutUs = tooLongMessage(howHeardMax);
    }

    // Return errors if validation fails
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // The select fields store codes ("5k-10k", "1-3-months"), which this used to
    // email verbatim - an inquiry arrived reading "Budget Range: 5k-10k" and the
    // owner had to translate their own form. optionLabel resolves each one back
    // to the label the visitor actually picked.
    //
    // Build email body with "Not provided" for optional empty fields
    const emailBody = `
Full Name: ${fullNameTrimmed}
Email Address: ${emailTrimmed}
Phone Number: ${phoneTrimmed || "Not provided"}
Preferred Contact Method: ${preferredContactMethod === "email" ? "Email" : "Phone"}
Budget Range: ${optionLabel(contactFormFields.budgetRange.options, budgetRange)}
Desired Timeline: ${optionLabel(contactFormFields.desiredTimeline.options, desiredTimeline)}
How They Heard About Us: ${howHeardTrimmed || "Not provided"}

Project or Request Description:
${projectDescriptionTrimmed}
    `.trim();

    return await sendLeadEmail({
      tag: "contact",
      form: "contact form",
      to: DEFAULT_TO_EMAIL,
      replyTo: emailTrimmed,
      subject: `New Website Inquiry from ${fullNameTrimmed}`,
      text: emailBody,
    });
  } catch (error) {
    console.error("[contact] Contact form error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
