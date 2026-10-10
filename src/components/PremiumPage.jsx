'use client'

import Link from 'next/link'
import {
  Crown,
  Download,
  Video,
  Code2,
  BookOpen,
  Users,
  CheckCircle,
  ArrowRight,
  FileText,
  Zap,
  Shield,
  Clock,
  Award,
  Bell,
  Rocket
} from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { Button } from '@/components/ui/button'

const PremiumPage = () => {
  const features = [
    {
      icon: Video,
      title: 'Vídeo-aulas Exclusivas',
      description: 'Conteúdo em vídeo com explicações detalhadas e projetos práticos do mundo real, gravados por quem vive Java no dia a dia.'
    },
    {
      icon: Code2,
      title: 'Código-fonte Completo',
      description: 'Repositórios com o código-fonte de todos os projetos, comentados e organizados com boas práticas de produção.'
    },
    {
      icon: FileText,
      title: 'eBooks e Guias',
      description: 'Biblioteca com eBooks, cheat sheets e guias de referência rápida para Spring, JPA, testes e muito mais.'
    },
    {
      icon: Users,
      title: 'Comunidade Privada',
      description: 'Espaço exclusivo para networking, troca de experiências e suporte direto entre desenvolvedores Java.'
    },
    {
      icon: Zap,
      title: 'Conteúdo Antecipado',
      description: 'Acesso aos novos artigos e tutoriais antes da publicação pública, direto na sua caixa de entrada.'
    },
    {
      icon: Award,
      title: 'Certificados',
      description: 'Certificados de conclusão para trilhas e projetos, para reforçar seu portfólio e LinkedIn.'
    }
  ]

  const premiumContent = [
    {
      category: 'Projetos Práticos',
      items: [
        'Sistema de E-commerce Completo com Spring Boot',
        'API REST com Autenticação JWT e Spring Security',
        'Microserviços com Docker e Kubernetes',
        'Sistema de Chat em Tempo Real com WebSocket'
      ]
    },
    {
      category: 'Trilhas de Aprendizado',
      items: [
        'Do Zero ao Spring Boot Expert',
        'Microserviços na Prática',
        'Testes Automatizados com JUnit e Mockito',
        'Deploy e DevOps para Desenvolvedores Java'
      ]
    },
    {
      category: 'Recursos Exclusivos',
      items: [
        'Templates de Projeto Prontos para Usar',
        'Cheat Sheets de Spring Framework',
        'Guia de Boas Práticas em Java',
        'Roadmap de Carreira para Devs Java'
      ]
    }
  ]

  const faqs = [
    {
      question: 'Quando a área premium vai abrir?',
      answer: 'Estamos trabalhando ativamente para lançar em breve. Inscreva-se na newsletter para ser avisado assim que abrir — membros da lista terão acesso antecipado e condições especiais de lançamento.'
    },
    {
      question: 'O conteúdo será adequado para iniciantes?',
      answer: 'Sim! Planejamos trilhas para diferentes níveis: de quem está começando em Java até desenvolvedores sênior que querem dominar arquitetura e boas práticas avançadas.'
    },
    {
      question: 'Como funcionará a assinatura?',
      answer: 'Estamos definindo os detalhes dos planos para garantir o melhor custo-benefício possível. Os primeiros inscritos na newsletter serão consultados sobre preço e formato antes do lançamento.'
    },
    {
      question: 'O conteúdo será atualizado regularmente?',
      answer: 'Sim. O compromisso é manter tudo alinhado com as versões mais recentes do Java e Spring, com novos conteúdos adicionados continuamente ao longo do tempo.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />

      {/* Banner Em Breve */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-gradient-to-r from-[#FFD15A]/20 to-[#02a9f7]/20 border-b border-[#FFD15A]/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-3 text-sm font-roboto">
          <span className="text-lg">🚀</span>
          <span className="text-[#E8E8E8]/90">
            <span className="font-semibold text-[#FFD15A]">Em breve!</span> A área premium está sendo preparada. Inscreva-se para ser o primeiro a saber.
          </span>
          <a href="/#newsletter" className="ml-2 px-3 py-1 bg-[#FFD15A] text-black rounded-full text-xs font-semibold hover:bg-[#FFD15A]/90 transition-colors cursor-pointer">
            Quero saber
          </a>
        </div>
      </div>

      <main className="pt-28">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD15A]/5 via-transparent to-[#02a9f7]/5" />
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFD15A]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#02a9f7]/10 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFD15A]/10 to-[#02a9f7]/10 border border-[#FFD15A]/20 rounded-full mb-8">
              <Crown className="w-4 h-4 text-[#FFD15A]" />
              <span className="text-sm font-roboto font-medium text-[#E8E8E8]/80">
                Conteúdo Premium Exclusivo
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-geist font-bold mb-8 leading-tight">
              <span className="text-[#E8E8E8]">Acelere sua</span>{' '}
              <span className="bg-gradient-to-r from-[#FFD15A] to-[#02a9f7] bg-clip-text text-transparent">
                Carreira
              </span>
              <br />
              <span className="text-[#E8E8E8]">em</span>{' '}
              <span className="bg-gradient-to-r from-[#02a9f7] to-[#FFD15A] bg-clip-text text-transparent">
                Java
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-[#E8E8E8]/70 font-roboto mb-12 max-w-3xl mx-auto leading-relaxed">
              Conteúdo exclusivo, projetos práticos e mentoria personalizada para
              desenvolvedores que querem se destacar no mercado.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a href="/#newsletter">
                <Button
                  size="lg"
                  className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Bell className="w-5 h-5 mr-2" />
                  Quero ser avisado
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#02a9f7] text-[#02a9f7] hover:bg-[#02a9f7] hover:text-black font-roboto font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => document.getElementById('content').scrollIntoView({ behavior: 'smooth' })}
              >
                Ver o que está planejado
              </Button>
            </div>

            {/* Honest Em Breve callout */}
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#2A2A2B] border border-white/10 rounded-2xl text-sm font-roboto text-[#E8E8E8]/70 max-w-xl mx-auto">
              <Rocket className="w-5 h-5 text-[#FFD15A] flex-shrink-0" />
              <span>
                O JavaCodeLab está crescendo. A área premium está em desenvolvimento e será lançada em breve — com conteúdo real, preço justo e sem promessas vazias.
              </span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-geist font-bold mb-4">
                O que você vai receber
              </h2>
              <p className="text-lg text-[#E8E8E8]/70 font-roboto max-w-2xl mx-auto">
                Conteúdo premium pensado para acelerar seu crescimento profissional de forma prática
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 bg-[#1A1A1B] border border-white/10 rounded-2xl hover:border-[#FFD15A]/30 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFD15A]/20 to-[#02a9f7]/20 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#FFD15A]" />
                  </div>

                  <h3 className="text-lg font-geist font-bold mb-3 text-[#E8E8E8]">
                    {feature.title}
                  </h3>

                  <p className="text-[#E8E8E8]/70 font-roboto text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Preview */}
        <section id="content" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-geist font-bold mb-4">
                Conteúdo Planejado
              </h2>
              <p className="text-lg text-[#E8E8E8]/70 font-roboto max-w-2xl mx-auto">
                Projetos reais, trilhas estruturadas e recursos que você não encontra em lugar nenhum — tudo em construção
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {premiumContent.map((section, index) => (
                <div key={index} className="bg-[#1A1A1B] border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-geist font-bold mb-6 text-[#FFD15A]">
                    {section.category}
                  </h3>

                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#02a9f7] flex-shrink-0 mt-0.5" />
                        <span className="text-[#E8E8E8]/80 font-roboto text-sm leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1B]/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-geist font-bold mb-4">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6 hover:border-[#FFD15A]/30 transition-all duration-300">
                  <h3 className="text-lg font-geist font-bold mb-3 text-[#FFD15A]">
                    {faq.question}
                  </h3>
                  <p className="text-[#E8E8E8]/80 font-roboto leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#FFD15A]/10 to-[#02a9f7]/10 border border-[#FFD15A]/20 rounded-2xl p-12">
              <Crown className="w-16 h-16 text-[#FFD15A] mx-auto mb-6" />

              <h2 className="text-3xl md:text-4xl font-geist font-bold mb-6 text-[#E8E8E8]">
                Seja o primeiro a saber
              </h2>

              <p className="text-lg text-[#E8E8E8]/70 font-roboto mb-8 max-w-2xl mx-auto">
                Inscreva-se na newsletter e receba o aviso assim que a área premium abrir —
                com condições especiais para quem acompanha o JavaCodeLab desde o início.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#newsletter">
                  <Button
                    size="lg"
                    className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <Bell className="w-5 h-5 mr-2" />
                    Quero ser avisado
                  </Button>
                </a>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#02a9f7] text-[#02a9f7] hover:bg-[#02a9f7] hover:text-black font-roboto font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Link href="/artigos">
                    Explorar artigos gratuitos
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-[#E8E8E8]/50">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Sem spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Cancele quando quiser</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Conteúdo gratuito já disponível</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PremiumPage
