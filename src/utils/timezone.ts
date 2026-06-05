import type { Match } from '../types'
import { venueById } from '../data/venues'
import { DAYS_SHORT, MONTHS_BS } from './format'

export interface TimezoneOption {
  id: string
  label: string
  abbr: string
}

// Curated list — user's home zone first.
export const TIMEZONES: TimezoneOption[] = [
  { id: 'Europe/Sarajevo', label: 'Sarajevo · Beograd · Skoplje', abbr: 'CET' },
  { id: 'Europe/London', label: 'London · Dublin', abbr: 'BST' },
  { id: 'Europe/Istanbul', label: 'Istanbul', abbr: 'TRT' },
  { id: 'Europe/Moscow', label: 'Moskva', abbr: 'MSK' },
  { id: 'UTC', label: 'UTC / GMT', abbr: 'UTC' },
  { id: 'America/New_York', label: 'New York · Toronto', abbr: 'ET' },
  { id: 'America/Chicago', label: 'Chicago · Dallas', abbr: 'CT' },
  { id: 'America/Denver', label: 'Denver', abbr: 'MT' },
  { id: 'America/Los_Angeles', label: 'Los Angeles · Vancouver', abbr: 'PT' },
  { id: 'America/Mexico_City', label: 'Ciudad de México', abbr: 'CST' },
]

export const DEFAULT_TZ = 'Europe/Sarajevo'

export function tzLabel(id: string): string {
  return TIMEZONES.find((t) => t.id === id)?.label ?? id
}

// Absolute kickoff instant from the venue-local date/time and the venue's offset.
export function kickoffInstant(match: Match): Date | null {
  if (!match.time) return null
  const v = venueById[match.venueId]
  if (!v) return null
  const [y, m, d] = match.date.split('-').map(Number)
  const [hh, mm] = match.time.split(':').map(Number)
  if ([y, m, d, hh, mm].some((n) => Number.isNaN(n))) return null
  // local = UTC + offset  →  UTC = local - offset
  return new Date(Date.UTC(y, m - 1, d, hh - v.utcOffset, mm))
}

function ymdInTz(date: Date, tz: string): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date)
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value)
  return { y: get('year'), m: get('month'), d: get('day') }
}

// "YYYY-MM-DD" as seen in the target timezone (for grouping).
export function dateKeyInTz(date: Date, tz: string): string {
  const { y, m, d } = ymdInTz(date, tz)
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// "HH:MM" in the target timezone.
export function timeInTz(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(date)
}

// "sub 13.6." in the target timezone, in Bosnian.
export function dayDateInTz(date: Date, tz: string): string {
  const { y, m, d } = ymdInTz(date, tz)
  const dow = new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay()
  return `${DAYS_SHORT[dow]} ${d}.${m}.`
}

// Full Bosnian date, e.g. "13. juni 2026." in the target timezone.
export function fullDateInTz(date: Date, tz: string): string {
  const { y, m, d } = ymdInTz(date, tz)
  return `${d}. ${MONTHS_BS[m - 1]} ${y}.`
}

// Convenience for a match: kickoff time string in tz, or null if no time set.
export function matchTime(match: Match, tz: string): string | null {
  const inst = kickoffInstant(match)
  return inst ? timeInTz(inst, tz) : null
}
