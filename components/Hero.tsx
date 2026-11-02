'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
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
    <section id="hero" className="py-20 md:py-28 flex items-center pt-24 md:pt-32 relative">
      <div className="w-full max-w-[1100px] mx-auto px-5 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-1"
        >
          {/* Availability pill */}
          <motion.div variants={item} className="mb-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[2px] bg-accent-dim text-accent border border-accent/25">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              Available for Backend &amp; GenAI Engineering Roles
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={item}>
            <h1 className="font-display text-hero leading-[0.9]">
              <span className="block">ABDUL BASITH</span>
              <span className="block">MAAZ</span>
            </h1>
          </motion.div>

          {/* Typed title + cursor */}
          <motion.div
            variants={item}
            className="flex items-center text-base md:text-xl font-light text-txt-secondary pt-3"
          >
            <span>{typedText}</span>
            <span className="cursor-blink" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-sm md:text-base font-medium text-accent tracking-wide pt-2"
          >
            50K+ users. Five SaaS products. Zero downtime.
          </motion.p>

          {/* Contact links */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] md:text-xs text-txt-tertiary pt-6"
          >
            <a href="tel:+919901061725" className="hover:text-accent transition-colors">(+91) 9901061725</a>
            <span className="text-surface-4 hidden md:inline">·</span>
            <a href="mailto:maazabdulbasith@gmail.com" className="hover:text-accent transition-colors">maazabdulbasith@gmail.com</a>
            <span className="text-surface-4 hidden md:inline">·</span>
            <a href="https://github.com/maazabdulbasith" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">github.com/maazabdulbasith</a>
            <span className="text-surface-4 hidden md:inline">·</span>
            <a href="https://linkedin.com/in/abdul-basith-maaz" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">linkedin.com/in/abdul-basith-maaz</a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={item} className="pt-8 flex flex-wrap gap-3.5">
            <a
              href="#featured"
              className="text-[11px] font-semibold tracking-[2px] uppercase text-bg bg-accent border border-accent hover:bg-transparent hover:text-accent px-6 py-3.5 rounded transition-all duration-300 shadow-[0_0_20px_rgba(245,166,35,0.25)] flex items-center gap-2"
            >
              <span>Explore Live Systems</span>
              <span className="text-xs">⚡</span>
            </a>
            <a
              href="/Abdul_Basith_Maaz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold tracking-[2px] uppercase text-txt-primary border border-surface-3 hover:border-accent hover:text-accent px-6 py-3.5 rounded transition-all duration-300"
            >
              View Resume ↗
            </a>
            <a
              href="#work"
              className="text-[11px] font-semibold tracking-[2px] uppercase text-txt-secondary hover:text-txt-primary border border-surface-3 px-6 py-3.5 rounded transition-all duration-300 hidden sm:inline-block"
            >
              Experience
            </a>
          </motion.div>

          {/* Quick Metrics Bar (Immediate Proof of Work) */}
          <motion.div 
            variants={item} 
            className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[850px]"
          >
            <div className="bg-surface-1/60 border border-surface-3 p-3.5 rounded-lg backdrop-blur-sm hover:border-accent/30 transition-colors">
              <div className="text-accent font-display text-2xl tracking-wide">50K+</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-txt-tertiary">Active Users (Khayyal)</div>
            </div>
            <div className="bg-surface-1/60 border border-surface-3 p-3.5 rounded-lg backdrop-blur-sm hover:border-accent/30 transition-colors">
              <div className="text-accent font-display text-2xl tracking-wide">1.000</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-txt-tertiary">Recall@5 (Shelf pgvector)</div>
            </div>
            <div className="bg-surface-1/60 border border-surface-3 p-3.5 rounded-lg backdrop-blur-sm hover:border-accent/30 transition-colors">
              <div className="text-accent font-display text-2xl tracking-wide">~600ms</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-txt-tertiary">Client WASM Vision</div>
            </div>
            <div className="bg-surface-1/60 border border-surface-3 p-3.5 rounded-lg backdrop-blur-sm hover:border-accent/30 transition-colors">
              <div className="text-accent font-display text-2xl tracking-wide">ZATCA 2</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-txt-tertiary">ECDSA Crypto Ledger</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
