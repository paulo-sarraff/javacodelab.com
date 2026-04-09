import ArticlePage from '@/components/ArticlePage'
import ArticleViewTracker from '@/components/ArticleViewTracker'
import JsonLd from '@/components/JsonLd'
import { getArticleBySlug, getAllArticles } from '@/data/articles'

const BASE_URL = 'https://javacodelab.com'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Artigo não encontrado',
      description: 'O artigo que você está procurando não existe ou foi removido.',
    }
  }

  const ogImageUrl = `${BASE_URL}/api/og?slug=${article.slug}`

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author, url: `${BASE_URL}/sobre` }],
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `${BASE_URL}/artigo/${article.slug}`,
      siteName: 'JavaCodeLab',
      publishedTime: article.sortDate,
      authors: [`${BASE_URL}/sobre`],
      tags: article.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/artigo/${article.slug}`,
    },
  }
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export default async function Page({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  // Schema.org Article — habilita Rich Snippets no Google
  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: `${BASE_URL}/api/og?slug=${article.slug}`,
        datePublished: article.sortDate,
        dateModified: article.sortDate,
        author: {
          '@type': 'Person',
          name: article.author,
          url: `${BASE_URL}/sobre`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'JavaCodeLab',
          url: BASE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/favicon.ico`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/artigo/${article.slug}`,
        },
        keywords: article.tags.join(', '),
        articleSection: article.category,
        inLanguage: 'pt-BR',
      }
    : null

  return (
    <>
      {articleSchema && <JsonLd data={articleSchema} />}
      {article && (
        <ArticleViewTracker
          slug={article.slug}
          title={article.title}
          category={article.category}
          tags={article.tags}
        />
      )}
      <ArticlePage />
    </>
  )
}
