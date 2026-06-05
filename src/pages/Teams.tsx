import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { teams, CONFEDERATION_NAMES, GROUP_IDS } from '../data/teams'
import { Flag } from '../components/Flag'
import { StarToggle } from '../components/FavoriteButton'
import type { Confederation } from '../types'

const CONFEDS: Confederation[] = ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC']

export function Teams() {
  const [q, setQ] = useState('')
  const [conf, setConf] = useState('')
  const [group, setGroup] = useState('')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return teams
      .filter((t) => !conf || t.confederation === conf)
      .filter((t) => !group || t.group === group)
      .filter((t) => !needle || t.nameLocal.toLowerCase().includes(needle) || t.name.toLowerCase().includes(needle) || t.code.toLowerCase().includes(needle))
      .sort((a, b) => a.fifaRank - b.fifaRank)
  }, [q, conf, group])

  return (
    <div className="screen">
      <div className="spread" style={{ marginBottom: 18 }}>
        <input className="input" style={{ maxWidth: 280 }} placeholder="🔎 Traži reprezentaciju…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="row" style={{ gap: 10 }}>
          <select className="input" style={{ width: 'auto' }} value={conf} onChange={(e) => setConf(e.target.value)}>
            <option value="">Sve konfederacije</option>
            {CONFEDS.map((c) => <option key={c} value={c}>{CONFEDERATION_NAMES[c]}</option>)}
          </select>
          <select className="input" style={{ width: 'auto' }} value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="">Sve grupe</option>
            {GROUP_IDS.map((g) => <option key={g} value={g}>Grupa {g}</option>)}
          </select>
        </div>
      </div>

      <div className="card-grid">
        {filtered.map((t, i) => (
          <Link to={`/timovi/${t.code}`} key={t.code} className="card pad reveal" style={{ position: 'relative', display: 'block', '--i': i } as React.CSSProperties}>
            <StarToggle code={t.code} />
            <Flag code={t.code} size={48} />
            <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 17, marginTop: 12 }}>{t.nameLocal}</div>
            <div className="faint" style={{ fontSize: 11.5 }}>{CONFEDERATION_NAMES[t.confederation]}</div>
            <div className="row" style={{ gap: 6, marginTop: 12 }}>
              <span className="pill pill-lime">Gr. {t.group}</span>
              <span className="pill">#{t.fifaRank}</span>
              {t.titles > 0 && <span className="chip gold">🏆 {t.titles}</span>}
              {t.debut && <span className="pill pill-lime">Debi</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
