"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

/** How long each slide faces front while the ring turns on its own. */
const AUTOPLAY_MS = 4500;

/** Degrees the ring turns per pixel dragged. */
const DRAG_DEG_PER_PX = 0.35;

/** A drag shorter than this is still a click. */
const CLICK_SLOP_PX = 6;

/** Space between neighbouring cards around the ring, in pixels. */
const RING_GAP = 28;

/**
 * "Our projects" as a 360° ring: the slides stand around a cylinder that
 * turns in 3D, so the carousel never ends. Past the last slide the first one
 * comes round again, in either direction. The owner asked for a "true 360°
 * carousel", 2026-10-04.
 *
 * The ring turns by dragging or swiping it sideways (vertical swipes still
 * scroll the page), a sideways trackpad scroll, the arrows, the dots, the
 * arrow keys once it has focus, or a click on a side card. On its own it
 * steps to the next slide every few seconds, and stops for a hover, keyboard
 * focus, a drag, the pause button, a hidden tab or the section being off
 * screen. Under prefers-reduced-motion it never turns on its own and every
 * move is instant.
 *
 * `rotation` is unbounded, never wrapped to 0–360, so the ring always takes
 * the short way round and a step past the last slide keeps turning the same
 * way instead of spinning back. Only the front slide can be reached by
 * keyboard or assistive tech (the rest are `inert`), as in a flat carousel.
 */
export function ProjectsCarousel({
  slides,
  label,
}: {
  slides: ReactNode[];
  label: string;
}) {
  const count = slides.length;
  const step = 360 / count;

  const regionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const dragRef = useRef<{
    id: number;
    x: number;
    startRotation: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const wheelTimerRef = useRef(0);

  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const mod = (n: number, m: number) => ((n % m) + m) % m;
  const active = mod(Math.round(-rotation / step), count);

  // Cards are sized by CSS; the ring's radius and the stage's height follow
  // whatever size they come out at.
  useLayoutEffect(() => {
    const measure = () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLLIElement[];
      if (!cards.length) return;
      setSize({
        width: cards[0].offsetWidth,
        height: Math.max(...cards.map((c) => c.offsetHeight)),
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    cardRefs.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  const snap = useCallback(
    (value: number) => Math.round(value / step) * step,
    [step]
  );

  const goTo = useCallback(
    (index: number) => {
      setRotation((current) => {
        const from = mod(Math.round(-current / step), count);
        let delta = mod(index - from, count);
        if (delta > count / 2) delta -= count;
        return snap(current) - delta * step;
      });
    },
    [count, snap, step]
  );

  const next = useCallback(
    () => setRotation((r) => snap(r) - step),
    [snap, step]
  );
  const prev = useCallback(
    () => setRotation((r) => snap(r) + step),
    [snap, step]
  );

  // Autoplay. The timer restarts whenever the ring moves, so a slide the
  // visitor turned to gets its full time at the front.
  const autoplay =
    count > 1 &&
    !paused &&
    !hovered &&
    !focused &&
    !dragging &&
    visible &&
    !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") next();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [autoplay, next, rotation]);

  // A sideways trackpad scroll turns the ring, and settles on a slide once
  // the gesture stops. The listener is non-passive so that the same swipe
  // can't also trigger the browser's back/forward gesture.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      setDragging(true);
      setRotation((r) => r - e.deltaX * DRAG_DEG_PER_PX);
      window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => {
        setDragging(false);
        setRotation((r) => snap(r));
      }, 140);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      window.clearTimeout(wheelTimerRef.current);
    };
  }, [snap]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = {
      id: e.pointerId,
      x: e.clientX,
      startRotation: rotation,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved) {
      if (Math.abs(dx) < CLICK_SLOP_PX) return;
      drag.moved = true;
      setDragging(true);
      // Captured only once it is really a drag, so a plain click still
      // reaches the link or card under the pointer.
      stageRef.current?.setPointerCapture(e.pointerId);
    }
    setRotation(drag.startRotation + dx * DRAG_DEG_PER_PX);
  };

  const endDrag = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    dragRef.current = null;
    if (!drag.moved) return;
    suppressClickRef.current = true;
    setDragging(false);
    // A quick flick past a quarter of a step counts as a step.
    const turned = rotation - drag.startRotation;
    const target =
      Math.abs(turned) > step / 4 && Math.abs(turned) < step
        ? drag.startRotation + Math.sign(turned) * step
        : snap(rotation);
    setRotation(snap(target));
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  // The distance from a card's centre to the ring's axis that leaves
  // RING_GAP between neighbours. Two cards stand back to back.
  const radius =
    size.width === 0
      ? 0
      : count < 3
        ? size.width / 4 + RING_GAP
        : (size.width + RING_GAP) / 2 / Math.tan(Math.PI / count);

  const animate = !dragging && !reducedMotion;

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      className="relative mx-auto max-w-5xl"
    >
      <div
        ref={stageRef}
        tabIndex={0}
        aria-label={`${label}: use the left and right arrow keys to turn the carousel`}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className={clsx(
          // Until the cards are measured, the stage holds a placeholder's
          // height (16:10 at the card's width) so nothing jumps.
          !size.height && "h-[calc(min(68vw,26rem)*0.625)]",
          "relative touch-pan-y select-none rounded-xl [perspective:1100px] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brass-300",
          dragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{ height: size.height || undefined }}
      >
        {/* A soft brass floor under the ring, so it reads as standing in a
            space rather than floating. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-20 rounded-[50%] bg-[radial-gradient(closest-side,rgba(212,168,87,0.18),transparent)] blur-md"
        />

        <ul
          aria-live={autoplay ? "off" : "polite"}
          className={clsx(
            "absolute inset-0 [transform-style:preserve-3d]",
            animate &&
              "transition-transform duration-700 ease-[cubic-bezier(0.22,0.8,0.24,1)]"
          )}
          style={{
            transform: `translateZ(${-radius}px) rotateY(${rotation}deg)`,
          }}
        >
          {slides.map((slide, i) => {
            // How far this card is turned from the front, in -180..180.
            const offset = mod(i * step + rotation + 180, 360) - 180;
            const isFront = i === active;
            const dim = Math.min(1, Math.abs(offset) / 180);
            return (
              <li
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                onClick={isFront ? undefined : () => goTo(i)}
                className={clsx(
                  "absolute top-1/2 left-1/2 flex w-[min(68vw,26rem)] [backface-visibility:hidden]",
                  animate &&
                    "transition-[opacity,filter] duration-700 ease-[cubic-bezier(0.22,0.8,0.24,1)]"
                )}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
                  opacity: 1 - dim * 0.7,
                  filter: `brightness(${1 - dim * 0.5})`,
                }}
              >
                <div inert={!isFront} className="flex w-full rounded-xl bg-[#0e0e0e]">
                  {slide}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-14 flex items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous project"
          className={arrowClass}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1} of ${count}`}
              aria-current={i === active ? "true" : undefined}
              className="group inline-flex h-11 w-7 items-center justify-center focus-visible:outline-2 focus-visible:outline-brass-300"
            >
              <span
                className={clsx(
                  "block h-2 rounded-full transition-all duration-300",
                  i === active
                    ? "w-6 bg-brass-300"
                    : "w-2 bg-white/25 group-hover:bg-white/50"
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next project"
          className={arrowClass}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play the carousel" : "Pause the carousel"}
            className="ml-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-brass-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300"
          >
            {paused ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

const arrowClass =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-neutral-200 transition-colors hover:border-brass-300 hover:text-brass-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300";
