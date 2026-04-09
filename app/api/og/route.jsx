import { ImageResponse } from 'next/og'
import { getArticleBySlug } from '@/data/articles'

export const runtime = 'edge'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  // Dados padrão para a home / páginas sem artigo
  let title = 'JavaCodeLab'
  let subtitle = 'Domine Java como um Expert'
  let category = null
  let tags = []

  if (slug) {
    const article = getArticleBySlug(slug)
    if (article) {
      title = article.title
      subtitle = article.excerpt
      category = article.category
      tags = article.tags.slice(0, 3)
    }
  }

  // Mapa de cores por categoria
  const categoryColors = {
    'Spring Framework': '#6DB33F',
    'Java Avançado': '#02a9f7',
    'Java para Iniciantes': '#FFD15A',
    'Testes & Qualidade': '#a855f7',
    'Carreiras': '#f97316',
    'Arquitetura': '#ec4899',
  }

  const accentColor = category ? (categoryColors[category] ?? '#FFD15A') : '#FFD15A'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1A1A1B',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fundo gradiente decorativo */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #02a9f722 0%, transparent 70%)',
          }}
        />

        {/* Barra de acento lateral */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '8px',
            height: '630px',
            background: `linear-gradient(180deg, ${accentColor} 0%, #02a9f7 100%)`,
          }}
        />

        {/* Conteúdo principal */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 72px 56px 80px',
            height: '100%',
          }}
        >
          {/* Header: logo + categoria */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, ${accentColor} 0%, #02a9f7 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: '#000',
                  fontWeight: 'bold',
                }}
              >
                ☕
              </div>
              <span
                style={{
                  color: '#E8E8E8',
                  fontSize: '22px',
                  fontWeight: '700',
                  letterSpacing: '-0.5px',
                }}
              >
                JavaCodeLab
              </span>
            </div>

            {/* Badge de categoria */}
            {category && (
              <div
                style={{
                  backgroundColor: `${accentColor}22`,
                  border: `1px solid ${accentColor}66`,
                  color: accentColor,
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                {category}
              </div>
            )}
          </div>

          {/* Título do artigo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                color: '#E8E8E8',
                fontSize: title.length > 60 ? '38px' : '48px',
                fontWeight: '800',
                lineHeight: '1.15',
                letterSpacing: '-1px',
                maxWidth: '900px',
              }}
            >
              {title}
            </div>
            <div
              style={{
                color: '#E8E8E8AA',
                fontSize: '20px',
                lineHeight: '1.5',
                maxWidth: '820px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                overflow: 'hidden',
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Footer: tags + url */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    backgroundColor: '#E8E8E811',
                    border: '1px solid #E8E8E822',
                    color: '#E8E8E8AA',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  #{tag}
                </div>
              ))}
            </div>

            {/* URL do site */}
            <div
              style={{
                color: accentColor,
                fontSize: '16px',
                fontWeight: '600',
                opacity: 0.8,
              }}
            >
              javacodelab.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
