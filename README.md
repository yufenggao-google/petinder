# Petinder

Petinder is an application for pet adoption, connecting future pet owners with animals in need of a home.

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

- [`apps/app/`](./apps/app) — Main React 19 application (Petinder App)
- [`apps/web/`](./apps/web) — Marketing website (Astro)
- [`apps/api/`](./apps/api) — tRPC API server (Hono)
- [`apps/email/`](./apps/email) — Email templates
- [`packages/core/`](./packages/core) — Shared types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components
- [`packages/ws-protocol/`](./packages/ws-protocol) — WebSocket protocol
- [`db/`](./db) — Database schemas and migrations
- [`docs/`](./docs) — Documentation
- [`infra/`](./infra) — Infrastructure configurations
- [`scripts/`](./scripts) — Build tools

## Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [VS Code](https://code.visualstudio.com/) with recommended extensions
- [Cloudflare account](https://dash.cloudflare.com/sign-up) (for deployment)

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment

Update environment variables in [`.env`](./.env). You can also create a `.env.local` file for local overrides.

### 3. Start Development

```bash
# Launch all apps in development mode
bun dev

# Or, start specific apps individually
bun --filter @repo/web dev  # Marketing site
bun --filter @repo/app dev  # Main application
bun --filter @repo/api dev  # API server
```

### 4. Initialize Database

```bash
# Apply migrations to database
bun --filter @repo/db migrate

# Quick development setup
bun --filter @repo/db push

# Seed with sample data
bun --filter @repo/db seed

# Open database GUI
bun --filter @repo/db studio
```

## Production Deployment

### 1. Environment Setup

Configure your production secrets in Cloudflare Workers:

```bash
# Required secrets
bun wrangler secret put BETTER_AUTH_SECRET

# OAuth providers (as needed)
bun wrangler secret put GOOGLE_CLIENT_ID
bun wrangler secret put GOOGLE_CLIENT_SECRET

# Email service
bun wrangler secret put RESEND_API_KEY

# AI features (optional)
bun wrangler secret put OPENAI_API_KEY
```

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
