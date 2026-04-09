import PrivacyPage from '@/components/PrivacyPage'

export const metadata = {
  title: 'Política de Privacidade',
  description:
    'Política de privacidade do JavaCodeLab. Saiba como coletamos, usamos e protegemos seus dados em conformidade com a LGPD.',
  robots: { index: false },
}

export default function Page() {
  return <PrivacyPage />
}
