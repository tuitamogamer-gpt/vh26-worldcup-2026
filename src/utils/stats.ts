import type { Match, ResultsMap } from '../types'
import { matches as allMatches, matchById } from '../data/matches'
import { resolveMatchSides } from './bracket'

export interface ScorerStat {
  name: string
  teamCode: string
  goals: number
  penalties: number
}

export function topScorers(results: ResultsMap): ScorerStat[] {
  const map = new Map<string, ScorerStat>()
  for (const [id, r] of Object.entries(results)) {
    if (!r.played || !r.scorers) continue
    const m = matchById[Number(id)]
    if (!m) continue
    for (const s of r.scorers) {
      if (s.ownGoal) continue
      const key = `${s.name}|${s.teamCode}`
      const cur = map.get(key) ?? { name: s.name, teamCode: s.teamCode, goals: 0, penalties: 0 }
      cur.goals++
      if (s.penalty) cur.penalties++
      map.set(key, cur)
    }
  }
  return [...map.values()].sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name))
}

export interface TeamGoalStat {
  teamCode: string
  gf: number
  ga: number
  played: number
}

export function teamGoalStats(results: ResultsMap): TeamGoalStat[] {
  const map = new Map<string, TeamGoalStat>()
  const bump = (code: string, gf: number, ga: number) => {
    const cur = map.get(code) ?? { teamCode: code, gf: 0, ga: 0, played: 0 }
    cur.gf += gf; cur.ga += ga; cur.played++
    map.set(code, cur)
  }
  for (const m of allMatches) {
    const r = results[m.id]
    if (!r?.played) continue
    const { home, away } = resolveMatchSides(m, results)
    if (!home.code || !away.code) continue
    bump(home.code, r.homeScore, r.awayScore)
    bump(away.code, r.awayScore, r.homeScore)
  }
  return [...map.values()]
}

export interface BigResult {
  match: Match
  homeCode: string
  awayCode: string
  homeScore: number
  awayScore: number
  total: number
  margin: number
}

export interface TournamentStats {
  matchesPlayed: number
  totalMatches: number
  totalGoals: number
  avgGoals: number
  homeWins: number
  awayWins: number
  draws: number
  cleanSheets: number
  biggestWin: BigResult | null
  highestScoring: BigResult | null
}

export function tournamentStats(results: ResultsMap): TournamentStats {
  let matchesPlayed = 0, totalGoals = 0, homeWins = 0, awayWins = 0, draws = 0, cleanSheets = 0
  let biggestWin: BigResult | null = null
  let highestScoring: BigResult | null = null

  for (const m of allMatches) {
    const r = results[m.id]
    if (!r?.played) continue
    matchesPlayed++
    totalGoals += r.homeScore + r.awayScore
    if (r.homeScore > r.awayScore) homeWins++
    else if (r.homeScore < r.awayScore) awayWins++
    else draws++
    if (r.homeScore === 0) cleanSheets++
    if (r.awayScore === 0) cleanSheets++

    const { home, away } = resolveMatchSides(m, results)
    const big: BigResult = {
      match: m,
      homeCode: home.code ?? home.label,
      awayCode: away.code ?? away.label,
      homeScore: r.homeScore, awayScore: r.awayScore,
      total: r.homeScore + r.awayScore,
      margin: Math.abs(r.homeScore - r.awayScore),
    }
    if (!biggestWin || big.margin > biggestWin.margin) biggestWin = big
    if (!highestScoring || big.total > highestScoring.total) highestScoring = big
  }

  return {
    matchesPlayed,
    totalMatches: allMatches.length,
    totalGoals,
    avgGoals: matchesPlayed ? totalGoals / matchesPlayed : 0,
    homeWins, awayWins, draws, cleanSheets,
    biggestWin, highestScoring,
  }
}
