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

## Architecture

### Directory layout

- `src/app/components/` — page-level section components (banner, carousel, sponsors, registry form)
- `src/app/ui/` — reusable low-level widgets (button, card, modal, ticket, QR display)
- `src/app/lib/` — auth helpers (`auth.ts`), Prisma singleton (`prisma.js`), QR parsing (`qr.ts`)
- `src/app/data/` — static event data (conferences, workshops) as TypeScript modules
- `src/app/api/` — Route Handlers only; no server actions are used
- `src/app/2025/` — archived 2025 edition pages, kept for historical links

### Registration flow

1. `/register/[role]` — role must be one of `VALID_ROLES` (`community | speaker | organizer | staff`); invalid roles 404
2. Client generates a `ticketNumber` and calls `POST /api/registrations` with name, email, github, role, dataConsent
3. API upserts by email (upgrades role/consent if record already exists) and returns the registration UUID
4. QR value is `${NEXT_PUBLIC_SITE_URL}/admin/checkin?id=<uuid>` — always an absolute URL pointing at the check-in page

### Admin check-in flow

- `/admin/checkin` is a client component that first calls `GET /api/admin/session`; if unauthenticated it renders an inline login form
- Auth is custom HMAC-SHA256: `POST /api/admin/login` validates credentials and sets an `admin_session` httpOnly cookie (12-hour expiry)
- `src/app/lib/auth.ts` exports `hasValidAdminSession(request)` — every protected API route calls this
- QR scanner is loaded with `dynamic(..., { ssr: false })` via `@yudiel/react-qr-scanner`; `parseRegistrationIdFromQr` in `lib/qr.ts` handles URL, relative-path, and raw-UUID formats

### Client vs Server components

- All pages under `src/app/` are Server Components by default
- Add `"use client"` only for interactive forms, QR scanner, and animation-heavy components (framer-motion is client-only)
- Ticket download uses `html2canvas-pro` (client-only); QR generation uses `qrcode.react`

### No tests

There is no test framework configured. Validate changes with `pnpm lint` and `pnpm build`.
