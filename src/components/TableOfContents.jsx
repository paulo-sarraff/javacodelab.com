'use client'

import { useState, useEffect, useRef } from 'react'

export function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState(null)
  const listRef = useRef(null)
  const itemRefs = useRef({})

  // Rastreia o heading ativo conforme o scroll da página
  useEffect(() => {
    if (!headings.length) return

    const OFFSET = 96 // altura do header fixo + margem

    const headingEls = headings
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    const onScroll = () => {
      let active = headingEls[0]?.id ?? null
      for (const el of headingEls) {
        if (el.getBoundingClientRect().top <= OFFSET) {
          active = el.id
        } else {
          break
        }
      }
      setActiveId(active)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [headings])

  // Quando o item ativo muda, rola o próprio TOC para mantê-lo visível
  useEffect(() => {
    if (!activeId || !listRef.current) return
    const activeEl = itemRefs.current[activeId]
    if (!activeEl) return

    const list = listRef.current
    const itemTop = activeEl.offsetTop
    const itemBottom = itemTop + activeEl.offsetHeight
    const listScrollTop = list.scrollTop
    const listHeight = list.clientHeight

    if (itemTop < listScrollTop) {
      list.scrollTo({ top: itemTop - 8, behavior: 'smooth' })
    } else if (itemBottom > listScrollTop + listHeight) {
      list.scrollTo({ top: itemBottom - listHeight + 8, behavior: 'smooth' })
    }
  }, [activeId])

  if (!headings.length) return null

  return (
    <nav aria-label="Índice do artigo">
      <p className="text-xs font-bold uppercase tracking-widest text-[#E8E8E8]/40 mb-4">
        Neste artigo
      </p>
      <ul
        ref={listRef}
        className="space-y-0.5 border-l border-white/10 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 160px)' }}
      >
        {headings.map(({ id, text, level }) => (
          <li key={id} ref={(el) => { itemRefs.current[id] = el }}>
            <a
              href={`#${id}`}
              className={[
                'block py-1 text-sm transition-colors duration-150',
                level === 3 ? 'pl-7' : 'pl-4',
                activeId === id
                  ? 'text-[#FFD15A] border-l-2 border-[#FFD15A] -ml-px font-medium'
                  : 'text-[#E8E8E8]/50 hover:text-[#E8E8E8]/80',
              ].join(' ')}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
