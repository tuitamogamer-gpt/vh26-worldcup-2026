import type { Match, GroupId, Stage } from '../types'
import { KICKOFFS } from './kickoffs'

// Helper builders keep the long fixture list readable.
const g = (
  id: number, date: string, home: string, away: string,
  venueId: string, matchday: 1 | 2 | 3, group: GroupId,
): Match => ({ id, stage: 'group', date, home, away, venueId, matchday, group })

const ko = (
  id: number, stage: Stage, date: string, venueId: string,
  homeSlot: string, awaySlot: string,
): Match => ({ id, stage, date, venueId, homeSlot, awaySlot })

// ---- Group stage: 72 matches (official schedule) ----
const groupMatches: Match[] = [
  // Group A
  g(1, '2026-06-11', 'MEX', 'RSA', 'azteca', 1, 'A'),
  g(2, '2026-06-11', 'KOR', 'CZE', 'akron', 1, 'A'),
  g(3, '2026-06-18', 'CZE', 'RSA', 'mercedes', 2, 'A'),
  g(4, '2026-06-18', 'MEX', 'KOR', 'akron', 2, 'A'),
  g(5, '2026-06-24', 'CZE', 'MEX', 'azteca', 3, 'A'),
  g(6, '2026-06-24', 'RSA', 'KOR', 'bbva', 3, 'A'),
  // Group B
  g(7, '2026-06-12', 'CAN', 'BIH', 'bmo', 1, 'B'),
  g(8, '2026-06-13', 'QAT', 'SUI', 'levis', 1, 'B'),
  g(9, '2026-06-18', 'SUI', 'BIH', 'sofi', 2, 'B'),
  g(10, '2026-06-18', 'CAN', 'QAT', 'bcplace', 2, 'B'),
  g(11, '2026-06-24', 'SUI', 'CAN', 'bcplace', 3, 'B'),
  g(12, '2026-06-24', 'BIH', 'QAT', 'lumen', 3, 'B'),
  // Group C
  g(13, '2026-06-13', 'BRA', 'MAR', 'metlife', 1, 'C'),
  g(14, '2026-06-13', 'HAI', 'SCO', 'gillette', 1, 'C'),
  g(15, '2026-06-19', 'SCO', 'MAR', 'gillette', 2, 'C'),
  g(16, '2026-06-19', 'BRA', 'HAI', 'linc', 2, 'C'),
  g(17, '2026-06-24', 'SCO', 'BRA', 'hardrock', 3, 'C'),
  g(18, '2026-06-24', 'MAR', 'HAI', 'mercedes', 3, 'C'),
  // Group D
  g(19, '2026-06-12', 'USA', 'PAR', 'sofi', 1, 'D'),
  g(20, '2026-06-13', 'AUS', 'TUR', 'bcplace', 1, 'D'),
  g(21, '2026-06-19', 'USA', 'AUS', 'lumen', 2, 'D'),
  g(22, '2026-06-19', 'TUR', 'PAR', 'levis', 2, 'D'),
  g(23, '2026-06-25', 'TUR', 'USA', 'sofi', 3, 'D'),
  g(24, '2026-06-25', 'PAR', 'AUS', 'levis', 3, 'D'),
  // Group E
  g(25, '2026-06-14', 'GER', 'CUW', 'nrg', 1, 'E'),
  g(26, '2026-06-14', 'CIV', 'ECU', 'linc', 1, 'E'),
  g(27, '2026-06-20', 'GER', 'CIV', 'bmo', 2, 'E'),
  g(28, '2026-06-20', 'ECU', 'CUW', 'arrowhead', 2, 'E'),
  g(29, '2026-06-25', 'ECU', 'GER', 'metlife', 3, 'E'),
  g(30, '2026-06-25', 'CUW', 'CIV', 'linc', 3, 'E'),
  // Group F
  g(31, '2026-06-14', 'NED', 'JPN', 'att', 1, 'F'),
  g(32, '2026-06-14', 'SWE', 'TUN', 'bbva', 1, 'F'),
  g(33, '2026-06-20', 'NED', 'SWE', 'nrg', 2, 'F'),
  g(34, '2026-06-20', 'TUN', 'JPN', 'bbva', 2, 'F'),
  g(35, '2026-06-25', 'JPN', 'SWE', 'att', 3, 'F'),
  g(36, '2026-06-25', 'TUN', 'NED', 'arrowhead', 3, 'F'),
  // Group G
  g(37, '2026-06-15', 'BEL', 'EGY', 'lumen', 1, 'G'),
  g(38, '2026-06-15', 'IRN', 'NZL', 'sofi', 1, 'G'),
  g(39, '2026-06-21', 'BEL', 'IRN', 'sofi', 2, 'G'),
  g(40, '2026-06-21', 'NZL', 'EGY', 'bcplace', 2, 'G'),
  g(41, '2026-06-26', 'EGY', 'IRN', 'lumen', 3, 'G'),
  g(42, '2026-06-26', 'NZL', 'BEL', 'bcplace', 3, 'G'),
  // Group H
  g(43, '2026-06-15', 'ESP', 'CPV', 'mercedes', 1, 'H'),
  g(44, '2026-06-15', 'KSA', 'URU', 'hardrock', 1, 'H'),
  g(45, '2026-06-21', 'ESP', 'KSA', 'mercedes', 2, 'H'),
  g(46, '2026-06-21', 'URU', 'CPV', 'hardrock', 2, 'H'),
  g(47, '2026-06-26', 'CPV', 'KSA', 'nrg', 3, 'H'),
  g(48, '2026-06-26', 'URU', 'ESP', 'akron', 3, 'H'),
  // Group I
  g(49, '2026-06-16', 'FRA', 'SEN', 'metlife', 1, 'I'),
  g(50, '2026-06-16', 'IRQ', 'NOR', 'gillette', 1, 'I'),
  g(51, '2026-06-22', 'FRA', 'IRQ', 'linc', 2, 'I'),
  g(52, '2026-06-22', 'NOR', 'SEN', 'metlife', 2, 'I'),
  g(53, '2026-06-26', 'NOR', 'FRA', 'gillette', 3, 'I'),
  g(54, '2026-06-26', 'SEN', 'IRQ', 'bmo', 3, 'I'),
  // Group J
  g(55, '2026-06-16', 'ARG', 'ALG', 'arrowhead', 1, 'J'),
  g(56, '2026-06-16', 'AUT', 'JOR', 'levis', 1, 'J'),
  g(57, '2026-06-22', 'ARG', 'AUT', 'att', 2, 'J'),
  g(58, '2026-06-22', 'JOR', 'ALG', 'levis', 2, 'J'),
  g(59, '2026-06-27', 'ALG', 'AUT', 'arrowhead', 3, 'J'),
  g(60, '2026-06-27', 'JOR', 'ARG', 'att', 3, 'J'),
  // Group K
  g(61, '2026-06-17', 'POR', 'COD', 'nrg', 1, 'K'),
  g(62, '2026-06-17', 'UZB', 'COL', 'azteca', 1, 'K'),
  g(63, '2026-06-23', 'POR', 'UZB', 'nrg', 2, 'K'),
  g(64, '2026-06-23', 'COL', 'COD', 'akron', 2, 'K'),
  g(65, '2026-06-27', 'COL', 'POR', 'hardrock', 3, 'K'),
  g(66, '2026-06-27', 'COD', 'UZB', 'mercedes', 3, 'K'),
  // Group L
  g(67, '2026-06-17', 'ENG', 'CRO', 'att', 1, 'L'),
  g(68, '2026-06-17', 'GHA', 'PAN', 'bmo', 1, 'L'),
  g(69, '2026-06-23', 'ENG', 'GHA', 'gillette', 2, 'L'),
  g(70, '2026-06-23', 'PAN', 'CRO', 'bmo', 2, 'L'),
  g(71, '2026-06-27', 'PAN', 'ENG', 'metlife', 3, 'L'),
  g(72, '2026-06-27', 'CRO', 'GHA', 'linc', 3, 'L'),
]

// ---- Knockout stage: 32 matches ----
// R32 slot labels use group positions; later rounds reference match winners (W##) / losers (L##).
// Third-place opponents follow FIFA's official 8-best-thirds table after the group stage.
const knockoutMatches: Match[] = [
  // Round of 32 (73-88)
  ko(73, 'R32', '2026-06-30', 'azteca',   '1A', '3rd C/E/F/H/I'),
  ko(74, 'R32', '2026-06-29', 'nrg',      '1C', '2F'),
  ko(75, 'R32', '2026-06-29', 'gillette', '1E', '3rd A/B/C/D/F'),
  ko(76, 'R32', '2026-06-29', 'bbva',     '1F', '2C'),
  ko(77, 'R32', '2026-06-30', 'att',      '2E', '2I'),
  ko(78, 'R32', '2026-06-30', 'metlife',  '1I', '3rd C/D/F/G/H'),
  ko(79, 'R32', '2026-07-02', 'bcplace',  '1B', '3rd E/F/G/I/J'),
  ko(80, 'R32', '2026-07-01', 'levis',    '1D', '3rd B/E/F/I/J'),
  ko(81, 'R32', '2026-07-01', 'lumen',    '1G', '3rd A/E/H/I/J'),
  ko(82, 'R32', '2026-07-02', 'bmo',      '2K', '2L'),
  ko(83, 'R32', '2026-07-01', 'mercedes', '1L', '3rd E/H/I/J/K'),
  ko(84, 'R32', '2026-07-02', 'sofi',     '1H', '2J'),
  ko(85, 'R32', '2026-07-03', 'att',      '2D', '2G'),
  ko(86, 'R32', '2026-07-03', 'hardrock', '1J', '2H'),
  ko(87, 'R32', '2026-07-03', 'arrowhead','1K', '3rd D/E/I/J/L'),
  ko(88, 'R32', '2026-06-28', 'sofi',     '2A', '2B'),

  // Round of 16 (89-96)
  ko(89, 'R16', '2026-07-04', 'mercedes', 'W73', 'W74'),
  ko(90, 'R16', '2026-07-04', 'metlife',  'W75', 'W76'),
  ko(91, 'R16', '2026-07-05', 'nrg',      'W77', 'W78'),
  ko(92, 'R16', '2026-07-05', 'azteca',   'W79', 'W80'),
  ko(93, 'R16', '2026-07-06', 'att',      'W81', 'W82'),
  ko(94, 'R16', '2026-07-06', 'lumen',    'W83', 'W84'),
  ko(95, 'R16', '2026-07-07', 'linc',     'W85', 'W86'),
  ko(96, 'R16', '2026-07-07', 'bcplace',  'W87', 'W88'),

  // Quarter-finals (97-100)
  ko(97, 'QF', '2026-07-09', 'gillette',  'W89', 'W90'),
  ko(98, 'QF', '2026-07-10', 'arrowhead', 'W91', 'W92'),
  ko(99, 'QF', '2026-07-10', 'sofi',      'W93', 'W94'),
  ko(100, 'QF', '2026-07-11', 'hardrock', 'W95', 'W96'),

  // Semi-finals (101-102)
  ko(101, 'SF', '2026-07-14', 'att',      'W97', 'W98'),
  ko(102, 'SF', '2026-07-15', 'mercedes', 'W99', 'W100'),

  // Third place (103) & Final (104)
  ko(103, 'TP', '2026-07-18', 'hardrock', 'L101', 'L102'),
  ko(104, 'F', '2026-07-19', 'metlife',   'W101', 'W102'),
]

// Merge in official local kickoff times (and refined knockout dates).
const withKickoff = (m: Match): Match => {
  const k = KICKOFFS[m.id]
  return k ? { ...m, time: k.time, date: k.date ?? m.date } : m
}

export const matches: Match[] = [...groupMatches, ...knockoutMatches].map(withKickoff)

export const matchById: Record<number, Match> = Object.fromEntries(
  matches.map((m) => [m.id, m]),
)

export function groupStageMatches(): Match[] {
  return matches.filter((m) => m.stage === 'group')
}

export function knockoutStageMatches(): Match[] {
  return matches.filter((m) => m.stage !== 'group')
}

export const STAGE_LABELS: Record<Stage, string> = {
  group: 'Grupna faza',
  R32: 'Šesnaestina finala',
  R16: 'Osmina finala',
  QF: 'Četvrtfinale',
  SF: 'Polufinale',
  TP: 'Meč za 3. mjesto',
  F: 'Finale',
}

export const STAGE_SHORT: Record<Stage, string> = {
  group: 'Grupe',
  R32: '1/16',
  R16: '1/8',
  QF: '1/4',
  SF: '1/2',
  TP: '3. mj.',
  F: 'Finale',
}
