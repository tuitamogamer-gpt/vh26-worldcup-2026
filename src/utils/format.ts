export const MONTHS_BS = [
  'januar', 'februar', 'mart', 'april', 'maj', 'juni',
  'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar',
]
export const DAYS_BS = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota']
export const DAYS_SHORT = ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub']

function parse(dateStr: string): Date {
  // Treat as local date (no timezone shift surprises).
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function formatDate(dateStr: string): string {
  const dt = parse(dateStr)
  return `${dt.getDate()}. ${MONTHS_BS[dt.getMonth()]} ${dt.getFullYear()}.`
}

export function formatDateShort(dateStr: string): string {
  const dt = parse(dateStr)
  return `${DAYS_SHORT[dt.getDay()]} ${dt.getDate()}.${dt.getMonth() + 1}.`
}

export function formatDayName(dateStr: string): string {
  return DAYS_BS[parse(dateStr).getDay()]
}

export function dateKey(dateStr: string): string {
  return dateStr
}

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

export function countdownTo(target: Date, now: Date): Countdown {
  let diff = Math.floor((target.getTime() - now.getTime()) / 1000)
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  const days = Math.floor(diff / 86400); diff -= days * 86400
  const hours = Math.floor(diff / 3600); diff -= hours * 3600
  const minutes = Math.floor(diff / 60); diff -= minutes * 60
  return { days, hours, minutes, seconds: diff, done: false }
}

export function flagUrl(slug: string, width: 80 | 160 | 320 = 80): string {
  return `https://flagcdn.com/w${width}/${slug}.png`
}
