import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

// Necessário: corpo raw para verificar assinatura do Stripe
export const dynamic = 'force-dynamic'

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error('[STRIPE_WEBHOOK] Assinatura inválida:', error.message)
    return Response.json({ error: 'Assinatura do webhook inválida' }, { status: 400 })
  }

  try {
    switch (event.type) {

      // ── Pagamento bem-sucedido (assinatura ou produto único) ───────────────
      case 'checkout.session.completed': {
        const session = event.data.object
        const { clerkUserId, dbUserId, plan, productId } = session.metadata ?? {}

        if (plan && dbUserId) {
          // Ativa/atualiza assinatura premium
          await prisma.subscription.upsert({
            where: { userId: dbUserId },
            create: {
              userId: dbUserId,
              stripeCustomerId: session.customer,
              stripeSubscriptionId: session.subscription ?? null,
              stripePriceId: session.line_items?.data[0]?.price?.id ?? null,
              plan,
              status: 'active',
            },
            update: {
              stripeCustomerId: session.customer,
              stripeSubscriptionId: session.subscription ?? null,
              plan,
              status: 'active',
            },
          })
        }

        if (productId && clerkUserId) {
          // Registra pedido da loja
          const user = await prisma.user.findUnique({ where: { clerkId: clerkUserId } })
          if (user) {
            const product = await prisma.product.findUnique({ where: { id: productId } })
            if (product) {
              await prisma.order.create({
                data: {
                  userId: user.id,
                  stripeSessionId: session.id,
                  stripePaymentId: session.payment_intent,
                  status: 'completed',
                  total: session.amount_total ?? product.price,
                  customerEmail: session.customer_details?.email ?? user.email,
                  customerName: session.customer_details?.name ?? user.name,
                  items: {
                    create: {
                      productId: product.id,
                      quantity: 1,
                      unitPrice: product.price,
                    },
                  },
                },
              })
            }
          }
        }
        break
      }

      // ── Assinatura atualizada (renovação, upgrade, downgrade) ──────────────
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const status = subscription.status === 'active' ? 'active' : subscription.status

        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status,
            stripePriceId: subscription.items.data[0]?.price?.id ?? null,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        })
        break
      }

      // ── Assinatura cancelada ou expirada ───────────────────────────────────
      case 'customer.subscription.deleted': {
        const subscription = event.data.object

        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: 'canceled',
            plan: 'free',
            cancelAtPeriodEnd: false,
          },
        })
        break
      }

      // ── Falha de pagamento ─────────────────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object
        const customerId = invoice.customer

        await prisma.subscription.updateMany({
          where: { stripeCustomerId: customerId },
          data: { status: 'past_due' },
        })
        break
      }

      default:
        // Evento não tratado — ignorar silenciosamente
        break
    }

    return Response.json({ received: true })
  } catch (error) {
    console.error(`[STRIPE_WEBHOOK] Erro ao processar ${event.type}:`, error)
    return Response.json({ error: 'Erro ao processar evento' }, { status: 500 })
  }
}
