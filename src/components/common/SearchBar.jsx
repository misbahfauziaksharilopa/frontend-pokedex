import { FiSearch } from 'react-icons/fi'

export default function SearchBar({ value, onChange, placeholder = 'Search..' }) {
  return (
    <div className="relative flex-1">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface text-white placeholder-slate-500 rounded-full pl-11 pr-4 py-3 outline-none ring-1 ring-slate-700 focus:ring-red-500 transition-colors"
      />
    </div>
  )
}