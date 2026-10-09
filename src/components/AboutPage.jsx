import Link from 'next/link'
import { Code2, Users, BookOpen, Award, Coffee, Heart, Target, Zap } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { getAllArticles } from '../data/articles'

async function getTotalViews() {
  try {
    const result = await prisma.articleView.aggregate({ _sum: { count: true } })
    return result._sum.count ?? 0
  } catch {
    return null // DB ainda não configurada
  }
}

const AboutPage = async () => {
  const [totalViews, articles] = await Promise.all([
    getTotalViews(),
    Promise.resolve(getAllArticles()),
  ])

  const stats = [
    {
      icon: BookOpen,
      label: 'Artigos Publicados',
      value: String(articles.length),
    },
    {
      icon: Users,
      label: totalViews !== null ? 'Visualizações Totais' : 'Desenvolvedores Alcançados',
      value: totalViews !== null
        ? totalViews > 0 ? totalViews.toLocaleString('pt-BR') : 'Lançamento!'
        : 'Em breve',
    },
    {
      icon: Award,
      label: 'Anos de Experiência em Java',
      value: '8+',
    },
    {
      icon: Coffee,
      label: 'Xícaras de Café',
      value: '∞',
    },
  ]

  const values = [
    {
      icon: Target,
      title: 'Foco na Prática',
      description:
        'Acreditamos que a melhor forma de aprender programação é colocando a mão na massa. Todos os tutoriais incluem código funcional e exemplos reais de projetos.',
    },
    {
      icon: Heart,
      title: 'Comunidade em Primeiro Lugar',
      description:
        'Vamos construir um espaço onde desenvolvedores poderão crescer juntos, compartilhar conhecimento e se apoiar mutuamente — uma comunidade de referência para devs Java no Brasil.',
    },
    {
      icon: Zap,
      title: 'Conteúdo Sempre Atualizado',
      description:
        'O mundo da tecnologia evolui rapidamente. Nosso compromisso é manter o conteúdo alinhado com as versões mais recentes do Java e as melhores práticas do mercado.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />

      <main className="pt-16">
        {/* Hero */}
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
              Conteúdo técnico de qualidade para desenvolvedores Java que querem
              ir além do básico e construir software de verdade.
            </p>
          </div>
        </section>

        {/* Stats */}
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

        {/* História */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-geist font-bold text-center mb-16">
              Nossa História
            </h2>

            <div className="text-lg font-roboto leading-relaxed space-y-6 text-[#E8E8E8]/80">
              <p>
                A ideia do JavaCodeLab surgiu em 2025 a partir de uma frustração real:
                após anos como desenvolvedor Java sênior, percebi que faltava um espaço
                em português dedicado a conteúdo técnico <em>de verdade</em> — sem
                superficialidade, sem exemplos que não funcionam em produção.
              </p>

              <p>
                Comecei com o que sabia: Spring Boot, JWT, microserviços, JPA. Artigos
                escritos por quem passou horas depurando o mesmo problema que você
                vai enfrentar. A missão ficou clara desde o início:{' '}
                <strong className="text-[#FFD15A]">
                  democratizar o conhecimento avançado em Java para desenvolvedores brasileiros
                </strong>.
              </p>

              <p>
                O JavaCodeLab ainda está começando, mas o objetivo é ambicioso: tornar-se
                a principal referência técnica em Java e Spring Boot para milhares de
                desenvolvedores no Brasil e América Latina. Cada artigo publicado é um
                passo nessa direção.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1B]/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-geist font-bold text-center mb-16">
              Nossos Valores
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-[#1A1A1B] border border-white/10 hover:border-[#FFD15A]/30 transition-all duration-300"
                >
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

        {/* Autor */}
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
                    Com mais de 8 anos de experiência em desenvolvimento Java, Paulo é
                    especialista em Spring Framework, arquitetura de microserviços e APIs
                    REST. Atuou em projetos de grande escala para empresas de tecnologia
                    e fintechs.
                  </p>

                  <p>
                    Apaixonado por ensinar e compartilhar conhecimento, criou o
                    JavaCodeLab para colocar no papel — e no código — tudo o que aprendeu
                    ao longo da carreira, ajudando outros desenvolvedores a evoluírem
                    mais rápido do que ele mesmo pôde.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FFD15A]/10 to-[#02a9f7]/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-geist font-bold mb-6">
              Faça Parte Dessa Jornada
            </h2>

            <p className="text-xl text-[#E8E8E8]/70 font-roboto mb-8">
              O JavaCodeLab está começando — e você pode ser um dos primeiros a acompanhar
              essa construção. Inscreva-se na newsletter e não perca nenhum artigo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium cursor-pointer"
              >
                <Link href="/artigos">
                  Explorar Artigos
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#FFD15A] text-[#FFD15A] hover:bg-[#FFD15A]/10 font-roboto font-medium cursor-pointer"
              >
                <Link href="/#newsletter">
                  Assinar Newsletter
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
