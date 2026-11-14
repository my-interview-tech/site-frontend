/** Промежуток ствола, который линия обходит. */
export type Cut = {
  readonly bottom: number
  readonly top: number
}

/** Точка, где боковая карточка стыкуется со стволом. */
export type Joint = {
  readonly edge: number
  readonly y: number
}
