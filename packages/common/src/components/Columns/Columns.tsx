import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'

import { Styled } from './Columns.styled'
import type { ColumnsProps } from './Columns.types'

const columnKey = (node: ReactNode, index: number): number | string => {
  if (isValidElement(node) && node.key != null) {
    return node.key
  }

  return index
}

/**
 * Сетка страницы: основная колонка и сайдбар.
 *
 * @description
 * До 768px колонки встают друг под другом.
 * `Grid` ui-kit — 12 колонок без фиксированного сайдбара в px, поэтому здесь своя сетка.
 * Все колонки, кроме последней, закрыты от авторасстановки.
 */
export const Columns = ({ align, children, gap, sidebar }: ColumnsProps) => {
  const nodes = Children.toArray(children)
  const last = nodes.length - 1

  return (
    <Styled.Grid $align={align} $gap={gap} $sidebar={sidebar}>
      {nodes.map((node, index) => {
        if (index === last) {
          return node
        }

        return <Styled.Main key={columnKey(node, index)}>{node}</Styled.Main>
      })}
    </Styled.Grid>
  )
}
