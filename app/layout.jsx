import './globals.css'

export const metadata = {
  metadataBase: new URL('https://javacodelab.com'),
  title: {
    default: 'JavaCodeLab - Desenvolvimento Java e Spring Framework',
    template: '%s | JavaCodeLab',
  },
  description:
    'Blog especializado em Java, Spring Boot, Quarkus, microserviços e carreira para desenvolvedores. Tutoriais práticos e dicas de especialistas.',
  keywords: [
    'Java',
    'Spring Boot',
    'Spring Framework',
    'Quarkus',
    'Microserviços',
    'Tutorial Java',
    'Desenvolvimento Java',
    'JUnit',
    'Hibernate',
    'JPA',
  ],
  authors: [{ name: 'Paulo Sarraff', url: 'https://javacodelab.com/sobre' }],
  creator: 'Paulo Sarraff',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://javacodelab.com',
    siteName: 'JavaCodeLab',
    title: 'JavaCodeLab - Desenvolvimento Java e Spring Framework',
    description:
      'Blog especializado em Java, Spring Boot e ecossistema Java. Tutoriais práticos para desenvolvedores.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JavaCodeLab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@javacodelab',
    creator: '@javacodelab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
