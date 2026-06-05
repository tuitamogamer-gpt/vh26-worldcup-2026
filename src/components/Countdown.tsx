import { useEffect, useState } from 'react'
import { countdownTo } from '../utils/format'
import { TOURNAMENT } from '../data/tournament'

export function Countdown() {
  const target = new Date(TOURNAMENT.start)
  const [cd, setCd] = useState(() => countdownTo(target, new Date()))

  useEffect(() => {
    const t = setInterval(() => setCd(countdownTo(target, new Date())), 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (cd.done) return <span className="live-badge" style={{ fontSize: 13, padding: '6px 12px' }}><span className="live-dot" /> TURNIR U TOKU</span>

  const cells: [string, number][] = [['Dana', cd.days], ['Sati', cd.hours], ['Min', cd.minutes], ['Sek', cd.seconds]]
  return (
    <div className="cd-wrap">
      {cells.map(([u, n]) => (
        <div className="cd-cell" key={u}>
          <div className="n">{String(n).padStart(2, '0')}</div>
          <div className="u">{u}</div>
        </div>
      ))}
    </div>
  )
}
