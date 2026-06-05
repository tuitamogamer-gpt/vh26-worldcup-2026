import { useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { useResults } from './useResults'
import { useSettings } from './useSettings'

// Headless component: syncs the logged-in user's data with Supabase.
// Cloud wins on login; first login seeds the cloud from local data.
export function Sync() {
  const { user } = useAuth()
  const { results, hydrate: hydrateResults } = useResults()
  const settings = useSettings()
  const loadedFor = useRef<string | null>(null)

  const snapRef = useRef<{ results: unknown; prefs: unknown }>({ results, prefs: {} })
  snapRef.current = {
    results,
    prefs: { timezone: settings.timezone, favorites: settings.favorites, primary: settings.primary },
  }

  // Load on login (and seed cloud on first login)
  useEffect(() => {
    if (!supabase || !user) { loadedFor.current = null; return }
    let cancelled = false
    ;(async () => {
      const { data, error } = await supabase!.from('profiles').select('data').eq('id', user.id).maybeSingle()
      if (cancelled) return
      if (!error && data && (data as any).data) {
        const d = (data as any).data
        if (d.results) hydrateResults(d.results)
        if (d.prefs) settings.hydrate(d.prefs)
      } else if (!error) {
        await supabase!.from('profiles').upsert({ id: user.id, data: snapRef.current })
      }
      loadedFor.current = user.id
    })()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // Save on change (debounced), only after the initial load completed for this user
  useEffect(() => {
    if (!supabase || !user || loadedFor.current !== user.id) return
    const t = setTimeout(() => {
      supabase!.from('profiles').upsert({ id: user.id, data: snapRef.current, updated_at: new Date().toISOString() })
    }, 800)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, settings.timezone, settings.favorites, settings.primary, user])

  return null
}
