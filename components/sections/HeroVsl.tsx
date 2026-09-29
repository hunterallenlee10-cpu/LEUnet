import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { leeSystemsLinks } from "@/data/lee-systems";
import { heroVslNiches, heroVslStats } from "@/data/hero-vsl";

/** The flashes that burst as each gap seals and as the pipe lands in the bank,
 *  in the hologram's own 480 x 540 units. */
const BURSTS = [
  [221, 166],
  [259, 234],
  [221, 302],
  [240, 357],
] as const;

/** Coins in play at once: the engine lends each coin in the stream one of
 *  these, and skips a coin if none is free. */
const COINS = 24;

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

/**
 * The homepage hero's animation: a hologram of what Lee Systems Co. sets up,
 * about 30 seconds long. Coins stream down a pipe from a call, a form and a
 * text; three gaps leak them until the automations switch on and seal each
 * one, a website adds a stream of its own, and it all folds into the bank for
 * the end card: the ribbon's figures, the promise and the links.
 *
 * This is the markup and the copy, rendered on the server and hidden until
 * its turn. heroVslEngine.ts moves it (a GSAP timeline) and heroVslPlayer.ts
 * decides when it plays; HeroSection.tsx places it in the hero's first
 * screen. The styles are `.hero-vsl`, `.holo-*` and `.hv-*` in
 * app/globals.css. The amounts, the timing and each business type's wording
 * are in data/hero-vsl.ts; the words here are the general version's, and the
 * engine swaps in another's for a `?niche=` link.
 */
export function HeroVsl() {
  const niche = heroVslNiches.general;

  return (
    <div
      className="hero-vsl"
      data-hero-vsl
      role="region"
      aria-label="What Lee Systems Co. sets up, in 30 seconds"
      // Hidden and out of reach until the player brings it in.
      aria-hidden="true"
      inert
    >
      <div className="holo" data-holo>
        <div className="holo-anim">
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

          <div className="holo-stage" data-scene="end">
            <div className="holo-visual">
              <div className="holo-box">
                <div className="holo-art" aria-hidden="true">
                  <div className="holo-cone">
                    <div className="holo-scan" />
                  </div>
                  <div className="holo-cone-boost" />
                  <div className="holo-base-glow" />
                  <canvas className="holo-dust" />

                  <div className="holo-layer holo-layer--under">
                    <div className="holo-meterbox">
                      <div className="holo-bank-glow" />
                      <div className="holo-vault">
                        <div className="holo-vault-fill" />
                      </div>
                      <div className="holo-vault-line" />
                      <div className="holo-medal-glow" />
                    </div>
                  </div>

                  <div className="holo-lines">
                    <HologramLines />
                  </div>

                  <div className="holo-layer holo-layer--over">
                    <div className="holo-pipe-glow" />
                    <div className="holo-pulse" />
                    {BURSTS.map(([left, top]) => (
                      <div
                        key={`flash-${left}-${top}`}
                        className="holo-flash"
                        style={{ left, top }}
                      />
                    ))}
                    {BURSTS.map(([left, top]) => (
                      <div
                        key={`ring-${left}-${top}`}
                        className="holo-ring"
                        style={{ left, top }}
                      />
                    ))}
                    <div className="holo-bank-flash" />
                    <div className="holo-lift" />
                  </div>

                  <div className="holo-coins">
                    {Array.from({ length: COINS }, (_, i) => (
                      <span key={i} className="holo-coin" />
                    ))}
                  </div>

                  <div className="holo-wordmark-wrap">
                    <p className="holo-wordmark">LEE SYSTEMS CO.</p>
                  </div>
                  {/* Each gap's label: what leaks from it, then the fix that
                      seals it. `--yb` is the gap's height in the drawing. */}
                  <p
                    className="holo-tag holo-tag--l holo-tag--top"
                    style={{ "--yb": "27.04%" } as CSSProperties}
                  >
                    <span className="is-problem">{niche.gaps[0]}</span>
                    <span className="is-fix">AI call answering</span>
                  </p>
                  <p
                    className="holo-tag holo-tag--r"
                    style={{ "--yb": "39.63%" } as CSSProperties}
                  >
                    <span className="is-problem">{niche.gaps[1]}</span>
                    <span className="is-fix">Instant follow-up</span>
                  </p>
                  <p
                    className="holo-tag holo-tag--l"
                    style={{ "--yb": "52.22%" } as CSSProperties}
                  >
                    <span className="is-problem">{niche.gaps[2]}</span>
                    <span className="is-fix">CRM and intake</span>
                  </p>
                  <p className="holo-tag holo-tag--web">
                    <span className="holo-tag-in">Websites</span>
                  </p>
                  <p className="holo-tag holo-tag--bank">
                    <span className="holo-tag-in">
                      Your business
                      <br />
                      bank account
                    </span>
                  </p>

                  <div className="holo-counter-pos">
                    <div className="holo-counter" data-mode="lost">
                      <span className="holo-counter-dot" />
                      <span>
                        <span className="holo-counter-n">−$0</span>{" "}
                        <span className="holo-counter-word">lost</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="holo-caps">
              <p className="holo-cap">
                Missed leads are missed <em>money</em>.
              </p>
              <p className="holo-cap">
                Automations close every gap <em>leads slip through</em>.
              </p>
              <p className="holo-cap">
                <span className="holo-cap-a">
                  <span className="holo-nb">AI-powered</span> websites send{" "}
                  <em>even more leads</em> your way.
                </span>{" "}
                <span className="holo-cap-b">Built for you with speed.</span>
              </p>
            </div>

            <div aria-hidden="true" className="holo-pop holo-pop--call">
              <IconSvg>
                <path d={PHONE_PATH} />
              </IconSvg>
              <span data-niche="call">{niche.call}</span>
            </div>
            <div aria-hidden="true" className="holo-pop holo-pop--text">
              <IconSvg>
                <path d={MESSAGE_PATH} />
              </IconSvg>
              <span data-niche="text">{niche.text}</span>
            </div>
            <div aria-hidden="true" className="holo-pop holo-pop--list">
              <div className="holo-list">
                <div className="holo-list-card">
                  <span className="holo-list-dot" />
                  <span data-niche="lead">{niche.lead}</span>
                </div>
                <div className="holo-list-row">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>

            <div className="holo-end">
              <div className="holo-results">
                <ul className="holo-stats">
                  {heroVslStats.map((stat, i) => (
                    <li
                      key={stat.label}
                      className={
                        i === 0 ? "holo-stat holo-stat--lead" : "holo-stat"
                      }
                    >
                      {stat.count ? (
                        <b>
                          <span className="sr-only">{stat.text}</span>
                          {/* The engine counts this up from zero, then the
                              suffix appears. */}
                          <span
                            className="holo-num"
                            aria-hidden="true"
                            data-count={stat.count.value}
                            data-prefix={stat.count.prefix}
                          >
                            {`${stat.count.prefix}${stat.count.value.toLocaleString("en-US")}`}
                          </span>
                          <span className="holo-plus" aria-hidden="true">
                            {stat.count.suffix}
                          </span>
                        </b>
                      ) : (
                        <b>{stat.text}</b>
                      )}
                      <span className="holo-stat-label">{stat.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="holo-close">
                <p className="holo-trust">
                  <span className="holo-nb">One flat price.</span>{" "}
                  <span className="holo-nb">No revenue share.</span>{" "}
                  <span className="holo-nb">Just results.</span>
                </p>
                <div className="holo-ctas">
                  <BookCallLink />
                  <div className="holo-links">
                    <Link
                      href={leeSystemsLinks.automation}
                      className="holo-link"
                    >
                      See everything we automate
                    </Link>
                    <Link href={leeSystemsLinks.websites} className="holo-link">
                      Websites built to bring in leads
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="holo-controls">
            <button type="button" className="holo-toggle">
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
              <span className="holo-toggle-label sr-only">Pause</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The hologram's line art, in its own 480 x 540 units. The first `<use>`
 *  is the glow: the same drawing again, wider and fainter. */
function HologramLines() {
  return (
    <svg className="hv" viewBox="0 0 480 540" focusable="false">
      <defs>
        <linearGradient id="hv-glass" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d4a857" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#d4a857" stopOpacity="0.03" />
          <stop offset="1" stopColor="#d4a857" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <use href="#hv-core" className="hv-glow" />
      <g id="hv-core" className="hv-core">
        {/* the projector's base */}
        <g className="hv-base">
          <path className="hv-dim" d="M122 506v8a118 15 0 0 0 236 0v-8" />
          <path
            className="hv-draw"
            pathLength={1}
            d="M122 506a118 15 0 1 0 236 0a118 15 0 1 0-236 0"
          />
          <path
            className="hv-draw"
            pathLength={1}
            d="M162 505a78 9.5 0 1 0 156 0a78 9.5 0 1 0-156 0"
          />
        </g>

        {/* where customers come from: a call, a form, a text */}
        <g className="hv-icons">
          <g className="hv-icon">
            <g transform="translate(181 69) scale(0.9167)">
              <path d={PHONE_PATH} />
            </g>
          </g>
          <g className="hv-icon">
            <g transform="translate(229 69) scale(0.9167)">
              <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
              <path d="M14 2v5a1 1 0 0 0 1 1h5M10 9H8M16 13H8M16 17H8" />
            </g>
          </g>
          <g className="hv-icon">
            <g transform="translate(277 69) scale(0.9167)">
              <path d={MESSAGE_PATH} />
            </g>
          </g>
        </g>

        {/* the pipeline, with its three gaps */}
        <g className="hv-pipe">
          <rect
            className="hv-glass"
            x="221"
            y="120"
            width="38"
            height="210"
            fill="url(#hv-glass)"
          />
          <g className="hv-wall hv-wall-l">
            <path className="hv-draw" pathLength={1} d="M204 104 221 120" />
            <path className="hv-draw" pathLength={1} d="M221 120V150" />
            <path className="hv-draw" pathLength={1} d="M221 182V286" />
            <path className="hv-draw" pathLength={1} d="M221 318V330" />
            <path
              className="hv-break hv-break-1"
              d="M221 150l-6-3.5M221 182l-6 3.5"
            />
            <path
              className="hv-break hv-break-3"
              d="M221 286l-6-3.5M221 318l-6 3.5"
            />
            <path className="hv-seal hv-seal-1" d="M221 150V182" />
            <path className="hv-seal hv-seal-3" d="M221 286V318" />
          </g>
          <g className="hv-wall hv-wall-r">
            <path className="hv-draw" pathLength={1} d="M276 104 259 120" />
            <path className="hv-draw" pathLength={1} d="M259 120V218" />
            <path className="hv-draw" pathLength={1} d="M259 250V330" />
            <path
              className="hv-break hv-break-2"
              d="M259 218l6-3.5M259 250l6 3.5"
            />
            <path className="hv-seal hv-seal-2" d="M259 218V250" />
          </g>
        </g>

        {/* the bank: the business bank account the coins should reach */}
        <g className="hv-bank-hold">
          <g className="hv-bank">
            <rect
              className="hv-glass"
              x="158"
              y="390"
              width="164"
              height="52"
              fill="url(#hv-glass)"
            />
            <path
              className="hv-draw"
              pathLength={1}
              d="M146 370 240 338 334 370z"
            />
            <path className="hv-dim" d="M172 366.5 240 343.5 308 366.5z" />
            <path d="M246.5 357a6.5 6.5 0 1 1-13 0a6.5 6.5 0 1 1 13 0z" />
            <text className="hv-medal" x="240" y="360.4">
              $
            </text>
            <path className="hv-draw" pathLength={1} d="M152 373h176v13H152z" />
            <text className="hv-word" x="241.5" y="382.8">
              BANK
            </text>
            {[163, 198, 233, 268, 303].map((x) => (
              <path
                key={x}
                className="hv-draw"
                pathLength={1}
                d={`M${x} 390h14M${x + 3.5} 391v50M${x + 10.5} 391v50M${x} 442h14`}
              />
            ))}
            <path
              className="hv-draw"
              pathLength={1}
              d="M152 445h176M146 451h188M140 457h200"
            />
            <path
              className="hv-dim"
              d="M152 445v6M328 445v6M146 451v6M334 451v6M140 457v5M340 457v5"
            />
          </g>
        </g>

        {/* gap 1: a voice answers the call */}
        <g className="hv-wave">
          {[177, 181.5, 186, 190.5, 195, 199.5, 204].map((x) => (
            <rect
              key={x}
              className="hv-wave-bar hv-fill-hi"
              x={x}
              y="162"
              width="2"
              height="16"
              rx="1"
            />
          ))}
        </g>

        {/* gap 2: a stopwatch that doesn't reach a full minute */}
        <g className="hv-watch">
          <path d="M304 242a10 10 0 1 1-20 0a10 10 0 1 1 20 0z" />
          <path d="M294 232v-3M291 228.5h6" />
          <path
            className="hv-dim"
            d="M294 234.2v1.6M301.8 242h-1.6M294 249.8v-1.6M286.2 242h1.6"
          />
          <path className="hv-watch-hand" d="M294 242v-7" />
          <circle className="hv-fill" cx="294" cy="242" r="1.2" />
        </g>

        {/* gap 3: the details leave the pipe for the lead list */}
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            className="hv-bit hv-fill-hi"
            x="229"
            y="305"
            width="3"
            height="3"
            rx="0.6"
          />
        ))}

        {/* the website, and its feed into the pipe */}
        <g className="hv-web">
          <path
            className="hv-draw hv-web-frame"
            pathLength={1}
            d="M327 58h126a5 5 0 0 1 5 5v74a5 5 0 0 1-5 5H327a5 5 0 0 1-5-5V63a5 5 0 0 1 5-5z"
          />
          <path className="hv-draw hv-web-line" pathLength={1} d="M322 69h136" />
          <g className="hv-web-part hv-web-dots hv-fill-dim">
            <circle cx="329" cy="63.5" r="1.3" />
            <circle cx="334" cy="63.5" r="1.3" />
            <circle cx="339" cy="63.5" r="1.3" />
          </g>
          <rect
            className="hv-web-part hv-web-bar hv-fill-dim"
            x="330"
            y="75"
            width="16"
            height="2.4"
            rx="1.2"
          />
          <rect
            className="hv-web-part hv-web-bar hv-fill-dim"
            x="420"
            y="75"
            width="30"
            height="2.4"
            rx="1.2"
          />
          <rect
            className="hv-web-part hv-web-bar hv-fill"
            x="330"
            y="85"
            width="62"
            height="4.2"
            rx="2.1"
          />
          <rect
            className="hv-web-part hv-web-bar hv-fill-dim"
            x="330"
            y="93.5"
            width="46"
            height="2.4"
            rx="1.2"
          />
          <rect
            className="hv-web-part hv-web-btn hv-fill"
            x="330"
            y="104"
            width="30"
            height="9"
            rx="4.5"
          />
          <path
            className="hv-draw hv-web-line"
            pathLength={1}
            d="M407 84h40a3 3 0 0 1 3 3v23a3 3 0 0 1-3 3h-40a3 3 0 0 1-3-3V87a3 3 0 0 1 3-3z"
          />
          {[332, 374, 416].map((x) => (
            <path
              key={x}
              className="hv-draw hv-web-card"
              pathLength={1}
              d={`M${x} 122h32a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-32a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z`}
            />
          ))}
        </g>
        <path
          className="hv-draw hv-conn"
          pathLength={1}
          d="M330 108.5C304 108.5 290 112 262 121"
        />
      </g>
    </svg>
  );
}
