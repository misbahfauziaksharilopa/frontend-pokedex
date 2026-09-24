export default function AbilityList({ ability1, ability2, hiddenAbility }) {
  const abilities = [
    ability1 && { name: ability1, hidden: false },
    ability2 && { name: ability2, hidden: false },
    hiddenAbility && { name: hiddenAbility, hidden: true },
  ].filter(Boolean)

  if (abilities.length === 0) {
    return <span className="text-sm text-slate-500">Tidak ada data ability.</span>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {abilities.map((ability, idx) => (
        <span
          key={idx}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg ring-1 bg-surface ${
            ability.hidden ? 'text-purple-300 ring-purple-800' : 'text-slate-200 ring-slate-700'
          }`}
        >
          {ability.name}
          {ability.hidden && <span className="ml-1 opacity-70">(Hidden)</span>}
        </span>
      ))}
    </div>
  )
}