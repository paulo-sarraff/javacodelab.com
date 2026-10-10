'use client'

import { Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { useState } from 'react'

const BASE_URL = 'https://javacodelab.com'

export default function ShareButtons({ slug, title }) {
  const [copied, setCopied] = useState(false)
  const url = `${BASE_URL}/artigo/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: 'Twitter / X',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=javacodelab`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ]

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback silencioso
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#E8E8E8]/50 font-roboto">Compartilhar:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartilhar no ${link.name}`}
          className="p-2 rounded-lg bg-[#2A2A2B] text-[#E8E8E8]/60 hover:text-[#FFD15A] hover:bg-[#FFD15A]/10 transition-colors"
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copiar link"
        className="p-2 rounded-lg bg-[#2A2A2B] text-[#E8E8E8]/60 hover:text-[#FFD15A] hover:bg-[#FFD15A]/10 transition-colors cursor-pointer"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  )
}
