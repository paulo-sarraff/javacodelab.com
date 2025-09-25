import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, ArrowRight, TrendingUp } from 'lucide-react'
import { getLatestArticles } from '../data/articles'

const LatestPosts = () => {
  const posts = getLatestArticles(6)

  const getCategoryColor = (category) => {
    const colors = {
      "Spring Framework": "bg-[#02a9f7]",
      "Java Avançado": "bg-orange-500",
      "Arquitetura": "bg-purple-500",
      "Testes & Qualidade": "bg-green-500",
      "Carreiras": "bg-pink-500",
      "Java para Iniciantes": "bg-blue-500"
    }
    return colors[category] || "bg-[#02a9f7]"
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Spring Framework': return '🍃'
      case 'Java Avançado': return '☕'
      case 'Testes & Qualidade': return '🧪'
      case 'Carreiras': return '🚀'
      case 'Arquitetura': return '🏗️'
      case 'Java para Iniciantes': return '📚'
      default: return '💻'
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F0F10]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-[#FFD15A]" />
              <h2 className="text-3xl md:text-4xl font-geist font-bold text-[#E8E8E8]">
                Últimas do Laboratório
              </h2>
            </div>
            <p className="text-lg text-[#E8E8E8]/70 font-roboto max-w-2xl">
              Conteúdo fresco direto do nosso laboratório de desenvolvimento
            </p>
          </div>
          
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              className="border-[#FFD15A] text-[#FFD15A] hover:bg-[#FFD15A] hover:text-black font-roboto font-medium"
            >
              Ver Todos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <article key={post.id} className="group">
              <Link to={`/artigo/${post.slug}`} className="block">
                <div className="bg-[#2A2A2B] rounded-xl overflow-hidden border border-white/10 hover:border-[#FFD15A]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD15A]/10 hover-lift">
                  {/* Image with overlay */}
                  <div className="aspect-video bg-gradient-to-br from-[#02a9f7]/20 to-[#FFD15A]/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/40"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCategoryIcon(post.category)}</span>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-roboto font-medium text-white ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Read Time */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-[#1A1A1B]/80 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs text-[#E8E8E8]/80 font-roboto">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <div className="w-10 h-10 bg-[#FFD15A]/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#FFD15A]/40 transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-[#FFD15A] group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>

                    {/* Featured Badge for first post */}
                    {index === 0 && (
                      <div className="absolute bottom-4 left-4 z-10">
                        <div className="bg-[#FFD15A] text-black px-3 py-1 rounded-full text-xs font-roboto font-bold">
                          NOVO
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-geist font-semibold text-[#E8E8E8] mb-3 group-hover:text-[#FFD15A] transition-colors duration-200 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-[#E8E8E8]/70 font-roboto mb-4 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-[#E8E8E8]/60 font-roboto">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.publishDate}</span>
                        </div>
                      </div>
                      <div className="text-[#FFD15A]">
                        {post.views} views
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-[#1A1A1B] text-[#E8E8E8]/60 rounded text-xs font-roboto hover:bg-[#FFD15A]/10 hover:text-[#FFD15A] transition-colors duration-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center md:hidden">
          <Button 
            variant="outline" 
            size="lg"
            className="border-[#FFD15A] text-[#FFD15A] hover:bg-[#FFD15A] hover:text-black font-roboto font-medium"
          >
            Ver todos os posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default LatestPosts
