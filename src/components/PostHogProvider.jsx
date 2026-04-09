'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

// ── Rastreamento de page views no App Router ──────────────────────────────────
// Next.js App Router não dispara eventos de rota automaticamente;
// precisamos ouvir pathname + searchParams manualmente.

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return

    let url = window.location.origin + pathname
    const qs = searchParams?.toString()
    if (qs) url += `?${qs}`

    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams])

  return null
}

// ── Provider principal ────────────────────────────────────────────────────────

export default function PostHogProvider({ children }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

    if (!key) return // sem chave → não inicializa (desenvolvimento local sem config)

    posthog.init(key, {
      api_host: host,
      capture_pageview: false,    // controlamos manualmente via PostHogPageView
      capture_pageleave: true,
      autocapture: true,          // cliques, inputs etc.
      session_recording: {
        maskAllInputs: true,      // LGPD: não gravar senhas e formulários
      },
      loaded(ph) {
        if (process.env.NODE_ENV === 'development') {
          ph.debug()
        }
        // Expor instância globalmente para src/lib/analytics.js
        window.posthog = ph
      },
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      {/* Suspense necessário pois useSearchParams precisa de boundary */}
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}
