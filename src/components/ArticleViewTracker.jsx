'use client'

import { useEffect } from 'react'
import { trackEvent, events } from '@/lib/analytics'

export default function ArticleViewTracker({ slug, title, category, tags = [] }) {
  useEffect(() => {
    // Incrementa contador no banco
    fetch(`/api/views/${slug}`, { method: 'POST' }).catch(() => {})

    // Evento para GA4 + PostHog
    trackEvent(events.ARTICLE_VIEW, { slug, title, category, tags })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return null
}
