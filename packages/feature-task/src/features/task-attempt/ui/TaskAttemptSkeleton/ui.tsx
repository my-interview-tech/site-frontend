import { SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { Styled } from '../styled'

/**
 * Скелетон редактора и консоли.
 */
export const TaskAttemptSkeleton = () => (
  <>
    <Styled.Editor flexDirection="column">
      <Styled.Toolbar
        alignItems="center"
        gap={theme.spacings.s16}
        justifyContent="space-between"
        p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}
      >
        <Flex alignItems="center" gap={theme.spacings.s16}>
          <SkeletonRect height={22} width={72} />
          <SkeletonRect height={22} width={22} />
        </Flex>
        <SkeletonRect height={28} radius={6} width={28} />
      </Styled.Toolbar>

      <Styled.Body />
      <Styled.Actions
        alignItems="center"
        gap={theme.spacings.s8}
        justifyContent="flex-end"
        p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}
      >
        <SkeletonRect height={44} radius={10} width={112} />
        <SkeletonRect height={44} radius={10} width={80} />
      </Styled.Actions>
    </Styled.Editor>

    <Styled.Console flexDirection="column">
      <Styled.ConsoleHead
        alignItems="center"
        gap={theme.spacings.s12}
        justifyContent="space-between"
        p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}
      >
        <SkeletonRect height={16} width={72} />

        <Flex gap={theme.spacings.s4}>
          <SkeletonRect height={24} width={24} />
          <SkeletonRect height={24} width={24} />
        </Flex>
      </Styled.ConsoleHead>
      <Styled.ConsoleBody flexDirection="column" p={`${theme.spacings.s10}px ${theme.spacings.s12}px`}>
        <SkeletonRect height={20} width="70%" />
      </Styled.ConsoleBody>
    </Styled.Console>
  </>
)
