import { useState } from 'react'
import { useSettings } from '../store/useSettings'
import { useLive } from '../store/useLive'
import { fetchStatus } from '../live/apiFootball'

const STATUS_LABEL: Record<string, string> = {
  off: 'Live isključen', connecting: 'Povezivanje…', connected: 'Live aktivan', error: 'Greška',
}

export function LiveControls() {
  const { apiKey, liveMode, pollSeconds, setLive } = useSettings()
  const { status, message, lastUpdated, liveCount, refresh } = useLive()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(apiKey)
  const [test, setTest] = useState<{ state: 'idle' | 'testing' | 'ok' | 'err'; msg: string }>({ state: 'idle', msg: '' })

  const label = liveCount > 0 ? `${liveCount} UŽIVO` : STATUS_LABEL[status]

  async function runTest() {
    setTest({ state: 'testing', msg: '' })
    try {
      const info = await fetchStatus(draft.trim())
      setTest({ state: 'ok', msg: info })
    } catch (e) {
      setTest({ state: 'err', msg: e instanceof Error ? e.message : 'Greška' })
    }
  }

  return (
    <>
      <button className={`live-btn ${status}`} onClick={() => { setDraft(apiKey); setOpen(true) }} title="Live rezultati">
        <span className={`lb-dot ${status}`} />
        {label}
      </button>

      {open && (
        <div className="modal-back" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="eyebrow">API-Football</div>
                <h3>Live rezultati i statistika</h3>
              </div>
              <button className="icon-btn" onClick={() => setOpen(false)}>✕</button>
            </div>

            <p className="muted" style={{ fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>
              Zalijepi svoj API ključ sa <b>dashboard.api-football.com</b> (besplatna registracija). Ključ se čuva
              lokalno u tvom pregledniku i ide kroz lokalni proxy — nikad nije u kodu aplikacije.
            </p>

            <div className="field">
              <label>API ključ</label>
              <input className="input" type="text" placeholder="npr. 9a1b2c3d…" value={draft}
                onChange={(e) => setDraft(e.target.value)} spellCheck={false} autoComplete="off" />
            </div>

            <div className="row" style={{ marginTop: 12, gap: 8 }}>
              <button className="btn btn-sm" onClick={runTest} disabled={!draft.trim() || test.state === 'testing'}>
                {test.state === 'testing' ? 'Testiram…' : 'Testiraj ključ'}
              </button>
              {test.state === 'ok' && <span className="chip green">✓ {test.msg}</span>}
              {test.state === 'err' && <span className="chip live">✕ {test.msg}</span>}
            </div>

            <div className="field">
              <label>Interval osvježavanja</label>
              <select className="input" value={pollSeconds} onChange={(e) => setLive({ pollSeconds: Number(e.target.value) })}>
                <option value={60}>svakih 60 s</option>
                <option value={90}>svakih 90 s</option>
                <option value={120}>svakih 2 min</option>
                <option value={300}>svakih 5 min</option>
              </select>
            </div>

            <div className="divider" />
            <div className="spread">
              <div className="muted" style={{ fontSize: 12.5 }}>
                Status: <b style={{ color: 'var(--text)' }}>{STATUS_LABEL[status]}</b>
                {lastUpdated && <> · osvježeno {new Date(lastUpdated).toLocaleTimeString('hr-HR')}</>}
                {message && <><br /><span style={{ color: 'var(--danger)' }}>{message}</span></>}
              </div>
              {liveMode && <button className="btn btn-sm btn-ghost" onClick={refresh}>↻ Osvježi sad</button>}
            </div>

            <div className="row" style={{ justifyContent: 'flex-end', marginTop: 18, gap: 8 }}>
              {liveMode
                ? <button className="btn btn-danger" onClick={() => { setLive({ apiKey: draft.trim(), liveMode: false }) }}>Isključi live</button>
                : null}
              <button className="btn btn-primary" onClick={() => { setLive({ apiKey: draft.trim(), liveMode: true }); setOpen(false) }} disabled={!draft.trim()}>
                {liveMode ? 'Sačuvaj' : 'Uključi live'}
              </button>
            </div>

            <p className="faint" style={{ fontSize: 11.5, marginTop: 14, lineHeight: 1.5 }}>
              Napomena: live radi dok je aplikacija pokrenuta preko dev-servera (start-app.bat). Besplatni plan ima
              dnevni limit poziva — veći interval troši manje. Ručno uneseni rezultati se nikad ne prepisuju.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
