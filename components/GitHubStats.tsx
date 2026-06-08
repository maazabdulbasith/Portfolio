'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
const GitHubCalendar = dynamic(() => import('react-github-calendar').then((mod) => mod.GitHubCalendar), { ssr: false })
import SectionHeader from './SectionHeader'

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
      className="glass-card accent-glow p-5 md:p-6"
    >
      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-3 w-20 bg-surface-3 rounded" />
          <div className="h-6 w-28 bg-surface-3 rounded" />
        </div>
      ) : (
        <>
          <p className="text-[10px] font-semibold tracking-[2px] uppercase text-txt-tertiary mb-1.5">
            {label}
          </p>
          <p className="text-lg md:text-xl font-semibold text-txt-primary truncate">
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
    light: ['#161616', 'rgba(245, 166, 35, 0.2)', 'rgba(245, 166, 35, 0.4)', 'rgba(245, 166, 35, 0.65)', 'rgba(245, 166, 35, 0.9)'],
    dark: ['#161616', 'rgba(245, 166, 35, 0.2)', 'rgba(245, 166, 35, 0.4)', 'rgba(245, 166, 35, 0.65)', 'rgba(245, 166, 35, 0.9)'],
  }

  return (
    <section className="py-24 md:py-32 border-t border-surface-3">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <SectionHeader number="05" label="Activity" title="GitHub" />

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
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
          className="glass-card p-5 md:p-6 overflow-x-auto [&_article]:!text-txt-primary"
        >
          <p className="text-[10px] font-semibold tracking-[2px] uppercase text-txt-tertiary mb-4">
            Contribution Activity
          </p>

          <div className="flex justify-center min-h-[140px] text-txt-primary">
            <GitHubCalendar 
              username={username} 
              theme={explicitTheme}
              colorScheme="dark"
              blockSize={11}
              blockMargin={4}
              fontSize={12}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
