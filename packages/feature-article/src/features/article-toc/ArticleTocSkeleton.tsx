import { Skeleton } from '@my-interview/common'

import { Styled } from './styled'

/**
 * Заглушка навигации по статье: те же отступы, что у пунктов оглавления.
 */
const ArticleTocSkeleton = () => (
  <div>
    <Styled.Label>
      <Skeleton height={16} width={148} />
    </Styled.Label>
    <Styled.TocButton $active={false} as="span" style={{ alignItems: 'center', display: 'flex' }}>
      <Skeleton height={22} width="78%" />
    </Styled.TocButton>
    <Styled.TocButton $active={false} as="span" style={{ alignItems: 'center', display: 'flex' }}>
      <Skeleton height={22} width="62%" />
    </Styled.TocButton>
  </div>
)

export { ArticleTocSkeleton }
