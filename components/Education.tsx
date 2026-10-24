'use client'

import { motion } from 'framer-motion'

export default function Education() {
  return (
    <div className="space-y-10">
      {/* Degree */}
      <div>
        <h3 className="text-lg font-semibold text-txt-primary">
          Bachelor of Engineering in Information Science and Engineering
        </h3>
        <p className="text-[13px] text-txt-secondary mt-0.5">
          Visvesvaraya Technological University
        </p>
        <p className="text-xs text-txt-tertiary tracking-wider mt-0.5">
          2021 – 2025
        </p>
      </div>

      <hr className="border-surface-3 w-16" />

      {/* Certifications */}
      <div>
        <p className="text-[10px] font-semibold tracking-[2px] uppercase text-accent mb-3.5">
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
      </div>

      {/* Publication */}
      <div className="pl-6 border-l-2 border-accent/25 bg-accent-dim rounded-r py-5 px-6">
        <p className="text-[13px] text-txt-secondary leading-[1.75]">
          <strong className="text-txt-primary font-medium">Publication:</strong>{' '}
          &ldquo;Advancements in Deep Learning for Autonomous Driving in Indian
          Road Conditions&rdquo; — Journal of Intelligent Data Analysis and
          Computational Statistics (2024)
        </p>
      </div>
    </div>
  )
}
