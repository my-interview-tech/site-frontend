import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

/**
 * Заглушка карточки навыка.
 */
export const ArticleSkillsSkeleton = () => {
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
      <Skeleton height={12} width={72} />
      <Skeleton height={12} />
      <Skeleton height={12} width={100} />
    </Flex>
  )
}
