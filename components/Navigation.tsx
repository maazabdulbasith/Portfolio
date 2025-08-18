'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Home, User, FolderOpen, BarChart3, Calendar, MessageCircle, HelpCircle, MapPin, TrendingUp, PieChart, Activity } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/app/layout'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionIndex: number) => {
    const sections = ['hero', 'dashboard', 'about', 'contact', 'footer']
    window.scrollTo({
      top: sectionIndex * window.innerHeight,
      behavior: 'smooth'
    })
  }

  const navItems = [
    { name: 'Home', action: () => scrollToSection(0), icon: Home },
    { name: 'Dashboard', action: () => scrollToSection(1), icon: Activity },
    { name: 'About', action: () => scrollToSection(2), icon: User },
    { name: 'Contact', action: () => scrollToSection(3), icon: MessageCircle },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => scrollToSection(0)}
            className="text-2xl font-bold gradient-text cursor-pointer"
          >
            Maaz.dev
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className={`transition-colors duration-300 relative group flex items-center space-x-1 ${
                  isDark 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <item.icon size={16} />
                <span>{item.name}</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isDark 
                    ? 'bg-gradient-to-r from-primary-400 to-secondary-500' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-gray-800/10 hover:bg-gray-800/20 text-gray-800'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-gray-800/10 hover:bg-gray-800/20 text-gray-800'
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden ${isDark ? 'glass' : 'bg-white/90 backdrop-blur-md border border-gray-200'}`}
          >
            <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action()
                    setIsMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 transition-colors duration-300 flex items-center space-x-2 ${
                    isDark 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 