// Writes the site's HTML in both languages, and the sitemap, from tools/copy/*.mjs.
//
//   node tools/build-pages.mjs [outDir]
//
// English pages land at the root, Chinese pages in zh/. The output is plain
// static HTML and is committed, so hosting needs no build step; run this only
// after changing copy or page structure, then commit what it writes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import en from './copy/en.mjs';
import zh from './copy/zh.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(process.argv[2] || ROOT);
const SITE = 'https://mosiken.org';
const EMAIL = 'ethan@mosiken.org';
const GYRE = `67°48'N 12°50'E`;

const PRODUCTS = [
  { id: 'veynod', name: 'Veynod', status: 'dev', links: ['https://veynod.com', 'https://github.com/MuadibUsul/veynod'] },
  { id: 'ancs', name: 'ANCS', status: 'dev', links: ['https://github.com/MuadibUsul/AI_Native_Creater_Studio'] },
  { id: 'serendipity', name: 'Serendipity', status: 'research', links: [] },
  { id: 'sheetos', name: 'SheetOS', status: 'live', links: ['https://sushiheng.com'] },
];

const PAGES = ['index.html', 'products.html', 'about.html', 'contact.html'];

const indent = (str, n) =>
  str
    .trim()
    .split('\n')
    .map((l) => (l ? ' '.repeat(n) + l : l))
    .join('\n');

const attr = (s) => s.replace(/&amp;/g, '&').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const url = (lang, file) => `${SITE}/${lang === 'zh' ? 'zh/' : ''}${file === 'index.html' ? '' : file}`;

/* ---------- Head: language routing, theme, metadata ---------- */

// Runs before anything paints. Visitors whose browser prefers Chinese get the
// Chinese pages; everyone else gets English. Crawlers are left where they are,
// so both versions stay indexable. There is no switch: the browser decides.
const route = (alt, zhPage) =>
  `(function(){var h=document.documentElement,u=navigator.userAgent||'';` +
  `if(/bot|crawl|spider|slurp|archiver|facebookexternalhit|embedly|preview|lighthouse|headless/i.test(u))return;` +
  `var l=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''],z=false;` +
  `for(var i=0;i<l.length;i++){var c=String(l[i]).toLowerCase();if(c.indexOf('zh')===0){z=true;break}if(c.indexOf('en')===0)break}` +
  `if(z!==${zhPage}){h.style.visibility='hidden';location.replace(${JSON.stringify(alt)}+location.search+location.hash)}})();`;

const THEME_BOOT =
  "(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('mosiken-theme');if(t==='dark'||t==='light')d.dataset.theme=t}catch(e){}if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-reveal');setTimeout(function(){if(!window.__mosiken)d.classList.remove('js-reveal')},4000)}})();";

function head(C, p) {
  const self = url(C.lang, p.file);
  const alternates = p.noindex
    ? '<meta name="robots" content="noindex">'
    : [
        `<link rel="canonical" href="${self}">`,
        `<link rel="alternate" hreflang="en" href="${url('en', p.file)}">`,
        `<link rel="alternate" hreflang="zh-Hans" href="${url('zh', p.file)}">`,
        `<link rel="alternate" hreflang="x-default" href="${url('en', p.file)}">`,
      ].join('\n');
  const jsonLd = p.jsonLd
    ? `\n<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: C.brand,
        url: `${SITE}/`,
        logo: `${SITE}/assets/img/icon-512.png`,
        email: EMAIL,
        slogan: C.org.slogan,
        description: C.org.description,
        address: { '@type': 'PostalAddress', addressRegion: C.org.addressRegion, addressCountry: C.org.addressCountry },
      })}</script>`
    : '';
  const other = C.lang === 'zh' ? en : zh;
  return `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script>${route(p.alt, C.lang === 'zh')}</script>
<title>${p.title}</title>
<meta name="description" content="${attr(p.description)}">
${alternates}
<meta name="theme-color" content="#EFF3F2" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#06090C" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(C.brand)}">
<meta property="og:locale" content="${C.ogLocale}">
<meta property="og:locale:alternate" content="${other.ogLocale}">
<meta property="og:title" content="${attr(C.social.title)}">
<meta property="og:description" content="${attr(C.social.description)}">
<meta property="og:url" content="${self}">
<meta property="og:image" content="${SITE}/assets/img/${C.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${attr(C.ogImageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${p.assets}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${p.assets}favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="${p.assets}assets/img/apple-touch-icon.png">
<link rel="manifest" href="${p.assets}site.webmanifest">
<link rel="preload" href="${p.assets}assets/fonts/archivo-variable.woff2" as="font" type="font/woff2" crossorigin>${
    C.lang === 'zh'
      ? `\n<link rel="preload" href="${p.assets}assets/fonts/mosiken-sc.woff2" as="font" type="font/woff2" crossorigin>`
      : ''
  }
<link rel="stylesheet" href="${p.assets}assets/css/main.css">
<script>${THEME_BOOT}</script>
<script type="module" src="${p.assets}assets/js/main.js"></script>${jsonLd}`;
}

/* ---------- Header and footer ---------- */

function header(C, p) {
  const U = C.ui;
  const nav = [
    ['products.html', U.products],
    ['about.html', U.about],
    ['contact.html', U.contact],
  ]
    .map(([f, label]) => `<a href="${p.links}${f}"${f === p.file ? ' aria-current="page"' : ''}>${label}</a>`)
    .join('\n        ');
  return `
<a class="skip" id="top" href="#main">${U.skip}</a>

<header class="site-header">
  <div class="wrap site-header__in">
    <a class="brand" href="${p.links}index.html" aria-label="${U.homeLabel}">
      <svg class="brand__mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
        <path d="M12 2.5a9.5 9.5 0 1 0 9.5 9.5"/>
        <path d="M12 7.5a4.5 4.5 0 1 1-4.5 4.5"/>
        <circle class="eye" cx="12" cy="12" r="1.7"/>
      </svg>
      <span>${C.brand}</span>
    </a>
    <div class="site-header__tools">
      <nav class="nav" id="site-nav" aria-label="${U.navLabel}">
        <a class="nav__home" href="${p.links}index.html"${p.file === 'index.html' ? ' aria-current="page"' : ''}>${U.home}</a>
        ${nav}
      </nav>
      <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="${U.theme}">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>
        </svg>
      </button>
      <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="site-nav">${U.menu}</button>
    </div>
  </div>
</header>`;
}

function footer(C, p) {
  const U = C.ui;
  const time = U.localTime ? `${U.localTime} <span data-clock>${U.clockFallback}</span>` : `<span data-clock>${U.clockFallback}</span>`;
  return `
<footer class="site-footer">
  <div class="wrap">
    <div class="site-footer__top">
      <div>
        <h2 class="label">${C.brand}</h2>
        <p>${U.place}</p>
        <p class="mono soft">${time}</p>
      </div>
      <nav aria-label="${U.footerNavLabel}">
        <h2 class="label">${U.site}</h2>
        <a href="${p.links}index.html">${U.home}</a>
        <a href="${p.links}products.html">${U.products}</a>
        <a href="${p.links}about.html">${U.about}</a>
        <a href="${p.links}contact.html">${U.contact}</a>
      </nav>
      <div>
        <h2 class="label">${U.contact}</h2>
        <a href="mailto:${EMAIL}">${EMAIL}</a>
        <a href="${SITE}">mosiken.org</a>
      </div>
    </div>
    <div class="wordmark-wrap">
      <div class="wordmark" data-wordmark aria-hidden="true"><span>M</span><span>O</span><span>S</span><span data-fold>I</span><span>K</span><span>E</span><span>N</span></div>
      <p class="clue mono" aria-hidden="true">67°44'45&quot;N 12°45'19&quot;E</p>
    </div>
    <div class="site-footer__base mono">
      <p>${U.rights}</p>
      <a href="#top">${U.top} <span class="i i--down" aria-hidden="true"></span></a>
    </div>
  </div>
</footer>`;
}

/* ---------- Shared blocks ---------- */

const mail = (C) => `
<div class="mail">
  <a class="mail__address" href="mailto:${EMAIL}" data-copy-source>${EMAIL}</a>
  <button class="copy mono" type="button" data-copy="${EMAIL}"><span data-copy-label>${C.ui.copy}</span></button>
</div>`;

const connect = (C) => `
<section class="section" aria-labelledby="connect-title">
  <div class="wrap sheet">
    <p class="label sheet__margin">${C.connect.label}</p>
    <div class="sheet__main">
      <h2 class="display" id="connect-title" data-ink>${C.connect.title}</h2>
      <p class="lead" data-reveal>${C.connect.lead}</p>
${indent(mail(C), 6)}
    </div>
  </div>
</section>`;

/* ---------- Pages ---------- */

function home(C) {
  const H = C.home;
  let n = 0;
  const title = H.hero
    .map((line) =>
      line
        .map(([word, accent]) => `<span class="w${accent ? ' w--wide' : ''}" style="--n:${n++}"><span>${word}</span></span>`)
        .join('\n'),
    )
    .join('\n<span class="br"></span>\n');
  return `
<main id="main">
  <section class="hero" aria-labelledby="hero-title" data-field-stage>
    <div class="wrap hero__body">
      <p class="label">${H.eyebrow}</p>
      <h1 class="hero__title" id="hero-title" aria-label="${attr(H.heroLabel)}">
${indent(title, 8)}
      </h1>
      <div class="hero__foot">
        <p class="lead">${H.sub}</p>
        <div class="actions">
          <a class="btn" href="products.html">${H.primary} <span class="i i--right" aria-hidden="true"></span></a>
          <a class="btn btn--ghost" href="contact.html">${H.secondary}</a>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="strip mono">
        <p>${C.ui.placeShort} · <span data-clock>${C.ui.clockFallback}</span></p>
        <p class="strip__readout" data-readout aria-hidden="true">BRG ---° · RNG -.--</p>
        <a href="#intro">${C.ui.scroll} <span class="i i--down" aria-hidden="true"></span></a>
      </div>
    </div>
  </section>

  <section class="section" id="intro" aria-labelledby="intro-title">
    <div class="wrap sheet">
      <p class="label sheet__margin">${H.introLabel}</p>
      <div class="sheet__main">
        <h2 class="display" id="intro-title" data-ink>${H.introTitle}</h2>
        <p class="lead" data-reveal>${H.intro}</p>
      </div>
    </div>
  </section>

  <section class="section section--tight" id="portfolio" aria-labelledby="portfolio-title">
    <div class="wrap">
      <div class="sheet">
        <p class="label sheet__margin">${H.portfolioLabel}</p>
        <div class="sheet__main">
          <h2 class="display" id="portfolio-title" data-ink>${H.portfolioTitle}</h2>
          <p class="lead" data-reveal>${H.portfolio}</p>
        </div>
      </div>
      <div class="index" data-index>
        <ul class="index__list">
${PRODUCTS.map((p) => {
  const T = C.products[p.id];
  return `          <li>
            <a class="row" href="products.html#${p.id}" data-scene-for="${p.id}">
              <span class="row__status status status--${p.status}">${T.short}</span>
              <span class="row__name">${p.name}</span>
              <span class="row__foot">
                <span class="row__cat label">${T.category}</span>
                <span class="row__go i i--right" aria-hidden="true"></span>
              </span>
              <span class="row__scene stage" data-scene="${p.id}" aria-hidden="true"></span>
            </a>
          </li>`;
}).join('\n')}
        </ul>
        <div class="index__viewer" aria-hidden="true">
          <div class="stage" data-scene="veynod" data-viewer></div>
          <p class="index__caption mono"><span data-viewer-name>Veynod</span><span data-viewer-step></span></p>
        </div>
      </div>
    </div>
  </section>

  <section class="section band" aria-labelledby="mission-title" data-zone>
    <div class="wrap sheet">
      <h2 class="label sheet__margin" id="mission-title">${H.missionLabel}</h2>
      <div class="sheet__main">
        <p class="display" data-reveal>${H.mission}</p>
        <a class="link" href="about.html" data-reveal>${H.aboutLink} <span class="i i--right" aria-hidden="true"></span></a>
      </div>
    </div>
  </section>

${indent(connect(C), 2)}
</main>`;
}

function product(C, p) {
  const T = C.products[p.id];
  const links = p.links.length
    ? `\n        <p class="links">\n${p.links
        .map((href, i) => `          <a class="link" href="${href}" rel="noopener">${T.links[i]} <span class="i i--out" aria-hidden="true"></span></a>`)
        .join('\n')}\n        </p>`
    : '';
  return `
<article class="product" id="${p.id}" aria-labelledby="${p.id}-name">
  <div class="wrap">
    <header class="product__head">
      <div class="product__meta">
        <p class="label">${T.category}</p>
        <p class="status status--${p.status}">${T.full}</p>
      </div>
      <h2 class="product__name" id="${p.id}-name">${p.name}</h2>${T.aka ? `\n      <p class="mono soft">${T.aka}</p>` : ''}
    </header>
    <div class="product__show">
      <div class="stage" data-scene="${p.id}" data-beats="#${p.id}-steps" role="img" aria-label="${attr(T.alt)}"></div>
      <ol class="beats" id="${p.id}-steps">
${T.beats.map((b) => `        <li>${b}</li>`).join('\n')}
      </ol>
    </div>
    <div class="product__grid">
      <p class="lead">${T.lead}</p>
      <div class="product__body">
        <div class="prose">
          <p>${T.body}</p>
        </div>
        <ul class="tags" aria-label="${C.ui.keywords}">
${T.tags.map((t) => `          <li>${t}</li>`).join('\n')}
        </ul>${links}
      </div>
    </div>
  </div>
</article>`;
}

function products(C) {
  const P = C.productsPage;
  return `
<main id="main">
  <header class="page-head">
    <div class="wrap sheet">
      <p class="label sheet__margin">${P.label}</p>
      <div class="sheet__main">
        <h1 class="page-head__title">${C.home.portfolioTitle}</h1>
        <p class="lead">${C.home.portfolio}</p>
        <nav class="jump" aria-label="${C.ui.jumpLabel}">
${PRODUCTS.map(
  (p) => `          <a href="#${p.id}">
            <span class="jump__name">${p.name}</span>
            <span class="status status--${p.status}">${C.products[p.id].short}</span>
          </a>`,
).join('\n')}
        </nav>
        <p class="soft">${P.note}</p>
      </div>
    </div>
  </header>

${PRODUCTS.map((p) => indent(product(C, p), 2)).join('\n\n')}

  <hr class="rule">

${indent(connect(C), 2)}
</main>`;
}

function about(C) {
  const A = C.about;
  const F = A.facts;
  return `
<main id="main">
  <header class="page-head">
    <div class="wrap sheet">
      <p class="label sheet__margin">${A.label}</p>
      <div class="sheet__main">
        <h1 class="page-head__title">${A.heading}</h1>
        <p class="lead">${A.lead}</p>
      </div>
    </div>
  </header>

  <section class="section section--tight" aria-labelledby="company-title">
    <div class="wrap sheet">
      <h2 class="label sheet__margin" id="company-title">${A.companyLabel}</h2>
      <div class="sheet__main">
        <div class="prose">
${A.company.map((t) => `          <p>${t}</p>`).join('\n')}
        </div>
        <a class="link" href="products.html">${A.portfolioLink} <span class="i i--right" aria-hidden="true"></span></a>
      </div>
    </div>
  </section>

  <section class="section band" data-zone>
    <div class="wrap pair">
      <div>
        <h2 class="label">${A.missionLabel}</h2>
        <p class="display" data-reveal>${C.home.mission}</p>
      </div>
      <div>
        <h2 class="label">${A.visionLabel}</h2>
        <p class="display" data-reveal style="--i:1">${A.vision}</p>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="build-title">
    <div class="wrap sheet">
      <h2 class="label sheet__margin" id="build-title">${A.buildLabel}</h2>
      <div class="sheet__main">
        <ul class="principles">
${A.principles
  .map(
    ([h, t], i) => `          <li data-reveal${i % 2 ? ' style="--i:1"' : ''}>
            <h3>${h}</h3>
            <p>${t}</p>
          </li>`,
  )
  .join('\n')}
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--tight" aria-labelledby="facts-title">
    <div class="wrap sheet">
      <h2 class="label sheet__margin" id="facts-title">${A.factsLabel}</h2>
      <div class="sheet__main">
        <dl class="facts">
          <div><dt class="mono">${F.company}</dt><dd>${C.brand}</dd></div>
          <div><dt class="mono">${F.hq}</dt><dd>${C.ui.place}</dd></div>
          <div><dt class="mono">${F.industry}</dt><dd>${F.industryValue}</dd></div>
          <div><dt class="mono">${F.focus}</dt><dd>${F.focusValue}</dd></div>
          <div><dt class="mono">${F.portfolio}</dt><dd>${PRODUCTS.map((p) => `<a class="link" href="products.html#${p.id}">${p.name}</a>`).join(C.lang === 'zh' ? '、' : ', ')}</dd></div>
          <div><dt class="mono">${F.contact}</dt><dd><a class="link" href="mailto:${EMAIL}">${EMAIL}</a></dd></div>
        </dl>
      </div>
    </div>
  </section>

${indent(connect(C), 2)}
</main>`;
}

function contact(C) {
  const K = C.contact;
  const subject = (s) => `mailto:${EMAIL}?subject=${encodeURIComponent(s)}`;
  return `
<main id="main">
  <header class="page-head">
    <div class="wrap sheet">
      <p class="label sheet__margin">${C.connect.label}</p>
      <div class="sheet__main">
        <h1 class="page-head__title">${C.connect.title}</h1>
        <p class="lead">${C.connect.lead}</p>
${indent(mail(C), 8)}
      </div>
    </div>
  </header>

  <section class="section section--tight" aria-labelledby="topics-title">
    <div class="wrap sheet">
      <h2 class="label sheet__margin" id="topics-title">${K.topicsLabel}</h2>
      <div class="sheet__main">
        <div class="topics">
${K.topics.map(([s, label]) => `          <a href="${subject(s)}">${label} <span class="i i--out" aria-hidden="true"></span></a>`).join('\n')}
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight" aria-labelledby="where-title">
    <div class="wrap sheet">
      <h2 class="label sheet__margin" id="where-title">${K.whereLabel}</h2>
      <div class="sheet__main">
        <dl class="facts">
          <div><dt class="mono">${K.facts.company}</dt><dd>${C.brand}</dd></div>
          <div><dt class="mono">${K.facts.location}</dt><dd>${C.ui.place}</dd></div>
          <div><dt class="mono">${K.facts.time}</dt><dd><span data-clock>${C.ui.clockFallback}</span></dd></div>
          <div><dt class="mono">${K.facts.web}</dt><dd><a class="link" href="${SITE}">mosiken.org</a></dd></div>
        </dl>
      </div>
    </div>
  </section>
</main>`;
}

function lost(C, p) {
  const L = C.lost;
  return `
<main id="main" class="lost" data-field-stage>
  <div class="wrap sheet">
    <p class="label sheet__margin">${L.label}</p>
    <div class="sheet__main">
      <h1 class="page-head__title">${L.heading}</h1>
      <p class="lead">${L.lead}</p>
      <div class="actions">
        <a class="btn" href="${p.links}index.html">${L.home} <span class="i i--right" aria-hidden="true"></span></a>
        <a class="btn btn--ghost" href="${p.links}products.html">${L.products}</a>
      </div>
    </div>
  </div>
</main>`;
}

/* ---------- Document ---------- */

function documentFor(C, p, main) {
  return `<!doctype html>
<!--
  ${C.commentTitle}

  ${C.comment.join('\n  ')}
-->
<html lang="${C.htmlLang}">
<head>
${indent(head(C, p), 2)}
</head>
<body>
  <canvas class="field" data-field aria-hidden="true"${p.gyre ? ` data-gyre="${GYRE}"` : ''}></canvas>

${indent(header(C, p), 2)}

${indent(main, 2)}

${indent(footer(C, p), 2)}
</body>
</html>
`;
}

const BUILD = { 'index.html': home, 'products.html': products, 'about.html': about, 'contact.html': contact };
const META = {
  'index.html': (C) => ({ title: C.home.title, description: C.home.description, jsonLd: true, gyre: true }),
  'products.html': (C) => ({ title: C.productsPage.title, description: C.productsPage.description }),
  'about.html': (C) => ({ title: C.about.title, description: C.about.description }),
  'contact.html': (C) => ({ title: C.contact.title, description: C.contact.description }),
};

const written = [];
const write = (rel, html) => {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  written.push(rel);
};

for (const C of [en, zh]) {
  const isZh = C.lang === 'zh';
  for (const file of PAGES) {
    const p = {
      file,
      assets: isZh ? '../' : '',
      links: '',
      alt: isZh ? `../${file}` : `zh/${file}`,
      ...META[file](C),
    };
    write(`${isZh ? 'zh/' : ''}${file}`, documentFor(C, p, BUILD[file](C)));
  }
  // GitHub Pages serves the root 404.html for every missing path; it sends
  // Chinese readers on to zh/404.html, so both use root-absolute links.
  const p = {
    file: '404.html',
    assets: '/',
    links: isZh ? '/zh/' : '/',
    alt: isZh ? '/404.html' : '/zh/404.html',
    noindex: true,
    gyre: true,
    title: C.lost.title,
    description: C.lost.description,
  };
  write(`${isZh ? 'zh/' : ''}404.html`, documentFor(C, p, lost(C, p)));
}

/* ---------- Sitemap, with each page's other language ---------- */

const today = new Date().toISOString().slice(0, 10);
const entries = ['en', 'zh']
  .flatMap((lang) =>
    PAGES.map(
      (file) => `  <url>
    <loc>${url(lang, file)}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${url('en', file)}"/>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${url('zh', file)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', file)}"/>
  </url>`,
    ),
  )
  .join('\n');
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`,
);

console.log(`wrote ${written.length} files to ${OUT}:\n  ${written.join('\n  ')}`);
