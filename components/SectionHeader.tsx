'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  number: string
  label: string
  title: string
}

export default function SectionHeader({ number, label, title }: SectionHeaderProps) {
  return (
    <div className="relative mb-12 md:mb-14">
      {/* Large decorative number */}
      <div className="section-num absolute -top-5 right-0 text-section-num select-none opacity-40 hidden md:block text-slate-200">
        {number}
      </div>

      <motion.span
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="inline-block text-xs font-bold uppercase tracking-wider text-accent mb-2.5"
      >
        {label}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
      >
        {title}
      </motion.h2>
    </div>
  )
}
