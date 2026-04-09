import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import JsonLd from '@/components/JsonLd'

const BASE_URL = 'https://javacodelab.com'

export const metadata = {
  metadataBase: new URL(BASE_URL),
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
  authors: [{ name: 'Paulo Sarraff', url: `${BASE_URL}/sobre` }],
  creator: 'Paulo Sarraff',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE_URL,
    siteName: 'JavaCodeLab',
    title: 'JavaCodeLab - Desenvolvimento Java e Spring Framework',
    description:
      'Blog especializado em Java, Spring Boot e ecossistema Java. Tutoriais práticos para desenvolvedores.',
    images: [
      {
        url: `${BASE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: 'JavaCodeLab',
        type: 'image/png',
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
  alternates: {
    canonical: BASE_URL,
  },
}

// Schema.org WebSite — habilita Sitelinks Searchbox no Google
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'JavaCodeLab',
  url: BASE_URL,
  description:
    'Blog especializado em Java, Spring Boot, Quarkus e ecossistema Java para desenvolvedores.',
  inLanguage: 'pt-BR',
  author: {
    '@type': 'Person',
    name: 'Paulo Sarraff',
    url: `${BASE_URL}/sobre`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

// Schema.org Organization — reforça identidade da marca no Google
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'JavaCodeLab',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/favicon.ico`,
  },
  sameAs: [
    'https://twitter.com/javacodelab',
    'https://www.linkedin.com/company/javacodelab',
    'https://github.com/javacodelab',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: `${BASE_URL}/contato`,
    availableLanguage: 'Portuguese',
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/entrar"
      signUpUrl="/cadastro"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <html lang="pt-BR">
        <head>
          <JsonLd data={websiteSchema} />
          <JsonLd data={organizationSchema} />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
