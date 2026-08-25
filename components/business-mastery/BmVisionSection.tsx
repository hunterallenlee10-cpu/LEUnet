import { bmVision, bmVisionPoints } from "@/data/business-mastery";

/** Section 8 — where the three phases lead. Follows the Evolution section on
 * purpose: the phases describe how the network grows, this describes what it
 * grows into. */
export function BmVisionSection() {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Where This Is Going
          </p>
          <h2 className="heading-lg mb-4 text-white">{bmVision.heading}</h2>
          <p className="text-lg text-neutral-400">{bmVision.description}</p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bmVisionPoints.map((point, index) => (
            <div
              key={point.id}
              // Five cards on a three-column grid leaves a lonely pair; the
              // last card spanning full width closes the section instead.
              className={`rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 transition-colors duration-300 hover:border-amber-400/30 md:p-7 ${
                index === bmVisionPoints.length - 1
                  ? "sm:col-span-2 lg:col-span-3 lg:text-center"
                  : ""
              }`}
            >
              <h3 className="mb-2.5 text-lg font-bold text-white">
                {point.title}
              </h3>
              <p
                className={`leading-relaxed text-neutral-400 ${
                  index === bmVisionPoints.length - 1
                    ? "lg:mx-auto lg:max-w-2xl"
                    : ""
                }`}
              >
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
