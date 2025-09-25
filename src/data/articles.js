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
    readTime: "22 min",
    views: "1.234",
    tags: ["Spring Boot", "JWT", "Spring Security", "Autenticação", "REST API", "Java"],
    featuredImage: "/api/placeholder/1200/600",
    featured: true,
    content: "jwt-complete" // Identificador para conteúdo específico
  },
  {
    id: 2,
    title: "Microserviços com Spring Boot: Guia Completo 2025",
    slug: "microservicos-spring-boot-guia-completo",
    excerpt: "Construa uma arquitetura de microserviços robusta usando Spring Boot, Spring Cloud e as melhores práticas da indústria. Do básico ao avançado.",
    category: "Spring Framework",
    author: "Paulo Sarraff",
    publishDate: "23 de Setembro, 2025",
    readTime: "18 min",
    views: "2.847",
    tags: ["Spring Boot", "Microserviços", "Spring Cloud", "Arquitetura", "Docker"],
    featuredImage: "/api/placeholder/1200/600",
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
    readTime: "15 min",
    views: "1.856",
    tags: ["JUnit 5", "Testes Unitários", "Mockito", "Java", "TDD"],
    featuredImage: "/api/placeholder/1200/600",
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
    readTime: "12 min",
    views: "3.421",
    tags: ["Entrevistas", "Carreira", "Java Sênior", "Dicas", "Algoritmos"],
    featuredImage: "/api/placeholder/1200/600",
    featured: true,
    content: "interview-prep"
  },
  {
    id: 5,
    title: "Java 21: Novidades que Todo Dev Precisa Conhecer",
    slug: "java-21-novidades-desenvolvedores",
    excerpt: "Explore as principais novidades do Java 21 LTS: Virtual Threads, Pattern Matching, Record Patterns, String Templates e muito mais.",
    category: "Java Avançado",
    author: "Paulo Sarraff",
    publishDate: "15 de Setembro, 2025",
    readTime: "16 min",
    views: "2.156",
    tags: ["Java 21", "Virtual Threads", "Pattern Matching", "LTS", "Performance"],
    featuredImage: "/api/placeholder/1200/600",
    featured: true,
    content: "java21"
  },
  {
    id: 6,
    title: "Docker para Desenvolvedores Java: Do Básico ao Deploy",
    slug: "docker-desenvolvedores-java-deploy",
    excerpt: "Containerize suas aplicações Java com Docker e aprenda a fazer deploy em produção de forma eficiente. Inclui Docker Compose e Kubernetes.",
    category: "Arquitetura",
    author: "Paulo Sarraff",
    publishDate: "12 de Setembro, 2025",
    readTime: "20 min",
    views: "1.789",
    tags: ["Docker", "Containerização", "Deploy", "DevOps", "Kubernetes"],
    featuredImage: "/api/placeholder/1200/600",
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
    readTime: "14 min",
    views: "1.543",
    tags: ["Spring Data JPA", "Performance", "Hibernate", "SQL", "Otimização"],
    featuredImage: "/api/placeholder/1200/600",
    featured: false,
    content: "jpa-performance"
  },
  {
    id: 8,
    title: "Clean Code em Java: Princípios e Práticas",
    slug: "clean-code-java-principios-praticas",
    excerpt: "Aprenda a escrever código Java limpo, legível e maintível seguindo os princípios do Clean Code e SOLID.",
    category: "Java para Iniciantes",
    author: "Paulo Sarraff",
    publishDate: "8 de Setembro, 2025",
    readTime: "11 min",
    views: "2.234",
    tags: ["Clean Code", "SOLID", "Refatoração", "Boas Práticas", "Java"],
    featuredImage: "/api/placeholder/1200/600",
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
  return articles
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
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

export const getPopularArticles = (limit = 4) => {
  return articles
    .sort((a, b) => parseInt(b.views.replace(/\D/g, '')) - parseInt(a.views.replace(/\D/g, '')))
    .slice(0, limit)
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
