---
title: Vilanova Agency
description: TFG — Static marketing agency website built with HTML5, CSS3, and vanilla JavaScript
type: academic
institution:
year: 2025-2026
stack: HTML5, CSS3, JavaScript
license: MIT
---

# Vilanova Agency

> TFG — Academic course project. Conceptual website for a digital marketing agency based in Vilanova i la Geltrú, Catalunya. Not a real business.

---

## What this project is

A static, multi-page website submitted as a Trabajo de Fin de Curso (TFG). It demonstrates front-end development skills without any build tools, frameworks, or server-side dependencies.

The agency concept and all business content are fictional. The project exists solely for academic evaluation.

---

## Tech stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| Markup     | HTML5 (semantic elements, ARIA roles)            |
| Styles     | CSS3 — custom properties, Material Design 3 tokens, responsive layout |
| Scripts    | Vanilla JavaScript ES6 (modules, DOM API)        |
| SEO        | Open Graph meta tags, schema.org JSON-LD         |
| No runtime | No Node.js, no bundler, no framework             |

---

## Pages

| File                       | Page                    |
| -------------------------- | ----------------------- |
| `index.html`               | Homepage                |
| `seo.html`                 | SEO service             |
| `sem.html`                 | SEM service             |
| `geo-aeo.html`             | GEO / AEO service       |
| `desarrollo-web.html`      | Web development service |
| `ia-empresas.html`         | AI for business service |
| `sobre-nosotros.html`      | About us                |
| `contacto.html`            | Contact                 |
| `politica-privacidad.html` | Privacy policy          |
| `politica-cookies.html`    | Cookie policy           |
| `aviso-legal.html`         | Legal notice            |

---

## Project structure

```
public_html/
├── index.html
├── seo.html
├── sem.html
├── geo-aeo.html
├── desarrollo-web.html
├── ia-empresas.html
├── sobre-nosotros.html
├── contacto.html
├── politica-privacidad.html
├── politica-cookies.html
├── aviso-legal.html
├── css/
│   └── style.css       # All styles — custom properties, MD3 tokens, responsive rules
├── js/
│   └── main.js         # Theme toggle, hamburger nav, dropdown, form validation
└── README.md
```

---

## How to run locally

No build step required. Open the project directly in a browser.

**Option A — open the file directly**

```
Open index.html in any modern browser.
```

**Option B — use a local server (recommended)**

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`.

---

## Features

- Dark / light theme toggle (persisted via `localStorage`)
- Responsive layout with hamburger navigation and hover dropdown
- Breadcrumb navigation on all inner pages
- Contact form with client-side validation
- CSS animations and scroll-triggered transitions
- ES / CA language switcher (static alternates)
- Structured data (JSON-LD) for all main pages

---

## Design decisions

### No map on the contact page

The business address is fictional. Embedding a map requires a real, verifiable location. Including a placeholder coordinate or a fabricated pin would be misleading. The contact page provides the address as plain text only.

### Single background image in the hero

The hero uses one background image. This is a deliberate choice: cycling through multiple stock images to simulate visual richness would misrepresent the agency's identity. A production deployment for a real business would replace this with authentic brand photography. For an academic project, a single image keeps the intent clear and the implementation honest.

---

## License

MIT — for academic use.
