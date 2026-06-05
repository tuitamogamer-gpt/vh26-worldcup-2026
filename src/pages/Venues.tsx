import { useMemo } from 'react'
import { venues } from '../data/venues'
import { matches, STAGE_SHORT } from '../data/matches'
import { Icon } from '../components/Icon'
import { flagUrl } from '../utils/format'
import type { Stage } from '../types'

const CFLAG: Record<string, string> = { USA: 'us', Mexico: 'mx', Canada: 'ca' }
const CNAME: Record<string, string> = { USA: 'Sjedinjene Države', Mexico: 'Meksiko', Canada: 'Kanada' }

export function Venues() {
  const stats = useMemo(() => {
    const per: Record<string, { count: number; stages: Set<Stage> }> = {}
    for (const v of venues) per[v.id] = { count: 0, stages: new Set() }
    for (const m of matches) { const e = per[m.venueId]; if (e) { e.count++; e.stages.add(m.stage) } }
    return per
  }, [])
  const byCountry = ['Mexico', 'Canada', 'USA'].map((c) => ({ country: c, list: venues.filter((v) => v.country === c).sort((a, b) => b.capacity - a.capacity) }))
  const totalCap = venues.reduce((s, v) => s + v.capacity, 0)

  return (
    <div className="screen">
      <p className="page-sub">16 stadiona u 16 gradova širom tri države domaćina.</p>
      <div className="grid cols-3" style={{ marginBottom: 22 }}>
        <div className="stat accent-green"><div className="glyph">🏟️</div><div className="label">Stadiona</div><div className="value">16</div><div className="sub">u 3 države</div></div>
        <div className="stat accent-blue"><div className="glyph">👥</div><div className="label">Ukupan kapacitet</div><div className="value">{(totalCap / 1000).toFixed(0)}k+</div><div className="sub">sjedišta</div></div>
        <div className="stat accent-gold"><div className="glyph">⭐</div><div className="label">Najveći</div><div className="value">94k</div><div className="sub">AT&T, Dallas</div></div>
      </div>

      {byCountry.map(({ country, list }) => (
        <div className="block" key={country}>
          <div className="date-head">
            <b className="row" style={{ gap: 8 }}><img className="flag" src={flagUrl(CFLAG[country], 80)} width={22} height={22} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" /> {CNAME[country]}</b>
            <span>{list.length} stadiona</span><span className="line" />
          </div>
          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' }}>
            {list.map((v) => {
              const s = stats[v.id]
              const finalHost = s.stages.has('F')
              return (
                <div className="card pad" key={v.id} style={finalHost ? { borderColor: 'rgba(200,242,60,.4)' } : undefined}>
                  <div className="spread">
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 16 }}>{v.stadium}</div>
                    {finalHost && <span className="pill pill-lime">Finale</span>}
                    {!finalHost && s.stages.has('SF') && <span className="chip blue">Polufinale</span>}
                  </div>
                  <div className="faint" style={{ fontSize: 13, marginTop: 3 }}><Icon.pin size={12} /> {v.city} · {v.region}</div>
                  <div className="divider" />
                  <div className="spread">
                    <span className="muted" style={{ fontSize: 13 }}>👥 {v.capacity.toLocaleString('de-DE')}</span>
                    <span className="pill">{s.count} ut.</span>
                  </div>
                  <div className="row" style={{ gap: 5, marginTop: 12 }}>
                    {[...s.stages].sort().map((st) => <span key={st} className="pill" style={{ fontSize: 11 }}>{STAGE_SHORT[st]}</span>)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
