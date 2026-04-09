import Link from 'next/link'

export const metadata = {
  title: 'Página não encontrada',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-geist font-bold text-[#FFD15A] mb-4">404</div>
        <h1 className="text-3xl font-geist font-bold text-[#E8E8E8] mb-4">
          Página não encontrada
        </h1>
        <p className="text-[#E8E8E8]/70 font-roboto mb-8 text-lg">
          A página que você está procurando não existe ou foi removida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Voltar para Home
          </Link>
          <Link
            href="/sobre"
            className="border border-[#E8E8E8]/20 text-[#E8E8E8] hover:bg-[#E8E8E8]/5 font-roboto font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Sobre o JavaCodeLab
          </Link>
        </div>
      </div>
    </div>
  )
}
