import type { Match, ResultsMap, StandingRow } from '../types'
import { groupStageMatches } from '../data/matches'
import { teamByCode, teamsInGroup, GROUP_IDS } from '../data/teams'

interface Acc {
  played: number; won: number; drawn: number; lost: number
  gf: number; ga: number; points: number
}

const blank = (): Acc => ({ played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 })

function applyMatch(table: Record<string, Acc>, home: string, away: string, hs: number, as: number) {
  const h = table[home], a = table[away]
  if (!h || !a) return
  h.played++; a.played++
  h.gf += hs; h.ga += as; a.gf += as; a.ga += hs
  if (hs > as) { h.won++; a.lost++; h.points += 3 }
  else if (hs < as) { a.won++; h.lost++; a.points += 3 }
  else { h.drawn++; a.drawn++; h.points++; a.points++ }
}

// Head-to-head mini-table among a set of tied teams.
function headToHead(group: string, codes: string[], results: ResultsMap): Record<string, Acc> {
  const sub: Record<string, Acc> = {}
  codes.forEach((c) => (sub[c] = blank()))
  const set = new Set(codes)
  for (const m of groupStageMatches()) {
    if (m.group !== group || !m.home || !m.away) continue
    if (!set.has(m.home) || !set.has(m.away)) continue
    const r = results[m.id]
    if (r?.played) applyMatch(sub, m.home, m.away, r.homeScore, r.awayScore)
  }
  return sub
}

export function computeGroupTable(group: string, results: ResultsMap): StandingRow[] {
  const codes = teamsInGroup(group).map((t) => t.code)
  const table: Record<string, Acc> = {}
  codes.forEach((c) => (table[c] = blank()))

  for (const m of groupStageMatches()) {
    if (m.group !== group || !m.home || !m.away) continue
    const r = results[m.id]
    if (r?.played) applyMatch(table, m.home, m.away, r.homeScore, r.awayScore)
  }

  const rows: StandingRow[] = codes.map((code) => {
    const a = table[code]
    return {
      teamCode: code, played: a.played, won: a.won, drawn: a.drawn, lost: a.lost,
      gf: a.gf, ga: a.ga, gd: a.gf - a.ga, points: a.points, rank: 0,
    }
  })

  rows.sort((x, y) => cmpOverall(x, y) || cmpTie(group, x, y, rows, results))
  rows.forEach((r, i) => {
    r.rank = i + 1
    r.qualified = i < 2 ? 'auto' : null
  })
  return rows
}

function cmpOverall(x: StandingRow, y: StandingRow): number {
  return y.points - x.points || y.gd - x.gd || y.gf - x.gf
}

function cmpTie(
  group: string, x: StandingRow, y: StandingRow,
  rows: StandingRow[], results: ResultsMap,
): number {
  // Only teams equal on (points, gd, gf) need head-to-head.
  const tied = rows.filter(
    (r) => r.points === x.points && r.gd === x.gd && r.gf === x.gf,
  )
  if (tied.length > 1) {
    const sub = headToHead(group, tied.map((t) => t.teamCode), results)
    const sx = sub[x.teamCode], sy = sub[y.teamCode]
    if (sx && sy) {
      const d = sy.points - sx.points || (sy.gf - sy.ga) - (sx.gf - sx.ga) || sy.gf - sx.gf
      if (d) return d
    }
  }
  // Deterministic fallback: better FIFA rank, then alphabetical.
  const rx = teamByCode[x.teamCode]?.fifaRank ?? 999
  const ry = teamByCode[y.teamCode]?.fifaRank ?? 999
  return rx - ry || x.teamCode.localeCompare(y.teamCode)
}

export interface ThirdPlaceRow extends StandingRow {
  group: string
}

// Rank all 12 third-placed teams; the best 8 advance.
export function bestThirds(results: ResultsMap): ThirdPlaceRow[] {
  const thirds: ThirdPlaceRow[] = GROUP_IDS.map((gid) => {
    const t = computeGroupTable(gid, results)[2]
    return { ...t, group: gid }
  })
  thirds.sort((x, y) => cmpOverall(x, y) ||
    (teamByCode[x.teamCode]?.fifaRank ?? 999) - (teamByCode[y.teamCode]?.fifaRank ?? 999))
  thirds.forEach((r, i) => { r.qualified = i < 8 ? 'third' : 'out' })
  return thirds
}

export function isGroupComplete(group: string, results: ResultsMap): boolean {
  const gm = groupStageMatches().filter((m) => m.group === group)
  return gm.every((m) => results[m.id]?.played)
}

export function allGroupTables(results: ResultsMap): Record<string, StandingRow[]> {
  const out: Record<string, StandingRow[]> = {}
  for (const gid of GROUP_IDS) out[gid] = computeGroupTable(gid, results)
  return out
}
