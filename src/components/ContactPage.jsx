import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // OPÇÃO 1: EmailJS (Recomendada - Mais Simples)
      // Descomente e configure com seus IDs do EmailJS
      /*
      const emailjs = (await import('@emailjs/browser')).default
      
      await emailjs.send(
        'SEU_SERVICE_ID',      // Ex: 'service_abc123'
        'SEU_TEMPLATE_ID',     // Ex: 'template_xyz789'
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'contato@javacodelab.com'
        },
        'SUA_PUBLIC_KEY'       // Ex: 'user_def456'
      )
      */

      // OPÇÃO 2: Formspree (Alternativa Simples)
      // Descomente e substitua YOUR_FORM_ID pelo ID do Formspree
      /*
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem')
      }
      */

      // OPÇÃO 3: Backend Próprio (Vercel Functions)
      // Descomente para usar a API que criamos
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar mensagem')
      }

      // Sucesso
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Scroll para o topo para mostrar a mensagem de sucesso
      window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contato@javacodelab.com',
      description: 'Resposta em até 24 horas'
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      value: 'Segunda a Sexta',
      description: '9h às 18h (Horário de Brasília)'
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'Brasil',
      description: 'Atendimento remoto'
    }
  ]

  const subjects = [
    'Dúvida sobre artigo',
    'Sugestão de conteúdo',
    'Parceria/Colaboração',
    'Problema técnico',
    'Feedback geral',
    'Outro'
  ]

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFD15A] to-[#02a9f7] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Mail className="w-10 h-10 text-black" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-geist font-bold mb-6">
              Entre em{' '}
              <span className="bg-gradient-to-r from-[#FFD15A] to-[#02a9f7] bg-clip-text text-transparent">
                Contato
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#E8E8E8]/70 font-roboto mb-8 leading-relaxed">
              Tem alguma dúvida, sugestão ou quer colaborar conosco? 
              Adoraríamos ouvir de você!
            </p>
          </div>
        </section>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <section className="px-4 sm:px-6 lg:px-8 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center gap-4 animate-fade-in">
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-geist font-bold text-green-400 mb-2">Mensagem Enviada com Sucesso! ✅</h3>
                  <p className="text-[#E8E8E8]/80 font-roboto">
                    Obrigado por entrar em contato! Recebemos sua mensagem e responderemos em breve. 
                    Você também receberá um email de confirmação.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {submitStatus === 'error' && (
          <section className="px-4 sm:px-6 lg:px-8 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-center gap-4 animate-fade-in">
                <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="font-geist font-bold text-red-400 mb-2">Erro ao Enviar Mensagem ❌</h3>
                  <p className="text-[#E8E8E8]/80 font-roboto">
                    Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou 
                    envie um email diretamente para{' '}
                    <a href="mailto:contato@javacodelab.com" className="text-[#FFD15A] hover:underline">
                      contato@javacodelab.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Info */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-[#1A1A1B] border border-white/10 hover:border-[#FFD15A]/30 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 bg-[#FFD15A]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-[#FFD15A]" />
                  </div>
                  
                  <h3 className="text-lg font-geist font-bold mb-2 text-[#E8E8E8]">
                    {info.title}
                  </h3>
                  
                  <p className="text-[#FFD15A] font-roboto font-medium mb-1">
                    {info.value}
                  </p>
                  
                  <p className="text-[#E8E8E8]/60 font-roboto text-sm">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-geist font-bold mb-4">
                Envie sua Mensagem
              </h2>
              <p className="text-lg text-[#E8E8E8]/70 font-roboto">
                Preencha o formulário abaixo e responderemos o mais breve possível.
              </p>
            </div>

            <div className="bg-[#1A1A1B] border border-white/10 rounded-2xl p-8 hover:border-[#FFD15A]/20 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-roboto font-medium text-[#E8E8E8] mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-[#1A1A1B] border-white/20 text-[#E8E8E8] focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 rounded-xl transition-all duration-300"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-roboto font-medium text-[#E8E8E8] mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-[#1A1A1B] border-white/20 text-[#E8E8E8] focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 rounded-xl transition-all duration-300"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-roboto font-medium text-[#E8E8E8] mb-2">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#1A1A1B] border border-white/20 rounded-xl text-[#E8E8E8] focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 focus:outline-none transition-all duration-300"
                  >
                    <option value="">Selecione um assunto</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject} className="bg-[#1A1A1B]">
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-roboto font-medium text-[#E8E8E8] mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#1A1A1B] border border-white/20 rounded-xl text-[#E8E8E8] focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 focus:outline-none resize-none transition-all duration-300"
                    placeholder="Descreva sua dúvida, sugestão ou mensagem..."
                  />
                </div>

                <div className="text-sm text-[#E8E8E8]/60 font-roboto">
                  * Campos obrigatórios. Ao enviar este formulário, você concorda com nossa{' '}
                  <Link to="/politica-privacidade" className="text-[#FFD15A] hover:underline transition-colors">
                    Política de Privacidade
                  </Link>.
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Enviar Mensagem
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1B]/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-geist font-bold text-center mb-12">
              Perguntas Frequentes
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-[#1A1A1B] border border-white/10 rounded-xl hover:border-[#FFD15A]/30 transition-all duration-300">
                <h3 className="text-lg font-geist font-bold mb-3 text-[#FFD15A]">
                  Quanto tempo leva para receber uma resposta?
                </h3>
                <p className="text-[#E8E8E8]/80 font-roboto">
                  Normalmente respondemos em até 24 horas durante dias úteis. Para questões urgentes, 
                  envie um email diretamente para{' '}
                  <a href="mailto:contato@javacodelab.com" className="text-[#FFD15A] hover:underline">
                    contato@javacodelab.com
                  </a>.
                </p>
              </div>

              <div className="p-6 bg-[#1A1A1B] border border-white/10 rounded-xl hover:border-[#FFD15A]/30 transition-all duration-300">
                <h3 className="text-lg font-geist font-bold mb-3 text-[#FFD15A]">
                  Posso sugerir tópicos para novos artigos?
                </h3>
                <p className="text-[#E8E8E8]/80 font-roboto">
                  Claro! Adoramos receber sugestões da nossa comunidade. Use o assunto "Sugestão de conteúdo" 
                  e descreva detalhadamente o que gostaria de ver no JavaCodeLab.
                </p>
              </div>

              <div className="p-6 bg-[#1A1A1B] border border-white/10 rounded-xl hover:border-[#FFD15A]/30 transition-all duration-300">
                <h3 className="text-lg font-geist font-bold mb-3 text-[#FFD15A]">
                  Vocês oferecem consultoria ou mentoria?
                </h3>
                <p className="text-[#E8E8E8]/80 font-roboto">
                  Sim! Entre em contato usando o assunto "Parceria/Colaboração" e descreva suas necessidades. 
                  Oferecemos serviços de consultoria e mentoria para desenvolvedores e empresas.
                </p>
              </div>

              <div className="p-6 bg-[#1A1A1B] border border-white/10 rounded-xl hover:border-[#FFD15A]/30 transition-all duration-300">
                <h3 className="text-lg font-geist font-bold mb-3 text-[#FFD15A]">
                  Como posso contribuir com conteúdo?
                </h3>
                <p className="text-[#E8E8E8]/80 font-roboto">
                  Temos um programa de guest posts! Envie sua proposta usando o assunto "Parceria/Colaboração" 
                  com detalhes sobre o artigo que gostaria de escrever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#FFD15A]/10 to-[#02a9f7]/10 border border-[#FFD15A]/20 rounded-2xl p-8">
              <h2 className="text-2xl md:text-3xl font-geist font-bold mb-4 text-[#E8E8E8]">
                Não encontrou o que procurava?
              </h2>
              <p className="text-lg text-[#E8E8E8]/70 font-roboto mb-6">
                Explore nosso conteúdo ou entre em contato diretamente
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 rounded-xl">
                  <Link to="/">
                    Explorar Artigos
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-[#02a9f7] text-[#02a9f7] hover:bg-[#02a9f7] hover:text-black rounded-xl">
                  <a href="mailto:contato@javacodelab.com">
                    Email Direto
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage
