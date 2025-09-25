import { Link } from 'react-router-dom'
import { FileText, Calendar, AlertTriangle } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFD15A] to-[#02a9f7] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <FileText className="w-10 h-10 text-black" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-geist font-bold mb-6">
              Termos de{' '}
              <span className="bg-gradient-to-r from-[#FFD15A] to-[#02a9f7] bg-clip-text text-transparent">
                Uso
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-[#E8E8E8]/60 font-roboto">
              <Calendar className="w-5 h-5" />
              <span>Última atualização: 24 de setembro de 2025</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#FFD15A]/10 border border-[#FFD15A]/20 rounded-xl p-6 mb-12">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-[#FFD15A] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-geist font-bold text-[#FFD15A] mb-2">Importante</h3>
                  <p className="text-[#E8E8E8]/80 font-roboto">
                    Ao acessar e usar o site JavaCodeLab, você concorda com estes Termos de Uso. 
                    Se não concordar com algum termo, não utilize nossos serviços.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="space-y-12">
                {/* 1. Definições */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    1. Definições
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      Para os fins destes Termos de Uso, consideram-se as seguintes definições:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong className="text-[#E8E8E8]">"Site"</strong>: refere-se ao website JavaCodeLab, acessível através do domínio javacodelab.com</li>
                      <li><strong className="text-[#E8E8E8]">"Usuário"</strong>: qualquer pessoa física que acesse ou utilize o Site</li>
                      <li><strong className="text-[#E8E8E8]">"Conteúdo"</strong>: todos os artigos, tutoriais, códigos, imagens e demais materiais disponibilizados no Site</li>
                      <li><strong className="text-[#E8E8E8]">"Serviços"</strong>: todas as funcionalidades oferecidas pelo Site, incluindo leitura de artigos, newsletter e formulário de contato</li>
                    </ul>
                  </div>
                </section>

                {/* 2. Aceitação dos Termos */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    2. Aceitação dos Termos
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      Ao acessar e navegar no Site, o Usuário declara ter lido, compreendido e aceito 
                      integralmente estes Termos de Uso, bem como nossa Política de Privacidade.
                    </p>
                    <p>
                      Estes termos constituem um acordo legal entre o Usuário e o JavaCodeLab. 
                      Caso não concorde com qualquer disposição, o Usuário deve cessar imediatamente 
                      o uso do Site.
                    </p>
                  </div>
                </section>

                {/* 3. Uso do Site */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    3. Uso do Site
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      O Site destina-se exclusivamente ao uso pessoal e educacional. O Usuário compromete-se a:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Utilizar o Site de forma legal e ética</li>
                      <li>Não reproduzir, distribuir ou modificar o Conteúdo sem autorização expressa</li>
                      <li>Não utilizar o Site para fins comerciais sem permissão</li>
                      <li>Não tentar acessar áreas restritas ou comprometer a segurança do Site</li>
                      <li>Fornecer informações verdadeiras ao utilizar formulários de contato</li>
                    </ul>
                  </div>
                </section>

                {/* 4. Propriedade Intelectual */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    4. Propriedade Intelectual
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      Todo o Conteúdo disponibilizado no Site, incluindo textos, códigos, imagens, 
                      logotipos e design, é protegido por direitos autorais e propriedade intelectual, 
                      sendo de titularidade do JavaCodeLab ou de terceiros licenciadores.
                    </p>
                    <p>
                      É permitido ao Usuário:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Visualizar e ler o Conteúdo para fins educacionais</li>
                      <li>Compartilhar links para artigos específicos</li>
                      <li>Utilizar trechos de código em projetos pessoais, respeitando as licenças aplicáveis</li>
                    </ul>
                    <p>
                      É vedado ao Usuário:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Reproduzir integralmente artigos sem autorização</li>
                      <li>Remover créditos ou indicações de autoria</li>
                      <li>Utilizar o Conteúdo para fins comerciais sem licença</li>
                    </ul>
                  </div>
                </section>

                {/* 5. Responsabilidades */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    5. Responsabilidades
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <h3 className="text-lg font-geist font-semibold text-[#E8E8E8] mt-6 mb-3">
                      5.1. Do JavaCodeLab
                    </h3>
                    <p>
                      O JavaCodeLab compromete-se a manter o Site funcionando adequadamente, 
                      fornecendo Conteúdo de qualidade e atualizando informações regularmente. 
                      Contudo, não garantimos disponibilidade ininterrupta do Site.
                    </p>
                    
                    <h3 className="text-lg font-geist font-semibold text-[#E8E8E8] mt-6 mb-3">
                      5.2. Do Usuário
                    </h3>
                    <p>
                      O Usuário é responsável por manter a confidencialidade de suas informações 
                      pessoais e por todos os atos praticados durante o uso do Site. O Usuário 
                      também é responsável por manter seus dispositivos seguros e atualizados.
                    </p>
                  </div>
                </section>

                {/* 6. Limitação de Responsabilidade */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    6. Limitação de Responsabilidade
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      O JavaCodeLab não se responsabiliza por:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Danos diretos ou indiretos decorrentes do uso do Site</li>
                      <li>Interrupções temporárias no funcionamento do Site</li>
                      <li>Ações de terceiros que possam afetar o Site</li>
                      <li>Resultados obtidos através da aplicação do Conteúdo disponibilizado</li>
                      <li>Decisões tomadas com base nas informações do Site</li>
                    </ul>
                    <p>
                      O Conteúdo é fornecido "como está", sem garantias de qualquer natureza. 
                      Recomendamos sempre validar informações técnicas em ambiente de teste 
                      antes da implementação em produção.
                    </p>
                  </div>
                </section>

                {/* 7. Privacidade */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    7. Privacidade e Proteção de Dados
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      A coleta, uso e proteção de dados pessoais são regidos por nossa{' '}
                      <Link to="/politica-privacidade" className="text-[#FFD15A] hover:underline">
                        Política de Privacidade
                      </Link>, que está em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                    </p>
                    <p>
                      Ao utilizar o Site, o Usuário consente com o tratamento de seus dados 
                      conforme descrito na Política de Privacidade.
                    </p>
                  </div>
                </section>

                {/* 8. Cookies e Tecnologias Similares */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    8. Cookies e Tecnologias Similares
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      O Site utiliza cookies e tecnologias similares para melhorar a experiência 
                      do Usuário, analisar o tráfego e personalizar conteúdo. Utilizamos:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong className="text-[#E8E8E8]">Cookies essenciais</strong>: necessários para o funcionamento básico do Site</li>
                      <li><strong className="text-[#E8E8E8]">Cookies analíticos</strong>: para compreender como os Usuários interagem com o Site</li>
                      <li><strong className="text-[#E8E8E8]">Cookies de publicidade</strong>: para exibir anúncios relevantes (Google AdSense)</li>
                    </ul>
                    <p>
                      O Usuário pode gerenciar suas preferências de cookies através das 
                      configurações do navegador.
                    </p>
                  </div>
                </section>

                {/* 9. Modificações */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    9. Modificações dos Termos
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      O JavaCodeLab reserva-se o direito de modificar estes Termos de Uso a 
                      qualquer momento. As alterações entrarão em vigor imediatamente após 
                      sua publicação no Site.
                    </p>
                    <p>
                      É responsabilidade do Usuário verificar periodicamente os Termos de Uso. 
                      O uso continuado do Site após modificações constitui aceitação dos novos termos.
                    </p>
                  </div>
                </section>

                {/* 10. Rescisão */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    10. Rescisão
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      O JavaCodeLab pode, a seu exclusivo critério, suspender ou encerrar 
                      o acesso de qualquer Usuário que viole estes Termos de Uso, sem 
                      aviso prévio e sem direito a indenização.
                    </p>
                    <p>
                      O Usuário pode cessar o uso do Site a qualquer momento, sendo que 
                      as disposições destes Termos que, por sua natureza, devem sobreviver 
                      à rescisão, permanecerão em vigor.
                    </p>
                  </div>
                </section>

                {/* 11. Lei Aplicável */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    11. Lei Aplicável e Foro
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. 
                      Qualquer controvérsia decorrente destes Termos será submetida ao foro da 
                      comarca de São Paulo/SP, com exclusão de qualquer outro, por mais privilegiado que seja.
                    </p>
                  </div>
                </section>

                {/* 12. Contato */}
                <section>
                  <h2 className="text-2xl font-geist font-bold text-[#FFD15A] mb-6">
                    12. Contato
                  </h2>
                  <div className="text-[#E8E8E8]/80 font-roboto leading-relaxed space-y-4">
                    <p>
                      Para esclarecimentos sobre estes Termos de Uso, entre em contato conosco:
                    </p>
                    <ul className="list-none space-y-2">
                      <li><strong className="text-[#E8E8E8]">Email:</strong> contato@javacodelab.com</li>
                      <li><strong className="text-[#E8E8E8]">Site:</strong> javacodelab.com</li>
                      <li><strong className="text-[#E8E8E8]">Página de contato:</strong>{' '}
                        <Link to="/contato" className="text-[#FFD15A] hover:underline">
                          javacodelab.com/contato
                        </Link>
                      </li>
                    </ul>
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

export default TermsPage
