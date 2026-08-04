"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// These options mirror the four cards in WebsitesServicesSection, so a visitor
// picks the thing they just read about. The third used to read "Website with AI
// features built in", which named the technology instead of the result, and then
// "Lead capture and follow-up around the clock" - a third name for an offering
// the card and the structured data in page.tsx both call "Never Miss a Lead".
// Three names for one thing left the buyer unsure what they were selecting and
// the owner unsure what the emailed enquiry referred to, so the card title now
// leads the option and the plain-language gloss follows it. If the card is
// retitled, retitle this and the hasOfferCatalog entry in page.tsx with it.
//
// Safe to rename: the value is posted to /api/website-inquiry, which only checks
// that projectType is non-empty and then interpolates it into the notification
// email. Nothing matches on the literal string, so the label can change without
// touching the route. Verified in app/api/website-inquiry/route.ts.
const projectTypes = [
  "New website",
  "Redesign of my existing site",
  "Never Miss a Lead - chat, intake, and follow-up",
  "Care plan for a site I already have",
  "Not sure yet",
];

const emptyForm = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  currentWebsite: "",
  projectType: "",
  businessDescription: "",
  goals: "",
};

type FormState = typeof emptyForm;
type FieldErrors = Partial<Record<keyof FormState | "form", string>>;

const labelClass = "block text-sm font-semibold text-neutral-200 mb-2";
const fieldClass =
  "w-full rounded-lg border bg-neutral-900 px-4 py-2.5 text-white placeholder-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/60";

export function WebsitesInquiryForm() {
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (formData.fullName.trim().length < 2)
      next.fullName = "Please enter your full name";
    if (!formData.businessName.trim())
      next.businessName = "Please enter your business name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      next.email = "Please enter a valid email address";
    const phone = formData.phone.trim();
    if (!phone || !/^[\d\s\-().+]+$/.test(phone) || phone.length < 10)
      next.phone = "Please enter a valid phone number";
    if (!formData.projectType)
      next.projectType = "Please select what you are looking for";
    if (formData.businessDescription.trim().length < 10)
      next.businessDescription =
        "Please tell us a little more about what your business does";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // The recipient is set server side in app/api/website-inquiry/route.ts,
      // never posted from the browser.
      const response = await fetch("/api/website-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, honeypot }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData(emptyForm);
        return;
      }

      const data = await response.json().catch(() => null);
      if (data?.errors) {
        setErrors(data.errors as FieldErrors);
      } else {
        setErrors({
          form: `We couldn't send your request. Please try again, or email us directly. Reference: ${
            data?.code || "unknown"
          } · http_${response.status}`,
        });
      }
    } catch {
      setErrors({
        form: "We couldn't reach the server. Please check your connection and try again. Reference: network_error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-10 text-center md:p-12">
        <CheckCircle2
          className="mx-auto mb-5 h-12 w-12 text-amber-400"
          aria-hidden="true"
        />
        <h3 className="mb-3 text-2xl font-bold text-white">
          Website Request Received
        </h3>
        <p className="mb-6 text-neutral-300">
          Thank you. We will review what you described and follow up with a
          quote and a realistic timeline for the build.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-amber-400 underline-offset-4 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="website-form-description"
      className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10"
    >
      {/* Stacked on narrow screens so the heading keeps the full width
          instead of wrapping to three lines beside the mark. */}
      <div className="mb-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Decorative: the heading beside it names the service. */}
        <Image
          src="/lee-marketing-mastery-logo.png"
          alt=""
          width={48}
          height={48}
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-full"
        />
        <h3 className="text-2xl font-bold text-white">
          Request a Website Quote
        </h3>
      </div>
      <p id="website-form-description" className="mb-8 text-sm text-neutral-400">
        Fields marked with an asterisk are required. Tell us what your business
        does and we will follow up with a quote and a timeline.
      </p>

      {/* Honeypot - visually hidden, ignored by real visitors */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website-company-fax">Leave this field empty</label>
        <input
          id="website-company-fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {errors.form && (
        <p
          role="alert"
          className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {errors.form}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          id="fullName"
          label="Full Name"
          required
          error={errors.fullName}
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          id="businessName"
          label="Business Name"
          required
          error={errors.businessName}
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Your company"
          autoComplete="organization"
        />
        <Field
          id="email"
          label="Email Address"
          type="email"
          required
          error={errors.email}
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          autoComplete="email"
        />
        <Field
          id="phone"
          label="Phone Number"
          type="tel"
          required
          error={errors.phone}
          value={formData.phone}
          onChange={handleChange}
          placeholder="(240) 000-0000"
          autoComplete="tel"
        />
      </div>

      <div className="mt-5">
        <Field
          id="currentWebsite"
          label="Current Website"
          type="url"
          error={errors.currentWebsite}
          value={formData.currentWebsite}
          onChange={handleChange}
          placeholder="https://yourcompany.com (optional - leave blank if you don't have one)"
          autoComplete="url"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="projectType" className={labelClass}>
          What Are You Looking For?{" "}
          <span className="text-amber-400" aria-hidden="true">
            *
          </span>
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={errors.projectType ? "true" : undefined}
          aria-describedby={errors.projectType ? "projectType-error" : undefined}
          className={`${fieldClass} ${
            errors.projectType ? "border-red-500/60" : "border-neutral-700"
          }`}
        >
          <option value="">Select an option...</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id="projectType-error" role="alert" className="mt-2 text-sm text-red-400">
            {errors.projectType}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="businessDescription" className={labelClass}>
          What Does Your Business Do?{" "}
          <span className="text-amber-400" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="businessDescription"
          name="businessDescription"
          rows={4}
          value={formData.businessDescription}
          onChange={handleChange}
          required
          aria-required="true"
          aria-invalid={errors.businessDescription ? "true" : undefined}
          aria-describedby={
            errors.businessDescription ? "businessDescription-error" : undefined
          }
          placeholder="What you sell or provide, and who your customers are"
          className={`${fieldClass} resize-none ${
            errors.businessDescription
              ? "border-red-500/60"
              : "border-neutral-700"
          }`}
        />
        {errors.businessDescription && (
          <p
            id="businessDescription-error"
            role="alert"
            className="mt-2 text-sm text-red-400"
          >
            {errors.businessDescription}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="goals" className={labelClass}>
          What Should the Website Accomplish?
        </label>
        <textarea
          id="goals"
          name="goals"
          rows={3}
          value={formData.goals}
          onChange={handleChange}
          placeholder="More quote requests, online bookings, looking credible to new customers, or anything else"
          className={`${fieldClass} resize-none border-neutral-700`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-8 inline-flex w-full items-center justify-center gap-2 group disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {isSubmitting ? "Sending..." : "Request My Free Quote"}
        {!isSubmitting && (
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </button>

      <p className="mt-4 text-center text-sm text-neutral-500">
        Free and no obligation. The first step is understanding your business.
      </p>
    </form>
  );
}

interface FieldProps {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  placeholder,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <>
            {" "}
            <span className="text-amber-400" aria-hidden="true">
              *
            </span>
          </>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${fieldClass} ${error ? "border-red-500/60" : "border-neutral-700"}`}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
