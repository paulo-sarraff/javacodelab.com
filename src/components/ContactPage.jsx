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
      // Aqui você implementará a lógica de envio de email
      // Vou fornecer múltiplas opções no tutorial
      
      // Simulação de envio (remova esta parte quando implementar o envio real)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Para implementação real, descomente uma das opções abaixo:
      
      // OPÇÃO 1: EmailJS (Mais simples)
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY')
      
      // OPÇÃO 2: API própria
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // if (!response.ok) throw new Error('Erro no envio')
      
      // OPÇÃO 3: Formspree
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // if (!response.ok) throw new Error('Erro no envio')

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
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

        {/* Contact Info */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-[#1A1A1B] border border-white/10">
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

            <div className="bg-[#1A1A1B] border border-white/10 rounded-2xl p-8">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-green-400 font-roboto">
                    Mensagem enviada com sucesso! Responderemos em breve.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400 font-roboto">
                    Erro ao enviar mensagem. Tente novamente ou envie um email diretamente.
                  </p>
                </div>
              )}

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
                      className="bg-[#1A1A1B] border-white/20 text-[#E8E8E8] focus:border-[#FFD15A] focus:ring-[#FFD15A]/20"
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
                      className="bg-[#1A1A1B] border-white/20 text-[#E8E8E8] focus:border-[#FFD15A] focus:ring-[#FFD15A]/20"
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
                    className="w-full px-3 py-2 bg-[#1A1A1B] border border-white/20 rounded-md text-[#E8E8E8] focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 focus:outline-none"
                  >
                    <option value="">Selecione um assunto</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
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
                    className="w-full px-3 py-2 bg-[#1A1A1B] border border-white/20 rounded-md text-[#E8E8E8] focus:border-[#FFD15A] focus:ring-[#FFD15A]/20 focus:outline-none resize-none"
                    placeholder="Descreva sua dúvida, sugestão ou mensagem..."
                  />
                </div>

                <div className="text-sm text-[#E8E8E8]/60 font-roboto">
                  * Campos obrigatórios. Ao enviar este formulário, você concorda com nossa{' '}
                  <Link to="/politica-privacidade" className="text-[#FFD15A] hover:underline">
                    Política de Privacidade
                  </Link>.
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
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
              <div className="p-6 bg-[#1A1A1B] border border-white/10 rounded-xl">
                <h3 className="text-lg font-geist font-bold mb-3 text-[#FFD15A]">
                  Quanto tempo leva para receber uma resposta?
                </h3>
                <p className="text-[#E8E8E8]/80 font-roboto">
                  Normalmente respondemos em até 24 horas durante dias úteis. Para questões urgentes, 
                  envie um email diretamente para contato@javacodelab.com.
                </p>
              </div>

              <div className="p-6 bg-[#1A1A1B] border border-white/10 rounded-xl">
                <h3 className="text-lg font-geist font-bold mb-3 text-[#FFD15A]">
                  Posso sugerir tópicos para novos artigos?
                </h3>
                <p className="text-[#E8E8E8]/80 font-roboto">
                  Claro! Adoramos receber sugestões da nossa comunidade. Use o assunto "Sugestão de conteúdo" 
                  e descreva detalhadamente o que gostaria de ver no JavaCodeLab.
                </p>
              </div>

              <div className="p-6 bg-[#1A1A1B] border border-white/10 rounded-xl">
                <h3 className="text-lg font-geist font-bold mb-3 text-[#FFD15A]">
                  Vocês oferecem consultoria ou mentoria?
                </h3>
                <p className="text-[#E8E8E8]/80 font-roboto">
                  Sim! Entre em contato usando o assunto "Parceria/Colaboração" e descreva suas necessidades. 
                  Oferecemos serviços de consultoria e mentoria para desenvolvedores e empresas.
                </p>
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
