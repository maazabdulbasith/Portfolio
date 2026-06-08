'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

/* ────── Types ────── */
interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

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

/* ────── GitHub GraphQL: contribution heatmap ────── */
function useContributions(username: string) {
  const [weeks, setWeeks] = useState<ContributionDay[][]>([])
  const [totalContributions, setTotalContributions] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use the public GitHub contributions calendar via a proxy-free approach:
    // We'll generate a simulated heatmap from the REST events API
    ;(async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=100`,
          { headers: { Accept: 'application/vnd.github+json' } }
        )
        if (!res.ok) throw new Error('fail')
        const events = await res.json()

        // Build day counts from events
        const dayCounts = new Map<string, number>()
        for (const e of events) {
          const date = (e.created_at as string).split('T')[0]
          dayCounts.set(date, (dayCounts.get(date) || 0) + 1)
        }

        // Generate 52 weeks of data
        const now = new Date()
        const generatedWeeks: ContributionDay[][] = []
        let total = 0

        for (let w = 51; w >= 0; w--) {
          const week: ContributionDay[] = []
          for (let d = 0; d < 7; d++) {
            const dateObj = new Date(now)
            dateObj.setDate(dateObj.getDate() - (w * 7 + (6 - d)))
            const dateStr = dateObj.toISOString().split('T')[0]
            const count = dayCounts.get(dateStr) || 0
            total += count
            const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 10 ? 3 : 4
            week.push({ date: dateStr, count, level: level as 0 | 1 | 2 | 3 | 4 })
          }
          generatedWeeks.push(week)
        }

        setWeeks(generatedWeeks)
        setTotalContributions(total)
      } catch {
        setWeeks([])
        setTotalContributions(0)
      } finally {
        setLoading(false)
      }
    })()
  }, [username])

  return { weeks, totalContributions, loading }
}

/* ────── Heatmap cell colors ────── */
const LEVEL_COLORS = [
  'rgba(245, 166, 35, 0.04)',
  'rgba(245, 166, 35, 0.2)',
  'rgba(245, 166, 35, 0.4)',
  'rgba(245, 166, 35, 0.65)',
  'rgba(245, 166, 35, 0.9)',
]

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

/* ────── Heatmap tooltip ────── */
function HeatmapCell({ day }: { day: ContributionDay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-[11px] h-[11px] rounded-[2px] transition-colors duration-200"
        style={{ background: LEVEL_COLORS[day.level] }}
      />
      {hovered && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-txt-primary bg-surface-2 border border-surface-3 rounded whitespace-nowrap pointer-events-none">
          {day.count} contribution{day.count !== 1 ? 's' : ''} on{' '}
          {new Date(day.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </div>
      )}
    </div>
  )
}

/* ────── Main Component ────── */
export default function GitHubStats() {
  const username = 'maazabdulbasith'
  const stats = useGitHubStats(username)
  const { weeks, totalContributions, loading: heatmapLoading } = useContributions(username)

  return (
    <section className="py-24 md:py-32 border-t border-surface-3">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <SectionHeader number="05" label="Activity" title="GitHub" />

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          <StatCard label="Repositories" value={stats.repoCount} loading={stats.loading} delay={0} />
          <StatCard label="Top Languages" value={stats.topLanguages} loading={stats.loading} delay={0.08} />
          <StatCard label="Latest Tech" value={stats.latestTech} loading={stats.loading} delay={0.16} />
          <StatCard label="Recent Activity" value={totalContributions > 0 ? `${totalContributions} events` : '—'} loading={heatmapLoading} delay={0.24} />
        </div>

        {/* Contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card p-5 md:p-6 overflow-x-auto"
        >
          <p className="text-[10px] font-semibold tracking-[2px] uppercase text-txt-tertiary mb-4">
            Contribution Activity
          </p>

          {heatmapLoading ? (
            <div className="h-[90px] flex items-center justify-center">
              <div className="text-xs text-txt-tertiary animate-pulse">Loading heatmap…</div>
            </div>
          ) : weeks.length > 0 ? (
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <HeatmapCell key={day.date} day={day} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-txt-tertiary">No contribution data available.</p>
          )}

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[10px] text-txt-tertiary">Less</span>
            {LEVEL_COLORS.map((color, i) => (
              <div
                key={i}
                className="w-[11px] h-[11px] rounded-[2px]"
                style={{ background: color }}
              />
            ))}
            <span className="text-[10px] text-txt-tertiary">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
