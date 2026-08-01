import { THREAD_PALETTE } from "@/data/thread";

/**
 * The Thread page's interactive styling, in one scoped stylesheet.
 *
 * Rendered once from `app/thread-t-shirts/page.tsx`. It exists because the
 * controls need states — hover, active, focus-visible, disabled, and the
 * pressed state of a toggle — and an inline `style` object cannot express any
 * of them. It also cannot be overridden by one: inline styles beat every
 * selector short of `!important`, so a hover rule and an inline `borderColor`
 * on the same element is a fight the hover rule always loses. The colours
 * therefore live here rather than in the call sites.
 *
 * `docs/THREAD.md` §2 rules out `globals.css` changes from this page, so this
 * is a page-scoped `<style>` with `thread-` prefixed class names. Every value
 * is interpolated from THREAD_PALETTE, which stays the single source of truth.
 *
 * The thing making these read as raised rather than painted on is the warm
 * ambient shadow: a wide, low-alpha champagne glow with negative spread. On a
 * near-black ground that reads as the surface throwing light onto the page,
 * which is what the flat originals were missing. Keep the alpha low — past
 * about 0.3 on the outer layer it stops looking like light and starts looking
 * like a coloured halo.
 */

/** `#RRGGBB` to `"r, g, b"`, so the palette can feed `rgba()` alpha values. */
const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

const CHAMPAGNE = rgb(THREAD_PALETTE.champagne);
const BONE = rgb(THREAD_PALETTE.bone);

const css = `
/* --------------------------------------------------------------------------
   Buttons
   -------------------------------------------------------------------------- */

.thread-btn {
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease,
    border-color 180ms ease,
    color 180ms ease;
}

.thread-btn:focus-visible {
  outline: 2px solid ${THREAD_PALETTE.champagne};
  outline-offset: 3px;
}

/* Primary — bone fill. The inset top highlight and the darker inset bottom
   edge give the fill a lit top and a shaded lower lip, so it reads as a
   physical key rather than a filled rectangle. */
.thread-btn--primary {
  background-color: ${THREAD_PALETTE.bone};
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0) 55%
  );
  color: ${THREAD_PALETTE.ink};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(${CHAMPAGNE}, 0.35),
    0 2px 6px rgba(0, 0, 0, 0.5),
    0 14px 34px -16px rgba(${CHAMPAGNE}, 0.55);
}

.thread-btn--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -1px 0 rgba(${CHAMPAGNE}, 0.4),
    0 4px 10px rgba(0, 0, 0, 0.55),
    0 20px 44px -18px rgba(${CHAMPAGNE}, 0.8);
}

/* Press collapses the lift and pulls the shadow in tight, so the button reads
   as travelling toward the page rather than just getting smaller. */
.thread-btn--primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow:
    inset 0 2px 5px rgba(0, 0, 0, 0.25),
    0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Disabled is its own surface, not the enabled one at 40% opacity — a
   translucent bone button over ink turns the muddy grey this replaced. */
.thread-btn--primary:disabled {
  background-color: ${THREAD_PALETTE.charcoal};
  background-image: none;
  color: ${THREAD_PALETTE.muted};
  border: 1px solid ${THREAD_PALETTE.border};
  box-shadow: none;
  transform: none;
  cursor: not-allowed;
}

/* Secondary — champagne outline. The originals were hollow, which on ink is
   indistinguishable from a border with nothing in it. A faint warm fill gives
   it a surface to be. */
.thread-btn--secondary {
  border: 2px solid rgba(${CHAMPAGNE}, 0.55);
  background-color: rgba(${CHAMPAGNE}, 0.08);
  color: ${THREAD_PALETTE.champagne};
  box-shadow:
    inset 0 1px 0 rgba(${CHAMPAGNE}, 0.18),
    0 12px 30px -18px rgba(${CHAMPAGNE}, 0.6);
}

.thread-btn--secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: ${THREAD_PALETTE.champagne};
  background-color: rgba(${CHAMPAGNE}, 0.16);
  color: ${THREAD_PALETTE.bone};
  box-shadow:
    inset 0 1px 0 rgba(${CHAMPAGNE}, 0.3),
    0 20px 40px -18px rgba(${CHAMPAGNE}, 0.85);
}

.thread-btn--secondary:active:not(:disabled) {
  transform: translateY(0);
  background-color: rgba(${CHAMPAGNE}, 0.22);
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.35);
}

/* --------------------------------------------------------------------------
   Status badge
   -------------------------------------------------------------------------- */

/* "Now taking orders" is a live claim, so it gets a live indicator. The dot
   is the pop here — a pulsing point of warm light reads at a glance from
   across the hero, where a hairline outline did not. */
.thread-badge {
  border: 1px solid rgba(${CHAMPAGNE}, 0.5);
  background-image: linear-gradient(
    180deg,
    rgba(${CHAMPAGNE}, 0.18),
    rgba(${CHAMPAGNE}, 0.06)
  );
  color: ${THREAD_PALETTE.champagne};
  box-shadow:
    inset 0 1px 0 rgba(${CHAMPAGNE}, 0.22),
    0 10px 28px -16px rgba(${CHAMPAGNE}, 0.7);
}

.thread-badge__dot {
  background-color: ${THREAD_PALETTE.champagne};
  animation: thread-badge-pulse 2.6s ease-out infinite;
}

/* Ring expands and fades rather than the dot scaling, so nothing in the pill
   shifts the text baseline while it runs. */
@keyframes thread-badge-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(${CHAMPAGNE}, 0.6); }
  70%  { box-shadow: 0 0 0 0.5rem rgba(${CHAMPAGNE}, 0); }
  100% { box-shadow: 0 0 0 0 rgba(${CHAMPAGNE}, 0); }
}

/* --------------------------------------------------------------------------
   Toggles — catalog filters, size and colour pickers
   -------------------------------------------------------------------------- */

/* Driven off aria-pressed, which the components already set, so the selected
   look cannot drift out of sync with the accessible state. */
/* The resting state is deliberately louder than the border-on-muted pairing
   these used to carry: a #2A2724 hairline with #8A8378 text on ink is legible
   in isolation and disappears in a row of seven. Warming the border and
   lifting the label toward bone makes an unselected filter read as a control
   that has not been chosen, rather than as a disabled one. */
.thread-toggle {
  border: 1px solid rgba(${CHAMPAGNE}, 0.3);
  background-color: rgba(${BONE}, 0.04);
  color: rgba(${BONE}, 0.72);
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    color 150ms ease,
    box-shadow 150ms ease;
}

.thread-toggle:hover {
  border-color: rgba(${CHAMPAGNE}, 0.65);
  background-color: rgba(${CHAMPAGNE}, 0.08);
  color: ${THREAD_PALETTE.champagne};
}

.thread-toggle:focus-visible {
  outline: 2px solid ${THREAD_PALETTE.champagne};
  outline-offset: 2px;
}

.thread-toggle[aria-pressed="true"] {
  border-color: ${THREAD_PALETTE.bone};
  background-color: ${THREAD_PALETTE.bone};
  color: ${THREAD_PALETTE.ink};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.85),
    0 2px 6px rgba(0, 0, 0, 0.45),
    0 12px 26px -16px rgba(${CHAMPAGNE}, 0.7);
}

/* Colour swatches carry their own fill, so only the ring and lift apply. */
.thread-swatch {
  border: 2px solid rgba(${BONE}, 0.28);
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.thread-swatch:hover { transform: scale(1.12); border-color: rgba(${CHAMPAGNE}, 0.8); }

.thread-swatch:focus-visible {
  outline: 2px solid ${THREAD_PALETTE.champagne};
  outline-offset: 2px;
}

.thread-swatch[aria-pressed="true"] {
  border-color: ${THREAD_PALETTE.bone};
  box-shadow:
    0 0 0 2px ${THREAD_PALETTE.ink},
    0 0 0 3px rgba(${BONE}, 0.55),
    0 8px 20px -10px rgba(${CHAMPAGNE}, 0.7);
}

/* --------------------------------------------------------------------------
   Quantity stepper
   -------------------------------------------------------------------------- */

.thread-stepper {
  border: 1px solid rgba(${CHAMPAGNE}, 0.3);
  background-color: rgba(${BONE}, 0.04);
  transition: border-color 150ms ease;
}

.thread-stepper:focus-within { border-color: rgba(${CHAMPAGNE}, 0.7); }

.thread-stepper__button {
  color: ${THREAD_PALETTE.bone};
  transition: background-color 150ms ease, color 150ms ease;
}

.thread-stepper__button:hover:not(:disabled) {
  background-color: rgba(${CHAMPAGNE}, 0.14);
  color: ${THREAD_PALETTE.champagne};
}

.thread-stepper__button:focus-visible {
  outline: 2px solid ${THREAD_PALETTE.champagne};
  outline-offset: -2px;
}

.thread-stepper__button:disabled { opacity: 0.3; cursor: not-allowed; }

/* --------------------------------------------------------------------------
   Reduced motion
   -------------------------------------------------------------------------- */

/* The global rule at globals.css:380 collapses durations but this page's
   keyframes are declared here, so the pulse is stopped explicitly. Hover and
   press feedback stay: they are responses to the reader's own input, not
   ambient movement, and removing them would leave the controls feeling dead.
   Only the transform part is dropped, since that is the piece that moves
   without being asked. */
@media (prefers-reduced-motion: reduce) {
  .thread-badge__dot { animation: none; }
  .thread-btn:hover, .thread-btn:active, .thread-swatch:hover { transform: none; }
}
`;

export function ThreadStyles() {
  return <style>{css}</style>;
}
