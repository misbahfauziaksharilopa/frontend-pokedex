export default function FormSelector({ forms = [], activeFormId, onSelect }) {
  if (!forms || forms.length === 0) return null

  const tabs = [{ id: null, label: 'Base' }, ...forms.map((f) => ({ id: f.id, label: f.form_name }))]

  return (
    <div className="flex gap-1 bg-surface rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id ?? 'base'}
          onClick={() => onSelect(tab.id)}
          className={`flex-1 text-xs sm:text-sm font-medium px-2 py-1.5 rounded-md transition-colors truncate
            ${activeFormId === tab.id ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}