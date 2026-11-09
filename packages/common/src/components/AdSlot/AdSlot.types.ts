import { AD_SLOT_SIZE } from './AdSlot.constants'

export type AdSlotSizeKey = keyof typeof AD_SLOT_SIZE

export type AdSlotSize = {
  /**
   * Ширина, px.
   */
  width: number | string

  /**
   * Высота, px.
   */
  height: number | string
}

export interface AdSlotProps {
  /**
   * Идентификатор слота для рекламной сети.
   */
  id?: string

  /**
   * Метка слота.
   */
  label: string

  /**
   * Подпись под меткой, например `240 × 400`.
   */
  caption?: string

  /**
   * Ключ `AD_SLOT_SIZE` или свои ширина и высота.
   * @default 'sidebar'
   */
  size?: AdSlotSizeKey | AdSlotSize

  /**
   * Событие "Закрыть" рекламного слота.
   */
  onClose?: () => void
}
