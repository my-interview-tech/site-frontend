import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'

import { TechnologyItemRowSkeleton } from '@articles-list/entities/technology-item'

import { Styled } from './styled'

/**
 * Заглушка секции: заголовок и строки.
 */
export const TechnologySectionsSkeleton = () => {
  const theme = useTheme()

  return (
    <Styled.Section flexDirection="column" forwardedAs="section" gap={theme.spacings.s12}>
      <Skeleton height={12} width={144} />
      <Styled.Panel flexDirection="column">
        <TechnologyItemRowSkeleton />
      </Styled.Panel>
    </Styled.Section>
  )
}
