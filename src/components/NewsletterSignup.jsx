'use client'

import { useState } from 'react'
import { Mail, CheckCircle, ArrowRight, Gift, Users, Zap, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { subscribeToNewsletter } from '../utils/newsletter-integration'
import { trackEvent, events } from '@/lib/analytics'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const benefits = [
    {
      icon: Mail,
      title: 'Artigos Exclusivos',
      description: 'Receba tutoriais avançados que não publicamos no blog',
    },
    {
      icon: Gift,
      title: 'Recursos Gratuitos',
      description: 'Cheat sheets e guias sobre Spring Boot e Java',
    },
    {
      icon: Zap,
      title: 'Dicas Semanais',
      description: 'Tips rápidos para melhorar seu código Java',
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    const result = await subscribeToNewsletter(email)

    setIsLoading(false)
    setMessage(result.message)
    setIsSuccess(result.success)

    if (result.success) {
      trackEvent(events.NEWSLETTER_SIGNUP, { source: 'newsletter_section' })
      setEmail('')
    } else {
      trackEvent(events.NEWSLETTER_ERROR, { source: 'newsletter_section' })
    }
  }

  return (
    <section id="newsletter" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FFD15A]/5 to-[#02a9f7]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
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
                    Conteúdo exclusivo para devs Java
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xl text-[#E8E8E8]/80 font-roboto mb-8 leading-relaxed">
              Receba conteúdo exclusivo, dicas avançadas e recursos gratuitos
              para acelerar sua carreira como desenvolvedor Java.
            </p>

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

            <div className="flex flex-wrap gap-6 text-sm text-[#E8E8E8]/60 font-roboto">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Sem spam, prometido</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <div className="bg-[#2A2A2B] rounded-2xl border border-white/10 p-8">
              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-geist font-bold text-[#E8E8E8] mb-2">
                    Inscrição confirmada! 🎉
                  </h3>
                  <p className="text-[#E8E8E8]/70 font-roboto text-sm mb-6">
                    {message}
                  </p>
                  <button
                    onClick={() => { setIsSuccess(false); setMessage('') }}
                    className="text-sm text-[#FFD15A] hover:underline font-roboto cursor-pointer"
                  >
                    Inscrever outro e-mail
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-geist font-bold text-[#E8E8E8] mb-2">
                      Comece agora mesmo!
                    </h3>
                    <p className="text-[#E8E8E8]/70 font-roboto text-sm">
                      Insira seu e-mail e fique por dentro das novidades
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#1A1A1B] border-white/20 text-[#E8E8E8] placeholder:text-[#E8E8E8]/50 focus:border-[#FFD15A] h-12"
                      required
                      disabled={isLoading}
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold h-12 group cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          Inscrevendo...
                        </div>
                      ) : (
                        <>
                          Inscrever-se gratuitamente
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </Button>
                  </form>

                  {message && !isSuccess && (
                    <div className="mt-4 flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-400 font-roboto">{message}</p>
                    </div>
                  )}

                  <p className="text-xs text-[#E8E8E8]/50 font-roboto mt-4 text-center">
                    Ao se inscrever, você concorda com nossa{' '}
                    <a href="/politica-privacidade" className="underline hover:text-[#FFD15A] cursor-pointer">
                      política de privacidade
                    </a>
                    .
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup
