'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Live Systems', href: '#featured' },
  { label: 'Experience', href: '#work' },
  { label: 'All Projects', href: '#projects' },
  { label: 'Skills & Bio', href: '#about' },
  { label: 'GitHub', href: '#github' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)

    const handleHash = () => {
      const hash = window.location.hash.slice(1)
      if (NAV_ITEMS.map((item) => item.href.slice(1)).includes(hash)) {
        setActiveSection(hash)
      } else {
        setActiveSection('featured')
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
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] h-16 flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E2D8]/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
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
            className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-slate-900"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent group-hover:scale-125 transition-transform" />
            <span>Abdul Basith <span className="text-accent font-extrabold">Maaz</span></span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative text-xs font-semibold tracking-wide transition-colors py-1 ${
                      activeSection === item.href.slice(1)
                        ? 'text-accent'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href.slice(1) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/Abdul_Basith_Maaz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-white border border-[#E8E2D8] hover:border-accent hover:text-accent px-4 py-2 rounded-full shadow-sm hover:shadow transition-all"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg border border-[#E8E2D8] bg-white text-slate-800"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              className="block w-4 h-[1.5px] bg-slate-800 origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-4 h-[1.5px] bg-slate-800"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              className="block w-4 h-[1.5px] bg-slate-800 origin-center"
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
            className="fixed top-16 left-0 right-0 z-[999] bg-[#FAF7F2]/98 backdrop-blur-xl border-b border-[#E8E2D8] p-6 shadow-xl space-y-4"
          >
            <div className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className="block text-sm font-medium text-slate-700 hover:text-accent py-3 border-b border-[#E8E2D8]/60 last:border-0 transition-colors"
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
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-accent hover:bg-accent-600 py-3 rounded-xl shadow-md transition-all"
            >
              <span>View Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
