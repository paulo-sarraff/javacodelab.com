'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Calendar, Clock, Tag, Search, X } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { getAllArticles, categories } from '../data/articles'

const ArticlesPage = () => {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    const cat = searchParams.get('categoria')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const allArticles = getAllArticles()

  const filtered = allArticles.filter((article) => {
    const matchesCategory = !activeCategory || article.category === activeCategory
    const q = query.toLowerCase()
    const matchesQuery =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q))
    return matchesCategory && matchesQuery
  })

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
  )

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <div className="bg-gradient-to-b from-[#0F0F10] to-[#1A1A1B] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-geist font-bold text-[#E8E8E8] mb-4">
              Artigos
            </h1>
            <p className="text-[#E8E8E8]/70 font-roboto text-lg max-w-2xl">
              Tutoriais práticos de Java, Spring Boot, testes, arquitetura e carreira.
            </p>

            {/* Search */}
            <div className="relative mt-8 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E8E8E8]/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar artigos..."
                className="w-full pl-11 pr-10 py-3 bg-[#2A2A2B] border border-white/10 rounded-xl text-[#E8E8E8] placeholder:text-[#E8E8E8]/40 focus:outline-none focus:border-[#FFD15A]/50 font-roboto text-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E8E8E8]/40 hover:text-[#E8E8E8]/70"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-roboto font-medium transition-all duration-200 ${
                !activeCategory
                  ? 'bg-[#FFD15A] text-black'
                  : 'bg-[#2A2A2B] text-[#E8E8E8]/70 hover:text-[#E8E8E8] border border-white/10'
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-full text-sm font-roboto font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#FFD15A] text-black'
                    : 'bg-[#2A2A2B] text-[#E8E8E8]/70 hover:text-[#E8E8E8] border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-sm text-[#E8E8E8]/50 font-roboto mb-8">
            {sorted.length} artigo{sorted.length !== 1 ? 's' : ''}
            {activeCategory ? ` em "${activeCategory}"` : ''}
          </p>

          {/* Grid */}
          {sorted.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#E8E8E8]/50 font-roboto">Nenhum artigo encontrado.</p>
              <button
                onClick={() => { setQuery(''); setActiveCategory(null) }}
                className="mt-4 text-[#FFD15A] text-sm font-roboto hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

const ArticleCard = ({ article }) => (
  <Link
    href={`/artigo/${article.slug}`}
    className="group flex flex-col bg-[#2A2A2B] border border-white/5 rounded-2xl overflow-hidden hover:border-[#FFD15A]/30 transition-all duration-300 hover:-translate-y-1"
  >
    {/* Cover */}
    <div className="aspect-video bg-gradient-to-br from-[#02a9f7]/10 to-[#FFD15A]/10 flex items-center justify-center">
      <span className="text-5xl">{categoryEmoji(article.category)}</span>
    </div>

    <div className="flex flex-col flex-1 p-6">
      {/* Category badge */}
      <span className="inline-block px-3 py-1 bg-[#02a9f7]/10 text-[#02a9f7] rounded-full text-xs font-roboto font-medium mb-3 self-start">
        {article.category}
      </span>

      <h2 className="font-geist font-bold text-[#E8E8E8] text-lg leading-snug mb-3 group-hover:text-[#FFD15A] transition-colors line-clamp-2">
        {article.title}
      </h2>

      <p className="text-[#E8E8E8]/60 font-roboto text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
        {article.excerpt}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1A1A1B] text-[#E8E8E8]/50 rounded text-xs font-roboto"
          >
            <Tag className="w-2.5 h-2.5" />
            {tag}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-[#E8E8E8]/40 font-roboto border-t border-white/5 pt-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {article.publishDate}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {article.readTime}
        </span>
      </div>
    </div>
  </Link>
)

function categoryEmoji(category) {
  const map = {
    'Spring Framework': '🌱',
    'Java Avançado': '☕',
    'Java para Iniciantes': '👋',
    'Testes & Qualidade': '🧪',
    'Carreiras': '🚀',
    'Arquitetura': '🏗️',
  }
  return map[category] ?? '📄'
}

export default ArticlesPage
