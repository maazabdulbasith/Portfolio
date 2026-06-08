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
  title: 'Abdul Basith Maaz — Full Stack Developer',
  description:
    'Backend-focused Full Stack Developer with production ownership across multiple SaaS products. Production ownership. Zero hand-holding.',
  keywords: [
    'Full Stack Developer',
    'Backend Developer',
    'Python',
    'Django',
    'FastAPI',
    'React',
    'Portfolio',
    'Abdul Basith Maaz',
  ],
  openGraph: {
    title: 'Abdul Basith Maaz — Full Stack Developer',
    description: 'Production ownership. Zero hand-holding.',
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