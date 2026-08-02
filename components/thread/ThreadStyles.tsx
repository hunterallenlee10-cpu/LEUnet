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
   Cart trigger — the floating pill that appears once something is selected
   -------------------------------------------------------------------------- */

/* This carried shadow-2xl and no background, so it rendered as bare white text
   floating over the page — the one element that has to be found after an add
   was the least visible thing on screen. It now takes the primary button's
   surface: bone with ink text, which is the loudest pairing the palette has
   against near-black.

   Sits above the page but below the drawer (z-40 vs z-50), set on the element
   so the stacking stays with the component that owns it. */
.thread-cart-trigger {
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
    0 4px 12px rgba(0, 0, 0, 0.6),
    0 18px 44px -18px rgba(${CHAMPAGNE}, 0.75);
  animation: thread-cart-trigger-in 420ms cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
}

.thread-cart-trigger:hover {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -1px 0 rgba(${CHAMPAGNE}, 0.4),
    0 6px 16px rgba(0, 0, 0, 0.65),
    0 24px 56px -20px rgba(${CHAMPAGNE}, 0.95);
}

/* Rises into place rather than appearing, so the movement is what catches the
   eye — a static pill in a corner the reader was not looking at is easy to
   miss no matter how bright it is. */
@keyframes thread-cart-trigger-in {
  from { opacity: 0; transform: translateY(1.25rem) scale(0.92); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* One-shot ring, remounted on every count change so a second add re-fires it.
   Decorative and non-interactive: it must never sit between the reader and the
   button underneath it. */
.thread-cart-trigger__ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  pointer-events: none;
  animation: thread-cart-trigger-ring 900ms ease-out 1 both;
}

@keyframes thread-cart-trigger-ring {
  0%   { box-shadow: 0 0 0 0 rgba(${BONE}, 0.65); }
  100% { box-shadow: 0 0 0 1.15rem rgba(${BONE}, 0); }
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
   Cards
   -------------------------------------------------------------------------- */

/* Two vocabularies, deliberately kept apart.
 *
 * A card that links somewhere RISES on hover. A card that does not link
 * anywhere only LIGHTS UP — its border warms and the surface brightens, but it
 * never moves. Giving both the same lift is what trains someone to click a
 * panel that has nowhere to go, and this page has both kinds sitting in
 * near-identical grids a section apart.
 *
 * The surface lift is a bone overlay rather than a second background colour,
 * so charcoal stays the only declared surface in the palette.
 */
.thread-card {
  border: 1px solid ${THREAD_PALETTE.border};
  background-color: ${THREAD_PALETTE.charcoal};
  transition:
    transform 300ms ease,
    border-color 300ms ease,
    background-image 300ms ease,
    box-shadow 300ms ease;
}

.thread-card:hover {
  border-color: rgba(${CHAMPAGNE}, 0.5);
  background-image: linear-gradient(rgba(${BONE}, 0.035), rgba(${BONE}, 0.035));
  box-shadow:
    inset 0 1px 0 rgba(${CHAMPAGNE}, 0.14),
    0 14px 34px -24px rgba(${CHAMPAGNE}, 0.55);
}

/* Focus follows hover for the linked variant, so tabbing through the grid
   surfaces the same card the mouse would. */
.thread-card--link:hover,
.thread-card--link:focus-visible {
  transform: translateY(-4px);
  border-color: ${THREAD_PALETTE.champagne};
  box-shadow:
    inset 0 1px 0 rgba(${CHAMPAGNE}, 0.2),
    0 24px 48px -26px rgba(${CHAMPAGNE}, 0.75);
}

.thread-card--link:focus-visible {
  outline: 2px solid ${THREAD_PALETTE.champagne};
  outline-offset: 3px;
}

/* --------------------------------------------------------------------------
   FAQ rows
   -------------------------------------------------------------------------- */

/* An FAQ row is interactive but goes nowhere — it discloses in place — so it
   takes the illumination half of the card vocabulary and never the lift.
   Lifting a full-width row would also read as the row detaching from the
   stack, which is not what opening one does.
 *
 * The open row keeps a warm border after the pointer leaves. In a stack of
 * nine, a rotated chevron is the only thing marking which one is open, and it
 * is 20px of a 900px-wide row.
 */
.thread-faq:has(.thread-faq__trigger[aria-expanded="true"]) {
  border-color: rgba(${CHAMPAGNE}, 0.5);
  background-image: linear-gradient(rgba(${BONE}, 0.03), rgba(${BONE}, 0.03));
}

/* The divider between question and answer, warmed to match the open row's
   border so the panel does not look stitched on with a colder seam. */
.thread-faq__panel {
  border-top: 1px solid rgba(${CHAMPAGNE}, 0.28);
  color: ${THREAD_PALETTE.muted};
}

.thread-faq__trigger:focus-visible {
  outline: 2px solid ${THREAD_PALETTE.champagne};
  outline-offset: -3px;
  border-radius: 0.5rem;
}

.thread-faq__icon {
  color: ${THREAD_PALETTE.champagne};
  transition: transform 200ms ease, color 200ms ease;
}

.thread-faq:hover .thread-faq__icon { color: ${THREAD_PALETTE.bone}; }

.thread-faq__trigger[aria-expanded="true"] .thread-faq__icon {
  transform: rotate(180deg);
}

/* The chevron leans the way the action goes: down to open, up to close. The
   open row is already rotated, so the same +2px lands as a nudge upward. */
.thread-faq:hover .thread-faq__icon { transform: translateY(2px); }

.thread-faq:hover .thread-faq__trigger[aria-expanded="true"] .thread-faq__icon {
  transform: rotate(180deg) translateY(2px);
}

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
  .thread-cart-trigger__ring { animation: none; }
  /* The trigger still needs to arrive, it just arrives without travelling —
     dropping the animation entirely would leave it at the keyframe's starting
     opacity of 0 and hide the control outright. */
  .thread-cart-trigger { animation: thread-cart-trigger-fade 200ms ease-out both; }
  .thread-btn:hover,
  .thread-btn:active,
  .thread-swatch:hover,
  .thread-card--link:hover,
  .thread-card--link:focus-visible { transform: none; }
}

@keyframes thread-cart-trigger-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
`;

export function ThreadStyles() {
  return <style>{css}</style>;
}
