import { useNavigate } from 'react-router-dom'
import { useResults } from '../store/useResults'
import { computeGroupTable } from '../utils/standings'
import { groupStageMatches } from '../data/matches'
import { teamByCode } from '../data/teams'
import { Flag } from './Flag'
import type { ResultsMap } from '../types'

function teamForm(code: string, group: string, results: ResultsMap): ('w' | 'd' | 'l')[] {
  return groupStageMatches()
    .filter((m) => m.group === group && (m.home === code || m.away === code) && results[m.id]?.played)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((m) => {
      const r = results[m.id]!
      const isHome = m.home === code
      const gf = isHome ? r.homeScore : r.awayScore
      const ga = isHome ? r.awayScore : r.homeScore
      return gf > ga ? 'w' : gf < ga ? 'l' : 'd'
    })
}

function Form({ form }: { form: ('w' | 'd' | 'l')[] }) {
  return (
    <span className="form-row">
      {form.slice(-5).map((f, i) => (
        <span key={i} className={`form-dot fd-${f.toUpperCase()}`}>{f === 'w' ? 'P' : f === 'd' ? 'N' : 'I'}</span>
      ))}
    </span>
  )
}

export function StandingsTable({ group, showForm = true }: { group: string; showForm?: boolean }) {
  const { results } = useResults()
  const nav = useNavigate()
  const rows = computeGroupTable(group, results)

  return (
    <div className="gt-table">
      <div className="gt-row gt-h">
        <span>#</span><span className="gt-team">Tim</span>
        <span>O</span><span>P</span><span>N</span><span>I</span>
        <span className="hide-s">GR</span><span className="bld">B</span>
        {showForm && <span className="hide-s">Forma</span>}
      </div>
      {rows.map((r) => {
        const t = teamByCode[r.teamCode]
        const cls = r.rank <= 2 ? ' qual' : r.rank === 3 ? ' qual3' : ''
        return (
          <div key={r.teamCode} className={'gt-row' + cls} onClick={() => nav(`/timovi/${r.teamCode}`)}>
            <span className="gt-pos">{r.rank}</span>
            <span className="gt-team"><Flag code={r.teamCode} size={26} /><b>{t?.nameLocal ?? r.teamCode}</b></span>
            <span>{r.played}</span><span>{r.won}</span><span>{r.drawn}</span><span>{r.lost}</span>
            <span className="hide-s">{r.gd > 0 ? '+' : ''}{r.gd}</span>
            <span className="gt-pts">{r.points}</span>
            {showForm && <span className="hide-s"><Form form={teamForm(r.teamCode, group, results)} /></span>}
          </div>
        )
      })}
    </div>
  )
}
