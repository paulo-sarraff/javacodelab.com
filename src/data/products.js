// Catálogo de produtos da loja JavaCodeLab
// stripePriceId: configurar no painel Stripe e adicionar ao produto no banco via seed

export const products = [
  {
    id: 'prod_ai-code-review',
    slug: 'ai-code-review-bot',
    name: 'AI Code Review Bot',
    description: 'Ferramenta de IA que analisa seu código Java e sugere melhorias de performance, segurança e boas práticas automaticamente.',
    longDescription: 'Integre diretamente ao seu projeto Spring Boot e receba feedback em tempo real sobre qualidade de código, potenciais vulnerabilidades, anti-patterns e sugestões de refatoração baseadas nas melhores práticas do mercado.',
    price: 9700,        // R$ 97,00 em centavos
    originalPrice: 19700, // R$ 197,00
    category: 'tool',
    imageEmoji: '🤖',
    tags: ['IA', 'Qualidade de Código', 'Spring Boot', 'Automação'],
    features: [
      'Análise estática de código Java',
      'Detecção de vulnerabilidades OWASP',
      'Sugestões de refatoração inteligentes',
      'Integração com IntelliJ IDEA e VS Code',
      'Suporte vitalício a atualizações',
      'Documentação completa em PT-BR',
    ],
    digital: true,
    featured: true,
    active: true,
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 'prod_spring-boot-course',
    slug: 'spring-boot-avancado-curso',
    name: 'Spring Boot Avançado',
    description: 'Curso completo de Spring Boot do zero ao deploy em produção. Mais de 40 horas de conteúdo com projetos reais.',
    longDescription: 'Domine Spring Boot, Spring Security, Spring Data JPA, microserviços, Docker e deploy em nuvem. O curso mais completo de Spring Boot em português.',
    price: 29700,        // R$ 297,00
    originalPrice: 49700, // R$ 497,00
    category: 'course',
    imageEmoji: '🎓',
    tags: ['Spring Boot', 'Java', 'Microserviços', 'Docker', 'AWS'],
    features: [
      '40+ horas de vídeo-aulas',
      'Projetos práticos com código-fonte',
      'Spring Security e JWT do zero',
      'Deploy no AWS e Heroku',
      'Certificado de conclusão',
      'Acesso vitalício ao conteúdo',
    ],
    digital: true,
    featured: true,
    active: true,
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 'prod_java21-ebook',
    slug: 'java-21-guia-completo-ebook',
    name: 'Java 21 — Guia Completo',
    description: 'eBook definitivo sobre Java 21 LTS: Virtual Threads, Pattern Matching, Record Patterns, String Templates e muito mais.',
    longDescription: 'Um guia prático e objetivo sobre todas as novidades do Java 21 com exemplos reais, casos de uso e comparações com versões anteriores.',
    price: 4700,        // R$ 47,00
    originalPrice: 7900, // R$ 79,00
    category: 'ebook',
    imageEmoji: '📘',
    tags: ['Java 21', 'LTS', 'Virtual Threads', 'Pattern Matching'],
    features: [
      '200+ páginas em PDF e ePub',
      'Exemplos de código testados e funcionais',
      'Comparações Java 17 vs Java 21',
      'Guia de migração passo a passo',
      'Exercícios práticos por capítulo',
      'Atualizações gratuitas inclusas',
    ],
    digital: true,
    featured: false,
    active: true,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 'prod_devtools-kit',
    slug: 'dev-tools-kit-java',
    name: 'Dev Tools Kit',
    description: 'Pacote completo com templates de projeto, cheat sheets, scripts de automação e configurações prontas para Spring Boot.',
    longDescription: 'Economize horas de configuração inicial. Templates prontos para APIs REST, microserviços, autenticação JWT, CI/CD e muito mais.',
    price: 14900,        // R$ 149,00
    originalPrice: 24900, // R$ 249,00
    category: 'tool',
    imageEmoji: '🛠️',
    tags: ['Templates', 'Spring Boot', 'DevOps', 'CI/CD', 'Docker'],
    features: [
      '15 templates de projeto prontos',
      'Cheat sheets de Spring e Java',
      'Scripts Docker e Kubernetes',
      'Pipelines CI/CD para GitHub Actions',
      'Configurações de segurança pré-testadas',
      'Atualizações mensais inclusas',
    ],
    digital: true,
    featured: false,
    active: true,
    rating: 4.7,
    reviews: 56,
  },
  {
    id: 'prod_camiseta',
    slug: 'camiseta-javacodelab',
    name: 'Camiseta JavaCodeLab',
    description: 'Mostre que você é dev Java de verdade. 100% algodão, estampa de alta qualidade, disponível em P, M, G e GG.',
    longDescription: 'Design exclusivo criado para devs Java. Confortável, durável e com estampa que só quem é da área entende.',
    price: 4900,        // R$ 49,00
    originalPrice: 7900, // R$ 79,00
    category: 'merch',
    imageEmoji: '👕',
    tags: ['Moda Dev', 'Java', 'Merch', 'Presente'],
    features: [
      '100% algodão premium',
      'Estampa exclusiva JavaCodeLab',
      'Tamanhos P, M, G, GG e XGG',
      'Frete grátis acima de R$ 100',
      'Troca em até 30 dias',
    ],
    digital: false,
    featured: false,
    active: true,
    rating: 4.8,
    reviews: 43,
  },
]

// Helpers
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)
export const getProductById = (id) => products.find((p) => p.id === id)
export const getFeaturedProducts = () => products.filter((p) => p.featured && p.active)
export const getProductsByCategory = (category) => products.filter((p) => p.category === category && p.active)
export const getActiveProducts = () => products.filter((p) => p.active)

export const PRODUCT_CATEGORIES = {
  course: { label: 'Cursos', emoji: '🎓' },
  ebook: { label: 'eBooks', emoji: '📘' },
  tool: { label: 'Ferramentas', emoji: '🛠️' },
  merch: { label: 'Merch', emoji: '👕' },
}
