# ROWAD Kitchens

Arabic-first, bilingual React/TypeScript website prototype built from the supplied ROWAD logo and photographs. Includes ten independent page routes in Arabic and English, an accessible gallery, scroll-linked design storytelling, and an honest manual inquiry workflow.

## Run

Requires Node.js 22.12+ (validated with Node 24.19) and npm.

```sh
npm ci
npm run dev -- --port 3000
```

The development server listens on all interfaces for cloud/Google AI Studio-style preview environments. It uses standard Vite with no external backend or API keys.

```sh
npm run typecheck
npm run build
npm run preview -- --port 4173
npm run test:e2e
```

Browser tests use Chromium at `/usr/bin/chromium`. Override `CHROMIUM_PATH` if needed. Run the production build before tests. Playwright starts the preview server automatically if one is not running. Dependencies and fonts are self-hosted; no network is needed at runtime to render the site.

The workspace `.npmrc` directs npm's cache to `/workspace/.npm-cache` because the cloud home directory is not writable. On a different machine, change this setting to a writable cache location.

## Pages

`/`, `/about`, `/kitchens`, `/projects`, `/projects/quiet-contrast`, `/projects/classic-light`, `/process`, `/showrooms`, `/contact`, and `/catalog`.

English equivalents use `/en` (English home) and `/en/<path>`. Language changes preserve the page. The gallery offers style filters, keyboard-controlled image viewing, and contextual detail links. The process illustration is explicitly conceptual, not documentary photography.

## Content status

The original website and competitor references were blocked by the environment's network policy (proxy returned 403). No pages from those sites were inspected. `docs/CONTENT-SOURCES.md` records every source, asset limitation, and unresolved business detail. Do not publish this as the final official site until those details are verified.

`src/content/site.ts` contains bilingual content and business configuration. The `business` object intentionally has no fabricated phone numbers, email, locations, partnerships, or catalog URL. Showroom and catalog pages explain their verification status. Design-study titles describe photographs; they are not named client commissions.

The contact form validates required input and prepares a summary for copying or downloading. It makes no submission request, stores no personal data, and never claims a message has been delivered. It must be connected to a real sending service, or verified contact details must be supplied, before advertising direct inquiries as available.

## Production and SEO

`npm run build` produces pre-rendered HTML for 20 localized routes plus `404.html`. Both `route.html` and `route/index.html` are included for static hosts and Vite's extension resolution. Hydration checks the pre-rendered route before attaching React. All pages remain navigable as an SPA; initial HTML includes meaningful page content.

By default the prototype is `noindex,nofollow` and `robots.txt` disallows indexing. No canonical domain is invented. After content approval, set `VITE_SITE_URL` to the verified public HTTPS origin and rebuild. This enables route-specific canonical links, alternate language links, absolute Open Graph image URLs, a sitemap, and indexing. Do not reuse a preview hostname as the production origin. Serve known routes from their generated HTML; configure unknown routes to use `404.html` with HTTP 404, or SPA fallback when necessary. The included `_headers` is compatible with static hosts that support it.

## Structure

- `src/components`: branded controls, navigation, dialog accessibility, metadata.
- `src/pages`: independent route compositions.
- `src/content`: source-conscious bilingual content and curated asset metadata.
- `src/localization`: Arabic RTL / English LTR routing context.
- `src/motion`: reveal and scroll-linked architectural story.
- `src/styles`: centralized palette, typography, spacing and responsive rules.
- `scripts/prerender.mjs`: static HTML and conditional production metadata generation.
- `tests`: browser integration, responsiveness, hydration, accessibility and motion checks.

## Design and assets

Warm stone and charcoal with the supplied orange logo, IBM Plex Sans Arabic, DM Sans, and Cormorant Garamond. Fonts are distributed by Fontsource under their bundled open font licenses. The original logo file is copied byte-for-byte. The interface presents it on light surfaces, with CSS blending to integrate its white background; the lettering is never redrawn. Photography is converted to WebP, with 480/960/1920 sources for the two high-resolution assets. Small originals remain compact in the gallery; the viewer discloses their resolution.

Native scrolling is retained. Motion includes viewport reveals, photograph expansion, subtle hero parallax, and a process drawing that progresses with scroll. Reduced-motion preferences disable movement. Mobile uses a shorter, unpinned process composition.

See `docs/VALIDATION.md` for measured checks and known limits. Website deployment and environment publication are separate steps.
