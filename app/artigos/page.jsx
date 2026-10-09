import { Suspense } from 'react'
import ArticlesPage from '@/components/ArticlesPage'

const BASE_URL = 'https://javacodelab.com'

export const metadata = {
  title: 'Artigos',
  description:
    'Tutoriais práticos de Java, Spring Boot, testes, arquitetura e carreira. Aprenda com exemplos reais e se torne um desenvolvedor Java sênior.',
  alternates: {
    canonical: `${BASE_URL}/artigos`,
  },
  openGraph: {
    type: 'website',
    title: 'Artigos | JavaCodeLab',
    description:
      'Tutoriais práticos de Java, Spring Boot, testes, arquitetura e carreira. Aprenda com exemplos reais e se torne um desenvolvedor Java sênior.',
    url: `${BASE_URL}/artigos`,
    siteName: 'JavaCodeLab',
    locale: 'pt_BR',
    images: [
      {
        url: `${BASE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: 'JavaCodeLab — Artigos sobre Java e Spring Boot',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artigos | JavaCodeLab',
    description:
      'Tutoriais práticos de Java, Spring Boot, testes, arquitetura e carreira.',
    images: [`${BASE_URL}/api/og`],
  },
}

export default function Page() {
  return (
    <Suspense>
      <ArticlesPage />
    </Suspense>
  )
}
