import { teams } from '../data/teams'

// FIFA World Cup in API-Football is league id 1; the 2026 edition is season 2026.
export const WC_LEAGUE_ID = 1
export const WC_SEASON = 2026
const PROXY = '/fapi' // Vite dev-server proxy → https://v3.football.api-sports.io

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '')
}

// Build name → our team code map (English + local names + manual API-Football aliases).
const NAME_TO_CODE: Record<string, string> = {}
for (const t of teams) {
  NAME_TO_CODE[normalize(t.name)] = t.code
  NAME_TO_CODE[normalize(t.nameLocal)] = t.code
}
const ALIASES: Record<string, string> = {
  koreareplublic: 'KOR', korearepublic: 'KOR', southkorea: 'KOR', korea: 'KOR',
  czechrepublic: 'CZE', czechia: 'CZE',
  usa: 'USA', unitedstates: 'USA', unitedstatesofamerica: 'USA',
  turkey: 'TUR', turkiye: 'TUR',
  curacao: 'CUW',
  ivorycoast: 'CIV', cotedivoire: 'CIV',
  capeverde: 'CPV', caboverde: 'CPV', caboverdeislands: 'CPV',
  drcongo: 'COD', congodr: 'COD', democraticrepublicofcongo: 'COD', congodemocraticrepublic: 'COD',
  bosnia: 'BIH', bosniaandherzegovina: 'BIH', bosniaherzegovina: 'BIH',
  saudiarabia: 'KSA',
  southafrica: 'RSA',
  iran: 'IRN', iranislamicrepublic: 'IRN',
  newzealand: 'NZL',
}
Object.assign(NAME_TO_CODE, ALIASES)

export function nameToCode(name: string): string | null {
  return NAME_TO_CODE[normalize(name)] ?? null
}

// ---- Response shapes (only the fields we use) ----
export interface LiveFixture {
  id: number
  date: string
  statusShort: string // NS, 1H, HT, 2H, ET, P, FT, AET, PEN, PST, CANC...
  elapsed: number | null
  homeCode: string | null
  awayCode: string | null
  homeName: string
  awayName: string
  homeGoals: number | null
  awayGoals: number | null
  penHome: number | null
  penAway: number | null
}

export interface LiveScorer {
  name: string
  teamCode: string | null
  goals: number
  penalties: number
}

const FINISHED = new Set(['FT', 'AET', 'PEN'])
const INPLAY = new Set(['1H', 'HT', '2H', 'ET', 'BT', 'P', 'LIVE', 'INT'])
export const isFinished = (s: string) => FINISHED.has(s)
export const isInPlay = (s: string) => INPLAY.has(s)

class ApiError extends Error {}

async function apiGet(path: string, key: string): Promise<any> {
  const res = await fetch(`${PROXY}${path}`, {
    headers: key ? { 'x-apisports-key': key } : {},
  })
  if (!res.ok) throw new ApiError(`HTTP ${res.status}`)
  const json = await res.json()
  if (json?.errors && (Array.isArray(json.errors) ? json.errors.length : Object.keys(json.errors).length)) {
    const msg = Array.isArray(json.errors) ? json.errors.join('; ') : Object.values(json.errors).join('; ')
    throw new ApiError(String(msg))
  }
  return json
}

// Verify the key works; returns the account/plan name if available.
export async function fetchStatus(key: string): Promise<string> {
  const json = await apiGet('/status', key)
  const sub = json?.response?.subscription?.plan
  const reqs = json?.response?.requests
  return sub ? `${sub}${reqs ? ` · ${reqs.current}/${reqs.limit_day} danas` : ''}` : 'OK'
}

export async function fetchFixtures(key: string, league = WC_LEAGUE_ID, season = WC_SEASON): Promise<LiveFixture[]> {
  const json = await apiGet(`/fixtures?league=${league}&season=${season}`, key)
  const arr: any[] = json?.response ?? []
  return arr.map((f) => ({
    id: f.fixture?.id,
    date: f.fixture?.date,
    statusShort: f.fixture?.status?.short ?? 'NS',
    elapsed: f.fixture?.status?.elapsed ?? null,
    homeName: f.teams?.home?.name ?? '',
    awayName: f.teams?.away?.name ?? '',
    homeCode: nameToCode(f.teams?.home?.name ?? ''),
    awayCode: nameToCode(f.teams?.away?.name ?? ''),
    homeGoals: f.goals?.home ?? null,
    awayGoals: f.goals?.away ?? null,
    penHome: f.score?.penalty?.home ?? null,
    penAway: f.score?.penalty?.away ?? null,
  }))
}

export async function fetchTopScorers(key: string, league = WC_LEAGUE_ID, season = WC_SEASON): Promise<LiveScorer[]> {
  const json = await apiGet(`/players/topscorers?league=${league}&season=${season}`, key)
  const arr: any[] = json?.response ?? []
  return arr.map((r) => {
    const st = r.statistics?.[0]
    return {
      name: r.player?.name ?? '',
      teamCode: nameToCode(st?.team?.name ?? ''),
      goals: st?.goals?.total ?? 0,
      penalties: st?.penalty?.scored ?? 0,
    }
  }).filter((s) => s.goals > 0)
}
