'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  number: string
  label: string
  title: string
}

export default function SectionHeader({ number, label, title }: SectionHeaderProps) {
  return (
    <div className="relative mb-12 md:mb-16">
      {/* Large decorative number */}
      <div className="section-num absolute -top-6 right-0 text-section-num select-none opacity-100 hidden md:block">
        {number}
      </div>

      <motion.span
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="inline-block text-[11px] font-semibold tracking-[3px] uppercase text-accent mb-3"
      >
        {label}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-section"
      >
        {title}
      </motion.h2>
    </div>
  )
}
