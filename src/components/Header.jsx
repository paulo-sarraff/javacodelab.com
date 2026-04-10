'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  Menu,
  X,
  Search,
  ChevronDown,
  BookOpen,
  Briefcase,
  ShoppingBag,
  Mail,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import SearchModal from './SearchModal'

// Importado com ssr:false — evita que useAuth/UserButton do Clerk sejam chamados
// durante SSR/prerendering quando ClerkProvider pode não estar disponível.
const HeaderAuth = dynamic(() => import('./HeaderAuth'), {
  ssr: false,
  loading: () => <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />,
})

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const mainNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Conteúdo Premium', href: '/premium', highlight: true },
  ]

  const dropdownItems = [
    {
      category: 'Conteúdo',
      items: [
        { name: 'Spring Framework', href: '/categoria/spring-framework', icon: BookOpen },
        { name: 'Java Avançado', href: '/categoria/java-avancado', icon: BookOpen },
        { name: 'Testes & Qualidade', href: '/categoria/testes-qualidade', icon: BookOpen },
        { name: 'Carreiras', href: '/categoria/carreiras', icon: Briefcase },
      ],
    },
    {
      category: 'Loja',
      items: [{ name: 'Produtos', href: '/loja', icon: ShoppingBag }],
    },
    {
      category: 'Sobre',
      items: [
        { name: 'Sobre Nós', href: '/sobre', icon: Info },
        { name: 'Contato', href: '/contato', icon: Mail },
      ],
    },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#1A1A1B]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex-shrink-0">
                <div className="text-[#E8E8E8] font-geist font-bold text-xl">
                  <span className="text-[#FFD15A]">{'{'}</span>
                  <span className="mx-1">JCL</span>
                  <span className="text-[#FFD15A]">{'}'}</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-roboto font-medium transition-colors duration-200 relative group ${
                    item.highlight
                      ? 'text-[#FFD15A] hover:text-[#FFD15A]/80'
                      : 'text-[#E8E8E8]/80 hover:text-[#FFD15A]'
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD15A] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}

              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 text-[#E8E8E8]/80 hover:text-[#FFD15A] font-roboto font-medium transition-colors duration-200"
                >
                  Mais
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-[#1A1A1B] border border-white/10 rounded-2xl shadow-2xl z-50">
                    <div className="p-6">
                      {dropdownItems.map((section, sectionIndex) => (
                        <div key={section.category} className={sectionIndex > 0 ? 'mt-6' : ''}>
                          <h3 className="text-xs font-geist font-semibold text-[#E8E8E8]/50 mb-3 uppercase tracking-wider">
                            {section.category}
                          </h3>
                          <div className="space-y-1">
                            {section.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsDropdownOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 text-[#E8E8E8]/70 hover:text-[#FFD15A] hover:bg-white/5 rounded-lg transition-all duration-200 group"
                              >
                                <item.icon className="w-4 h-4 text-[#E8E8E8]/40 group-hover:text-[#FFD15A] transition-colors" />
                                <span className="font-roboto">{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Actions — desktop */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="text-[#E8E8E8]/80 hover:text-[#FFD15A] hover:bg-[#FFD15A]/10 rounded-xl"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Auth section — client-only, sem SSR */}
              <HeaderAuth />
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="text-[#E8E8E8] hover:text-[#FFD15A] rounded-xl"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* UserButton mobile — client-only */}
              <div className="flex items-center">
                <HeaderAuth mobile />
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#E8E8E8] hover:text-[#FFD15A] rounded-xl"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <nav className="flex flex-col space-y-1">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-roboto font-medium py-2 px-3 rounded-xl transition-all duration-200 ${
                      item.highlight
                        ? 'text-[#FFD15A] bg-[#FFD15A]/10'
                        : 'text-[#E8E8E8]/80 hover:text-[#FFD15A] hover:bg-[#FFD15A]/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {dropdownItems.map((section) => (
                  <div key={section.category} className="pt-3 border-t border-white/10">
                    <h3 className="text-xs font-geist font-semibold text-[#E8E8E8]/40 mb-2 px-3 uppercase tracking-wider">
                      {section.category}
                    </h3>
                    {section.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 text-[#E8E8E8]/70 hover:text-[#FFD15A] font-roboto py-2 px-3 rounded-xl hover:bg-[#FFD15A]/10 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}

                {/* Mobile auth buttons — client-only, renderizados pelo HeaderAuth */}
              </nav>
            </div>
          )}
        </div>

        {/* Dropdown overlay */}
        {isDropdownOpen && (
          <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)} />
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

export default Header
