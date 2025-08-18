'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Play } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import { useTheme } from '../layout'

export default function ProjectsPage() {
  const { isDark } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [githubRepos, setGithubRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/maazabdulbasith/repos?sort=updated&per_page=20')
        const repos = await response.json()
        setGithubRepos(repos)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching GitHub repos:', error)
        setLoading(false)
      }
    }

    fetchGitHubRepos()
  }, [])

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile']

  const getProjectCategory = (repo) => {
    const topics = repo.topics || []
    const language = repo.language?.toLowerCase() || ''
    
    if (topics.includes('fullstack') || topics.includes('full-stack')) return 'Full Stack'
    if (topics.includes('frontend') || language.includes('javascript') || language.includes('typescript')) return 'Frontend'
    if (topics.includes('backend') || language.includes('python') || language.includes('java')) return 'Backend'
    if (topics.includes('mobile') || topics.includes('react-native')) return 'Mobile'
    
    return 'Full Stack' // default
  }

  const filteredProjects = selectedCategory === 'All' 
    ? githubRepos 
    : githubRepos.filter(repo => getProjectCategory(repo) === selectedCategory)

  return (
    <div className="min-h-screen">
      <div className="pt-20">
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
                My Projects
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                A collection of projects that showcase my skills and passion for creating 
                innovative digital solutions.
              </motion.p>
            </AnimatedSection>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                        : isDark 
                          ? 'bg-white/10 hover:bg-white/20 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                layout
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ y: -10 }}
                      className={`relative group cursor-pointer rounded-xl overflow-hidden ${
                        isDark ? 'glass' : 'bg-white shadow-lg border border-gray-200'
                      }`}
                    >
                      {/* Project Image Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">{project.name.split('-').map(n => n[0]).join('').toUpperCase()}</span>
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        <motion.a
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="glass p-3 rounded-full hover:bg-white/20 transition-all duration-300"
                        >
                          <Github size={20} />
                        </motion.a>
                        {project.homepage && (
                          <motion.a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass p-3 rounded-full hover:bg-white/20 transition-all duration-300"
                          >
                            <ExternalLink size={20} />
                          </motion.a>
                        )}
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {project.description || 'A project showcasing modern development practices.'}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.language && (
                            <span className="px-3 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full border border-primary-500/30">
                              {project.language}
                            </span>
                          )}
                          {project.topics?.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="px-3 py-1 bg-secondary-500/20 text-secondary-300 text-xs rounded-full border border-secondary-500/30"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">
                            {new Date(project.updated_at).toLocaleDateString()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-white">{project.stargazers_count}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && filteredProjects.length === 0 && (
              <AnimatedSection className="text-center py-20">
                <div className={`p-12 rounded-xl ${isDark ? 'glass' : 'bg-white shadow-lg border border-gray-200'}`}>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    No projects found
                  </h3>
                  <p className="text-gray-400">
                    Try selecting a different category or check back later for new projects.
                  </p>
                </div>
              </AnimatedSection>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center">
              <div className={`p-12 rounded-xl ${isDark ? 'glass' : 'bg-white shadow-lg border border-gray-200'}`}>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Have a project in mind?
                </h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  I'm always interested in new opportunities and exciting projects. 
                  Let's discuss how we can work together to bring your ideas to life.
                </p>
                <motion.button
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-transform duration-300 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Talk
                </motion.button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  )
} 