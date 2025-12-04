# Petinder

An application for pet adoption.

## About

Petinder connects potential adopters with pets in need of a home. Built on a modern tech stack, it ensures a fast, responsive, and reliable experience for users and shelters alike.

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

This project uses a thoughtfully organized monorepo structure:

- [`apps/app/`](./apps/app) — The main Petinder React application
- [`apps/web/`](./apps/web) — Marketing website (Astro)
- [`apps/api/`](./apps/api) — tRPC API server
- [`apps/email/`](./apps/email) — Transactional email templates
- [`packages/core/`](./packages/core) — Shared types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components
- [`db/`](./db) — Database schema and migrations
- [`infra/`](./infra) — Infrastructure as Code (Terraform)

## Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [VS Code](https://code.visualstudio.com/)
- [Cloudflare account](https://dash.cloudflare.com/sign-up) (for deployment)

## Quick Start

### 1. Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/petinder.git
cd petinder
bun install
```

### 2. Configure Environment

Update environment variables in `.env` and `.env.local`.

### 3. Start Development

```bash
# Launch all apps (web, api, and app)
bun dev
```

### 4. Database Setup

```bash
# Push schema to database
bun --filter @repo/db push

# Seed data
bun --filter @repo/db seed
```

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License.

---

This project was bootstrapped with [React Starter Kit](https://github.com/kriasoft/react-starter-kit).
