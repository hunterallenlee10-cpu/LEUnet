"use client";

import { useState } from "react";

/**
 * The "Do nothing" card's button, after The Real World's "Do It Your Way".
 * Picking it is allowed: it opens Indeed in a new tab, says what that choice
 * means, and nudges the card beside it (`nudgeId`) so the eye lands on the
 * other option.
 */
const INDEED_URL = "https://www.indeed.com/";

export function DoItYourWayButton({ nudgeId }: { nudgeId: string }) {
  const [picked, setPicked] = useState(false);

  const pick = () => {
    setPicked(true);
    const card = document.getElementById(nudgeId);
    if (card && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      card.animate(
        [
          { transform: "none", filter: "none" },
          { transform: "translateY(-6px)", filter: "brightness(1.18)" },
          { transform: "none", filter: "none" },
        ],
        { duration: 700, easing: "ease-in-out", iterations: 2 }
      );
    }
  };

  return (
    <>
      <a
        href={INDEED_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={pick}
        className="btn-ls-muted w-full"
      >
        Do it your way
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <p aria-live="polite" className="text-sm text-neutral-400">
        {picked && (
          <span className="mt-3 block">
            Your competitors are hoping you pick this one.
          </span>
        )}
      </p>
    </>
  );
}
