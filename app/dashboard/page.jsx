import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

// Página autenticada + dados do banco — nunca deve ser pré-renderizada em build time
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ManageSubscriptionButton from '@/components/ManageSubscriptionButton'
import {
  Crown,
  BookOpen,
  ShoppingBag,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Package,
} from 'lucide-react'

export const metadata = {
  title: 'Dashboard | JavaCodeLab',
  description: 'Sua área de membro JavaCodeLab — assinatura, pedidos e conteúdo exclusivo.',
}

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatPrice(centavos) {
  return (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

const PLAN_LABELS = {
  monthly: 'Mensal',
  annual: 'Anual',
  lifetime: 'Vitalício',
  free: 'Gratuito',
}

const STATUS_CONFIG = {
  active: { label: 'Ativa', color: 'text-green-400', icon: CheckCircle, bg: 'bg-green-400/10' },
  past_due: { label: 'Pagamento pendente', color: 'text-yellow-400', icon: Clock, bg: 'bg-yellow-400/10' },
  canceled: { label: 'Cancelada', color: 'text-red-400', icon: XCircle, bg: 'bg-red-400/10' },
  inactive: { label: 'Inativa', color: 'text-[#E8E8E8]/40', icon: XCircle, bg: 'bg-white/5' },
}

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/entrar?redirect_url=/dashboard')
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      subscription: true,
      orders: {
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })

  if (!user) {
    redirect('/entrar')
  }

  const subscription = user.subscription
  const isPremium =
    subscription?.status === 'active' || subscription?.plan === 'lifetime'

  const statusCfg =
    STATUS_CONFIG[subscription?.status ?? 'inactive'] ?? STATUS_CONFIG.inactive

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />

      <main className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Saudação */}
          <div className="mb-10">
            <h1 className="text-3xl font-geist font-bold text-[#E8E8E8] mb-1">
              Olá, {user.name?.split(' ')[0] ?? 'Dev'} 👋
            </h1>
            <p className="text-[#E8E8E8]/50 font-roboto">{user.email}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-8">

              {/* Card de assinatura */}
              <div className="bg-[#1A1A1B] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-geist font-bold flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#FFD15A]" />
                    Assinatura Premium
                  </h2>

                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-roboto font-medium ${statusCfg.bg} ${statusCfg.color}`}>
                    <statusCfg.icon className="w-3.5 h-3.5" />
                    {statusCfg.label}
                  </div>
                </div>

                {isPremium ? (
                  <>
                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-xs text-[#E8E8E8]/40 font-roboto mb-1">Plano</p>
                        <p className="font-geist font-bold text-[#FFD15A]">
                          {PLAN_LABELS[subscription.plan] ?? subscription.plan}
                        </p>
                      </div>

                      {subscription.plan !== 'lifetime' && (
                        <div className="bg-white/5 rounded-xl p-4">
                          <p className="text-xs text-[#E8E8E8]/40 font-roboto mb-1">Próxima cobrança</p>
                          <p className="font-geist font-bold text-[#E8E8E8]">
                            {formatDate(subscription.currentPeriodEnd)}
                          </p>
                        </div>
                      )}

                      {subscription.plan === 'lifetime' && (
                        <div className="bg-white/5 rounded-xl p-4 sm:col-span-2">
                          <p className="text-xs text-[#E8E8E8]/40 font-roboto mb-1">Validade</p>
                          <p className="font-geist font-bold text-[#FFD15A]">Acesso Vitalício</p>
                        </div>
                      )}

                      {subscription.cancelAtPeriodEnd && (
                        <div className="bg-red-400/10 rounded-xl p-4">
                          <p className="text-xs text-red-400 font-roboto mb-1">Cancelamento</p>
                          <p className="font-geist font-bold text-red-400 text-sm">
                            Cancela em {formatDate(subscription.currentPeriodEnd)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <ManageSubscriptionButton />
                      <Link
                        href="/premium"
                        className="text-sm font-roboto text-[#E8E8E8]/50 hover:text-[#E8E8E8] transition-colors"
                      >
                        Ver benefícios do plano →
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-[#E8E8E8]/60 font-roboto text-sm mb-6">
                      Você ainda não tem uma assinatura ativa. Faça upgrade para acessar
                      mais de 100 horas de conteúdo exclusivo.
                    </p>
                    <Link
                      href="/premium"
                      className="inline-flex items-center gap-2 bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Crown className="w-4 h-4" />
                      Ver Planos Premium
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Pedidos da loja */}
              <div className="bg-[#1A1A1B] border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-geist font-bold flex items-center gap-2 mb-6">
                  <ShoppingBag className="w-5 h-5 text-[#02a9f7]" />
                  Meus Pedidos
                </h2>

                {user.orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-10 h-10 text-[#E8E8E8]/20 mx-auto mb-3" />
                    <p className="text-[#E8E8E8]/50 font-roboto text-sm mb-4">
                      Você ainda não fez nenhum pedido.
                    </p>
                    <Link
                      href="/loja"
                      className="inline-flex items-center gap-2 text-[#02a9f7] hover:text-[#02a9f7]/80 font-roboto text-sm font-medium transition-colors"
                    >
                      Explorar a loja
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-[#FFD15A]/20 to-[#02a9f7]/20 rounded-lg flex items-center justify-center shrink-0 text-lg">
                            {order.items[0]?.product?.imageEmoji ?? '📦'}
                          </div>
                          <div>
                            <p className="font-roboto font-medium text-[#E8E8E8] text-sm leading-snug">
                              {order.items.map((i) => i.product?.name).join(', ')}
                            </p>
                            <p className="text-xs text-[#E8E8E8]/40 font-roboto mt-0.5">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0 ml-4">
                          <p className="font-geist font-bold text-[#FFD15A] text-sm">
                            {formatPrice(order.total)}
                          </p>
                          <span className="text-xs text-green-400 font-roboto">
                            {order.status === 'completed' ? 'Concluído' : order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Acesso ao conteúdo */}
              <div className="bg-[#1A1A1B] border border-white/10 rounded-2xl p-6">
                <h3 className="font-geist font-bold text-[#E8E8E8] mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FFD15A]" />
                  Conteúdo
                </h3>

                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/artigos"
                      className="flex items-center justify-between text-sm font-roboto text-[#E8E8E8]/70 hover:text-[#E8E8E8] transition-colors group"
                    >
                      <span>Artigos públicos</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={isPremium ? '/premium/conteudo' : '/premium'}
                      className={`flex items-center justify-between text-sm font-roboto transition-colors group ${
                        isPremium
                          ? 'text-[#FFD15A] hover:text-[#FFD15A]/80'
                          : 'text-[#E8E8E8]/40 cursor-default pointer-events-none'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {!isPremium && <Crown className="w-3.5 h-3.5" />}
                        Conteúdo Premium
                      </span>
                      {isPremium && (
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/loja"
                      className="flex items-center justify-between text-sm font-roboto text-[#E8E8E8]/70 hover:text-[#E8E8E8] transition-colors group"
                    >
                      <span>Loja</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Datas / info */}
              {subscription && (
                <div className="bg-[#1A1A1B] border border-white/10 rounded-2xl p-6">
                  <h3 className="font-geist font-bold text-[#E8E8E8] mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#02a9f7]" />
                    Detalhes
                  </h3>

                  <dl className="space-y-3 text-sm font-roboto">
                    <div>
                      <dt className="text-[#E8E8E8]/40 text-xs mb-0.5">Início da assinatura</dt>
                      <dd className="text-[#E8E8E8]/80">{formatDate(subscription.currentPeriodStart)}</dd>
                    </div>
                    {subscription.plan !== 'lifetime' && subscription.currentPeriodEnd && (
                      <div>
                        <dt className="text-[#E8E8E8]/40 text-xs mb-0.5">Renova em</dt>
                        <dd className="text-[#E8E8E8]/80">{formatDate(subscription.currentPeriodEnd)}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* CTA upgrade se não premium */}
              {!isPremium && (
                <div className="bg-gradient-to-br from-[#FFD15A]/10 to-[#02a9f7]/10 border border-[#FFD15A]/20 rounded-2xl p-6 text-center">
                  <Crown className="w-8 h-8 text-[#FFD15A] mx-auto mb-3" />
                  <p className="text-sm font-roboto text-[#E8E8E8]/70 mb-4">
                    Desbloqueie todo o conteúdo com o plano Premium.
                  </p>
                  <Link
                    href="/premium"
                    className="inline-flex items-center gap-2 bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-4 py-2.5 rounded-xl text-sm transition-all duration-300 hover:scale-105"
                  >
                    Fazer Upgrade
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
