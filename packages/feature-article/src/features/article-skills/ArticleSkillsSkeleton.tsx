import { useTheme } from 'styled-components'

import { Skeleton, useMediaQuery } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

/**
 * Заглушка карточки навыка с теми же отступами, что у карточки в сайдбаре.
 */
export const ArticleSkillsSkeleton = () => {
  const theme = useTheme()
  const compact = useMediaQuery(theme.breakpoints.tablet)

  if (compact) {
    return null
  }

  return (
    <Flex
      flexDirection="column"
      gap={theme.spacings.s10}
      p={theme.spacings.s20}
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radii.r12,
      }}
    >
      <Flex flexDirection="column" gap={theme.spacings.s8}>
        <Skeleton height={16} width={72} />
        <Skeleton height={30} radius={999} width={88} />
      </Flex>
      <Flex flexDirection="column" gap={theme.spacings.s8}>
        <Skeleton height={16} width={128} />
        <Skeleton height={18} width="80%" />
      </Flex>
      <Flex flexDirection="column" gap={theme.spacings.s8}>
        <Skeleton height={16} width={72} />
        <Skeleton height={20} width={140} />
        <Skeleton height={20} width={150} />
      </Flex>
      <span
        style={{
          background: theme.colors.border,
          display: 'block',
          height: 1,
          margin: `${theme.spacings.s4}px 0`,
        }}
      />
      <Skeleton height={60} radius={10} />
    </Flex>
  )
}
