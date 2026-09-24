// src/components/common/EmptyState.jsx

/**
 * Props:
 * - title: string
 * - description: string (opsional)
 * - icon: React node (opsional, misal icon dari react-icons)
 */
export default function EmptyState({ title, description, icon }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 py-20">
      {icon && <div className="text-5xl text-slate-600 mb-4">{icon}</div>}
      <p className="text-xl text-slate-500 font-medium">{title}</p>
      {description && (
        <p className="text-sm text-slate-600 mt-2 max-w-sm">{description}</p>
      )}
    </div>
  )
}