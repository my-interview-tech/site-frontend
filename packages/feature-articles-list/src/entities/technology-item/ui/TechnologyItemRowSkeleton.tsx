import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'

import { SKELETON_WIDTHS } from '../constants'
import { Styled } from './styled'

/**
 * Заглушки строк секции.
 */
export const TechnologyItemRowSkeleton = () => {
  const theme = useTheme()

  return (
    <>
      {SKELETON_WIDTHS.map((width) => (
        <Styled.SkeletonRow alignItems="center" gap={theme.spacings.s12} key={width}>
          <Skeleton height={14} radius={7} width={14} />
          <Skeleton height={14} width={width} />
        </Styled.SkeletonRow>
      ))}
    </>
  )
}
