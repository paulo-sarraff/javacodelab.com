/**
 * Rate limiter in-memory simples para rotas de API.
 * Funciona por instância de servidor — adequado para tráfego moderado.
 * Para escala maior, substituir por Upstash Redis.
 */

const store = new Map()

/**
 * @param {object} options
 * @param {string} options.ip - IP do cliente
 * @param {string} options.key - Chave identificadora da rota (ex: 'newsletter', 'contact')
 * @param {number} [options.limit=10] - Máximo de requisições por janela
 * @param {number} [options.windowMs=60000] - Duração da janela em ms (padrão: 1 minuto)
 * @returns {{ success: boolean, remaining: number, retryAfter?: number }}
 */
export function rateLimit({ ip, key, limit = 10, windowMs = 60_000 }) {
  const now = Date.now()
  const storeKey = `${key}:${ip}`

  const entry = store.get(storeKey)

  // Janela expirada ou primeiro acesso — reinicia contagem
  if (!entry || now - entry.windowStart >= windowMs) {
    store.set(storeKey, { count: 1, windowStart: now })

    // Limpeza periódica: remove entradas antigas para não vazar memória
    if (store.size > 5_000) {
      for (const [k, v] of store) {
        if (now - v.windowStart >= windowMs) store.delete(k)
      }
    }

    return { success: true, remaining: limit - 1 }
  }

  // Limite atingido
  if (entry.count >= limit) {
    const retryAfter = Math.ceil((entry.windowStart + windowMs - now) / 1000)
    return { success: false, remaining: 0, retryAfter }
  }

  entry.count++
  return { success: true, remaining: limit - entry.count }
}

/**
 * Extrai o IP real do cliente a partir dos headers da requisição Next.js.
 * @param {Request} request
 * @returns {string}
 */
export function getClientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  )
}
