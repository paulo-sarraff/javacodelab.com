import { Link } from 'react-router-dom'
import { Shield, Calendar, Eye, Lock, UserCheck, Database } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFD15A] to-[#02a9f7] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Shield className="w-10 h-10 text-black" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-geist font-bold mb-6">
              Política de{' '}
              <span className="bg-gradient-to-r from-[#FFD15A] to-[#02a9f7] bg-clip-text text-transparent">
                Privacidade
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-[#E8E8E8]/60 font-roboto mb-8">
              <Calendar className="w-5 h-5" />
              <span>Última atualização: 24 de setembro de 2025</span>
            </div>

            <p className="text-lg text-[#E8E8E8]/70 font-roboto leading-relaxed">
              Sua privacidade é fundamental para nós. Esta política explica como coletamos, 
              usamos e protegemos suas informações pessoais em conformidade com a LGPD.
            </p>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-geist font-bold text-center mb-12">
              Resumo da Nossa Política
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-[#1A1A1B] border border-white/10">
                <div className="w-16 h-16 bg-[#FFD15A]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-[#FFD15A]" />
                </div>
                <h3 className="text-lg font-geist font-bold mb-3 text-[#E8E8E8]">
                  Transparência Total
                </h3>
                <p className="text-[#E8E8E8]/70 font-roboto text-sm">
                  Explicamos claramente quais dados coletamos e como os utilizamos.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-[#1A1A1B] border border-white/10">
                <div className="w-16 h-16 bg-[#FFD15A]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-[#FFD15A]" />
                </div>
                <h3 className="text-lg font-geist font-bold mb-3 text-[#E8E8E8]">
                  Segurança Máxima
                </h3>
                <p className="text-[#E8E8E8]/70 font-roboto text-sm">
                  Implementamos medidas técnicas e organizacionais para proteger seus dados.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-[#1A1A1B] border border-white/10">
                <div className="w-16 h-16 bg-[#FFD15A]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-[#FFD15A]" />
                </div>
                <h3 className="text-lg font-geist font-bold mb-3 text-[#E8E8E8]">
                  Seus Direitos
                </h3>
                <p className="text-[#E8E8E8]/70 font-roboto text-sm">
                  Você tem controle total sobre seus dados pessoais e pode exercer seus direitos a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">
              <div className="space-y-12">
                {/* 1. Informações Gerais */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    1. Informações Gerais
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      O JavaCodeLab, acessível através do domínio javacodelab.com, está comprometido 
                      com a proteção da privacidade e dos dados pessoais de seus usuários, em 
                      conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) 
                      e demais legislações aplicáveis.
                    </p>
                    <p>
                      Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e 
                      protegemos suas informações pessoais quando você utiliza nosso site.
                    </p>
                  </div>
                </section>

                {/* 2. Controlador de Dados */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    2. Controlador de Dados
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      O controlador dos dados pessoais coletados através do JavaCodeLab é:
                    </p>
                    <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
                      <ul className="list-none space-y-2">
                        <li><strong className="text-[#E8E8E8]">Nome:</strong> Paulo Sarraff</li>
                        <li><strong className="text-[#E8E8E8]">Site:</strong> javacodelab.com</li>
                        <li><strong className="text-[#E8E8E8]">Email para questões de privacidade:</strong> contato@javacodelab.com</li>
                        <li><strong className="text-[#E8E8E8]">Localização:</strong> Brasil</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 3. Dados Coletados */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    3. Dados Pessoais Coletados
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <h3 className="text-lg font-geist font-semibold text-[#E8E8E8] mt-6 mb-3">
                      3.1. Dados Fornecidos Voluntariamente
                    </h3>
                    <p>Coletamos os seguintes dados quando você os fornece voluntariamente:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong className="text-[#E8E8E8]">Formulário de Contato:</strong> nome, email, assunto e mensagem</li>
                      <li><strong className="text-[#E8E8E8]">Newsletter:</strong> endereço de email</li>
                      <li><strong className="text-[#E8E8E8]">Comentários:</strong> nome, email e conteúdo do comentário (quando disponível)</li>
                    </ul>

                    <h3 className="text-lg font-geist font-semibold text-[#E8E8E8] mt-6 mb-3">
                      3.2. Dados Coletados Automaticamente
                    </h3>
                    <p>Coletamos automaticamente certas informações quando você visita nosso site:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong className="text-[#E8E8E8]">Dados de navegação:</strong> endereço IP, tipo de navegador, sistema operacional</li>
                      <li><strong className="text-[#E8E8E8]">Dados de uso:</strong> páginas visitadas, tempo de permanência, origem do tráfego</li>
                      <li><strong className="text-[#E8E8E8]">Cookies:</strong> identificadores únicos para melhorar sua experiência</li>
                    </ul>

                    <h3 className="text-lg font-geist font-semibold text-[#E8E8E8] mt-6 mb-3">
                      3.3. Dados de Terceiros
                    </h3>
                    <p>Também podemos receber dados através de serviços de terceiros:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong className="text-[#E8E8E8]">Google Analytics:</strong> dados de comportamento e demografia</li>
                      <li><strong className="text-[#E8E8E8]">Google AdSense:</strong> dados para personalização de anúncios</li>
                    </ul>
                  </div>
                </section>

                {/* 4. Finalidades */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    4. Finalidades do Tratamento
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-3">Comunicação</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Responder suas mensagens</li>
                          <li>Enviar newsletter (com consentimento)</li>
                          <li>Notificar sobre atualizações importantes</li>
                        </ul>
                      </div>

                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-3">Melhoria do Site</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Analisar comportamento dos usuários</li>
                          <li>Otimizar conteúdo e funcionalidades</li>
                          <li>Corrigir problemas técnicos</li>
                        </ul>
                      </div>

                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-3">Segurança</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Prevenir fraudes e abusos</li>
                          <li>Proteger contra ataques cibernéticos</li>
                          <li>Manter logs de segurança</li>
                        </ul>
                      </div>

                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-3">Monetização</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Exibir anúncios relevantes</li>
                          <li>Medir efetividade publicitária</li>
                          <li>Personalizar experiência comercial</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 5. Base Legal */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    5. Base Legal para o Tratamento
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>O tratamento de seus dados pessoais é baseado nas seguintes hipóteses legais:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong className="text-[#E8E8E8]">Consentimento:</strong> para newsletter e cookies não essenciais</li>
                      <li><strong className="text-[#E8E8E8]">Legítimo interesse:</strong> para análise de tráfego e melhoria do site</li>
                      <li><strong className="text-[#E8E8E8]">Execução de contrato:</strong> para responder solicitações de contato</li>
                      <li><strong className="text-[#E8E8E8]">Cumprimento de obrigação legal:</strong> quando exigido por lei</li>
                    </ul>
                  </div>
                </section>

                {/* 6. Compartilhamento */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    6. Compartilhamento de Dados
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      Não vendemos, alugamos ou comercializamos seus dados pessoais. Podemos 
                      compartilhar informações apenas nas seguintes situações:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong className="text-[#E8E8E8]">Prestadores de serviços:</strong> Google Analytics, Google AdSense, provedores de hospedagem</li>
                      <li><strong className="text-[#E8E8E8]">Obrigação legal:</strong> quando exigido por autoridades competentes</li>
                      <li><strong className="text-[#E8E8E8]">Proteção de direitos:</strong> para proteger nossos direitos legais ou de terceiros</li>
                    </ul>
                    <p>
                      Todos os terceiros que processam dados em nosso nome são obrigados a 
                      manter o mesmo nível de proteção que aplicamos.
                    </p>
                  </div>
                </section>

                {/* 7. Cookies */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    7. Cookies e Tecnologias Similares
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>Utilizamos diferentes tipos de cookies:</p>
                    
                    <div className="space-y-4">
                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-2">Cookies Essenciais</h4>
                        <p className="text-sm">Necessários para o funcionamento básico do site. Não podem ser desabilitados.</p>
                      </div>

                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-2">Cookies Analíticos</h4>
                        <p className="text-sm">Ajudam-nos a entender como você usa o site para melhorarmos a experiência.</p>
                      </div>

                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-2">Cookies de Publicidade</h4>
                        <p className="text-sm">Utilizados para exibir anúncios relevantes baseados em seus interesses.</p>
                      </div>
                    </div>

                    <p>
                      Você pode gerenciar suas preferências de cookies através das configurações 
                      do seu navegador ou através do nosso banner de cookies.
                    </p>
                  </div>
                </section>

                {/* 8. Retenção */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    8. Retenção de Dados
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong className="text-[#E8E8E8]">Dados de contato:</strong> até 5 anos após o último contato</li>
                      <li><strong className="text-[#E8E8E8]">Newsletter:</strong> até o cancelamento da inscrição</li>
                      <li><strong className="text-[#E8E8E8]">Dados de navegação:</strong> até 26 meses (Google Analytics)</li>
                      <li><strong className="text-[#E8E8E8]">Logs de segurança:</strong> até 6 meses</li>
                    </ul>
                    <p>
                      Após esses períodos, os dados são anonimizados ou excluídos, exceto quando 
                      a retenção for exigida por lei.
                    </p>
                  </div>
                </section>

                {/* 9. Seus Direitos */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    9. Seus Direitos como Titular de Dados
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>De acordo com a LGPD, você possui os seguintes direitos:</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-4">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-2">Acesso</h4>
                        <p className="text-sm">Confirmar a existência e acessar seus dados</p>
                      </div>

                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-4">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-2">Correção</h4>
                        <p className="text-sm">Corrigir dados incompletos ou inexatos</p>
                      </div>

                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-4">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-2">Exclusão</h4>
                        <p className="text-sm">Solicitar a eliminação de dados desnecessários</p>
                      </div>

                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-4">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-2">Portabilidade</h4>
                        <p className="text-sm">Receber seus dados em formato estruturado</p>
                      </div>

                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-4">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-2">Oposição</h4>
                        <p className="text-sm">Opor-se ao tratamento em certas situações</p>
                      </div>

                      <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-4">
                        <h4 className="font-geist font-semibold text-[#FFD15A] mb-2">Revogação</h4>
                        <p className="text-sm">Retirar consentimento a qualquer momento</p>
                      </div>
                    </div>

                    <p>
                      Para exercer seus direitos, entre em contato conosco através do email 
                      contato@javacodelab.com. Responderemos sua solicitação em até 15 dias.
                    </p>
                  </div>
                </section>

                {/* 10. Segurança */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    10. Medidas de Segurança
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>Implementamos medidas técnicas e organizacionais para proteger seus dados:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong className="text-[#E8E8E8]">Criptografia:</strong> HTTPS em todas as páginas</li>
                      <li><strong className="text-[#E8E8E8]">Controle de acesso:</strong> acesso restrito aos dados</li>
                      <li><strong className="text-[#E8E8E8]">Monitoramento:</strong> logs de segurança e detecção de anomalias</li>
                      <li><strong className="text-[#E8E8E8]">Backup:</strong> cópias de segurança regulares</li>
                      <li><strong className="text-[#E8E8E8]">Atualizações:</strong> sistemas sempre atualizados</li>
                    </ul>
                  </div>
                </section>

                {/* 11. Transferência Internacional */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    11. Transferência Internacional de Dados
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      Alguns de nossos prestadores de serviços (como Google) podem processar 
                      dados fora do Brasil. Garantimos que essas transferências atendem aos 
                      requisitos da LGPD e que os dados recebem proteção adequada.
                    </p>
                  </div>
                </section>

                {/* 12. Menores de Idade */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    12. Dados de Menores de Idade
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      Não coletamos intencionalmente dados pessoais de menores de 13 anos. 
                      Se tomarmos conhecimento de que coletamos dados de uma criança menor 
                      de 13 anos, excluiremos essas informações imediatamente.
                    </p>
                    <p>
                      Para menores entre 13 e 18 anos, recomendamos que os pais ou responsáveis 
                      supervisionem o uso do site.
                    </p>
                  </div>
                </section>

                {/* 13. Alterações */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    13. Alterações nesta Política
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      Podemos atualizar esta Política de Privacidade periodicamente. Quando 
                      fizermos alterações significativas, notificaremos você através do site 
                      ou por email (se fornecido).
                    </p>
                    <p>
                      Recomendamos que você revise esta política regularmente para se manter 
                      informado sobre como protegemos seus dados.
                    </p>
                  </div>
                </section>

                {/* 14. Contato */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    14. Contato e Encarregado de Dados
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      Para questões relacionadas a esta Política de Privacidade ou ao tratamento 
                      de seus dados pessoais, entre em contato conosco:
                    </p>
                    <div className="bg-[#1A1A1B] border border-white/10 rounded-xl p-6">
                      <ul className="list-none space-y-2">
                        <li><strong className="text-[#E8E8E8]">Email:</strong> contato@javacodelab.com</li>
                        <li><strong className="text-[#E8E8E8]">Assunto:</strong> "Privacidade e Proteção de Dados"</li>
                        <li><strong className="text-[#E8E8E8]">Página de contato:</strong>{' '}
                          <Link to="/contato" className="text-[#FFD15A] hover:underline">
                            javacodelab.com/contato
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <p>
                      Você também pode registrar uma reclamação junto à Autoridade Nacional 
                      de Proteção de Dados (ANPD) se considerar que seus direitos não foram 
                      adequadamente atendidos.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PrivacyPage
