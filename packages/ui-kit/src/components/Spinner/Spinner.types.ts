/** Сторона кольца в px. */
export type SpinnerSize = 12 | 16 | 20

export type SpinnerProps = {
  /**
   * Подпись для скринридера. С ней спиннер получает `role="status"`, без неё скрыт.
   * загрузку объявляет родитель, например `aria-busy` у `Button`.
   */
  label?: string

  /**
   * Сторона кольца в px.
   * @default 16
   */
  size?: SpinnerSize
}
