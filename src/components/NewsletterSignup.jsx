import { useState } from 'react'
import { Mail, CheckCircle, ArrowRight, Gift, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const benefits = [
    {
      icon: Mail,
      title: "Artigos Exclusivos",
      description: "Receba tutoriais avançados que não publicamos no blog"
    },
    {
      icon: Gift,
      title: "E-books Gratuitos",
      description: "Downloads exclusivos sobre Spring Boot e Java"
    },
    {
      icon: Zap,
      title: "Dicas Semanais",
      description: "Tips rápidos para melhorar seu código Java"
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  if (isSubscribed) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FFD15A]/5 to-[#02a9f7]/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#2A2A2B] rounded-2xl border border-[#FFD15A]/20 p-12">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            
            <h3 className="text-2xl font-geist font-bold text-[#E8E8E8] mb-4">
              🎉 Bem-vindo ao JavaCodeLab!
            </h3>
            
            <p className="text-[#E8E8E8]/70 font-roboto mb-6">
              Obrigado por se inscrever! Verifique seu e-mail para confirmar a inscrição 
              e receber seu primeiro e-book gratuito sobre Spring Boot.
            </p>

            <Button 
              onClick={() => setIsSubscribed(false)}
              variant="outline"
              className="border-[#FFD15A] text-[#FFD15A] hover:bg-[#FFD15A] hover:text-black font-roboto"
            >
              Inscrever outro e-mail
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FFD15A]/5 to-[#02a9f7]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#FFD15A]/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#FFD15A]" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-geist font-bold text-[#E8E8E8]">
                  Newsletter JavaCodeLab
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="w-4 h-4 text-[#FFD15A]" />
                  <span className="text-sm text-[#E8E8E8]/60 font-roboto">
                    +12.000 desenvolvedores já se inscreveram
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xl text-[#E8E8E8]/80 font-roboto mb-8 leading-relaxed">
              Receba conteúdo exclusivo, dicas avançadas e recursos gratuitos 
              para acelerar sua carreira como desenvolvedor Java.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#2A2A2B] rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-[#FFD15A]" />
                    </div>
                    <div>
                      <h3 className="font-geist font-semibold text-[#E8E8E8] mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-[#E8E8E8]/70 font-roboto text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-[#E8E8E8]/60 font-roboto">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Sem spam, prometido</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Conteúdo de qualidade</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div>
            <div className="bg-[#2A2A2B] rounded-2xl border border-white/10 p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-geist font-bold text-[#E8E8E8] mb-2">
                  Comece agora mesmo!
                </h3>
                <p className="text-[#E8E8E8]/70 font-roboto">
                  Insira seu e-mail e receba nosso e-book gratuito
                </p>
              </div>

              {/* Free Ebook Preview */}
              <div className="bg-gradient-to-r from-[#FFD15A]/10 to-[#02a9f7]/10 rounded-lg p-4 mb-6 border border-[#FFD15A]/20">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📚</div>
                  <div>
                    <h4 className="font-geist font-semibold text-[#E8E8E8] text-sm">
                      E-book Gratuito
                    </h4>
                    <p className="text-xs text-[#E8E8E8]/70 font-roboto">
                      "Spring Boot: 50 Dicas Essenciais"
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-[#FFD15A] text-black px-2 py-1 rounded text-xs font-roboto font-bold">
                      GRÁTIS
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#1A1A1B] border-white/20 text-[#E8E8E8] placeholder:text-[#E8E8E8]/50 focus:border-[#FFD15A] h-12"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold h-12 group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                      Inscrevendo...
                    </div>
                  ) : (
                    <>
                      Quero receber o e-book gratuito
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-[#E8E8E8]/50 font-roboto mt-4 text-center">
                Ao se inscrever, você concorda com nossa política de privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup
