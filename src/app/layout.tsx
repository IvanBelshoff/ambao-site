import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { preload } from 'react-dom'
import { umamiId } from '@/config/umami'

const descricao =
  'Escalas, dízimo, caixa e avisos de cada igreja num só lugar, com a paróquia acompanhando tudo de perto.'

// A prévia do LinkedIn precisa do endereço absoluto do og.png.
const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ambão · O sistema da paróquia e das suas igrejas',
  description: descricao,
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'Ambão · Uma paróquia, muitas igrejas, a mesma comunidade',
    description: descricao,
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#1243a0',
}

export default function Layout({ children }: { children: ReactNode }) {
  preload('/ceu.jpg', { as: 'image' })
  return (
    <html lang="pt-BR">
      <body>
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-field bg-white px-4 py-3 text-[15px] font-medium text-blue focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        {children}
        {/* Só o domínio do SITE_URL conta: o localhost do `npm run dev` não entra nos números. */}
        {umamiId && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={umamiId}
            data-domains={new URL(siteUrl).hostname}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
