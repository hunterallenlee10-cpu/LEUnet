import { gsap } from "gsap";
import { heroVsl } from "@/data/hero-vsl";
import { canPlayHeroFilm, createHeroFilm, type HeroFilm } from "./heroVslEngine";

/**
 * The homepage hero around its animation, "The Vault" (HeroVsl.tsx).
 * HeroStage.tsx loads this, and with it the 3D engine and three.js, once the
 * page is interactive, and hands it the hero's first screen.
 *
 * The regular hero shows first. After `heroVsl.startDelay` seconds with the
 * hero on screen, its words leave and the film plays in their place, over
 * the whole first screen. Its end card holds for `heroVsl.hold` seconds
 * (longer while someone points at its button or links, or tabs through
 * them), then the words come back with a "Replay animation" button beside
 * the booking button. Every page load plays it once by itself; people whose
 * device asks for less motion get a "Play animation" button instead and
 * nothing starts on its own. A browser that can't draw it (no WebGL, or
 * WebGL only in software) keeps the regular hero, with no button, and so
 * does one where the film gives up part way (a device far too slow for it,
 * or a WebGL context lost for good): the hero's words come straight back.
 *
 * Both waits only count while the hero is at least half on screen (or half
 * the screen, where the hero is taller) and the tab is open. The first also holds while someone is on the hero's own
 * buttons (tabbed to one, or a mouse over them), so they never vanish from
 * under a click or take keyboard focus with them. Returns a function that
 * stops everything and puts the hero back the way the server sent it.
 */

/** The hero's words leave, and the film arrives (and leaves), in seconds. */
const WORDS_OUT = 0.55;
const VSL_IN = 0.8;

type HeroState = "hero" | "intro" | "vsl" | "hold" | "outro";

/** Runs `fn` once the browser is idle (or soon, where it can't say);
 *  returns a function that cancels it. */
function whenIdle(fn: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout: 1000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 200);
  return () => window.clearTimeout(id);
}

function need<T extends Element = HTMLElement>(parent: ParentNode, sel: string) {
  const node = parent.querySelector<T>(sel);
  if (!node) throw new Error(`Hero animation: ${sel} is missing`);
  return node;
}

/** `:focus-visible`, where a browser too old to know it says yes. */
function focusVisible(el: Element) {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true;
  }
}

/** Where focus is when it has been dropped, or is on `from`. */
function focusLostOr(...from: Element[]) {
  const el = document.activeElement;
  return !el || el === document.body || from.includes(el);
}

// True while `focusOnTo` moves focus: that isn't someone tabbing through.
let movingFocus = false;

/**
 * Moves focus on to `el` when a button it was on goes. Should `el` not take
 * it yet (still coming into view this instant), it tries again over the next
 * two frames, as long as `still()` says the move is still wanted.
 */
function focusOnTo(el: HTMLElement, still: () => boolean, tries = 2) {
  movingFocus = true;
  try {
    el.focus({ preventScroll: true });
  } finally {
    movingFocus = false;
  }
  if (document.activeElement === el || tries <= 0) return;
  requestAnimationFrame(() => {
    if (still()) focusOnTo(el, still, tries - 1);
  });
}

export function mountHeroVsl(top: HTMLElement): () => void {
  const copy = need(top, "[data-hero-copy]");
  const ctaRow = need(copy, ".hero-split-cta");
  const words = [need(copy, ".hero-split-title"), need(copy, ".hero-split-lede"), ctaRow];
  const replayBtn = need<HTMLButtonElement>(copy, "[data-hero-replay]");
  // The hero's booking button: where focus goes when the button to play the
  // film goes for good.
  const bookLink = ctaRow.querySelector<HTMLElement>("a");
  const replayLabel = need(replayBtn, "[data-hero-replay-label]");
  const layer = need(top, "[data-hero-vsl]");
  const filmRoot = need(layer, "[data-vt]");
  const toggleBtn = need<HTMLButtonElement>(layer, ".vt-toggle");
  const skipBtn = need<HTMLButtonElement>(layer, ".vt-skip");
  const endLinks = need(layer, ".vt-ctas");

  const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  // hero -> intro -> vsl -> hold -> outro -> hero
  let state: HeroState = "hero";
  let played = false;
  let waitLeft: number = heroVsl.startDelay;
  let holdLeft = 0;
  let inView = false;
  let pageVisible = document.visibilityState === "visible";
  let pointerIn = false;
  let keyboardIn = false;
  let pointerOnHero = false;
  let move: gsap.core.Timeline | null = null;
  let last = 0;
  let raf = 0;
  let cancelBuild = () => {};
  let buildPending = false;

  // The film is built once, when it is first needed: during the wait before
  // it autoplays (once the hero is on screen and the browser is idle), or
  // as someone reaches for "Play animation" (at the latest when they press
  // it). Without WebGL there is no film, and the hero stays as it is.
  let film: HeroFilm | null = null;
  let canPlay = !reducedQuery.matches || canPlayHeroFilm();
  function ensureFilm() {
    if (!film && canPlay) {
      try {
        film = createHeroFilm(filmRoot, { onDone: vslDone, onFail: vslFailed });
      } catch {
        film = null;
      }
      if (!film) {
        canPlay = false;
        settle();
      }
    }
    return film;
  }

  function setState(s: HeroState) {
    state = s;
    top.dataset.heroState = s;
  }

  /* ---- one clock for both waits; it only runs while it counts ---- */

  // Someone at the hero's buttons: tabbed onto one, or a mouse over them.
  function onHeroButtons() {
    const el = document.activeElement;
    return pointerOnHero || (!!el && copy.contains(el) && focusVisible(el));
  }

  function counting() {
    if (!inView || !pageVisible || !canPlay) return false;
    if (state === "hero") {
      return !played && !reducedQuery.matches && waitLeft > 0 && !onHeroButtons();
    }
    if (state === "hold") return !pointerIn && !keyboardIn;
    return false;
  }

  function tick(now: number) {
    raf = 0;
    // Slow frames still count in full, up to a quarter second each.
    const dt = last ? Math.min(0.25, (now - last) / 1000) : 0;
    last = now;
    if (state === "hero" && counting()) {
      waitLeft -= dt;
      if (waitLeft <= 0) {
        last = 0;
        toVsl();
        return;
      }
    } else if (state === "hold" && counting()) {
      holdLeft -= dt;
      if (holdLeft <= 0) {
        last = 0;
        toHero();
        return;
      }
    }
    schedule();
  }

  function schedule() {
    if (raf) return;
    if (!counting()) {
      last = 0;
      return;
    }
    raf = requestAnimationFrame(tick);
  }

  function showLayer(on: boolean) {
    layer.inert = !on;
    if (on) layer.removeAttribute("aria-hidden");
    else layer.setAttribute("aria-hidden", "true");
  }

  /* ---- the hero's words leave, the film arrives and plays ---- */

  function toVsl() {
    if (state !== "hero") return;
    const f = ensureFilm();
    if (!f) return;
    // Pressed from the keyboard: carry on at the film's pause button.
    const fromKeyboard = document.activeElement === replayBtn && focusVisible(replayBtn);
    move?.kill();
    setState("intro");
    showLayer(true);
    const arrive = WORDS_OUT * 0.8;
    move = gsap.timeline({
      onComplete() {
        move = null;
        // Already on to its end card (skipped there from the keyboard): that
        // hold stands.
        if (state !== "intro") return;
        setState("vsl");
      },
    });
    move
      .set(copy, { pointerEvents: "none" }, 0)
      .to(
        words,
        {
          opacity: 0,
          y: -18,
          filter: "blur(6px)",
          duration: WORDS_OUT,
          ease: "power2.in",
          stagger: 0.06,
        },
        0
      )
      // Focus moves on before the button it is on goes.
      .call(
        () => {
          if (!fromKeyboard || state !== "intro") return;
          focusOnTo(
            toggleBtn,
            () => (state === "intro" || state === "vsl") && focusLostOr(replayBtn)
          );
        },
        undefined,
        WORDS_OUT + 0.15
      )
      .set(ctaRow, { visibility: "hidden" }, WORDS_OUT + 0.15)
      // Only the opacity: a blur over a full-screen 3D canvas costs more
      // than it shows.
      .fromTo(layer, { autoAlpha: 0 }, { autoAlpha: 1, duration: VSL_IN, ease: "power2.out" }, arrive)
      .call(() => f.start(), undefined, arrive);
  }

  /* ---- the film has reached the end of its end card: hold it ---- */

  function vslDone() {
    if (state !== "vsl" && state !== "intro") return;
    // The pause and skip buttons go with nothing left to pause or skip; focus
    // on either moves to the end card's booking button rather than being
    // dropped.
    const link = endLinks.querySelector<HTMLElement>("a");
    if (link && (document.activeElement === toggleBtn || document.activeElement === skipBtn)) {
      focusOnTo(link, () => state === "hold" && focusLostOr(toggleBtn, skipBtn));
    }
    holdLeft = heroVsl.hold;
    setState("hold");
    schedule();
  }

  /* ---- the film can't carry on here: it goes for good ---- */

  function vslFailed() {
    canPlay = false;
    if (state === "hero") dropFilm();
    else toHero();
  }

  function dropFilm() {
    film?.destroy();
    film = null;
    settle();
  }

  /* ---- the film leaves, the hero's words come back ---- */

  function toHero() {
    if (state === "hero" || state === "outro") return;
    const focusInside = layer.contains(document.activeElement);
    move?.kill();
    film?.pause();
    setState("outro");
    const back = VSL_IN * 0.7;
    move = gsap.timeline({
      onComplete() {
        move = null;
        played = true;
        if (canPlay) film?.stop();
        else dropFilm();
        showLayer(false);
        setState("hero");
      },
    });
    move
      .to(layer, { autoAlpha: 0, duration: VSL_IN * 0.8, ease: "power2.in" }, 0)
      .call(
        () => {
          replayBtn.dataset.kind = "replay";
          replayLabel.textContent = "Replay animation";
          replayBtn.hidden = !canPlay;
        },
        undefined,
        back
      )
      .set(ctaRow, { visibility: "visible" }, back)
      .fromTo(
        words,
        { opacity: 0, y: 18, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        },
        back
      )
      .set(copy, { pointerEvents: "" }, back)
      .call(
        () => {
          const to = canPlay ? replayBtn : bookLink;
          if (!focusInside || !to) return;
          focusOnTo(
            to,
            () =>
              (state === "outro" || state === "hero") &&
              (focusLostOr() || layer.contains(document.activeElement))
          );
        },
        undefined,
        back + 0.1
      );
  }

  /* ---- listeners ---- */

  // Someone pointing at the end card's button and links, or tabbing through
  // the film, gets more time: they don't vanish on the way to a click.
  function onPointerEnter(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    pointerIn = true;
    schedule();
  }
  function onPointerLeave() {
    pointerIn = false;
    schedule();
  }
  // (Focus the player moved there itself doesn't count: someone who pressed
  // play from the keyboard and just watched gets the usual hold.)
  function onFocusIn(e: FocusEvent) {
    if (movingFocus) return;
    keyboardIn = e.target instanceof Element && focusVisible(e.target);
    schedule();
  }
  function onFocusOut(e: FocusEvent) {
    const next = e.relatedTarget;
    if (!(next instanceof Node) || !layer.contains(next)) {
      keyboardIn = false;
      schedule();
    }
  }
  function onVisibility() {
    pageVisible = document.visibilityState === "visible";
    schedule();
  }
  // The hero's own buttons: the wait before the film holds while they are
  // in use (`onHeroButtons`).
  function onHeroPointer(e: PointerEvent) {
    pointerOnHero = e.type === "pointerenter" && e.pointerType === "mouse";
    schedule();
  }
  // Less motion: no autoplay, and the button plays it on request. No film
  // at all: no button either (focus on it moves to the booking button).
  function settle() {
    replayBtn.dataset.kind = played ? "replay" : "play";
    replayLabel.textContent = played ? "Replay animation" : "Play animation";
    const hide = !canPlay || (!played && !reducedQuery.matches);
    if (hide && document.activeElement === replayBtn) bookLink?.focus({ preventScroll: true });
    replayBtn.hidden = hide;
    schedule();
  }
  // Builds the film once the browser is idle, unless it is built or on
  // its way. Also for someone pointing at or tabbing to "Play animation",
  // so pressing the button doesn't wait for it.
  function buildSoon() {
    if (film || !canPlay || buildPending) return;
    buildPending = true;
    cancelBuild = whenIdle(() => {
      buildPending = false;
      ensureFilm();
    });
  }
  function onReducedChange() {
    if (!reducedQuery.matches && inView) buildSoon();
    settle();
  }

  replayBtn.addEventListener("click", toVsl);
  replayBtn.addEventListener("pointerenter", buildSoon);
  replayBtn.addEventListener("focus", buildSoon);
  endLinks.addEventListener("pointerenter", onPointerEnter);
  endLinks.addEventListener("pointerleave", onPointerLeave);
  layer.addEventListener("focusin", onFocusIn);
  layer.addEventListener("focusout", onFocusOut);
  ctaRow.addEventListener("pointerenter", onHeroPointer);
  ctaRow.addEventListener("pointerleave", onHeroPointer);
  copy.addEventListener("focusin", schedule);
  copy.addEventListener("focusout", schedule);
  document.addEventListener("visibilitychange", onVisibility);
  reducedQuery.addEventListener("change", onReducedChange);

  // At least half the hero on screen: of its height, or of the screen's
  // where it runs taller than the screen (a phone on its side, very large
  // text), so that it can always get there.
  const viewObserver = new IntersectionObserver(
    (entries) => {
      const e = entries[entries.length - 1];
      const whole = Math.min(e.boundingClientRect.height, e.rootBounds?.height ?? window.innerHeight);
      inView = e.isIntersecting && e.intersectionRect.height >= 0.5 * whole - 0.5;
      // The film is built in the wait before it autoplays, once the browser
      // is idle, so it is ready on time without holding up the page's first
      // moments (and not at all for a visit that never sees the hero).
      if (inView && !played && !reducedQuery.matches) buildSoon();
      schedule();
    },
    { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
  );
  viewObserver.observe(top);

  setState("hero");
  settle();

  return () => {
    cancelBuild();
    cancelAnimationFrame(raf);
    raf = 0;
    move?.kill();
    move = null;
    viewObserver.disconnect();
    replayBtn.removeEventListener("click", toVsl);
    replayBtn.removeEventListener("pointerenter", buildSoon);
    replayBtn.removeEventListener("focus", buildSoon);
    endLinks.removeEventListener("pointerenter", onPointerEnter);
    endLinks.removeEventListener("pointerleave", onPointerLeave);
    layer.removeEventListener("focusin", onFocusIn);
    layer.removeEventListener("focusout", onFocusOut);
    ctaRow.removeEventListener("pointerenter", onHeroPointer);
    ctaRow.removeEventListener("pointerleave", onHeroPointer);
    copy.removeEventListener("focusin", schedule);
    copy.removeEventListener("focusout", schedule);
    document.removeEventListener("visibilitychange", onVisibility);
    reducedQuery.removeEventListener("change", onReducedChange);
    film?.destroy();
    film = null;
    canPlay = false;
    gsap.set(words, { clearProps: "opacity,transform,filter,visibility" });
    gsap.set(copy, { clearProps: "pointerEvents" });
    gsap.set(layer, { clearProps: "opacity,visibility" });
    showLayer(false);
    replayBtn.hidden = true;
    delete top.dataset.heroState;
  };
}
