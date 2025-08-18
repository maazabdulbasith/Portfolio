'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { useState, createContext, useContext } from 'react'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

// Theme Context
const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased ${
        isDark 
          ? 'bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
      }`}>
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </ThemeContext.Provider>
      </body>
    </html>
  )
} 