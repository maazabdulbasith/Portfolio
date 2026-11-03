'use client'

import { motion } from 'framer-motion'

interface SkillGroup {
  label: string
  skills: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Multi-Agent Systems',
    skills: [
      'CrewAI',
      'AutoGPT (ReAct)',
      'LangGraph',
      'LlamaIndex Synthesizers',
    ],
  },
  {
    label: 'Retrieval & Vector DBs',
    skills: [
      'PostgreSQL pgvector',
      'HNSW & IVFFlat Indexes',
      'Reciprocal Rank Fusion (k=60)',
      'Hybrid Search',
      'Semantic Caching',
      'FastEmbed ONNX',
    ],
  },
  {
    label: 'LLMs & Guardrails',
    skills: [
      'Gemini 2.5 Flash / Flash-Lite',
      'Prompt Injection Defenses',
      'Thin-Evidence Gating',
      'Pydantic Structured Outputs',
      'Token Budget Management',
    ],
  },
  {
    label: 'Backend & Cloud',
    skills: [
      'Python 3.12',
      'FastAPI',
      'Django REST Framework',
      'Celery',
      'Redis',
      'WebAssembly (WASM)',
      'Docker',
      'AsyncIO',
      'Linux Administration',
      'GCP',
      'Nginx',
      'pytest',
      'RESTful APIs',
      'Git',
    ],
  },
  {
    label: 'Languages & Web',
    skills: [
      'Python',
      'TypeScript',
      'JavaScript',
      'SQL',
      'React.js',
      'Next.js 15',
      'Tailwind CSS',
    ],
  },
]

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const tagVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
}

export default function About() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Bio text (Left column) */}
      <div className="lg:col-span-5 space-y-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base font-normal leading-relaxed text-slate-600"
        >
          <strong className="text-slate-900 font-semibold">
            Backend &amp; GenAI Engineer
          </strong>{' '}
          with production ownership across five SaaS products, including a
          FastAPI platform serving 50K+ users. Experienced in Django, FastAPI,
          PostgreSQL, Redis, payment integrations, GCP deployments, and
          zero-downtime migrations. Took the Waddi client-facing CRM from ideation to production as sole developer.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base font-normal leading-relaxed text-slate-600"
        >
          Shipped ZATCA Phase 2 cryptographic e-invoicing for Saudi enterprise clients, and engineered Shelf — an agentic multimodal visual search product utilizing CrewAI, AutoGPT ReAct, LangGraph, pgvector RRF, and on-device WebAssembly OCR.
        </motion.p>
      </div>

      {/* Technical Stack (Right column) */}
      <div className="lg:col-span-7">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-6"
        >
          {SKILL_GROUPS.map((group) => (
            <motion.div key={group.label} variants={itemVariant} className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-accent">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariant}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
