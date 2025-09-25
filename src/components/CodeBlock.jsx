import { useState } from 'react'
import { Copy, Check, Code2 } from 'lucide-react'

const CodeBlock = ({ code, language = 'java', filename = null }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  // Função simples de syntax highlighting para Java
  const highlightJava = (code) => {
    const keywords = [
      'public', 'private', 'protected', 'static', 'final', 'abstract', 'class', 'interface',
      'extends', 'implements', 'import', 'package', 'return', 'void', 'int', 'String',
      'boolean', 'double', 'float', 'long', 'char', 'byte', 'short', 'if', 'else',
      'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue',
      'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this', 'super',
      '@Override', '@Autowired', '@Service', '@Repository', '@Controller', '@RestController',
      '@Component', '@Configuration', '@Bean', '@Value', '@RequestMapping', '@GetMapping',
      '@PostMapping', '@PutMapping', '@DeleteMapping', '@PathVariable', '@RequestParam',
      '@Entity', '@Table', '@Id', '@GeneratedValue', '@Column', '@Data', '@Builder',
      '@NoArgsConstructor', '@AllArgsConstructor', '@RequiredArgsConstructor'
    ]

    let highlightedCode = code
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.replace(/[@]/g, '\\@')}\\b`, 'g')
      highlightedCode = highlightedCode.replace(
        regex, 
        `<span class="text-[#FFD15A] font-medium">${keyword}</span>`
      )
    })

    // Highlight strings
    highlightedCode = highlightedCode.replace(
      /"([^"\\]|\\.)*"/g,
      '<span class="text-green-400">$&</span>'
    )

    // Highlight single line comments
    highlightedCode = highlightedCode.replace(
      /\/\/.*$/gm,
      '<span class="text-[#E8E8E8]/50 italic">$&</span>'
    )

    // Highlight multi-line comments
    highlightedCode = highlightedCode.replace(
      /\/\*[\s\S]*?\*\//g,
      '<span class="text-[#E8E8E8]/50 italic">$&</span>'
    )

    // Highlight numbers
    highlightedCode = highlightedCode.replace(
      /\b\d+\.?\d*[fFdDlL]?\b/g,
      '<span class="text-[#02a9f7]">$&</span>'
    )

    // Highlight method calls
    highlightedCode = highlightedCode.replace(
      /\b(\w+)(\s*\()/g,
      '<span class="text-blue-300">$1</span>$2'
    )

    return highlightedCode
  }

  const getLanguageIcon = (lang) => {
    switch (lang.toLowerCase()) {
      case 'java':
        return '☕'
      case 'javascript':
        return '🟨'
      case 'python':
        return '🐍'
      case 'sql':
        return '🗃️'
      case 'xml':
        return '📄'
      case 'yaml':
      case 'yml':
        return '📋'
      case 'bash':
      case 'shell':
        return '🐚'
      default:
        return '📄'
    }
  }

  return (
    <div className="my-8 bg-[#1A1A1B] rounded-xl border border-white/10 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#2A2A2B] border-b border-white/10">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-[#FFD15A]" />
          <div className="flex items-center gap-3">
            <span className="text-xl">{getLanguageIcon(language)}</span>
            <div>
              <span className="text-sm font-roboto text-[#E8E8E8]/80 capitalize font-medium">
                {language}
              </span>
              {filename && (
                <div className="text-xs text-[#E8E8E8]/60 font-roboto">
                  {filename}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-[#FFD15A]/10 hover:bg-[#FFD15A]/20 text-[#FFD15A] rounded-lg text-sm font-roboto font-medium transition-all duration-200 group"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              Copiar
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative">
        <div className="p-6 overflow-x-auto">
          <pre className="text-sm font-mono leading-relaxed">
            <code
              dangerouslySetInnerHTML={{
                __html: language === 'java' ? highlightJava(code) : code
              }}
              className="text-[#E8E8E8] block"
            />
          </pre>
        </div>
        
        {/* Line numbers overlay */}
        <div className="absolute left-0 top-0 p-6 pointer-events-none">
          <div className="text-sm font-mono leading-relaxed text-[#E8E8E8]/30 select-none">
            {code.split('\n').map((_, index) => (
              <div key={index} className="text-right pr-4 min-w-[2rem]">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeBlock
