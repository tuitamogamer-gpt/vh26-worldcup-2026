import type { Team } from '../types'

// All 48 qualified teams (final draw, 5 Dec 2025).
// fifaRank is approximate; titles = World Cup titles won.
export const teams: Team[] = [
  // Group A
  { code: 'MEX', name: 'Mexico',           nameLocal: 'Meksiko',              flag: 'mx',     confederation: 'CONCACAF', group: 'A', fifaRank: 14, titles: 0, color: '#006847' },
  { code: 'RSA', name: 'South Africa',     nameLocal: 'Južna Afrika',         flag: 'za',     confederation: 'CAF',      group: 'A', fifaRank: 56, titles: 0, color: '#007749' },
  { code: 'KOR', name: 'South Korea',      nameLocal: 'Južna Koreja',         flag: 'kr',     confederation: 'AFC',      group: 'A', fifaRank: 23, titles: 0, color: '#cd2e3a' },
  { code: 'CZE', name: 'Czechia',          nameLocal: 'Češka',                flag: 'cz',     confederation: 'UEFA',     group: 'A', fifaRank: 41, titles: 0, color: '#11457e' },

  // Group B
  { code: 'CAN', name: 'Canada',           nameLocal: 'Kanada',               flag: 'ca',     confederation: 'CONCACAF', group: 'B', fifaRank: 28, titles: 0, color: '#d52b1e' },
  { code: 'SUI', name: 'Switzerland',      nameLocal: 'Švicarska',            flag: 'ch',     confederation: 'UEFA',     group: 'B', fifaRank: 19, titles: 0, color: '#d52b1e' },
  { code: 'QAT', name: 'Qatar',            nameLocal: 'Katar',                flag: 'qa',     confederation: 'AFC',      group: 'B', fifaRank: 37, titles: 0, color: '#8a1538' },
  { code: 'BIH', name: 'Bosnia & Herz.',   nameLocal: 'Bosna i Hercegovina',  flag: 'ba',     confederation: 'UEFA',     group: 'B', fifaRank: 74, titles: 0, color: '#002395' },

  // Group C
  { code: 'BRA', name: 'Brazil',           nameLocal: 'Brazil',               flag: 'br',     confederation: 'CONMEBOL', group: 'C', fifaRank: 5,  titles: 5, color: '#ffdf00' },
  { code: 'MAR', name: 'Morocco',          nameLocal: 'Maroko',               flag: 'ma',     confederation: 'CAF',      group: 'C', fifaRank: 11, titles: 0, color: '#c1272d' },
  { code: 'HAI', name: 'Haiti',            nameLocal: 'Haiti',                flag: 'ht',     confederation: 'CONCACAF', group: 'C', fifaRank: 83, titles: 0, color: '#00209f' },
  { code: 'SCO', name: 'Scotland',         nameLocal: 'Škotska',              flag: 'gb-sct', confederation: 'UEFA',     group: 'C', fifaRank: 33, titles: 0, color: '#005eb8' },

  // Group D
  { code: 'USA', name: 'United States',    nameLocal: 'SAD',                  flag: 'us',     confederation: 'CONCACAF', group: 'D', fifaRank: 16, titles: 0, color: '#0a3161' },
  { code: 'PAR', name: 'Paraguay',         nameLocal: 'Paragvaj',             flag: 'py',     confederation: 'CONMEBOL', group: 'D', fifaRank: 36, titles: 0, color: '#d52b1e' },
  { code: 'AUS', name: 'Australia',        nameLocal: 'Australija',           flag: 'au',     confederation: 'AFC',      group: 'D', fifaRank: 25, titles: 0, color: '#00843d' },
  { code: 'TUR', name: 'Türkiye',          nameLocal: 'Turska',               flag: 'tr',     confederation: 'UEFA',     group: 'D', fifaRank: 26, titles: 0, color: '#e30a17' },

  // Group E
  { code: 'GER', name: 'Germany',          nameLocal: 'Njemačka',             flag: 'de',     confederation: 'UEFA',     group: 'E', fifaRank: 9,  titles: 4, color: '#1a1a1a' },
  { code: 'CUW', name: 'Curaçao',          nameLocal: 'Kurasao',              flag: 'cw',     confederation: 'CONCACAF', group: 'E', fifaRank: 87, titles: 0, color: '#002b7f', debut: true },
  { code: 'CIV', name: "Côte d'Ivoire",    nameLocal: 'Obala Slonovače',      flag: 'ci',     confederation: 'CAF',      group: 'E', fifaRank: 40, titles: 0, color: '#f77f00' },
  { code: 'ECU', name: 'Ecuador',          nameLocal: 'Ekvador',              flag: 'ec',     confederation: 'CONMEBOL', group: 'E', fifaRank: 24, titles: 0, color: '#ffd100' },

  // Group F
  { code: 'NED', name: 'Netherlands',      nameLocal: 'Holandija',            flag: 'nl',     confederation: 'UEFA',     group: 'F', fifaRank: 7,  titles: 0, color: '#ff6200' },
  { code: 'JPN', name: 'Japan',            nameLocal: 'Japan',                flag: 'jp',     confederation: 'AFC',      group: 'F', fifaRank: 17, titles: 0, color: '#002a5c' },
  { code: 'TUN', name: 'Tunisia',          nameLocal: 'Tunis',                flag: 'tn',     confederation: 'CAF',      group: 'F', fifaRank: 41, titles: 0, color: '#e70013' },
  { code: 'SWE', name: 'Sweden',           nameLocal: 'Švedska',              flag: 'se',     confederation: 'UEFA',     group: 'F', fifaRank: 35, titles: 0, color: '#006aa7' },

  // Group G
  { code: 'BEL', name: 'Belgium',          nameLocal: 'Belgija',              flag: 'be',     confederation: 'UEFA',     group: 'G', fifaRank: 8,  titles: 0, color: '#e30613' },
  { code: 'EGY', name: 'Egypt',            nameLocal: 'Egipat',               flag: 'eg',     confederation: 'CAF',      group: 'G', fifaRank: 32, titles: 0, color: '#c8102e' },
  { code: 'IRN', name: 'Iran',             nameLocal: 'Iran',                 flag: 'ir',     confederation: 'AFC',      group: 'G', fifaRank: 20, titles: 0, color: '#239f40' },
  { code: 'NZL', name: 'New Zealand',      nameLocal: 'Novi Zeland',          flag: 'nz',     confederation: 'OFC',      group: 'G', fifaRank: 86, titles: 0, color: '#1a1a1a' },

  // Group H
  { code: 'ESP', name: 'Spain',            nameLocal: 'Španija',              flag: 'es',     confederation: 'UEFA',     group: 'H', fifaRank: 2,  titles: 1, color: '#c60b1e' },
  { code: 'CPV', name: 'Cape Verde',       nameLocal: 'Zelenortska Ostrva',   flag: 'cv',     confederation: 'CAF',      group: 'H', fifaRank: 70, titles: 0, color: '#003893', debut: true },
  { code: 'KSA', name: 'Saudi Arabia',     nameLocal: 'Saudijska Arabija',    flag: 'sa',     confederation: 'AFC',      group: 'H', fifaRank: 58, titles: 0, color: '#006c35' },
  { code: 'URU', name: 'Uruguay',          nameLocal: 'Urugvaj',              flag: 'uy',     confederation: 'CONMEBOL', group: 'H', fifaRank: 13, titles: 2, color: '#4f9fd6' },

  // Group I
  { code: 'FRA', name: 'France',           nameLocal: 'Francuska',            flag: 'fr',     confederation: 'UEFA',     group: 'I', fifaRank: 3,  titles: 2, color: '#0055a4' },
  { code: 'SEN', name: 'Senegal',          nameLocal: 'Senegal',              flag: 'sn',     confederation: 'CAF',      group: 'I', fifaRank: 18, titles: 0, color: '#00853f' },
  { code: 'NOR', name: 'Norway',           nameLocal: 'Norveška',             flag: 'no',     confederation: 'UEFA',     group: 'I', fifaRank: 30, titles: 0, color: '#ba0c2f' },
  { code: 'IRQ', name: 'Iraq',             nameLocal: 'Irak',                 flag: 'iq',     confederation: 'AFC',      group: 'I', fifaRank: 57, titles: 0, color: '#007a3d' },

  // Group J
  { code: 'ARG', name: 'Argentina',        nameLocal: 'Argentina',            flag: 'ar',     confederation: 'CONMEBOL', group: 'J', fifaRank: 1,  titles: 3, color: '#75aadb' },
  { code: 'ALG', name: 'Algeria',          nameLocal: 'Alžir',                flag: 'dz',     confederation: 'CAF',      group: 'J', fifaRank: 38, titles: 0, color: '#006233' },
  { code: 'AUT', name: 'Austria',          nameLocal: 'Austrija',             flag: 'at',     confederation: 'UEFA',     group: 'J', fifaRank: 22, titles: 0, color: '#ed2939' },
  { code: 'JOR', name: 'Jordan',           nameLocal: 'Jordan',               flag: 'jo',     confederation: 'AFC',      group: 'J', fifaRank: 62, titles: 0, color: '#007a3d', debut: true },

  // Group K
  { code: 'POR', name: 'Portugal',         nameLocal: 'Portugal',             flag: 'pt',     confederation: 'UEFA',     group: 'K', fifaRank: 6,  titles: 0, color: '#006600' },
  { code: 'UZB', name: 'Uzbekistan',       nameLocal: 'Uzbekistan',           flag: 'uz',     confederation: 'AFC',      group: 'K', fifaRank: 54, titles: 0, color: '#1eb53a', debut: true },
  { code: 'COL', name: 'Colombia',         nameLocal: 'Kolumbija',            flag: 'co',     confederation: 'CONMEBOL', group: 'K', fifaRank: 12, titles: 0, color: '#fcd116' },
  { code: 'COD', name: 'DR Congo',         nameLocal: 'DR Kongo',             flag: 'cd',     confederation: 'CAF',      group: 'K', fifaRank: 55, titles: 0, color: '#007fff' },

  // Group L
  { code: 'ENG', name: 'England',          nameLocal: 'Engleska',             flag: 'gb-eng', confederation: 'UEFA',     group: 'L', fifaRank: 4,  titles: 1, color: '#cf142b' },
  { code: 'CRO', name: 'Croatia',          nameLocal: 'Hrvatska',             flag: 'hr',     confederation: 'UEFA',     group: 'L', fifaRank: 10, titles: 0, color: '#d10a11' },
  { code: 'GHA', name: 'Ghana',            nameLocal: 'Gana',                 flag: 'gh',     confederation: 'CAF',      group: 'L', fifaRank: 69, titles: 0, color: '#006b3f' },
  { code: 'PAN', name: 'Panama',           nameLocal: 'Panama',               flag: 'pa',     confederation: 'CONCACAF', group: 'L', fifaRank: 31, titles: 0, color: '#d21034' },
]

export const teamByCode: Record<string, Team> = Object.fromEntries(
  teams.map((t) => [t.code, t]),
)

export const GROUP_IDS = ['A','B','C','D','E','F','G','H','I','J','K','L'] as const

export function teamsInGroup(group: string): Team[] {
  return teams.filter((t) => t.group === group)
}

export const CONFEDERATION_NAMES: Record<string, string> = {
  UEFA: 'Evropa (UEFA)',
  CONMEBOL: 'Južna Amerika (CONMEBOL)',
  CONCACAF: 'Sj. & Sr. Amerika (CONCACAF)',
  CAF: 'Afrika (CAF)',
  AFC: 'Azija (AFC)',
  OFC: 'Okeanija (OFC)',
}
