import { site } from "@/data/site";

/**
 * How working with Lee Systems Co. starts, from the first contact to a
 * finished system. The first three steps cost nothing; the fourth happens only
 * if the owner decides to go ahead. It replaced the free Automation Audit's
 * steps (and its written plan) on 2026-09-28, at the owner's request.
 */
const steps = [
  {
    number: "01",
    title: "Tell us what eats your time",
    body: site.replyTime
      ? `Book a free call, or fill in the short form below and we'll reply ${site.replyTime} to set one up.`
      : "Book a free call, or fill in the short form below and we'll get back to you to set one up.",
  },
  {
    number: "02",
    title: "We walk through your process",
    body: "A free consultation call: how calls and leads come in, what happens next, and where things get dropped or retyped.",
  },
  {
    number: "03",
    title: "You get a flat quote up front",
    body: "One price for what's worth automating. No hidden fees, no revenue share and no required ad spend.",
  },
  {
    number: "04",
    title: "We build it, if you want us to",
    body: "No obligation. If you go ahead, you choose the contract terms, and we build, test and launch each system, then show your team how it works.",
  },
];

export function AutomationProcessSection() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold text-brass-300">How it works</p>
          <h2 className="heading-lg mb-6 text-white">
            A free call, then a flat quote
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            There&apos;s no obligation to hire us after the call.
          </p>
        </div>

        <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-brass-400/30 to-transparent lg:block"
          />

          {steps.map(({ number, title, body }) => (
            <li key={number} className="relative">
              <span className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-brass-400/40 bg-neutral-950 font-mono text-sm font-bold text-brass-300">
                {number}
              </span>
              <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
