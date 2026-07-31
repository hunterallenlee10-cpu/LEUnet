"use client";

import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";
import { H1_PALETTE, H1_PHONE, H1_PHONE_HREF } from "@/data/h1";

export function H1HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute -right-20 top-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ backgroundColor: `${H1_PALETTE.gold}14` }}
        />
        <div
          className="absolute -left-24 bottom-0 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: `${H1_PALETTE.chalk}0A` }}
        />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
              style={{
                borderColor: `${H1_PALETTE.gold}4D`,
                backgroundColor: `${H1_PALETTE.gold}14`,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: H1_PALETTE.gold }}
              />
              <span
                className="text-sm font-semibold tracking-wide"
                style={{ color: H1_PALETTE.gold }}
              >
                REMOTE STRENGTH &amp; CONDITIONING
              </span>
            </div>

            <h1 className="heading-xl mb-6 text-white">
              Train Harder.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${H1_PALETTE.gold}, ${H1_PALETTE.goldDeep})`,
                }}
              >
                Perform Higher.
              </span>
            </h1>

            <p
              className="mb-8 max-w-2xl text-lg leading-relaxed"
              style={{ color: H1_PALETTE.muted }}
            >
              If you&apos;re serious about becoming faster, stronger, and more
              confident than the athletes you compete against, this is where you
              lock it in. H1 Performance builds personalized programming around
              your sport, your goals, and the equipment you already have — with
              round-the-clock access to your coaches.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() =>
                  smoothScrollToElement("h1-consultation-form", { focus: true })
                }
                className="group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: H1_PALETTE.chalk,
                  color: H1_PALETTE.ink,
                }}
              >
                Book a Free Consultation
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={() => smoothScrollToElement("h1-pricing")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 font-semibold transition-colors duration-200"
                style={{ borderColor: H1_PALETTE.gold, color: H1_PALETTE.gold }}
              >
                See Packages
              </button>
            </div>

            <p className="mt-6 text-sm" style={{ color: H1_PALETTE.muted }}>
              All ages, all sports, trained remotely. Or reach Hunter directly at{" "}
              <a
                href={H1_PHONE_HREF}
                className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 transition-colors hover:underline"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {H1_PHONE}
              </a>
              .
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div
              className="absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{ backgroundColor: `${H1_PALETTE.gold}1F` }}
            />
            <Image
              src="/logos/h1-performance-white.png"
              alt="H1 Performance logo"
              width={520}
              height={520}
              priority
              className="h-auto w-full max-w-md object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
