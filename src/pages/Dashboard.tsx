import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TOURNAMENT } from '../data/tournament'
import { matches, matchById, STAGE_SHORT } from '../data/matches'
import { GROUP_IDS, teamByCode } from '../data/teams'
import { useResults } from '../store/useResults'
import { useSettings } from '../store/useSettings'
import { useLive } from '../store/useLive'
import { tournamentStats, topScorers } from '../utils/stats'
import { computeGroupTable } from '../utils/standings'
import { resolveMatchSides } from '../utils/bracket'
import { Countdown } from '../components/Countdown'
import { MatchCard } from '../components/MatchCard'
import { MatchEditor } from '../components/MatchEditor'
import { Flag } from '../components/Flag'
import { Icon } from '../components/Icon'
import { TeamLabel } from '../components/Team'
import { kickoffInstant, timeInTz, dateKeyInTz, dayDateInTz } from '../utils/timezone'
import type { Match } from '../types'

export function Dashboard() {
  const { results, loadDemo, clearAll, playedCount } = useResults()
  const { primary, timezone } = useSettings()
  const { liveScores, liveTopScorers } = useLive()
  const [editId, setEditId] = useState<number | null>(null)
  const [grp, setGrp] = useState('A')

  const sorted = useMemo(() => [...matches].sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id), [])
  const started = Date.now() >= new Date(TOURNAMENT.start).getTime()
  const liveList = sorted.filter((m) => liveScores[m.id])
  const upcoming = sorted.filter((m) => !results[m.id]?.played && !liveScores[m.id])
  const recent = sorted.filter((m) => results[m.id]?.played).slice(-6).reverse()
  const stats = useMemo(() => tournamentStats(results), [results])
  const scorers = (liveTopScorers.length ? liveTopScorers : topScorers(results)).slice(0, 5)

  const todayKey = dateKeyInTz(new Date(), timezone)
  const todays = sorted.filter((m) => { const i = kickoffInstant(m); return i && dateKeyInTz(i, timezone) === todayKey })
  const todayBlock = todays.length > 0 ? todays : upcoming.slice(0, 6)

  return (
    <div className="screen">
      <div className="ov-grid">
        <div className="ov-main">
          {!started ? <CountdownHero /> : <FeaturedHero m={liveList[0] ?? upcoming[0]} live={!!liveList[0]} onEdit={setEditId} />}

          {primary && teamByCode[primary] && <MyTeamStrip code={primary} onEdit={setEditId} />}

          <div className="block reveal" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="block-head">
              <h2>{todays.length > 0 ? 'Danas' : 'Naredne utakmice'} <span className="cnt">{todayBlock.length}</span></h2>
              <Link to="/raspored" className="link">Cijeli raspored <Icon.chevR size={14} /></Link>
            </div>
            <div className="card-grid">
              {todayBlock.map((m, i) => <MatchCard key={m.id} match={m} onClick={setEditId} showStage i={i} />)}
            </div>
          </div>

          {recent.length > 0 && (
            <div className="block reveal" style={{ '--i': 2 } as React.CSSProperties}>
              <div className="block-head"><h2>Nedavni rezultati</h2><Link to="/raspored" className="link">Sve <Icon.chevR size={14} /></Link></div>
              <div className="card-grid">{recent.map((m, i) => <MatchCard key={m.id} match={m} onClick={setEditId} showStage i={i} />)}</div>
            </div>
          )}
        </div>

        {/* RAIL */}
        <div className="ov-rail">
          <div className="card pad reveal" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="block-head sm">
              <h3>Tabela grupe</h3>
              <div className="seg">{GROUP_IDS.map((g) => <button key={g} className={'seg-b' + (grp === g ? ' on' : '')} onClick={() => setGrp(g)}>{g}</button>)}</div>
            </div>
            <MiniTable group={grp} />
            <Link to="/grupe" className="row-link">Sve tabele <Icon.chevR size={14} /></Link>
          </div>

          <div className="card pad reveal" style={{ '--i': 2 } as React.CSSProperties}>
            <div className="block-head sm"><h3>Najbolji strijelci</h3><Icon.ball size={18} /></div>
            {scorers.length === 0
              ? <p className="faint" style={{ fontSize: 13 }}>Lista kreće s prvim golovima.</p>
              : <div className="scorers">{scorers.map((s, i) => (
                  <Link to="/statistika" className="sc-row" key={i}>
                    <span className="sc-rank">{i + 1}</span><Flag code={s.teamCode ?? ''} size={24} />
                    <span className="sc-name">{s.name}</span><span className="sc-goals">{s.goals}</span>
                  </Link>
                ))}</div>}
            <Link to="/statistika" className="row-link">Cijela lista <Icon.chevR size={14} /></Link>
          </div>

          <div className="card pad reveal" style={{ '--i': 3 } as React.CSSProperties}>
            <div className="block-head sm"><h3>Put do finala</h3><Icon.bracket size={18} /></div>
            <div className="bm-list">
              {[73, 74, 75, 76].map((id) => <BracketMini key={id} m={matchById[id]} />)}
            </div>
            <Link to="/nokaut" className="row-link">Cijeli bracket <Icon.chevR size={14} /></Link>
          </div>

          <div className="card pad reveal" style={{ '--i': 4 } as React.CSSProperties}>
            <div className="block-head sm"><h3>Rezultati</h3></div>
            <p className="muted" style={{ fontSize: 12.5, lineHeight: 1.5 }}>Uključi <b>Live</b> (gore) za automatske rezultate, ili klikni meč za ručni unos.</p>
            <div className="row" style={{ marginTop: 12, gap: 8 }}>
              <button className="btn btn-sm btn-lime" onClick={loadDemo}>▶ Demo rezultati</button>
              {playedCount > 0 && <button className="btn btn-sm btn-danger" onClick={clearAll}>Obriši</button>}
            </div>
            <div className="sb-track" style={{ marginTop: 14 }}><div className="sb-fill" style={{ width: `${Math.round((stats.matchesPlayed / stats.totalMatches) * 100)}%` }} /></div>
            <p className="faint" style={{ fontSize: 11.5, marginTop: 6 }}>{stats.matchesPlayed}/{stats.totalMatches} odigrano</p>
          </div>
        </div>
      </div>

      {editId !== null && <MatchEditor matchId={editId} onClose={() => setEditId(null)} />}
    </div>
  )
}

function CountdownHero() {
  return (
    <section className="card hero reveal">
      <div className="hero-pitch" />
      <div className="hero-top"><span className="eyebrow">{TOURNAMENT.hosts.join(' · ')}</span><span className="hero-stage">11. juni – 19. juli 2026.</span></div>
      <h2 style={{ position: 'relative', fontSize: 30, marginTop: 8 }}>Prvenstvo počinje za</h2>
      <div style={{ position: 'relative', marginTop: 14 }}><Countdown /></div>
      <div className="hero-ticker" style={{ marginTop: 18 }}>
        <div className="tk-row"><Icon.goal size={13} /> Otvaranje: <b>{TOURNAMENT.openingMatch.teams}</b> <span className="tk-tag">{TOURNAMENT.openingMatch.venue}</span></div>
      </div>
      <div className="hero-actions">
        <Link className="btn btn-lime" to="/raspored">Raspored <Icon.chevR size={16} /></Link>
        <Link className="btn btn-ghost" to="/grupe">Grupe i tabele</Link>
      </div>
    </section>
  )
}

function FeaturedHero({ m, live, onEdit }: { m?: Match; live: boolean; onEdit: (id: number) => void }) {
  const { results } = useResults()
  const { timezone } = useSettings()
  const { liveScores } = useLive()
  if (!m) return <CountdownHero />
  const { home, away } = resolveMatchSides(m, results)
  const r = results[m.id]
  const ls = liveScores[m.id]
  const inst = kickoffInstant(m)
  const nm = (s: typeof home) => s.code ? teamByCode[s.code]?.nameLocal ?? s.label : s.label
  const hs = ls ? ls.home : r?.played ? r.homeScore : null
  const as = ls ? ls.away : r?.played ? r.awayScore : null
  return (
    <section className="card hero reveal">
      <div className="hero-pitch" />
      <div className="hero-top">
        {live ? <span className="live-badge"><span className="live-dot" />LIVE {ls?.elapsed ?? 0}'</span> : <span className="pill">{inst ? `${dayDateInTz(inst, timezone)} · ${timeInTz(inst, timezone)}` : ''}</span>}
        <span className="hero-stage">{m.group ? `Grupa ${m.group}` : STAGE_SHORT[m.stage]}</span>
      </div>
      <div className="hero-main">
        <div className="hero-team"><Flag code={home.code ?? ''} size={64} /><span className="hero-tname">{nm(home)}</span></div>
        <div className="hero-score">
          {hs != null ? <><span className="hs-num">{hs}</span><span className="hs-sep">:</span><span className="hs-num">{as}</span></> : <span className="hs-sep">vs</span>}
        </div>
        <div className="hero-team"><Flag code={away.code ?? ''} size={64} /><span className="hero-tname">{nm(away)}</span></div>
      </div>
      <div className="hero-actions">
        <button className="btn btn-lime" onClick={() => onEdit(m.id)}>Unesi rezultat <Icon.chevR size={16} /></button>
        <Link className="btn btn-ghost" to="/raspored">Raspored</Link>
      </div>
    </section>
  )
}

function MyTeamStrip({ code, onEdit }: { code: string; onEdit: (id: number) => void }) {
  const { results } = useResults()
  const t = teamByCode[code]
  const next = useMemo(() => matches
    .filter((m) => { const { home, away } = resolveMatchSides(m, results); return home.code === code || away.code === code })
    .sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id)
    .find((m) => !results[m.id]?.played), [code, results])
  return (
    <div className="card pad reveal" style={{ marginTop: 0, marginBottom: 26, borderColor: 'rgba(200,242,60,.25)' }}>
      <div className="block-head sm">
        <h3 className="row" style={{ gap: 8 }}><Flag code={code} size={24} /> Moj tim — {t.nameLocal}</h3>
        <Link to="/moj-tim" className="link">Detalji <Icon.chevR size={14} /></Link>
      </div>
      {next ? <MatchCard match={next} onClick={onEdit} showStage /> : <p className="faint" style={{ fontSize: 13 }}>Nema više zakazanih utakmica.</p>}
    </div>
  )
}

function MiniTable({ group }: { group: string }) {
  const { results } = useResults()
  const rows = computeGroupTable(group, results)
  return (
    <div className="mini-table">
      {rows.map((r) => (
        <Link to={`/timovi/${r.teamCode}`} className={'mt-row' + (r.rank <= 2 ? ' qual' : '')} key={r.teamCode}>
          <span className="mt-pos">{r.rank}</span>
          <TeamLabel code={r.teamCode} size={24} link={false} />
          <span className="mt-pld">{r.played}</span>
          <span className="mt-gd">{r.gd > 0 ? '+' : ''}{r.gd}</span>
          <span className="mt-pts">{r.points}</span>
        </Link>
      ))}
    </div>
  )
}

function BracketMini({ m }: { m: Match }) {
  const { results } = useResults()
  const { home, away } = resolveMatchSides(m, results)
  const r = results[m.id]
  return (
    <Link to="/nokaut" className="bm-row">
      <Flag code={home.code ?? ''} size={22} />
      <span className={'bm-s' + (r?.played && r.homeScore > r.awayScore ? ' win' : '')}>{r?.played ? r.homeScore : '–'}</span>
      <span className="bm-v">v</span>
      <span className={'bm-s' + (r?.played && r.awayScore > r.homeScore ? ' win' : '')}>{r?.played ? r.awayScore : '–'}</span>
      <Flag code={away.code ?? ''} size={22} />
    </Link>
  )
}
