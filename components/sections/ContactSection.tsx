"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, ChevronDown, Send } from "lucide-react";
import { contactEmail, contactFormFields } from "@/data/contact";
import { ContactFormData } from "@/types";
import { sectionIds } from "@/data/navigation";
import { GlassCardPadded } from "@/components/cards/GlassCard";

/**
 * The general enquiry form, and the site's fourth and most-visited one.
 *
 * BROUGHT IN LINE WITH ITS SIBLINGS, NOT REDESIGNED. The three offering forms
 * (MarketingInquiryForm, WebsitesInquiryForm, LmmConsultationForm) already
 * share a set of conventions this one predated and never picked up: a visible
 * `border-neutral-700` on every control, an amber focus ring, an asterisk on
 * required fields, a `role="alert"` banner for form-level errors, pill toggles
 * for a small set of choices, and a success panel that waits to be dismissed.
 * Everything below adopts those. Anything that looked "flat" here was mostly
 * this: fields drawn at `border-white/10` on a `bg-white/5` card are a lighter
 * rectangle on a light rectangle, and the two selects had `appearance-none`
 * with nothing put back, so a dropdown was indistinguishable from a text box.
 *
 * TWO FIELDS MOVED, and only two. The venture select opens the project group
 * instead of sharing a row with the phone number, and the contact-method
 * choice sits beside the phone number instead of at the foot of the form -
 * which is where the rule that governs it lives, since a phone number is only
 * required when someone asks to be called. Every field, label and option string
 * is otherwise exactly what it was.
 */

/** House form idiom, matching the three offering forms. The fill is darker than
 *  theirs because this form sits on a `bg-white/5` card rather than a
 *  `bg-white/[0.03]` one: `bg-neutral-900` against that ground is within a
 *  couple of values of the card itself, so the field would read as a border
 *  floating on nothing. Darker than the card, not lighter - the control is a
 *  well cut into the panel. */
const labelClass = "mb-2 block text-sm font-semibold text-neutral-200";
const fieldClass =
  "w-full rounded-lg border bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/60";

/** One place, so an errored control and a clean one can never drift apart. */
const borderFor = (error?: string) =>
  error ? "border-red-500/60" : "border-neutral-700";

/** The amber asterisk the other three forms use. `aria-hidden` because the
 *  control itself carries `aria-required`, and a screen reader announcing
 *  "star" after every label is noise. */
function RequiredMark() {
  return (
    <>
      {" "}
      <span className="text-amber-400" aria-hidden="true">
        *
      </span>
    </>
  );
}

/**
 * A titled run of fields. Nine controls in one column is a wall; two named
 * groups is a form someone can see the end of.
 *
 * `min-w-0` is load-bearing: a fieldset defaults to `min-width: min-content`,
 * which the grids inside would otherwise be unable to shrink below, and the
 * longest option string here ("Other / Lee Enterprises Inquiry") would set a
 * floor wider than a phone.
 */
function FormGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="text-xs font-semibold uppercase tracking-widest text-amber-400/80">
        {title}
      </legend>
      <div
        aria-hidden="true"
        className="mb-6 mt-3 h-px w-full bg-gradient-to-r from-amber-400/30 via-white/10 to-transparent"
      />
      <div className="space-y-6">{children}</div>
    </fieldset>
  );
}

/**
 * A select with its chevron put back. `appearance-none` strips the native
 * arrow, and this form stripped it without replacing it - so both dropdowns
 * rendered as text boxes that happened to contain words, with no affordance
 * saying they could be opened. The icon is `pointer-events-none` so clicking
 * it still falls through to the select underneath.
 */
function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly { value: string; label: string }[];
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        <RequiredMark />
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          aria-required="true"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${fieldClass} ${borderFor(error)} cursor-pointer appearance-none pr-11`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-neutral-900">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    preferredContactMethod: "email",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  /**
   * How the visitor asked to be contacted, captured at the moment of a
   * successful send so the confirmation can name it back to them.
   *
   * It has to be its own state and cannot be read off `formData`: the success
   * handler resets the form the instant it sets `submitted`, which returns
   * `preferredContactMethod` to its "email" default - so a panel reading the
   * live value would tell everyone who asked for a call that we would email
   * them instead.
   */
  const [sentVia, setSentVia] = useState<"email" | "phone">("email");
  const successRef = useRef<HTMLDivElement>(null);

  // Get selected venture from session storage. sessionStorage only exists in
  // the browser, so this has to run after mount rather than as lazy initial
  // state -- seeding the field during render would make the server and client
  // emit different HTML and trip a hydration error. The one extra render on
  // mount is the cost of that, hence the suppression below.
  useEffect(() => {
    const selectedVenture = sessionStorage.getItem("selectedVenture");
    if (selectedVenture && selectedVenture !== "other") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({ ...prev, ventureOfInterest: selectedVenture }));
    }
  }, []);

  // The form is replaced by the success panel rather than hidden, so the focused
  // element is removed from the document and focus falls back to <body> - which
  // leaves a keyboard or screen reader user at the top of the page with no
  // announcement that anything happened. Moving focus to the panel puts them on
  // the confirmation and one Tab from "Send Another Response".
  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  /**
   * Back to a blank form, re-seeding the venture the way the mount effect does.
   * Reading sessionStorage directly is safe here and not in that effect: this
   * only ever runs from an event handler, so there is no server render to
   * disagree with.
   */
  const resetForm = () => {
    const selectedVenture =
      typeof window === "undefined"
        ? null
        : sessionStorage.getItem("selectedVenture");
    setFormData({
      preferredContactMethod: "email",
      ...(selectedVenture && selectedVenture !== "other"
        ? { ventureOfInterest: selectedVenture }
        : {}),
    });
    setHoneypot("");
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Full Name validation
    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation - only required if phone is preferred contact method
    if (formData.preferredContactMethod === "phone" && !formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone?.trim() && (!/^[\d\s\-().+]+$/.test(formData.phone) || formData.phone.length < 10)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Venture selection validation
    if (!formData.ventureOfInterest) {
      newErrors.ventureOfInterest = "Please select a venture or service";
    }

    // Contact method validation
    if (!formData.preferredContactMethod) {
      newErrors.preferredContactMethod = "Please select a contact method";
    }

    // Project description validation
    if (!formData.projectDescription?.trim()) {
      newErrors.projectDescription = "Please describe your project or request";
    } else if (formData.projectDescription.length < 10) {
      newErrors.projectDescription = "Description must be at least 10 characters";
    }

    // Budget range validation
    if (!formData.budgetRange) {
      newErrors.budgetRange = "Please select a budget range";
    }

    // Timeline validation
    if (!formData.desiredTimeline) {
      newErrors.desiredTimeline = "Please select a timeline";
    }

    // How heard about us validation. Free text now, so it is trimmed like the
    // other typed fields rather than merely checked for a selected value - a
    // field of spaces passed the old check.
    const howHeardTrimmed = formData.howHeardAboutUs?.trim();
    if (!howHeardTrimmed) {
      newErrors.howHeardAboutUs = "Please let us know how you heard about us";
    } else if (
      howHeardTrimmed.length > contactFormFields.howHeardAboutUs.validation.maxLength
    ) {
      newErrors.howHeardAboutUs = `Please keep this under ${contactFormFields.howHeardAboutUs.validation.maxLength} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, preferredContactMethod: value as "email" | "phone" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from API
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ form: data.error || "Failed to send message" });
        }
        setIsSubmitting(false);
        return;
      }

      // NO TIMER. This used to call setTimeout(..., 3000) and put the form
      // back by itself, which meant the confirmation was gone before anyone
      // who had looked away could read it, and a visitor who returned to the
      // tab found an empty form and no way to tell whether their enquiry had
      // been sent. The panel now stays until it is dismissed deliberately.
      setSentVia(formData.preferredContactMethod === "phone" ? "phone" : "email");
      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error("[v0] Contact form submission error:", error);
      setErrors({ form: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const phoneRequired = formData.preferredContactMethod === "phone";

  return (
    <section
      id={sectionIds.contact}
      className="relative isolate overflow-hidden py-20 md:py-32"
    >
      {/* NOT `-z-10`, which is what this was. The section sets no z-index and
          so establishes no stacking context, which puts a negative layer inside
          it behind the section's own opaque `bg-neutral-950` - where none of it
          survives. The single amber orb here has never been visible, so this
          section has been rendering as flat black while both venture teasers
          above it are lit. Same correction LegalSection carries, and the
          content below takes `relative` so it still paints over the orbs.

          Two offset orbs rather than one centred pool, matching the pair on
          LeeSystemsSection, the right half of the pair directly above, so the light carries across the
          seam instead of stopping dead at it. Dimmer than that pair on purpose
          (0.10/0.06 against its 0.16/0.09): the doorways are the brightest
          things on the page and a utility section should not out-glow them.
          They also give the form's `backdrop-blur` card something to blur,
          which on flat black it did not have. */}
      <div className="pointer-events-none absolute inset-0 section-fade" aria-hidden="true">
        <div className="absolute -top-24 right-[18%] h-[32rem] w-[32rem] max-w-[80vw] translate-x-1/2 rounded-full bg-amber-400/[0.10] blur-3xl" />
        <div className="absolute -bottom-24 left-[16%] h-[26rem] w-[26rem] max-w-[70vw] -translate-x-1/2 rounded-full bg-slate-400/[0.06] blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="mx-auto max-w-4xl">
          {/* Header.

              Its own `max-w-2xl` inside the form's `max-w-4xl`. The subtitle
              used to inherit the form's measure and ran as one 20-word line
              across the full 56rem, which is roughly twice a comfortable one
              and the main reason two lines of copy read as an empty band.

              The eyebrow is deliberately NOT `.venture-masthead`. That idiom
              belongs to the two venture doorways and marks a place you can go;
              borrowing it here would rank the contact form alongside them.
              This is the form's own pill vocabulary instead, at eyebrow size -
              same amber, different rank - so the section stops opening cold on
              an unadorned H2 while every other section on the page opens with
              a mark. */}
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
              Contact
            </p>
            {/* One word carries the accent. The heading was pure white on near
                black with no colour anywhere in the header, so nothing in it
                belonged to this site rather than any site. `.gradient-text` is
                the existing amber utility. */}
            <h2 className="heading-lg text-white">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            {/* A short deliberate mark under the heading in place of a flat
                gap. */}
            <span
              aria-hidden="true"
              className="mx-auto mt-5 block h-px w-16 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
            />
            {/* `neutral-300`, matching the two teasers. At `neutral-400` on
                black this sentence was the dimmest line in any section header
                on the page.

                `text-balance` because at this measure the sentence otherwise
                breaks one word early and leaves "goals." alone on a line of
                its own. */}
            <p className="mt-5 text-balance text-lg leading-relaxed text-neutral-300">
              Tell us about your project, and let&apos;s discuss how we can help you achieve your goals.
            </p>
            {/* The one thing a contact section can offer that a form cannot:
                a way to reach us without filling in nine fields. The address is
                already public in the footer and the legal block; it was just
                absent from the page's actual contact section. */}
            <p className="mt-5 text-sm text-neutral-500">
              Prefer to write directly?{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium text-amber-400 underline decoration-amber-400/40 underline-offset-4 transition-colors hover:text-amber-300 hover:decoration-amber-400"
              >
                {contactEmail}
              </a>
            </p>
          </div>

          {submitted ? (
            /* `tabIndex={-1}` so the effect above can move focus here; it makes
               the panel programmatically focusable without putting it in the
               tab order. `role="status"` announces it to a screen reader that
               is somewhere else on the page. */
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="mx-auto max-w-2xl rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-10 text-center focus:outline-none md:p-12"
            >
              <CheckCircle2
                className="mx-auto mb-5 h-12 w-12 text-amber-400"
                aria-hidden="true"
              />
              <h3 className="mb-3 text-2xl font-bold text-white">
                Message Sent
              </h3>
              {/* The old copy read "Your email client has opened. Please
                  complete the submission to send your inquiry to us." Nothing
                  opens a mail client: the form POSTs to /api/contact, which
                  sends the email server-side through Resend. It described a
                  mailto flow this form has not used for some time, and it asked
                  the visitor to go and finish a step that does not exist -
                  so anyone who believed it assumed their enquiry had not been
                  sent. */}
              <p className="mb-8 text-neutral-300">
                Thank you, your inquiry is with us. We will read it properly
                and get back to you by {sentVia}.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Send Another Response
              </button>
            </div>
          ) : (
            <GlassCardPadded
              size="lg"
              glassOpacity="bg-white/5"
              borderColor="border-white/10"
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-describedby="contact-form-description"
                className="space-y-10"
              >
                <p
                  id="contact-form-description"
                  className="text-sm text-neutral-500"
                >
                  Fields marked with an asterisk are required.
                </p>

                {/* Form-level errors. These were being set on every server
                    failure and rendered nowhere, so a visitor whose submission
                    was rejected watched the button stop saying "Sending..."
                    and got nothing else. */}
                {errors.form && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  >
                    {errors.form}
                  </p>
                )}

                <FormGroup title="Your details">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className={labelClass}>
                        {contactFormFields.fullName.label}
                        <RequiredMark />
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        autoComplete="name"
                        placeholder={contactFormFields.fullName.placeholder}
                        value={formData.fullName || ""}
                        onChange={handleInputChange}
                        aria-required="true"
                        aria-invalid={errors.fullName ? "true" : undefined}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        className={`${fieldClass} ${borderFor(errors.fullName)}`}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" role="alert" className="mt-2 text-sm text-red-400">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        {contactFormFields.email.label}
                        <RequiredMark />
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder={contactFormFields.email.placeholder}
                        value={formData.email || ""}
                        onChange={handleInputChange}
                        aria-required="true"
                        aria-invalid={errors.email ? "true" : undefined}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`${fieldClass} ${borderFor(errors.email)}`}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-2 text-sm text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        {contactFormFields.phone.label}
                        {/* Conditional, because the rule is. The validator only
                            insists on a phone number when someone has asked to
                            be called, so a permanent asterisk here promised a
                            requirement the form does not enforce. */}
                        {phoneRequired && <RequiredMark />}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        placeholder={contactFormFields.phone.placeholder}
                        value={formData.phone || ""}
                        onChange={handleInputChange}
                        aria-required={phoneRequired ? "true" : undefined}
                        aria-invalid={errors.phone ? "true" : undefined}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={`${fieldClass} ${borderFor(errors.phone)}`}
                      />
                      {errors.phone && (
                        <p id="phone-error" role="alert" className="mt-2 text-sm text-red-400">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Pills rather than the browser's radios, matching the
                        channel toggles on MarketingInquiryForm. The inputs are
                        still radios and still keyboard-operable - they are
                        `sr-only` inside the label, and `focus-within` puts the
                        ring on the pill. */}
                    <fieldset className="min-w-0 border-0 p-0">
                      <legend className={labelClass}>
                        {contactFormFields.preferredContactMethod.label}
                        <RequiredMark />
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {contactFormFields.preferredContactMethod.options.map((opt) => {
                          const checked = formData.preferredContactMethod === opt.value;
                          return (
                            <label
                              key={opt.value}
                              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-amber-400 ${
                                checked
                                  ? "border-amber-400/60 bg-amber-400/[0.14] text-amber-200"
                                  : "border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-amber-400/40"
                              }`}
                            >
                              <input
                                type="radio"
                                name="preferredContactMethod"
                                value={opt.value}
                                checked={checked}
                                onChange={() => handleRadioChange(opt.value)}
                                className="sr-only"
                              />
                              <span
                                aria-hidden="true"
                                className={`h-2 w-2 shrink-0 rounded-full ${
                                  checked ? "bg-amber-400" : "bg-neutral-600"
                                }`}
                              />
                              {opt.label}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  </div>
                </FormGroup>

                <FormGroup title="Your project">
                  <SelectField
                    id="ventureOfInterest"
                    label={contactFormFields.ventureOfInterest.label}
                    value={formData.ventureOfInterest || ""}
                    onChange={handleInputChange}
                    options={contactFormFields.ventureOfInterest.options}
                    error={errors.ventureOfInterest}
                  />

                  <div>
                    <label htmlFor="projectDescription" className={labelClass}>
                      {contactFormFields.projectDescription.label}
                      <RequiredMark />
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      placeholder={contactFormFields.projectDescription.placeholder}
                      value={formData.projectDescription || ""}
                      onChange={handleInputChange}
                      rows={5}
                      aria-required="true"
                      aria-invalid={errors.projectDescription ? "true" : undefined}
                      aria-describedby={
                        errors.projectDescription ? "projectDescription-error" : undefined
                      }
                      className={`${fieldClass} ${borderFor(errors.projectDescription)} resize-none`}
                    />
                    {errors.projectDescription && (
                      <p
                        id="projectDescription-error"
                        role="alert"
                        className="mt-2 text-sm text-red-400"
                      >
                        {errors.projectDescription}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <SelectField
                      id="budgetRange"
                      label={contactFormFields.budgetRange.label}
                      value={formData.budgetRange || ""}
                      onChange={handleInputChange}
                      options={contactFormFields.budgetRange.options}
                      error={errors.budgetRange}
                    />

                    <SelectField
                      id="desiredTimeline"
                      label={contactFormFields.desiredTimeline.label}
                      value={formData.desiredTimeline || ""}
                      onChange={handleInputChange}
                      options={contactFormFields.desiredTimeline.options}
                      error={errors.desiredTimeline}
                    />

                    <div>
                      <label htmlFor="howHeardAboutUs" className={labelClass}>
                        {contactFormFields.howHeardAboutUs.label}
                        <RequiredMark />
                      </label>
                      <input
                        type="text"
                        id="howHeardAboutUs"
                        name="howHeardAboutUs"
                        placeholder={contactFormFields.howHeardAboutUs.placeholder}
                        maxLength={contactFormFields.howHeardAboutUs.validation.maxLength}
                        value={formData.howHeardAboutUs || ""}
                        onChange={handleInputChange}
                        aria-required="true"
                        aria-invalid={errors.howHeardAboutUs ? "true" : undefined}
                        aria-describedby={
                          errors.howHeardAboutUs ? "howHeardAboutUs-error" : undefined
                        }
                        className={`${fieldClass} ${borderFor(errors.howHeardAboutUs)}`}
                      />
                      {errors.howHeardAboutUs && (
                        <p
                          id="howHeardAboutUs-error"
                          role="alert"
                          className="mt-2 text-sm text-red-400"
                        >
                          {errors.howHeardAboutUs}
                        </p>
                      )}
                    </div>
                  </div>
                </FormGroup>

                {/* Honeypot. Off-screen with a real label rather than
                    `display: none`, matching the other three forms: a bot that
                    skips hidden inputs walks past the first and fills the
                    second. The POST body still sends it as `honeypot`, which is
                    the key /api/contact checks. */}
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor="contact-website-ext">Leave this field empty</label>
                  <input
                    id="contact-website-ext"
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="h-4 w-4" aria-hidden="true" />}
                  </button>

                  <p className="mt-4 text-center text-sm text-neutral-400">
                    We&apos;ll respond to your inquiry as soon as possible. Thank you for choosing Lee Enterprises Unlimited.
                  </p>
                </div>
              </form>
            </GlassCardPadded>
          )}
        </div>
      </div>
    </section>
  );
}
