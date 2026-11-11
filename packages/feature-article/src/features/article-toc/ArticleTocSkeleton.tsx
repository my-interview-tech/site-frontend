import { SkeletonRect } from '@my-interview/common'
import { Flex, theme, useBreakpoint } from '@my-interview/ui-kit'

/**
 * Заглушка оглавления с отступами `Toc`. До `desktopS` скрыта, как само оглавление.
 */
export const ArticleTocSkeleton = () => {
  const { breakpoint } = useBreakpoint()
  const isStacked = breakpoint === 'mobile' || breakpoint === 'tablet' || breakpoint === 'desktopXS'

  if (isStacked) {
    return null
  }

  return (
    <Flex flexDirection="column">
      <Flex p={`${theme.spacings.s2}px ${theme.spacings.s12}px ${theme.spacings.s8}px`}>
        <SkeletonRect height={16} width={148} />
      </Flex>
      <Flex p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}>
        <SkeletonRect height={22} width="78%" />
      </Flex>
      <Flex p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}>
        <SkeletonRect height={22} width="62%" />
      </Flex>
    </Flex>
  )
}
