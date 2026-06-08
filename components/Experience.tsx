'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

interface ExperienceItem {
  role: string
  company: string
  date: string
  bullets: (string | { text: string; callout?: string })[]
}

const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Backend Developer',
    company: 'Bottrion Systems Pvt Ltd',
    date: 'August 2025 – Present',
    bullets: [
      'End-to-end backend ownership across 5 production products (Khayyal, Anan, Waddi, Hawiya, Falcon) — API development, production debugging, deployment troubleshooting, and operational support.',
      {
        text: 'Took sole ownership of Khayyal',
        callout: '50k+ users · KSA',
      },
      'Reverse-engineered and documented a deliberately obfuscated, zero-documentation FastAPI codebase, restoring full engineering visibility and maintaining service continuity.',
      'Acquired direct Linux server access for production incident response — log analysis, database state validation, service monitoring — significantly reducing turnaround time.',
      'Maintained Dhamen Pay and STC Pay payment workflows and webhook pipelines; resolved a 2am production incident where 25+ transactions were misclassified as unpaid — traced the root cause to abandoned checkouts and implemented validation to prevent recurrence.',
      'Resolved recurring Nginx and SSL failures, provisioned isolated development servers for products previously tested on production, and established end-to-end CI/CD pipelines and deployment scripts across the stack.',
      'Leading an ongoing FastAPI-to-Django migration for Khayyal across 131 endpoints, the company\'s primary revenue-generating product.',
    ],
  },
  {
    role: 'AI-DevOps Intern',
    company: 'IBM & Rooman Technologies Pvt Ltd',
    date: 'Sept 2024 – Mar 2025',
    bullets: [
      'Implemented CI/CD pipelines (Jenkins, Docker) and configured containerised environments, reducing deployment setup overhead for a 4-person team.',
    ],
  },
  {
    role: 'AI Code Quality Specialist',
    company: 'Outlier AI (Freelance)',
    date: 'Nov 2024 – Feb 2025',
    bullets: [
      'Reviewed and rewrote 500+ AI-generated code samples for correctness, performance, and best-practice adherence.',
    ],
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
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

export default function Experience() {
  return (
    <section id="work" className="py-24 md:py-32 border-t border-surface-3">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <SectionHeader number="02" label="Experience" title="Where I've worked" />

        <div className="space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="accent-border-card relative py-6"
            >
              <div className="timeline-dot" />

              {/* Header */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <span className="text-lg font-semibold text-txt-primary">
                  {exp.role}
                </span>
                <span className="text-sm font-medium text-accent">
                  {exp.company}
                </span>
              </div>
              <p className="text-xs text-txt-tertiary tracking-wider mb-4">
                {exp.date}
              </p>

              {/* Bullets */}
              <ul className="space-y-2.5">
                {exp.bullets.map((bullet, j) => {
                  const isObj = typeof bullet === 'object'
                  return (
                    <li
                      key={j}
                      className="relative pl-5 text-[13px] text-txt-secondary leading-[1.75]"
                    >
                      <span className="absolute left-0 text-txt-tertiary">
                        —
                      </span>
                      {isObj ? (
                        <>
                          {bullet.text}
                          {bullet.callout && (
                            <span className="callout-badge ml-2 text-[10px]">
                              {bullet.callout}
                            </span>
                          )}
                        </>
                      ) : (
                        bullet
                      )}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
