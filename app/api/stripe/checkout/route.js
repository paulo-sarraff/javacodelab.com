import { auth, currentUser } from '@clerk/nextjs/server'
import { stripe, STRIPE_PLANS } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://javacodelab.com'

export async function POST(request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return Response.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const { plan, productId } = await request.json()

    // ── FLUXO 1: Assinatura Premium ─────────────────────────────────────────
    if (plan) {
      const planConfig = STRIPE_PLANS[plan]

      if (!planConfig?.priceId) {
        return Response.json({ error: `Plano inválido: ${plan}` }, { status: 400 })
      }

      const clerkUser = await currentUser()

      // Busca ou cria o usuário no banco
      let user = await prisma.user.findUnique({ where: { clerkId: userId } })
      if (!user) {
        user = await prisma.user.create({
          data: {
            clerkId: userId,
            email: clerkUser.emailAddresses[0].emailAddress,
            name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() || null,
            imageUrl: clerkUser.imageUrl,
          },
        })
      }

      // Busca ou cria o cliente no Stripe
      let subscription = await prisma.subscription.findUnique({ where: { userId: user.id } })
      let stripeCustomerId = subscription?.stripeCustomerId

      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name ?? undefined,
          metadata: { clerkId: userId, userId: user.id },
        })
        stripeCustomerId = customer.id
      }

      // Cria a sessão de Checkout do Stripe
      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: planConfig.mode,
        payment_method_types: ['card'],
        line_items: [{ price: planConfig.priceId, quantity: 1 }],
        success_url: `${BASE_URL}/dashboard?success=true&plan=${plan}`,
        cancel_url: `${BASE_URL}/premium?canceled=true`,
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        locale: 'pt-BR',
        metadata: {
          clerkUserId: userId,
          dbUserId: user.id,
          plan,
        },
        ...(planConfig.mode === 'subscription' && {
          subscription_data: {
            metadata: { clerkUserId: userId, dbUserId: user.id, plan },
          },
        }),
      })

      return Response.json({ url: session.url })
    }

    // ── FLUXO 2: Compra de produto da loja ──────────────────────────────────
    if (productId) {
      const product = await prisma.product.findUnique({ where: { id: productId } })

      if (!product?.stripePriceId) {
        return Response.json({ error: 'Produto não encontrado ou sem preço configurado' }, { status: 404 })
      }

      const clerkUser = await currentUser()

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: clerkUser.emailAddresses[0].emailAddress,
        line_items: [{ price: product.stripePriceId, quantity: 1 }],
        success_url: `${BASE_URL}/dashboard?success=true&product=${productId}`,
        cancel_url: `${BASE_URL}/loja?canceled=true`,
        locale: 'pt-BR',
        metadata: { clerkUserId: userId, productId },
      })

      return Response.json({ url: session.url })
    }

    return Response.json({ error: 'Informe um plano ou produto' }, { status: 400 })
  } catch (error) {
    console.error('[STRIPE_CHECKOUT]', error)
    return Response.json({ error: 'Erro interno ao criar sessão de pagamento' }, { status: 500 })
  }
}
