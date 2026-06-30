'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import GitHubStats from '@/components/GitHubStats'
import Footer from '@/components/Footer'

const TABS = [
  { id: 'about', label: 'Profile' },
  { id: 'work', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('about')
  const dashboardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1)
      if (TABS.map(t => t.id).includes(hash)) {
        setActiveTab(hash)
        
        // Scroll to dashboard smoothly
        setTimeout(() => {
          dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }

    window.addEventListener('hashchange', handleHash)
    handleHash() // run on mount
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    // Update hash silently without jumping
    window.history.pushState(null, '', `#${tabId}`)
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        
        {/* Dashboard Section */}
        <section id="dashboard" ref={dashboardRef} className="py-20 border-t border-surface-3 scroll-mt-14">
          <div className="max-w-[1100px] mx-auto px-5 md:px-10">
            {/* Dashboard Container Card */}
            <div className="glass-card p-6 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Decorative side accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-70" />

              {/* Header / Tabs */}
              <div className="flex flex-wrap gap-2 md:gap-4 border-b border-surface-3 pb-6 mb-8">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`px-4 py-2.5 text-[11px] font-semibold tracking-[2px] uppercase rounded-md relative transition-all duration-300 ${
                        isActive
                          ? 'text-bg bg-accent'
                          : 'text-txt-secondary hover:text-txt-primary hover:bg-surface-3'
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {/* Active Tab Component */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {activeTab === 'about' && <About />}
                    {activeTab === 'work' && <Experience />}
                    {activeTab === 'education' && <Education />}
                    {activeTab === 'projects' && <Projects />}
                    {activeTab === 'github' && <GitHubStats />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}