import { useTheme } from 'styled-components'

import { Flex, Text } from '@my-interview/ui-kit'

import type { ArticleAd as ArticleAdType } from '@shared/model'
import { Styled } from './styled'
import { AD_POSTFIX } from './constants'

/**
 * Рекламный слот.
 */
export const ArticleAd = ({ label, size }: ArticleAdType) => {
  const theme = useTheme()

  return (
    <Styled.Ad>
      <Flex alignItems="center" justifyContent="space-between">
        <Text as="span" color={theme.colors.textTertiary} font="caption">
          {label}
        </Text>
        <Text as="span" color={theme.colors.textTertiary} font="badge">
          {AD_POSTFIX}
        </Text>
      </Flex>
      <Flex alignItems="center" as={Styled.AdSlot} justifyContent="center">
        <Text as="span" color={theme.colors.textTertiary} font="caption">
          {size}
        </Text>
      </Flex>
    </Styled.Ad>
  )
}
