import { useState } from 'react'
import { useResults } from '../store/useResults'
import { matchById, STAGE_LABELS } from '../data/matches'
import { venueById } from '../data/venues'
import { teamByCode } from '../data/teams'
import { resolveMatchSides } from '../utils/bracket'
import { Flag } from './Flag'
import { formatDate } from '../utils/format'
import type { Scorer } from '../types'

function Stepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="stepper">
      <button onClick={() => onChange(Math.max(0, value - 1))} aria-label="manje">−</button>
      <span className="num">{value}</span>
      <button onClick={() => onChange(Math.min(20, value + 1))} aria-label="više">+</button>
    </div>
  )
}

export function MatchEditor({ matchId, onClose }: { matchId: number; onClose: () => void }) {
  const { results, setResult } = useResults()
  const match = matchById[matchId]
  const existing = results[matchId]
  const { home, away } = resolveMatchSides(match, results)

  const [hs, setHs] = useState(existing?.homeScore ?? 0)
  const [as, setAs] = useState(existing?.awayScore ?? 0)
  const [decidedBy, setDecidedBy] = useState(existing?.decidedBy ?? 'reg')
  const [hp, setHp] = useState(existing?.homePens ?? 4)
  const [ap, setAp] = useState(existing?.awayPens ?? 3)
  const [scorers, setScorers] = useState<Scorer[]>(existing?.scorers ?? [])
  const [newName, setNewName] = useState('')
  const [newSide, setNewSide] = useState<'home' | 'away'>('home')
  const [newMin, setNewMin] = useState('')

  const venue = venueById[match.venueId]
  const isKnockout = match.stage !== 'group'
  const resolved = !!home.code && !!away.code
  const hc = home.code, ac = away.code
  const tie = hs === as
  const needsTiebreak = isKnockout && tie

  function addScorer() {
    const code = newSide === 'home' ? hc : ac
    if (!code || !newName.trim()) return
    setScorers((s) => [...s, { name: newName.trim(), teamCode: code, minute: newMin ? Number(newMin) : undefined }])
    setNewName(''); setNewMin('')
  }

  function save() {
    setResult(matchId, {
      homeScore: hs,
      awayScore: as,
      played: true,
      scorers,
      decidedBy: isKnockout ? (decidedBy as 'reg' | 'aet' | 'pens') : 'reg',
      homePens: needsTiebreak && decidedBy === 'pens' ? hp : undefined,
      awayPens: needsTiebreak && decidedBy === 'pens' ? ap : undefined,
    })
    onClose()
  }

  function reset() {
    setResult(matchId, null)
    onClose()
  }

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="eyebrow">{STAGE_LABELS[match.stage]}{match.group ? ` · Grupa ${match.group}` : ''}</div>
            <h3>Unos rezultata</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        <p className="faint" style={{ fontSize: 12.5, marginTop: 2 }}>
          {formatDate(match.date)} · {venue?.stadium}, {venue?.city}
        </p>

        {!resolved && isKnockout ? (
          <div className="empty" style={{ marginTop: 18 }}>
            <div className="big">🔒</div>
            Učesnici ovog meča još nisu poznati.<br />
            Rezultat ćeš moći unijeti kad se završi prethodna faza.
          </div>
        ) : (
          <>
            <div className="score-edit">
              <div className="col">
                {hc && <Flag slug={teamByCode[hc].flag} code={hc} size={40} />}
                <div style={{ fontWeight: 700, marginTop: 6 }}>{hc ? teamByCode[hc].nameLocal : home.label}</div>
                <Stepper value={hs} onChange={setHs} />
              </div>
              <div style={{ fontWeight: 800, fontSize: 22, color: 'var(--faint)' }}>:</div>
              <div className="col">
                {ac && <Flag slug={teamByCode[ac].flag} code={ac} size={40} />}
                <div style={{ fontWeight: 700, marginTop: 6 }}>{ac ? teamByCode[ac].nameLocal : away.label}</div>
                <Stepper value={as} onChange={setAs} />
              </div>
            </div>

            {needsTiebreak && (
              <div className="field">
                <label>Riješeno (neriješeno u regularnom dijelu)</label>
                <div className="row">
                  {(['aet', 'pens'] as const).map((opt) => (
                    <button
                      key={opt}
                      className={`tag-pill ${decidedBy === opt ? 'on' : ''}`}
                      onClick={() => setDecidedBy(opt)}
                    >
                      {opt === 'aet' ? 'Produžeci' : 'Penali'}
                    </button>
                  ))}
                </div>
                {decidedBy === 'pens' && (
                  <div className="row" style={{ marginTop: 10 }}>
                    <span className="faint">Penali:</span>
                    <Stepper value={hp} onChange={setHp} />
                    <span className="faint">:</span>
                    <Stepper value={ap} onChange={setAp} />
                  </div>
                )}
              </div>
            )}

            {resolved && (
              <>
                <div className="divider" />
                <label style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>Strijelci (opcionalno)</label>
                {scorers.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '8px 0' }}>
                    {scorers.map((s, i) => (
                      <div key={i} className="row" style={{ justifyContent: 'space-between', fontSize: 13 }}>
                        <span><b>{s.name}</b> <span className="faint">({s.teamCode}{s.minute ? `, ${s.minute}'` : ''})</span></span>
                        <button className="icon-btn" style={{ width: 26, height: 26, fontSize: 13 }} onClick={() => setScorers((x) => x.filter((_, j) => j !== i))}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="row" style={{ marginTop: 8 }}>
                  <input className="input" style={{ flex: 2 }} placeholder="Ime strijelca" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addScorer()} />
                  <select className="input" style={{ flex: 1 }} value={newSide} onChange={(e) => setNewSide(e.target.value as 'home' | 'away')}>
                    <option value="home">{hc}</option>
                    <option value="away">{ac}</option>
                  </select>
                  <input className="input" style={{ width: 64 }} placeholder="min" inputMode="numeric" value={newMin} onChange={(e) => setNewMin(e.target.value.replace(/\D/g, ''))} onKeyDown={(e) => e.key === 'Enter' && addScorer()} />
                  <button className="btn btn-sm" onClick={addScorer}>+ Dodaj</button>
                </div>
              </>
            )}

            <div className="row" style={{ justifyContent: 'space-between', marginTop: 22 }}>
              {existing ? <button className="btn btn-danger" onClick={reset}>Poništi rezultat</button> : <span />}
              <div className="row">
                <button className="btn btn-ghost" onClick={onClose}>Otkaži</button>
                <button className="btn btn-primary" onClick={save}>Sačuvaj rezultat</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
