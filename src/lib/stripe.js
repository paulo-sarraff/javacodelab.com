import Stripe from 'stripe'

// Singleton do cliente Stripe para uso no servidor
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: false,
})

// IDs dos preços no Stripe (configurar no painel Stripe e adicionar ao .env)
export const STRIPE_PLANS = {
  monthly: {
    priceId: process.env.STRIPE_PRICE_MONTHLY,
    mode: 'subscription',
    label: 'Mensal',
    amount: 2900, // R$ 29,00 em centavos
  },
  annual: {
    priceId: process.env.STRIPE_PRICE_ANNUAL,
    mode: 'subscription',
    label: 'Anual',
    amount: 29000, // R$ 290,00 em centavos
  },
  lifetime: {
    priceId: process.env.STRIPE_PRICE_LIFETIME,
    mode: 'payment',
    label: 'Vitalício',
    amount: 99700, // R$ 997,00 em centavos
  },
}

// Formatar centavos para exibição em BRL
export function formatCurrency(amountInCents) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amountInCents / 100)
}
