// src/components/pokemon/EffectivenessGrid.jsx
import { useState, useEffect } from 'react'
import { EFFECTIVENESS_STYLE } from '../../utils/constants'
import { typeService } from '../../services/typeService'
import TypeBadge from '../common/TypeBadge'

export default function EffectivenessGrid({ weaknesses = [] }) {
  const [typeMap, setTypeMap] = useState({})

  useEffect(() => {
    typeService.getAll().then((types) => {
      const map = {}
      types.forEach((t) => { map[t.id] = t })
      setTypeMap(map)
    })
  }, [])

  const grouped = { immune: [], weak: [], resist: [], normal: [] }
  weaknesses.forEach((row) => {
    const category = grouped[row.label] ? row.label : 'normal'
    grouped[category].push(row.attacking_type_id)
  })

  const categories = ['immune', 'weak', 'normal', 'resist']

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {categories.map((cat) => (
        <div key={cat} className="bg-surface/60 rounded-lg p-3">
          <p className="text-xs font-semibold text-slate-400 mb-2">{EFFECTIVENESS_STYLE[cat].label}</p>
          <div className="flex flex-wrap gap-1.5">
            {grouped[cat].length === 0 && <span className="text-xs text-slate-600">None</span>}
            {grouped[cat].map((typeId) => (
              <TypeBadge key={typeId} type={typeMap[typeId]} variant="icon" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}