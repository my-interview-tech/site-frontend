/**
 * Тон точки рядом с названием темы.
 *
 * @description
 * Изученная тема — `known`, закрытая — `idle`, остальные — `gap`.
 */
export const toneOf = (isKnown: boolean, isDisabled: boolean): 'gap' | 'idle' | 'known' => {
  if (isKnown) {
    return 'known'
  }

  if (isDisabled) {
    return 'idle'
  }

  return 'gap'
}
