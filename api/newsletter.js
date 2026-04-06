// api/newsletter.js - API para integração com MailerLite

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Método não permitido'
    })
  }

  try {
    const { email } = req.body

    // Validação básica
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email é obrigatório'
      })
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email inválido'
      })
    }

    // Configuração MailerLite
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID

    if (!MAILERLITE_API_KEY) {
      console.error('MAILERLITE_API_KEY não configurada')
      return res.status(500).json({
        success: false,
        message: 'Configuração do servidor incompleta'
      })
    }

    // Cadastrar no MailerLite
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        status: 'active',
        groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : [],
        fields: {
          source: 'javacodelab_website',
          signup_date: new Date().toISOString()
        }
      })
    })

    const data = await response.json()

    if (!response.ok) {
      // Se o email já existe, considerar como sucesso
      if (data.message && data.message.includes('already exists')) {
        return res.status(200).json({
          success: true,
          message: 'Email já cadastrado na nossa newsletter!'
        })
      }

      console.error('Erro MailerLite:', data)
      throw new Error(data.message || 'Erro ao cadastrar no MailerLite')
    }

    // Sucesso
    console.log(`Newsletter signup: ${email}`)

    return res.status(200).json({
      success: true,
      message: 'Email cadastrado com sucesso! Obrigado por se inscrever.'
    })

  } catch (error) {
    console.error('Erro na API de newsletter:', error)

    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor. Tente novamente em alguns minutos.'
    })
  }
}
