# Lensora — Frontend

React 19 + Vite + TypeScript frontend for the Lensora optometrist practice management platform.

## Stack

- React 19 + Vite + TypeScript
- TanStack Router (file-based) / Query / Form
- shadcn/ui on Base UI primitives, lucide-react
- Tailwind CSS v4 with theme tokens in `src/index.css` (Clinical Teal)
- EN/AR i18n with full RTL

Engineering standards and conventions are authoritative in [`CLAUDE.md`](CLAUDE.md).

## Getting started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run precommit  # format + lint + typecheck/build (the required quality gate)
```

## Environment variables

Copy `.env.example` to `.env` and fill in the values:

| Variable            | Description                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | Base URL of the Lensora API, including the version prefix, no trailing slash (e.g. `http://localhost:8000/api/v1`). |
| `VITE_APP_NAME`     | Display name of the application shown in the UI.                                                                    |

Real `.env` files are never committed; every variable used must be documented in `.env.example`.

## Auth flow

- On login, the API returns a JWT which is stored under the `lensora-token` key in `localStorage` (see [`src/lib/auth-token.ts`](src/lib/auth-token.ts)).
- The shared API client ([`src/lib/api-client.ts`](src/lib/api-client.ts)) attaches the token as an `Authorization: Bearer <token>` header on every request, and unwraps the backend's `{success, data, error, meta}` response envelope.
- Route guards live in [`src/routes/_app.tsx`](src/routes/_app.tsx) (redirects to `/login` when no token is present) and [`src/routes/login.tsx`](src/routes/login.tsx). Authenticated routes are nested under the `_app` layout route.
- The signed-in user's organization context is resolved server-side from the token and surfaced via `/auth/me`; the client does not perform any tenant-scoping logic itself.

## Related docs

- Business requirements: [`../business_requirement.md`](../business_requirement.md)
- Implementation plan: [`../tasks/`](../tasks/)
- Backend engineering standards: [`../lensora-backend/CLAUDE.md`](../lensora-backend/CLAUDE.md)
