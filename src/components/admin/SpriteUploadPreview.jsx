// src/components/admin/SpriteUploadPreview.jsx
import { useRef, useState, useEffect } from 'react'
import { FiUpload } from 'react-icons/fi'
import { DUMMY_SPRITE } from '../../utils/constants'
import { uploadedSpriteUrl } from '../../utils/assetUrl'

export default function SpriteUploadPreview({ value, onChange, label = 'Sprite' }) {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else if (typeof value === 'string' && value) {
      setPreviewUrl(uploadedSpriteUrl(value))
    } else {
      setPreviewUrl(null)
    }
  }, [value])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    onChange(file)
  }

  return (
    <div>
      <label className="block text-sm text-slate-400 mb-1.5">{label}</label>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-xl bg-base ring-1 ring-slate-700 flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={previewUrl || DUMMY_SPRITE}
            alt="Preview sprite"
            className="w-full h-full object-contain p-1"
            onError={(e) => { e.currentTarget.src = DUMMY_SPRITE }}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 text-sm font-medium bg-surface hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiUpload size={16} />
            Pilih Gambar
          </button>
          <p className="text-xs text-slate-500 mt-1.5">PNG, JPG maks 2MB.</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}