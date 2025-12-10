# Petinder

Petinder is a pet adoption application designed to help people find their perfect pet match.

Built on top of the modern and performant [React Starter Kit](https://github.com/kriasoft/react-starter-kit), this project leverages a full-stack architecture optimized for speed, scalability, and developer experience.

## Features

- **Pet Adoption**: Browse and search for pets available for adoption.
- **Performance by Default**: Bun runtime delivers exceptional speed across development and production.
- **Type Safety Throughout**: TypeScript and tRPC create an unbreakable contract between frontend and backend.
- **Modern React Stack**: React 19 with TanStack Router and Tailwind CSS v4.
- **Edge-Native Deployment**: Cloudflare Workers ensure the app runs close to users worldwide.
- **Database Ready**: Drizzle ORM with Neon PostgreSQL provides a robust data layer.

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

- [`apps/app/`](./apps/app) — Main Petinder application (React 19, TanStack Router)
- [`apps/web/`](./apps/web) — Marketing website (Astro)
- [`apps/api/`](./apps/api) — Backend API (Hono, tRPC, Cloudflare Workers)
- [`apps/email/`](./apps/email) — Transactional emails (React Email)
- [`packages/core/`](./packages/core) — Shared TypeScript types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components
- [`packages/ws-protocol/`](./packages/ws-protocol) — WebSocket protocol
- [`db/`](./db) — Database schemas, migrations, and seeds
- [`docs/`](./docs) — Project documentation (VitePress)
- [`infra/`](./infra) — Terraform infrastructure configurations
- [`scripts/`](./scripts) — Build automation and development tools

## Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [VS Code](https://code.visualstudio.com/) with [recommended extensions](.vscode/extensions.json)
- [Cloudflare account](https://dash.cloudflare.com/sign-up) for deployment

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-username/petinder.git
cd petinder
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Configure Environment

Update environment variables in [`.env`](./.env) and `.env.local` files. You will need to configure `DATABASE_URL` and other secrets.

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

# Seed with sample data (optional)
bun --filter @repo/db seed
```

## Production Deployment

### 1. Environment Setup

Configure your production secrets in Cloudflare Workers using `wrangler secret put`.

```bash
bun wrangler secret put BETTER_AUTH_SECRET
# Add other secrets as needed (GOOGLE_CLIENT_ID, etc.)
```

### 2. Build and Deploy

```bash
# Build packages
bun email:build
bun web:build
bun app:build

# Deploy
bun web:deploy
bun api:deploy
bun app:deploy
```

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
