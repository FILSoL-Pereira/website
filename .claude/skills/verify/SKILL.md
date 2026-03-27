---
name: verify
description: Run lint and build to validate changes before committing
---

Run the following commands in sequence to verify the project is in a good state:

1. `pnpm lint` — check for ESLint errors
2. `pnpm build` — ensure the production build succeeds

If either step fails, analyze the errors and fix them. Re-run verification after fixes.
