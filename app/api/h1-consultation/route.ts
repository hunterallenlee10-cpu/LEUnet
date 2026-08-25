import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Constructed per request rather than at module scope: the Resend constructor
// throws when the key is missing, which fails `next build` on any environment
// that doesn't expose RESEND_API_KEY at build time.
function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

// Delivers to the site-wide contact address, matching the contact form and the
// LMM forms. Its own route rather than a shared one
// with a flag: the subject line is what distinguishes an H1 lead in the inbox,
// and that only works if it is set here.
const H1_TO_EMAIL =
  process.env.H1_TO_EMAIL ||
  process.env.CONTACT_TO_EMAIL ||
  "ceo@leeenterprisesunlimited.com";

const fromAddress =
  process.env.CONTACT_FROM_EMAIL || "noreply@leeenterprisesunlimited.com";

interface H1ConsultationRequest {
  fullName: string;
  email: string;
  phone: string;
  athleteName?: string;
  athleteAge?: string;
  sport: string;
  packageInterest: string;
  equipment?: string;
  goals: string;
  honeypot?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: H1ConsultationRequest = await request.json();

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

    const sport = body.sport?.trim() || "";
    if (!sport) errors.sport = "Please enter the sport you train for";

    if (!body.packageInterest) {
      errors.packageInterest = "Please choose a package";
    }

    const goals = body.goals?.trim() || "";
    if (!goals) {
      errors.goals = "Please tell us what you want to improve";
    } else if (goals.length < 10) {
      errors.goals = "Please add a little more detail";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // The athlete is often not the person filling this out, so the requester
    // and the athlete are reported separately rather than collapsed.
    const athleteName = body.athleteName?.trim();

    const emailBody = `
Requested By: ${fullName}
Email Address: ${email}
Phone Number: ${phone}

Athlete: ${athleteName || `${fullName} (training for themselves)`}
Age / Grade: ${body.athleteAge?.trim() || "Not provided"}
Sport: ${sport}
Package Interest: ${body.packageInterest}
Available Equipment: ${body.equipment?.trim() || "Not provided"}

Goals:
${goals}
    `.trim();

    const subject = `New H1 Consultation Request — ${sport} — ${
      athleteName || fullName
    }`;

    // Checked up front so a missing key is reported as itself rather than as a
    // generic failure: the Resend constructor throws on an absent key.
    if (!process.env.RESEND_API_KEY) {
      console.error(
        "[v0] RESEND_API_KEY is not set - the H1 consultation form cannot send email."
      );
      return NextResponse.json(
        { error: "Failed to send email", code: "email_not_configured" },
        { status: 500 }
      );
    }

    const response = await getResend().emails.send({
      from: fromAddress,
      to: H1_TO_EMAIL,
      replyTo: email,
      subject,
      text: emailBody,
    });

    if (response.error) {
      // Logged field by field: Resend's error object stringifies to "[object
      // Object]" through console.error on Vercel, hiding the actual reason.
      console.error(
        "[v0] Resend rejected the H1 consultation email.",
        `name=${response.error.name}`,
        `message=${response.error.message}`,
        `from=${fromAddress}`,
        `to=${H1_TO_EMAIL}`
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
    console.error("[v0] H1 consultation form error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
