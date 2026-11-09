import { Card, SkeletonRect } from '@my-interview/common'
import { Divider, Flex, theme, useBreakpoint } from '@my-interview/ui-kit'

/**
 * Заглушка карточки навыка с теми же отступами, что у карточки в сайдбаре.
 */
export const ArticleSkillsSkeleton = () => {
  const { isMobile } = useBreakpoint()

  if (isMobile) {
    return null
  }

  return (
    <Card flexDirection="column" gap={theme.spacings.s10} p={theme.spacings.s20} radius={12}>
      <Flex flexDirection="column" gap={theme.spacings.s8}>
        <SkeletonRect height={16} width={72} />
        <SkeletonRect height={30} radius={999} width={88} />
      </Flex>
      <Flex flexDirection="column" gap={theme.spacings.s8}>
        <SkeletonRect height={16} width={128} />
        <SkeletonRect height={18} width="80%" />
      </Flex>
      <Flex flexDirection="column" gap={theme.spacings.s8}>
        <SkeletonRect height={16} width={72} />
        <SkeletonRect height={20} width={140} />
        <SkeletonRect height={20} width={150} />
      </Flex>
      <Divider />
      <SkeletonRect height={60} radius={10} />
    </Card>
  )
}
