'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

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

const groupVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const tagVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.35,
    },
  }),
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 border-t border-surface-3">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <SectionHeader number="04" label="Skills" title="Technical stack" />

        <div className="space-y-9">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              custom={gi}
              variants={groupVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <p className="text-[11px] font-semibold tracking-[2px] uppercase text-accent mb-3.5">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    custom={si}
                    variants={tagVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
