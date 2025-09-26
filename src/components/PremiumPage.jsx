import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Crown, 
  Star, 
  Download, 
  Video, 
  Code2, 
  BookOpen, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Play,
  FileText,
  Zap,
  Shield,
  Clock,
  Award
} from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { Button } from '@/components/ui/button'

const PremiumPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  const features = [
    {
      icon: Video,
      title: 'Vídeo-aulas Exclusivas',
      description: 'Mais de 50 horas de conteúdo em vídeo com explicações detalhadas e projetos práticos.'
    },
    {
      icon: Code2,
      title: 'Código-fonte Completo',
      description: 'Acesso ao código-fonte de todos os projetos, com comentários detalhados e boas práticas.'
    },
    {
      icon: FileText,
      title: 'eBooks e Guias',
      description: 'Biblioteca exclusiva com eBooks, cheat sheets e guias de referência rápida.'
    },
    {
      icon: Users,
      title: 'Comunidade Privada',
      description: 'Acesso à comunidade exclusiva no Discord com networking e suporte direto.'
    },
    {
      icon: Zap,
      title: 'Conteúdo Antecipado',
      description: 'Receba novos artigos e tutoriais 1 semana antes da publicação pública.'
    },
    {
      icon: Award,
      title: 'Certificados',
      description: 'Certificados de conclusão para projetos e trilhas de aprendizado.'
    }
  ]

  const plans = [
    {
      id: 'monthly',
      name: 'Mensal',
      price: 'R$ 29',
      period: '/mês',
      description: 'Perfeito para começar',
      features: [
        'Acesso completo ao conteúdo premium',
        'Vídeo-aulas exclusivas',
        'Código-fonte dos projetos',
        'Comunidade no Discord',
        'Suporte por email'
      ],
      popular: false
    },
    {
      id: 'yearly',
      name: 'Anual',
      price: 'R$ 290',
      period: '/ano',
      originalPrice: 'R$ 348',
      description: 'Melhor custo-benefício',
      features: [
        'Tudo do plano mensal',
        '2 meses grátis',
        'Mentoria mensal 1:1 (30min)',
        'Acesso vitalício aos eBooks',
        'Certificados de conclusão',
        'Suporte prioritário'
      ],
      popular: true
    },
    {
      id: 'lifetime',
      name: 'Vitalício',
      price: 'R$ 997',
      period: 'pagamento único',
      description: 'Acesso para sempre',
      features: [
        'Tudo dos planos anteriores',
        'Acesso vitalício garantido',
        'Mentoria trimestral 1:1 (1h)',
        'Revisão de código personalizada',
        'Acesso a workshops exclusivos',
        'Suporte VIP no WhatsApp'
      ],
      popular: false
    }
  ]

  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'Desenvolvedor Sênior',
      company: 'Tech Corp',
      content: 'O conteúdo premium do JavaCodeLab me ajudou a conseguir uma promoção. Os projetos práticos são excelentes!',
      avatar: '👨‍💻'
    },
    {
      name: 'Ana Santos',
      role: 'Tech Lead',
      company: 'StartupXYZ',
      content: 'A comunidade é incrível e o Paulo sempre responde as dúvidas rapidamente. Vale cada centavo!',
      avatar: '👩‍💻'
    },
    {
      name: 'João Oliveira',
      role: 'Desenvolvedor Júnior',
      company: 'DevCompany',
      content: 'Saí do zero para conseguir meu primeiro emprego como dev Java. O conteúdo é muito didático.',
      avatar: '🧑‍💻'
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
        'Do Zero ao Spring Boot Expert (40h)',
        'Microserviços na Prática (25h)',
        'Testes Automatizados com JUnit e Mockito (15h)',
        'Deploy e DevOps para Desenvolvedores Java (20h)'
      ]
    },
    {
      category: 'Recursos Exclusivos',
      items: [
        'Templates de Projeto Prontos',
        'Cheat Sheets de Spring Framework',
        'Guia de Boas Práticas em Java',
        'Roadmap Personalizado de Carreira'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD15A]/5 via-transparent to-[#02a9f7]/5" />
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFD15A]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#02a9f7]/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-6xl mx-auto text-center">
            {/* Premium Badge */}
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
              <Button 
                size="lg"
                className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              >
                <Crown className="w-5 h-5 mr-2" />
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-[#02a9f7] text-[#02a9f7] hover:bg-[#02a9f7] hover:text-black font-roboto font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById('content').scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Conteúdo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-geist font-bold text-[#FFD15A] mb-2">100+</div>
                <div className="text-[#E8E8E8]/60 font-roboto text-sm">Horas de Conteúdo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-geist font-bold text-[#02a9f7] mb-2">500+</div>
                <div className="text-[#E8E8E8]/60 font-roboto text-sm">Membros Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-geist font-bold text-[#FFD15A] mb-2">20+</div>
                <div className="text-[#E8E8E8]/60 font-roboto text-sm">Projetos Práticos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-geist font-bold text-[#02a9f7] mb-2">95%</div>
                <div className="text-[#E8E8E8]/60 font-roboto text-sm">Satisfação</div>
              </div>
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
                Conteúdo premium desenvolvido especialmente para acelerar seu crescimento profissional
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
                Conteúdo Exclusivo
              </h2>
              <p className="text-lg text-[#E8E8E8]/70 font-roboto max-w-2xl mx-auto">
                Projetos reais, trilhas estruturadas e recursos que você não encontra em lugar nenhum
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

        {/* Testimonials */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1B]/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-geist font-bold mb-4">
                O que nossos membros dizem
              </h2>
              <p className="text-lg text-[#E8E8E8]/70 font-roboto">
                Histórias reais de desenvolvedores que transformaram suas carreiras
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-[#1A1A1B] border border-white/10 rounded-2xl p-6 hover:border-[#FFD15A]/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFD15A]/20 to-[#02a9f7]/20 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-geist font-bold text-[#E8E8E8]">{testimonial.name}</h4>
                      <p className="text-sm text-[#E8E8E8]/60">{testimonial.role} • {testimonial.company}</p>
                    </div>
                  </div>
                  
                  <p className="text-[#E8E8E8]/80 font-roboto text-sm leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FFD15A] fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-geist font-bold mb-4">
                Escolha seu Plano
              </h2>
              <p className="text-lg text-[#E8E8E8]/70 font-roboto">
                Investimento que se paga em poucos meses com o crescimento da sua carreira
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`relative bg-[#1A1A1B] border rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                    plan.popular 
                      ? 'border-[#FFD15A] shadow-lg shadow-[#FFD15A]/20' 
                      : 'border-white/10 hover:border-[#FFD15A]/30'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#FFD15A] text-black px-4 py-1 rounded-full text-sm font-roboto font-bold">
                        Mais Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-xl font-geist font-bold mb-2 text-[#E8E8E8]">
                      {plan.name}
                    </h3>
                    <p className="text-[#E8E8E8]/60 font-roboto text-sm mb-4">
                      {plan.description}
                    </p>
                    
                    <div className="mb-4">
                      {plan.originalPrice && (
                        <div className="text-[#E8E8E8]/40 font-roboto text-sm line-through">
                          {plan.originalPrice}
                        </div>
                      )}
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-geist font-bold text-[#FFD15A]">
                          {plan.price}
                        </span>
                        <span className="text-[#E8E8E8]/60 font-roboto text-sm">
                          {plan.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#02a9f7] flex-shrink-0 mt-0.5" />
                        <span className="text-[#E8E8E8]/80 font-roboto text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full py-3 rounded-xl font-roboto font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90'
                        : 'bg-[#02a9f7] text-white hover:bg-[#02a9f7]/90'
                    }`}
                  >
                    Começar Agora
                  </Button>
                </div>
              ))}
            </div>

            {/* Guarantee */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FFD15A]/10 to-[#02a9f7]/10 border border-[#FFD15A]/20 rounded-full">
                <Shield className="w-5 h-5 text-[#FFD15A]" />
                <span className="font-roboto font-medium text-[#E8E8E8]">
                  Garantia de 30 dias ou seu dinheiro de volta
                </span>
              </div>
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
              {[
                {
                  question: 'O conteúdo é adequado para iniciantes?',
                  answer: 'Sim! Temos trilhas específicas para diferentes níveis, desde iniciantes até desenvolvedores experientes. Cada projeto inclui explicações detalhadas e pré-requisitos claros.'
                },
                {
                  question: 'Posso cancelar a qualquer momento?',
                  answer: 'Claro! Você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento e você manterá acesso até o final do período pago.'
                },
                {
                  question: 'Como funciona a mentoria?',
                  answer: 'A mentoria é feita via videochamada agendada. Discutimos sua carreira, revisamos código, tiramos dúvidas e definimos próximos passos. É personalizada para suas necessidades.'
                },
                {
                  question: 'O conteúdo é atualizado regularmente?',
                  answer: 'Sim! Adicionamos novo conteúdo mensalmente e atualizamos projetos existentes conforme novas versões do Java e Spring são lançadas.'
                }
              ].map((faq, index) => (
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
                Pronto para acelerar sua carreira?
              </h2>
              
              <p className="text-lg text-[#E8E8E8]/70 font-roboto mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de desenvolvedores que já transformaram suas carreiras 
                com nosso conteúdo premium.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-8 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Começar Agora
                </Button>

                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#02a9f7] text-[#02a9f7] hover:bg-[#02a9f7] hover:text-black font-roboto font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105"
                >
                  <Link to="/contato">
                    Falar Conosco
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-[#E8E8E8]/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Acesso imediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Garantia 30 dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>500+ membros</span>
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
