// Base de dados dos artigos do JavaCodeLab
export const articles = [
  {
    id: 1,
    title: "Spring Boot: Implementando Autenticação JWT do Zero",
    slug: "spring-boot-jwt-autenticacao-completa",
    excerpt: "Aprenda a implementar autenticação JWT completa em Spring Boot com Spring Security. Tutorial passo a passo com código prático, melhores práticas de segurança e exemplos testáveis.",
    category: "Spring Framework",
    author: "Paulo Sarraff",
    publishDate: "24 de Setembro, 2025",
    sortDate: "2025-09-24",
    readTime: "22 min",
    tags: ["Spring Boot", "JWT", "Spring Security", "Autenticação", "REST API", "Java"],
    featuredImage: "/api/og?slug=spring-boot-jwt-autenticacao-completa",
    featured: true,
    content: "jwt-complete"
  },
  {
    id: 2,
    title: "Microserviços com Spring Boot: Guia Completo 2025",
    slug: "microservicos-spring-boot-guia-completo",
    excerpt: "Construa uma arquitetura de microserviços robusta usando Spring Boot, Spring Cloud e as melhores práticas da indústria. Do básico ao avançado.",
    category: "Spring Framework",
    author: "Paulo Sarraff",
    publishDate: "23 de Setembro, 2025",
    sortDate: "2025-09-23",
    readTime: "18 min",
    tags: ["Spring Boot", "Microserviços", "Spring Cloud", "Arquitetura", "Docker"],
    featuredImage: "/api/og?slug=microservicos-spring-boot-guia-completo",
    featured: true,
    content: "microservices"
  },
  {
    id: 3,
    title: "Testes Unitários em Java: JUnit 5 na Prática",
    slug: "testes-unitarios-java-junit5-pratica",
    excerpt: "Domine os testes unitários em Java com JUnit 5. Aprenda mocking com Mockito, parametrização, testes de exceções e cobertura de código.",
    category: "Testes & Qualidade",
    author: "Paulo Sarraff",
    publishDate: "20 de Setembro, 2025",
    sortDate: "2025-09-20",
    readTime: "15 min",
    tags: ["JUnit 5", "Testes Unitários", "Mockito", "Java", "TDD"],
    featuredImage: "/api/og?slug=testes-unitarios-java-junit5-pratica",
    featured: true,
    content: "junit5"
  },
  {
    id: 4,
    title: "Como se Preparar para Entrevistas Java Sênior",
    slug: "preparar-entrevistas-java-senior",
    excerpt: "Guia completo para se preparar para entrevistas de desenvolvedor Java sênior. Perguntas comuns, exercícios práticos e dicas de carreira.",
    category: "Carreiras",
    author: "Paulo Sarraff",
    publishDate: "18 de Setembro, 2025",
    sortDate: "2025-09-18",
    readTime: "12 min",
    tags: ["Entrevistas", "Carreira", "Java Sênior", "Dicas", "Algoritmos"],
    featuredImage: "/api/og?slug=preparar-entrevistas-java-senior",
    featured: true,
    content: "interview-prep"
  },
  {
    id: 5,
    title: "Java 25: Novidades que Todo Dev Precisa Conhecer",
    slug: "java-25-novidades-desenvolvedores",
    excerpt: "Explore as principais novidades do Java 25 LTS: Virtual Threads estáveis, Pattern Matching aprimorado, String Templates, Structured Concurrency e muito mais.",
    category: "Java Avançado",
    author: "Paulo Sarraff",
    publishDate: "4 de Junho, 2026",
    sortDate: "2026-06-04",
    readTime: "18 min",
    tags: ["Java 25", "Virtual Threads", "Pattern Matching", "LTS", "Structured Concurrency", "String Templates"],
    featuredImage: "/api/og?slug=java-25-novidades-desenvolvedores",
    featured: true,
    content: "java25"
  },
  {
    id: 6,
    title: "Docker para Desenvolvedores Java: Do Básico ao Deploy",
    slug: "docker-desenvolvedores-java-deploy",
    excerpt: "Containerize suas aplicações Java com Docker e aprenda a fazer deploy em produção de forma eficiente. Inclui Docker Compose e Kubernetes.",
    category: "Arquitetura",
    author: "Paulo Sarraff",
    publishDate: "12 de Setembro, 2025",
    sortDate: "2025-09-12",
    readTime: "20 min",
    tags: ["Docker", "Containerização", "Deploy", "DevOps", "Kubernetes"],
    featuredImage: "/api/og?slug=docker-desenvolvedores-java-deploy",
    featured: false,
    content: "docker"
  },
  {
    id: 7,
    title: "Spring Data JPA: Otimizações de Performance",
    slug: "spring-data-jpa-otimizacoes-performance",
    excerpt: "Técnicas avançadas para otimizar consultas JPA e melhorar drasticamente a performance da sua aplicação Spring Boot.",
    category: "Spring Framework",
    author: "Paulo Sarraff",
    publishDate: "10 de Setembro, 2025",
    sortDate: "2025-09-10",
    readTime: "14 min",
    tags: ["Spring Data JPA", "Performance", "Hibernate", "SQL", "Otimização"],
    featuredImage: "/api/og?slug=spring-data-jpa-otimizacoes-performance",
    featured: false,
    content: "jpa-performance"
  },
  {
    id: 8,
    title: "Clean Code em Java: Princípios e Práticas",
    slug: "clean-code-java-principios-praticas",
    excerpt: "Aprenda a escrever código Java limpo, legível e mantível seguindo os princípios do Clean Code e SOLID.",
    category: "Java para Iniciantes",
    author: "Paulo Sarraff",
    publishDate: "8 de Setembro, 2025",
    sortDate: "2025-09-08",
    readTime: "11 min",
    tags: ["Clean Code", "SOLID", "Refatoração", "Boas Práticas", "Java"],
    featuredImage: "/api/og?slug=clean-code-java-principios-praticas",
    featured: false,
    content: "clean-code"
  }
]

// Funções utilitárias
export const getAllArticles = () => articles

export const getArticleById = (id) => {
  return articles.find(article => article.id === parseInt(id))
}

export const getArticleBySlug = (slug) => {
  return articles.find(article => article.slug === slug)
}

export const getArticlesByCategory = (category) => {
  return articles.filter(article => article.category === category)
}

export const getFeaturedArticles = (limit = 5) => {
  return articles.filter(article => article.featured).slice(0, limit)
}

export const getLatestArticles = (limit = 6) => {
  return [...articles]
    .sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate))
    .slice(0, limit)
}

export const getRelatedArticles = (currentArticleId, category, limit = 3) => {
  return articles
    .filter(article =>
      article.id !== currentArticleId &&
      article.category === category
    )
    .slice(0, limit)
}

// Ordenado por data de publicação (sem contagem de views no lado cliente)
export const getPopularArticles = (limit = 4) => {
  return getLatestArticles(limit)
}

// Categorias disponíveis
export const categories = [
  "Spring Framework",
  "Java para Iniciantes",
  "Java Avançado",
  "Testes & Qualidade",
  "Carreiras",
  "Arquitetura"
]

// Função para buscar artigos
export const searchArticles = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return articles.filter(article =>
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
