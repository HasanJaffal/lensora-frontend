# Lensora — Frontend

React 19 + Vite + TypeScript frontend for the Lensora optometrist practice management platform.

## Stack

- React 19 + Vite + TypeScript
- TanStack Router (file-based) / Query / Form
- shadcn/ui on Base UI primitives, lucide-react
- Tailwind CSS v4 with theme tokens in `src/index.css` (Clinical Teal)
- EN/AR i18n with full RTL

Conventions are authoritative in [`AGENTS.md`](AGENTS.md).

## Getting started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run precommit  # format + lint + typecheck/build (the quality gate)
```

The API base URL and other settings come from `.env` (see `.env.example`, added in the environment
task). See the workspace `tasks/` directory for the ordered implementation plan.
