'use client'

import { motion } from 'framer-motion'
import SkillCard from '@/components/SkillCard'
import AnimatedSection from '@/components/AnimatedSection'

const frontendSkills = [
  { name: 'React', level: 75, icon: '⚛️', color: '#61DAFB' },
  { name: 'Next.js', level: 70, icon: '⚡', color: '#000000' },
  { name: 'TypeScript', level: 80, icon: '📘', color: '#3178C6' },
  { name: 'Tailwind CSS', level: 90, icon: '🎨', color: '#06B6D4' },
  { name: 'JavaScript', level: 85, icon: '🟨', color: '#F7DF1E' },
  { name: 'HTML/CSS', level: 95, icon: '🌐', color: '#E34F26' },
]

const backendSkills = [
  { name: 'Node.js', level: 85, icon: '🟢', color: '#339933' },
  { name: 'Express.js', level: 80, icon: '🚀', color: '#000000' },
  { name: 'MongoDB', level: 75, icon: '🍃', color: '#47A248' },
  { name: 'PostgreSQL', level: 70, icon: '🐘', color: '#336791' },
  { name: 'Firebase', level: 65, icon: '🔥', color: '#FFCA28' },
  { name: 'REST APIs', level: 85, icon: '🔗', color: '#FF6B6B' },
]

const toolsSkills = [
  { name: 'Git', level: 90, icon: '📝', color: '#F05032' },
  { name: 'Docker', level:90, icon: '🐳', color: '#2496ED' },
  { name: 'AWS', level: 65, icon: '☁️', color: '#FF9900' },
  { name: 'Vercel', level: 85, icon: '▲', color: '#000000' },
  { name: 'Figma', level: 75, icon: '🎨', color: '#F24E1E' },
  { name: 'VS Code', level: 95, icon: '💻', color: '#007ACC' },
]

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center space-y-8">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold gradient-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Skills & Expertise
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              A comprehensive overview of my technical skills and the technologies 
              I use to bring ideas to life.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Frontend Skills */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Frontend Development
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Modern frontend technologies and frameworks for creating responsive, 
              interactive user experiences.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frontendSkills.map((skill, index) => (
              <AnimatedSection key={skill.name} delay={index * 0.1}>
                <SkillCard {...skill} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Backend Skills */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Backend Development
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Server-side technologies and databases for building robust, 
              scalable applications.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {backendSkills.map((skill, index) => (
              <AnimatedSection key={skill.name} delay={index * 0.1}>
                <SkillCard {...skill} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Others */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Tools & Platforms
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Development tools, deployment platforms, and design software 
              that enhance my workflow.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsSkills.map((skill, index) => (
              <AnimatedSection key={skill.name} delay={index * 0.1}>
                <SkillCard {...skill} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="glass p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Learning Philosophy
                </h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    I believe in continuous learning and staying updated with the latest 
                    technologies and best practices in software development.
                  </p>
                  <p>
                    My approach involves hands-on projects, documentation reading, 
                    and contributing to open-source communities.
                  </p>
                  <p>
                    I'm always excited to learn new technologies and frameworks 
                    that can improve my development workflow.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="glass p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Current Focus
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Advanced TypeScript patterns</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-secondary-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Microservices architecture</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Cloud deployment strategies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Performance optimization</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
} 