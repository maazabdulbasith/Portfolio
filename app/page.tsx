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
        <section id="work" className="py-20 md:py-28 border-t border-[#E8E2D8] relative scroll-mt-16">
          <div className="max-w-[1100px] mx-auto px-5 md:px-10">
            {/* Header */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent font-sans">
                  Proven Track Record
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Production Experience
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mt-3 leading-relaxed">
                Full-lifecycle backend engineering, architectural migrations, and multi-tenant SaaS scaling under production workloads.
              </p>
            </div>

            {/* Experience Card */}
            <div className="bg-white border border-[#E8E2D8] rounded-3xl p-6 sm:p-10 shadow-[0_10px_35px_rgba(28,25,23,0.04)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-accent rounded-l" />
              <Experience />
            </div>
          </div>
        </section>

        {/* 4. Complete Catalog & Deep-Dives (Interactive Tabs) */}
        <section id="archive" ref={archiveRef} className="py-20 md:py-28 border-t border-[#E8E2D8] relative scroll-mt-16">
          <div className="max-w-[1100px] mx-auto px-5 md:px-10">
            {/* Header */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                  Complete Catalog &amp; Foundations
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Project Archive &amp; Skills
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mt-3 leading-relaxed">
                Deep-dive into independent consumer utilities, technical skills taxonomy, academic credentials, and open-source GitHub telemetry.
              </p>
            </div>

            {/* Dashboard Container Card */}
            <div className="bg-white border border-[#E8E2D8] rounded-3xl p-6 sm:p-10 shadow-[0_10px_35px_rgba(28,25,23,0.04)] relative overflow-hidden">
              {/* Tabs Bar */}
              <div className="flex flex-wrap gap-2 md:gap-3 border-b border-[#E8E2D8] pb-6 mb-8">
                {ARCHIVE_TABS.map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`px-4 py-2.5 text-xs font-bold tracking-wide rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-accent shadow-[0_4px_14px_rgba(224,83,60,0.25)]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-[#FAF7F2]'
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
