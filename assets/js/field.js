// Tidal field — one chart sheet behind the whole page, drawn in a fragment shader.
// The page scrolls across it. Where a stage is marked, a slow gyre sits in the
// water and the pointer stirs a second one; further down the chart goes quiet
// so the text can be read. A paper boat keeps to the current. Tap the water.

const VERT = `attribute vec2 a; void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

// Simplex noise: Ian McEwan, Ashima Arts / Stefan Gustavson (MIT License).
const FRAG = `
#extension GL_OES_standard_derivatives : enable
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform float uPx;
uniform vec2 uShift;   // x: chart offset, y: page offset (both in viewport heights)
uniform vec3 uEye;     // chart position, strength
uniform vec3 uPtr;     // view position, strength
uniform vec3 uDrop;    // chart position, age
uniform vec2 uCalm;    // x: how quiet (0..1), y: where the text column starts (0..1)
uniform vec2 uZoneA;   // top, bottom of a shoal band in view space
uniform vec2 uZoneB;
uniform vec3 uPaper;
uniform vec3 uInk;
uniform vec3 uShoal;
uniform vec3 uSignal;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

vec2 swirl(vec2 p, vec2 c, float k, float s) {
  vec2 d = p - c;
  float a = k * exp(-dot(d, d) / (s * s));
  float cs = cos(a);
  float sn = sin(a);
  return c + vec2(cs * d.x - sn * d.y, sn * d.x + cs * d.y);
}

float stroke(float d, float halfWidth) {
  return 1.0 - smoothstep(halfWidth - 0.5, halfWidth + 0.5, d);
}

// Signed distance into a band whose edges wander like a tide line.
float band(vec2 z, float y, float wob) {
  if (z.x <= z.y) return -1.0;
  return min(z.x + wob - y, y - z.y + wob);
}

void main() {
  float asp = uRes.x / uRes.y;
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = vec2(uv.x * asp, uv.y - uShift.x);
  vec2 eye = vec2(uEye.x * asp, uEye.y);
  vec2 ptr = vec2(uPtr.x * asp, uPtr.y - uShift.x);

  // Twist the sampling space around the gyre, then around the pointer.
  vec2 q = swirl(p, eye, (2.7 + 0.35 * sin(uTime * 0.21)) * uEye.z, 0.46);
  q = swirl(q, ptr, 1.9 * uPtr.z, 0.2);

  float t = uTime * 0.045;
  float h = snoise(vec3(q * 1.1, t)) * 0.6 + snoise(vec3(q * 2.5 + 11.3, t * 1.7)) * 0.2;

  float de = distance(p, eye);
  h -= 0.9 * uEye.z * exp(-de * de / 0.05);
  float dp = distance(p, ptr);
  h -= 0.4 * uPtr.z * exp(-dp * dp / 0.012);

  // A drop on the surface: one ring travelling outward.
  float ring = 0.0;
  if (uDrop.z >= 0.0) {
    vec2 dc = vec2(uDrop.x * asp, uDrop.y);
    float dd = distance(p, dc);
    float r = uDrop.z * 0.2;
    float life = clamp(1.0 - uDrop.z / 3.2, 0.0, 1.0);
    float w = (dd - r) / 0.03;
    h += 0.08 * life * exp(-w * w) * sin((dd - r) * 90.0);
    ring = life * stroke(abs(dd - r) * uRes.y, 0.6 * uPx);
  }

  // Shoal bands belong to the page, so they ride with the text.
  vec2 c = vec2(uv.x * asp, uv.y - uShift.y);
  float wob = snoise(vec3(c * 1.3, 7.0 + uTime * 0.03)) * 0.034 + snoise(vec3(c * 3.3, 3.0)) * 0.011;
  float zd = max(band(uZoneA, uv.y, wob), band(uZoneB, uv.y, wob));
  float za = fwidth(zd) * 1.2 + 0.00001;
  float shoal = smoothstep(-za, za, zd);

  // Depth tints, the way a chart shades shallow water.
  float aa = fwidth(h) * 1.2 + 0.00001;
  float tint = 0.55 * smoothstep(-aa, aa, h - 0.1) + 0.45 * smoothstep(-aa, aa, h - 0.38);
  vec3 col = mix(uPaper, uShoal, max(tint * mix(1.0, 0.8, uCalm.x), shoal));

  // Quieter away from the stage, quieter again under the text column.
  float column = smoothstep(uCalm.y - 0.05, uCalm.y + 0.03, uv.x);
  float gain = mix(1.0, 0.55, uCalm.x) * mix(1.0, 0.6, uCalm.x * column) * mix(1.0, 0.55, shoal);

  // Contours, with every fourth drawn heavier.
  float v = h * 9.0;
  float fw = fwidth(v) + 0.00001;
  float line = stroke(abs(fract(v - 0.5) - 0.5) / fw, 0.5 * uPx);
  float v4 = v * 0.25;
  float index = stroke(abs(fract(v4 - 0.5) - 0.5) / (fwidth(v4) + 0.00001), 0.9 * uPx);
  float crowd = 1.0 - smoothstep(0.3, 0.9, fw);
  col = mix(col, uInk, (line * 0.2 + index * 0.32) * crowd * gain);

  // The tide line around a shoal band.
  col = mix(col, uInk, stroke(abs(zd) / za * 1.2, 0.6 * uPx) * 0.4);

  // Graticule ticks, printed on the chart.
  float G = 128.0 * uPx;
  vec2 gp = abs(mod(gl_FragCoord.xy - vec2(0.0, uShift.x * uRes.y) + 0.5 * G, G) - 0.5 * G);
  float tick = step(max(gp.x, gp.y), 5.0 * uPx) * step(min(gp.x, gp.y), 0.5 * uPx);
  col = mix(col, uInk, tick * 0.4 * gain);

  // The eye, the pointer's range ring, the drop.
  col = mix(col, uSignal, stroke(de * uRes.y, 3.0 * uPx) * uEye.z);
  col = mix(col, uSignal, stroke(abs(dp * uRes.y - 26.0 * uPx), 0.6 * uPx) * uPtr.z * 0.9);
  col = mix(col, uSignal, ring * 0.85);

  gl_FragColor = vec4(col, 1.0);
}
`;

const BOAT = `<svg class="boat" viewBox="0 0 32 24" aria-hidden="true"><path d="M1 12h30l-7 10H8z"/><path d="M16 2l7 10H9z"/><path d="M16 2v10"/></svg>`;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return [0.5, 0.5, 0.5];
  const n = parseInt(m[1], 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) || 'shader compile failed');
  }
  return s;
}

/**
 * Mount the field on the page's fixed canvas.
 *   canvas[data-gyre="label"]   the page has a gyre; the label is set beside its eye
 *   [data-field-stage]          where the chart is loud and answers the pointer
 *   [data-zone]                 sections that sit on a shoal band
 * @param {HTMLCanvasElement} canvas
 * @param {{ onReadout?: (r: { active: boolean, bearing: number, range: number }) => void }} [opts]
 * @returns {boolean} false when WebGL is unavailable (the page works without it).
 */
export function mount(canvas, opts = {}) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl || !gl.getExtension('OES_standard_derivatives')) return false;

  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link failed');
  } catch (err) {
    console.warn('[field]', err);
    return false;
  }

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = {};
  for (const name of [
    'uRes', 'uTime', 'uPx', 'uShift', 'uEye', 'uPtr', 'uDrop', 'uCalm', 'uZoneA', 'uZoneB',
    'uPaper', 'uInk', 'uShoal', 'uSignal',
  ]) {
    U[name] = gl.getUniformLocation(program, name);
  }

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const stage = document.querySelector('[data-field-stage]');
  const foot = document.querySelector('.site-footer');
  const gyre = canvas.dataset.gyre !== undefined;

  // --- state ---------------------------------------------------------------
  let W = 1;
  let H = 1;
  let asp = 1;
  let quality = 1;
  let time = 40;
  let scroll = 0;
  let drift = 0.55; // how fast the chart passes, relative to the page
  let column = 0;
  let zones = [];
  let stageH = 1;
  let footTop = Infinity;
  const eye = { x: 0.8, y: 0.58 };
  const ptr = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, k: 0, tk: 0 };
  const drop = { x: 0, y: 0, age: -1 };

  let boatEl = null;
  let markEl = null;
  const boat = { x: 0, y: 0, vx: 0, vy: 0, lean: 0, face: 1, r0: 0.2, set: false };
  if (gyre) {
    document.body.insertAdjacentHTML('beforeend', BOAT);
    boatEl = document.body.lastElementChild;
    if (canvas.dataset.gyre) {
      markEl = document.createElement('p');
      markEl.className = 'eye-mark mono';
      markEl.setAttribute('aria-hidden', 'true');
      markEl.textContent = canvas.dataset.gyre;
      document.body.append(markEl);
    }
  }

  const shift = () => (scroll * drift) / H;

  function colors() {
    const cs = getComputedStyle(root);
    for (const [u, token] of [['uPaper', '--paper'], ['uInk', '--ink'], ['uShoal', '--shoal'], ['uSignal', '--signal']]) {
      gl.uniform3fv(U[u], hexToRgb(cs.getPropertyValue(token)));
    }
  }

  // Where things sit on the page; measured on resize, not on every frame.
  function measure() {
    const top = (el) => el.getBoundingClientRect().top + window.scrollY;
    zones = [...document.querySelectorAll('[data-zone]')].map((el) => ({ top: top(el), height: el.offsetHeight }));
    stageH = stage ? stage.offsetHeight : 1;
    footTop = foot ? top(foot) : Infinity;
    const text = document.querySelector('.sheet__main');
    column = text && window.innerWidth >= 960 ? text.getBoundingClientRect().left / W : 0;
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = Math.max(1, rect.width);
    H = Math.max(1, rect.height);
    asp = W / H;
    const px = Math.min(window.devicePixelRatio || 1, 2) * quality;
    canvas.width = Math.round(W * px);
    canvas.height = Math.round(H * px);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform1f(U.uPx, px);

    const wide = asp > 1.15;
    eye.x = wide ? 0.8 : 0.7;
    eye.y = wide ? 0.58 : 0.7;
    if (markEl) markEl.dataset.side = wide ? 'wide' : 'tall';
    boat.r0 = Math.min(0.2, 0.15 * asp);
    if (!boat.set) {
      boat.x = eye.x * asp + boat.r0 * 0.5;
      boat.y = eye.y + boat.r0 * 0.86;
      boat.set = true;
    }
    measure();
  }

  function draw() {
    scroll = window.scrollY;
    const s = shift();

    // Loud on the stage, quiet over the text, a little louder again at the foot.
    let calm = stage ? smooth(0.1, 0.9, scroll / stageH) : 0.55 + 0.45 * smooth(0, 0.6, scroll / H);
    calm *= 1 - 0.5 * smooth(0, 0.9, (scroll + H - footTop) / H);

    const seen = zones
      .map((z) => [1 - (z.top - scroll) / H, 1 - (z.top + z.height - scroll) / H])
      .filter(([top, bottom]) => top > -0.2 && bottom < 1.2);

    gl.uniform1f(U.uTime, time);
    gl.uniform2f(U.uShift, s, scroll / H);
    gl.uniform3f(U.uEye, eye.x, eye.y, gyre ? 1 : 0);
    gl.uniform3f(U.uPtr, ptr.x, ptr.y, ptr.k);
    gl.uniform3f(U.uDrop, drop.x, drop.y, drop.age);
    gl.uniform2f(U.uCalm, calm, column);
    gl.uniform2fv(U.uZoneA, seen[0] || [0, 0]);
    gl.uniform2fv(U.uZoneB, seen[1] || [0, 0]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (markEl) {
      const y = (1 - (eye.y + s)) * H;
      markEl.style.transform = `translate(${(eye.x * W).toFixed(1)}px, ${y.toFixed(1)}px)`;
      markEl.style.visibility = y > -60 ? 'visible' : 'hidden';
    }
  }

  function sail(dt) {
    if (!boatEl) return;
    const ex = eye.x * asp;
    const ey = eye.y;
    const dx = boat.x - ex;
    const dy = boat.y - ey;
    const r = Math.hypot(dx, dy) || 0.0001;
    // The current: circle the eye, drift back to the usual lane.
    const speed = 0.03;
    const pull = -(r - boat.r0) * 0.35;
    const fx = (-dy / r) * speed + (dx / r) * pull;
    const fy = (dx / r) * speed + (dy / r) * pull;
    const ease = 1 - Math.exp(-dt * 0.9);
    boat.vx += (fx - boat.vx) * ease;
    boat.vy += (fy - boat.vy) * ease;
    boat.x = clamp(boat.x + boat.vx * dt, 0.03, asp - 0.03);
    boat.y = clamp(boat.y + boat.vy * dt, ey - 0.45, ey + 0.4);
    if (Math.abs(boat.vx) > 0.004) boat.face = boat.vx > 0 ? 1 : -1;
    boat.lean = Math.sin(time * 1.3) * 5 + clamp(boat.vy * -220, -14, 14) * boat.face;
    const x = boat.x * H;
    const y = (1 - (boat.y + shift())) * H;
    boatEl.style.visibility = y > -40 ? 'visible' : 'hidden';
    boatEl.style.transform =
      `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) rotate(${boat.lean.toFixed(1)}deg) scaleX(${boat.face})`;
  }

  function readout() {
    if (!opts.onReadout || !gyre) return;
    const dx = (ptr.x - eye.x) * asp;
    const dy = ptr.y - (eye.y + shift());
    const bearing = (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360;
    opts.onReadout({ active: ptr.tk > 0, bearing, range: Math.hypot(dx, dy) });
  }

  // --- loop ----------------------------------------------------------------
  let raf = 0;
  let last = 0;
  let frames = 0;
  let slow = 0;
  let tick = 0;
  let lastScroll = -1;

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    time += dt;

    const ease = 1 - Math.exp(-dt * 6);
    ptr.x += (ptr.tx - ptr.x) * ease;
    ptr.y += (ptr.ty - ptr.y) * ease;
    ptr.k += (ptr.tk - ptr.k) * (1 - Math.exp(-dt * 3));
    if (drop.age >= 0) {
      drop.age += dt;
      if (drop.age > 3.2) drop.age = -1;
    }
    sail(dt);

    // Full rate while something is happening; half rate while the chart only drifts.
    const moving = window.scrollY !== lastScroll || ptr.k > 0.01 || drop.age >= 0 || window.scrollY < stageH;
    lastScroll = window.scrollY;
    tick += 1;
    if (moving || tick % 2 === 0) {
      draw();
      readout();
    }

    // If the first second runs slow, trade resolution for smoothness once.
    if (frames < 45) {
      frames += 1;
      if (dt > 0.03) slow += 1;
      if (frames === 45 && slow > 22 && quality === 1) {
        quality = 0.6;
        resize();
      }
    }
  }

  function start() {
    if (raf || reduce.matches || document.hidden) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  function still() {
    sail(0);
    draw();
  }

  // --- input ---------------------------------------------------------------
  const onStage = (e) => stage && e.target instanceof Element && e.target.closest('[data-field-stage]');
  const locate = (e) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: clamp((e.clientX - rect.left) / rect.width, 0, 1),
      y: clamp(1 - (e.clientY - rect.top) / rect.height, 0, 1),
    };
  };

  window.addEventListener('pointermove', (e) => {
    if (!onStage(e) || e.pointerType === 'touch') {
      ptr.tk = 0;
      return;
    }
    const at = locate(e);
    ptr.tx = at.x;
    ptr.ty = at.y;
    ptr.tk = 1;
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    ptr.tk = 0;
    readout();
  });

  window.addEventListener('pointerdown', (e) => {
    if (reduce.matches || !onStage(e) || e.target.closest('a, button')) return;
    const at = locate(e);
    drop.x = at.x;
    drop.y = at.y - shift();
    drop.age = 0;
    // Surface tension drops behind the boat; the boat leaves.
    const dx = boat.x - at.x * asp;
    const dy = boat.y - drop.y;
    const d = Math.hypot(dx, dy) || 0.0001;
    const push = clamp(0.05 / (d + 0.12), 0, 0.3);
    boat.vx += (dx / d) * push;
    boat.vy += (dy / d) * push;
  });

  // --- lifecycle -----------------------------------------------------------
  let queued = false;
  const refresh = () => {
    if (raf || queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      still();
    });
  };

  new ResizeObserver(() => {
    resize();
    refresh();
  }).observe(canvas);
  new ResizeObserver(() => {
    measure();
    refresh();
  }).observe(document.body);

  window.addEventListener('scroll', refresh, { passive: true });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  const retheme = () => {
    colors();
    refresh();
  };
  new MutationObserver(retheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', retheme);

  const motion = () => {
    drift = reduce.matches ? 1 : 0.55;
    if (reduce.matches) {
      stop();
      still();
    } else {
      start();
    }
  };
  reduce.addEventListener('change', motion);

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    stop();
  });

  colors();
  resize();
  root.classList.add('has-field');
  motion();
  still();
  return true;
}
