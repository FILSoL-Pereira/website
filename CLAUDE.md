# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

FLISoL Pereira website — event registration, QR ticketing, and admin check-in for Festival Latinoamericano de Instalación de Software Libre. Deployed on Vercel.

## Tech Stack

- Next.js 16 (App Router) with React 19 and TypeScript (strict mode)
- TailwindCSS v4 + DaisyUI for styling
- Prisma 7 ORM with PostgreSQL (Supabase) via `@prisma/adapter-pg`
- Path alias: `@/*` → `./src/*`

## Commands

- **Package manager: pnpm** — never use npm or yarn
- `pnpm dev` — start dev server with Turbopack
- `pnpm build` — production build
- `pnpm lint` — ESLint
- `pnpm db:generate` — regenerate Prisma client (run after schema changes)
- `pnpm db:migrate` — create a new migration
- `pnpm db:deploy` — apply pending migrations
- `pnpm db:status` — check migration status

## Environment Setup

Copy `env.local.example` to `.env.local` and fill in: `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_APP_ENV`, `NEXT_PUBLIC_SITE_URL`.

## Git Workflow

- Branch convention: `feature/*` → `develop` → `main`
- PRs target `develop` for integration, `main` for releases

## Code Style

- Tailwind v4 uses CSS-based config (no `tailwind.config.js`) — styles defined in `src/app/globals.css`
- DaisyUI components and theme classes are used throughout
- Prisma client is a singleton in `src/app/lib/prisma.js` — always import from there
- Generated Prisma code lives in `src/generated/prisma` (gitignored, regenerated via `pnpm db:generate`)
