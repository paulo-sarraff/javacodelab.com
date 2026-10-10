const VARIANTS = {
  info: {
    bg: 'bg-[#02a9f7]/10',
    border: 'border-[#02a9f7]/40',
    icon: 'ℹ️',
    defaultTitle: 'Info',
  },
  tip: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/40',
    icon: '💡',
    defaultTitle: 'Dica',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/40',
    icon: '⚠️',
    defaultTitle: 'Atenção',
  },
  danger: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/40',
    icon: '🚨',
    defaultTitle: 'Cuidado',
  },
}

export function Callout({ type = 'info', title, children }) {
  const v = VARIANTS[type] ?? VARIANTS.info
  return (
    <div className={`my-6 rounded-lg border p-4 ${v.bg} ${v.border}`}>
      <p className="mb-2 text-sm font-semibold text-[#E8E8E8]">
        {v.icon} {title ?? v.defaultTitle}
      </p>
      <div className="text-sm text-[#E8E8E8]/80 leading-relaxed [&>p]:mb-0">
        {children}
      </div>
    </div>
  )
}
