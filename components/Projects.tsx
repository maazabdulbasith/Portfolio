'use client'

import { motion } from 'framer-motion'

interface Project {
  name: string
  url?: string
  badge: string
  badgeType?: 'amber' | 'blue'
  tech: string
  bullets: string[]
}

const PRODUCTION_PROJECTS: Project[] = [
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
    name: 'Wakat',
    badge: 'Shipped',
    badgeType: 'amber',
    tech: 'Django · Celery · React · PostgreSQL',
    bullets: [
      'Shipped a multi-tenant ZATCA Phase 2 e-invoicing and accounting platform for Saudi businesses, generating UBL XML invoices with per-device hash chains, ECDSA signatures, and nine-tag TLV QR codes, and submitting them to ZATCA\'s Fatoora platform for clearance and reporting.',
      'Built the surrounding books in Django and Celery — subscriptions, purchases, chart of accounts, journals, VAT returns, and payroll — with a React app handling onboarding, device management, and CSID lifecycle.',
    ],
  },
]

const PERSONAL_PROJECTS: Project[] = [
  {
    name: 'Complia.in',
    url: 'https://complia.in',
    badge: 'Live Product',
    badgeType: 'amber',
    tech: 'React Router 7 · Tailwind CSS · Django REST Framework · PostgreSQL',
    bullets: [
      'Built an intelligent tax notice clarification platform ("WebMD for tax notices") decoding intimidating Indian GST (ASMT-10, DRC-01) and Income Tax notices into plain English with root-cause explanations and severity classifications.',
      'Engineered multi-attribute search and keyword trigger indexing (TriggerKeyword) to instantly resolve official notice codes, subject lines, and section numbers into actionable mitigation checklists and statutory deadlines.',
      'Integrated contextual Chartered Accountant (CA) lead routing directly on high-severity notices to connect users with verified professionals at peak intent.',
    ],
  },
  {
    name: 'Translay.in',
    badge: 'Chrome Extension',
    badgeType: 'blue',
    tech: 'Chrome Extension (Manifest V3) · Django REST Framework · Gemini · DeepL · Redis · Canvas API',
    bullets: [
      'Developed a Manifest V3 browser extension and backend pipeline for in-place web translation that measures line geometry and matches source typography via Canvas API (canvas.measureText()) to preserve layout aesthetics without page disruption.',
      'Engineered a multi-model fallback pipeline (DeepL, Google Translate, Gemini) with provider circuit breakers, LRU caching, in-flight request deduplication, and character quota preflight verification.',
      'Implemented viewport-prioritized batched DOM scanning, animated scan/caret selection overlays, and an instant non-destructive "Show Original" hover interaction.',
    ],
  },
  {
    name: 'Shelf',
    badge: 'In Development',
    badgeType: 'blue',
    tech: 'FastAPI · Next.js · pgvector · LangGraph · LlamaIndex',
    bullets: [
      'Building screenshot search that fuses OCR full-text, bge text embeddings, and CLIP image embeddings in pgvector with reciprocal rank fusion and reranking. Hybrid recall@5 was 1.0 and MRR 0.90 on 12 queries (full-text alone 0.83).',
      'LangGraph ingest and LlamaIndex Ask cite sources and refuse thin evidence and prompt injection, with a keyless CI gate (action precision 1.0). Encrypted sync, in progress, keeps ciphertext on the server and embeddings on the device.',
      'Local-first privacy architecture: built for users who capture screenshots instead of notes, ensuring private images and embeddings never leave the device.',
    ],
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="accent-border-card py-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[17px] font-semibold text-txt-primary hover:text-accent transition-colors inline-flex items-center gap-1.5 group"
          >
            <span>{project.name}</span>
            <span className="text-xs text-txt-tertiary group-hover:text-accent transition-colors font-mono">
              ↗
            </span>
          </a>
        ) : (
          <span className="text-[17px] font-semibold text-txt-primary">
            {project.name}
          </span>
        )}
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
  )
}

export default function Projects() {
  return (
    <div className="space-y-12">
      {/* Section 1: Production & Shipped Systems */}
      <div>
        <div className="flex items-center justify-between border-b border-surface-3 pb-3 mb-1">
          <p className="text-[10px] font-semibold tracking-[2px] uppercase text-txt-tertiary">
            Shipped &amp; Production Systems
          </p>
        </div>
        <div className="space-y-0">
          {PRODUCTION_PROJECTS.map((project, i) => (
            <div key={project.name}>
              {i > 0 && <hr className="border-t border-surface-3 my-0" />}
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: "Built because I wanted to" */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between border-b border-surface-3 pb-3 mb-1 gap-2">
          <div>
            <h3 className="text-sm font-semibold tracking-[2px] uppercase text-accent">
              &ldquo;Built because I wanted to&rdquo;
            </h3>
            <p className="text-xs text-txt-tertiary mt-0.5">
              Independent products built out of personal conviction to solve real gaps.
            </p>
          </div>
          <span className="callout-badge text-[10px] blue">
            Personal Products
          </span>
        </div>
        <div className="space-y-0">
          {PERSONAL_PROJECTS.map((project, i) => (
            <div key={project.name}>
              {i > 0 && <hr className="border-t border-surface-3 my-0" />}
              <ProjectCard
                project={project}
                index={i + PRODUCTION_PROJECTS.length}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
