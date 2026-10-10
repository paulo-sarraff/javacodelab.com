import AboutPage from '@/components/AboutPage'

const BASE_URL = 'https://javacodelab.com'

export const metadata = {
  title: 'Sobre',
  description:
    'Conheça a história do JavaCodeLab, nossa missão de democratizar o aprendizado de Java e Spring Boot no Brasil, e o desenvolvedor por trás do projeto.',
  alternates: {
    canonical: `${BASE_URL}/sobre`,
  },
  openGraph: {
    type: 'profile',
    title: 'Sobre o JavaCodeLab',
    description:
      'Conheça a história do JavaCodeLab, nossa missão de democratizar o aprendizado de Java e Spring Boot no Brasil, e o desenvolvedor por trás do projeto.',
    url: `${BASE_URL}/sobre`,
    siteName: 'JavaCodeLab',
    locale: 'pt_BR',
    images: [
      {
        url: `${BASE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: 'JavaCodeLab — Sobre o projeto',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre o JavaCodeLab',
    description:
      'Conheça a história do JavaCodeLab e o desenvolvedor por trás do projeto.',
    images: [`${BASE_URL}/api/og`],
  },
}

export default function Page() {
  return <AboutPage />
}
