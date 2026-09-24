// src/components/admin/PokemonFormModal.jsx
import { useState, useEffect } from 'react'
import Modal from '../common/Modal'
import SpriteUploadPreview from './SpriteUploadPreview'
import { typeService } from '../../services/typeService'
import { formService } from '../../services/formService'
import { pokemonService } from '../../services/pokemonService'
import { MAX_FORMS_PER_POKEMON } from '../../utils/constants'

const emptyForm = {
  national_number: '',
  name: '',
  description: '',
  type_1_id: '',
  type_2_id: '',
  ability_1: '',
  ability_2: '',
  hidden_ability: '',
  sprite_image: null,
  hp: '', atk: '', def: '', spa: '', spd: '', spe: '',
  selectedFormIds: [],
}

export default function PokemonFormModal({ isOpen, onClose, initialData, onSuccess }) {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [types, setTypes] = useState([])
  const [availableForms, setAvailableForms] = useState([])

  const isEditMode = !!initialData

  useEffect(() => {
    if (!isOpen) return
    typeService.getAll().then(setTypes)
    formService.getAll().then((res) => setAvailableForms(res.items))
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    if (initialData) {
      setFormData({
        national_number: initialData.national_number,
        name: initialData.name,
        description: initialData.description,
        type_1_id: initialData.type_1_id,
        type_2_id: initialData.type_2_id ?? '',
        ability_1: initialData.ability_1 ?? '',
        ability_2: initialData.ability_2 ?? '',
        hidden_ability: initialData.hidden_ability ?? '',
        sprite_image: initialData.sprite_image ?? null, // string (sprite lama) sampai user pilih file baru
        hp: initialData.hp, atk: initialData.atk, def: initialData.def,
        spa: initialData.spa, spd: initialData.spd, spe: initialData.spe,
        selectedFormIds: [initialData.form_1_id, initialData.form_2_id, initialData.form_3_id].filter(Boolean),
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

  const toggleForm = (formId) => {
    setFormData((prev) => {
      const already = prev.selectedFormIds.includes(formId)
      if (already) {
        return { ...prev, selectedFormIds: prev.selectedFormIds.filter((id) => id !== formId) }
      }
      if (prev.selectedFormIds.length >= MAX_FORMS_PER_POKEMON) {
        return prev
      }
      return { ...prev, selectedFormIds: [...prev.selectedFormIds, formId] }
    })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.national_number.toString().trim()) newErrors.national_number = 'Wajib diisi'
    if (!formData.name.trim()) newErrors.name = 'Wajib diisi'
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

    const [form_1_id = null, form_2_id = null, form_3_id = null] = formData.selectedFormIds

    const fd = new FormData()
    fd.append('national_number', formData.national_number)
    fd.append('name', formData.name)
    fd.append('description', formData.description || '')
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
    if (form_1_id) fd.append('form_1_id', form_1_id)
    if (form_2_id) fd.append('form_2_id', form_2_id)
    if (form_3_id) fd.append('form_3_id', form_3_id)
    // Sprite hanya dikirim kalau user benar-benar upload file baru.
    // Kalau mode edit dan sprite tidak diganti, field ini tidak dikirim sama sekali
    // supaya backend tetap mempertahankan sprite lama.
    if (formData.sprite_image instanceof File) {
      fd.append('sprite_image', formData.sprite_image)
    }

    setIsSubmitting(true)
    setSubmitError('')
    try {
      if (isEditMode) {
        await pokemonService.update(initialData.id, fd)
      } else {
        await pokemonService.create(fd)
      }
      onSuccess()
    } catch (err) {
      const message = err.response?.data?.message || 'Gagal menyimpan data pokémon.'
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
      title={isEditMode ? `Edit ${initialData.name}` : 'Tambah Pokémon Baru'}
      size="lg"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 transition-colors">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white transition-colors"
          >
            {isSubmitting ? 'Menyimpan...' : isEditMode ? 'Simpan Perubahan' : 'Tambah Pokémon'}
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
            <label className="block text-sm text-slate-400 mb-1.5">National Number</label>
            <input
              type="text"
              value={formData.national_number}
              onChange={(e) => updateField('national_number', e.target.value)}
              placeholder="0031"
              className={inputClass('national_number')}
            />
            {errors.national_number && <p className="text-xs text-red-400 mt-1">{errors.national_number}</p>}
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Nama</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Nidoqueen"
              className={inputClass('name')}
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">Deskripsi</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            className={inputClass('description')}
          />
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
            <input type="text" value={formData.ability_1} onChange={(e) => updateField('ability_1', e.target.value)} className={inputClass('ability_1')} />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Ability 2</label>
            <input type="text" value={formData.ability_2} onChange={(e) => updateField('ability_2', e.target.value)} className={inputClass('ability_2')} />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">Hidden Ability</label>
            <input type="text" value={formData.hidden_ability} onChange={(e) => updateField('hidden_ability', e.target.value)} className={inputClass('hidden_ability')} />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Base Stats</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {['hp', 'atk', 'def', 'spa', 'spd', 'spe'].map((stat) => (
              <div key={stat}>
                <label className="block text-[10px] uppercase text-slate-500 mb-1 text-center">{stat}</label>
                <input type="number" value={formData[stat]} onChange={(e) => updateField(stat, e.target.value)} className={`${inputClass(stat)} text-center`} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm text-slate-400">
              Forms <span className="text-slate-600">({formData.selectedFormIds.length}/{MAX_FORMS_PER_POKEMON})</span>
            </label>
            {formData.selectedFormIds.length >= MAX_FORMS_PER_POKEMON && (
              <span className="text-xs text-amber-400">Maksimal {MAX_FORMS_PER_POKEMON} form tercapai</span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
            {availableForms.map((form) => {
              const checked = formData.selectedFormIds.includes(form.id)
              const disabled = !checked && formData.selectedFormIds.length >= MAX_FORMS_PER_POKEMON
              return (
                <label
                  key={form.id}
                  className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ring-1 cursor-pointer transition-colors ${
                    checked ? 'bg-red-950 ring-red-800 text-red-200' : 'bg-surface ring-slate-700 text-slate-300'
                  } ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/5'}`}
                >
                  <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggleForm(form.id)} className="rounded" />
                  {form.form_name}
                </label>
              )
            })}
          </div>
          <p className="text-xs text-slate-600 mt-1.5">
            Belum ada form yang cocok? Tambahkan dulu lewat menu <span className="text-slate-400">Forms</span> di sidebar.
          </p>
        </div>
      </form>
    </Modal>
  )
}