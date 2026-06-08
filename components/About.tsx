'use client'

import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-surface-3">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <SectionHeader number="01" label="About" title="Who I am" />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[15px] md:text-lg font-light leading-[1.9] text-txt-secondary max-w-[780px]"
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
    </section>
  )
}
