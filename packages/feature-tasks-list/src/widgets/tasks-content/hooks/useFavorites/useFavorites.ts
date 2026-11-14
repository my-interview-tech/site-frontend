import { useEffect, useState } from 'react'

import { loadFavorites, removeFavorite, saveFavorite } from '@tasks-list/shared/api'

import type { Favorites } from './types'

/**
 * Избранные задачи из отдельной ручки. Переключение оптимистичное, ошибка запроса откатывает выбор.
 */
export const useFavorites = (): Favorites => {
  const [favoriteIds, setFavoriteIds] = useState<ReadonlySet<string>>(() => new Set<string>())

  useEffect(() => {
    let isActive = true

    void loadFavorites().then((ids) => {
      if (isActive) {
        setFavoriteIds(new Set(ids))
      }
    })

    return () => {
      isActive = false
    }
  }, [])

  const toggleFavorite = (id: string) => {
    const isSaved = favoriteIds.has(id)
    const next = new Set(favoriteIds)

    if (isSaved) {
      next.delete(id)
    } else {
      next.add(id)
    }

    setFavoriteIds(next)

    const request = isSaved ? removeFavorite({ id }) : saveFavorite({ id })

    void request.catch(() => {
      setFavoriteIds(favoriteIds)
    })
  }

  return { favoriteIds, toggleFavorite }
}
