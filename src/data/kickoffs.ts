// Local (venue) kickoff times, and corrected dates for some knockout slots,
// from the official 2026 FIFA World Cup schedule. Keyed by match id.
export const KICKOFFS: Record<number, { time: string; date?: string }> = {
  // Group A
  1: { time: '13:00' }, 2: { time: '20:00' }, 3: { time: '12:00' }, 4: { time: '21:00' }, 5: { time: '19:00' }, 6: { time: '19:00' },
  // Group B
  7: { time: '15:00' }, 8: { time: '12:00' }, 9: { time: '12:00' }, 10: { time: '15:00' }, 11: { time: '12:00' }, 12: { time: '12:00' },
  // Group C
  13: { time: '18:00' }, 14: { time: '21:00' }, 15: { time: '18:00' }, 16: { time: '21:00' }, 17: { time: '18:00' }, 18: { time: '18:00' },
  // Group D
  19: { time: '18:00' }, 20: { time: '21:00' }, 21: { time: '12:00' }, 22: { time: '21:00' }, 23: { time: '19:00' }, 24: { time: '19:00' },
  // Group E
  25: { time: '12:00' }, 26: { time: '19:00' }, 27: { time: '16:00' }, 28: { time: '19:00' }, 29: { time: '16:00' }, 30: { time: '16:00' },
  // Group F
  31: { time: '15:00' }, 32: { time: '20:00' }, 33: { time: '12:00' }, 34: { time: '22:00' }, 35: { time: '18:00' }, 36: { time: '18:00' },
  // Group G
  37: { time: '15:00' }, 38: { time: '21:00' }, 39: { time: '12:00' }, 40: { time: '18:00' }, 41: { time: '20:00' }, 42: { time: '20:00' },
  // Group H
  43: { time: '12:00' }, 44: { time: '18:00' }, 45: { time: '12:00' }, 46: { time: '18:00' }, 47: { time: '19:00' }, 48: { time: '20:00' },
  // Group I
  49: { time: '15:00' }, 50: { time: '18:00' }, 51: { time: '17:00' }, 52: { time: '20:00' }, 53: { time: '15:00' }, 54: { time: '15:00' },
  // Group J
  55: { time: '20:00' }, 56: { time: '21:00' }, 57: { time: '12:00' }, 58: { time: '20:00' }, 59: { time: '21:00' }, 60: { time: '21:00' },
  // Group K
  61: { time: '12:00' }, 62: { time: '20:00' }, 63: { time: '12:00' }, 64: { time: '20:00' }, 65: { time: '19:30' }, 66: { time: '19:30' },
  // Group L
  67: { time: '15:00' }, 68: { time: '19:00' }, 69: { time: '16:00' }, 70: { time: '19:00' }, 71: { time: '17:00' }, 72: { time: '17:00' },
  // Round of 32
  73: { time: '19:00' }, 74: { time: '12:00' }, 75: { time: '16:30' }, 76: { time: '19:00' },
  77: { time: '12:00' }, 78: { time: '17:00' }, 79: { time: '20:00' }, 80: { time: '17:00' },
  81: { time: '13:00' }, 82: { time: '19:00' }, 83: { time: '12:00' }, 84: { time: '12:00' },
  85: { time: '12:00' }, 86: { time: '18:00' }, 87: { time: '20:30' }, 88: { time: '12:00' },
  // Round of 16 (dates refined to official schedule)
  89: { time: '12:00', date: '2026-07-07' }, // Atlanta
  90: { time: '16:00', date: '2026-07-05' }, // East Rutherford
  91: { time: '12:00', date: '2026-07-04' }, // Houston
  92: { time: '18:00', date: '2026-07-05' }, // Mexico City
  93: { time: '14:00', date: '2026-07-06' }, // Arlington
  94: { time: '14:00', date: '2026-07-06' }, // Seattle
  95: { time: '17:00', date: '2026-07-04' }, // Philadelphia
  96: { time: '13:00', date: '2026-07-07' }, // Vancouver
  // Quarter-finals
  97: { time: '16:00', date: '2026-07-09' }, // Foxborough
  98: { time: '20:00', date: '2026-07-11' }, // Kansas City
  99: { time: '12:00', date: '2026-07-10' }, // Inglewood
  100: { time: '17:00', date: '2026-07-11' }, // Miami Gardens
  // Semi-finals, third place, final
  101: { time: '14:00' }, 102: { time: '15:00' }, 103: { time: '17:00' }, 104: { time: '15:00' },
}
