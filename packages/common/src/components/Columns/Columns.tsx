import { Styled } from './Columns.styled'
import type { ColumnsProps } from './Columns.types'

/**
 * Сетка страницы: основная колонка и сайдбар.
 *
 * @description
 * До 768px колонки встают друг под другом.
 * `Grid` ui-kit — 12 колонок без фиксированного сайдбара в px, поэтому здесь своя сетка.
 */
export const Columns = ({ align, children, gap, sidebar }: ColumnsProps) => (
  <Styled.Grid $align={align} $gap={gap} $sidebar={sidebar}>
    {children}
  </Styled.Grid>
)
