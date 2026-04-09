# JavaCodeLab — Checklist de Produção

Passos necessários para colocar cada fase em produção.
Execute na ordem abaixo ao fazer o primeiro deploy ou ao ativar uma nova fase.

---

## Fase 1 — Next.js + SEO

### Vercel
- [ ] Conectar repositório no [vercel.com](https://vercel.com)
- [ ] Definir **Framework Preset**: Next.js
- [ ] Build command: `pnpm build`
- [ ] Install command: `pnpm install`
- [ ] Variável de ambiente: `NEXT_PUBLIC_BASE_URL=https://javacodelab.com`

### DNS
- [ ] Apontar domínio `javacodelab.com` para Vercel (registros A/CNAME)
- [ ] Aguardar propagação e verificar certificado HTTPS

### Indexação
- [ ] Submeter `https://javacodelab.com/sitemap.xml` no Google Search Console
- [ ] Verificar domínio no Search Console (método HTML tag ou DNS)
- [ ] Testar Rich Results: https://search.google.com/test/rich-results

---

## Fase 2 — Monetização (Clerk + Stripe + Neon)

### 1. Clerk (Autenticação)
- [ ] Criar conta em [clerk.com](https://clerk.com) e criar novo Application
- [ ] Configurar OAuth social (Google, GitHub) nas Social Connections
- [ ] Definir URLs no painel Clerk:
  - Sign-in URL: `/entrar`
  - Sign-up URL: `/cadastro`
  - After sign-in: `/dashboard`
  - After sign-up: `/dashboard`
- [ ] Copiar **Publishable Key** e **Secret Key** para as variáveis de ambiente

### 2. Neon PostgreSQL (Banco de Dados)
- [ ] Criar projeto em [neon.tech](https://neon.tech)
- [ ] Copiar **Connection Pooler URL** → `DATABASE_URL`
- [ ] Copiar **Direct Connection URL** → `DIRECT_URL`
- [ ] Rodar `pnpm db:push` (ou `pnpm db:migrate`) para criar as tabelas
- [ ] Verificar tabelas em `pnpm db:studio`

### 3. Stripe (Pagamentos)
- [ ] Criar conta em [stripe.com](https://stripe.com)
- [ ] **Modo Test** primeiro — testar todo o fluxo de pagamento
- [ ] Criar Produtos e Preços no painel:
  | Produto | Tipo | Valor sugerido |
  |---------|------|----------------|
  | Premium Mensal | Recorrente (mensal) | R$ 29/mês |
  | Premium Anual | Recorrente (anual) | R$ 290/ano |
  | Premium Vitalício | Pagamento único | R$ 997 |
- [ ] Copiar `price_...` de cada plano para `STRIPE_PRICE_MONTHLY`, `STRIPE_PRICE_ANNUAL`, `STRIPE_PRICE_LIFETIME`
- [ ] Criar Webhook em `Developers > Webhooks`:
  - URL: `https://javacodelab.com/api/webhooks/stripe`
  - Eventos a assinar:
    - `checkout.session.completed`
    - `customer.subscription.updated`
    - `customer.subscription.deleted`
    - `invoice.payment_failed`
  - Copiar **Signing secret** → `STRIPE_WEBHOOK_SECRET`
- [ ] Testar webhook com `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- [ ] Ativar modo **Live** e repetir criação de produtos/webhook

### 4. Variáveis de Ambiente (Vercel)
Adicionar no painel Vercel → Project Settings → Environment Variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/entrar
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/cadastro
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_MONTHLY
STRIPE_PRICE_ANNUAL
STRIPE_PRICE_LIFETIME

DATABASE_URL
DIRECT_URL
```

### 5. Seed do banco (produtos)
Após configurar Stripe, adicionar o `stripePriceId` a cada produto no banco.
Os produtos do catálogo estão em `src/data/products.js` — após criar os preços no Stripe,
atualizar o campo `stripePriceId` em cada produto e rodar o seed:
```bash
pnpm db:studio   # ou criar script prisma/seed.js
```

---

## Fase 3 — Analytics (GA4 + PostHog)

### 1. Google Analytics 4
- [ ] Criar conta/propriedade em [analytics.google.com](https://analytics.google.com)
- [ ] Copiar **Measurement ID** (formato `G-XXXXXXXXXX`) → `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] Verificar eventos no GA4 DebugView após deploy

### 2. PostHog
- [ ] Criar conta em [posthog.com](https://posthog.com) (plano free até 1M eventos/mês)
- [ ] Criar novo Project
- [ ] Copiar **Project API Key** → `NEXT_PUBLIC_POSTHOG_KEY`
- [ ] Host padrão: `https://us.i.posthog.com` → `NEXT_PUBLIC_POSTHOG_HOST`
- [ ] (Opcional) Self-host para LGPD: configurar instância própria

### 3. Variáveis adicionais (Vercel)
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### 4. Verificação
- [ ] Abrir site em produção e confirmar eventos no GA4 DebugView
- [ ] Confirmar eventos no PostHog Live Events
- [ ] Confirmar Web Vitals chegando no GA4 (evento `CLS`, `LCP`, `FID`, etc.)

---

## Checklist Geral de Produção

- [ ] `.env.local` **nunca** commitado (está no `.gitignore`)
- [ ] `prisma/schema.prisma` commitado (sem dados sensíveis)
- [ ] Testar fluxo completo: cadastro → premium → checkout → webhook → dashboard
- [ ] Configurar alertas de erro no Vercel (Email Notifications)
- [ ] Configurar rate limiting no Stripe (já incluso no plano)
- [ ] Revisar CORS e headers de segurança no `next.config.js`
- [ ] Ativar Vercel Analytics para Core Web Vitals em produção
