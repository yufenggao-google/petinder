# Petinder

Petinder is an application for pet adoption, designed to make finding your new best friend easier and more engaging.

This project is built as a monorepo, leveraging modern web technologies for performance and developer experience.

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

This project uses a thoughtfully organized monorepo structure that promotes code reuse and maintainability:

- [`apps/app/`](./apps/app) — Main React 19 application (Petinder App)
- [`apps/web/`](./apps/web) — Astro marketing website
- [`apps/api/`](./apps/api) — tRPC API server powered by Hono framework
- [`apps/email/`](./apps/email) — React Email templates
- [`packages/core/`](./packages/core) — Shared TypeScript types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components
- [`packages/ws-protocol/`](./packages/ws-protocol) — WebSocket protocol template
- [`db/`](./db) — Database schemas, migrations, and seed data
- [`docs/`](./docs) — VitePress documentation site
- [`infra/`](./infra) — Terraform infrastructure configurations
- [`scripts/`](./scripts) — Build automation and development tools

## Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [VS Code](https://code.visualstudio.com/)
- [Cloudflare account](https://dash.cloudflare.com/sign-up) for deployment

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment

Update environment variables in [`.env`](./.env) and `.env.local` files.

### 3. Start Development

```bash
# Launch all apps in development mode (web, api, and app)
bun dev

# Or, start specific apps individually
bun --filter @repo/web dev  # Marketing site
bun --filter @repo/app dev  # Main application
bun --filter @repo/api dev  # API server
```

### 4. Initialize Database

Set up your database connection and schema:

```bash
# Apply migrations to database
bun --filter @repo/db migrate

# Quick development setup (pushes schema directly, skips migrations)
bun --filter @repo/db push

# Seed with sample data (optional)
bun --filter @repo/db seed

# Open database GUI for inspection
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
# Build packages that require compilation (order matters!)
bun email:build    # Build email templates first
bun web:build      # Build marketing site
bun app:build      # Build main React app

# Deploy all applications
bun web:deploy     # Deploy marketing site
bun api:deploy     # Deploy API server
bun app:deploy     # Deploy main React app
```

## License

This source code is licensed under the MIT license found in the [LICENSE](LICENSE) file.
