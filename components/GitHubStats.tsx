'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
const GitHubCalendar = dynamic(() => import('react-github-calendar').then((mod) => mod.GitHubCalendar), { ssr: false })

/* ────── Types ────── */
interface RepoData {
  repoCount: number | null
  topLanguages: string | null
  latestTech: string | null
}

/* ────── GitHub REST: repo stats ────── */
function useGitHubStats(username: string): RepoData & { loading: boolean } {
  const [data, setData] = useState<RepoData>({
    repoCount: null,
    topLanguages: null,
    latestTech: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const headers = { Accept: 'application/vnd.github+json' }

    ;(async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { headers }
        )
        if (!res.ok) throw new Error('API error')
        const repos = await res.json()
        const count = Array.isArray(repos) ? repos.length : 0

        // Top languages
        const langMap = new Map<string, number>()
        for (const r of repos) {
          if (r.language) langMap.set(r.language, (langMap.get(r.language) || 0) + 1)
        }
        const total = Array.from(langMap.values()).reduce((a, b) => a + b, 0)
        const topLangs = Array.from(langMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([l, c]) => `${l} ${Math.round((c / total) * 100)}%`)
          .join(' · ')

        // Latest tech
        let tech: string | null = null
        const latest = repos[0]
        if (latest) {
          try {
            const pkgRes = await fetch(
              `https://api.github.com/repos/${username}/${latest.name}/contents/package.json`,
              { headers }
            )
            if (pkgRes.ok) {
              const pkg = await pkgRes.json()
              if (pkg?.content) {
                const decoded = JSON.parse(atob(pkg.content.replace(/\n/g, '')))
                const deps = { ...decoded.dependencies, ...decoded.devDependencies }
                const techMap: [string, string][] = [
                  ['next', 'Next.js'], ['react', 'React'], ['vue', 'Vue.js'],
                  ['@angular/core', 'Angular'], ['express', 'Express'],
                  ['fastapi', 'FastAPI'], ['django', 'Django'],
                ]
                for (const [k, v] of techMap) {
                  if (deps && k in deps) { tech = v; break }
                }
              }
            }
          } catch { /* ignore */ }
          if (!tech) tech = latest.language || 'N/A'
        }

        setData({ repoCount: count, topLanguages: topLangs || 'N/A', latestTech: tech || 'N/A' })
      } catch {
        setData({ repoCount: null, topLanguages: 'Error', latestTech: 'Error' })
      } finally {
        setLoading(false)
      }
    })()
  }, [username])

  return { ...data, loading }
}

/* ────── Stat Card ────── */
function StatCard({
  label,
  value,
  loading,
  delay,
}: {
  label: string
  value: string | number | null
  loading: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FAF7F2] border border-[#E8E2D8] rounded-2xl p-5 hover:border-slate-300 transition-all"
    >
      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-3 w-20 bg-slate-200 rounded" />
          <div className="h-6 w-28 bg-slate-200 rounded" />
        </div>
      ) : (
        <>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            {label}
          </p>
          <p className="text-lg font-bold text-slate-900 leading-snug">
            {value ?? '—'}
          </p>
        </>
      )}
    </motion.div>
  )
}

/* ────── Main Component ────── */
export default function GitHubStats() {
  const username = 'maazabdulbasith'
  const stats = useGitHubStats(username)

  const explicitTheme = {
    light: ['#F4EFEA', '#FCE2DE', '#FACAC2', '#EE7766', '#E0533C'],
    dark: ['#F4EFEA', '#FCE2DE', '#FACAC2', '#EE7766', '#E0533C'],
  }

  return (
    <div>
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
        <StatCard label="Repositories" value={stats.repoCount} loading={stats.loading} delay={0} />
        <StatCard label="Top Languages" value={stats.topLanguages} loading={stats.loading} delay={0.08} />
        <StatCard label="Latest Tech" value={stats.latestTech} loading={stats.loading} delay={0.16} />
      </div>

      {/* Contribution heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-[#FAF7F2] border border-[#E8E2D8] rounded-2xl p-5 md:p-6 overflow-x-auto"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          Contribution Activity
        </p>

        <div className="flex justify-center min-h-[140px] text-slate-900">
          <GitHubCalendar 
            username={username} 
            theme={explicitTheme}
            colorScheme="light"
            blockSize={12}
            blockMargin={4}
            fontSize={12}
          />
        </div>
      </motion.div>
    </div>
  )
}
