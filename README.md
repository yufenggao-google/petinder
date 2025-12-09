# Petinder

A modern pet adoption application built with React, Cloudflare Workers, and Drizzle ORM.

## Features

- **Pet Adoption**: Browse and adopt pets looking for a home.
- **Modern Stack**: Built with React 19, Hono, and Cloudflare Workers.
- **Edge-Native**: Deployed on Cloudflare Workers for global performance.
- **Type Safety**: End-to-end type safety with TypeScript and tRPC.

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

This project is a monorepo organized as follows:

- [`apps/app/`](./apps/app) — The main Petinder application (React 19, TanStack Router, Jotai)
- [`apps/web/`](./apps/web) — Marketing website (Astro)
- [`apps/api/`](./apps/api) — Backend API (Hono, tRPC, Cloudflare Workers)
- [`apps/email/`](./apps/email) — Transactional email templates (React Email)
- [`packages/core/`](./packages/core) — Shared TypeScript types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components
- [`packages/ws-protocol/`](./packages/ws-protocol) — WebSocket protocol
- [`db/`](./db) — Database schemas and migrations
- [`docs/`](./docs) — Project documentation
- [`infra/`](./infra) — Infrastructure configurations

## Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [VS Code](https://code.visualstudio.com/) with recommended extensions
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

Copy the `.env` file to `.env.local` and update the environment variables.

```bash
cp .env .env.local
```

You will also need to configure `wrangler.jsonc` in `apps/api/wrangler.jsonc` if deploying.

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

# Or push schema directly for development
bun --filter @repo/db push

# Seed with sample data
bun --filter @repo/db seed
```

## Production Deployment

### 1. Environment Setup

Configure your production secrets in Cloudflare Workers using `wrangler secret put`.

### 2. Build and Deploy

```bash
# Build
bun email:build
bun web:build
bun app:build

# Deploy
bun web:deploy
bun api:deploy
bun app:deploy
```

---

This project was bootstrapped with [React Starter Kit](https://github.com/kriasoft/react-starter-kit).
