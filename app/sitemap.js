import { getAllArticles, categories } from '@/data/articles'

const BASE_URL = 'https://javacodelab.com'

export default function sitemap() {
  const articles = getAllArticles()

  // Rotas estáticas principais
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/premium`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/termos-uso`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/politica-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  // Rotas dinâmicas: artigos
  const articleRoutes = articles.map((article) => ({
    url: `${BASE_URL}/artigo/${article.slug}`,
    lastModified: new Date(article.sortDate),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...articleRoutes]
}
