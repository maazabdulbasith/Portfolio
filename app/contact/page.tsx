'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, MessageCircle } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  const { isDark } = useTheme()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setSubmitStatus('idle')
      }, 3000)
    }, 2000)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'maazabdulbasith@gmail.com',
      link: 'mailto:maazabdulbasith@gmail.com',
      description: 'Send me an email directly'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'maazabdulbasith',
      link: 'https://github.com/maazabdulbasith',
      description: 'Check out my projects and contributions'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'abdul-basith-maaz',
      link: 'https://linkedin.com/in/abdul-basith-maaz',
      description: 'Connect with me professionally'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Remote / Worldwide',
      link: null,
      description: 'Available for remote work globally'
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="pt-20">
        {/* Header */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <MessageCircle size={48} className="text-primary-500" />
                <h1 className="text-5xl md:text-7xl font-bold gradient-text">
                  Get In Touch
                </h1>
              </div>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                I'm always interested in new opportunities and exciting projects. 
                Let's discuss how we can work together to bring your ideas to life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information Grid */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-6 rounded-xl ${
                    isDark ? 'glass' : 'bg-white shadow-lg border border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center`}>
                      <info.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200 block"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-400">{info.value}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`p-8 rounded-xl ${
                isDark ? 'glass' : 'bg-white shadow-lg border border-gray-200'
              }`}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Send Me a Message
                </h2>
                <p className="text-gray-400">
                  Have a project in mind? Let's discuss how we can work together.
                </p>
              </div>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                          errors.name 
                            ? 'border-red-500 bg-red-500/10' 
                            : isDark 
                              ? 'bg-white/10 border-white/20 focus:border-primary-500' 
                              : 'bg-gray-50 border-gray-300 focus:border-blue-500'
                        } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <AlertCircle size={14} className="mr-1" />
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                          errors.email 
                            ? 'border-red-500 bg-red-500/10' 
                            : isDark 
                              ? 'bg-white/10 border-white/20 focus:border-primary-500' 
                              : 'bg-gray-50 border-gray-300 focus:border-blue-500'
                        } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <AlertCircle size={14} className="mr-1" />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                        errors.subject 
                          ? 'border-red-500 bg-red-500/10' 
                          : isDark 
                            ? 'bg-white/10 border-white/20 focus:border-primary-500' 
                            : 'bg-gray-50 border-gray-300 focus:border-blue-500'
                      } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center"
                      >
                        <AlertCircle size={14} className="mr-1" />
                        {errors.subject}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                        errors.message 
                          ? 'border-red-500 bg-red-500/10' 
                          : isDark 
                            ? 'bg-white/10 border-white/20 focus:border-primary-500' 
                            : 'bg-gray-50 border-gray-300 focus:border-blue-500'
                      } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none`}
                      placeholder="Tell me about your project or question..."
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center"
                      >
                        <AlertCircle size={14} className="mr-1" />
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:scale-105'
                    } text-white`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`p-12 rounded-xl text-center ${
                isDark ? 'glass' : 'bg-white shadow-lg border border-gray-200'
              }`}
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                Let's Work Together
              </h3>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I'd love to hear from you. I'm always open to discussing new opportunities, 
                interesting projects, and creative ideas.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">⚡</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Fast Response</h4>
                  <p className="text-gray-400 text-sm">Get a reply within 24 hours</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">💼</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Professional</h4>
                  <p className="text-gray-400 text-sm">Quality work and communication</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🌍</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Remote Ready</h4>
                  <p className="text-gray-400 text-sm">Available for remote collaboration</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
} 