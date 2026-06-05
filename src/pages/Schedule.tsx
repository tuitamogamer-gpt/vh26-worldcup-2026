import { useMemo, useState } from 'react'
import { matches } from '../data/matches'
import { GROUP_IDS, teams, teamByCode } from '../data/teams'
import { useResults } from '../store/useResults'
import { useSettings } from '../store/useSettings'
import { useLive } from '../store/useLive'
import { resolveMatchSides } from '../utils/bracket'
import { venueById } from '../data/venues'
import { Flag } from '../components/Flag'
import { Icon } from '../components/Icon'
import { MatchEditor } from '../components/MatchEditor'
import { formatDate, formatDayName } from '../utils/format'
import { kickoffInstant, timeInTz, dateKeyInTz } from '../utils/timezone'
import { STAGE_SHORT } from '../data/matches'
import type { Match } from '../types'

type Tab = 'all' | 'live' | 'upcoming' | 'ft'

function FullMatchRow({ m, onEdit }: { m: Match; onEdit: (id: number) => void }) {
  const { results } = useResults()
  const { timezone } = useSettings()
  const { liveScores } = useLive()
  const { home, away } = resolveMatchSides(m, results)
  const r = results[m.id]
  const live = liveScores[m.id]
  const ft = r?.played
  const inst = kickoffInstant(m)
  const kickoff = inst ? timeInTz(inst, timezone) : m.time
  const nm = (s: typeof home) => s.code ? (teamByCode[s.code]?.nameLocal ?? s.label) : s.label
  const hs = live ? live.home : ft ? r!.homeScore : null
  const as = live ? live.away : ft ? r!.awayScore : null

  return (
    <div className="card fmr reveal" onClick={() => onEdit(m.id)}>
      <div className="fmr-time">
        {live
          ? <span className="live-badge"><span className="live-dot" />LIVE {live.elapsed ?? 0}'</span>
          : ft ? <span className="fmr-ft">KRAJ</span> : <span className="fmr-up">{kickoff ?? '—'}</span>}
        <span className="fmr-stage">{m.group ? `Grupa ${m.group}` : STAGE_SHORT[m.stage]}</span>
      </div>
      <div className="fmr-core">
        <div className="fmr-side home"><span className="fmr-tn">{nm(home)}</span><Flag code={home.code ?? ''} size={32} /></div>
        <div className={'fmr-score' + (live ? ' live' : '')}>
          {hs != null ? <><b>{hs}</b><i>:</i><b>{as}</b></> : <span className="fmr-vs">v</span>}
        </div>
        <div className="fmr-side away"><Flag code={away.code ?? ''} size={32} /><span className="fmr-tn">{nm(away)}</span></div>
      </div>
      <div className="fmr-meta">
        {r?.decidedBy === 'pens' && <span className="fmr-venue" style={{ color: 'var(--amber)' }}>pen {r.homePens}:{r.awayPens}</span>}
        <span className="fmr-venue"><Icon.pin size={13} /> {venueById[m.venueId]?.city}</span>
      </div>
    </div>
  )
}

export function Schedule({ onlyLive }: { onlyLive?: boolean }) {
  const { results } = useResults()
  const { timezone } = useSettings()
  const { liveScores } = useLive()
  const [editId, setEditId] = useState<number | null>(null)
  const [tab, setTab] = useState<Tab>(onlyLive ? 'live' : 'all')
  const [group, setGroup] = useState('')
  const [team, setTeam] = useState('')

  const tabs: [Tab, string][] = [['all', 'Sve'], ['live', 'Uživo'], ['upcoming', 'Naredne'], ['ft', 'Odigrane']]

  const filtered = useMemo(() => matches.filter((m) => {
    if (group && m.group !== group) return false
    if (team && m.home !== team && m.away !== team) return false
    if (tab === 'live') return !!liveScores[m.id]
    if (tab === 'ft') return !!results[m.id]?.played
    if (tab === 'upcoming') return !results[m.id]?.played && !liveScores[m.id]
    return true
  }), [tab, group, team, results, liveScores])

  const byDate = useMemo(() => {
    const keyOf = (m: Match) => { const i = kickoffInstant(m); return i ? dateKeyInTz(i, timezone) : m.date }
    const tOf = (m: Match) => { const i = kickoffInstant(m); return i ? i.getTime() : new Date(m.date).getTime() }
    const map = new Map<string, Match[]>()
    for (const m of [...filtered].sort((a, b) => tOf(a) - tOf(b) || a.id - b.id)) {
      const k = keyOf(m)
      if (!map.has(k)) map.set(k, [])
      map.get(k)!.push(m)
    }
    return [...map.entries()]
  }, [filtered, timezone])

  const sortedTeams = [...teams].sort((a, b) => a.nameLocal.localeCompare(b.nameLocal))

  return (
    <div className="screen">
      <div className="spread" style={{ marginBottom: 18 }}>
        <div className="seg seg-lg" style={{ marginBottom: 0 }}>
          {tabs.map(([id, l]) => (
            <button key={id} className={'seg-b' + (tab === id ? ' on' : '')} onClick={() => setTab(id)}>
              {l}{id === 'live' && <span className="seg-live" />}
            </button>
          ))}
        </div>
        <div className="row" style={{ gap: 10 }}>
          <select className="input" style={{ width: 'auto' }} value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="">Sve grupe</option>
            {GROUP_IDS.map((g) => <option key={g} value={g}>Grupa {g}</option>)}
          </select>
          <select className="input" style={{ width: 'auto' }} value={team} onChange={(e) => setTeam(e.target.value)}>
            <option value="">Sve reprezentacije</option>
            {sortedTeams.map((t) => <option key={t.code} value={t.code}>{t.nameLocal}</option>)}
          </select>
        </div>
      </div>

      {byDate.length === 0 && <div className="empty"><div className="big">📭</div><h3>Nema utakmica</h3><p>Promijeni filter da vidiš utakmice.</p></div>}

      {byDate.map(([date, ms]) => (
        <div key={date}>
          <div className="date-head">
            <b>{formatDate(date)}</b>
            <span>{formatDayName(date)} · {ms.length} {ms.length === 1 ? 'utakmica' : 'utakmica'}</span>
            <span className="line" />
          </div>
          <div className="sched-list">
            {ms.map((m) => <FullMatchRow key={m.id} m={m} onEdit={setEditId} />)}
          </div>
        </div>
      ))}

      {editId !== null && <MatchEditor matchId={editId} onClose={() => setEditId(null)} />}
    </div>
  )
}
