'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Calendar, Download } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

export default function AboutPage() {
  const stats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Completed', value: '25+' },
    { label: 'Technologies', value: '12+' },
    { label: 'Happy Clients', value: '15+' },
  ]

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance',
      period: '2023 - Present',
      description: 'Handling fullstack projects for 15+ clients, building scalable web applications using modern technologies.',
    },
    {
      title: 'Code Quality Specialist',
      company: 'Tech Company',
      period: '2023 - 2023 (7 months)',
      description: 'Ensured code quality standards, implemented best practices, and maintained high development standards.',
    },
    {
      title: 'DevOps Engineer Intern',
      company: 'Tech Company',
      period: '2022 - 2023 (6 months)',
      description: 'Gained hands-on experience with cloud infrastructure, CI/CD pipelines, and deployment automation.',
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center space-y-8">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold gradient-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Me
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              I'm a passionate full-stack developer with a strong foundation in Information Science and Engineering, 
              specializing in modern web technologies and DevOps practices.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center glass p-8 rounded-xl">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl font-bold gradient-text mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6">Personal Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="text-primary-400" size={20} />
                    <span className="text-gray-300">maazabdulbasith@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-primary-400" size={20} />
                    <span className="text-gray-300">India</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Calendar className="text-primary-400" size={20} />
                    <span className="text-gray-300">Available for new opportunities</span>
                  </div>
                </div>

                <button className="gradient-border px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 flex items-center space-x-2">
                  <Download size={20} />
                  <span>Download Resume</span>
                </button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="glass p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Education & Background</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    I hold a <strong>Bachelor's degree in Information Science and Engineering</strong>, 
                    which has provided me with a solid foundation in software development principles, 
                    data structures, and system design.
                  </p>
                  <p>
                    My expertise includes full-stack development with React, Next.js, Node.js, 
                    and modern DevOps practices including CI/CD, cloud deployment, and infrastructure management.
                  </p>
                  <p>
                    I'm passionate about clean code, user experience, and staying up-to-date 
                    with the latest technologies and best practices in software development.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My professional journey in software development and the companies I've worked with.
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <div className="glass p-8 rounded-xl">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                      <p className="text-primary-400">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{exp.period}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 