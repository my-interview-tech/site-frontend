import type { BadgeColor } from '@my-interview/ui-kit'

type PlanFeature = {
  included: boolean
  label: string
}

type BadgeTone = Extract<BadgeColor, 'blueOutline' | 'grayOutline' | 'purpleOutline'>

export type Plan = {
  /**
   * Название тарифа.
   * @type {string}
   */
  name: string

  /**
   * Пояснение под названием.
   * @type {string}
   */
  note: string

  /**
   * Выделенная карточка.
   * @type {boolean}
   */
  highlighted: boolean

  /**
   * Текст плашки.
   * @type {string}
   */
  badge: string

  /**
   * Тон плашки.
   * @type {BadgeTone}
   */
  badgeTone: BadgeTone

  /**
   * Подпись кнопки.
   * @type {string}
   */
  cta: string

  /**
   * Пункты тарифа.
   * @type {PlanFeature[]}
   */
  features: PlanFeature[]

  /**
   * Период оплаты.
   * @type {string}
   */
  period: string

  /**
   * Цена.
   * @type {string}
   */
  price: string

  /**
   * Зачёркнутая цена.
   * @type {string | undefined}
   */
  oldPrice?: string
}
