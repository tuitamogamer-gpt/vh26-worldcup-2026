import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../store/useSettings'
import { useResults } from '../store/useResults'
import { teamByCode, teams } from '../data/teams'
import { matches, STAGE_SHORT } from '../data/matches'
import { computeGroupTable, bestThirds, isGroupComplete } from '../utils/standings'
import { topScorers } from '../utils/stats'
import { resolveMatchSides } from '../utils/bracket'
import { badgeColors } from '../data/badgeColors'
import { Flag } from '../components/Flag'
import { Icon } from '../components/Icon'
import { MatchCard } from '../components/MatchCard'
import { MatchEditor } from '../components/MatchEditor'
import { StandingsTable } from '../components/StandingsTable'
import type { ResultsMap } from '../types'

function qualPill(code: string, results: ResultsMap) {
  const t = teamByCode[code]
  const row = computeGroupTable(t.group, results).find((r) => r.teamCode === code)
  if (!row || row.played === 0) return <span className="pill">Turnir kreće 11.6.</span>
  const done = isGroupComplete(t.group, results)
  if (row.rank <= 2) return <span className="pill pill-lime">{done ? '✓ Prošao' : `${row.rank}. mjesto`}</span>
  if (row.rank === 3) {
    const third = bestThirds(results).find((x) => x.teamCode === code)
    if (third?.qualified === 'third') return <span className="chip gold">{done ? '✓ Najbolji treći' : '3. (zona)'}</span>
  }
  return <span className="pill">{done ? 'Ispao' : `${row.rank}. mjesto`}</span>
}

function PrimaryPanel({ code, onEdit }: { code: string; onEdit: (id: number) => void }) {
  const { results } = useResults()
  const t = teamByCode[code]
  const [c1, c2] = badgeColors(code)
  const row = computeGroupTable(t.group, results).find((r) => r.teamCode === code)
  const scorers = topScorers(results).filter((s) => s.teamCode === code)
  const teamMatches = matches
    .filter((m) => { const { home, away } = resolveMatchSides(m, results); return home.code === code || away.code === code })
    .sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id)

  const stat: [string, number | string][] = [
    ['Bodovi', row?.points ?? 0], ['Plasman', row ? `${row.rank}.` : '–'], ['Golovi', row?.gf ?? 0],
    ['Primljeni', row?.ga ?? 0], ['Pobjede', row?.won ?? 0], ['Odigrano', row?.played ?? 0],
  ]

  return (
    <>
      <div className="card team-hero reveal" style={{ '--c1': c1, '--c2': c2 } as React.CSSProperties}>
        <div className="th-bg" />
        <div className="th-main">
          <Flag code={code} size={84} />
          <div className="th-info">
            <div className="th-top">
              <div><div className="eyebrow">⭐ Glavni tim</div><h2 style={{ marginTop: 4 }}>{t.nameLocal}</h2></div>
              <Link to={`/timovi/${code}`} className="fav-btn lg">Profil i sastav ›</Link>
            </div>
            <div className="th-tags">
              <span className="pill pill-lime">Grupa {t.group}</span>
              <span className="pill">FIFA #{t.fifaRank}</span>
              {qualPill(code, results)}
            </div>
          </div>
        </div>
        <div className="th-stats">
          {stat.map(([l, v]) => <div className="ths" key={l}><span className="ths-v">{v}</span><span className="ths-l">{l}</span></div>)}
        </div>
      </div>

      <div className="team-cols" style={{ marginTop: 20 }}>
        <div className="card pad reveal" style={{ '--i': 1 } as React.CSSProperties}>
          <div className="block-head sm"><h3>Utakmice</h3><Icon.cal size={17} /></div>
          <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
            {teamMatches.map((m, i) => <MatchCard key={m.id} match={m} onClick={onEdit} showStage i={i} />)}
          </div>
        </div>
        <div className="reveal" style={{ '--i': 2 } as React.CSSProperties}>
          <div className="card pad" style={{ marginBottom: 16 }}>
            <div className="block-head sm"><h3>Tabela grupe {t.group}</h3></div>
            <StandingsTable group={t.group} showForm={false} />
          </div>
          {scorers.length > 0 && (
            <div className="card pad">
              <div className="block-head sm"><h3>Strijelci</h3><Icon.ball size={17} /></div>
              <div className="scorers">
                {scorers.map((s, i) => (
                  <div className="sc-row" key={i}>
                    <span className="sc-rank">{i + 1}</span><Flag code={code} size={22} />
                    <span className="sc-name">{s.name}</span><span className="sc-goals">{s.goals}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export function MyTeam() {
  const { favorites, primary, setPrimary } = useSettings()
  const [editId, setEditId] = useState<number | null>(null)
  const suggestions = useMemo(() => [...teams].sort((a, b) => a.fifaRank - b.fifaRank).slice(0, 8), [])

  if (favorites.length === 0) {
    return (
      <div className="screen">
        <div className="empty">
          <Icon.star size={42} />
          <h3>Još nemaš favorita</h3>
          <p>Klikni zvjezdicu na reprezentaciji da je pratiš i dobiješ posebnu statistiku za svoj glavni tim.</p>
        </div>
        <div className="card pad" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="block-head sm"><h3>Brzi izbor</h3></div>
          <div className="fav-teams">
            {suggestions.map((t) => (
              <button key={t.code} className="card ft-chip" onClick={() => setPrimary(t.code)}>
                <Flag code={t.code} size={36} /><span>{t.nameLocal}</span>
              </button>
            ))}
          </div>
          <p className="faint" style={{ fontSize: 13, marginTop: 14 }}>Ili otvori <Link to="/timovi" style={{ color: 'var(--lime)' }}>sve reprezentacije</Link>.</p>
        </div>
      </div>
    )
  }

  const primaryCode = primary ?? favorites[0]
  const others = favorites.filter((c) => c !== primaryCode)

  return (
    <div className="screen">
      <PrimaryPanel code={primaryCode} onEdit={setEditId} />
      {others.length > 0 && (
        <div className="block" style={{ marginTop: 26 }}>
          <div className="block-head"><h2>Ostali favoriti <span className="cnt">{others.length}</span></h2></div>
          <div className="fav-teams">
            {others.map((c) => (
              <Link key={c} to={`/timovi/${c}`} className="card ft-chip">
                <Flag code={c} size={36} /><span>{teamByCode[c]?.nameLocal ?? c}</span>
                <button className="fav-btn" onClick={(e) => { e.preventDefault(); setPrimary(c) }}>Glavni</button>
              </Link>
            ))}
          </div>
        </div>
      )}
      {editId !== null && <MatchEditor matchId={editId} onClose={() => setEditId(null)} />}
    </div>
  )
}
