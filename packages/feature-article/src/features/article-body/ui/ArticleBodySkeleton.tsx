import { Card, SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { Styled } from './styled'

const CARDS = [0, 1, 2]
const DOTS = [0, 1, 2]

/**
 * Заглушка блока тела статьи: строки текста и карусель материалов.
 */
export const ArticleBodySkeleton = () => (
  <Flex flexDirection="column" gap={theme.spacings.s24} style={{ minWidth: 0 }}>
    <Flex flexDirection="column" gap={theme.spacings.s12}>
      <SkeletonRect height={26} width="46%" />
      <SkeletonRect height={22} />
      <SkeletonRect height={22} width="92%" />
      <SkeletonRect height={22} width="70%" />
    </Flex>

    <Card as="section" flexDirection="column" gap={theme.spacings.s16} p={theme.spacings.s20}>
      <SkeletonRect height={32} width={175} />

      <Styled.Row>
        {CARDS.map((card) => (
          <SkeletonRect key={card} height={120} radius={theme.radii.r10} />
        ))}
      </Styled.Row>

      <Flex gap={theme.spacings.s8} justifyContent="center">
        {DOTS.map((dot) => (
          <SkeletonRect key={dot} height={8} radius={theme.radii.rPill} width={8} />
        ))}
      </Flex>
    </Card>
  </Flex>
)
