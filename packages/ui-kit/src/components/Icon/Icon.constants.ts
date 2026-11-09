import { STATIC_URL } from '../../constants'
import type { IconDirection } from './Icon.types'

export const ICONS_URL = `${STATIC_URL}/icons`

export const ICON_ROTATION = {
  down: '90deg',
  left: '180deg',
  right: '0deg',
  up: '-90deg',
} as const satisfies Record<IconDirection, string>

export const DEFAULT_ICON_SIZE = 16
