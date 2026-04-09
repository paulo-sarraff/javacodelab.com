'use client'

/**
 * Componente sem UI que dispara o evento article_view quando um artigo é aberto.
 * Renderizado pelo Server Component da rota /artigo/[slug].
 *
 * Uso:
 *   <ArticleViewTracker slug={article.slug} title={article.title} category={article.category} />
 */

import { useEffect } from 'react'
import { trackEvent, events } from '@/lib/analytics'

export default function ArticleViewTracker({ slug, title, category, tags = [] }) {
  useEffect(() => {
    trackEvent(events.ARTICLE_VIEW, {
      slug,
      title,
      category,
      tags,
    })
    // Só dispara uma vez por montagem (leitura da página)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return null
}
