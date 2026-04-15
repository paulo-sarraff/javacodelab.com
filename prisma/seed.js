import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const articles = [
  {
    slug: 'spring-boot-jwt-autenticacao-completa',
    title: 'Spring Boot: Implementando Autenticação JWT do Zero',
    excerpt:
      'Aprenda a implementar autenticação JWT completa em Spring Boot com Spring Security. Tutorial passo a passo com código prático, melhores práticas de segurança e exemplos testáveis.',
    contentKey: 'jwt-complete',
    category: 'Spring Framework',
    authorName: 'Paulo Sarraff',
    publishedAt: new Date('2025-09-24'),
    readTime: '22 min',
    views: 1234,
    tags: ['Spring Boot', 'JWT', 'Spring Security', 'Autenticação', 'REST API', 'Java'],
    featuredImage: null,
    published: true,
    featured: true,
  },
  {
    slug: 'microservicos-spring-boot-guia-completo',
    title: 'Microserviços com Spring Boot: Guia Completo 2025',
    excerpt:
      'Construa uma arquitetura de microserviços robusta usando Spring Boot, Spring Cloud e as melhores práticas da indústria. Do básico ao avançado.',
    contentKey: 'microservices',
    category: 'Spring Framework',
    authorName: 'Paulo Sarraff',
    publishedAt: new Date('2025-09-23'),
    readTime: '18 min',
    views: 2847,
    tags: ['Spring Boot', 'Microserviços', 'Spring Cloud', 'Arquitetura', 'Docker'],
    featuredImage: null,
    published: true,
    featured: true,
  },
  {
    slug: 'testes-unitarios-java-junit5-pratica',
    title: 'Testes Unitários em Java: JUnit 5 na Prática',
    excerpt:
      'Domine os testes unitários em Java com JUnit 5. Aprenda mocking com Mockito, parametrização, testes de exceções e cobertura de código.',
    contentKey: 'junit5',
    category: 'Testes & Qualidade',
    authorName: 'Paulo Sarraff',
    publishedAt: new Date('2025-09-20'),
    readTime: '15 min',
    views: 1856,
    tags: ['JUnit 5', 'Testes Unitários', 'Mockito', 'Java', 'TDD'],
    featuredImage: null,
    published: true,
    featured: true,
  },
  {
    slug: 'preparar-entrevistas-java-senior',
    title: 'Como se Preparar para Entrevistas Java Sênior',
    excerpt:
      'Guia completo para se preparar para entrevistas de desenvolvedor Java sênior. Perguntas comuns, exercícios práticos e dicas de carreira.',
    contentKey: 'interview-prep',
    category: 'Carreiras',
    authorName: 'Paulo Sarraff',
    publishedAt: new Date('2025-09-18'),
    readTime: '12 min',
    views: 3421,
    tags: ['Entrevistas', 'Carreira', 'Java Sênior', 'Dicas', 'Algoritmos'],
    featuredImage: null,
    published: true,
    featured: true,
  },
  {
    slug: 'java-21-novidades-desenvolvedores',
    title: 'Java 21: Novidades que Todo Dev Precisa Conhecer',
    excerpt:
      'Explore as principais novidades do Java 21 LTS: Virtual Threads, Pattern Matching, Record Patterns, String Templates e muito mais.',
    contentKey: 'java21',
    category: 'Java Avançado',
    authorName: 'Paulo Sarraff',
    publishedAt: new Date('2025-09-15'),
    readTime: '16 min',
    views: 2156,
    tags: ['Java 21', 'Virtual Threads', 'Pattern Matching', 'LTS', 'Performance'],
    featuredImage: null,
    published: true,
    featured: true,
  },
  {
    slug: 'docker-desenvolvedores-java-deploy',
    title: 'Docker para Desenvolvedores Java: Do Básico ao Deploy',
    excerpt:
      'Containerize suas aplicações Java com Docker e aprenda a fazer deploy em produção de forma eficiente. Inclui Docker Compose e Kubernetes.',
    contentKey: 'docker',
    category: 'Arquitetura',
    authorName: 'Paulo Sarraff',
    publishedAt: new Date('2025-09-12'),
    readTime: '20 min',
    views: 1789,
    tags: ['Docker', 'Containerização', 'Deploy', 'DevOps', 'Kubernetes'],
    featuredImage: null,
    published: true,
    featured: false,
  },
  {
    slug: 'spring-data-jpa-otimizacoes-performance',
    title: 'Spring Data JPA: Otimizações de Performance',
    excerpt:
      'Técnicas avançadas para otimizar consultas JPA e melhorar drasticamente a performance da sua aplicação Spring Boot.',
    contentKey: 'jpa-performance',
    category: 'Spring Framework',
    authorName: 'Paulo Sarraff',
    publishedAt: new Date('2025-09-10'),
    readTime: '14 min',
    views: 1543,
    tags: ['Spring Data JPA', 'Performance', 'Hibernate', 'SQL', 'Otimização'],
    featuredImage: null,
    published: true,
    featured: false,
  },
  {
    slug: 'clean-code-java-principios-praticas',
    title: 'Clean Code em Java: Princípios e Práticas',
    excerpt:
      'Aprenda a escrever código Java limpo, legível e maintível seguindo os princípios do Clean Code e SOLID.',
    contentKey: 'clean-code',
    category: 'Java para Iniciantes',
    authorName: 'Paulo Sarraff',
    publishedAt: new Date('2025-09-08'),
    readTime: '11 min',
    views: 2234,
    tags: ['Clean Code', 'SOLID', 'Refatoração', 'Boas Práticas', 'Java'],
    featuredImage: null,
    published: true,
    featured: false,
  },
]

async function main() {
  console.log('🌱 Iniciando seed de artigos...')

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    })
    console.log(`  ✓ ${article.title}`)
  }

  console.log(`\n✅ ${articles.length} artigos inseridos com sucesso.`)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
