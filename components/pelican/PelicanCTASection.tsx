"use client";

import { ArrowRight, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { Venture } from "@/types";

interface PelicanCTASectionProps {
  venture: Venture;
}

export function PelicanCTASection({ venture }: PelicanCTASectionProps) {
  return (
    <section className="py-20 md:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: venture.colors.primary }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: venture.colors.accent }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 justify-between">
          {/* Logo Section */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
            <div className="relative w-48 h-48">
              <Image
                src="/pelican/logo.png"
                alt="Pelican Power Wash mascot"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-3xl mx-auto text-center lg:text-left lg:w-2/3">
            {/* Headline */}
            <h2 className="heading-lg text-white mb-6">
              Ready to Transform Your Property?
            </h2>

          {/* Subheading */}
          <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
            Get professional exterior cleaning services that deliver exceptional
            results. Schedule your free consultation and quote today.
          </p>

          {/* Primary CTA */}
          <button
            onClick={() => {
              window.location.href = "/#contact-section";
            }}
            className="inline-flex items-center gap-2 px-10 py-4 bg-cyan-400 text-neutral-950 rounded-lg font-bold hover:bg-cyan-300 transition-all duration-200 transform hover:scale-105 active:scale-95 mb-8 group"
          >
            Get Your Free Quote
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Contact Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-12 border-t border-neutral-800">
            <a
              href="tel:555-WASH-911"
              className="flex items-center justify-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300 group"
            >
              <Phone className="w-5 h-5 text-cyan-400" />
              <div className="text-left">
                <p className="text-xs text-neutral-400">Call us</p>
                <p className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                  555-WASH-911
                </p>
              </div>
            </a>

            <a
              href="mailto:info@pelicanpowerash.com"
              className="flex items-center justify-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-cyan-400" />
              <div className="text-left">
                <p className="text-xs text-neutral-400">Email us</p>
                <p className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                  info@pelican.local
                </p>
              </div>
            </a>
          </div>

            {/* Trust Statement */}
            <p className="mt-8 text-neutral-400 text-sm">
              Free quote, no obligation. We&apos;re available 7 days a week.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
