// src/components/admin/FormFormModal.jsx
import { useState, useEffect } from 'react'
import Modal from '../common/Modal'
import SpriteUploadPreview from './SpriteUploadPreview'
import { typeService } from '../../services/typeService'
import { formService } from '../../services/formService'
import { ALLOWED_FORM_TYPES } from '../../utils/constants'

const emptyForm = {
  form_type: '',
  form_name: '',
  type_1_id: '',
  type_2_id: '',
  ability_1: '',
  ability_2: '',
  hidden_ability: '',
  sprite_image: null,
  hp: '', atk: '', def: '', spa: '', spd: '', spe: '',
}

/**
 * Props:
 * - isOpen, onClose
 * - initialData: form object (mode edit) | null (mode create)
 * - onSubmit: (formData) => void
 */
export default function FormFormModal({ isOpen, onClose, initialData, onSuccess }) {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [types, setTypes] = useState([])

  const isEditMode = !!initialData

  useEffect(() => {
    if (!isOpen) return
    typeService.getAll().then(setTypes)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    if (initialData) {
      setFormData({
        form_type: '', // tidak disimpan di DB, hanya bantuan input — dikosongkan saat edit
        form_name: initialData.form_name,
        type_1_id: initialData.type_1_id,
        type_2_id: initialData.type_2_id ?? '',
        ability_1: initialData.ability_1 ?? '',
        ability_2: initialData.ability_2 ?? '',
        hidden_ability: initialData.hidden_ability ?? '',
        sprite_image: initialData.sprite_image ?? null, // string (sprite lama) sampai user pilih file baru
        hp: initialData.hp, atk: initialData.atk, def: initialData.def,
        spa: initialData.spa, spd: initialData.spd, spe: initialData.spe,
      })
    } else {
      setFormData(emptyForm)
    }
    setErrors({})
  }, [isOpen, initialData])

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.form_name.trim()) {
      newErrors.form_name = 'Wajib diisi'
    } else {
      const nameLower = formData.form_name.toLowerCase()
      const isAllowed = ALLOWED_FORM_TYPES.some((t) => nameLower.includes(t.toLowerCase().replace(' evolve', '')))
      if (!isAllowed) {
        newErrors.form_name = `Nama harus mengandung salah satu jenis: ${ALLOWED_FORM_TYPES.join(', ')}`
      }
    }
    if (!formData.type_1_id) newErrors.type_1_id = 'Wajib pilih tipe utama'
    ;['hp', 'atk', 'def', 'spa', 'spd', 'spe'].forEach((stat) => {
      if (formData[stat] === '' || isNaN(formData[stat])) newErrors[stat] = 'Harus angka'
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const fd = new FormData()
    fd.append('form_name', formData.form_name)
    fd.append('type_1_id', formData.type_1_id)
    if (formData.type_2_id) fd.append('type_2_id', formData.type_2_id)
    if (formData.ability_1) fd.append('ability_1', formData.ability_1)
    if (formData.ability_2) fd.append('ability_2', formData.ability_2)
    if (formData.hidden_ability) fd.append('hidden_ability', formData.hidden_ability)
    fd.append('hp', formData.hp)
    fd.append('atk', formData.atk)
    fd.append('def', formData.def)
    fd.append('spa', formData.spa)
    fd.append('spd', formData.spd)
    fd.append('spe', formData.spe)
    // Sprite hanya dikirim kalau user benar-benar upload file baru
    if (formData.sprite_image instanceof File) {
      fd.append('sprite_image', formData.sprite_image)
    }

    setIsSubmitting(true)
    setSubmitError('')
    try {
      if (isEditMode) {
        await formService.update(initialData.id, fd)
      } else {
        await formService.create(fd)
      }
      onSuccess()
    } catch (err) {
      const message = err.response?.data?.message || 'Gagal menyimpan data form.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (field) =>
    `w-full bg-base text-white placeholder-slate-500 rounded-lg px-3 py-2 outline-none ring-1 transition-colors ${
      errors[field] ? 'ring-red-600' : 'ring-slate-700 focus:ring-red-500'
    }`

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? `Edit ${initialData.form_name}` : 'Tambah Form Baru'}
      size="lg"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white transition-colors"
          >
            {isSubmitting ? 'Menyimpan...' : isEditMode ? 'Simpan Perubahan' : 'Tambah Form'}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {submitError && (
          <div className="bg-red-950 text-red-300 text-sm rounded-lg px-4 py-2 ring-1 ring-red-900">
            {submitError}
          </div>
        )}
        <SpriteUploadPreview value={formData.sprite_image} onChange={(file) => updateField('sprite_image', file)} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Jenis Form (bantuan penamaan)</label>
            <select
              value={formData.form_type}
              onChange={(e) => updateField('form_type', e.target.value)}
              className={inputClass('form_type')}
            >
              <option value="">Pilih jenis...</option>
              {ALLOWED_FORM_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <p className="text-xs text-slate-600 mt-1">Hanya membantu penamaan, isi nama lengkap di sebelah.</p>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Nama Form</label>
            <input
              type="text"
              value={formData.form_name}
              onChange={(e) => updateField('form_name', e.target.value)}
              placeholder="Mega Gengar"
              className={inputClass('form_name')}
            />
            {errors.form_name && <p className="text-xs text-red-400 mt-1">{errors.form_name}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Tipe 1</label>
            <select value={formData.type_1_id} onChange={(e) => updateField('type_1_id', e.target.value)} className={inputClass('type_1_id')}>
              <option value="">Pilih tipe...</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            {errors.type_1_id && <p className="text-xs text-red-400 mt-1">{errors.type_1_id}</p>}
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Tipe 2 (opsional)</label>
            <select value={formData.type_2_id} onChange={(e) => updateField('type_2_id', e.target.value)} className={inputClass('type_2_id')}>
              <option value="">Tidak ada</option>
              {types.filter((t) => String(t.id) !== String(formData.type_1_id)).map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Ability 1</label>
            <input
              type="text"
              value={formData.ability_1}
              onChange={(e) => updateField('ability_1', e.target.value)}
              className={inputClass('ability_1')}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Ability 2</label>
            <input
              type="text"
              value={formData.ability_2}
              onChange={(e) => updateField('ability_2', e.target.value)}
              className={inputClass('ability_2')}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Hidden Ability</label>
            <input
              type="text"
              value={formData.hidden_ability}
              onChange={(e) => updateField('hidden_ability', e.target.value)}
              className={inputClass('hidden_ability')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Base Stats</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {['hp', 'atk', 'def', 'spa', 'spd', 'spe'].map((stat) => (
              <div key={stat}>
                <label className="block text-[10px] uppercase text-slate-500 mb-1 text-center">{stat}</label>
                <input
                  type="number"
                  value={formData[stat]}
                  onChange={(e) => updateField(stat, e.target.value)}
                  className={`${inputClass(stat)} text-center`}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  )
}