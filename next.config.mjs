/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Silencia o aviso de múltiplos lockfiles em monorepo / worktrees
  outputFileTracingRoot: process.cwd(),

  // Injeção de variáveis de ambiente em build time.
  //
  // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
  //   O Clerk v6 inicializa seu módulo ao ser importado e lança erro
  //   se a chave estiver ausente — isso quebra o `next build` em CI
  //   onde as variáveis de ambiente ainda não foram configuradas.
  //   Solução: fornecer uma chave com formato válido (pk_test_ + base64url)
  //   como fallback de build. Em produção a variável real da Vercel/env.local
  //   sobrescreve este valor — Clerk usa a chave mais específica encontrada.
  //
  //   'pk_test_bG9jYWxob3N0JA==' decodifica para 'localhost$'
  //   (suficiente para satisfazer a validação de formato sem fazer chamadas reais)
  env: {
    // Clerk v6 valida o formato: pk_test_ + base64(domain$)
    // O domínio deve conter ponto e terminar com '$'.
    // Este placeholder decodifica para 'javacodelab.clerk.accounts.dev$'
    // — formato idêntico a chaves de teste reais — e impede o erro
    // "Missing/Invalid publishableKey" durante `next build` em CI.
    // Em produção, a variável real da Vercel substitui este valor.
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ??
      'pk_test_amF2YWNvZGVsYWIuY2xlcmsuYWNjb3VudHMuZGV2JA==',
  },
}

export default nextConfig
