'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FeaturedSystems from '@/components/FeaturedSystems'
import Experience from '@/components/Experience'
import About from '@/components/About'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import GitHubStats from '@/components/GitHubStats'
import Footer from '@/components/Footer'

const ARCHIVE_TABS = [
  { id: 'projects', label: 'All Projects & Tools' },
  { id: 'about', label: 'Technical Skills & Bio' },
  { id: 'education', label: 'Education & Degree' },
  { id: 'github', label: 'GitHub Activity' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('projects')
  const archiveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1)
      if (ARCHIVE_TABS.map((t) => t.id).includes(hash)) {
        setActiveTab(hash)
        setTimeout(() => {
          archiveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      } else if (hash === 'featured' || hash === 'systems') {
        const el = document.getElementById('featured')
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (hash === 'work') {
        const el = document.getElementById('work')
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    window.addEventListener('hashchange', handleHash)
    handleHash() // run on mount
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    window.history.pushState(null, '', `#${tabId}`)
    archiveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Navigation />
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Flagship Systems & Live Demos (Zero Clicks / Immediate Visibility) */}
        <FeaturedSystems />

        {/* 3. Production Work Experience (Directly Visible) */}
        <section id="work" className="py-20 md:py-28 border-t border-surface-3 relative scroll-mt-14">
          <div className="max-w-[1100px] mx-auto px-5 md:px-10">
            {/* Header */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[3px] text-accent font-semibold">
                  Proven Track Record
                </span>
              </div>
              <h2 className="font-display text-section text-txt-primary leading-[1.05]">
                PRODUCTION EXPERIENCE
              </h2>
              <p className="text-sm md:text-base text-txt-secondary max-w-2xl mt-3 leading-relaxed">
                Full-lifecycle backend engineering, architectural migrations, and multi-tenant SaaS scaling under production workloads.
              </p>
            </div>

            {/* Experience Card */}
            <div className="glass-card p-6 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-70" />
              <Experience />
            </div>
          </div>
        </section>

        {/* 4. Complete Catalog & Deep-Dives (Interactive Tabs) */}
        <section id="archive" ref={archiveRef} className="py-20 md:py-28 border-t border-surface-3 relative scroll-mt-14">
          <div className="max-w-[1100px] mx-auto px-5 md:px-10">
            {/* Header */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-txt-tertiary" />
                <span className="text-[11px] font-mono uppercase tracking-[3px] text-txt-tertiary font-semibold">
                  Complete Catalog &amp; Foundations
                </span>
              </div>
              <h2 className="font-display text-section text-txt-primary leading-[1.05]">
                PROJECT ARCHIVE &amp; SKILLS
              </h2>
              <p className="text-sm md:text-base text-txt-secondary max-w-2xl mt-3 leading-relaxed">
                Deep-dive into independent consumer utilities, technical skills taxonomy, academic credentials, and open-source GitHub telemetry.
              </p>
            </div>

            {/* Dashboard Container Card */}
            <div className="glass-card p-6 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-surface-4" />

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 md:gap-4 border-b border-surface-3 pb-6 mb-8">
                {ARCHIVE_TABS.map((tab) => {
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
                    {activeTab === 'projects' && <Projects />}
                    {activeTab === 'about' && <About />}
                    {activeTab === 'education' && <Education />}
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
