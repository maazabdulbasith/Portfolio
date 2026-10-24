'use client'

import { motion } from 'framer-motion'

interface ExperienceItem {
  role: string
  company: string
  date: string
  location?: string
  previousRole?: string
  previousDate?: string
  bullets: (string | { text: string; callout?: string })[]
}

const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Software Development Engineer',
    company: 'Bottrion Systems Pvt. Ltd.',
    date: 'Aug 2026 – Present',
    location: 'Remote',
    previousRole: 'Junior Full Stack Engineer',
    previousDate: 'Aug 2025 – July 2026',
    bullets: [
      {
        text: 'Took sole backend ownership of Khayyal, a KSA SaaS platform serving 50K+ users; reverse-engineered and documented its FastAPI architecture after an engineer transition while maintaining zero downtime.',
        callout: '50k+ users · KSA',
      },
      'Independently designed, built, and launched Waddi\'s client-facing CRM using React, TypeScript, Django REST Framework, and PostgreSQL.',
      'Fixed abandoned-checkout payment-state defects across Razorpay, STC Pay, and Dhamen Pay that falsely marked 25+ transactions unpaid per incident; added pytest regression tests to prevent recurrence.',
      'Optimized OpenAPI schema generation with Redis-backed caching, reducing Swagger documentation load time from 5–10 seconds to under one second.',
      'Leading the zero-downtime migration of 131 endpoints from FastAPI to Django, using API versioning to preserve existing client integrations.',
      'Owned CI/CD and GCP deployments across five SaaS products; standardized Linux log-triage workflows, reducing incident diagnosis from hours to minutes.',
    ],
  },
  {
    role: 'AI/DevOps Intern',
    company: 'IBM & Rooman Technologies Pvt. Ltd.',
    date: 'Sep 2024 – Mar 2025',
    bullets: [
      'Implemented Jenkins CI/CD pipelines and Docker-based environments, reducing deployment setup overhead for a four-person development team.',
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
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Experience() {
  return (
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
            {exp.location && (
              <span className="text-xs text-txt-tertiary">{exp.location}</span>
            )}
          </div>
          <p
            className={`text-xs text-txt-tertiary tracking-wider ${
              exp.previousRole ? 'mb-1' : 'mb-4'
            }`}
          >
            {exp.date}
          </p>
          {exp.previousRole && exp.previousDate && (
            <p className="text-xs text-txt-tertiary tracking-wider mb-4">
              Previously {exp.previousRole} · {exp.previousDate}
            </p>
          )}

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
  )
}
