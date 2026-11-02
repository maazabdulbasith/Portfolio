'use client'

import { motion } from 'framer-motion'

export default function Education() {
  return (
    <div className="space-y-10">
      {/* Degree */}
      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Bachelor of Engineering in Information Science and Engineering
        </h3>
        <p className="text-sm font-semibold text-slate-600 mt-1">
          Visvesvaraya Technological University (VTU) · HKBK College of Engineering
        </p>
        <p className="text-xs font-semibold text-slate-400 tracking-wide mt-1">
          Graduated May 2025 · CGPA: 7.56 / 10.0
        </p>
      </div>

      <hr className="border-[#E8E2D8] w-20" />

      {/* Certifications */}
      <div>
        <p className="text-xs font-bold tracking-wider uppercase text-accent mb-3.5">
          Certifications &amp; Accreditations
        </p>
        <ul className="space-y-2.5">
          {[
            'Nasscom AI DevOps Engineer',
            'NPTEL Cloud Computing Certification',
            'IBM Introduction to Cloud Computing',
            'IBM DevOps Practices & Tooling',
          ].map((cert) => (
            <li
              key={cert}
              className="relative pl-5 text-sm text-slate-600 leading-relaxed"
            >
              <span className="absolute left-0 text-accent font-bold">•</span>
              {cert}
            </li>
          ))}
        </ul>
      </div>

      {/* Publication */}
      <div className="p-6 border-l-4 border-accent bg-rose-50/70 rounded-r-2xl">
        <p className="text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-bold">Peer-Reviewed Publication:</strong>{' '}
          &ldquo;Advancements in Deep Learning for Autonomous Driving in Indian
          Road Conditions&rdquo; — Published in the <em>Journal of Intelligent Data Analysis and
          Computational Statistics</em> (2024).
        </p>
      </div>
    </div>
  )
}
