import { Styled } from './Grid.styled'
import type { GridItemProps, GridProps } from './Grid.types'

/**
 * 12-колоночная сетка без полей страницы, поля задаёт `Container`.
 * До планшета 4 колонки, ячейка на всю ширину. С планшета ячейка занимает `size` колонок.
 */
export const Grid = ({ children, ...rest }: GridProps) => <Styled.Root {...rest}>{children}</Styled.Root>

/**
 * Ячейка `Grid`.
 */
export const GridItem = ({ children, size = 12, ...rest }: GridItemProps) => (
  <Styled.Item $size={size} {...rest}>
    {children}
  </Styled.Item>
)
