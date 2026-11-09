/** Уровень сложности от 1 до 10. */
export type IndicatorValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type IndicatorProps = {
  /**
   * Число в круге. 1 — самый лёгкий, 10 — ультрасложный.
   */
  value: IndicatorValue
}
