# Worktruth accessibility audit

- **Production preview:** `http://localhost:3001/`
- **Additional route:** `http://localhost:3001/companies`
- **Viewport:** 390 × 844
- **Engine:** axe-core 4.11.1
- **Result:** 0 violations on both audited routes

The homepage and company listing passed the axe accessibility scan after the final navigation and heading-order updates.

## Manual interaction checks

- Company search preserves `q`, filters only the fictional sample dataset, and shows a useful no-match state.
- Company detail routes load from directory cards.
- The mobile navigation disclosure starts closed, toggles open/closed, and exposes its four primary links and review CTA.
- The keyboard focus order reaches the “Skip to content” link first; its target is the page’s `main#main-content` landmark.
- The review form creates an in-memory preview and clearly states that it is not sent, saved, moderated, or published.
- Mobile widths from 320px to 390px show no horizontal overflow.

## Scope note

Automated coverage is limited to the homepage and company listing at one mobile viewport. The mobile layout was also checked manually at 320px, 360px, and 390px. This does not replace a full manual assistive-technology review of every route, browser, zoom level, and device.
