export type Favorites = {
  /**
   * Id задач в избранном.
   */
  favoriteIds: ReadonlySet<string>

  /**
   * Поставить или снять закладку.
   */
  toggleFavorite: (id: string) => void
}
