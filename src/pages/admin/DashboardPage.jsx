// src/pages/admin/DashboardPage.jsx
import { useState, useEffect, useCallback } from 'react'
import { FiPlus } from 'react-icons/fi'
import SearchBar from '../../components/common/SearchBar'
import TypeBadge from '../../components/common/TypeBadge'
import ConfirmModal from '../../components/common/ConfirmModal'
import PokemonFormModal from '../../components/admin/PokemonFormModal'
import PokemonDetailModal from '../../components/admin/PokemonDetailModal'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { pokemonService } from '../../services/pokemonService'
import { DUMMY_SPRITE } from '../../utils/constants'
import { uploadedSpriteUrl } from '../../utils/assetUrl'
import useDebounce from '../../hooks/useDebounce'

export default function DashboardPage() {
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)

  const [viewingPokemon, setViewingPokemon] = useState(null)
  const [editingPokemon, setEditingPokemon] = useState(null)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [deletingPokemon, setDeletingPokemon] = useState(null)

  const loadPokemons = useCallback(() => {
    setIsLoading(true)
    pokemonService
      .getAll(1, debouncedSearch)
      .then((res) => setPokemons(res.items))
      .finally(() => setIsLoading(false))
  }, [debouncedSearch])

  useEffect(() => {
    loadPokemons()
  }, [loadPokemons])

  const filtered = pokemons

  const handleAddClick = () => {
    setEditingPokemon(null)
    setIsFormModalOpen(true)
  }

  const handleRowClick = async (pokemon) => {
    const detail = await pokemonService.getById(pokemon.id)
    setViewingPokemon(detail)
  }

  const handleEditFromDetail = () => {
    setEditingPokemon(viewingPokemon)
    setViewingPokemon(null)
    setIsFormModalOpen(true)
  }

  const handleDeleteFromDetail = () => {
    setDeletingPokemon(viewingPokemon)
    setViewingPokemon(null)
  }

  const handleConfirmDelete = async () => {
    await pokemonService.remove(deletingPokemon.id)
    setDeletingPokemon(null)
    loadPokemons()
  }

  const handleFormSuccess = () => {
    setIsFormModalOpen(false)
    setEditingPokemon(null)
    loadPokemons()
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <button
          onClick={handleAddClick}
          className="shrink-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 rounded-full transition-colors"
        >
          Add
          <FiPlus size={18} />
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner label="Memuat data pokémon..." />
      ) : (
      <div className="bg-surface rounded-2xl ring-1 ring-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-300 text-left">
                <th className="px-5 py-3 font-semibold">No</th>
                <th className="px-5 py-3 font-semibold">Pokemon</th>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold text-right">Total</th>
                <th className="px-5 py-3 font-semibold text-right">HP</th>
                <th className="px-5 py-3 font-semibold text-right">Attack</th>
                <th className="px-5 py-3 font-semibold text-right">Defense</th>
                <th className="px-5 py-3 font-semibold text-right">Sp. Attack</th>
                <th className="px-5 py-3 font-semibold text-right">Sp. Def</th>
                <th className="px-5 py-3 font-semibold text-right">Speed</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pokemon) => {
                const type1 = pokemon.type1
                const type2 = pokemon.type2
                const total = pokemon.hp + pokemon.atk + pokemon.def + pokemon.spa + pokemon.spd + pokemon.spe

                return (
                  <tr
                    key={pokemon.id}
                    className="border-t border-slate-800 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(pokemon)}
                  >
                    <td className="px-5 py-3 text-slate-400">{pokemon.national_number}</td>
                    <td className="px-5 py-3">
                      <img
                        src={uploadedSpriteUrl(pokemon.sprite_image) || DUMMY_SPRITE}
                        alt={pokemon.name}
                        className="w-10 h-10 object-contain"
                        onError={(e) => { e.currentTarget.src = DUMMY_SPRITE }}
                      />
                    </td>
                    <td className="px-5 py-3 text-white font-medium">{pokemon.name}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5">
                        <TypeBadge type={type1} size="sm" />
                        {type2 && <TypeBadge type={type2} size="sm" />}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right text-white font-semibold">{total}</td>
                    <td className="px-5 py-3 text-right text-slate-300">{pokemon.hp}</td>
                    <td className="px-5 py-3 text-right text-slate-300">{pokemon.atk}</td>
                    <td className="px-5 py-3 text-right text-slate-300">{pokemon.def}</td>
                    <td className="px-5 py-3 text-right text-slate-300">{pokemon.spa}</td>
                    <td className="px-5 py-3 text-right text-slate-300">{pokemon.spd}</td>
                    <td className="px-5 py-3 text-right text-slate-300">{pokemon.spe}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">Tidak ada pokémon ditemukan.</div>
        )}
      </div>
      )}

      <PokemonDetailModal
        isOpen={!!viewingPokemon}
        onClose={() => setViewingPokemon(null)}
        pokemon={viewingPokemon}
        onEdit={handleEditFromDetail}
        onDelete={handleDeleteFromDetail}
      />

      <PokemonFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false)
          setEditingPokemon(null)
        }}
        initialData={editingPokemon}
        onSuccess={handleFormSuccess}
      />

      <ConfirmModal
        isOpen={!!deletingPokemon}
        onClose={() => setDeletingPokemon(null)}
        title="Hapus Pokémon"
        message={`Apakah kamu yakin ingin menghapus "${deletingPokemon?.name}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}