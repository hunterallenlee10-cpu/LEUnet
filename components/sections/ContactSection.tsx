"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Send } from "lucide-react";
import { contactFormFields, buildMailtoLink } from "@/data/contact";
import { ContactFormData } from "@/types";
import { sectionIds } from "@/data/navigation";
import { GlassCardPadded } from "@/components/cards/GlassCard";

export function ContactSection() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    preferredContactMethod: "email",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get selected venture from session storage
  useEffect(() => {
    const selectedVenture = sessionStorage.getItem("selectedVenture");
    if (selectedVenture && selectedVenture !== "other") {
      setFormData((prev) => ({ ...prev, ventureOfInterest: selectedVenture }));
    }
  }, []);

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

    // Phone validation
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-().+]+$/.test(formData.phone) || formData.phone.length < 10) {
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

    // How heard about us validation
    if (!formData.howHeardAboutUs) {
      newErrors.howHeardAboutUs = "Please let us know how you heard about us";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Build mailto link and open it
    const mailtoLink = buildMailtoLink(formData as Record<string, string>);
    window.location.href = mailtoLink;

    // Show success message
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        preferredContactMethod: "email",
      });
    }, 3000);

    setIsSubmitting(false);
  };

  return (
    <section
      id={sectionIds.contact}
      className="relative py-20 md:py-32 bg-neutral-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="heading-lg text-white mb-4">Get In Touch</h2>
            <p className="text-lg text-neutral-400">
              Tell us about your project, and let&apos;s discuss how we can help you achieve your goals.
            </p>
          </div>

          {/* Form */}
          <GlassCardPadded
            size="lg"
            glassOpacity="bg-white/5"
            borderColor="border-white/10"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-neutral-400">
                  Your email client has opened. Please complete the submission to send your inquiry to us.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name & Email - Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      {contactFormFields.fullName.label}
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder={contactFormFields.fullName.placeholder}
                      value={formData.fullName || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      {contactFormFields.email.label}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={contactFormFields.email.placeholder}
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Venture - Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      {contactFormFields.phone.label}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder={contactFormFields.phone.placeholder}
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="ventureOfInterest"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      {contactFormFields.ventureOfInterest.label}
                    </label>
                    <select
                      id="ventureOfInterest"
                      name="ventureOfInterest"
                      value={formData.ventureOfInterest || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all appearance-none cursor-pointer"
                    >
                      {contactFormFields.ventureOfInterest.options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-neutral-900">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.ventureOfInterest && (
                      <p className="text-red-400 text-sm mt-1">{errors.ventureOfInterest}</p>
                    )}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label
                    htmlFor="projectDescription"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    {contactFormFields.projectDescription.label}
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    placeholder={contactFormFields.projectDescription.placeholder}
                    value={formData.projectDescription || ""}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all resize-none"
                  />
                  {errors.projectDescription && (
                    <p className="text-red-400 text-sm mt-1">{errors.projectDescription}</p>
                  )}
                </div>

                {/* Budget, Timeline, How Heard - Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="budgetRange"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      {contactFormFields.budgetRange.label}
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all appearance-none cursor-pointer"
                    >
                      {contactFormFields.budgetRange.options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-neutral-900">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.budgetRange && (
                      <p className="text-red-400 text-sm mt-1">{errors.budgetRange}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="desiredTimeline"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      {contactFormFields.desiredTimeline.label}
                    </label>
                    <select
                      id="desiredTimeline"
                      name="desiredTimeline"
                      value={formData.desiredTimeline || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all appearance-none cursor-pointer"
                    >
                      {contactFormFields.desiredTimeline.options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-neutral-900">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.desiredTimeline && (
                      <p className="text-red-400 text-sm mt-1">{errors.desiredTimeline}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="howHeardAboutUs"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      {contactFormFields.howHeardAboutUs.label}
                    </label>
                    <select
                      id="howHeardAboutUs"
                      name="howHeardAboutUs"
                      value={formData.howHeardAboutUs || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all appearance-none cursor-pointer"
                    >
                      {contactFormFields.howHeardAboutUs.options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-neutral-900">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.howHeardAboutUs && (
                      <p className="text-red-400 text-sm mt-1">{errors.howHeardAboutUs}</p>
                    )}
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    {contactFormFields.preferredContactMethod.label}
                  </label>
                  <div className="flex gap-6">
                    {contactFormFields.preferredContactMethod.options.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContactMethod"
                          value={opt.value}
                          checked={formData.preferredContactMethod === opt.value}
                          onChange={() => handleRadioChange(opt.value)}
                          className="w-4 h-4 accent-amber-400"
                        />
                        <span className="text-white">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Helper text */}
                <p className="text-center text-sm text-neutral-400 mt-4">
                  We&apos;ll respond to your inquiry as soon as possible. Thank you for choosing Lee Enterprises Unlimited.
                </p>
              </form>
            )}
          </GlassCardPadded>
        </div>
      </div>
    </section>
  );
}
