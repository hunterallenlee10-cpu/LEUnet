"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { H1ProofPoint } from "@/types";
import { H1_PALETTE, proofAttribution } from "@/data/h1";

/**
 * How long one fact holds the readout, start of entry to start of the next:
 * a 0.42s fade-in that the count runs alongside, then stillness, then a hard
 * cut to the next fact. There is no exit animation — the fact is keyed, so it
 * is replaced rather than transitioned out, and machinery to animate a
 * departing keyed node would buy nothing at this pace.
 */
const CYCLE_MS = 5200;
/** How long a pair takes to count from its opening figure to its closing one. */
const COUNT_MS = 1200;

/**
 * The hero readout: one measured result at a time, at display size, counting
 * between the two figures of a pair as it arrives.
 *
 * Three things shape this component, in order of importance.
 *
 * **It must never show a number that is not a claim.** A pair settles on its
 * real closing figure and stays there; the count is the only time an
 * in-between value is on screen, and pausing does not interrupt it — freezing
 * a count halfway would leave a fabricated number sitting in the hero. Deltas
 * do not animate at all: counting up to "+30%" would imply a starting point
 * nobody gave.
 *
 * **Every figure carries its attribution.** Four of the six results belong to
 * one athlete and two are averages, so `proofAttribution()` rotates with the
 * figure rather than a single line trying to describe all six at once.
 *
 * **Motion here is auto-updating content**, which under WCAG 2.2.2 needs a
 * control to stop it. The pause button governs the rotation, the counting and
 * the gate sweep, because all three live in this component — a hero that
 * pauses its readout while its background keeps sweeping has not stopped
 * anything. The button sits outside the `aria-hidden` subtree: focusable
 * content inside `aria-hidden` is a 4.1.2 failure.
 *
 * The readout itself is `aria-hidden`. Assistive technology reads the results
 * from `H1ResultsStrip` below, which carries all six with their attributions,
 * static — better than a live region announcing a new figure every five
 * seconds, and better than duplicating six claims into a hidden list here.
 */
export function H1ProofRotator({ points }: { points: H1ProofPoint[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  /** Set only while a pair is mid-count; null means "show the real figure". */
  const [counting, setCounting] = useState<number | null>(null);
  /**
   * The first fact is server-rendered at its closing figure, so counting it on
   * mount would visibly rewind a number the visitor has already read. Counting
   * begins once the readout has actually advanced.
   */
  const hasAdvanced = useRef(false);
  /**
   * Read inside the count effect, which cannot depend on `paused` (see below).
   * A ref lets it check the current value without re-running and restarting a
   * count that is already settled.
   */
  const pausedRef = useRef(false);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // Held above the effects so they can depend on the element rather than the
  // array. Element identity survives a caller passing a fresh array on every
  // render; array identity would not, and the count effect would re-run on its
  // own `setCounting`, reset its start time, and never reach the target.
  const point: H1ProofPoint | undefined = points[index];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced || paused || points.length < 2) return;
    const id = window.setTimeout(() => {
      hasAdvanced.current = true;
      // Cleared here, in the same batch as the advance, so a half-counted value
      // can never be paired with the fact that replaces it. Leaving it to the
      // count effect would clear it one render too late: correct in the
      // foreground only because a count is far shorter than a cycle, and wrong
      // in a background tab, where rAF suspends mid-count while this timer
      // still fires. That would commit something like "60-yard dash 7.2 → 4.8"
      // — a number no athlete ran — and hold it until the tab came back.
      setCounting(null);
      setIndex((current) => (current + 1) % points.length);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, points.length]);

  // `paused` is deliberately not a dependency. Pausing stops the rotation, but
  // a count already under way has to finish and land on the real figure —
  // freezing it would leave a fabricated number on screen. `pausedRef` covers
  // the other direction: this effect must not *start* a count on a fact the
  // visitor has already paused on, which is reachable by switching reduced
  // motion off at the OS level while paused.
  useEffect(() => {
    if (
      !point ||
      point.kind !== "pair" ||
      reduced ||
      !hasAdvanced.current ||
      pausedRef.current
    ) {
      setCounting(null);
      return;
    }
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / COUNT_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (progress < 1) {
        setCounting(point.from + (point.to - point.from) * eased);
        frame = requestAnimationFrame(tick);
      } else {
        setCounting(null);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [point, reduced]);

  if (!point) return null;

  const rotates = points.length > 1;

  return (
    <div
      className="h1c-readout"
      // One source of truth for colour: the palette comes in as custom
      // properties so the animation can live in globals.css without the hexes
      // being copied there and drifting from H1_PALETTE.
      style={
        {
          "--h1c-gold": H1_PALETTE.gold,
          "--h1c-chalk": H1_PALETTE.chalk,
          "--h1c-muted": H1_PALETTE.muted,
          "--h1c-line": H1_PALETTE.line,
        } as CSSProperties
      }
      data-paused={paused ? "true" : "false"}
    >
      {/* Keyed on the fact, so both the entry animation and the gate sweep
          restart when the readout advances. */}
      <div className="h1c-fact" key={point.id} aria-hidden="true">
        <span className="h1c-gate" />
        <p className="h1c-metric">{point.label}</p>
        <p className="h1c-figures">
          {point.kind === "pair" ? (
            <>
              <span className="h1c-from">
                {point.from.toFixed(point.precision)}
              </span>
              <span className="h1c-arrow">&rarr;</span>
              <span className="h1c-value">
                {(counting ?? point.to).toFixed(point.precision)}
              </span>
              {point.unit ? (
                <span className="h1c-unit">{point.unit}</span>
              ) : null}
            </>
          ) : (
            <span className="h1c-value">{point.figure}</span>
          )}
        </p>
        <p className="h1c-attrib">{proofAttribution(point)}</p>
      </div>

      <div className="h1c-controls">
        {rotates ? (
          <button
            type="button"
            className="h1c-pause"
            onClick={() => setPaused((current) => !current)}
            // The accessible name has to contain the visible label (WCAG 2.5.3)
            // so "click Play" works for voice control — hence "Play", not
            // "Resume".
            aria-label={
              paused ? "Play rotating results" : "Pause rotating results"
            }
          >
            {paused ? "Play" : "Pause"}
          </button>
        ) : null}
        <p className="h1c-qualifier">
          Results vary with training age, consistency, and sport.
        </p>
      </div>

      {/* The readout above is hidden from assistive technology, so point to
          where the complete, attributed set actually lives. */}
      <p className="sr-only">
        Every result shown here, and who achieved each one, is listed in full
        further down this page.
      </p>
    </div>
  );
}
