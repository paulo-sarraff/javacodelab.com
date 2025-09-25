import { Link } from 'react-router-dom'
import { Code2, Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categories } from '../data/articles'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
    { name: 'Newsletter', href: '#newsletter' },
    { name: 'Política de Privacidade', href: '/privacidade' },
    { name: 'Termos de Uso', href: '/termos' }
  ]

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/paulo-sarraff', icon: Github },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Email', href: 'mailto:contato@javacodelab.com', icon: Mail }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0F0F10] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD15A] to-[#02a9f7] rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="text-xl font-geist font-bold text-[#E8E8E8]">
                  {"{ JCL }"}
                </span>
                <div className="text-xs text-[#E8E8E8]/60 font-roboto -mt-1">
                  JavaCodeLab
                </div>
              </div>
            </Link>
            
            <p className="text-[#E8E8E8]/70 font-roboto mb-6 leading-relaxed">
              Seu laboratório de desenvolvimento Java. Tutoriais práticos, 
              dicas de carreira e as melhores práticas para desenvolvedores 
              que querem evoluir.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#2A2A2B] hover:bg-[#FFD15A]/20 text-[#E8E8E8]/60 hover:text-[#FFD15A] rounded-lg flex items-center justify-center transition-all duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-geist font-semibold text-[#E8E8E8] mb-6">
              Categorias
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/categoria/${category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`}
                    className="text-[#E8E8E8]/70 hover:text-[#FFD15A] font-roboto transition-colors duration-200 block"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

{/* Quick Links */}
<div>
  <h3 className="font-geist font-semibold text-[#E8E8E8] mb-6">
    Links Rápidos
  </h3>
  <ul className="space-y-3">
    {/* Seção "Sobre" */}
    <li>
      <Link
        to="/sobre"
        className="text-[#E8E8E8]/60 hover:text-[#FFD15A] transition-colors"
      >
        Sobre Nós
      </Link>
    </li>
    <li>
      <Link
        to="/contato"
        className="text-[#E8E8E8]/60 hover:text-[#FFD15A] transition-colors"
      >
        Contato
      </Link>
    </li>

    {/* Seção "Legal" */}
    <li>
      <Link
        to="/termos-uso"
        className="text-[#E8E8E8]/60 hover:text-[#FFD15A] transition-colors"
      >
        Termos de Uso
      </Link>
    </li>
    <li>
      <Link
        to="/politica-privacidade"
        className="text-[#E8E8E8]/60 hover:text-[#FFD15A] transition-colors"
      >
        Política de Privacidade
      </Link>
    </li>
  </ul>
</div>


          {/* Newsletter CTA */}
          <div>
            <h3 className="font-geist font-semibold text-[#E8E8E8] mb-6">
              Fique Atualizado
            </h3>
            <p className="text-[#E8E8E8]/70 font-roboto mb-4 text-sm">
              Receba nossos melhores artigos e dicas direto no seu e-mail.
            </p>
            <Button 
              className="w-full bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium mb-4"
            >
              Inscrever-se
            </Button>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-geist font-bold text-[#FFD15A]">
                  50+
                </div>
                <div className="text-xs text-[#E8E8E8]/60 font-roboto">
                  Artigos
                </div>
              </div>
              <div>
                <div className="text-lg font-geist font-bold text-[#FFD15A]">
                  12k+
                </div>
                <div className="text-xs text-[#E8E8E8]/60 font-roboto">
                  Leitores
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#E8E8E8]/60 font-roboto text-sm">
              <span>© {currentYear} JavaCodeLab. Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>por Paulo Sarraff</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-xs text-[#E8E8E8]/50 font-roboto">
                Versão 2.0.1
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-[#E8E8E8]/60 hover:text-[#FFD15A] hover:bg-[#FFD15A]/10"
              >
                <ArrowUp className="w-4 h-4 mr-1" />
                Topo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
