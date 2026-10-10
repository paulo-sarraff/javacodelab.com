'use client'

import { useEffect, useRef } from 'react'

export default function Giscus() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'paulo-sarraff/javacodelab.com')
    script.setAttribute('data-repo-id', 'R_kgDOP1qubA')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'DIC_kwDOP1qubM4DHYf2')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'dark_dimmed')
    script.setAttribute('data-lang', 'pt')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    ref.current.appendChild(script)
  }, [])

  return (
    <section className="my-12">
      <h2 className="text-2xl font-geist font-bold text-[#E8E8E8] mb-6">
        Comentários
      </h2>
      <div ref={ref} />
    </section>
  )
}
