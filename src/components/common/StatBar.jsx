import { STAT_MAX } from '../../utils/constants'

const getBarColor = (value) => {
  if (value >= 120) return 'bg-emerald-500'
  if (value >= 90) return 'bg-lime-500'
  if (value >= 60) return 'bg-yellow-500'
  if (value >= 30) return 'bg-orange-500'
  return 'bg-red-500'
}

export default function StatBar({ label, value }) {
  const percentage = Math.min((value / STAT_MAX) * 100, 100)

  return (
    <div className="flex items-center gap-3">
      <span className="w-10 text-xs font-semibold text-slate-400 uppercase">{label}</span>
      <div className="flex-1 h-2.5 bg-base rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getBarColor(value)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-sm font-bold text-white text-right">{value}</span>
    </div>
  )
}