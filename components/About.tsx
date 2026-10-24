'use client'

import { motion } from 'framer-motion'

interface SkillGroup {
  label: string
  skills: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Backend',
    skills: [
      'Python',
      'Django',
      'Django REST Framework',
      'FastAPI',
      'REST APIs',
      'JWT',
      'Webhooks',
      'Redis',
      'OpenAPI',
      'API Versioning',
      'System Design',
      'Razorpay',
      'STC Pay',
      'Dhamen Pay',
    ],
  },
  {
    label: 'Frontend',
    skills: ['TypeScript', 'JavaScript', 'React.js', 'Next.js'],
  },
  {
    label: 'Databases',
    skills: [
      'PostgreSQL',
      'pgvector',
      'Vector Databases',
      'Embeddings',
      'SQL',
      'MongoDB',
    ],
  },
  {
    label: 'Cloud & DevOps',
    skills: ['GCP', 'Docker', 'Jenkins', 'CI/CD', 'Linux', 'Git'],
  },
  {
    label: 'Testing',
    skills: [
      'pytest',
      'Unit Testing',
      'Integration Testing',
      'Performance Optimization',
    ],
  },
  {
    label: 'AI/ML',
    skills: [
      'RAG',
      'Hybrid Search',
      'LangGraph',
      'LlamaIndex',
      'Gemini',
      'Azure OpenAI',
      'Claude',
      'Mistral',
      'MediaPipe',
      'Computer Vision',
      'Whisper',
      'Parakeet',
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* Bio text (Left column) */}
      <div className="lg:col-span-5">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[15px] md:text-[16px] font-light leading-[1.85] text-txt-secondary"
        >
          <strong className="text-txt-primary font-medium">
            Backend-focused Software Engineer
          </strong>{' '}
          with production ownership across five SaaS products, including a
          FastAPI platform serving 50K+ users. Experienced in Django, FastAPI,
          PostgreSQL, Redis, payment integrations, GCP deployments, and
          zero-downtime migrations. Independently took Waddi&apos;s client-facing
          CRM from ideation to production as sole developer.
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
              <p className="text-[10px] font-semibold tracking-[2px] uppercase text-accent">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
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
