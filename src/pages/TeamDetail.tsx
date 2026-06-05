import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { teamByCode, CONFEDERATION_NAMES } from '../data/teams'
import { matches, STAGE_SHORT } from '../data/matches'
import { useResults } from '../store/useResults'
import { useSettings } from '../store/useSettings'
import { computeGroupTable } from '../utils/standings'
import { resolveMatchSides } from '../utils/bracket'
import { badgeColors } from '../data/badgeColors'
import { Flag } from '../components/Flag'
import { Squad } from '../components/Squad'
import { MatchCard } from '../components/MatchCard'
import { MatchEditor } from '../components/MatchEditor'
import { FavoriteControls } from '../components/FavoriteButton'
import { Icon } from '../components/Icon'
import { kickoffInstant, timeInTz, dayDateInTz } from '../utils/timezone'

export function TeamDetail() {
  const { code = '' } = useParams()
  const t = teamByCode[code]
  const { results } = useResults()
  const { timezone } = useSettings()
  const [editId, setEditId] = useState<number | null>(null)

  const teamMatches = useMemo(() => matches
    .filter((m) => { const { home, away } = resolveMatchSides(m, results); return home.code === code || away.code === code })
    .sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id), [code, results])

  if (!t) return <div className="screen"><div className="empty"><div className="big">🤔</div><h3>Tim nije pronađen</h3><Link to="/timovi" className="btn btn-lime">Sve reprezentacije</Link></div></div>

  const [c1, c2] = badgeColors(code)
  const row = computeGroupTable(t.group, results).find((r) => r.teamCode === code)
  const next = teamMatches.find((m) => !results[m.id]?.played)
  const nextSides = next ? resolveMatchSides(next, results) : null
  const nextOpp = nextSides ? (nextSides.home.code === code ? nextSides.away : nextSides.home) : null
  const nextInst = next ? kickoffInstant(next) : null

  const stat: [string, number | string][] = [
    ['Odigrano', row?.played ?? 0], ['Pobjede', row?.won ?? 0], ['Golovi', row?.gf ?? 0],
    ['Primljeni', row?.ga ?? 0], ['Gol-razlika', row ? (row.gd > 0 ? `+${row.gd}` : row.gd) : 0], ['Bodovi', row?.points ?? 0],
  ]

  return (
    <div className="screen team-screen">
      <Link to="/timovi" className="link" style={{ marginBottom: 14 }}>‹ Sve reprezentacije</Link>

      <div className="card team-hero reveal" style={{ '--c1': c1, '--c2': c2 } as React.CSSProperties}>
        <div className="th-bg" />
        <div className="th-main">
          <Flag code={code} size={88} />
          <div className="th-info">
            <div className="th-top">
              <h2>{t.nameLocal}</h2>
              <FavoriteControls code={code} />
            </div>
            <div className="th-tags">
              <span className="pill pill-lime">{row && row.played > 0 ? `${row.rank}. u grupi ${t.group}` : `Grupa ${t.group}`}</span>
              <span className="pill">FIFA #{t.fifaRank}</span>
              <span className="pill">{CONFEDERATION_NAMES[t.confederation]}</span>
              {t.titles > 0 && <span className="chip gold">🏆 {t.titles}× prvak</span>}
              {t.debut && <span className="pill pill-lime">Prvi nastup na SP-u</span>}
              {nextOpp && <span className="pill pill-live">Sljedeća: {next!.group ? `Grupa ${next!.group}` : STAGE_SHORT[next!.stage]} vs {nextOpp.code ? teamByCode[nextOpp.code]?.nameLocal : nextOpp.label}</span>}
            </div>
          </div>
        </div>
        <div className="th-stats">
          {stat.map(([l, v]) => <div className="ths" key={l}><span className="ths-v">{v}</span><span className="ths-l">{l}</span></div>)}
        </div>
      </div>

      <div className="team-cols">
        <div className="card pad reveal" style={{ '--i': 1 } as React.CSSProperties}>
          <div className="block-head sm"><h3>Postava</h3><span className="muted">okvirni sastav</span></div>
          <Squad code={code} />
        </div>

        <div className="reveal" style={{ '--i': 2 } as React.CSSProperties}>
          {next && nextOpp && (
            <div className="next-card" style={{ marginTop: 0, marginBottom: 16 }}>
              <span className="nc-l">Sljedeća utakmica</span>
              <div className="nc-main">
                <Flag code={code} size={30} /><b>vs</b>
                {nextOpp.code ? <Flag code={nextOpp.code} size={30} /> : <span className="tbd-chip" style={{ width: 30, height: 30 }} />}
              </div>
              <span className="nc-when">{next.group ? `Grupa ${next.group}` : STAGE_SHORT[next.stage]}{nextInst ? ` · ${dayDateInTz(nextInst, timezone)} ${timeInTz(nextInst, timezone)}` : ''}</span>
            </div>
          )}
          <div className="card pad">
            <div className="block-head sm"><h3>Utakmice</h3><Icon.cal size={17} /></div>
            <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
              {teamMatches.map((m, i) => <MatchCard key={m.id} match={m} onClick={setEditId} showStage i={i} />)}
            </div>
          </div>
        </div>
      </div>

      {editId !== null && <MatchEditor matchId={editId} onClose={() => setEditId(null)} />}
    </div>
  )
}
