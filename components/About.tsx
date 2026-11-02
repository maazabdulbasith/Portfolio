'use client'

import { motion } from 'framer-motion'

interface SkillGroup {
  label: string
  skills: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Backend & System Design',
    skills: [
      'Python',
      'Django',
      'Django REST Framework',
      'FastAPI',
      'REST APIs',
      'JWT Authentication',
      'Webhooks',
      'Redis Caching',
      'OpenAPI Spec',
      'API Versioning',
      'Microservices',
      'Payment Gateways (Razorpay, STC Pay, Dhamen Pay)',
    ],
  },
  {
    label: 'AI, Agents & Multimodal',
    skills: [
      'LangGraph',
      'LlamaIndex',
      'RAG & Hybrid Search',
      'pgvector & Embeddings',
      'Gemini 2.5 Flash',
      'Claude 3.5 Sonnet',
      'MediaPipe WASM',
      'Whisper Audio Pipeline',
      'Computer Vision',
      'Prompt Injection Defenses',
    ],
  },
  {
    label: 'Databases & Storage',
    skills: [
      'PostgreSQL',
      'pgvector',
      'Reciprocal Rank Fusion (RRF)',
      'Vector Search',
      'SQL Optimization',
      'MongoDB',
    ],
  },
  {
    label: 'Cloud, DevOps & Infrastructure',
    skills: [
      'Google Cloud Platform (GCP)',
      'Docker',
      'Jenkins',
      'CI/CD Pipelines',
      'Linux Server Administration',
      'Git & GitHub Actions',
    ],
  },
  {
    label: 'Testing & Reliability',
    skills: [
      'pytest',
      'Regression Testing',
      'Integration Testing',
      'Performance Profiling',
      'Latency Optimization',
    ],
  },
  {
    label: 'Frontend & UI',
    skills: ['TypeScript', 'JavaScript', 'React.js', 'Next.js 14', 'Tailwind CSS'],
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
          zero-downtime migrations.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base font-normal leading-relaxed text-slate-600"
        >
          Shipped ZATCA Phase 2 cryptographic e-invoicing for Saudi enterprise clients, and engineered Shelf — an agentic multimodal visual search product utilizing LangGraph, pgvector RRF, and on-device WebAssembly OCR.
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
