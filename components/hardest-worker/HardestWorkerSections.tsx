import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  Gauge,
  MessageSquareText,
  PhoneCall,
  Send,
  TextCursorInput,
  type LucideIcon,
} from "lucide-react";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { FaqAccordion } from "@/components/lee-systems/FaqAccordion";
import { TrackCta } from "@/components/hardest-worker/TrackCta";
import {
  COPY,
  CTA_HREF,
  HOW_ANCHOR,
  breadcrumbs,
  faqItems,
  lastUpdatedText,
  type RankPart,
} from "@/data/hardest-worker";

/**
 * The sections of /hardest-worker-in-maryland, in page order: the hero, who
 * the hardest worker in Maryland is, the receipts (why), how this page is
 * built to rank, the method, the offer ("Want your business ranked higher
 * on Google?"), fair warning about rankings, who it's for, the FAQ and the
 * closing call. Every word comes from data/hardest-worker.ts.
 *
 * Every "Book a free call" goes to CTA_HREF and is wrapped in <TrackCta> so
 * Vercel Analytics records where it was clicked.
 *
 * Static on purpose: no reveal animations or count-ups. The only client code
 * is the click tracking, the FAQ accordion and the sticky bar on phones.
 */

/** The ids the sticky bar on phones watches (components/hardest-worker/StickyCta). */
export const HERO_CTA_ID = "hw-hero-cta";
export const FINAL_CTA_ID = "hw-final-cta";

const eyebrow = "svc-eyebrow";
const section = "border-t border-white/[0.06] py-16 md:py-24";
const card = "rounded-xl border border-white/10 bg-[var(--svc-surface)] light:bg-[#fff] light:shadow-[0_20px_50px_-24px_rgb(var(--ink)/0.18)]";
const textLink =
  "inline-flex min-h-11 items-center gap-1.5 rounded text-sm font-semibold text-brass-300 hover:text-brass-200";

function SectionHeader({
  id,
  kicker,
  title,
  lead,
  center = false,
}: {
  id: string;
  kicker: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-3xl md:mb-12 ${center ? "mx-auto text-center" : ""}`}>
      <p className={eyebrow}>{kicker}</p>
      <h2 id={id} className="heading-lg mt-4 text-balance text-white">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-neutral-300">{lead}</p>}
    </div>
  );
}

export function HardestWorkerHero() {
  const hero = COPY.hero;
  return (
    <section
      aria-labelledby="hw-title"
      className="relative isolate overflow-hidden pt-8 pb-14 md:pt-12 md:pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_70%_0%,rgb(var(--gold)/0.12),transparent_70%)]"
      />

      <nav aria-label="Breadcrumb" className="section-container relative z-10 mb-8 md:mb-10">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-400">
          {breadcrumbs.map((crumb, index) =>
            index === breadcrumbs.length - 1 ? (
              <li key={crumb.href}>
                <span aria-current="page" className="text-neutral-200">
                  {crumb.name}
                </span>
              </li>
            ) : (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <Link href={crumb.href} className="rounded hover:text-white">
                  {crumb.name}
                </Link>
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
              </li>
            )
          )}
        </ol>
      </nav>

      <div className="section-container relative z-10 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          {/* A div, not a <p>, so the answer below is the page's first
              paragraph. */}
          <div className={eyebrow}>{hero.eyebrow}</div>
          <h1 id="hw-title" className="heading-xl mt-5 text-balance text-white">
            {hero.h1}
          </h1>
          <p className="mt-6 text-2xl font-semibold text-white md:text-3xl">{hero.answer}</p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-300">{hero.sub}</p>
          <div id={HERO_CTA_ID} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <TrackCta location="hero">
              <BookCallLink href={CTA_HREF} variant="glow" arrow className="w-full sm:w-auto" />
            </TrackCta>
            <a
              href={`#${HOW_ANCHOR}`}
              className="btn-ls-secondary inline-flex min-h-11 w-full items-center justify-center gap-2 sm:w-auto"
            >
              {hero.secondaryCta}
            </a>
          </div>
          <a
            href={hero.googleUrl}
            target="_blank"
            rel="noopener nofollow"
            className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded text-sm font-semibold text-neutral-300 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
          >
            {hero.googleLabel}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <HeroBadge />
      </div>
    </section>
  );
}

/**
 * The hero's badge (no photo on this page, the owner's call): a huge "#1"
 * on a faint grid with its caption under it. Wide and short on phones,
 * square from `sm` up, a fixed aspect ratio either way so nothing shifts.
 * Screen readers get the line in words.
 */
function HeroBadge() {
  const hero = COPY.hero;
  return (
    <div className="relative mx-auto flex aspect-[5/3] w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-3xl border border-brass-400/25 bg-[var(--svc-surface)] light:bg-[#fff] light:shadow-[0_20px_50px_-24px_rgb(var(--ink)/0.18)] sm:aspect-square">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgb(var(--gold)/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--gold)/0.07)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(circle_at_center,black_35%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgb(var(--gold)/0.16),transparent_60%)]"
      />
      <span
        aria-hidden="true"
        className="relative select-none text-[6.5rem] leading-none font-black tracking-tighter text-brass-400 sm:text-[10rem] lg:text-[11rem]"
      >
        {hero.mark}
      </span>
      <span
        aria-hidden="true"
        className="relative mt-2 text-center text-base font-semibold text-white sm:mt-4 sm:text-lg"
      >
        {hero.markCaption}
      </span>
      <span className="sr-only">{hero.markSrText}</span>
    </div>
  );
}

export function HardestWorkerWho() {
  const who = COPY.who;
  return (
    <section aria-labelledby="hw-who-title" className={section}>
      <div className="section-container">
        <div className="max-w-3xl">
          <p className={eyebrow}>{who.eyebrow}</p>
          <h2 id="hw-who-title" className="heading-lg mt-4 text-balance text-white">
            {who.h2}
          </h2>
          {who.body.map((line) => (
            <p key={line} className="mt-4 text-lg leading-relaxed text-neutral-300">
              {line}
            </p>
          ))}
          <p className="mt-8 border-l-2 border-brass-400 pl-6 text-xl font-semibold leading-snug text-white md:text-2xl">
            {who.bridge}
          </p>
        </div>
      </div>
    </section>
  );
}

export function HardestWorkerWhy() {
  const why = COPY.why;
  return (
    <section aria-labelledby="hw-why-title" className={section}>
      <div className="section-container">
        <SectionHeader id="hw-why-title" kicker={why.eyebrow} title={why.h2} lead={why.lead} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item) => (
            <li key={item.title} className={`${card} flex flex-col p-6`}>
              <Check aria-hidden="true" className="h-5 w-5 text-brass-400" />
              <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-neutral-300">{item.body}</p>
              {item.link && (
                <a href={item.link.href} className={`${textLink} mt-2`}>
                  {item.link.label}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Each "How this page is built to rank" card's icon. */
const RANK_ICONS: Record<RankPart["icon"], LucideIcon> = {
  words: TextCursorInput,
  answer: MessageSquareText,
  schema: Braces,
  speed: Gauge,
  index: Send,
  calls: PhoneCall,
};

export function HardestWorkerHow() {
  const how = COPY.how;
  return (
    <section id={HOW_ANCHOR} aria-labelledby="hw-how-title" className={`${section} scroll-mt-24`}>
      <div className="section-container">
        <SectionHeader id="hw-how-title" kicker={how.eyebrow} title={how.h2} lead={how.lead} />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {how.parts.map((part) => {
            const Icon = RANK_ICONS[part.icon];
            return (
              <li key={part.title} className={`${card} flex flex-col p-6`}>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brass-400/30 bg-brass-400/10">
                  <Icon aria-hidden="true" className="h-5 w-5 text-brass-300" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{part.title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-300">{part.body}</p>
              </li>
            );
          })}
        </ul>

        <div className={`${card} mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between`}>
          <div>
            <p className="text-xl font-bold text-white">{how.checkTitle}</p>
            <p className="mt-1 text-neutral-300">{how.checkBody}</p>
          </div>
          <a
            href={how.checkUrl}
            target="_blank"
            rel="noopener nofollow"
            className="btn-ls-secondary inline-flex min-h-11 shrink-0 items-center justify-center gap-2"
          >
            {how.checkLabel}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function HardestWorkerMethod() {
  const method = COPY.method;
  return (
    <section aria-labelledby="hw-method-title" className={section}>
      <div className="section-container">
        <SectionHeader id="hw-method-title" kicker={method.eyebrow} title={method.h2} lead={method.body} />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {method.steps.map((step, index) => (
            <li key={step.title} className={`${card} flex flex-col p-6`}>
              <span aria-hidden="true" className="text-3xl font-bold tracking-tight text-brass-300/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-bold text-white">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-300">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HardestWorkerOffer() {
  const offer = COPY.offer;
  return (
    <section aria-labelledby="hw-offer-title" className={section}>
      <div className="section-container">
        <div className="relative isolate overflow-hidden rounded-2xl border border-brass-400/25 bg-[var(--svc-surface)] light:bg-[#fff] light:shadow-[0_20px_50px_-24px_rgb(var(--ink)/0.18)] p-6 sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_0%_0%,rgb(var(--gold)/0.12),transparent_70%)]"
          />
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <p className={eyebrow}>{offer.eyebrow}</p>
              <h2 id="hw-offer-title" className="heading-lg mt-4 text-balance text-white">
                {offer.h2}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-300">{offer.lead}</p>

              <h3 className="mt-8 text-sm font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                {offer.includedTitle}
              </h3>
              <ul className="mt-4 space-y-4">
                {offer.included.map((item) => (
                  <li key={item.href} className="flex gap-3">
                    <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brass-400" />
                    <span>
                      <span className="block text-white">{item.text}</span>
                      <Link
                        href={item.href}
                        className="mt-0.5 inline-flex items-center gap-1 rounded text-sm text-neutral-400 underline decoration-white/20 underline-offset-4 hover:text-white"
                      >
                        {item.service}
                      </Link>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-white/10 bg-neutral-950/60 p-6">
                <p className="text-xl font-bold text-white">{offer.pricing}</p>
                <p className="mt-2 text-neutral-300">{offer.builtFor}</p>
                <TrackCta location="offer">
                  <BookCallLink href={CTA_HREF} variant="glow" arrow className="mt-6 w-full" />
                </TrackCta>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                  {offer.receiptsTitle}
                </h3>
                <ul className="mt-4 grid grid-cols-3 gap-3">
                  {offer.receipts.map((stat) => (
                    <li key={stat.label}>
                      <span className="block text-xl font-bold tracking-tight text-brass-300 sm:text-2xl">
                        {stat.value}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-neutral-300 sm:text-sm">
                        {stat.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HardestWorkerExpectations() {
  const expectations = COPY.expectations;
  return (
    <section aria-labelledby="hw-expect-title" className="pb-16 md:pb-24">
      <div className="section-container">
        <div className="max-w-3xl border-l-2 border-brass-400 pl-6">
          <p className={eyebrow}>{expectations.eyebrow}</p>
          <h2 id="hw-expect-title" className="mt-3 text-2xl font-bold text-white md:text-3xl">
            {expectations.h2}
          </h2>
          {expectations.body.map((line) => (
            <p key={line} className="mt-3 text-lg leading-relaxed text-neutral-300">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HardestWorkerForWho() {
  const forWho = COPY.forWho;
  return (
    <section aria-labelledby="hw-for-title" className={section}>
      <div className="section-container">
        <SectionHeader id="hw-for-title" kicker={forWho.eyebrow} title={forWho.h2} lead={forWho.lead} />
        <ul className="flex flex-wrap gap-3">
          {forWho.examples.map((example) => (
            <li
              key={example}
              className="rounded-full border border-white/15 bg-[var(--svc-surface)] px-4 py-2 font-semibold text-white light:bg-[#fff]"
            >
              {example}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HardestWorkerFaq() {
  return (
    <section aria-labelledby="hw-faq-title" className={section}>
      <div className="section-container">
        <SectionHeader id="hw-faq-title" kicker={COPY.faq.eyebrow} title={COPY.faq.h2} center />
        <FaqAccordion items={faqItems()} idPrefix="hw-faq" chevronClassName="text-brass-400" />
      </div>
    </section>
  );
}

export function HardestWorkerCta() {
  return (
    <section id={FINAL_CTA_ID} aria-labelledby="hw-cta-title" className="py-16 md:py-20">
      <div className="section-container">
        <div className="relative isolate overflow-hidden rounded-2xl border border-brass-400/25 bg-[var(--svc-surface)] light:bg-[#fff] light:shadow-[0_20px_50px_-24px_rgb(var(--ink)/0.18)] px-6 py-12 text-center sm:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_50%_0%,rgb(var(--gold)/0.14),transparent_70%)]"
          />
          <h2 id="hw-cta-title" className="heading-lg mx-auto max-w-3xl text-balance text-white">
            {COPY.cta.h2}
          </h2>
          <TrackCta location="final">
            <BookCallLink href={CTA_HREF} variant="glow" arrow className="mt-8 w-full sm:w-auto" />
          </TrackCta>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-neutral-300">{COPY.cta.sub}</p>
        </div>
        <p className="mt-10 text-center text-sm text-neutral-400">{lastUpdatedText}</p>
      </div>
    </section>
  );
}
