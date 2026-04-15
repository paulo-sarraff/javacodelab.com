import prisma from '@/lib/prisma'

// Categorias estáticas — não precisam do banco
export const categories = [
  'Spring Framework',
  'Java para Iniciantes',
  'Java Avançado',
  'Testes & Qualidade',
  'Carreiras',
  'Arquitetura',
]

const MONTHS_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

function formatPublishDate(date) {
  const d = new Date(date)
  return `${d.getDate()} de ${MONTHS_PT[d.getMonth()]}, ${d.getFullYear()}`
}

// Transforma o registro Prisma no shape esperado pelos componentes
function toDTO(article) {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.contentKey,                          // chave do renderizador de conteúdo
    category: article.category,
    author: article.authorName,                           // compatibilidade com componentes
    publishDate: formatPublishDate(article.publishedAt),  // "24 de Setembro, 2025"
    sortDate: article.publishedAt.toISOString().split('T')[0], // "2025-09-24"
    readTime: article.readTime,
    views: article.views.toLocaleString('pt-BR'),         // "1.234"
    tags: article.tags,
    featuredImage: article.featuredImage ?? '/api/placeholder/1200/600',
    featured: article.featured,
    published: article.published,
  }
}

export async function getAllArticles() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  })
  return articles.map(toDTO)
}

export async function getArticleById(id) {
  const article = await prisma.article.findUnique({ where: { id } })
  return article ? toDTO(article) : null
}

export async function getArticleBySlug(slug) {
  const article = await prisma.article.findUnique({ where: { slug } })
  return article ? toDTO(article) : null
}

export async function getArticlesByCategory(category) {
  const articles = await prisma.article.findMany({
    where: { published: true, category },
    orderBy: { publishedAt: 'desc' },
  })
  return articles.map(toDTO)
}

export async function getFeaturedArticles(limit = 5) {
  const articles = await prisma.article.findMany({
    where: { published: true, featured: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  })
  return articles.map(toDTO)
}

export async function getLatestArticles(limit = 6) {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  })
  return articles.map(toDTO)
}

export async function getRelatedArticles(currentArticleId, category, limit = 3) {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
      category,
      NOT: { id: currentArticleId },
    },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  })
  return articles.map(toDTO)
}

export async function getPopularArticles(limit = 4) {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { views: 'desc' },
    take: limit,
  })
  return articles.map(toDTO)
}

export async function searchArticles(query) {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { publishedAt: 'desc' },
  })
  return articles.map(toDTO)
}
