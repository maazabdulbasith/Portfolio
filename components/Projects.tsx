'use client'

import { motion } from 'framer-motion'

interface Project {
  name: string
  url?: string
  demoUrl?: string
  badge: string
  badgeType?: 'amber' | 'blue' | 'emerald'
  tech: string
  bullets: string[]
}

const PRODUCTION_PROJECTS: Project[] = [
  {
    name: 'Shelf',
    url: 'https://theonlyshelf.vercel.app',
    demoUrl: '/demos/shelf',
    badge: 'Live Product · Public Beta',
    badgeType: 'emerald',
    tech: 'FastAPI · Next.js · PostgreSQL / pgvector · LangGraph · LlamaIndex · Tesseract.js WASM · Gemini 2.5 Flash',
    bullets: [
      'Shipped a privacy-first screenshot & photo search product running 100% on-device or at ~200ms serverless speed, with a dual-engine pipeline: WebAssembly OCR (Tesseract.js at 750px downscale) and serverless Gemini 2.5 Flash vision (6 parallel workers) extracting text, captions, and 15+ visual tags.',
      'Raised Recall@5 to 1.000 and MRR to 0.903 (full-text baseline 0.833, 12-query benchmark) by fusing OCR full-text, bge-small text embeddings, and CLIP image embeddings in PostgreSQL pgvector with Reciprocal Rank Fusion (k=60), plus a client-side semantic synonym engine.',
      'Hardened answers against prompt injection and thin evidence (keyless CI gate, action precision 1.0) using a LangGraph ingestion state machine and a LlamaIndex-grounded synthesizer citing exact on-image text.',
    ],
  },
  {
    name: 'Wakat',
    url: '/demos/wakat',
    demoUrl: '/demos/wakat',
    badge: 'Enterprise Case Study · Interactive Sandbox',
    badgeType: 'amber',
    tech: 'Django · Celery · PostgreSQL · React · ECDSA secp256k1 · UBL 2.1 XML',
    bullets: [
      'Shipped a multi-tenant ZATCA Phase 2 e-invoicing and accounting platform for Saudi businesses, generating UBL XML invoices with per-device SHA-256 hash chains, ECDSA signatures, and nine-tag TLV QR codes, submitting them to ZATCA\'s Fatoora platform for clearance and reporting.',
      'Built the surrounding books in Django and Celery — subscriptions, purchases, chart of accounts, journals, VAT returns, and payroll — with a React app handling onboarding, device management, and CSID lifecycle.',
      'Sanitized proprietary enterprise architecture into an interactive in-browser cryptographic verification sandbox for technical inspection.',
    ],
  },
  {
    name: 'AI Mock Interview Platform',
    url: '/demos/ai-interview',
    demoUrl: '/demos/ai-interview',
    badge: 'Interactive Demo · Client-Side CV',
    badgeType: 'blue',
    tech: 'Next.js · MediaPipe WASM · Whisper · Parakeet · Gemini · Redis',
    bullets: [
      'Built video and audio pipelines that extract facial, pose, and acoustic signals to generate structured interview feedback using Gemini.',
      'Moved MediaPipe processing from server to browser Web Workers, reducing processing time from approximately 60 seconds to 5–6 seconds while cutting server egress to zero.',
      'Integrated Whisper and Parakeet transcription and added Redis caching, reducing repeated pipeline-loading compute by 50%.',
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
  const isEmerald = project.badgeType === 'emerald'
  const isBlue = project.badgeType === 'blue'
  const isAmber = project.badgeType === 'amber'

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
      <div className="flex flex-wrap items-center gap-2.5 mb-2">
        {project.url ? (
          <a
            href={project.url}
            target={project.url.startsWith('http') ? '_blank' : '_self'}
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
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${
              isEmerald
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                : isBlue
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/25'
                : 'callout-badge'
            }`}
          >
            <span 
              className={`w-1 h-1 rounded-full ${
                isEmerald ? 'bg-emerald-400' : isBlue ? 'bg-blue-400' : 'bg-accent'
              }`} 
            />
            {project.badge}
          </span>
        )}

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target={project.demoUrl.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-txt-tertiary hover:text-accent transition-colors border border-[#27272a] px-2.5 py-0.5 rounded hover:border-[#3f3f46]"
          >
            {project.name === 'Shelf' ? 'Inspect RRF Architecture ↗' : project.name === 'Wakat' ? 'Cryptographic Sandbox ↗' : 'Launch In-Browser Demo ↗'}
          </a>
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
            Flagship &amp; Production Systems
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
              Independent Tools &amp; Products
            </h3>
            <p className="text-xs text-txt-tertiary mt-0.5">
              Consumer utilities built to solve specific workflow gaps.
            </p>
          </div>
          <span className="callout-badge text-[10px] blue">
            Personal Projects
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
