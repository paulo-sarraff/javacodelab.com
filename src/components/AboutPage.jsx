import { Link } from 'react-router-dom'
import { Code2, Users, BookOpen, Award, Coffee, Heart, Target, Zap } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { Button } from '@/components/ui/button'

const AboutPage = () => {
  const stats = [
    { icon: BookOpen, label: 'Artigos Publicados', value: '50+' },
    { icon: Users, label: 'Desenvolvedores Alcançados', value: '15k+' },
    { icon: Award, label: 'Anos de Experiência', value: '8+' },
    { icon: Coffee, label: 'Xícaras de Café', value: '2.5k+' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Foco na Prática',
      description: 'Acreditamos que a melhor forma de aprender programação é colocando a mão na massa. Todos os nossos tutoriais incluem código funcional e exemplos reais.'
    },
    {
      icon: Heart,
      title: 'Comunidade em Primeiro Lugar',
      description: 'Construímos uma comunidade onde desenvolvedores podem crescer juntos, compartilhar conhecimento e se apoiar mutuamente.'
    },
    {
      icon: Zap,
      title: 'Conteúdo Atualizado',
      description: 'O mundo da tecnologia evolui rapidamente. Mantemos nosso conteúdo sempre atualizado com as últimas versões e melhores práticas.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFD15A] to-[#02a9f7] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Code2 className="w-10 h-10 text-black" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-geist font-bold mb-6">
              Sobre o{' '}
              <span className="bg-gradient-to-r from-[#FFD15A] to-[#02a9f7] bg-clip-text text-transparent">
                JavaCodeLab
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#E8E8E8]/70 font-roboto mb-8 leading-relaxed">
              Transformando desenvolvedores Java em experts através de conteúdo prático, 
              tutoriais detalhados e uma comunidade vibrante de aprendizado.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#FFD15A]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-[#FFD15A]" />
                  </div>
                  <div className="text-3xl font-geist font-bold text-[#FFD15A] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[#E8E8E8]/70 font-roboto text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-geist font-bold text-center mb-16">
              Nossa História
            </h2>
            
            <div className="prose prose-invert max-w-none">
              <div className="text-lg font-roboto leading-relaxed space-y-6 text-[#E8E8E8]/80">
                <p>
                  O JavaCodeLab nasceu em 2016 da necessidade de criar um espaço onde desenvolvedores Java 
                  pudessem encontrar conteúdo técnico de qualidade, atualizado e focado na prática. 
                  Como desenvolvedor sênior, percebi que muitos recursos disponíveis eram superficiais 
                  ou desatualizados.
                </p>
                
                <p>
                  Começamos com artigos simples sobre Spring Framework e, ao longo dos anos, evoluímos 
                  para uma plataforma completa que abrange desde conceitos fundamentais até arquiteturas 
                  complexas de microserviços. Nossa missão sempre foi clara: <strong className="text-[#FFD15A]">
                  democratizar o conhecimento avançado em Java</strong>.
                </p>
                
                <p>
                  Hoje, o JavaCodeLab é referência para milhares de desenvolvedores em todo o Brasil 
                  e América Latina. Nosso compromisso continua sendo o mesmo: fornecer conteúdo prático, 
                  atualizado e que realmente faça diferença na carreira dos nossos leitores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1B]/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-geist font-bold text-center mb-16">
              Nossos Valores
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-8 rounded-2xl bg-[#1A1A1B] border border-white/10 hover:border-[#FFD15A]/30 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFD15A] to-[#02a9f7] rounded-xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-black" />
                  </div>
                  
                  <h3 className="text-xl font-geist font-bold mb-4 text-[#E8E8E8]">
                    {value.title}
                  </h3>
                  
                  <p className="text-[#E8E8E8]/70 font-roboto leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Author Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-geist font-bold text-center mb-16">
              Sobre o Autor
            </h2>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 bg-gradient-to-br from-[#FFD15A] to-[#02a9f7] rounded-2xl flex items-center justify-center flex-shrink-0">
                <div className="w-44 h-44 bg-[#1A1A1B] rounded-xl flex items-center justify-center">
                  <span className="text-4xl font-geist font-bold text-[#FFD15A]">PS</span>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-geist font-bold mb-4 text-[#E8E8E8]">
                  Paulo Sarraff
                </h3>
                
                <p className="text-lg text-[#02a9f7] font-roboto mb-6">
                  Desenvolvedor Java Sênior & Criador do JavaCodeLab
                </p>
                
                <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                  <p>
                    Com mais de 8 anos de experiência em desenvolvimento Java, Paulo é especialista 
                    em Spring Framework, arquitetura de microserviços e desenvolvimento de APIs REST. 
                    Trabalhou em projetos de grande escala para empresas de tecnologia e fintechs.
                  </p>
                  
                  <p>
                    Apaixonado por ensinar e compartilhar conhecimento, Paulo dedica seu tempo livre 
                    a criar conteúdo educacional e ajudar outros desenvolvedores a evoluírem em suas carreiras.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FFD15A]/10 to-[#02a9f7]/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-geist font-bold mb-6">
              Faça Parte da Nossa Comunidade
            </h2>
            
            <p className="text-xl text-[#E8E8E8]/70 font-roboto mb-8">
              Junte-se a milhares de desenvolvedores que já transformaram suas carreiras com o JavaCodeLab.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium"
              >
                <Link to="/">
                  Explorar Artigos
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-[#FFD15A] text-[#FFD15A] hover:bg-[#FFD15A]/10 font-roboto font-medium"
              >
                <Link to="/contato">
                  Entre em Contato
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage
