"use client";

import { useEffect, useState } from "react";

/**
 * The words the headline types after its static "Get", in journey order - the
 * same order the offering switch beside it walks its rail, whose first two
 * stops are literally labelled "Get found" and "Get chosen". Changing the
 * order here without changing `hubOfferings` would have the headline argue one
 * sequence while the rail demonstrates another.
 */
const WORDS = ["Found", "Chosen", "Paid"];

/**
 * The widest of the three, rendered invisibly to hold the word's column open.
 * The reservation is made in text, in the inherited font, rather than in a
 * unit: a `ch`- or pixel-width would have to be re-measured at every
 * `heading-xl` breakpoint, and would drift the first time the typeface
 * changed. If a longer word ever joins WORDS, this must change with it.
 */
const WIDEST_WORD = "Chosen";

/** Per-character pace while a word is being typed. */
const TYPE_MS = 110;
/** Per-character pace while it is deleted - a backspace is quicker than a keystroke. */
const DELETE_MS = 65;
/** How long a completed word stands before it starts to go. */
const HOLD_MS = 1800;
/** The empty beat between one word's last deletion and the next one's first letter. */
const GAP_MS = 500;

/**
 * Where the cycle is, written so that every state renders directly: the word
 * on screen is always `WORDS[word].slice(0, len)`, and the one effect below
 * only ever decides what the next state is and how long to wait for it.
 */
type Step = {
  word: number;
  len: number;
  phase: "typing" | "deleting";
};

/**
 * The first word, fully typed. Doubles as the initial state and the state the
 * cycle is put back into whenever reduced motion switches on, because it is
 * the one frame that works everywhere: the server renders it, so a visitor
 * with JavaScript off - and a search engine - reads "Get Found" rather than a
 * bare "Get"; hydration mounts on identical markup; and it is exactly the
 * still frame the reduced-motion visitor is meant to see. Starting empty and
 * typing the first word in would look right in the animated case and wrong in
 * every other one.
 */
const REST: Step = { word: 0, len: WORDS[0].length, phase: "typing" };

/**
 * The animated half of the hub headline: one word, typed in, held, deleted,
 * replaced by the next, indefinitely. A client component - the typing is
 * state on a timer, which no stylesheet can express - and deliberately a leaf,
 * so `HubHeroSection` and the rest of the hub keep rendering on the server.
 *
 * The word sits in an inline grid with the invisible WIDEST_WORD stacked in
 * the same cell, so the column is always as wide as "Chosen" plus the caret
 * and nothing around it moves as letters come and go. The caret is a sibling
 * of the typed text inside that cell rather than part of the width
 * calculation twice: the invisible copy carries its own caret, which is what
 * keeps the cell's width identical whether the visible word is complete or
 * mid-type.
 *
 * Timing is a chain of timeouts rather than an interval or a rAF loop. Every
 * beat has a different length - keystroke, backspace, hold, gap - so there is
 * no one interval to run, and nothing here animates smoothly enough for rAF
 * to buy anything: the effect re-runs on each state change, schedules the one
 * next beat, and cleans it up.
 *
 * Under prefers-reduced-motion the cycle never starts (or is put back to REST
 * if the setting changes mid-word) and the visitor keeps a static "Get
 * Found". The caret is hidden by the stylesheet's reduced-motion block rather
 * than by this component, so the right first frame paints before hydration
 * rather than one effect-tick after it.
 *
 * CONTRACT WITH THE CALLER. The h1 that renders this must aria-hide it and
 * carry the full claim in an sr-only line, as `HubHeroSection` does: a
 * heading whose accessible name retyped itself every few seconds would be
 * churn for a screen reader, and the invisible width-reserver would be
 * announced as a fourth word. This component does not hide itself, because it
 * cannot - the static "Get" beside it has to go into the same hidden span.
 */
export function HubHeroTypedWord() {
  const [step, setStep] = useState<Step>(REST);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(query.matches);
      // Snap back to the still frame rather than freezing mid-word: pausing
      // on "Cho" would leave the headline resting on a word that is not a
      // word. REST is also what the reduced-motion visitor was promised.
      if (query.matches) setStep(REST);
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const word = WORDS[step.word];
    let delay: number;
    let next: Step;
    if (step.phase === "typing") {
      if (step.len < word.length) {
        delay = TYPE_MS;
        next = { ...step, len: step.len + 1 };
      } else {
        delay = HOLD_MS;
        next = { ...step, phase: "deleting" };
      }
    } else if (step.len > 0) {
      delay = DELETE_MS;
      next = { ...step, len: step.len - 1 };
    } else {
      delay = GAP_MS;
      next = { word: (step.word + 1) % WORDS.length, len: 0, phase: "typing" };
    }
    const id = window.setTimeout(() => setStep(next), delay);
    return () => window.clearTimeout(id);
  }, [step, reduced]);

  const word = WORDS[step.word];
  // At rest - a word standing complete, or the empty gap between words - the
  // caret blinks; while letters are actually arriving or leaving it holds
  // solid, which is what a real text caret does. globals.css reads this
  // attribute; the component only reports.
  const resting =
    step.phase === "typing" ? step.len === word.length : step.len === 0;

  return (
    <span
      className="inline-grid whitespace-nowrap"
      data-lmm-resting={resting ? "true" : "false"}
    >
      <span className="invisible col-start-1 row-start-1">
        {WIDEST_WORD}
        <span className="lmm-caret" />
      </span>
      <span className="col-start-1 row-start-1">
        {/* The gradient is the headline's existing accent treatment, applied
            to the typed text itself so a completed word carries the full
            amber-to-orange sweep exactly as a static span would. */}
        <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
          {word.slice(0, step.len)}
        </span>
        <span className="lmm-caret" />
      </span>
    </span>
  );
}
