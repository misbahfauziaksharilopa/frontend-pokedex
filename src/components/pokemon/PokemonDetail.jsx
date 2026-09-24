// src/components/pokemon/PokemonDetail.jsx
import { useState, useEffect } from 'react'
import TypeBadge from '../common/TypeBadge'
import StatBar from '../common/StatBar'
import AbilityList from './AbilityList'
import FormSelector from './FormSelector'
import EffectivenessGrid from './EffectivenessGrid'
import LoadingSpinner from '../common/LoadingSpinner'
import { pokemonService } from '../../services/pokemonService'
import { DUMMY_SPRITE } from '../../utils/constants'
import { uploadedSpriteUrl } from '../../utils/assetUrl'

export default function PokemonDetail({ pokemonId }) {
  const [detail, setDetail] = useState(null)
  const [activeFormId, setActiveFormId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setActiveFormId(null)
    pokemonService
      .getById(pokemonId)
      .then((data) => !cancelled && setDetail(data))
      .finally(() => !cancelled && setIsLoading(false))
    return () => {
      cancelled = true
    }
  }, [pokemonId])

  if (isLoading || !detail) {
    return <LoadingSpinner label="Memuat detail..." />
  }

  const forms = [detail.form1, detail.form2, detail.form3].filter(Boolean)
  const activeForm = activeFormId ? forms.find((f) => f.id === activeFormId) : null
  const display = activeForm ?? detail
  const displayName = activeForm ? `${detail.name} (${activeForm.form_name})` : detail.name

  const type1 = display.type1
  const type2 = display.type2
  const total = display.hp + display.atk + display.def + display.spa + display.spd + display.spe

  return (
    <div>
      <div className="flex justify-center py-6 bg-surface/40 rounded-t-2xl">
        <img
          src={uploadedSpriteUrl(display.sprite_image) || DUMMY_SPRITE}
          alt={displayName}
          className="w-40 h-40 object-contain drop-shadow-2xl"
          onError={(e) => { e.currentTarget.src = DUMMY_SPRITE }}
        />
      </div>

      <div className="bg-surface/60 rounded-b-2xl p-6 space-y-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-slate-400 text-sm">{detail.national_number}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{displayName}</h2>
          </div>
          <div className="flex gap-2 shrink-0">
            <TypeBadge type={type1} />
            {type2 && <TypeBadge type={type2} />}
          </div>
        </div>

        {!activeForm && <p className="text-slate-300 leading-relaxed">{detail.description}</p>}

        {forms.length > 0 && (
          <FormSelector forms={forms} activeFormId={activeFormId} onSelect={setActiveFormId} />
        )}

        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">Abilities</h3>
          <AbilityList
            ability1={display.ability_1}
            ability2={display.ability_2}
            hiddenAbility={display.hidden_ability}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Base Stats</h3>
            <span className="text-sm font-bold text-white">Total: {total}</span>
          </div>
          <div className="space-y-2">
            <StatBar label="HP" value={display.hp} />
            <StatBar label="ATK" value={display.atk} />
            <StatBar label="DEF" value={display.def} />
            <StatBar label="SPA" value={display.spa} />
            <StatBar label="SPD" value={display.spd} />
            <StatBar label="SPE" value={display.spe} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">Type Effectiveness</h3>
          <EffectivenessGrid weaknesses={display.weaknesses || []} />
        </div>
      </div>
    </div>
  )
}