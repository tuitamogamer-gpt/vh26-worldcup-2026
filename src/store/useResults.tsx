import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { MatchResult, ResultsMap, Scorer } from '../types'
import { groupStageMatches } from '../data/matches'
import { teamByCode } from '../data/teams'

const STORAGE_KEY = 'wc2026:results:v1'

interface ResultsContextValue {
  results: ResultsMap
  setResult: (matchId: number, result: MatchResult | null) => void
  clearAll: () => void
  loadDemo: () => void
  hydrate: (map: ResultsMap) => void
  playedCount: number
}

const ResultsContext = createContext<ResultsContextValue | null>(null)

function readStorage(): ResultsMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as ResultsMap
  } catch {
    return {}
  }
}

export function ResultsProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<ResultsMap>(() => readStorage())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
    } catch {
      /* storage full / disabled — ignore */
    }
  }, [results])

  const setResult = useCallback((matchId: number, result: MatchResult | null) => {
    setResults((prev) => {
      const next = { ...prev }
      if (result === null) delete next[matchId]
      else next[matchId] = result
      return next
    })
  }, [])

  const clearAll = useCallback(() => setResults({}), [])

  const loadDemo = useCallback(() => {
    setResults(generateDemoResults())
  }, [])

  const hydrate = useCallback((map: ResultsMap) => setResults(map ?? {}), [])

  const playedCount = useMemo(
    () => Object.values(results).filter((r) => r.played).length,
    [results],
  )

  const value = useMemo(
    () => ({ results, setResult, clearAll, loadDemo, hydrate, playedCount }),
    [results, setResult, clearAll, loadDemo, hydrate, playedCount],
  )

  return <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>
}

export function useResults() {
  const ctx = useContext(ResultsContext)
  if (!ctx) throw new Error('useResults must be used within ResultsProvider')
  return ctx
}

// ---- Demo data generator: plausible group-stage scorelines so the dashboard
// can be previewed "full" before real matches kick off. Deterministic (seeded). ----
function seeded(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

function generateDemoResults(): ResultsMap {
  const rand = seeded(2026)
  const out: ResultsMap = {}
  const samplePlayers = ['Marko', 'Luka', 'Ivan', 'Adem', 'Nikola', 'Emir', 'Stefan', 'Haris', 'Dario', 'Faris']

  for (const m of groupStageMatches()) {
    if (!m.home || !m.away) continue
    const rh = teamByCode[m.home]?.fifaRank ?? 50
    const ra = teamByCode[m.away]?.fifaRank ?? 50
    // Lower rank number = stronger; bias goals slightly toward the favourite.
    const baseH = 1.5 - (rh - ra) / 80
    const baseA = 1.5 - (ra - rh) / 80
    const hs = Math.max(0, Math.round(baseH + (rand() - 0.5) * 2.4))
    const as = Math.max(0, Math.round(baseA + (rand() - 0.5) * 2.4))
    const scorers: Scorer[] = []
    const mk = (teamCode: string, n: number) => {
      for (let i = 0; i < n; i++) {
        scorers.push({
          name: samplePlayers[Math.floor(rand() * samplePlayers.length)],
          teamCode,
          minute: 1 + Math.floor(rand() * 90),
        })
      }
    }
    mk(m.home, hs)
    mk(m.away, as)
    out[m.id] = { homeScore: hs, awayScore: as, played: true, scorers, decidedBy: 'reg' }
  }
  return out
}
