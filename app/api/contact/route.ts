import { NextRequest, NextResponse } from "next/server";
import { contactInterests, isContactInterest } from "@/data/contact";
import { readJsonBody, stringField, tooLongMessage } from "@/lib/api";
import { DEFAULT_TO_EMAIL, sendLeadEmail } from "@/lib/email";
import {
  FIELD_LIMITS,
  INVALID_NAME_MESSAGE,
  isValidEmail,
  isValidName,
  isValidPhone,
} from "@/lib/validation";

/** What the form posts. Typed `unknown` because a request can come from anywhere. */
interface ContactFormRequest {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  honeypot?: unknown;
}

/**
 * The shared contact form (components/contact/ContactForm.tsx): name, email,
 * phone, what the visitor is interested in, and an optional
 * message. Delivered through Resend to the same inbox as before, with the
 * interest at the front of the subject, e.g. "[Lee Systems Co.] New inquiry
 * from Jane Smith".
 */
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

    const errors: Record<string, string> = {};

    const name = stringField(body.name).trim();
    if (!name) {
      errors.name = "Please enter your name.";
    } else if (name.length < 2) {
      errors.name = "Please enter at least 2 characters.";
    } else if (name.length > FIELD_LIMITS.short) {
      errors.name = tooLongMessage(FIELD_LIMITS.short);
    } else if (!isValidName(name)) {
      errors.name = INVALID_NAME_MESSAGE;
    }

    const email = stringField(body.email).trim();
    if (!email) {
      errors.email = "Please enter your email address.";
    } else if (email.length > FIELD_LIMITS.email || !isValidEmail(email)) {
      errors.email = "Please enter a valid email address, like name@example.com.";
    }

    // Required since 2026-09-29, at the owner's request.
    const phone = stringField(body.phone).trim();
    if (!phone) {
      errors.phone = "Please enter your phone number.";
    } else if (phone.length > FIELD_LIMITS.phone || !isValidPhone(phone)) {
      errors.phone = "Please enter a valid phone number, including the area code.";
    }

    // Checked against the form's own list so the email never carries a value
    // the form could not have sent.
    const interest = stringField(body.interest).trim();
    if (!isContactInterest(interest)) {
      errors.interest = "Please choose what you're interested in.";
    }

    const message = stringField(body.message).trim();
    if (message.length > FIELD_LIMITS.long) {
      errors.message = tooLongMessage(FIELD_LIMITS.long);
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const choice = contactInterests.find((option) => option.value === interest);

    const emailBody = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Interested in: ${choice?.label ?? interest}

Message:
${message || "No message"}
    `.trim();

    return await sendLeadEmail({
      tag: "contact",
      form: "contact form",
      to: DEFAULT_TO_EMAIL,
      replyTo: email,
      subject: `[${choice?.subjectTag ?? "General"}] New inquiry from ${name}`,
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
