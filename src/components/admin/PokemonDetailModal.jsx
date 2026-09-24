// src/components/admin/PokemonDetailModal.jsx
import Modal from '../common/Modal'
import TypeBadge from '../common/TypeBadge'
import StatBar from '../common/StatBar'
import AbilityList from '../pokemon/AbilityList'
import { DUMMY_SPRITE } from '../../utils/constants'
import { uploadedSpriteUrl } from '../../utils/assetUrl'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

export default function PokemonDetailModal({ isOpen, onClose, pokemon, onEdit, onDelete }) {
  if (!pokemon) return null

  const type1 = pokemon.type1
  const type2 = pokemon.type2
  const forms = [pokemon.form1, pokemon.form2, pokemon.form3].filter(Boolean)
  const total = pokemon.hp + pokemon.atk + pokemon.def + pokemon.spa + pokemon.spd + pokemon.spe

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${pokemon.national_number} - ${pokemon.name}`}
      size="md"
      footer={
        <>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950 transition-colors"
          >
            <FiTrash2 size={16} />
            Hapus
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors"
          >
            <FiEdit2 size={16} />
            Edit
          </button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="flex justify-center bg-surface/60 rounded-xl py-6">
          <img
            src={uploadedSpriteUrl(pokemon.sprite_image) || DUMMY_SPRITE}
            alt={pokemon.name}
            className="w-28 h-28 object-contain"
            onError={(e) => { e.currentTarget.src = DUMMY_SPRITE }}
          />
        </div>

        <div className="flex gap-2">
          <TypeBadge type={type1} />
          {type2 && <TypeBadge type={type2} />}
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">{pokemon.description}</p>

        <div>
          <h3 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Abilities</h3>
          <AbilityList
            ability1={pokemon.ability_1}
            ability2={pokemon.ability_2}
            hiddenAbility={pokemon.hidden_ability}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Base Stats</h3>
            <span className="text-sm font-bold text-white">Total: {total}</span>
          </div>
          <div className="space-y-2">
            <StatBar label="HP" value={pokemon.hp} />
            <StatBar label="ATK" value={pokemon.atk} />
            <StatBar label="DEF" value={pokemon.def} />
            <StatBar label="SPA" value={pokemon.spa} />
            <StatBar label="SPD" value={pokemon.spd} />
            <StatBar label="SPE" value={pokemon.spe} />
          </div>
        </div>

        {forms.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Forms</h3>
            <div className="flex flex-wrap gap-2">
              {forms.map((f) => (
                <span key={f.id} className="text-xs font-medium bg-surface text-slate-300 px-3 py-1.5 rounded-lg ring-1 ring-slate-700">
                  {f.form_name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}