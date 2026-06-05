// ---- Core domain types for the World Cup 2026 dashboard ----

export type Confederation =
  | 'UEFA'
  | 'CONMEBOL'
  | 'CONCACAF'
  | 'CAF'
  | 'AFC'
  | 'OFC'

export type GroupId =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  | 'G' | 'H' | 'I' | 'J' | 'K' | 'L'

export interface Team {
  code: string          // FIFA 3-letter code, e.g. "BRA"
  name: string          // English name
  nameLocal: string     // Bosnian/Croatian/Serbian name
  flag: string          // flagcdn slug, e.g. "br" or "gb-eng"
  confederation: Confederation
  group: GroupId
  fifaRank: number      // approximate FIFA ranking
  titles: number        // World Cup titles won
  color: string         // accent color
  debut?: boolean       // first ever World Cup appearance
}

export type Stage = 'group' | 'R32' | 'R16' | 'QF' | 'SF' | 'TP' | 'F'

export interface Match {
  id: number            // 1..104
  stage: Stage
  group?: GroupId       // group stage only
  matchday?: 1 | 2 | 3  // group stage only
  date: string          // "YYYY-MM-DD" (local match date)
  time?: string         // "HH:MM" local kickoff at the venue
  venueId: string
  // Group stage: home/away are team codes.
  // Knockout: home/away are empty; homeSlot/awaySlot hold labels.
  home?: string
  away?: string
  homeSlot?: string     // e.g. "1A", "2B", "3rd C/E/F/H/I", "W73"
  awaySlot?: string
  feeds?: { matchId: number; slot: 'home' | 'away' } // where winner goes
}

export interface Venue {
  id: string
  stadium: string
  city: string          // city label used in schedule
  region: string        // metro / common name
  country: 'USA' | 'Mexico' | 'Canada'
  capacity: number
  utcOffset: number     // hours from UTC during the tournament (Jun–Jul, DST aware)
}

export type PlayerPos = 'GK' | 'DEF' | 'MID' | 'FWD'

export interface Player {
  name: string
  pos: PlayerPos
  club?: string
  captain?: boolean
}

export interface Settings {
  timezone: string         // IANA timezone id
  favorites: string[]      // team codes
  primary: string | null   // primary ("my team") code
  apiKey: string           // API-Football key (stored locally)
  liveMode: boolean        // auto-sync live scores
  pollSeconds: number      // polling interval
}

export interface Scorer {
  name: string
  teamCode: string
  minute?: number
  penalty?: boolean
  ownGoal?: boolean
}

export interface MatchResult {
  homeScore: number
  awayScore: number
  played: boolean
  scorers?: Scorer[]
  decidedBy?: 'reg' | 'aet' | 'pens'
  homePens?: number
  awayPens?: number
  source?: 'manual' | 'live'   // 'manual' results are never overwritten by live sync
}

export type ResultsMap = Record<number, MatchResult>

export interface StandingRow {
  teamCode: string
  played: number
  won: number
  drawn: number
  lost: number
  gf: number
  ga: number
  gd: number
  points: number
  rank: number
  qualified?: 'auto' | 'third' | 'out' | null
}
