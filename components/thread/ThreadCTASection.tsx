import { ArrowRight } from "lucide-react";
import { THREAD_PALETTE, THREAD_CONTACT_EMAIL, threadCopy } from "@/data/thread";
import { ThreadReveal } from "@/components/thread/ThreadReveal";
import {
  ThreadSection,
  threadPrimaryButtonClass,
  threadSecondaryButtonClass,
} from "@/components/thread/ThreadUI";

const { finalCta } = threadCopy;

export function ThreadCTASection() {
  return (
    <ThreadSection>
      <ThreadReveal className="mx-auto max-w-2xl text-center">
        <h2 className="heading-lg" style={{ color: THREAD_PALETTE.bone }}>
          {finalCta.title}
        </h2>
        <p
          className="mt-5 text-lg leading-relaxed"
          style={{ color: THREAD_PALETTE.muted }}
        >
          {finalCta.description}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#order-request"
            className={threadPrimaryButtonClass}
          >
            {finalCta.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#catalog"
            className={threadSecondaryButtonClass}
          >
            {finalCta.secondaryCta}
          </a>
        </div>

        <p className="mt-8 text-sm" style={{ color: THREAD_PALETTE.muted }}>
          Prefer email?{" "}
          <a
            href={`mailto:${THREAD_CONTACT_EMAIL}`}
            className="underline underline-offset-4"
            style={{ color: THREAD_PALETTE.champagne }}
          >
            {THREAD_CONTACT_EMAIL}
          </a>
        </p>
      </ThreadReveal>
    </ThreadSection>
  );
}
