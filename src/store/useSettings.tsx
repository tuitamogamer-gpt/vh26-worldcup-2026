import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Settings } from '../types'
import { DEFAULT_TZ } from '../utils/timezone'

const STORAGE_KEY = 'wc2026:settings:v1'

const DEFAULTS: Settings = {
  timezone: DEFAULT_TZ, favorites: [], primary: null,
  apiKey: '', liveMode: false, pollSeconds: 90,
}

interface SettingsContextValue extends Settings {
  setTimezone: (tz: string) => void
  toggleFavorite: (code: string) => void
  isFavorite: (code: string) => boolean
  setPrimary: (code: string | null) => void
  setLive: (patch: Partial<Pick<Settings, 'apiKey' | 'liveMode' | 'pollSeconds'>>) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

function read(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) }
  } catch {
    return DEFAULTS
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => read())

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)) } catch { /* ignore */ }
  }, [settings])

  const setTimezone = useCallback((tz: string) => setSettings((s) => ({ ...s, timezone: tz })), [])

  const toggleFavorite = useCallback((code: string) => {
    setSettings((s) => {
      const has = s.favorites.includes(code)
      const favorites = has ? s.favorites.filter((c) => c !== code) : [...s.favorites, code]
      // If we removed the primary, clear it. If first favorite, make it primary.
      let primary = s.primary
      if (has && s.primary === code) primary = favorites[0] ?? null
      if (!has && !s.primary) primary = code
      return { ...s, favorites, primary }
    })
  }, [])

  const setPrimary = useCallback((code: string | null) => {
    setSettings((s) => {
      if (code && !s.favorites.includes(code)) {
        return { ...s, favorites: [...s.favorites, code], primary: code }
      }
      return { ...s, primary: code }
    })
  }, [])

  const isFavorite = useCallback((code: string) => settings.favorites.includes(code), [settings.favorites])

  const setLive = useCallback((patch: Partial<Pick<Settings, 'apiKey' | 'liveMode' | 'pollSeconds'>>) => {
    setSettings((s) => ({ ...s, ...patch }))
  }, [])

  const value = useMemo<SettingsContextValue>(
    () => ({ ...settings, setTimezone, toggleFavorite, isFavorite, setPrimary, setLive }),
    [settings, setTimezone, toggleFavorite, isFavorite, setPrimary, setLive],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
