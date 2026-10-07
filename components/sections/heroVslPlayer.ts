import { gsap } from "gsap";
import { heroVsl } from "@/data/hero-vsl";
import { createHolo } from "./heroVslEngine";

/**
 * The homepage hero around its animation (HeroVsl.tsx). HeroStage.tsx loads
 * this once the page is interactive and hands it the hero's first screen.
 *
 * The regular hero shows first. After `heroVsl.startDelay` seconds with the
 * hero on screen, its words leave and the animation plays in their place.
 * Its end card holds for `heroVsl.hold` seconds (longer while someone points
 * at its button or links, or tabs through them), then the words come back
 * with a "Replay animation" button beside the booking button. Every page
 * load plays it once by itself; people whose device asks for less motion get
 * a "Play animation" button instead and nothing starts on its own.
 *
 * Both waits only count while the hero is at least half on screen and the
 * tab is open. Returns a function that stops everything and puts the hero
 * back the way the server sent it.
 */

/** The hero's words leave, and the animation arrives (and leaves), in seconds. */
const WORDS_OUT = 0.55;
const VSL_IN = 0.8;

type HeroState = "hero" | "intro" | "vsl" | "hold" | "outro";

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

export function mountHeroVsl(top: HTMLElement): () => void {
  const copy = need(top, "[data-hero-copy]");
  const ctaRow = need(copy, ".hero-split-cta");
  const words = [need(copy, ".hero-split-title"), need(copy, ".hero-split-lede"), ctaRow];
  const replayBtn = need<HTMLButtonElement>(copy, "[data-hero-replay]");
  const replayLabel = need(replayBtn, "[data-hero-replay-label]");
  const layer = need(top, "[data-hero-vsl]");
  const cones = Array.from(layer.querySelectorAll(".holo-cone, .holo-cone-boost"));
  const stage = need(layer, ".holo-stage");
  const toggleBtn = need<HTMLButtonElement>(layer, ".holo-toggle");
  const skipBtn = need<HTMLButtonElement>(layer, ".holo-skip");
  const endLinks = need(stage, ".holo-ctas");

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
  let move: gsap.core.Timeline | null = null;
  let last = 0;
  let raf = 0;

  const holo = createHolo(need(layer, "[data-holo]"), { onDone: vslDone });

  function setState(s: HeroState) {
    state = s;
    top.dataset.heroState = s;
  }

  /* ---- one clock for both waits; it only runs while it counts ---- */

  function counting() {
    if (!inView || !pageVisible) return false;
    if (state === "hero") return !played && !reducedQuery.matches && waitLeft > 0;
    if (state === "hold") return !pointerIn && !keyboardIn;
    return false;
  }

  function tick(now: number) {
    raf = 0;
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
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

  /* ---- the hero's words leave, the animation arrives and plays ---- */

  function toVsl() {
    if (state !== "hero") return;
    // Pressed from the keyboard: carry on at the animation's pause button.
    const fromKeyboard = document.activeElement === replayBtn && focusVisible(replayBtn);
    move?.kill();
    setState("intro");
    showLayer(true);
    const arrive = WORDS_OUT * 0.8;
    move = gsap.timeline({
      onComplete() {
        move = null;
        // Already on to its end card (a keyboard user who tabs to the end
        // card's links skips there): that hold stands.
        if (state !== "intro") return;
        setState("vsl");
        if (fromKeyboard) toggleBtn.focus({ preventScroll: true });
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
      .set(ctaRow, { visibility: "hidden" }, WORDS_OUT + 0.15)
      .fromTo(
        layer,
        { autoAlpha: 0, filter: "blur(10px)" },
        { autoAlpha: 1, filter: "blur(0px)", duration: VSL_IN, ease: "power2.out" },
        arrive
      )
      .fromTo(
        cones,
        { scaleY: 0 },
        { scaleY: 1, duration: VSL_IN + 0.25, ease: "power3.out" },
        arrive
      )
      .call(() => holo.start(), undefined, arrive);
  }

  /* ---- the animation has reached the end of its end card: hold it ---- */

  function vslDone() {
    if (state !== "vsl" && state !== "intro") return;
    // The pause and skip buttons go with nothing left to pause or skip; focus
    // on either moves to the end card's booking button rather than being
    // dropped.
    if (document.activeElement === toggleBtn || document.activeElement === skipBtn) {
      endLinks.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    }
    holdLeft = heroVsl.hold;
    setState("hold");
    schedule();
  }

  /* ---- the animation leaves, the hero's words come back ---- */

  function toHero() {
    if (state === "hero" || state === "outro") return;
    const focusInside = layer.contains(document.activeElement);
    move?.kill();
    holo.pause();
    setState("outro");
    const back = VSL_IN * 0.7;
    move = gsap.timeline({
      onComplete() {
        move = null;
        holo.stop();
        gsap.set(cones, { clearProps: "transform" });
        showLayer(false);
        played = true;
        setState("hero");
      },
    });
    move
      .to(layer, { autoAlpha: 0, filter: "blur(8px)", duration: VSL_IN * 0.8, ease: "power2.in" }, 0)
      .to(cones, { scaleY: 0, duration: VSL_IN * 0.8, ease: "power2.in" }, 0)
      .call(
        () => {
          replayBtn.dataset.kind = "replay";
          replayLabel.textContent = "Replay animation";
          replayBtn.hidden = false;
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
          if (focusInside) replayBtn.focus({ preventScroll: true });
        },
        undefined,
        back + 0.1
      );
  }

  /* ---- listeners ---- */

  // Someone pointing at the end card's button and links, or tabbing through
  // the animation, gets more time: they don't vanish on the way to a click.
  function onPointerEnter(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    pointerIn = true;
    schedule();
  }
  function onPointerLeave() {
    pointerIn = false;
    schedule();
  }
  function onFocusIn(e: FocusEvent) {
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
  // Less motion: no autoplay, and the button plays it on request.
  function settle() {
    replayBtn.dataset.kind = played ? "replay" : "play";
    replayLabel.textContent = played ? "Replay animation" : "Play animation";
    replayBtn.hidden = !played && !reducedQuery.matches;
    schedule();
  }

  replayBtn.addEventListener("click", toVsl);
  endLinks.addEventListener("pointerenter", onPointerEnter);
  endLinks.addEventListener("pointerleave", onPointerLeave);
  layer.addEventListener("focusin", onFocusIn);
  layer.addEventListener("focusout", onFocusOut);
  document.addEventListener("visibilitychange", onVisibility);
  reducedQuery.addEventListener("change", settle);

  const viewObserver = new IntersectionObserver(
    (entries) => {
      const e = entries[entries.length - 1];
      inView = e.isIntersecting && e.intersectionRatio >= 0.5;
      schedule();
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] }
  );
  viewObserver.observe(top);

  setState("hero");
  settle();

  return () => {
    cancelAnimationFrame(raf);
    raf = 0;
    move?.kill();
    move = null;
    viewObserver.disconnect();
    replayBtn.removeEventListener("click", toVsl);
    endLinks.removeEventListener("pointerenter", onPointerEnter);
    endLinks.removeEventListener("pointerleave", onPointerLeave);
    layer.removeEventListener("focusin", onFocusIn);
    layer.removeEventListener("focusout", onFocusOut);
    document.removeEventListener("visibilitychange", onVisibility);
    reducedQuery.removeEventListener("change", settle);
    holo.destroy();
    gsap.set(words, { clearProps: "opacity,transform,filter,visibility" });
    gsap.set(copy, { clearProps: "pointerEvents" });
    gsap.set(layer, { clearProps: "opacity,visibility,filter" });
    gsap.set(cones, { clearProps: "transform" });
    showLayer(false);
    replayBtn.hidden = true;
    delete top.dataset.heroState;
  };
}
