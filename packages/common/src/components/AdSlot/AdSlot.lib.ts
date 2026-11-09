import { AD_SLOT_SIZE } from './AdSlot.constants'
import type { AdSlotSize, AdSlotSizeKey } from './AdSlot.types'

export type AdSlotBox = AdSlotSize & {
  isClosable: boolean
}

/**
 * Размер слота.
 * @description Ключ берётся из `AD_SLOT_SIZE`, вместе с `isClosable`. Свой объект задаёт только ширину и высоту и не закрывается.
 */
export const resolveAdSlotSize = (size: AdSlotSizeKey | AdSlotSize = 'sidebar'): AdSlotBox => {
  if (typeof size === 'string') {
    const box = AD_SLOT_SIZE[size]

    return { height: box.height, isClosable: box.isClosable, width: box.width }
  }

  return { height: size.height, isClosable: false, width: size.width }
}
