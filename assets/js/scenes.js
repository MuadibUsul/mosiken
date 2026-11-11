// Scenes — one short looping demonstration per product, drawn on a 2D canvas.
// Each shows the idea behind the product, not its interface. Every scene has
// a wide layout (800 x 450) and a compact one (480 x 480).

const TAU = Math.PI * 2;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const ease = (t) => t * t * (3 - 2 * t);
const easeOut = (t) => 1 - (1 - t) ** 3;
const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const at = (r, u, v) => [r.x + r.w * u, r.y + r.h * v];

// Deterministic pseudo-random, so a scene looks the same on every visit.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ---------- Pen: thin drawing helpers in design units ---------- */

function pen(ctx, scale, colors, compact, pointer) {
  const px = (n) => n / scale;
  const g = { ctx, c: colors, compact, pointer, tight: compact && scale < 0.88, fade: 1, px };

  const paint = (o = {}) => {
    if (o.fill) {
      ctx.globalAlpha = (o.fillAlpha ?? o.alpha ?? 1) * g.fade;
      ctx.fillStyle = o.fill;
      ctx.fill();
    }
    if (o.stroke !== false) {
      ctx.globalAlpha = (o.alpha ?? 1) * g.fade;
      ctx.lineWidth = px(o.width ?? 1.25);
      ctx.strokeStyle = o.stroke || colors.ink;
      ctx.setLineDash((o.dash || []).map(px));
      ctx.lineDashOffset = o.offset ? px(o.offset) : 0;
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.globalAlpha = 1;
  };

  g.path = (build, o) => {
    ctx.beginPath();
    build(ctx);
    paint(o);
  };
  g.line = (x1, y1, x2, y2, o) => g.path((c) => { c.moveTo(x1, y1); c.lineTo(x2, y2); }, o);
  g.poly = (pts, o, close = false) => g.path((c) => {
    pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
    if (close) c.closePath();
  }, o);
  g.rect = (x, y, w, h, o) => g.path((c) => c.rect(x, y, w, h), o);
  g.circle = (x, y, r, o) => g.path((c) => c.arc(x, y, Math.max(0, r), 0, TAU), o);
  g.arc = (x, y, r, a0, a1, o) => g.path((c) => c.arc(x, y, Math.max(0, r), a0, a1), o);
  g.text = (str, x, y, o = {}) => {
    if (o.minor && g.tight) return;
    const size = px(o.size ?? 10.5);
    ctx.font = o.sans ? `${o.weight ?? 600} ${size}px Archivo, sans-serif` : `${o.weight ?? 400} ${size}px "Chivo Mono", monospace`;
    ctx.textAlign = o.align || 'left';
    ctx.textBaseline = o.base || 'alphabetic';
    ctx.globalAlpha = (o.alpha ?? 1) * g.fade;
    ctx.fillStyle = o.color || colors.soft;
    ctx.fillText(o.sans ? str : str.toUpperCase(), x, y);
    ctx.globalAlpha = 1;
  };
  g.width = (str, o = {}) => {
    const size = px(o.size ?? 10.5);
    ctx.font = o.sans ? `${o.weight ?? 600} ${size}px Archivo, sans-serif` : `${o.weight ?? 400} ${size}px "Chivo Mono", monospace`;
    return ctx.measureText(o.sans ? str : str.toUpperCase()).width;
  };
  return g;
}

/* ---------- Veynod: work crossing a shared board ---------- */

const veynod = {
  duration: 16,
  still: 9.2,
  beats: ['Tasks', 'Agent execution', 'Review', 'Human decision'],
  beatAt: (t) => (t < 1.8 || t >= 11.6 ? 0 : t < 5.4 ? 1 : t < 7.4 ? 2 : 3),
  draw(g, t) {
    const { c } = g;
    const B = g.compact ? { x: 16, y: 56, w: 448, h: 356 } : { x: 40, y: 58, w: 720, h: 318 };
    const dockY = B.y + B.h + (g.compact ? 34 : 38);
    const head = 32;
    const cw = B.w / 4;
    const lanes = 5;
    const lh = (B.h - head) / lanes;
    const cardW = cw * 0.74;
    const cardH = Math.min(lh * 0.62, 40);
    const colX = (k) => B.x + k * cw + (cw - cardW) / 2;
    const laneY = (i) => B.y + head + i * lh + (lh - cardH) / 2;
    const titles = g.compact ? ['Tasks', 'Execute', 'Review', 'Decide'] : ['Tasks', 'Agent execution', 'Review', 'Human decision'];

    // The board is the shared context.
    g.text('Shared project context', B.x, B.y - 14, { minor: true });
    g.rect(B.x, B.y, B.w, B.h, { fill: c.paper, fillAlpha: 0.6, alpha: 0.9 });
    g.line(B.x, B.y + head, B.x + B.w, B.y + head, { alpha: 0.9 });
    for (let k = 0; k < 4; k += 1) {
      if (k) g.line(B.x + k * cw, B.y, B.x + k * cw, B.y + B.h, { alpha: 0.22 });
      g.text(titles[k], B.x + k * cw + 12, B.y + 20, { color: c.ink, size: 10 });
    }
    for (let i = 1; i < lanes; i += 1) {
      g.line(B.x, B.y + head + i * lh, B.x + B.w, B.y + head + i * lh, { alpha: 0.1 });
    }

    // The person who decides, and the reviewer.
    const human = [B.x + 3 * cw + cw - 22, B.y + head / 2];
    const reviewHome = [B.x + 2 * cw + cw - 22, B.y + head / 2];
    const dock = (a) => [B.x + 10 + a * 24, dockY];
    g.text('Agents', B.x + 10 + 3 * 24 + 4, dockY + 4, { minor: true });

    const cards = [];
    for (let i = 0; i < lanes; i += 1) {
      const tau = (((t - i * 3.2) % 16) + 16) % 16;
      if (tau > 11.6) continue;
      let x = colX(0);
      if (tau >= 1.8) x = lerp(colX(0), colX(1), easeIO(seg(tau, 1.8, 2.6)));
      if (tau >= 5.4) x = lerp(colX(1), colX(2), easeIO(seg(tau, 5.4, 6.0)));
      if (tau >= 7.4) x = lerp(colX(2), colX(3), easeIO(seg(tau, 7.4, 8.0)));
      if (tau >= 10.6) x = lerp(colX(3), B.x + B.w + 14, easeIO(seg(tau, 10.6, 11.6)));
      const alpha = seg(tau, 0, 0.6) * (1 - seg(tau, 10.9, 11.6));
      cards.push({ i, tau, x, y: laneY(i) + (1 - ease(seg(tau, 0, 0.6))) * 8, alpha });
    }

    let waiting = null;
    for (const k of cards) {
      const lead = k.i === 0;
      const approved = k.tau >= 10.2;
      const edge = approved ? c.signal : c.ink;
      g.rect(k.x, k.y, cardW, cardH, { fill: approved ? c.signal : c.paper, fillAlpha: (approved ? 0.14 : 1) * k.alpha, stroke: edge, alpha: k.alpha });
      if (lead) g.rect(k.x, k.y, 4, cardH, { fill: c.signal, stroke: false, alpha: k.alpha });
      g.line(k.x + 12, k.y + cardH * 0.36, k.x + cardW * 0.62, k.y + cardH * 0.36, { alpha: 0.35 * k.alpha });
      g.line(k.x + 12, k.y + cardH * 0.6, k.x + cardW * 0.44, k.y + cardH * 0.6, { alpha: 0.35 * k.alpha });
      // Execution fills a bar along the bottom edge.
      const done = seg(k.tau, 2.6, 5.4);
      if (done > 0) g.line(k.x, k.y + cardH, k.x + cardW * done, k.y + cardH, { stroke: c.signal, width: 2.5, alpha: k.alpha });
      // Review sweeps the card, then leaves a tick.
      if (k.tau > 6.0 && k.tau < 7.0) {
        const sx = k.x + cardW * easeIO(seg(k.tau, 6.0, 7.0));
        g.line(sx, k.y - 3, sx, k.y + cardH + 3, { stroke: c.signal, alpha: 0.9 * k.alpha });
      }
      if (k.tau >= 6.9) {
        const tx = k.x + cardW - 20;
        const ty = k.y + cardH / 2;
        g.poly([[tx, ty], [tx + 4, ty + 4], [tx + 11, ty - 5]], { stroke: edge, width: 1.6, alpha: seg(k.tau, 6.9, 7.2) * k.alpha });
      }
      if (k.tau >= 8.0 && k.tau < 10.6) waiting = k;
    }

    // Agents leave the dock, carry one task through execution, and come back.
    for (let a = 0; a < 3; a += 1) {
      let [x, y] = dock(a);
      for (const k of cards) {
        if (k.i % 3 !== a) continue;
        const [hx, hy] = [k.x + cardW - 14, k.y - 5];
        if (k.tau >= 1.0 && k.tau < 1.8) [x, y] = [lerp(x, hx, easeIO(seg(k.tau, 1.0, 1.8))), lerp(y, hy, easeIO(seg(k.tau, 1.0, 1.8)))];
        else if (k.tau >= 1.8 && k.tau < 5.4) [x, y] = [hx, hy];
        else if (k.tau >= 5.4 && k.tau < 6.2) [x, y] = [lerp(hx, x, easeIO(seg(k.tau, 5.4, 6.2))), lerp(hy, y, easeIO(seg(k.tau, 5.4, 6.2)))];
      }
      g.rect(x - 6, y - 6, 12, 12, { fill: c.ink, stroke: false });
    }

    // The reviewer steps down onto whichever card is under review.
    let [rx, ry] = reviewHome;
    for (const k of cards) {
      const [hx, hy] = [k.x + cardW * easeIO(seg(k.tau, 6.0, 7.0)), k.y - 8];
      if (k.tau >= 5.7 && k.tau < 6.0) [rx, ry] = [lerp(rx, k.x, easeIO(seg(k.tau, 5.7, 6.0))), lerp(ry, hy, easeIO(seg(k.tau, 5.7, 6.0)))];
      else if (k.tau >= 6.0 && k.tau < 7.0) [rx, ry] = [hx, hy];
      else if (k.tau >= 7.0 && k.tau < 7.4) [rx, ry] = [lerp(k.x + cardW, rx, easeIO(seg(k.tau, 7.0, 7.4))), lerp(hy, ry, easeIO(seg(k.tau, 7.0, 7.4)))];
    }
    g.poly([[rx, ry - 7], [rx + 7, ry], [rx, ry + 7], [rx - 7, ry]], { fill: c.paper, stroke: c.ink, width: 1.5 }, true);

    // The human is only called on when a card reaches the last column.
    if (waiting) {
      const pulse = (waiting.tau * 1.4) % 1;
      const asked = seg(waiting.tau, 8.0, 8.5) * (1 - seg(waiting.tau, 10.2, 10.6));
      g.line(human[0], human[1] + 9, waiting.x + cardW - 16, waiting.y, { stroke: c.signal, dash: [3, 4], alpha: asked });
      g.circle(human[0], human[1], 8 + pulse * 10, { stroke: c.signal, alpha: (1 - pulse) * asked });
    }
    g.circle(human[0], human[1], 8, { fill: c.paper, stroke: c.signal, width: 1.5 });
    g.circle(human[0], human[1], 2.6, { fill: c.signal, stroke: false });
  },
};

/* ---------- ANCS: say what should change, see it land on the frame and the timeline ---------- */

const LINE_ONE = 'Trim the pause';
const LINE_TWO = 'before the boat.';

const ancs = {
  duration: 14,
  still: 11.4,
  beats: ['Direction in words or voice', 'Visual and timeline targeting', 'Non-destructive edit'],
  beatAt: (t) => (t < 4.5 ? 0 : t < 8 ? 1 : 2),
  draw(g, t) {
    const { c } = g;
    const F = g.compact ? { x: 16, y: 16, w: 448, h: 200 } : { x: 40, y: 34, w: 440, h: 236 };
    const P = g.compact ? { x: 16, y: 228, w: 448, h: 84 } : { x: 506, y: 34, w: 254, h: 236 };
    const T = g.compact ? { x: 16, y: 330, w: 448, h: 134 } : { x: 40, y: 296, w: 720, h: 128 };

    const aim = easeOut(seg(t, 4.8, 6.2));
    const cut = easeIO(seg(t, 8.6, 9.8));
    const play = seg(t, 10.0, 12.6);

    /* frame */
    g.rect(F.x, F.y, F.w, F.h, { fill: c.shoal, fillAlpha: 0.55, stroke: false });
    const tick = 16;
    for (const [u, v, sx, sy] of [[0, 0, 1, 1], [1, 0, -1, 1], [1, 1, -1, -1], [0, 1, 1, -1]]) {
      const [x, y] = at(F, u, v);
      g.poly([[x + sx * tick, y], [x, y], [x, y + sy * tick]], { width: 1.5 });
    }
    const horizon = F.y + F.h * 0.6;
    g.line(F.x + 14, horizon, F.x + F.w - 14, horizon, { alpha: 0.5 });
    g.circle(F.x + F.w * 0.74, F.y + F.h * 0.3, F.h * 0.11, { alpha: 0.5 });
    for (let k = 0; k < 2; k += 1) {
      g.path((x) => {
        for (let u = 0; u <= 1.001; u += 0.02) {
          const wx = F.x + 14 + (F.w - 28) * u;
          const wy = horizon + 22 + k * 20 + Math.sin(u * 14 + t * 0.9 + k * 2) * 3;
          if (u === 0) x.moveTo(wx, wy);
          else x.lineTo(wx, wy);
        }
      }, { alpha: 0.28 });
    }
    // A paper boat is the subject of the shot.
    const drift = play > 0 ? play * 0.1 : 0;
    const bx = F.x + F.w * (0.3 + drift) + Math.sin(t * 0.5) * 4;
    const by = horizon - 2 + Math.sin(t * 1.1) * 1.5;
    const b = (F.h / 236) * 1.35;
    g.poly([[bx - 22 * b, by], [bx + 22 * b, by], [bx + 12 * b, by + 13 * b], [bx - 12 * b, by + 13 * b]], { fill: c.paper, width: 1.5 }, true);
    g.poly([[bx, by - 17 * b], [bx + 10 * b, by], [bx - 10 * b, by]], { fill: c.paper, width: 1.5 }, true);

    // Visual targeting: a box that closes in on the subject.
    if (aim > 0) {
      const box = {
        x: lerp(F.x + 10, bx - 34 * b, aim),
        y: lerp(F.y + 10, by - 28 * b, aim),
        w: lerp(F.w - 20, 68 * b, aim),
        h: lerp(F.h - 20, 52 * b, aim),
      };
      const on = seg(t, 4.8, 5.1) * (1 - seg(t, 12.8, 13.3));
      g.rect(box.x, box.y, box.w, box.h, { stroke: c.signal, width: 1.5, alpha: on });
      for (const [u, v] of [[0, 0], [1, 0], [1, 1], [0, 1]]) {
        g.rect(box.x + box.w * u - 3, box.y + box.h * v - 3, 6, 6, { fill: c.signal, stroke: false, alpha: on });
      }
      if (aim > 0.95) g.text('Boat', box.x, box.y - 7, { color: c.signal, alpha: on, minor: true });
    }

    /* direction */
    const speaking = seg(t, 0.3, 0.7) * (1 - seg(t, 3.9, 4.4));
    const wave = g.compact ? { x: P.x, y: P.y + 18, w: 132, h: P.h - 26 } : { x: P.x, y: P.y + 30, w: P.w, h: 56 };
    g.text('Direction', P.x, P.y + 10, { minor: true });
    const bars = g.compact ? 20 : 34;
    for (let k = 0; k < bars; k += 1) {
      const u = k / (bars - 1);
      const amp = (0.25 + 0.75 * Math.abs(Math.sin(k * 1.7 + t * 7) * Math.sin(k * 0.6 + t * 3.1))) * speaking;
      const hgt = 2 + amp * (wave.h - 6);
      const x = wave.x + 2 + (wave.w - 4) * u;
      g.line(x, wave.y + wave.h / 2 - hgt / 2, x, wave.y + wave.h / 2 + hgt / 2, { stroke: speaking > 0.1 ? c.signal : c.ink, alpha: 0.35 + 0.65 * speaking, width: 1.6 });
    }
    const size = g.compact ? 19 : 24;
    const tx = g.compact ? P.x + 152 : P.x;
    const ty = g.compact ? P.y + 40 : P.y + 132;
    const typed = Math.floor(seg(t, 0.7, 3.9) * (LINE_ONE.length + LINE_TWO.length));
    const one = LINE_ONE.slice(0, typed);
    const two = LINE_TWO.slice(0, Math.max(0, typed - LINE_ONE.length));
    const opts = { sans: true, size, color: c.ink, weight: 600 };
    const lineGap = g.px(size * 1.22);
    g.text(one, tx, ty, opts);
    g.text(two, tx, ty + lineGap, opts);
    if (t < 4.4 && Math.floor(t * 2.4) % 2 === 0) {
      const cx = tx + (two ? g.width(two, opts) : g.width(one, opts)) + 3;
      const cy = two ? ty + lineGap : ty;
      g.line(cx, cy - g.px(size * 0.8), cx, cy + 3, { stroke: c.signal, width: 2 });
    }
    // The two words that became targets.
    const mark = seg(t, 4.6, 5.0) * (1 - seg(t, 12.8, 13.3));
    if (mark > 0) {
      const p0 = tx + g.width('Trim the ', opts);
      g.line(p0, ty + 5, p0 + g.width('pause', opts), ty + 5, { stroke: c.signal, width: 2, alpha: mark });
      const b0 = tx + g.width('before the ', opts);
      g.line(b0, ty + lineGap + 5, b0 + g.width('boat', opts), ty + lineGap + 5, { stroke: c.signal, width: 2, alpha: mark });
    }

    /* timeline */
    const lane = g.compact ? 24 : 26;
    const yEdit = T.y + 22;
    const yClip = yEdit + lane + 8;
    const yWave = yClip + lane + 8;
    const ySrc = yWave + lane + 4;
    const X = (u) => T.x + T.w * u;
    const A = [0.0, 0.36];
    const Pz = [0.36, 0.5];
    const Bz = [0.5, 0.86];
    const gap = (Pz[1] - Pz[0]) * cut;

    g.line(T.x, T.y + 8, T.x + T.w, T.y + 8, { alpha: 0.5 });
    for (let k = 0; k <= 24; k += 1) {
      g.line(X(k / 24), T.y + 8, X(k / 24), T.y + (k % 4 ? 12 : 16), { alpha: 0.5 });
    }
    g.text('Edit layer', T.x, yEdit + lane / 2 + 3, { minor: true, alpha: cut });
    // clips
    g.rect(X(A[0]), yClip, T.w * (A[1] - A[0]), lane, { fill: c.paper });
    g.rect(X(Bz[0] - gap), yClip, T.w * (Bz[1] - Bz[0]), lane, { fill: c.paper });
    g.line(X(Bz[0] - gap) + 8, yClip + lane / 2, X(Bz[0] - gap) + 30, yClip + lane / 2, { alpha: 0.35 });
    g.line(X(A[0]) + 8, yClip + lane / 2, X(A[0]) + 44, yClip + lane / 2, { alpha: 0.35 });
    // the pause lifts out of the track into its own layer; nothing is deleted
    const lift = easeIO(seg(t, 8.0, 8.8));
    const py = lerp(yClip, yEdit, lift);
    const pw = T.w * (Pz[1] - Pz[0]);
    g.rect(X(Pz[0]), py, pw, lane, { fill: lift > 0 ? c.signal : c.paper, fillAlpha: lift > 0 ? 0.12 : 1, stroke: lift > 0 ? c.signal : c.ink, dash: lift > 0.5 ? [4, 3] : [] });
    if (lift > 0.9) g.text('Trim', X(Pz[0]) + 8, py + lane / 2 + 3.5, { color: c.signal, size: 9.5 });
    // sound: the pause is the quiet stretch
    const rand = seeded(11);
    for (let k = 0; k < 96; k += 1) {
      const u = (k + 0.5) / 96 * 0.86;
      const loud = rand();
      const quiet = u > Pz[0] && u < Pz[1];
      if (quiet && cut > 0.02) continue;
      const x = u >= Pz[1] ? u - gap : u;
      const hgt = quiet ? 2 : 4 + loud * (lane - 8);
      g.line(X(x), yWave + lane / 2 - hgt / 2, X(x), yWave + lane / 2 + hgt / 2, { alpha: 0.45 });
    }
    // source media stays whole underneath
    g.text('Source', T.x, ySrc + 9, { minor: true });
    const sx = T.x + (g.tight ? 0 : 58);
    g.line(sx, ySrc + 6, X(0.86), ySrc + 6, { alpha: 0.5, dash: [2, 3] });
    for (const u of [A[0], A[1], Pz[1], Bz[1]]) if (X(u) >= sx) g.line(X(u), ySrc + 2, X(u), ySrc + 10, { alpha: 0.5 });

    // timeline targeting: a bracket that closes on the pause
    if (aim > 0 && lift < 1) {
      const on = seg(t, 4.8, 5.1) * (1 - lift);
      const x0 = lerp(X(0), X(Pz[0]), aim);
      const x1 = lerp(X(0.86), X(Pz[1]), aim);
      g.poly([[x0, yClip - 9], [x0, yClip + lane + 5], [x1, yClip + lane + 5], [x1, yClip - 9]], { stroke: c.signal, width: 1.5, alpha: on });
    }
    // playhead
    const head = play > 0 ? lerp(0.16, 0.62, play) : 0.08;
    const hx = X(head);
    g.line(hx, T.y + 2, hx, yWave + lane, { stroke: c.signal, width: 1.5 });
    g.poly([[hx - 5, T.y - 4], [hx + 5, T.y - 4], [hx, T.y + 4]], { fill: c.signal, stroke: false }, true);
  },
};

/* ---------- Serendipity: a conversation, a private model, an agent that looks, a choice that stays yours ---------- */

const PEOPLE = [
  [0.2, 0.62], [0.74, 0.34], [0.5, 0.16], [0.6, 0.78], [0.41, 0.37], [0.9, 0.64], [0.93, 0.14], [0.45, 0.9],
  [0.07, 0.16], [0.79, 0.9], [0.25, 0.11], [0.62, 0.53], [0.05, 0.9], [0.87, 0.4], [0.31, 0.93], [0.67, 0.09],
];
const YOU = 0;
const MATCH = 1;
const VISITS = [4, 3, MATCH];
const FITS = [0.35, 0.55, 1];
const LEGS = [[7.5, 8.4, 9.1], [9.1, 10.0, 10.7], [10.7, 11.4, 12.0]];
const MODEL = [0.92, 0.55, 0.78, 0.42, 0.86, 0.6];

const serendipity = {
  duration: 16,
  still: 14.2,
  beats: ['Conversational onboarding', 'Preference modeling', 'Agent-assisted matching', 'Your choice'],
  beatAt: (t) => (t < 4 ? 0 : t < 7.5 ? 1 : t < 12 ? 2 : 3),
  draw(g, t) {
    const { c } = g;
    const R = g.compact ? { x: 22, y: 22, w: 436, h: 436 } : { x: 34, y: 26, w: 732, h: 398 };
    const big = g.compact ? 54 : 62;   // your model
    const small = g.compact ? 19 : 23; // everyone else's
    const chosen = ease(seg(t, 13.6, 14.6));

    const pos = PEOPLE.map(([u, v], i) => {
      const [x, y] = at(R, u, v);
      return [x + Math.sin(t * 0.31 + i * 1.9) * 5, y + Math.cos(t * 0.27 + i * 2.3) * 5];
    });
    // Once chosen, the two move a little closer. Only a little.
    const dx = pos[MATCH][0] - pos[YOU][0];
    const dy = pos[MATCH][1] - pos[YOU][1];
    pos[YOU] = [pos[YOU][0] + dx * 0.05 * chosen, pos[YOU][1] + dy * 0.05 * chosen];
    pos[MATCH] = [pos[MATCH][0] - dx * 0.05 * chosen, pos[MATCH][1] - dy * 0.05 * chosen];
    const [ux, uy] = pos[YOU];
    const [mx, my] = pos[MATCH];

    const spoke = (k, n) => -Math.PI / 2 + (k / n) * TAU;
    const shape = (cx, cy, r, values) => values.map((v, k) => [cx + Math.cos(spoke(k, values.length)) * r * v, cy + Math.sin(spoke(k, values.length)) * r * v]);
    const rand = seeded(5);
    const others = PEOPLE.map(() => MODEL.map(() => 0.35 + rand() * 0.65));
    others[MATCH] = MODEL.map((v, k) => clamp(v + (k % 2 ? 0.08 : -0.06), 0.3, 1));

    // The room: people who happen to be near each other.
    const reach = R.w * 0.27;
    for (let i = 0; i < pos.length; i += 1) {
      for (let j = i + 1; j < pos.length; j += 1) {
        const d = Math.hypot(pos[i][0] - pos[j][0], pos[i][1] - pos[j][1]);
        if (d < reach) g.line(...pos[i], ...pos[j], { alpha: 0.1 * (1 - d / reach) + 0.03 });
      }
    }

    // Everyone keeps a model of their own. It stays faint: it is theirs.
    const privacy = seg(t, 5.6, 7.2) * (1 - seg(t, 13.6, 14.8));
    pos.forEach(([x, y], i) => {
      if (i === YOU) return;
      const mine = i === MATCH && chosen > 0;
      if (privacy > 0 && !mine) g.poly(shape(x, y, small, others[i]), { alpha: 0.38 * privacy, dash: [2, 3] }, true);
      g.circle(x, y, 4.5, { fill: mine ? c.signal : c.ink, stroke: false, alpha: i === MATCH ? 1 : 0.8 });
    });

    // 1 — a conversation, not a form
    const turns = [0.3, 0.9, 1.5, 2.1, 2.7, 3.3];
    const gone = seg(t, 4.2, 5.2);
    const bx = ux + 30;
    turns.forEach((start, k) => {
      const age = t - start;
      if (age < 0 || gone >= 1) return;
      const mine = k % 2 === 1;
      const newer = turns.filter((s) => s > start && s <= t).length;
      const w = 76 + ((k * 37) % 58);
      const x = bx + (mine ? 34 : 0);
      const y = uy - 56 - newer * 31 + (1 - easeOut(seg(age, 0, 0.35))) * 10;
      const alpha = seg(age, 0, 0.3) * Math.max(0, 1 - newer * 0.2) * (1 - gone);
      g.rect(x, y, w, 23, { fill: mine ? c.signal : c.paper, fillAlpha: (mine ? 0.16 : 0.92) * alpha, stroke: mine ? c.signal : c.ink, alpha });
      g.line(x + 9, y + 9, x + w - 12, y + 9, { alpha: 0.42 * alpha, stroke: mine ? c.signal : c.ink });
      g.line(x + 9, y + 15, x + w * 0.55, y + 15, { alpha: 0.42 * alpha, stroke: mine ? c.signal : c.ink });
      if (!mine) g.poly([[x - 12, y + 6], [x - 6, y + 12], [x - 12, y + 18], [x - 18, y + 12]], { fill: c.ink, stroke: false, alpha }, true);
    });
    g.text('Conversation', bx - 18, uy - 16, { minor: true, alpha: seg(t, 0.2, 0.6) * (1 - gone) });

    // 2 — what was said becomes a model of what matters
    const built = MODEL.map((_, k) => easeOut(seg(t, 4.0 + k * 0.45, 4.7 + k * 0.45)));
    if (t >= 4) {
      MODEL.forEach((_, k) => {
        const a = spoke(k, MODEL.length);
        g.line(ux, uy, ux + Math.cos(a) * big, uy + Math.sin(a) * big, { alpha: 0.2 * built[k] });
        g.circle(ux + Math.cos(a) * big * MODEL[k] * built[k], uy + Math.sin(a) * big * MODEL[k] * built[k], 2.4, { fill: c.signal, stroke: false, alpha: built[k] });
      });
      g.circle(ux, uy, big, { alpha: 0.12 * built[5], dash: [2, 4] });
      g.poly(shape(ux, uy, big, MODEL.map((v, k) => v * built[k])), { fill: c.signal, fillAlpha: 0.12, stroke: c.signal, width: 1.5 }, true);
      g.text('Preference model', ux, uy + big + 20, { align: 'center', alpha: seg(t, 4.6, 5.2) * (1 - seg(t, 7.6, 8.2)), minor: true });
    }
    g.circle(ux, uy, 6.5, { fill: c.signal, stroke: false });

    // 3 — an agent goes looking, and compares
    if (t >= 7.5 && t < 15.2) {
      // the search widens
      for (let k = 0; k < 2; k += 1) {
        const p = ((t - 7.5) / 2.2 + k * 0.5) % 1;
        const on = seg(t, 7.5, 8) * (1 - seg(t, 11.2, 12));
        g.circle(ux, uy, big + p * R.w * 0.55, { stroke: c.signal, alpha: 0.22 * (1 - p) * on });
      }
      const stops = [[ux, uy], ...VISITS.map((i) => [pos[i][0] + small + 2, pos[i][1] - small])];
      let [ax, ay] = stops[0];
      const trail = [[ux, uy]];
      LEGS.forEach(([go, arrive, leave], k) => {
        const [x, y] = pos[VISITS[k]];
        if (t >= go) {
          const m = easeIO(seg(t, go, arrive));
          ax = lerp(stops[k][0], stops[k + 1][0], m);
          ay = lerp(stops[k][1], stops[k + 1][1], m) - Math.sin(m * Math.PI) * 18;
          trail.push([ax, ay]);
        }
        if (t < arrive) return;
        const last = k === 2;
        const fit = easeOut(seg(t, arrive, leave - 0.1)) * FITS[k];
        const hold = last ? 1 : 1 - 0.65 * seg(t, leave, leave + 0.4);
        const end = 1 - seg(t, 13.6, 14.4);
        // your model is laid over theirs; the arc is how far they agree
        if (t < leave + 0.3 || last) g.poly(shape(x, y, small, MODEL), { stroke: c.signal, alpha: 0.75 * (last ? 1 - chosen : 1 - seg(t, leave, leave + 0.3)) }, true);
        g.arc(x, y, small + 9, -Math.PI / 2, -Math.PI / 2 + TAU * fit, { stroke: c.signal, width: last ? 2.2 : 1.6, alpha: hold * (last ? 1 : end) });
        if (last && t > 11.8) g.text('Compatible', x, y - small - 20, { align: 'center', color: c.signal, alpha: seg(t, 11.8, 12.2) * (1 - seg(t, 14.6, 15.2)), minor: true });
      });
      if (t >= 12.4) {
        const back = easeIO(seg(t, 12.4, 13.4));
        ax = lerp(stops[3][0], ux, back);
        ay = lerp(stops[3][1], uy, back);
      }
      const seen = 1 - seg(t, 13.2, 13.5);
      if (trail.length > 1) g.poly(trail, { alpha: 0.4 * seen, dash: [1.5, 4] });
      g.poly([[ax, ay - 7], [ax + 7, ay], [ax, ay + 7], [ax - 7, ay]], { fill: c.ink, stroke: false, alpha: seen }, true);
      if (t < 11.4) g.text('Agent', ax + 12, ay + 4, { alpha: seen * seg(t, 7.6, 8.0), minor: true });
    }

    // 4 — the suggestion waits; the line only becomes solid when you say so
    if (t >= 11.6) {
      const drawn = easeIO(seg(t, 11.6, 12.4));
      g.line(ux, uy, lerp(ux, mx, drawn), lerp(uy, my, drawn), { stroke: c.signal, width: chosen > 0 ? 2.2 : 1.4, dash: chosen >= 1 ? [] : [5, 5], alpha: 0.9 });
      if (t >= 12.4 && t < 13.8) {
        const pulse = ((t - 12.4) * 1.5) % 1;
        g.circle(ux, uy, 10 + pulse * big, { stroke: c.signal, alpha: 1 - pulse });
      }
      if (t >= 12.4) g.text('Your choice', ux, uy - big - 12, { align: 'center', color: c.signal, alpha: seg(t, 12.4, 12.8) * (1 - seg(t, 14.8, 15.3)) });
      // only now does the other model come into view, because both said yes
      if (chosen > 0) {
        g.poly(shape(mx, my, small * (1 + 0.5 * chosen), others[MATCH]), { fill: c.signal, fillAlpha: 0.12 * chosen, stroke: c.signal, alpha: chosen }, true);
      }
    }
  },
};

/* ---------- SheetOS: measure a cone, calculate, unfold it, hand over the outline ---------- */

const sheetos = {
  duration: 16,
  still: 14.2,
  beats: ['Field measurements', 'Parametric calculation', 'Unfolded geometry', 'DXF output'],
  beatAt: (t) => (t < 3.5 ? 0 : t < 6.5 ? 1 : t < 11 ? 2 : 3),
  state: { r2: 110, h: 300 },
  draw(g, t) {
    const { c } = g;
    const S = g.compact ? { x: 14, y: 14, w: 196, h: 300 } : { x: 34, y: 28, w: 280, h: 318 };
    const Q = g.compact ? { x: 222, y: 14, w: 244, h: 300 } : { x: 336, y: 28, w: 430, h: 318 };
    const D = g.compact ? { x: 14, y: 332, w: 452, h: 134 } : { x: 34, y: 366, w: 732, h: 62 };

    // Parameters: the bottom stays; the top diameter and the height can change.
    const R1 = 200;
    const morph = seg(t, 8.8, 11);
    let r2 = 110 + 46 * Math.sin(morph * TAU);
    let hh = 300 + 54 * Math.sin(morph * Math.PI);
    if (g.pointer && g.pointer.active) {
      r2 = lerp(64, 160, g.pointer.x);
      hh = lerp(370, 180, g.pointer.y);
    }
    const st = sheetos.state;
    st.r2 += (r2 - st.r2) * 0.14;
    st.h += (hh - st.h) * 0.14;
    const R2 = st.r2;
    const Hh = st.h;

    // The calculation: slant height, development radii, sweep angle.
    const slant = Math.hypot(Hh, R1 - R2);
    const L1 = (slant * R1) / (R1 - R2);
    const L2 = L1 - slant;
    const theta = (TAU * R1) / L1;

    /* the measured part */
    const k = Math.min((S.w * 0.74) / (2 * R1), (S.h * 0.6) / 370);
    const cx = S.x + S.w * 0.46;
    const by = S.y + S.h - (g.compact ? 44 : 50);
    const ty = by - Hh * k;
    const rx1 = R1 * k;
    const rx2 = R2 * k;
    const sq = 0.26;
    const measured = [seg(t, 0.3, 1.2), seg(t, 1.2, 2.1), seg(t, 2.1, 3.0)];

    // generators up to the apex, once the calculation starts
    const apex = seg(t, 3.6, 4.6);
    if (apex > 0) {
      const ay = by - ((R1 * Hh) / (R1 - R2)) * k;
      g.ctx.save();
      g.ctx.beginPath();
      g.ctx.rect(S.x, S.y, S.w, S.h);
      g.ctx.clip();
      g.line(cx - rx2, ty, lerp(cx - rx2, cx, apex), lerp(ty, ay, apex), { alpha: 0.4, dash: [3, 4] });
      g.line(cx + rx2, ty, lerp(cx + rx2, cx, apex), lerp(ty, ay, apex), { alpha: 0.4, dash: [3, 4] });
      g.ctx.restore();
    }
    g.path((x) => {
      x.moveTo(cx - rx1, by);
      x.lineTo(cx - rx2, ty);
      x.ellipse(cx, ty, rx2, rx2 * sq, 0, Math.PI, TAU);
      x.lineTo(cx + rx1, by);
      x.ellipse(cx, by, rx1, rx1 * sq, 0, 0, Math.PI);
    }, { fill: c.shoal, fillAlpha: 0.7, width: 1.5 });
    g.path((x) => x.ellipse(cx, ty, rx2, rx2 * sq, 0, 0, Math.PI), { width: 1.5 });
    g.path((x) => x.ellipse(cx, by, rx1, rx1 * sq, 0, Math.PI, TAU), { alpha: 0.35, dash: [3, 4] });

    const dim = (x1, y1, x2, y2, label, p, lx, ly, align) => {
      if (p <= 0) return;
      const ex = lerp(x1, x2, p);
      const ey = lerp(y1, y2, p);
      g.line(x1, y1, ex, ey, { stroke: c.signal });
      const nx = y2 === y1 ? 0 : 4;
      const ny = y2 === y1 ? 4 : 0;
      g.line(x1 - nx, y1 - ny, x1 + nx, y1 + ny, { stroke: c.signal });
      if (p >= 1) g.line(x2 - nx, y2 - ny, x2 + nx, y2 + ny, { stroke: c.signal });
      g.text(label, lx, ly, { color: c.signal, align, alpha: p, size: 10 });
    };
    const yd1 = by + rx1 * sq + 14;
    dim(cx - rx1, yd1, cx + rx1, yd1, 'D1', measured[0], cx, yd1 + 15, 'center');
    const yd2 = ty - rx2 * sq - 12;
    dim(cx - rx2, yd2, cx + rx2, yd2, 'D2', measured[1], cx, yd2 - 7, 'center');
    const xh = cx + rx1 + 14;
    dim(xh, by, xh, ty, 'H', measured[2], xh + 8, (by + ty) / 2 + 4, 'left');

    /* the flat pattern */
    const half = theta / 2;
    const bw = 2 * L1 * (half >= Math.PI / 2 ? 1 : Math.sin(half));
    const bottom = Math.max(-L2 * Math.cos(half), -L1 * Math.cos(half));
    const bh = L1 + bottom;
    const sc = Math.min((Q.w * 0.86) / bw, (Q.h * 0.78) / bh);
    const ox = Q.x + Q.w / 2;
    const oy = Q.y + Q.h / 2 + ((L1 - bottom) / 2) * sc; // apex position
    const unfold = easeIO(seg(t, 6.5, 8.6));
    const a0 = -Math.PI / 2 - half;
    const a1 = a0 + theta * unfold;
    const ro = L1 * sc;
    const ri = L2 * sc;
    const pt = (r, a) => [ox + Math.cos(a) * r, oy + Math.sin(a) * r];
    const outline = (x, to) => {
      x.arc(ox, oy, ro, a0, to);
      x.arc(ox, oy, ri, to, a0, true);
      x.closePath();
    };

    if (unfold > 0) {
      g.ctx.save();
      g.ctx.beginPath();
      g.ctx.rect(Q.x, Q.y, Q.w, Q.h);
      g.ctx.clip();
      g.line(...pt(ri, a0), ox, oy, { alpha: 0.3 * unfold, dash: [3, 4] });
      g.line(...pt(ri, a1), ox, oy, { alpha: 0.3 * unfold, dash: [3, 4] });
      g.path((x) => outline(x, a1), { fill: c.paper, fillAlpha: 0.95, width: 1.5 });
      const rulings = 12;
      for (let i = 1; i < rulings; i += 1) {
        const a = a0 + (theta * i) / rulings;
        if (a < a1) g.line(...pt(ri, a), ...pt(ro, a), { alpha: 0.28 });
      }
      g.line(ox - 5, oy, ox + 5, oy, { alpha: 0.6 });
      g.line(ox, oy - 5, ox, oy + 5, { alpha: 0.6 });
      if (unfold >= 1 && ri > 34) {
        g.arc(ox, oy, 22, a0, a0 + theta, { stroke: c.signal, alpha: 0.9 });
        g.text(`${((theta * 180) / Math.PI).toFixed(1)}°`, ox, oy - 30, { color: c.signal, align: 'center', size: 10, minor: true });
      }
      g.ctx.restore();
    } else {
      g.text('Flat pattern', Q.x + Q.w / 2, Q.y + Q.h / 2, { align: 'center', alpha: 0.6, minor: true });
    }

    // DXF: the outline is what leaves the building.
    const trace = seg(t, 11, 13);
    if (trace > 0 && unfold >= 1) {
      const len = ro * theta + ri * theta + 2 * (ro - ri);
      const u = 1 / g.px(1); // dashes are given in screen pixels
      g.path((x) => outline(x, a1), { stroke: c.signal, width: 2.4, dash: [len * trace * u, len * 2 * u] });
      const corners = [pt(ro, a0), pt(ro, a1), pt(ri, a1), pt(ri, a0)];
      corners.forEach(([x, y], i) => {
        if (trace > [0, ro * theta, ro * theta + (ro - ri), len - (ro - ri)][i] / len) g.rect(x - 3, y - 3, 6, 6, { fill: c.signal, stroke: false });
      });
      const tag = seg(t, 13, 13.5);
      if (tag > 0) {
        const fx = Q.x + Q.w - (g.compact ? 44 : 58);
        const fy = Q.y + Q.h - (g.compact ? 46 : 56);
        const fw = g.compact ? 34 : 42;
        const fh = fw * 1.24;
        g.poly([[fx, fy], [fx + fw - 10, fy], [fx + fw, fy + 10], [fx + fw, fy + fh], [fx, fy + fh]], { fill: c.paper, stroke: c.signal, width: 1.5, alpha: tag }, true);
        g.poly([[fx + fw - 10, fy], [fx + fw - 10, fy + 10], [fx + fw, fy + 10]], { stroke: c.signal, alpha: tag });
        g.text('DXF', fx + fw / 2, fy + fh - 9, { color: c.signal, align: 'center', size: 10, alpha: tag, weight: 600 });
        g.text('2 arcs · 2 lines', fx - 10, fy + fh - 9, { align: 'right', alpha: tag, minor: true });
      }
    }

    /* readouts: three numbers in, four numbers out */
    const cells = [
      ['D1', 2 * R1, measured[0], false],
      ['D2', 2 * R2, measured[1], false],
      ['H', Hh, measured[2], false],
      ['Slant', slant, seg(t, 3.6, 4.4), true],
      ['R outer', L1, seg(t, 4.3, 5.1), true],
      ['R inner', L2, seg(t, 5.0, 5.8), true],
      ['Angle', (theta * 180) / Math.PI, seg(t, 5.6, 6.4), true],
    ];
    const cols = g.compact ? 4 : 7;
    const cellW = D.w / cols;
    const rowH = g.compact ? 62 : D.h;
    g.line(D.x, D.y, D.x + D.w, D.y, { alpha: 0.5 });
    cells.forEach(([label, value, shown, derived], i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = D.x + col * cellW;
      const y = D.y + row * rowH;
      if (col) g.line(x, y + 10, x, y + rowH - 8, { alpha: 0.18 });
      g.text(label, x + (col ? 12 : 0), y + 22, { size: 9.5 });
      if (shown <= 0) {
        g.text('—', x + (col ? 12 : 0), y + 46, { color: c.ink, size: g.compact ? 15 : 17, alpha: 0.4 });
        return;
      }
      // numbers settle as they are measured or calculated
      const settle = shown < 1 ? value * (0.6 + 0.4 * shown) + Math.sin(t * 40 + i) * (1 - shown) * 30 : value;
      const txt = label === 'Angle' ? `${settle.toFixed(1)}°` : settle.toFixed(label.startsWith('D') || label === 'H' ? 0 : 1);
      g.text(txt, x + (col ? 12 : 0), y + 46, { color: derived ? c.signal : c.ink, size: g.compact ? 15 : 17, weight: 500 });
    });
    if (!g.tight) g.text('mm', D.x + D.w, D.y + 22, { align: 'right', size: 9.5 });
  },
};

const SCENES = { veynod, ancs, serendipity, sheetos };

/* ---------- Stage: one canvas, one scene, running only while it is on screen ---------- */

const stages = new Set();
let colors = null;
let raf = 0;

function palette() {
  const cs = getComputedStyle(document.documentElement);
  const get = (name) => cs.getPropertyValue(name).trim();
  colors = { paper: get('--paper'), ink: get('--ink'), soft: get('--ink-soft'), shoal: get('--shoal'), signal: get('--signal') };
}

function loop(now) {
  let running = false;
  for (const s of stages) {
    if (s.visible) {
      s.render(now);
      running = true;
    }
  }
  raf = running ? requestAnimationFrame(loop) : 0;
}

const wake = () => {
  if (!raf) raf = requestAnimationFrame(loop);
};

class Stage {
  constructor(el, id, reduce) {
    this.el = el;
    this.reduce = reduce;
    this.visible = false;
    this.pointer = { x: 0.5, y: 0.5, active: false };
    this.beat = -1;
    this.onBeat = null;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    el.append(this.canvas);
    this.setScene(id);

    new ResizeObserver(() => this.resize()).observe(el);
    new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting && !this.reduce;
      if (this.visible) wake();
      else if (entry.isIntersecting) this.render(0);
    }, { threshold: 0.15 }).observe(el);

    el.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect();
      this.pointer = { x: clamp((e.clientX - r.left) / r.width), y: clamp((e.clientY - r.top) / r.height), active: true };
    });
    el.addEventListener('pointerleave', () => {
      this.pointer.active = false;
    });
    this.resize();
  }

  setScene(id) {
    if (!SCENES[id] || this.id === id) return;
    this.id = id;
    this.scene = SCENES[id];
    this.t0 = performance.now();
    this.beat = -1;
    if (this.reduce) this.render(0);
  }

  resize() {
    const r = this.el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    this.w = r.width;
    this.h = r.height;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.compact = this.w / this.h < 1.3;
    if (!this.visible) this.render(0);
  }

  render(now) {
    if (!this.w || !colors) return;
    const { ctx, scene } = this;
    const design = this.compact ? { w: 480, h: 480 } : { w: 800, h: 450 };
    const scale = Math.min(this.w / design.w, this.h / design.h);
    const t = this.reduce ? scene.still : (((now || performance.now()) - this.t0) / 1000) % scene.duration;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setTransform(
      scale * this.dpr, 0, 0, scale * this.dpr,
      ((this.w - design.w * scale) / 2) * this.dpr,
      ((this.h - design.h * scale) / 2) * this.dpr,
    );
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    const g = pen(ctx, scale, colors, this.compact, this.pointer);
    // Each loop fades in and out, so the restart is never a jump.
    g.fade = this.reduce ? 1 : ease(seg(t, 0, 0.5)) * (1 - ease(seg(t, scene.duration - 0.6, scene.duration)));
    scene.draw(g, t);

    const beat = scene.beatAt(t);
    if (beat !== this.beat) {
      this.beat = beat;
      if (this.onBeat) this.onBeat(beat, scene, this.id);
    }
  }
}

/**
 * Mount every [data-scene] placeholder.
 *   data-scene="veynod"            which scene to play
 *   data-beats="#id"               an <ol> whose items light up with the scene's steps
 * Returns the stages so a caller can switch scenes or follow their beats.
 */
export function mountScenes(scope = document) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  palette();
  const made = [];

  for (const el of scope.querySelectorAll('[data-scene]')) {
    if (!SCENES[el.dataset.scene]) continue;
    const stage = new Stage(el, el.dataset.scene, reduce);
    const list = el.dataset.beats && document.querySelector(el.dataset.beats);
    if (list) {
      stage.onBeat = (beat) => [...list.children].forEach((li, i) => li.classList.toggle('is-on', i === beat));
    }
    stages.add(stage);
    made.push(stage);
  }

  const repaint = () => {
    palette();
    for (const s of stages) if (!s.visible) s.render(0);
  };
  new MutationObserver(repaint).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', repaint);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(repaint);
  return made;
}

export const sceneInfo = (id) => SCENES[id];
