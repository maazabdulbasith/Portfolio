import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import NoiseOverlay from '@/components/NoiseOverlay'
import ScrollProgress from '@/components/ScrollProgress'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Abdul Basith Maaz — Backend Software Engineer',
  description:
    'Backend-focused Software Engineer with production ownership across five SaaS products, including a FastAPI platform serving 50K+ users. Django, FastAPI, PostgreSQL, Redis, GCP.',
  keywords: [
    'Backend Engineer',
    'Software Development Engineer',
    'Python',
    'Django',
    'FastAPI',
    'PostgreSQL',
    'pgvector',
    'RAG',
    'LangGraph',
    'LlamaIndex',
    'Redis',
    'GCP',
    'React',
    'Next.js',
    'Portfolio',
    'Abdul Basith Maaz',
  ],
  openGraph: {
    title: 'Abdul Basith Maaz — Backend Software Engineer',
    description:
      '50K+ users. Five SaaS products. Zero downtime. Django, FastAPI, PostgreSQL, RAG, LangGraph.',
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
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${jetbrains.variable} font-mono bg-surface-0 text-txt-primary antialiased`}
      >
        <ScrollProgress />
        <NoiseOverlay />
        {children}
      </body>
    </html>
  )
}