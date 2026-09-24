import { DUMMY_SPRITE } from '../../utils/constants'
import { uploadedSpriteUrl } from '../../utils/assetUrl'
import TypeBadge from '../common/TypeBadge'

export default function PokemonCard({ pokemon, isActive, onClick }) {
  const type1 = pokemon.type1
  const type2 = pokemon.type2
  const spriteSrc = uploadedSpriteUrl(pokemon.sprite_image) || DUMMY_SPRITE

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center bg-surface/60 hover:bg-surface rounded-xl pt-8 pb-4 px-4 transition-colors text-left w-full
        ${isActive ? 'ring-2 ring-red-500' : 'ring-1 ring-slate-700/50'}`}
    >
      <div className="absolute top-3 w-16 h-16 rounded-full border-[5px] border-slate-700/40" />

      <img
        src={spriteSrc}
        alt={pokemon.name}
        className="relative w-16 h-16 object-contain drop-shadow-lg"
        onError={(e) => { e.currentTarget.src = DUMMY_SPRITE }}
      />

      <span className="text-xs text-slate-400 mt-2">{pokemon.national_number}</span>
      <span className="text-white font-semibold text-sm">{pokemon.name}</span>

      <div className="flex gap-1.5 mt-2">
        <TypeBadge type={type1} variant="icon" />
        {type2 && <TypeBadge type={type2} variant="icon" />}
      </div>
    </button>
  )
}