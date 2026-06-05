import type { Match } from '../types'
import { useResults } from '../store/useResults'
import { useSettings } from '../store/useSettings'
import { useLive } from '../store/useLive'
import { resolveMatchSides } from '../utils/bracket'
import { venueById } from '../data/venues'
import { teamByCode } from '../data/teams'
import { Flag } from './Flag'
import { Icon } from './Icon'
import { kickoffInstant, timeInTz, dayDateInTz } from '../utils/timezone'
import { STAGE_SHORT } from '../data/matches'

interface Props {
  match: Match
  onClick?: (id: number) => void
  showStage?: boolean
  i?: number
}

export function MatchCard({ match, onClick, showStage, i = 0 }: Props) {
  const { results } = useResults()
  const { timezone } = useSettings()
  const { liveScores } = useLive()
  const { home, away } = resolveMatchSides(match, results)
  const r = results[match.id]
  const live = liveScores[match.id]
  const played = r?.played
  const venue = venueById[match.venueId]

  const inst = kickoffInstant(match)
  const kickoff = inst ? timeInTz(inst, timezone) : match.time
  const stageLabel = showStage ? STAGE_SHORT[match.stage] : match.group ? `Grupa ${match.group}` : STAGE_SHORT[match.stage]

  const side = (slot: typeof home, score: number | undefined, liveScore: boolean) => {
    const nm = slot.code ? (teamByCode[slot.code]?.nameLocal ?? slot.label) : slot.label
    return (
      <div className="mc-row">
        <Flag code={slot.code ?? ''} size={26} />
        <span className="nm" style={!slot.code ? { color: 'var(--faint)', fontWeight: 500 } : undefined}>{nm}</span>
        {score != null && <b className={'mc-g' + (liveScore ? ' live' : '')}>{score}</b>}
      </div>
    )
  }

  return (
    <button className="card mc reveal" style={{ '--i': i } as React.CSSProperties} onClick={onClick ? () => onClick(match.id) : undefined}>
      <div className="mc-top">
        <span className="mc-stage">{stageLabel}</span>
        {live
          ? <span className="live-badge"><span className="live-dot" />LIVE<span className="live-min"> {live.elapsed ?? 0}'</span></span>
          : played
            ? <span className="mc-status ft">KRAJ</span>
            : <span className="mc-status up"><Icon.clock size={13} /> {kickoff ?? '—'}</span>}
      </div>
      <div className="mc-teams">
        {side(home, live ? live.home : played ? r!.homeScore : undefined, !!live)}
        {side(away, live ? live.away : played ? r!.awayScore : undefined, !!live)}
      </div>
      <div className="mc-foot">
        <span className="mc-venue"><Icon.pin size={13} /> {venue?.city}</span>
        {r?.decidedBy === 'pens'
          ? <span className="mc-venue" style={{ color: 'var(--amber)' }}>pen {r.homePens}:{r.awayPens}</span>
          : <span className="mc-venue">{inst ? dayDateInTz(inst, timezone) : ''}</span>}
      </div>
    </button>
  )
}
