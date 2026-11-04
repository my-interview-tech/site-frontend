import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

import { Styled } from './styled'

const CARDS = [0, 1, 2]
const DOTS = [true, false, false]

/**
 * Заглушка блока тела статьи: строки текста и карусель материалов.
 */
export const ArticleBodySkeleton = () => {
  const theme = useTheme()

  return (
    <Flex flexDirection="column" gap={theme.spacings.s24} style={{ minWidth: 0 }}>
      <Flex flexDirection="column" gap={theme.spacings.s12}>
        <Skeleton height={26} width="46%" />
        <Skeleton height={22} />
        <Skeleton height={22} width="92%" />
        <Skeleton height={22} width="70%" />
      </Flex>

      <Flex
        as="section"
        flexDirection="column"
        gap={theme.spacings.s16}
        p={theme.spacings.s20}
        style={{
          background: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radii.r16,
        }}
      >
        <Skeleton height={32} width={175} />

        <Styled.Row>
          {CARDS.map((card) => (
            <Styled.Placeholder key={card} />
          ))}
        </Styled.Row>

        <Flex gap={theme.spacings.s8} justifyContent="center">
          {DOTS.map((active, index) => (
            <Styled.Dot key={index} $active={active} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
