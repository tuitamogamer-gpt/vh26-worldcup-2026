import { squadByPosition } from '../data/squads'

export function Squad({ code }: { code: string }) {
  const groups = squadByPosition(code)
  if (!groups.length) return <p className="faint" style={{ fontSize: 13 }}>Sastav nije dostupan.</p>
  let n = 0
  return (
    <div className="squad">
      {groups.map((g) => (
        <div key={g.pos}>
          <div className="sq-group-h">{g.label} · {g.players.length}</div>
          {g.players.map((pl, i) => {
            n++
            return (
              <div className="sq-row" key={i}>
                <span className="sq-no">{n}</span>
                <span className="sq-name">{pl.name}{pl.captain && <b style={{ color: 'var(--amber)', marginLeft: 6, fontSize: 11 }}>C</b>}</span>
                <span className="sq-club">{pl.club}</span>
                <span className={`sq-pos pos-${g.pos}`}>{g.pos}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
