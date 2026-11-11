// MOSIKEN — site behaviour. Everything here is an enhancement:
// the pages read and navigate fine without it.

import { renderPlates } from './plates.js';

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

window.__mosiken = true;

/* ---------- Theme ---------- */

function theme() {
  const button = $('[data-theme-toggle]');
  if (!button) return;
  const system = matchMedia('(prefers-color-scheme: dark)');
  const current = () => root.dataset.theme || (system.matches ? 'dark' : 'light');
  const label = () => {
    button.setAttribute('aria-label', `Switch to ${current() === 'dark' ? 'light' : 'dark'} theme`);
  };
  button.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('mosiken-theme', next);
    } catch {
      /* private mode: the choice lasts for this page only */
    }
    label();
  });
  system.addEventListener('change', label);
  new MutationObserver(label).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  label();
}

/* ---------- Header and mobile menu ---------- */

function header() {
  const bar = $('.site-header');
  if (!bar) return;
  const onScroll = () => bar.classList.toggle('is-stuck', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = $('[data-menu-toggle]');
  const nav = $('#site-nav');
  if (!toggle || !nav) return;
  const rest = $$('main, .site-footer');

  const set = (open) => {
    root.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
    rest.forEach((el) => {
      el.inert = open;
    });
  };

  toggle.addEventListener('click', () => set(!root.classList.contains('menu-open')));
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) set(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) {
      set(false);
      toggle.focus();
    }
  });
  matchMedia('(min-width: 48rem)').addEventListener('change', () => set(false));
}

/* ---------- Ohio local time ---------- */

function clock() {
  const els = $$('[data-clock]');
  if (!els.length) return;
  let fmt;
  try {
    fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZoneName: 'short',
    });
  } catch {
    return;
  }
  const tick = () => {
    const text = fmt.format(new Date());
    els.forEach((el) => {
      el.textContent = text;
    });
  };
  tick();
  setInterval(() => {
    if (!document.hidden) tick();
  }, 1000);
}

/* ---------- Reveal on scroll ---------- */

function reveal() {
  const els = $$('[data-reveal]');
  if (!root.classList.contains('js-reveal')) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Headlines that ink in as they are read ---------- */

function ink() {
  const els = $$('[data-ink]');
  if (!els.length || reduce.matches) return;

  for (const el of els) {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      el.append(span, i < words.length - 1 ? ' ' : '');
    });
  }

  let queued = false;
  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    for (const el of els) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -vh || rect.top > vh * 2) continue;
      const progress = clamp((vh * 0.92 - rect.top) / (vh * 0.42 + rect.height), 0, 1);
      const words = el.children;
      for (let i = 0; i < words.length; i += 1) {
        words[i].style.setProperty('--o', clamp(progress * (words.length + 2) - i, 0, 1).toFixed(2));
      }
    }
  };
  const request = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();
}

/* ---------- Product index: a plate follows the pointer ---------- */

function peek() {
  const index = $('[data-index]');
  const panel = $('[data-peek]');
  if (!index || !panel || !finePointer.matches) return;

  const plates = $$('[data-plate]', panel);
  const at = { x: 0, y: 0, tx: 0, ty: 0 };
  let raf = 0;
  let on = false;

  const show = (name) => {
    plates.forEach((p) => p.classList.toggle('is-on', p.dataset.plate === name));
  };

  const loop = () => {
    at.x += (at.tx - at.x) * 0.16;
    at.y += (at.ty - at.y) * 0.16;
    panel.style.setProperty('--x', `${at.x.toFixed(1)}px`);
    panel.style.setProperty('--y', `${at.y.toFixed(1)}px`);
    raf = on || Math.abs(at.tx - at.x) > 0.5 || Math.abs(at.ty - at.y) > 0.5 ? requestAnimationFrame(loop) : 0;
  };

  const place = (e) => {
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    at.tx = clamp(e.clientX + 24, 12, window.innerWidth - w - 12);
    at.ty = clamp(e.clientY + 24, 12, window.innerHeight - h - 12);
  };

  index.addEventListener('pointermove', (e) => {
    const row = e.target.closest('[data-peek-for]');
    if (!row) {
      on = false;
      panel.classList.remove('is-on');
      return;
    }
    place(e);
    if (!on) {
      at.x = at.tx;
      at.y = at.ty;
      on = true;
      panel.classList.add('is-on');
    }
    show(row.dataset.peekFor);
    if (!raf) raf = requestAnimationFrame(loop);
  });

  index.addEventListener('pointerleave', () => {
    on = false;
    panel.classList.remove('is-on');
  });
}

/* ---------- Footer wordmark: width moves like a tide under the pointer ---------- */

function wordmark() {
  const el = $('[data-wordmark]');
  if (!el) return;
  const letters = $$('span', el);
  const REST = 92;
  const MIN = 62;
  const MAX = 125;
  const now = letters.map(() => REST);
  const goal = letters.map(() => REST);
  const extra = $('[data-fold]', el);
  let widths = [];
  let folded = REST;
  let raf = 0;

  const measure = (stretch) => {
    letters.forEach((l) => {
      l.style.fontStretch = `${stretch}%`;
    });
    return letters.map((l) => l.getBoundingClientRect().width);
  };

  const fit = () => {
    const wasFolded = el.classList.contains('is-folded');
    el.classList.remove('is-folded');
    el.style.fontSize = '100px';
    el.style.justifyContent = 'flex-start';
    const wider = measure(REST + 10);
    widths = measure(REST);
    const total = widths.reduce((a, b) => a + b, 0);
    // How far the other letters must widen to take up one letter's room.
    const at = letters.indexOf(extra);
    if (at >= 0) {
      const perPercent = letters.reduce((sum, _, i) => (i === at ? sum : sum + (wider[i] - widths[i]) / 10), 0);
      folded = perPercent > 0 ? clamp(REST + (widths[at] / perPercent) * 0.94, REST, MAX) : REST;
    }
    el.classList.toggle('is-folded', wasFolded);
    el.style.justifyContent = '';
    if (total > 0) el.style.fontSize = `${((100 * el.clientWidth) / total) * 0.992}px`;
    letters.forEach((l, i) => {
      l.style.fontStretch = `${now[i].toFixed(1)}%`;
    });
  };

  const loop = () => {
    let moving = false;
    letters.forEach((l, i) => {
      const d = goal[i] - now[i];
      if (Math.abs(d) > 0.05) {
        now[i] += d * 0.12;
        moving = true;
      } else {
        now[i] = goal[i];
      }
      l.style.fontStretch = `${now[i].toFixed(1)}%`;
    });
    raf = moving ? requestAnimationFrame(loop) : 0;
  };
  const run = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };

  // Widen the letters near x, narrow the rest, keep the line the same length.
  const pull = (x) => {
    const rect = el.getBoundingClientRect();
    const total = widths.reduce((a, b) => a + b, 0) || 1;
    let cursor = rect.left;
    const near = letters.map((_, i) => {
      const w = (widths[i] / total) * rect.width;
      const centre = cursor + w / 2;
      cursor += w;
      const d = (x - centre) / (rect.width * 0.2);
      return Math.exp(-d * d);
    });
    const mean = near.reduce((sum, g, i) => sum + g * widths[i], 0) / total;
    letters.forEach((_, i) => {
      goal[i] = clamp(REST + (near[i] - mean) * 62, MIN, MAX);
    });
    run();
  };

  const rest = () => {
    goal.fill(el.classList.contains('is-folded') ? folded : REST);
    run();
  };

  if (!reduce.matches && finePointer.matches) {
    el.addEventListener('pointermove', (e) => {
      if (!el.classList.contains('is-folded')) pull(e.clientX);
    });
    el.addEventListener('pointerleave', rest);
  }

  // One letter sets this name apart from a place on a chart.
  let timer = 0;
  if (extra) {
    extra.addEventListener('click', () => {
      const nowFolded = el.classList.toggle('is-folded');
      clearTimeout(timer);
      rest();
      if (nowFolded) {
        timer = setTimeout(() => {
          el.classList.remove('is-folded');
          rest();
        }, 7000);
      }
    });
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  new ResizeObserver(fit).observe(el);
  fit();
}

/* ---------- Copy to clipboard ---------- */

function copy() {
  for (const button of $$('[data-copy]')) {
    const label = $('[data-copy-label]', button) || button;
    const original = label.textContent;
    let timer = 0;
    button.addEventListener('click', async () => {
      const text = button.dataset.copy;
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        // Clipboard refused: select the address so it can be copied by hand.
        const target = $(button.dataset.copyTarget || '[data-copy-source]');
        if (target) {
          const range = document.createRange();
          range.selectNodeContents(target);
          const sel = getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
      label.textContent = ok ? 'Copied' : 'Address selected';
      button.classList.toggle('is-done', ok);
      clearTimeout(timer);
      timer = setTimeout(() => {
        label.textContent = original;
        button.classList.remove('is-done');
      }, 2200);
    });
  }
}

/* ---------- Tidal field ---------- */

function field() {
  const canvas = $('canvas[data-field]');
  if (!canvas) return;
  const out = $('[data-readout]');
  import('./field.js')
    .then(({ mount }) => {
      mount(canvas, {
        onReadout: out
          ? ({ active, bearing, range }) => {
              out.textContent = active
                ? `BRG ${String(Math.round(bearing) % 360).padStart(3, '0')}° · RNG ${range.toFixed(2)}`
                : 'BRG ---° · RNG -.--';
            }
          : undefined,
      });
    })
    .catch(() => {
      /* no field: the hero stands on type alone */
    });
}

/* ---------- Boot ---------- */

theme();
header();
clock();
renderPlates();
reveal();
ink();
peek();
wordmark();
copy();
field();

console.info(
  "%cMOSIKEN%c\nSome place names are clues.\n67°48'N 12°50'E",
  'font: 800 22px/1.6 sans-serif; letter-spacing: 0.08em',
  'font: 12px/1.6 monospace',
);
