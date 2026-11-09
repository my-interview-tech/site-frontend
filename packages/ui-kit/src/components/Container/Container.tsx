import { Styled } from './Container.styled'
import type { ContainerProps } from './Container.types'

/**
 * Горизонтальные поля страницы.
 */
export const Container = ({ children, ...rest }: ContainerProps) => <Styled.Root {...rest}>{children}</Styled.Root>
