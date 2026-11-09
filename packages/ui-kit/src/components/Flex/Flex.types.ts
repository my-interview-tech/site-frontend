import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from 'react'

import type { WithBreakpoints } from '../../lib/withBreakpoints'

export interface FlexStyle {
  /**
   * Выравнивание многоколоночного содержимого.
   */
  alignContent?: CSSProperties['alignContent']

  /**
   * Выравнивание элементов по поперечной оси.
   */
  alignItems?: CSSProperties['alignItems']

  /**
   * Выравнивание этого элемента относительно поперечной оси.
   */
  alignSelf?: CSSProperties['alignSelf']

  /**
   * Отступы между колонками. Число задаётся в px.
   */
  columnGap?: CSSProperties['columnGap']

  /**
   * Заполнить родителя по высоте.
   */
  fillHeight?: boolean

  /**
   * Заполнить родителя по ширине.
   */
  fillWidth?: boolean

  /**
   * Гибкость элемента.
   */
  flex?: CSSProperties['flex']

  /**
   * Размер по главной оси. Число задаётся в px.
   */
  flexBasis?: CSSProperties['flexBasis']

  /**
   * Направление главной оси.
   */
  flexDirection?: CSSProperties['flexDirection']

  /**
   * Коэффициент роста.
   */
  flexGrow?: CSSProperties['flexGrow']

  /**
   * Коэффициент сжатия.
   */
  flexShrink?: CSSProperties['flexShrink']

  /**
   * Перенос при нехватке ширины.
   */
  flexWrap?: CSSProperties['flexWrap']

  /**
   * Отступы между элементами. Число задаётся в px.
   */
  gap?: CSSProperties['gap']

  /**
   * `inline-flex` вместо `flex`.
   */
  inline?: boolean

  /**
   * Выравнивание по главной оси.
   */
  justifyContent?: CSSProperties['justifyContent']

  /**
   * Выравнивание элементов внутри сетки.
   */
  justifyItems?: CSSProperties['justifyItems']

  /**
   * Выравнивание этого элемента по главной оси.
   */
  justifySelf?: CSSProperties['justifySelf']

  /**
   * Порядок во flex- или grid-контейнере.
   */
  order?: CSSProperties['order']

  /**
   * Внутренний отступ. Число задаётся в px.
   */
  p?: CSSProperties['padding']

  /**
   * `position: relative`.
   */
  relatively?: boolean

  /**
   * Отступы между рядами. Число задаётся в px.
   */
  rowGap?: CSSProperties['rowGap']

  /**
   * Ширина. Число задаётся в px.
   */
  width?: CSSProperties['width']
}

export type FlexLayout = WithBreakpoints<FlexStyle>

export type FlexProps = ComponentPropsWithoutRef<'div'> &
  FlexLayout & {
    /**
     * Тег вместо `div`, например `header` или `ul`.
     */
    as?: ElementType

    /**
     * Для `as="button"`.
     */
    disabled?: boolean

    /**
     * Для `as="button"`.
     */
    type?: 'button' | 'reset' | 'submit'
  }
