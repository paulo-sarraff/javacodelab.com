'use client'

import { useState } from 'react'

export function QuizQuestion({ question, options, answer, explanation }) {
  const [selected, setSelected] = useState(null)

  const parsedOptions = (() => {
    if (!options) return []
    if (Array.isArray(options)) return options
    if (typeof options === 'string') {
      try { return JSON.parse(options) } catch { return [] }
    }
    if (typeof options === 'object') return Object.values(options)
    return []
  })()

  const correctIndex = typeof answer === 'string' ? parseInt(answer, 10) : (answer ?? 0)

  return (
    <div className="my-8 bg-[#2A2A2B] rounded-xl border border-white/10 p-6">
      <p className="font-semibold text-[#FFD15A] mb-4 text-sm">
        🧠 {question}
      </p>
      <div className="space-y-2">
        {parsedOptions.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === correctIndex
          const revealed = selected !== null

          return (
            <button
              key={i}
              onClick={() => selected === null && setSelected(i)}
              disabled={selected !== null}
              className={[
                'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all',
                revealed && isCorrect
                  ? 'border-green-500 bg-green-500/10 text-green-400'
                  : '',
                revealed && isSelected && !isCorrect
                  ? 'border-red-500 bg-red-500/10 text-red-400'
                  : '',
                !revealed
                  ? 'border-white/10 text-[#E8E8E8]/80 hover:border-[#FFD15A]/50 hover:bg-[#FFD15A]/5 cursor-pointer'
                  : '',
                revealed && !isSelected && !isCorrect
                  ? 'border-white/5 text-[#E8E8E8]/40'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && explanation && (
        <p className="mt-4 text-sm text-[#E8E8E8]/60 border-t border-white/10 pt-4">
          {explanation}
        </p>
      )}
    </div>
  )
}
