export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return Response.json(
        { success: false, message: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID

    if (!MAILERLITE_API_KEY) {
      console.error('MAILERLITE_API_KEY não configurada')
      return Response.json(
        { success: false, message: 'Configuração do servidor incompleta' },
        { status: 500 }
      )
    }

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
        groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : [],
        fields: {
          source: 'javacodelab_website',
          signup_date: new Date().toISOString(),
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      if (data.message?.includes('already exists')) {
        return Response.json({
          success: true,
          message: 'Email já cadastrado na nossa newsletter!',
        })
      }
      throw new Error(data.message || 'Erro ao cadastrar no MailerLite')
    }

    return Response.json({
      success: true,
      message: 'Email cadastrado com sucesso! Obrigado por se inscrever.',
    })
  } catch (error) {
    console.error('Erro na API de newsletter:', error)
    return Response.json(
      { success: false, message: 'Erro interno do servidor. Tente novamente em alguns minutos.' },
      { status: 500 }
    )
  }
}
