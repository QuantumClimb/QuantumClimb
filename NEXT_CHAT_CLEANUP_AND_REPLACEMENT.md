# Next Chat Handoff: Cleanup and Media Replacement

## Current Baseline
- Project: Vite + React + TypeScript marketing site.
- Status: `npm run lint` and `npm run build` passing.
- App architecture was split from a monolithic `App.tsx` into smaller section/component files.
- Frontend-only dependency cleanup completed (server-side packages removed).

## What Was Already Completed
- Removed server-side dependencies from `package.json`.
- Added React type dependencies for stable TS checks.
- Refactored large page markup into modular files under:
  - `src/components/`
  - `src/sections/`
- Added workspace settings in `.vscode/settings.json` to reduce false HTML diagnostics in TSX.
- Replaced one Tailwind class warning (`max-w-[1200px]` -> `max-w-300`).

## Main Objective For Next Chat
Focus on content cleanup and replacing placeholder media with final assets.

## Cleanup Targets
1. Review text content for consistency:
   - product claims
   - CTA wording
   - typography consistency
   - punctuation and capitalization
2. Verify reusable section props and remove duplicates.
3. Keep app behavior unchanged while tightening structure where needed.

## Media Replacement Targets
Replace placeholder image URLs (currently many `picsum.photos` references) with local assets from `public/` or approved URLs.

### Local assets currently present
- `public/Content Creators.png`
- `public/E-Commerce.png`
- `public/E-Learning.png`
- `public/Enterprise.png`
- `public/Marketing Agencies.png`
- `public/Media & Entertainment.png`

## Suggested Execution Order
1. Map every placeholder image usage by section/file.
2. Replace hero/use-case/blog/demo image sources with approved assets.
3. Re-run:
   - `npm run lint`
   - `npm run build`
4. Do a final visual pass in browser for desktop and mobile.

## Acceptance Checklist
- No TypeScript errors.
- Build succeeds.
- No placeholder stock image URLs remain unless intentionally kept.
- All replaced media paths resolve correctly.
- Layout remains visually stable across major sections.
