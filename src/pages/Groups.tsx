import { GROUP_IDS } from '../data/teams'
import { useResults } from '../store/useResults'
import { bestThirds } from '../utils/standings'
import { StandingsTable } from '../components/StandingsTable'
import { TeamLabel } from '../components/Team'

export function Groups() {
  const { results } = useResults()
  const thirds = bestThirds(results)
  const anyPlayed = Object.values(results).some((r) => r.played)

  return (
    <div className="screen">
      <p className="page-sub">12 grupa po 4 tima — prve dvije i 8 najboljih trećih idu u nokaut.</p>

      <div className="tables-grid">
        {GROUP_IDS.map((g, gi) => (
          <div className="card pad reveal" style={{ '--i': gi } as React.CSSProperties} key={g}>
            <div className="gt-head">
              <h3>Grupa {g}</h3>
              <span className="gt-leg">Top 2 prolaze <span className="qdot" /></span>
            </div>
            <StandingsTable group={g} />
          </div>
        ))}
      </div>

      <div className="block" style={{ marginTop: 26 }}>
        <div className="block-head"><h2>Trka za 3. mjesto</h2><span className="link">8 najboljih prolazi</span></div>
        <div className="card pad">
          {!anyPlayed ? (
            <p className="faint" style={{ fontSize: 13 }}>Poredak trećeplasiranih pojaviće se kada počnu utakmice.</p>
          ) : (
            <div className="gt-table">
              <div className="gt-row gt-h" style={{ gridTemplateColumns: '26px 1fr 34px 34px 44px 34px' }}>
                <span>#</span><span className="gt-team">Tim</span><span>Gr.</span><span>O</span><span>GR</span><span className="bld">B</span>
              </div>
              {thirds.map((r, i) => (
                <div key={r.teamCode} className={'gt-row' + (i < 8 ? ' qual3' : '')} style={{ gridTemplateColumns: '26px 1fr 34px 34px 44px 34px' }}>
                  <span className="gt-pos">{i + 1}</span>
                  <span className="gt-team"><TeamLabel code={r.teamCode} size={24} link={false} /></span>
                  <span className="bld" style={{ color: 'var(--text)' }}>{r.group}</span>
                  <span>{r.played}</span>
                  <span>{r.gd > 0 ? '+' : ''}{r.gd}</span>
                  <span className="gt-pts">{r.points}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
