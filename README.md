# Petinder

Petinder is a pet adoption application designed to help people find their perfect pet match.

<a href="https://github.com/kriasoft/react-starter-kit?sponsor=1"><img src="https://img.shields.io/badge/-GitHub-%23555.svg?logo=github-sponsors" height="20"></a>
<a href="https://discord.gg/2nKEnKq"><img src="https://img.shields.io/discord/643523529131950086?label=Chat" height="20"></a>

## About

Petinder simplifies the pet adoption process by matching potential adopters with pets based on compatibility. Built with modern web technologies, it offers a fast, responsive, and user-friendly experience.

## Features

- **Pet Matching**: Browse and match with pets available for adoption.
- **User Profiles**: Create profiles for adopters and shelters.
- **Real-time Updates**: Get instant notifications and updates.

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
- [`apps/web/`](./apps/web) — Marketing website (Astro)
- [`apps/api/`](./apps/api) — API server (Hono, tRPC)
- [`apps/email/`](./apps/email) — Email templates
- [`packages/`](./packages) — Shared packages (UI, core, etc.)
- [`db/`](./db) — Database schema and migrations

## Prerequisites

- [Bun](https://bun.sh/) v1.2+
- [VS Code](https://code.visualstudio.com/) (recommended)
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

Update environment variables in [`.env`](./.env) and `.env.local` files as well as Wrangler configuration in [`wrangler.jsonc`](./apps/api/wrangler.jsonc).

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

**Note:** Ensure `DATABASE_URL` is configured in your `.env.local` file before running these commands.

Open <http://localhost:5173> to see your React app running. The marketing website runs on <http://localhost:4321>. The backend API will be available at the port shown by `wrangler dev` (typically 8787).

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

**Note:** The `RESEND_EMAIL_FROM` is configured in `wrangler.jsonc` as it's not sensitive.

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

## Credits

This project was bootstrapped with [React Starter Kit](https://github.com/kriasoft/react-starter-kit).
Be sure to join the [Discord channel](https://discord.gg/2nKEnKq) for assistance with the starter kit.

## License

Copyright © 2014-present Kriasoft. This source code is licensed under the MIT license found in the
[LICENSE](https://github.com/kriasoft/react-starter-kit/blob/main/LICENSE) file.
