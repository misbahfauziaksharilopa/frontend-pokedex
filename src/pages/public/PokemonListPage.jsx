import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/common/SearchBar'
import PokemonList from '../../components/pokemon/PokemonList'
import PokemonDetail from '../../components/pokemon/PokemonDetail'
import EmptyState from '../../components/common/EmptyState'

export default function PokemonListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="max-w mx-auto w-full px-4 sm:px-20 pt-8 pb-8 shrink-0">
        <div className="flex items-center gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Link
            to="/admin/login"
            title="Admin Login"
            className="w-14 h-14 shrink-0 rounded-2xl bg-red-600 hover:bg-red-500 flex items-center justify-center transition-colors"
          >
            <img src="/sprites/pokemon/pokeball-icon.png" alt="Admin Login" className="w-8 h-8 flex items-center justify-center"/>
          </Link>
        </div>
      </div>

      <div className="max-w mx-auto w-full px-4 sm:px-20 pb-8 flex-1 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 h-full">
          <div className="overflow-y-auto scrollbar-hide px-1 pt-1">
            <PokemonList
              searchTerm={searchTerm}
              selectedId={selectedId}
              onSelect={(pokemon) => setSelectedId(pokemon.id)}
            />
          </div>

          <div className="hidden lg:block rounded-2xl overflow-y-auto scrollbar-hide">
            {selectedId ? (
              <PokemonDetail pokemonId={selectedId} />
            ) : (
              <EmptyState title="Choose a Pokémon from the list to see more details." />
            )}
          </div>
        </div>
      </div>

      {selectedId && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 z-40 flex items-end"
          onClick={() => setSelectedId(null)}
          >
          <div
            className="bg-base w-full max-h-[85vh] rounded-t-3xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <PokemonDetail pokemonId={selectedId} />
          </div>
        </div>
      )}
    </div>
  )
}