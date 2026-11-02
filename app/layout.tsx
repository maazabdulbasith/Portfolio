import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import NoiseOverlay from '@/components/NoiseOverlay'
import ScrollProgress from '@/components/ScrollProgress'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Abdul Basith Maaz — Backend & GenAI Engineer',
  description:
    'Backend & GenAI Engineer with production ownership across five SaaS products, including a FastAPI platform serving 50K+ users. LangGraph, pgvector RRF, ZATCA Phase 2 ECDSA, and Gemini vision pipelines.',
  keywords: [
    'Backend Engineer',
    'GenAI Engineer',
    'Agentic Systems',
    'AI/ML Engineer',
    'Software Development Engineer',
    'Python',
    'Django',
    'FastAPI',
    'PostgreSQL',
    'pgvector',
    'LangGraph',
    'LlamaIndex',
    'Redis',
    'ZATCA Phase 2',
    'Next.js',
    'Abdul Basith Maaz',
    'Shelf',
    'Wakat',
  ],
  openGraph: {
    title: 'Abdul Basith Maaz — Backend & GenAI Engineer',
    description:
      '50K+ users. Five SaaS products. Zero downtime. Agentic AI, RAG & production systems.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${jakarta.variable} ${jetbrains.variable} font-sans bg-canvas text-txt-primary antialiased selection:bg-rose-100 selection:text-rose-950`}
      >
        <ScrollProgress />
        <NoiseOverlay />
        {children}
      </body>
    </html>
  )
}
