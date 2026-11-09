import { SkeletonRect } from '@my-interview/common'

import { theme } from '@my-interview/ui-kit'
import { TechnologyItemRowSkeleton } from '@articles-list/entities/technology-item'

import { Styled } from './styled'

/**
 * Заглушка секции: заголовок и строки.
 */
export const TechnologySectionsSkeleton = () => (
  <Styled.Section flexDirection="column" forwardedAs="section" gap={theme.spacings.s12}>
    <SkeletonRect height={26} width={144} />
    <Styled.Panel flexDirection="column" radius={10}>
      <TechnologyItemRowSkeleton />
    </Styled.Panel>
  </Styled.Section>
)
