'use client'

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle, Gift, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { subscribeToNewsletter } from '../utils/newsletter-integration'

const Newsletter = ({ variant = 'default' }) => {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  setMessage('')
  setIsSuccess(false)

  const result = await subscribeToNewsletter(email)

  setIsSubmitting(false)
  setMessage(result.message)
  setIsSuccess(result.success)

  if (result.success) {
    setEmail('') // Limpar o campo se sucesso
  }
}

  // Variante Hero (para homepage)
  if (variant === 'hero') {
    return (
      <div className="bg-gradient-to-br from-[#FFD15A]/10 to-[#02a9f7]/10 border border-[#FFD15A]/20 rounded-2xl p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="w-6 h-6 text-[#FFD15A]" />
            <h3 className="text-2xl font-geist font-bold text-[#E8E8E8]">
              Newsletter JavaCodeLab
            </h3>
            <Star className="w-5 h-5 text-[#FFD15A] fill-current" />
          </div>
          
          <p className="text-lg text-[#E8E8E8]/80 font-roboto mb-4">
            Receba tutoriais exclusivos, dicas de carreira e novidades do mundo Java 
            diretamente no seu email.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#E8E8E8]/70 mb-6">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#02a9f7]" />
              <span>eBook Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FFD15A]" />
              <span>Conteúdo Semanal</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#02a9f7]" />
              <span>Sem Spam</span>
            </div>
          </div>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-green-400 font-roboto font-semibold mb-1">
                Cadastro realizado com sucesso! 🎉
              </p>
              <p className="text-[#E8E8E8]/80 text-sm">
                Verifique seu email para confirmar a inscrição e receber o eBook gratuito.
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-roboto font-semibold mb-1">
                Erro ao cadastrar email
              </p>
              <p className="text-[#E8E8E8]/80 text-sm">
                Tente novamente ou entre em contato conosco.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="flex-1 bg-[#1A1A1B] border-white/20 text-[#E8E8E8] placeholder:text-[#E8E8E8]/40 focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 rounded-xl"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Cadastrando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Cadastrar
                </div>
              )}
            </Button>
          </div>

          <p className="text-xs text-[#E8E8E8]/60 text-center">
            Ao se cadastrar, você concorda com nossa{' '}
            <a href="/politica-privacidade" className="text-[#FFD15A] hover:underline">
              Política de Privacidade
            </a>. Cancele a qualquer momento.
          </p>
        </form>
      </div>
    )
  }

  // Variante Sidebar (para artigos)
  if (variant === 'sidebar') {
    return (
      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
        <div className="text-center mb-4">
          <Mail className="w-8 h-8 text-[#FFD15A] mx-auto mb-3" />
          <h4 className="text-lg font-geist font-bold text-[#E8E8E8] mb-2">
            Newsletter
          </h4>
          <p className="text-sm text-[#E8E8E8]/70 font-roboto">
            Tutoriais exclusivos toda semana
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
            <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <p className="text-green-400 text-sm font-roboto">
              Cadastro realizado!
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
            <AlertCircle className="w-5 h-5 text-red-400 mx-auto mb-1" />
            <p className="text-red-400 text-sm font-roboto">
              Erro ao cadastrar
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
            required
            className="bg-[#1A1A1B] border-white/20 text-[#E8E8E8] placeholder:text-[#E8E8E8]/40 focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 rounded-lg text-sm"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium py-2 rounded-lg text-sm transition-all duration-300"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    )
  }

  // Variante Footer (para rodapé)
  if (variant === 'footer') {
    return (
      <div className="bg-[#1A1A1B]/50 border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg font-geist font-bold text-[#E8E8E8] mb-2">
              Fique por dentro das novidades
            </h4>
            <p className="text-sm text-[#E8E8E8]/70 font-roboto">
              Receba tutoriais, dicas e novidades do JavaCodeLab
            </p>
          </div>

          <div className="flex-1 max-w-md">
            {submitStatus === 'success' && (
              <div className="mb-3 p-2 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                <p className="text-green-400 text-sm font-roboto">
                  ✅ Cadastro realizado com sucesso!
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                <p className="text-red-400 text-sm font-roboto">
                  ❌ Erro ao cadastrar. Tente novamente.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="flex-1 bg-[#1A1A1B] border-white/20 text-[#E8E8E8] placeholder:text-[#E8E8E8]/40 focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 rounded-lg text-sm"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium px-4 py-2 rounded-lg text-sm transition-all duration-300"
              >
                {isSubmitting ? '...' : 'Cadastrar'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Variante Default
  return (
    <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
      <div className="text-center mb-6">
        <Mail className="w-10 h-10 text-[#FFD15A] mx-auto mb-4" />
        <h3 className="text-xl font-geist font-bold text-[#E8E8E8] mb-2">
          Newsletter JavaCodeLab
        </h3>
        <p className="text-[#E8E8E8]/70 font-roboto">
          Receba conteúdo exclusivo sobre Java e Spring Framework
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <p className="text-green-400 font-roboto">
            Cadastro realizado com sucesso! Verifique seu email.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-400 font-roboto">
            Erro ao cadastrar email. Tente novamente.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className="bg-[#1A1A1B] border-white/20 text-[#E8E8E8] placeholder:text-[#E8E8E8]/40 focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 rounded-lg"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold py-3 rounded-lg transition-all duration-300"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              Cadastrando...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Cadastrar na Newsletter
            </div>
          )}
        </Button>
      </form>

      <p className="text-xs text-[#E8E8E8]/60 text-center mt-4">
        Sem spam. Cancele a qualquer momento.
      </p>
    </div>
  )
}

export default Newsletter
