// src/components/pokemon/PokemonList.jsx
import { useState, useEffect, useCallback } from 'react'
import PokemonCard from './PokemonCard'
import LoadingSpinner from '../common/LoadingSpinner'
import EmptyState from '../common/EmptyState'
import useDebounce from '../../hooks/useDebounce'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { pokemonService } from '../../services/pokemonService'

export default function PokemonList({ searchTerm, selectedId, onSelect }) {
  const debouncedSearch = useDebounce(searchTerm, 400)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setIsInitialLoading(true)
    setError('')
    pokemonService
      .getAll(1, debouncedSearch)
      .then((res) => {
        if (cancelled) return
        setItems(res.items)
        setPage(1)
        setHasMore(res.hasMore)
      })
      .catch(() => !cancelled && setError('Gagal memuat data pokémon.'))
      .finally(() => !cancelled && setIsInitialLoading(false))
    return () => {
      cancelled = true
    }
  }, [debouncedSearch])

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    const nextPage = page + 1
    pokemonService
      .getAll(nextPage, debouncedSearch)
      .then((res) => {
        setItems((prev) => [...prev, ...res.items])
        setPage(nextPage)
        setHasMore(res.hasMore)
      })
      .catch(() => setError('Gagal memuat data tambahan.'))
      .finally(() => setIsLoading(false))
  }, [page, hasMore, isLoading, debouncedSearch])

  const sentinelRef = useInfiniteScroll(loadMore, hasMore, isLoading)

  if (isInitialLoading) {
    return <LoadingSpinner label="Memuat pokémon..." />
  }

  if (error && items.length === 0) {
    return <EmptyState title="Gagal memuat data" description={error} />
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Pokémon tidak ditemukan"
        description={debouncedSearch ? `Tidak ada hasil untuk "${debouncedSearch}"` : 'Belum ada data pokémon.'}
      />
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isActive={pokemon.id === selectedId}
            onClick={() => onSelect(pokemon)}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef}>
          <LoadingSpinner label="Memuat pokémon lainnya..." />
        </div>
      )}
    </div>
  )
}