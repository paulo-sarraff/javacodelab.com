import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Calendar, User, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getFeaturedArticles } from '../data/articles'

const FeaturedCarousel = () => {
  const articles = getFeaturedArticles(5)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === articles.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [articles.length, isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? articles.length - 1 : currentIndex - 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === articles.length - 1 ? 0 : currentIndex + 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const getCategoryColor = (category) => {
    const colors = {
      "Spring Framework": "bg-[#02a9f7]",
      "Java Avançado": "bg-orange-500",
      "Arquitetura": "bg-purple-500",
      "Testes & Qualidade": "bg-green-500",
      "Carreiras": "bg-pink-500"
    }
    return colors[category] || "bg-[#02a9f7]"
  }

  if (!articles.length) return null

  const currentArticle = articles[currentIndex]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-geist font-bold text-[#E8E8E8] mb-4">
            Artigos em Destaque
          </h2>
          <p className="text-lg text-[#E8E8E8]/70 font-roboto max-w-2xl mx-auto">
            Conteúdo selecionado para acelerar sua jornada como desenvolvedor Java
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-[#2A2A2B] border border-white/10">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {articles.map((article, index) => (
                <div key={article.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 min-h-[500px]">
                    {/* Image Side */}
                    <div className="relative bg-gradient-to-br from-[#02a9f7]/20 to-[#FFD15A]/20 overflow-hidden">
                      <div className="absolute inset-0 bg-black/40"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-6 left-6 z-10">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-roboto font-medium text-white ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                      </div>

                      {/* Article Number */}
                      <div className="absolute top-6 right-6 z-10">
                        <div className="w-12 h-12 bg-[#FFD15A]/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <span className="text-[#FFD15A] font-geist font-bold">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      {/* Decorative Icon */}
                      <div className="absolute bottom-6 right-6 z-10">
                        <div className="text-6xl opacity-20">
                          {article.category === 'Spring Framework' && '🍃'}
                          {article.category === 'Java Avançado' && '☕'}
                          {article.category === 'Testes & Qualidade' && '🧪'}
                          {article.category === 'Carreiras' && '🚀'}
                          {article.category === 'Arquitetura' && '🏗️'}
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="mb-6">
                        <h3 className="text-2xl lg:text-3xl font-geist font-bold text-[#E8E8E8] mb-4 leading-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-[#E8E8E8]/70 font-roboto mb-6 leading-relaxed text-lg">
                          {article.excerpt}
                        </p>
                        
                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#E8E8E8]/60 font-roboto mb-6">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{article.publishDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-[#1A1A1B] text-[#E8E8E8]/70 rounded-full text-sm font-roboto"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <Link to={`/artigo/${article.slug}`}>
                          <Button 
                            size="lg"
                            className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold group"
                          >
                            Ler Artigo Completo
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1A1A1B]/80 backdrop-blur-sm hover:bg-[#FFD15A]/20 text-[#E8E8E8] hover:text-[#FFD15A] rounded-full flex items-center justify-center transition-all duration-200 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1A1A1B]/80 backdrop-blur-sm hover:bg-[#FFD15A]/20 text-[#E8E8E8] hover:text-[#FFD15A] rounded-full flex items-center justify-center transition-all duration-200 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#FFD15A] w-8' 
                    : 'bg-[#E8E8E8]/30 hover:bg-[#E8E8E8]/50'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs text-[#E8E8E8]/50 hover:text-[#FFD15A] font-roboto transition-colors duration-200"
            >
              {isAutoPlaying ? 'Pausar auto-play' : 'Retomar auto-play'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCarousel
