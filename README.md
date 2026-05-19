# Mase Consulting Group Website

This repository contains the current one-page marketing site for Mase Consulting Group, built with React, TypeScript, and Vite.

## Stack

- React 19
- TypeScript
- Vite
- Motion
- Lucide React

## Run locally

1. Install dependencies:
   `npm install`
2. Start the dev server:
   `npm run dev`
3. Build for production:
   `npm run build`
4. Run a type-check:
   `npm run lint`

## Project structure

- `src/App.tsx`
  Thin application shell. It renders the current page entry.
- `src/pages/HomePage.tsx`
  The page composition for the one-page site.
- `src/sections/`
  Major homepage sections such as About, Services, Industries, Approach, and Contact.
- `src/components/`
  Reusable UI components such as `Hero`, `Navigation`, footer, icons, and shared text/motion helpers.
- `src/content/siteContent.ts`
  Central source for homepage copy, service data, industry data, and section text.
- `src/index.css`
  Global and section styling. This is still monolithic and is the main remaining structural cleanup candidate.

## Content editing

For most routine client content changes, start in:

- `src/content/siteContent.ts`
- `src/components/ui/footer-7.tsx`

See `docs/content-map.md` for a more explicit field-by-field guide.

## Notes

- The site currently ships as a single-page experience.
- Earlier multi-variation route logic has been removed from the app shell.
- Vite uses `index.html` as the entry point at the project root.
