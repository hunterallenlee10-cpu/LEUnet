/**
 * The Lee Marketing Mastery background — "Signal Routes".
 *
 * Rendered by the venture hub's hero and by the homepage block that links to
 * it (components/sections/MarketingMasterySection.tsx), so the doorway and the
 * destination share a background rather than two takes on one palette. It is
 * the sibling of "Constellation" on Business Mastery, and deliberately not the
 * same trick in another colour: that page's subject is a network, so its
 * background computes one; this venture's subject is what travels *through* a
 * network — attention routed to three specific jobs — so this one draws the
 * routes and sends signals down them.
 *
 * The vocabulary is the venture's own, promoted from the foreground diagrams
 * where it already exists: the drifting dashes of `.lmm-dash`, the packet of
 * `.lmm-packet`, the ring closing on a core of `.lmm-reach-*`. A visitor who
 * scrolls the hub meets all three again as explanations of the offerings.
 *
 * WHY SVG AND CSS, WHERE THE SIBLING NEEDS A CANVAS. Constellation cannot be
 * authored: which pairs of nodes are linked changes every frame, which is a
 * per-frame computation over ~1000 pairs. Routes are the opposite — fixed
 * paths with things moving along them — which is what a stylesheet does well.
 * So the homepage carries one animation loop rather than two, this composes on
 * the server with no client bundle at all, and the two sections end up with
 * genuinely different textures instead of one effect in two palettes.
 *
 * The travelling signal is a short bright dash sliding along each route, not a
 * dot flying over it. A dot means either SMIL, which no media query can still
 * for `prefers-reduced-motion`, or a CSS `offset-path` holding a second copy
 * of every curve. One dash on the path itself needs neither, and it is the
 * same technique that draws the ring on the hub's reach diagram.
 *
 * Every path declares `pathLength="100"`, so each dash figure below is a
 * percentage of that route rather than a length in user units. Without it the
 * dash density would vary with each curve's true length — the long sweeps
 * would read as dotted and the short climb as dashed — and each travelling
 * signal would need its own offset tuned to its own path.
 *
 * The orbs stay with the sections. Both consumers light themselves with the
 * venture's warm-right/cool-left pair, and they are tuned differently on
 * purpose (the teaser's are viewport-relative, to hold their brightness beside
 * the Business Mastery section at any width). This layer draws over whichever
 * ground it is given.
 */

/**
 * Routes are authored in a 1000x700 box and painted with `slice`, so the frame
 * crops rather than distorts: a full-width band crops the top and bottom, a
 * phone crops the sides. Every curve therefore starts and ends well outside
 * the box — a route whose end became visible would read as a line that stops
 * rather than as traffic passing through — and everything that is meant to be
 * seen sits near the middle, which is the one region every crop keeps.
 *
 * The two junctions are placed under the orbs each consumer lights: the busy
 * one under the warm orb high and right, the quieter one under the cool orb
 * low and left. That is what ties the layer to a ground it does not own.
 *
 * Both are also kept out of the centred copy column, which is what fixes their
 * exact positions. The hub started at the composition's optical centre, where
 * it landed a lit dot and an opening ring behind the headline — clear of the
 * glyphs at 1440px by luck of where the line broke, and on them at the next
 * width down. Out here it is right of the column's edge from 1024px up, and on
 * a phone, which crops to the middle of the box, it is simply not in frame:
 * the narrow crop keeps the routes and drops the junction, which is a
 * composition rather than a casualty.
 */
const HUB = { x: 872, y: 236 } as const;
const RELAY = { x: 330, y: 430 } as const;

type Route = {
  id: string;
  d: string;
  /** Seconds before this route's signal departs. Staggered so the frame shows
   *  one arrival at a time; two at once reads as a loading state. */
  delay?: number;
  /** A route with no signal is depth: it keeps the field from looking like
   *  three lines drawn to meet a point. */
  quiet?: boolean;
};

const ROUTES: Route[] = [
  // Low left to high right, through the hub. The long diagonal the eye reads
  // first, so it carries the first signal.
  {
    id: "sweep",
    d: `M -80 604 C 240 556, 560 452, ${HUB.x} ${HUB.y} S 1012 126, 1080 88`,
    delay: 0,
  },
  // High left to low right, crossing the first at the hub. The crossing is the
  // point: two directions of traffic through one junction.
  {
    id: "cross",
    d: `M -80 92 C 270 146, 600 198, ${HUB.x} ${HUB.y} S 1016 286, 1080 324`,
    delay: 2.6,
  },
  // Up from below through the relay and into the hub — the feeder that makes
  // the lower-left orb a place something comes from.
  {
    id: "feeder",
    d: `M 268 780 C 306 650, 300 516, ${RELAY.x} ${RELAY.y} C 428 322, 660 264, ${HUB.x} ${HUB.y}`,
    delay: 5.1,
  },
  // A slow low curve with no signal on it, well clear of the junctions.
  {
    id: "shoal",
    d: "M -80 704 C 220 652, 470 592, 720 636 S 980 716, 1080 692",
    quiet: true,
  },
];

/**
 * Small waypoints, so a route reads as having stops rather than as a stroke.
 *
 * Read off the rendered curves with `getPointAtLength` rather than placed by
 * eye — at these radii a dot a few units off its route does not read as a
 * near miss, it reads as a fifth object floating in the field. Each is the
 * point at the given fraction of its route's length: sweep at 0.15 and 0.75,
 * cross at 0.45, feeder at 0.3. Re-derive them if a curve above changes.
 */
const WAYPOINTS = [
  { x: 111, y: 568 },
  { x: 456, y: 175 },
  { x: 826, y: 267 },
  { x: 313, y: 502 },
] as const;

export function LmmSignalRoutes() {
  return (
    <svg
      className="lmmr-svg"
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {/* Three passes over one set of curves, painted back to front: the route
          itself, the drift that makes it a channel rather than a line, and the
          signal running it. The geometry is written once, in ROUTES. */}
      {ROUTES.map((route) => (
        <path
          key={`route-${route.id}`}
          className="lmmr-route"
          d={route.d}
          pathLength={100}
        />
      ))}
      {ROUTES.map((route) => (
        <path
          key={`drift-${route.id}`}
          className="lmmr-drift"
          d={route.d}
          pathLength={100}
        />
      ))}
      {ROUTES.filter((route) => !route.quiet).map((route) => (
        <path
          key={`signal-${route.id}`}
          className="lmmr-signal"
          d={route.d}
          pathLength={100}
          style={{ animationDelay: `${route.delay ?? 0}s` }}
        />
      ))}

      {WAYPOINTS.map((point) => (
        <circle
          key={`waypoint-${point.x}-${point.y}`}
          className="lmmr-waypoint"
          cx={point.x}
          cy={point.y}
          r={2}
        />
      ))}

      <circle className="lmmr-relay" cx={RELAY.x} cy={RELAY.y} r={3} />

      {/* The junction, and the one thing on the field that resolves: the ring
          opens from it on the same beat the third signal lands, which is the
          reach diagram's argument in miniature — traffic arrives, and then it
          reaches someone. */}
      <circle className="lmmr-ring" cx={HUB.x} cy={HUB.y} r={6} />
      <circle className="lmmr-hub" cx={HUB.x} cy={HUB.y} r={4.5} />
    </svg>
  );
}
