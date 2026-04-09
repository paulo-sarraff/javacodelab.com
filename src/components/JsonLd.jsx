/**
 * Componente para injetar dados estruturados JSON-LD no <head>.
 * Compatível com Server Components — não usa 'use client'.
 * Uso: <JsonLd data={schemaObject} />
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
