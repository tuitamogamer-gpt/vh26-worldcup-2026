import { useMemo } from 'react'
import { useResults } from '../store/useResults'
import { useLive } from '../store/useLive'
import { tournamentStats, topScorers, teamGoalStats } from '../utils/stats'
import { teamByCode } from '../data/teams'
import { resolveMatchSides } from '../utils/bracket'
import { matchById } from '../data/matches'
import { Flag } from '../components/Flag'
import { Icon } from '../components/Icon'

export function Stats() {
  const { results, loadDemo } = useResults()
  const { liveTopScorers } = useLive()
  const stats = useMemo(() => tournamentStats(results), [results])
  const computed = useMemo(() => topScorers(results), [results])
  const scorers = (liveTopScorers.length ? liveTopScorers : computed).slice(0, 10)
  const goals = useMemo(() => teamGoalStats(results).filter((g) => g.gf > 0).sort((a, b) => b.gf - a.gf).slice(0, 10), [results])

  if (stats.matchesPlayed === 0 && scorers.length === 0) {
    return (
      <div className="screen">
        <div className="empty">
          <div className="big">📊</div>
          <h3>Statistika kreće 11. juna</h3>
          <p>Čim počnu utakmice (ili uključiš live), ovdje stižu strijelci, golovi i rekordi.</p>
          <button className="btn btn-lime" onClick={loadDemo}>▶ Popuni demo rezultate</button>
        </div>
      </div>
    )
  }

  const maxG = Math.max(1, ...scorers.map((s) => s.goals))
  const maxGf = Math.max(1, ...goals.map((g) => g.gf))

  return (
    <div className="screen">
      <div className="grid cols-4" style={{ marginBottom: 20 }}>
        <div className="stat accent-green"><div className="glyph">⚽</div><div className="label">Golova</div><div className="value">{stats.totalGoals}</div><div className="sub">{stats.avgGoals.toFixed(2)} po meču</div></div>
        <div className="stat accent-blue"><div className="glyph">🎯</div><div className="label">Odigrano</div><div className="value">{stats.matchesPlayed}</div><div className="sub">od {stats.totalMatches}</div></div>
        <div className="stat accent-gold"><div className="glyph">🥅</div><div className="label">Čistih mreža</div><div className="value">{stats.cleanSheets}</div><div className="sub">bez primljenog</div></div>
        <div className="stat"><div className="glyph">🤝</div><div className="label">Neriješeno</div><div className="value">{stats.draws}</div><div className="sub">od {stats.matchesPlayed}</div></div>
      </div>

      <div className="stats-grid">
        <div className="card pad reveal">
          <div className="block-head sm"><h3>Najbolji strijelci</h3><Icon.ball size={18} /></div>
          {scorers.length === 0 ? <p className="faint" style={{ fontSize: 13 }}>Još nema strijelaca.</p> : (
            <div className="stat-bars">
              {scorers.map((s, i) => (
                <div className="sb-row" key={i}>
                  <span className="sb-rank">{i + 1}</span>
                  <Flag code={s.teamCode ?? ''} size={26} />
                  <span className="sb-name">{s.name}</span>
                  <div className="sb-track"><div className="sb-fill" style={{ width: `${(s.goals / maxG) * 100}%` }} /></div>
                  <span className="sb-val">{s.goals}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card pad reveal" style={{ '--i': 1 } as React.CSSProperties}>
          <div className="block-head sm"><h3>Najefikasnije reprezentacije</h3><Icon.chart size={18} /></div>
          {goals.length === 0 ? <p className="faint" style={{ fontSize: 13 }}>Još nema golova.</p> : (
            <div className="stat-bars">
              {goals.map((g, i) => (
                <div className="sb-row" key={g.teamCode}>
                  <span className="sb-rank">{i + 1}</span>
                  <Flag code={g.teamCode} size={26} />
                  <span className="sb-name">{teamByCode[g.teamCode]?.nameLocal ?? g.teamCode}</span>
                  <div className="sb-track"><div className="sb-fill cyan" style={{ width: `${(g.gf / maxGf) * 100}%` }} /></div>
                  <span className="sb-val">{g.gf}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid cols-2" style={{ marginTop: 20 }}>
        <Highlight title="Najuvjerljivija pobjeda" big={stats.biggestWin} sub={stats.biggestWin ? `razlika ${stats.biggestWin.margin}` : ''} />
        <Highlight title="Najviše golova na meču" big={stats.highestScoring} sub={stats.highestScoring ? `${stats.highestScoring.total} golova` : ''} />
      </div>
    </div>
  )
}

function Highlight({ title, big, sub }: { title: string; big: ReturnType<typeof tournamentStats>['biggestWin']; sub: string }) {
  const { results } = useResults()
  if (!big) return <div className="card pad"><div className="block-head sm"><h3>{title}</h3></div><p className="faint" style={{ fontSize: 13 }}>—</p></div>
  const { home, away } = resolveMatchSides(matchById[big.match.id], results)
  const nm = (c: string, l: string) => teamByCode[c]?.nameLocal ?? l
  return (
    <div className="card pad center-text">
      <div className="block-head sm" style={{ justifyContent: 'center' }}><h3>{title}</h3></div>
      <div style={{ fontWeight: 600, marginTop: 6 }}>{nm(big.homeCode, home.label)} – {nm(big.awayCode, away.label)}</div>
      <div style={{ fontFamily: 'var(--fd)', fontSize: 38, fontWeight: 800, color: 'var(--lime)', margin: '6px 0' }}>{big.homeScore}:{big.awayScore}</div>
      <div className="faint" style={{ fontSize: 12 }}>{sub}</div>
    </div>
  )
}
