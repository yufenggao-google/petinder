# Petinder

Building a modern platform for pet adoption.

This project is a monorepo containing the full stack for the Petinder application, including the marketing site, main application, API, and supporting packages.

## Technology Stack

**Core Runtime & Platform**

- [Bun](https://bun.sh/) — Lightning-fast JavaScript runtime and package manager
- [Cloudflare Workers](https://workers.cloudflare.com/) — Edge computing platform

### Frontend & UI

- [React 19](https://react.dev/) — Latest React with concurrent features
- [TanStack Router](https://tanstack.com/router) — Type-safe routing with data loading
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) — Beautiful, accessible components
- [Jotai](https://jotai.org/) — Atomic state management
- [Astro](https://astro.build/) — Static site generator for marketing pages

### Backend & API

- [Hono](https://hono.dev/) — Ultra-fast web framework for the edge
- [tRPC](https://trpc.io/) — End-to-end type safety for APIs
- [Better Auth](https://www.better-auth.com/) — Modern authentication solution

### Database & ORM

- [Drizzle ORM](https://orm.drizzle.team/) — TypeScript ORM with excellent DX
- [Neon PostgreSQL](https://neon.tech/) — Serverless PostgreSQL database

### Development Tools

- [Vite](https://vitejs.dev/) — Next-generation frontend tooling
- [Vitest](https://vitest.dev/) — Blazing fast unit testing
- [TypeScript](https://www.typescriptlang.org/) — Static type checking
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) — Code quality and formatting

## Monorepo Architecture

This project uses a monorepo structure:

- [`apps/app/`](./apps/app) — Main React 19 application
- [`apps/web/`](./apps/web) — Astro marketing website
- [`apps/api/`](./apps/api) — tRPC API server (Cloudflare Workers)
- [`apps/email/`](./apps/email) — React Email templates
- [`packages/core/`](./packages/core) — Shared TypeScript types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components
- [`packages/ws-protocol/`](./packages/ws-protocol) — WebSocket protocol
- [`db/`](./db) — Database schemas, migrations, and seed data
- [`docs/`](./docs) — Project documentation
- [`infra/`](./infra) — Infrastructure configurations
- [`scripts/`](./scripts) — Build automation

## Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [Cloudflare account](https://dash.cloudflare.com/sign-up) (for deployment)

## Quick Start

### 1. Clone the Project

```bash
git clone <repository-url>
cd petinder
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Configure Environment

Copy the example environment files and update them with your credentials:

- Copy `.env.example` to `.env` (if available) or create `.env`
- Create `.env.local` for local overrides
- Check `apps/api/wrangler.jsonc` for Cloudflare configuration

### 4. Start Development

```bash
# Launch all apps in development mode (web, api, and app)
bun dev

# Or, start specific apps individually
bun --filter @repo/web dev  # Marketing site
bun --filter @repo/app dev  # Main application
bun --filter @repo/api dev  # API server
```

### 5. Initialize Database

```bash
# Apply migrations to database
bun --filter @repo/db migrate

# Quick development setup (pushes schema directly)
bun --filter @repo/db push
```

**Note:** Ensure `DATABASE_URL` is configured in your `.env.local` file.

Open <http://localhost:5173> to see the main React app.
The marketing website runs on <http://localhost:4321>.

## Production Deployment

### 1. Environment Setup

Configure your production secrets in Cloudflare Workers using `wrangler secret put`.

### 2. Build and Deploy

```bash
# Build packages
bun email:build
bun web:build
bun app:build

# Deploy applications
bun web:deploy
bun api:deploy
bun app:deploy
```

---

This project was bootstrapped with [React Starter Kit](https://github.com/kriasoft/react-starter-kit).
