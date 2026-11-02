'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowUpRight, CheckCircle2, Lock, Terminal, 
  Sparkles, ShieldCheck, Zap
} from 'lucide-react'

interface FlagshipSystem {
  id: string
  name: string
  category: string
  tagline: string
  statusBadge: string
  badgeTone: 'emerald' | 'amber' | 'blue'
  liveUrl?: string
  demoUrl: string
  githubUrl?: string
  metrics: { label: string; value: string }[]
  highlights: string[]
  techStack: string[]
  confidentialNotice?: string
}

const FLAGSHIP_SYSTEMS: FlagshipSystem[] = [
  {
    id: 'shelf',
    name: 'Shelf',
    category: 'Multimodal AI · Visual Semantic Memory',
    tagline: 'High-recall personal search engine that indexes screenshots and camera photos with zero cloud data leak or at ~200ms serverless speed.',
    statusBadge: 'Live Product · Public Beta',
    badgeTone: 'emerald',
    liveUrl: 'https://theonlyshelf.vercel.app',
    demoUrl: '/demos/shelf',
    githubUrl: 'https://github.com/maazabdulbasith/shelf',
    metrics: [
      { label: 'Recall@5', value: '1.000' },
      { label: 'Baseline R@5', value: '0.833' },
      { label: 'Local WASM', value: '~600ms' },
      { label: 'Gemini Vision', value: '~200ms' },
    ],
    highlights: [
      'Dual-Engine Ingestion: Offloads privacy-critical OCR to client-side Tesseract.js WebAssembly (~600ms at 750px canvas downscale) or switches to serverless Gemini 2.5 Flash (6 parallel workers) for scene captions and 15+ visual tags (#family, #code, #receipt).',
      'Hybrid pgvector RRF: Fuses OCR full-text, CLIP embeddings, and bge-small text vectors in PostgreSQL pgvector via Reciprocal Rank Fusion (k=60), boosting MRR from 0.722 to 0.903 on 12-query benchmark set.',
      'Hardened Agentic Synthesis: LangGraph ingestion state machine and LlamaIndex grounded synthesizer citing exact on-image text to prevent hallucination; enforces thin-evidence gates and keyless CI checks (precision 1.0).',
    ],
    techStack: ['LangGraph', 'PostgreSQL / pgvector', 'Gemini 2.5 Flash', 'Tesseract.js WASM', 'FastAPI', 'Next.js 14'],
  },
  {
    id: 'wakat',
    name: 'Wakat',
    category: 'Enterprise Cryptography · E-Invoicing Ledger',
    tagline: 'Multi-tenant ZATCA Phase 2 compliance engine generating cryptographically signed UBL 2.1 XML invoices with per-device SHA-256 hash chains.',
    statusBadge: 'Enterprise Case Study · Interactive Sandbox',
    badgeTone: 'amber',
    demoUrl: '/demos/wakat',
    metrics: [
      { label: 'Compliance', value: 'ZATCA Phase 2' },
      { label: 'Cryptography', value: 'ECDSA secp256k1' },
      { label: 'QR Encoding', value: '9-Tag TLV Base64' },
      { label: 'Clearance API', value: 'Fatoora Portal' },
    ],
    highlights: [
      'Cryptographic Hash Chains: Engineered per-device SHA-256 hash chaining to ensure tamper-evident sequential invoicing, certified ECDSA digital signatures, and automated clearance reporting to Saudi Arabia\'s tax authority.',
      '9-Tag Binary TLV Engine: Implemented binary Tag-Length-Value QR encoding embedding seller credentials, VAT registration, UTC timestamps, line-item totals, VAT amounts, and cryptographic signature stamps.',
      'Core Financial Backend: Built multi-tenant ledger in Django and Celery handling double-entry journals, chart of accounts, automated VAT returns, and cryptographic CSID device onboarding.',
    ],
    techStack: ['Django', 'Celery', 'PostgreSQL', 'ECDSA secp256k1', 'UBL XML', 'React'],
    confidentialNotice: 'Proprietary enterprise IP sanitized into an interactive cryptographic verification simulator.',
  },
  {
    id: 'ai-interview',
    name: 'AI Interview Intelligence',
    category: 'In-Browser Vision · Audio Telemetry Pipeline',
    tagline: 'Client-side computer vision telemetry and speech pipeline extracting 468-point facial mesh, gaze drift, and acoustic markers for automated evaluation.',
    statusBadge: 'Interactive Demo · Client-Side CV',
    badgeTone: 'blue',
    demoUrl: '/demos/ai-interview',
    metrics: [
      { label: 'Latency Cut', value: '60s → 5-6s' },
      { label: 'Face Mesh', value: '468 Points (WASM)' },
      { label: 'Server Egress', value: '0 GPU Overhead' },
      { label: 'Audio Pipeline', value: 'Whisper + Redis' },
    ],
    highlights: [
      'In-Browser MediaPipe Offloading: Moved 468-point facial landmark and pose mesh processing from backend GPU instances to client-side browser Web Workers, reducing latency by 90% and eliminating expensive streaming bandwidth.',
      'Acoustic Cache & Speech Analysis: Integrated Whisper and Parakeet transcription pipelines with Redis-backed caching, eliminating 50% of redundant audio compute on repeated segments.',
      'Telemetry Feedback Engine: Computes real-time gaze fixation, head yaw variance, emotional engagement ratios, and speech cadence to deliver structured candidate evaluation reports.',
    ],
    techStack: ['Next.js 14', 'MediaPipe WASM', 'Whisper', 'Parakeet', 'Redis', 'Gemini'],
  },
]

export default function FeaturedSystems() {
  return (
    <section id="featured" className="py-20 md:py-28 border-t border-[#E8E2D8] relative scroll-mt-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-tr from-rose-100/40 via-amber-100/30 to-indigo-100/30 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-sans">
              Proof of Work · Live Demonstrations
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Flagship Systems &amp; Live Demos
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mt-3 leading-relaxed">
            Production software and interactive prototypes you can test right now. No waitlists, no credential walls, and no broken staging URLs.
          </p>
        </div>

        {/* Flagship Cards Grid */}
        <div className="space-y-10">
          {FLAGSHIP_SYSTEMS.map((system, idx) => {
            const isEmerald = system.badgeTone === 'emerald'
            const isAmber = system.badgeTone === 'amber'
            const isBlue = system.badgeTone === 'blue'

            return (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-3xl bg-white border border-[#E8E2D8] hover:border-slate-300 transition-all duration-300 overflow-hidden shadow-[0_10px_35px_rgba(28,25,23,0.04)] hover:shadow-[0_16px_45px_rgba(28,25,23,0.08)]"
              >
                {/* Glow accent bar at top */}
                <div 
                  className={`h-[3px] w-full transition-all duration-500 ${
                    isEmerald 
                      ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500' 
                      : isAmber
                      ? 'bg-gradient-to-r from-accent via-rose-400 to-accent'
                      : 'bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600'
                  }`}
                />

                <div className="p-6 sm:p-9 md:p-10">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-accent transition-colors">
                          {system.name}
                        </h3>
                        
                        {/* Live Status Badge */}
                        <span 
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                            isEmerald
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : isAmber
                              ? 'bg-rose-50 text-accent border border-rose-200'
                              : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          }`}
                        >
                          <span 
                            className={`w-2 h-2 rounded-full animate-ping ${
                              isEmerald ? 'bg-emerald-500' : isAmber ? 'bg-accent' : 'bg-indigo-500'
                            }`} 
                          />
                          {system.statusBadge}
                        </span>
                      </div>
                      
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {system.category}
                      </p>
                    </div>

                    {/* Direct Launch Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {system.liveUrl && (
                        <a
                          href={system.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-[0_4px_14px_rgba(5,150,105,0.25)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.35)] transition-all"
                        >
                          <span>Launch Live App</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <Link
                        href={system.demoUrl}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all ${
                          !system.liveUrl
                            ? isAmber
                              ? 'text-white bg-gradient-to-r from-accent to-[#cb3720] hover:from-[#cb3720] hover:to-accent shadow-[0_4px_14px_rgba(224,83,60,0.25)]'
                              : 'text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-[0_4px_14px_rgba(79,70,229,0.25)]'
                            : 'text-slate-700 bg-[#FAF7F2] border border-[#E8E2D8] hover:border-slate-400 hover:bg-white'
                        }`}
                      >
                        <span>Interactive Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      {system.githubUrl && (
                        <a
                          href={system.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-500 hover:text-slate-900 bg-[#FAF7F2] border border-[#E8E2D8] hover:border-slate-400 transition-all"
                          title="View GitHub Repository"
                        >
                          <Terminal className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
                    {system.tagline}
                  </p>

                  {/* Telemetry Chips Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                    {system.metrics.map((metric, mIdx) => (
                      <div 
                        key={mIdx}
                        className="bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl p-3 text-center transition-colors group-hover:border-slate-300"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                          {metric.label}
                        </div>
                        <div className="text-base font-extrabold font-mono text-slate-900">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Highlight Bullets */}
                  <ul className="space-y-3 mb-7">
                    {system.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Confidential Notice (If Applicable) */}
                  {system.confidentialNotice && (
                    <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-2.5 text-xs font-medium text-amber-800">
                      <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{system.confidentialNotice}</span>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-[#E8E2D8]/80">
                    <span className="text-xs font-semibold text-slate-400 mr-1">
                      Stack:
                    </span>
                    {system.techStack.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs font-medium text-slate-700 bg-[#FAF7F2] border border-[#E8E2D8] px-3 py-1 rounded-full hover:border-slate-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
