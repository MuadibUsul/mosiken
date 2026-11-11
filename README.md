# mosiken.org

The company website for [Mosiken](https://mosiken.org), an independent software company based in Ohio, United States.

It is a static site: plain HTML, one stylesheet, three small JavaScript modules, no dependencies and no build step. Any static host can serve the repository root as-is.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: hero, introduction, product index, mission, contact |
| `products.html` | Veynod, ANCS, Serendipity and SheetOS, each with its current stage |
| `about.html` | Company profile, mission, vision, how we build, facts |
| `contact.html` | Email address and contact topics |
| `404.html` | Not-found page (uses root-absolute paths so it works at any depth) |

## Structure

```
assets/
  css/main.css     design tokens, layout, components, light and dark themes
  js/main.js       theme toggle, menu, clock, reveals, product preview, footer wordmark
  js/field.js      the WebGL contour field in the hero and on the 404 page
  js/plates.js     the four generated product diagrams
  fonts/           Archivo and Chivo Mono (variable, self-hosted) with their licenses
  img/             icons and the social preview image
favicon.svg, favicon.ico, site.webmanifest, robots.txt, sitemap.xml
```

The header and footer are repeated in each HTML file. When you change one, change all five.

## Preview locally

ES modules do not load from `file://`, so use any static server:

```bash
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173>.

## Editing

- **Copy** lives directly in the HTML files. Product status wording is deliberate: keep "available", "in development" and "research" accurate for each product.
- **Colors and type** are tokens at the top of `assets/css/main.css`. The two dark blocks redefine the same tokens; change both together.
- **Product diagrams** are generated in `assets/js/plates.js`. A product page element with `data-plate="<id>"` receives the matching diagram.
- **Social preview** is `assets/img/og.png` (1200 × 630). Replace it if the headline changes.
- **Sitemap**: update `lastmod` in `sitemap.xml` when a page changes, and add new pages there.

Motion respects `prefers-reduced-motion`, and every page reads and navigates with JavaScript turned off.

## Deploying

Serve the repository root at `https://mosiken.org/`. Links between pages are relative and keep their `.html` extension, so no rewrite rules are needed. Point the host's not-found handler at `404.html` (GitHub Pages does this automatically).

A minimal Caddy site block, as a starting point:

```
mosiken.org {
	root * /srv/mosiken
	encode zstd gzip
	file_server
	handle_errors {
		rewrite * /404.html
		file_server
	}
}
```

Asset file names are not fingerprinted, so avoid long-lived `immutable` caching for `/assets/`.

## Details worth keeping

A few things on the site are intentional and easy to mistake for leftovers: the coordinates beside the gyre in the hero, the paper boat, what happens when the water or the footer wordmark is clicked, the 404 headline, and the comment at the top of each HTML file. Please leave them in place.

## Fonts

[Archivo](https://github.com/Omnibus-Type/Archivo) and [Chivo Mono](https://github.com/Omnibus-Type/Chivo) by Omnibus-Type, both under the SIL Open Font License 1.1. License texts are in `assets/fonts/`.

## Copyright

© 2026 Mosiken. All rights reserved. The fonts and the simplex noise function in `assets/js/field.js` (Ian McEwan, Ashima Arts, and Stefan Gustavson; MIT License) remain under their own licenses.
