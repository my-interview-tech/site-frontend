/** `m:ss` из секунд. */
export const clockOf = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60

  return `${minutes}:${rest.toString().padStart(2, '0')}`
}

/** Ожидание повтора: часы и минуты. */
export const waitOf = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  return `${hours} ч ${minutes} мин`
}
