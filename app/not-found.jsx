import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllArticles } from '@/data/articles'
import { BookOpen, Home, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Página não encontrada',
}

export default function NotFound() {
  const articles = getAllArticles().slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8] flex flex-col items-center justify-center px-4 pt-24 pb-16">
        <div className="text-center max-w-2xl">
          {/* 404 badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFD15A]/10 border border-[#FFD15A]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#FFD15A] font-geist font-semibold text-sm">Erro 404</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-geist font-bold text-[#E8E8E8] mb-4">
            Ops, beco sem saída!
          </h1>

          <p className="text-[#E8E8E8]/60 font-roboto mb-10 text-lg max-w-md mx-auto">
            A página que você procura não existe, foi removida ou o link está incorreto.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Voltar para Home
            </Link>
            <Link
              href="/artigos"
              className="inline-flex items-center justify-center gap-2 border border-[#E8E8E8]/20 text-[#E8E8E8] hover:bg-[#E8E8E8]/5 font-roboto font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Ver Artigos
            </Link>
          </div>

          {/* Suggested articles */}
          <div className="text-left w-full">
            <h2 className="text-sm font-geist font-semibold text-[#E8E8E8]/40 uppercase tracking-wider mb-4">
              Talvez você esteja procurando
            </h2>
            <div className="space-y-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/artigo/${article.slug}`}
                  className="flex items-center justify-between gap-4 p-4 rounded-lg border border-[#E8E8E8]/10 hover:border-[#FFD15A]/30 hover:bg-[#FFD15A]/5 transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="font-geist font-medium text-[#E8E8E8] truncate group-hover:text-[#FFD15A] transition-colors">
                      {article.title}
                    </p>
                    <p className="text-sm text-[#E8E8E8]/40 font-roboto">{article.category}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#E8E8E8]/20 group-hover:text-[#FFD15A] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
