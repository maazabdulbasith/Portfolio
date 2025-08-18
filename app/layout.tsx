'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider>
					<Navigation />
					<main className="pt-16">{children}</main>
				</ThemeProvider>
			</body>
		</html>
	)
} 