'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Profile', href: '#about' },
  { label: 'Experience', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)

    const handleHash = () => {
      const hash = window.location.hash.slice(1)
      if (NAV_ITEMS.map((item) => item.href.slice(1)).includes(hash)) {
        setActiveSection(hash)
      } else {
        setActiveSection('about') // Default to profile/about
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('hashchange', handleHash)
    handleHash() // run on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] h-14 flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-surface-0/85 backdrop-blur-xl border-b border-surface-3'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1100px] mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={() => {
              window.history.pushState(null, '', ' ')
              window.dispatchEvent(new Event('hashchange'))
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="font-display text-xl tracking-[2px] text-txt-primary hover:opacity-100"
          >
            MAA<span className="text-accent">Z</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative text-[10px] font-semibold tracking-[1.5px] uppercase transition-colors duration-250 ${
                      activeSection === item.href.slice(1)
                        ? 'text-accent'
                        : 'text-txt-secondary hover:text-accent'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                        activeSection === item.href.slice(1)
                          ? 'w-full'
                          : 'w-0'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/Abdul_Basith_Maaz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold tracking-[2px] uppercase text-accent border border-accent/25 hover:border-accent hover:bg-accent-dim px-3.5 py-1.5 rounded transition-all duration-300"
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-txt-secondary origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-txt-secondary"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-txt-secondary origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-[999] bg-surface-0/96 backdrop-blur-2xl border-b border-surface-3 p-6 space-y-4"
          >
            <div className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="block text-[12px] font-medium tracking-[1.5px] uppercase text-txt-secondary hover:text-accent py-3.5 border-b border-surface-3 last:border-0 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="/Abdul_Basith_Maaz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="block text-center text-[11px] font-semibold tracking-[2px] uppercase text-accent border border-accent/25 hover:border-accent hover:bg-accent-dim py-3 rounded transition-all duration-300"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}