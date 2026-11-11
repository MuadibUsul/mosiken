// Plates — one small generated diagram per product.
// Geometry is computed here rather than hand-written as path data.

const f = (n) => Number(n.toFixed(1));
const polar = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [f(cx + r * Math.cos(a)), f(cy + r * Math.sin(a))];
};

// Deterministic pseudo-random, so a plate looks the same on every visit.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const travel = (path, dur, begin) =>
  `<circle r="3" class="solid"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/></circle>`;

// Veynod: agents around a shared board, one human decision in the loop.
function veynod() {
  const agents = [
    [48, 46, 116, 84],
    [272, 46, 204, 84],
    [48, 194, 116, 156],
    [272, 194, 204, 156],
  ];
  const links = agents.map(([x, y, bx, by]) => `M${x} ${y}L${bx} ${by}`);
  return `
    <rect x="116" y="84" width="88" height="72" class="paper"/>
    <rect x="116" y="84" width="88" height="72"/>
    <path class="faint" d="M128 102h52M128 116h64M128 130h40M128 144h58"/>
    <rect x="186" y="126" width="8" height="8" class="sig-fill"/>
    <path class="faint" d="${links.join('')}"/>
    ${agents.map(([x, y]) => `<rect x="${x - 9}" y="${y - 9}" width="18" height="18" class="paper"/><rect x="${x - 9}" y="${y - 9}" width="18" height="18"/>`).join('')}
    <path class="dash sig" d="M160 34V84"/>
    <circle cx="160" cy="24" r="10" class="paper"/>
    <circle cx="160" cy="24" r="10" class="sig"/>
    <circle cx="160" cy="24" r="3" class="sig-fill"/>
    ${links.map((p, i) => travel(p, 3.2, -i * 0.8)).join('')}`;
}

// ANCS: a frame with one precise target, above a timeline.
function ancs() {
  const rand = seeded(7);
  let bars = '';
  for (let x = 38; x <= 282; x += 6) {
    const h = 3 + rand() * 13;
    bars += `M${x} ${f(207 - h / 2)}v${f(h)}`;
  }
  const handles = [[150, 46], [228, 46], [150, 102], [228, 102]]
    .map(([x, y]) => `<rect x="${x - 3}" y="${y - 3}" width="6" height="6" class="sig-fill"/>`)
    .join('');
  return `
    <rect x="28" y="20" width="264" height="116" class="paper"/>
    <path d="M28 40V20h20M272 20h20v20M292 116v20h-20M48 136H28v-20"/>
    <circle class="faint" cx="118" cy="78" r="30"/>
    <path class="faint" d="M28 108Q110 70 180 96T292 84"/>
    <rect x="150" y="46" width="78" height="56" class="sig"/>
    ${handles}
    <path d="M36 152h70v12H36zM112 152h44v12h-44zM162 152h96v12h-96z"/>
    <path class="faint" d="M36 172h120v12H36zM170 172h60v12h-60z"/>
    <path class="faint" d="${bars}"/>
    <g class="playhead"><path class="sig" d="M36 144v76"/><path class="sig-fill" d="M31 140h10l-5 7z"/></g>`;
}

// Serendipity: two orbits, and the place they cross.
function serendipity() {
  const rx = 112;
  const ry = 54;
  const tilt = 22;
  const t = (tilt * Math.PI) / 180;
  const cross = 1 / Math.sqrt(Math.cos(t) ** 2 / rx ** 2 + Math.sin(t) ** 2 / ry ** 2);
  const orbit = `M${160 - rx} 120a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
  const meet = f(160 + cross);
  return `
    <path class="faint dash" d="M24 120h272M160 28v184"/>
    <g transform="rotate(${-tilt} 160 120)"><path d="${orbit}"/>${travel(orbit, 13, 0)}</g>
    <g transform="rotate(${tilt} 160 120)"><path d="${orbit}"/>${travel(orbit, 17, -6)}</g>
    <circle class="sig ping" cx="${meet}" cy="120" r="9"/>
    <circle class="sig-fill" cx="${meet}" cy="120" r="4"/>`;
}

// SheetOS: a cone frustum and its flat pattern.
function sheetos() {
  const cx = 160;
  const cy = 262;
  const R = 206;
  const r = 118;
  const a0 = -128;
  const a1 = -52;
  const [ox0, oy0] = polar(cx, cy, R, a0);
  const [ox1, oy1] = polar(cx, cy, R, a1);
  const [ix0, iy0] = polar(cx, cy, r, a0);
  const [ix1, iy1] = polar(cx, cy, r, a1);
  let rulings = '';
  for (let i = 1; i < 8; i += 1) {
    const a = a0 + ((a1 - a0) * i) / 8;
    const [x0, y0] = polar(cx, cy, r, a);
    const [x1, y1] = polar(cx, cy, R, a);
    rulings += `M${x0} ${y0}L${x1} ${y1}`;
  }
  const [dx0, dy0] = polar(cx, cy, R + 14, a0);
  const [dx1, dy1] = polar(cx, cy, R + 14, a1);
  const [tx0, ty0] = polar(cx, cy, R + 8, a0);
  const [tx1, ty1] = polar(cx, cy, R + 8, a1);
  const [ux0, uy0] = polar(cx, cy, R + 20, a0);
  const [ux1, uy1] = polar(cx, cy, R + 20, a1);
  return `
    <path class="paper" d="M${ox0} ${oy0}A${R} ${R} 0 0 1 ${ox1} ${oy1}L${ix1} ${iy1}A${r} ${r} 0 0 0 ${ix0} ${iy0}Z"/>
    <path class="draw" pathLength="1" d="M${ox0} ${oy0}A${R} ${R} 0 0 1 ${ox1} ${oy1}L${ix1} ${iy1}A${r} ${r} 0 0 0 ${ix0} ${iy0}Z"/>
    <path class="faint draw" pathLength="1" style="--d:8" d="${rulings}"/>
    <path class="sig draw" pathLength="1" style="--d:14" d="M${dx0} ${dy0}A${R + 14} ${R + 14} 0 0 1 ${dx1} ${dy1}"/>
    <path class="sig" d="M${tx0} ${ty0}L${ux0} ${uy0}M${tx1} ${ty1}L${ux1} ${uy1}"/>
    <path class="faint dash" d="M${ix0} ${iy0}L${cx} ${f(cy - 44)}L${ix1} ${iy1}"/>
    <ellipse cx="160" cy="176" rx="15" ry="4.5"/>
    <path d="M145 176L131 212M175 176l14 36"/>
    <path d="M131 212a29 8 0 0 0 58 0"/>
    <path class="faint dash" d="M131 212a29 8 0 0 1 58 0"/>`;
}

const PLATES = { veynod, ancs, serendipity, sheetos };

/** Fill every [data-plate] placeholder and run each plate only while it is on screen. */
export function renderPlates(scope = document) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = [...scope.querySelectorAll('[data-plate]')];
  if (!targets.length) return;

  const live = (el, on) => {
    el.classList.toggle('is-live', on);
    const svg = el.firstElementChild;
    if (!svg || !svg.pauseAnimations) return;
    if (on && !reduce) svg.unpauseAnimations();
    else svg.pauseAnimations();
  };

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => live(e.target, e.isIntersecting)),
    { threshold: 0.2 },
  );

  for (const el of targets) {
    const make = PLATES[el.dataset.plate];
    if (!make) continue;
    el.classList.add('plate');
    el.innerHTML = `<svg viewBox="0 0 320 240" role="presentation" focusable="false">${make()}</svg>`;
    live(el, false);
    io.observe(el);
  }
}
