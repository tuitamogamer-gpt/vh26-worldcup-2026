import { Link } from 'react-router-dom'
import { teamByCode } from '../data/teams'
import { Flag } from './Flag'
import type { ResolvedSlot } from '../utils/bracket'

interface TeamLabelProps {
  code: string
  size?: number
  local?: boolean
  link?: boolean
  reverse?: boolean
}

// Flag + name, optionally linked to the team page.
export function TeamLabel({ code, size = 26, local = true, link = true, reverse = false }: TeamLabelProps) {
  const t = teamByCode[code]
  if (!t) return <span className="team-line"><span className="team-name muted">{code}</span></span>
  const inner = (
    <span className="team-line" style={reverse ? { flexDirection: 'row-reverse' } : undefined}>
      <Flag code={t.code} size={size} />
      <span className="team-name">{local ? t.nameLocal : t.name}</span>
    </span>
  )
  return link ? <Link to={`/timovi/${t.code}`}>{inner}</Link> : inner
}

// One side of a match: resolved team or placeholder label.
export function SlotLabel({ slot, size = 26, reverse = false }: { slot: ResolvedSlot; size?: number; reverse?: boolean }) {
  if (slot.code && teamByCode[slot.code]) return <TeamLabel code={slot.code} size={size} reverse={reverse} />
  return (
    <span className="team-line" style={reverse ? { flexDirection: 'row-reverse' } : undefined}>
      <span className="tbd-chip" style={{ width: size, height: size }} />
      <span className="team-name faint" style={{ fontStyle: 'italic' }}>{slot.label}</span>
    </span>
  )
}
