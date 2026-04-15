# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database (Prisma)
pnpm db:generate  # Regenerate Prisma client after schema changes
pnpm db:push      # Push schema changes to DB (dev, skips migrations)
pnpm db:migrate   # Run migrations (creates migration files)
pnpm db:studio    # Open Prisma Studio GUI
```

There are no automated tests in this project.

## Architecture

Full-stack SaaS platform for Java education built with **Next.js 15 App Router** (JavaScript/JSX — no TypeScript). All content is in **Brazilian Portuguese**.

**Core integrations:**
- **Clerk** — authentication (sign up/in, webhooks to sync users to DB)
- **Stripe** — subscriptions (monthly/annual/lifetime) + one-time shop orders
- **Neon** — serverless PostgreSQL via Prisma ORM (pooled + direct connection)
- **Nodemailer** — contact form email delivery

**Path alias:** `@/*` maps to `./src/*`

### Route Protection

`middleware.js` uses Clerk to protect `/dashboard/*` and `/api/stripe/*`. Public pages are freely accessible.

### Key Directories

- `app/` — Next.js App Router pages and API routes
- `app/api/` — API endpoints: `stripe/`, `webhooks/stripe/`, `contact/`, `newsletter/`, `og/`
- `src/components/` — Page-level components + `ui/` (shadcn/ui with Radix UI)
- `src/data/` — Static data: `articles.js` (article catalog), `products.js` (product catalog)
- `src/lib/` — Singletons and utilities: `prisma.js`, `stripe.js` (lazy proxy), `rate-limit.js`, `utils.js`
- `prisma/schema.prisma` — DB models: User, Subscription, Product, Order, OrderItem

### Data Flow

- **Auth**: Clerk handles auth UI (`/cadastro`, `/entrar`); a Clerk webhook at `app/api/webhooks/clerk/` syncs users to Neon via Prisma
- **Payments**: CheckoutButton → `/api/stripe/checkout` → Stripe session → webhook at `app/api/webhooks/stripe/` updates DB
- **Content**: Articles and products are statically defined in `src/data/`; no CMS

### UI Conventions

- **Dark theme** by default: background `#1A1A1B`, accent yellow `#FFD15A`, accent blue `#02a9f7`
- Components follow **shadcn/ui New York** style with Lucide icons
- Toasts via **Sonner**; forms via **React Hook Form + Zod**
