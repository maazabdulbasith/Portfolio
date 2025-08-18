'use client'

import { motion } from 'framer-motion'

interface SkillCardProps {
  name: string
  level: number
  icon: string
  color: string
}

export default function SkillCard({ name, level, icon, color }: SkillCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass p-6 rounded-xl space-y-4"
    >
      <div className="flex items-center space-x-3">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="text-sm text-gray-400">{level}% proficiency</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Beginner</span>
          <span className="text-gray-400">Expert</span>
        </div>
        <div className="w-full bg-dark-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-2 rounded-full transition-all duration-300"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </motion.div>
  )
} 