import PremiumPage from '@/components/PremiumPage'

const BASE_URL = 'https://javacodelab.com'

export const metadata = {
  title: 'Conteúdo Premium — Em breve',
  description:
    'Conteúdo exclusivo, projetos práticos, trilhas de aprendizado e comunidade para desenvolvedores Java que querem se destacar no mercado. Em breve.',
  alternates: {
    canonical: `${BASE_URL}/premium`,
  },
  openGraph: {
    type: 'website',
    title: 'Conteúdo Premium | JavaCodeLab',
    description:
      'Conteúdo exclusivo, projetos práticos, trilhas de aprendizado e comunidade para desenvolvedores Java. Em breve.',
    url: `${BASE_URL}/premium`,
    siteName: 'JavaCodeLab',
    locale: 'pt_BR',
    images: [
      {
        url: `${BASE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: 'JavaCodeLab Premium — Em breve',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conteúdo Premium | JavaCodeLab',
    description:
      'Conteúdo exclusivo para desenvolvedores Java que querem se destacar. Em breve.',
    images: [`${BASE_URL}/api/og`],
  },
}

export default function Page() {
  return <PremiumPage />
}
