// src/components/common/LoadingSpinner.jsx

/**
 * Props:
 * - size: 'sm' | 'md' | 'lg' (default 'md')
 * - label: teks opsional di bawah spinner
 */
export default function LoadingSpinner({ size = 'md', label }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }[size]

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6">
      <div
        className={`${sizeClasses} rounded-full border-slate-700 border-t-red-500 animate-spin`}
      />
      {label && <span className="text-sm text-slate-400">{label}</span>}
    </div>
  )
}