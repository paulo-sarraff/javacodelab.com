'use client'

import { useRef, useState, Children, isValidElement } from 'react'
import { Copy, Check, Code2 } from 'lucide-react'

const LANG_ICONS = {
  java: '☕',
  javascript: '🟨',
  typescript: '🔷',
  python: '🐍',
  sql: '🗃️',
  xml: '📄',
  yaml: '📋',
  yml: '📋',
  bash: '🐚',
  shell: '🐚',
  json: '📦',
}

export function MdxCodeFigure({ children }) {
  const codeRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const childrenArray = Children.toArray(children)
  const figcaption = childrenArray.find(
    (c) => isValidElement(c) && c.type === 'figcaption'
  )
  const pre = childrenArray.find(
    (c) => isValidElement(c) && c.type === 'pre'
  )

  const filename = figcaption ? String(figcaption.props.children ?? '') : null
  const language = pre?.props?.['data-language'] ?? 'code'
  const langIcon = LANG_ICONS[language.toLowerCase()] ?? '📄'

  const handleCopy = async () => {
    const text = codeRef.current?.querySelector('code')?.textContent ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="my-8 bg-[#1A1A1B] rounded-xl border border-white/10 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#2A2A2B] border-b border-white/10">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-[#FFD15A]" />
          <div>
            <span className="text-sm font-medium text-[#E8E8E8]/80 capitalize">
              {langIcon} {language}
            </span>
            {filename && (
              <div className="text-xs text-[#E8E8E8]/60 mt-0.5">{filename}</div>
            )}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-[#FFD15A]/10 hover:bg-[#FFD15A]/20 text-[#FFD15A] rounded-lg text-sm font-medium transition-all duration-200"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copiar
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <div
        ref={codeRef}
        className="overflow-x-auto p-6 text-sm
          [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent [&_pre]:!border-none [&_pre]:!rounded-none
          [&_code]:!leading-relaxed [&_code]:!bg-transparent
          [&_[data-line]]:block [&_[data-line]]:leading-6"
      >
        {pre}
      </div>
    </div>
  )
}
