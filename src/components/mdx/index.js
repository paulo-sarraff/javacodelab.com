import { Callout } from './Callout'
import { Step } from './Step'
import { QuizQuestion } from './QuizQuestion'
import { MdxCodeFigure } from './MdxCodeFigure'

export const mdxComponents = {
  // ── Headings ───────────────────────────────────────────────────────
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="text-2xl font-geist font-bold text-[#E8E8E8] mt-10 mb-4 scroll-mt-24"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className="text-xl font-geist font-bold text-[#E8E8E8] mt-8 mb-3 scroll-mt-24"
    >
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4
      id={id}
      className="text-lg font-geist font-semibold text-[#E8E8E8] mt-6 mb-2 scroll-mt-24"
    >
      {children}
    </h4>
  ),

  // ── Body text ──────────────────────────────────────────────────────
  p: ({ children }) => (
    <p className="text-[#E8E8E8]/80 font-roboto mb-6 leading-relaxed">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#E8E8E8]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[#E8E8E8]/90">{children}</em>
  ),

  // ── Lists ──────────────────────────────────────────────────────────
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-[#E8E8E8]/80 font-roboto mb-6 space-y-1 pl-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-[#E8E8E8]/80 font-roboto mb-6 space-y-1 pl-2">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),

  // ── Inline code ────────────────────────────────────────────────────
  code: ({ children, className, 'data-language': dataLang, ...props }) => {
    // Block code (inside pre/figure) — shiki handles tokens, pass through
    if (dataLang || className?.startsWith('language-')) {
      return (
        <code className={className} data-language={dataLang} {...props}>
          {children}
        </code>
      )
    }
    // Inline code
    return (
      <code className="bg-[#2A2A2B] px-2 py-0.5 rounded text-[#FFD15A] text-sm font-mono">
        {children}
      </code>
    )
  },

  // ── Code blocks (rehype-pretty-code wraps in <figure>) ─────────────
  figure: ({ children, ...props }) => {
    if ('data-rehype-pretty-code-figure' in props) {
      return <MdxCodeFigure>{children}</MdxCodeFigure>
    }
    return <figure {...props}>{children}</figure>
  },

  // ── Blockquote ────────────────────────────────────────────────────
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#FFD15A] pl-4 my-6 text-[#E8E8E8]/70 italic">
      {children}
    </blockquote>
  ),

  // ── Horizontal rule ───────────────────────────────────────────────
  hr: () => <hr className="border-white/10 my-8" />,

  // ── Links ─────────────────────────────────────────────────────────
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#02a9f7] hover:underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),

  // ── Tables ────────────────────────────────────────────────────────
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm text-[#E8E8E8]/80 border-collapse">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 border border-white/10 bg-[#2A2A2B] font-semibold text-left text-[#E8E8E8]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border border-white/10">{children}</td>
  ),

  // ── Custom components ─────────────────────────────────────────────
  Callout,
  Tip: (props) => <Callout type="tip" {...props} />,
  Warning: (props) => <Callout type="warning" {...props} />,
  Info: (props) => <Callout type="info" {...props} />,
  Danger: (props) => <Callout type="danger" {...props} />,
  Step,
  QuizQuestion,
}
