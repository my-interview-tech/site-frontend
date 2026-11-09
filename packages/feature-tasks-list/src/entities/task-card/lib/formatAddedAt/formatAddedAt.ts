const padClockPart = (part: string): string => part.slice(0, 2).padStart(2, '0')

/**
 * Дата добавления для карточки: `2025-03-07T09:05:00` → `2025.03.07 09:05:00`.
 */
export const formatAddedAt = (value: string): string => {
  const [date = value, time = ''] = value.split(/[T ]/)
  const [hours = '00', minutes = '00', seconds = '00'] = time.split(':')

  return `${date.replaceAll('-', '.')} ${padClockPart(hours)}:${padClockPart(minutes)}:${padClockPart(seconds)}`
}
