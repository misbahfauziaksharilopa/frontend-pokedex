// src/pages/admin/FormManagePage.jsx
import { useState, useEffect, useCallback } from 'react'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import SearchBar from '../../components/common/SearchBar'
import TypeBadge from '../../components/common/TypeBadge'
import ConfirmModal from '../../components/common/ConfirmModal'
import FormFormModal from '../../components/admin/FormFormModal'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { formService } from '../../services/formService'
import { DUMMY_SPRITE } from '../../utils/constants'
import { uploadedSpriteUrl } from '../../utils/assetUrl'
import useDebounce from '../../hooks/useDebounce'

export default function FormManagePage() {
  const [forms, setForms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)

  const [editingForm, setEditingForm] = useState(null)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [deletingForm, setDeletingForm] = useState(null)

  const loadForms = useCallback(() => {
    setIsLoading(true)
    formService
      .getAll()
      .then((res) => setForms(res.items))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    loadForms()
  }, [loadForms])

  const filtered = debouncedSearch.trim()
    ? forms.filter((f) => f.form_name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    : forms

  const handleAddClick = () => {
    setEditingForm(null)
    setIsFormModalOpen(true)
  }

  const handleEditClick = (form) => {
    setEditingForm(form)
    setIsFormModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    await formService.remove(deletingForm.id)
    setDeletingForm(null)
    loadForms()
  }

  const handleFormSuccess = () => {
    setIsFormModalOpen(false)
    setEditingForm(null)
    loadForms()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white">Manage Forms</h1>
      </div>
      <p className="text-slate-400 text-sm mb-6">
        Kelola form (Mega Evolve, Mega X, Mega Y, G-Max) yang bisa dipilih saat menambah Pokémon.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search form.." />
        <button
          onClick={handleAddClick}
          className="shrink-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 rounded-full transition-colors"
        >
          Add
          <FiPlus size={18} />
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner label="Memuat data form..." />
      ) : (
      <div className="bg-surface rounded-2xl ring-1 ring-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-300 text-left">
                <th className="px-5 py-3 font-semibold">Sprite</th>
                <th className="px-5 py-3 font-semibold">Form Name</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Abilities</th>
                <th className="px-5 py-3 font-semibold text-right">Total</th>
                <th className="px-5 py-3 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((form) => {
                const type1 = form.type1
                const type2 = form.type2
                const total = form.hp + form.atk + form.def + form.spa + form.spd + form.spe

                return (
                  <tr key={form.id} className="border-t border-slate-800 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3">
                      <img
                        src={uploadedSpriteUrl(form.sprite_image) || DUMMY_SPRITE}
                        alt={form.form_name}
                        className="w-10 h-10 object-contain"
                        onError={(e) => { e.currentTarget.src = DUMMY_SPRITE }}
                      />
                    </td>
                    <td className="px-5 py-3 text-white font-medium">{form.form_name}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5">
                        <TypeBadge type={type1} size="sm" />
                        {type2 && <TypeBadge type={type2} size="sm" />}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs">
                      {[form.ability_1, form.ability_2, form.hidden_ability].filter(Boolean).join(', ') || '-'}
                    </td>
                    <td className="px-5 py-3 text-right text-white font-semibold">{total}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(form)}
                          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeletingForm(form)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950 transition-colors"
                          title="Hapus"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">Tidak ada form ditemukan.</div>
        )}
      </div>
      )}

      <FormFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false)
          setEditingForm(null)
        }}
        initialData={editingForm}
        onSuccess={handleFormSuccess}
      />

      <ConfirmModal
        isOpen={!!deletingForm}
        onClose={() => setDeletingForm(null)}
        title="Hapus Form"
        message={`Apakah kamu yakin ingin menghapus form "${deletingForm?.form_name}"? Pokémon yang memakai form ini akan kehilangan referensinya.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}