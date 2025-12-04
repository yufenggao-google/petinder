# Petinder

Petinder is a pet adoption platform that helps prospective pet owners find their perfect companion. Built with modern web technologies, it offers a seamless experience for browsing, filtering, and connecting with adoptable pets.

## Features

- **Performance by Default**: Powered by Bun runtime for exceptional speed.
- **Type Safety**: End-to-end type safety with TypeScript and tRPC.
- **Modern UI**: Built with React 19, TanStack Router, and Tailwind CSS v4.
- **Global Availability**: Deployed to the edge with Cloudflare Workers.
- **Robust Data Layer**: Uses Drizzle ORM and Neon PostgreSQL.

---

This project was bootstrapped with [React Starter Kit](https://github.com/kriasoft/react-starter-kit).

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

The project follows a monorepo structure:

- [`apps/app/`](./apps/app) — React 19 application (Petinder main app)
- [`apps/web/`](./apps/web) — Marketing website
- [`apps/api/`](./apps/api) — tRPC API server
- [`apps/email/`](./apps/email) — Transactional email templates
- [`packages/core/`](./packages/core) — Shared TypeScript types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components
- [`packages/ws-protocol/`](./packages/ws-protocol) — WebSocket protocol
- [`db/`](./db) — Database schemas and migrations
- [`docs/`](./docs) — Documentation site
- [`infra/`](./infra) — Infrastructure configurations
- [`scripts/`](./scripts) — Build tools

## Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [VS Code](https://code.visualstudio.com/)
- [Cloudflare account](https://dash.cloudflare.com/sign-up)

## Quick Start

### 1. Clone the Project

```bash
git clone <repository_url>
cd petinder
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Configure Environment

Update environment variables in [`.env`](./.env) and `.env.local` files.

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

# Seed with sample data (optional)
bun --filter @repo/db seed
```

**Note:** Ensure `DATABASE_URL` is configured in your `.env.local` file.

Open <http://localhost:5173> to see the Petinder app running. The marketing website runs on <http://localhost:4321>.

## Production Deployment

### 1. Environment Setup

Configure your production secrets in Cloudflare Workers:

```bash
bun wrangler secret put BETTER_AUTH_SECRET
bun wrangler secret put GOOGLE_CLIENT_ID
bun wrangler secret put GOOGLE_CLIENT_SECRET
bun wrangler secret put RESEND_API_KEY
```

### 2. Build and Deploy

```bash
bun email:build
bun web:build
bun app:build

bun web:deploy
bun api:deploy
bun app:deploy
```

## Contributing

See our [Contributing Guide](.github/CONTRIBUTING.md) to get started.

## License

Copyright © 2014-present Kriasoft. This source code is licensed under the MIT license found in the
[LICENSE](https://github.com/kriasoft/react-starter-kit/blob/main/LICENSE) file.
