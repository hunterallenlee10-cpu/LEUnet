import { LmmMark } from "@/components/lmm/LmmMark";

const steps = [
  {
    number: "01",
    title: "Identify the Bottleneck",
    body: "We examine the manual tasks, missed opportunities, disconnected information, and repetitive processes slowing down the business.",
  },
  {
    number: "02",
    title: "Design the Workflow",
    body: "We map the ideal process, required information, decision points, platforms, triggers, and desired outcomes.",
  },
  {
    number: "03",
    title: "Build and Test the System",
    body: "We develop the automation, connect the necessary tools, test each workflow, and confirm that information moves correctly.",
  },
  {
    number: "04",
    title: "Launch and Improve",
    body: "We implement the system, explain how it works, monitor performance, and identify future opportunities for improvement.",
  },
];

export function LmmProcessSection() {
  return (
    <section className="border-y border-white/10 bg-neutral-950/60 py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          {/* The mark sits inside the eyebrow row rather than above it so the
              two read as one line of brand furniture, not as two stacked
              headings competing with the h2 below. */}
          <p className="mb-3 flex items-center justify-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-amber-400">
            <LmmMark />
            How the Systems Work
          </p>
          <h2 className="heading-lg text-white">
            From Repetitive Process to Reliable System
          </h2>
        </div>

        <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting rail, drawn behind the cards on wide screens only */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent lg:block"
          />

          {steps.map(({ number, title, body }) => (
            <li key={number} className="relative">
              <span className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/40 bg-neutral-950 font-mono text-sm font-bold text-amber-400">
                {number}
              </span>
              <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{body}</p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-14 max-w-2xl text-center text-sm text-neutral-500">
          Timelines depend on the complexity of the workflow and the testing each
          system requires. Reliability matters more than speed.
        </p>
      </div>
    </section>
  );
}
