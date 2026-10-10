# JavaCodeLab — Roadmap de Lançamento

> Objetivo: lançar o blog com qualidade, crescer audiência e só então monetizar.
> Estratégia: **conteúdo primeiro → comunidade → monetização**.

---

## Fase 1 — Blog Funcional (Lançamento) `[FOCO ATUAL]`

> Meta: blog publicável, com conteúdo real, navegação fluida e base técnica sólida.

### 1.1 Conteúdo

- [x] Escrever os 7 artigos restantes
  - [x] `clean-code-java-principios-praticas`
  - [x] `java-25-novidades-desenvolvedores` *(atualizado de Java 21 → Java 25)*
  - [x] `microservicos-spring-boot-guia-completo`
  - [x] `spring-data-jpa-otimizacoes-performance`
  - [x] `testes-unitarios-java-junit5-pratica`
  - [x] `docker-desenvolvedores-java-deploy`
  - [x] `preparar-entrevistas-java-senior`
- [x] Categorias e tags definidas em `src/data/articles.js`
- [x] Página de listagem `/artigos` com filtro por categoria e busca

### 1.2 Renderização MDX `[EM ANDAMENTO — branch feat/1.2-mdx-rendering]`

- [x] Componentes MDX: Callout, Step, QuizQuestion, CodeBlock, MdxCodeFigure
- [x] Table of Contents com heading extractor (h2/h3)
- [x] Estabilizar renderização e layout do ArticlePage
- [x] Testar todos os componentes MDX nos artigos em dev

### 1.3 Navegação e UX

- [x] Header: links de categoria apontam para `/artigos?categoria=...`
- [x] Footer: bug `Link to=` corrigido para `Link href=`, rotas corrigidas
- [x] Página `/artigos` com filtro por categoria e busca em tempo real
- [x] Página 404 customizada (revisar conteúdo do `not-found.jsx`)
- [x] Breadcrumbs nos artigos
- [x] Busca funcional no `SearchModal` (busca em título, excerpt e tags)

### 1.4 SEO

- [x] `sitemap.js` e `robots.js` implementados
- [x] JSON-LD Schema.org (`JsonLd.jsx`)
- [x] Metadata completa por artigo (OG image via `/api/og`, description, canonical)
- [ ] Submeter sitemap no Google Search Console *(pós-deploy)*
- [ ] Testar Rich Results *(pós-deploy)*

### 1.5 Infraestrutura e Deploy

- [ ] Configurar variáveis de ambiente na Vercel
- [ ] Primeiro deploy em produção
- [ ] Configurar domínio `javacodelab.com` com HTTPS
- [ ] Validar newsletter (endpoint `/api/newsletter/` + MailerLite)
- [ ] Validar formulário de contato (endpoint `/api/contact/`)

---

## Fase 2 — Perfil do Leitor e Comentários `[PÓS-LANÇAMENTO]`

> Meta: transformar visitantes anônimos em leitores engajados com identidade no blog.

### 2.1 Perfil do Leitor

- [ ] Adicionar modelo `ReadingHistory` no Prisma (artigos lidos, progresso)
- [ ] Dashboard do leitor com histórico de leitura
- [ ] Bookmarks / artigos salvos
- [ ] Reading tracker: tempo de leitura, % concluído por artigo
- [ ] Streak de leitura (dias consecutivos)
- [ ] Mapa de aprendizado visual (quais tópicos o leitor já domina)

### 2.2 Comentários

- [x] Escolher solução: **Giscus** (GitHub Discussions, gratuito, sem banco)
- [x] Integrar comentários nos artigos (Giscus)
- [ ] Moderação básica (se solução própria)
- [ ] Notificação por e-mail de respostas (se solução própria)

### 2.3 Engajamento

- [ ] Sistema de reações nos artigos (👍 útil, ❤️ favorito)
- [x] Contagem de visualizações visível (ArticlePage exibe viewCount)
- [x] Compartilhamento social por artigo (Twitter/X, LinkedIn — ShareButtons)

---

## Fase 3 — Área Premium `[DEPOIS DA FASE 2]`

> Meta: monetizar audiência estabelecida com conteúdo exclusivo.

### 3.1 Autenticação e Planos

- [x] Clerk integrado (sign-in, sign-up, dashboard)
- [x] Stripe SDK + planos (mensal R$29, anual R$290, vitalício R$997)
- [x] PremiumGuard (gate de conteúdo)
- [ ] Configurar produtos/preços reais no Stripe (Live mode)
- [ ] Configurar webhook Stripe em produção
- [ ] Fluxo completo: cadastro → checkout → acesso premium

### 3.2 Conteúdo Premium

- [ ] Artigos marcados como premium no frontmatter MDX
- [ ] Trilhas de aprendizado (sequência curada de artigos)
- [ ] Quizzes e exercícios práticos por artigo
- [ ] Certificados de conclusão de trilha
- [ ] Área de downloads exclusivos (PDFs, cheatsheets)

### 3.3 Comunidade

- [ ] Área de discussão para membros premium
- [ ] Sessões ao vivo / office hours (integração com calendário)
- [ ] Fórum ou canal Discord exclusivo

---

## Fase 4 — Loja `[DEPOIS DA FASE 3]`

> Meta: venda de produtos digitais avulsos sem necessidade de assinatura.

### 4.1 Catálogo

- [x] Modelo `Product` e `Order` no Prisma
- [x] Página `/loja` existe
- [ ] Popular catálogo com produtos reais
- [ ] Definir `stripePriceId` de cada produto no banco
- [ ] Página individual de produto com descrição e preview

### 4.2 Checkout e Entrega

- [ ] Fluxo de compra avulsa (sem assinatura)
- [ ] Entrega digital automática por e-mail pós-compra
- [ ] Histórico de compras no dashboard do leitor
- [ ] Acesso permanente a produtos comprados

---

## Backlog Técnico (qualquer fase)

- [ ] Migração progressiva para TypeScript
- [ ] Admin CMS para gerenciar artigos sem deploy (Payload CMS ou Sanity)
- [ ] Rate limiting nas APIs (Upstash)
- [ ] Error boundaries e logging centralizado
- [ ] Testes automatizados (pelo menos artigos críticos)

---

## Status Geral

| Fase | Status | Pendências |
|------|--------|-----------|
| 1 — Blog Funcional | 🟢 Quase pronto | Deploy + configurar domínio |
| 2 — Perfil + Comentários | 🟡 Parcial | Giscus + ShareButtons + ViewCount prontos; Perfil do Leitor pendente |
| 3 — Área Premium | ⬜ Aguardando | Stripe Live não configurado |
| 4 — Loja | ⬜ Aguardando | `stripePriceId` vazio, catálogo sem produtos reais |

---

*Atualizado em: 2026-10-09*
