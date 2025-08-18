'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown, ArrowDown, ArrowUp } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

export default function ScrollingPage() {
  const { isDark } = useTheme()
  const [currentSection, setCurrentSection] = useState(0)
  const { scrollYProgress } = useScroll()
  
  const [repoCount, setRepoCount] = useState<number | null>(null)
  const [languageSummary, setLanguageSummary] = useState<string | null>(null)
  const [latestTech, setLatestTech] = useState<string | null>(null)
  
  const sections = ['hero', 'dashboard', 'about', 'contact', 'footer']

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const sectionIndex = Math.floor(scrollPosition / windowHeight)
      setCurrentSection(Math.min(sectionIndex, sections.length - 1))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections.length])

  useEffect(() => {
    const username = 'maazabdulbasith'
    const headers = { 'Accept': 'application/vnd.github+json' }

    const fetchGithubData = async () => {
      try {
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers })
        if (!reposRes.ok) throw new Error('Failed to fetch repos')
        const repos = await reposRes.json()

        // Repo count
        setRepoCount(Array.isArray(repos) ? repos.length : 0)

        // Language percentages (by repo primary language count)
        const languageCounts = new Map<string, number>()
        for (const repo of repos) {
          const lang = (repo?.language as string) || null
          if (lang) {
            languageCounts.set(lang, (languageCounts.get(lang) || 0) + 1)
          }
        }
        if (languageCounts.size > 0) {
          const total = Array.from(languageCounts.values()).reduce((a, b) => a + b, 0)
          const top = Array.from(languageCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([lang, count]) => `${lang} ${Math.round((count / total) * 100)}%`)
            .join(' • ')
          setLanguageSummary(top)
        } else {
          setLanguageSummary('No language data')
        }

        // Latest tech used (inspect most recently updated repo's package.json dependencies)
        let detected: string | null = null
        const latest = Array.isArray(repos) && repos.length > 0 ? repos[0] : null
        if (latest) {
          try {
            const pkgRes = await fetch(`https://api.github.com/repos/${username}/${latest.name}/contents/package.json`, { headers })
            if (pkgRes.ok) {
              const pkgJson = await pkgRes.json()
              if (pkgJson?.content) {
                const decoded = JSON.parse(atob(pkgJson.content.replace(/\n/g, '')))
                const deps = { ...(decoded.dependencies || {}), ...(decoded.devDependencies || {}) }
                const techOrder: Array<[string, string]> = [
                  ['next', 'Next.js'],
                  ['react', 'React'],
                  ['vue', 'Vue.js'],
                  ['svelte', 'Svelte'],
                  ['@angular/core', 'Angular'],
                  ['nuxt', 'Nuxt'],
                  ['remix', 'Remix'],
                  ['astro', 'Astro'],
                  ['nestjs', 'NestJS'],
                  ['express', 'Express'],
                  ['django', 'Django'],
                  ['flask', 'Flask'],
                  ['fastapi', 'FastAPI'],
                  ['spring', 'Spring'],
                  ['rails', 'Rails'],
                  ['laravel', 'Laravel']
                ]
                for (const [key, label] of techOrder) {
                  if (deps && Object.prototype.hasOwnProperty.call(deps, key)) {
                    detected = label
                    break
                  }
                }
              }
            }
          } catch {
            // ignore package.json errors, fall back below
          }
          if (!detected) {
            detected = latest.language || 'Unknown'
          }
        }
        setLatestTech(detected || 'Unknown')
      } catch {
        setRepoCount(null)
        setLanguageSummary('Failed to load')
        setLatestTech('Unknown')
      }
    }

    fetchGithubData()
  }, [])

  const scrollToSection = (sectionIndex: number) => {
    window.scrollTo({
      top: sectionIndex * window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        {sections.map((section, index) => (
          <motion.button
            key={section}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 scale-125'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float animation-delay-400"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 font-mono"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold gradient-text text-shadow"
            >
              Abdul Basith Maaz
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-4xl text-gray-300 font-light"
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Crafting digital experiences with modern technologies. 
              Passionate about creating scalable, user-centric applications 
              that make a difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={() => scrollToSection(1)}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-transform duration-300 text-white flex items-center gap-2"
              >
                Explore My Work
                <ArrowDown size={20} />
              </button>
              
              <a 
                href="mailto:maazabdulbasith@gmail.com"
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                    : 'bg-gray-800/10 hover:bg-gray-800/20 text-gray-800 border border-gray-300'
                }`}
              >
                <Mail size={20} />
                Email Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center space-x-6 pt-8"
            >
              <a href="https://github.com/maazabdulbasith" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark ? 'glass hover:bg-white/20' : 'bg-gray-800/10 hover:bg-gray-800/20'
              }`}>
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/abdul-basith-maaz" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark ? 'glass hover:bg-white/20' : 'bg-gray-800/10 hover:bg-gray-800/20'
              }`}>
                <Linkedin size={24} />
              </a>
              <a href="mailto:maazabdulbasith@gmail.com" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark ? 'glass hover:bg-white/20' : 'bg-gray-800/10 hover:bg-gray-800/20'
              }`}>
                <Mail size={24} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection(1)}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ChevronDown size={24} />
          </motion.button>
        </motion.div>
      </section>

      {/* Dashboard Section */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Dashboard
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Overview of my development activity, skills, and achievements
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { title: 'GitHub Repositories', value: repoCount ?? '—', change: '', icon: '📁', color: 'from-blue-500 to-cyan-500' },
              { title: 'Top Stacks', value: languageSummary ?? 'Loading…', change: '', icon: '🧠', color: 'from-purple-500 to-pink-500' },
              { title: 'Latest Tech Used', value: latestTech ?? 'Loading…', change: '', icon: '🆕', color: 'from-green-500 to-emerald-500' },
              { title: 'Contributions', value: '—', change: '', icon: '📊', color: 'from-yellow-500 to-orange-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'glass' : 'bg-white shadow-lg border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-2xl`}>
                    {stat.icon}
                  </div>
                  <span className="text-sm text-green-400 font-semibold">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-400 text-sm">
                  {stat.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate developer with expertise in modern web technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                Full Stack Developer
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                I'm a passionate full-stack developer with expertise in modern web technologies. 
                I love creating scalable, user-centric applications that solve real-world problems.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                With experience in React, Next.js, Node.js, and cloud platforms, 
                I bring ideas to life with clean code and innovative solutions.
              </p>
              <div className="flex space-x-4 pt-6">
                <a 
                  href="https://github.com/maazabdulbasith" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 text-white"
                >
                  View GitHub
                </a>
                <button 
                  onClick={() => scrollToSection(3)}
                  className="px-6 py-3 rounded-lg font-semibold border border-gray-600 hover:bg-white/10 transition-colors duration-300 text-white"
                >
                  Contact Me
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`p-8 rounded-xl ${
                isDark ? 'glass' : 'bg-white shadow-lg border border-gray-200'
              }`}
            >
              <h4 className="text-xl font-bold text-white mb-4">Key Skills</h4>
              <div className="grid grid-cols-2 gap-4">
                {['React/Next.js', 'TypeScript', 'Node.js', 'Python', 'Docker', 'AWS'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              I'm always interested in new opportunities and exciting projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-400 leading-relaxed">
                  Whether you have a project in mind, want to collaborate, or just want to say hello, 
                  I'd love to hear from you. I'm always open to discussing new opportunities.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: 'Email',
                    value: 'maazabdulbasith@gmail.com',
                    link: 'mailto:maazabdulbasith@gmail.com'
                  },
                  {
                    icon: Github,
                    title: 'GitHub',
                    value: 'maazabdulbasith',
                    link: 'https://github.com/maazabdulbasith'
                  },
                  {
                    icon: Linkedin,
                    title: 'LinkedIn',
                    value: 'abdul-basith-maaz',
                    link: 'https://linkedin.com/in/abdul-basith-maaz'
                  }
                ].map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{info.title}</h4>
                      <a 
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`p-8 rounded-xl ${
                isDark ? 'glass' : 'bg-white shadow-lg border border-gray-200'
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <textarea
                  rows={6}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-transform duration-300 text-white"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-bold gradient-text">
              Thank You
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Thanks for exploring my portfolio. Let's create something amazing together!
            </p>
            
            <div className="flex justify-center space-x-6 pt-8">
              <a href="https://github.com/maazabdulbasith" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark ? 'glass hover:bg-white/20' : 'bg-gray-800/10 hover:bg-gray-800/20'
              }`}>
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/abdul-basith-maaz" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark ? 'glass hover:bg-white/20' : 'bg-gray-800/10 hover:bg-gray-800/20'
              }`}>
                <Linkedin size={24} />
              </a>
              <a href="mailto:maazabdulbasith@gmail.com" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark ? 'glass hover:bg-white/20' : 'bg-gray-800/10 hover:bg-gray-800/20'
              }`}>
                <Mail size={24} />
              </a>
            </div>

            <motion.button
              onClick={() => scrollToSection(0)}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-transform duration-300 text-white flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp size={20} />
              Back to Top
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 