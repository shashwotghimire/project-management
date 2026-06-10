# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Structure

Monorepo with two sub-projects:

- `api/` — Express 5 backend (TypeScript, Sequelize, PostgreSQL)
- `web/` — Next.js 16 frontend (App Router, TanStack Query, shadcn/Tailwind 4)

## Commands

### API

```bash
cd api
npm run dev      # tsx watch src/server.ts (hot-reload)
npm run build    # tsc
npm start        # node dist/server.js
```

### Web

```bash
cd web
npm run dev      # next dev
npm run build    # next build
npm run lint     # eslint
```

## API Architecture

Request flow: `routes → validation middleware (Zod) → controller → service → repository → Sequelize model`

- **Routes** (`src/routes/`) — mount validation middleware and controllers
- **Controllers** (`src/controller/`) — thin; delegate to services, return `ApiResponse`
- **Services** (`src/services/`) — business logic
- **Repositories** (`src/repositories/`) — all DB queries via Sequelize; no raw SQL
- **Middlewares** (`src/middlewares/`) — `authMiddleware` (JWT Bearer), `validationMiddleware` (Zod), `errorHandler` (global)
- **Helpers** (`src/helpers/`) — `ApiError`, `ApiResponse`, `asyncHandler`, JWT, bcrypt wrappers

Error handling: controllers are wrapped with `asyncHandler`. Throwing `ApiError` returns the correct HTTP status. `ZodError` is caught by the global error handler and returned as 400.

### Auth Flow

1. Register → hash password, create user with `emailVerificationToken`, send verification email (Resend SMTP)
2. Login → verify password, check `emailVerified`, return JWT (7-day expiry) stored in `localStorage` on the client
3. Protected routes → `authMiddleware` verifies Bearer token, attaches decoded payload to `req.user`

### Database

PostgreSQL via Neon (cloud). Sequelize ORM with `underscored: true` on all models. Models are in `src/models/`; associations are defined in `src/models/associations.ts` and must be imported at startup.

The `User` model has a **default scope that excludes `password`**. Use `.scope('withPassword')` when you need it (e.g., in `findUserByEmail` for login).

## Web Architecture

- **App Router** with route groups: `(auth)` for login/register, `(dashboard)` for protected pages
- **HTTP client** (`src/lib/axios.ts`) — Axios instance with base URL from `NEXT_PUBLIC_API_URL`; request interceptor attaches `localStorage.access_token` as Bearer token
- **Data fetching** — TanStack Query (`useMutation` for auth actions, `useQuery` for reads). Mutations in `src/features/<domain>/hooks/`
- **Services** (`src/services/`) — typed wrappers around axios calls; consumed by hooks
- **Types** (`src/types/`) — API request/response interfaces

> **Note:** This project uses Next.js 16, which has breaking changes from earlier versions. Before writing any Next.js-specific code, check `node_modules/next/dist/docs/` for current API conventions.

## Environment Variables

**API** — requires `PORT`, `PGHOST`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`, `PGSSLMODE`, `JWT_SECRET`, `EMAIL_PASS`, `EMAIL_USER`, `FRONTEND_ORIGIN`

**Web** — requires `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:8080/api`)

## Rules & Conventions

**GIT Rules**: when asked to push changes to main, claude will do git add ., write suitable commit message & push to main. STRICTLY PROHIBITED: using <claude-code@anthropic.com> to co-author commits. ONLY co-author with <noreply@anthropic.com>
