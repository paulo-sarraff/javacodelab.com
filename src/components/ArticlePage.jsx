import { Calendar, Clock, User, Tag, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import Header from './Header'
import Footer from './Footer'
import { Button } from '@/components/ui/button'
import { getArticleBySlug } from '../data/articles'
import { getMdxSource, extractHeadings } from '../lib/mdx'
import { mdxComponents } from './mdx/index'
import { TableOfContents } from './TableOfContents'
import { prisma } from '@/lib/prisma'

const rehypePrettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: false,
  defaultLang: 'plaintext',
}

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypePrettyCodeOptions]],
}

const categoryEmoji = {
  'Spring Framework': '🌱',
  'Java Avançado': '☕',
  'Java para Iniciantes': '👋',
  'Testes & Qualidade': '🧪',
  'Carreiras': '🚀',
  'Arquitetura': '🏗️',
}

async function getViewCount(slug) {
  try {
    const record = await prisma.articleView.findUnique({ where: { slug } })
    return record?.count ?? 0
  } catch {
    return null // DB não configurado ainda — omite o campo
  }
}

const ArticlePage = async ({ slug }) => {
  const article = getArticleBySlug(slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center px-4">
            <h1 className="text-4xl font-geist font-bold text-[#E8E8E8] mb-4">
              Artigo não encontrado
            </h1>
            <p className="text-[#E8E8E8]/70 font-roboto mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Link href="/">
              <Button className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const [mdxSource, viewCount] = await Promise.all([
    getMdxSource(slug),
    getViewCount(slug),
  ])
  const headings = extractHeadings(mdxSource)
  const emoji = categoryEmoji[article.category] ?? '📄'

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-[1fr_260px] xl:gap-14">

            {/* ── Article ── */}
            <article>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-[#E8E8E8]/60 font-roboto mb-8">
                <Link href="/" className="hover:text-[#FFD15A] transition-colors duration-200 cursor-pointer">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href={`/artigos?categoria=${encodeURIComponent(article.category)}`}
                  className="hover:text-[#FFD15A] transition-colors duration-200 cursor-pointer"
                >
                  {article.category}
                </Link>
                <span>/</span>
                <span className="text-[#FFD15A] truncate max-w-[200px]">{article.title}</span>
              </nav>

              {/* Header */}
              <header className="mb-12">
                <Link
                  href="/artigos"
                  className="inline-flex items-center gap-2 text-[#E8E8E8]/70 hover:text-[#FFD15A] font-roboto mb-6 transition-colors duration-200 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Todos os artigos
                </Link>

                <div className="mb-6">
                  <Link href={`/artigos?categoria=${encodeURIComponent(article.category)}`}>
                    <span className="inline-block px-4 py-2 bg-[#02a9f7] text-white rounded-full text-sm font-roboto font-medium hover:bg-[#02a9f7]/80 transition-colors cursor-pointer">
                      {article.category}
                    </span>
                  </Link>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-geist font-bold text-[#E8E8E8] mb-6 leading-tight">
                  {article.title}
                </h1>

                <p className="text-xl text-[#E8E8E8]/80 font-roboto mb-8 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-[#E8E8E8]/60 font-roboto mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{article.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime} de leitura</span>
                  </div>
                  {viewCount !== null && (
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{viewCount.toLocaleString('pt-BR')} visualizações</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/artigos?q=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#2A2A2B] text-[#E8E8E8]/70 rounded-full text-sm font-roboto hover:bg-[#FFD15A]/10 hover:text-[#FFD15A] transition-colors duration-200 cursor-pointer"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </Link>
                  ))}
                </div>

                {article.featuredImage?.startsWith('/images/') ? (
                  <div className="aspect-video relative rounded-xl mb-8 overflow-hidden">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
                      priority
                    />
                  </div>
                ) : (
                  <div
                    className="aspect-video bg-gradient-to-br from-[#02a9f7]/20 to-[#FFD15A]/20 rounded-xl mb-8 overflow-hidden"
                    role="img"
                    aria-label={`Imagem de destaque do artigo: ${article.title}`}
                  >
                    <div className="w-full h-full bg-black/20 flex items-center justify-center">
                      <span className="text-6xl" aria-hidden="true">{emoji}</span>
                    </div>
                  </div>
                )}
              </header>

              {/* MDX Content */}
              {mdxSource ? (
                <div>
                  <MDXRemote
                    source={mdxSource}
                    options={{ mdxOptions }}
                    components={mdxComponents}
                  />
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4">
                    Artigo em Desenvolvimento
                  </h2>
                  <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
                    Este artigo está sendo desenvolvido. Em breve teremos o conteúdo completo
                    disponível. Continue acompanhando o JavaCodeLab!
                  </p>
                </div>
              )}

              {/* Author */}
              <div className="bg-[#2A2A2B] rounded-xl border border-white/10 p-8 my-12">
                <div className="flex items-start gap-6">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-[#FFD15A]/20 to-[#02a9f7]/20 rounded-full flex items-center justify-center flex-shrink-0"
                    role="img"
                    aria-label="Avatar de Paulo Sarraff"
                  >
                    <span className="text-2xl font-geist font-bold text-[#FFD15A]" aria-hidden="true">PS</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-geist font-bold text-xl text-[#E8E8E8] mb-2">
                      Paulo Sarraff
                    </h3>
                    <p className="text-[#FFD15A] font-roboto mb-3">
                      Desenvolvedor Java Sênior & Tech Lead
                    </p>
                    <p className="text-[#E8E8E8]/80 font-roboto leading-relaxed">
                      Desenvolvedor Java com mais de 8 anos de experiência em Spring Framework,
                      arquitetura de microserviços e desenvolvimento de aplicações enterprise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center my-12">
                <Link href="/artigos">
                  <Button className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium cursor-pointer">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Ver todos os artigos
                  </Button>
                </Link>
              </div>
            </article>

            {/* ── TOC Sidebar ── */}
            <aside className="hidden xl:block pt-24">
              <div className="sticky top-24">
                <TableOfContents headings={headings} />
              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ArticlePage
