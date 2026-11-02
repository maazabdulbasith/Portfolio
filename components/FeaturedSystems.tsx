'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ExternalLink, ShieldCheck, Zap, Layers, Sparkles, 
  Terminal, Cpu, ArrowUpRight, CheckCircle2, Lock, Eye
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
    <section id="featured" className="py-20 md:py-28 border-t border-surface-3 relative scroll-mt-14">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[3px] text-accent font-semibold">
              Proof of Work · Live Demonstrations
            </span>
          </div>
          <h2 className="font-display text-section text-txt-primary leading-[1.05]">
            FLAGSHIP SYSTEMS &amp; LIVE DEMOS
          </h2>
          <p className="text-sm md:text-base text-txt-secondary max-w-2xl mt-3 leading-relaxed">
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
                className="group relative rounded-xl bg-surface-1/70 border border-surface-3 hover:border-surface-4 transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-md"
              >
                {/* Glow accent bar at top */}
                <div 
                  className={`h-[2px] w-full transition-all duration-500 ${
                    isEmerald 
                      ? 'bg-gradient-to-r from-emerald-500/0 via-emerald-400 to-emerald-500/0 opacity-70 group-hover:opacity-100' 
                      : isAmber
                      ? 'bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-70 group-hover:opacity-100'
                      : 'bg-gradient-to-r from-blue-500/0 via-blue-400 to-blue-500/0 opacity-70 group-hover:opacity-100'
                  }`}
                />

                <div className="p-6 md:p-9">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-3xl md:text-4xl tracking-wide text-txt-primary group-hover:text-accent transition-colors">
                          {system.name}
                        </h3>
                        
                        {/* Live Status Badge */}
                        <span 
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                            isEmerald
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : isAmber
                              ? 'bg-accent-dim text-accent border border-accent/25'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}
                        >
                          <span 
                            className={`w-1.5 h-1.5 rounded-full animate-ping ${
                              isEmerald ? 'bg-emerald-400' : isAmber ? 'bg-accent' : 'bg-blue-400'
                            }`} 
                          />
                          {system.statusBadge}
                        </span>
                      </div>
                      
                      <p className="text-xs font-mono uppercase tracking-wider text-txt-tertiary">
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
                          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-md text-bg bg-accent border border-accent hover:bg-transparent hover:text-accent transition-all duration-300 shadow-[0_0_15px_rgba(245,166,35,0.2)]"
                        >
                          <span>Launch Live App</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <Link
                        href={system.demoUrl}
                        className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-md text-txt-primary bg-surface-2/80 border border-surface-3 hover:border-accent hover:text-accent transition-all duration-300"
                      >
                        <span>Interactive Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-txt-tertiary" />
                      </Link>

                      {system.githubUrl && (
                        <a
                          href={system.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2.5 rounded-md text-txt-tertiary hover:text-txt-primary border border-surface-3 hover:border-surface-4 transition-all"
                          title="View GitHub Repository"
                        >
                          <Terminal className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm md:text-base text-txt-secondary font-light leading-relaxed mb-6">
                    {system.tagline}
                  </p>

                  {/* Telemetry Chips Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
                    {system.metrics.map((metric, mIdx) => (
                      <div 
                        key={mIdx}
                        className="bg-surface-0/60 border border-surface-3 rounded-lg p-2.5 sm:p-3 text-center transition-colors group-hover:border-surface-4"
                      >
                        <div className="text-[10px] font-mono uppercase tracking-wider text-txt-tertiary mb-1">
                          {metric.label}
                        </div>
                        <div className="text-sm sm:text-base font-semibold font-mono text-txt-primary">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Highlight Bullets */}
                  <ul className="space-y-2.5 mb-7">
                    {system.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-txt-secondary leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-accent/80 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Confidential Notice (If Applicable) */}
                  {system.confidentialNotice && (
                    <div className="mb-6 px-3.5 py-2.5 rounded-md bg-surface-0/80 border border-surface-3/80 flex items-center gap-2.5 text-[11px] font-mono text-txt-tertiary">
                      <Lock className="w-3.5 h-3.5 text-accent/70 shrink-0" />
                      <span>{system.confidentialNotice}</span>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-surface-3/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-txt-tertiary mr-2">
                      Stack:
                    </span>
                    {system.techStack.map((tech) => (
                      <span 
                        key={tech}
                        className="text-[11px] font-mono text-txt-secondary bg-surface-0/80 border border-surface-3 px-2.5 py-1 rounded hover:text-accent hover:border-accent/30 transition-colors"
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
