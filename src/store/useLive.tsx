import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useSettings } from './useSettings'
import { useResults } from './useResults'
import { matches } from '../data/matches'
import { resolveMatchSides } from '../utils/bracket'
import { fetchFixtures, fetchTopScorers, isFinished, isInPlay, type LiveScorer } from '../live/apiFootball'
import type { ResultsMap, MatchResult } from '../types'

export type LiveStatus = 'off' | 'connecting' | 'connected' | 'error'

export interface LiveScore { home: number; away: number; elapsed: number | null; statusShort: string }

interface LiveContextValue {
  status: LiveStatus
  message: string
  lastUpdated: number | null
  liveScores: Record<number, LiveScore>
  liveTopScorers: LiveScorer[]
  liveCount: number
  refresh: () => void
}

const LiveContext = createContext<LiveContextValue | null>(null)

// Build a sorted-team-pair → match map from currently resolvable fixtures.
function buildPairMap(results: ResultsMap) {
  const map = new Map<string, { id: number; home: string; away: string }>()
  for (const m of matches) {
    const { home, away } = resolveMatchSides(m, results)
    if (home.code && away.code) {
      map.set([home.code, away.code].sort().join('-'), { id: m.id, home: home.code, away: away.code })
    }
  }
  return map
}

export function LiveProvider({ children }: { children: React.ReactNode }) {
  const { apiKey, liveMode, pollSeconds } = useSettings()
  const { results, setResult } = useResults()

  const [status, setStatus] = useState<LiveStatus>('off')
  const [message, setMessage] = useState('')
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [liveScores, setLiveScores] = useState<Record<number, LiveScore>>({})
  const [liveTopScorers, setLiveTopScorers] = useState<LiveScorer[]>([])

  // Refs so the polling loop always sees fresh values without re-subscribing.
  const resultsRef = useRef(results); resultsRef.current = results
  const setResultRef = useRef(setResult); setResultRef.current = setResult
  const tickRef = useRef(0)

  const poll = useCallback(async () => {
    const key = apiKey.trim()
    if (!liveMode || !key) { setStatus('off'); setLiveScores({}); return }
    setStatus((s) => (s === 'connected' ? s : 'connecting'))
    try {
      const fixtures = await fetchFixtures(key)
      const pairMap = buildPairMap(resultsRef.current)
      const nextLive: Record<number, LiveScore> = {}

      for (const fx of fixtures) {
        if (!fx.homeCode || !fx.awayCode) continue
        const hit = pairMap.get([fx.homeCode, fx.awayCode].sort().join('-'))
        if (!hit) continue
        const aligned = hit.home === fx.homeCode
        const h = (aligned ? fx.homeGoals : fx.awayGoals) ?? 0
        const a = (aligned ? fx.awayGoals : fx.homeGoals) ?? 0

        if (isFinished(fx.statusShort)) {
          const existing = resultsRef.current[hit.id]
          if (existing?.source === 'manual') continue // never override manual edits
          const ph = (aligned ? fx.penHome : fx.penAway) ?? undefined
          const pa = (aligned ? fx.penAway : fx.penHome) ?? undefined
          const next: MatchResult = {
            homeScore: h, awayScore: a, played: true, source: 'live',
            decidedBy: fx.statusShort === 'PEN' ? 'pens' : fx.statusShort === 'AET' ? 'aet' : 'reg',
            homePens: fx.statusShort === 'PEN' ? ph : undefined,
            awayPens: fx.statusShort === 'PEN' ? pa : undefined,
          }
          if (!existing || existing.homeScore !== h || existing.awayScore !== a || !existing.played) {
            setResultRef.current(hit.id, next)
          }
        } else if (isInPlay(fx.statusShort)) {
          nextLive[hit.id] = { home: h, away: a, elapsed: fx.elapsed, statusShort: fx.statusShort }
        }
      }

      setLiveScores(nextLive)

      // Top scorers: refresh on first tick and every ~5 minutes.
      if (tickRef.current % Math.max(1, Math.round(300 / Math.max(30, pollSeconds))) === 0) {
        try { setLiveTopScorers(await fetchTopScorers(key)) } catch { /* non-fatal */ }
      }
      tickRef.current++

      setStatus('connected'); setMessage(''); setLastUpdated(Date.now())
    } catch (e) {
      setStatus('error')
      setMessage(e instanceof Error ? e.message : 'Greška pri povezivanju')
    }
  }, [apiKey, liveMode, pollSeconds])

  useEffect(() => {
    if (!liveMode || !apiKey.trim()) { setStatus('off'); setLiveScores({}); return }
    tickRef.current = 0
    poll()
    const ms = Math.max(30, pollSeconds) * 1000
    const id = setInterval(poll, ms)
    return () => clearInterval(id)
  }, [liveMode, apiKey, pollSeconds, poll])

  const value = useMemo<LiveContextValue>(() => ({
    status, message, lastUpdated, liveScores, liveTopScorers,
    liveCount: Object.keys(liveScores).length, refresh: poll,
  }), [status, message, lastUpdated, liveScores, liveTopScorers, poll])

  return <LiveContext.Provider value={value}>{children}</LiveContext.Provider>
}

export function useLive() {
  const ctx = useContext(LiveContext)
  if (!ctx) throw new Error('useLive must be used within LiveProvider')
  return ctx
}
