export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return Response.json({ success: false, message: 'Email é obrigatório' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, message: 'Formato de email inválido' }, { status: 400 })
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID

    const isPlaceholder = !MAILERLITE_API_KEY || MAILERLITE_API_KEY.includes('your_')

    if (isPlaceholder) {
      // Em desenvolvimento sem chave configurada: simula sucesso para testar o fluxo do formulário
      if (process.env.NODE_ENV === 'development') {
        console.warn('[newsletter] MAILERLITE_API_KEY não configurada — simulando sucesso em dev')
        return Response.json({
          success: true,
          message: 'Email cadastrado com sucesso! Obrigado por se inscrever.',
        })
      }
      console.error('[newsletter] MAILERLITE_API_KEY não configurada em produção')
      return Response.json(
        { success: false, message: 'Serviço de newsletter temporariamente indisponível. Tente novamente em breve.' },
        { status: 503 }
      )
    }

    const groupId = MAILERLITE_GROUP_ID && !MAILERLITE_GROUP_ID.includes('your_')
      ? MAILERLITE_GROUP_ID.trim()
      : null

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        status: 'active',
        groups: groupId ? [groupId] : [],
        fields: {
          source: 'javacodelab_website',
          signup_date: new Date().toISOString(),
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      // MailerLite retorna erro de duplicata com mensagem variada — normaliza
      const msg = data.message ?? ''
      if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('exist') || response.status === 409) {
        return Response.json({ success: true, message: 'Este email já está inscrito na newsletter!' })
      }

      // Erro de autenticação — chave inválida
      if (response.status === 401) {
        console.error('[newsletter] Chave MailerLite inválida ou expirada')
        return Response.json(
          { success: false, message: 'Serviço de newsletter temporariamente indisponível. Tente novamente em breve.' },
          { status: 503 }
        )
      }

      console.error('[newsletter] Erro MailerLite:', response.status, msg)
      return Response.json(
        { success: false, message: 'Não foi possível completar a inscrição. Tente novamente.' },
        { status: 502 }
      )
    }

    return Response.json({ success: true, message: 'Inscrição confirmada! Em breve você receberá novidades.' })
  } catch (error) {
    console.error('[newsletter] Erro inesperado:', error)
    return Response.json(
      { success: false, message: 'Erro ao processar inscrição. Tente novamente em alguns minutos.' },
      { status: 500 }
    )
  }
}
