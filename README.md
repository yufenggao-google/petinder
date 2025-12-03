# Petinder

Petinder is a pet adoption application designed to help people find their perfect pet match.

## About

Petinder simplifies the pet adoption process by providing a user-friendly platform to browse and connect with pets in need of a home. Built with modern web technologies, it offers a seamless experience for potential adopters.

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

- [`apps/app/`](./apps/app) — The main Petinder React application
- [`apps/web/`](./apps/web) — Marketing website
- [`apps/api/`](./apps/api) — API server
- [`apps/email/`](./apps/email) — Email templates
- [`packages/core/`](./packages/core) — Shared types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components
- [`db/`](./db) — Database schemas and migrations
- [`infra/`](./infra) — Infrastructure configurations

## Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [VS Code](https://code.visualstudio.com/)
- [Cloudflare account](https://dash.cloudflare.com/sign-up)

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment

Update environment variables in [`.env`](./.env) and `.env.local` files.

### 3. Start Development

```bash
# Launch all apps
bun dev

# Or start specific apps
bun --filter @repo/web dev  # Marketing site
bun --filter @repo/app dev  # Main application
bun --filter @repo/api dev  # API server
```

### 4. Initialize Database

```bash
bun --filter @repo/db migrate
```

## Contributing

We welcome contributions! Please check the [Contributing Guide](.github/CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License.
