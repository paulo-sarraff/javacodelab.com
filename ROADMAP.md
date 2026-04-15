# Roadmap JavaCodeLab

Plano de melhorias gerado em 2026-04-13. Marque `[x]` ao concluir cada etapa.

---

## Iniciativa 1 — Infraestrutura de Conteúdo

### 1.1 — Migrar artigos para banco de dados ✅ 2026-04-15
- [x] Adicionar modelo `Article` no `prisma/schema.prisma` (branch: feat/1.1-article-model)
- [x] Criar script `prisma/seed.js` para importar os 8 artigos existentes (branch: feat/1.1-article-seed)
- [x] Substituir `src/data/articles.js` por funções que consultam o banco via Prisma (branch: feat/1.1-article-data-layer)

### 1.2 — Sistema de renderização de conteúdo rico
- [ ] Instalar e configurar `next-mdx-remote` ou `@mdx-js/react`
- [ ] Criar componentes MDX customizados: `<Callout>`, `<Tip>`, `<Warning>`, `<Step>`, `<QuizQuestion>`
- [ ] Criar componente `<TableOfContents>` gerado automaticamente dos headings H2/H3
- [ ] Implementar syntax highlighting com tema dark (`shiki` ou `rehype-highlight`)

### 1.3 — Escrever os 7 artigos restantes
- [ ] Spring Boot REST API — CRUD completo
- [ ] Spring Security com JWT (complementa o JWT já escrito)
- [ ] Spring Boot + Docker — do zero ao container
- [ ] Testes no Spring Boot — JUnit 5 + Mockito
- [ ] Java 21 — Virtual Threads e novidades
- [ ] Spring Boot + IA (OpenAI/Gemini integration) ← diferencial de nicho
- [ ] Microserviços com Spring Cloud

### 1.4 — Páginas de categoria e listagem
- [ ] Criar `app/categoria/[slug]/page.jsx`
- [ ] Criar `app/artigos/page.jsx` com filtro, busca e paginação
- [ ] Atualizar links do header para apontar para rotas corretas

### 1.5 — Contagem real de visualizações
- [ ] Criar endpoint `POST /api/articles/[slug]/view`
- [ ] Chamar endpoint via `useEffect` no `ArticlePage`
- [ ] Exibir contador real no artigo e na listagem

---

## Iniciativa 2 — Área Logada Diferenciada

### 2.1 — Tracking de leitura
- [ ] Adicionar modelo `ReadingProgress` no Prisma (userId, articleId, readAt, completedAt, scrollPercent, timeSpent)
- [ ] Criar hook `useReadingTracker` (detecta scroll ≥ 80% como "lido", salva timeSpent ao sair)
- [ ] Criar endpoint `POST /api/reading-progress`
- [ ] Integrar hook no `ArticlePage` para usuários logados

### 2.2 — Dashboard: Mapa de Aprendizado
- [ ] Criar componente `<LearningMap>` com artigos agrupados por categoria (skill tree visual)
- [ ] Estados visuais por artigo: `locked` / `available` / `in_progress` / `completed`
- [ ] Barra de progresso por categoria (ex: "Spring Framework: 2/5 artigos lidos")
- [ ] Destaque para "próximo passo recomendado" baseado no histórico

### 2.3 — Dashboard: Métricas Pessoais
- [ ] Card "Sua jornada": total de artigos lidos, tempo total de estudo, streak de dias
- [ ] Lista de artigos lidos recentemente com data e tempo gasto
- [ ] Gráfico de atividade semanal (tipo GitHub contribution graph) com `recharts`
- [ ] Estimativa de tempo restante para completar cada categoria

### 2.4 — Bookmarks e Anotações
- [ ] Adicionar modelo `Bookmark` no Prisma (userId, articleId, createdAt)
- [ ] Adicionar modelo `Note` no Prisma (userId, articleId, content, selection, createdAt)
- [ ] Botão "Salvar" (estrela) em cada artigo com toggle via `POST /api/bookmarks`
- [ ] Tooltip ao selecionar texto com mini-editor de anotação
- [ ] Aba "Salvos" no dashboard com artigos bookmarkados e notas

### 2.5 — Quizzes e Autoavaliação
- [ ] Adicionar modelo `Quiz` no Prisma (articleId, questions JSON)
- [ ] Adicionar modelo `QuizAttempt` no Prisma (userId, quizId, score, answers[], completedAt)
- [ ] Criar componente `<Quiz>` para blocos MDX (interativo)
- [ ] Quiz aparece ao final do artigo para usuários logados
- [ ] Exibir "Nível de confiança" por tópico no dashboard (ex: JWT 90%, CRUD 100%)

### 2.6 — Trilhas de Aprendizado Curadas
- [ ] Adicionar modelo `LearningPath` no Prisma (title, description, articles[], difficulty, estimatedHours)
- [ ] Criar 3 trilhas iniciais: "Java do Zero ao Spring", "APIs Seguras com JWT", "Spring Boot + IA"
- [ ] Criar página `/trilhas` com cards das trilhas
- [ ] Trilha ativa no dashboard com progresso linear passo a passo
- [ ] Gerar certificado PDF ao concluir trilha (nome do usuário, QR code de verificação)
- [ ] Página pública de verificação: `/certificado/[id]`

### 2.7 — Feed Personalizado e Recomendações
- [ ] Algoritmo de recomendação: categorias mais lidas + artigos não lidos + tendências
- [ ] Seção "Recomendado para você" no dashboard
- [ ] Email semanal automatizado via MailerLite: "Seus próximos 3 artigos da semana"
- [ ] Notificações in-app (badge no header) para novo conteúdo da categoria favorita

### 2.8 — Perfil Público do Desenvolvedor
- [ ] Criar página `/dev/[username]` (artigos lidos, trilhas concluídas, badges, streak)
- [ ] Sistema de badges/conquistas: "Primeiro Artigo", "Spring Master", "7 dias seguidos", "Quiz Perfeito"
- [ ] Toggle público/privado no perfil
- [ ] Compartilhamento de conquistas em redes sociais

---

## Iniciativa 3 — SEO & Crescimento Orgânico

### 3.1 — Metadata e Schema.org
- [ ] Implementar `generateMetadata` dinâmico em cada artigo (title, description, og:image, canonical)
- [ ] Adicionar `Article` schema (JSON-LD) em cada artigo
- [ ] Adicionar `BreadcrumbList` schema nas páginas de categoria
- [ ] Verificar se `sitemap.js` inclui artigos dinâmicos do banco

### 3.2 — Performance e Core Web Vitals
- [ ] Auditar e converter imagens para `next/image` com width/height explícitos (evita CLS)
- [ ] Implementar lazy load nos artigos abaixo do fold na home
- [ ] Revisar bundle size e remover imports desnecessários

### 3.3 — Links internos e Hub Pages
- [ ] Implementar visualmente seção "Artigos Relacionados" em cada artigo (função já existe)
- [ ] Criar hub pages por categoria com intro + lista de artigos
- [ ] Adicionar breadcrumb nos artigos: Home > Categoria > Artigo

### 3.4 — Série Java + IA (diferencial de nicho)
- [ ] Criar série "Java + IA": Spring AI, LangChain4j, integração OpenAI, RAG com embeddings
- [ ] Tag especial `#IA` com página dedicada
- [ ] Demos práticas embutidas nos artigos

---

## Iniciativa 4 — Monetização por Acesso

### 4.1 — Completar integração Stripe para assinaturas
- [ ] Criar preços reais no Stripe Dashboard (monthly, annual, lifetime)
- [ ] Preencher `stripePriceId` em `src/lib/stripe.js`
- [ ] Testar fluxo completo: checkout → webhook → banco → dashboard atualizado
- [ ] Criar página `/obrigado` após checkout com instruções de acesso

### 4.2 — Gating de conteúdo gradual
- [ ] Adicionar flag `premiumOnly` no modelo `Article`
- [ ] Criar componente `<PremiumGate>` com CTA para upgrade
- [ ] Preview dos primeiros 60% do artigo premium com blur + CTA no restante

### 4.3 — Upsell contextual
- [ ] Ao concluir trilha gratuita, sugerir trilha premium
- [ ] Ao ver quiz sem login: CTA de cadastro
- [ ] Ao ver quiz com plano free: CTA de upgrade para premium

---

## Iniciativa 5 — Monetização com a Loja

### 5.1 — Completar integração dos produtos com Stripe
- [ ] Criar produtos e preços no Stripe Dashboard
- [ ] Preencher `stripePriceId` em `src/data/products.js`
- [ ] Sincronizar produtos com tabela `Product` no banco via seed
- [ ] Testar fluxo de compra unitária de produto

### 5.2 — Entrega de produtos digitais
- [ ] Configurar storage (Vercel Blob / Cloudflare R2 / S3) para arquivos digitais
- [ ] Gerar link assinado temporário após `checkout.session.completed`
- [ ] Criar endpoint `GET /api/orders/[orderId]/download` com verificação de ownership
- [ ] Aba "Meus Produtos" no dashboard com histórico de compras e botão de download
- [ ] Email automático pós-compra com link de acesso

### 5.3 — Página de produto dedicada
- [ ] Criar `app/produto/[slug]/page.jsx` com descrição completa, preview, depoimentos, FAQ
- [ ] Adicionar botão "Ver Detalhes" nos cards da loja
- [ ] Implementar rastreamento de conversão (visita → compra)

---

## Iniciativa 6 — Monetização Premium (Conteúdo Exclusivo)

### 6.1 — Área de conteúdo premium
- [ ] Criar `app/premium/conteudo/page.jsx` com verificação de assinatura ativa
- [ ] Listar projetos completos (E-commerce, JWT API, Microserviços, Chat WebSocket)
- [ ] Vídeos embedados + links de código fonte (GitHub privado)

### 6.2 — Comunidade e mentoria
- [ ] Link do Discord privado visível no dashboard de assinantes premium
- [ ] Calendário de sessões de mentoria (Calendly) para planos annual/lifetime
- [ ] Área de "Code Review": envio de PR via GitHub para feedback

### 6.3 — Sistema de certificados completo
- [ ] Gerar certificado PDF com `jsPDF` (nome, trilha, data, QR code)
- [ ] Página pública `/certificado/[id]` para verificação de autenticidade

---

## Iniciativa 7 — Qualidade Técnica

### 7.1 — Admin básico para gestão de conteúdo
- [ ] Criar `app/admin/` com proteção por role (`isAdmin` no modelo User)
- [ ] CRUD de artigos com editor MDX
- [ ] Listagem de assinantes, pedidos e métricas básicas

### 7.2 — Tratamento de erros e estados vazios
- [ ] Adicionar `error.jsx` e `loading.jsx` nas rotas críticas
- [ ] Criar componente `<EmptyState>` padronizado
- [ ] Página 404 customizada com sugestões de conteúdo

### 7.3 — Rate limiting escalável
- [ ] Migrar `src/lib/rate-limit.js` para Upstash Redis (`@upstash/ratelimit`)
- [ ] Proteger endpoints: `/api/articles/[slug]/view`, `/api/bookmarks`, `/api/reading-progress`

### 7.4 — Migração progressiva para TypeScript
- [ ] Novos arquivos criados nas iniciativas acima já em TypeScript
- [ ] Migrar `src/lib/` e `src/hooks/`
- [ ] Migrar novos componentes de dashboard

---

## Sequência sugerida

| Período | Foco |
|---------|------|
| Semana 1–2 | Init. 1.1 + 1.2 (artigos no banco + MDX) |
| Semana 3–4 | Init. 1.4 + 3.1 (categorias + SEO) |
| Semana 5–8 | Init. 2.1 + 2.2 + 2.3 (tracking + dashboard) |
| Semana 9–10 | Init. 2.4 (bookmarks + notas) |
| Semana 11–12 | Init. 4.1 + 4.2 (Stripe + gating) |
| Semana 13–14 | Init. 2.5 (quizzes) |
| Semana 15–16 | Init. 2.6 (trilhas + certificados) |
| Depois | Init. 5, 6, 7 conforme tração |
