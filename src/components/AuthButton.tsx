import { useState } from 'react'
import { useAuth } from '../store/useAuth'
import { Icon } from './Icon'

export function AuthButton() {
  const { enabled, user, loading, signInWithGoogle, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  // Auth not configured → keep the original decorative avatar (production unchanged).
  if (!enabled) return <div className="avatar"><Icon.ball size={20} /></div>
  if (loading) return <div className="avatar" />
  if (!user) return <button className="btn btn-sm btn-lime" onClick={signInWithGoogle}><Icon.star size={15} /> Prijava</button>

  const meta = (user.user_metadata ?? {}) as Record<string, string>
  const name = meta.full_name || meta.name || user.email || 'Korisnik'
  const avatarUrl = meta.avatar_url || meta.picture
  const initial = name.charAt(0).toUpperCase()

  return (
    <div style={{ position: 'relative' }}>
      <button className="avatar" onClick={() => setOpen((o) => !o)} title={name}>
        {avatarUrl ? <img src={avatarUrl} alt="" referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initial}
      </button>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 29 }} onClick={() => setOpen(false)} />
          <div className="auth-pop">
            <div className="auth-pop-name">{name}</div>
            <div className="faint" style={{ fontSize: 11.5, marginTop: 2, wordBreak: 'break-all' }}>{user.email}</div>
            <button className="row-link" style={{ marginTop: 12 }} onClick={() => { setOpen(false); signOut() }}>Odjava</button>
          </div>
        </>
      )}
    </div>
  )
}
