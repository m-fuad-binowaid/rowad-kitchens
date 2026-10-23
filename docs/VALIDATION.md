# Validation — 24 October 2026 (Asia/Singapore)

## Current-instance results

- Node 24.19.0 / npm 11.9.0; `npm ci` completed using the committed lockfile format and was repeated successfully to verify reproducibility.
- `npm run build` passed TypeScript checks and Vite client/SSR builds; 20 localized routes and an Arabic 404 page were pre-rendered. Both extension-style and directory-style route files are generated.
- The full browser suite completed: **17 passed, 0 failed, 0 skipped**. After the final metadata fix and added clipboard assertion, both affected integration tests passed again.
- All 20 Arabic/English routes were checked at 320, 375, 390, 430, 768, and 1440 pixels: **120 route/viewport combinations**, with one visible H1, correct language/direction, no horizontal overflow, no browser exceptions/hydration errors, and no missing eager images.
- Filters produced the expected 5 contemporary and 7 classic entries. Image navigation, Escape close, focus restoration, mobile menu focus containment, language switching, and independent routes passed.
- Contact validation, catalog-purpose selection, localized summary generation, clipboard copying, text-file download, and truthful delivery status passed. No POST request was made.
- Image expansion changed with scroll progress, process illustration advanced, and reduced-motion settings disabled expansion.
- Axe WCAG 2 A/AA and WCAG 2.1 AA automated audits passed on the Arabic/English homepages, gallery, English contact, process, and showroom pages. This is automated coverage, not a complete accessibility certification.
- Static HTML was checked for meaningful route content, one title and one description, and the absence of a fabricated canonical URL. Prototype indexing remains disabled.

## Visual review

Actual Chromium screenshots were reviewed, not just code. Desktop (1440px) and mobile (390px) review covered home, about, gallery, projects, both design-study layouts, process, showrooms, contact, and catalog. The English homepage was also reviewed visually. The responsive browser matrix covered the other specified widths in both languages.

Corrections made during review: secondary-page image height/ratio rules, direct-route static hosting fallback, keyboard focus containment, palette semantics, duplicate metadata, and text contrast. Full-page compositions, photo cropping, original-logo clarity, Arabic wrapping, form layout, and menu/gallery behavior were inspected. Mobile uses an unpinned process layout; desktop has a single sticky architectural illustration alongside the four process stages.

Representative final screenshots are in `docs/previews/`.

## Measured performance

Three fresh Chromium contexts, Arabic home, viewport 390×844, disabled cache, 9 Mbps download / 1 Mbps upload, 85 ms latency, and 4× CPU slowdown against the local production preview. These are reproducible lab measurements, not field results. Browser resource entries reported approximately 359 KB transferred in the observed initial-load session.

| Run | Largest Contentful Paint | Observed cumulative layout shift | Maximum sampled menu interaction |
| --- | ------------------------ | -------------------------------- | -------------------------------- |
| 1   | 1.340 s                  | 0.0000                           | 216 ms                           |
| 2   | 0.752 s                  | 0.0000                           | 184 ms                           |
| 3   | 0.996 s                  | 0.0000                           | 120 ms                           |

LCP and CLS met the stated targets in these lab runs. The first sampled menu interaction exceeded the 200 ms interaction target. These two-click observations **are not field INP**; INP and performance on real mobile devices/networks still require measurement after deployment. No claim of an achieved field INP score is made. Re-run with `node scripts/measure-performance.mjs` while the production preview is running; raw results are written to ignored `test-results/performance.json`.

The image archive was approximately 6.1 MB. Optimized served imagery, including responsive sources and the unchanged logo, totals about 480 KB. The application bundle is about 457 KB uncompressed / 147 KB gzip, and CSS about 44 KB / 9 KB gzip. Fonts are local and retain their license files in `public/licenses`.

## Limits and remaining integrations

The original business website and competitor sites could not be inspected because the network proxy returned 403. Domain additions were saved to the environment configuration draft but were not activated or published by the agent. See `CONTENT-SOURCES.md` for the outstanding factual checks. Showroom contacts/maps, real named projects and partnerships, a catalog PDF, and a delivery backend are intentionally absent until verified.

Current-instance installation, development startup, production startup, browser functionality, and the saved setup/start instructions were verified. The environment draft contains `install_script`, `start_skill`, and reference-domain additions. Draft persistence does not execute scripts or publish a snapshot. Review/save in environment settings and publish through the product when appropriate. No public website deployment or fresh-task snapshot restoration was tested.
