import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, Clock, TrendingUp, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAllArticles } from '../data/articles'

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)

  // Trending/Popular searches
  const trendingSearches = [
    'Spring Boot JWT',
    'Java 17 features',
    'Microservices',
    'Spring Security',
    'JPA Hibernate',
    'Docker Java'
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('javacodelab-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // Simulate search delay for better UX
    const searchTimeout = setTimeout(() => {
      const articles = getAllArticles()
      const filtered = articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        article.category.toLowerCase().includes(query.toLowerCase())
      )
      
      setResults(filtered.slice(0, 8)) // Limit to 8 results
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      // Add to recent searches
      const newRecentSearches = [
        searchTerm,
        ...recentSearches.filter(s => s !== searchTerm)
      ].slice(0, 5) // Keep only 5 recent searches
      
      setRecentSearches(newRecentSearches)
      localStorage.setItem('javacodelab-recent-searches', JSON.stringify(newRecentSearches))
      
      setQuery(searchTerm)
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('javacodelab-recent-searches')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-start justify-center min-h-screen pt-16 px-4">
        <div 
          className="w-full max-w-2xl bg-[#1A1A1B] border border-white/10 rounded-2xl shadow-2xl animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="flex items-center gap-4 p-6 border-b border-white/10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E8E8E8]/40" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Pesquisar artigos, tutoriais, tecnologias..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-4 py-3 bg-[#1A1A1B] border-white/20 text-[#E8E8E8] placeholder:text-[#E8E8E8]/40 focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 rounded-xl text-lg"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-[#E8E8E8]/60 hover:text-[#E8E8E8] hover:bg-white/10 rounded-xl"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {query.length === 0 ? (
              // Default state - Recent and Trending
              <div className="p-6 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-geist font-semibold text-[#E8E8E8]/80 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Pesquisas Recentes
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-[#E8E8E8]/40 hover:text-[#FFD15A] transition-colors"
                      >
                        Limpar
                      </button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-left px-3 py-2 text-[#E8E8E8]/70 hover:text-[#FFD15A] hover:bg-white/5 rounded-lg transition-all duration-200 text-sm"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <h3 className="text-sm font-geist font-semibold text-[#E8E8E8]/80 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Pesquisas Populares
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="text-left px-3 py-2 text-[#E8E8E8]/70 hover:text-[#FFD15A] hover:bg-white/5 rounded-lg transition-all duration-200 text-sm border border-white/10 hover:border-[#FFD15A]/30"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Search Results
              <div className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-[#FFD15A]/20 border-t-[#FFD15A] rounded-full animate-spin" />
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-[#E8E8E8]/60 mb-4">
                      {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                    </p>
                    {results.map((article) => (
                      <Link
                        key={article.id}
                        to={`/artigo/${article.slug}`}
                        onClick={onClose}
                        className="block p-4 hover:bg-white/5 rounded-xl transition-all duration-200 border border-transparent hover:border-white/10 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-[#FFD15A]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD15A]/20 transition-colors">
                            <FileText className="w-4 h-4 text-[#FFD15A]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-geist font-semibold text-[#E8E8E8] group-hover:text-[#FFD15A] transition-colors mb-1 line-clamp-1">
                              {article.title}
                            </h4>
                            <p className="text-sm text-[#E8E8E8]/60 line-clamp-2 mb-2">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="px-2 py-1 bg-[#02a9f7]/10 text-[#02a9f7] rounded-md">
                                {article.category}
                              </span>
                              <span className="text-[#E8E8E8]/40">
                                {article.readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#E8E8E8]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-[#E8E8E8]/20" />
                    </div>
                    <p className="text-[#E8E8E8]/60 mb-2">Nenhum resultado encontrado</p>
                    <p className="text-sm text-[#E8E8E8]/40">
                      Tente pesquisar por outros termos ou navegue pelas categorias
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Footer */}
          <div className="px-6 py-4 border-t border-white/10 bg-[#1A1A1B]/50">
            <div className="flex items-center justify-between text-xs text-[#E8E8E8]/40">
              <span>Pressione ESC para fechar</span>
              <span>Enter para pesquisar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
