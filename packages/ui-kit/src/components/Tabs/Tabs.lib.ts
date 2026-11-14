const STEP = {
  ArrowLeft: -1,
  ArrowRight: 1,
} as const satisfies Record<string, number>

/**
 * Индекс вкладки после нажатия стрелки. Список закольцован. Другая клавиша — `null`.
 */
export const getNextIndex = (key: string, index: number, count: number): number | null => {
  if (key === 'Home') {
    return 0
  }

  if (key === 'End') {
    return count - 1
  }

  if (key !== 'ArrowLeft' && key !== 'ArrowRight') {
    return null
  }

  return (index + STEP[key] + count) % count
}
