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
    ['Full Stack Developer', 'Backend Engineer', 'Product Builder'],
    70,
    35,
    2400
  )

  return (
    <section id="hero" className="min-h-screen flex items-center pt-14">
      <div className="w-full max-w-[1100px] mx-auto px-5 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-1"
        >
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
            Production ownership. Zero hand-holding.
          </motion.p>

          {/* Contact links */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] md:text-xs text-txt-tertiary pt-8"
          >
            <a href="tel:+919901061725" className="hover:text-accent transition-colors">(+91) 9901061725</a>
            <span className="text-surface-4 hidden md:inline">·</span>
            <a href="mailto:maazabdulbasith@gmail.com" className="hover:text-accent transition-colors">maazabdulbasith@gmail.com</a>
            <span className="text-surface-4 hidden md:inline">·</span>
            <a href="https://github.com/maazabdulbasith" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">github.com/maazabdulbasith</a>
            <span className="text-surface-4 hidden md:inline">·</span>
            <a href="https://linkedin.com/in/abdul-basith-maaz" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">linkedin.com/in/abdul-basith-maaz</a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-txt-tertiary"
        >
          <span className="text-[10px] tracking-[2px] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-accent to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
