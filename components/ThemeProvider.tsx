'use client'

import { createContext, useContext, useState } from 'react'

type ThemeContextValue = {
	isDark: boolean
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
	isDark: true,
	toggleTheme: () => {}
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isDark, setIsDark] = useState(true)
	const toggleTheme = () => setIsDark((prev) => !prev)

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			<div
				className={
					isDark
						? 'min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white'
						: 'min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
				}
			>
				{children}
			</div>
		</ThemeContext.Provider>
	)
} 