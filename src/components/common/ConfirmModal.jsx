// src/components/common/ConfirmModal.jsx
import Modal from './Modal'
import { FiAlertTriangle } from 'react-icons/fi'

/**
 * Props:
 * - isOpen, onClose
 * - title, message
 * - onConfirm: () => void
 * - confirmLabel: string (default 'Hapus')
 * - isDangerous: boolean (default true) → tombol merah atau tidak
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  title = 'Konfirmasi',
  message,
  onConfirm,
  confirmLabel = 'Hapus',
  isDangerous = true,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors ${
              isDangerous ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-3">
        {isDangerous && (
          <div className="shrink-0 w-10 h-10 rounded-full bg-red-950 flex items-center justify-center">
            <FiAlertTriangle className="text-red-400" size={20} />
          </div>
        )}
        <p className="text-slate-300 text-sm leading-relaxed">{message}</p>
      </div>
    </Modal>
  )
}