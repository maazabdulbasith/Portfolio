'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, Mail, Github, Linkedin, Phone } from 'lucide-react'

function useTypewriter(strings: string[], typingSpeed = 80, deletingSpeed = 40, pause = 2200) {
  const [text, setText] = useState('')
  const [stringIndex, setStringIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = strings[stringIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, charIndex + 1))
        setCharIndex((i) => i + 1)

        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        setText(current.slice(0, charIndex - 1))
        setCharIndex((i) => i - 1)

        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setStringIndex((i) => (i + 1) % strings.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, strings, stringIndex, typingSpeed, deletingSpeed, pause])

  return text
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Hero() {
  const typedText = useTypewriter(
    [
      'Backend & GenAI Engineer',
      'Agentic Systems Architect',
      'Production Systems Engineer',
      'Software Development Engineer',
    ],
    70,
    35,
    2400
  )

  return (
    <section id="hero" className="py-20 md:py-28 flex items-center pt-28 md:pt-36 relative">
      {/* Background warm ambient color blooms */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gradient-to-tr from-rose-200/35 via-amber-100/40 to-indigo-100/30 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-[1100px] mx-auto px-5 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {/* Availability pill */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-accent border border-rose-200/80 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Available for Backend &amp; GenAI Engineering Roles
            </span>
          </motion.div>

          {/* Name & Title */}
          <motion.div variants={item} className="space-y-2">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Abdul Basith <span className="text-accent underline decoration-rose-300 decoration-wavy decoration-2 underline-offset-8">Maaz</span>
            </h1>
            <div className="flex items-center text-lg sm:text-2xl font-medium text-slate-600 pt-1">
              <span>{typedText}</span>
              <span className="cursor-blink bg-accent" />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed pt-1"
          >
            Building high-throughput backends, agentic AI pipelines, and verified production architectures. <strong className="font-semibold text-slate-900">50K+ users. Five SaaS products. Zero downtime.</strong>
          </motion.p>

          {/* Contact pills */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-2.5 text-xs font-medium text-slate-600 pt-2"
          >
            <a 
              href="mailto:maazabdulbasith@gmail.com" 
              className="inline-flex items-center gap-1.5 bg-white border border-[#E8E2D8] hover:border-accent hover:text-accent px-3.5 py-1.5 rounded-full shadow-sm transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>maazabdulbasith@gmail.com</span>
            </a>
            <a 
              href="https://github.com/maazabdulbasith" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 bg-white border border-[#E8E2D8] hover:border-accent hover:text-accent px-3.5 py-1.5 rounded-full shadow-sm transition-all"
            >
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>github.com/maazabdulbasith</span>
            </a>
            <a 
              href="https://linkedin.com/in/abdul-basith-maaz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 bg-white border border-[#E8E2D8] hover:border-accent hover:text-accent px-3.5 py-1.5 rounded-full shadow-sm transition-all"
            >
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="tel:+919901061725" 
              className="inline-flex items-center gap-1.5 bg-white border border-[#E8E2D8] hover:border-accent hover:text-accent px-3.5 py-1.5 rounded-full shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>(+91) 9901061725</span>
            </a>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={item} className="pt-5 flex flex-wrap gap-3.5">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-accent to-[#cb3720] hover:from-[#cb3720] hover:to-accent px-6 py-3.5 rounded-xl shadow-[0_6px_20px_rgba(224,83,60,0.28)] hover:shadow-[0_8px_25px_rgba(224,83,60,0.38)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Explore Live Systems</span>
              <Sparkles className="w-4 h-4" />
            </a>
            <a
              href="/Abdul_Basith_Maaz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-slate-800 bg-white border border-[#E8E2D8] hover:border-slate-400 px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <span>View Resume (PDF)</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-slate-600 hover:text-slate-900 bg-transparent border border-transparent hover:border-[#E8E2D8] px-5 py-3.5 rounded-xl transition-all duration-200 hidden sm:inline-flex"
            >
              <span>Experience</span>
            </a>
          </motion.div>

          {/* Quick Metrics Strip */}
          <motion.div 
            variants={item} 
            className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-[850px]"
          >
            <div className="bg-white border border-[#E8E2D8] p-4 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-accent/40 transition-all">
              <div className="text-accent font-extrabold text-2xl tracking-tight">50K+</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">Active Users (Khayyal)</div>
            </div>
            <div className="bg-white border border-[#E8E2D8] p-4 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-accent/40 transition-all">
              <div className="text-accent font-extrabold text-2xl tracking-tight">1.000</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">Recall@5 (Shelf pgvector)</div>
            </div>
            <div className="bg-white border border-[#E8E2D8] p-4 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-accent/40 transition-all">
              <div className="text-accent font-extrabold text-2xl tracking-tight">~600ms</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">Client WASM Vision</div>
            </div>
            <div className="bg-white border border-[#E8E2D8] p-4 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-accent/40 transition-all">
              <div className="text-accent font-extrabold text-2xl tracking-tight">ZATCA 2</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">ECDSA Crypto Ledger</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
