import type { ReactNode } from "react";
import Link from "next/link";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystemsRoutes } from "@/data/lee-systems";
import { heroVslNiches, heroVslStats } from "@/data/hero-vsl";

/** The three fixes, one per crack in the pipe, top to bottom. */
const FIXES = ["AI call answering", "Instant follow-up", "CRM and intake"] as const;

/**
 * The headlines, a line per row. Wide screens set them in short lines beside
 * the film, tall ones in longer lines across the top; CSS shows the set that
 * fits and the engine moves its lines.
 */
const CAPTIONS: { wide: ReactNode[]; tall: ReactNode[]; sub?: string }[] = [
  {
    wide: [
      "Every missed lead",
      <>
        is <em>lost money</em>.
      </>,
    ],
    tall: [
      "Every missed lead",
      <>
        is <em>lost money</em>.
      </>,
    ],
  },
  {
    wide: [
      "Automations close",
      "every gap",
      <>
        <em>leads slip through</em>.
      </>,
    ],
    tall: [
      "Automations close every gap",
      <>
        <em>leads slip through</em>.
      </>,
    ],
  },
  {
    wide: [
      "AI-powered websites",
      <>
        send <em>even more leads</em>
      </>,
      "your way.",
    ],
    tall: [
      "AI-powered websites send",
      <>
        <em>even more leads</em> your way.
      </>,
    ],
    sub: "Built for you with speed.",
  },
];

/** A lucide icon's paths, drawn the way lucide draws them. */
function IconSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const PHONE_PATH =
  "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384";
const MESSAGE_PATH =
  "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z";
const USER_PATH =
  "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z";

/** The lines of one headline, each in a mask it rises out of. */
function CaptionLines({ lines, kind }: { lines: ReactNode[]; kind: "wide" | "tall" }) {
  return (
    <span className={`vt-lines vt-lines--${kind}`}>
      {lines.map((line, i) => (
        <span key={i} className="vt-m">
          <span className="vt-l">{line}</span>{" "}
        </span>
      ))}
    </span>
  );
}

/**
 * The homepage hero's animation: "The Vault", a real-time 3D film of what Lee
 * Systems Co. sets up, about 28 seconds long. Gold coins drop from a call, a
 * form and a text into a glass pipe and spill out of three cracks; gold
 * collars clamp each crack shut as the automations switch on, a website adds
 * a second stream, and the coins stack up in a glass vault for the end card:
 * the ribbon's figures, the headline and its two buttons.
 *
 * This is the film's words and buttons, rendered on the server and hidden
 * until its turn: the headlines, the running count, the labels at the
 * cracks, the three fix cards and the end card. heroVslEngine.ts draws the
 * 3D scene under them (three.js, in the browser only) and moves them, frame
 * by frame; heroVslPlayer.ts decides when it plays; HeroSection.tsx places
 * it over the hero's whole first screen. The styles are `.hero-vsl` and
 * `.vt-*` in app/globals.css. The amounts, the timing and each business
 * type's wording are in data/hero-vsl.ts; the words here are the general
 * version's, and the engine swaps in another's for a `?niche=` link.
 */
export function HeroVsl() {
  const niche = heroVslNiches.general;

  return (
    <div
      className="hero-vsl"
      data-hero-vsl
      role="region"
      aria-label="What Lee Systems Co. sets up, in 28 seconds"
      // Hidden and out of reach until the player brings it in.
      aria-hidden="true"
      inert
    >
      <div className="vt" data-vt data-orient="wide">
        {/* The engine puts its canvas here. */}
        <div className="vt-gl" aria-hidden="true" />

        {/* Everything over the film, laid out in the film's own units (1600
            x 900 on wide screens, 900 x 1125 on tall ones) and scaled to the
            screen by the engine. */}
        <div className="vt-ref">
          <div className="vt-shade" aria-hidden="true" />

          <ul className="sr-only">
            <li>
              AI call answering: An AI assistant that answers your business
              calls 24/7.
            </li>
            <li>
              Instant follow-up: Every new inquiry gets a reply in under a
              minute.
            </li>
            <li>
              CRM and intake: Lead and client details land in one place, with
              no retyping.
            </li>
            <li>
              Websites: Built to bring in leads, and fully built before you
              pay.
            </li>
          </ul>

          <div className="vt-caps">
            {CAPTIONS.map((cap, i) => (
              <p key={i} className="vt-cap">
                <CaptionLines lines={cap.wide} kind="wide" />
                <CaptionLines lines={cap.tall} kind="tall" />
                {cap.sub && <span className="vt-sub">{cap.sub}</span>}
              </p>
            ))}
          </div>

          {/* Money lost, then money recovered: the engine counts it. */}
          <div className="vt-count" data-mode="lost" aria-hidden="true">
            <i />
            <b>−$0</b>
            <span>lost</span>
          </div>

          {/* Each crack's label: what leaks from it, then the fix that seals
              it. */}
          {niche.gaps.map((gap, g) => (
            <div key={g} className="vt-lab" aria-hidden="true">
              <span className="vt-lab-p">{gap}</span>
              <span className="vt-lab-f">{FIXES[g]}</span>
            </div>
          ))}
          <div className="vt-tag vt-tag--web" aria-hidden="true">
            Websites
          </div>
          <div className="vt-tag vt-tag--bank" aria-hidden="true">
            Your business
            <br />
            bank account
          </div>

          {/* The fixes at work, each beside its crack as it seals. */}
          <div className="vt-card vt-card--call" aria-hidden="true">
            <div className="vt-card-h">
              <IconSvg>
                <path d={PHONE_PATH} />
              </IconSvg>
              {FIXES[0]}
              <span className="vt-live">Live</span>
            </div>
            <div className="vt-wave">
              {Array.from({ length: 18 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <p>{niche.call}</p>
          </div>
          <div className="vt-card vt-card--text" aria-hidden="true">
            <div className="vt-card-h">
              <IconSvg>
                <path d={MESSAGE_PATH} />
              </IconSvg>
              {FIXES[1]}
            </div>
            <p>
              <span className="vt-bubble">{niche.text}</span>
            </p>
            <div className="vt-meta">Sent 42 seconds after the inquiry</div>
          </div>
          <div className="vt-card vt-card--crm" aria-hidden="true">
            <div className="vt-card-h">
              <IconSvg>
                <path d={USER_PATH} />
              </IconSvg>
              {FIXES[2]}
            </div>
            <div className="vt-lead">{niche.lead}</div>
            <div className="vt-rows">
              <div className="vt-row">
                Phone<b>(301) 555-0142</b>
              </div>
              <div className="vt-row">
                Source<b>Phone call</b>
              </div>
              <div className="vt-row">
                Status
                <b>
                  <IconSvg>
                    <path d="M20 6 9 17l-5-5" />
                  </IconSvg>
                  Booked
                </b>
              </div>
            </div>
          </div>

          {/* The end card. */}
          <div className="vt-end">
            <ul className="vt-stats">
              {heroVslStats.map((stat, i) => (
                <li
                  key={stat.label}
                  className={i === 0 ? "vt-stat vt-stat--lead" : "vt-stat"}
                >
                  {stat.count ? (
                    <b>
                      <span className="sr-only">{stat.text}</span>
                      {/* The engine counts this up from zero, then the
                          suffix appears. */}
                      <span
                        className="vt-num"
                        aria-hidden="true"
                        data-count={stat.count.value}
                        data-prefix={stat.count.prefix}
                      >
                        {`${stat.count.prefix}${stat.count.value.toLocaleString("en-US")}`}
                      </span>
                      <span className="vt-plus" aria-hidden="true">
                        {stat.count.suffix}
                      </span>
                    </b>
                  ) : (
                    <b>{stat.text}</b>
                  )}
                  <span className="vt-stat-label">{stat.label}</span>
                </li>
              ))}
            </ul>
            <div className="vt-close">
              <p className="vt-headline">
                <span>We plug the leaks.</span>{" "}
                <span>You keep the money.</span>
              </p>
              <p className="vt-terms">One flat price. No revenue share.</p>
              {/* Out of reach until they show, near the end of the film. */}
              <div className="vt-ctas" inert>
                <BookCallLink variant="glow" />
                <Link
                  href={leeSystemsRoutes.home}
                  className="btn-ls-secondary inline-flex min-h-11 items-center justify-center text-center"
                >
                  Explore everything
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="vt-controls">
          <button type="button" className="vt-skip">
            Skip
            <IconSvg>
              <path d="M21 4v16" />
              <path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" />
            </IconSvg>
            <span className="sr-only"> to the end</span>
          </button>
          <button type="button" className="vt-toggle">
            <IconSvg>
              <path
                className="i-play"
                d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
              />
              <g className="i-pause">
                <rect x="14" y="3" width="5" height="18" rx="1" />
                <rect x="5" y="3" width="5" height="18" rx="1" />
              </g>
            </IconSvg>
            <span className="vt-toggle-label sr-only">Pause</span>
          </button>
        </div>
      </div>
    </div>
  );
}
