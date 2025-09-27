// newsletter-integration.js
// Função para integrar com o formulário de newsletter existente

export async function subscribeToNewsletter(email) {
console.log(email)
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })

    const data = await response.json()
    console.log(data)

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao cadastrar email')
    }

    return {
      success: true,
      message: data.message
    }

  } catch (error) {
    console.error('Erro ao cadastrar newsletter:', error)
    return {
      success: false,
      message: error.message || 'Erro ao cadastrar email. Tente novamente.'
    }
  }
}

// Função para usar em componentes React
export function useNewsletterSubscription() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const subscribe = async (email) => {
    setIsLoading(true)
    setMessage('')
    setIsSuccess(false)

    const result = await subscribeToNewsletter(email)

    setIsLoading(false)
    setMessage(result.message)
    setIsSuccess(result.success)

    return result
  }

  return {
    subscribe,
    isLoading,
    message,
    isSuccess
  }
}