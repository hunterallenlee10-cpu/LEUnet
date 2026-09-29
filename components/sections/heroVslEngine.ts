import { gsap } from "gsap";
import {
  heroVsl,
  heroVslNicheAliases,
  heroVslNiches,
  type HeroVslNicheKey,
} from "@/data/hero-vsl";

/**
 * The engine behind the homepage hero's animation (HeroVsl.tsx draws it,
 * heroVslPlayer.ts decides when it plays). One GSAP timeline, about 30
 * seconds long, and a handful of things worked out from its time on every
 * frame: the coins, the bank filling, the count under it and the end card's
 * figures. Because each frame is a function of the time alone, the animation
 * looks the same however a moment is reached, and a resize mid-play just
 * redraws the current frame at the new size.
 *
 * It was built and reviewed as a standalone preview (the "Holographic VSL",
 * 2026-09-28 to 29) and is ported from it nearly line for line. What the
 * site doesn't use was left behind: the sound, the progress line, the skip
 * controls and the still version for reduced motion (the hero offers a
 * "Play animation" button instead).
 *
 * It only plays while at least 40% of it is on screen and the tab is open,
 * and picks up where it stopped. Only transforms, opacity and filters move.
 */

/* ---------- timing, in seconds ---------- */
const T = {
  total: 30,
  scenes: [
    ["leak", 0],
    ["switch", 7.9],
    ["seal", 8.9],
    ["web", 15.2],
    ["end", 22.0],
  ] as const,
  // The coin stream starts before 0, so coins are already falling at the
  // first frame.
  firstCoin: -2.2,
  coinEvery: 0.34,
  coinEveryWeb: 0.24,
  widenAt: 17.1,
  coinEveryWide: 0.12,
  lastCoin: 19.8,
  // Each gap: its automation starts, then it seals. Once the first gap seals
  // no coin is lost anywhere: the automations are on.
  fixStart: [8.95, 10.85, 12.75],
  sealAt: [9.5, 11.4, 13.3],
  leakChance: [0.42, 0.4, 0.4],
  // The money-lost count freezes at the first seal, holds a beat, then turns
  // over to money recovered.
  counterFlip: 10.1,
  // The headlines (the first is up at 0 and hands straight to the second).
  cap1Out: 9.05,
  cap2: [9.5, 14.8],
  cap3: [15.35, 21.6],
  cap3b: 16.1,
  // Each fix's moment on screen: in, out.
  pops: [
    [9.65, 11.0],
    [11.55, 12.9],
    [13.45, 14.8],
  ],
  // The end card: the pipe folds into the bank (start, length), the bank
  // flashes as it lands, and the numbers rise out of the beam.
  collapse: [22.0, 0.7],
  full: 22.7,
  stats: 23.0,
  statsSmall: 23.6,
  countLead: 2.6,
  countSmall: 2.2,
  pushIn: [23.0, 29.4],
  trust: 26.1,
  ctas: 26.7,
};

type Scene = (typeof T.scenes)[number][0];
const S = Object.fromEntries(T.scenes) as Record<Scene, number>;

/* ---------- the hologram's geometry, in its own 480 x 540 units ---------- */
type Source = "call" | "form" | "text" | "web";

const G = {
  src: {
    call: [192, 80],
    form: [240, 80],
    text: [288, 80],
    web: [345, 108.5],
  } as Record<Source, [number, number]>,
  mouthY: 121,
  // where a coin goes into the bank's roof
  enterY: 336,
  // how far the gold rises between the bank's columns
  vaultH: 52,
  gapY: [166, 234, 302],
  gapDir: [-1, 1, -1],
  // how a leaking coin leaves each gap: out, then out and down as it fades
  leakOut: [
    [58, 16, 100],
    [58, 16, 100],
    [72, 40, 70],
  ],
  lane: 240,
  lanesWide: [230.5, 249.5],
  speed: 230,
  inDur: 0.55,
  inDurWeb: 0.7,
  exitDur: 0.7,
  fallDur: 0.9,
  enterDur: 0.28,
};

// The counter's two amounts; the recovered one never ends below the loss.
const LOSS_END = Math.max(0, heroVsl.lossEnd);
const RECOVERED_END = Math.max(LOSS_END, heroVsl.recoveredEnd);

/** `?niche=roofing` plays that business type's version. */
function nicheFromUrl(): HeroVslNicheKey {
  let value = "";
  try {
    value = new URLSearchParams(window.location.search).get("niche") ?? "";
  } catch {
    value = "";
  }
  return heroVslNicheAliases[value.toLowerCase()] ?? "general";
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const E = {
  out2: (u: number) => 1 - (1 - u) * (1 - u),
  in2: (u: number) => u * u,
  out3: (u: number) => 1 - Math.pow(1 - u, 3),
  io2: (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2),
};

function clamp01(u: number) {
  return u < 0 ? 0 : u > 1 ? 1 : u;
}

/* ---------- the coin stream: every coin planned up front ---------- */

interface Coin {
  t0: number;
  src: Source;
  lane: number;
  inDur: number;
  /** The gap it falls out of, or -1 when it reaches the bank. */
  leak: number;
  tMouth: number;
  tGap: number;
  tEnter: number;
  tEnd: number;
  /** Which coin element draws it, or -1 when none was free. */
  slot: number;
}

/**
 * Seeded, so every playthrough is the same. Until a gap's automation starts,
 * some coins fall out of it; from the first seal on, every coin reaches the
 * bank.
 */
function planStream(pool: number) {
  const rnd = mulberry32(20260928);
  const coins: Coin[] = [];
  let t = T.firstCoin;
  let i = 0;
  while (t <= T.lastCoin) {
    const wide = t >= T.widenAt;
    const r = rnd();
    const src: Source = wide
      ? r < 0.4
        ? "web"
        : r < 0.6
          ? "call"
          : r < 0.8
            ? "form"
            : "text"
      : r < 0.42
        ? "call"
        : r < 0.71
          ? "form"
          : "text";
    const inDur = src === "web" ? G.inDurWeb : G.inDur;
    const c: Coin = {
      t0: t,
      src,
      lane: wide ? G.lanesWide[i % 2] : G.lane,
      inDur,
      leak: -1,
      tMouth: t + inDur,
      tGap: 0,
      tEnter: 0,
      tEnd: 0,
      slot: -1,
    };
    // The first four show the story plainly: one leak per gap, then a catch.
    const forced = i < 4 ? [0, 1, 2, -1][i] : null;
    for (let g = 0; g < 3; g++) {
      const tGap = c.tMouth + (G.gapY[g] - G.mouthY) / G.speed;
      if (tGap >= Math.min(T.fixStart[g], T.sealAt[0])) continue;
      const roll = rnd();
      if (forced !== null ? forced === g : roll < T.leakChance[g]) {
        c.leak = g;
        break;
      }
    }
    if (c.leak >= 0) {
      c.tGap = c.tMouth + (G.gapY[c.leak] - G.mouthY) / G.speed;
      c.tEnd = c.tGap + G.exitDur + G.fallDur;
    } else {
      c.tEnter = c.tMouth + (G.enterY - G.mouthY) / G.speed;
      c.tEnd = c.tEnter + G.enterDur;
    }
    coins.push(c);
    t += wide
      ? T.coinEveryWide
      : t >= S.web
        ? T.coinEveryWeb
        : T.coinEvery + (rnd() - 0.5) * 0.06;
    i++;
  }

  // Each coin borrows a free element; if none is free it is skipped.
  const freeAt: number[] = new Array(pool).fill(-99);
  const slots: Coin[][] = Array.from({ length: pool }, () => []);
  for (const c of coins) {
    for (let s = 0; s < pool; s++) {
      if (freeAt[s] <= c.t0 - 0.02) {
        c.slot = s;
        freeAt[s] = c.tEnd;
        slots[s].push(c);
        break;
      }
    }
  }

  const times = (filter: (c: Coin) => boolean, key: "tEnter" | "tGap") =>
    coins
      .filter(filter)
      .map((c) => c[key])
      .sort((a, b) => a - b);
  // Every coin that reaches the bank, and every one that falls out. The
  // counter steps once per leak, then once per coin banked after it flips.
  const deposits = times((c) => c.slot >= 0 && c.leak < 0, "tEnter");
  const leaks = times((c) => c.slot >= 0 && c.leak >= 0, "tGap");
  const gains = deposits.filter((d) => d >= T.counterFlip);

  /** How full the bank is at `time`, 0 to 1. */
  function levelAt(time: number) {
    let sum = 0;
    for (const d of deposits) {
      const u = (time - d) / 0.32;
      if (u <= 0) break;
      sum += u >= 1 ? 1 : E.out2(u);
    }
    return deposits.length ? sum / deposits.length : 0;
  }
  /** A short glow on the bank's medallion each time a coin goes in. */
  function pulseAt(time: number) {
    let p = 0;
    for (let j = deposits.length - 1; j >= 0; j--) {
      const d = time - deposits[j];
      if (d < 0) continue;
      if (d > 1.2) break;
      p += Math.exp(-d / 0.22);
    }
    return Math.min(1, p);
  }
  return { slots, leaks, gains, levelAt, pulseAt };
}

type Plan = ReturnType<typeof planStream>;

/** Where one coin is at time t: x, y, scale x, scale y, opacity, rotation. */
function coinAt(
  c: Coin,
  t: number
): [number, number, number, number, number, number] {
  const from = G.src[c.src];
  let u: number, x: number, y: number, s: number;
  if (t < c.tMouth) {
    u = (t - c.t0) / c.inDur;
    if (c.src === "web") {
      const e = E.io2(u);
      const a = 1 - e;
      x = a * a * from[0] + 2 * a * e * 292 + e * e * c.lane;
      y = a * a * from[1] + 2 * a * e * 108.5 + e * e * G.mouthY;
    } else {
      x = from[0] + (c.lane - from[0]) * E.out2(u);
      y = from[1] + (G.mouthY - from[1]) * E.in2(u);
    }
    s = 0.35 + 0.65 * E.out3(clamp01(u / 0.6));
    return [x, y, s, s, clamp01(u / 0.3), 0];
  }
  if (c.leak >= 0) {
    if (t < c.tGap) {
      return [c.lane, G.mouthY + (t - c.tMouth) * G.speed, 1, 1, 1, 0];
    }
    const d = G.gapDir[c.leak];
    const gy = G.gapY[c.leak];
    const lo = G.leakOut[c.leak];
    const ue = t - c.tGap;
    let o: number, r: number;
    if (ue < G.exitDur) {
      u = ue / G.exitDur;
      x = c.lane + d * lo[0] * E.out2(u);
      y = gy + 10 * u + 24 * E.in2(u);
      o = 1 - 0.15 * u;
      s = 1 - 0.08 * u;
      r = d * 160 * u;
    } else {
      u = clamp01((ue - G.exitDur) / G.fallDur);
      x = c.lane + d * (lo[0] + lo[1] * u);
      y = gy + 34 + lo[2] * E.in2(u);
      o = 0.85 * Math.pow(1 - u, 1.5);
      s = 0.92 - 0.2 * u;
      r = d * (160 + 190 * u);
    }
    // It tumbles as it goes: the disc narrows as it turns.
    const sx = s * (0.45 + 0.55 * Math.abs(Math.cos((r * Math.PI) / 180)));
    return [x, y, sx, s, o, r];
  }
  if (t < c.tEnter) {
    return [c.lane, G.mouthY + (t - c.tMouth) * G.speed, 1, 1, 1, 0];
  }
  // in through the bank's roof
  u = clamp01((t - c.tEnter) / G.enterDur);
  s = 1 - 0.65 * u;
  return [c.lane + (G.lane - c.lane) * u, G.enterY + 14 * E.out2(u), s, s, 1 - E.in2(u), 0];
}

/* ---------- dust in the beam (the one canvas) ---------- */

interface Mote {
  x: number;
  y: number;
  vy: number;
  r: number;
  a: number;
  ph: number;
  sp: number;
  dx: number;
}

function createDust(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  const motes: Mote[] = [];
  let dpr = 1;
  let k = 1;
  let alpha = 1;
  let fading = false;
  let on = false;

  const halfWidth = (y: number) => 222 - 144 * (y / 504);
  function place(p: Mote, anywhere: boolean) {
    p.y = anywhere ? 60 + Math.random() * 440 : 500 + Math.random() * 8;
    p.x = 240 + (Math.random() * 2 - 1) * halfWidth(p.y) * 0.8;
    p.vy = 5 + Math.random() * 12;
    p.r = 0.55 + Math.random() * 1.15;
    p.a = 0.25 + Math.random() * 0.6;
    p.ph = Math.random() * 6.283;
    p.sp = 0.8 + Math.random() * 2.2;
    p.dx = (Math.random() * 2 - 1) * 3;
  }
  function draw(dt: number) {
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (alpha <= 0) return;
    ctx.setTransform(dpr * k, 0, 0, dpr * k, 0, 0);
    ctx.fillStyle = "#d9b25f";
    for (const p of motes) {
      p.y -= p.vy * dt;
      p.ph += p.sp * dt;
      if (p.y < 24) place(p, false);
      const edge = Math.min(1, (p.y - 24) / 90) * Math.min(1, (506 - p.y) / 30);
      ctx.globalAlpha = Math.max(
        0,
        p.a * (0.55 + 0.45 * Math.sin(p.ph)) * edge * alpha
      );
      ctx.beginPath();
      ctx.arc(p.x + Math.sin(p.ph * 0.6) * p.dx, p.y, p.r, 0, 6.2832);
      ctx.fill();
    }
  }
  function tick(_time: number, deltaMs: number) {
    const dt = Math.min(0.05, deltaMs / 1000);
    if (fading) {
      alpha = Math.max(0, alpha - dt / 2.5);
      if (alpha === 0) {
        draw(0);
        stop();
        return;
      }
    }
    draw(dt);
  }
  function start() {
    if (on || alpha <= 0) return;
    on = true;
    gsap.ticker.add(tick);
  }
  function stop() {
    if (!on) return;
    on = false;
    gsap.ticker.remove(tick);
  }
  return {
    resize(widthPx: number, heightPx: number) {
      if (!widthPx) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(widthPx * dpr);
      canvas.height = Math.round(heightPx * dpr);
      k = widthPx / 480;
      const n = widthPx < 380 ? 22 : 38;
      while (motes.length < n) {
        const p = {} as Mote;
        place(p, true);
        motes.push(p);
      }
      motes.length = n;
      draw(0);
    },
    start,
    stop,
    fadeOut() {
      fading = true;
    },
    revive() {
      fading = false;
      alpha = 1;
    },
  };
}

/* ---------- the controller ---------- */

type Styled = HTMLElement | SVGElement;
type HoloState = "idle" | "playing" | "waiting" | "paused" | "done";

const LABELS: Record<HoloState, string> = {
  idle: "Play",
  playing: "Pause",
  waiting: "Pause",
  paused: "Play",
  done: "Replay",
};

export interface Holo {
  /** Play from the top. */
  start(): void;
  /** Hold still where it is, as the pause button does. */
  pause(): void;
  /** Back to the first frame, waiting for `start`. */
  stop(): void;
  /** Stop everything and take back what it added. */
  destroy(): void;
}

/**
 * Sets the animation up inside `root` (the `.holo` element) and waits for
 * `start()`. `onDone` runs when it reaches the end of its end card.
 */
export function createHolo(
  root: HTMLElement,
  opts: { onDone?: () => void } = {}
): Holo {
  function q<T extends Element = HTMLElement>(sel: string) {
    return root.querySelector<T>(sel);
  }
  function need<T extends Element = HTMLElement>(sel: string) {
    const node = root.querySelector<T>(sel);
    if (!node) throw new Error(`Hero animation: ${sel} is missing`);
    return node;
  }
  function qa<T extends Element = HTMLElement>(sel: string) {
    return Array.from(root.querySelectorAll<T>(sel));
  }

  const stage = need(".holo-stage");
  const box = need(".holo-box");
  const coinsWrap = need(".holo-coins");
  const coinEls = qa(".holo-coin");
  const toggle = need<HTMLButtonElement>(".holo-toggle");
  const toggleLabel = need(".holo-toggle-label");
  const vaultFill = need(".holo-vault-fill");
  const vaultLine = need(".holo-vault-line");
  const bankGlow = need(".holo-bank-glow");
  const medalGlow = need(".holo-medal-glow");
  const counterEl = need(".holo-counter");
  const counterNum = need(".holo-counter-n");
  const counterWord = need(".holo-counter-word");
  const counterDot = need(".holo-counter-dot");
  const problems = qa(".holo-tag .is-problem");
  const visual = need(".holo-visual");
  const bankHold = need<SVGGElement>(".hv-bank-hold");
  const underLayer = need(".holo-layer--under");
  const bankTag = need(".holo-tag--bank");
  const glowCopy = need<SVGUseElement>(".hv-glow");
  const wordmarkWrap = need(".holo-wordmark-wrap");
  const popEls = [
    need(".holo-pop--call"),
    need(".holo-pop--text"),
    need(".holo-pop--list"),
  ];
  const capsBand = need(".holo-caps");
  const caps = qa(".holo-cap");
  const endCard = need(".holo-end");
  const endParts = [need(".holo-results"), need(".holo-close")];
  const dustCanvas = need<HTMLCanvasElement>(".holo-dust");
  // The headline lines that may be set smaller on a phone: headlines 1 and
  // 2, and the first part of headline 3.
  const capFit = [caps[0], caps[1], need(".holo-cap-a")];
  const counters = qa(".holo-stage .holo-num").map((node) => {
    const lead = !!node.closest(".holo-stat--lead");
    return {
      el: node,
      to: Number(node.dataset.count) || 0,
      prefix: node.dataset.prefix ?? "",
      t0: lead ? T.stats : T.statsSmall,
      dur: lead ? T.countLead : T.countSmall,
      last: "",
    };
  });

  const pool = coinEls.length;
  const coinOn = coinEls.map(() => false);
  const opacities = new Map<Styled, string>();
  const plan: Plan = planStream(pool);
  const dust = createDust(dustCanvas);
  const countEase = gsap.parseEase("power3.out");

  let k = 1;
  let isPhone = false;
  let inView = false;
  let pageVisible = document.visibilityState === "visible";
  // Nothing plays until the page asks (`start`), and not after `stop`.
  let armed = false;
  let userPaused = false;
  let started = false;
  let done = false;
  let destroyed = false;
  let state: HoloState | "" = "";
  let lastScene = "";
  let lastCta = "";
  let counterMode = "";
  let counterText = "";
  let counterWordText = "";

  function setState(s: HoloState) {
    if (s === state) return;
    state = s;
    root.dataset.state = s;
    toggleLabel.textContent = LABELS[s];
  }

  function setNiche(key: HeroVslNicheKey) {
    const n = heroVslNiches[key];
    problems.forEach((node, i) => {
      node.textContent = n.gaps[i];
    });
    const call = q('[data-niche="call"]');
    const text = q('[data-niche="text"]');
    const lead = q('[data-niche="lead"]');
    if (call) call.textContent = n.call;
    if (text) text.textContent = n.text;
    if (lead) lead.textContent = n.lead;
    root.dataset.niche = key;
  }

  /* ---- per-frame drawing, all worked out from the timeline's time ---- */

  function renderCoins(t: number) {
    for (let s = 0; s < pool; s++) {
      const list = plan.slots[s];
      let c: Coin | null = null;
      for (let j = list.length - 1; j >= 0; j--) {
        if (list[j].t0 <= t) {
          c = list[j];
          break;
        }
      }
      const node = coinEls[s];
      if (!c || t > c.tEnd) {
        if (coinOn[s]) {
          node.style.opacity = "0";
          coinOn[s] = false;
        }
        continue;
      }
      const v = coinAt(c, t);
      coinOn[s] = true;
      node.style.opacity = v[4].toFixed(3);
      node.style.transform =
        `translate3d(${(v[0] * k).toFixed(2)}px,${(v[1] * k).toFixed(2)}px,0) ` +
        `rotate(${v[5].toFixed(1)}deg) scale(${v[2].toFixed(3)},${v[3].toFixed(3)})`;
    }
  }

  // The bank fills: gold rises between its columns, and its medallion glows
  // each time a coin goes in.
  function renderMeter(t: number) {
    const level = plan.levelAt(t);
    const move = `translate3d(0,${((1 - level) * G.vaultH).toFixed(2)}px,0)`;
    const o = Math.min(1, level * 14).toFixed(3);
    vaultFill.style.transform = move;
    vaultFill.style.opacity = o;
    vaultLine.style.transform = move;
    vaultLine.style.opacity = o;
    bankGlow.style.opacity = (0.08 + 0.92 * level).toFixed(3);
    medalGlow.style.opacity = Math.min(1, 0.25 + plan.pulseAt(t)).toFixed(3);
  }

  // Money lost, in red, one step per coin that falls out, up to LOSS_END. No
  // coin is lost after the first seal, so the count stands still from there;
  // the timeline dims it for a beat and turns it over. Then money recovered,
  // in gold, from LOSS_END up to RECOVERED_END, one step per coin banked. It
  // never goes down.
  function renderCounter(t: number) {
    const gain = t >= T.counterFlip;
    const list = gain ? plan.gains : plan.leaks;
    let n = 0;
    let last = -99;
    for (let i = 0; i < list.length && list[i] <= t; i++) {
      n++;
      last = list[i];
    }
    const share = list.length ? n / list.length : 1;
    let amount = gain
      ? LOSS_END + (RECOVERED_END - LOSS_END) * share
      : LOSS_END * share;
    // Round the steps to $10; the last one lands on the exact amount.
    if (share < 1) amount = Math.round(amount / 10) * 10;
    const mode = gain ? "gain" : "lost";
    if (mode !== counterMode) {
      counterEl.dataset.mode = mode;
      counterMode = mode;
    }
    const text =
      (gain ? "+" : "−") + "$" + Math.round(amount).toLocaleString("en-US");
    if (text !== counterText) {
      counterNum.textContent = text;
      counterText = text;
    }
    const word = gain ? "recovered" : "lost";
    if (word !== counterWordText) {
      counterWord.textContent = word;
      counterWordText = word;
    }
    // Each step flashes: brighter, and only a touch bigger, so the wider
    // amounts never reach the word beside them.
    const kick = Math.exp(-Math.max(0, t - last) / 0.09);
    counterNum.style.transform = `scale(${(1 + 0.035 * kick).toFixed(3)})`;
    counterNum.style.filter =
      kick > 0.01 ? `brightness(${(1 + 0.7 * kick).toFixed(3)})` : "";
    // The dot blinks while money leaks, and holds still once it stops.
    counterDot.style.opacity = (
      t < T.sealAt[0] ? 0.55 + 0.45 * Math.sin(t * 7) : 1
    ).toFixed(3);
  }

  function setOpacity(node: Styled, a: number) {
    const v = a >= 0.999 ? "" : a.toFixed(3);
    if (opacities.get(node) !== v) {
      node.style.opacity = v;
      opacities.set(node, v);
    }
  }

  // Phones only. The end card needs the whole stage there, so once the pipe
  // has folded into the bank, the bank, its gold and its label fade and the
  // beam dims behind the words; and the small name at the top steps aside
  // while the fixes show.
  function renderPhone(t: number) {
    let bank = 1;
    let beam = 1;
    let mark = 1;
    if (isPhone) {
      const folded = T.collapse[0] + T.collapse[1];
      bank = 1 - clamp01((t - folded) / 0.5);
      beam = 1 - 0.65 * clamp01((t - folded - 0.3) / 0.6);
      const fixesIn = T.pops[0][0] - 0.35;
      const fixesOut = T.pops[T.pops.length - 1][1] + 0.4;
      mark = Math.min(
        1 - clamp01((t - fixesIn) / 0.3) + clamp01((t - fixesOut) / 0.3),
        1 - clamp01((t - T.collapse[0]) / 0.3)
      );
    }
    setOpacity(bankHold, bank);
    setOpacity(underLayer, bank);
    setOpacity(bankTag, bank);
    setOpacity(glowCopy, bank);
    setOpacity(visual, beam);
    setOpacity(wordmarkWrap, mark);
  }

  function renderCounts(t: number) {
    for (const n of counters) {
      const v = Math.round(n.to * countEase(clamp01((t - n.t0) / n.dur)));
      const txt = n.prefix + v.toLocaleString("en-US");
      if (txt !== n.last) {
        n.el.textContent = txt;
        n.last = txt;
      }
    }
  }

  function sceneAt(t: number) {
    let name: string = T.scenes[0][0];
    for (const [scene, at] of T.scenes) if (t >= at) name = scene;
    return name;
  }

  function renderAt(t: number) {
    renderCoins(t);
    renderMeter(t);
    renderCounter(t);
    renderCounts(t);
    renderPhone(t);
    const scene = sceneAt(t);
    if (scene !== lastScene) {
      stage.dataset.scene = scene;
      lastScene = scene;
    }
    const cta = t >= T.ctas ? "on" : "";
    if (cta !== lastCta) {
      stage.dataset.cta = cta;
      lastCta = cta;
    }
  }

  /* ---- the one master timeline ---- */
  function buildTimeline() {
    const tl = gsap.timeline({ paused: true });

    const lines = need(".holo-lines");
    const cone = need(".holo-cone");
    const boost = need(".holo-cone-boost");
    const baseGlow = need(".holo-base-glow");
    const pipeGlow = need(".holo-pipe-glow");
    const pulse = need(".holo-pulse");
    const fixes = qa(".holo-tag .is-fix");
    const seals = [
      need<SVGPathElement>(".hv-seal-1"),
      need<SVGPathElement>(".hv-seal-2"),
      need<SVGPathElement>(".hv-seal-3"),
    ];
    const breaks = [
      need<SVGPathElement>(".hv-break-1"),
      need<SVGPathElement>(".hv-break-2"),
      need<SVGPathElement>(".hv-break-3"),
    ];
    const flashes = qa(".holo-flash");
    const rings = qa(".holo-ring");
    const capA = need(".holo-cap-a");
    const capB = need(".holo-cap-b");
    const CH0 =
      "drop-shadow(0px 0px 0px rgba(255,86,64,0)) drop-shadow(0px 0px 0px rgba(110,190,255,0))";
    const CH1 =
      "drop-shadow(2px 0px 0px rgba(255,86,64,0.55)) drop-shadow(-2px 0px 0px rgba(110,190,255,0.4))";

    function capIn(node: gsap.TweenTarget, at: number) {
      tl.fromTo(
        node,
        { opacity: 0, y: 16, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
        at
      );
    }
    function capOut(node: gsap.TweenTarget, at: number) {
      tl.fromTo(
        node,
        { opacity: 1, y: 0, filter: "blur(0px)" },
        {
          opacity: 0,
          y: -12,
          filter: "blur(6px)",
          duration: 0.45,
          ease: "power2.in",
          immediateRender: false,
        },
        at
      );
    }
    // a brief colour split, on scene changes only
    function chroma(at: number) {
      tl.set(lines, { filter: CH0 }, at)
        .to(lines, { filter: CH1, duration: 0.07, ease: "none" }, at)
        .to(lines, { filter: CH0, duration: 0.09, ease: "none" }, at + 0.07)
        .set(lines, { filter: "none" }, at + 0.17);
    }
    // a rare flicker, the way a projection wavers
    function flicker(at: number) {
      tl.to(
        [lines, cone],
        { opacity: 0.72, duration: 0.045, ease: "none", repeat: 3, yoyo: true },
        at
      );
    }
    function burst(i: number, at: number) {
      tl.fromTo(
        flashes[i],
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1.1, duration: 0.18, ease: "power2.out" },
        at
      )
        .to(flashes[i], { opacity: 0, scale: 1.7, duration: 0.5, ease: "power2.in" }, at + 0.18)
        .fromTo(
          rings[i],
          { opacity: 0, scale: 0.25 },
          { opacity: 0.9, duration: 0.05, ease: "none" },
          at
        )
        .to(rings[i], { opacity: 0, scale: 1.9, duration: 0.75, ease: "power2.out" }, at + 0.05);
    }
    // a gap snaps shut: quick, with a flash and its new name
    function seal(g: number, at: number) {
      tl.fromTo(
        seals[g],
        { opacity: 0, scaleY: 0, transformOrigin: "50% 50%" },
        { opacity: 1, scaleY: 1, duration: 0.22, ease: "power4.out" },
        at
      );
      burst(g, at);
      tl.to(breaks[g], { opacity: 0, duration: 0.2 }, at)
        .to(problems[g], { opacity: 0, duration: 0.18, ease: "power2.in" }, at)
        .fromTo(
          fixes[g],
          { opacity: 0, filter: "blur(4px)" },
          { opacity: 1, filter: "blur(0px)", duration: 0.35, ease: "power3.out" },
          at + 0.18
        );
    }
    // A fix's bubble grows in place, and shrinks away: sliding, it would
    // touch the headline or the icons on a small phone.
    function pop(i: number) {
      tl.fromTo(
        popEls[i],
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" },
        T.pops[i][0]
      ).to(
        popEls[i],
        { opacity: 0, scale: 0.97, duration: 0.35, ease: "power2.in" },
        T.pops[i][1]
      );
    }

    /* 1. The leak (0 to 7.9s). Already running at the first frame: the
          coins started before it and the headline is up. */
    tl.fromTo(
      need(".holo-scan"),
      { yPercent: 0 },
      { yPercent: -50, duration: T.total, ease: "none" },
      0
    );
    capOut(caps[0], T.cap1Out);
    flicker(3.8);

    /* 2. Switch on (7.9 to 8.9s): the name lights up over the hologram and
          a pulse runs down the pipe. The headline stays up until the first
          seal, then hands straight to the next one. */
    chroma(S.switch);
    tl.fromTo(
      need(".holo-wordmark"),
      { opacity: 0, scaleX: 1.14, filter: "blur(8px)" },
      { opacity: 1, scaleX: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
      S.switch + 0.15
    )
      .fromTo(boost, { opacity: 0 }, { opacity: 0.6, duration: 0.8, ease: "power2.out" }, S.switch + 0.1)
      .fromTo(baseGlow, { scale: 1 }, { scale: 1.12, duration: 0.6, ease: "power2.out" }, S.switch + 0.1)
      .fromTo(
        pulse,
        { y: 70, opacity: 0 },
        { y: 282, opacity: 1, duration: 0.8, ease: "power1.in" },
        S.switch + 0.1
      )
      .to(pulse, { y: 322, opacity: 0, duration: 0.2, ease: "power1.out" }, S.switch + 0.9)
      .fromTo(
        pipeGlow,
        { opacity: 0, scaleX: 1 },
        { opacity: 0.9, duration: 0.5, ease: "power2.out" },
        S.switch + 0.2
      )
      .to(pipeGlow, { opacity: 0.35, duration: 0.8, ease: "power2.inOut" }, S.switch + 1.1);
    // each break sparks as the pulse passes it
    G.gapY.forEach((gy, g) => {
      tl.to(
        breaks[g],
        { opacity: 0.2, duration: 0.07, ease: "none", repeat: 3, yoyo: true },
        S.switch + 0.1 + 0.8 * Math.sqrt((gy - 118) / 212)
      );
    });

    /* 3. Seal (8.9 to 15.2s): each fix lands fast, then shows its work. */
    const amps = [0.35, 0.7, 1, 0.55, 0.9, 0.5, 0.3];
    const wave = need<SVGGElement>(".hv-wave");
    tl.fromTo(
      wave,
      { opacity: 0, scaleX: 1, transformOrigin: "100% 50%" },
      { opacity: 1, duration: 0.15 },
      T.fixStart[0]
    )
      .fromTo(
        qa<SVGRectElement>(".hv-wave-bar"),
        { scaleY: 0.12, transformOrigin: "50% 50%" },
        {
          scaleY: (i: number) => amps[i],
          duration: 0.13,
          ease: "sine.inOut",
          stagger: 0.025,
          repeat: 2,
          yoyo: true,
        },
        T.fixStart[0] + 0.03
      )
      .to(wave, { scaleX: 0, opacity: 0, duration: 0.18, ease: "power2.in" }, T.sealAt[0] - 0.12);
    seal(0, T.sealAt[0]);
    // The headline changes the moment the first leak seals, and the
    // money-lost count freezes: a small pulse, a dim beat, then it turns
    // over to money recovered.
    capIn(caps[1], T.cap2[0]);
    pop(0);
    tl.fromTo(counterEl, { scale: 1 }, { scale: 1.08, duration: 0.12, ease: "power2.out" }, T.sealAt[0])
      .to(counterEl, { scale: 1, duration: 0.3, ease: "power2.inOut" }, T.sealAt[0] + 0.12)
      .fromTo(
        counterEl,
        { opacity: 1 },
        { opacity: 0.55, duration: 0.3, ease: "power1.out" },
        T.sealAt[0] + 0.1
      )
      .to(counterEl, { scaleY: 0, duration: 0.14, ease: "power2.in" }, T.counterFlip - 0.14)
      .to(
        counterEl,
        { scaleY: 1, opacity: 1, duration: 0.26, ease: "power3.out" },
        T.counterFlip
      );

    const watch = need<SVGGElement>(".hv-watch");
    tl.fromTo(
      watch,
      { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" },
      { opacity: 1, scale: 1, duration: 0.22, ease: "power3.out" },
      T.fixStart[1]
    )
      .fromTo(
        need<SVGPathElement>(".hv-watch-hand"),
        { rotation: 0, svgOrigin: "294 242" },
        { rotation: 300, duration: 0.45, ease: "power2.inOut" },
        T.fixStart[1] + 0.05
      )
      .to(watch, { opacity: 0, scale: 0.8, duration: 0.22, ease: "power2.in" }, T.sealAt[1] + 0.05);
    seal(1, T.sealAt[1]);
    pop(1);

    qa<SVGRectElement>(".hv-bit").forEach((bit, j) => {
      const at = T.fixStart[2] + 0.05 + j * 0.09;
      tl.fromTo(bit, { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.06, ease: "none" }, at)
        .to(bit, { x: -52, y: [-8, 0, 8][j], duration: 0.32, ease: "power2.out" }, at + 0.02)
        .to(bit, { opacity: 0, duration: 0.12, ease: "none" }, at + 0.3);
    });
    seal(2, T.sealAt[2]);
    pop(2);
    tl.fromTo(
      need(".holo-list-card"),
      { opacity: 0, x: 18 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" },
      T.pops[2][0] + 0.12
    );
    capOut(caps[1], T.cap2[1]);

    /* 4. Website (15.2 to 22s): a site builds itself and adds a stream. */
    chroma(S.web);
    capIn(capA, T.cap3[0]);
    capIn(capB, T.cap3b);
    capOut([capA, capB], T.cap3[1]);
    const pipeParts = [need<SVGGElement>(".hv-wall-l"), need<SVGGElement>(".hv-wall-r")];
    tl.fromTo(
      need<SVGPathElement>(".hv-web-frame"),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
      S.web + 0.2
    )
      .fromTo(
        qa<SVGPathElement>(".hv-web-line"),
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut", stagger: 0.15 },
        S.web + 0.45
      )
      .fromTo(need<SVGGElement>(".hv-web-dots"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, S.web + 0.6)
      .fromTo(
        qa<SVGRectElement>(".hv-web-bar"),
        { opacity: 0, scaleX: 0, transformOrigin: "0% 50%" },
        { opacity: 1, scaleX: 1, duration: 0.35, ease: "power2.out", stagger: 0.06 },
        S.web + 0.6
      )
      .fromTo(
        qa<SVGPathElement>(".hv-web-card"),
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut", stagger: 0.08 },
        S.web + 0.75
      )
      .fromTo(
        need<SVGRectElement>(".hv-web-btn"),
        { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
        S.web + 0.9
      )
      .fromTo(
        need<SVGPathElement>(".hv-conn"),
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" },
        S.web + 1.0
      )
      .fromTo(
        need(".holo-tag--web .holo-tag-in"),
        { opacity: 0, filter: "blur(4px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" },
        S.web + 1.1
      )
      .to(pipeParts[0], { x: -9.5, duration: 0.8, ease: "power2.inOut" }, T.widenAt - 0.05)
      .to(pipeParts[1], { x: 9.5, duration: 0.8, ease: "power2.inOut" }, T.widenAt - 0.05)
      .to(
        need<SVGRectElement>(".hv-pipe .hv-glass"),
        { scaleX: 1.5, transformOrigin: "50% 50%", duration: 0.8, ease: "power2.inOut" },
        T.widenAt - 0.05
      )
      .to(pipeGlow, { scaleX: 1.5, duration: 0.8, ease: "power2.inOut" }, T.widenAt - 0.05)
      .to(boost, { opacity: 0.85, duration: 1.0, ease: "power2.out" }, T.widenAt);
    flicker(18.6);

    /* 5. End card (22 to 30s): the pipe and everything feeding it fold down
          into the bank's roof, the bank flashes as they land, and the
          numbers rise out of the beam while the view pushes in. */
    const [fold, foldFor] = T.collapse;
    chroma(fold + 0.05);
    tl.to(
      [need(".hv-pipe"), need(".hv-icons"), need(".hv-web"), need(".hv-conn")],
      { scale: 0.1, opacity: 0, svgOrigin: "240 338", duration: foldFor, ease: "power3.in" },
      fold
    )
      .to(
        pipeGlow,
        { scale: 0.1, opacity: 0, transformOrigin: "19px 218px", duration: foldFor, ease: "power3.in" },
        fold
      )
      .to(
        qa(".holo-tag--l"),
        { opacity: 0, scale: 0.8, y: 8, transformOrigin: "100% 100%", duration: 0.3, ease: "power2.out" },
        fold
      )
      .to(
        qa(".holo-tag--r"),
        { opacity: 0, scale: 0.8, y: 8, transformOrigin: "0% 100%", duration: 0.3, ease: "power2.out" },
        fold
      )
      .to(
        [need(".holo-tag--web"), need(".holo-counter-pos")],
        { opacity: 0, duration: 0.3, ease: "power2.out" },
        fold
      );
    burst(3, T.full);
    const bankFlash = need(".holo-bank-flash");
    const lift = need(".holo-lift");
    tl.fromTo(bankFlash, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" }, T.full)
      .to(bankFlash, { opacity: 0, duration: 0.7, ease: "power2.in" }, T.full + 0.25)
      .fromTo(
        lift,
        { opacity: 0, scaleY: 0 },
        { opacity: 1, scaleY: 1, duration: 0.5, ease: "power2.out" },
        T.full
      )
      .to(lift, { opacity: 0, scaleY: 1.15, duration: 0.5, ease: "power1.in" }, T.full + 0.5)
      .to(boost, { opacity: 0.45, duration: 0.9 }, T.full)
      .to(baseGlow, { opacity: 0.6, scale: 1, duration: 0.9 }, T.full);

    // The figures (whichever of them are there): the lead one first and
    // largest, then the rest, each counting up before its suffix appears.
    const statsList = q(".holo-stats");
    const leadStat = q(".holo-stat--lead");
    const otherStats = qa(".holo-stat:not(.holo-stat--lead)");
    const leadPlus = q(".holo-stat--lead .holo-plus");
    const otherPlus = qa(".holo-stat:not(.holo-stat--lead) .holo-plus");
    if (statsList) {
      tl.fromTo(statsList, { "--holo-glow": 0 }, { "--holo-glow": 1, duration: 0.9 }, T.stats - 0.1);
    }
    if (leadStat) {
      tl.fromTo(
        leadStat,
        { opacity: 0, y: 28, scale: 0.94, filter: "blur(10px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
        T.stats
      );
    }
    if (otherStats.length) {
      tl.fromTo(
        otherStats,
        { opacity: 0, y: 22, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75, ease: "power3.out", stagger: 0.15 },
        T.statsSmall
      );
    }
    if (leadPlus) {
      tl.fromTo(leadPlus, { opacity: 0 }, { opacity: 1, duration: 0.35 }, T.stats + T.countLead - 0.05);
    }
    if (otherPlus.length) {
      tl.fromTo(
        otherPlus,
        { opacity: 0 },
        { opacity: 1, duration: 0.35 },
        T.statsSmall + T.countSmall - 0.05
      );
    }
    tl.fromTo(
      box,
      { scale: 1, transformOrigin: "50% 76%" },
      { scale: 1.06, duration: T.pushIn[1] - T.pushIn[0], ease: "sine.inOut" },
      T.pushIn[0]
    )
      .fromTo(
        need(".holo-stage .holo-trust"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
        T.trust
      )
      .fromTo(
        qa(".holo-stage .holo-ctas > a, .holo-stage .holo-links > a"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.15 },
        T.ctas
      )
      // hold to the full length, so the end card's last seconds count
      .to({}, { duration: 0.01 }, T.total - 0.01);

    return tl;
  }

  /* ---- sizing ---- */

  // Each fix's moment: beside its label on wide screens (in the hologram's
  // units, turned into stage pixels), and centred under the headline on
  // phones, where the sides are too narrow for a sentence: 8px under it, or
  // midway to the icons where there is less room.
  function placePops() {
    const bx = visual.offsetLeft + box.offsetLeft;
    const by = visual.offsetTop + box.offsetTop;
    const bw = box.offsetWidth;
    const sw = stage.clientWidth;
    const kk = bw / 480;
    type Place = Partial<
      Record<"left" | "right" | "top" | "maxWidth" | "width" | "marginLeft" | "marginRight", number | string>
    >;
    const put = (node: HTMLElement, css: Place) => {
      for (const key of ["left", "right", "top", "maxWidth", "width", "marginLeft", "marginRight"] as const) {
        const v = css[key];
        node.style[key] = v == null ? "" : typeof v === "number" ? `${v.toFixed(1)}px` : v;
      }
    };
    if (root.clientWidth < 860) {
      const cap = caps[1];
      const from = capsBand.offsetTop + cap.offsetTop + cap.offsetHeight;
      const to = by + 68 * kk;
      for (const node of popEls) {
        put(node, {
          left: "5%",
          right: "5%",
          top: from,
          width: "fit-content",
          maxWidth: "none",
          marginLeft: "auto",
          marginRight: "auto",
        });
        const gap = Math.min(8, Math.max(2, (to - from - node.offsetHeight) / 2));
        node.style.top = `${(from + gap).toFixed(1)}px`;
      }
    } else {
      put(popEls[0], { right: sw - (bx + 205 * kk), top: by + 150 * kk, maxWidth: 0.42 * bw });
      put(popEls[1], { left: bx + 275 * kk, top: by + 222 * kk, maxWidth: 0.42 * bw });
      put(popEls[2], { right: sw - (bx + 190 * kk), top: by + 286 * kk, maxWidth: 0.42 * bw });
    }
  }

  // Phones: each headline keeps to two lines and stays inside the band above
  // the hologram. One that would not is set a little smaller, half a pixel at
  // a time and never below 18px, instead of breaking its words.
  function lineCount(node: HTMLElement) {
    return Math.round(node.offsetHeight / parseFloat(getComputedStyle(node).lineHeight));
  }
  function fitCaptions() {
    for (const node of capFit) node.style.fontSize = "";
    if (!isPhone) return;
    const room = capsBand.clientHeight - parseFloat(getComputedStyle(capsBand).paddingTop);
    for (const node of capFit) {
      const whole = node.closest<HTMLElement>(".holo-cap") ?? node;
      let size = parseFloat(getComputedStyle(node).fontSize);
      while (size > 18 && (lineCount(node) > 2 || whole.offsetHeight > room)) {
        size = Math.max(18, size - 0.5);
        node.style.fontSize = `${size}px`;
      }
    }
  }

  // Phones: if the end card is still taller than the stage on a very narrow
  // screen, it is shown a little smaller as a whole, centred, rather than
  // cut off at the top and bottom.
  function fitEndCard() {
    endCard.style.transform = "";
    if (!isPhone) return;
    const cs = getComputedStyle(endCard);
    const room = endCard.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const needed =
      endParts[0].offsetHeight + endParts[1].offsetHeight + parseFloat(cs.rowGap || "0");
    if (room > 0 && needed > room) {
      endCard.style.transform = `scale(${(room / needed).toFixed(4)})`;
    }
  }

  function measure() {
    if (destroyed) return;
    const w = box.clientWidth;
    const h = box.clientHeight;
    if (!w) return;
    k = w / 480;
    box.style.setProperty("--holo-k", k.toFixed(4));
    isPhone = root.clientWidth < 860;
    fitCaptions();
    fitEndCard();
    coinsWrap.style.setProperty("--coin", `${((isPhone ? 20 : 17) * k).toFixed(2)}px`);
    dust.resize(w, h);
    placePops();
    renderAt(tl.time());
    for (const n of counters) {
      // keep the count from shifting as digits are added
      const prev = n.el.textContent;
      n.el.style.minWidth = "";
      n.el.textContent = n.prefix + n.to.toLocaleString("en-US");
      const fs = parseFloat(getComputedStyle(n.el).fontSize) || 16;
      n.el.style.minWidth = `${(n.el.getBoundingClientRect().width / fs).toFixed(3)}em`;
      n.el.textContent = prev;
    }
  }

  /* ---- play, pause, finish ---- */

  function sync() {
    if (destroyed) return;
    if (done) {
      if (!inView || !pageVisible) dust.stop();
      setState("done");
      return;
    }
    if (armed && inView && pageVisible && !userPaused) {
      started = true;
      if (tl.paused()) tl.play();
      dust.start();
      setState("playing");
    } else {
      tl.pause();
      dust.stop();
      setState(userPaused ? "paused" : started ? "waiting" : "idle");
    }
  }

  function finish() {
    if (done) return;
    done = true;
    dust.fadeOut();
    sync();
    opts.onDone?.();
  }

  function restartAt(t: number) {
    done = false;
    userPaused = false;
    dust.revive();
    tl.pause(t);
    renderAt(tl.time());
  }

  /* ---- listeners ---- */

  function onToggle() {
    if (done) {
      restartAt(0);
      sync();
      return;
    }
    userPaused = state === "playing" || state === "waiting";
    sync();
  }

  // A keyboard user who reaches the end card's links early goes straight to
  // the end.
  function onFocusIn(e: FocusEvent) {
    if (done || !armed) return;
    const target = e.target as Element | null;
    if (target?.closest(".holo-stage .holo-ctas")) {
      tl.pause();
      tl.progress(1, true);
      renderAt(tl.time());
      finish();
    }
  }

  function onVisibility() {
    pageVisible = document.visibilityState === "visible";
    sync();
  }

  /* ---- set up ---- */

  root.classList.add("is-ready");
  setNiche(nicheFromUrl());
  const tl = buildTimeline();
  tl.eventCallback("onUpdate", () => renderAt(tl.time()));
  tl.eventCallback("onComplete", finish);
  measure();
  tl.pause(0);
  renderAt(0);
  setState("idle");

  toggle.addEventListener("click", onToggle);
  root.addEventListener("focusin", onFocusIn);
  document.addEventListener("visibilitychange", onVisibility);

  const viewObserver = new IntersectionObserver(
    (entries) => {
      const e = entries[entries.length - 1];
      inView = e.isIntersecting && e.intersectionRatio >= 0.399;
      sync();
    },
    { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
  );
  viewObserver.observe(stage);

  const sizeObserver = new ResizeObserver(measure);
  sizeObserver.observe(box);
  document.fonts?.ready.then(measure);

  return {
    start() {
      armed = true;
      started = false;
      restartAt(0);
      sync();
    },
    pause() {
      userPaused = true;
      sync();
    },
    stop() {
      armed = false;
      restartAt(0);
      sync();
    },
    destroy() {
      destroyed = true;
      toggle.removeEventListener("click", onToggle);
      root.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("visibilitychange", onVisibility);
      viewObserver.disconnect();
      sizeObserver.disconnect();
      dust.stop();
      tl.revert();
    },
  };
}
