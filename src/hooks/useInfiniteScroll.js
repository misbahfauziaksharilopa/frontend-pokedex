// src/hooks/useInfiniteScroll.js
import { useRef, useCallback } from 'react'

/**
 * @param {Function} onLoadMore - dipanggil saat elemen sentinel terlihat
 * @param {boolean} hasMore - masih ada data untuk dimuat atau tidak
 * @param {boolean} isLoading - cegah trigger dobel saat sedang loading
 */
export default function useInfiniteScroll(onLoadMore, hasMore, isLoading) {
  const observerRef = useRef(null)

  const sentinelRef = useCallback(
    (node) => {
      if (isLoading) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore()
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [onLoadMore, hasMore, isLoading]
  )

  return sentinelRef
}