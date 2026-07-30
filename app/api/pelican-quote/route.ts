import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Constructed per request rather than at module scope: the Resend constructor
// throws when the key is missing, which fails `next build` on any environment
// that doesn't expose RESEND_API_KEY at build time.
function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

const PELICAN_TO_EMAIL =
  process.env.PELICAN_TO_EMAIL || "llc.pelicanpowerwash@gmail.com";

interface PelicanQuoteRequest {
  fullName: string;
  email?: string;
  phone: string;
  preferredContact: "phone" | "text" | "email";
  address?: string;
  city?: string;
  zip?: string;
  propertyType?: string;
  services?: string[];
  projectSize?: string;
  condition?: string;
  description?: string;
  preferredDate?: string;
  notes?: string;
  source?: string;
  honeypot?: string;
}

const preferredContactLabels: Record<string, string> = {
  phone: "Phone Call",
  text: "Text Message",
  email: "Email",
};

export async function POST(request: NextRequest) {
  try {
    const body: PelicanQuoteRequest = await request.json();

    // Honeypot field check - silently return 200 if filled
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json(
        { message: "Thank you for your submission" },
        { status: 200 }
      );
    }

    // Server-side validation
    const errors: Record<string, string> = {};

    const fullNameTrimmed = body.fullName?.trim() || "";
    if (!fullNameTrimmed) {
      errors.fullName = "Full name is required";
    } else if (fullNameTrimmed.length < 2) {
      errors.fullName = "Name must be at least 2 characters";
    }

    const phoneTrimmed = body.phone?.trim() || "";
    if (!phoneTrimmed) {
      errors.phone = "Phone number is required";
    } else if (
      !/^[\d\s\-().+]+$/.test(phoneTrimmed) ||
      phoneTrimmed.length < 10
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    // Email is optional on this form, but must be valid when provided - and is
    // required when the customer asks to be contacted by email.
    const emailTrimmed = body.email?.trim() || "";
    if (emailTrimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      errors.email = "Please enter a valid email address";
    } else if (!emailTrimmed && body.preferredContact === "email") {
      errors.email = "Email is required when you prefer to be contacted by email";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const services = body.services?.length
      ? body.services.join(", ")
      : "Not specified";

    const emailBody = `
Full Name: ${fullNameTrimmed}
Phone Number: ${phoneTrimmed}
Email Address: ${emailTrimmed || "Not provided"}
Preferred Contact Method: ${preferredContactLabels[body.preferredContact] || "Not provided"}

Address: ${body.address?.trim() || "Not provided"}
City: ${body.city?.trim() || "Not provided"}
ZIP Code: ${body.zip?.trim() || "Not provided"}
Property Type: ${body.propertyType || "Not provided"}

Services Needed: ${services}
Project Size: ${body.projectSize || "Not provided"}
Current Condition: ${body.condition || "Not provided"}
Preferred Service Date: ${body.preferredDate || "Not provided"}
How They Heard About Us: ${body.source || "Not provided"}

Project Description:
${body.description?.trim() || "Not provided"}

Additional Notes:
${body.notes?.trim() || "Not provided"}
    `.trim();

    const subject = `New Pelican Power Wash Quote Request — ${fullNameTrimmed}`;

    const response = await getResend().emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        "noreply@leeenterprisesunlimited.com",
      to: PELICAN_TO_EMAIL,
      ...(emailTrimmed ? { replyTo: emailTrimmed } : {}),
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
    console.error("[v0] Pelican quote form error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
