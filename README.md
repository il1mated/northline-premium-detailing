# Apex Detailing — premium detailing website concept

A premium, responsive single-page website for **Apex Detailing**, a _fictional_ luxury automotive detailing
business. Built by **NORTHLINE** as a portfolio concept with React, TypeScript, Vite and Tailwind CSS.

> Apex Detailing is not a real company. Contact details, prices and imagery are placeholders, and the site
> contains no testimonials or business claims that would need verifying.

## Tech stack

| Tool                                          | Why                                                         |
| --------------------------------------------- | ----------------------------------------------------------- |
| React 19 + TypeScript                         | Typed, reusable components                                  |
| Vite                                          | Fast dev server and optimized production build              |
| Tailwind CSS v4                               | Design tokens and utility styling, with no runtime cost     |
| lucide-react                                  | Tree-shaken SVG icons (only the icons used are bundled)     |
| @fontsource (Inter, Cormorant Garamond)       | Self-hosted fonts, so the page makes no third-party font requests |
| oxlint                                        | Fast linting                                                |

## Getting started

Requires **Node.js 20.19+ or 22.12+** (check with `node -v`).

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the dev server at http://localhost:5173
```

Other scripts:

```bash
npm run lint       # lint the code
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Project structure

```
public/                  favicon.svg, robots.txt (copied as-is)
src/
  data/                  ALL editable content: business info, services, packages, gallery, images
  lib/quote.ts           Quote form validation + submission (demo mode or real endpoint)
  components/
    ui/                  Reusable building blocks: Button, Container, FormField, PhotoImage, Reveal…
    layout/              Header (with mobile menu) and Footer
    sections/            One component per page section (Hero, Services, Gallery, …)
  App.tsx                Assembles the page
  index.css              Tailwind import + design tokens (colors, fonts, animations)
index.html               SEO metadata (title, description, Open Graph)
```

## Customizing for a real client

1. **Business details:** edit `src/data/site.ts` (phone, email, service area, hours).
2. **Services and packages:** edit `src/data/services.ts` and `src/data/packages.ts`. Then remove the
   "Illustrative demo pricing" notice and the `demo` label in `src/components/sections/Packages.tsx`.
3. **Photography:** the images are representative stock photos loaded from the Unsplash CDN
   (`src/data/images.ts`). Replace them with the client's own photos, either by changing the Unsplash ids
   or by putting files in `public/images/` and pointing `photoUrl` at them. Update the gallery `alt` text and
   captions in `src/data/gallery.ts`, then remove the "Stock image" labels.
   If any image fails to load, `PhotoImage` shows a designed dark backdrop instead of a broken-image icon.
4. **Reviews:** `Testimonials.tsx` is a clearly labeled placeholder. Replace it only with real, verifiable
   reviews (for example, an embedded Google reviews widget).
5. **SEO:** in `index.html`, add `og:url`, `og:image` and `<link rel="canonical">` using the real domain.
6. **Footer:** remove the "fictional business" line once the site belongs to a real client.

## The quote form

The form validates in the browser: required fields, email format, length limits and accessible error
messages. What happens on submit depends on whether an endpoint is configured:

- **Demo mode (default):** with no endpoint configured, the form says plainly that _nothing was sent_
  and shows what would have been submitted. Nothing leaves the browser.
- **Live mode:** set `VITE_QUOTE_ENDPOINT` to a URL that accepts a JSON `POST`
  (`name, email, vehicle, service, notes`), e.g. a [Formspree](https://formspree.io) form endpoint or your
  own API. The form shows "Request sent" only if the server responds with a success status, and shows
  an error otherwise.

```bash
cp .env.example .env.local
# then edit .env.local:
VITE_QUOTE_ENDPOINT=https://formspree.io/f/your-form-id
```

`VITE_` variables are baked in at **build time**, so set them in your hosting provider's environment
settings and rebuild.

## Deployment

`npm run build` outputs a fully static site to `dist/`. Any static host works.

**Vercel:** import the GitHub repo at vercel.com/new. Vite is auto-detected
(build command `npm run build`, output directory `dist`). Add `VITE_QUOTE_ENDPOINT` under
Settings → Environment Variables if you need it.

**Netlify:** "Add new site" → "Import an existing project" → pick the repo. Set the build command
to `npm run build` and the publish directory to `dist`.

**Cloudflare Pages:** connect the repo, choose the "Vite" framework preset (or build `npm run build`,
output `dist`).

**Manual:** run `npm run build` and upload the contents of `dist/` to any static web server.

## Quality notes

- Semantic landmarks (`header`, `nav`, `main`, `section`s with `aria-labelledby`, `footer`), skip link and a
  single `h1`.
- Text colors meet WCAG AA contrast on every background they are used on; visible focus styles throughout.
- Keyboard-accessible mobile menu (Escape closes it, and focus returns to the toggle).
- Animations respect `prefers-reduced-motion`.
- Responsive images (`srcset`/`sizes`), lazy loading below the fold, and a high-priority hero image.
