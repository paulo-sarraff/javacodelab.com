import ArticlePage from '@/components/ArticlePage'
import { getArticleBySlug, getAllArticles } from '@/data/articles'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Artigo não encontrado',
      description: 'O artigo que você está procurando não existe ou foi removido.',
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.sortDate,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 600,
          alt: article.title,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export default function Page() {
  return <ArticlePage />
}
