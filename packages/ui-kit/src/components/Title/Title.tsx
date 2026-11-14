import type { TypographyStep } from '../../theme/typography'
import { theme } from '../../theme/theme'
import { Text } from '../Text'
import { Styled } from './Title.styled'
import type { TitleProps, TitleSize } from './Title.types'

const SUBTITLE_FONT = {
  400: 300,
  500: 300,
  600: 400,
  700: 400,
  800: 500,
  900: 500,
} as const satisfies Record<TitleSize, TypographyStep>

/**
 * Заголовок с подзаголовком и действием справа.
 * `isReversed` ставит подзаголовок над заголовком, порядок в DOM совпадает с видимым.
 */
export const Title = ({ action, isReversed = false, size = 500, subtitle, title, titleAs = 'span' }: TitleProps) => {
  const titleNode = (
    <Text as={titleAs} color={theme.colors.textPrimary} font={size} weight="semibold">
      {title}
    </Text>
  )
  const subtitleNode = Boolean(subtitle) && (
    <Text color={theme.colors.textSecondary} font={SUBTITLE_FONT[size]}>
      {subtitle}
    </Text>
  )

  return (
    <Styled.Root alignItems="center" flex={1} gap={theme.spacings.s12}>
      <Styled.Copy flex={1} flexDirection="column" gap={theme.spacings.s4}>
        {isReversed ? subtitleNode : titleNode}
        {isReversed ? titleNode : subtitleNode}
      </Styled.Copy>

      {action}
    </Styled.Root>
  )
}
