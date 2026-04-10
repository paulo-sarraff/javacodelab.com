'use client'

/**
 * Seção de autenticação do Header — renderizada APENAS no cliente (ssr: false).
 *
 * Motivação: useAuth() e UserButton do Clerk acessam React context durante SSR.
 * Sem ClerkProvider no build (chave ausente no CI), o context é undefined e
 * a renderização falha. Separando o código de auth aqui e importando com
 * `dynamic(..., { ssr: false })` no Header, as páginas estáticas são
 * pré-renderizadas sem tocar no Clerk.
 */

import Link from 'next/link'
import { useAuth, UserButton } from '@clerk/nextjs'
import { Crown, LayoutDashboard } from 'lucide-react'

// Placeholder idêntico em dimensões ao UserButton para evitar layout shift
function AuthPlaceholder() {
  return <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
}

export default function HeaderAuth({ mobile = false }) {
  const { isSignedIn, isLoaded } = useAuth()

  // Enquanto Clerk carrega — exibe placeholder neutro
  if (!isLoaded) return <AuthPlaceholder />

  if (mobile) {
    return isSignedIn ? (
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <Link
          href="/dashboard"
          className="flex-1 text-center border border-white/20 text-[#E8E8E8]/70 hover:text-[#E8E8E8] font-roboto font-medium py-2.5 rounded-xl text-sm transition-colors"
        >
          Dashboard
        </Link>
        <div className="flex justify-center">
          <UserButton
            afterSignOutUrl="/"
            appearance={{ elements: { avatarBox: 'w-7 h-7' } }}
          />
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <Link
          href="/entrar"
          className="flex-1 text-center border border-white/20 text-[#E8E8E8]/70 hover:text-[#E8E8E8] font-roboto font-medium py-2.5 rounded-xl text-sm transition-colors"
        >
          Entrar
        </Link>
        <Link
          href="/premium"
          className="flex-1 text-center bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium py-2.5 rounded-xl text-sm transition-colors"
        >
          Premium
        </Link>
      </div>
    )
  }

  // Desktop
  return isSignedIn ? (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 text-sm font-roboto text-[#E8E8E8]/70 hover:text-[#FFD15A] transition-colors"
      >
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </Link>
      <UserButton
        afterSignOutUrl="/"
        appearance={{ elements: { avatarBox: 'w-8 h-8' } }}
      />
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Link
        href="/entrar"
        className="text-sm font-roboto text-[#E8E8E8]/70 hover:text-[#E8E8E8] transition-colors"
      >
        Entrar
      </Link>
      <Link
        href="/premium"
        className="inline-flex items-center gap-1.5 bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium text-sm px-4 py-2 rounded-xl transition-all duration-200"
      >
        <Crown className="w-3.5 h-3.5" />
        Premium
      </Link>
    </div>
  )
}
