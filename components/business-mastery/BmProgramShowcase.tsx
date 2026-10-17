"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, MousePointerClick } from "lucide-react";
import { pillarIcons } from "@/components/business-mastery/bmPillarIcons";

interface Pillar {
  id: string;
  title: string;
  description: string;
}

/**
 * What membership includes, from lg up: the pillars as a numbered list of
 * tabs beside one large panel, under a one-line hint that the list can be
 * clicked through. It steps through them on its own, a gold bar
 * filling under the current one, pausing while the pointer or focus is on it
 * and stopping for good once the visitor picks one. It starts only once on
 * screen, and under reduced motion it never advances by itself.
 *
 * Below lg, BmProgramSection renders the same pillars as a plain list
 * instead, so a phone gets every description without tapping.
 */
export function BmProgramShowcase({ pillars }: { pillars: readonly Pillar[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [picked, setPicked] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const el = rootRef.current;
    const observer = el
      ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
          threshold: 0.4,
        })
      : null;
    if (el && observer) observer.observe(el);
    return () => {
      media.removeEventListener("change", update);
      observer?.disconnect();
    };
  }, []);

  const cycling = !picked && !reduced;
  const running = cycling && inView && !hovering;

  const choose = (index: number, focus = false) => {
    setPicked(true);
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = pillars.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? index === last ? 0 : index + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? index === 0 ? last : index - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    choose(next, true);
  };

  const current = pillars[active];
  const Icon = pillarIcons[current.id] ?? BookOpen;

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] items-stretch gap-10 xl:gap-16"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovering(false);
      }}
    >
      <div>
        {/* The directory's hint (the owner's request, 2026-09-29): says the
            list is clickable, since it also steps through on its own. The icon
            pulses until the visitor picks one. */}
        <p
          id="bm-pillar-hint"
          className="mb-4 flex items-center gap-2.5 text-sm font-semibold text-neutral-300"
        >
          <MousePointerClick
            className={`h-4 w-4 text-amber-400 ${picked ? "" : "motion-safe:animate-pulse"}`}
            aria-hidden="true"
          />
          Click through each one to see what&apos;s included
        </p>
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="What membership includes"
          aria-describedby="bm-pillar-hint"
        >
          {pillars.map((pillar, i) => {
            const selected = i === active;
            return (
              <button
                key={pillar.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`bm-pillar-tab-${pillar.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="bm-pillar-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group relative flex w-full items-baseline gap-5 border-t border-white/10 py-5 text-left transition-colors last:border-b focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                <span
                  className={`text-sm font-semibold tabular-nums transition-colors ${
                    selected ? "text-amber-400" : "text-neutral-600 group-hover:text-neutral-400"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-xl font-bold tracking-tight transition-colors xl:text-2xl ${
                    selected ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                  }`}
                >
                  {pillar.title}
                </span>
                {/* The timer: fills over the dwell time, then hands on. */}
                {selected && (
                  <span
                    key={`${active}-${cycling}`}
                    aria-hidden="true"
                    className={`bm-tab-progress ${cycling ? "" : "bm-tab-progress--full"}`}
                    style={{ animationPlayState: running ? "running" : "paused" }}
                    onAnimationEnd={() => setActive((a) => (a + 1) % pillars.length)}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="bm-pillar-panel"
        role="tabpanel"
        aria-labelledby={`bm-pillar-tab-${current.id}`}
        className="bm-shift-panel relative flex min-h-[26rem] flex-col justify-between overflow-hidden p-10 xl:p-12"
      >
        <div key={current.id} className="bm-panel-in relative">
          <span className="bm-orbit" aria-hidden="true">
            <span className="bm-orbit-ring" />
            <Icon className="relative h-9 w-9 text-amber-300" />
          </span>
          <h3 className="mt-10 text-3xl font-bold tracking-tight text-white xl:text-4xl">
            {current.title}
          </h3>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-neutral-300">
            {current.description}
          </p>
        </div>
        <p className="relative mt-10 flex items-center justify-between text-sm text-neutral-500">
          <span>Included with membership</span>
          <span className="tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
          </span>
        </p>
      </div>
    </div>
  );
}
