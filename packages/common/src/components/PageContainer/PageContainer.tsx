import type { PageContainerProps } from './PageContainer.types'
import { Styled } from './PageContainer.styled'

/**
 * Фон страницы и горизонтальные поля на десктопе, планшете и мобильном.
 */
export const PageContainer = ({ children }: PageContainerProps) => <Styled.Root>{children}</Styled.Root>
