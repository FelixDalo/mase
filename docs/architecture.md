# Architecture

## Current shape

The site is structured as a single-page React application with a thin app shell and a page-level composition file.

- `src/App.tsx`
  App entry component. It should stay minimal.
- `src/pages/HomePage.tsx`
  Composes the production homepage from section modules.
- `src/sections/*`
  Each major homepage section lives in its own file.
- `src/components/*`
  Shared UI building blocks and reusable primitives.
- `src/content/siteContent.ts`
  Centralized page copy and repeatable data structures.

## Why it is structured this way

This follows current React guidance:

- Break the UI into a component hierarchy that matches the data model.
- Move components out of the root file once the root becomes hard to scan or reuse.
- Keep the page shell thin and let sections own their own markup.

For this site, that means:

- page composition belongs in `HomePage.tsx`
- service/industry/about/contact markup belongs in section files
- editable copy belongs in `siteContent.ts`
- generic helpers belong in shared components

## Editing rules

- If the change is editorial, check `src/content/siteContent.ts` first.
- If the change is section-specific structure, edit the relevant file under `src/sections/`.
- If the change affects multiple sections visually, edit `src/index.css`.
- If the change is footer-specific, edit `src/components/ui/footer-7.tsx`.

## Remaining technical debt

- `src/index.css` is still too large and should eventually be split by section.
- Footer defaults are still defined inside the footer component instead of the shared content module.
- Several package dependencies appear unused and should be validated before removal.
