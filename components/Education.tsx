'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function Education() {
  return (
    <section className="py-24 md:py-32 border-t border-surface-3">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <SectionHeader number="06" label="Education & Credentials" title="Background" />

        {/* Degree */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-base font-semibold text-txt-primary">
            B.E — Information Science and Engineering
          </p>
          <p className="text-[13px] text-txt-secondary mt-0.5">
            Visvesvaraya Technological University
          </p>
          <p className="text-xs text-txt-tertiary tracking-wider mt-0.5">
            2021 – 2025
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-16 h-px bg-accent origin-left mb-8"
        />

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <p className="text-[11px] font-semibold tracking-[2px] uppercase text-accent mb-3.5">
            Certifications
          </p>
          <ul className="space-y-2">
            {[
              'Nasscom AI DevOps Engineer',
              'NPTEL Cloud Computing',
              'IBM Introduction to Cloud',
              'IBM DevOps Practices',
            ].map((cert) => (
              <li
                key={cert}
                className="relative pl-5 text-[13px] text-txt-secondary leading-[1.75]"
              >
                <span className="absolute left-0 text-txt-tertiary">—</span>
                {cert}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Publication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pl-6 border-l-2 border-accent/25 bg-accent-dim rounded-r py-5 px-6"
        >
          <p className="text-[13px] text-txt-secondary leading-[1.75]">
            <strong className="text-txt-primary font-medium">Publication:</strong>{' '}
            &ldquo;Advancements in Deep Learning for Autonomous Driving in Indian
            Road Conditions&rdquo; — Journal of Intelligent Data Analysis and
            Computational Statistics (2024)
          </p>
        </motion.div>
      </div>
    </section>
  )
}
