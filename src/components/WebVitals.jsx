'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { trackEvent } from '@/lib/analytics'

/**
 * Coleta Core Web Vitals e os envia para GA4 + PostHog.
 *
 * Métricas reportadas:
 *   CLS  — Cumulative Layout Shift  (estabilidade visual)
 *   FID  — First Input Delay        (interatividade)
 *   FCP  — First Contentful Paint   (velocidade percebida)
 *   LCP  — Largest Contentful Paint (performance de carregamento)
 *   TTFB — Time to First Byte       (velocidade do servidor)
 *   INP  — Interaction to Next Paint (responsividade)
 *
 * Adicione <WebVitals /> no layout raiz (dentro de um Client Component boundary).
 */
export default function WebVitals() {
  useReportWebVitals((metric) => {
    const { name, value, rating, id } = metric

    // GA4: arredondamos CLS (×1000) para evitar valores decimais minúsculos
    const roundedValue = name === 'CLS'
      ? Math.round(value * 1000)
      : Math.round(value)

    // Enviar para GA4 via gtag diretamente (precisa de non_interaction)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', name, {
        value: roundedValue,
        metric_id: id,
        metric_value: value,
        metric_rating: rating,        // 'good' | 'needs-improvement' | 'poor'
        event_category: 'Web Vitals',
        non_interaction: true,
      })
    }

    // PostHog: evento estruturado para análise de funil
    trackEvent('web_vitals', {
      metric: name,
      value,
      rounded_value: roundedValue,
      rating,
      metric_id: id,
    })
  })

  return null
}
