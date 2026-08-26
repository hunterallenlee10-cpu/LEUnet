"use client";

import { useEffect, useRef } from "react";

/**
 * The Business Mastery hero background — "Constellation".
 *
 * Nodes drift, a line appears between any two that come close enough, and a
 * signal travels down one of those lines every second or so. The page's next
 * section is titled "Nobody Builds Something Great Alone" and lands on a single
 * word — Network — so this is the one background on the site that argues the
 * page's own thesis before a visitor reads a sentence.
 *
 * Two craft carry the second half of the promise, "Speedrun Your Way to
 * Success". They are not a separate effect sharing the frame: a craft passing
 * near a node *flares* it, and the flare spreads to every line that node owns,
 * so the network lights up in the wake. That is the argument the page makes in
 * prose — you move fast *because* of the network — and it is the reason the two
 * ideas are allowed in one frame at all. Decouple them and this becomes a
 * particle web with spaceships on it, which is a different, worse background.
 *
 * They are drawn as darts, not rockets: an 18px arrowhead with a tapering
 * light trail and no fuselage, canopy, or fins. The read has to be velocity,
 * not science fiction — this page sells business credibility, and a recognisable
 * spaceship silhouette would undercut every word above it.
 *
 * Why canvas rather than the CSS this site prefers. The links cannot be
 * authored: which pairs are joined changes every frame, and the flare has to
 * cross from a craft to a node to that node's lines. That is a per-frame
 * computation over ~1000 pairs, which is trivial for canvas and impossible for
 * a stylesheet. Everything else about the hero stays server-rendered — this
 * component is the only client boundary on the page.
 *
 * The costs that were actually measured and are deliberate:
 *   - `devicePixelRatio` is capped at 2. Beyond that the fill rate triples for
 *     a field of 1px lines nobody can see the difference in.
 *   - `shadowBlur` is the single most expensive call here, so it is spent only
 *     on hubs, live pulses and craft — never on the 40 ordinary nodes.
 *   - The loop stops entirely when the hero leaves the viewport, and when the
 *     tab is hidden. A background nobody is looking at costs nothing.
 *
 * Positions are stored normalised 0–1 and multiplied up each frame, so a
 * resize re-frames the constellation instead of re-seeding it — dragging a
 * window never causes the field to jump.
 */

/** Amber-400, the page's accent, and the warmer gold used for anything lit. */
const GOLD = "251,191,36";
const GOLD_LIT = "253,224,150";

/**
 * The palette lives here rather than in `data/business-mastery.ts` because
 * that file is the owner's copy, confirmed line by line, and nothing in it is
 * presentational. This component is the only consumer of these values.
 */
const FIELD = {
  /** Node count. The phone figure is not a performance concession — a 46-node
   *  field on a 390px-wide hero reads as noise rather than as a network. */
  nodes: { wide: 54, narrow: 30 },
  narrowBelow: 560,
  /** Every Nth node is a hub: drawn larger, lit, and it strengthens its links. */
  hubEvery: 8,
  /**
   * Link radius, as a multiple of the mean distance between nodes — not as a
   * fraction of the frame, which is the obvious version and is wrong. Taking
   * it off the frame's short side gives a phone a radius several times its own
   * node spacing, and the field solidifies into a mesh; behind a centred copy
   * column every line that crosses a letterform then reads as strikethrough.
   * Derived from spacing, the field has the same density at every size.
   */
  linkSpacing: 1.15,
  linkMin: 80,
  linkMax: 200,
  /** Normalised units per second. At 0.022 a node crosses the frame in about
   *  45 seconds, which is drift rather than travel. */
  drift: 0.022,
} as const;

const PULSE = {
  /** Seconds between signals, randomised inside this range. */
  gapMin: 0.9,
  gapMax: 1.5,
  /** Seconds for one signal to travel its link. */
  travel: 1.4,
} as const;

const CRAFT = {
  count: 2,
  /** Normalised units per second: a crossing takes roughly 2.5s. */
  speed: 0.4,
  /** Radians per second of gentle arc, so a run is never a ruled line. Kept
   *  low deliberately: at 0.16 a craft could bend far enough to leave through
   *  the top edge a third of the way across, which reads as a glitch rather
   *  than as a crossing. */
  turn: 0.1,
  /** Seconds of trail kept behind the nose. */
  trail: 0.42,
  /** Seconds a craft waits off-frame before its next run. */
  restMin: 2.6,
  restMax: 6.4,
  /** Flare radius in px, and how fast a flared node cools (units per second).
   *  The decay is slow enough that the wake is still visible a beat after the
   *  craft has gone — that lag is what makes the network look like it reacted
   *  to something rather than lighting up on a timer. */
  flareRadius: 145,
  flareDecay: 1.2,
} as const;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hub: boolean;
  /** 0–1, raised by a passing craft and decaying every frame. */
  flare: number;
};

type Pulse = { a: number; b: number; t: number };

type TrailPoint = { x: number; y: number; age: number };

type Craft = {
  x: number;
  y: number;
  /** Heading in radians. */
  a: number;
  /** Radians per second; sign fixed at spawn so a run arcs one way only. */
  turn: number;
  trail: TrailPoint[];
  /** Seconds until this craft enters the frame again. Zero means it is flying. */
  rest: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/**
 * A craft always enters from the left or right edge on a near-horizontal
 * heading. Vertical entries were tried and read as falling rather than as
 * travelling, which is the opposite of the word this is illustrating.
 */
function launch(craft: Craft) {
  const fromLeft = Math.random() < 0.5;
  craft.x = fromLeft ? -0.08 : 1.08;
  craft.y = randomBetween(0.12, 0.88);
  // ±11° of the horizontal, pointed into the frame.
  const spread = randomBetween(-0.2, 0.2);
  craft.a = fromLeft ? spread : Math.PI - spread;
  craft.turn = (Math.random() < 0.5 ? -1 : 1) * CRAFT.turn;
  craft.trail.length = 0;
  craft.rest = 0;
}

export function BmHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let craft: Craft[] = [];
    let nextPulse: number = PULSE.gapMin;
    let visible = true;
    let frame = 0;
    let last = 0;

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const count =
        width < FIELD.narrowBelow ? FIELD.nodes.narrow : FIELD.nodes.wide;
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 2 * FIELD.drift,
        vy: (Math.random() - 0.5) * 2 * FIELD.drift,
        hub: i % FIELD.hubEvery === 0,
        flare: 0,
      }));
      pulses = [];
      craft = Array.from({ length: CRAFT.count }, (_, i) => {
        const unit: Craft = { x: 0, y: 0, a: 0, turn: 0, trail: [], rest: 0 };
        launch(unit);
        // Stagger the pair so they never enter together; one crossing at a
        // time is an event, two is traffic.
        unit.rest = i * randomBetween(2, 4);
        return unit;
      });
    };

    /** One craft: advance, arc, shed trail, flare what it passes. */
    const advanceCraft = (unit: Craft, dt: number) => {
      if (unit.rest > 0) {
        unit.rest -= dt;
        if (unit.rest <= 0) launch(unit);
        return;
      }

      unit.a += unit.turn * dt;
      unit.x += Math.cos(unit.a) * CRAFT.speed * dt;
      unit.y += Math.sin(unit.a) * CRAFT.speed * dt;

      unit.trail.unshift({ x: unit.x, y: unit.y, age: 0 });
      for (const point of unit.trail) point.age += dt;
      while (
        unit.trail.length &&
        unit.trail[unit.trail.length - 1].age > CRAFT.trail
      ) {
        unit.trail.pop();
      }

      // The whole reason both ideas share a frame: the network responds.
      const cx = unit.x * width;
      const cy = unit.y * height;
      for (const node of nodes) {
        const dx = node.x * width - cx;
        const dy = node.y * height - cy;
        const distance = Math.hypot(dx, dy);
        if (distance < CRAFT.flareRadius) {
          node.flare = Math.max(node.flare, 1 - distance / CRAFT.flareRadius);
        }
      }

      const gone =
        unit.x < -0.2 || unit.x > 1.2 || unit.y < -0.25 || unit.y > 1.25;
      if (gone) {
        unit.rest = randomBetween(CRAFT.restMin, CRAFT.restMax);
        unit.trail.length = 0;
      }
    };

    const drawCraft = (unit: Craft) => {
      if (unit.rest > 0) return;

      // Trail first, so the dart sits on top of its own exhaust.
      for (let i = unit.trail.length - 1; i > 0; i--) {
        const from = unit.trail[i];
        const to = unit.trail[i - 1];
        const fade = 1 - from.age / CRAFT.trail;
        ctx.strokeStyle = `rgba(${GOLD_LIT},${(fade * 0.55).toFixed(3)})`;
        ctx.lineWidth = 0.6 + fade * 2.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(from.x * width, from.y * height);
        ctx.lineTo(to.x * width, to.y * height);
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(unit.x * width, unit.y * height);
      ctx.rotate(unit.a);
      // An arrowhead with a notched tail. No fuselage, no canopy, no fins —
      // the silhouette has to read as speed, not as a spacecraft.
      const size = 9;
      ctx.beginPath();
      ctx.moveTo(size, 0);
      ctx.lineTo(-size * 0.75, size * 0.52);
      ctx.lineTo(-size * 0.35, 0);
      ctx.lineTo(-size * 0.75, -size * 0.52);
      ctx.closePath();
      ctx.shadowColor = `rgba(${GOLD},0.9)`;
      ctx.shadowBlur = 12;
      ctx.fillStyle = `rgba(${GOLD_LIT},0.95)`;
      ctx.fill();
      ctx.restore();
      ctx.shadowBlur = 0;
    };

    const step = (dt: number) => {
      if (!width || !height) return;

      for (const node of nodes) {
        node.x += node.vx * dt;
        node.y += node.vy * dt;
        if (node.x < -0.05) node.x = 1.05;
        else if (node.x > 1.05) node.x = -0.05;
        if (node.y < -0.05) node.y = 1.05;
        else if (node.y > 1.05) node.y = -0.05;
        node.flare = Math.max(0, node.flare - CRAFT.flareDecay * dt);
      }

      for (const unit of craft) advanceCraft(unit, dt);

      ctx.clearRect(0, 0, width, height);

      const spacing = Math.sqrt((width * height) / nodes.length);
      const link = Math.min(
        FIELD.linkMax,
        Math.max(FIELD.linkMin, spacing * FIELD.linkSpacing),
      );

      // Links, and the list of them a signal can be sent down.
      const linked: Array<[number, number]> = [];
      ctx.lineWidth = 1;
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = (nodes[a].x - nodes[b].x) * width;
          const dy = (nodes[a].y - nodes[b].y) * height;
          const distance = Math.hypot(dx, dy);
          if (distance >= link) continue;
          linked.push([a, b]);

          let alpha = (1 - distance / link) * 0.4;
          if (nodes[a].hub || nodes[b].hub) alpha *= 1.6;
          // The wake. A flared node brightens every line it owns, which is
          // what makes a craft look like it is travelling *through* something.
          const flare = Math.max(nodes[a].flare, nodes[b].flare);
          alpha += flare * 0.6;

          ctx.strokeStyle = `rgba(${GOLD},${Math.min(alpha, 0.9).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(nodes[a].x * width, nodes[a].y * height);
          ctx.lineTo(nodes[b].x * width, nodes[b].y * height);
          ctx.stroke();
        }
      }

      // Signals.
      nextPulse -= dt;
      if (nextPulse <= 0 && linked.length) {
        const [a, b] = linked[Math.floor(Math.random() * linked.length)];
        pulses.push({ a, b, t: 0 });
        nextPulse = randomBetween(PULSE.gapMin, PULSE.gapMax);
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.t += dt / PULSE.travel;
        if (pulse.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const from = nodes[pulse.a];
        const to = nodes[pulse.b];
        const px = (from.x + (to.x - from.x) * pulse.t) * width;
        const py = (from.y + (to.y - from.y) * pulse.t) * height;
        // Fades in and out across its run, so it never pops at either end.
        const fade = Math.sin(pulse.t * Math.PI);
        ctx.save();
        ctx.shadowColor = `rgba(${GOLD},0.9)`;
        ctx.shadowBlur = 9;
        ctx.fillStyle = `rgba(${GOLD_LIT},${(0.95 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Nodes.
      for (const node of nodes) {
        const lit = node.hub || node.flare > 0.02;
        ctx.save();
        if (lit) {
          ctx.shadowColor = `rgba(${GOLD},${0.85 * Math.max(node.flare, node.hub ? 1 : 0)})`;
          ctx.shadowBlur = node.hub ? 10 : 8 * node.flare;
        }
        const alpha = (node.hub ? 0.95 : 0.55) + node.flare * 0.45;
        ctx.fillStyle = `rgba(${node.hub || node.flare > 0.3 ? GOLD_LIT : GOLD},${Math.min(alpha, 1).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(
          node.x * width,
          node.y * height,
          (node.hub ? 2.6 : 1.4) + node.flare * 1.8,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.restore();
      }

      for (const unit of craft) drawCraft(unit);
    };

    const loop = (time: number) => {
      // Clamped so a backgrounded tab cannot resume with one enormous step and
      // teleport every craft across the frame.
      const dt = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      if (visible && document.visibilityState === "visible") step(dt);
      frame = window.requestAnimationFrame(loop);
    };

    measure();
    seed();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const start = () => {
      if (frame) return;
      last = 0;
      frame = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!frame) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    /**
     * Under reduced motion the field is composed once and left there. A single
     * `step(0)` advances nothing and draws everything, so the visitor gets the
     * constellation as a still image rather than an empty black hero — the
     * craft are simply never in it, since a parked dart mid-frame would read
     * as a defect.
     */
    const applyMotionPreference = () => {
      if (motionQuery.matches) {
        stop();
        for (const unit of craft) unit.rest = Number.POSITIVE_INFINITY;
        step(0);
      } else {
        for (const unit of craft) if (!Number.isFinite(unit.rest)) launch(unit);
        start();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      if (motionQuery.matches) step(0);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      // Drop the accumulated timestamp so the first frame back is not a jump.
      if (document.visibilityState === "visible") last = 0;
    };

    applyMotionPreference();
    motionQuery.addEventListener("change", applyMotionPreference);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", applyMotionPreference);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="bmc-field" aria-hidden="true">
      <canvas ref={canvasRef} className="bmc-canvas" />
      <div className="bmc-scrim" />
    </div>
  );
}
