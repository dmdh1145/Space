# DmDh's Space

Personal portfolio site for DmDh — a dark, grid-based single-page site with an
optional project detail page per project.

## Stack

- Static HTML, CSS, and vanilla JavaScript — no build step or dependencies.
- Self-hosted variable fonts: Space Grotesk and JetBrains Mono.
- Custom canvas-free cursor, scroll-reveal animations, and a noise/grid backdrop.

## Structure

```
index.html            Home (hero, projects, tech stack, websites, contact)
dmdh-tools.html       Project detail: DmDh Tools
aira.html             Project detail: Aira
404.html              Custom not-found page
assets/css/styles.css
assets/js/script.js
assets/fonts/         Self-hosted woff2 fonts
assets/img/           Optimized WebP screenshots, favicons, social image
site.webmanifest      PWA metadata
robots.txt            Crawler rules
sitemap.xml           Sitemap for the three public pages
_headers              Cloudflare security and caching headers
wrangler.jsonc        Cloudflare Workers static assets config
.assetsignore         Files excluded from deployment
config.json           Theme and site metadata
```

## Local preview

Any static server works, for example:

```
python -m http.server 8000
```

Then open <http://localhost:8000/>.

## Deploy

The site is deployed as static assets on Cloudflare. `wrangler.jsonc` points at
the repository root, and `.assetsignore` keeps development-only files (README,
config, Wrangler config) out of the upload. `_headers` applies security and
caching headers at the edge, and `404.html` is used for unknown paths.

## Customization

- **Colors, typography, spacing:** CSS custom properties at the top of
  `assets/css/styles.css`.
- **Content:** edit the sections in `index.html`; project pages live in their
  own HTML files.
- **Social image:** replace `assets/img/og-image.jpg` (1200×630).
- **Icons:** regenerate `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`,
  `icon-192.png`, and `icon-512.png`.
- **Theme metadata:** update `config.json` and `site.webmanifest`.

## Notes

- Fonts are self-hosted, so the site makes no third-party requests at runtime.
- Scroll animations are gated behind a `js` class on `<html>`; without
  JavaScript the content is still fully visible.
- The custom cursor is only enabled for fine pointers and is hidden when a touch
  input is detected. Users with `prefers-reduced-motion` skip the fade and
  stagger animations.
