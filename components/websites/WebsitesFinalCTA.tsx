"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { smoothScrollToElement } from "@/lib/scrollUtils";

export function WebsitesFinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="section-container text-center">
        {/* Named here, unlike the hero: no adjacent text identifies the brand. */}
        <Image
          src="/lee-marketing-mastery-logo.png"
          alt="Lee Marketing Mastery"
          width={80}
          height={80}
          loading="lazy"
          className="mx-auto mb-8 h-20 w-20 rounded-full"
        />
        <h2 className="heading-lg mx-auto mb-6 max-w-3xl text-white">
          Your Next Customer Is Going to Look You Up First.
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300">
          Make sure what they find is worth the search. Get a quote for a
          professional site built in a fraction of the usual time.
        </p>

        <button
          onClick={() =>
            smoothScrollToElement("website-inquiry-form", { focus: true })
          }
          className="btn-primary inline-flex items-center justify-center gap-2 group"
        >
          Get a Free Website Quote
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>

        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link
            href="/lee-marketing-mastery"
            className="text-sm font-semibold text-neutral-400 underline-offset-4 transition-colors hover:text-amber-400 hover:underline"
          >
            Back to Lee Marketing Mastery
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-neutral-400 underline-offset-4 transition-colors hover:text-amber-400 hover:underline"
          >
            Return to Lee Enterprises Unlimited
          </Link>
        </p>
      </div>
    </section>
  );
}
