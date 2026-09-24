import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

export default function Modal({ isOpen, onClose, title, size = 'md', children, footer }) {
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const maxWidth = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-3xl' }[size]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} bg-surface rounded-2xl ring-1 ring-slate-800 max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto scrollbar scrollbar-thumb-[#3a3a4b] scrollbar-track-transparent">{children}</div>

        {footer && (
          <div className="px-6 py-4 border-t border-slate-800 shrink-0 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}