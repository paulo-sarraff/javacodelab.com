// newsletter-integration.js
export async function subscribeToNewsletter(email) {
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao cadastrar email')
    }

    return { success: true, message: data.message }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Erro ao cadastrar email. Tente novamente.',
    }
  }
}
