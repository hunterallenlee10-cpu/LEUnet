import Image from "next/image";
import { Check } from "lucide-react";
import { H1_PALETTE, h1Coaches } from "@/data/h1";

/**
 * The two action photos are captioned as a pair rather than placed inside an
 * individual coach's card. The source flyer doesn't establish which player is
 * in which frame, and captioning one with the wrong name is worse than not
 * captioning it at all. Swap to per-coach portraits once that's confirmed.
 */
export function H1CoachesSection() {
  return (
    <section id="h1-coaches" className="py-20 md:py-28">
      <div className="section-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span
            className="text-sm font-semibold tracking-widest"
            style={{ color: H1_PALETTE.gold }}
          >
            MEET THE COACHES
          </span>
          <h2 className="heading-lg mb-4 mt-3 text-white">
            Coached by Athletes Still Competing
          </h2>
          <p className="text-lg" style={{ color: H1_PALETTE.muted }}>
            Hunter Lee and Aaron Wathen are former four-year varsity standouts
            and Leonardtown High School alumni who now compete together at St.
            Mary&apos;s College of Maryland. They bring high-level playing
            experience, energy, and a genuine focus on development to every
            athlete they work with.
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-5xl">
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: "/h1/athlete-swing.jpg", alt: "An H1 Performance coach at bat during a high school game" },
              { src: "/h1/athlete-field.jpg", alt: "An H1 Performance coach on the field during a college game" },
            ].map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/5] overflow-hidden rounded-xl border sm:aspect-[3/4]"
                style={{ borderColor: H1_PALETTE.line }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <p
            className="mt-3 text-center text-xs"
            style={{ color: H1_PALETTE.muted }}
          >
            H1 Performance founders Hunter Lee and Aaron Wathen in competition.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {h1Coaches.map((coach) => (
            <div
              key={coach.id}
              className="rounded-xl border p-8"
              style={{
                borderColor: H1_PALETTE.line,
                backgroundColor: `${H1_PALETTE.chalk}05`,
              }}
            >
              <h3 className="text-2xl font-bold text-white">{coach.name}</h3>
              <p
                className="mb-6 text-sm font-semibold tracking-wide"
                style={{ color: H1_PALETTE.gold }}
              >
                {coach.role}
              </p>
              <ul className="space-y-3">
                {coach.credentials.map((credential) => (
                  <li key={credential} className="flex gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: H1_PALETTE.gold }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: H1_PALETTE.muted }}
                    >
                      {credential}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed"
          style={{ color: H1_PALETTE.muted }}
        >
          Both coaches also teach the HLP (High Level Pattern) hitting system and
          are personally trained by certified HLP instructor Austin Guy, head
          coach at Leonardtown High School.
        </p>
      </div>
    </section>
  );
}
