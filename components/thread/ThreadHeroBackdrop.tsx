import { THREAD_PALETTE } from "@/data/thread";

/**
 * Candidate animated backdrops for the Thread hero.
 *
 * Why these exist as a set: the shipped backdrop was three blurred orbs, and
 * one of them drifted directly behind the wordmark. The logo PNG is a thin
 * serif outline in a near-bone grey (~#BCBBB7 measured off the artwork), so a
 * warm champagne haze behind it collapses the only contrast the mark has. Each
 * backdrop below therefore has to do two jobs, not one: look like premium
 * apparel, and leave the area behind the wordmark dark.
 *
 * `docs/THREAD.md` §2 rules out touching `globals.css` from this page, so every
 * keyframe here is declared in a scoped `<style>` alongside the markup that
 * uses it and prefixed `thread-` so it cannot collide with the global set.
 * Reduced motion is handled in the same block rather than relying on the global
 * rule at `globals.css:204`, which only matches `animation: hero-*` inline
 * styles.
 */

export type ThreadHeroBackdropId =
  | "current"
  | "stitch"
  | "weave"
  | "studio"
  | "strands"
  | "halftone";

/** Inline SVG as a CSS `url()`. Encoding is required — `#` and `<` are not
 *  legal raw in a data URI, and Safari rejects the whole declaration. */
const svgUrl = (svg: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}")`;

/**
 * Sits above the backdrop and below the content: pulls the area right behind
 * the wordmark back down to ink so the thin light strokes have something to
 * read against, and darkens the outer edges so the section has a centre.
 *
 * `x`/`y` are percentages of the section and locate the logo column, which is
 * the right half on `lg` and centred below it.
 */
function Scrim({ x = 72, y = 52 }: { x?: number; y?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: [
          // Behind the wordmark.
          `radial-gradient(46rem 34rem at ${x}% ${y}%, ${THREAD_PALETTE.ink}E6 0%, ${THREAD_PALETTE.ink}99 42%, transparent 72%)`,
          // Behind the copy. Without this, any backdrop with linework in it
          // draws lines straight through the paragraph — the texture reads as
          // strikethrough. Stops before the logo column so the two washes do
          // not stack into a flat black band across the middle.
          `linear-gradient(90deg, ${THREAD_PALETTE.ink}B3 0%, ${THREAD_PALETTE.ink}8C 32%, transparent 62%)`,
          // Edges.
          `radial-gradient(120% 120% at 50% 50%, transparent 45%, ${THREAD_PALETTE.ink}CC 100%)`,
        ].join(", "),
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// A. Stitch — travelling stitch lines and two live seams
// ---------------------------------------------------------------------------

const STITCH_TILE = svgUrl(`
  <svg xmlns='http://www.w3.org/2000/svg' width='40' height='64'>
    <g stroke='${THREAD_PALETTE.champagne}' stroke-width='1.1'
       stroke-dasharray='9 11' stroke-linecap='round'>
      <line x1='-4' y1='16' x2='44' y2='16'/>
      <line x1='-4' y1='48' x2='44' y2='48'/>
    </g>
  </svg>
`);

function StitchBackdrop() {
  return (
    <>
      <style>{`
        /* One tile width per cycle, so the dashes travel forever without a
           seam. Slow on purpose: this should read as thread being drawn, not
           as a marquee. */
        @keyframes thread-stitch-travel {
          from { background-position: 0 0; }
          to   { background-position: 40px 0; }
        }
        @keyframes thread-seam-draw {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -240; }
        }
        @media (prefers-reduced-motion: reduce) {
          .thread-bd-stitch *, .thread-bd-stitch { animation: none !important; }
        }
      `}</style>

      <div className="thread-bd-stitch absolute inset-0">
        {/* Rotated rather than drawn on the diagonal: horizontal dashes tile
            seamlessly, diagonal ones do not. The overscale hides the corners
            the rotation opens up. */}
        <div
          className="absolute -inset-1/4 opacity-[0.22]"
          style={{
            backgroundImage: STITCH_TILE,
            transform: "rotate(-14deg)",
            animation: "thread-stitch-travel 10s linear infinite",
            willChange: "background-position",
          }}
        />

        {/* Two garment seams at full width, each stitching at its own rate. */}
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 640"
          fill="none"
        >
          <path
            d="M0 168 Q 360 138 720 172 T 1440 150"
            stroke={THREAD_PALETTE.champagne}
            strokeOpacity="0.4"
            strokeWidth="1.4"
            strokeDasharray="14 12"
            strokeLinecap="round"
            style={{ animation: "thread-seam-draw 9s linear infinite" }}
          />
          <path
            d="M0 486 Q 420 522 780 480 T 1440 500"
            stroke={THREAD_PALETTE.bone}
            strokeOpacity="0.22"
            strokeWidth="1.2"
            strokeDasharray="10 14"
            strokeLinecap="round"
            style={{ animation: "thread-seam-draw 14s linear infinite reverse" }}
          />
        </svg>
      </div>

      <Scrim />
    </>
  );
}

// ---------------------------------------------------------------------------
// B. Weave — woven twill texture under a single overhead light
// ---------------------------------------------------------------------------

function WeaveBackdrop() {
  return (
    <>
      <style>{`
        /* The two weave layers drift on opposite diagonals at different rates.
           Neither is legible on its own — the moire where they cross is the
           effect, and it never repeats inside a visit. */
        @keyframes thread-weave-a {
          from { background-position: 0 0; }
          to   { background-position: 56px 56px; }
        }
        @keyframes thread-weave-b {
          from { background-position: 0 0; }
          to   { background-position: -44px 44px; }
        }
        @keyframes thread-overhead {
          0%, 100% { opacity: 0.55; transform: translateX(-50%) scale(1); }
          50%      { opacity: 0.75; transform: translateX(-50%) scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .thread-bd-weave *, .thread-bd-weave { animation: none !important; }
        }
      `}</style>

      <div className="thread-bd-weave absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${THREAD_PALETTE.bone}0F 0 1px, transparent 1px 7px)`,
            animation: "thread-weave-a 26s linear infinite",
            willChange: "background-position",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, ${THREAD_PALETTE.champagne}12 0 1px, transparent 1px 9px)`,
            animation: "thread-weave-b 34s linear infinite",
            willChange: "background-position",
          }}
        />

        {/* Light from above the frame, not from behind the mark. */}
        <div
          className="absolute left-1/2 h-[38rem] w-[70rem] rounded-[50%] blur-3xl"
          style={{
            top: "-22rem",
            backgroundColor: `${THREAD_PALETTE.champagne}2E`,
            animation: "thread-overhead 15s ease-in-out infinite",
            willChange: "opacity, transform",
          }}
        />
      </div>

      <Scrim />
    </>
  );
}

// ---------------------------------------------------------------------------
// C. Studio — editorial spotlight with film grain
// ---------------------------------------------------------------------------

const GRAIN = svgUrl(`
  <svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>
      <feColorMatrix type='saturate' values='0'/>
    </filter>
    <rect width='180' height='180' filter='url(#n)'/>
  </svg>
`);

function StudioBackdrop() {
  return (
    <>
      <style>{`
        @keyframes thread-spot-breathe {
          0%, 100% { opacity: 0.5;  transform: translateX(-50%) scaleY(1); }
          50%      { opacity: 0.68; transform: translateX(-50%) scaleY(1.08); }
        }
        /* Stepped, not eased: grain that slides continuously reads as a
           smeared texture. Jumping between eight positions reads as film. */
        @keyframes thread-grain-shift {
          0%   { transform: translate(0, 0); }
          20%  { transform: translate(-6%, 4%); }
          40%  { transform: translate(5%, -5%); }
          60%  { transform: translate(-4%, -6%); }
          80%  { transform: translate(6%, 5%); }
          100% { transform: translate(0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .thread-bd-studio *, .thread-bd-studio { animation: none !important; }
        }
      `}</style>

      <div className="thread-bd-studio absolute inset-0">
        {/* A single soft key light, cropped by the top of the section so the
            source stays off-frame the way a studio strobe would. */}
        <div
          className="absolute left-1/2 h-[52rem] w-[68rem] blur-3xl"
          style={{
            top: "-22rem",
            background: `radial-gradient(closest-side, ${THREAD_PALETTE.bone}59, ${THREAD_PALETTE.champagne}2E 55%, transparent 78%)`,
            animation: "thread-spot-breathe 17s ease-in-out infinite",
            willChange: "opacity, transform",
          }}
        />

        {/* Floor bounce. Much weaker than the key, and warm. */}
        <div
          className="absolute -bottom-40 left-1/4 h-[26rem] w-[44rem] rounded-[50%] blur-3xl"
          style={{ backgroundColor: `${THREAD_PALETTE.champagne}33` }}
        />

        <div
          className="absolute -inset-[10%] opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: GRAIN,
            animation: "thread-grain-shift 6s steps(1, end) infinite",
            willChange: "transform",
          }}
        />
      </div>

      <Scrim />
    </>
  );
}

// ---------------------------------------------------------------------------
// D. Strands — loose thread drawing itself across the frame
// ---------------------------------------------------------------------------

/** Each strand: path, colour, opacity, dash pattern, seconds, direction. The
 *  periods are deliberately co-prime-ish so the six never resynchronise. */
const STRANDS = [
  { d: "M-60 96 C 260 20, 520 210, 800 120 S 1300 40, 1520 150", c: THREAD_PALETTE.champagne, o: 0.5, dash: "420 620", s: 19 },
  { d: "M-60 250 C 300 150, 560 330, 900 240 S 1320 190, 1520 280", c: THREAD_PALETTE.bone, o: 0.24, dash: "300 740", s: 27 },
  { d: "M-60 372 C 240 470, 620 300, 940 400 S 1340 470, 1520 380", c: THREAD_PALETTE.champagne, o: 0.34, dash: "500 560", s: 23 },
  { d: "M-60 520 C 340 600, 660 430, 1000 520 S 1360 580, 1520 470", c: THREAD_PALETTE.bone, o: 0.18, dash: "360 700", s: 31 },
  { d: "M-60 44 C 380 130, 700 -30, 1040 60 S 1380 130, 1520 60", c: THREAD_PALETTE.champagne, o: 0.22, dash: "260 800", s: 37 },
  { d: "M-60 600 C 300 540, 640 660, 980 590 S 1380 520, 1520 600", c: THREAD_PALETTE.champagne, o: 0.2, dash: "340 720", s: 41 },
] as const;

function StrandsBackdrop() {
  return (
    <>
      <style>{`
        /* Total dash period per cycle. Every strand uses a pattern summing to
           1060 so one keyframe drives all six at different durations. */
        @keyframes thread-strand-draw {
          from { stroke-dashoffset: 1060; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes thread-strand-sway {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50%      { transform: translateY(-14px) scaleY(1.02); }
        }
        @media (prefers-reduced-motion: reduce) {
          .thread-bd-strands *, .thread-bd-strands { animation: none !important; }
        }
      `}</style>

      <div className="thread-bd-strands absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 640"
          fill="none"
          style={{ animation: "thread-strand-sway 24s ease-in-out infinite" }}
        >
          {STRANDS.map((strand, i) => (
            <path
              key={i}
              d={strand.d}
              stroke={strand.c}
              strokeOpacity={strand.o}
              strokeWidth={i % 2 === 0 ? 1.5 : 1}
              strokeLinecap="round"
              strokeDasharray={strand.dash}
              style={{
                animation: `thread-strand-draw ${strand.s}s linear infinite`,
              }}
            />
          ))}
        </svg>

        {/* One warm pool low and left, well clear of the wordmark, so the
            strands are not floating on flat black. */}
        <div
          className="absolute -bottom-32 left-0 h-[28rem] w-[42rem] rounded-[50%] blur-3xl"
          style={{ backgroundColor: `${THREAD_PALETTE.champagne}1A` }}
        />
      </div>

      <Scrim />
    </>
  );
}

// ---------------------------------------------------------------------------
// E. Halftone — screen-print dot field
// ---------------------------------------------------------------------------

/** A dot grid as a gradient rather than an SVG tile: `background-size` is
 *  animatable, which is what lets the dots breathe. */
const dots = (color: string, size: number, radius: number) => ({
  backgroundImage: `radial-gradient(${color} ${radius}px, transparent ${radius + 0.6}px)`,
  backgroundSize: `${size}px ${size}px`,
});

function HalftoneBackdrop() {
  return (
    <>
      <style>{`
        @keyframes thread-halftone-a {
          0%   { background-position: 0 0;       background-size: 15px 15px; }
          50%  { background-position: 15px 30px; background-size: 17px 17px; }
          100% { background-position: 30px 60px; background-size: 15px 15px; }
        }
        @keyframes thread-halftone-b {
          0%   { background-position: 0 0;         background-size: 23px 23px; }
          50%  { background-position: -23px 23px;  background-size: 21px 21px; }
          100% { background-position: -46px 46px;  background-size: 23px 23px; }
        }
        @keyframes thread-registration {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50%      { opacity: 0.7; transform: translateX(-50%) scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .thread-bd-halftone *, .thread-bd-halftone { animation: none !important; }
        }
      `}</style>

      <div className="thread-bd-halftone absolute inset-0">
        {/* Two screens at different pitches. Where they overlap they beat
            against each other, which is exactly the moire a real two-colour
            print shows when the screens are a few degrees out of
            registration — and it means the field never visibly loops. */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            ...dots(`${THREAD_PALETTE.champagne}`, 15, 1.1),
            animation: "thread-halftone-a 24s linear infinite",
            willChange: "background-position, background-size",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            ...dots(`${THREAD_PALETTE.bone}`, 23, 0.9),
            animation: "thread-halftone-b 31s linear infinite",
            willChange: "background-position, background-size",
          }}
        />

        <div
          className="absolute left-1/2 h-[36rem] w-[64rem] rounded-[50%] blur-3xl"
          style={{
            top: "-18rem",
            backgroundColor: `${THREAD_PALETTE.champagne}33`,
            animation: "thread-registration 16s ease-in-out infinite",
            willChange: "opacity, transform",
          }}
        />
      </div>

      <Scrim />
    </>
  );
}

// ---------------------------------------------------------------------------
// Current — the shipped three-orb wash, kept for side-by-side comparison
// ---------------------------------------------------------------------------

function CurrentBackdrop() {
  return (
    <>
      <div
        className="absolute -top-24 right-1/4"
        style={{ animation: "float-1 22s ease-in-out infinite" }}
      >
        <div
          className="h-96 w-96 rounded-full blur-3xl"
          style={{
            backgroundColor: `${THREAD_PALETTE.champagne}66`,
            animation: "hero-logo-aura 9s ease-in-out infinite",
          }}
        />
      </div>
      <div
        className="absolute bottom-0 left-1/5"
        style={{ animation: "float-2 29s ease-in-out infinite" }}
      >
        <div
          className="h-80 w-80 rounded-full blur-3xl"
          style={{
            backgroundColor: `${THREAD_PALETTE.bone}33`,
            animation: "hero-logo-aura 13s ease-in-out infinite",
          }}
        />
      </div>
      <div
        className="absolute left-1/2 top-1/3"
        style={{ animation: "float-3 36s ease-in-out infinite" }}
      >
        <div
          className="h-72 w-72 rounded-full blur-3xl"
          style={{
            backgroundColor: `${THREAD_PALETTE.champagne}44`,
            animation: "hero-logo-aura 17s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}

const BACKDROPS: Record<ThreadHeroBackdropId, () => React.ReactElement> = {
  current: CurrentBackdrop,
  stitch: StitchBackdrop,
  weave: WeaveBackdrop,
  studio: StudioBackdrop,
  strands: StrandsBackdrop,
  halftone: HalftoneBackdrop,
};

export const THREAD_BACKDROP_LABELS: Record<ThreadHeroBackdropId, string> = {
  current: "Current — three drifting orbs",
  stitch: "A · Stitch — travelling stitch lines and live seams",
  weave: "B · Weave — woven twill under one overhead light",
  studio: "C · Studio — editorial spotlight with film grain",
  strands: "D · Strands — loose thread drawing across the frame",
  halftone: "E · Halftone — screen-print dot field",
};

export function ThreadHeroBackdrop({
  variant,
}: {
  variant: ThreadHeroBackdropId;
}) {
  const Backdrop = BACKDROPS[variant] ?? CurrentBackdrop;
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Backdrop />
    </div>
  );
}
