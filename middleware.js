import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Rotas que exigem autenticação obrigatória
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/stripe/checkout(.*)',
  '/api/stripe/portal(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Ignora arquivos estáticos e internals do Next.js
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executa para rotas de API
    '/(api|trpc)(.*)',
  ],
}
