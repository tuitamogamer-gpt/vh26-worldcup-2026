import { useState } from 'react'
import { flagUrl } from '../utils/format'
import { teamByCode } from '../data/teams'
import { badgeColors } from '../data/badgeColors'

interface Props {
  slug?: string
  code?: string
  size?: number
}

// Circular team badge (VH26). Shows the real flag clipped to a circle;
// falls back to a two-tone color circle with the 3-letter code if the image fails.
export function Flag({ slug, code = '', size = 30 }: Props) {
  const [err, setErr] = useState(false)
  const team = code ? teamByCode[code] : undefined
  const flagSlug = slug ?? team?.flag
  const [c1, c2] = badgeColors(code)
  const showImg = flagSlug && !err

  return (
    <span className="flag" style={{ width: size, height: size, fontSize: size * 0.3 }} title={team?.nameLocal ?? code}>
      {showImg ? (
        <img src={flagUrl(flagSlug, size <= 30 ? 80 : 160)} alt="" loading="lazy" onError={() => setErr(true)} />
      ) : (
        <>
          <span className="flag-bg" style={{ background: `linear-gradient(135deg, ${c1} 0 50%, ${c2} 50% 100%)` }} />
          <span className="flag-code">{code.slice(0, 3)}</span>
        </>
      )}
    </span>
  )
}
