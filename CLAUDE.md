# Engineering Standards — Lensora Frontend

Authoritative rules for anyone (human or agent) writing code in this repository. The goal is **clean, SOLID, senior production-level code with no flaws**. When a task description and these standards conflict, these standards win.

Shared cross-repo principles (SOLID, naming, comments, env hygiene) live in the workspace-root [`CLAUDE.md`](../CLAUDE.md); this file is authoritative for everything specific to this stack (structure, styling, component rules). Backend engineering standards live in `lensora-backend/CLAUDE.md`.

Requirements: [`business_requirement.md`](../business_requirement.md). Plan: [`tasks/`](../tasks/).

Stack: Vite, React 19, TypeScript, TanStack Router/Query/Form, Tailwind CSS v4, shadcn/ui on Base UI primitives.

Agents must follow these rules strictly. Do not improvise structure, styling, dependencies, or component patterns.

---

## Approval rules

Before making any code change, present the planned files to edit and wait for approval before editing:

```txt
Planned changes:
- src/features/patients/components/patient-card.tsx
- src/features/patients/api.ts
- src/components/custom/page-header.tsx

Waiting for approval before editing.
```

Do not commit changes unless the user explicitly approves the commit. Never discard user changes — do not run destructive Git commands (`git reset --hard`, `git clean -fd`, `git checkout -- .`, `git restore .`, `git restore --staged .`) without explicit approval.

---

## Core principles

1. **SOLID, always.** Single responsibility (split data access, business logic, and presentation), open/closed, Liskov, interface segregation, dependency inversion (depend on abstractions, inject them; never construct concrete dependencies inside business logic).
2. **No flaws.** Handle every error path, validate all input at the boundary, never swallow exceptions, no unhandled promise rejections, no race conditions, no `any` escape hatches. Guard against empty/null/out-of-range before use.
3. **Descriptive names.** Names state intent without a comment — `useLowStockCount`, `PatientCardProps`, never `data`, `tmp`, `handle`, `doIt`. Booleans read as predicates (`isInStock`, `hasExpiredToken`). Functions are verbs; classes/types are nouns.
4. **No comments unless necessary.** Code explains itself through names and structure. Comment only to explain _why_ for a non-obvious decision — never _what_ the code does. One concise line when warranted. No commented-out code, no docstring noise, no section-divider banners.
5. **Small units.** Prefer short functions and focused components. If a unit mixes fetching, formatting, business rules, and rendering, split it. Prefer composition over inheritance. Do not over-engineer — clean code does not mean creating twelve files for one button.
6. **Consistency over cleverness.** Match surrounding patterns. Don't introduce a second way to do something that already has a convention.

---

## Architecture

Feature-based architecture:

```txt
src/
├─ components/
│  ├─ ui/          # shadcn-generated components only
│  └─ custom/      # shared reusable custom components
├─ features/
│  └─ feature-name/
│     ├─ components/
│     ├─ hooks/
│     ├─ services/
│     ├─ types/
│     ├─ api.ts
│     └─ index.ts
├─ lib/            # generic utilities
├─ hooks/          # shared hooks
└─ constants/      # shared constants
```

- Use `src/components/custom/` for reusable custom components shared across the app; `src/features/<feature-name>/components/` for components specific to one feature.
- Use `src/features/<feature-name>/api.ts` for API logic related to that feature.
- Use `src/features/<feature-name>/index.ts` as a controlled barrel export for the feature's public API — export only what other parts of the app should use, not every internal helper.
- Do not place feature-specific code in global shared folders, and do not place custom business/app components inside `src/components/ui/`.

**Data flow:** components → hooks (TanStack Query) → `api.ts` (typed, envelope-unwrapped via the shared `api-client`). Components never call `fetch` directly and never touch the raw envelope.

**Forms:** TanStack Form via the shared `use-app-form` and ported field components + zod validation.

---

## shadcn/ui rules

This project uses **shadcn/ui with Base UI primitives** — never Radix-based shadcn components.

Before using a shadcn component:

1. Check if it already exists in `src/components/ui/`.
2. If it exists, use it.
3. If it does not exist, install it via the CLI: `npx shadcn@latest add <component>`.

Never hand-roll or recreate shadcn primitives manually. `src/components/ui/` is reserved for shadcn-generated primitives only.

---

## Naming rules

- **kebab-case** for files and folders (`patient-record-card.tsx`, `lens-selector/`), never `PatientRecordCard.tsx` or `themeToggle.tsx`.
- React component names still use **PascalCase** inside files.
- **Named exports** — avoid default exports for components unless required by the framework or existing pattern.

```tsx
type PatientCardProps = {
  name: string
}

export function PatientCard({ name }: PatientCardProps) {
  return <div>{name}</div>
}
```

## TypeScript rules

- Explicit props types for every component, declared above it and named `ComponentNameProps`.
- **`any` is banned** — use precise types.
- Use `type` imports when appropriate: `import { type Patient } from '@/features/patients/types'`.

## Import rules

- Prefer absolute imports with `@/` for project files: `import { cn } from '@/lib/utils'`.
- Avoid deep relative imports (`../../../lib/utils`) when they reduce readability. Relative imports are acceptable only for very local files in the same folder when clearer.

## React Fast Refresh rules

Component files export components only. Do not export constants, helpers, schemas, or utilities from component files — move them to `src/constants/`, `src/lib/`, `src/features/<feature-name>/types/`, `src/features/<feature-name>/services/`, or `api.ts`.

---

## Styling rules

`src/index.css` is the single source of truth for colors, radius, shadows, fonts, and design tokens (the Clinical Teal theme).

- **Theme tokens only** — no hardcoded colors/hex (`bg-teal-500` is wrong; `bg-background`, `text-card-foreground`, `<Button variant="default" />` are right). If a new token is genuinely needed, propose it first and wait for approval.
- **RTL:** this app is bilingual (English/Arabic) with full RTL. Use **logical** Tailwind utilities (`ps`/`pe`, `ms`/`me`, `start`/`end`) instead of hardcoded `left`/`right` so layout mirrors correctly.
- Mobile-responsive by default, using responsive Tailwind classes intentionally (`p-4 sm:p-6 lg:p-10`, `grid gap-4 md:grid-cols-2 xl:grid-cols-3`).
- Clean clinical-dashboard visual style: calm spacing, clear hierarchy, readable typography, soft contrast, meaningful accent usage. No noisy gradients or random decorative colors unless approved; no overcrowded layouts.

---

## UI composition rules

Prefer existing shadcn primitives first, then compose custom reusable components in `src/components/custom/`. Use feature-specific UI only when it belongs to one feature (`src/features/<feature-name>/components/`).

Do not create unnecessary abstractions or duplicate existing components — check `src/components/ui/`, `src/components/custom/`, and `src/features/<feature-name>/components/` before creating a new one.

---

## i18n

- No hardcoded user-facing strings. EN and AR at full parity; every screen verified in RTL.
- Bilingual entities render primary (active locale) + secondary.

---

## Shared rules

- **Env hygiene:** real `.env` files are never committed and never baked into Dockerfiles/compose. Every variable is documented in `.env.example`.
- **No dead code, no TODO litter, no unused deps.** Don't add a dependency without a clear justification that existing project tools can't cover — before installing, state the package name, why it's needed, why existing tools aren't enough, and where it will be used.
- **Errors are typed and surfaced**, never silently caught. Backend maps to error codes; frontend translates them via `src/lib/i18n/backend-error-keys.ts`.
- **Determinism in tests:** fixed seed, isolated DB, no reliance on wall-clock/network.

---

## Required checks

Before saying work is complete, run:

```bash
npm run precommit
```

This is the required quality gate (format + lint + typecheck/build). Do not claim a task is complete if this command fails. If it fails, report what failed, why, which files are involved, and the proposed fix.

## Project configuration is authoritative

Before changing implementation details, inspect the existing project configuration (`eslint.config.js`, `.prettierrc`, `components.json`, `src/index.css`, `vite.config.ts`, `tsconfig.app.json`, `package.json`). Do not rewrite or "improve" these files unless the task specifically requires it — follow the existing linting, formatting, import, and theme rules.

## Git rules

Do not commit without user approval. Do not amend, rebase, reset, clean, restore, or force-push without explicit approval. Before suggesting a Git command, check whether it can discard work; if it's destructive, clearly label it as destructive and wait for approval.

## Definition of done (per task)

- [ ] Behavior matches the referenced FR/NFR in `business_requirement.md`.
- [ ] Naming, architecture, and styling rules above are honored.
- [ ] `npm run precommit` passes.
- [ ] EN/AR + RTL verified for any UI; AI-dependent paths verified with the provider disabled.
- [ ] No hardcoded config, no stray comments, no `any`, no unhandled error paths.
- [ ] Summarize on completion: files changed, what changed, whether `npm run precommit` passed, any warnings or follow-up needed. Do not claim success if checks were not run; do not hide errors; do not make silent changes outside the approved plan.
