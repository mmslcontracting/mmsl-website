# Repository Guidelines

## Project Structure & Module Organization

This repository contains the MMSL Contracting Corp website, built with Astro 5, React 19, TypeScript, and Tailwind CSS 4. Astro uses server output with the Vercel adapter.

- `src/pages/`: page routes, `robots.txt.ts`, and the contact endpoint at `api/contact.ts`.
- `src/components/`: Astro sections and interactive React components, such as `ContactForm.tsx` and `PortfolioGallery.tsx`.
- `src/layouts/Layout.astro`: shared page layout; `src/components/SEO.astro` handles metadata.
- `src/data/portfolio.ts`: portfolio content; `src/styles/global.css`: theme tokens and shared utilities.
- `public/`: static images, videos, and favicons; `src/assets/`: imported assets.
- `.agents/skills/`: contributor tooling, separate from application code. Treat `dist/`, `.astro/`, and `.vercel/` as generated output.

## Build, Test, and Development Commands

Run commands from the repository root using pnpm:

- `pnpm install`: install dependencies; preserve `pnpm-lock.yaml`.
- `pnpm dev`: start development at `localhost:4321`.
- `pnpm astro check`: run Astro and TypeScript diagnostics.
- `pnpm build`: generate the production build using the configured Vercel adapter.
- `pnpm preview`: invoke Astro's preview command; adapter support may limit server preview.
- `pnpm format`: format the repository with Prettier. For focused edits, use `pnpm exec prettier --write <file>`.

## Coding Style & Naming Conventions

Follow `.prettierrc`: two-space indentation, single quotes, no JavaScript semicolons, ES5 trailing commas, LF endings, and a 100-character print width. Prettier includes Astro and Tailwind plugins; no separate lint script is configured.

Use strict TypeScript, `@/` imports for `src/`, PascalCase component filenames, lowercase route filenames, and camelCase variables/functions. Reuse theme tokens and utilities from `global.css`.

## Testing Guidelines

No application test framework, test script, or coverage threshold is configured. Run `pnpm astro check` and `pnpm build` for code changes. Manually verify affected routes, mobile navigation, gallery interactions, and contact-form validation. Use controlled email testing when exercising submissions.

## Commit & Pull Request Guidelines

Recent commits predominantly use `feat:`, `fix:`, and `chore:` with concise Spanish descriptions. Follow this pattern and keep commits focused.

PRs should describe the change, link related issues when applicable, list verification performed, and include desktop/mobile screenshots for visible UI changes.

## Security & Configuration

Keep `RESEND_API_KEY` in local environment configuration and deployment secrets. Never commit credentials or expose them to client components. Preserve server-side validation, HTML escaping, and rate limiting in the contact endpoint.
