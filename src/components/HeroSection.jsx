import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Code2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD15A]/5 via-transparent to-[#02a9f7]/5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFD15A]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#02a9f7]/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFD15A]/10 to-[#02a9f7]/10 border border-[#FFD15A]/20 rounded-full mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#FFD15A]" />
          <span className="text-sm font-roboto font-medium text-[#E8E8E8]/80">
            Novo: Conteúdo Premium Disponível
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-geist font-bold mb-8 leading-tight">
          <span className="text-[#E8E8E8]">Domine</span>{' '}
          <span className="bg-gradient-to-r from-[#FFD15A] to-[#02a9f7] bg-clip-text text-transparent">
            Java
          </span>
          <br />
          <span className="text-[#E8E8E8]">como um</span>{' '}
          <span className="bg-gradient-to-r from-[#02a9f7] to-[#FFD15A] bg-clip-text text-transparent">
            Expert
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-[#E8E8E8]/70 font-roboto mb-12 max-w-3xl mx-auto leading-relaxed">
          Tutoriais práticos, código real e insights de carreira para desenvolvedores 
          que querem ir além do básico.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button 
            asChild
            size="lg"
            className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Link to="/categoria/spring-framework" className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Explorar Artigos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>

          <Button 
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-[#02a9f7] text-[#02a9f7] hover:bg-[#02a9f7] hover:text-black font-roboto font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105"
          >
            <Link to="/premium" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Conteúdo Premium
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-geist font-bold text-[#FFD15A] mb-2">50+</div>
            <div className="text-[#E8E8E8]/60 font-roboto text-sm">Artigos Técnicos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-geist font-bold text-[#02a9f7] mb-2">15k+</div>
            <div className="text-[#E8E8E8]/60 font-roboto text-sm">Desenvolvedores</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-geist font-bold text-[#FFD15A] mb-2">8+</div>
            <div className="text-[#E8E8E8]/60 font-roboto text-sm">Anos de Experiência</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-geist font-bold text-[#02a9f7] mb-2">100%</div>
            <div className="text-[#E8E8E8]/60 font-roboto text-sm">Código Funcional</div>
          </div>
        </div>

        {/* Floating Code Icon */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 hidden lg:block animate-float">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FFD15A]/20 to-[#02a9f7]/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
            <Code2 className="w-8 h-8 text-[#FFD15A]" />
          </div>
        </div>

        {/* Floating Book Icon */}
        <div className="absolute top-1/3 right-8 transform -translate-y-1/2 hidden lg:block animate-float-delayed">
          <div className="w-16 h-16 bg-gradient-to-br from-[#02a9f7]/20 to-[#FFD15A]/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
            <BookOpen className="w-8 h-8 text-[#02a9f7]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
