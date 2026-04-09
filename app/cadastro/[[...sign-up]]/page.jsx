import { SignUp } from '@clerk/nextjs'

export const metadata = {
  title: 'Criar Conta — JavaCodeLab',
  description: 'Crie sua conta grátis no JavaCodeLab e comece a dominar Java, Spring Boot e todo o ecossistema Java.',
  robots: { index: false },
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1B] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Header visual */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="text-3xl">☕</div>
            <span className="text-2xl font-geist font-bold text-[#E8E8E8]">JavaCodeLab</span>
          </div>
          <p className="text-[#E8E8E8]/60 font-roboto">
            Junte-se a +500 devs que estão evoluindo suas carreiras
          </p>
        </div>

        <SignUp
          appearance={{
            variables: {
              colorPrimary: '#FFD15A',
              colorBackground: '#222223',
              colorText: '#E8E8E8',
              colorTextSecondary: '#E8E8E8AA',
              colorInputBackground: '#1A1A1B',
              colorInputText: '#E8E8E8',
              borderRadius: '12px',
            },
            elements: {
              card: 'bg-[#222223] border border-white/10 shadow-2xl',
              headerTitle: 'text-[#E8E8E8] font-geist',
              headerSubtitle: 'text-[#E8E8E8]/60 font-roboto',
              formButtonPrimary:
                'bg-[#FFD15A] text-black hover:bg-[#FFD15A]/90 font-roboto font-semibold',
              footerActionLink: 'text-[#FFD15A] hover:text-[#FFD15A]/80',
              formFieldInput: 'bg-[#1A1A1B] border-white/20 text-[#E8E8E8]',
            },
          }}
          redirectUrl="/dashboard"
          signInUrl="/entrar"
        />
      </div>
    </div>
  )
}
