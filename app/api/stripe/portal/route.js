import { auth } from '@clerk/nextjs/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

// Impede análise estática durante next build — esta rota só existe em runtime
export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://javacodelab.com'

export async function POST() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { subscription: true },
    })

    if (!user?.subscription?.stripeCustomerId) {
      return Response.json(
        { error: 'Nenhuma assinatura encontrada para este usuário' },
        { status: 404 }
      )
    }

    // Cria sessão do Portal do Cliente Stripe
    // O portal permite: cancelar, atualizar cartão, ver histórico de faturas
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.subscription.stripeCustomerId,
      return_url: `${BASE_URL}/dashboard`,
    })

    return Response.json({ url: portalSession.url })
  } catch (error) {
    console.error('[STRIPE_PORTAL]', error)
    return Response.json({ error: 'Erro ao abrir portal de cobrança' }, { status: 500 })
  }
}
