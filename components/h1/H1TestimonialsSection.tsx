import { Quote } from "lucide-react";
import { H1_PALETTE, h1Testimonials } from "@/data/h1";

/**
 * Renders nothing while `h1Testimonials` is empty, which it is on purpose.
 * An empty shell or a "testimonials coming soon" placeholder would both be
 * worse than the section simply not being there yet. Paste real quotes into
 * `data/h1.ts` and this appears with no other change.
 */
export function H1TestimonialsSection() {
  if (h1Testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className="border-y py-20 md:py-28"
      style={{
        borderColor: H1_PALETTE.line,
        backgroundColor: H1_PALETTE.steel,
      }}
    >
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span
            className="text-sm font-semibold tracking-widest"
            style={{ color: H1_PALETTE.gold }}
          >
            PLAYER TESTIMONIES
          </span>
          <h2 className="heading-lg mt-3 text-white">
            What H1 Athletes Say
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {h1Testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-xl border p-8"
              style={{
                borderColor: H1_PALETTE.line,
                backgroundColor: `${H1_PALETTE.chalk}05`,
              }}
            >
              <Quote
                className="mb-4 h-7 w-7"
                style={{ color: H1_PALETTE.gold }}
                aria-hidden="true"
              />
              <blockquote
                className="mb-6 flex-1 text-sm leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                {testimonial.quote}
              </blockquote>
              <figcaption>
                <div className="font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="text-xs" style={{ color: H1_PALETTE.muted }}>
                  {testimonial.detail}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
