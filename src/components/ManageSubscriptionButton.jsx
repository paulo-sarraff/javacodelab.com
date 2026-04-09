'use client'

import { useState } from 'react'
import { Loader2, Settings } from 'lucide-react'

export default function ManageSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePortal = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Erro ao abrir portal')
      }

      window.location.href = data.url
    } catch (err) {
      console.error('[PORTAL]', err)
      setError(err.message || 'Tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handlePortal}
        disabled={isLoading}
        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[#E8E8E8] font-roboto font-medium text-sm px-4 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Settings className="w-4 h-4" />
        )}
        {isLoading ? 'Abrindo portal...' : 'Gerenciar Assinatura'}
      </button>

      {error && (
        <p className="text-red-400 text-xs font-roboto">{error}</p>
      )}
    </div>
  )
}
