import Stripe from 'stripe'

// Inicialização lazy — evita erros durante `next build` quando
// as variáveis de ambiente ainda não estão disponíveis.
// O cliente só é criado na primeira chamada em runtime.
let _stripe = null

export function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error(
        'STRIPE_SECRET_KEY não definido. Adicione a variável de ambiente antes de usar o Stripe.'
      )
    }
    _stripe = new Stripe(key, {
      apiVersion: '2025-02-24.acacia',
      typescript: false,
    })
  }
  return _stripe
}

// Alias de conveniência — mantém compatibilidade com imports existentes
// sem quebrar nada. Usar getStripe() em novos arquivos.
export const stripe = new Proxy(
  {},
  {
    get(_target, prop) {
      return getStripe()[prop]
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
