import { NavLink } from 'react-router-dom'
import { FiGrid, FiLayers, FiLogOut } from 'react-icons/fi'
import useAuth from '../../hooks/useAuth'

const navItems = [
  { to: '/admin/dashboard', label: 'Pokémon', icon: FiGrid },
  { to: '/admin/forms', label: 'Forms', icon: FiLayers },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-60 shrink-0 bg-surface border-r border-slate-800 flex flex-col">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
          <div className="w-5 h-5 rounded-full border-[3px] border-white flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>
        </div>
        <span className="text-white font-bold">Pokedex Admin</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <p className="px-3 text-xs text-slate-500 mb-2 truncate">{user?.email}</p>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}