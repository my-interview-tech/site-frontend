import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

/**
 * Заглушка навигации по статье.
 */
const ArticleTocSkeleton = () => {
  const theme = useTheme()

  return (
    <Flex
      flexDirection="column"
      gap={theme.spacings.s12}
      p={theme.spacings.s12}
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radii.r10,
      }}
    >
      <Skeleton height={12} width={96} />
      <Skeleton height={12} />
      <Skeleton height={12} width={140} />
    </Flex>
  )
}

export { ArticleTocSkeleton }
