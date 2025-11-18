# Quipro Software Solutions Landing Page

This repository contains a single-page marketing site for **Quipro Software Solutions**. It is a static HTML/CSS/JS landing page, optimized for presenting services, explaining the requirements-gathering process, and showcasing example projects.

## Structure

- `index.html` – Main page markup, including:
  - Hero section
  - Services
  - “¿Cómo lo hacemos?”
  - **Levantamiento de requerimientos** (requirements explanation + accordion)
  - Portfolio grid (examples)
  - Contact form (Propuesta)
- `css/` – Modular styles split by section:
  - `index.css` – Global variables, layout, shared utilities, section heading styles, and imports of other CSS files.
  - `hero.css`, `services.css`, `how.css`, `portfolio.css`, `requirements.css`, `contact.css`, `header.css`, `footer.css`, etc.
- `js/main.js` – Client-side behavior:
  - Mobile navigation toggle
  - Dynamic year in the footer
  - Portfolio filters + dynamic grid populated from `assets/portfolio.json` (falls back to local data if JSON is unavailable)
  - Requirements accordion interactions
  - Scroll-in animations for major sections
- `assets/` – Images, videos, and optional `portfolio.json` data file.

## Development & Usage

This is a plain static site—no build tools required.

1. Open `index.html` directly in your browser, or serve the folder with any static server:
   - Example (with Python): `python -m http.server`
2. Ensure the `assets` folder remains at the same level as `index.html` so images and videos resolve correctly.
3. Optional: add/update `assets/portfolio.json` if you want to override the default portfolio data defined in `js/main.js`.

## Customization

- **Branding & Content**
  - Update hero copy, services, and text content directly in `index.html`.
  - Replace placeholder media in `assets/imagenes/`, e.g. `requirements.mp4`, portfolio images, etc.
- **Colors & Typography**
  - Global colors and transitions are defined in `css/index.css` under the `:root` variables.
  - Section titles and hero texts use the **Exo 2** font loaded via Google Fonts in `index.html`.
  - Body text currently uses the system font stack; switch to `Work Sans` in `body.page` if desired.
- **Requirements Accordion**
  - Content and structure live in the `#requirements` section of `index.html`.
  - Visual style and animation are controlled by `css/requirements.css`.
  - Expand/collapse behavior is implemented in `initRequirementsAccordion()` within `js/main.js`.

## Deployment

Because the site is static, it can be hosted on:

- Netlify
- Vercel
- GitHub Pages
- Any S3/static hosting provider

Just upload the root directory (including `index.html`, `css`, `js`, and `assets`).

