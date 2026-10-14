# Worktruth accessibility audit

- **Page tested:** `http://localhost:3001/companies`
- **Environment:** 390 × 844 viewport, Chrome for Testing
- **Engine:** axe-core 4.11.1
- **Result:** 0 accessibility violations

The audited company-results page had no axe findings across the checked ARIA, keyboard, naming, color contrast, document language, form-label, landmark, heading, or skip-link rules. The audit included the production build with the responsive navigation and results heading updates.

## Additional manual interaction checks

- The mobile navigation disclosure starts closed, opens by keyboard/pointer, and exposes the four primary destinations.
- The “Skip to content” link receives focus and targets the page’s `main#main-content` landmark.
- The company search is labeled, preserves its `q` value, and provides a no-match state.
- Review preview fields have visible labels, native required validation, help text, and announced status feedback.
- Viewports from 320px through 390px showed no horizontal overflow.

## Scope note

This is an automated scan of the company listing in one mobile viewport plus focused interaction checks. It is not a substitute for a full manual assistive-technology or keyboard review across every route and zoom level.
