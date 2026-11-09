export type ProgressProps = {
  /**
   * Процент выполнения от 0 до 100. Значения за пределами обрезаются.
   */
  value: number

  /**
   * Имя полосы для скринридера.
   */
  label: string
}
