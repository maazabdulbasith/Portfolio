'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

interface Project {
  name: string
  badge: string
  badgeType?: 'amber' | 'blue'
  tech: string
  bullets: string[]
}

const PROJECTS: Project[] = [
  {
    name: 'complia.in',
    badge: 'Launched — 50+ Users',
    badgeType: 'amber',
    tech: 'Python · Django · React · Azure OCR · Tesseract',
    bullets: [
      'Compliance notice parsing platform — built, launched, and grew to 50+ users; shut down after assessing long-term viability in the Indian market.',
      'Document ingestion pipeline using Azure OCR with Tesseract fallback for structured data extraction from regulatory notices.',
    ],
  },
  {
    name: 'translay.in',
    badge: 'In Development',
    badgeType: 'blue',
    tech: 'Python · Django · React · DeepL API',
    bullets: [
      'Real-time on-screen translation product that instantly renders anything on screen into a target language — built for consuming foreign-language web and social media content.',
      'Sole developer; architected a low-latency screen capture and overlay pipeline with DeepL API integration.',
    ],
  },
  {
    name: 'AetherNet',
    badge: '',
    tech: 'React · Express · Node.js · TypeScript · Docker',
    bullets: [
      'Multi-AI chat app with simultaneous model interaction and side-by-side response comparison for evaluating AI outputs.',
    ],
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 border-t border-surface-3">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <SectionHeader number="03" label="Projects" title="What I've built" />

        <div className="space-y-0">
          {PROJECTS.map((project, i) => (
            <div key={project.name}>
              {i > 0 && <hr className="border-t border-surface-3 my-0" />}
              <motion.div
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="accent-border-card py-7"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <span className="text-[17px] font-semibold text-txt-primary">
                    {project.name}
                  </span>
                  {project.badge && (
                    <span
                      className={`callout-badge text-[10px] ${
                        project.badgeType === 'blue' ? 'blue' : ''
                      }`}
                    >
                      {project.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-txt-tertiary tracking-wide mb-3.5">
                  {project.tech}
                </p>

                <ul className="space-y-2">
                  {project.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="relative pl-5 text-[13px] text-txt-secondary leading-[1.75]"
                    >
                      <span className="absolute left-0 text-txt-tertiary">
                        —
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
