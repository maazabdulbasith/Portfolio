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
      'FastAPI',
      'Django',
      'REST Framework',
      'Node.js',
      'Express',
      'JWT',
      'Webhooks',
      'Payment Gateways',
    ],
  },
  {
    label: 'Frontend',
    skills: ['React.js', 'JavaScript', 'TypeScript'],
  },
  {
    label: 'Database',
    skills: ['PostgreSQL', 'MongoDB'],
  },
  {
    label: 'Infrastructure',
    skills: [
      'Linux',
      'Server Ops',
      'Log Analysis',
      'Docker',
      'CI/CD',
      'Git',
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
            Backend-focused Full Stack Developer
          </strong>{' '}
          with production ownership across multiple SaaS products at a startup.
          Experienced in legacy codebase recovery, payment/webhook systems,
          Linux ops, and end-to-end product development — including two
          self-built products taken to market.
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
