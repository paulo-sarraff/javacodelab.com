'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Loader2, Crown, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const HAS_CLERK =
  process.env.NODE_ENV === 'development' ||
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

/**
 * Botão de checkout que redireciona para o Stripe.
 * Exporta um wrapper que decide qual implementação usar
 * dependendo se o ClerkProvider está disponível.
 *
 * Props:
 *  - plan: 'monthly' | 'annual' | 'lifetime'  (para assinaturas)
 *  - productId: string                          (para produtos da loja)
 *  - label: texto do botão
 *  - variant: 'primary' | 'secondary'
 *  - className: classes extras
 */
export default function CheckoutButton(props) {
  // HAS_CLERK é constante de build-time — não viola regras de hooks
  return HAS_CLERK ? <CheckoutButtonAuthenticated {...props} /> : <CheckoutButtonGuest {...props} />
}

// Versão com Clerk — useAuth() só chamado aqui quando ClerkProvider existe
function CheckoutButtonAuthenticated({ plan, productId, label = 'Começar Agora', variant = 'primary', className = '' }) {
  const { isSignedIn } = useAuth()
  return <CheckoutButtonUI plan={plan} productId={productId} label={label} variant={variant} className={className} isSignedIn={!!isSignedIn} />
}

// Versão sem Clerk — sempre trata como visitante (redireciona para login)
function CheckoutButtonGuest({ plan, productId, label = 'Começar Agora', variant = 'primary', className = '' }) {
  return <CheckoutButtonUI plan={plan} productId={productId} label={label} variant={variant} className={className} isSignedIn={false} />
}

// UI compartilhada — recebe isSignedIn como prop, sem hooks do Clerk
function CheckoutButtonUI({ plan, productId, label, variant, className, isSignedIn }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleCheckout = async () => {
    setError(null)

    // Redireciona para login se não autenticado
    if (!isSignedIn) {
      const returnPath = plan ? '/premium' : '/loja'
      router.push(`/entrar?redirect_url=${returnPath}`)
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, productId }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Erro ao iniciar pagamento')
      }

      window.location.href = data.url
    } catch (err) {
      console.error('[CHECKOUT]', err)
      setError(err.message || 'Erro ao processar. Tente novamente.')
      setIsLoading(false)
    }
  }

  const isPrimary = variant === 'primary'

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`w-full py-3 rounded-xl font-roboto font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
          isPrimary
            ? 'bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 hover:scale-105'
            : 'bg-[#02a9f7] text-white hover:bg-[#02a9f7]/90 hover:scale-105'
        } ${className}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Redirecionando...
          </>
        ) : (
          <>
            {plan ? (
              <Crown className="w-4 h-4 mr-2" />
            ) : (
              <ShoppingCart className="w-4 h-4 mr-2" />
            )}
            {isSignedIn ? label : 'Entrar para Continuar'}
          </>
        )}
      </Button>

      {error && (
        <p className="text-red-400 text-xs font-roboto text-center">{error}</p>
      )}
    </div>
  )
}
