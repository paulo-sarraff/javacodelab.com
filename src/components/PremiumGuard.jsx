import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Crown, Lock } from 'lucide-react'

/**
 * Server Component que protege conteúdo premium.
 * Renderiza o conteúdo apenas se o usuário tiver assinatura ativa.
 * Caso contrário, exibe um CTA de upgrade.
 *
 * Uso:
 *   <PremiumGuard>
 *     <ConteudoExclusivo />
 *   </PremiumGuard>
 */
export default async function PremiumGuard({ children, fallback }) {
  // Se o Clerk não estiver configurado (ex.: build sem env vars),
  // trata como não autenticado e exibe o fallback sem lançar erro.
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return fallback ?? <DefaultFallback reason="unauthenticated" />
  }

  const { userId } = await auth()

  // Não autenticado
  if (!userId) {
    return fallback ?? <DefaultFallback reason="unauthenticated" />
  }

  // Verifica assinatura ativa no banco
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { subscription: true },
  })

  const isPremium =
    user?.subscription?.status === 'active' ||
    user?.subscription?.plan === 'lifetime'

  if (!isPremium) {
    return fallback ?? <DefaultFallback reason="no_subscription" />
  }

  return children
}

function DefaultFallback({ reason }) {
  const isAuth = reason === 'no_subscription'

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-[#FFD15A]/20 to-[#02a9f7]/20 rounded-2xl flex items-center justify-center mb-6">
        {isAuth ? (
          <Crown className="w-8 h-8 text-[#FFD15A]" />
        ) : (
          <Lock className="w-8 h-8 text-[#02a9f7]" />
        )}
      </div>

      <h2 className="text-2xl font-geist font-bold text-[#E8E8E8] mb-3">
        {isAuth ? 'Conteúdo Exclusivo Premium' : 'Acesso Necessário'}
      </h2>

      <p className="text-[#E8E8E8]/60 font-roboto max-w-md mb-8">
        {isAuth
          ? 'Este conteúdo é exclusivo para membros premium. Faça upgrade para acessar mais de 100 horas de conteúdo, projetos práticos e muito mais.'
          : 'Crie sua conta gratuitamente para acessar o conteúdo premium do JavaCodeLab.'}
      </p>

      <div className="flex gap-4">
        {isAuth ? (
          <Link
            href="/premium"
            className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Ver Planos Premium
          </Link>
        ) : (
          <>
            <Link
              href="/cadastro"
              className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Criar Conta Grátis
            </Link>
            <Link
              href="/entrar"
              className="border border-[#E8E8E8]/20 text-[#E8E8E8] hover:bg-[#E8E8E8]/5 font-roboto font-medium px-6 py-3 rounded-xl transition-all duration-300"
            >
              Já tenho conta
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
