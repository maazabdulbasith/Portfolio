'use client'

import { motion } from 'framer-motion'

interface Project {
  name: string
  badge: string
  badgeType?: 'amber' | 'blue'
  tech: string
  bullets: string[]
}

const PROJECTS: Project[] = [
  {
    name: 'AI Mock Interview Platform',
    badge: 'Latest',
    badgeType: 'blue',
    tech: 'Next.js · MediaPipe · Whisper · Parakeet · Gemini',
    bullets: [
      'Built video and audio pipelines that extract facial and pose signals and generate structured interview feedback using Gemini.',
      'Moved MediaPipe processing from server to browser, reducing processing time from approximately 60 seconds to 5–6 seconds while lowering server load and bandwidth usage.',
      'Integrated Whisper and Parakeet transcription and added Redis caching, reducing repeated pipeline-loading time by 50%.',
    ],
  },
  {
    name: 'Complia.in',
    badge: 'Launched — 50+ Users',
    badgeType: 'amber',
    tech: 'Python · Django · React · Azure OCR · Tesseract',
    bullets: [
      'Built and launched a compliance-notice parsing platform that acquired 50+ users, combining Azure OCR and Tesseract with a Django and React workflow.',
      'Document ingestion pipeline using Azure OCR with Tesseract fallback for structured data extraction from regulatory notices.',
    ],
  },
  {
    name: 'Translay.in',
    badge: 'In Development',
    badgeType: 'blue',
    tech: 'Python · Django · React · DeepL API',
    bullets: [
      'Real-time on-screen translation product that renders on-screen content into a target language for foreign-language web and social media consumption.',
      'Sole developer; architected a low-latency screen capture and overlay pipeline with DeepL API integration.',
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
  )
}
