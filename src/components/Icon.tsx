// VH26 stroke icon set.
interface IP { size?: number; className?: string }

function S({ size = 20, className, children }: IP & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {children}
    </svg>
  )
}

export const Icon = {
  grid: (p: IP) => <S {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></S>,
  live: (p: IP) => <S {...p}><circle cx="12" cy="12" r="3" /><path d="M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" /></S>,
  cal: (p: IP) => <S {...p}><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 2.5v4M16 2.5v4" /></S>,
  table: (p: IP) => <S {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 4v16" /></S>,
  bracket: (p: IP) => <S {...p}><path d="M4 5h4a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h0" /><path d="M4 19h4M12 12h4M20 7v10" /><path d="M16 7h4M16 17h4" /></S>,
  shield: (p: IP) => <S {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /></S>,
  chart: (p: IP) => <S {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></S>,
  star: (p: IP) => <S {...p}><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /></S>,
  starFill: (p: IP) => <svg width={p.size ?? 20} height={p.size ?? 20} viewBox="0 0 24 24" fill="currentColor" className={p.className}><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /></svg>,
  search: (p: IP) => <S {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></S>,
  ball: (p: IP) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7l3 2.2-1.1 3.5h-3.8L9 9.2z" fill="currentColor" /><path d="M12 7V3.2M14.9 9.2l3.4-1.2M13.8 12.7l2.3 3M10.2 12.7l-2.3 3M9.1 9.2L5.7 8" /></S>,
  stadium: (p: IP) => <S {...p}><path d="M3 8c0-1.7 4-3 9-3s9 1.3 9 3-4 3-9 3-9-1.3-9-3z" /><path d="M3 8v6c0 1.7 4 3 9 3s9-1.3 9-3V8" /><path d="M8 11v6M16 11v6" /></S>,
  bell: (p: IP) => <S {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></S>,
  chevR: (p: IP) => <S {...p}><path d="M9 6l6 6-6 6" /></S>,
  pin: (p: IP) => <S {...p}><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" /></S>,
  clock: (p: IP) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>,
  whistle: (p: IP) => <S {...p}><path d="M3 11a5 5 0 0 0 5 5h3l4 3v-6a6 6 0 0 0 0-5H8a5 5 0 0 0-5 3z" /><circle cx="8" cy="11.5" r="1.4" /></S>,
  goal: (p: IP) => <S {...p}><circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" /></S>,
  menu: (p: IP) => <S {...p}><path d="M3 6h18M3 12h18M3 18h18" /></S>,
}
