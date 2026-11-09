import { theme } from '../../theme/theme'
import { Flex } from '../Flex'
import { Image } from '../Image'
import { Styled } from './Logo.styled'
import type { LogoProps } from './Logo.types'

const MARK_SIZE = 24

/**
 * Логотип продукта: знак и словесный знак.
 */
export const Logo = ({ href, isInverted = false, src, title }: LogoProps) => {
  const content = (
    <Flex inline alignItems="center" as="span" gap={theme.spacings.s8}>
      <Image alt="" height={MARK_SIZE} src={src} width={MARK_SIZE} />
      <Styled.Name color={isInverted ? theme.colors.textOnHero : theme.colors.textPrimary} font={500} weight="semibold">
        {title}
      </Styled.Name>
    </Flex>
  )

  if (!href) {
    return content
  }

  return <Styled.Anchor href={href}>{content}</Styled.Anchor>
}
