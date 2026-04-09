/**
 * JavaCodeLab — Módulo de Analytics
 *
 * Camada unificada sobre GA4 (window.gtag) e PostHog.
 * Todos os componentes devem importar daqui — nunca chamar gtag/posthog diretamente.
 *
 * Uso:
 *   import { trackEvent, events } from '@/lib/analytics'
 *   trackEvent(events.CHECKOUT_START, { plan: 'monthly' })
 */

// ── Nomes canônicos de eventos ────────────────────────────────────────────────
export const events = {
  // Conteúdo
  ARTICLE_VIEW: 'article_view',
  SEARCH_QUERY: 'search_query',

  // Conversão
  CHECKOUT_START: 'checkout_start',
  CHECKOUT_SUCCESS: 'checkout_success',
  PREMIUM_CTA_CLICK: 'premium_cta_click',

  // Engajamento
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  NEWSLETTER_ERROR: 'newsletter_signup_error',

  // Navegação
  OUTBOUND_LINK: 'outbound_link_click',
}

// ── Utilitário interno ────────────────────────────────────────────────────────

function getPostHog() {
  if (typeof window === 'undefined') return null
  // posthog-js armazena a instância em window.posthog após inicialização
  return window.posthog ?? null
}

function getGtag() {
  if (typeof window === 'undefined') return null
  return typeof window.gtag === 'function' ? window.gtag : null
}

// ── API pública ───────────────────────────────────────────────────────────────

/**
 * Dispara um evento para GA4 e PostHog simultaneamente.
 *
 * @param {string} eventName  - Use as constantes do objeto `events`
 * @param {object} properties - Parâmetros extras do evento
 */
export function trackEvent(eventName, properties = {}) {
  if (typeof window === 'undefined') return

  try {
    // Google Analytics 4
    const gtag = getGtag()
    if (gtag) {
      gtag('event', eventName, properties)
    }

    // PostHog
    const posthog = getPostHog()
    if (posthog?.capture) {
      posthog.capture(eventName, properties)
    }
  } catch (err) {
    // Nunca quebrar a UI por causa de analytics
    if (process.env.NODE_ENV === 'development') {
      console.warn('[analytics] Erro ao rastrear evento:', eventName, err)
    }
  }
}

/**
 * Identifica o usuário após login (PostHog).
 * Chame após autenticação bem-sucedida com o Clerk userId.
 */
export function identifyUser(userId, traits = {}) {
  if (typeof window === 'undefined') return

  try {
    const posthog = getPostHog()
    if (posthog?.identify) {
      posthog.identify(userId, traits)
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[analytics] Erro ao identificar usuário:', err)
    }
  }
}

/**
 * Reseta a identidade do usuário no PostHog (após logout).
 */
export function resetUser() {
  if (typeof window === 'undefined') return
  try {
    getPostHog()?.reset?.()
  } catch (_) {}
}
