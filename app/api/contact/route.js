import nodemailer from 'nodemailer'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request) {
  // Rate limit: 3 mensagens por IP por minuto
  const { success, retryAfter } = rateLimit({
    ip: getClientIp(request),
    key: 'contact',
    limit: 3,
    windowMs: 60_000,
  })

  if (!success) {
    return Response.json(
      {
        error: 'Too many requests',
        message: 'Muitas tentativas. Aguarde alguns segundos e tente novamente.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfter) },
      }
    )
  }

  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return Response.json(
        {
          error: 'Missing required fields',
          message: 'Nome, email, assunto e mensagem são obrigatórios',
        },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email', message: 'Por favor, forneça um email válido' },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.verify()

    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: 'contato@javacodelab.com',
      subject: `JavaCodeLab - ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FFD15A 0%, #02a9f7 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #FFD15A; }
            .message-content { background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #02a9f7; white-space: pre-wrap; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">📧 Nova Mensagem - JavaCodeLab</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Formulário de contato do site</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nome:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">📋 Assunto:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">💬 Mensagem:</div>
                <div class="message-content">${message}</div>
              </div>
              <div class="footer">
                <p>Enviado via formulário de contato em <strong>javacodelab.com</strong></p>
                <p>Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    const mailOptionsToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Mensagem recebida - JavaCodeLab',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FFD15A 0%, #02a9f7 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #FFD15A; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .cta { background: #FFD15A; color: #000; padding: 12px 24px; border-radius: 25px; text-decoration: none; display: inline-block; font-weight: bold; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">✅ Mensagem Recebida!</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Obrigado por entrar em contato</p>
            </div>
            <div class="content">
              <p>Olá <strong>${name}</strong>,</p>
              <p>Recebemos sua mensagem com o assunto "<strong>${subject}</strong>" e responderemos em breve!</p>
              <div class="highlight">
                <p><strong>⏱️ Tempo de resposta:</strong> Normalmente respondemos em até 24 horas durante dias úteis.</p>
              </div>
              <p>Enquanto aguarda, que tal explorar nosso conteúdo?</p>
              <div style="text-align: center;">
                <a href="https://javacodelab.com" class="cta">🚀 Explorar Artigos</a>
              </div>
              <div class="footer">
                <p><strong>JavaCodeLab</strong> - Domine Java como um Expert</p>
                <p>Este é um email automático, não responda diretamente.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await Promise.all([
      transporter.sendMail(mailOptionsToYou),
      transporter.sendMail(mailOptionsToUser),
    ])

    return Response.json({
      success: true,
      message: 'Email enviado com sucesso!',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Erro ao enviar email:', error)

    if (error.code === 'EAUTH') {
      return Response.json(
        {
          error: 'Authentication failed',
          message: 'Erro de autenticação do email. Verifique as credenciais.',
        },
        { status: 500 }
      )
    }

    if (error.code === 'ENOTFOUND') {
      return Response.json(
        {
          error: 'Network error',
          message: 'Erro de conexão. Tente novamente em alguns minutos.',
        },
        { status: 500 }
      )
    }

    return Response.json(
      {
        error: 'Internal server error',
        message: 'Erro interno do servidor. Tente novamente mais tarde.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}
