import { Flex, IconButton, Image, Link, Text, theme } from '@my-interview/ui-kit'

import { asset, externalLinks } from '@shared/constants'

import { SOCIALS, TEXT } from './config'
import { Styled } from './styled'

export const Footer = () => (
  <Styled.Container
    alignItems="flex-start"
    data-nav-surface="canvas"
    flexDirection="column"
    forwardedAs="footer"
    desktopS={{ p: `${theme.spacings.s24}px ${theme.container.padding}px` }}
    gap={theme.spacings.s16}
    p={`${theme.spacings.s20}px ${theme.container.paddingMobile}px`}
    tablet={{
      alignItems: 'flex-end',
      flexDirection: 'row',
      gap: theme.spacings.s24,
      justifyContent: 'space-between',
      p: `${theme.spacings.s24}px ${theme.container.paddingTablet}px`,
    }}
  >
    <Styled.Wrapper flexDirection="column" gap={theme.spacings.s8}>
      <Flex alignItems="center" gap={theme.spacings.s8}>
        <Image alt="" height={24} src={asset('icons/logo-mark.png')} width={24} />
        <Text color={theme.colors.textPrimary} font={500} weight="semibold">
          my-interview.tech
        </Text>
      </Flex>

      <Text as="p" color={theme.colors.textSecondary} font={400}>
        {TEXT.TAGLINE[0]}
        <br />
        {TEXT.TAGLINE[1]}
      </Text>

      <Flex flexWrap="wrap" gap={theme.spacings.s6}>
        {SOCIALS.map(({ href, icon, label }) =>
          href ? (
            <IconButton
              key={label}
              as={Link}
              href={href}
              iconSrc={icon}
              label={label}
              rel="noreferrer"
              target="_blank"
            />
          ) : (
            <IconButton key={label} as="span" iconSrc={icon} label={label} />
          )
        )}
      </Flex>
    </Styled.Wrapper>

    <Styled.Legal flexDirection="column" gap={theme.spacings.s4}>
      <Text as="p" color={theme.colors.textSecondary} font={400}>
        {TEXT.COPYRIGHT}
      </Text>

      <Text as="p" color={theme.colors.textTertiary} font={200}>
        {TEXT.REQUISITES}{' '}
        <Text
          as={Link}
          color={theme.colors.textTertiary}
          href={externalLinks.rusprofile}
          rel="noreferrer"
          target="_blank"
        >
          {TEXT.RUSPROFILE}
        </Text>
      </Text>
    </Styled.Legal>
  </Styled.Container>
)
