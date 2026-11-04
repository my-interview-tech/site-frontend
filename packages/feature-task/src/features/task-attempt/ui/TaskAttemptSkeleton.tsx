import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

import { Styled } from './styled'

/**
 * Скелетон редактора и консоли.
 */
export const TaskAttemptSkeleton = () => {
  const theme = useTheme()

  return (
    <>
      <Styled.Editor flexDirection="column">
        <Styled.Toolbar alignItems="center" gap={theme.spacings.s16} justifyContent="space-between">
          <Flex alignItems="center" gap={theme.spacings.s16}>
            <Skeleton height={22} width={72} />
            <Skeleton height={22} width={22} />
          </Flex>
          <Skeleton height={28} radius={6} width={28} />
        </Styled.Toolbar>
        <Styled.Body />
        <Styled.Actions alignItems="center" gap={theme.spacings.s8} justifyContent="flex-end">
          <Skeleton height={44} radius={10} width={112} />
          <Skeleton height={44} radius={10} width={80} />
        </Styled.Actions>
      </Styled.Editor>
      <Styled.Console flexDirection="column">
        <Styled.ConsoleHead>
          <Skeleton height={16} width={72} />
          <Flex gap={4}>
            <Skeleton height={24} width={24} />
            <Skeleton height={24} width={24} />
          </Flex>
        </Styled.ConsoleHead>
        <Styled.ConsoleBody>
          <Flex flexDirection="column" gap={theme.spacings.s8}>
            <Skeleton height={20} width="70%" />
          </Flex>
        </Styled.ConsoleBody>
      </Styled.Console>
    </>
  )
}
