// Two-tone colors per team — used for the team-hero gradient and the
// circular-badge fallback when a flag image fails to load.
export const BADGE: Record<string, [string, string]> = {
  MEX: ['#1E7A45', '#C60B1E'], RSA: ['#007A4D', '#FFB612'], KOR: ['#0047A0', '#C8102E'], CZE: ['#11457E', '#D7141A'],
  CAN: ['#D80621', '#FFFFFF'], SUI: ['#D52B1E', '#FFFFFF'], QAT: ['#8A1538', '#FFFFFF'], BIH: ['#002395', '#FECB00'],
  BRA: ['#1FA84A', '#FFD500'], MAR: ['#C1272D', '#006233'], HAI: ['#00209F', '#D21034'], SCO: ['#0065BF', '#FFFFFF'],
  USA: ['#1A3A8F', '#C60B1E'], PAR: ['#D52B1E', '#0038A8'], AUS: ['#0A2240', '#FFD100'], TUR: ['#E30A17', '#FFFFFF'],
  GER: ['#111111', '#D4AF37'], CUW: ['#002B7F', '#F9D90F'], CIV: ['#F77F00', '#009E60'], ECU: ['#FFD100', '#ED1C24'],
  NED: ['#F36C21', '#1A3A8F'], JPN: ['#BC002D', '#FFFFFF'], TUN: ['#E70013', '#FFFFFF'], SWE: ['#006AA7', '#FECC00'],
  BEL: ['#111111', '#F3D02F'], EGY: ['#C8102E', '#111111'], IRN: ['#239F40', '#DA0000'], NZL: ['#111111', '#CFCFCF'],
  ESP: ['#C60B1E', '#FFC400'], CPV: ['#003893', '#1A8A4A'], KSA: ['#006C35', '#FFFFFF'], URU: ['#5BA8E0', '#0A3A6B'],
  FRA: ['#1A3A8F', '#E03A3A'], SEN: ['#00853F', '#FDEF42'], NOR: ['#BA0C2F', '#00205B'], IRQ: ['#CE1126', '#007A3D'],
  ARG: ['#6CA9E0', '#FFFFFF'], ALG: ['#006233', '#D21034'], AUT: ['#ED2939', '#FFFFFF'], JOR: ['#CE1126', '#007A3D'],
  POR: ['#0A6E3A', '#D4252A'], UZB: ['#0099B5', '#1EB53A'], COL: ['#FCD116', '#003893'], COD: ['#007FFF', '#CE1021'],
  ENG: ['#CF142B', '#1A3A8F'], CRO: ['#C8102E', '#1A3A8F'], GHA: ['#CE1126', '#006B3F'], PAN: ['#D21034', '#005293'],
}

export function badgeColors(code: string): [string, string] {
  return BADGE[code] ?? ['#3a4356', '#5B6678']
}
