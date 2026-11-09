import { SkeletonRect } from '@my-interview/common'

import { theme } from '@my-interview/ui-kit'
import { SKELETON_WIDTHS } from '../constants'
import { Styled } from './styled'

/**
 * Заглушки строк секции.
 */
export const TechnologyItemRowSkeleton = () => (
  <>
    {SKELETON_WIDTHS.map((width) => (
      <Styled.SkeletonRow alignItems="center" gap={theme.spacings.s12} key={width}>
        <SkeletonRect height={14} radius={7} width={14} />
        <SkeletonRect height={14} width={width} />
      </Styled.SkeletonRow>
    ))}
  </>
)
