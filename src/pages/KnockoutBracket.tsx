import { useState } from 'react'
import type { Match } from '../types'
import { matchById } from '../data/matches'
import { useResults } from '../store/useResults'
import { useSettings } from '../store/useSettings'
import { resolveMatchSides, matchOutcome } from '../utils/bracket'
import type { ResolvedSlot } from '../utils/bracket'
import { teamByCode } from '../data/teams'
import { Flag } from '../components/Flag'
import { MatchEditor } from '../components/MatchEditor'
import { kickoffInstant, timeInTz, dayDateInTz } from '../utils/timezone'

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i)
const COLS = [
  { label: 'Šesnaestina', ids: range(73, 88) },
  { label: 'Osmina finala', ids: range(89, 96) },
  { label: 'Četvrtfinale', ids: range(97, 100) },
  { label: 'Polufinale', ids: [101, 102] },
  { label: 'Finale', ids: [104] },
]

function TieRow({ slot, score, win }: { slot: ResolvedSlot; score: number | null; win: boolean }) {
  const t = slot.code ? teamByCode[slot.code] : null
  return (
    <div className={'tie-row' + (win ? ' win' : '') + (!t ? ' tbd' : '')}>
      {t ? <Flag code={t.code} size={24} /> : <span className="tbd-chip" />}
      <span className="tie-name">{t ? t.nameLocal : slot.label}</span>
      <span className="tie-score">{score ?? ''}</span>
    </div>
  )
}

function Tie({ match, onEdit, final }: { match: Match; onEdit: (id: number) => void; final?: boolean }) {
  const { results } = useResults()
  const { timezone } = useSettings()
  const { home, away } = resolveMatchSides(match, results)
  const r = results[match.id]
  const out = matchOutcome(match.id, results)
  const inst = kickoffInstant(match)
  return (
    <div className={'card tie reveal' + (final ? ' tie-final' : '')} onClick={() => onEdit(match.id)}>
      {final && <div className="tie-trophy">🏆 FINALE</div>}
      <TieRow slot={home} score={r?.played ? r.homeScore : null} win={!!out.winner && out.winner === home.code} />
      <TieRow slot={away} score={r?.played ? r.awayScore : null} win={!!out.winner && out.winner === away.code} />
      {r?.decidedBy === 'pens'
        ? <div className="tie-pen">penali {r.homePens}-{r.awayPens}</div>
        : !r?.played && inst ? <div className="tie-when">{dayDateInTz(inst, timezone)} · {timeInTz(inst, timezone)}</div> : null}
    </div>
  )
}

export function KnockoutBracket() {
  const [editId, setEditId] = useState<number | null>(null)
  const tp = matchById[103]

  return (
    <div className="screen bracket-screen">
      <p className="page-sub">Žrijeb se popunjava automatski iz rezultata grupa. Klikni meč za unos rezultata.</p>
      <div className="bracket-scroll">
        <div className="bracket-cols">
          {COLS.map((c) => (
            <div className="br-col" key={c.label}>
              <div className="br-col-h">{c.label}</div>
              <div className="br-col-body">
                {c.ids.map((id) => <Tie key={id} match={matchById[id]} onEdit={setEditId} final={id === 104} />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="block" style={{ marginTop: 8, maxWidth: 360 }}>
        <div className="block-head sm"><h3>Meč za 3. mjesto</h3></div>
        <Tie match={tp} onEdit={setEditId} />
      </div>

      {editId !== null && <MatchEditor matchId={editId} onClose={() => setEditId(null)} />}
    </div>
  )
}
