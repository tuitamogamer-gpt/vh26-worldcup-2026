import { useState } from 'react'
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom'
import { Icon } from './Icon'
import { Flag } from './Flag'
import { LiveControls } from './LiveControls'
import { AuthButton } from './AuthButton'
import { useSettings } from '../store/useSettings'
import { TIMEZONES } from '../utils/timezone'
import { teams, teamByCode } from '../data/teams'
import { DAYS_BS, MONTHS_BS } from '../utils/format'

const NAV = [
  { to: '/', label: 'Pregled', icon: Icon.grid, end: true },
  { to: '/live', label: 'Live', icon: Icon.live, live: true },
  { to: '/raspored', label: 'Raspored', icon: Icon.cal },
  { to: '/grupe', label: 'Tabele', icon: Icon.table },
  { to: '/nokaut', label: 'Bracket', icon: Icon.bracket },
  { to: '/timovi', label: 'Timovi', icon: Icon.shield },
  { to: '/statistika', label: 'Statistika', icon: Icon.chart },
  { to: '/moj-tim', label: 'Favoriti', icon: Icon.star },
  { to: '/stadioni', label: 'Stadioni', icon: Icon.stadium },
]

function todayLabel(): string {
  const d = new Date()
  return `${DAYS_BS[d.getDay()].replace(/^./, (c) => c.toUpperCase())} · ${d.getDate()}. ${MONTHS_BS[d.getMonth()]} ${d.getFullYear()}`
}

function pageTitle(path: string): string {
  if (path.startsWith('/timovi/')) {
    const code = path.split('/')[2]?.toUpperCase()
    return teamByCode[code]?.nameLocal ?? 'Tim'
  }
  const map: Record<string, string> = {
    '/': 'Pregled', '/live': 'Live', '/raspored': 'Raspored', '/grupe': 'Tabele',
    '/nokaut': 'Bracket', '/timovi': 'Timovi', '/statistika': 'Statistika',
    '/moj-tim': 'Favoriti', '/stadioni': 'Stadioni',
  }
  return map[path] ?? 'VH26'
}

function TimezonePicker() {
  const { timezone, setTimezone } = useSettings()
  return (
    <span className="tz-pick" title="Vremenska zona">
      🌐
      <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
        {TIMEZONES.map((t) => <option key={t.id} value={t.id}>{t.label} · {t.abbr}</option>)}
      </select>
    </span>
  )
}

function SearchBox() {
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const needle = q.trim().toLowerCase()
  const res = needle
    ? teams.filter((t) => t.nameLocal.toLowerCase().includes(needle) || t.name.toLowerCase().includes(needle) || t.code.toLowerCase().includes(needle)).slice(0, 6)
    : []
  return (
    <label className="search">
      <Icon.search size={17} />
      <input
        placeholder="Traži reprezentaciju…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && res[0]) { nav(`/timovi/${res[0].code}`); setQ('') } }}
      />
      <kbd>/</kbd>
      {res.length > 0 && (
        <div className="search-pop">
          {res.map((t) => (
            <Link key={t.code} to={`/timovi/${t.code}`} onClick={() => setQ('')}>
              <Flag code={t.code} size={24} /> {t.nameLocal}
            </Link>
          ))}
        </div>
      )}
    </label>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loc = useLocation()
  const nav = useNavigate()

  const Sidebar = (
    <aside className="sidebar">
      <Link to="/" className="brand">
        <span className="brand-mark"><Icon.ball size={22} /></span>
        <span className="brand-text">VH<span className="brand-26">26</span></span>
      </Link>
      <nav className="nav">
        {NAV.map((n) => {
          const A = n.icon
          return (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
              <span className="nav-ic"><A size={20} /></span>
              <span>{n.label}</span>
              {n.live && <span className="nav-live" />}
              {loc.pathname === n.to && <span className="nav-bar" />}
            </NavLink>
          )
        })}
      </nav>
      <div className="side-foot">
        <div className="cup-card">
          <div className="cup-when">11. JUN — 19. JUL</div>
          <div className="cup-title">FIFA World Cup</div>
          <div className="cup-sub">USA · CAN · MEX</div>
        </div>
      </div>
    </aside>
  )

  const bottomItems = [NAV[0], NAV[1], NAV[3], NAV[4], NAV[7]]

  return (
    <div className="app">
      {Sidebar}
      <div className="main-col">
        <header className="topbar">
          <div className="tb-left">
            <h1 className="tb-title">{pageTitle(loc.pathname)}</h1>
            <span className="tb-date">{todayLabel()}</span>
          </div>
          <div className="tb-right">
            <SearchBox />
            <LiveControls />
            <TimezonePicker />
            <AuthButton />
          </div>
        </header>
        <main className="main">{children}</main>
      </div>

      <nav className="bottombar">
        {bottomItems.map((n) => {
          const A = n.icon
          const active = n.end ? loc.pathname === n.to : loc.pathname.startsWith(n.to)
          return (
            <button key={n.to} className={'bb-item' + (active ? ' active' : '')} onClick={() => nav(n.to)}>
              <A size={21} />
              <span>{n.label}</span>
              {n.live && <span className="bb-live" />}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
