import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Marketing for Contractors — Marketing de Crescimento para Construtoras Residenciais',
  description:
    'Ajudamos empreiteiros gerais, construtoras e empresas de reforma residencial a conseguirem mais leads qualificados, orçamentos e projetos assinados por meio de publicidade paga, sistemas de CRM e rastreamento claro de vendas.',
  alternates: {
    canonical: 'https://www.mktforcontractors.com/br',
    languages: {
      'pt-BR': 'https://www.mktforcontractors.com/br',
      'en-US': 'https://www.mktforcontractors.com',
      'x-default': 'https://www.mktforcontractors.com',
    },
  },
  openGraph: {
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFFFF',
}

export default function BRLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // lang="pt-BR" is set here so all /br/* pages inherit the correct language tag
  return <div lang="pt-BR">{children}</div>
}
