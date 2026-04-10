'use client'

// Página com botões de checkout (useAuth) — não pré-renderizar em build time
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CheckoutButton from '@/components/CheckoutButton'
import {
  products,
  getProductsByCategory,
  getActiveProducts,
  PRODUCT_CATEGORIES,
} from '@/data/products'
import { Star, Tag, ShoppingBag, Filter } from 'lucide-react'

function formatPrice(centavos) {
  return (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="group relative bg-[#1A1A1B] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FFD15A]/40 transition-all duration-300 hover:scale-[1.02] flex flex-col">
      {/* Badge de desconto */}
      {discount && (
        <div className="absolute top-4 right-4 z-10 bg-[#FFD15A] text-black text-xs font-roboto font-bold px-2 py-1 rounded-full">
          -{discount}%
        </div>
      )}

      {/* Emoji / imagem */}
      <div className="flex items-center justify-center h-40 bg-gradient-to-br from-[#FFD15A]/10 to-[#02a9f7]/10 text-6xl select-none">
        {product.imageEmoji}
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Categoria */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-roboto font-medium text-[#02a9f7] bg-[#02a9f7]/10 px-2 py-0.5 rounded-full">
            {PRODUCT_CATEGORIES[product.category]?.emoji}{' '}
            {PRODUCT_CATEGORIES[product.category]?.label}
          </span>
          {!product.digital && (
            <span className="text-xs font-roboto text-[#E8E8E8]/40">Físico</span>
          )}
        </div>

        {/* Nome */}
        <h3 className="text-lg font-geist font-bold text-[#E8E8E8] mb-2 leading-snug">
          {product.name}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-[#E8E8E8]/60 font-roboto leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#E8E8E8]/50 font-roboto border border-white/10 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'text-[#FFD15A] fill-current'
                    : 'text-[#E8E8E8]/20'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-[#E8E8E8]/50 font-roboto">
            {product.rating} ({product.reviews} avaliações)
          </span>
        </div>

        {/* Preço */}
        <div className="flex items-baseline gap-2 mb-5">
          {product.originalPrice && (
            <span className="text-sm text-[#E8E8E8]/40 font-roboto line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-2xl font-geist font-bold text-[#FFD15A]">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* CTA */}
        <CheckoutButton
          productId={product.id}
          label={`Comprar — ${formatPrice(product.price)}`}
          variant="primary"
        />
      </div>
    </div>
  )
}

export default function LojaPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const activeProducts = getActiveProducts()
  const filtered =
    activeCategory === 'all'
      ? activeProducts
      : activeProducts.filter((p) => p.category === activeCategory)

  const categoryCounts = Object.fromEntries(
    Object.keys(PRODUCT_CATEGORIES).map((cat) => [
      cat,
      activeProducts.filter((p) => p.category === cat).length,
    ])
  )

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD15A]/5 via-transparent to-[#02a9f7]/5 pointer-events-none" />
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#FFD15A]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#02a9f7]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFD15A]/10 to-[#02a9f7]/10 border border-[#FFD15A]/20 rounded-full mb-6">
              <ShoppingBag className="w-4 h-4 text-[#FFD15A]" />
              <span className="text-sm font-roboto font-medium text-[#E8E8E8]/80">
                Produtos Digitais e Físicos
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-geist font-bold mb-4 leading-tight">
              <span className="text-[#E8E8E8]">Loja</span>{' '}
              <span className="bg-gradient-to-r from-[#FFD15A] to-[#02a9f7] bg-clip-text text-transparent">
                JavaCodeLab
              </span>
            </h1>

            <p className="text-lg text-[#E8E8E8]/70 font-roboto max-w-2xl mx-auto">
              Cursos, eBooks, ferramentas e merch para desenvolvedores Java que levam a
              sério sua evolução profissional.
            </p>
          </div>
        </section>

        {/* Filtros */}
        <section className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-4 h-4 text-[#E8E8E8]/40" />
              <span className="text-sm font-roboto text-[#E8E8E8]/40">Filtrar por:</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl font-roboto text-sm font-medium transition-all duration-200 ${
                  activeCategory === 'all'
                    ? 'bg-[#FFD15A] text-black'
                    : 'bg-white/5 text-[#E8E8E8]/70 hover:bg-white/10'
                }`}
              >
                Todos ({activeProducts.length})
              </button>

              {Object.entries(PRODUCT_CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-2 rounded-xl font-roboto text-sm font-medium transition-all duration-200 ${
                    activeCategory === key
                      ? 'bg-[#FFD15A] text-black'
                      : 'bg-white/5 text-[#E8E8E8]/70 hover:bg-white/10'
                  }`}
                >
                  {cat.emoji} {cat.label} ({categoryCounts[key] ?? 0})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grade de produtos */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-6xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-[#E8E8E8]/50 font-roboto">
                Nenhum produto encontrado nesta categoria.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Banner premium */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#FFD15A]/10 to-[#02a9f7]/10 border border-[#FFD15A]/20 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-[#FFD15A]" />
                  <span className="text-sm font-roboto font-semibold text-[#FFD15A]">
                    Melhor custo-benefício
                  </span>
                </div>
                <h3 className="text-2xl font-geist font-bold text-[#E8E8E8] mb-2">
                  Prefere acesso a tudo de uma vez?
                </h3>
                <p className="text-[#E8E8E8]/60 font-roboto text-sm max-w-lg">
                  Com o plano Premium você acessa mais de 100 horas de conteúdo exclusivo,
                  projetos práticos, comunidade e mentoria por uma fração do preço.
                </p>
              </div>
              <Link
                href="/premium"
                className="shrink-0 bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Ver Planos Premium
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
