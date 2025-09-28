// /api/contact.js - Vercel Serverless Function
import nodemailer from 'nodemailer'

// Configuração CORS para permitir requests do frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' })
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted' 
    })
  }

  try {
    const { name, email, subject, message } = req.body

    // Validação básica
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Nome, email, assunto e mensagem são obrigatórios'
      })
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Por favor, forneça um email válido'
      })
    }

    // Configurar transporter do Nodemailer (Titan/HostGator)
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465, // ou 587 se preferir TLS
      secure: true, // true para 465, false para 587
      auth: {
        user: process.env.EMAIL_USER, // contato@javacodelab.com
        pass: process.env.EMAIL_PASS  // senha da conta Titan
      }
    })


    // Verificar conexão
    await transporter.verify()

    // Template do email para você receber
    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: 'contato@javacodelab.com', // seu email de destino
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
                <p>Esta mensagem foi enviada através do formulário de contato em <strong>javacodelab.com</strong></p>
                <p>Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Template de confirmação para o usuário
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
              
              <p>Se sua mensagem for urgente, você também pode nos encontrar nas redes sociais.</p>
              
              <div class="footer">
                <p><strong>JavaCodeLab</strong> - Domine Java como um Expert</p>
                <p>Este é um email automático, não responda diretamente.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Enviar ambos os emails
    await Promise.all([
      transporter.sendMail(mailOptionsToYou),
      transporter.sendMail(mailOptionsToUser)
    ])

    // Log para debugging (opcional)
    console.log(`Email enviado de ${email} com assunto: ${subject}`)

    // Resposta de sucesso
    return res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso!',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Erro ao enviar email:', error)
    
    // Diferentes tipos de erro
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        error: 'Authentication failed',
        message: 'Erro de autenticação do email. Verifique as credenciais.',
        details: 'Verifique se a senha de app do Gmail está correta'
      })
    }
    
    if (error.code === 'ENOTFOUND') {
      return res.status(500).json({
        error: 'Network error',
        message: 'Erro de conexão. Tente novamente em alguns minutos.',
        details: 'Não foi possível conectar ao servidor de email'
      })
    }

    // Erro genérico
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Erro interno do servidor. Tente novamente mais tarde.',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
    })
  }
}
