import type { ReactNode } from 'react'

/** Пункт списка. */
export interface SelectOption {
  /**
   * Ключ пункта.
   */
  id: string

  /**
   * Подпись.
   */
  label: string

  /**
   * Подсказка справа от подписи.
   */
  hint?: string

  /**
   * Слот перед подписью: иконка, логотип, индикатор.
   */
  slotBefore?: ReactNode
}

export interface SelectProps {
  /**
   * Видимая подпись над полем.
   */
  label: string

  /**
   * Пункты списка.
   */
  options: readonly SelectOption[]

  /**
   * Ключи выбранных пунктов.
   */
  value: readonly string[]

  /**
   * Событие "изменить выбор". Повторный выбор того же пункта снимает его.
   */
  onChange: (ids: string[]) => void

  /**
   * Подпись поля, когда ничего не выбрано.
   */
  placeholder: string

  /**
   * Выбор нескольких пунктов. Список остаётся открытым после выбора.
   * @default false
   */
  isMultiple?: boolean
}
