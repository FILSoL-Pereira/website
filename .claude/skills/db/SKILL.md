---
name: db
description: Prisma database workflow — generate client, create/run migrations, check status
---

Use $ARGUMENTS to determine which database operation to run:

- **generate** — `pnpm db:generate` — Regenerate Prisma client after schema changes
- **migrate** — `pnpm db:migrate` — Create a new migration (will prompt for name)
- **deploy** — `pnpm db:deploy` — Apply pending migrations to the database
- **status** — `pnpm db:status` — Check which migrations have been applied

If no argument is provided, run `pnpm db:status` to show the current state.

After any schema change in `prisma/schema.prisma`, always run generate before building.
