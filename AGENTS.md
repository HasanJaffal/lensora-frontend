# AGENTS.md

## Purpose

This file defines the rules for AI coding agents working in this repository.

This project uses:

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui with Base UI primitives
- Feature-based architecture
- Project-defined theme tokens in `src/index.css`

Agents must follow these rules strictly. Do not improvise structure, styling, dependencies, or component patterns.

---

## Approval Rules

Before making any code change, always present the planned files to edit.

Example:

```txt
Planned changes:
- src/features/patients/components/patient-card.tsx
- src/features/patients/api.ts
- src/components/custom/page-header.tsx

Waiting for approval before editing.
```

Do not edit files until the user approves.

Do not commit changes unless the user explicitly approves the commit.

Do not run destructive Git commands unless the user explicitly approves them.

Forbidden without approval:

```bash
git reset --hard
git clean -fd
git checkout -- .
git restore .
git restore --staged .
```

Never discard user changes.

---

## Required Checks

Before saying the work is complete, run:

```bash
npm run precommit
```

This project uses `precommit` as the required quality gate.

Do not claim a task is complete if this command fails.

If the command fails, report:

- What failed
- Why it failed
- Which files are involved
- The proposed fix

---

## Project Configuration Is Authoritative

Before changing implementation details, inspect the existing project configuration.

Important files:

```txt
eslint.config.js
.prettierrc
components.json
src/index.css
vite.config.ts
tsconfig.app.json
package.json
```

Do not rewrite or “improve” these files unless the task specifically requires it.

Follow the existing linting, formatting, import, and theme rules.

---

## shadcn/ui Rules

This project uses **shadcn/ui with Base UI primitives**.

Do not use Radix-based shadcn components unless the user explicitly approves it.

Do not manually create or hardcode shadcn UI primitives.

Before using a shadcn component:

1. Check if it already exists in:

```txt
src/components/ui/
```

2. If it exists, use it.
3. If it does not exist, install it using the shadcn CLI:

```bash
npx shadcn@latest add <component>
```

Do not recreate shadcn components by hand.

The `src/components/ui/` directory is reserved for shadcn-generated primitives only.

Do not place custom business or app components inside `src/components/ui/`.

---

## Component Placement Rules

Use this structure:

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
├─ lib/
├─ hooks/
└─ constants/
```

Use `src/components/custom/` for reusable custom components shared across the app.

Use `src/features/<feature-name>/components/` for components specific to one feature.

Use `src/features/<feature-name>/api.ts` for API logic related to that feature.

Use `src/features/<feature-name>/index.ts` as a controlled barrel export for the feature public API.

Do not export every internal helper from the barrel file. Export only what other parts of the app should use.

---

## Naming Rules

Use kebab-case for files and folders.

Correct:

```txt
patient-record-card.tsx
theme-toggle.tsx
nav-sidebar.tsx
lens-selector/
```

Incorrect:

```txt
PatientRecordCard.tsx
themeToggle.tsx
NavSidebar.tsx
LensSelector/
```

React component names must still use PascalCase inside files.

Example:

```tsx
type PatientCardProps = {
  name: string
}

export function PatientCard({ name }: PatientCardProps) {
  return <div>{name}</div>
}
```

---

## TypeScript Rules

Use explicit props types for every component.

The props type must be declared above the component and named:

```txt
ComponentNameProps
```

Example:

```tsx
type PatientCardProps = {
  name: string
  age: number
}

export function PatientCard({ name, age }: PatientCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{age}</p>
    </article>
  )
}
```

Prefer named exports.

Correct:

```tsx
export function PatientCard() {
  return <div />
}
```

Avoid default exports for components unless required by the framework or existing project pattern.

Avoid `any`.

Use precise types.

Use type imports when appropriate.

Example:

```ts
import { type Patient } from '@/features/patients/types'
```

---

## Import Rules

Prefer absolute imports with `@/` for project files.

Correct:

```ts
import { cn } from '@/lib/utils'
import { PatientCard } from '@/features/patients'
```

Avoid deep relative imports when they reduce readability.

Incorrect:

```ts
import { cn } from '../../../lib/utils'
```

Relative imports are acceptable only for very local files in the same folder when they are clearer.

---

## React Fast Refresh Rules

Component files should only export React components.

Do not export constants, helpers, schemas, or utilities from component files.

Correct:

```tsx
const localOnlyValue = 'value'

export function PatientCard() {
  return <div>{localOnlyValue}</div>
}
```

Incorrect:

```tsx
export const PATIENT_CARD_SIZE = 'lg'

export function PatientCard() {
  return <div />
}
```

Move shared constants and helpers to separate files:

```txt
src/constants/
src/lib/
src/features/<feature-name>/types/
src/features/<feature-name>/services/
src/features/<feature-name>/api.ts
```

---

## Styling Rules

The project theme is defined in:

```txt
src/index.css
```

Treat `src/index.css` as the single source of truth for colors, radius, shadows, fonts, and design tokens.

Do not hardcode random colors.

Avoid:

```tsx
<div className="bg-teal-500 text-amber-400" />
```

Avoid custom hex values unless the user explicitly approves them.

Use semantic theme tokens:

```tsx
<div className="bg-background text-foreground" />
<div className="bg-card text-card-foreground" />
<Button variant="default" />
```

If a new token or CSS variable is genuinely needed, propose it first and wait for approval.

Example:

```txt
Proposed new token:
--status-warning

Reason:
Needed for persistent warning states across feature cards and alerts.

Waiting for approval before editing src/index.css.
```

Styling must always be mobile-responsive.

Use responsive Tailwind classes intentionally:

```tsx
<section className="p-4 sm:p-6 lg:p-10" />
<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" />
```

This app is bilingual (English/Arabic) with full RTL. Use logical Tailwind utilities
(`ps`/`pe`, `ms`/`me`, `start`/`end`) instead of hardcoded `left`/`right` so the layout mirrors
correctly in Arabic.

Follow a clean clinical-dashboard visual style:

- calm spacing
- clear hierarchy
- readable typography
- soft contrast
- meaningful accent usage
- no noisy gradients unless approved
- no random decorative colors
- no overcrowded layouts

Use the existing Clinical Teal theme from `src/index.css`.

---

## UI Composition Rules

Prefer existing shadcn primitives first.

Then compose custom reusable components in:

```txt
src/components/custom/
```

Use feature-specific UI only when it belongs to one feature:

```txt
src/features/<feature-name>/components/
```

Do not create unnecessary abstractions.

Do not create a custom component if a simple shadcn primitive composition is enough.

Do not duplicate existing components.

Before creating a new component, check:

```txt
src/components/ui/
src/components/custom/
src/features/<feature-name>/components/
```

---

## Architecture Rules

Follow feature-based architecture.

Keep feature logic inside its feature folder when it belongs to one feature.

Use shared folders only for truly shared code.

Feature folders may contain:

```txt
components/
hooks/
services/
types/
api.ts
index.ts
```

Use:

```txt
src/lib/
```

for generic utilities.

Use:

```txt
src/hooks/
```

for shared hooks.

Use:

```txt
src/constants/
```

for shared constants.

Do not place feature-specific code in global shared folders.

---

## SOLID and Clean Code Rules

Follow SOLID principles where they make sense.

Prefer small, focused components and functions.

Avoid large components that mix:

- data fetching
- formatting
- layout
- business logic
- state management
- rendering

Split responsibilities clearly.

Prefer composition over inheritance.

Keep APIs and services separate from UI components.

Do not over-engineer. Clean code does not mean creating twelve files for one button. Humanity has suffered enough.

---

## Dependency Rules

Do not install new packages unless necessary.

Before adding a dependency, explain:

- the package name
- why it is needed
- why existing project tools are not enough
- where it will be used

Wait for approval before installing it.

Prefer existing dependencies and built-in platform APIs.

---

## Git Rules

Do not commit without user approval.

Do not amend, rebase, reset, clean, restore, or force-push without explicit approval.

Before suggesting Git commands, check whether they can discard work.

If a command is destructive, clearly label it as destructive and wait for approval.

Safe commands usually include:

```bash
git status
git diff
git add .
git commit -m "message"
```

Only use commit commands after approval.

---

## Final Response Rules for Agents

When finishing work, summarize:

- files changed
- what was changed
- whether `npm run precommit` passed
- any warnings or follow-up needed

Do not claim success if checks were not run.

Do not hide errors.

Do not make silent changes outside the approved plan.
