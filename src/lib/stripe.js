import Stripe from 'stripe'

// Instância lazy: só cria o cliente Stripe quando realmente for usado.
// Evita erro no build quando STRIPE_SECRET_KEY ainda não está configurada.
let _stripe = null

function getStripeInstance() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error(
        'STRIPE_SECRET_KEY não configurada. Adicione a variável ao arquivo .env.local para usar pagamentos.'
      )
    }
    _stripe = new Stripe(key, {
      apiVersion: '2025-02-24.acacia',
      typescript: false,
    })
  }
  return _stripe
}

// Proxy transparente: qualquer acesso a `stripe.xxx` redireciona para a
// instância real do Stripe (criada somente na primeira chamada).
export const stripe = new Proxy(
  {},
  {
    get(_, prop) {
      const instance = getStripeInstance()
      const value = instance[prop]
      return typeof value === 'function' ? value.bind(instance) : value
    },
  }
)

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
