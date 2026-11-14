import { SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { SKELETON_WIDTHS } from '../../constants'
import { Styled } from '../styled'

/**
 * Заглушки карточек списка.
 */
export const TaskCardItemSkeleton = () => (
  <>
    {SKELETON_WIDTHS.map((width, index) => (
      <Styled.Card
        $available={false}
        alignItems="center"
        gap={theme.spacings.s16}
        key={`${width}-${index}`}
        p={`${theme.spacings.s16}px ${theme.spacings.s20}px`}
      >
        <SkeletonRect height={40} radius={8} width={40} />
        <Styled.Shrink flex={1} flexDirection="column" gap={theme.spacings.s8}>
          <SkeletonRect height={24} width={width} />
          <SkeletonRect height={20} width={220} />
          <Flex gap={theme.spacings.s6}>
            <SkeletonRect height={28} radius={14} width={64} />
            <SkeletonRect height={28} radius={14} width={72} />
          </Flex>
        </Styled.Shrink>
        <SkeletonRect height={32} radius={8} width={32} />
      </Styled.Card>
    ))}
  </>
)
