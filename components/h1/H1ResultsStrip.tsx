import { H1_PALETTE, h1Results } from "@/data/h1";

/**
 * Every figure here is quoted from H1's own Strength & Conditioning document.
 * The qualifier below the grid is deliberate: these are individual athlete
 * results, not an average or a promise.
 */
export function H1ResultsStrip() {
  return (
    <section
      className="border-y py-14"
      style={{
        borderColor: H1_PALETTE.line,
        backgroundColor: H1_PALETTE.steel,
      }}
    >
      <div className="section-container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {h1Results.map((result) => (
            <div key={result.id} className="text-center">
              <div
                className="text-3xl font-bold tracking-tight md:text-4xl"
                style={{ color: H1_PALETTE.gold }}
              >
                {result.figure}
              </div>
              <div className="mt-2 text-sm font-semibold text-white">
                {result.label}
              </div>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: H1_PALETTE.muted }}
              >
                {result.detail}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed"
          style={{ color: H1_PALETTE.muted }}
        >
          Individual athlete results achieved in the H1 Performance program.
          Results vary with training age, consistency, and sport.
        </p>
      </div>
    </section>
  );
}
