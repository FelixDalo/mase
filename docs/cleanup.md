# Cleanup Candidates

These items are the remaining cleanup candidates after the current refactor and legacy pass.

## Removed in the current pass

- Unused packages from the earlier AI/template setup:
  - `react-router-dom`
  - `@google/genai`
  - `dotenv`
  - `express`
  - `@types/express`
- Stale Gemini-specific Vite env wiring.
- Unix-only `clean` script.
- Unused experimental component:
  - `src/components/ui/scroll-expansion-hero.tsx`
- Dead CSS selectors for removed variant routes:
  - `version2-*`
  - `v3-*`
  - `home-selector-*`
  - `back-to-home-*`
  - `scroll-expand-*`
  - related expanded `v3-*` proof/layout blocks

## Remaining code cleanup

- Move footer default content into `src/content/siteContent.ts` so all editable copy lives in one place.
- Split `src/index.css` into smaller section-level stylesheets when the next round of frontend work begins.

## Root folder cleanup candidates

- Generated and safe to remove locally:
  - `dist/`
  - `node_modules/`
  - `*.log`
- Likely reference or archive material, not needed for runtime:
  - `Copy/`
  - `Screnshoots/`
  - `copy-extracted.txt`
  - `implementation_plan.md.resolved`
  - `index-1.html`
  - `mase_design.md`
  - `mase_hero_instructions.md`
  - `mase_site_architecture.md`
  - `metadata.json`
- Likely duplicate asset storage to review:
  - root `Images/` versus `public/Images/`
