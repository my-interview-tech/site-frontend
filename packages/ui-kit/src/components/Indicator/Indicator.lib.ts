import type { IndicatorValue } from './Indicator.types'

export type IndicatorPlate = {
  background: string
  color: string
}

const DARK_TEXT = '#1a1a1a'
const LIGHT_TEXT = '#fff'

/**
 * Цвет плашки по сложности: серый до 4, жёлтый, оранжевый, красный, фиолетовый на 10.
 * Одинаков в обеих темах.
 */
export const getIndicatorPlate = (value: IndicatorValue): IndicatorPlate => {
  if (value >= 10) {
    return { background: '#7c3aed', color: LIGHT_TEXT }
  }

  if (value >= 9) {
    return { background: '#e5484d', color: LIGHT_TEXT }
  }

  if (value >= 7) {
    return { background: '#f97316', color: DARK_TEXT }
  }

  if (value >= 5) {
    return { background: '#f5c518', color: DARK_TEXT }
  }

  return { background: '#d4d4d8', color: DARK_TEXT }
}
