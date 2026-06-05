import { useSettings } from '../store/useSettings'
import { Icon } from './Icon'

// Corner star for cards (cards are links → stop propagation).
export function StarToggle({ code }: { code: string }) {
  const { isFavorite, toggleFavorite } = useSettings()
  const on = isFavorite(code)
  return (
    <button
      className={'fav-btn' + (on ? ' on' : '')}
      style={{ position: 'absolute', top: 10, right: 10 }}
      title={on ? 'Ukloni iz favorita' : 'Dodaj u favorite'}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(code) }}
    >
      {on ? <Icon.starFill size={17} /> : <Icon.star size={17} />}
    </button>
  )
}

// Full controls for the team detail hero.
export function FavoriteControls({ code }: { code: string }) {
  const { isFavorite, toggleFavorite, primary, setPrimary } = useSettings()
  const fav = isFavorite(code)
  const isPrimary = primary === code
  return (
    <div className="row" style={{ gap: 8 }}>
      <button className={'fav-btn lg' + (fav ? ' on' : '')} onClick={() => toggleFavorite(code)}>
        {fav ? <Icon.starFill size={16} /> : <Icon.star size={16} />}
        {fav ? 'Pratiš' : 'Prati'}
      </button>
      <button className={'fav-btn lg' + (isPrimary ? ' on' : '')} onClick={() => setPrimary(isPrimary ? null : code)}>
        {isPrimary ? '⭐ Glavni tim' : 'Postavi kao glavni'}
      </button>
    </div>
  )
}
