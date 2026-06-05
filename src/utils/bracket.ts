import type { Match, ResultsMap } from '../types'
import { matchById } from '../data/matches'
import { computeGroupTable, isGroupComplete } from './standings'

export interface ResolvedSlot {
  code: string | null   // resolved team code, or null if not yet known
  label: string         // human label (team code or placeholder text)
}

const GROUP_POS = /^([12])([A-L])$/
const WINNER = /^W(\d+)$/
const LOSER = /^L(\d+)$/

function groupPlace(group: string, place: 1 | 2, results: ResultsMap): string | null {
  if (!isGroupComplete(group, results)) return null
  const table = computeGroupTable(group, results)
  return table[place - 1]?.teamCode ?? null
}

// Winner / loser of a knockout match (needs a decisive result).
export function matchOutcome(matchId: number, results: ResultsMap): { winner: string | null; loser: string | null } {
  const m = matchById[matchId]
  if (!m) return { winner: null, loser: null }
  const home = resolveSlot(m.homeSlot ?? m.home ?? '', results).code
  const away = resolveSlot(m.awaySlot ?? m.away ?? '', results).code
  const r = results[matchId]
  if (!r?.played || !home || !away) return { winner: null, loser: null }
  let winnerHome: boolean | null = null
  if (r.homeScore > r.awayScore) winnerHome = true
  else if (r.homeScore < r.awayScore) winnerHome = false
  else if (r.decidedBy === 'pens' && r.homePens != null && r.awayPens != null) {
    winnerHome = r.homePens > r.awayPens
  }
  if (winnerHome === null) return { winner: null, loser: null }
  return winnerHome
    ? { winner: home, loser: away }
    : { winner: away, loser: home }
}

export function resolveSlot(label: string, results: ResultsMap): ResolvedSlot {
  if (!label) return { code: null, label: '—' }

  const gp = label.match(GROUP_POS)
  if (gp) {
    const place = Number(gp[1]) as 1 | 2
    const group = gp[2]
    const code = groupPlace(group, place, results)
    return { code, label: code ?? `${place}. gr. ${group}` }
  }

  if (label.startsWith('3rd')) {
    return { code: null, label: label.replace('3rd', '3. mj.') }
  }

  const w = label.match(WINNER)
  if (w) {
    const { winner } = matchOutcome(Number(w[1]), results)
    return { code: winner, label: winner ?? `Pobj. M${w[1]}` }
  }

  const l = label.match(LOSER)
  if (l) {
    const { loser } = matchOutcome(Number(l[1]), results)
    return { code: loser, label: loser ?? `Pora. M${l[1]}` }
  }

  // Plain team code (group match)
  return { code: label, label }
}

// Resolve both sides of any match (group or knockout) to display-ready slots.
export function resolveMatchSides(m: Match, results: ResultsMap): { home: ResolvedSlot; away: ResolvedSlot } {
  return {
    home: resolveSlot(m.homeSlot ?? m.home ?? '', results),
    away: resolveSlot(m.awaySlot ?? m.away ?? '', results),
  }
}
